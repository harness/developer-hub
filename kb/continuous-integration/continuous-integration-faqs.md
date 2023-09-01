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