---
title: Access OCI Helm charts in private Amazon ECR
description: Configure Harness GitOps to pull OCI Helm charts from a private Amazon ECR registry using IRSA or External Secrets Operator.
sidebar_position: 800
redirect_from:
  - /docs/continuous-delivery/gitops/helm-oci-repository-aws-ecr
---

This topic assumes you have already created an [OCI Helm repository](/docs/continuous-delivery/gitops/gitops-entities/repositories/add-a-harness-git-ops-repository#add-a-repository).

Amazon ECR issues short-lived authentication tokens that expire after 12 hours. To pull OCI Helm charts from a private ECR registry, the Argo CD repo server must authenticate to ECR continuously. There are two approaches:

- **IRSA (recommended):** Attach an IAM role with ECR permissions directly to the `argocd-repo-server` service account using IAM Roles for Service Accounts. The repo server uses AWS IAM APIs to authenticate natively, with no stored credentials or token rotation required.
- **External Secrets Operator (ESO):** Install ESO in the cluster and configure it to rotate the ECR token in the Kubernetes secret that stores the repository credentials.

Use IRSA when your GitOps Agent runs on Amazon EKS. Use ESO when IRSA is not available (for example, self-managed Kubernetes clusters outside of EKS).

---

## Option 1: Use IRSA (recommended)

With IRSA, the `argocd-repo-server` pod assumes an IAM role through the EKS OIDC provider. The repo server authenticates to ECR using the AWS SDK, so you do not need to store or rotate any credentials.

### Prerequisites

- **Amazon EKS cluster:** The GitOps Agent must run on an EKS cluster with an [OIDC provider enabled](https://docs.aws.amazon.com/eks/latest/userguide/enable-iam-roles-for-service-accounts.html).
- **OCI Helm repository:** An OCI Helm repository already added in Harness GitOps. Go to [Add a Harness GitOps repository](/docs/continuous-delivery/gitops/gitops-entities/repositories/add-a-harness-git-ops-repository#add-a-repository) to set one up.

### Create an IAM role with ECR permissions

1. Create an IAM policy that grants read access to your ECR repositories:

   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Effect": "Allow",
         "Action": [
           "ecr:GetAuthorizationToken"
         ],
         "Resource": "*"
       },
       {
         "Effect": "Allow",
         "Action": [
           "ecr:BatchGetImage",
           "ecr:GetDownloadUrlForLayer",
           "ecr:BatchCheckLayerAvailability"
         ],
         "Resource": "arn:aws:ecr:<REGION>:<ACCOUNT_ID>:repository/<REPOSITORY_NAME>"
       }
     ]
   }
   ```

   Replace `<REGION>`, `<ACCOUNT_ID>`, and `<REPOSITORY_NAME>` with your values. To grant access to all repositories in the account, use `arn:aws:ecr:<REGION>:<ACCOUNT_ID>:repository/*`.

2. Create an IAM role and attach the policy from the previous step. Configure the trust policy to allow the `argocd-repo-server` service account to assume the role:

   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Effect": "Allow",
         "Principal": {
           "Federated": "arn:aws:iam::<ACCOUNT_ID>:oidc-provider/oidc.eks.<REGION>.amazonaws.com/id/<OIDC_ID>"
         },
         "Action": "sts:AssumeRoleWithWebIdentity",
         "Condition": {
           "StringEquals": {
             "oidc.eks.<REGION>.amazonaws.com/id/<OIDC_ID>:sub": "system:serviceaccount:<AGENT_NAMESPACE>:argocd-repo-server",
             "oidc.eks.<REGION>.amazonaws.com/id/<OIDC_ID>:aud": "sts.amazonaws.com"
           }
         }
       }
     ]
   }
   ```

   Replace `<ACCOUNT_ID>`, `<REGION>`, `<OIDC_ID>`, and `<AGENT_NAMESPACE>` with your values.

### Annotate the repo server service account

Annotate the `argocd-repo-server` service account with the IAM role ARN:

```bash
kubectl annotate serviceaccount argocd-repo-server \
  -n <AGENT_NAMESPACE> \
  eks.amazonaws.com/role-arn=arn:aws:iam::<ACCOUNT_ID>:role/<ROLE_NAME>
```

### Enable service account token mounting

Ensure `automountServiceAccountToken` is set to `true` on the repo server deployment so the projected service account token is available to the AWS SDK:

```bash
kubectl patch deployment argocd-repo-server -n <AGENT_NAMESPACE> \
  --patch '{"spec":{"template":{"spec":{"automountServiceAccountToken": true}}}}'
```

### Restart the repo server

Restart the repo server deployment to pick up the new service account annotation and token:

```bash
kubectl rollout restart deployment argocd-repo-server -n <AGENT_NAMESPACE>
```

After the pods restart, the repo server authenticates to ECR automatically using the assumed IAM role. You do not need to provide a username, password, or token when you add the ECR repository in Harness.

:::tip Verify the setup
Run the following command from inside the repo server pod to confirm that the IAM role is assumed correctly:

```bash
kubectl exec -it deployment/argocd-repo-server -n <AGENT_NAMESPACE> -- \
  aws sts get-caller-identity
```

The output should display the ARN of the IAM role you created.
:::

---

## Option 2: Use External Secrets Operator

If IRSA is not available, use the [External Secrets Operator](https://external-secrets.io) to rotate ECR tokens automatically. ESO fetches a fresh token from ECR at a configured interval and updates the Kubernetes secret that stores the repository credentials.

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

This installs ESO with the `ClusterSecretStore`, `ExternalSecret`, and `ECRAuthorizationToken` CRDs. The `ECRAuthorizationToken` generator produces a fresh ECR token on demand.

### Create AWS credentials in a Kubernetes secret

Create a Kubernetes secret that contains AWS access credentials. ESO uses these credentials to call the ECR `GetAuthorizationToken` API.

```bash
kubectl create secret generic awssm-secret \
  --from-literal=access-key=<AWS_ACCESS_KEY_ID> \
  --from-literal=secret-access-key=<AWS_SECRET_ACCESS_KEY>
```

Replace `<AWS_ACCESS_KEY_ID>` and `<AWS_SECRET_ACCESS_KEY>` with your actual credentials.

### Create the ECR token generator

Create a file named `generator.yaml` with the following content:

```yaml
apiVersion: generators.external-secrets.io/v1alpha1
kind: ECRAuthorizationToken
metadata:
  name: ecr-gen
spec:
  region: <REGION>
  auth:
    secretRef:
      accessKeyIDSecretRef:
        name: "awssm-secret"
        key: "access-key"
      secretAccessKeySecretRef:
        name: "awssm-secret"
        key: "secret-access-key"
```

Replace `<REGION>` with the AWS region of your ECR registry (for example, `us-west-1`).

Apply the generator:

```bash
kubectl apply -f generator.yaml
```

### Create the ExternalSecret

Identify the Kubernetes secret that stores your OCI Helm repository credentials. List the repo secrets in the Argo CD namespace:

```bash
kubectl get secret -n <AGENT_NAMESPACE> -l argocd.argoproj.io/secret-type=repository
```

Inspect the target secret to confirm it corresponds to your ECR repository:

```bash
kubectl get secret <REPO_SECRET_NAME> -n <AGENT_NAMESPACE> -o yaml
```

Create a file named `external-secret.yaml`. Replace the placeholder values before applying:

- `REPO_SECRET_NAME`: the Kubernetes secret name for your repository (for example, `repo-2529854065`).

In the `template.data.password` field, use the Go template expression `"&#123;&#123; .password &#125;&#125;"` to inject the rotated password into the secret.

```yaml
apiVersion: external-secrets.io/v1beta1
kind: ExternalSecret
metadata:
  name: REPO_SECRET_NAME
spec:
  refreshInterval: "12h"
  target:
    name: REPO_SECRET_NAME
    creationPolicy: Merge
    template:
      data:
        password: TEMPLATE_EXPRESSION
  dataFrom:
    - sourceRef:
        generatorRef:
          apiVersion: generators.external-secrets.io/v1alpha1
          kind: ECRAuthorizationToken
          name: "ecr-gen"
```

Set the `password` value under `template.data` to the Go template expression shown above. This injects the ECR token fetched by the generator into the repository secret.

Apply the ExternalSecret:

```bash
kubectl apply -f external-secret.yaml
```

Key fields in the ExternalSecret:

- **`refreshInterval`:** How often ESO fetches a new ECR token. ECR tokens expire after 12 hours, so `12h` or shorter is recommended.
- **`creationPolicy: Merge`:** ESO merges the new `password` field into the existing secret rather than recreating it. This preserves the other fields (URL, type, enableOCI) that Argo CD requires.
- **`generatorRef`:** Points to the `ECRAuthorizationToken` generator created in the previous step.
