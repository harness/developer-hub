
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


<Tabs>
  <TabItem value="Deployments" label="Deployments">


<details>
<summary>Platform features for all deployment types</summary>

import PlatformList from '/docs/continuous-delivery/shared/platform-support.md'

<PlatformList />

</details>


<details>
<summary>Kubernetes</summary>

- **Overview:**
  - [Kubernetes](/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/kubernetes-deployments-overview)
  - [Helm charts](/docs/continuous-delivery/deploy-srv-diff-platforms/helm/helm-cd-quickstart) (v2 and v3)
  - [Kustomize](/docs/continuous-delivery/deploy-srv-diff-platforms/kustomize/kustomize-quickstart)
  - Local ([Harness Community Edition](/docs/continuous-delivery/deploy-srv-diff-platforms/community-ed/harness-community-edition-overview))

- **Supported connectors for deployment:**
  - Kubernetes connector
    + Username and password
    + Client key and secret
    + OIDC authentication
    + Kubernetes service account
    + Assume role binding on delegate configuration
  - Google Cloud connector (GKE authentication)
    + Service Account
    + Google Cloud Role on Delegate
    + Workload Identity
  - Azure Cloud Connector (AKS Authentication)
    + Subscription Id
    + Principal and Service Account
    + GovCloud Support
  - AWS Cloud Connector (EKS Authentication)
    + IRSA
    + Access Key and Secret Key
    + IAM Role
    + GovCloud Support  
- **Supported platforms for deployment:**
  - Self Hosted Kubernetes
  - Google Kubernetes Engine
  - Azure Kubernetes Engine
  - AWS Elastic Kubernetes Service
  - Red Hat OpenShift
- **Versions and tooling support:**
  - Kubectl Client Versions:
    - We support what each of the Cloud Providers support. We recommend users to keep their binary versions up to date.
    - By default, Harness ships with kubectl client version 1.24.3
    - Harness has certified versions: 1.16, 1.25, 1.26, 1.27, 1.28.7, 1.29, 1.30, and 1.31
    - You must install the respective client version on the delegate for Harness to leverage it.
  - Tooling:
    - OpenShift - oc client binary
    - Kustomize - kustomize binary
    - Helm - Helm 3.12 (default) and 2.8 binary
    - Helm 3.8 supported via feature flag `CDS_HELM_VERSION_3_8_0`
- **Limitations:**
  - Helm:
    - Helm Hooks are not supported for this swimlane. Harness manages and orchestrates the manifests and their release.
    - Kustomize:
      - Kustomize Patches are only supported in YAML, not JSON
      - Kustomize Containerized Plugins are not supported
      - Kustomize manifests and patches do **not** support the [custom remote manifest](/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/cd-kubernetes-category/add-a-custom-remote-script-and-manifests) feature.
    - Harness managed resources:
      - Deployment
      - Secrets
      - ConfigMap
      - StatefulSet
      - HorizontalPodAutoScalar
      - PodDisruptionBudget
- **Deployment Performance**
    - Helm deployments might start failing at the delegate due to a large index.yaml files. This causes a CPU spike on the delegate. If you do not provide enough resources to the delegate, you might see failures in pipeline executions. 
     - Certified Limits:
       - Index.yaml file size limit 15Mb
       - 5000 Helm charts have been deployed
       - Kubernetes delegate size: 8GB, 2 CPU
       - 10 parallel deployments
         

- **Supported integrations:**
  - Traffic Shifting for Advanced Deployment Strategies:
    - Istio
    - Nginx Ingress Controller
  - All manifest type sources for fetching Kubernetes resources:
    - Github
    - Gitlab
    - Bitbucket
    - Custom Remote Source Repository
    - Harness Local File Store
    - [Harness Code Repository](/docs/code-repository.md)
  - For Helm Chart Type Manifests we also support:
    - Generic Git Provider
    - Google Cloud Storage
    - Amazon S3 Storage
    - Helm OCI Repository (ACR, ECR, GAR, Artifactory)
    - Helm HTTP Server Repository (Nexus, Artifactory)
  - Artifact repository supported to deploy with manifest:
    - DockerHub
    - Amazon Elastic Container Registry
    - Google Container Registry
    - Azure Container Registry
    - Custom Artifact Source
    - Google Artifact Registry
    - Github Package Registry
    - Nexus 3 (Sonatype 3.50.0 and previous supported)
    - Artifactory

For details on what you can deploy, go to [What Can I Deploy in Kubernetes?](/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/cd-k8s-ref/what-can-i-deploy-in-kubernetes).

### Kubernetes version support

The following versions are tested and supported for Kubernetes Canary, Rolling, and Blue/Green deployments:

- 1.13.0
- 1.14.0
- 1.15.0
- 1.16.0
- 1.17.0
- 1.18.0
- 1.19.4
- 1.20.0
- 1.21.0
- 1.22.0
- 1.23.0
- 1.24.3
- 1.24.9
- 1.25.6
- 1.26.0
- 1.27.0
- 1.30.10
- 1.31.8
- 1.33.4

For details on other tools and versions included in Harness, see [Delegate-required SDKs](/docs/platform/delegates/delegate-reference/delegate-required-sdks).

Guidelines:

- Harness will officially support 3 previous versions from the last stable release. For example, the current most recent stable release is 1.25.6, and so Harness supports 1.24, 1.23, and 1.22.
- Harness supports any other versions of Kubernetes you are using on a best effort basis.
- Harness commits to support new minor versions within 3 months of the first stable release. For example, if the stable release of 1.25.6 occurs on April 15th, we will support it for compatibility by July 15th.

### Helm notes

Helm chart dependencies are not supported in Git source repositories. Helm chart dependencies are supported in Helm Chart Repositories.

### Azure AKS clusters

To use an AKS cluster for deployment, the AKS cluster parameter `disableLocalAccounts` can be set either `true` or `false`.



</details>

<details>
<summary>Native Helm</summary>

- **Overview:**
  - [Native Helm](/docs/continuous-delivery/deploy-srv-diff-platforms/helm/native-helm-quickstart)
- **Supported connectors for deployment:**
  - Kubernetes Connector
    - Username + Password
    - Client Key and Secret
    - OIDC Authentication
    - Kubernetes Service Account
    - Assume Rolebinding on Delegate Configuration
  - Google Cloud Connector (GKE Authentication)
    - Service Account
    - Google Cloud Role on Delegate
    - Workload Identity
  - Azure Cloud Connector (AKS Authentication)
    - Subscription ID
    - Principal and Service Account
    - GovCloud Support
  - AWS Cloud Connector (EKS Authentication)
    - IRSA
    - Access Key and Secret Key
    - IAM Role
    - GovCloud Support 
- **Supported platforms for deployment:**
  - Self Hosted Kubernetes
  - Google Kubernetes Engine
  - Azure Kubernetes Engine
  - AWS Elastic Kubernetes Service
  - Red Hat OpenShift
- **Versions and tooling support:**
  - Helm Client Versions: 2.8 - 3.8
  - We support what each of the Cloud Providers support, we recommend users to keep their binary versions up to date
  - By default Harness ships with helm client 3.12.
  - Tooling:
    - OpenShift - oc client binary
    - Kustomize - kustomize binary
    - Helm - Helm 3.12 & 2.8 binary. Helm 3.8 can be supported via feature flag.
- **Limitations:**
  - Helm 2 is deprecated so there is limited support for Helm 2.
  - Helm 3 is now the default for Harness Helm Chart Deployments.
  - Helm Plugins are not supported
  - Only Basic Deployment Strategy supported (No Canary or Blue-Green Support Out of the box)
- **Supported integrations:**
  - Manifest Sources for fetching Helm Chart:
    - Github
    - Gitlab
    - Bitbucket
    - Generic Git Provider
    - Custom Remote Source Repository
    - Google Cloud Storage
    - Amazon S3 Storage
    - Helm OCI Repository (ACR, ECR, GAR, Artifactory)
    - Helm HTTP Server Repository (Nexus, Artifactory)
    - Harness Local File Store
    - [Harness Code Repository](/docs/code-repository.md)
  - Artifact Repository for Container Images to deploy with Chart:
    - DockerHub
    - Amazon Elastic Container Registry
    - Google Container Registry
    - Azure Container Registry
    - Custom Artifact Source
    - Google Artifact Registry
    - Github Package Registry
    - Nexus 3 (Sonatype 3.50.0 and previous supported)
    - Artifactory

### Notes

Helm chart dependencies are not supported in Git source repositories. Helm chart dependencies are supported in Helm Chart Repositories.

</details>

<details>
<summary>Amazon ECS</summary>

- **Overview:**
  - [AWS ECS](/docs/continuous-delivery/deploy-srv-diff-platforms/aws/ecs/ecs-deployment-tutorial)
- **Supported connectors for deployment:**
- AWS Cloud Connector
  - IRSA
  - Access Key and Secret Key
  - IAM Role
  - GovCloud Support
- **Supported platforms for deployment:**
  - AWS Cloud, any region
  - AWS - Launch Types:
    - Amazon ECS - EC2 - Generally Provisioned Instances
    - Amazon ECS - EC2 - Spot Backed Instances
    - Amazon ECS - Fargate
- **Versions and tooling support:**
  - AWS SDK 
- **Supported integrations:**
  - ECS Service Discovery - Supported via Service Definition
  - ECS Circuit Breaker - Supported via Service Definition
  - Artifact Repository:
    - DockerHub
    - Amazon Elastic Container Registry
    - Azure Container Registry
    - Custom Artifact Source
    - Github Package Registry
    - Nexus 3 (Sonatype 3.50.0 and previous supported)
    - Artifactory
- **Limitations:**
    - [Harness Code Repository](/docs/code-repository.md) is not supported for storing ECS manifest.

</details>



<details>
<summary>Amazon AMI/ASG</summary>

- **Overview:**
  - [AWS AMI/ASG](/docs/continuous-delivery/deploy-srv-diff-platforms/aws/asg/asg-tutorial)
- **Supported connectors for deployment:**
  - AWS cloud connector
    - IRSA
    - Access Key and Secret Key
    - IAM Role
    - GovCloud Support
- **Supported platforms for deployment:**
  - AWS cloud, any region
- **Versions and tooling support:**
  - AWS SDK
- **Limitations:**
  - [Harness Code Repository](/docs/code-repository.md) is not supported for storing your configuration files, User Data, Scaling Policy script and Config File.
</details>


<details>
<summary>AWS Lambda</summary>

- **Overview:**
  - [AWS Lambda](/docs/continuous-delivery/deploy-srv-diff-platforms/aws/aws-lambda-deployments)
- **Supported connectors for deployment:**
  - AWS Cloud Connector
    - IRSA
    - Access Key and Secret Key
    - IAM Role
    - GovCloud supported
- **Supported platforms for deployment:**
  - AWS cloud, any region
- **Versions and tooling support:**
  - AWS SDK
- **Supported integrations:**
  - Artifact Repository Supported to Deploy with Function Definition:
    - Amazon Elastic Container Registry
    - Amazon S3
- **Limitations:**
  - [Harness Code Repository](/docs/code-repository.md) is not supported for storing AWS Lambda Config File, Lambda Function Definition and Lambda Function Alias Definition.


</details>

<details>
<summary>AWS SAM</summary>

- **Overview:**
  - [AWS SAM](/docs/continuous-delivery/deploy-srv-diff-platforms/aws/aws-sam-deployments)
- **Supported connectors for deployment:**
  - AWS cloud connector
    - Access key and secret key
- **Supported platforms for deployment:**
  - AWS cloud, any region
- **Versions and tooling support:**
  - AWS SDK
  - Harness supports standard SAM templates.
- **Supported integrations:**
  - All Git providers are supported for SAM templates.
  - Currently, you cannot add artifacts to your Harness SAM service.
  - [Harness Code Repository](/docs/code-repository.md) is supported for storing your Values YAML file for manifest type **Values YAML**.
- **Limitations:**
  - [Harness Code Repository](/docs/code-repository.md) is not supported for storing AWS SAM manifest when you select manifest type as **AWS SAM Directory**.


</details>


<details>
<summary>Traditional: WinRM</summary>

- **Overview:**
  - [WinRM](/docs/continuous-delivery/deploy-srv-diff-platforms/traditional/win-rm-tutorial)
- **Supported connectors for deployment:**
  - AWS Cloud Connector
    - IRSA
    - Access Key and Secret Key
    - IAM Role
    - GovCloud Support
  - Azure Cloud Connector (AKS Authentication)
    - Subscription Id
    - Principal and Service Account
    - GovCloud Support
- **Supported platforms for deployment:**
  - AWS Cloud
  - Azure Cloud
  - Physical Datacenter

</details>


<details>
<summary>Traditional: SSH</summary>

- **Overview:**
  - [SSH](/docs/continuous-delivery/deploy-srv-diff-platforms/traditional/ssh-ng)
- **Supported connectors for deployment:**
  - AWS Cloud Connector
    - IRSA
    - Access Key and Secret Key
    - IAM Role
    - GovCloud Support
  - Azure Cloud Connector (AKS Authentication)
    - Subscription Id
    - Principal and Service Account
    - GovCloud Support
- **Supported platforms for deployment:**
  - AWS Cloud
  - Azure Cloud
  - Physical Datacenter
- Linux SSH Setups
  - Ubuntu Version 22+
  - RHEL9 (Red Hat Enterprise Linux 9) 
  - SSH libraries supported:
    - SSHJ: used in our HashiCorp Vault SSH integrations.
    - JSCH: used in our SSH deployment types.
    - To see the hostkey formats for these libraries, go to the [SSH implementation comparison](https://ssh-comparison.quendi.de/comparison/hostkey.html).
- **Limitations:**
  - Google Compute Engine (Virtual Machine Targets)
    - Limited Support, Harness can connect to Google VMs via an SSH Key, not via Google Cloud Authentication


</details>


<details>
<summary>Tanzu Application Service (formerly Pivotal Cloud Foundry)</summary>

- **Overview:**
  - [Tanzu Application Services](/docs/continuous-delivery/deploy-srv-diff-platforms/tanzu/tanzu-app-services-quickstart)
- **Supported connectors for deployment:**
  - Tanzu Connector
    - Endpoint URL, Username and Password
- **Supported platforms for deployment:**
  - On Premise Cloud Foundry Installations
  - VMware Tanzu Platform
- **Versions and tooling support:**
  - Binary Versions:
    - CF CLI v7
- **Limitations:**
  - [Harness Code Repository](/docs/code-repository.md) is not supported for storing for all TAS manifest type.




</details>


<details>
<summary>Google Functions</summary>

- **Overview:**
  - [Google Cloud Functions](/docs/continuous-delivery/deploy-srv-diff-platforms/google-cloud-functions/google-functions)
- **Supported connectors for deployment:**
  - Google Cloud Connector
  - Service Account 
- **Supported platforms for deployment:**
  - Google Cloud, any region
- **Versions and tooling support:**
  - Google SDK. Supported versions:
    - Google Functions Gen 1
    - Google Functions Gen 2
- **Deployment strategies:**
    - Google Functions Gen 1: Basic.
    - Google Functions Gen 2: Basic, blue green, canary.
- **Supported integrations:**
  - Artifact Repository:
    - Google Cloud Storage
    - Google Cloud Storage and Google Cloud Source (Gen 1 Only)

</details>

<details>
<summary>Google Cloud Run</summary>

- **Overview:**
  - [Google Cloud Run](/docs/continuous-delivery/deploy-srv-diff-platforms/google-cloud-functions/google-cloud-run)
- **Supported connectors for deployment:**
  - Google Cloud Connector
    - Service Account
    - Google Cloud Role on Delegate
    - Workload Identity
    - OIDC authentication support
- **Supported platforms for deployment:**
  - Google Cloud, any region
- **Versions and tooling support:**
  - Google SDK
  - gcloud CLI
- **Deployment strategies:**
  - Cloud Run Services: Basic and Canary
  - Cloud Run Jobs: Task-based execution
- **Supported integrations:**
  - Artifact Repository:
    - Google Artifact Registry (GAR)
    - Docker Registry
  - Container images for deployment:
    - [harness/google-cloud-run-plugin:1.0.4-linux-amd64](https://hub.docker.com/r/harness/google-cloud-run-plugin/tags)
- **Supported workload types:**
  - Google Cloud Run Services (stateless containerized applications with auto-scaling)
  - Google Cloud Run Jobs (task-based execution, batch processing, scheduled tasks)
- **Limitations:**
  - Requires containerized execution environment for Cloud Run Jobs
  - Feature currently behind feature flag `CDS_GOOGLE_CLOUD_RUN`

</details>

<details>
<summary>Spot Instances</summary>

- **Overview:**
  - [Spot Elastigroup deployments](/docs/continuous-delivery/deploy-srv-diff-platforms/aws/spot/spot-deployment)
- **Supported connectors for deployment:**
  - Spot Connector
    - AccountID + API Token
- **Supported platforms for deployment:**
  - AWS cloud, any region
- **Limitations:**
  - Deployment Behavior:
    - Incremental Traffic Shifting for SpotInst Deployment is not supported
    - VM-based Deployments are supported via Elastigroup configuration

</details>


<details>
<summary>Serverless.com Framework</summary>

- **Overview:**
  - [Serverless.com Framework](/docs/continuous-delivery/deploy-srv-diff-platforms/serverless/serverless-lambda-cd-quickstart) (AWS Lambda)
- **Supported connectors for deployment:**
  - AWS Cloud Connector
    - IRSA
    - Access Key and Secret Key
    - IAM Role
- **Supported platforms for deployment:**
  - AWS cloud, any region
- **Versions and tooling support:**
  - Supported Binary Versions:
    - serverless.com 2.x
    - serverless.com 3.x
    - serverless.com 4.x
    - serverless.com 1.x (deprecated - limited support, not all capabilities supported)
- **Limitations:**
  - Deployment Behavior:
    - Harness only supports AWS Lambda Functions to be deployed via Serverless.com Framework
    - Harness builds and deploys Lambda Functions. You cannot split up the tasks to build functions and deploy functions separately as part of Harness support.
  - Not supported application types:
    - Google Functions
    - Azure Functions
  - Basic deployment supported. No out-of-the-box canary and blue green deployment supported.
- **Supported integrations:**
  - Serverless.com plugins:
    - Harness supports all the Serverless.com plugins. Please make sure they are compatible with the version of Serverless.com you are using.
  - Artifact Repository:
    - DockerHub
    - Amazon Elastic Container Registry
    - Artifactory
    - Amazon S3
  - [Harness Code Repository](/docs/code-repository.md) is supported for storing your Values YAML file for manifest type **Values YAML**.
- **Limitations:**
  - [Harness Code Repository](/docs/code-repository.md) is not supported for storing Serverless Lambda Manifest when you select manifest type as **Serverless Lambda Manifest** as well as for storing Config File.
</details>


<details>
<summary>Azure WebApps</summary>

- **Overview:**
  - [Azure Web Apps](/docs/continuous-delivery/deploy-srv-diff-platforms/azure/azure-web-apps-tutorial)
- **Supported connectors for deployment:**
  - Azure Cloud Connector (AKS Authentication)
    - Subscription Id
    - Principal and Service Account
    - GovCloud Support
- **Supported platforms for deployment:**
  - Azure cloud, any Region
- **Versions and tooling support:**
  - Azure SDK
- **Limitations:**
  - [Harness Code Repository](/docs/code-repository.md) is not supported for storing your Application Settings Script File in Azure Webpps.

</details>

<details>
<summary>Azure Functions</summary>

- **Overview:**
  - [Azure Functions](/docs/continuous-delivery/deploy-srv-diff-platforms/azure/azure-function-tutorial)
- **Supported connectors for deployment:**
  - Azure Cloud Connector
    - Subscription Id
    - Principal and Service Account
    - GovCloud Support
- **Supported platforms for deployment:**
  - Azure cloud, any Region
- **Versions and tooling support:**
  - Azure SDK
  - Azure Functions Runtime
- **Deployment strategies:**
  - Basic deployment
- **Supported integrations:**
  - Artifact Repository:
    - Docker Hub
    - Amazon Elastic Container Registry (ECR)
    - Google Artifact Registry (GAR)
  - Container images for deployment:
    - [Docker Image for Azure Function Plugin](https://hub.docker.com/r/harness/azure-function-plugin/tags)
    - [ECR Image for Azure Function Plugin](https://gallery.ecr.aws/harness/harness/azure-function-plugin)
    - [GAR Image for Azure Function Plugin (Europe)](https://console.cloud.google.com/artifacts/docker/gar-prod-setup/europe/harness-public/harness%2Fazure-function-plugin)
- **Limitations:**
  - Requires containerized execution environment (Kubernetes cluster)
  - [Harness Code Repository](/docs/code-repository.md) is not supported for storing Azure Functions configuration files

</details>

<details>
<summary>Builds in CD</summary>

Continuous Integration (CI) can be performed in Harness using the module and [CI pipelines](/docs/continuous-integration/get-started/key-concepts).

If you are using Harness Continuous Delivery (CD) but not Harness Continuous Integration (CI), you can still perform CI using the Jenkins step in your CD stage.

Harness integrates with [Jenkins](https://jenkins.io/), enabling you to run Jenkins jobs and dynamically capture inputs and outputs from the jobs. 

Harness has been tested with the following versions of Jenkins:
- 2.432
- 2.424
- 2.425
- 2.401.2
- 2.414.2
- 2.398
- 2.397


- **Overview:**
  - [Run Jenkins jobs in CD pipelines](/docs/continuous-delivery/x-platform-cd-features/cd-steps/builds/run-jenkins-jobs-in-cd-pipelines)

</details>

<details>
<summary>GitOps</summary>

- **Overview:**
  - [GitOps](/docs/continuous-delivery/gitops/get-started/harness-git-ops-basics)
  - [GitOps Quickstart](/docs/continuous-delivery/gitops/get-started/harness-cd-git-ops-quickstart)

Harness GitOps lets you perform GitOps deployments in Harness. You define the desired state of the service you want to deploy in your Git manifest, and then use Harness GitOps to sync state with your live Kubernetes cluster.

GitOps supports the following:

- Argo CD versions supported: 2.8.2 and later (up to 2.12.x).
- Source Repositories:
  - All Git providers.
  - HTTP Helm repos.
- Target clusters:
  - Kubernetes clusters hosted on any platform:
    - GKE.
    - AKS.
    - EKS.
    - Other Kubernetes-compliant clusters.
    - OpenShift version 3.11, 4.x.
    - Minikube.
    - Kubernetes Operations (kops).
- Repository Certificates:
  - TLS Certificate (PEM format).
  - SSH Known Host Entry.
- GnuPG Keys:
  - GnuPG Public Key Data (ASCII-armored).
- **Limitations:**
  - Self-hosted environments
    - Agents installed in custom namespaces are not yet supported.

</details>

<details>
<summary>Local (Harness Community Edition)</summary>

Harness CD Community Edition is a lightweight version of Harness that you can download and run on your laptop or any VM.

Harness CD Community Edition is intended to get devs started with Harness quickly without having to sign up for a Harness SaaS account.

- **Overview:**
  - [Harness CD Community Edition overview](/docs/continuous-delivery/deploy-srv-diff-platforms/community-ed/harness-community-edition-overview)
  - [Harness Community Edition deployments](/docs/continuous-delivery/deploy-srv-diff-platforms/community-ed/harness-community-edition-quickstart)

</details>

<details>
<summary>Custom</summary>

For non-native deployments, Harness provides a custom deployment option using Deployment Templates.

- **Overview:**
  - [Custom deployments using Deployment Templates](/docs/continuous-delivery/deploy-srv-diff-platforms/custom/custom-deployment-tutorial)


</details>



</TabItem>
  <TabItem value="Provisioners" label="Provisioners">


Harness supports the following infrastructure provisioning tools:

- [Terraform](/docs/continuous-delivery/cd-infrastructure/terraform-infra/terraform-provisioning-with-harness)
- [Terragrunt](/docs/continuous-delivery/cd-infrastructure/terragrunt-howtos)
- [Azure ARM](/docs/continuous-delivery/cd-infrastructure/azure-arm-provisioning)
- [Azure Blueprint](/docs/continuous-delivery/cd-infrastructure/azure-blueprint-provisioning)
- [AWS CloudFormation](/docs/continuous-delivery/cd-infrastructure/cloudformation-infra/cloud-formation-how-tos)
- [Shell script](/docs/continuous-delivery/cd-infrastructure/shell-script-provisioning) (custom)

### Terraform version support

Harness does not include Terraform on the Harness Delegate. You must install Terraform on the Delegate when using Terraform in Harness. For more information, go to [Terraform How-tos](/docs/continuous-delivery/cd-infrastructure/terragrunt-howtos).

Harness supports the following Terraform versions:

- v1.3.5
- v1.1.9
- v1.0.0
- v0.15.5
- v0.15.0
- v0.14.0

Here's an example install script for the Harness Delegate:

```bash
# Install TF
microdnf install unzip
curl -O -L https://releases.hashicorp.com/terraform/1.3.5/terraform_1.3.5_darwin_amd64.zip
unzip terraform_1.3.5_darwin_amd64.zip
mv ./terraform /usr/bin/
# Check TF install
terraform --version
```

Some Harness features might require specific Terraform versions.

:::info note
Harness also supports Terraform Cloud and Enterprise.
:::


</TabItem>
  <TabItem value="Controls/Utilities" label="Controls/Utilities">


- **Containerized steps:**
  - [Containerize step groups](/docs/continuous-delivery/x-platform-cd-features/cd-steps/containerized-steps/containerized-step-groups)
  - Multiple step types can be run containerized.
- **Controls:**
  - [Strategies](/docs/continuous-delivery/manage-deployments/deployment-concepts): basic, rolling, canary, blue green, custom.
  - [Barriers](/docs/continuous-delivery/manage-deployments/synchronize-deployments-using-barriers)
  - [Resource Constraints](/docs/continuous-delivery/manage-deployments/deployment-resource-constraints)
  - [Queue steps](/docs/continuous-delivery/manage-deployments/control-resource-usage-with-queue-steps)
  - [Deployment freeze](/docs/continuous-delivery/manage-deployments/deployment-freeze)
  - [Failure strategies](/docs/platform/pipelines/failure-handling/define-a-failure-strategy-on-stages-and-steps)
  - [Conditional executions](/docs/platform/pipelines/step-skip-condition-settings)
  - [Looping strategies](/docs/platform/pipelines/looping-strategies/looping-strategies-matrix-repeat-and-parallelism)
  - [Triggers](/docs/category/triggers)
  - [Input set and overlays](/docs/platform/pipelines/input-sets)
- **Utilities:**
  - [Run a Docker container in a CD stage](/docs/continuous-delivery/x-platform-cd-features/cd-steps/utilities/container-step)
  - [Using HTTP requests in CD pipelines](/docs/continuous-delivery/x-platform-cd-features/cd-steps/utilities/http-step)
  - [Using shell scripts in CD stages](/docs/continuous-delivery/x-platform-cd-features/cd-steps/utilities/shell-script-step)
  - [Use the Command step to download or copy artifacts and configs, or run scripts](/docs/continuous-delivery/x-platform-cd-features/cd-steps/utilities/download-and-copy-artifacts-using-the-command-step)
  - [Run a step on multiple target instances](/docs/continuous-delivery/x-platform-cd-features/cd-steps/run-a-script-on-multiple-target-instances)
  - [Wait step](/docs/continuous-delivery/x-platform-cd-features/cd-steps/utilities/wait-step)
  - [Email step](/docs/continuous-delivery/x-platform-cd-features/cd-steps/utilities/email-step)
  - [JSON and XML functors](/docs/continuous-delivery/x-platform-cd-features/cd-steps/utilities/json-and-xml-functors)
- **Build:**
  - [Background step](/docs/continuous-delivery/x-platform-cd-features/cd-steps/containerized-steps/background-step)
  - [Git Clone step](/docs/continuous-delivery/x-platform-cd-features/cd-steps/containerized-steps/git-clone-step)
  - [Run step](/docs/continuous-delivery/x-platform-cd-features/cd-steps/containerized-steps/run-step)
  - [Plugin step](/docs/continuous-delivery/x-platform-cd-features/cd-steps/containerized-steps/plugin-step)


</TabItem>
  <TabItem value="File Store" label="File Store">


Manifests, specifications, config files, and other deployment files can be pulled from the following providers:

- [Harness File Store](/docs/continuous-delivery/x-platform-cd-features/services/add-inline-manifests-using-file-store/)
- [Git on any platform](/docs/platform/connectors/code-repositories/ref-source-repo-provider/git-connector-settings-reference)
- [Github](/docs/platform/connectors/code-repositories/ref-source-repo-provider/git-hub-connector-settings-reference)
- [GitLab](/docs/platform/connectors/code-repositories/ref-source-repo-provider/git-lab-connector-settings-reference)
- [Bitbucket](/docs/platform/connectors/code-repositories/ref-source-repo-provider/bitbucket-connector-settings-reference)
- [AWS CodeCommit](/docs/platform/connectors/cloud-providers/ref-cloud-providers/aws-connector-settings-reference)
- [Azure Repos](/docs/platform/connectors/code-repositories/connect-to-a-azure-repo/)


The following table lists where you can store your manifests or config files for each integration.



|                              | **Github** | **Gitlab** | **Bitbucket** | **Harness File Store** | **Any Git** | **OCI Helm** | **HTTP Helm** | **AWS S3** | **Custom** | **Google Cloud Storage** | **Inherit from manifest** |
|------------------------------| --------- | ---------- | ------------- | --------------------- | ----------- | ------------ | ------------- | ---------- | ---------- | ------------------------ | ------------------------- |
| **Kubernetes**               | ✅         | ✅         | ✅            | ✅                    | ✅          | ✅           | ✅            | ✅         | ✅         | ✅                       | ✅                        |
| **Values YAML**              | ✅         | ✅         | ✅            | ✅                    | ✅          |              |               |            | ✅         |                          | ✅                        |
| **Kustomize**                | ✅         | ✅         | ✅            | ✅                    | ✅          |              |               |            |            |                          |                           |
| **Kustomize Patches**        | ✅         | ✅         | ✅            | ✅                    | ✅          |              |               |            |            |                          | ✅                        |
| **OpenShift Template**       | ✅         | ✅         | ✅            | ✅                    | ✅          |              |               |            | ✅         |                          |                           |
| **OpenShift Params**         | ✅         | ✅         | ✅            | ✅                    | ✅          |              |               |            | ✅         |                          |                           |
| **AWS ECS**                  | ✅         | ✅         | ✅            | ✅                    | ✅          |              |               |            |            |                          | ✅                        |
| **AWS SAM**                  | ✅         | ✅          | ✅             | ✅                    | ✅           |              |               | ✅          |            |                          |                           |
| **Helm Chart**               | ✅         | ✅         | ✅            | ✅                    | ✅          | ✅           | ✅            | ✅         | ✅         | ✅                       | ✅                        |
| **Serverless.com Framework** | ✅         | ✅         | ✅            | ✅                      | ✅          |              |               | ✅           |            |                          |                           |
| **SSH**                      |           |            |               | ✅                    |             |              |               |            |            |                          |                           |
| **WinRM**                    |           |            |               | ✅                    |             |              |               |            |            |                          |                           |
| **Azure Web Apps**           |           |            |               | ✅                    |             |              |               |            |            |                          |                           |
| **Google Cloud Function**    | ✅         | ✅         | ✅            | ✅                    | ✅          |              |              |           |           |                         |                         |


The following table lists supported manifest overrides for each integration.

| **Deployment Type** | **Supported Manifest Overrides** | 
| --- | --- |
| Kubernetes | <ul><li>Values YAML</li><li>OpenShift Param</li><li>Kustomize Patches</li></ul> |
| Helm | <ul><li>Values YAML</li><li>Helm Repo Override</li></ul> |
| AWS ECS | <ul><li>ECS Task Definition</li><li>ECS Service Definition</li><li>ECS Scalable Target</li><li>ECS Policy Scaling</li></ul> |
| AWS ASG | N/A |
| AWS Lambda | <ul><li>AWS Lambda Function Definition</li><li>AWS Lambda Function Alias Definition</li></ul> |
| AWS SAM | <ul><li>Values YAML</li><li>AWS SAM Directory</li></ul> |
| Azure Web Apps | <ul><li>Application Settings</li><li>Connection Strings</li></ul> |
| Azure Functions | N/A |
| Tanzu Application Services | <ul><li>TAS Manifests</li><li>TAS Vars</li><li>TAS Autoscaler</li></ul> |
| SSH | N/A |
| WinRM | N/A |
| Serverless.com Framework | <ul><li>Values YAML</li><li>Serverless AWS Lambda Manifest</li></ul> |
| Google Cloud Functions | N/A |
| Google Cloud Run | N/A |
| Spot Elastigroup | N/A |


</TabItem>
  <TabItem value="CD Artifacts" label="Artifacts">


All artifact sources are covered in [CD artifact sources](/docs/continuous-delivery/x-platform-cd-features/services/artifact-sources).

- Docker registry on any platform
- Google Container Registry (GCR)
- Google Cloud Storage (GCS)
- Google Artifact Registry
- Amazon Elastic Container Registry (ECR)
- AWS S3
- Azure Container Registry (ACR)
- Azure DevOps Artifacts
- Nexus 2 and Nexus 3 (Sonatype 3.50.0 and previous supported)
- Artifactory
- Jenkins
- Bamboo
- Github packages
- HTTP Helm
- OCI Helm
- Custom artifact source


Harness uses **Metadata only** when downloading artifact sources.

For pulling Docker images from Docker repos, Harness is restricted by the limits of the Docker repo. For example, [Docker Hub limits](https://docs.docker.com/docker-hub/download-rate-limit/).

The maximum number of artifact image tags fetched by Harness that is 10000.

The following table lists Harness integrations and their artifact source support:

|                              | **Docker Hub** | **ECR** | **GCR** [:warning: Deprecation Notice](/docs/continuous-delivery/x-platform-cd-features/services/artifact-sources#google-container-registry-gcr)| **GCS** | **ACR** | **Artifactory** | **Nexus 3** | **Custom** | **Google Artifact Registry** | **Github Artifact Registry** | **Jenkins** | **AWS S3** |
| ---------------------------- | -------------- | ------- | ------- | --- | ------- | --------------- | ----------- | ---------- | ---------------------------- | ---------------------------- | ----------- | ---------- |
| **Kubernetes**               | ✅             | ✅      | ✅      |     | ✅      | ✅              | ✅          | ✅         | ✅                           | ✅                           |             |            |
| **Helm**                     | ✅             | ✅      | ✅      |     | ✅      | ✅              | ✅          | ✅         |                              |                              |             |            |
| **AWS ECS**                  | ✅             | ✅      | ✅      |     | ✅      | ✅              | ✅          | ✅         |                              |                              |             |            |
| **AWS ASG**                  |                |         |         |     |         |                 |             |            |                              |                              |             |            |
| **AWS Lambda**               |                | ✅      |         |     |         |                 |             |            |                              |                              |             | ✅         |
| **Azure Web Apps**           | ✅             |         |         |     | ✅      | ✅              | ✅          |            |                              |                              |             |            |
| **Azure Functions**          | ✅             | ✅      |         |     |         |                 |             |            | ✅                           |                              |             |            |
| **Tanzu**                    | ✅             | ✅      | ✅      |     | ✅      | ✅              | ✅          |            |                              |                              |             |            |
| **SSH**                      |                |         |         |     | ✅        | ✅              | ✅          | ✅         |                              |                              | ✅          | ✅         |
| **WinRM**                    |                |         |         |     |         | ✅              | ✅          | ✅         |                              |                              | ✅          | ✅         |
| **Serverless.com Framework** |                | ✅      |         |     |         | ✅              |             |            |                              |                              |             | ✅         |
| **Google Cloud Function**    |                |         |         | ✅    |         |                 |             |            |                              |                              |             |            |
| **Google Cloud Run**         | ✅             |         |         |     |         |                 |             |            | ✅                           |                              |             |            |




</TabItem>
  <TabItem value="Ticketing/Approvals" label="Ticketing/Approvals">


You can use the following ticketing systems for creating and updating tickets, and as approval gates:
- Jira ([ticketing](/docs/continuous-delivery/x-platform-cd-features/cd-steps/ticketing-systems/create-jira-issues-in-cd-stages), [approvals](/docs/platform/approvals/adding-jira-approval-stages))
- ServiceNow ([ticketing](/docs/continuous-delivery/x-platform-cd-features/cd-steps/ticketing-systems/create-service-now-tickets-in-cd-stages), [approvals](/docs/platform/approvals/service-now-approvals))
- [Harness manual approvals](/docs/continuous-delivery/x-platform-cd-features/cd-steps/approvals/using-harness-approval-steps-in-cd-stages)

### Approval workflows

Harness provides flexible approval workflows that can be integrated into your deployment pipelines:

- **Harness Approvals**: Native approval steps that can be configured with user groups, automatic approvals, and custom approval logic
- **Jira Approvals**: Integrate with Jira to use existing ticket workflows for deployment approvals
- **ServiceNow Approvals**: Leverage ServiceNow change management processes for deployment gates
- **Custom Approvals**: Build custom approval logic using conditional execution and API integrations

Key capabilities:
- User group-based approvals with combined or any-member logic
- Auto-reject previous deployments when new ones reach approval stage
- Include stage execution details for informed decision-making
- Timeout and failure strategy configuration
- Approval notifications via email, Slack, MS Teams

For detailed documentation, go to [Approvals](/docs/category/approvals).

For frequently asked questions about ticketing and approvals in CD, go to [Approvals and Ticketing FAQs](/docs/continuous-delivery/x-platform-cd-features/cd-steps/approvals/approvals-and-ticketing-faqs).

**Note:** All detailed approval and ticketing FAQs have been moved to the dedicated [Approvals and Ticketing FAQs](/docs/continuous-delivery/x-platform-cd-features/cd-steps/approvals/approvals-and-ticketing-faqs) page for better organization and easier reference.

</TabItem>
  <TabItem value="Governance" label="Governance">


Harness Policy As Code uses [Open Policy Agent (OPA)](https://www.openpolicyagent.org/) as the central service to store and enforce policies for the different entities and processes across the Harness platform.

You can centrally define and store policies and then select where (which entities) and when (which events) they will be applied.

Currently, you can define and store policies directly in the OPA service in Harness.

Soon, you will be able to use remote Git or other repos (e.g. OCI-compatible registries) to define and store the policies used in Harness.

- [Harness Policy As Code overview](/docs/continuous-delivery/x-platform-cd-features/advanced/cd-governance/harness-governance-overview)
- [Harness Policy As Code quickstart](/docs/continuous-delivery/x-platform-cd-features/advanced/cd-governance/harness-governance-quickstart)
- [Add a Policy step to a pipeline](/docs/continuous-delivery/x-platform-cd-features/advanced/cd-governance/add-a-governance-policy-step-to-a-pipeline)

### Policy as Code limitations

- When configuring a policy for testing, users must have a pipeline that has a policy run against it (success or failed) to capture the pipeline's expanded JSON for the policy studio testing terminal.
- Policies can only be run against one document (one JSON payload sent for OPA evaluation). You cannot run a policy against multiple documents. 
- Not all Harness entities are supported with policies:
  - For CD: service, environment, infrastructure, and overrides are on the roadmap for integration.
  - For Platform: service account, API key, and token are on the roadmap for policy integration.
  - For other product modules: entities will be added as needed.
- Harness does not support OPA bundles.
- Harness does not support data imports from external sources.
- Harness does not support `allow`, to support this use case you need to invert the logic, Harness OPA supports deny and not allow.

For frequently asked questions about OPA policies and governance, go to [OPA FAQs](/docs/continuous-delivery/x-platform-cd-features/advanced/cd-governance/opa-faqs).

**Note:** All detailed governance and OPA policy FAQs have been moved to the dedicated [OPA FAQs](/docs/continuous-delivery/x-platform-cd-features/advanced/cd-governance/opa-faqs) page for better organization and easier reference.

</TabItem>
</Tabs>


### Notes

- AWS and Azure GovCloud: Harness is now certified in Azure GovCloud and AWS GovCloud.

## Harness Self-Managed Enterprise Edition (SMP) including offline Environments

All CD features supported in Harness SaaS are also supported in Self-Managed Enterprise Edition with the following exceptions:

- **Dashboards:** Harness [CD Dashboards](https://developer.harness.io/docs/continuous-delivery/monitor-deployments/monitor-cd-deployments) might not be completely functional with a bundled [Timescale community edition](https://docs.timescale.com/about/latest/timescaledb-editions/) version installation.
- **Triggers:** The feature flag `CD_GIT_WEBHOOK_POLLING` must be enabled for Github polling with two factor authentication. For more information, go to [Polling frequency](https://developer.harness.io/docs/platform/triggers/triggers-reference/#polling-frequency).
- **ServiceNow:** ServiceNow versions [Utah](https://docs.servicenow.com/bundle/utah-release-notes/page/release-notes/family-release-notes.html) and earlier are supported.
- **Jira:** Jira on-premise versions < 9.0 are supported. To support Jira on-premise >= 9.0, the feature flag `SPG_USE_NEW_METADATA` must be enabled.
- **Policy as Code:** Harness Git Experience support for OPA policies is not supported in Self-Managed Enterprise Edition.
- **Harness AI Development Assistant (AIDA):** To support AIDA in Self-Managed Enterprise Edition running in an offline environment, you must add `https://harness.openai.azure.com` to your allowlist.
