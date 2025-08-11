---
title: Create a GitOps Cluster with Azure Workload Identity Federation (WIF)
description: Connect Harness GitOps (Argo CD) to Azure Kubernetes Service (AKS) using Workload Identity Federation for secure, keyless authentication.
sidebar_position: 2
---

In this guide, you’ll set up Harness GitOps (powered by Argo CD) to connect securely to an Azure Kubernetes Service (AKS) cluster without storing kubeconfigs or static credentials.


## What is Azure WIF?

Azure **Workload Identity Federation (WIF)** allows Kubernetes ServiceAccounts to securely access Azure resources **without storing credentials or secrets** in the cluster.  
Instead, AKS issues short-lived tokens through its **OpenID Connect (OIDC) issuer**, which Azure validates before granting access to the linked Azure AD application.

With WIF:
- No kubeconfigs or static service principal secrets are stored
- Authentication is short-lived and automatically rotated
- Access is scoped to a specific Kubernetes ServiceAccount

**Learn more:** [Azure Workload Identity Federation documentation](https://learn.microsoft.com/en-us/azure/aks/workload-identity-overview)

## Let's Now Set Up the GitOps Cluster with Azure WIF

The following steps will guide you through configuring Azure Kubernetes Service (AKS) and Harness GitOps (Argo CD) to use Azure Workload Identity Federation.  

**By the end, you will:**
- Create or use an existing AKS cluster
- Enable OIDC + WIF on the cluster
- Create an Azure AD application and federated credential
- Grant RBAC permissions to the Azure app
- Set up an annotated ServiceAccount for GitOps
- Deploy the Harness GitOps Agent and connect the cluster


**Prerequisites:**
- Azure CLI and kubectl installed
- Azure subscription access (able to create AKS and assign RBAC)
- Harness GitOps module enabled (you’ll install a GitOps Agent)

**Variables:**
```bash
RG="gitops-rg"
LOC="eastus"                      # any supported region
AKS="gitops-aks"
APP_NAME="argo-cd-app"           # Azure AD application display name
SA_NS="argocd"                   # namespace for GitOps Agent / Argo CD
SA_NAME="argocd-manager"         # ServiceAccount used for WIF
```

### 1. Create or select your AKS cluster
Create or Select an AKS Cluster
If you don’t already have an AKS cluster, you’ll create one.
If you already have one, you’ll just fetch its kubeconfig so you can interact with it.

**Key points:**
- The resource group (RG) groups your AKS resources in Azure.
- The VM size and node count determine performance and cost — here we use a small example node pool.

```bash
az group create -n "$RG" -l "$LOC"

az aks create \
  -g "$RG" -n "$AKS" \
  --node-count 1 \
  --node-vm-size Standard_D4s_v6 \
  --enable-managed-identity \
  --generate-ssh-keys

az aks get-credentials -g "$RG" -n "$AKS" --overwrite-existing
kubectl get nodes
```

If you already have AKS, just fetch credentials:

```bash
az aks get-credentials -g "$RG" -n "$AKS" --overwrite-existing
```

### 2. Enable OIDC Issuer and Workload Identity
Workload Identity requires your AKS cluster to have:
- An OIDC issuer — a trusted identity provider URL that Azure uses to validate Kubernetes-issued tokens
- Workload Identity enabled — the mechanism that links Kubernetes ServiceAccounts to Azure AD applications.

This step ensures your cluster can issue tokens Azure will trust.

```bash
az aks update -g "$RG" -n "$AKS" \
  --enable-oidc-issuer \
  --enable-workload-identity

OIDC_ISSUER_URL=$(az aks show -g "$RG" -n "$AKS" --query "oidcIssuerProfile.issuerUrl" -o tsv)
echo "OIDC_ISSUER_URL=$OIDC_ISSUER_URL"
```

### 3. Create an Azure AD Application and Service Principal
The Azure AD application represents your cluster’s identity in Azure AD.
The service principal is the **login** that AKS uses to act as that application.

This identity will be linked to your Kubernetes ServiceAccount in later steps.

```bash
AZURE_CLIENT_ID=$(az ad app create --display-name "$APP_NAME" --query appId -o tsv)
echo "AZURE_CLIENT_ID=$AZURE_CLIENT_ID"

# idempotent: create SP if missing
az ad sp show --id "$AZURE_CLIENT_ID" >/dev/null 2>&1 || az ad sp create --id "$AZURE_CLIENT_ID"
```

(If reusing an app, set AZURE_CLIENT_ID=`<existing-app-id>` and skip the az ad app create.)

### 4. Add a Federated Credential (WIF)
A federated credential tells Azure:
> **Tokens from this specific Kubernetes ServiceAccount in this cluster are trusted to act as this Azure AD application.**


This creates the trust link between:
- **Your AKS OIDC issuer**
- **Your Kubernetes ServiceAccount**
- **Your Azure AD application**

You will define:
- **Issuer** — The AKS OIDC URL from Step&nbsp;2. Azure uses this to validate tokens from your cluster.
- **Subject** — The Kubernetes ServiceAccount identity in `system:serviceaccount:<namespace>:<serviceaccount>` format. Must match the namespace and ServiceAccount you created.
- **Audience** — For Azure WIF, keep `api://AzureADTokenExchange`. This defines who the token is intended for.
- **azure.workload.identity/client-id** — The annotation you’ll add to your ServiceAccount later, pointing to the Azure AD application’s Client ID.


```bash
SUBJECT="system:serviceaccount:${SA_NS}:${SA_NAME}"

# delete any previous cred named 'argo-cd' (safe if none exists)
az ad app federated-credential delete \
  --id "$AZURE_CLIENT_ID" \
  --federated-credential-id "argo-cd" 2>/dev/null || true

# create federated credential
az ad app federated-credential create \
  --id "$AZURE_CLIENT_ID" \
  --parameters "{
    \"name\": \"argo-cd\",
    \"issuer\": \"${OIDC_ISSUER_URL}\",
    \"subject\": \"${SUBJECT}\",
    \"description\": \"WIF for ArgoCD ServiceAccount\",
    \"audiences\": [\"api://AzureADTokenExchange\"]
  }"

# verify
az ad app federated-credential list --id "$AZURE_CLIENT_ID" -o table
```

### 5. Grant RBAC Permissions on AKS
Now that your Azure app can authenticate, you must give it permission to perform operations in the cluster.

We start with the `Azure Kubernetes Service RBAC Cluster Admin role` for simplicity. You can scope this down later.

```bash
AKS_SCOPE=$(az aks show -g "$RG" -n "$AKS" --query id -o tsv)

az role assignment create \
  --assignee "$AZURE_CLIENT_ID" \
  --role "Azure Kubernetes Service RBAC Cluster Admin" \
  --scope "$AKS_SCOPE"
```

You can scope this down later.

### 6. Create the Namespace, ServiceAccount, and RBAC

The Kubernetes ServiceAccount:
- Lives in the namespace you’ll run GitOps in (e.g., argocd)
- Is annotated with the Azure AD application’s Client ID
- Is bound to the necessary Kubernetes RBAC roles
This is the link between Kubernetes and Azure AD.

```bash
kubectl create namespace "$SA_NS" 2>/dev/null || true

cat <<EOF | kubectl apply -f -
apiVersion: v1
kind: ServiceAccount
metadata:
  name: ${SA_NAME}
  namespace: ${SA_NS}
  annotations:
    azure.workload.identity/client-id: "${AZURE_CLIENT_ID}"
EOF

cat <<'EOF' | kubectl apply -f -
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: argocd-manager-binding
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: cluster-admin
subjects:
- kind: ServiceAccount
  name: argocd-manager
  namespace: argocd
EOF

# sanity: verify annotation
kubectl -n "$SA_NS" get sa "$SA_NAME" -o yaml | grep -A2 azure.workload.identity/client-id
```

### 7. Install the Harness GitOps Agent

The agent runs inside your cluster and manages the GitOps process.
- Install it in the same namespace as your ServiceAccount.
- Configure it to use your annotated ServiceAccount so it authenticates via WIF.

Go to [Installing a GitOps Agent](/docs/continuous-delivery/gitops/agents/install-a-harness-git-ops-agent.md) for a tutorial on how to create a Harness GitOps Agent.

Wait for the Agent to show Healthy in the Harness UI.

### 8. Register the Cluster in Harness

Finally, connect the cluster to Harness GitOps using the agent you just installed.

1. Go to GitOps → Settings → Clusters → New Cluster
2. Add a **Name** to the cluster
3. Select the healthy agent you previously created
4. In Details tab, You can use the credentials created by the agent by selecting **Use the credentials of a specific Harness GitOps Agent**
5. Click Save → status should become Connected

Once connected, Harness can deploy workloads to AKS via Argo CD — all using **WIF authentication**.

### Troubleshooting
Cluster shows Not Connected
- Ensure ServiceAccount annotation matches **AZURE_CLIENT_ID**:
`kubectl -n "$SA_NS" get sa "$SA_NAME" -o yaml | grep -A2 azure.workload.identity/client-id`
- Ensure federated credential matches AKS OIDC issuer + subject:
`az ad app federated-credential list --id "$AZURE_CLIENT_ID" -o table`
- Ensure Azure app has RBAC at correct scope:
`az role assignment list --assignee "$AZURE_CLIENT_ID" --scope "$AKS_SCOPE" -o table`

If you were just granted access, refresh Azure CLI tokens:
`az logout && az login`


### Cleanup
Delete your AKS cluster along with the resource group (to stop costs):

```bash
# remove cluster + managed RG
az aks delete -g "$RG" -n "$AKS" --yes
MC_RG=$(az group list --query "[?starts_with(name, 'MC_${RG}_${AKS}_')].name" -o tsv)
[ -n "$MC_RG" ] && az group delete -n "$MC_RG" --yes

# remove the resource group (if used just for this)
az group delete -n "$RG" --yes

# (optional) remove app + SP + federated credential
for F in $(az ad app federated-credential list --id "$AZURE_CLIENT_ID" --query "[].name" -o tsv); do
  az ad app federated-credential delete --id "$AZURE_CLIENT_ID" --federated-credential-id "$F"
done
az ad sp delete --id "$AZURE_CLIENT_ID"
az ad app delete --id "$AZURE_CLIENT_ID"
```