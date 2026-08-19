---
title: Add a Microsoft Azure connector
sidebar_label: Microsoft Azure Connector
description: Connect Harness to your Azure accounts and services for artifact pulls, infrastructure provisioning, and application deployments.
sidebar_position: 3
keywords:
  - Azure connector
  - AKS
  - ACR
  - Azure Web Apps
  - ARM
  - Blueprint
  - OIDC
  - managed identity
  - service principal
tags:
  - Azure
  - connectors
  - platform
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<style>
{`
  .tabs--full-width {
    width: 100%;
  }
  .tabs--full-width .tabs__item {
    flex: 1;
    text-align: center;
    justify-content: center;
  }
`}
</style>

Use the Microsoft Azure connector to connect Harness to your Azure accounts and services. With this connector, Harness pipelines can pull artifacts from Azure Container Registry (ACR), provision infrastructure with Azure Resource Manager (ARM) and Azure Blueprints, and deploy applications to Azure Kubernetes Service (AKS), Azure Web Apps, Azure App Service Environments, and virtual machines using SSH or WinRM.

Use the Azure Repos connector to <a href="/docs/platform/connectors/code-repositories/connect-to-a-azure-repo" target="_blank" rel="noopener noreferrer">connect to Azure SCM repositories</a>.

:::note

If you use Harness Cloud Cost Management (CCM), go to <a href="/docs/cloud-cost-management/get-started/onboarding-guide/set-up-cost-visibility-for-azure" target="_blank" rel="noopener noreferrer">Set up Cloud Cost Management for Azure</a> to configure the Azure connector for CCM.

:::

---

## What will you learn in this topic?

- How to [install the kubelogin plugin](#install-the-kubelogin-client-go-credential-exec-plugin-on-the-delegate) on a delegate for AKS authentication using Kubernetes 1.22 and later.
- How to configure [roles and permissions](#roles-permissions-and-cluster-requirements) for ACR, AKS, Azure Web Apps, ARM, and Blueprints.
- How to [add an Azure connector](#add-an-azure-connector) at the account, org, or project scope.
- How to [configure credentials](#configure-credentials) using Service Principal, OIDC authentication, or inherited delegate credentials.
- How to [select a connectivity mode](#select-connectivity-mode) and complete the connector setup.

---

## Before you begin

- **Azure subscription**: Owner or Contributor access on the subscription or resource group where you want Harness to operate.
- **Microsoft Entra ID**: Permission to create App Registrations or Managed Identities and assign roles. Go to <a href="https://docs.microsoft.com/en-us/azure/active-directory/develop/howto-create-service-principal-portal" target="_blank" rel="noopener noreferrer">Create a Microsoft Entra application and service principal</a> to understand the required setup.
- **Harness delegate**: A running Harness delegate connected to your Azure environment for delegate-based connectivity. Go to <a href="/docs/platform/delegates/install-delegates/overview" target="_blank" rel="noopener noreferrer">Delegate installation overview</a> to install one.
- **Harness account ID** (OIDC only): Navigate to **Account Settings** in Harness to find your account ID.

---

## Auth Provider API and TokenRequest API options

Harness supports both the Auth Provider API and the TokenRequest API for AKS authentication.

<details>
<summary>Auth Provider API vs. TokenRequest API</summary>

In Kubernetes 1.22, the Auth Provider API was deprecated and replaced with the TokenRequest API. The TokenRequest API lets client libraries and tools request an authentication token from the Kubernetes API server dynamically, based on audience, scopes, and other parameters.

The key advantages of the TokenRequest API are finer-grained control over authentication and easier integration with external identity providers such as OAuth 2.0 providers.

</details>

To select which API to use:

- **Auth Provider API**: the current default. You do not have to change the default settings of Harness connectors or the Harness delegates you use.
- **TokenRequest API**: you must install the provider-specific plugin on the Harness delegate to use the TokenRequest API introduced in Kubernetes 1.22.

---

### Install the kubelogin client-go credential (exec) plugin on the delegate

When using the Harness Azure connector with Kubernetes version 1.22 or later, you can use the **kubelogin** client-go credential plugin to authenticate to an AKS cluster.

The Azure connector supports four authentication types. Install the following dependencies on the Harness delegates you use, or Harness will fall back to the Auth Provider API format.

- **Secret** (`SERVICE_PRINCIPAL_SECRET`): kubelogin binary.
- **Certificate** (`SERVICE_PRINCIPAL_CERT`): kubelogin binary and Azure CLI (required because kubelogin does not support PEM format certificates).
- **System Assigned Managed Identity** (`MANAGED_IDENTITY_SYSTEM_ASSIGNED`): kubelogin binary.
- **User Assigned Managed Identity** (`MANAGED_IDENTITY_USER_ASSIGNED`): kubelogin binary.

**Secret** and **Certificate** are available when you select **Specify credentials here**. **System Assigned Managed Identity** and **User Assigned Managed Identity** are available when you select **Use the credentials of a specific Harness Delegate**.

Perform the following steps to install kubelogin on the delegate using an immutable delegate image and `INIT_SCRIPT`:

<details>
<summary>RHEL 7</summary>

```bash
# Install dependencies
microdnf install --nodocs openssl util-linux unzip python2 && microdnf clean all

# Download kubelogin
curl https://github.com/Azure/kubelogin/releases/download/v0.0.27/kubelogin-linux-amd64.zip -L -o kubelogin.zip
unzip kubelogin.zip
chmod 755 /opt/harness-delegate/bin/linux_amd64/kubelogin

# Add the binary to PATH
mv ./bin/linux_amd64/kubelogin /usr/local/bin

# If the AKS cloud provider auth type is Certificate, install azure-cli
# because kubelogin does not support PEM format
rpm --import https://packages.microsoft.com/keys/microsoft.asc
echo -e "[azure-cli]
name=Azure CLI
baseurl=https://packages.microsoft.com/yumrepos/azure-cli
enabled=1
gpgcheck=1
gpgkey=https://packages.microsoft.com/keys/microsoft.asc" | tee /etc/yum.repos.d/azure-cli.repo
microdnf install azure-cli
```

</details>

<details>
<summary>Ubuntu</summary>

```bash
# Download kubelogin
curl https://github.com/Azure/kubelogin/releases/download/v0.0.27/kubelogin-linux-amd64.zip -L -o kubelogin.zip
unzip kubelogin.zip
chmod 755 /opt/harness-delegate/bin/linux_amd64/kubelogin

# Add the binary to PATH
mv ./bin/linux_amd64/kubelogin /usr/local/bin

# If the AKS cloud provider auth type is Certificate, install azure-cli
curl -sL https://aka.ms/InstallAzureCLIDeb | bash
```

</details>

Go to <a href="https://github.com/Azure/kubelogin/releases" target="_blank" rel="noopener noreferrer">kubelogin releases</a> on Azure and <a href="/docs/platform/delegates/install-delegates/overview" target="_blank" rel="noopener noreferrer">Delegate installation overview</a> for further details.

---

## Roles, permissions, and cluster requirements

This section covers the minimum Azure Role-Based Access Control (RBAC) roles and cluster configuration required for each Azure service. This section assumes you are familiar with Azure RBAC. Go to <a href="https://docs.microsoft.com/en-us/azure/role-based-access-control/role-assignments-portal" target="_blank" rel="noopener noreferrer">Assign Azure roles using the Azure portal</a> for a refresher.

For security reasons, Harness uses an application object and service principal rather than a user identity. Go to <a href="https://docs.microsoft.com/en-us/azure/active-directory/develop/howto-create-service-principal-portal" target="_blank" rel="noopener noreferrer">Create a Microsoft Entra application and service principal that can access resources</a> for details.

<div align="center"><DocImage path={require('../static/add-a-microsoft-azure-connector-64.png')} alt="Azure RBAC hierarchy showing that Resources are managed by Resource groups, which are in turn managed by Subscriptions, and all of these are under a Management group." width="80%" /></div>

### ACR role requirements

The Azure connector you use to connect Harness to ACR must have the **Reader** role at minimum. You can also use a custom role that includes the Reader permissions.

The following tabs describe the Reader role requirements and a sample custom role definition.

<Tabs className="tabs--full-width">
  <TabItem value="reader" label="Reader role" default>

Assign the **Reader** role at the **Subscription** or **Resource Group** level for the Application (client) ID used in the Azure connector. The application must have permission to list all container registries.

<div align="center"><DocImage path={require('../static/add-a-microsoft-azure-connector-65.png')} alt="ACR Reader role assignment in the Azure portal showing the Subscription scope." width="80%" /></div>

:::tip

- Do not assign the **Reader** role in a different IAM section of Azure.
- Do not assign only the **AcrPull** role instead of **Reader**. AcrPull grants access to a specific registry, but Harness requires the Reader role to list all registries.

:::

  </TabItem>
  <TabItem value="custom" label="Custom role">

The following permissions are required for any Service Principal or Managed Identity user, regardless of whether you use Kubernetes RBAC or Azure RBAC:

- `Microsoft.ContainerRegistry/registries/read`
- `Microsoft.ContainerRegistry/registries/builds/read`
- `Microsoft.ContainerRegistry/registries/metadata/read`
- `Microsoft.ContainerRegistry/registries/pull/read`
- `Microsoft.ContainerService/managedClusters/read`
- `Microsoft.ContainerService/managedClusters/listClusterUserCredential/action`
- `Microsoft.Resource/subscriptions/resourceGroup/read`

For Helm deployments, Helm version 3.2.0 or later is required and the `HELM_VERSION_3_8_0` feature flag must be enabled.

You cannot use Pod Assigned Managed Identity and System Assigned Managed Identity on the same cluster.

The following JSON creates a custom role with the required permissions. Replace `xxxx` with your role name, subscription ID, and resource group ID.

```json
{
    "id": "/subscriptions/xxxx/providers/Microsoft.Authorization/roleDefinitions/xxxx",
    "properties": {
        "roleName": "xxxx",
        "description": "",
        "assignableScopes": [
            "/subscriptions/xxxx/resourceGroups/xxxx"
        ],
        "permissions": [
            {
                "actions": [],
                "notActions": [],
                "dataActions": [
                    "Microsoft.ContainerService/managedClusters/configmaps/read",
                    "Microsoft.ContainerService/managedClusters/configmaps/write",
                    "Microsoft.ContainerService/managedClusters/configmaps/delete",
                    "Microsoft.ContainerService/managedClusters/secrets/read",
                    "Microsoft.ContainerService/managedClusters/secrets/write",
                    "Microsoft.ContainerService/managedClusters/secrets/delete",
                    "Microsoft.ContainerService/managedClusters/apps/deployments/read",
                    "Microsoft.ContainerService/managedClusters/apps/deployments/write",
                    "Microsoft.ContainerService/managedClusters/apps/deployments/delete",
                    "Microsoft.ContainerService/managedClusters/events/read",
                    "Microsoft.ContainerService/managedClusters/events/write",
                    "Microsoft.ContainerService/managedClusters/events/delete",
                    "Microsoft.ContainerService/managedClusters/namespaces/read",
                    "Microsoft.ContainerService/managedClusters/nodes/read",
                    "Microsoft.ContainerService/managedClusters/pods/read",
                    "Microsoft.ContainerService/managedClusters/pods/write",
                    "Microsoft.ContainerService/managedClusters/pods/delete",
                    "Microsoft.ContainerService/managedClusters/services/read",
                    "Microsoft.ContainerService/managedClusters/services/write",
                    "Microsoft.ContainerService/managedClusters/services/delete",
                    "Microsoft.ContainerService/managedClusters/apps/statefulsets/read",
                    "Microsoft.ContainerService/managedClusters/apps/statefulsets/write",
                    "Microsoft.ContainerService/managedClusters/apps/statefulsets/delete",
                    "Microsoft.ContainerService/managedClusters/apps/replicasets/read",
                    "Microsoft.ContainerService/managedClusters/apps/replicasets/write",
                    "Microsoft.ContainerService/managedClusters/apps/replicasets/delete"
                ],
                "notDataActions": []
            }
        ]
    }
}
```

  </TabItem>
</Tabs>

:::note

Harness supports up to 500 images from an ACR repo. If you do not see all your images, you may have exceeded this limit due to an Azure API restriction. If you connect to ACR via the platform-agnostic <a href="/docs/platform/connectors/cloud-providers/ref-cloud-providers/docker-registry-connector-settings-reference" target="_blank" rel="noopener noreferrer">Docker connector</a>, the limit is 100.

:::

---

### Azure Web App role requirements

The Azure connector used to connect to Azure Web Apps with Service Principal or Managed Identity credentials must have the **Contributor** role at minimum. You can also use a custom role that includes the Contributor permissions.

The following tabs describe the Contributor role permissions and a sample custom role definition.

<Tabs className="tabs--full-width">
  <TabItem value="contrib" label="Contributor permissions" default>

The following are the Azure RBAC permissions used for System Assigned Managed Identity to perform Azure Web App deployments for container and non-container artifacts:

```json
[
    "microsoft.web/sites/slots/deployments/read",
    "Microsoft.Web/sites/Read",
    "Microsoft.Web/sites/config/Read",
    "Microsoft.Web/sites/slots/config/Read",
    "microsoft.web/sites/slots/config/appsettings/read",
    "Microsoft.Web/sites/slots/*/Read",
    "Microsoft.Web/sites/slots/config/list/Action",
    "Microsoft.Web/sites/slots/stop/Action",
    "Microsoft.Web/sites/slots/start/Action",
    "Microsoft.Web/sites/slots/config/Write",
    "Microsoft.Web/sites/slots/Write",
    "microsoft.web/sites/slots/containerlogs/action",
    "Microsoft.Web/sites/config/Write",
    "Microsoft.Web/sites/slots/slotsswap/Action",
    "Microsoft.Web/sites/config/list/Action",
    "Microsoft.Web/sites/start/Action",
    "Microsoft.Web/sites/stop/Action",
    "Microsoft.Web/sites/Write",
    "microsoft.web/sites/containerlogs/action",
    "Microsoft.Web/sites/publish/Action",
    "Microsoft.Web/sites/slots/publish/Action"
]
```

  </TabItem>
  <TabItem value="custom" label="Custom role">

The following permissions are required for any Service Principal or Managed Identity user, regardless of whether you use Kubernetes RBAC or Azure RBAC:

- `Microsoft.ContainerRegistry/registries/read`
- `Microsoft.ContainerRegistry/registries/builds/read`
- `Microsoft.ContainerRegistry/registries/metadata/read`
- `Microsoft.ContainerRegistry/registries/pull/read`
- `Microsoft.ContainerService/managedClusters/read`
- `Microsoft.ContainerService/managedClusters/listClusterUserCredential/action`
- `Microsoft.Resource/subscriptions/resourceGroup/read`

For Helm deployments, Helm version 3.2.0 or later is required and the `HELM_VERSION_3_8_0` feature flag must be enabled.

You cannot use Pod Assigned Managed Identity and System Assigned Managed Identity on the same cluster.

Replace `xxxx` with your role name, subscription ID, and resource group ID.

```json
{
    "id": "/subscriptions/xxxx/providers/Microsoft.Authorization/roleDefinitions/xxxx",
    "properties": {
        "roleName": "xxxx",
        "description": "",
        "assignableScopes": [
            "/subscriptions/xxxx/resourceGroups/xxxx"
        ],
        "permissions": [
            {
                "actions": [],
                "notActions": [],
                "dataActions": [
                    "Microsoft.ContainerService/managedClusters/configmaps/read",
                    "Microsoft.ContainerService/managedClusters/configmaps/write",
                    "Microsoft.ContainerService/managedClusters/configmaps/delete",
                    "Microsoft.ContainerService/managedClusters/secrets/read",
                    "Microsoft.ContainerService/managedClusters/secrets/write",
                    "Microsoft.ContainerService/managedClusters/secrets/delete",
                    "Microsoft.ContainerService/managedClusters/apps/deployments/read",
                    "Microsoft.ContainerService/managedClusters/apps/deployments/write",
                    "Microsoft.ContainerService/managedClusters/apps/deployments/delete",
                    "Microsoft.ContainerService/managedClusters/events/read",
                    "Microsoft.ContainerService/managedClusters/events/write",
                    "Microsoft.ContainerService/managedClusters/events/delete",
                    "Microsoft.ContainerService/managedClusters/namespaces/read",
                    "Microsoft.ContainerService/managedClusters/nodes/read",
                    "Microsoft.ContainerService/managedClusters/pods/read",
                    "Microsoft.ContainerService/managedClusters/pods/write",
                    "Microsoft.ContainerService/managedClusters/pods/delete",
                    "Microsoft.ContainerService/managedClusters/services/read",
                    "Microsoft.ContainerService/managedClusters/services/write",
                    "Microsoft.ContainerService/managedClusters/services/delete",
                    "Microsoft.ContainerService/managedClusters/apps/statefulsets/read",
                    "Microsoft.ContainerService/managedClusters/apps/statefulsets/write",
                    "Microsoft.ContainerService/managedClusters/apps/statefulsets/delete",
                    "Microsoft.ContainerService/managedClusters/apps/replicasets/read",
                    "Microsoft.ContainerService/managedClusters/apps/replicasets/write",
                    "Microsoft.ContainerService/managedClusters/apps/replicasets/delete"
                ],
                "notDataActions": []
            }
        ]
    }
}
```

  </TabItem>
</Tabs>

---

### Connect Harness to Azure Kubernetes Service (AKS)

There are three options for connecting Harness to an AKS cluster. Each option differs in the type of credentials required and the delegate placement.

- [Platform-agnostic Kubernetes cluster connector](./add-a-kubernetes-cluster-connector.md): install a Kubernetes delegate in the target AKS cluster and use the delegate's credentials. No Azure Service Principal or Managed Identity credentials are required.
- [Microsoft Azure connector with a Kubernetes delegate](#configure-credentials): install a Kubernetes delegate in the AKS cluster. Provide the Azure environment and, for User Assigned Managed Identity, the Application (client) ID. You can create a connector referencing a non-existent delegate; Harness allows this so you can replace a delegate with one of the same name or tag.
- [Microsoft Azure connector with Service Principal or Managed Identity credentials](#configure-credentials): assign the **Owner** role or an equivalent custom role as described in [AKS role requirements](#aks-role-requirements).

### AKS cluster setup requirements

The following AKS cluster configuration is required to use the Azure connector:

- AKS managed Azure Active Directory (AAD): enabled or disabled.
- Kubernetes RBAC: enabled.
- Azure RBAC: enabled or disabled.

Go to the **Deployments (CD)** section of the <a href="/docs/platform/connectors/cloud-providers/ref-cloud-providers/kubernetes-cluster-connector-settings-reference" target="_blank" rel="noopener noreferrer">Kubernetes cluster connector settings reference</a> for full details.

### AKS role requirements

If you use the Microsoft Azure connector to connect to AKS with Service Principal or Managed Identity credentials, assign the **Owner** role or a custom role that includes the Owner permissions.

The following tabs provide example role definitions for AKS.

<Tabs className="tabs--full-width">
  <TabItem value="custom" label="Custom role" default>

The following permissions are required for any Service Principal or Managed Identity user, regardless of whether you use Kubernetes RBAC or Azure RBAC. Replace `xxxx` with your role name, subscription ID, and resource group ID.

```json
{
    "id": "/subscriptions/xxxx/providers/Microsoft.Authorization/roleDefinitions/xxxx",
    "properties": {
        "roleName": "xxxx",
        "description": "",
        "assignableScopes": [
            "/subscriptions/xxxx/resourceGroups/xxxx"
        ],
        "permissions": [
            {
                "actions": [],
                "notActions": [],
                "dataActions": [
                    "Microsoft.ContainerService/managedClusters/configmaps/read",
                    "Microsoft.ContainerService/managedClusters/configmaps/write",
                    "Microsoft.ContainerService/managedClusters/configmaps/delete",
                    "Microsoft.ContainerService/managedClusters/secrets/read",
                    "Microsoft.ContainerService/managedClusters/secrets/write",
                    "Microsoft.ContainerService/managedClusters/secrets/delete",
                    "Microsoft.ContainerService/managedClusters/apps/deployments/read",
                    "Microsoft.ContainerService/managedClusters/apps/deployments/write",
                    "Microsoft.ContainerService/managedClusters/apps/deployments/delete",
                    "Microsoft.ContainerService/managedClusters/events/read",
                    "Microsoft.ContainerService/managedClusters/events/write",
                    "Microsoft.ContainerService/managedClusters/events/delete",
                    "Microsoft.ContainerService/managedClusters/namespaces/read",
                    "Microsoft.ContainerService/managedClusters/nodes/read",
                    "Microsoft.ContainerService/managedClusters/pods/read",
                    "Microsoft.ContainerService/managedClusters/pods/write",
                    "Microsoft.ContainerService/managedClusters/pods/delete",
                    "Microsoft.ContainerService/managedClusters/services/read",
                    "Microsoft.ContainerService/managedClusters/services/write",
                    "Microsoft.ContainerService/managedClusters/services/delete",
                    "Microsoft.ContainerService/managedClusters/apps/statefulsets/read",
                    "Microsoft.ContainerService/managedClusters/apps/statefulsets/write",
                    "Microsoft.ContainerService/managedClusters/apps/statefulsets/delete",
                    "Microsoft.ContainerService/managedClusters/apps/replicasets/read",
                    "Microsoft.ContainerService/managedClusters/apps/replicasets/write",
                    "Microsoft.ContainerService/managedClusters/apps/replicasets/delete"
                ],
                "notDataActions": []
            }
        ]
    }
}
```

  </TabItem>
  <TabItem value="k8sRbac" label="Kubernetes RBAC example">

The following is an example of Kubernetes RBAC permissions for System Assigned Managed Identity.

```yaml
kind: Role
apiVersion: rbac.authorization.k8s.io/v1
metadata:
  name: cdp-qa-deployer-role
  namespace: cdp-qa-app
rules:
  - apiGroups: ["", "apps"]
    resources: ["pods", "configmaps", "deployments", "secrets", "events", "services", "replicasets", "deployments/scale", "namespaces", "resourcequotas", "limitranges"]
    verbs: ["get", "watch", "list", "create", "update", "patch", "delete"]
---
kind: RoleBinding
apiVersion: rbac.authorization.k8s.io/v1
metadata:
  name: cdp-qa-deployer-role-binding
  namespace: cdp-qa-app
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: Role
  name: cdp-qa-deployer-role
subjects:
  - kind: Group
    namespace: cdp-qa-app
    name: <AD group ID to which the SP and MSI users are assigned>
```

  </TabItem>
  <TabItem value="azureRbac" label="Azure RBAC example">

The following is an example of Azure RBAC permissions for System Assigned Managed Identity. Replace `xxxx` with your subscription ID and resource group ID.

```json
{
    "id": "/subscriptions/xxxx/providers/Microsoft.Authorization/roleDefinitions/xxxx",
    "properties": {
        "roleName": "HarnessSysMSIRole",
        "description": "",
        "assignableScopes": [
            "/subscriptions/xxxx/resourceGroups/xxxx"
        ],
        "permissions": [
            {
                "actions": [],
                "notActions": [],
                "dataActions": [
                    "Microsoft.ContainerService/managedClusters/configmaps/read",
                    "Microsoft.ContainerService/managedClusters/configmaps/write",
                    "Microsoft.ContainerService/managedClusters/configmaps/delete",
                    "Microsoft.ContainerService/managedClusters/secrets/read",
                    "Microsoft.ContainerService/managedClusters/secrets/write",
                    "Microsoft.ContainerService/managedClusters/secrets/delete",
                    "Microsoft.ContainerService/managedClusters/apps/deployments/read",
                    "Microsoft.ContainerService/managedClusters/apps/deployments/write",
                    "Microsoft.ContainerService/managedClusters/apps/deployments/delete",
                    "Microsoft.ContainerService/managedClusters/events/read",
                    "Microsoft.ContainerService/managedClusters/events/write",
                    "Microsoft.ContainerService/managedClusters/events/delete",
                    "Microsoft.ContainerService/managedClusters/namespaces/read",
                    "Microsoft.ContainerService/managedClusters/nodes/read",
                    "Microsoft.ContainerService/managedClusters/pods/read",
                    "Microsoft.ContainerService/managedClusters/pods/write",
                    "Microsoft.ContainerService/managedClusters/pods/delete",
                    "Microsoft.ContainerService/managedClusters/services/read",
                    "Microsoft.ContainerService/managedClusters/services/write",
                    "Microsoft.ContainerService/managedClusters/services/delete",
                    "Microsoft.ContainerService/managedClusters/apps/statefulsets/read",
                    "Microsoft.ContainerService/managedClusters/apps/statefulsets/write",
                    "Microsoft.ContainerService/managedClusters/apps/statefulsets/delete",
                    "Microsoft.ContainerService/managedClusters/apps/replicasets/read",
                    "Microsoft.ContainerService/managedClusters/apps/replicasets/write",
                    "Microsoft.ContainerService/managedClusters/apps/replicasets/delete"
                ],
                "notDataActions": []
            }
        ]
    }
}
```

  </TabItem>
</Tabs>

---

### Azure Resource Management (ARM) role requirements

The roles required for ARM depend on the scope type of your ARM template:

- **Resource group**: requires the `Contributor` role.
- **Subscription**: requires the `Contributor` role.
- **Management group**: requires the `Contributor` role.
- **Tenant**: requires the `Contributor` or `Owner` role. Creating a Tenant requires `Contributor`, but creating role assignments requires `Owner`.
- **Key Vault access**: to enable access to Key Vaults from ARM templates, select the **Azure Resource Manager for template deployment** option in the Key Vault Access Policy.

<div align="center"><DocImage path={require('./static/d2be476b98ef01447bf4fc604640ed8432ebd245a35da2ae45b556e86aae4f8a.png')} alt="ARM Key Vault access policy setting showing the Azure Resource Manager for template deployment option." width="80%" /></div>

:::note

The Azure roles provided in the connector must allow Harness to provision the Azure resources in your ARM templates. For example, to create a policy assignment, the `Resource Policy Contributor` role is required.

:::

---

### Azure Blueprints role requirements

Go to <a href="https://docs.microsoft.com/en-us/azure/governance/blueprints/overview#permissions-in-azure-blueprints" target="_blank" rel="noopener noreferrer">Permissions in Azure Blueprints</a> for the full list of roles required to create and delete Blueprints.

The Azure roles required on the service principal depend on the scope of your Blueprint definition.

**Management scope**:

- **System-assigned managed identity**: Contributor role at the management group scope where Blueprint definitions are created and published; Owner role at the subscription scope where the assignment is done.
- **User-assigned managed identity**: Contributor role at the management group scope where Blueprint definitions are created and published. Harness does not manage the lifecycle of user-managed identities; you are responsible for that.

**Subscription scope**:

- **System-assigned managed identity**: Owner role at the subscription scope.
- **User-assigned managed identity**: Contributor role to create and publish the Blueprint definition. Harness does not manage the lifecycle of user-managed identities; you are responsible for that.

---

## Add an Azure connector

You can add Azure connectors at the account, org, or project level at any time, or while setting up pipelines.

Perform the following steps to add an Azure connector:

1. Navigate to **Project Setup** (or **Account Settings** or **Organization Settings**), then select **Connectors**.
2. Select **New Connector**, then under **Cloud Providers**, select **Azure Cloud Provider**.
3. Enter a **Name**. Harness automatically creates an **Id** based on the name using the <a href="/docs/platform/references/entity-identifier-reference" target="_blank" rel="noopener noreferrer">Entity Identifier</a> format. You can edit the ID before saving; once saved, the ID is immutable.
4. Optionally, add a description and <a href="/docs/platform/tags/overview#create-tags-for-pipelines" target="_blank" rel="noopener noreferrer">tags</a>.
5. Select **Continue** to configure credentials.

---

## Configure credentials

The Azure connector supports three credential methods. Select the method that matches your Azure setup.

- [**Specify credentials here**](#specify-credentials): uses an App Registration with a client secret or certificate.
- [**OIDC Authentication**](#oidc-authentication): uses short-lived tokens via workload identity federation; no secrets are stored in Harness.
- [**Inherit credentials from the delegate**](#inherit-from-delegate): the connector inherits credentials from the Harness delegate running in your Azure subscription or AKS cluster.

<Tabs className="tabs--full-width">
<TabItem value="specify" label="Specify Credentials" default>

### Specify credentials

Select **Specify credentials here** to authenticate using an Azure App Registration with a client secret or certificate. Provide the App Registration's Application (client) ID and Directory (tenant) ID.

<div align="center"><DocImage path={require('../static/add-a-microsoft-azure-connector-63.png')} alt="A comparison of App Registration details and corresponding fields in the Harness connector settings." width="80%" /></div>

Perform the following steps to configure credentials:

1. In Microsoft Azure, go to the App Registration **Overview** page and note the **Application (client) ID** and **Directory (tenant) ID**.

   - **Application (client) ID**: the ID of the App Registration Harness will use. Assign this App Registration a role in your Azure subscription to grant access. Go to <a href="https://docs.microsoft.com/en-us/azure/active-directory/develop/quickstart-v1-add-azure-ad-app" target="_blank" rel="noopener noreferrer">Register an application with the Microsoft identity platform</a> and <a href="https://docs.microsoft.com/en-us/azure/active-directory/develop/howto-create-service-principal-portal#assign-the-application-to-a-role" target="_blank" rel="noopener noreferrer">Assign the application to a role</a> for steps.
   - **Directory (tenant) ID**: the ID for the Microsoft Entra ID tenant that contains your app. Go to <a href="https://docs.microsoft.com/en-us/azure/azure-resource-manager/resource-group-create-service-principal-portal#get-tenant-id" target="_blank" rel="noopener noreferrer">Get tenant ID</a> for steps.

   <div align="center"><DocImage path={require('../static/add-a-microsoft-azure-connector-68.png')} alt="Microsoft Azure App Registration Overview page showing Application (client) ID and Directory (tenant) ID." width="80%" /></div>

2. In the Harness Azure connector settings, select the **Environment**: **Azure Global** or **US Government**.
3. Enter the **Application (client) ID** in the **Application Id** field.
4. Enter the **Directory (tenant) ID** in the **Tenant Id** field.
5. For **Authentication**, select **Secret** or **Certificate**, then select or create a <a href="/docs/platform/secrets/add-use-text-secrets" target="_blank" rel="noopener noreferrer">Harness Text Secret</a> or <a href="/docs/platform/secrets/add-file-secrets" target="_blank" rel="noopener noreferrer">Harness File Secret</a>.

   Harness supports PEM files only. PFX files are not supported.

   To create a new client secret, go to **App Registrations** in Microsoft Entra ID, select your app, select **Certificates & secrets**, then select **New client secret**. Go to <a href="https://docs.microsoft.com/en-us/azure/active-directory/develop/howto-create-service-principal-portal#create-a-new-application-secret" target="_blank" rel="noopener noreferrer">Creating a new application secret</a> for steps.

   <div align="center"><DocImage path={require('../static/add-a-microsoft-azure-connector-69.png')} alt="Azure App Registration Certificates and secrets panel showing the New client secret option." width="80%" /></div>

6. Select **Continue**.

</TabItem>

<TabItem value="oidc" label="OIDC Authentication">

### OIDC authentication

Select **OIDC Authentication** to connect Harness to Azure without storing client secrets or certificates. Harness acts as an identity provider and issues short-lived JSON Web Tokens (JWTs) that Azure Active Directory (AD) validates directly using workload identity federation. Supported services: ACR, AKS, and Azure Web Apps. Go to <a href="https://learn.microsoft.com/en-us/entra/workload-id/workload-identity-federation" target="_blank" rel="noopener noreferrer">Workload identity federation</a> in the Microsoft documentation to understand the underlying Azure mechanism.

:::note

Azure OIDC authentication is behind the feature flag `CDS_AZURE_OIDC_AUTHENTICATION`. Contact [Harness Support](mailto:support@harness.io) to enable it on your account.

:::

**How OIDC authentication works**

When a CD pipeline runs a stage that uses an Azure connector with OIDC authentication:

1. Harness generates a short-lived ID token (valid for 60 minutes) for the pipeline execution.
2. The delegate presents this token to Azure AD.
3. Azure AD validates the token against the federated credential you configured on the App Registration or Managed Identity.
4. Azure AD issues an access token that grants access to Azure resources based on the RBAC roles you assigned.

**Issuer URL**

The Harness OIDC issuer URL format depends on the environment cluster where your Harness account resides. To find your cluster, navigate to **Account Settings**, then select **Overview**. The cluster hosting your account is displayed on the account details page.

The issuer URL format is:

```text
https://<HOSTNAME>/ng/api/oidc/account/<YOUR_HARNESS_ACCOUNT_ID>
```

Use the hostname that matches your cluster, even if a vanity URL is set up for your account:

| Cluster      | Hostname               |
|--------------|------------------------|
| Prod1/Prod2  | app.harness.io         |
| Prod3        | app3.harness.io        |
| Prod0/Prod4  | accounts.harness.io    |
| EU clusters  | accounts.eu.harness.io |

:::tip

To find your Harness Account ID, navigate to **Account Settings**, then select **Overview**. Your account ID is also visible in your browser URL: `app.harness.io/ng/account/<YOUR_ACCOUNT_ID>/...`.

You can test connectivity to the issuer URL by running:

```bash
curl https://<HOSTNAME>/ng/api/oidc/account/<YOUR_HARNESS_ACCOUNT_ID>/.well-known/openid-configuration
```

This should return valid information from the endpoint, including the issuer, JWKS URI, and supported claims.

:::

**Subject identifier**

The **subject** claim in the Harness-issued token uses this format:

```text
Provider:Harness:Account:<YOUR_HARNESS_ACCOUNT_ID>
```

Enter this exact value as the **Subject identifier** when configuring federated credentials in Azure. Azure uses it to match the incoming token to the correct identity.

**Step 1: Configure federated credentials in Azure**

You can configure OIDC using an App Registration (Service Principal) or a User-Assigned Managed Identity. Use **App Registration** when you need a service principal with explicit RBAC role assignments across one or more subscriptions. Use **User-Assigned Managed Identity** when the delegate runs inside an AKS cluster and you want tighter integration with Azure's managed identity service.

<Tabs className="tabs--full-width">
<TabItem value="app-reg" label="App Registration" default>

Perform the following steps to add a federated credential to an App Registration:

1. In the <a href="https://portal.azure.com" target="_blank" rel="noopener noreferrer">Azure portal</a>, navigate to **Microsoft Entra ID**, then select **App registrations**.
2. Select **New registration**, enter a name (for example, `harness-oidc`), and select **Register**.
3. On the **Overview** page, note the **Application (client) ID** and **Directory (tenant) ID**.

   <div align="center"><DocImage path={require('../static/add-a-microsoft-azure-connector-68.png')} alt="Azure App Registration Overview page showing Application (client) ID and Directory (tenant) ID fields." width="80%" /></div>

4. Select **Certificates & secrets**, then select the **Federated credentials** tab.
5. Select **Add credential**, then for **Federated credential scenario**, select **Other issuer**.
6. Enter the following values:

   | Field | Value |
   |---|---|
   | **Issuer** | `https://<HOSTNAME>/ng/api/oidc/account/<YOUR_HARNESS_ACCOUNT_ID>` (Replace `<HOSTNAME>` with your cluster hostname from the [Issuer URL](#issuer-url) table) |
   | **Subject identifier** | `Provider:Harness:Account:<YOUR_HARNESS_ACCOUNT_ID>` |
   | **Audience** | `api://AzureADTokenExchange` |
   | **Name** | A descriptive name, for example `harness-pipeline` |

   <div align="center"><DocImage path={require('./static/azure-oidc-add-federated-credential.png')} alt="Azure Add a credential panel showing the Other issuer scenario with Issuer, Value, and Audience fields." width="80%" /></div>

7. Select **Add**.

Go to <a href="https://learn.microsoft.com/en-us/entra/workload-id/workload-identity-federation-create-trust?pivots=identity-wif-apps-methods-azp" target="_blank" rel="noopener noreferrer">Configure an app to trust an external identity provider</a> in the Microsoft documentation for additional configuration options.

To add the federated credential using the Azure CLI instead, run the following command:

```bash
az ad app federated-credential create \
  --id <APPLICATION_ID or OBJECT_ID> \
  --parameters @federated-credential.json
```

Where `federated-credential.json` contains:

```json
{
  "name": "harness-pipeline",
  "issuer": "https://<HOSTNAME>/ng/api/oidc/account/<YOUR_HARNESS_ACCOUNT_ID>",
  "subject": "Provider:Harness:Account:<YOUR_HARNESS_ACCOUNT_ID>",
  "audiences": ["api://AzureADTokenExchange"]
}
```

Replace `<HOSTNAME>` with your cluster hostname from the [Issuer URL](#issuer-url) table.

</TabItem>
<TabItem value="managed-identity" label="User-Assigned Managed Identity">

Perform the following steps to add a federated credential to a User-Assigned Managed Identity:

1. In the <a href="https://portal.azure.com" target="_blank" rel="noopener noreferrer">Azure portal</a>, navigate to **Managed Identities**.
2. Select **Create**, choose your subscription, resource group, and region, enter a name, and select **Review + create**.

   <div align="center"><DocImage path={require('./static/azure-oidc-mi-overview.png')} alt="Azure Create User Assigned Managed Identity form showing Subscription, Resource group, Name, and Region fields." width="80%" /></div>

3. On the managed identity **Overview** page, note the **Client ID**.
4. Navigate back to **Managed Identities**, select the identity you created, then select **Federated credentials** under **Settings**.
5. Select **Add credential**, then enter the following values:

   | Field | Value |
   |---|---|
   | **Federated credential scenario** | **Other issuer** |
   | **Issuer** | `https://<HOSTNAME>/ng/api/oidc/account/<YOUR_HARNESS_ACCOUNT_ID>` (Replace `<HOSTNAME>` with your cluster hostname from the [Issuer URL](#issuer-url) table) |
   | **Subject identifier** | `Provider:Harness:Account:<YOUR_HARNESS_ACCOUNT_ID>` |
   | **Audience** | `api://AzureADTokenExchange` |
   | **Name** | A descriptive name, for example `harness-pipeline` |

   <div align="center"><DocImage path={require('./static/azure-oidc-add-federated-credential.png')} alt="Azure Add a credential panel showing the Other issuer scenario with Issuer, Value, and Audience fields." width="80%" /></div>

6. Select **Add**.

Go to <a href="https://learn.microsoft.com/en-us/entra/workload-id/workload-identity-federation-create-trust-user-assigned-managed-identity?pivots=identity-wif-mi-methods-azp" target="_blank" rel="noopener noreferrer">Configure a user-assigned managed identity to trust an external identity provider</a> in the Microsoft documentation for additional configuration options.

To add the federated credential using the Azure CLI instead, run the following command:

```bash
az identity federated-credential create \
  --name harness-pipeline \
  --identity-name <MANAGED_IDENTITY_NAME> \
  --resource-group <RESOURCE_GROUP_NAME> \
  --issuer "https://<HOSTNAME>/ng/api/oidc/account/<YOUR_HARNESS_ACCOUNT_ID>" \
  --subject "Provider:Harness:Account:<YOUR_HARNESS_ACCOUNT_ID>" \
  --audiences "api://AzureADTokenExchange"
# Replace <HOSTNAME> with your cluster hostname (see Issuer URL section above)
```

</TabItem>
</Tabs>

**Assign Azure RBAC roles**

Assign the App Registration or Managed Identity the minimum role required for each Azure service you intend to use with this connector:

| Service | Minimum role | Assign at scope |
|---|---|---|
| Azure Container Registry (ACR) | Reader | Subscription or Resource Group |
| Azure Kubernetes Service (AKS) | Owner or custom equivalent | Subscription or Resource Group |
| Azure Web Apps | Contributor | Subscription or Resource Group |

Go to [Roles, permissions, and cluster requirements](#roles-permissions-and-cluster-requirements) for the full role details and custom role JSON examples.

**Step 2: Configure the OIDC connector in Harness**

After completing the Azure setup above, return to the **Details** screen in the Harness connector wizard (the screen where you selected **OIDC** authentication).

<div align="center"><DocImage path={require('./static/azure-oidc-harness-connector.png')} alt="Harness Azure connector Details screen showing the OIDC Authentication option selected with Environment, Application Id, Tenant Id, and Audience fields." width="80%" /></div>

Perform the following steps to complete the configuration:

1. Select the **Environment**: **Azure Global** or **US Government**.
2. Enter the **Application (client) ID** of the App Registration or User-Assigned Managed Identity in the **Application Id** field.
3. Enter the **Directory (tenant) ID** in the **Tenant Id** field.
4. Optionally, enter the **Subscription ID**.
5. Leave **Audience** as `api://AzureADTokenExchange` unless you configured a custom audience in Azure.
6. Select **Continue**.

:::note

OIDC authentication requires **Connect through a Harness Delegate** as the connectivity mode. **Connect through Harness Platform** is not supported with OIDC.

:::

<details>
<summary>YAML reference</summary>

```yaml
connector:
  name: azure-oidc  # Replace with your connector name
  identifier: azure_oidc  # Replace with your connector identifier
  type: Azure
  spec:
    environment: AZURE
    credential:
      type: OidcAuthentication
      spec:
        tenantId: <YOUR_TENANT_ID>  # Replace with your Directory (tenant) ID
        applicationId: <YOUR_APPLICATION_ID>  # Replace with your Application (client) ID
        audience: api://AzureADTokenExchange
        azureEnvironmentType: AZURE
    delegateSelectors:
      - <YOUR_DELEGATE_SELECTOR>  # Replace with your delegate tag
    executeOnDelegate: true
```

</details>

</TabItem>

<TabItem value="inherit" label="Inherit from Delegate">

### Inherit from delegate

Select **Use the credentials of a specific Harness Delegate** to allow the connector to inherit authentication credentials from a Harness delegate running in your Azure subscription or AKS cluster. This option is useful when the delegate itself has the appropriate Managed Identity or service account permissions.

Perform the following steps to configure inherited credentials:

1. For **Environment**, select **Azure Global** or **US Government**.
2. For **Authentication**, select **System Assigned Managed Identity** or **User Assigned Managed Identity**.

   **System Assigned Managed Identity** uses the AKS cluster's predefined <a href="https://docs.microsoft.com/en-us/azure/aks/use-managed-identity#summary-of-managed-identities" target="_blank" rel="noopener noreferrer">Kubelet Managed Identity</a>. The Control plane AKS Managed Identity (named `<AKSName>`) must have the **Reader** permission on the AKS cluster itself. If used for image storage, the Kubelet Managed Identity (named `<AKSName>-agentpool`) must have the **acrPull** permission on ACR.

   Go to <a href="https://docs.microsoft.com/en-us/azure/aks/use-managed-identity" target="_blank" rel="noopener noreferrer">Use managed identities in Azure Kubernetes Service</a> and <a href="https://docs.microsoft.com/en-us/azure/container-instances/container-instances-managed-identity" target="_blank" rel="noopener noreferrer">How to use managed identities with Azure Container Instances</a> for further details.

   <div align="center"><DocImage path={require('../static/add-a-microsoft-azure-connector-66.png')} alt="Azure connector Authentication settings showing System Assigned Managed Identity selected." width="80%" /></div>

3. If you selected **User Assigned Managed Identity**, enter the Managed Identity's **Client Id** from your Azure **Managed Identities**. You can also use a <a href="https://docs.microsoft.com/en-us/azure/aks/use-azure-ad-pod-identity" target="_blank" rel="noopener noreferrer">Pod Assigned Managed Identity</a>.

   <div align="center"><DocImage path={require('../static/add-a-microsoft-azure-connector-67.png')} alt="Azure connector User Assigned Managed Identity settings showing the Client Id field." width="80%" /></div>

4. Select **Continue**.

</TabItem>
</Tabs>

---

## Select connectivity mode

The connectivity mode determines how Harness communicates with Azure. Perform the following steps to complete the connectivity configuration:

1. Select how you want Harness to connect to Azure:

   - **Connect through Harness Platform**: direct, secure communication between Harness and Azure. This mode is required for <a href="/docs/continuous-integration/use-ci/set-up-build-infrastructure/use-harness-cloud-build-infrastructure" target="_blank" rel="noopener noreferrer">Harness Cloud build infrastructure</a>. Not available with OIDC authentication.
   - **Connect through a Harness Delegate**: Harness communicates with Azure through a Harness delegate in your Azure subscription or AKS cluster. Required when using inherited delegate credentials or OIDC authentication.

2. If connecting through a Harness delegate, select one of the following:

   - **Use any available Delegate**: Harness selects an available delegate at runtime.
   - **Only use Delegates with all of the following tags**: use tags to target one or more specific delegates. You can also install a new delegate at this time.

3. Select **Save and Continue** to run the connection test. If the test succeeds, select **Finish**. The connection test confirms that your authentication and delegate selections are valid.

   If the connection test fails, confirm that your delegate is running and that your credentials are valid. For example, check that the client secret has not expired in your App Registration.

---

## Use `${HARNESS_KUBE_CONFIG_PATH}` with Azure

The Harness expression `${HARNESS_KUBE_CONFIG_PATH}` resolves to the path of a Harness-generated kubeconfig file containing the credentials you provided to the connector.

You can use these credentials with `kubectl` commands by exporting the expression value to the `KUBECONFIG` environment variable. For example, add the following to a Harness Shell Script step:

```bash
export KUBECONFIG=${HARNESS_KUBE_CONFIG_PATH} kubectl get pods -n <namespace>
```

Go to <a href="/docs/platform/delegates/manage-delegates/select-delegates-with-selectors" target="_blank" rel="noopener noreferrer">Select delegates with selectors</a> to run steps on a specific delegate.

Note the following for Azure deployments:

- If the Azure connector uses Azure Managed Identity for authentication, the Shell Script step must use a **Delegate Selector** for a delegate running in AKS.
- If the Azure connector uses Azure Service Principal for authentication, the Shell Script step can use any delegate.

---

## Next steps

You have configured the Microsoft Azure connector. Continue your learning journey with the following:

- <a href="/docs/continuous-delivery/deploy-srv-diff-platforms/azure/azure-cd-quickstart" target="_blank" rel="noopener noreferrer">Azure ACR to AKS CD quickstart</a>: deploy a containerized application from ACR to AKS using a CD pipeline.
- <a href="/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/kubernetes-cd-quickstart" target="_blank" rel="noopener noreferrer">Kubernetes CD quickstart</a>: deploy to Kubernetes using the platform-agnostic Kubernetes cluster connector.
- <a href="/docs/continuous-integration/secure-ci/azure-oidc-token-plugin" target="_blank" rel="noopener noreferrer">Azure OIDC token plugin for CI</a>: use OIDC to authenticate with Azure services in Harness CI pipelines.
- <a href="/docs/platform/get-started/key-concepts" target="_blank" rel="noopener noreferrer">Harness key concepts</a>: understand the core Harness platform concepts.
- <a href="/docs/continuous-delivery/overview#pipeline" target="_blank" rel="noopener noreferrer">CD pipeline basics</a>: understand the structure of a Harness CD pipeline.
