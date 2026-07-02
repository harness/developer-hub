---
title: Configure Service and Environment
description: Set up your Azure Container Apps service definition, manifests, and infrastructure.
sidebar_position: 2
---

This guide walks you through configuring your service, environment, and infrastructure for Azure Container Apps deployments in Harness.

:::info Feature Flag
This feature is behind the feature flag `CDS_AZURE_CONTAINER_APPS`. Contact [Harness Support](mailto:support@harness.io) to enable this feature.
:::


## Add a Deploy stage

Setting up an Azure Container Apps deployment starts with adding a Deploy stage to your pipeline. Navigate to your project and select your pipeline, then add a Deploy stage. When Harness prompts you to select the deployment type, choose **Azure Container Apps** from the available options. This selection ensures that Harness configures the stage with Container Apps-specific capabilities and deployment steps.

## Configure the service

The service definition contains all the configuration needed to deploy your Azure Container App, including the container app manifest that defines your application configuration. This manifest defines your infrastructure as code, allowing you to version control and consistently replicate your Container Apps deployments across environments.

### Add or select a service

After creating your Deploy stage, click **Set Up Stage** to begin configuring the service. In the Service tab, either add a new service or select an existing one.

When creating a new service:
- **Within a pipeline**: Harness automatically uses the deployment type configured in the Deploy stage (Azure Container Apps). Provide a descriptive **Service Name** and an optional **Description**.
- **As a standalone service**: You need to select **Azure Container Apps** as the deployment type, then provide the **Service Name** and **Description**.

The service definition will contain the manifest and artifacts Harness needs to deploy your Container App.

### Add Azure Container Apps manifest

Azure Container Apps require a manifest file that defines your container app configuration. The manifest can be stored in **Inline** (directly in Harness), **Git providers (GitHub, GitLab, Bitbucket)**, or the **Harness File Store**.

#### Container App Manifest

The Container App manifest defines the complete configuration for your Azure Container App. It includes the container app properties, ingress configuration, container specifications, resource limits, scaling rules, environment variables, and secrets. This manifest acts as the blueprint that ensures consistency across your entire deployment.

The [Azure Container Apps REST API](https://learn.microsoft.com/en-us/rest/api/containerapps/container-apps) supports a wide range of configuration options. You can specify ingress settings for external or internal traffic, configure automatic scaling based on HTTP requests or custom metrics, define multiple containers, set environment variables and secrets, and configure Dapr settings for microservices integration.

**To add a Container App Manifest:**

1. Click **+ Add Azure Container Apps Manifest File**.
2. Select your manifest source:
   - **Inline**: Type or paste your manifest directly in the Harness UI
   - **Harness File Store**: Select a file stored in the Harness File Store
   - **Git**: Connect to your Git repository and provide the file path

3. Provide the manifest configuration in YAML or JSON format.

<details>
<summary>Example: Azure Container Apps Manifest (YAML)</summary>

```yaml
name: aca-aut-test
properties:
  configuration:
    activeRevisionsMode: Single
    ingress:
      external: true
      targetPort: 80
      traffic:
        - latestRevision: true
          weight: 100
  template:
    containers:
      - name: my-app
        image: placeholder
        resources:
          cpu: 0.25
          memory: 0.5Gi
```

**Key fields:**

- `name`: Container app name (unique within the managed environment)
- `properties.configuration.activeRevisionsMode`: `Single` (only one revision active) or `Multiple` (supports traffic splitting)
- `properties.configuration.ingress`: Ingress configuration for HTTP/HTTPS traffic
- `properties.configuration.ingress.external`: `true` for public access, `false` for internal only
- `properties.configuration.ingress.targetPort`: Container port that receives traffic
- `properties.configuration.ingress.traffic`: Traffic distribution rules across revisions
- `properties.template.containers`: Container specifications including image, resources, and environment variables
- `properties.template.containers[].resources`: CPU and memory limits (e.g., `0.25` CPU cores, `0.5Gi` memory)

</details>

<details>
<summary>Example: Container App with Environment Variables and Scaling</summary>

```yaml
name: my-container-app
properties:
  configuration:
    activeRevisionsMode: Single
    ingress:
      external: true
      targetPort: 8080
      traffic:
        - latestRevision: true
          weight: 100
  template:
    containers:
      - name: my-app-container
        image: placeholder
        env:
          - name: APP_ENV
            value: production
          - name: LOG_LEVEL
            value: info
        resources:
          cpu: 0.5
          memory: 1Gi
    scale:
      minReplicas: 1
      maxReplicas: 10
      rules:
        - name: http-rule
          http:
            metadata:
              concurrentRequests: "50"
```

**Additional fields:**

- `properties.template.containers[].env`: Environment variables passed to the container
- `properties.template.scale.minReplicas`: Minimum number of replicas (default: 1)
- `properties.template.scale.maxReplicas`: Maximum number of replicas
- `properties.template.scale.rules`: Scaling rules based on HTTP requests, CPU, memory, or custom metrics

</details>

:::note
The `image` field in the manifest can be set to `placeholder`. During deployment, Harness will replace this with the actual container image specified in your artifact configuration.
:::

### Configure artifacts

Harness needs to know which container image to use for your Azure Container App. Currently, only **Azure Container Registry (ACR)** and **Docker Hub** are supported as artifact sources for Azure Container Apps deployments. Other container registries are not currently supported. The artifact configuration overrides the image specified in your container app manifest, giving you flexibility to deploy different image versions without modifying the manifest.

**To configure a container artifact:**

1. In the **Artifacts** section, click **Add Primary Artifact**.

2. Select your artifact source:
   - **Azure Container Registry (ACR)**: For images stored in Azure Container Registry
   - **Docker Registry**: For images stored in Docker Hub or other Docker-compatible registries

3. Configure the artifact details based on your selected source.

#### Azure Container Registry (ACR)

For ACR artifacts:

- **Azure Connector**: Select your Harness Azure connector that has access to the subscription containing your ACR
- **Subscription ID**: The Azure subscription containing your container registry
- **Registry**: Your ACR registry name (e.g., `myregistry.azurecr.io`)
- **Repository**: The repository name within the registry (e.g., `my-app`)
- **Tag**: Specific image tag or use **Tag Regex** to automatically select the latest matching tag

#### Docker Registry

For Docker Hub or other Docker registries:

- **Docker Connector**: Select your Harness Docker connector
- **Image Path**: Full image path (e.g., `myorg/my-app`)
- **Tag**: Specific image tag or use **Tag Regex** for automatic selection

**Example artifact configuration:**

```yaml
artifacts:
  primary:
    primaryArtifactRef: <+input>
    sources:
      - identifier: acr_artifact
        spec:
          connectorRef: my_azure_connector
          subscriptionId: <subscription-id>
          registry: myregistry.azurecr.io
          repository: my-app
          tag: <+input>
        type: Acr
```

### Service YAML example

<details>
<summary>Complete Service YAML</summary>

```yaml
service:
  name: my-azure-container-apps-service
  identifier: my_azure_container_apps_service
  orgIdentifier: default
  projectIdentifier: my_project
  tags: {}
  serviceDefinition:
    type: AzureContainerApps
    spec:
      artifacts:
        primary:
          primaryArtifactRef: <+input>
          sources:
            - identifier: acr_artifact
              type: Acr
              spec:
                connectorRef: my_azure_connector
                subscriptionId: <subscription-id>
                registry: myregistry.azurecr.io
                repository: my-app
                tag: <+input>
                digest: ""
            - identifier: dockerhub_artifact
              type: DockerRegistry
              spec:
                connectorRef: my_docker_connector
                imagePath: myorg/my-app
                tag: <+input>
                digest: ""
      manifests:
        - manifest:
            identifier: container_app_manifest
            type: AzureContainerAppsConfiguration
            spec:
              store:
                type: Harness
                spec:
                  files:
                    - /acaManifest
  gitOpsEnabled: false
```

</details>

## Configure the environment and infrastructure

After configuring your service with the necessary manifest and artifacts, you need to define the environment and infrastructure where Harness will deploy your Container App. The environment represents the logical target (such as Production or Staging), while the infrastructure definition specifies the exact Azure subscription, resource group, and managed environment.

### Create environment

Navigate to the **Environment** tab and either create a new environment or select an existing one. If creating a new environment, provide a descriptive **Environment Name** (such as "Production" or "Staging") and select the environment type—**Production** or **Pre-Production**. This classification helps Harness apply appropriate governance policies and approval workflows. After configuring these settings, save the environment.

<details>
<summary>Example Environment YAML</summary>

```yaml
environment:
  name: Azure_Container_Apps_Production
  identifier: azure_container_apps_prod
  description: "Production environment for Azure Container Apps"
  tags: {}
  type: Production
  orgIdentifier: default
  projectIdentifier: my_project
```

</details>

### Configure infrastructure

The infrastructure definition specifies where and how Harness deploys your Container App in Azure. This includes the Azure subscription, resource group, and managed environment.

In the **Infrastructure Definition** section, click **New Infrastructure** and provide a descriptive **Infrastructure Name** (such as "eastus-production") that clearly identifies the deployment target.

<div style={{textAlign: 'center'}}>
  <DocImage path={require('./static/infrastructure-definition.png')} width="50%" height="50%" title="Click to view full size image" />
</div>

Configure the following Azure-specific details:

#### Azure Cloud Provider Details

**Connector**

Select your Harness Azure connector, which provides authentication to your Azure subscription. This connector uses either OIDC (OpenID Connect) for keyless authentication or a Service Principal with client ID and secret credentials. The connector must have appropriate IAM permissions to create and manage Container Apps, access managed environments, and pull images from container registries. If you don't have a connector configured, click **+ New Connector**, choose your preferred authentication method, provide the required credentials, test the connection, and save the connector.

**Subscription ID**

Specify the Azure subscription ID where Harness will deploy your Container App (such as `12345678-1234-1234-1234-123456789abc`). This field supports cross-subscription deployments, meaning you can deploy to a different subscription than the one configured in your connector. This flexibility allows organizations to use a single connector across multiple Azure subscriptions, simplifying credential management.

**Resource Group**

Enter the name of the Azure resource group that contains your Container Apps managed environment (such as `my-resource-group`). The resource group must already exist and contain the managed environment where you want to deploy your container app. Harness will create the container app within this resource group.

**Managed Environment**

Specify the name of the Azure Container Apps managed environment where Harness will deploy your container app (such as `my-managed-environment`). The managed environment provides the infrastructure boundary for your container apps, including networking, logging, and shared configuration. The managed environment must already exist in the specified resource group.

**Allow simultaneous deployments on the same infrastructure**

This optional checkbox enables multiple deployments to run concurrently on the same managed environment. When enabled, Harness allows parallel deployments without waiting for previous deployments to complete. This is useful for deploying multiple independent container apps to the same environment or for accelerating deployment workflows.

After configuring all these settings, click **Save** to finalize your infrastructure definition.

<details>
<summary>Example Infrastructure Definition YAML</summary>

```yaml
infrastructureDefinition:
  name: azure_container_apps_infra
  identifier: azure_container_apps_infra
  orgIdentifier: default
  projectIdentifier: my_project
  environmentRef: azure_container_apps_prod
  deploymentType: AzureContainerApps
  type: AzureContainerApps
  spec:
    connectorRef: my_azure_connector
    subscriptionId: <subscription-id>
    resourceGroup: my-resource-group
    managedEnvironment: my-managed-environment
  allowSimultaneousDeployments: false
```

</details>

### Azure authentication support

Harness supports two primary authentication methods for connecting to your Azure subscription, each with distinct advantages depending on your security requirements and operational preferences.

#### Azure OIDC Support

OpenID Connect (OIDC) provides secure, keyless authentication using workload identity federation. This approach eliminates the need to manage and rotate service principal credentials, significantly reducing security risks and simplifying credential management. We strongly recommend OIDC for production environments as it leverages Azure's identity federation to authenticate without storing long-lived credentials.

For detailed configuration steps, see [Add a Microsoft Azure Cloud Connector](/docs/platform/connectors/cloud-providers/add-a-microsoft-azure-connector).

#### Service Principal

The traditional Service Principal authentication method uses a client ID and client secret for a service principal registered in your Azure Active Directory. This method works well for getting started quickly or when OIDC isn't available in your environment. When using service principal credentials, ensure you follow security best practices such as rotating secrets regularly and restricting permissions to only what's necessary.

For detailed configuration steps, see [Create an Azure Connector](/docs/platform/connectors/cloud-providers/add-a-microsoft-azure-connector).

### Cross-subscription deployments

Harness supports cross-subscription deployments by default, allowing you to use a single Azure connector to manage Container Apps across multiple Azure subscriptions. This capability eliminates the need to create and maintain separate connectors for each subscription, significantly simplifying credential management in multi-subscription environments.

When configuring your infrastructure definition, the **Subscription ID** field accepts any valid Azure subscription ID—either the same subscription configured in the connector or a different one. The **Resource Group** and **Managed Environment** fields determine where Harness deploys the Container App within that subscription. This separation allows maximum flexibility in organizing your Azure resources while maintaining centralized authentication.

**Prerequisite**: For OIDC-based connectors, ensure the associated service principal has been granted appropriate IAM permissions in both the connector's subscription and the target deployment subscriptions to access and manage resources across subscriptions.

## Next steps

Now that you've configured your service, environment, and infrastructure, you can proceed to configure your deployment execution strategy in the **Execution** tab.

### Basic strategy

Harness supports **Basic deployment strategy** for Azure Container Apps deployments with immediate traffic cutover. When you select this strategy, Harness automatically adds a step group containing three deployment steps with rollback capabilities.

- [Basic Deployment Strategy](basic-deployment.md) - Configure Basic deployments with immediate traffic cutover and automatic step group setup

### Canary strategy

Harness supports **Canary deployment strategy** for Azure Container Apps deployments with progressive traffic shifting. When you select this strategy, Harness automatically adds a step group with three default steps. You can then manually add Traffic Shift steps for progressive rollout.

- [Canary Deployment Strategy](canary-deployment.md) - Configure Canary deployments with progressive traffic shifting and rollback

### Blank Canvas

If you choose **Blank Canvas**, you need to manually add and configure the deployment steps. This option provides flexibility to customize your deployment workflow according to your specific requirements.

:::important
All Azure Container Apps deployment steps must be added within a **Container Step Group** (also called a Containerized Step Group). The deployment steps run as containerized tasks and require the container infrastructure configuration provided by the step group. Without a Container Step Group, the Azure Container Apps steps will not execute properly.
:::

When using Blank Canvas, follow these steps:

1. Add a **Container Step Group** in the Execution section
2. Configure the step group infrastructure (Kubernetes connector and namespace)
3. Add your Azure Container Apps deployment steps within the step group:
   - Download Manifests
   - Azure Container Apps Prepare Rollback Data
   - Azure Container Apps Deploy
   - Azure Container Apps Traffic Shift (optional, for Canary deployments)
4. Configure rollback steps within a separate Container Step Group in the Rollback section

## Related resources

- [Create an Azure Connector](/docs/platform/connectors/cloud-providers/add-a-microsoft-azure-connector)
- [Harness File Store](/docs/continuous-delivery/x-platform-cd-features/services/add-inline-manifests-using-file-store)
- [Azure Container Apps documentation](https://learn.microsoft.com/en-us/azure/container-apps/)
