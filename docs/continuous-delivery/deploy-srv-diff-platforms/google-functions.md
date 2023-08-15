---
title: Google Cloud Functions
description: Deploy single-purpose functions to Google Cloud.
sidebar_position: 800
---

# Google Cloud Functions deployments

This topic explains how to deploy new Cloud Functions to Google Cloud using Harness.

## Supported versions

Harness integration with Google's serverless offering Google Functions.

Harness supports the following:
- Harness supports deploying Google Functions [1st gen and 2nd gen](https://cloud.google.com/blog/products/serverless/cloud-functions-2nd-generation-now-generally-available).
- To review the differences between Google Functions 1st gen and 2nd gen, go to  [Google Cloud Function documentation](https://cloud.google.com/functions/docs/concepts/version-comparison).

### Harness Cloud Functions 1st gen support

Harness supports the following:
- Basic deployments. 
  - Harness deploys the new function and terminates the old one by sending 100% of traffic to the new function.
- For rollback, Harness does not perform revision-based rollback. Instead, in case of deployment failure, Harness will take a snapshot of the last known good state of the function and reapply.

<docvideo src="https://www.loom.com/share/60a793fc62a748c5a9aad071eb60bdf1" />

### Harness Cloud Functions 2nd gen support

Harness supports the following:
- Basic, blue green, and canary deployments.
- Harness leverages the Cloud Run [revisions](https://cloud.google.com/run/docs/managing/revisions) capability that Google Cloud offers to configure rollback.

### Cloud Functions limitations

- For Google Cloud Functions 2nd gen, Harness does not support [Google Cloud Source Repository](https://cloud.google.com/functions/docs/deploy#from-source-repo) at this time. Only Google Cloud Storage is supported.
- For Google Cloud Functions 1st gen, Harness supports both Google Cloud Storage and Google Cloud Source.

## Deployment summary

Here's a high-level summary of the setup steps.

<details>
<summary>Harness setup summary</summary>

1. Create a Harness CD pipeline.
2. Add a Deploy stage.
3. Select the deployment type **Google Cloud Functions**, and then select **Set Up Stage**.
4. Select **Add Service**.
   1. Add the function definition to the new Cloud Function service. You can paste in the YAML or link to a Git repo hosting the YAML.
   2. Save the new service.
5. Select **New Environment**, name the new environment and select **Save**.
6. In **Infrastructure Definition**, select **New Infrastructure**.
   1. In Google Cloud Provider Details, create or select the Harness GCP connector, **GCP project**, and **GCP region**, and select **Save**.
7.  Select Configure and select the deployment strategy: basic, canary, or blue green.
8.  Harness will automatically add the **Deploy Cloud Function** step. No further configuration is needed.
    1.  For canary and blue green strategies, the **Cloud Function Traffic Shift** step is also added. In this step's **Traffic Percent** setting, enter the percentage of traffic to switch to the new revision of the function.
    2.  For canary deployments, you can add multiple **Cloud Function Traffic Shift** steps to rollout the shift.
    3.  For blue green deployments, you can simply use 100 in the **Traffic Percent** setting.
9.  Select **Save**, and then run the pipeline.

</details>


## Cloud Functions permission requirements

:::note

Harness supports Google Cloud Functions 1st and 2nd gen. There are minor differences in the permissions required by each generation. For a detailed breakdown, go to [Access control with IAM](https://cloud.google.com/functions/docs/concepts/iam) from Google.

The permissions listed below work for both 1st and 2nd gen.

:::

When you set up a Harness GCP connector to connect Harness with your GCP account, the GCP IAM user or service account must have the appropriate permissions assigned to their account. 

<details>
<summary>Cloud Functions minimum permissions</summary>

Cloud Functions supports the basic roles of **Editor**, **Admin**, **Developer**, and **Viewer**. For details, go to [Cloud Functions IAM Roles](https://cloud.google.com/functions/docs/reference/iam/roles).

You can use the **Admin** role or the permissions below.

Here are the minimum permissions required for deploying Cloud Functions.

- **Cloud Functions API:**
  - `cloudfunctions.functions.create`: Allows the user to create new functions.
  - `cloudfunctions.functions.update`: Allows the user to update existing functions.
  - `cloudfunctions.functions.list`: Allows the user to list existing functions.
  - `cloudfunctions.operations.get`: Allows the user to get the status of a function deployment.
- **Cloud Run API:**
  - `run.services.create`: Allows the user to create new Cloud Run services.
  - `run.services.update`: Allows the user to update existing Cloud Run services.
  - `run.services.get`: Allows the user to get information about a Cloud Run service.
  - `run.revisions.create`: Allows the user to create new revisions for a Cloud Run service.
  - `run.revisions.get`: Allows the user to get information about a revision of a Cloud Run service.
  - `run.routes.create`: Allows the user to create new routes for a Cloud Run service.
  - `run.routes.get`: Allows the user to get information about a route of a Cloud Run service.

Note that these are the minimum set of permissions required for deploying Cloud Functions and running them on Cloud Run via API. Depending on your use case, you may need additional permissions for other GCP services such as Cloud Storage, Pub/Sub, or Cloud Logging.

Also, note that in order to call the Cloud Functions and Cloud Run APIs, the user or service account must have appropriate permissions assigned for calling the APIs themselves. This may include permissions like `cloudfunctions.functions.getIamPolicy`, `run.services.getIamPolicy`, `cloudfunctions.functions.testIamPermissions`, `run.services.testIamPermissions`, and `iam.serviceAccounts.actAs`.

For details, go to [Cloud Functions API IAM permissions](https://cloud.google.com/functions/docs/reference/iam/permissions) and Cloud Functions [Access control with IAM](https://cloud.google.com/functions/docs/concepts/iam).

Harness will also pull the function ZIP file in your **Google Cloud Storage**.

For Google Cloud Storage (GCS), the following roles are required:

- Storage Object Viewer (`roles/storage.objectViewer`)
- Storage Object Admin (`roles/storage.objectAdmin`)

For more information, go to the GCP documentation about [Cloud IAM roles for Cloud Storage](https://cloud.google.com/storage/docs/access-control/iam-roles).

Ensure the Harness delegate you have installed can reach `storage.cloud.google.com` and your GCR registry host name, for example `gcr.io`. 

For Google Cloud Source, the following roles are required:

- Source Repository Reader (`roles/source.reader`)
- Source Repository Reader (`roles/cloudsource.writer`)

For more information, go to Cloud Source Repositories [Access control with IAM](https://cloud.google.com/source-repositories/docs/configure-access-control).

</details>


## Cloud Functions services

The Harness Cloud Functions service the following: 

- **Function Definition**:
  - You can enter the function manifest YAML in Harness for use a remote function manifest YAML in a Git repo.
- **Artifacts**:
  - You add a connection to the function ZIP file in Google Cloud Storage (1st and 2nd gen) or Google Cloud Source (1st gen).

<details>
<summary>How the Function Definition and Artifact work together</summary>

The function manifest YAML in **Function Definition** and the function zip file in **Artifacts** work together to define and deploy a Google Cloud Function.

The function manifest YAML file is a configuration file that defines the function's name, runtime environment, entry point, and other configuration options. The YAML file is used to specify the function's metadata, but it does not include the function's code.

The function code is packaged in a zip file that contains the function's source code, dependencies, and any other necessary files. The zip file must be created based on the manifest file, which specifies the entry point and runtime environment for the function.

When you deploy a function using the manifest file, the Cloud Functions service reads the configuration options from the YAML file and uses them to create the function's deployment package. The deployment package includes the function code (from the zip file), the runtime environment, and any dependencies or configuration files specified in the manifest file.

</details>


### Function Definition

The **Function Definition** is the parameter file you use to define your Google Function. The parameter file you add here maps to one Google Function. 

To use Google Cloud Functions, in the Harness service, in **Deployment Type**, you select **Google Cloud Functions**. 

Next, in **Google Cloud Function Environment Version**, you select **1st gen** or **2nd gen**.

- Google Functions 2nd gen: The YAML parameters for Google Functions 2nd gen are defined in the [google.cloud.functions.v2 function message](https://cloud.google.com/functions/docs/reference/rpc/google.cloud.functions.v2#function) from Google Cloud.
  - You can define details of the [ServiceConfig](https://cloud.google.com/functions/docs/reference/rpc/google.cloud.functions.v2#google.cloud.functions.v2.ServiceConfig) and [BuildConfig](https://cloud.google.com/functions/docs/reference/rpc/google.cloud.functions.v2#buildconfig) via the YAML as seen in the below examples.
- Google Functions 1st gen: The YAML parameters for Google Functions 1st gen are defined in the [google.cloud.functions.v1 CloudFunction message](https://cloud.google.com/functions/docs/reference/rpc/google.cloud.functions.v1#cloudfunction) from Google Cloud.


### 1st gen function definition example

Here is a Function Definition example.

```yaml
function:
  name: my-function
  runtime: python37
  entryPoint: my_function
  httpsTrigger:
    securityLevel: SECURE_OPTIONAL
```

In `httpsTrigger`, you do not need to specify `url`.

### 2nd gen function definition examples

Here are some Function Definition examples.

<details>
<summary>Sample Google Function definition included in Harness</summary>

```yaml
# The following are the minimum set of parameters required to create a Google Cloud Function.
# If you use a remove manifest, please ensure it includes all of these parameters.

function:
  name: <functionName>
  buildConfig:
    runtime: nodejs18
    entryPoint: helloGET
  environment: GEN_2
function_id: <functionName>
```

</details>

<details>
<summary>Example 1: A basic Cloud Function that triggers on an HTTP request</summary>

```yaml
function:
  name: my-http-function
  buildConfig:
    runtime: nodejs14
    entryPoint: myFunction
  environment: GEN_2
function_id: my-http-function

```

</details>

<details>
<summary>Example 2: A Cloud Function that uses environment variables</summary>

```yaml
function:
  name: my-env-function
  buildConfig:
    runtime: python38
    entryPoint: my_function
  environment: GEN_2
function_id: my-env-function
  environmentVariables:
    MY_VAR: my-value

```

</details>

<details>
<summary>Example 3: A Cloud Function that uses Cloud Storage as a trigger</summary>

```yaml
function:
  name: my-storage-function
  buildConfig:
    runtime: go111
    entryPoint: MyFunction
  environment: GEN_2
function_id: my-storage-function
  trigger:
    eventType: google.storage.object.finalize
    resource: projects/_/buckets/my-bucket
  availableMemoryMb: 512
  timeout: 180s

```
</details>
 
 
<details>
<summary>Example 4: A Cloud Function that uses service config and environment variables</summary>

```yaml
function:
  name: canaryDemo-<+env.name>
  serviceConfig:
    environment_variables:
        MY_ENV_VAR: 'True'
        GCF_FF_KEY: '<+env.variables.GCF_FF_KEY>'
  buildConfig:
    runtime: python39
    entryPoint: hello_world
  environment: GEN_2
function_id: canaryDemo-<+env.name>
```
</details>  

<details>
<summary>Example 5: A Cloud Function that uses secret environment variables</summary>

This example uses the `secret_environment_variables` parameter. It has the information necessary to fetch the secret value from secret manager and expose it as an environment variable. For more information, go to [SecretEnvVar](https://cloud.google.com/functions/docs/reference/rest/v2/projects.locations.functions#secretenvvar) in Google docs.

```yaml
# The following are the minimum set of parameters required to create a Google Cloud Function.
# If you use a remove manifest, please ensure it includes all of these parameters.

function:
  name: "my-secret-env-func"
  description: "Using Secret Environment Variables"
  region: "us-east1"
  runtime: "nodejs16"
  entryPoint: myFunction
  max_instances: 1
  eventTrigger:
    event_type: "providers/cloud.pubsub/eventTypes/topic.publish"
    resource: "projects/<project>/topics/<topic>"
  environment_variables:
    MY_ENV_VAR1: value1
    MY_ENV_VAR2: value2
  secret_environment_variables: [{ key: "MY_SECERT_ENV_VAR1", project_id: <project_id>, secret: "<secretName1>", version: "<secretVersion1>" }, { key: "MY_SECERT_ENV_VAR2", project_id: <project_id>, secret: "<secretName2>", version: "<secretVersion2>" }]

```

</details>

### Artifacts

In **Artifacts**, you add the location of the function ZIP file in Google Cloud Storage that corresponds to the YAML manifest file you added in **Function Definition**.

You use a Harness GCP connector to connect to your Cloud Storage bucket. The GCP connector credentials should meet the requirements in [Cloud Functions permission requirements](#cloud-functions-permission-requirements).

### Adding a Cloud Function service

Here's how you add a Harness Cloud Function service.

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```
```mdx-code-block
<Tabs>
  <TabItem value="YAML" label="YAML" default>
```

Here's a Cloud Functions service YAML example.

```yaml
service:
  name: helloworld
  identifier: Google_Function
  serviceDefinition:
    type: GoogleCloudFunctions
    spec:
      manifests:
        - manifest:
            identifier: GoogleFunction
            type: GoogleCloudFunctionDefinition
            spec:
              store:
                type: Harness
                spec:
                  files:
                    - /GoogleFunctionDefinition.yaml
      artifacts:
        primary:
          primaryArtifactRef: <+input>
          sources:
            - spec:
                connectorRef: gcp_connector
                project: cd-play
                bucket: cloud-functions-automation-bucket
                artifactPath: helloworld
              identifier: helloworld
              type: GoogleCloudStorage
```

```mdx-code-block
  </TabItem>
  <TabItem value="API" label="API">
```

Create a service using the [Create Services](https://apidocs.harness.io/tag/Services#operation/createServicesV2) API.

```json
curl -i -X POST \
  'https://app.harness.io/gateway/ng/api/servicesV2/batch?accountIdentifier=<Harness account Id>' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: <Harness API key>' \
  -d '[{
    "identifier": "svcasg",
    "orgIdentifier": "default",
    "projectIdentifier": "CD_Docs",
    "name": "svc-asg",
    "description": "string",
    "tags": {
      "property1": "string",
      "property2": "string"
    },
    "yaml": "service:\n  name: helloworld\n  identifier: Google_Function\n  serviceDefinition:\n    type: GoogleCloudFunctions\n    spec:\n      manifests:\n        - manifest:\n            identifier: GoogleFunction\n            type: GoogleCloudFunctionDefinition\n            spec:\n              store:\n                type: Harness\n                spec:\n                  files:\n                    - /GoogleFunctionDefinition.yaml\n      artifacts:\n        primary:\n          primaryArtifactRef: <+input>\n          sources:\n            - spec:\n                connectorRef: gcp_connector\n                project: cd-play\n                bucket: cloud-functions-automation-bucket\n                artifactPath: helloworld\n              identifier: helloworld\n              type: GoogleCloudStorage"
  }]'
```

```mdx-code-block
  </TabItem>
  <TabItem value="Terraform Provider" label="Terraform Provider">
```

For the Terraform Provider resource, go to [harness_platform_service](https://registry.terraform.io/providers/harness/harness/latest/docs/resources/platform_service).

```json
resource "harness_platform_service" "example" {
  identifier  = "identifier"
  name        = "name"
  description = "test"
  org_id      = "org_id"
  project_id  = "project_id"

  ## SERVICE V2 UPDATE
  ## We now take in a YAML that can define the service definition for a given Service
  ## It isn't mandatory for Service creation 
  ## It is mandatory for Service use in a pipeline

  yaml = <<-EOT
                service:
                  name: helloworld
                  identifier: Google_Function
                  serviceDefinition:
                    type: GoogleCloudFunctions
                    spec:
                      manifests:
                        - manifest:
                            identifier: GoogleFunction
                            type: GoogleCloudFunctionDefinition
                            spec:
                              store:
                                type: Harness
                                spec:
                                  files:
                                    - /GoogleFunctionDefinition.yaml
                      artifacts:
                        primary:
                          primaryArtifactRef: <+input>
                          sources:
                            - spec:
                                connectorRef: gcp_connector
                                project: cd-play
                                bucket: cloud-functions-automation-bucket
                                artifactPath: helloworld
                              identifier: helloworld
                              type: GoogleCloudStorage              
              EOT
}
```

```mdx-code-block
  </TabItem>
  <TabItem value="Harness Manager" label="Harness Manager">
```

To configure a Harness Cloud Function service in the Harness Manager, do the following:

1. In your project, in CD (Deployments), select **Services**.
2. Select **Manage Services**, and then select **New Service**.
3. Enter a name for the service and select **Save**.
4. Select **Configuration**.
5. In **Service Definition**, select **Google Cloud Functions**.
6. In **Function Definition**, enter the manifest YAML. You have two options.
   - You can add the manifest YAML inline.
   - Select **Add Function Definition** and connect Harness with the Git repo where the manifest YAML is located. You can also use the [Harness File Store](/docs/continuous-delivery/x-platform-cd-features/services/add-inline-manifests-using-file-store).
7. In **Artifacts**, add the Google Cloud Storage location of the ZIP file that corresponds to the manifest YAML.
8. Select **Save**.

```mdx-code-block
  </TabItem>
</Tabs>
```

### Using service variables in manifest YAML

Service variables are a powerful way to template your services or make them more dynamic.

In the **Variables** section of the service, you can add service variables and then reference them in any of the manifest YAML file you added to the service.

For example, you could create a variable named **entryPoint** for the manifest `entryPoint` setting and set its value as a fixed value, runtime input, or expression.

Next, in your manifest YAML file, you could reference the variable like this (see <+serviceVariables.entryPoint>):

Now, when you add that service to a pipeline, you will be prompted to enter a value for this variable in the pipeline **Services** tab. The value you provide is then used as the `entryPoint` in your manifest YAML.



## Cloud Functions environments

The Cloud Function environment contains an Infrastructure Definition that identifies the GCP account, project, and region to use.

Here's an example of a Cloud Functions environment.

```mdx-code-block
import Tabs1 from '@theme/Tabs';
import TabItem1 from '@theme/TabItem';
```
```mdx-code-block
<Tabs1>
  <TabItem1 value="YAML" label="YAML" default>
```

```YAML
environment:
  name: GCF
  identifier: GCF
  description: "GCF environment"
  tags: {}
  type: PreProduction
  orgIdentifier: default
  projectIdentifier: serverlesstest
  variables: []

```

```mdx-code-block
  </TabItem1>
  <TabItem1 value="API" label="API">
```

Create an environment using the [Create Environments](https://apidocs.harness.io/tag/Environments#operation/createEnvironmentV2) API.

```json
curl -i -X POST \
  'https://app.harness.io/gateway/ng/api/environmentsV2?accountIdentifier=<account_id>' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: <token>' \
  -d '{
    "orgIdentifier": "default",
    "projectIdentifier": "CD_Docs",
    "identifier": "GCF",
    "tags": {
      "property1": "",
      "property2": ""
    },
    "name": "GCF",
    "description": "",
    "color": "",
    "type": "PreProduction",
    "yaml": "environment:\n  name: GCF\n  identifier: GCF\n  description: \"dev google cloud environment\"\n  tags: {}\n  type: PreProduction\n  orgIdentifier: default\n  projectIdentifier: serverlesstest\n  variables: []"
  }'
```


```mdx-code-block
  </TabItem1>
  <TabItem1 value="Terraform Provider" label="Terraform Provider">
```

For the Terraform Provider resource, go to [harness_platform_environment](https://registry.terraform.io/providers/harness/harness/latest/docs/resources/platform_environment) and [harness_platform_environment_service_overrides](https://registry.terraform.io/providers/harness/harness/latest/docs/resources/platform_environment_service_overrides).

Here's an example of harness_platform_environment:

```json
resource "harness_platform_environment" "example" {
  identifier = "GCF"
  name       = "GCF"
  org_id     = "default"
  project_id = "myproject"
  tags       = ["foo:bar", "baz"]
  type       = "PreProduction"

  ## ENVIRONMENT V2 Update
  ## The YAML is needed if you want to define the Environment Variables and Overrides for the environment
  ## Not Mandatory for Environment Creation nor Pipeline Usage

  yaml = <<-EOT
               environment:
                  name: GCF
                  identifier: GCF
                  description: ""
                  tags: {}
                  type: Production
                  orgIdentifier: default
                  projectIdentifier: myproject
                  variables: []
      EOT
}
```

```mdx-code-block
  </TabItem1>
  <TabItem1 value="Harness Manager" label="Harness Manager">
```

To create an environment, do the following:

1. In your project, in CD (Deployments), select **Environments**.
2. Select **New Environment**.
3. Enter a name for the new environment.
4. In **Environment Type**, select **Production** or **Pre-Production**. The **Production** or **Pre-Production** settings can be used in Harness RBAC to restrict who can deploy to these environments.
5. Select **Save**. The new environment is created.

Pipelines require that an environment have an infrastructure definition. We'll cover that next.

```mdx-code-block
  </TabItem1>
</Tabs1>
```

## Define the infrastructure

You define the target infrastructure for your deployment in the **Environment** settings of the pipeline stage. You can define an environment separately and select it in the stage, or create the environment within the stage **Environment** tab.

There are two methods of specifying the deployment target infrastructure:

- **Pre-existing**: the target infrastructure already exists and you simply need to provide the required settings.
- **Dynamically provisioned**: the target infrastructure will be dynamically provisioned on-the-fly as part of the deployment process.

For details on Harness provisioning, go to [Provisioning overview](/docs/continuous-delivery/cd-infrastructure/provisioning-overview).

### GCP connector

You will need a Harness GCP Connector with [correct permissions](#cloud-functions-permission-requirements) to deploy Cloud Functions in GCP.

You can pick the same GCP connector you used in the Harness service to connect to Google Cloud Storage for the artifact, or create a new connector. 

### Pre-existing Functions infrastructure

```mdx-code-block
import Tabs2 from '@theme/Tabs';
import TabItem2 from '@theme/TabItem';
```
```mdx-code-block
<Tabs2>
  <TabItem2 value="YAML" label="YAML" default>
```

Here's a YAML example of a Cloud Function infrastructure definition.

```yaml
infrastructureDefinition:
  name: dev
  identifier: dev
  description: "dev google cloud infrastructure"
  tags: {}
  orgIdentifier: default
  projectIdentifier: serverlesstest
  environmentRef: dev
  deploymentType: GoogleCloudFunctions
  type: GoogleCloudFunctions
  spec:
    connectorRef: gcp_connector
    project: cd-play
    region: us-central1
  allowSimultaneousDeployments: false
```

```mdx-code-block
  </TabItem2>
  <TabItem2 value="API" label="API">
```

Create an infrastructure definition using the [Create Infrastructure](https://apidocs.harness.io/tag/Infrastructures#operation/createInfrastructure) API.

```json
curl -i -X POST \
  'https://app.harness.io/gateway/ng/api/infrastructures?accountIdentifier=<account_Id>' \
  -H 'Content-Type: application/json' \
  -H 'x-api-key: <token>' \
  -d '{
    "identifier": "dev",
    "orgIdentifier": "default",
    "projectIdentifier": "serverlesstest",
    "environmentRef": "dev",
    "name": "dev",
    "description": "",
    "tags": {
      "property1": "1",
      "property2": "2"
    },
    "type": "Asg",
    "yaml": "infrastructureDefinition:\n  name: dev\n  identifier: dev\n  description: \"dev google cloud infrastructure\"\n  tags: {}\n  orgIdentifier: default\n  projectIdentifier: serverlesstest\n  environmentRef: dev\n  deploymentType: GoogleCloudFunctions\n  type: GoogleCloudFunctions\n  spec:\n    connectorRef: gcp_connector\n    project: cd-play\n    region: us-central1\n  allowSimultaneousDeployments: false"
  }'
```

```mdx-code-block
  </TabItem2>
  <TabItem2 value="Terraform Provider" label="Terraform Provider">
```

For the Terraform Provider resource, go to [harness_platform_infrastructure](https://registry.terraform.io/providers/harness/harness/latest/docs/resources/platform_infrastructure).

Here's an example of harness_platform_infrastructure:

```json
resource "harness_platform_infrastructure" "example" {
  identifier      = "dev"
  name            = "dev"
  org_id          = "default"
  project_id      = "serverlesstest"
  env_id          = "dev"
  type            = "GoogleCloudFunctions"
  deployment_type = "GoogleCloudFunctions"
  yaml            = <<-EOT
        infrastructureDefinition:
          name: dev
          identifier: dev
          description: "dev google cloud infrastructure"
          tags: {}
          orgIdentifier: default
          projectIdentifier: serverlesstest
          environmentRef: dev
          deploymentType: GoogleCloudFunctions
          type: GoogleCloudFunctions
          spec:
            connectorRef: gcp_connector
            project: cd-play
            region: us-central1
          allowSimultaneousDeployments: false
      EOT
}
```


```mdx-code-block
  </TabItem2>
  <TabItem2 value="Harness Manager" label="Harness Manager">
```

To create the ASG infrastructure definition in an environment, do the following:

1. In your project, in CD (Deployments), select **Environments**.
2. Select the environment where you want to add the infrastructure definition.
3. In the environment, select **Infrastructure Definitions**.
4. Select **Infrastructure Definition**.
5. In **Create New Infrastructure**, in **Name**, enter a name for the new infrastructure definition.
6. In **Deployment Type**, select **Google Cloud Functions**.
7. In **Google Cloud Provider Details**, in **Connector**, select or create a Harness GCP connector that connects Harness with the account where you want the Cloud Function deployed.
   
   You can use the same GCP connector you used when adding the Cloud Function artifact in the Harness service. Ensure the GCP credentials in the GCP connector credentials meets the [requirements](#cloud-functions-permission-requirements).
8. In **Project**, select the GCP project where you want to deploy.
9. In **Region**, select the GCP region where you want to deploy.
10. Select **Save**.

The infrastructure definition is added.


```mdx-code-block
  </TabItem2>
</Tabs2>
```

### Dynamically provisioned Functions infrastructure

:::note

Currently, the dynamic provisioning documented in this topic is behind the feature flag `CD_NG_DYNAMIC_PROVISIONING_ENV_V2`. Contact [Harness Support](mailto:support@harness.io) to enable the feature.

:::

Here is a summary of the steps to dynamically provision the target infrastructure for a deployment:

1. **Add dynamic provisioning to the CD stage**:
   1. In a Harness Deploy stage, in **Environment**, enable the option **Provision your target infrastructure dynamically during the execution of your Pipeline**.
   2. Select the type of provisioner that you want to use.
   
      Harness automatically adds the provisioner steps for the provisioner type you selected.
   3. Configure the provisioner steps to run your provisioning scripts.
   4. Select or create a Harness infrastructure in **Environment**.
2. **Map the provisioner outputs to the Infrastructure Definition**:
   1. In the Harness infrastructure, enable the option **Map Dynamically Provisioned Infrastructure**.
   2. Map the provisioning script/template outputs to the required infrastructure settings.

#### Supported provisioners

The following provisioners are supported for Google Functions deployments:

- Terraform
- Terragrunt
- Terraform Cloud
- Shell Script

#### Adding dynamic provisioning to the stage

To add dynamic provisioning to a Harness pipeline Deploy stage, do the following:

1. In a Harness Deploy stage, in **Environment**, enable the option **Provision your target infrastructure dynamically during the execution of your Pipeline**.
2. Select the type of provisioner that you want to use.
   
   Harness automatically adds the necessary provisioner steps.
3. Set up the provisioner steps to run your provisioning scripts.

For documentation on each of the required steps for the provisioner you selected, go to the following topics:

- Terraform:
  - [Terraform Plan](/docs/continuous-delivery/cd-infrastructure/terraform-infra/run-a-terraform-plan-with-the-terraform-plan-step)
  - [Terraform Apply](/docs/continuous-delivery/cd-infrastructure/terraform-infra/run-a-terraform-plan-with-the-terraform-apply-step)
  - [Terraform Rollback](/docs/continuous-delivery/cd-infrastructure/terraform-infra/rollback-provisioned-infra-with-the-terraform-rollback-step). To see the Terraform Rollback step, toggle the **Rollback** setting.
- [Terragrunt](/docs/continuous-delivery/cd-infrastructure/terragrunt-howtos)
- [Terraform Cloud](/docs/continuous-delivery/cd-infrastructure/terraform-infra/terraform-cloud-deployments)
- [Shell Script](/docs/continuous-delivery/cd-infrastructure/shell-script-provisioning)


#### Mapping provisioner output

Once you set up dynamic provisioning in the stage, you must map outputs from your provisioning script/template to specific settings in the Harness Infrastructure Definition used in the stage.

1. In the same CD Deploy stage where you enabled dynamic provisioning, select or create (**New Infrastructure**) a Harness infrastructure.
2. In the Harness infrastructure, in **Select Infrastructure Type**, select **Google Cloud Platform** if it is not already selected.
3. In **Google Cloud Provider Details**, enable the option **Map Dynamically Provisioned Infrastructure**.
   
   A **Provisioner** setting is added and configured as a runtime input.
4. Map the provisioning script/template outputs to the required infrastructure settings.

To provision the target deployment infrastructure, Harness needs specific infrastructure information from your provisioning script. You provide this information by mapping specific Infrastructure Definition settings in Harness to outputs from your template/script.

For Google Cloud Functions, Harness needs the following settings mapped to outputs:

- Project
- Region

:::note

Ensure the **Project** and **Region** settings are set to the **Expression** option.

:::

For example, here's a snippet of a Terraform script that provisions the infrastructure for a Cloud Function deployment and includes the required outputs:

```json

provider "google" {
  credentials = file("<PATH_TO_YOUR_GCP_SERVICE_ACCOUNT_KEY_JSON>")
  project     = "<YOUR_GCP_PROJECT_ID>"
  region      = "us-central1"  # Replace with your desired region
}

resource "google_project_service" "cloudfunctions" {
  project = "<YOUR_GCP_PROJECT_ID>"
  service = "cloudfunctions.googleapis.com"
}

resource "google_cloudfunctions_function" "my_function" {
  name        = "my-cloud-function"
  description = "My Cloud Function"
  runtime     = "nodejs14"
  trigger_http = true

  available_memory_mb = 256
  timeout             = "60s"

  # Optionally, you can define environment variables for your function
  environment_variables = {
    VAR1 = "value1"
    VAR2 = "value2"
  }
}

output "project_name" {
  value = google_cloudfunctions_function.my_function.project
}

output "region_name" {
  value = google_cloudfunctions_function.my_function.region
}

```


In the Harness Infrastructure Definition, you map outputs to their corresponding settings using expressions in the format `<+provisioner.OUTPUT_NAME>`, such as `<+provisioner.project_name>`.

<figure>

<docimage path={require('./static/6d3712e9196c409f2d49747939b91c8913adfe7a44d2b47b019f01187d36e719.png')} width="60%" height="60%" title="Click to view full size image" />

<figcaption>Figure: Mapped outputs</figcaption>
</figure>

## Cloud Functions execution strategies

Harness ASG deployments support the following [deployment strategies](/docs/continuous-delivery/manage-deployments/deployment-concepts):

- Basic
- Canary
- Blue Green

### Basic

The basic deployment execution strategy uses the **Deploy Cloud Function** step. The Deploy Cloud Function step deploys the new function version and routes 100% of traffic over to the new function version.

<details>
<summary>YAML example of Deploy Cloud Function step</summary>

```yaml
          execution:
            steps:
              - step:
                  name: Deploy Cloud Function
                  identifier: deployCloudFunction
                  type: DeployCloudFunction
                  timeout: 10m
                  spec: {}
```

</details>


### Canary

Harness provides a [step group](/docs/continuous-delivery/x-platform-cd-features/cd-steps/step-groups) to perform the canary deployment. 

The step group consists of:

- Deploy Cloud Function With No Traffic step: deploys the new function version but does not route any traffic over to the new function version.
- First Cloud Function Traffic Shift step: routes 10% of traffic over to the new function version.
- Second Cloud Function Traffic Shift step: routes 100% of traffic over to the new function version.


<details>
<summary>YAML example of canary deployment step group</summary>

```yaml
          execution:
            steps:
              - stepGroup:
                  name: Canary Deployment
                  identifier: canaryDepoyment
                  steps:
                    - step:
                        name: Deploy Cloud Function With No Traffic
                        identifier: deployCloudFunctionWithNoTraffic
                        type: DeployCloudFunctionWithNoTraffic
                        timeout: 10m
                        spec: {}
                    - step:
                        name: Cloud Function Traffic Shift
                        identifier: cloudFunctionTrafficShiftFirst
                        type: CloudFunctionTrafficShift
                        timeout: 10m
                        spec:
                          trafficPercent: 10
                    - step:
                        name: Cloud Function Traffic Shift
                        identifier: cloudFunctionTrafficShiftSecond
                        type: CloudFunctionTrafficShift
                        timeout: 10m
                        spec:
                          trafficPercent: 100
```

</details>

### Blue Green

Harness provides a [step group](/docs/continuous-delivery/x-platform-cd-features/cd-steps/step-groups) to perform the blue green deployment. 

The step group consists of: 

- Deploy Cloud Function With No Traffic step: deploys the new function version but does not route any traffic over to the new function version.
- Cloud Function Traffic Shift step: routes 100% of traffic over to the new function version.

You can also route traffic incrementally using multiple Cloud Function Traffic Shift steps with gradually increasing routing percentages.


<details>
<summary>YAML example of blue green deployment step group</summary>

```yaml
          execution:
            steps:
              - stepGroup:
                  name: Blue Green Deployment
                  identifier: blueGreenDepoyment
                  steps:
                    - step:
                        name: Deploy Cloud Function With No Traffic
                        identifier: deployCloudFunctionWithNoTraffic
                        type: DeployCloudFunctionWithNoTraffic
                        timeout: 10m
                        spec: {}
                    - step:
                        name: Cloud Function Traffic Shift
                        identifier: cloudFunctionTrafficShift
                        type: CloudFunctionTrafficShift
                        timeout: 10m
                        spec:
                          trafficPercent: 100
```

</details>


### Rollbacks

If deployment failure occurs, the stage or step [failure strategy](/docs/platform/Pipelines/define-a-failure-strategy-on-stages-and-steps) is initiated. Typically, this runs the **Rollback Cloud Function** step in the **Rollback** section of **Execution**. Harness adds the Rollback Cloud Function step automatically. 

The Harness rollback capabilities are based on the Google Cloud Function [revisions](https://cloud.google.com/run/docs/managing/revisions) available in Google Cloud.

If the function already exists (for example, revision 10) and a new revision is deployed (for example, revision 11) but a step after the deployment there is a failure and rollback is triggered, then Harness will deploy a new function revision (revision **12**) but it will contain the artifact and metadata for revision 10.
