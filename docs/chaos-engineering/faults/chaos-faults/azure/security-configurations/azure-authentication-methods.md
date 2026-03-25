---
id: azure-authentication-methods
title: Azure authentication methods for chaos faults
sidebar_position: 2
---

This guide describes the supported methods for authenticating Azure chaos faults to the Azure Resource Manager API. Choose the method that best fits your security requirements and infrastructure setup.

## Overview

Azure chaos faults support the following authentication methods, listed in order of priority:

| Method | Secrets required | Best for |
|--------|-----------------|----------|
| [Service principal](#service-principal) | Client secret (client secret json file) | Harness Secret Manager |
| [Workload identity](#workload-identity-recommended) | None (federated token) | **AKS (recommended)** |
| [Managed identity](#managed-identity) | None | Azure-hosted VMs/VMSS/AKS where node-level identity is acceptable |

When no service principal authentication is configured, the fault uses Azure's `DefaultAzureCredential`, which automatically tries workload identity and managed identity in order.

---

## Service principal

This method uses an Azure service principal with client secret authentication stored as a JSON file in Harness Secret Manager.

### Prerequisites

1. Create a service principal:

  ```bash
  az ad sp create-for-rbac --name "harness-chaos-sp"
  ```

  Note the `appId`, `password`, and `tenant` from the output.

2. Assign the required role to the service principal:

  ```bash
  az role assignment create \
    --assignee <APP_ID> \
    --role "<ROLE_NAME>" \
    --scope /subscriptions/<SUBSCRIPTION_ID>
  ```

  Refer to [fault permissions](/docs/chaos-engineering/faults/chaos-faults/azure/security-configurations/fault-permissions) for the minimum permissions required per fault.

### Steps

1. Create a JSON file with the service principal credentials. You can either:

   **Option A:** Generate the file automatically (legacy SDK format):
   ```bash
   az ad sp create-for-rbac --sdk-auth > azure.auth
   ```

   **Option B:** Manually create the JSON file with the following structure:
   ```json
   {
     "clientId": "<APP_ID>",
     "clientSecret": "<PASSWORD>",
     "subscriptionId": "<SUBSCRIPTION_ID>",
     "tenantId": "<TENANT_ID>",
     "activeDirectoryEndpointUrl": "https://login.microsoftonline.com",
     "resourceManagerEndpointUrl": "https://management.azure.com/",
     "activeDirectoryGraphResourceId": "https://graph.windows.net/",
     "sqlManagementEndpointUrl": "https://management.core.windows.net:8443/",
     "galleryEndpointUrl": "https://gallery.azure.com/",
     "managementEndpointUrl": "https://management.core.windows.net/"
   }
   ```

   :::info
   Only `clientId`, `clientSecret`, `subscriptionId`, and `tenantId` are required. The endpoint URLs can use the default values shown above for Azure public cloud.
   :::

   :::note
   If you already have the service principal credentials (`appId`, `password`, `tenantId`, and `subscriptionId`) from the prerequisites step, you can directly create the JSON file using Option B and upload it to Harness Secret Manager without generating it via Azure CLI.
   :::

2. Upload the JSON file as a secret file in Harness Secret Manager:
   - Navigate to your Harness project's secrets section
   - Create a new **File Secret**
   - Upload the JSON file (e.g., `azure.auth`)
   - Note the secret identifier for reference in your chaos experiment

### How it works

The fault reads the JSON file at the path specified by `AZURE_AUTH_LOCATION`, extracts `clientId`, `clientSecret`, and `tenantId`, and authenticates using `ClientSecretCredential`. The `subscriptionId` is also read from the same file.

---

## Workload identity (recommended)

Workload identity is the recommended method for AKS-hosted chaos experiments. It uses federated tokens instead of secrets, providing pod-level identity isolation without storing credentials.

### Prerequisites

- An AKS cluster with **OIDC issuer** and **workload identity add-on** enabled.
- An Azure AD app registration with a **federated identity credential**.
- A Kubernetes ServiceAccount annotated for workload identity.

### Step 1: Enable OIDC issuer on the AKS cluster

For a new cluster:

```bash
az aks create \
  --resource-group <RESOURCE_GROUP> \
  --name <CLUSTER_NAME> \
  --enable-oidc-issuer \
  --enable-workload-identity \
  --location <REGION>
```

For an existing cluster:

```bash
az aks update \
  --resource-group <RESOURCE_GROUP> \
  --name <CLUSTER_NAME> \
  --enable-oidc-issuer \
  --enable-workload-identity
```

Retrieve the OIDC issuer URL (needed in Step 3):

```bash
az aks show \
  --resource-group <RESOURCE_GROUP> \
  --name <CLUSTER_NAME> \
  --query "oidcIssuerProfile.issuerUrl" \
  --output tsv
```

### Step 2: Create an Azure AD app registration

Create the app registration and service principal:

```bash
az ad app create --display-name "harness-chaos-workload-identity"
az ad sp create --id <APP_ID>
```

Assign the required role:

```bash
az role assignment create \
  --assignee <APP_ID> \
  --role "<ROLE_NAME>" \
  --scope /subscriptions/<SUBSCRIPTION_ID>
```

### Step 3: Create the federated identity credential

This links the Kubernetes ServiceAccount to the Azure AD app registration:

```bash
az ad app federated-credential create \
  --id <APP_ID> \
  --parameters '{
    "name": "harness-chaos-federated-cred",
    "issuer": "<OIDC_ISSUER_URL>",
    "subject": "system:serviceaccount:<NAMESPACE>:<SERVICE_ACCOUNT_NAME>",
    "audiences": ["api://AzureADTokenExchange"],
    "description": "Federated credential for Harness chaos fault pods"
  }'
```

Replace:
- `<OIDC_ISSUER_URL>` with the URL from Step 1.
- `<NAMESPACE>` with the Kubernetes namespace where chaos experiments run (for example, `hce`).
- `<SERVICE_ACCOUNT_NAME>` with the ServiceAccount name the chaos pod uses (for example, `litmus`).

### Step 4: Configure the Kubernetes ServiceAccount

Add the required annotations and labels to the chaos infrastructure configuration:
- Add the annotation `azure.workload.identity/client-id: "<APP_ID>"` 
- Add the label `azure.workload.identity/use: "true"`

These will be applied to the chaos experiment pods by the chaos infrastructure.

:::note
If you are using a custom service account for your chaos experiments, you need to update that ServiceAccount with the following configuration:

```yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: <SERVICE_ACCOUNT_NAME>
  namespace: <NAMESPACE>
  annotations:
    azure.workload.identity/client-id: "<APP_ID>"
  labels:
    azure.workload.identity/use: "true"
```
:::

### Step 5: Set the subscription ID

Set the `AZURE_SUBSCRIPTION_ID` environment variable to the target subscription ID in your chaos experiment configuration.

:::info
The chaos infrastructure automatically applies the ServiceAccount, annotations, and labels configured in Step 4 to the chaos experiment pods. You do not need to manually configure these settings for each experiment.
:::

Once the pod is created with the configured annotations and labels, the AKS workload identity webhook automatically injects the following into the pod:
- `AZURE_CLIENT_ID`
- `AZURE_TENANT_ID`
- `AZURE_FEDERATED_TOKEN_FILE`
- A projected service account token volume.

### How it works

When `AZURE_AUTH_LOCATION` is not set, the fault uses `DefaultAzureCredential`. The credential chain detects the injected `AZURE_CLIENT_ID`, `AZURE_TENANT_ID`, and `AZURE_FEDERATED_TOKEN_FILE` environment variables and authenticates using `WorkloadIdentityCredential`. The projected service account token is exchanged for an Azure AD access token through federated identity, with no secrets involved.

### Validation

Deploy a test pod with the configured ServiceAccount and verify the injected environment variables:

```bash
kubectl exec <POD_NAME> -n <NAMESPACE> -- env | grep AZURE
```

Expected output:

```
AZURE_CLIENT_ID=<your-app-id>
AZURE_TENANT_ID=<your-tenant-id>
AZURE_FEDERATED_TOKEN_FILE=/var/run/secrets/azure/tokens/azure-identity-token
AZURE_AUTHORITY_HOST=https://login.microsoftonline.com/
```

---

## Managed identity

Managed identity uses Azure-platform-managed credentials attached to the underlying infrastructure (VM, VMSS, or AKS node pool). No secrets or federated credentials are needed, but the identity is scoped to the node rather than the individual pod.

:::important
When using managed identity:
- Do **not** set Azure credentials in the experiment
- Do **not** add the `azure.workload.identity/use: "true"` label to the chaos infrastructure
- Do **not** add the `azure.workload.identity/client-id` annotation to the chaos infrastructure
:::

### System-assigned managed identity

Uses the identity automatically assigned to the AKS node pool VMSS.

#### Steps

1. Get the kubelet identity object ID:

  ```bash
  KUBELET_ID=$(az aks show \
    --resource-group <AKS_RESOURCE_GROUP> \
    --name <AKS_CLUSTER_NAME> \
    --query "identityProfile.kubeletidentity.objectId" \
    --output tsv)
  ```

2. Assign the required role:

  ```bash
  az role assignment create \
    --assignee-object-id $KUBELET_ID \
    --assignee-principal-type ServicePrincipal \
    --role "<ROLE_NAME>" \
    --scope /subscriptions/<SUBSCRIPTION_ID>
  ```

3. Configure the chaos experiment:
    - Set `AZURE_SUBSCRIPTION_ID` to the target subscription ID in your experiment configuration.
    - Do **not** set `AZURE_AUTH_LOCATION`.
    - Do **not** set `AZURE_CLIENT_ID`, `AZURE_CLIENT_SECRET`, or `AZURE_TENANT_ID`.

### User-assigned managed identity

Uses a specific managed identity that you create and attach to the node pool VMSS.

#### Steps

1. Create the managed identity:

  ```bash
  az identity create \
    --resource-group <RESOURCE_GROUP> \
    --name chaos-managed-identity
  ```

  Note the `clientId` and `principalId` from the output.

2. Assign the required role:

  ```bash
  az role assignment create \
    --assignee <PRINCIPAL_ID> \
    --assignee-principal-type ServicePrincipal \
    --role "<ROLE_NAME>" \
    --scope /subscriptions/<SUBSCRIPTION_ID>
  ```

3. Attach the identity to the AKS node pool VMSS:

  ```bash
  NODE_RG=$(az aks show \
    --resource-group <AKS_RESOURCE_GROUP> \
    --name <AKS_CLUSTER_NAME> \
    --query "nodeResourceGroup" \
    --output tsv)

  VMSS_NAME=$(az vmss list \
    --resource-group $NODE_RG \
    --query "[0].name" \
    --output tsv)

  az vmss identity assign \
    --resource-group $NODE_RG \
    --name $VMSS_NAME \
    --identities <FULL_RESOURCE_ID_OF_MANAGED_IDENTITY>
  ```

4. Configure the chaos experiment:
    - Set `AZURE_SUBSCRIPTION_ID` to the target subscription ID in your experiment configuration.
    - (Optional) Set `AZURE_CLIENT_ID` to the managed identity's client ID - only required if you have multiple user-assigned identities attached to the node and need to specify which one to use.
    - Do **not** set `AZURE_AUTH_LOCATION`, `AZURE_CLIENT_SECRET`, or `AZURE_FEDERATED_TOKEN_FILE`.

### How it works

When `AZURE_AUTH_LOCATION` is not set and no workload identity environment variables are present, `DefaultAzureCredential` falls through to `ManagedIdentityCredential`. It contacts the Azure Instance Metadata Service (IMDS) on the node to obtain an access token.

- **System-assigned identity**: Automatically uses the system-assigned identity without any additional configuration.
- **User-assigned identity**: If `AZURE_CLIENT_ID` is provided, it selects that specific identity. If not provided and only one user-assigned identity exists on the node, it automatically uses that identity.

:::caution
Managed identity operates at the node level. Any pod running on the same node can potentially use the same identity. For production environments requiring pod-level isolation, use [workload identity](#workload-identity-recommended) instead.
:::

---

## Credential resolution order

The following diagram shows the order in which the fault resolves credentials:

```
AZURE_AUTH_LOCATION set and file exists?
├── Yes → File-based ClientSecretCredential
│         (reads clientId, clientSecret, tenantId from JSON file)
└── No  → DefaultAzureCredential chain:
          1. WorkloadIdentityCredential
          2. ManagedIdentityCredential
```

:::info
`AZURE_SUBSCRIPTION_ID` is required for all methods except file-based authentication (where it can be read from the auth file). Always set this environment variable when using workload identity or managed identity.
:::


