---
sidebar_position: 2
sidebar_label: Getting Started
title: Getting Started with Deployments
description: Learn how to create your first deployment pipeline in Harness CD
redirect_from:
  - /tutorials/cd-pipelines/getting-started
  - /docs/continuous-delivery/get-started/getting-started-with-deployments
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


:::info

[Sign up today to unleash the potential of intelligent Harness CD](https://app.harness.io/auth/#/signup/?module=cd&utm_source=website&utm_medium=harness-developer-hub&utm_campaign=cd-plg&utm_content=getting-started).

:::

This guide walks you through creating your first deployment pipeline in Harness Continuous Delivery (CD). You'll build a complete pipeline from scratch, step by step.

### New to Harness CD?

Start with the [CD Overview](/docs/continuous-delivery/overview) to understand key concepts, including Services, Environments, Pipelines, and Deployment Strategies.

**What you'll accomplish:**
1. Create a deployment pipeline
2. Configure a service (what to deploy)
3. Set up an environment (where to deploy)
4. Choose an execution strategy
5. Run your first deployment

## Prerequisites

Before you begin, ensure you have:

- **A Harness account** - [Sign up for free](https://app.harness.io/auth/#/signup/?module=cd)
- **Access to a Harness project** - Use the Default Project or create your own

**Platform-Specific Prerequisites**

Select your deployment platform to see all requirements and set up connectors:

<Tabs groupId="deployment-platform" className="tabs--full-width">
<TabItem value="kubernetes" label="Kubernetes" default>

**Infrastructure Requirements:**
- A Kubernetes cluster (local like [K3D](https://k3d.io/), or cloud-managed like GKE, EKS, AKS)
- `kubectl` access to your cluster
- Application deployed to a container registry (Docker Hub, ECR, GCR, etc.)
- **A Harness Delegate installed** - Required to connect to your cluster. Follow the [delegate installation guide](/docs/platform/delegates/install-delegates/overview)

**Quick Verification:**
```bash
# Verify kubectl access
kubectl cluster-info
kubectl get nodes
```

**Required Connectors:**

1. **Kubernetes Cluster Connector** - Connects Harness to your cluster
   - Go to **Project Setup** → **Connectors** → **New Connector** → **Kubernetes Cluster**
   - Choose connection method (Delegate, Service Account, etc.)
   - Follow: [Create a Kubernetes connector](/docs/platform/connectors/cloud-providers/add-a-kubernetes-cluster-connector)

2. **Git Connector** - For storing Kubernetes manifests
   - Go to **Project Setup** → **Connectors** → **New Connector** → **GitHub/GitLab/Bitbucket**
   - Provide repository URL and authentication (Personal Access Token recommended)
   - Follow: [Git connector setup](/docs/platform/connectors/code-repositories/ref-source-repo-provider/git-connector-settings-reference)

3. **Docker Registry Connector** - For pulling container images
   - Go to **Project Setup** → **Connectors** → **New Connector** → **Docker Registry**
   - For Docker Hub: Use `https://registry.hub.docker.com/v2/`
   - For ECR/GCR/ACR: Use respective registry URLs
   - Follow: [Docker Registry connector](/docs/platform/connectors/cloud-providers/ref-cloud-providers/docker-registry-connector-settings-reference)

</TabItem>
<TabItem value="ssh" label="SSH / Traditional">

**Infrastructure Requirements:**
- Target VMs or servers (on-premises or cloud)
- SSH key-based authentication configured
- Application artifacts in a repository (Artifactory, Nexus, S3, etc.)
- **A Harness Delegate installed** - Required to execute deployment commands on your servers. Follow the [delegate installation guide](/docs/platform/delegates/install-delegates/overview)

**SSH Key Setup:**
```bash
# Generate SSH key if needed
ssh-keygen -t rsa -b 4096 -f ~/.ssh/harness_deploy

# Copy public key to target servers
ssh-copy-id -i ~/.ssh/harness_deploy.pub user@server-ip
```

**Required Connectors:**

1. **SSH Key Secret** - Store your private SSH key
   - Go to **Project Setup** → **Secrets** → **New Secret** → **File**
   - Upload your private SSH key file
   - Follow: [SSH secret setup](/docs/platform/secrets/add-file-secrets)

2. **SSH Connector** - Connects to your servers
   - Go to **Project Setup** → **Connectors** → **New Connector** → **SSH**
   - Provide host details and select SSH key secret
   - Follow: [Add and reference SSH secrets](/docs/platform/secrets/add-use-ssh-secrets)

3. **Artifact Repository Connector** - For application packages
   - **For Artifactory**: Go to **Connectors** → **New Connector** → **Artifactory**
   - **For Nexus**: Go to **Connectors** → **New Connector** → **Nexus**
   - **For S3**: Go to **Connectors** → **New Connector** → **AWS** → Configure S3 access
   - Follow: [Artifactory connector settings](/docs/platform/connectors/cloud-providers/ref-cloud-providers/artifactory-connector-settings-reference)

</TabItem>
<TabItem value="gcp" label="Google Cloud Run">

**Infrastructure Requirements:**
- A GCP project with billing enabled
- For Cloud Run: Cloud Run API enabled
- For GKE: A GKE cluster
- Container image in GCR or Artifact Registry

**Enable Required APIs:**
```bash
# Enable Cloud Run API
gcloud services enable run.googleapis.com

# Enable Artifact Registry
gcloud services enable artifactregistry.googleapis.com

# Enable Container Registry (if using GCR)
gcloud services enable containerregistry.googleapis.com
```

**Required Connectors:**

1. **GCP Connector** - Connects Harness to Google Cloud
   - Go to **Project Setup** → **Connectors** → **New Connector** → **GCP**
   - Choose authentication: Service Account Key or GCE VM
   - Provide service account key (JSON) with required permissions
   - Follow: [GCP connector setup](/docs/platform/connectors/cloud-providers/connect-to-google-cloud-platform-gcp)
   
   **Required GCP Permissions:**
   - Cloud Run: `roles/run.admin`
   - Artifact Registry: `roles/artifactregistry.reader`
   - GKE: `roles/container.developer`

2. **Git Connector** (if using Git for manifests)
   - Go to **Project Setup** → **Connectors** → **New Connector** → **GitHub/GitLab**
   - Provide repository URL and authentication
   - Follow: [Git connector setup](/docs/platform/connectors/code-repositories/ref-source-repo-provider/git-connector-settings-reference)

3. **GCR/Artifact Registry Connector** - For container images
   - Go to **Project Setup** → **Connectors** → **New Connector** → **GCR/GAR**
   - Select your GCP connector
   - Specify registry hostname
   - Follow: [GCR connector setup](/docs/platform/connectors/cloud-providers/ref-cloud-providers/gcs-connector-settings-reference)

</TabItem>
<TabItem value="azure" label="Azure">

**Infrastructure Requirements:**
- An Azure subscription with appropriate permissions
- For Functions: Function App created in Azure Portal
- For Web Apps: App Service plan configured
- Application package or container image ready

**Azure CLI Verification:**
```bash
# Login to Azure
az login

# Verify subscription
az account show

# List resource groups
az group list
```

**Required Connectors:**

1. **Azure Connector** - Connects Harness to Azure
   - Go to **Project Setup** → **Connectors** → **New Connector** → **Azure**
   - Choose authentication: Service Principal or Managed Identity
   - Provide:
     - Application (Client) ID
     - Tenant ID
     - Client Secret (create as Harness Secret first)
   - Follow: [Azure connector setup](/docs/platform/connectors/cloud-providers/add-a-microsoft-azure-connector)
   
   **Required Azure Permissions:**
   - Contributor role on resource group
   - Or specific: `Microsoft.Web/sites/*` for Web Apps/Functions

2. **Git Connector** (for configuration files)
   - Go to **Project Setup** → **Connectors** → **New Connector** → **GitHub/GitLab**
   - Provide repository URL and authentication
   - Follow: [Git connector setup](/docs/platform/connectors/code-repositories/ref-source-repo-provider/git-connector-settings-reference)

3. **Azure Container Registry Connector** (for containerized apps)
   - Go to **Project Setup** → **Connectors** → **New Connector** → **Docker Registry**
   - Use ACR login server URL (e.g., `myregistry.azurecr.io`)
   - Authenticate using Azure credentials or ACR admin credentials
   - Follow: [ACR connector setup](/docs/platform/connectors/cloud-providers/ref-cloud-providers/docker-registry-connector-settings-reference)

</TabItem>
<TabItem value="lambda" label="AWS Lambda">

**Infrastructure Requirements:**
- An AWS account with appropriate IAM permissions
- Lambda execution role with required policies
- S3 bucket for deployment packages (or ECR for container images)
- Deployment package (ZIP file) uploaded to S3

**AWS CLI Verification:**
```bash
# Verify AWS credentials
aws sts get-caller-identity

# List S3 buckets
aws s3 ls

# Verify Lambda access
aws lambda list-functions --region us-east-1
```

**Required Connectors:**

1. **AWS Connector** - Connects Harness to AWS
   - Go to **Project Setup** → **Connectors** → **New Connector** → **AWS**
   - Choose authentication method:
     - **Access Key** (recommended for getting started)
     - **IAM Role** (recommended for production)
     - **IRSA** (for EKS)
   - For Access Key method:
     - Create a secret for Access Key ID
     - Create a secret for Secret Access Key
   - Follow: [AWS connector setup](/docs/platform/connectors/cloud-providers/add-aws-connector)
   
   **Required IAM Policies:**
   - `AWSLambda_FullAccess` or `AWSLambdaFullAccess`
   - `IAMReadOnlyAccess` (for role verification)
   - `AmazonS3ReadOnlyAccess` (for artifact retrieval)

2. **Git Connector** - For Lambda function definitions
   - Go to **Project Setup** → **Connectors** → **New Connector** → **GitHub/GitLab**
   - Provide repository URL and authentication
   - Example repo: `https://github.com/harness-community/harnesscd-example-apps`
   - Follow: [Git connector setup](/docs/platform/connectors/code-repositories/ref-source-repo-provider/git-connector-settings-reference)

3. **AWS Secrets** - Store AWS credentials
   - Go to **Project Setup** → **Secrets** → **New Secret** → **Text**
   - Create two secrets:
     - `aws_access_key_id`: Your AWS Access Key ID
     - `aws_secret_access_key`: Your AWS Secret Access Key
   - These will be used in the AWS connector

**Pre-Deployment Setup:**
- Upload your Lambda deployment package (ZIP) to S3 bucket
- Note the bucket name and file path - you'll need these in Step 3
- Ensure Lambda execution role ARN is ready - you'll need it in the function definition

</TabItem>
</Tabs>

---

**Important Notes:**
- Complete all connector setups before proceeding - You'll select these connectors in the following steps
- Test each connector - Use the "Test Connection" button to verify connectivity
- Save connector identifiers - You'll reference these by name when configuring services and environments


## Step 1: Create Your Pipeline

Follow these steps to create your first deployment pipeline.

**1. Navigate to Pipelines**

1. From your Harness project, select **Pipelines** from the left navigation menu.
2. Click **+ Create a Pipeline**.

<div style={{textAlign: 'center'}}>
  <DocImage path={require('./static/getting-started-1.png')} width="80%" height="80%" title="Click to view full size image" />
</div>

**2. Configure Pipeline Basics**

1. Provide a **Name** for your pipeline (e.g., "Deploy to Production")
2. Choose **Inline** for **Pipeline Storage** (stores configuration in Harness)
3. Click **Start**

<div style={{textAlign: 'center'}}>
  <DocImage path={require('./static/getting-started-2.png')} width="60%" height="60%" title="Click to view full size image" />
</div>

:::info
You can also store pipelines in Git using **Remote** storage. Learn more in the [Pipelines documentation](/docs/category/pipelines).
:::

## Step 2: Add a Deploy Stage and Configure Deployment

Add a Deploy stage and configure your deployment based on your target platform.

1. Select the **Deploy** stage type.

<div style={{textAlign: 'center'}}>
  <DocImage path={require('./static/getting-started-3.png')} width="80%" height="80%" title="Click to view full size image" />
</div>

2. In the "About your Stage" section:
   - Enter a **Stage Name** (e.g., "Deploy to Dev")
   - Select your **Deployment Type**

**Select Your Deployment Type**

This guide covers the most common deployment types. Select the one that matches your infrastructure:

- **Kubernetes** - Deploy to any Kubernetes cluster
- **AWS Lambda** - Serverless functions on AWS
- **Google Cloud Run** - Fully managed containers on GCP
- **Azure Web Apps** - PaaS web applications on Azure
- **Azure Functions** - Serverless compute on Azure
- **SSH** - Deploy to Linux/Windows servers

:::tip
Harness supports 20+ deployment types including ECS, Helm, SAM, Google Cloud Functions, Spot, Tanzu, and more. For a complete list, see [What's Supported in CD](/docs/continuous-delivery/cd-integrations).
:::

3. Click **Set Up Stage** to continue.

:::important
The deployment type you select here determines the configuration needed in Service, Environment, and Infrastructure sections. Make sure to follow the same deployment type throughout all configuration steps.
:::

## Step 3: Configure Your Service

The Service defines what you're deploying (application, artifacts, manifests). Select your deployment platform below:

<Tabs groupId="deployment-platform" queryString className="tabs--full-width">
<TabItem value="kubernetes" label="Kubernetes" default>

**Kubernetes Service Configuration**

1. In the **Service** tab, click **+ Add Service**
2. Provide a **Name** (e.g., `nginx-service`) and click **Save**

**Add Kubernetes Manifest**

1. Click **Add Manifest** → Select **K8s Manifest**
2. Configure:
   - **Manifest Identifier**: `k8s-manifest`
   - **Git Connector**: Select the Git connector you created in Prerequisites
   - **Repository**: Use `https://github.com/harness-community/harnesscd-example-apps`
   - **Branch**: `master`
   - **File Path**: `guestbook/manifest.yaml`

**Sample Manifest:**

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: guestbook-ui
spec:
  replicas: 3
  selector:
    matchLabels:
      app: guestbook-ui
  template:
    metadata:
      labels:
        app: guestbook-ui
    spec:
      containers:
      - name: guestbook-ui
        image: <+artifact.image>
        ports:
        - containerPort: 80
---
apiVersion: v1
kind: Service
metadata:
  name: guestbook-ui
spec:
  type: LoadBalancer
  selector:
    app: guestbook-ui
  ports:
    - protocol: TCP
      port: 80
      targetPort: 80
```

**Add Container Image**

1. Click **Add Primary Artifact** → Select **Docker Registry**
2. Configure:
   - **Artifact Source Name**: `nginx`
   - **Docker Registry Connector**: Select the Docker Registry connector you created in Prerequisites
   - **Image Path**: `library/nginx`
   - **Tag**: Select `stable` or use `<+input>` for runtime input

3. Click **Continue** to proceed to Environment configuration.

:::info
You can also use [Helm charts](/docs/continuous-delivery/deploy-srv-diff-platforms/helm/helm-cd-quickstart) or [Kustomize](/docs/continuous-delivery/deploy-srv-diff-platforms/kustomize/kustomize-quickstart) for Kubernetes deployments.
:::

</TabItem>
<TabItem value="ssh" label="SSH / Traditional">

**SSH Deployment Service Configuration**

1. In the **Service** tab, click **+ Add Service**
2. Provide a **Name** (e.g., `tomcat-app`) and click **Save**

**Add Application Package**

1. Click **Add Primary Artifact**
2. Select artifact source based on what you configured in Prerequisites:
   - **Artifactory**: For JARs, WARs, etc.
   - **Nexus**: For Maven artifacts
   - **Amazon S3**: For packages
3. Configure:
   - **Connector**: Select the artifact repository connector you created in Prerequisites
   - **Artifact Path**: Path to your application package
   - **Format**: JAR, WAR, TAR, ZIP, etc.

**Example**: For a WAR file from Artifactory
- Repository: `libs-release-local`
- Artifact Path: `com/example/myapp/1.0/myapp-1.0.war`

**Add Deployment Scripts (Optional)**

1. Click **Add Config File** to add installation/startup scripts
2. Add pre-deployment and post-deployment scripts as needed

3. Click **Continue** to proceed to Environment configuration.

:::info
Harness also supports [WinRM deployments](/docs/continuous-delivery/deploy-srv-diff-platforms/traditional/win-rm-tutorial) for Windows servers.
:::

</TabItem>
<TabItem value="gcp" label="Google Cloud Run">

**Google Cloud Run Service Configuration**

Sample configuration files are available at the [harnesscd-example-apps repository](https://github.com/harness-community/harnesscd-example-apps/tree/master/google-cloud-run).

1. In the **Service** tab, click **+ Add Service**
2. Provide a **Name** (e.g., `cloud-run-service`) and click **Save**

**Add Cloud Run Service Definition**

1. Click **Add Manifest** → Select **Google Cloud Run Service Definition**
2. Configure:
   - **Manifest Source**: Git Repository
   - **Git Connector**: Select the Git connector you created in Prerequisites

**Sample Cloud Run Service Definition:**

```yaml
apiVersion: serving.knative.dev/v1
kind: Service
metadata:
  name: <+service.name>
spec:
  template:
    spec:
      containers:
      - image: <+artifact.image>
        ports:
        - containerPort: 8080
        env:
        - name: ENV
          value: "production"
```

**Add Container Image**

1. Click **Add Primary Artifact** → Select **Google Artifact Registry** or **GCR**
2. Configure:
   - **GCP Connector**: Select the GCP connector you created in Prerequisites
   - **Project**: Your GCP project ID
   - **Image Path**: Path to your container image
   - **Tag**: Select tag or use `<+input>`

3. Click **Continue** to proceed to Environment configuration.

:::info
Harness also supports [Google Cloud Functions](/docs/continuous-delivery/deploy-srv-diff-platforms/google-cloud-functions/google-functions) and [GKE](/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/kubernetes-deployments-overview).
:::

</TabItem>
<TabItem value="azure" label="Azure">

**Azure Functions Service Configuration**

Sample configuration files are available at the [harnesscd-example-apps repository](https://github.com/harness-community/harnesscd-example-apps/tree/master/azure-function-deployment).

1. In the **Service** tab, click **+ Add Service**
2. Provide a **Name** (e.g., `azure-function`) and click **Save**

**Add Azure Function Configuration**

1. Click **Add Manifest** → Select **Azure Function App Configuration**
2. Configure:
   - **Manifest Source**: Git or Harness File Store
   - **Git Connector**: Select the Git connector you created in Prerequisites (if using Git)

**Sample Application Settings:**

```json
{
  "AzureWebJobsStorage": "<storage-connection-string>",
  "FUNCTIONS_WORKER_RUNTIME": "node",
  "FUNCTIONS_EXTENSION_VERSION": "~4"
}
```

**Add Function Artifact**

1. Click **Add Primary Artifact**
2. Select artifact source:
   - **Azure Artifacts**: For packages
   - **ACR**: Select the ACR connector you created in Prerequisites
3. Configure connector and artifact details

3. Click **Continue** to proceed to Environment configuration.

:::info
Harness also supports [Azure Web Apps](/docs/continuous-delivery/deploy-srv-diff-platforms/azure/azure-web-apps-tutorial) and [AKS](/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/kubernetes-deployments-overview).
:::

</TabItem>
<TabItem value="lambda" label="AWS Lambda">

**AWS Lambda Service Configuration**

Sample configuration files are available at the [harnesscd-example-apps repository](https://github.com/harness-community/harnesscd-example-apps/tree/master/aws-lambda).

1. In the **Service** tab, click **+ Add Service**
2. Provide a **Name** (e.g., `lambda-function`) and click **Save**

**Add Lambda Function Definition**

1. Click **Add Manifest** → Select **AWS Lambda Function Definition**
2. Configure:
   - **Manifest Source**: Git or Harness File Store
   - **Git Connector**: Select the Git connector you created in Prerequisites (if using Git)
   - **File Path**: Path to your function definition JSON

**Sample Lambda Function Definition** ([view full example](https://github.com/harness-community/harnesscd-example-apps/blob/master/aws-lambda/function-definition.json)):

```json
{
  "FunctionName": "hello-world-lambda",
  "Runtime": "python3.9",
  "Role": "arn:aws:iam::123456789012:role/lambda-execution-role",
  "Handler": "lambda_function.lambda_handler",
  "Code": {
    "S3Bucket": "<+artifact.bucketName>",
    "S3Key": "<+artifact.key>"
  },
  "Description": "Hello World Lambda function",
  "Timeout": 30,
  "MemorySize": 128,
  "Publish": true
}
```

:::note
Replace the `Role` ARN with your actual Lambda execution role ARN.
:::

**Add Lambda Artifact**

1. Click **Add Primary Artifact** → Select **Amazon S3**
2. Configure:
   - **AWS Connector**: Select the AWS connector you created in Prerequisites
   - **Region**: `us-east-1` (or your region)
   - **Bucket**: Your S3 bucket name (where you uploaded the ZIP in Prerequisites)
   - **File Path**: `hello-world.zip` (the file you uploaded)

**Sample artifact**: [hello-world.zip](https://github.com/harness-community/harnesscd-example-apps/blob/master/aws-lambda/hello_world.zip)

3. Click **Continue** to proceed to Environment configuration.

:::info
Harness also supports [ECS](/docs/continuous-delivery/deploy-srv-diff-platforms/aws/ecs/ecs-deployment-tutorial), [SAM](/docs/continuous-delivery/deploy-srv-diff-platforms/aws/aws-sam-deployments), and [other AWS services](/docs/category/aws).
:::

</TabItem>
</Tabs>

---

## Step 4: Configure Environment and Infrastructure

Define where you're deploying (Environment) and the specific infrastructure details. Select your deployment platform:

<Tabs groupId="deployment-platform" queryString className="tabs--full-width">
<TabItem value="kubernetes" label="Kubernetes" default>

**Kubernetes Environment & Infrastructure**

**Create Environment**

1. Click **+ New Environment**
2. Configure:
   - **Name**: `dev-environment`
   - **Environment Type**: **Pre-Production**
3. Click **Save**

**Define Infrastructure**

1. Click **+ Select Infrastructure**
2. Provide **Name**: `k8s-dev-cluster`
3. Configure connection:
   - **Connector**: Select the Kubernetes cluster connector you created in Prerequisites
   - **Namespace**: Enter target namespace (e.g., `default`, `dev`, `production`)
   - **Release Name**: `release-<+INFRA_KEY>` (for deployment tracking)

4. Click **Continue** to proceed to Execution.

:::info
See [Kubernetes infrastructure](/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/define-your-kubernetes-target-infrastructure) for advanced configuration options.
:::

</TabItem>
<TabItem value="ssh" label="SSH / Traditional">

**SSH Deployment Environment & Infrastructure**

**Create Environment**

1. Click **+ New Environment**
2. Configure:
   - **Name**: `production-servers`
   - **Environment Type**: **Production**
3. Click **Save**

**Define Infrastructure**

1. Click **+ Select Infrastructure**
2. Provide **Name**: `prod-vms`
3. Configure SSH connection:

**For Static Host List:**
   - **Connector**: Select the SSH connector you created in Prerequisites
   - **Hosts**: Add target host IPs or hostnames (e.g., `192.168.1.10`, `server1.example.com`)
   - **Host Attributes**: Add tags for organization (optional)

**For Dynamic Infrastructure:**
   - **Cloud Provider**: Select AWS/Azure/GCP connector from Prerequisites
   - **Region**: Select region
   - **Tags**: Define filters to dynamically select instances

4. Click **Continue** to proceed to Execution.

:::info
See [SSH infrastructure](/docs/continuous-delivery/deploy-srv-diff-platforms/traditional/ssh-ng#infrastructure) for configuration details.
:::

</TabItem>
<TabItem value="gcp" label="Google Cloud Run">

**Google Cloud Run Environment & Infrastructure**

**Create Environment**

1. Click **+ New Environment**
2. Configure:
   - **Name**: `gcp-production`
   - **Environment Type**: **Production**
3. Click **Save**

**Define Infrastructure**

1. Click **+ Select Infrastructure**
2. Provide **Name**: `cloud-run-infra`
3. Configure:
   - **GCP Connector**: Select the GCP connector you created in Prerequisites
   - **Project**: Your GCP project ID (e.g., `my-project-123456`)
   - **Region**: Select region (e.g., `us-central1`, `us-east1`)

4. Click **Continue** to proceed to Execution.

:::info
See [Cloud Run infrastructure](/docs/continuous-delivery/deploy-srv-diff-platforms/google-cloud-functions/google-cloud-run) for configuration details.
:::

</TabItem>
<TabItem value="azure" label="Azure">

**Azure Functions Environment & Infrastructure**

**Create Environment**

1. Click **+ New Environment**
2. Configure:
   - **Name**: `azure-prod`
   - **Environment Type**: **Production**
3. Click **Save**

**Define Infrastructure**

1. Click **+ Select Infrastructure**
2. Provide **Name**: `azure-func-infra`
3. Configure:
   - **Azure Connector**: Select the Azure connector you created in Prerequisites
   - **Subscription**: Select your Azure subscription ID
   - **Resource Group**: Your resource group name (e.g., `my-function-rg`)
   - **Function App Name**: Your function app name (the one you created in Azure Portal)

4. Click **Continue** to proceed to Execution.

:::info
See [Azure Functions infrastructure](/docs/continuous-delivery/deploy-srv-diff-platforms/azure/azure-function-tutorial) for configuration details.
:::

</TabItem>
<TabItem value="lambda" label="AWS Lambda">

**AWS Lambda Environment & Infrastructure**

**Create Environment**

1. Click **+ New Environment**
2. Configure:
   - **Name**: `aws-lambda-prod`
   - **Environment Type**: **Production**
3. Click **Save**

**Define Infrastructure**

1. Click **+ Select Infrastructure**
2. Provide **Name**: `lambda-infra`
3. Configure:
   - **AWS Connector**: Select the AWS connector you created in Prerequisites
   - **Region**: Select your AWS region (e.g., `us-east-1`, `us-west-2`)

4. Click **Continue** to proceed to Execution.

:::info
See [Lambda infrastructure](/docs/continuous-delivery/deploy-srv-diff-platforms/aws/aws-lambda-deployments#infrastructure) for configuration details.
:::

</TabItem>
</Tabs>

## Step 5: Configure Execution Strategy

Different deployment types support different execution strategies. Select your deployment platform to see available strategies:

<Tabs groupId="deployment-platform" queryString className="tabs--full-width">
<TabItem value="kubernetes" label="Kubernetes" default>

**Kubernetes Execution Strategies**

Choose how your Kubernetes deployment will be executed:

1. In the Execution tab, Harness automatically adds a **Rollout Deployment** step

<div style={{textAlign: 'center'}}>
  <DocImage path={require('./static/getting-started-execution-1.png')} width="80%" height="80%" title="Click to view full size image" />
</div>

2. Click on the step to choose your execution strategy:

<div style={{textAlign: 'center'}}>
  <DocImage path={require('./static/getting-started-execution-2.png')} width="80%" height="80%" title="Click to view full size image" />
</div>

**Available Strategies for Kubernetes:**

- **[Rolling](/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/kubernetes-executions/create-a-kubernetes-rolling-deployment)**: Incrementally updates pods with zero downtime. Supports all Kubernetes workloads (Deployment, DaemonSet, etc.)
- **[Blue Green](/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/kubernetes-executions/create-a-kubernetes-blue-green-deployment)**: Deploys new version alongside old, then switches traffic instantly. Supports Deployment workloads only
- **[Canary](/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/kubernetes-executions/create-a-kubernetes-canary-deployment)**: Gradually routes traffic to new version in phases. Supports Deployment workloads only
- **Blank Canvas**: Start with empty execution for custom workflows

3. Select your strategy and click **Use Strategy**

:::info
For more details on Kubernetes deployment strategies, see [What Can I Deploy in Kubernetes?](/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/cd-k8s-ref/what-can-i-deploy-in-kubernetes)
:::

</TabItem>
<TabItem value="ssh" label="SSH / Traditional">

**SSH Deployment Execution Strategy**

SSH deployments primarily use the Rolling deployment strategy:

1. In the Execution tab, Harness automatically adds deployment steps

**Available Strategy:**

- **Rolling**: Deploys to target hosts incrementally, either all at once or in phases. You can specify:
  - Number of instances to deploy simultaneously
  - Percentage-based deployment phases
  - Custom deployment patterns

The Rolling strategy is ideal for traditional deployments as it:
- Maintains service availability during deployment
- Allows for gradual rollout verification
- Supports easy rollback if issues are detected

2. Click **Save** to save your pipeline

:::info
For more details on SSH deployments, see [SSH deployments](/docs/continuous-delivery/deploy-srv-diff-platforms/traditional/ssh-ng)
:::

</TabItem>
<TabItem value="gcp" label="Google Cloud">

**Google Cloud Run Execution Strategies**

Choose how your Cloud Run deployment will be executed:

1. In the Execution tab, select your deployment strategy

**Available Strategies for Cloud Run:**

- **[Basic](/docs/continuous-delivery/deploy-srv-diff-platforms/google-cloud-functions/google-cloud-run)**: Deploys new revision and routes 100% of traffic immediately
  - Steps: Download Manifest → Prepare Rollback → Deploy
- **[Canary](/docs/continuous-delivery/deploy-srv-diff-platforms/google-cloud-functions/google-cloud-run)**: Gradually shifts traffic from old to new revision
  - Steps: Download Manifest → Prepare Rollback → Deploy → Traffic Shift

**For Google Cloud Functions (2nd gen):**

- **Basic**: Deploys new function version and routes 100% traffic
- **Canary**: Gradually routes traffic to new version
- **Blue Green**: Deploys new version and switches traffic at once

**For Google Cloud Functions (1st gen):**
- **Basic only**: Deploys new function and terminates the old one

2. Select your strategy and Harness will automatically add the required steps

3. Click **Save** to save your pipeline

:::info
For more details, see [Google Cloud Functions](/docs/continuous-delivery/deploy-srv-diff-platforms/google-cloud-functions/google-functions) and [Google Cloud Run](/docs/continuous-delivery/deploy-srv-diff-platforms/google-cloud-functions/google-cloud-run)
:::

</TabItem>
<TabItem value="azure" label="Azure">

**Azure Web Apps & Functions Execution Strategies**

Choose how your Azure deployment will be executed:

1. In the Execution tab, select your deployment strategy

**Available Strategies for Azure Web Apps:**

- **[Basic](/docs/continuous-delivery/deploy-srv-diff-platforms/azure/azure-web-apps-tutorial)**: Deploys to target slot without traffic shifting
  - Step: Slot Deployment
- **[Canary](/docs/continuous-delivery/deploy-srv-diff-platforms/azure/azure-web-apps-tutorial)**: Shifts traffic from production to deployment slot incrementally
  - Steps: Slot Deployment → Traffic Shift (incremental) → Swap Slot
- **[Blue Green](/docs/continuous-delivery/deploy-srv-diff-platforms/azure/azure-web-apps-tutorial)**: Deploys to deployment slot, then swaps all traffic at once
  - Steps: Slot Deployment → Swap Slot

**For Azure Functions:**
- **Basic**: Deploys new function version
- **Custom**: Define your own deployment workflow

:::note
Azure Web Apps use slots for staging and production environments. Rolling strategy is not supported as it doesn't suit the slot-based deployment model.
:::

2. Select your strategy and Harness will automatically add the required steps

3. Click **Save** to save your pipeline

:::info
For more details, see [Azure Web Apps](/docs/continuous-delivery/deploy-srv-diff-platforms/azure/azure-web-apps-tutorial) and [Azure Functions](/docs/continuous-delivery/deploy-srv-diff-platforms/azure/azure-function-tutorial)
:::

</TabItem>
<TabItem value="lambda" label="AWS Lambda">

**AWS Lambda Execution Strategies**

Choose how your Lambda deployment will be executed:

1. In the Execution tab, select your deployment strategy

**Available Strategies for Lambda:**

- **[Basic](/docs/continuous-delivery/deploy-srv-diff-platforms/aws/aws-lambda-deployments)**: Deploys new function version and routes 100% traffic immediately
  - Steps: AWS Lambda Deploy → AWS Lambda Rollback (for rollback)
- **[Canary](/docs/continuous-delivery/deploy-srv-diff-platforms/aws/aws-lambda-deployments)**: Gradually shifts traffic to new version using AWS Lambda's traffic shifting
  - Steps: Lambda Canary Deploy → Traffic Shift (e.g., 10%) → Traffic Shift (100%) → Canary Rollback

**Canary Deployment Details:**
- Deploy new version without shifting traffic initially
- Incrementally route traffic (e.g., 10%, then 100%)
- Add approval steps between traffic shifts to validate deployment health
- Automatic rollback if failure detected

2. Select your strategy and Harness will automatically add the required steps

3. Click **Save** to save your pipeline

:::info
For more details, see [AWS Lambda Deployments](/docs/continuous-delivery/deploy-srv-diff-platforms/aws/aws-lambda-deployments)
:::

</TabItem>
</Tabs>

---

**Optional: Enable Continuous Verification**

Add automated health monitoring to any deployment:

1. Toggle **Enable Continuous Verification**
2. Configure your monitoring tools (APM, logging, metrics)

:::info
Learn about verification in the [Continuous Verification documentation](/docs/continuous-delivery/verify/verify-deployments-with-the-verify-step).
:::

## Step 6: Run Your Pipeline

After completing all configuration steps, execute your deployment:

1. Ensure your pipeline is saved (click **Save** if needed)
2. Click **Run** in the top right corner
3. Provide any required runtime inputs:
   - Artifact versions or tags
   - Environment variables
   - Infrastructure parameters
4. Click **Run Pipeline** to begin execution

Harness will execute your deployment and display real-time progress, logs, and status for each step.

:::info
For detailed information on monitoring execution, viewing logs, troubleshooting failures, and understanding deployment status, see the [Pipeline Execution Walkthrough](/docs/continuous-delivery/cd-onboarding/new-user/pipeline-execution-walkthrough).
:::

## Next Steps

**Explore More Tutorials**

Now that you've completed your first deployment, dive deeper with platform-specific tutorials and sample applications:

- **[Browse all CD Tutorials](/docs/continuous-delivery/tutorials/)** - Step-by-step guides for every deployment type
- **[Harness CD Example Apps Repository](https://github.com/harness-community/harnesscd-example-apps)** - Ready-to-use sample applications for Kubernetes, Helm, AWS Lambda, Azure Functions, Google Cloud Run, and more

:::tip
The [harnesscd-example-apps](https://github.com/harness-community/harnesscd-example-apps) repository contains complete working examples with manifests, configurations, and artifacts that you can fork and use in your own pipelines.
:::

## What's Next

Congratulations on completing your first deployment! Continue your Harness CD journey:

- **[Learn about Variables](/docs/platform/variables-and-expressions/add-a-variable)** - Use variables for dynamic pipeline configuration
- **[Set up Pipeline Triggers](/docs/platform/triggers/tutorial-cd-trigger)** - Automate deployments based on events
- **[Explore Continuous Verification](/docs/continuous-delivery/verify/verify-deployments-with-the-verify-step)** - Add automated deployment verification
- **[Configure Approval Steps](/docs/continuous-delivery/x-platform-cd-features/cd-steps/approvals/using-harness-approval-steps-in-cd-stages)** - Add manual or automated approvals

<UniversityAdmonition title="Harness CD self-paced training">

  For an interactive onboarding experience including advanced features like **canary deployments**, **blue-green strategies**, and **automated rollbacks**, check out [**Harness CD self-paced training**](https://developer.harness.io/university/continuous-delivery).

</UniversityAdmonition>
