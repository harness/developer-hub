
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
    - 1.16
    - 1.28.7
    - We support what each of the Cloud Providers support. We recommend users to keep their binary versions up to date.
    - By default, Harness ships with kubectl client - 1.24.3
    - Harness has certified versions 1.25, 1.26, 1.27, and 1.28.7 of kubectl. You must install the respective client version of the delegate for Harness to leverage it.
  - Tooling:
    - OpenShift - oc client binary
    - Kustomize - kustomize binary
    - Helm - Helm 3.12 and 2.8 binary.
    - Helm 3.8 can be supported via feature flag.
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
  - [AWS AMI/ASG](/docs/continuous-delivery/deploy-srv-diff-platforms/aws/asg-tutorial)
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
<summary>Spot Instances</summary>

- **Overview:**
  - [Spot Elastigroup deployments](/docs/continuous-delivery/deploy-srv-diff-platforms/aws/spot-deployment)
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
    - serverless.com 1.x
    - serverless.com 2.x
    - serverless.com 3.x
- **Limitations:**
  - Deployment Behavior:
    - Harness only supports AWS Lambda Functions to be deployed via Serverless.com Framework
    - Harness builds and deploys Lambda Functions> You cannot split up the tasks to build functions and deploy functions separately as part of Harness support.
  - Not supported application types:
    - Google Functions
    - Azure Functions
  - Serverless.com 1.x (limited support). Not all capabilities supported.
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

- Argo CD version supported: 2.8.2.
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
  - [Email step](/docs/continuous-delivery/x-platform-cd-features/cd-steps/utilities/email_step)
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
| Tanzu Application Services | <ul><li>TAS Manifests</li><li>TAS Vars</li><li>TAS Autoscaler</li></ul> |
| SSH | N/A |
| WinRM | N/A |
| Serverless.com Framework | <ul><li>Values YAML</li><li>Serverless AWS Lambda Manifest</li></ul> |
| Google Cloud Functions | N/A |
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

|                              | **Docker Hub** | **ECR** | **GCR** | **GCS** | **ACR** | **Artifactory** | **Nexus 3** | **Custom** | **Google Artifact Registry** | **Github Artifact Registry** | **Jenkins** | **AWS S3** |
| ---------------------------- | -------------- | ------- | ------- | --- | ------- | --------------- | ----------- | ---------- | ---------------------------- | ---------------------------- | ----------- | ---------- |
| **Kubernetes**               | ✅             | ✅      | ✅      |     | ✅      | ✅              | ✅          | ✅         | ✅                           | ✅                           |             |            |
| **Helm**                     | ✅             | ✅      | ✅      |     | ✅      | ✅              | ✅          | ✅         |                              |                              |             |            |
| **AWS ECS**                  | ✅             | ✅      | ✅      |     | ✅      | ✅              | ✅          | ✅         |                              |                              |             |            |
| **AWS ASG**                  |                |         |         |     |         |                 |             |            |                              |                              |             |            |
| **AWS Lambda**               |                | ✅      |         |     |         |                 |             |            |                              |                              |             | ✅         |
| **Azure Web Apps**           | ✅             |         |         |     | ✅      | ✅              | ✅          |            |                              |                              |             |            |
| **Tanzu**                    | ✅             | ✅      | ✅      |     | ✅      | ✅              | ✅          |            |                              |                              |             |            |
| **SSH**                      |                |         |         |     | ✅        | ✅              | ✅          | ✅         |                              |                              | ✅          | ✅         |
| **WinRM**                    |                |         |         |     |         | ✅              | ✅          | ✅         |                              |                              | ✅          | ✅         |
| **Serverless.com Framework** |                | ✅      |         |     |         | ✅              |             |            |                              |                              |             | ✅         |
| **Google Cloud Function**    |                |         |         | ✅    |         |                 |             |            |                              |                              |             |            |




</TabItem>
  <TabItem value="Ticketing/Approvals" label="Ticketing/Approvals">


You can use the following ticketing systems for creating and updating tickets, and as approval gates:
- Jira ([ticketing](/docs/continuous-delivery/x-platform-cd-features/cd-steps/ticketing-systems/create-jira-issues-in-cd-stages), [approvals](/docs/platform/approvals/adding-jira-approval-stages))
- ServiceNow ([ticketing](/docs/continuous-delivery/x-platform-cd-features/cd-steps/ticketing-systems/create-service-now-tickets-in-cd-stages), [approvals](/docs/platform/approvals/service-now-approvals))
- [Harness manual approvals](/docs/continuous-delivery/x-platform-cd-features/cd-steps/approvals/using-harness-approval-steps-in-cd-stages)

### Ticket and Approvals FAQs

#### How can Harness detect if the sub-tickets in Jira are closed before the approval process runs?

The first step is to make API calls to the Jira issue endpoint. By inspecting the response from the API call, you can check if the 'subtask' field is populated for the main issue.  Once you identify the subtask issue keys from the API response, you can create a loop to retrieve the status of each sub-ticket using their respective issue keys. This will allow you to determine if the sub-tickets are closed or not before proceeding with the approval process in Harness.


#### Is there an existing solution in place or under development to accommodate a use case where a customer intends to employ their existing JIRA instance for managing deployment processes and approvals?

In the context of Harness, there is no necessity to create a duplicate ticket for approval purposes. Instead, a streamlined approach involves utilizing the "Approval" and "Update" steps while omitting the "Create" step. Additionally, you can designate the JIRA issue key as a runtime input, allowing individuals to input the relevant issue key when initiating the process. This approach ensures efficiency and avoids the redundancy of ticket creation.


#### What could be the possible issue for not able create a SNOW ticket from a template ?

One can check for below possibilities : 

-  Is the Harness app installed in the servicenow instance used by this connector.
Please refer here for [Reference](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/cd-steps/ticketing-systems/create-service-now-tickets-in-cd-stages/#servicenow-user-roles)

- Is the permissions for the integrated user include `x_harne_harness_ap.integration_user_role`.
Please refer here for [Reference](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/cd-steps/ticketing-systems/create-service-now-tickets-in-cd-stages/#:~:text=Make%20sure%20you%20have%20the%20following%20roles)


#### We're working on a Harness Pipeline (To Create a JIRA Issue) and want to trigger it via a python script (on AWS Lambda). While triggering the pipeline We also need to send JIRA Issue Description data into it.  

You can use API to execute the pipeline [api](https://apidocs.harness.io/tag/Pipeline-Execute#operation/postPipelineExecuteWithInputSetList)

In the created pipeline you can add a Jira update step with the required details to update the issue [Doc](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/cd-steps/ticketing-systems/update-jira-issues-in-cd-stages/)


#### How can specific users be able to approve the deployment?

You can create a user group of specific users and specify the same user group in the Approval stage so only those users can able to approve the execution.

For reference: [Select Approvers](https://developer.harness.io/docs/platform/approvals/adding-harness-approval-stages/#select-approvers)


#### When querying the Harness Approval API, the approval details are returning with the message, No approval found for execution.

The API will only return Approval details if there are any approval step pending for approval. If there are no such executions currently, then its expected to return No Approval found for execution


#### If we have multiple services using this same pipeline template, both within and outside the same project, does Harness differentiate each pipeline execution by service? If both service1 and service2 in the same project are using this same pipeline and are sitting at the approval step, would approving the service1 pipeline cause the service2 pipeline to be rejected?

The pipelines will run just fine, as you used the template and specified different services at the runtime , so it will run independently. 


#### How do I preserve my Manual approval step msg format in email body?

Emails are rendered in HTML, so different HTML tags can be added to approval steps message and these tag will be resolved as per HTML defination and same will be vivsible in email's body


#### What types of events can trigger notifications in Harness pipelines?
Notifications can be triggered for various events, such as pipeline starts, pipeline successes, pipeline failures, specific workflow steps, and manual approvals. You can customize the triggers based on your requirements.


#### Auto-Reject previous deployments paused in this step on approval

If you have multiple services using this same pipeline template, both within and outside the same project, If both service1 and service2 in the same project are using this same pipeline and are sitting at the approval step. 
As the template used here has been specified with different services at the runtime, so it will run independently. 


#### How can we provide more details in approval step for approver
You can use Include stage execution details in approval option so that approvers get the execution history for this Pipeline. This can help approvers make their decision.


#### Can I implement a custom approval step that runs a script, calls Jira, and fails if the issue count is greater than 0 ?

No, it is not yet introduced for Jira. It is only applicable for Harness Approvals at the moment


#### What is the time limit for a pipeline execution?

The maximum limits for a single pipeline run are 35 days for paid plans and 4 hour for free plans with a verified account.

These limits are applied because:
- There is a limit on the total number of concurrent and queued executions. If some pipelines run/wait for days/weeks, they consume valuable resources from other projects in the account and delay queues.
- Usually, very long running pipelines are waiting on something (approvals, test results, deployments) that took longer than expected. A quicker timeout makes it clear that something went wrong in the workflow, instead of indefinitely waiting.
- Long running pipelines impact the availablility of Harness resources.

For more information, go to [Deloyment logs and limitations](https://developer.harness.io/docs/continuous-delivery/manage-deployments/deployment-logs-and-limitations) and [Pipeline settings](https://developer.harness.io/docs/platform/pipelines/pipeline-settings).


#### Can we use Env/Infra etc variable as skip condition for approval stage
If approval is added as stage then these variables will not be available and only account/org/project or pipeline variables will be available, If you are using approval as step inside Deploy stage than you can access Env/Infra variables as well


#### How do I provide, the Jira project as an expression for the Jira approval step?
In the Jira approval step For the the Jira project field, we only support fixed and runtime input for now, Expressions are not supported.


#### In case of CD pipeline, the use case is like, we need to deploy multiple services via single pipeline, for which we can use multiservice select, and we can refer the artifact of previous stage to the next stage. However, is there any possible way by which I can refer to the single service of previous stage and its artifact.Use case if for approval stage where we need to run the stage once as only one approval should be required to deploy multiple services.

For using a single service of the previous stage and its artifact you can use the expressions from the previous stage service output variables, and you can use the expression in your next service artifact.


#### On Harness approval steps, when using expressions for the description, how can we add line breaks ?

One can try using the expression `\\` or `\u000a` to make an expression work.


#### If the approval step is timed out, Is there any way to continue deployment?

You can use the failure strategy to move the pipeline forward if the approval step is timeout.
On the approval step's advance section, go to failure strategy and use the mark as success to make the step successful and the pipeline will move to the next step.


#### How does Harness NG rollback if something goes wrong in Production. Will it be automatically done or do we need to trigger anything manually?

You can perform rollbacks manually, automatically, or use a hybrid option (triggering it automatically but requiring approval before it happens).
Post-deployment rollback: This can be considered a manual approach, allowing you to rollback deployments that succeeded on technical criteria but that you want to roll back for other reasons. 
Rollback as a failure strategy: This could be considered an automatic approach. Whenever something is deployed into your environment and an issue occurs during the execution, the failure strategy will trigger the rollback flow. This can be a custom flow or a pre-generated one by Harness.


#### How to mark the pipeline as success even the approval got rejected?

To configure a pipeline to be marked as successful even if an approval is rejected, follow these steps:
1. Navigate to the `Advanced` tab of your pipeline configuration.
2. Under this tab, locate the section labeled `Failure Strategy`.
3. In this section, select `Approval Rejection` from the dropdown `On Failure of type`.
4. Next, choose the `Perform Action` option.
5. From the available actions, select `Mark as Success`.


#### Can manual approval stages in Harness be configured to make approverInputs mandatory?

The approver inputs are optional by default. However, it is possible to enforce a policy that denies a pipeline from proceeding if the approver input is not provided. Below is an example of a policy that can be applied using the On Run/On Save event for a pipeline:

```
package pipeline

# Deny a pipeline if an Approval step is missing approver inputs
deny[msg] {
    stage := input.pipeline.stages[_].stage
    step := stage.spec.execution.steps[_].step
    step.type == "HarnessApproval"
    count(step.spec.approverInputs) == 0
    msg := sprintf("Approval step '%s' in stage '%s' is missing approver inputs", [step.name, stage.name])
}
```


#### Can you update Jira issues using Harness?
Yes, you can update Jira issues and add Jira approval stages and steps using Harness.


#### Does Harness provide Pause/Resume Pipeline functionality in NextGen ?

Yes, the Pause/Resume Pipeline functionality is provided behind the `FF: PIE_DEPRECATE_PAUSE_INTERRUPT_NG`. It is not planned to depricate the feature but due to feature complexity it is advisable to use the Harness Approval steps. 
Please read more on how to use Automated Harness Approval steps in the following [Documentation](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/cd-steps/approvals/using-harness-approval-steps-in-cd-stages/#prevent-approval-by-pipeline-executor)


#### Will there be support for service account keys in the approval API?

At present, our authentication system exclusively accommodates user API Key-based authentication. However, it is pertinent to note that support for service account authentication is under development as feature request.


#### Is it possible to insert a hyperlink with markdown in the approval message?

In order to resolve this version as an hyperlink on slack you can use (`|`) symbol to seperate the link and text to creeate a hyperlink. This Slack formatting includes the link and the text you want to display, separated by a pipe (`|`) character. 

Replace the URL and version with your actual values, and enclose the link and the version text inside `<>`, such as `<https://github.com/harness/guestbook/blob/main/.harness/inputover.yaml | Version>`


#### How can I configure approval emails in child pipelines to direct recipients to the parent pipeline execution instead of the child?

Yes, the approval message links you to the child pipeline rather than the parent pipeline.


#### What pipeline statuses are considered when determining concurrent active pipeline executions ?

Concurrent active pipeline executions comprises of active and in-progress executions. This includes those that are paused temporarily by steps such as the wait step or approval step. Currently there are plans to exclude pipelines that are waiting for approval.


#### Is there a way to see which user acts on the wait step to mark it as a success or mark it as fail?

One can look at having Harness approval step in addition to wait step for this usecase, also can set a failure strategy in case it timeout
Please read more on Harness approval step in the following [Documentation](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/cd-steps/approvals/using-harness-approval-steps-in-cd-stages/#add-approval-step)


#### How do I dynamically pass a single user group or multiple into an Approval Stage?

First, set the User Groups section in the approval stage to `combined`. This allows you to pass a list of User Groups. Harness expects the value to be a list so passing as a string won't work. Instead, pass an expression as shown below.
```
<+<+stage.variables.groups>.split(",")>
```

The variable `groups` mentioned above can be a list of groups or a single group. 

Both of these example values work for the `groups` variable.

- `groupA,groupB,groupC`
- `group1`


#### Can we transition to any status in jira using update step?

Jira supports transition to steps as per the workflow defined for the project. Only allowed transition from a specic status to another as per the workflow will be allowed.


#### How do we add comment with Jira step.

To add comment you need to use "Comment" as a key and "\\" to add line breaks


#### Does Harness actively working on the connector to make it compatible with Jira Cloud , or should one initiate the setup of a delegate for the Jira connector ?

Yes, one would need delegate for setting up jira connector, platform based jira connector is not planned to be supported


#### What Jira Date fields are supported by Harness?
The harness supports the Baseline End Date and Start Date Time fields.


#### What is the purpose of the issue link field in Jira?
The issue link field in Jira is used to support parent links, enabling the Jira Create step to create issues with existing issues as their parent.


</TabItem>
  <TabItem value="Governance" label="Governance">


Harness Policy As Code uses [Open Policy Agent (OPA)](https://www.openpolicyagent.org/) as the central service to store and enforce policies for the different entities and processes across the Harness platform.

You can centrally define and store policies and then select where (which entities) and when (which events) they will be applied.

Currently, you can define and store policies directly in the OPA service in Harness.

Soon, you will be able to use remote Git or other repos (e.g. OCI-compatible registries) to define and store the policies used in Harness.

- [Harness Policy As Code overview](/docs/continuous-delivery/x-platform-cd-features/advanced/cd-governance/harness-governance-overview)
- [Harness Policy As Code quickstart](/docs/continuous-delivery/x-platform-cd-features/advanced/cd-governance/harness-governance-quickstart)
- [Add a Policy step to a pipeline](/docs/continuous-delivery/x-platform-cd-features/advanced/cd-governance/add-a-governance-policy-step-to-a-pipeline)

#### Policy as Code limitations

- When configuring a policy for testing, users must have a pipeline that has a policy run against it (success or failed) to capture the pipeline's expanded JSON for the policy studio testing terminal.
- Policies can only be run against one document (one JSON payload sent for OPA evaluation). You cannot run a policy against multiple documents. 
- Not all Harness entities are supported with policies:
  - For CD: service, environment, infrastructure, and overrides are on the roadmap for integration.
  - For Platform: service account, API key, and token are on the roadmap for policy integration.
  - For other product modules: entities will be added as needed.
- Harness does not support OPA bundles.
- Harness does not support data imports from external sources.
- Harness does not support `allow`, to support this use case you need to invert the logic, Harness OPA supports deny and not allow.

#### General Governance FAQs

#### How do I use OPA policy to enforce environment type for each deployment stage in a pipeline i.e. prod or preprod?

The infra details are passed as stage specs.

For example, to access the environment type, the path would be - ```input.pipeline.stages[0].stage.spec.infrastructure.environment.type```
You will have to loop across all the stages to check its infra spec.


#### What kind of payload type is supported for policy step?

Policy step is onl ysupported against a JSON payload.


#### How do I form a OPA Policy to identify pipeline source ?

In pipeline YAML, we dont have pipeline source identifer but the remote pipelines will have githubConfig section, which can be used to form any required policy.


#### How do I check what YAML is checked against the OPA policies?

The actual YAML that is passed to the OPA engine can be viewd by following these steps - 
Create any policy, and apply it on the pipeline.
Go to evaluation under the policy menu
Click on the required pipeline and open the policy, you can see the actual YAML under the "Input" window.


#### How do I filter policy evaluation by status?

Under the evaluations section of policies we have a dropdown to filter based on status of policy evaluations. Currently we only support failed and sucess status not warned/warning


#### How do I created a OPA policy to enforce environment type?

The infra details are passed as stage specs.
For example, to access the environment type, the path would be - ```input.pipeline.stages[0].stage.spec.infrastructure.environment.type```
You will have to loop across all the stages to check its infra spec.


#### How to pass variables to Rego policy language

The OPA engine is designed to enforce policies based on data and rules that are predefined and provided as policies. It does not support taking dynamic input/variable values for policy evaluation during evaluations because policies are typically intended to be static and consistent. You can add a policy step as a workaround to work with variables during executions.


#### What could be the reason for SSH timeout ?

If you are facing SSH timeout error please check for possible cause below :

- Check if you are able to SSH from delegate terminal to the host itself
- Check if the firewall rules are have delegate IPs whitelisted 
- Check if the host is reachable before or during first time setup
- Check if the Proxy/VPN used is having correct configurations 
- Check if there is a policy for rotating IP's, need to update the same in existing configuration
- Check the host URI if it has undergone any changes in credentials
- Check if correct delegate is picked during the execution , if not use delegate selector to pick the correct one .
- Check the timeout defined for the step is optimum to reach the host if not cross check and increase accordingly .
- Check  if any recent feature flags enabled causing this .



#### Is there any way to enforce the pipeline naming convention while creating or cloning the pipeline
Currently, there is no built-in way to enforce pipeline naming conventions while creating or cloning pipelines in Harness. However, you can create a OPA policy that can be applied using the On Save event for a pipeline to enforce the naming convention. 
 
The policy can check if the pipeline name matches the repo name and deny the pipeline creation if it doesn't match. More on OPA Policy here: https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/advanced/cd-governance/harness-governance-overview/


#### Can we deploy lambda function without update-function-code policy
Harness needs this permission to modify code in lambda function and in rollback also this is needed.
Although, you can deploy a new function without this permission but can't update an existing function.


#### What is the Account setting for image pull policy for setupAddonContainer during initialize phase ?

We have Account settings named `Default Image Pull Policy For Add On Container` for image pull policy for setupAddonContainer during initialize phase.


#### Differentiate between inline and remote pipelines in OPA policy?

In the remote pipeline when passed against the OPA engine, the following info is passed -
 
```
"pipeline": {
    "gitConfig": {
      "branch": "master",
      "filePath": ".harness/test_GITX_OAUTH.yaml",
      "repoName": "harness-pipeline"
    },
    "identifier": "test_GITX_OAUTH",
```

Remote pipelines have git-config info in YAML but for the inline pipeline, we don't pass anything. It directly starts with the identifier -

``` 
"pipeline": {
    "identifier": "test",
    "name": "test1234",
 ```
 
A policy can be created to check of above info.


#### Why do I see delay in OPA evaluation for remote pipelines?

In the case of remote pipelines, where customers can make updates to files in Git, we provide validations asynchronously when a user attempts to access the file. If a customer opens the pipeline through the user interface, they will encounter an option labeled "validations." In the event of a failure in the OPA policy, we will be able to inform the user that a modification was made in Git that is not in compliance. This is done to give the user insight into the situation, although we won't be able to prevent users from still making updates to YAML files in Git


#### How can one validate an issue while saving a pipeline ?

For validating an issue first one should know how we save a pipeline : 

- When user click on pipeline save, we try to validate the yaml using schema
- If pipeline contains templates, we try to fetch templates and nested templates too so that we can see any issues
- We create filters and other validations based on different types of stages
- We do policy evaluations
- Finally, inline vs remote where we have remote dependency.
- Essentially, the pipeline size, the nested structure & location can vary the response times.
If one feels like an issue for latency in API response receiving please consider above steps and take actions accordingly.


#### Is there a way to determine whether the pipeline method was stored remotely or inline?

This information is available through our OPA policies. To illustrate, you can create a policy to validate the pipeline YAML/JSON when running the pipeline. Here's an example policy:

```
package pipeline

# Generate an error if the pipeline is inline
deny[msg] {
    input.pipeline.gitConfig # Check if gitConfig exists

    # Display a user-friendly error message
    msg := sprintf("Pipeline is inline")
}
```


#### How to parse multiple yaml manifests in policy steps?

At present, OPA evaluations are performed using JSON inputs for evaluation purposes. The system automatically converts YAML data into JSON and then forwards it to the OPA service for evaluation. While this process works seamlessly for single YAML files, for multiple YAML files it won't work since we don't support it currently.


#### Is it possible to access the JSON/YAML input passed to the policy engine in the pipeline?

Unfortunately, you cannot refer to this JSON within the pipeline. However, you can access all evaluated policies, along with their input, through the UI.


#### Is there a method for enforcing pipeline naming conventions during pipeline creation or cloning?

At present, there is no built-in mechanism to enforce pipeline naming conventions when creating or cloning pipelines in Harness. Nevertheless, you can establish an OPA policy and apply it using the On Save event for a pipeline to enforce the naming convention.


#### Does OPA policy evaluate by resolving expressions present in pipeline YAML?

Unfortunately, Runtime input variables can not be evaluated just by OPA policy. You can implement policy steps in the pipeline to run the policy against the provided variable value.


#### Is there a way to simply update the ECS scaling policy without redeploying the ECS service ?

Many users opt for a shell script approach, where a configuration file is utilized and set as an environment variable. Subsequently, a shell script is crafted to execute the relevant AWS CLI commands, facilitating the update of scaling policies for a deployed service. This versatile method allows for customization and automation across various scenarios and configurations


#### How do we know if a deployment is failing due to Service Control Policy implemented in our AWS account.

If there is any restriction from SCP you will get error with an explicit deny in a service control policy.

 User: arn:aws:iam::7799:user/JohnDoe is not authorized to perform: codecommit:ListRepositories because no service control policy allows the codecommit:ListRespositories action


#### What do we mean by the term delegate expiration ?

Delegates expire after six months. Delegate expiration does not mean the delegate stops working. You may experience issues because the backend has moved too far ahead, and the delegate is no longer backward compatible.
Please read more on this in the following [Documentation](https://developer.harness.io/docs/platform/delegates/install-delegates/delegate-upgrades-and-expiration/#delegate-expiration-policy). Also find release notes based on delegates - [here](https://developer.harness.io/release-notes/delegate/)


#### Why is the GitConfig block not available for remote pipeline policy evaluation?

Policies are evaluated first in case of pipelines being saved and for the first time, we create the pipeline inline and then perform git sync to sync the file with git repo. This may cause a false alert for the first save but should not have an issue in the next modifications.


#### What limitations in Go template rendering of manifests compared to Helm have been identified, and how has the decision been made to address this issue by running it as a Helm job ?

Helm template can render the manifests but Go template cannot. There are limitations in the go template. One may run it as a helm job.
**Note**
- In case of Helm template and application of network policy update with usage of Blue-Green or Canary deployments, please try to run the apply step and apply the network policies before deploying
  Please read more on Apply Step in the following [Documentation](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/cd-k8s-ref/kubernetes-apply-step/)


#### Can manual approval stages in Harness be configured to make approverInputs mandatory?

The approver inputs are optional by default. However, it is possible to enforce a policy that denies a pipeline from proceeding if the approver input is not provided. Below is an example of a policy that can be applied using the On Run/On Save event for a pipeline:

```
package pipeline

# Deny a pipeline if an Approval step is missing approver inputs
deny[msg] {
    stage := input.pipeline.stages[_].stage
    step := stage.spec.execution.steps[_].step
    step.type == "HarnessApproval"
    count(step.spec.approverInputs) == 0
    msg := sprintf("Approval step '%s' in stage '%s' is missing approver inputs", [step.name, stage.name])
}
```


#### Can one implement a system that enables customers to define quotas or limits for Service Instances ?

No, we don’t have a mechanism to let users cap their service instance below their subscribed amount and have the system warn you. But, one can always bake an OPA policy step that triggers a warning in their pipelines if their quota is reached.
Please read more on OPA policy step in the following [Documentation](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/advanced/cd-governance/add-a-governance-policy-step-to-a-pipeline/)


#### What permissions are required to restrict access to creating or editing OPA policies ?

To control the ability to create or edit OPA policies, consider utilizing the `core_governancePolicy_edit` policy. For a comprehensive list of permissions, please refer to the provided [Documentation](https://developer.harness.io/docs/platform/automation/api/api-permissions-reference#governance-policies).


#### Is there a method to configure the Harness GitOps agent auto updater to utilize our Artifactory proxy for Docker Hub, considering policy of not allowing Kubernetes clusters to access the public internet directly ?

Organizations can import the GitOps Image from the specified [Docker Hub repository](https://hub.docker.com/r/harness/gitops-agent/tags) into their JFrog Artifactory. However, utilizing the auto updater feature may not be feasible in this scenario. Nonetheless, manual copying of the image to the Artifactory and subsequent pulling from there remains an alternative approach.
Please read more on Harness GitOps in the following [Documentation](https://developer.harness.io/docs/continuous-delivery/gitops/use-gitops/install-a-harness-git-ops-agent/)


####  Can one use OPA policies for Terraform Lint?

Yes, for Infrastructure as Code Management (IaCM) within Continuous Delivery (CD), you can use OPA (Open Policy Agent) policies for Terraform linting. 
- For CD, you need to export the lint to a variable, limited to `256KB`, and pass it to the policy step, as we don't have a native lint step. 
- For IaCM, while there isn't a built-in `tflint` step, it can be accomplished using a plugin. OPA policies can be written against Terraform plan, workspace, and state for enforcing governance.
Please read more on this in the following [Documentation](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/advanced/cd-governance/add-a-governance-policy-step-to-a-pipeline/)


#### Is there any OPA policy to prevent certain expressions in pipelines?
To create an OPA (Open Policy Agent) policy that prevents certain expressions in pipelines within Harness, you'll need to define rules that evaluate the expressions used in your pipelines and deny execution based on specific criteria. Here's a simplified example of how you can achieve this:package harness.policies

default allow = false

deny_execution \{
    input.request.method \== "POST"  \# Assuming we're checking for a specific HTTP method
    pipeline \:= input.request.body.pipeline
    expression \:= pipeline.steps[_].expression
    contains(expression, "dangerous_function")  \# Check if the expression contains a dangerous function
\}

contains(expression, substring) \{
    expression = substring
\}

contains(expression, substring) \{
    startswith(expression, substring_with_dot)  # Check if the substring appears with a dot after it (to avoid matching within function names)
    index := indexof(expression, ".")
    expression[index + 1:] == substring
\}



#### Write a policy which restricts a step from a template to come from a branch named testing.
package template
Deny a step if it comes from a branch named testing
```
deny[msg] {
    step := input.template.spec.execution.steps[_].step
    step.templateRef == ""my_template""
    step.gitConfig.branch == ""testing""
    msg := sprintf(""Step '%s' in template '%s' cannot come from branch 'testing'"", [step.name, input.template.metadata.name])
}
```


####  How to ensure a stage with a step group appears before a stage with a deployment of kubernetes

You can create a OPA policy to ensure this.


#### How can I force a template consumer to a new version?

One can use the provided OPA policies to enforce. Please read more on this in the following [Documentation](https://developer.harness.io/docs/platform/governance/policy-as-code/sample-policy-use-case)


#### Can I write a policy that restricts the Build and Push to GCR, GAR, and ACR step types?

Yes. For example:

```
"package pipeline
deny[msg] {
    stage = input.pipeline.stages[_].stage
    step = stage.spec.execution.steps[_].step
    step.type == ""BuildAndPushGCR"" or
    step.type == ""BuildAndPushACR"" or
    step.type == ""BuildAndPushGAR""
    msg = sprintf(""Step type '%s' is not allowed in this pipeline"", [step.type])
}"
```


#### What is Harness' pipeline execution history retention policy?

[Harness retains pipeline execution data for 6 months.](https://developer.harness.io/docs/platform/references/data-retention)


#### Can one effectively enforce the reconciliation of changes in the template with consuming pipelines in a forceful manner?

Yes, one can utilize Open Policy Agent (OPA) to enforce the use of a stable template, ensuring consistency across consuming pipelines.
Here's an example OPA policy:
```yaml
package pipeline

template := "account.deploystagetemplate"
stableVersion := "v2"


# Deny a pipeline if the stage uses the template above
# without the stable version stated
deny[msg] {
	stage = input.pipeline.stages[_].stage

	# Check if the stage matches but doesn't have a template
	stage.template.templateRef == template
	stage.template.versionLabel != stableVersion

	# Show a human-friendly error message
	msg = sprintf(
		"Stage %s, has template %s, with version %s, it should be version %s",
		[stage.name, template, stage.template.versionLabel, stableVersion],
	)
}
```
You can always update the template versions manually. Go to [Reconcile Pipeline Templates](https://developer.harness.io/docs/platform/templates/reconcile-pipeline-templates/) for more information. 


#### Does Harness enforce any policy that denies the fetching of the latest tag of an image, as indicated by the error message : `admission webhook: <webhook-name> denied the request. Validation error: An image tag is required. rule require-image-tag failed at path`?

Harness does not enforce any policy regarding fetching the latest image tags.
To debug this error, consider the following implementations:
- Ensure the correct image tag is specified in the YAML configuration.
- For more details, go to [Latest Published Tag](https://developer.harness.io/kb/continuous-delivery/articles/last-published-tag/).


#### How can I prevent Terraform state drift caused by AWS ECR permissions policies created by Harness?

There are a couple of approaches you can take to mitigate this issue:

- Pre-create ECR repository: To avoid state drift, consider creating the ECR repository with the necessary permissions beforehand. Create an IAM policy that grants the required permissions for Harness actions, such as creating and updating services, tasks, and container instances. Attach this policy to the IAM role used by the ECS cluster. By doing this, ensure that the ECR repository has the correct permissions from the start, reducing the likelihood of drift.
- Modify Harness AWS connector permissions: Another option is to prevent Harness from altering IAM policies by adjusting the permissions within the Harness AWS connector. However, be cautious with this approach as it may impact the functionality of your deployment pipeline. Removing permissions related to the IAM policy from the Harness AWS connector can prevent unwanted changes to ECR permissions policies. Evaluate the impact on your workflow before implementing this solution.

By managing permissions and considering the implications of changes made by Harness, you can effectively address Terraform state drift and maintain the stability of your deployment environment.


#### What ECR permissions policy that Harness create as part of the AWS Lambda service deployment?
Harness creates the policy which is essential for performing various ECS-related actions like creating and updating services, tasks, and container instances.


#### How to avoid Harness creating a permissions policy and applying it to an AWS ECR repository that we are specifying as an artifact location for our AWS Lambda deployment configuration in Harness. These permissions are creating Terraform state drift on the ECR repository?
To prevent Terraform state drift, we recommend that you create the ECR repository with the required permissions beforehand. This can be achieved by crafting an IAM policy that grants the necessary permissions and attaching it to the IAM role utilized by the ECS cluster.

Alternatively, you can prevent Harness from altering IAM policies by removing the relevant permissions from the Harness AWS connector. However, this could affect the functionality of your deployment pipeline.


#### How can policy evaluations be conducted through an API?
Currently, we cannot do policy evaluations via APIs.





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
