---
title: Access OCI Helm charts in Google Artifact Registry
description: Configure Harness GitOps to pull OCI Helm charts from Google Artifact Registry using GKE Workload Identity Federation or External Secrets Operator.
sidebar_position: 810
---

This topic assumes you have already created an [OCI Helm repository](/docs/continuous-delivery/gitops/gitops-entities/repositories/add-a-harness-git-ops-repository#add-a-repository).

Google Artifact Registry (GAR) uses OAuth 2.0 access tokens for authentication. These tokens are short-lived (typically 1 hour), which makes static credentials impractical for continuous chart pulling. There are two approaches to authenticate the Argo CD repo server to GAR:

- **GKE Workload Identity Federation (recommended):** Bind the `argocd-repo-server` Kubernetes service account to a Google Cloud IAM service account with Artifact Registry Reader permissions. The repo server authenticates to GAR through the GKE metadata server, with no stored credentials or token rotation required.
- **External Secrets Operator (ESO):** Install ESO in the cluster and configure it to rotate the OAuth token in the Kubernetes secret that stores the repository credentials.

Use Workload Identity Federation when your GitOps Agent runs on GKE. Use ESO when Workload Identity is not available (for example, self-managed Kubernetes clusters outside of GKE).

---

## Option 1: Use GKE Workload Identity Federation (recommended)

With Workload Identity Federation, the `argocd-repo-server` pod authenticates to Google Cloud through the GKE metadata server. The repo server uses the bound IAM service account to access GAR directly, so you do not need to store or rotate any credentials.

### Prerequisites

- **GKE cluster with Workload Identity enabled:** Go to [GKE Workload Identity documentation](https://cloud.google.com/kubernetes-engine/docs/how-to/workload-identity) to enable it on your cluster and node pools.
- **OCI Helm repository:** An OCI Helm repository already added in Harness GitOps. Go to [Add a Harness GitOps repository](/docs/continuous-delivery/gitops/gitops-entities/repositories/add-a-harness-git-ops-repository#add-a-repository) to set one up.

### Create a GCP IAM service account with GAR permissions

1. Create a GCP IAM service account for the repo server:

   ```bash
   export PROJECT_ID="<YOUR_GCP_PROJECT_ID>"
   export GCP_SA_NAME="gitops-gar-reader"

   gcloud iam service-accounts create "$GCP_SA_NAME" \
     --project="$PROJECT_ID" \
     --display-name="GitOps Artifact Registry Reader"
   ```

2. Grant the **Artifact Registry Reader** role to the service account. This role provides read access to pull OCI Helm charts from GAR:

   ```bash
   gcloud projects add-iam-policy-binding "$PROJECT_ID" \
     --member="serviceAccount:${GCP_SA_NAME}@${PROJECT_ID}.iam.gserviceaccount.com" \
     --role="roles/artifactregistry.reader"
   ```

   To restrict access to a specific repository instead of all repositories in the project, grant the role at the repository level:

   ```bash
   gcloud artifacts repositories add-iam-policy-binding <REPOSITORY_NAME> \
     --project="$PROJECT_ID" \
     --location="<REGION>" \
     --member="serviceAccount:${GCP_SA_NAME}@${PROJECT_ID}.iam.gserviceaccount.com" \
     --role="roles/artifactregistry.reader"
   ```

### Create the Workload Identity binding

Bind the `argocd-repo-server` Kubernetes service account to the GCP IAM service account. This allows the repo server pod to act as the IAM service account:

```bash
export AGENT_NAMESPACE="<YOUR_AGENT_NAMESPACE>"

gcloud iam service-accounts add-iam-policy-binding \
  "${GCP_SA_NAME}@${PROJECT_ID}.iam.gserviceaccount.com" \
  --project="$PROJECT_ID" \
  --role="roles/iam.workloadIdentityUser" \
  --member="serviceAccount:${PROJECT_ID}.svc.id.goog[${AGENT_NAMESPACE}/argocd-repo-server]"
```

### Annotate the repo server service account

Annotate the `argocd-repo-server` Kubernetes service account with the GCP IAM service account email:

```bash
kubectl annotate serviceaccount argocd-repo-server \
  -n "$AGENT_NAMESPACE" \
  iam.gke.io/gcp-service-account="${GCP_SA_NAME}@${PROJECT_ID}.iam.gserviceaccount.com"
```

### Restart the repo server

Restart the repo server deployment to pick up the new service account annotation:

```bash
kubectl rollout restart deployment argocd-repo-server -n "$AGENT_NAMESPACE"
```

After the pods restart, the repo server authenticates to GAR automatically using the bound IAM service account. You do not need to provide a username, password, or token when you add the GAR repository in Harness.

:::tip Verify the setup
Run the following command from inside the repo server pod to confirm that Workload Identity is working:

```bash
kubectl exec -it deployment/argocd-repo-server -n "$AGENT_NAMESPACE" -- \
  curl -s -H "Metadata-Flavor: Google" \
  "http://metadata.google.internal/computeMetadata/v1/instance/service-accounts/default/email"
```

The output should display the email of the GCP IAM service account you created.
:::

---

## Option 2: Use External Secrets Operator

If Workload Identity is not available, use the [External Secrets Operator](https://external-secrets.io) to rotate GAR OAuth tokens automatically. ESO fetches a fresh access token at a configured interval and updates the Kubernetes secret that stores the repository credentials.

### Install External Secrets Operator

Install ESO in the cluster where Argo CD is running:

```bash
helm repo add external-secrets https://charts.external-secrets.io
helm install external-secrets \
  external-secrets/external-secrets \
  -n external-secrets \
  --create-namespace \
  --set installCRDs=true
```

### Create a GCP service account key secret

Create a GCP service account with Artifact Registry Reader permissions (if you have not already), generate a JSON key, and store it as a Kubernetes secret:

```bash
gcloud iam service-accounts keys create key.json \
  --iam-account="${GCP_SA_NAME}@${PROJECT_ID}.iam.gserviceaccount.com"

kubectl create secret generic gcp-sa-secret \
  --from-file=secret-access-credentials=key.json \
  -n "$AGENT_NAMESPACE"
```

:::warning
Service account keys are long-lived credentials. Store them securely and rotate them regularly. When possible, use Workload Identity Federation (Option 1) instead.
:::

### Create a ClusterSecretStore

Create a `ClusterSecretStore` that references the GCP service account key. ESO uses this to authenticate to GCP:

```yaml
apiVersion: external-secrets.io/v1beta1
kind: ClusterSecretStore
metadata:
  name: gcp-secret-store
spec:
  provider:
    gcpsm:
      projectID: <YOUR_GCP_PROJECT_ID>
      auth:
        secretRef:
          secretAccessKeySecretRef:
            name: gcp-sa-secret
            key: secret-access-credentials
            namespace: <AGENT_NAMESPACE>
```

Apply the ClusterSecretStore:

```bash
kubectl apply -f cluster-secret-store.yaml
```

### Create the ExternalSecret

Identify the Kubernetes secret that stores your OCI Helm repository credentials. List the repo secrets in the Argo CD namespace:

```bash
kubectl get secret -n <AGENT_NAMESPACE> -l argocd.argoproj.io/secret-type=repository
```

Inspect the target secret to confirm it corresponds to your GAR repository:

```bash
kubectl get secret <REPO_SECRET_NAME> -n <AGENT_NAMESPACE> -o yaml
```

Create an `ExternalSecret` that refreshes the password field with a fresh OAuth token. Store the access token in Google Secret Manager and reference it from the ExternalSecret.

Create a file named `external-secret.yaml`. Replace the placeholder values before applying:

- `REPO_SECRET_NAME`: the Kubernetes secret name for your repository (for example, `repo-2529854065`).
- `AGENT_NAMESPACE`: the namespace where Argo CD is installed.
- `SECRET_NAME_IN_GSM`: the secret name in Google Secret Manager that holds the access token.

In the `template.data.password` field, use the Go template expression `"&#123;&#123; .access_token &#125;&#125;"` to inject the fetched token into the secret.

```yaml
apiVersion: external-secrets.io/v1beta1
kind: ExternalSecret
metadata:
  name: REPO_SECRET_NAME
  namespace: AGENT_NAMESPACE
spec:
  refreshInterval: "55m"
  secretStoreRef:
    name: gcp-secret-store
    kind: ClusterSecretStore
  target:
    name: REPO_SECRET_NAME
    creationPolicy: Merge
    template:
      data:
        password: TEMPLATE_EXPRESSION
  data:
    - secretKey: access_token
      remoteRef:
        key: SECRET_NAME_IN_GSM
```

Set the `password` value under `template.data` to the Go template expression shown above. This injects the fetched token into the repository secret at each refresh interval.

Apply the ExternalSecret:

```bash
kubectl apply -f external-secret.yaml
```

Key fields in the ExternalSecret:

- **`refreshInterval`:** How often ESO fetches a new token. GCP OAuth tokens expire after 1 hour, so `55m` or shorter is recommended.
- **`creationPolicy: Merge`:** ESO merges the new `password` field into the existing secret rather than recreating it. This preserves the other fields (URL, type, enableOCI) that Argo CD requires.
