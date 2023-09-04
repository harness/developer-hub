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


### Can we enable BuildKit support for the native build and push step?

Currently, our OOTB build and push step utilize Kaniko for building Docker images. To incorporate BuildKit support we would need to use dind build in a run step and more details about dind build can be reffered [here](https://developer.harness.io/docs/continuous-integration/use-ci/run-ci-scripts/run-docker-in-docker-in-a-ci-stage/)


### Account verification error for CI Builds (Free Trial account with hosted builds)

Recently Harness has been the victim of several Crypto attacks that use our freely hosted build to mine cryptocurrencies. Unfortunately, to protect our infrastructure, we now block the use of the cloud-hosted-builds infrastructure only to business domains and block it for general-use domains like Gmail, Hotmail, and Yahoo and other untrusted emails. 
 
To address these issues, you can do one of the following:
Provide your own build infrastructure (like a VM with docker or a Kubernetes cluster). We have no limitations on building using your own infrastructure.
Creating the Harness account with your work email and not a Gmail address will solve this problem.


### Can we change the Git Connector of a template and keep the version, repo, etc?

There's direct option to change such things. Go to template listing page, click on 3 dots on any template for further options and you will see "edit git metadata" option over there.

### How do I share data between steps in a CI stage?

We could use shared paths to allow steps within a stage to share data with each other. You can specify custom paths for data sharing or cache purposes. For more details on this please refer to https://developer.harness.io/docs/continuous-integration/use-ci/caching-ci-data/share-ci-data-across-steps-and-stages 

### Is it possible to use different build infrastructures within a pipeline?

Yes, you can configure different build infrastructures for each stage within a pipeline. This flexibility allows you to use the most suitable infrastructure for each part of your CI workflow.

### How can we configure a specific step to only run when a certain file, like a .toml configuration file, has changed in the repository?

To achieve conditional step execution based on changes to a specific file, you can set up webhook triggers with file-based conditions. Configure the trigger to activate the step only when the targeted file (e.g., config.toml) has been modified in the repository.

### How can we share a failed step's output in a pull request comment as part of a CI pipeline execution?
Below given one of the methods with which we could achieve this.

- Modify the failed step's command to save output to a file: ```your_command 2>&1 | tee output_file.log```
- Read the file's content in a subsequent step which is configured to run always
- Use the GitHub API to add a comment to the pull request, including details from the file.

### How can we calculate the instance of a service where number of pods change ?
We can calculate the service licenses and instances in following methods for CG and NG both.

- List services deployed in the last 30 days. Service is considered in calculation even if it was part of any failed deployments
- For every found service we find the 95th Percentile of the number of its service instances across a period of 30 days and it represents active service instances
- Based on service instances we calculate the number of consumed licenses
- 1 service license is equal to 20 active service instances

Please find an example [here]( https://developer.harness.io/docs/continuous-delivery/get-started/service-licensing-for-cd/#example)

### What should we do on experiencing OOM on java heap for the delgate ?

Try increasing the CPU request and limit both. Check CPU utilisation in-case.

### Do we encrypt the image tag for the container during rollout deployment output ?

No we don't. Try checking SHA of the tag and find image ID from the output of the service step `<+artifact.tag>`

### Does Harness "run container" overwrites the container entrypoint ?

Yes, it is an expected behaviour. The entrypoint in the base image should be overwritten as we have to run the commands specified in the run step.

### Do we have a limit on the length of a log line ? 

Yes, We have a limit of 70KB on the line length in the CI client which writes to log service. One can write
to a file and upload in case they can't see the full line.

### Is there a way to generate a dynamic file with some information in one stage of the pipeline and consume that file content in a different pipeline stage?

You can refer to this in following [Documentation](https://developer.harness.io/docs/continuous-integration/use-ci/caching-ci-data/share-ci-data-across-steps-and-stages/)

### When we pull artifact/images do we store them on delegate?

CI step build runs on separate build pod which will be cleaned automatically after the execution and we don't store any images locally on the delegate as part of the execution. 

### We have Kubernetes delegates with multiple instances and have noticed that during some executions, the same instance in each step and causes the pipeline to fail, as one delegate may have a file and the other instance does not. How can we ensure the same instance is used for each step?

The workaround here is to use single replica delegates for these types of tasks and use a delegate name selector (this might compromise on delegate's high availability although)

### Can we skip manually creating the kubeconfig when using the native EKS deployment method in AWS, since we provide connection details in the AWS connector?

Yes, we do not need to create the kubeconfig file manually. We just need to have this binary installed on the delegate ```aws-iam-authenticator```. Please refer more on this in the following [Documentation](https://developer.harness.io/docs/platform/connectors/cloud-providers/ref-cloud-providers/aws-connector-settings-reference/#connect-to-eks)

### Is it supported to run docker-compose from the docker in docker step?
Yes, it's supported to run the docker-compose from the docker in docker step.

### The container that execute the Run command step, it must have docker and docker CLI installed right in order for this to work?
Yes, user need to install docker and docker CLI in order to work.

### If the "Run test" steps fails the Post-Command script will run or not?
No, the Post-Command script will only run if the "Run test" step pass.

### Is there a way to use the newer version of kaniko?
Yes, The user can update the kaniko image as suggested in this [doc](https://developer.harness.io/docs/continuous-integration/use-ci/set-up-build-infrastructure/harness-ci/).

### Using <+codebase.gitUser> results in "None" when using Python as Shell for a Run step

The problem here is that none of the 'codebase' variables are being populated when push triggers fires. The solution is to populate the 'codebase' variables to clone the codebase. 

### Does Kaniko build use images cached locally on the node?

By default Kaniko does not use the node cache. it performs a full container image build from scratch, so it will always pull the base image. If we want to use cache then specify `Remote Cache Repository` option in the build step. If not specified it will always be executed with caching disabled

### Why is the PATH Variable Overwritten in Parallel GitHub Actions Steps?

The PATH variable can be overwritten when running parallel steps in GitHub Actions because these steps could modify the PATH variable depens on which step ran last. When these steps run in parallel, a race condition occurs, and only one of them will be able to set the PATH variable correctly. To avoid this, consider running these steps sequentially in your workflow.

### Can I enable caching in Kaniko builds which is being used by the CI build and push step?

Yes, you can enable caching in Kaniko builds by utilizing the Remote Cache Repository option in the build step settings. This option allows Kaniko to leverage previously built layers that haven't changed, which can significantly speed up the image building process.

### Can pipeline execution be aborted when the referenced branch is deleted?

This is not natively supported however we could have a pipeline listening on delete webhook event and abort all the running pipelines referencing the deleted branch via API.

### How can we check build VM resource utilization for build running in Harness cloud?

Currently this is not supported natively. We could use use a parallel step to check the resources utilised. More detailas about this can be found in the below doc
https://developer.harness.io/docs/continuous-integration/use-ci/set-up-build-infrastructure/resource-limits/#use-a-parallel-step-to-monitor-failures

### Why can't we find the Notify Option in my Stage Template?

The absence of the 'Notify' option in the Stage template is expected behavior as the notifications are configured at the pipeline level and it is not available at the individual stage level. Therefore, you won't find the 'Notify' option when creating a stage-level template.

### How Can I Set Up Notifications for Failures in Stage Templates?

While notifications are a pipeline-level setting and not available at the stage level, you can still set up notifications for failures in your Stage templates. You can achieve this by adding a plugin step in a CI stage that sends notifications. Harness supports drone plugins like email and Slack, which can be used to notify about failures.

### Why is the CI Initialize step failing with a Null Value Error when a step is configured with looping Strategy?

This could happen when you use an expression for an output variable from a previous step under the repeat looping strategy in the subsequent step. In CI stages, the execution happens on separate build pods, and all the expressions needs to be available before we start the initialize step.

### Why does the Harness step continue to show success even after executing exit 1 inside a bash function that is running in background in the script?

The step in Harness determines its status based on the exit status received from the script execution. When you call a function in the background within your script, it doesn't directly impact the exit status of the main script. Therefore, if you manually call exit 1 within the function, it won't cause the step to fail. This behavior is consistent with how scripts operate both inside and outside of Harness.

### How can we configure the CI codebase step to clone the repo recursively? 

Currently, the clone codebase step doesn't support the flag recursive However you could use the git credentials from Codebase Connector in Run Step and run the git command with the required flags. More details about this can be reffered in the below doc 
https://developer.harness.io/kb/continuous-integration/articles/using_git_credentials_from_codebase_connector_in_ci_pipelines_run_step/

### Why the build status is not reflecting on the PR if the repository is in a github orginisation despite having full permission for the token used in the git connector?

This could be due to the fact that the user/account that is added to the organization using a repository role which doesnt have enough permission to write to the repository. If the repository role doesnt have enough permission, the PAT user account used in the git connector will not be able to update the PR even if the token has full permission.

### How can we send mail from the CI pipeline with an attachement?

You could send mail from the CI pipeline by using the drone plugin https://plugins.drone.io/plugins/email. More details about how the drone plugin can be used in Harness CI pipeline can be reffered in the below doc
https://developer.harness.io/docs/continuous-integration/use-ci/use-drone-plugins/run-a-drone-plugin-in-ci/

### How can I retrieve the Maven project version from the pom.xml file and pass it to the subsequent Docker build step as the build argument?

You could assign the version value to a variable in a run step with a command something similar to `version=$(cat pom.xml | grep -oP '(?<=<version>)[^<]+')` and then this variable can be configured as the output variable in the run step. In the subsequent build step you could use this output variable from the previous run step as the build argument using an expression similar to `<+pipeline.stages.test.spec.execution.steps.Run_2.output.outputVariables.version>` (In this example, stage name=test, step name=Run_2 and the output variable name is version)

### Why the changes made on the container image filesystem in a CI step is not available in the subseqent step where the same container image is used?

When we pick a container image for a step, any changes we make there will only affect that step. The next step won't notice these changes even we use the same image unless we edit the `/harness` directory, which is automatically shared among all steps.
