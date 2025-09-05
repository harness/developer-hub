---
title: Create a GitOps Cluster with Azure Workload Identity Federation (WIF)
description: Connect Harness GitOps (Argo CD) to Azure Kubernetes Service (AKS) using Workload Identity Federation for secure, keyless authentication.
sidebar_position: 2
---

In this guide, you'll set up Harness GitOps (powered by Argo CD) to connect securely to an Azure Kubernetes Service (AKS) cluster without storing kubeconfigs or static credentials.

## What is Azure WIF?

Azure **Workload Identity Federation (WIF)** allows Kubernetes ServiceAccounts to securely access Azure resources **without storing credentials or secrets** in the cluster.  
Instead, AKS issues short-lived tokens through its **OpenID Connect (OIDC) issuer**, which Azure validates before granting access to the linked Azure AD application.

With WIF:
- No kubeconfigs or static service principal secrets are stored
- Authentication is short-lived and automatically rotated
- Access is scoped to a specific Kubernetes ServiceAccount

**Learn more:** [Azure Workload Identity Federation documentation](https://learn.microsoft.com/en-us/azure/aks/workload-identity-overview)

## Prerequisites

Before setting up Azure WIF with GitOps, ensure you have:

- **Azure subscription** with appropriate permissions to:
  - Create and manage Azure AD applications
  - Create and manage Managed Identities
  - Assign RBAC roles
  - Manage AKS clusters
- **AKS cluster** with specific authentication and authorization configuration
- **Harness GitOps module** enabled in your account

:::important Authentication and Authorization Requirements
Your AKS cluster **must** be configured with one of these specific authentication and authorization combinations:
- **Microsoft Entra ID authentication with Azure RBAC**, OR  
- **Microsoft Entra ID authentication with Kubernetes RBAC**

Other authentication methods may cause connection failures.
:::

## Overview of the Setup Process

The Azure WIF setup involves these key steps:

1. **Configure AKS Security** - Set up proper authentication and authorization
2. **Enable OIDC and Workload Identity** - Enable your AKS cluster to issue trusted tokens
3. **Create Managed Identity** - Create an Azure managed identity for your GitOps agent
4. **Download and Modify GitOps Agent YAML** - Download the agent YAML and add workload identity annotations
5. **Configure Federated Credentials** - Link your Kubernetes ServiceAccount to the managed identity
6. **Deploy GitOps Agent** - Install the modified agent
7. **Create Cluster Secret** - Configure the cluster connection with workload identity authentication
8. **Verify Setup** - Ensure the cluster appears healthy in Harness UI

## Step 1: Configure AKS Security Settings

Ensure your AKS cluster is configured with the correct authentication and authorization method.

### Required Security Configuration

Your cluster must use one of these configurations:

**Option 1: Microsoft Entra ID authentication with Azure RBAC**
```bash
az aks update -g "$RESOURCE_GROUP" -n "$CLUSTER_NAME" \
  --enable-aad \
  --enable-azure-rbac
```

**Option 2: Microsoft Entra ID authentication with Kubernetes RBAC**
```bash
az aks update -g "$RESOURCE_GROUP" -n "$CLUSTER_NAME" \
  --enable-aad
```

#### Using Azure Portal

1. Navigate to the [Azure Portal](https://portal.azure.com)
2. Go to **Kubernetes services** and select your AKS cluster
3. In the left menu, click **Authentication and authorization**
4. Under **Authentication method**, select **Microsoft Entra ID**
5. Under **Authorization**, choose either:
   - **Azure RBAC** (recommended for most scenarios)
   - **Kubernetes RBAC** (if you prefer Kubernetes-native RBAC)
6. Click **Save** to apply the changes

## Step 2: Enable OIDC Provider and Workload Identity

Enable the OIDC issuer and Workload Identity on your AKS cluster:

#### Using Azure CLI

```bash
az aks update -g "$RESOURCE_GROUP" -n "$CLUSTER_NAME" \
  --enable-oidc-issuer \
  --enable-workload-identity
```

#### Using Azure Portal

1. In your AKS cluster page, go to **Settings** → **Security**
2. Under **Workload Identity**, toggle **Enable workload identity** to **Enabled**
3. Under **OIDC Issuer**, toggle **Enable OIDC issuer** to **Enabled**
4. Click **Save** to apply the changes
5. After saving, note down the **OIDC Issuer URL** displayed - you'll need this for federated credentials

### Retrieve the OIDC Issuer URL

Get the OIDC issuer URL, which you'll need for configuring federated credentials:

#### Using Azure CLI

```bash
OIDC_ISSUER_URL=$(az aks show -g "$RESOURCE_GROUP" -n "$CLUSTER_NAME" --query "oidcIssuerProfile.issuerUrl" -o tsv)
echo "OIDC Issuer URL: $OIDC_ISSUER_URL"
```

#### Using Azure Portal

1. In your AKS cluster page, go to **Settings** → **Security**
2. Under **OIDC Issuer**, copy the **Issuer URL** value
3. Save this URL - you'll need it when configuring federated credentials

## Step 3: Create Managed Identity

Create an Azure managed identity that will be used by your GitOps agent:

```bash
IDENTITY_NAME="gitops-managed-identity"
az identity create --name "$IDENTITY_NAME" --resource-group "$RESOURCE_GROUP"
```

#### Using Azure Portal

1. In the Azure Portal, search for **Managed Identities** and select it
2. Click **+ Create** to create a new managed identity
3. Fill in the details:
   - **Subscription**: Select your subscription
   - **Resource group**: Select your resource group
   - **Region**: Select the same region as your AKS cluster
   - **Name**: Enter `gitops-managed-identity` (or your preferred name)
4. Click **Review + create**, then **Create**
5. Once created, click **Go to resource**

### Get Client ID and Tenant ID

Retrieve the client ID and tenant ID that you'll need for the service account annotations:

```bash
# Get Client ID from the managed identity
CLIENT_ID=$(az identity show --name "$IDENTITY_NAME" --resource-group "$RESOURCE_GROUP" --query clientId -o tsv)
echo "Client ID: $CLIENT_ID"

# Get Tenant ID from your Azure subscription
TENANT_ID=$(az account show --query tenantId -o tsv)
echo "Tenant ID: $TENANT_ID"
```

**Reference Documentation:**
- [Get Client ID from Managed Identity](https://learn.microsoft.com/en-us/azure/aks/use-managed-identity)
- [Get Tenant ID](https://learn.microsoft.com/en-us/azure/azure-portal/get-subscription-tenant-id)

#### Getting Client ID and Tenant ID via Portal

**To get Client ID:**
1. In your managed identity page, go to **Overview**
2. Copy the **Client ID** value
3. Save this value - you'll need it for service account annotations

**To get Tenant ID:**
1. In the Azure Portal, click on your profile icon (top right)
2. Click **Switch directory** or go to **Microsoft Entra ID**
3. In the **Overview** page, copy the **Tenant ID** value
4. Alternatively, you can find it in your subscription details

## Step 4: Download and Modify GitOps Agent YAML

Before you can configure workload identity authentication, you need to download the GitOps agent YAML from Harness and make specific modifications to it.

### Download GitOps Agent YAML from Harness

First, let's get the agent YAML file from your Harness account:

1. **Log in to your Harness account** and navigate to the GitOps module
2. Go to **GitOps** → **Settings** → **GitOps Agents**
3. Click **+ New GitOps Agent**
4. Fill in the agent details:
   - **Name**: Enter a descriptive name for your agent (e.g., `azure-wif-agent`)
   - **Agent Type**: Select **Argo CD**
   - **Namespace**: Enter `argocd` (this must match the namespace in your federated credentials)
5. Click **Continue** or **Next**
6. **Download the agent YAML file** - this will be a file named something like `gitops-agent.yaml`
7. **Save the file locally** - you'll need to edit it before applying to your cluster

:::important
Do NOT apply the agent YAML to your cluster yet. You must first modify it with the workload identity annotations as described in the next steps.
:::

### Modify the Application Controller Service Account

Now that you have the agent YAML file, you need to modify it to include workload identity annotations.

**Step 1: Open the downloaded YAML file** in your preferred text editor.

**Step 2: Find the Application Controller Service Account section.** Look for this section in the file:

```yaml
# Source: gitops-helm/charts/argo-cd/templates/argocd-application-controller/serviceaccount.yaml
apiVersion: v1
kind: ServiceAccount
automountServiceAccountToken: true
metadata:
  annotations:
    azure.workload.identity/client-id: your-client-id
    azure.workload.identity/tenant-id: your-tenant-id
  name: argocd-application-controller
  namespace: argocd
  labels:
    # ... existing labels
```

**Step 3: Add the required annotations** to the `metadata.annotations` section:
- `azure.workload.identity/client-id`: Replace `your-client-id` with the Client ID from Step 3
- `azure.workload.identity/tenant-id`: Replace `your-tenant-id` with the Tenant ID from Step 3

### Add Workload Identity Label to Repo Server

**Step 4: Find the Repo Server Deployment section.** Look for this section in the same YAML file:

```yaml
# Source: gitops-helm/charts/argo-cd/templates/argocd-repo-server/deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: argocd-repo-server
  namespace: argocd
  # ... other metadata
spec:
  template:
    metadata:
      annotations:
        # ... existing annotations
      labels:
        azure.workload.identity/use: "true"
        # ... existing labels
```

**Step 5: Add the workload identity label** to the `spec.template.metadata.labels` section:
- Add `azure.workload.identity/use: "true"`

This setting allows the repo server to use the workload identity.

### Verify Your Modifications

Before proceeding, double-check that you've made these changes:
- Added `azure.workload.identity/client-id` annotation with your actual Client ID
- Added `azure.workload.identity/tenant-id` annotation with your actual Tenant ID  
- Added `azure.workload.identity/use: "true"` label to the repo server deployment
- Saved the modified YAML file

:::tip
Keep the original downloaded file as a backup in case you need to start over with the modifications.
:::

## Step 5: Configure Federated Credentials

Create federated credentials to allow the service account to use the managed identity.

### Navigate to Managed Identity

1. In the Azure portal, go to **Managed Identities**
2. Select the identity you created earlier (`gitops-managed-identity`)
3. Go to **Settings** → **Federated credentials**
4. Click **Add credential**

### Configure Federated Credential

Fill in the following details:

- **Federated credential scenario**: Select "Kubernetes accessing Azure resources"
- **Cluster issuer URL**: Use the OIDC issuer URL from Step 2
- **Namespace**: `argocd` (the namespace where you're deploying your GitOps application)
- **Service account**: `argocd-application-controller` (must match the service account name in your agent YAML)
- **Name**: `harness-gitops-federated-credential` (or any descriptive name)

Alternatively, use the Azure CLI:

```bash
az identity federated-credential create \
  --name "harness-gitops-federated-credential" \
  --identity-name "$IDENTITY_NAME" \
  --resource-group "$RESOURCE_GROUP" \
  --issuer "$OIDC_ISSUER_URL" \
  --subject "system:serviceaccount:argocd:argocd-application-controller"
```

## Step 6: Deploy the GitOps Agent

Apply the modified GitOps agent YAML to your cluster:

```bash
kubectl apply -f gitops-agent.yaml
```

### Verify Agent Health

Wait for the agent to become healthy:

```bash
kubectl get pods -n argocd
```

Check that all pods are running and the agent shows as **Healthy** in the Harness UI.

## Step 7: Create Cluster Secret

Create a Kubernetes secret that defines how to connect to your cluster using workload identity authentication.

### Prepare Cluster Information

Get your cluster's API server endpoint and CA certificate:

```bash
# Get cluster endpoint
CLUSTER_ENDPOINT=$(az aks show -g "$RESOURCE_GROUP" -n "$CLUSTER_NAME" --query fqdn -o tsv)
echo "Cluster endpoint: https://$CLUSTER_ENDPOINT"

# Get CA certificate (base64 encoded)
CA_CERT=$(az aks get-credentials -g "$RESOURCE_GROUP" -n "$CLUSTER_NAME" --file - | grep certificate-authority-data | awk '{print $2}')
echo "CA Certificate: $CA_CERT"
```

### Create the Secret YAML

Create a secret YAML file with the following content:

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: gitops-cluster-secret
  namespace: argocd
  labels:
    argocd.argoproj.io/secret-type: cluster
type: Opaque
stringData:
  name: azure-wif-cluster
  server: https://your-cluster-endpoint
  config: |
    {
      "execProviderConfig": {
        "command": "argocd-k8s-auth",
        "env": {
          "AAD_ENVIRONMENT_NAME": "AzurePublicCloud",
          "AZURE_CLIENT_ID": "your-client-id",
          "AAD_LOGIN_METHOD": "workloadidentity"
        },
        "args": ["azure"],
        "apiVersion": "client.authentication.k8s.io/v1beta1"
      },
      "tlsClientConfig": {
        "insecure": false,
        "caData": "your-base64-encoded-ca-cert"
      }
    }
```

Replace the following values:
- `your-cluster-endpoint`: Your cluster's API server endpoint
- `your-client-id`: The client ID from your managed identity
- `your-base64-encoded-ca-cert`: The base64-encoded CA certificate

### Apply the Secret

```bash
kubectl apply -f cluster-secret.yaml
```

### Verify the Secret

Check that the secret was created correctly:

```bash
kubectl get secret gitops-cluster-secret -n argocd -o yaml
```

## Step 8: Verify Setup in Harness UI

### Check Cluster Status

1. Navigate to **GitOps** → **Settings** → **Clusters** in your Harness account
2. You should see your cluster listed with a **Healthy** status
3. The cluster should show as **Connected**

### Troubleshoot if Not Healthy

If the cluster doesn't appear healthy:

1. **Verify Agent Status**: Ensure all GitOps agent pods are running
2. **Check Service Account Annotations**: Verify the client ID and tenant ID are correct
3. **Validate Federated Credentials**: Ensure the issuer URL and subject match your configuration
4. **Review Secret Configuration**: Check that the cluster secret has the correct endpoint and authentication details