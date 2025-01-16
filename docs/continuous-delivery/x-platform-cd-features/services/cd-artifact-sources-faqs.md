---
title: CD Artifact Source Frequently Asked Question
description: CD Artifact Source FAQs
---
Harness supports all of the common repos.

See [Connect to an artifact repo](/docs/platform/connectors/artifact-repositories/connect-to-an-artifact-repo).

### How is Last Successful Deployment Tag different from Post-Production Rollback?

**Last Successful Deployment Tag** `<+lastSuccessfulDeployed.tag>` focuses on deploying the most recent artifact that was successfully deployed.

**Post-Production Rollback**, on the other hand, is designed to revert the application to a previous stable version in production after a deployment issue is detected. It’s a recovery mechanism to restore a previous known good state.

**Usecase**
- Use Last Successful Deployment when you want to deploy the same version that was last known to work without introducing a new artifact. It’s particularly useful for consistent deployments during iterative updates.
- Use Post-Production Rollback when a newly deployed artifact causes issues or breaks functionality, and you need to return the application to a stable, previously deployed state.

### How do I list Github Tags for custom artifact when the curl returns a json array without any root element?

We cannot provide an array directly to the custom artifact. It needs a root element to parse the json response.

### Does Harness support the use of OpenID Connect(OIDC) for connecting to various systems such as Amazon Web Services(AWS) and Google Cloud Platform (GCP)?

Yes, we currently support OIDC integration for [Google Cloud Platform (GCP)](https://developer.harness.io/docs/platform/connectors/cloud-providers/ref-cloud-providers/gcs-connector-settings-reference/#use-openid-connect-oidc) and [Amazon Web Services (AWS)](https://developer.harness.io/docs/platform/connectors/cloud-providers/ref-cloud-providers/aws-connector-settings-reference/#credentials).

### Can we turn off storage and logging from Google APIs?

In Google Cloud Platform (GCP), while it's not always possible to completely disable storage and logging functionalities for specific APIs, you can exercise granular control over them. For instance, in Google Cloud Storage (GCS), you can manage access permissions for buckets and set up lifecycle policies to control data retention. Similarly, in Google Cloud Logging, you can't entirely turn off logging, but you can filter log entries, manage log retention periods, and export logs to external destinations. Utilizing IAM permissions, configuring lifecycle policies, and implementing log filtering mechanisms allow you to effectively manage storage and logging while aligning with your organization's security and compliance requirements. Regular monitoring and auditing of these configurations ensure they continue to meet your organization's needs.

### How do I create a Google Cloud Storage bucket in the Google Cloud console?

You can create a Google Cloud Storage bucket by logging into the Google Cloud console and following the steps outlined in the Create new Bucket documentation: https://cloud.google.com/storage/docs/creating-buckets

### Which storage options does Harness support for Google Cloud Functions 1st gen?

For Google Cloud Functions 1st gen, Harness supports both Google Cloud Storage and Google Cloud Source.


### Is it possible to publish some custom data like outputs from the variables or custom messages, strings (any information basically) in the Artifacts tab?

The only way to publish data in the Artifacts tab is by providing a URL to a publicly accessible location where the artifact is stored. If you do not have any public buckets, you can consider using a private bucket and generating a pre-signed URL to access the artifact. 
 
This URL can be used in the file_urls setting of the Artifact Metadata Publisher plugin to publish the artifact in the Artifacts tab. Another option is to use a different cloud storage provider that allows you to generate temporary URLs for private objects, such as Google Cloud Storage signed URLs or AWS S3 pre-signed URLs.

### Is there a way to clean up state storage during testing if it gets out of sync? Is there a way to do so to change the application ID?
If the state storage becomes out of sync during testing, there isn't a direct method to clean it up. Changing the application ID is not advisable as it may lead to other complications.
 
Instead, you could consider manually deleting the state file from the storage location or utilizing the Terraform CLI to force a refresh of the state. However, exercise caution and ensure a backup of the state file before proceeding with any changes to mitigate potential risks and consequences.

### How to avoid Harness creating a permissions policy and applying it to an AWS ECR repository that we are specifying as an artifact location for our AWS Lambda deployment configuration in Harness. These permissions are creating Terraform state drift on the ECR repository?
To prevent Terraform state drift, we recommend that you create the ECR repository with the required permissions beforehand. This can be achieved by crafting an IAM policy that grants the necessary permissions and attaching it to the IAM role utilized by the ECS cluster.

Alternatively, you can prevent Harness from altering IAM policies by removing the relevant permissions from the Harness AWS connector. However, this could affect the functionality of your deployment pipeline.

### Can I use SSH to copy an artifact to a target Windows host?

If your deployment type is WinRM, then WinRM is the default option used to connect to the Windows host.

### Can Harness deploy the latest tag version published to our artifact server?

Yes, in Harness, you can deploy the latest tag version to your artifact server. By leveraging the `<+lastPublished.tag>` expression, Harness can fetch the most recent tag version available on the artifact server. For comprehensive instructions on implementing this approach, please consult the following Harness [documentation](https://developer.harness.io/kb/continuous-delivery/articles/last-published-tag/)

### Which API call is specifically used to retrieve a tag of an artifact from the GAR?

The API call used to fetch a tag of an artifact from the GAR is `/v1/projects/{project}/locations/{region}/repositories/{repositories}/packages/{package}/versions?view=FULL`

### What is the correct expression to reference artifact version in rollback phase?

One can use the expression `rollbackArtifact.version` . This is a change from FirstGen to NextGen where rollback artifact version was getting automatically resolved
Please find an example use case on this in our [Documentation](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/custom-deployment-tutorial/#pipeline-sample-setup---cicd)

### What image tag expression should be used for periodic deployment of a binary version triggered by cron?

If it's not a custom trigger, use `<+trigger.artifact.build>` in the image tag field. Otherwise, reference the payload JSON to construct the expression.
Please read more on this in the following [Documentation](https://developer.harness.io/docs/platform/triggers/trigger-on-a-new-artifact/#using-the-triggerartifactbuild-and-lastpublishedtag-expressions)

### Can one deploy Salesforce component without using S3 bucket ?

Yes, one can deploy using custom artifact without using the S3 artifact. Please read more on this in the following [Documentation](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/custom-deployment-tutorial/#salesforce-deployment-template-support)

### Why did my Artifact Triggers stop working?

If Artifact Triggers stop working, it's possible that the Perpetual Task assigned to poll the artifact has gotten into a bad state. To reset the Perpetual Task so that new artifacts can be polled, disable all triggers pointing to the same Artifact and then re-enable them. Perpetual Tasks are shared across all triggers pointing to the same artifact so disabling all of them and re-enabling them will create a new Perpetual Task to poll the artifact.

### How does Harness ensure that the tag fetched in the service step is consistently the latest for both triggers and manual executions?

The expression `<+lastPublished.tag>` sorts the tags lexically rather than by the "created at" date. One can try replacing `<+lastPublished.tag>` with `<+trigger.artifact.build>` in the trigger's configuration ensures that it always fires using the latest collected tag.
Please read more on this in the following [Documentation](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/services/artifact-sources/#artifact-limits-and-display-in-the-harness-ui)

### Does Harness support `Skip instances with the same artifact version already deployed` feature on NextGen?

Yes, this feature parity to FirstGen is now available ! Please read more on this in the following [Documentation](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/traditional/ssh-ng/#targetting-specific-hosts-for-deployment)

### How to reference the tag of artifact in deploy stage.

You can use ```<+artifacts.primary.tag>``` expression

### We have a single artifact that is deployed multiple times with different run arguments as different services in parallel in a deployment. When the pipeline is run each service asks to select the artifact tag. They should all be set to the same tag. Is there a way to select the artifact tag once and use it for all 10 of the services?

For the first service you can keep the tag as runtime value, with it also declare a pipeline variable and keep it as runtime input.
 
For all other service, provide the pipeline variable expression as a value for tag.
 
So now when you run the pipeline, the first service will ask for the tag value and you can copy the same tag value to pipeline variable which is also a runtime input which will then be assigned to all other services.


### How to retrieve the service artifact tag in the deploy stage?

You can retrieve the service artifact by using the following expression `<+artifacts.primary.tag>`.

### Is it possible for me to specify an artifact source based on the environment?

You can create overrides for manifest, config file, variable, and values.yaml.
For artifact overrides, I would suggest creating a variable override. You can define the artifact as an expression and use the variable expression.
Create separate variables for prod and non-prod and override the values based on the env.


### The user would like to be able to deploy multiple artifacts in the same execution and not have to choose only one. Is that possible?

Yes, User can configure the multi-service deployment or else you can configure the parallel stages with the same service with different artifact. Doc: https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/advanced/multiserv-multienv/#deploy-multiple-services-to-one-environment

### How do download and copy commands differ?

Download: The delegate executes commands on the target hosts to directly download the artifact. Requires access to the target and network connectivity.

Copy: The delegate downloads the artifact and then copies it to the target hosts. Offers more flexibility but requires network connectivity to both the artifact server and target hosts.

### We have a single ECR artifact that is deployed multiple times with different run arguments as different services in parallel in a deployment. When the pipeline is run each service asks to select the ECR artifact tag. They should all be set to the same tag. Is there a way to select the ECR artifact tag once and use it for all 10 of the services?

For the first service we can keep the tag as runtime value, with it also declare a pipeline variable and keep it as runtime input.
 
For all other service, provide the pipeline variable expression as a value for tag.
 
So now when we run the pipeline, the first service will ask for the tag value and you can copy the same tag value to pipeline variable which is also a runtime input which will then be assigned to all other services.

###  How to setup trigger for on new artifact for jfrog?

You can create a docker connector(using jfrog details) and create a trigger on New artifact of type docker by selecting the jfrog connector created as first step.

### Is there any way the user can have custom webhook trigger with placeholders for services, artifacts, tag to provide dynamic values in curl to execute the pipeline like CG triggers ?

Yes, one can use custom webhook triggers with placeholders for services, artifacts, and tags to provide dynamic values in cURL to execute the pipeline. You can pass in this data when the pipeline execution is triggered using a custom cURL trigger. Please read more on custom triggers in the following [Documentation](https://developer.harness.io/docs/platform/triggers/trigger-deployments-using-custom-triggers/)

### Why Does the Expression `<+artifacts.primary.identifier>` Return "primary" Instead of the Actual Identifier?

To obtain the actual identifier instead, please open a support ticket to enable the feature flag `CDS_ARTIFACTS_PRIMARY_IDENTIFIER`.

### Does Harness encrypt the image tag for the container during rollout deployment output?

No, we don't. Try checking SHA of the tag and find image ID from the output of the service step with the `<+artifact.tag>` expression.

### Is it now possible to deploy any kind of artifact bundle, including those with bundled artifacts and manifests, using Tanzu Application Service Deployment Swimlanes in Harness ?

Yes, the feature `Artifact Bundle Support with Tanzu Application Deployments` associated now enables the acceptance of any artifact bundle, including those with bundled artifacts and manifests, from any artifact source in zip format. This allows deployment with Tanzu Application Service Deployment Swimlanes. Please read more on this in the [Documentation](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/tanzu/tanzu-app-services-quickstart#add-the-manifest-and-artifact-as-an-artifact-bundle)

### We'd like a step in a Pipeline where it checks the Docker tag name of the artifact and if it doesn't contain `master` or `main`, it fails the pipeline.

You can use conditional execution and use expression \<+artifact.tag> to check if it equals the required value and run the pipeline

multiple services via single pipeline, for which we can use multiservice select, and we can refer the artifact of previous stage to the next stage. However, is there any possible way by which I can refer to the single service of previous stage and its artifact.Use case if for approval stage where we need to run the stage once as only one approval should be required to deploy multiple services.

For using a single service of the previous stage and its artifact you can use the expressions from the previous stage service output variables, and you can use the expression in your next service artifact.

### Is it necessary to deploy artifacts via Harness services when using AWS CDK provisioning?
No, deploying artifacts via Harness services is not required for AWS CDK provisioning in a stage. You can set up an AWS CDK provisioner and use it in a stage to provision infrastructure without deploying any artifacts.

### How to get \<+artifacts.primary.tag> tag in custom stage?
As per the current design there's no service(Artifact config) in custom stage, without this expression will get null in return. So in the custom stage these expression will not work. But you can use the output variable to pass the details from CD stage to the Custom stage as suggested in this [doc](https://developer.harness.io/kb/continuous-delivery/articles/output-variable-for-powershell-script/)

### Is there a wildcard on execution filter/search that I can use for artifact?

While doing the search you currently can't use the regex as we don't support it. 

### Is there a platform page where we can view the deployed image tags for each environment associated with a service ?

One can click on a service and  see all the environments and the artifacts that have been deployed. Higher level views can be accomplished through dashboard like DORA metrics. Please read  more insights on this in the documentation on [Monitor deployments and services in CD dashboards](https://developer.harness.io/docs/continuous-delivery/monitor-deployments/monitor-cd-deployments/)

### Which variable we can use to refer artifact repository 
You can use variable \<+artifacts.primary.repositoryName>

### Is it possible to publish some custom data like outputs from the variables or custom messages, strings (any information basically) in the Artifacts tab?

The only way to publish data in the Artifacts tab is by providing a URL to a publicly accessible location where the artifact is stored. If you do not have any public buckets, you can consider using a private bucket and generating a pre-signed URL to access the artifact. 
 
This URL can be used in the file_urls setting of the Artifact Metadata Publisher plugin to publish the artifact in the Artifacts tab. Another option is to use a different cloud storage provider that allows you to generate temporary URLs for private objects, such as Google Cloud Storage signed URLs or AWS S3 pre-signed URLs.

### What is the equivalent variable for  $\{artifact.label.get(“labelkey)} In NG?

You can use  `<+artifact.label.get(“labelkey”)>`

### Is it expected that, after pushing a new artifact to an initially empty Docker repository linked to a trigger, the trigger's status shifts from `pending` to `success` only triggering the pipeline upon the second push ?

Upon creating or updating a trigger, there's a five to ten-minute delay before the polling job initiates and the trigger becomes operational. It's advised to wait for this duration before pushing the artifact, according to general recommendations from the deployment platform.
After 5-10 mins of the trigger status turns success, any tag collected should trigger the pipeline.

### Does Harness NG support the "Skip artifact version already deployed" parameter as present in CG?

We do support "Skip artifact version already deployed" for WinRM SSH deployment. It is present under the advanced section of the pipeline.

### What is the artifact polling interval for triggers?

Artifacts are polled at every 1-minute interval

### Can I configure artifact polling internally?

Currently, this interval of 1 minute is hard coded but we have an enhancement request in progress to expose this made configurable.
Please contact Harness support for more info

### When publishing an artifact, what is the specific interval for polling and can a user configure it ?

Polling interval for publishing an artifact is `1 minute`. Harness don't allow to configure this by user
Please read more on this in the following [Documentation](https://developer.harness.io/docs/platform/triggers/trigger-on-a-new-artifact/#important-notes)

### Can one filter the artifact files based on the extension (such as `*.zip`) ?

Yes, one can use the `Artifact Filter` instead of `Artifact Directory` when creating an Artifact and apply the regex to filter the path.

### How can I make sure build artifacts pulled into Harness come from protected branches before production deployment?

You can select the Artifact filter option and configure the service's Artifact source as needed.

### Is Cache Intelligence available for CD?

Cache Intelligence caches build dependencies. It is currently only available for Harness CI.

### How do I access the artifacts metadata from the service definition in the pipeline?

You can get the artifact metadata from the service step output, each output value can be referred to via the corresponding expression.

### Is it possible to trigger a CI stage by a trigger of type artifact? 

The trigger variables ofr CI aren't set so historically we did not support triggering of CI stage.

### How do I change the service artifact source based on the environment?

You can use variable expressions in artifact source templates to allow team members to select the repository, path, and tags to use when they run pipelines using artifact source templates. To override service variables at the environment level, you can create environment-level variables and override them for different environments.

### Can we add two primary artifact in the service?

We can add two primary artifacts in the service however the execution will run with only one primary artifact. At the runtime we need to select which primary artifact the pipeline will run with.

### While creating a Lambda function, is it possible to retrieve artifacts from GitHub?

We do not have a built-in GitHub source for Lambda function artifacts. The supported sources for artifacts, as you mentioned, are S3, ECR, Jenkins, Nexus, and Artifactory. Additionally, we offer support for custom artifacts, but please note that it may require a significant amount of customization.

### We have setup deploy pipeline which is connected to ECR artifact, in which we can select an image from ecr and it's tag when run the pipeline. How can we use image and tag information in the stage

You should be able to see the artifacts details in service output of the execution, you can reference this value via expressions in the next stage.

### How do I change the service artifact source based on environment?

You can use variable expressions in artifact source templates to allow team members to select the repository, path, and tags to use when they run pipelines using artifact source templates. To override service variables at the environment level, you can create environment-level variables and override them for different environments.

### How do I list Github Tags for custom artifact when the curl returns a json array without any root element?

We cannot provide an array directly to the custom artifact. It needs a root element to parse the json response.

### Download artifact for winrm is not working while Nexus if windows machine is behind proxy in CG

Nexus is supported for NG but not in CG, so you can use custom powershell script something like below:
Invoke-WebRequest -Uri "$\{URI}" -Headers $Headers -OutFile "$\{OUT_FILE}" -Proxy "$env:HTTP_PROXY"

### How to get ECR image and tag information in the stage?
You should be able to see the artifacts details in the service output of the execution, you can reference this value via expressions in the next stage.

### Can the interval for the artifact version collection PT on the delegate be adjustable?

No. Currently it is not configurable.

### What is the interval between artifact version collection for perpetual task?

It is `1 minute` for artifact collection and `2 minutes` for manifests in Next-gen.

### Is there a way to get the service artifact source identifier with built-in variables?

Yes, you can use the [expression](https://developer.harness.io/docs/platform/variables-and-expressions/harness-variables) `<+artifacts.primary.identifier>`.

### Can Harness able to monitor for when a particular image tag changes on DockerHub in order to initiate a hands-free build and push to our repo?

Yes, You can setup a trigger based on the image tag changes on DockerHub repo as suggested in this[ doc.](https://developer.harness.io/docs/platform/triggers/trigger-on-a-new-artifact/)

### Harness enabling auto-deployment

To have automatic deployment in Harness, you can make use of triggers. On new artifact. 
Refer this [Documentation](https://developer.harness.io/docs/first-gen/continuous-delivery/model-cd-pipeline/triggers/trigger-a-deployment-on-a-time-schedule/)
As soon as your build is complete and it publishes a new artifact you can setup a trigger on that and it will trigger a Harness Deployment. 

### How to view Deployment history (Artifact SHA) for a single service on an environment

You can go to Service under the project --> Summary will show you the details with what artifact version and environment. 

### What kind of order do we apply to the Docker Tags as part of the artifact we show for the users? 

Except for the latest version of Nexus, it is in alphabetical order.

### WinRM Download artifact is not working in NG after setting correct environment variables (HARNESS_ENV_PROXY and HTTP_PROXY).

Make sure you're using delegate version 791xx and check in console logs if you are able to see Using HTTP_PROXY environment variable.

### What steps can I take if artifact.metadata.filename returns null while trying to retrieve an artifact name from Artifactory (S3)?

For S3 Type Connectors, the expression `<+artifact.metadata.filename>` isn’t available. Check the AWS S3 Artifact Documentation [here](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/services/artifact-sources/#aws-s3-artifact-expressions).

As a workaround, since the file path is already available, you can extract the filename using the following script:
```
$path = <+pipeline.stages.<StageName>.spec.artifacts.primary.filePath>"
$filename = Split-Path -Path $path -Leaf
Write-Output $filename
```

This script will help you filter out the filename from the provided file path.

### How can I select multiple artifacts from a service for deployment in Harness?
Currently, Harness supports selecting multiple artifacts from a service for deployment using sidecar artifacts. Sidecar artifacts follow the same rules as primary artifacts.

To set this up:
- Configure the artifacts in your Harness Service Definition.
- Use the expression `<+artifacts.sidecars.[sidecar_identifier].imagePath>:<+artifacts.sidecars.[sidecar_identifier].tag>` in your Values file to reference the sidecar artifact.

For detailed instructions on setting up sidecar artifacts in Harness, refer to [our documentation](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/cd-kubernetes-category/add-artifacts-for-kubernetes-deployments/#sidecar-artifacts).

### What should I consider when configuring artifactPath and artifactName for artifact fetch in Harness?
When setting up artifactPath and artifactName:

- Ensure that artifactName patterns (e.g., pricr-notification-*.jar) are specific enough to match the required artifacts.
- Avoid overly generic patterns like *.jar, which may lead to fetch errors or mismatches.
- Check that artifactPath aligns with the repository structure in Artifactory to ensure successful retrieval.
