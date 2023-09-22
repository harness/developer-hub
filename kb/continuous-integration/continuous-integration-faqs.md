---
title: Continuous Integration(CI) FAQs
description: This article addresses some frequently asked questions about Harness Continuous Integration(CI).
# sidebar_position: 2
helpdocs_topic_id: 
helpdocs_category_id: 
helpdocs_is_private: false
helpdocs_is_published: true
---

# FAQ


#### Can we enable BuildKit support for the native build and push step?

Currently, our OOTB build and push step utilize Kaniko for building Docker images. To incorporate BuildKit support we would need to use dind build in a run step and more details about dind build can be reffered [here](/docs/continuous-integration/use-ci/run-ci-scripts/run-docker-in-docker-in-a-ci-stage/)


#### Account verification error for CI Builds (Free Trial account with hosted builds)

Recently Harness has been the victim of several Crypto attacks that use our freely hosted build to mine cryptocurrencies. Unfortunately, to protect our infrastructure, we now block the use of the cloud-hosted-builds infrastructure only to business domains and block it for general-use domains like Gmail, Hotmail, and Yahoo and other untrusted emails. 
 
To address these issues, you can do one of the following:
Provide your own build infrastructure (like a VM with docker or a Kubernetes cluster). We have no limitations on building using your own infrastructure.
Creating the Harness account with your work email and not a Gmail address will solve this problem.


#### Can we change the Git Connector of a template and keep the version, repo, etc?

There's direct option to change such things. Go to template listing page, click on 3 dots on any template for further options and you will see "edit git metadata" option over there.

#### How do I share data between steps in a CI stage?

We could use shared paths to allow steps within a stage to share data with each other. You can specify custom paths for data sharing or cache purposes. For more details on this please refer to /docs/continuous-integration/use-ci/caching-ci-data/share-ci-data-across-steps-and-stages 

#### Is it possible to use different build infrastructures within a pipeline?

Yes, you can configure different build infrastructures for each stage within a pipeline. This flexibility allows you to use the most suitable infrastructure for each part of your CI workflow.

#### How can we configure a specific step to only run when a certain file, like a .toml configuration file, has changed in the repository?

To achieve conditional step execution based on changes to a specific file, you can set up webhook triggers with file-based conditions. Configure the trigger to activate the step only when the targeted file (e.g., config.toml) has been modified in the repository.

#### How can we share a failed step's output in a pull request comment as part of a CI pipeline execution?
Below given one of the methods with which we could achieve this.

- Modify the failed step's command to save output to a file: ```your_command 2>&1 | tee output_file.log```
- Read the file's content in a subsequent step which is configured to run always
- Use the GitHub API to add a comment to the pull request, including details from the file.

#### How can we calculate the instance of a service where number of pods change ?
We can calculate the service licenses and instances in following methods for CG and NG both.

- List services deployed in the last 30 days. Service is considered in calculation even if it was part of any failed deployments
- For every found service we find the 95th Percentile of the number of its service instances across a period of 30 days and it represents active service instances
- Based on service instances we calculate the number of consumed licenses
- 1 service license is equal to 20 active service instances

Please find an example [here]( /docs/continuous-delivery/get-started/service-licensing-for-cd/#example)

#### What should we do on experiencing OOM on java heap for the delgate ?

Try increasing the CPU request and limit both. Check CPU utilisation in-case.

#### Do we encrypt the image tag for the container during rollout deployment output ?

No we don't. Try checking SHA of the tag and find image ID from the output of the service step `<+artifact.tag>`

#### Does Harness "run container" overwrites the container entrypoint ?

Yes, it is an expected behaviour. The entrypoint in the base image should be overwritten as we have to run the commands specified in the run step.

#### Do we have a limit on the length of a log line ? 

Yes, We have a limit of 70KB on the line length in the CI client which writes to log service. One can write
to a file and upload in case they can't see the full line.

#### Is there a way to generate a dynamic file with some information in one stage of the pipeline and consume that file content in a different pipeline stage?

You can refer to this in following [Documentation](/docs/continuous-integration/use-ci/caching-ci-data/share-ci-data-across-steps-and-stages/)

#### When we pull artifact/images do we store them on delegate?

CI step build runs on separate build pod which will be cleaned automatically after the execution and we don't store any images locally on the delegate as part of the execution. 

#### We have Kubernetes delegates with multiple instances and have noticed that during some executions, the same instance in each step and causes the pipeline to fail, as one delegate may have a file and the other instance does not. How can we ensure the same instance is used for each step?

The workaround here is to use single replica delegates for these types of tasks and use a delegate name selector (this might compromise on delegate's high availability although)

#### Can we skip manually creating the kubeconfig when using the native EKS deployment method in AWS, since we provide connection details in the AWS connector?

Yes, we do not need to create the kubeconfig file manually. We just need to have this binary installed on the delegate ```aws-iam-authenticator```. Please refer more on this in the following [Documentation](/docs/platform/connectors/cloud-providers/ref-cloud-providers/aws-connector-settings-reference/#connect-to-eks)

#### Is it supported to run docker-compose from the docker in docker step?
Yes, it's supported to run the docker-compose from the docker in docker step.

#### The container that execute the Run command step, it must have docker and docker CLI installed right in order for this to work?
Yes, user need to install docker and docker CLI in order to work.

#### If the "Run test" steps fails the Post-Command script will run or not?
No, the Post-Command script will only run if the "Run test" step pass.

#### Is there a way to use the newer version of kaniko?
Yes, The user can update the kaniko image as suggested in this [doc](/docs/continuous-integration/use-ci/set-up-build-infrastructure/harness-ci/).

#### Using <+codebase.gitUser> results in "None" when using Python as Shell for a Run step

The problem here is that none of the 'codebase' variables are being populated when push triggers fires. The solution is to populate the 'codebase' variables to clone the codebase. 

#### Does Kaniko build use images cached locally on the node?

By default Kaniko does not use the node cache. it performs a full container image build from scratch, so it will always pull the base image. If we want to use cache then specify `Remote Cache Repository` option in the build step. If not specified it will always be executed with caching disabled

#### Why is the PATH Variable Overwritten in Parallel GitHub Actions Steps?

The PATH variable can be overwritten when running parallel steps in GitHub Actions because these steps could modify the PATH variable depens on which step ran last. When these steps run in parallel, a race condition occurs, and only one of them will be able to set the PATH variable correctly. To avoid this, consider running these steps sequentially in your workflow.

#### Can I enable caching in Kaniko builds which is being used by the CI build and push step?

Yes, you can enable caching in Kaniko builds by utilizing the Remote Cache Repository option in the build step settings. This option allows Kaniko to leverage previously built layers that haven't changed, which can significantly speed up the image building process.

#### Can pipeline execution be aborted when the referenced branch is deleted?

This is not natively supported however we could have a pipeline listening on delete webhook event and abort all the running pipelines referencing the deleted branch via API.

#### How can we check build VM resource utilization for build running in Harness cloud?

Currently this is not supported natively. We could use use a parallel step to check the resources utilised. More detailas about this can be found in the below doc
/docs/continuous-integration/use-ci/set-up-build-infrastructure/resource-limits/#use-a-parallel-step-to-monitor-failures

#### Why can't we find the Notify Option in my Stage Template?

The absence of the 'Notify' option in the Stage template is expected behavior as the notifications are configured at the pipeline level and it is not available at the individual stage level. Therefore, you won't find the 'Notify' option when creating a stage-level template.

#### How Can I Set Up Notifications for Failures in Stage Templates?

While notifications are a pipeline-level setting and not available at the stage level, you can still set up notifications for failures in your Stage templates. You can achieve this by adding a plugin step in a CI stage that sends notifications. Harness supports drone plugins like email and Slack, which can be used to notify about failures.

#### Why is the CI Initialize step failing with a Null Value Error when a step is configured with looping Strategy?

This could happen when you use an expression for an output variable from a previous step under the repeat looping strategy in the subsequent step. In CI stages, the execution happens on separate build pods, and all the expressions needs to be available before we start the initialize step.

#### Why does the Harness step continue to show success even after executing exit 1 inside a bash function that is running in background in the script?

The step in Harness determines its status based on the exit status received from the script execution. When you call a function in the background within your script, it doesn't directly impact the exit status of the main script. Therefore, if you manually call exit 1 within the function, it won't cause the step to fail. This behavior is consistent with how scripts operate both inside and outside of Harness.

#### How can we configure the CI codebase step to clone the repo recursively? 

Currently, the clone codebase step doesn't support the flag recursive However you could use the git credentials from Codebase Connector in Run Step and run the git command with the required flags. More details about this can be reffered in the below doc 
https://developer.harness.io/kb/continuous-integration/articles/using_git_credentials_from_codebase_connector_in_ci_pipelines_run_step/

#### Why the build status is not reflecting on the PR if the repository is in a github orginisation despite having full permission for the token used in the git connector?

This could be due to the fact that the user/account that is added to the organization using a repository role which doesnt have enough permission to write to the repository. If the repository role doesnt have enough permission, the PAT user account used in the git connector will not be able to update the PR even if the token has full permission.

#### How can we send mail from the CI pipeline with an attachement?

You could send mail from the CI pipeline by using the drone plugin https://plugins.drone.io/plugins/email. More details about how the drone plugin can be used in Harness CI pipeline can be reffered in the below doc
/docs/continuous-integration/use-ci/use-drone-plugins/run-a-drone-plugin-in-ci/

#### How can I retrieve the Maven project version from the pom.xml file and pass it to the subsequent Docker build step as the build argument?

You could assign the version value to a variable in a run step with a command something similar to `version=$(cat pom.xml | grep -oP '(?<=<version>)[^<]+')` and then this variable can be configured as the output variable in the run step. In the subsequent build step you could use this output variable from the previous run step as the build argument using an expression similar to `<+pipeline.stages.test.spec.execution.steps.Run_2.output.outputVariables.version>` (In this example, stage name=test, step name=Run_2 and the output variable name is version)

#### Why the changes made on the container image filesystem in a CI step is not available in the subseqent step where the same container image is used?

When we pick a container image for a step, any changes we make there will only affect that step. The next step won't notice these changes even we use the same image unless we edit the `/harness` directory, which is automatically shared among all steps.

#### Resource allocations for Kubernetes

Running a CI build on Kubernetes build infrastructure. Customers can utilize CPU and Memory resource allocations per Run Step and Run Test Step. 

#### What kind of build infrastructure can I use?

Harness supports multiple types of operating systems and architecture. Including Linux, MacOS, and Windows. For more details please check out our documentation on this capability: [https://developer.harness.io/docs/continuous-integration/use-ci/set-up-build-infrastructure/which-build-infrastructure-is-right-for-me/]

#### Cache Intelligence on Harness Cloud Infrastructure

Harness only currently supports cache intelligence on the Harness Cloud infrastructure. 
See [https://developer.harness.io/docs/continuous-integration/use-ci/caching-ci-data/cache-intelligence/]

<!-- #### Additional considerations when running concurrent builds

While running concurrent builds, customers may want to consider the queued intelligence feature in Harness CI. This feature is behind a feature flag. 

See https://developer.harness.io/docs/continuous-integration/use-ci/optimize-and-more/queue-intelligence/ -->

<!-- QUEUE INTELLIGENCE IS CURRENTLY NON-FUNCTIONING. WILL UN-COMMENT WHEN IT IS FIXED. PLEASE DIRECT QUESTIONS TO #DOCUMENTATION. -->

#### How to assert an environment variable within JEXL conditions?

While we support output variables that can point to an environment variable, we do not support the direct referencing of environment variables in JEXL conditions, even when using the feature flag `CI_OUTPUT_VARIABLES_AS_ENV`, which automatically makes environment variables available for other steps in the same Build (CI) stage.

####  How can I download files from an S3 bucket in Harness?

You have two common options to download files from an S3 bucket in Harness:
1. **Using the "Save and Restore Cache from S3" Step:** You can achieve this by utilizing the [Save and Restore Cache from S3 step](https://developer.harness.io/docs/continuous-integration/use-ci/caching-ci-data/saving-cache/). This step is specifically designed for downloading files from S3 and simplifies the process.
2. **Custom Shell Script:** Alternatively, you can create a custom shell script by following the guidelines outlined in the [shell script documentation](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/cd-steps/utilities/shell-script-step/). This approach offers more flexibility, allowing you to tailor the download operation to your specific needs and preferences.

#### How are Harness secrets tied to connector. 

Customers should be mindful of the fact that connectors are often tied to a secret (password or sshkey) that may expire. This is often a common cause of execution failures with connector errors. 

#### You have security concerns with pulling Harness delegate images from a public repo?

You can add special Harness Container Image Registry connector to your Harness account. With this connector, the Delegate pulls these images from the Harness Container Image Registry only. 

See link for more details [https://developer.harness.io/docs/platform/connectors/artifact-repositories/connect-to-harness-container-image-registry-using-docker-connector/]

#### Is it possible to get the logs of a service running in Harness cloud VM when a specific run step is executing?

Yes. We could add a a parallel step to the run step and tail the service specific logs to get all the logs while the build is running. A similar use case is documented [here](https://developer.harness.io/docs/continuous-integration/use-ci/set-up-build-infrastructure/resource-limits/#use-a-parallel-step-to-monitor-failures)

#### What access Harness uses by default to pull the harness internal images from the public repo?

Harness uses anonymous access to Docker Hub to pull Harness images by default. This can be updated if required.

#### What is the default cpu and memory limit for a step container?

The default CPU limit is 400m and the memory limit is 500Mi

#### How can we update the CPU/memory allocation of a container step running in Harness cloud?

There is no option available in UI to update the CPU/memory allocation of a container step running in Harness Cloud as the step container can use as much as CPU/memory required up to the available resources in the build VM.

#### Why the debug mode ssh session is getting closed after sometime?

SSH debug session will automatically terminate after one hour or at the step timeout limit, whichever occurs first

#### When we run the pipeline in debug mode, do we need to have a step failure in order to be able to remotely connect to the build pod/VM?

Yes. The remote debug ssh session details will only be shown after a step failure when you run the pipeline in debug mode

#### How can we get the remote rebug session of a pipeline running without any failure for troubleshooting purpose?

Remote debug session will only be presented if there is a failure in the pipeline. If the pipeline is executing successfully but we still want to have the debug session for troubleshooting purpose, we could add a run step with command ```exit 1```   which will fail the build and you can then rerun it in debug mode

#### Why can we not see the option ```Re-run in debug mode``` for a new pipeline?

Debug mode is not available for the first build of the pipeline. We should run the pipeline atleast once to be able to run it in debug mode.

#### Can we reuse the same build VM between different CI stages execution?

No, We will terminate the VM right after a stage execution and a new VM will be used for the nect CI stage execution.

#### Why do we have mulitple build VMs in running state even if there is no active builds?

We could have configured the value for the pool size in pool.yaml with a value more than 1 which will make sure that the configured number of VMs are in ready state and these VMs will be used when the new build request comes.

#### What is PLUGIN_USERNAME & PLUGIN_PASSWORD used in the jfrog command executing as part of ```Upload Artifacts to JFrog Artifactory``` ?

This is the creds used to upload the artifact to the jfrog artifactory and this is taken from the artifactory connector

#### Can we run ```Upload Artifacts to JFrog Artifactory``` step with non root user?

No, jfrog command execution will be creating a folder ```.jfrog``` under / which will fail if the plugin is running with non root user

#### Can we mount our internal CA certs in the CI build pod?

Yes. You can make the certs available to the delegate pod and set the ENV variables ```ADDITIONAL_CERTS_PATH``` and ```CI_MOUNT_VOLUMES``` with the path to the cert bundle on delegate and the source-destination mapping of the certs to get them mounted on build pod. More details on this documented [here](https://developer.harness.io/docs/continuous-integration/use-ci/set-up-build-infrastructure/k8s-build-infrastructure/configure-a-kubernetes-build-farm-to-use-self-signed-certificates/)

#### How can we include the internal CA certs available in the delegate pod?

There are multiple ways we could achive this. We could either build the delegate image with the certs baked into it if we are custom building the delegate image or we could create a secret/configmap with the certs data and mount it on the delegate pod. We could also run some custom commands in the INIT_SCRIPT to download the certs while the delegate gets started and make them available to the delegate pod file system.

#### Where should we mount the internal certs on the build pod?

The usage of the mounted CA certificates depends on the specific container image used for the step. The default certificate location may vary depending on the base image employed. The location where the certs need to be mounted should be decided based on the container image being used for the steps.

#### How can we configure the failure strategy for the clone codebase step in a CI pipeline?

We wouldn't be able to cofigure failure strategy for the defalt implicit clone codebase step. However you can add a git clone step in the pipeline for which the failure strategy configuration will be available.

#### How can we clone the codebase to a different folder other than ```/harness```?

The implicit clone codebase step will always clone the repo to ```/harness```. If we want to choose a different folder as the target folder, we could you the git clone step which will allow us to use a custom path as the clone directory

#### How can we configure the build pod to communicate with the k8s API server?

By default, default service account of the namespace will be auto mounted on the build pod through which it can communicate with API server. If we want another service account to be mounted on the build pod, it can be configured as advanced infra configuration.

#### Do we always need to mount a k8s service account in the build pod?

It is not needed if the build pod does not neded to comunicate with the k8s API as part of the pipeline execution.

#### What types of volumes can be mounted on a CI build pod?

We have the option to mount various volume types, such as empty directory, host path, and persistent volume, onto the build pod. This configuration is available under the advanced section of the infrastructure settings.

#### What volume will be created when we add a shared path in a CI pipeline?

When a shared path is added in the CI pipeline, we will create an empty directory type volume and this volume will be mounted on all the step containers. 

#### Is there a way to skip the default clone codebase step in CI pipeline as it seems to be added with all the execution automatically?

Yes, We can disable the implicit clone codebase step under pipeline overview tab

#### Why is the initialize step is occusionally timeout at 8 minutes?

Eight minutes is the default time out of the initialization step however if the build pod is expected to pull any large images, we could increase this init timeout in the advanced section of the infrastructure configuration.

#### How can we configure the build pod to run on a specific k8s node as part of troubleshooting?

We could set up the node selector for the build pod within the advanced section of the infrastructure configuration.

#### Why is the execution failing with the error ```Error: container has runAsNonRoot and image has non-numeric user (harness), cannot verify user is non-root```, when we enable "Run as Non-Root"?

This happens when you enable the option "Run as Non-Root" but not configured the default USRID. When we enable the option "Run as Non-Root", we need to configure a default user ID for all step containers in the Run as User field.

#### What is the default user ID assigned to a step container?

By default, the step containers will be running with USERID 1000 and this can be configured in the step's optional configuration

#### How is the step containers named within the build pod?

Step containers are named in sequential numbers, starting with 'step-1'

#### Why is the step container's have a very less memory and CPU value configured as requests?

Step container's requests are always set to minimum so that only in case of need the additional resources are requested during execution.

#### Why is background step is always marked as succeess even if there are failures executing the entrypoint?

This is expected behaviour as we start background step and will immedeatly move on to next step by marking the step status as success. We should be having a subsequent run step to check if the services being started as part of the background step is accessible before trying to use them in the pipeline.

#### How can we configure a step/stage/pipeline to fail/pass based on the % of test cases failure/success?

We wouldn't be able to natively configure a stage/pipeline to fail/pass depending the % of test cases failure/success. To achieve this use case, we would need to manually parse the test result which will be created after the test step execution and have few variables exported from the test step which will have the  % of test cases failure/success and then the value of this variable can decide the status of the stage/pipeline.

#### How can we reduce the high execution time in build and push step because the pipeline is not able to cache a remote repo?

You can reconfigure the docker file to create the cache layer and install the dependencies before moving other files to improve the execution time.


#### How can we improve the build process duration apart from cache layer?

You can increase the Memory and CPU of the Build and Push step to improve the build process duration.


#### Is there any best practices to follow while implementing the pipeline for build time?

Yes, you can refer to our [documentation](https://developer.harness.io/docs/continuous-integration/use-ci/optimize-and-more/optimizing-ci-build-times/#optimize-docker-images) to optimize and enhance the build process.


#### How can I reduce the time spent on downloading dependencies during CI builds?

You can pre-build Docker images that include all required dependencies and periodically update these images with the latest dependencies. This approach minimizes download time during the build process.


#### What are the benefits of excluding unnecessary files and packages from Docker images?

Excluding unnecessary files and packages not only reduces build times but also results in smaller, more efficient, and portable Docker images.


#### What is a workspace in a pipeline, and how does it work?

Workspace is a temporary volume that is created when the pipeline runs. It serves as the current working directory for all the steps within a stage. During initialization, the pipeline clones your codebase to the root of this workspace. The workspace persists for the entire duration of the stage, allowing steps to communicate and share state information. 

#### Is workspace persists after the stage completion?
No, the workspace is destroyed when the stage ends.


#### Can I share additional volumes between steps in a stage?

Yes, you can share additional volumes between steps in a stage by adding Shared Paths in the Build stage settings. This will allows you to specify specific directories or locations for all steps in the stage can access and share data from, in addition to the default workspace.

#### What is Harness Cloud's cache storage limit per account?

Harness Cloud provides up to 2GB of cache storage per account. 


#### What is the cache retention window in Harness Cloud?

Cache retention window in Harness Cloud is set at 15 days after it is initially stored. Also, the retention window resets whenever the cache is updated or modified.


#### Can different pipelines within the same account access and use the same cache storage?
The cache storage is shared among all pipelines within the account.


#### What is the default cache storage location in Cache Intelligence?
By default, Cache Intelligence stores data to be cached in the /harness directory.

#### How do I specify custom cache paths in Cache Intelligence?
To specify custom cache paths in Cache Intelligence, you can provide a list of locations that you want to be cached. For the detailed process you can refer to this [doc](https://developer.harness.io/docs/continuous-integration/use-ci/caching-ci-data/cache-intelligence#customize-cache-paths).


#### Can I use custom cache paths on a Windows platform with Cache Intelligence?

Yes, you can use custom cache paths, including on Windows platforms, with Cache Intelligence. 


#### How does Harness generate cache keys for caching build artifacts?

Harness generates cache keys by creating a hash of the build lock file(s) detected during the build process. Examples of lock files include pom.xml, build.gradle, or package.json. The contents of these files are used to compute a unique hash, which serves as the cache key.


#### Can I manually set or customize cache keys in Harness?
Yes, we have a option to manually set or customize cache keys if your project has specific requirements. For the process you refer to this [doc.](https://developer.harness.io/docs/continuous-integration/use-ci/caching-ci-data/cache-intelligence#customize-cache-keys)


#### Is there any API available for the Cache Intelligence?
Yes, you can check the cache info and delete through the API. You can refer to this [doc](https://developer.harness.io/docs/continuous-integration/use-ci/caching-ci-data/cache-intelligence#cache-intelligence-api) for the API.