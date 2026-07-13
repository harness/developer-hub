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

This topic walks you through creating your first deployment pipeline in Harness Continuous Delivery (CD).

:::tip New to Harness CD?

Start with the <a href="/docs/continuous-delivery/overview" target="_blank" rel="noopener noreferrer">CD overview</a> to understand key concepts, including <a href="/docs/continuous-delivery/x-platform-cd-features/services/services-overview" target="_blank" rel="noopener noreferrer">services</a>, <a href="/docs/continuous-delivery/x-platform-cd-features/environments/environment-overview" target="_blank" rel="noopener noreferrer">environments</a>, pipelines, and <a href="/docs/continuous-delivery/manage-deployments/deployment-concepts" target="_blank" rel="noopener noreferrer">deployment strategies</a>.

:::

---

## What will you learn in this topic?

- How to [create a deployment pipeline](#step-1-create-your-pipeline).
- How to [add a Deploy stage and configure your deployment](#step-2-add-a-deploy-stage-and-configure-deployment).
- How to [configure a service](#step-3-configure-your-service) to define what to deploy.
- How to [set up an environment and infrastructure](#step-4-configure-environment-and-infrastructure) to define where to deploy.
- How to [choose an execution strategy](#step-5-configure-execution-strategy) for your deployment.
- How to [run your first deployment](#step-6-run-your-pipeline).

---

## Before you begin

Ensure you have the following:

- **A Harness account**: <a href="https://app.harness.io/auth/#/signup/?module=cd" target="_blank" rel="noopener noreferrer">Sign up for free</a>.
- **Access to a Harness project**: Use the Default Project or create your own.

---

## Platform setup

Select your deployment platform to get started with the required setup and <a href="/docs/category/connectors" target="_blank" rel="noopener noreferrer">connectors</a>.

<Tabs groupId="deployment-platform" className="tabs--full-width">
<TabItem value="kubernetes" label="Kubernetes" default>

Set up your Kubernetes cluster and configure the required connectors to deploy containerized applications with Harness CD.

**Infrastructure requirements:**
- A Kubernetes cluster (local like <a href="https://k3d.io/" target="_blank" rel="noopener noreferrer">K3D</a>, or cloud-managed like GKE, EKS, AKS).
- `kubectl` access to your cluster.
- Application deployed to a container registry (Docker Hub, ECR, GCR, and so on).
- **A Harness Delegate installed**: Required to connect to your cluster. Go to the <a href="/docs/platform/delegates/install-delegates/overview" target="_blank" rel="noopener noreferrer">delegate installation guide</a> to install one.

**Quick verification:**
```bash
# Verify kubectl access
kubectl cluster-info
kubectl get nodes
```

**Required connectors:**

- **Kubernetes Cluster Connector**: Connects Harness to your cluster.
   - Go to **Project Settings** > **Connectors** > **New Connector** > **Kubernetes Cluster**.
   - Choose connection method (Delegate, Service Account, and so on).
   - Go to <a href="/docs/platform/connectors/cloud-providers/add-a-kubernetes-cluster-connector" target="_blank" rel="noopener noreferrer">Create a Kubernetes connector</a> for detailed steps.

- **Git Connector**: For storing Kubernetes manifests.
   - Go to **Project Settings** > **Connectors** > **New Connector** > **GitHub/GitLab/Bitbucket**.
   - Provide repository URL and authentication (Personal Access Token recommended).
   - Go to <a href="/docs/platform/connectors/code-repositories/ref-source-repo-provider/git-connector-settings-reference" target="_blank" rel="noopener noreferrer">Git connector setup</a> for detailed steps.

- **Docker Registry Connector**: For pulling container images.
   - Go to **Project Settings** > **Connectors** > **New Connector** > **Docker Registry**.
   - For Docker Hub: Use `https://registry.hub.docker.com/v2/`.
   - For ECR/GCR/ACR: Use respective registry URLs.
   - Go to <a href="/docs/platform/connectors/cloud-providers/ref-cloud-providers/docker-registry-connector-settings-reference" target="_blank" rel="noopener noreferrer">Docker Registry connector</a> for detailed steps.

</TabItem>
<TabItem value="ssh" label="SSH / Traditional">

Prepare your target hosts and configure the required connectors to deploy applications to virtual machines or physical servers over SSH.

**Infrastructure requirements:**
- Target VMs or servers (on-premises or cloud)
- SSH key-based authentication configured
- Application artifacts in a repository (Artifactory, Nexus, S3, and so on)
- **A Harness Delegate installed**: Required to execute deployment commands on your servers. Go to the <a href="/docs/platform/delegates/install-delegates/overview" target="_blank" rel="noopener noreferrer">delegate installation guide</a> to install one.

**SSH key setup:**
```bash
# Generate SSH key if needed
ssh-keygen -t rsa -b 4096 -f ~/.ssh/harness_deploy

# Copy public key to target servers
ssh-copy-id -i ~/.ssh/harness_deploy.pub user@server-ip
```

**Required connectors:**

- **SSH Key Secret**: Store your private SSH key.
   - Go to **Project Settings** > **Secrets** > **New Secret** > **File**.
   - Upload your private SSH key file.
   - Go to <a href="/docs/platform/secrets/add-file-secrets" target="_blank" rel="noopener noreferrer">SSH secret setup</a> for detailed steps.

- **SSH Connector**: Connects to your servers.
   - Go to **Project Settings** > **Connectors** > **New Connector** > **SSH**.
   - Provide host details and select SSH key secret.
   - Go to <a href="/docs/platform/secrets/add-use-ssh-secrets" target="_blank" rel="noopener noreferrer">Add and reference SSH secrets</a> for detailed steps.

- **Artifact Repository Connector**: For application packages.
   - **For Artifactory**: Go to **Connectors** > **New Connector** > **Artifactory**.
   - **For Nexus**: Go to **Connectors** > **New Connector** > **Nexus**.
   - **For S3**: Go to **Connectors** > **New Connector** > **AWS** > Configure S3 access.
   - Go to <a href="/docs/platform/connectors/cloud-providers/ref-cloud-providers/artifactory-connector-settings-reference" target="_blank" rel="noopener noreferrer">Artifactory connector settings</a> for detailed steps.

</TabItem>
<TabItem value="gcp" label="Google Cloud Run">

Configure your Google Cloud environment and the required connectors to deploy containerized applications to Cloud Run.

**Infrastructure requirements:**
- A GCP project with billing enabled.
- For Cloud Run: Cloud Run API enabled.
- For GKE: A GKE cluster.
- Container image in GCR or Artifact Registry.

**Enable required APIs:**
```bash
# Enable Cloud Run API
gcloud services enable run.googleapis.com

# Enable Artifact Registry
gcloud services enable artifactregistry.googleapis.com

# Enable Container Registry (if using GCR)
gcloud services enable containerregistry.googleapis.com
```

**Required connectors:**

- **GCP Connector**: Connects Harness to Google Cloud.
   - Go to **Project Settings** > **Connectors** > **New Connector** > **GCP**.
   - Choose authentication: Service Account Key or GCE VM.
   - Provide service account key (JSON) with required permissions.
   - Go to <a href="/docs/platform/connectors/cloud-providers/connect-to-google-cloud-platform-gcp" target="_blank" rel="noopener noreferrer">GCP connector setup</a> for detailed steps.

   **Required GCP permissions:**
   - Cloud Run: `roles/run.admin`
   - Artifact Registry: `roles/artifactregistry.reader`
   - GKE: `roles/container.developer`

- **Git Connector** (if using Git for manifests).
   - Go to **Project Settings** > **Connectors** > **New Connector** > **GitHub/GitLab**.
   - Provide repository URL and authentication.
   - Go to <a href="/docs/platform/connectors/code-repositories/ref-source-repo-provider/git-connector-settings-reference" target="_blank" rel="noopener noreferrer">Git connector setup</a> for detailed steps.

- **GCR/Artifact Registry Connector**: For container images.
   - Go to **Project Settings** > **Connectors** > **New Connector** > **GCR/GAR**.
   - Select your GCP connector.
   - Specify registry hostname.
   - Go to <a href="/docs/platform/connectors/cloud-providers/ref-cloud-providers/gcs-connector-settings-reference" target="_blank" rel="noopener noreferrer">GCR connector setup</a> for detailed steps.

</TabItem>
<TabItem value="azure" label="Azure">

Set up your Azure environment and configure the required connectors to deploy applications to Azure services.

**Infrastructure requirements:**
- An Azure subscription with appropriate permissions.
- For Functions: Function App created in Azure Portal.
- For Web Apps: App Service plan configured.
- Application package or container image ready.

**Azure CLI verification:**
```bash
# Login to Azure
az login

# Verify subscription
az account show

# List resource groups
az group list
```

**Required connectors:**

- **Azure Connector**: Connects Harness to Azure.
   - Go to **Project Settings** > **Connectors** > **New Connector** > **Azure**.
   - Select authentication: Service Principal or Managed Identity.
   - Provide:
     - Application (Client) ID
     - Tenant ID
     - Client Secret (create as Harness Secret first)
   - Go to <a href="/docs/platform/connectors/cloud-providers/add-a-microsoft-azure-connector" target="_blank" rel="noopener noreferrer">Azure connector setup</a> for detailed steps.

   **Required Azure permissions:**
   - Contributor role on resource group or specific: `Microsoft.Web/sites/*` for Web Apps/Functions

- **Git Connector** (for configuration files).
   - Go to **Project Settings** > **Connectors** > **New Connector** > **GitHub/GitLab**.
   - Provide repository URL and authentication.
   - Go to <a href="/docs/platform/connectors/code-repositories/ref-source-repo-provider/git-connector-settings-reference" target="_blank" rel="noopener noreferrer">Git connector setup</a> for detailed steps.

- **Azure Container Registry Connector** (for containerized apps).
   - Go to **Project Settings** > **Connectors** > **New Connector** > **Docker Registry**.
   - Use ACR login server URL (e.g., `myregistry.azurecr.io`).
   - Authenticate using Azure credentials or ACR admin credentials.
   - Go to <a href="/docs/platform/connectors/cloud-providers/ref-cloud-providers/docker-registry-connector-settings-reference" target="_blank" rel="noopener noreferrer">ACR connector setup</a> for detailed steps.

</TabItem>
<TabItem value="lambda" label="AWS Lambda">

Prepare your AWS environment and configure the required connectors to deploy serverless applications to AWS Lambda.

**Infrastructure requirements:**
- An AWS account with appropriate IAM permissions.
- Lambda execution role with required policies.
- S3 bucket for deployment packages (or ECR for container images).
- Deployment package (ZIP file) uploaded to S3.

**AWS CLI verification:**
```bash
# Verify AWS credentials
aws sts get-caller-identity

# List S3 buckets
aws s3 ls

# Verify Lambda access
aws lambda list-functions --region us-east-1
```

**Required connectors:**

- **AWS Connector**: Connects Harness to AWS.
   - Go to **Project Settings** > **Connectors** > **New Connector** > **AWS**.
   - Choose authentication method:
     - **Access Key** (recommended for getting started)
     - **IAM Role** (recommended for production)
     - **IRSA** (for EKS)
   - For Access Key method:
     - Create a secret for Access Key ID.
     - Create a secret for Secret Access Key.
   - Go to <a href="/docs/platform/connectors/cloud-providers/add-aws-connector" target="_blank" rel="noopener noreferrer">AWS connector setup</a> for detailed steps.

   **Required IAM policies:**
   - `AWSLambda_FullAccess` or `AWSLambdaFullAccess`
   - `IAMReadOnlyAccess` (for role verification)
   - `AmazonS3ReadOnlyAccess` (for artifact retrieval)

- **Git Connector**: For Lambda function definitions.
   - Go to **Project Settings** > **Connectors** > **New Connector** > **GitHub/GitLab**.
   - Provide repository URL and authentication.
   - Example repo: `https://github.com/harness-community/harnesscd-example-apps`.
   - Go to <a href="/docs/platform/connectors/code-repositories/ref-source-repo-provider/git-connector-settings-reference" target="_blank" rel="noopener noreferrer">Git connector setup</a> for detailed steps.

- **AWS Secrets**: Store AWS credentials.
   - Go to **Project Settings** > **Secrets** > **New Secret** > **Text**.
   - Create two secrets to use in the AWS connector:
     - `aws_access_key_id`: Your AWS Access Key ID.
     - `aws_secret_access_key`: Your AWS Secret Access Key.

**Pre-deployment setup:**
- Upload your Lambda deployment package (ZIP) to S3 bucket.
- Note the bucket name and file path - you will need these in Step 3.
- Ensure Lambda execution role ARN is ready - you will need it in the function definition.

</TabItem>
</Tabs>

---

:::note

- Complete all connector setups before proceeding. You select these connectors in the following steps.
- Test each connector. Use the **Test Connection** button to verify connectivity.
- Save connector identifiers. You reference these by name when configuring services and environments.

:::

---

## Step 1: Create your pipeline

Perform the following steps to create your first deployment pipeline:

### Navigate to Pipelines

1. From your Harness project, select **Pipelines** from the left navigation menu.
2. Click **+ Create a Pipeline**.

<div style={{textAlign: 'center'}}>
  <DocImage path={require('./static/getting-started-1.png')} width="80%" height="80%" title="Click to view full size image" />
</div>

### Configure pipeline basics

1. Provide a **Name** for your pipeline. For example, **Deploy to Production**.
2. Select **Inline** for **Pipeline Storage** (stores configuration in Harness).
3. Click **Start**.

<div style={{textAlign: 'center'}}>
  <DocImage path={require('./static/getting-started-2.png')} width="60%" height="60%" title="Click to view full size image" />
</div>

:::note
You can also store pipelines in Git using **Remote** storage. Go to the <a href="/docs/category/pipelines" target="_blank" rel="noopener noreferrer">Pipelines documentation</a> for details.
:::

---

## Step 2: Add a Deploy stage and configure deployment

Perform the following steps to add a Deploy stage and configure your deployment based on your target platform:

1. Select the **Deploy** stage type.

<div style={{textAlign: 'center'}}>
  <DocImage path={require('./static/getting-started-3.png')} width="80%" height="80%" title="Click to view full size image" />
</div>

2. In the **About your Stage** section:
   - Enter a **Stage Name**. For example, **Deploy to Dev**.
   - Select the **Deployment Type** that matches your infrastructure from the following:
     - **Kubernetes**: Deploy to any Kubernetes cluster.
     - **AWS Lambda**: Serverless functions on AWS.
     - **Google Cloud Run**: Fully managed containers on GCP.
     - **Azure Web Apps**: PaaS web applications on Azure.
     - **Azure Functions**: Serverless compute on Azure.
     - **SSH**: Deploy to Linux/Windows servers.

   :::tip
   Harness supports 20+ deployment types including ECS, Helm, SAM, Google Cloud Functions, Spot, Tanzu, and more. For the complete list, go to <a href="/docs/continuous-delivery/cd-integrations" target="_blank" rel="noopener noreferrer">What's Supported in CD</a>.
   :::

3. Click **Set Up Stage** to continue.

:::warning
The deployment type you select here determines the configuration needed in Service, Environment, and Infrastructure sections. Make sure to follow the same deployment type throughout all configuration steps.
:::

---

## Step 3: Configure your service

The <a href="/docs/continuous-delivery/x-platform-cd-features/services/services-overview" target="_blank" rel="noopener noreferrer">service</a> defines what you are deploying (application, artifacts, manifests).

Select the deployment platform based on the requirement:

<Tabs groupId="deployment-platform" queryString className="tabs--full-width">
<TabItem value="kubernetes" label="Kubernetes" default>

Define the Kubernetes service by adding a manifest and a container image to deploy.

**Add a service**

1. In the **Service** tab, click **+ Add Service**.
2. Provide a **Name**. For example, `nginx-service`.
3. Click **Save**.

**Add Kubernetes manifest**

1. Click **Add Manifest**.
2. Select **K8s Manifest**.
3. Configure the following:
   - **Manifest Identifier**: `k8s-manifest`.
   - **Git Connector**: Select the Git connector you created in [Platform setup](#platform-setup).
   - **Repository**: Use `https://github.com/harness-community/harnesscd-example-apps`.
   - **Branch**: `master`.
   - **File Path**: `guestbook/manifest.yaml`.

**Sample manifest:**

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

**Add container image**

1. Click **Add Primary Artifact**.
2. Select **Docker Registry**.
3. Configure the following:
   - **Artifact Source Name**: `nginx`.
   - **Docker Registry Connector**: Select the Docker Registry connector you created in [Platform setup](#platform-setup).
   - **Image Path**: `library/nginx`.
   - **Tag**: Select `stable` or use `<+input>` for runtime input.
4. Click **Continue** to proceed to environment configuration.

:::note
Harness also supports <a href="/docs/continuous-delivery/deploy-srv-diff-platforms/helm/helm-cd-quickstart" target="_blank" rel="noopener noreferrer">Helm charts</a> and <a href="/docs/continuous-delivery/deploy-srv-diff-platforms/kustomize/kustomize-quickstart" target="_blank" rel="noopener noreferrer">Kustomize</a> for Kubernetes deployments.
:::

</TabItem>
<TabItem value="ssh" label="SSH / Traditional">

Define the service by adding the application package to deploy to your target hosts.

**Add a service**

1. In the **Service** tab, click **+ Add Service**.
2. Enter a **Name**. For example, `tomcat-app`.
3. Click **Save**.

**Add application package**

1. Click **Add Primary Artifact**.
2. Select artifact source based on what you configured in [Platform setup](#platform-setup):
   - **Artifactory**: For JARs, WARs, and so on.
   - **Nexus**: For Maven artifacts.
   - **Amazon S3**: For packages.
3. Configure the following:
   - **Connector**: Select the artifact repository connector you created in [Platform setup](#platform-setup).
   - **Artifact Path**: Path to your application package.
   - **Format**: JAR, WAR, TAR, ZIP, and so on.

   For example, for a WAR file from Artifactory:

   - **Repository**: `libs-release-local`.
   - **Artifact Path**: `com/example/myapp/1.0/myapp-1.0.war`.

**Add deployment scripts (optional)**

1. Click **Add Config File** to add installation or startup scripts.
2. Add pre-deployment and post-deployment scripts as needed.
3. Click **Continue** to proceed to environment configuration.

:::note
Harness also supports <a href="/docs/continuous-delivery/deploy-srv-diff-platforms/traditional/win-rm-tutorial" target="_blank" rel="noopener noreferrer">WinRM deployments</a> for Windows servers.
:::

</TabItem>
<TabItem value="gcp" label="Google Cloud Run">

Define the Cloud Run service by adding a service definition and a container image to deploy.

Sample configuration files are available in the <a href="https://github.com/harness-community/harnesscd-example-apps/tree/master/google-cloud-run" target="_blank" rel="noopener noreferrer">harnesscd-example-apps repository</a>.

**Add a service**

1. In the **Service** tab, click **+ Add Service**.
2. Enter a **Name**. For example, `cloud-run-service`.
3. Click **Save**.

**Add Cloud Run service definition**

1. Click **Add Manifest**.
2. Select **Google Cloud Run Service Definition**.
3. Configure the following:
   - **Manifest Source**: Git Repository.
   - **Git Connector**: Select the Git connector you created in [Platform setup](#platform-setup).

**Sample Cloud Run service definition:**

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

**Add container image**

1. Click **Add Primary Artifact**.
2. Select **Google Artifact Registry** or **GCR**.
3. Configure the following:
   - **GCP Connector**: Select the GCP connector you created in [Platform setup](#platform-setup).
   - **Project**: Your GCP project ID.
   - **Image Path**: Path to your container image.
   - **Tag**: Select tag or use `<+input>`.
4. Click **Continue** to proceed to environment configuration.

:::note
Harness also supports <a href="/docs/continuous-delivery/deploy-srv-diff-platforms/google-cloud-functions/google-functions" target="_blank" rel="noopener noreferrer">Google Cloud Functions</a> and <a href="/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/kubernetes-deployments-overview" target="_blank" rel="noopener noreferrer">GKE</a>.
:::

</TabItem>
<TabItem value="azure" label="Azure">

Define the Azure service by adding a function configuration and an artifact to deploy.

Sample configuration files are available in the <a href="https://github.com/harness-community/harnesscd-example-apps/tree/master/azure-function-deployment" target="_blank" rel="noopener noreferrer">harnesscd-example-apps repository</a>.

**Add a service**

1. In the **Service** tab, click **+ Add Service**.
2. Enter a **Name**. For example, `azure-function`.
3. Click **Save**.

**Add Azure function configuration**

1. Click **Add Manifest**.
2. Select **Azure Function App Configuration**.
3. Configure the following:
   - **Manifest Source**: Git or Harness File Store.
   - **Git Connector**: Select the Git connector you created in [Platform setup](#platform-setup) (if using Git).

**Sample application settings:**

```json
{
  "AzureWebJobsStorage": "<storage-connection-string>",
  "FUNCTIONS_WORKER_RUNTIME": "node",
  "FUNCTIONS_EXTENSION_VERSION": "~4"
}
```

**Add function artifact**

1. Click **Add Primary Artifact**.
2. Select an artifact source:
   - **Azure Artifacts**: For packages.
   - **ACR**: Select the ACR connector you created in [Platform setup](#platform-setup).
3. Configure the connector and artifact details.
4. Click **Continue** to proceed to environment configuration.

:::note
Harness also supports <a href="/docs/continuous-delivery/deploy-srv-diff-platforms/azure/azure-web-apps-tutorial" target="_blank" rel="noopener noreferrer">Azure Web Apps</a> and <a href="/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/kubernetes-deployments-overview" target="_blank" rel="noopener noreferrer">AKS</a>.
:::

</TabItem>
<TabItem value="lambda" label="AWS Lambda">

Define the Lambda service by adding a function definition and an artifact to deploy.

Sample configuration files are available in the <a href="https://github.com/harness-community/harnesscd-example-apps/tree/master/aws-lambda" target="_blank" rel="noopener noreferrer">harnesscd-example-apps repository</a>.

**Add a service**

1. In the **Service** tab, click **+ Add Service**.
2. Enter a **Name**. For example, `lambda-function`.
3. Click **Save**.

**Add Lambda function definition**

1. Click **Add Manifest**.
2. Select **AWS Lambda Function Definition**.
3. Configure the following:
   - **Manifest Source**: Git or Harness File Store.
   - **Git Connector**: Select the Git connector you created in [Platform setup](#platform-setup) (if using Git).
   - **File Path**: Path to your function definition JSON.

**Sample Lambda Function Definition** (<a href="https://github.com/harness-community/harnesscd-example-apps/blob/master/aws-lambda/function-definition.json" target="_blank" rel="noopener noreferrer">view full example</a>):

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

**Add Lambda artifact**

1. Click **Add Primary Artifact**.
2. Select **Amazon S3**.
3. Configure the following:
   - **AWS Connector**: Select the AWS connector you created in [Platform setup](#platform-setup).
   - **Region**: `us-east-1` (or your region).
   - **Bucket**: Your S3 bucket name (where you uploaded the ZIP in [Platform setup](#platform-setup)).
   - **File Path**: `hello-world.zip` (the file you uploaded).

   **Sample artifact**: <a href="https://github.com/harness-community/harnesscd-example-apps/blob/master/aws-lambda/hello_world.zip" target="_blank" rel="noopener noreferrer">hello-world.zip</a>
4. Click **Continue** to proceed to environment configuration.

:::note
Harness also supports <a href="/docs/continuous-delivery/deploy-srv-diff-platforms/aws/ecs/ecs-deployment-tutorial" target="_blank" rel="noopener noreferrer">ECS</a>, <a href="/docs/continuous-delivery/deploy-srv-diff-platforms/aws/aws-sam-deployments" target="_blank" rel="noopener noreferrer">SAM</a>, and <a href="/docs/category/aws" target="_blank" rel="noopener noreferrer">other AWS services</a>.
:::

</TabItem>
</Tabs>

---

## Step 4: Configure environment and infrastructure

Perform the following steps to define where you are deploying (the <a href="/docs/continuous-delivery/x-platform-cd-features/environments/environment-overview" target="_blank" rel="noopener noreferrer">environment</a>) and the specific infrastructure details:

Select your deployment platform from the following:

<Tabs groupId="deployment-platform" queryString className="tabs--full-width">
<TabItem value="kubernetes" label="Kubernetes" default>

Create an environment to represent your deployment target, then define the Kubernetes infrastructure to deploy to.

**Create environment**

1. Click **+ New Environment**.
2. Configure the following:
   - **Name**: `dev-environment`.
   - **Environment Type**: **Pre-Production**.
3. Click **Save**.

**Define infrastructure**

1. Click **+ Select Infrastructure**.
2. Provide **Name**: `k8s-dev-cluster`.
3. Configure the following:
   - **Connector**: Select the Kubernetes cluster connector you created in [Platform setup](#platform-setup).
   - **Namespace**: Enter target namespace (e.g., `default`, `dev`, `production`).
   - **Release Name**: `release-<+INFRA_KEY>` (for deployment tracking).

4. Click **Continue** to proceed to Execution.

Go to <a href="/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/define-your-kubernetes-target-infrastructure" target="_blank" rel="noopener noreferrer">Kubernetes infrastructure</a> for advanced configuration options.

</TabItem>
<TabItem value="ssh" label="SSH / Traditional">

Create an environment to represent your deployment target, then define the target hosts to deploy to over SSH.

**Create environment**

1. Click **+ New Environment**.
2. Configure the following:
   - **Name**: `production-servers`.
   - **Environment Type**: **Production**.
3. Click **Save**.

**Define infrastructure**

1. Click **+ Select Infrastructure**.
2. Provide **Name**: `prod-vms`.
3. Configure the following:
   - **For a static host list**:
     - **Connector**: Select the SSH connector you created in [Platform setup](#platform-setup).
     - **Hosts**: Add target host IPs or hostnames (e.g., `192.168.1.10`, `server1.example.com`).
     - **Host Attributes**: Add tags for organization (optional).
   - **For dynamic infrastructure**:
     - **Cloud Provider**: Select the AWS, Azure, or GCP connector from [Platform setup](#platform-setup).
     - **Region**: Select a region.
     - **Tags**: Define filters to dynamically select instances.
4. Click **Continue** to proceed to Execution.

Go to <a href="/docs/continuous-delivery/deploy-srv-diff-platforms/traditional/ssh-ng#infrastructure" target="_blank" rel="noopener noreferrer">SSH infrastructure</a> for configuration details.

</TabItem>
<TabItem value="gcp" label="Google Cloud Run">

Create an environment to represent your deployment target, then define the Google Cloud infrastructure to deploy to.

**Create environment**

1. Click **+ New Environment**.
2. Configure the following:
   - **Name**: `gcp-production`.
   - **Environment Type**: **Production**.
3. Click **Save**.

**Define infrastructure**

1. Click **+ Select Infrastructure**.
2. Provide **Name**: `cloud-run-infra`.
3. Configure the following:
   - **GCP Connector**: Select the GCP connector you created in [Platform setup](#platform-setup).
   - **Project**: Your GCP project ID (e.g., `my-project-123456`).
   - **Region**: Select region (e.g., `us-central1`, `us-east1`).

4. Click **Continue** to proceed to Execution.

Go to <a href="/docs/continuous-delivery/deploy-srv-diff-platforms/google-cloud-functions/google-cloud-run" target="_blank" rel="noopener noreferrer">Cloud Run infrastructure</a> for configuration details.

</TabItem>
<TabItem value="azure" label="Azure">

Create an environment to represent your deployment target, then define the Azure infrastructure to deploy to.

**Create environment**

1. Click **+ New Environment**.
2. Configure the following:
   - **Name**: `azure-prod`.
   - **Environment Type**: **Production**.
3. Click **Save**.

**Define infrastructure**

1. Click **+ Select Infrastructure**.
2. Provide **Name**: `azure-func-infra`.
3. Configure the following:
   - **Azure Connector**: Select the Azure connector you created in [Platform setup](#platform-setup).
   - **Subscription**: Select your Azure subscription ID.
   - **Resource Group**: Your resource group name (e.g., `my-function-rg`).
   - **Function App Name**: Your function app name (the one you created in Azure Portal).

4. Click **Continue** to proceed to Execution.

Go to <a href="/docs/continuous-delivery/deploy-srv-diff-platforms/azure/azure-function-tutorial" target="_blank" rel="noopener noreferrer">Azure Functions infrastructure</a> for configuration details.

</TabItem>
<TabItem value="lambda" label="AWS Lambda">

Create an environment to represent your deployment target, then define the AWS infrastructure to deploy to.

**Create environment**

1. Click **+ New Environment**.
2. Configure the following:
   - **Name**: `aws-lambda-prod`.
   - **Environment Type**: **Production**.
3. Click **Save**.

**Define infrastructure**

1. Click **+ Select Infrastructure**.
2. Provide **Name**: `lambda-infra`.
3. Configure the following:
   - **AWS Connector**: Select the AWS connector you created in [Platform setup](#platform-setup).
   - **Region**: Select your AWS region (e.g., `us-east-1`, `us-west-2`).

4. Click **Continue** to proceed to Execution.

Go to <a href="/docs/continuous-delivery/deploy-srv-diff-platforms/aws/aws-lambda-deployments#infrastructure" target="_blank" rel="noopener noreferrer">Lambda infrastructure</a> for configuration details.

</TabItem>
</Tabs>

---

## Step 5: Configure execution strategy

Different deployment types support different execution strategies. Select your deployment platform to view the available strategies:

<Tabs groupId="deployment-platform" queryString className="tabs--full-width">

<TabItem value="kubernetes" label="Kubernetes" default>

Perform the following steps to configure the execution strategy for your Kubernetes deployment:

1. In the **Execution** tab, Harness automatically adds a **Rollout Deployment** step.

   <div style={{textAlign: 'center'}}>
     <DocImage path={require('./static/getting-started-execution-1.png')} width="80%" height="80%" title="Click to view full size image" />
   </div>

2. Click on the step to choose your execution strategy:

   <div style={{textAlign: 'center'}}>
     <DocImage path={require('./static/getting-started-execution-2.png')} width="80%" height="80%" title="Click to view full size image" />
   </div>

   **Available strategies for Kubernetes:**

   - <a href="/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/kubernetes-executions/create-a-kubernetes-rolling-deployment" target="_blank" rel="noopener noreferrer">Rolling</a>: Incrementally updates pods with zero downtime. Supports all Kubernetes workloads (Deployment, DaemonSet, and so on).
   - <a href="/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/kubernetes-executions/create-a-kubernetes-blue-green-deployment" target="_blank" rel="noopener noreferrer">Blue Green</a>: Deploys new version alongside old, then switches traffic instantly. Supports Deployment workloads only.
   - <a href="/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/kubernetes-executions/create-a-kubernetes-canary-deployment" target="_blank" rel="noopener noreferrer">Canary</a>: Gradually routes traffic to new version in phases. Supports Deployment workloads only.
   - **Blank Canvas**: Start with empty execution for custom workflows.

3. Select your strategy and click **Use Strategy**.

For more details on Kubernetes deployment strategies, go to <a href="/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/cd-k8s-ref/what-can-i-deploy-in-kubernetes" target="_blank" rel="noopener noreferrer">What Can I Deploy in Kubernetes?</a>.

</TabItem>

<TabItem value="ssh" label="SSH / Traditional">

Perform the following steps to configure the execution strategy for your SSH deployment:

1. In the **Execution** tab, Harness automatically adds deployment steps.

   **Available strategy:**

   - **Rolling**: Deploys to target hosts incrementally, either all at once or in phases. You can specify:
     - Number of instances to deploy simultaneously.
     - Percentage-based deployment phases.
     - Custom deployment patterns.

   The Rolling strategy is ideal for traditional deployments as it:
   - Maintains service availability during deployment.
   - Allows for gradual rollout verification.
   - Supports easy rollback if issues are detected.

2. Click **Save** to save your pipeline.

For more details on SSH deployments, go to <a href="/docs/continuous-delivery/deploy-srv-diff-platforms/traditional/ssh-ng" target="_blank" rel="noopener noreferrer">SSH deployments</a>.

</TabItem>

<TabItem value="gcp" label="Google Cloud">

Perform the following steps to configure the execution strategy for your Cloud Run deployment:

1. In the **Execution** tab, select your deployment strategy.

   **Available strategies for Cloud Run:**

   - <a href="/docs/continuous-delivery/deploy-srv-diff-platforms/google-cloud-functions/google-cloud-run" target="_blank" rel="noopener noreferrer">Basic</a>: Deploys new revision and routes 100% of traffic immediately.
     - Steps: Download Manifest > Prepare Rollback > Deploy.
   - <a href="/docs/continuous-delivery/deploy-srv-diff-platforms/google-cloud-functions/google-cloud-run" target="_blank" rel="noopener noreferrer">Canary</a>: Gradually shifts traffic from old to new revision.
     - Steps: Download Manifest > Prepare Rollback > Deploy > Traffic Shift.

   **For Google Cloud Functions (2nd gen):**

   - **Basic**: Deploys new function version and routes 100% traffic.
   - **Canary**: Gradually routes traffic to new version.
   - **Blue Green**: Deploys new version and switches traffic at once.

   **For Google Cloud Functions (1st gen):**
   - **Basic only**: Deploys new function and terminates the old one.

2. Select your strategy and Harness will automatically add the required steps.

3. Click **Save** to save your pipeline.

For more details, go to <a href="/docs/continuous-delivery/deploy-srv-diff-platforms/google-cloud-functions/google-functions" target="_blank" rel="noopener noreferrer">Google Cloud Functions</a> and <a href="/docs/continuous-delivery/deploy-srv-diff-platforms/google-cloud-functions/google-cloud-run" target="_blank" rel="noopener noreferrer">Google Cloud Run</a>.

</TabItem>

<TabItem value="azure" label="Azure">

Perform the following steps to configure the execution strategy for your Azure deployment:

1. In the **Execution** tab, select your deployment strategy.

   **Available strategies for Azure Web Apps:**

   - <a href="/docs/continuous-delivery/deploy-srv-diff-platforms/azure/azure-web-apps-tutorial" target="_blank" rel="noopener noreferrer">Basic</a>: Deploys to target slot without traffic shifting.
     - Step: Slot Deployment.
   - <a href="/docs/continuous-delivery/deploy-srv-diff-platforms/azure/azure-web-apps-tutorial" target="_blank" rel="noopener noreferrer">Canary</a>: Shifts traffic from production to deployment slot incrementally.
     - Steps: Slot Deployment > Traffic Shift (incremental) > Swap Slot.
   - <a href="/docs/continuous-delivery/deploy-srv-diff-platforms/azure/azure-web-apps-tutorial" target="_blank" rel="noopener noreferrer">Blue Green</a>: Deploys to deployment slot, then swaps all traffic at once.
     - Steps: Slot Deployment > Swap Slot.

   **For Azure Functions:**
   - **Basic**: Deploys new function version.
   - **Custom**: Define your own deployment workflow.


2. Select your strategy and Harness will automatically add the required steps.

3. Click **Save** to save your pipeline.

:::note
Azure Web Apps use slots for staging and production environments. Rolling strategy is not supported as it does not suit the slot-based deployment model. For more details, go to <a href="/docs/continuous-delivery/deploy-srv-diff-platforms/azure/azure-web-apps-tutorial" target="_blank" rel="noopener noreferrer">Azure Web Apps</a> and <a href="/docs/continuous-delivery/deploy-srv-diff-platforms/azure/azure-function-tutorial" target="_blank" rel="noopener noreferrer">Azure Functions</a>.
:::

</TabItem>

<TabItem value="lambda" label="AWS Lambda">

Perform the following steps to configure the execution strategy for your Lambda deployment:

1. In the **Execution** tab, select your deployment strategy.

   **Available strategies for Lambda:**

   - <a href="/docs/continuous-delivery/deploy-srv-diff-platforms/aws/aws-lambda-deployments" target="_blank" rel="noopener noreferrer">Basic</a>: Deploys new function version and routes 100% traffic immediately.
     - Steps: AWS Lambda Deploy > AWS Lambda Rollback (for rollback).
   - <a href="/docs/continuous-delivery/deploy-srv-diff-platforms/aws/aws-lambda-deployments" target="_blank" rel="noopener noreferrer">Canary</a>: Gradually shifts traffic to new version using AWS Lambda's traffic shifting.
     - Steps: Lambda Canary Deploy > Traffic Shift (for example, 10%) > Traffic Shift (100%) > Canary Rollback.

   **Canary deployment details:**
   - Deploy new version without shifting traffic initially.
   - Incrementally route traffic (for example, 10%, then 100%).
   - Add approval steps between traffic shifts to validate deployment health.
   - Automatic rollback if failure detected.

2. Select your strategy and Harness will automatically add the required steps.

3. Click **Save** to save your pipeline.

For more details, go to <a href="/docs/continuous-delivery/deploy-srv-diff-platforms/aws/aws-lambda-deployments" target="_blank" rel="noopener noreferrer">AWS Lambda Deployments</a>.

</TabItem>
</Tabs>

---

### Enable Continuous Verification (optional)

You can enable Continuous Verification to automatically monitor your application's health after deployment.

Perform the following steps to enable Continuous Verification:

1. Toggle **Enable Continuous Verification**.
2. Configure your monitoring tools, such as Application Performance Monitoring (APM), logging, and metrics.

Go to the <a href="/docs/continuous-delivery/verify/verify-deployments-with-the-verify-step" target="_blank" rel="noopener noreferrer">Continuous Verification documentation</a> to learn about verification.

---

## Step 6: Run your pipeline

After completing all configuration steps, perform the following steps to execute your deployment:

1. Ensure your pipeline is saved. Click **Save** if needed.
2. In the **Pipeline Editor**, click **Run** in the top right corner.
3. Provide any required runtime inputs:
   - Artifact versions or tags
   - Environment variables
   - Infrastructure parameters
4. Click **Run Pipeline** to begin execution.

Harness executes your deployment and displays real-time progress, logs, and status for each step.

For detailed information on monitoring execution, viewing logs, troubleshooting failures, and understanding deployment status, go to the <a href="/docs/continuous-delivery/cd-onboarding/new-user/pipeline-execution-walkthrough" target="_blank" rel="noopener noreferrer">Pipeline Execution Walkthrough</a>.

---

## Next steps

Now that you have completed your first deployment, continue your Harness CD journey with the following:

- <a href="/docs/continuous-delivery/tutorials/" target="_blank" rel="noopener noreferrer">Browse all CD tutorials</a>: Step-by-step guides for every deployment type.
- <a href="https://github.com/harness-community/harnesscd-example-apps" target="_blank" rel="noopener noreferrer">Harness CD example apps repository</a>: Ready-to-use sample applications for Kubernetes, Helm, AWS Lambda, Azure Functions, Google Cloud Run, and more.
- <a href="/docs/platform/variables-and-expressions/add-a-variable" target="_blank" rel="noopener noreferrer">Variables and expressions</a>: Use variables for dynamic pipeline configuration.
- <a href="/docs/platform/triggers/tutorial-cd-trigger" target="_blank" rel="noopener noreferrer">Pipeline triggers</a>: Automate deployments based on events.
- <a href="/docs/continuous-delivery/verify/verify-deployments-with-the-verify-step" target="_blank" rel="noopener noreferrer">Continuous Verification</a>: Add automated deployment verification.
- <a href="/docs/continuous-delivery/x-platform-cd-features/cd-steps/approvals/using-harness-approval-steps-in-cd-stages" target="_blank" rel="noopener noreferrer">Approval steps</a>: Add manual or automated approvals.

:::tip

The <a href="https://github.com/harness-community/harnesscd-example-apps" target="_blank" rel="noopener noreferrer">harnesscd-example-apps</a> repository contains complete working examples with manifests, configurations, and artifacts that you can fork and use in your own pipelines.

:::

<UniversityAdmonition title="Harness CD self-paced training">

  For an interactive onboarding experience with advanced features like canary deployments, blue-green strategies, and automated rollbacks, go to <a href="https://developer.harness.io/university/continuous-delivery" target="_blank" rel="noopener noreferrer">Harness CD self-paced training</a>.

</UniversityAdmonition>
