---
title: Continuous Integration (CI) FAQs
description: This article addresses some frequently asked questions about Harness Continuous Integration (CI).
sidebar_position: 2
---

## Can I use Harness CI for mobile app development?

Yes. [Harness CI offers many options for mobile app development.](https://developer.harness.io/docs/continuous-integration/use-ci/mobile-dev-with-ci)

## I have a MacOS build, do I have to use homebrew as the installer?

No. Your build infrastructure can be configured to use whichever tools you like. For example, Harness Cloud build infrastructure includes preinstalled versions of xcode and other tools, and you can install other tools or versions of tools that you prefer to use. For more information, go to the [CI macOS and iOS guide](https://developer.harness.io/tutorials/ci-pipelines/build/ios).

## Build infrastructure

### What is build infrastructure and why do I need it for Harness CI?

A build stage's infrastructure definition, the *build infrastructure*, defines "where" your stage runs. It can be a Kubernetes cluster, a VM, or even your own local machine. While individual steps can run in their own containers, your stage itself requires a build infrastructure to define a common workspace for the entire stage. For more information about build infrastructure and CI pipeline components go to:

* [CI key concepts](https://developer.harness.io/docs/continuous-integration/get-started/key-concepts/)
* [CI pipeline creation overview](https://developer.harness.io/docs/continuous-integration/use-ci/prep-ci-pipeline-components)
* [Which build infrastructure is right for me](https://developer.harness.io/docs/continuous-integration/use-ci/set-up-build-infrastructure/which-build-infrastructure-is-right-for-me)

### What kind of build infrastructure can I use? Which operating systems are supported?

Harness has several build infrastructure options that support multiple types of operating systems, architectures, and cloud providers. For more information, go to [Which build infrastructure is right for me](https://developer.harness.io/docs/continuous-integration/use-ci/set-up-build-infrastructure/which-build-infrastructure-is-right-for-me).

### Can I use multiple build infrastructures in one pipeline?

Yes, each stage can have a different build infrastructure. Additionally, depending on your stage's build infrastructure, you can also run individual steps on containers rather than the host. This flexibility allows you to choose the most suitable infrastructure for each part of your CI pipeline.

### Error when running Docker commands on Windows build servers

Make sure that the build server has the [Windows Subsystem for Linux](https://learn.microsoft.com/en-us/windows/wsl/about) installed. This error can occur if the container can't start on the build system.

### Can I run builds locally? Can I run builds directly on my computer?

Yes. For instructions, go to [Set up a local runner build infrastructure](https://developer.harness.io/docs/continuous-integration/use-ci/set-up-build-infrastructure/define-a-docker-build-infrastructure).

## Self-hosted VMs

### Can I use the same build VM for multiple CI stages?

No. The build VM terminates at the end of the stage and a new VM is used for the next stage.

### Why are build VMs running when there are no active builds?

With [self-hosted VM build infrastructure](https://developer.harness.io/docs/category/set-up-vm-build-infrastructures), the `pool` value in your `pool.yml` specifies the number of "warm" VMs. These VMs are kept in a ready state so they can pick up build requests immediately.

If there are no warm VMs available, the runner can launch additional VMs up to the `limit` in your `pool.yml`.

If you don't want any VMs to sit in a ready state, set your `pool` to `0`. Note that having no ready VMs can increase build time.

For AWS VMs, you can set `hibernate` in your `pool.yml` to hibernate warm VMs when there are no active builds. For more information, go to [Configure the Drone pool on the AWS VM](https://developer.harness.io/docs/continuous-integration/use-ci/set-up-build-infrastructure/vm-build-infrastructure/set-up-an-aws-vm-build-infrastructure#configure-the-drone-pool-on-the-aws-vm).

### Do I need to install Docker on the VM that runs the Harness Delegate and Runner?

Yes. Docker is required for [self-hosted VM build infrastructure](https://developer.harness.io/docs/category/set-up-vm-build-infrastructures).

### How do I specify the disk size for a Windows instance in pool.yml?

With [self-hosted VM build infrastructure](https://developer.harness.io/docs/category/set-up-vm-build-infrastructures), the `disk` configuration in your `pool.yml` specifies the disk size (in GB) and type.

For example, here is a Windows pool configuration for an [AWS VM build infrastructure](https://developer.harness.io/docs/continuous-integration/use-ci/set-up-build-infrastructure/vm-build-infrastructure/set-up-an-aws-vm-build-infrastructure):

```yaml
version: "1"
instances:
  - name: windows-ci-pool
    default: true
    type: amazon
    pool: 1
    limit: 4
    platform:
      os: windows
    spec:
      account:
        region: us-east-2
        availability_zone: us-east-2c
        access_key_id: 
        access_key_secret: 
        key_pair_name: XXXXX
      ami: ami-088d5094c0da312c0
      size: t3.large ## VM machine size.
      hibernate: true
      network:
        security_groups:
          - sg-XXXXXXXXXXXXXX
      disk:
        size: 100 ## Disk size in GB.
        type: "pd-balanced"
```

## Harness Cloud

### What is Harness Cloud?

Harness Cloud lets you run builds on Harness-hosted runners that are preconfigured with tools, packages, and settings commonly used in CI pipelines. It is one of several build infrastructure options offered by Harness. For more information, go to [Which build infrastructure is right for me](https://developer.harness.io/docs/continuous-integration/use-ci/set-up-build-infrastructure/which-build-infrastructure-is-right-for-me).

### How do I use Harness Cloud build infrastructure?

Configuring your pipeline to use Harness Cloud takes just a few minutes. Make sure you meet the [requirements for connectors and secrets](https://developer.harness.io/docs/continuous-integration/use-ci/set-up-build-infrastructure/use-harness-cloud-build-infrastructure#requirements-for-connectors-and-secrets), then follow the quick steps to [use Harness Cloud](https://developer.harness.io/docs/continuous-integration/use-ci/set-up-build-infrastructure/use-harness-cloud-build-infrastructure#use-harness-cloud).

### Account verification error with Harness Cloud on Free plan

Recently Harness has been the victim of several Crypto attacks that use our Harness-hosted build infrastructure (Harness Cloud) to mine cryptocurrencies. Harness Cloud is available to accounts on the Free tier of Harness CI. Unfortunately, to protect our infrastructure, Harness now limits the use of the Harness Cloud build infrastructure to business domains and block general-use domains, like Gmail, Hotmail, Yahoo, and other unverified domains.

To address these issues, you can do one of the following:

* Use the local runner build infrastructure option, or upgrade to a paid plan to use the self-hosted VM or Kubernetes cluster build infrastructure options. There are no limitations on builds using your own infrastructure.
* Create a Harness account with your work email and not a generic email address, like a Gmail address.

### What is the Harness Cloud build credit limit for the Free plan?

The Free plan allows 2,000 build minutes per month. For more information, go to [Harness Cloud billing and build credits](https://developer.harness.io/docs/continuous-integration/get-started/ci-subscription-mgmt#harness-cloud-billing-and-build-credits).

### Can I use xcode for a MacOS build with Harness Cloud?

Yes. Harness Cloud macOS runners include several versions of xcode as well as homebrew. For details, go to the [Harness Cloud image specifications](https://developer.harness.io/docs/continuous-integration/use-ci/set-up-build-infrastructure/use-harness-cloud-build-infrastructure#platforms-and-image-specifications). You can also [install additional tools at runtime](https://developer.harness.io/docs/continuous-integration/use-ci/set-up-build-infrastructure/use-harness-cloud-build-infrastructure#lock-versions-or-install-additional-tools).

### Can I use my own secrets manager with Harness Cloud build infrastructure?

No. To [use Harness Cloud build infrastructure](https://developer.harness.io/docs/continuous-integration/use-ci/set-up-build-infrastructure/use-harness-cloud-build-infrastructure#requirements-for-connectors-and-secrets), you must use the built-in Harness secrets manager.

### Connector errors with Harness Cloud build infrastructure

To use Harness Cloud build infrastructure, all connectors must connect through the Harness Platform. This means that:

* GCP connectors can't inherit credentials from the delegate. They must be configured to connect through the Harness Platform.
* Azure connectors can't inherit credentials from the delegate. They must be configured to connect through the Harness Platform.
* AWS connectors can't use IRSA, AssumeRole, or delegate connectivity mode. They must connect through the Harness Platform with access key authentication.

For more information, go to [Use Harness Cloud build infrastructure - Requirements for connectors and secrets](https://developer.harness.io/docs/continuous-integration/use-ci/set-up-build-infrastructure/use-harness-cloud-build-infrastructure#requirements-for-connectors-and-secrets).

### Can I change the CPU/memory allocation for steps running on Harness cloud?

Unlike with other build infrastructures, you can't change the CPU/memory allocation for steps running on Harness Cloud. Step containers running on Harness Cloud build VMs automatically use as much as CPU/memory as required up to the available resource limit in the build VM.

## Kubernetes clusters

### What is the difference between a Kubernetes cluster build infrastructure and other build infrastructures?

For a comparison of build infrastructures go to [Which build infrastructure is right for me](https://developer.harness.io/docs/continuous-integration/use-ci/set-up-build-infrastructure/which-build-infrastructure-is-right-for-me).

For requirements, recommendations, and settings for using a Kubernetes cluster build infrastructure, go to:

* [Set up a Kubernetes cluster build infrastructure](https://developer.harness.io/docs/continuous-integration/use-ci/set-up-build-infrastructure/k8s-build-infrastructure/set-up-a-kubernetes-cluster-build-infrastructure)
* [Build and push artifacts and images - Kubernetes cluster build infrastructures require root access](https://developer.harness.io/docs/continuous-integration/use-ci/build-and-upload-artifacts/build-and-upload-an-artifact#kubernetes-cluster-build-infrastructures-require-root-access)
* [CI Build stage settings - Infrastructure - Kubernetes tab](https://developer.harness.io/docs/continuous-integration/use-ci/set-up-build-infrastructure/ci-stage-settings#infrastructure)

### Can I run Docker commands on a Kubernetes cluster build infrastructure?

If you want to run Docker commands when using a Kubernetes cluster build infrastructure, Docker-in-Docker (DinD) with privileged mode is required. For instructions, go to [Run DinD in a Build stage](https://developer.harness.io/docs/continuous-integration/use-ci/run-ci-scripts/run-docker-in-docker-in-a-ci-stage).

If your cluster doesn't support privileged mode, you must use a different build infrastructure option, such as Harness Cloud, where you can run Docker commands directly on the host without the need for Privileged mode. For more information, go to [Set up a Kubernetes cluster build infrastructure - Privileged mode is required for Docker-in-Docker](https://developer.harness.io/docs/continuous-integration/use-ci/set-up-build-infrastructure/k8s-build-infrastructure/set-up-a-kubernetes-cluster-build-infrastructure#privileged-mode-is-required-for-docker-in-docker).

### Resource allocation for Kubernetes cluster build infrastructure

You can adjust CPU and memory allocation for individual steps running on a Kubernetes cluster build infrastructure or container. For information about how resource allocation is calculated, go to [Resource allocation](https://developer.harness.io/docs/continuous-integration/use-ci/set-up-build-infrastructure/resource-limits).

### What is the default CPU and memory limit for a step container?

For default resource request and limit values, go to [Build pod resource allocation](https://developer.harness.io/docs/continuous-integration/use-ci/set-up-build-infrastructure/resource-limits#build-pod-resource-allocation).

### Why do steps request less memory and CPU than the maximum limit?

By default, resource requests are always set to the minimum, and additional resources (up to the specified maximum limit) are requested only as needed during build execution. For more information, go to [Build pod resource allocation](https://developer.harness.io/docs/continuous-integration/use-ci/set-up-build-infrastructure/resource-limits#build-pod-resource-allocation).

### How do I configure the build pod to communicate with the Kubernetes API server?

By default, the namespace's default service account is auto-mounted on the build pod, through which it can communicate with API server. To use a non-default service account, specify the [Service Account Name](https://developer.harness.io/docs/continuous-integration/use-ci/set-up-build-infrastructure/ci-stage-settings#service-account-name) in the Kubernetes cluster build infrastructure settings.

### Do I have to mount a service account on the build pod?

No. Mounting a service account isn't required if the pod doesn't need to communicate with the Kubernetes API server during pipeline execution. To disable service account mounting, deselect [Automount Service Account Token](https://developer.harness.io/docs/continuous-integration/use-ci/set-up-build-infrastructure/ci-stage-settings#automount-service-account-token) in the Kubernetes cluster build infrastructure settings.

### What types of volumes can be mounted on a CI build pod?

You can mount many types of volumes, such as empty directories, host paths, and persistent volumes, onto the build pod. Use the [Volumes](https://developer.harness.io/docs/continuous-integration/use-ci/set-up-build-infrastructure/ci-stage-settings#volumes) in the Kubernetes cluster build infrastructure settings to do this.

### How can I run the build pod on a specific node?

Use the [Node Selector](https://developer.harness.io/docs/continuous-integration/use-ci/set-up-build-infrastructure/ci-stage-settings#node-selector) setting to do this.

### I want to use an EKS build infrastructure with an AWS connector that uses IRSA

You need to set the [Service Account Name](https://developer.harness.io/docs/continuous-integration/use-ci/set-up-build-infrastructure/ci-stage-settings#service-account-name) in the Kubernetes cluster build infrastructure settings.

### Why are build pods being evicted?

Harness CI pods shouldn't be evicted due to autoscaling of Kubernetes nodes because [Kubernetes doesn't evict pods that aren't backed by a controller object](https://github.com/kubernetes/autoscaler/blob/master/cluster-autoscaler/FAQ.md#what-types-of-pods-can-prevent-ca-from-removing-a-node). However, build pods can be evicted due to CPU or memory issues in the pod or using spot instances as worker nodes.

If you notice either sporadic pod evictions or failures in the Initialize step in your [Build logs](https://developer.harness.io/docs/continuous-integration/use-ci/viewing-builds.md), add the following [Annotation](https://developer.harness.io/docs/continuous-integration/use-ci/set-up-build-infrastructure/ci-stage-settings#annotations) to your [Kubernetes cluster build infrastructure settings](https://developer.harness.io/docs/continuous-integration/use-ci/set-up-build-infrastructure/ci-stage-settings.md#infrastructure):

```
"cluster-autoscaler.kubernetes.io/safe-to-evict": "false"
```

### How do I set the priority class level? Can I prioritize my build pod if there are resource shortages on the host node?

Use the [Priority Class](https://developer.harness.io/docs/continuous-integration/use-ci/set-up-build-infrastructure/ci-stage-settings#priority-class) setting to ensure that the build pod is prioritized in cases of resource shortages on the host node.

### What's the default priority class level?

If you leave the **Priority Class** field blank, the `PriorityClass` is set to the `globalDefault`, if your infrastructure has one defined, or `0`, which is the lowest priority.

### Can I transfer files into my build pod?

To do this, [use a script in a Run step](https://developer.harness.io/docs/continuous-integration/use-ci/run-ci-scripts/run-step-settings).

### How are step containers named within the build pod?

Step containers are named sequentially starting with `step-1`.

### When I run a build, Harness creates a new pod and doesn't run the build on the delegate.

This is the expected behavior. When you run a Build (CI) stage, each step runs on a new build farm pod that isn't connected to the delegate.

### Delegates

#### How the build pod communicates with delegate?
The delegate will communicate to the temp pod which is created by the container step through the build pod IP. The build pod have a lite engine running with port 20001.

#### What's the purpose of adding SCM_SKIP_SSL=true in the delegate YAML?

It skips SSL verification for SCM connections

#### What should we do on experiencing OOM on java heap for the delegate?

Try increasing the CPU request and limit both. Check CPU utilization in-case.

#### We have Kubernetes delegates with multiple instances and have noticed that during some executions, the same instance in each step and causes the pipeline to fail, as one delegate may have a file and the other instance does not. How can we ensure the same instance is used for each step?

The workaround here is to use single replica delegates for these types of tasks and use a delegate name selector (this might compromise on delegate's high availability although)

## Self-signed certificates

### Can I mount internal CA certs on the CI build pod?

Yes.

With a Kubernetes cluster build infrastructure, you can make the certs available to the delegate pod, and then set `DESTINATION_CA_PATH`. For `DESTINATION_CA_PATH`, provide a list of paths in the build pod where you want the certs to be mounted, and mount your certificate files to `opt/harness-delegate/ca-bundle`. For more information, go to [Configure a Kubernetes build farm to use self-signed certificates](https://developer.harness.io/docs/continuous-integration/use-ci/set-up-build-infrastructure/k8s-build-infrastructure/configure-a-kubernetes-build-farm-to-use-self-signed-certificates).

With a local runner build infrastructure, you can use `CI_MOUNT_VOLUMES` to use self-signed certificates. For more information, go to [Set up a local runner build infrastructure](https://developer.harness.io/docs/continuous-integration/use-ci/set-up-build-infrastructure/define-a-docker-build-infrastructure).

### How do I make internal CA certs available to the delegate pod?

There are multiple ways you can do this:

* Build the delegate image with the certs baked into it, if you are custom building the delegate image.
* Create a secret/configmap with the certs data, and then mount it on the delegate pod.
* Run commands in the `INIT_SCRIPT` to download the certs while the delegate launches and make them available to the delegate pod file system.

### Where should I mount internal CA certs on the build pod?

The usage of the mounted CA certificates depends on the specific container image used for the step. The default certificate location depends on the base image you use. The location where the certs need to be mounted depends on the container image being used for the steps that you intend to run on the build pod.

## Codebases

#### What is a codebase in a Harness pipeline?

When adding a Build stage to a CI pipeline, specify the Git account and repository where your code is stored. 

#### Which Codebase is utilized during a build deployment? 

The codebase declared in the first stage of a pipeline becomes the pipeline's default codebase

#### How to create and configure a codebase?

CI pipelines build and test code that is pulled from a Git code repository. When you add a Build stage to a CI pipeline, you can select a code repo connector that connects to the Git account or repository where your code is stored.
For details, go to [Create and configure a codebase](https://developer.harness.io/docs/continuous-integration/use-ci/codebase-configuration/create-and-configure-a-codebase).

#### Is there a way to skip the default clone codebase step in CI pipeline as it seems to be added with all the execution automatically?

Yes, We can disable the implicit clone codebase step under pipeline overview tab

#### How can we configure the failure strategy for the clone codebase step in a CI pipeline?

We wouldn't be able to cofigure failure strategy for the defalt implicit clone codebase step. However you can add a git clone step in the pipeline for which the failure strategy configuration will be available.

#### How can we configure the CI codebase step to clone the repo recursively? 

Currently, the clone codebase step doesn't support the flag recursive However you could use the git credentials from Codebase Connector in Run Step and run the git command with the required flags. More details about this can be reffered in the below doc 
[https://developer.harness.io/kb/continuous-integration/articles/using_git_credentials_from_codebase_connector_in_ci_pipelines_run_step/](https://developer.harness.io/kb/continuous-integration/articles/using_git_credentials_from_codebase_connector_in_ci_pipelines_run_step/)

#### How can we clone the codebase to a different folder other than `/harness`?

The implicit clone codebase step will always clone the repo to `/harness`. If we want to choose a different folder as the target folder, we could you the git clone step which will allow us to use a custom path as the clone directory

#### What is the default clone depth setting for CI builds?

For manual builds, the default depth is 50. The git clone operation fetches the 50 most recent commits from the repository.

For automatic or scheduled triggers, the default depth is 0. The git clone operation fetches all commits from the relevant branch, providing the complete commit history.

#### Can I configure the codebase depth to fetch a specific number of commits?

Yes. Use the [Depth](https://developer.harness.io/docs/continuous-integration/use-ci/codebase-configuration/create-and-configure-a-codebase#depth) setting to do this.

#### How can I reduce clone codebase time?

For builds triggered by pull requests, set the [Pull Request Clone Strategy](https://developer.harness.io/docs/continuous-integration/use-ci/codebase-configuration/create-and-configure-a-codebase#pull-request-clone-strategy) to `Source Branch` and set [Depth](https://developer.harness.io/docs/continuous-integration/use-ci/codebase-configuration/create-and-configure-a-codebase#depth) to `1`.

#### CI codebase variables reference

In Harness CI, you set up a codebase by creating a Harness connector that connects to a Git repo.
For details, go to [CI codebase variables reference](https://developer.harness.io/docs/continuous-integration/use-ci/codebase-configuration/built-in-cie-codebase-variables-reference).

Where can I find all the listed Codebase options for CI ?

Please find available `<+codebase.*>` listed for CI in the following [Documentation](https://developer.harness.io/docs/continuous-integration/use-ci/codebase-configuration/built-in-cie-codebase-variables-reference/)

#### What is the "Clone directory" setting for in the Git Clone step?

The "Clone directory" is an optional target path in the stage workspace where you want to clone the repository

#### What does the "Depth" setting control in the Git Clone step?

The "Depth" setting controls the number of commits to fetch when the step clones the repository. A depth of 0 fetches all commits from the relevant branch

#### Can I clone a specific sub-directory, rather than an entire repo?

Yes. For more information, go to [Clone a subdirectory](https://developer.harness.io/docs/continuous-integration/use-ci/codebase-configuration/clone-subdirectory).

#### Does Harness CI support cloning Git Large File Storage?

Yes. For more information, go to [Git Large File Storage](https://developer.harness.io/docs/continuous-integration/use-ci/codebase-configuration/gitlfs).

#### Can I run Git commands in a CI Run step?

If you need to run authenticated Git commands in a CI Run step, you must provide credentials in the Run step's script. You can also [use a `.netrc` file to store and recall these credentials](./articles/Using_Git_Credentials_from_Codebase_Connector_in_CI_Pipelines_Run_Step.md), instead of providing them for each command.

#### How does a `.netrc` file help execute Git commands in a CI Run step?

Creating a `.netrc` file in a CI Run step provides a mechanism for storing Git credentials required for manual Git operations. It ensures that the necessary authentication information is readily available when executing Git commands in the Run step.

By using the `.netrc` file, you can execute Git commands within the run step without having to provide credentials each time. Git automatically references the `.netrc` file to retrieve the necessary credentials.

#### The expression ```<+eventPayload.repository.name>``` is giving only the repo name but not the project name and the clone step fails when we use this expression for the codebase repo if we are using account type bitbucket connector. What expression can be used to get the repository name including the project name?

You could try the expression ```<+trigger.payload.repository.project.key>/<+trigger.payload.repository.name>``` to get the repo name including the project name from the payload

## SCM status updates and PR checks

#### Is it achieveable If user disable the option clone codebase, instead user want to use the git clone step to get the Git statuses?

No, User need to enable the clone code base configurution in the CI stage.

#### How can we share a failed step's output in a pull request comment as part of a CI pipeline execution?
Below given one of the methods with which we could achieve this.

- Modify the failed step's command to save output to a file: `your_command 2>&1 | tee output_file.log`
- Read the file's content in a subsequent step which is configured to run always
- Use the GitHub API to add a comment to the pull request, including details from the file.

#### Why the build status is not reflecting on the PR if the repository is in a github orginisation despite having full permission for the token used in the git connector?

This could be due to the fact that the user/account that is added to the organization using a repository role which doesnt have enough permission to write to the repository. If the repository role doesnt have enough permission, the PAT user account used in the git connector will not be able to update the PR even if the token has full permission.

#### Does harness supports pull request git statuses?
Yes harness supports pull request build validation.

#### For pull request build validation is there any specfic configurution need to done?
Yes, The Git connector should enabled with API access to get the git statuses and also need to enable the clone code base configurution.

#### In case of multi stage pipeline, will the CI stage execution update the build status in PR even if the clone codebase option is disabled in that stage?

Yes, currently the CI stage execution updates the build status on PR even if the clone codebase option is disabled for that specific stage however there are some work in progres to improve this experience

#### Do we need to have a CI stage in the pipeline to get the PR updated with the build status?

Yes, the build status is updated on the PR only when a CI stage is executed.

#### When multiple CI stages exist in a pipeline, will the build status be updated on the pull request for each individual stage or for the entire pipeline?

The build status will be updated for the individual CI stages

#### Is there any character limit for the build status message updated on PR?

Yes. Github has a limit of 140 characters for the message that can be updated on the PR post which the call will fail with an error ```description is too long (maximum is 140 characters)```

#### What identifiers will be included in the build status message which is updated on PR during the CI stage execution?

Pipeline identifier and stage identifier will be included in the build status message.

#### How to configure the git connector to not update the PR with the build status?

One option would be to remove the API access from the cdebase connector so that the build status will not be updated on the PR

#### What is the complete format used in the build status messages which is updated on PR during the CI stage execution?

The build status message format is ```<pipeline_identifier>-<stage_identifier> — Execution status of Pipeline - <pipeline_identifier> (execution_ID) Stage - <stage_identifier> was SUCCEEDED```



## Pipeline initialization and Harness CI images

#### How can I list the internal images that CI uses?

For information about images that Harness CI uses to execute builds, including how to find a list of images, go to [Harness CI images](https://developer.harness.io/docs/continuous-integration/use-ci/set-up-build-infrastructure/harness-ci).

Where can I find the list of available Harness CI images?

You can find the list of available Harness CI images [here](https://console.cloud.google.com/gcr/images/gcr-prod/global/harness)

#### How often are Harness CI images updated?

Harness publishes updates for all CI images on the second and fourth Monday of each month. New versions of images are released every two weeks

#### How to list the tags available for an image which is being listed when hitting the endpoint ```https://app.harness.io/registry/_catalog```?

We could hit the endpoint ```https://app.harness.io/registry/harness/<image_name>/tags/list``` to list all the available tags for an image in the registry ```app.harness.io/registry```

#### What access Harness uses by default to pull the harness internal images from the public repo?

Harness uses anonymous access to Docker Hub to pull Harness images by default. This can be updated if required.

You have security concerns with pulling Harness delegate images from a public repo? You can add special Harness Container Image Registry connector to your Harness account. With this connector, the Delegate pulls these images from the Harness Container Image Registry only. See link for more details [https://developer.harness.io/docs/platform/connectors/artifact-repositories/connect-to-harness-container-image-registry-using-docker-connector/]

#### Can I use my own private registry to store Harness CI images?

Yes, you can pull Harness CI images from your own private registry if you don't want to use the public container registry

You have security concerns with pulling Harness delegate images from a public repo? You can add special Harness Container Image Registry connector to your Harness account. With this connector, the Delegate pulls these images from the Harness Container Image Registry only. See link for more details [https://developer.harness.io/docs/platform/connectors/artifact-repositories/connect-to-harness-container-image-registry-using-docker-connector/]

#### I'm seeing `Failed to pull image "artifactory.domain.com/harness/ci-addon:1.16.22": rpc error: code = Unknown desc = Error response from daemon: unknown: Not Found`. What does this mean?

It means the harness internal image, in this case `ci-addon:1.16.22`, is not present in your artifact repository and you are using the `account.harnessImage` connector for your artifact repository in Harness. You can use this connector to pull your own images, but it is also used to pull Harness CI images. Modifying this connector can cause it to fail to pull necessary CI images.

You can [proxy and pull Harness CI images from your own repository](https://developer.harness.io/docs/continuous-integration/use-ci/set-up-build-infrastructure/harness-ci/#specify-the-harness-ci-images-used-in-your-pipelines) and configure the `account.harnessImage` connector (or another connector) to [connect to the Harness container image registry or pull images from your own registry](https://developer.harness.io/docs/platform/connectors/artifact-repositories/connect-to-harness-container-image-registry-using-docker-connector).

#### Why is the initialize step is occusionally timeout at 8 minutes?

Eight minutes is the default time out of the initialization step however if the build pod is expected to pull any large images, we could increase this init timeout in the advanced section of the infrastructure configuration.

### What does "ErrImagePull" mean?

This means that Harness couldn't pull an image necessary to run the pipeline. This can happen if there are networking issues or if the target image is not available in the specified repository.

### When a pipeline pulls artifacts or images, are they stored on the delegate?

Artifacts and images are pulled into the [stage workspace](https://developer.harness.io/docs/continuous-integration/use-ci/prep-ci-pipeline-components#shared-paths), which is a temporary volume that exists during pipeline execution. Images are not stored on the delegate during pipeline execution. In a Kubernetes cluster build infrastructure, build stages run on build pods that are cleaned automatically after the execution.


## Build and push images

#### How to build and push artifacts and images?

You can use Harness CI to upload artifacts, such as Docker images or test results.
For details, go to [Build and push artifacts and images](https://developer.harness.io/docs/continuous-integration/use-ci/build-and-upload-artifacts/build-and-upload-an-artifact).

#### What drives the Build and Push steps? What is Kaniko?

With Kubernetes cluster build infrastructures, Build and Push steps use [kaniko](https://github.com/GoogleContainerTools/kaniko/blob/main/README.md). Other build infrastructures use [drone-docker](https://github.com/drone-plugins/drone-docker/blob/master/README.md). Kaniko requires root access to build the Docker image.

#### Does kaniko support non-root users?

With a Kubernetes cluster build infrastructure, **Build and Push** steps use the kaniko plugin. Kaniko requires root access to build Docker images, and it does not support non-root users. However, you can [build and push with non-root users](https://developer.harness.io/docs/continuous-integration/use-ci/build-and-upload-artifacts/build-and-push-nonroot).

#### How can I run Build and Push steps as root if my build infrastructure runs as non-root?

If your build is configured to run as a non-root user (meaning you have set `runAsNonRoot: true`), you can run a specific step as root by setting **Run as User** to `0` in the step's settings. This setting uses the root user for this specific step while preserving the non-root user configuration for the rest of the build. This setting is not available for all build infrastructures, as it is not applicable to those build infrastructures.

#### What if my security policy doesn't allow running as root?

If your security policy strictly forbids running any step as root, you can use the buildah plugin to [build and push with non-root users](https://developer.harness.io/docs/continuous-integration/use-ci/build-and-upload-artifacts/build-and-push-nonroot).

#### How do I configure the buildah plugin?

In your build stage settings, you must use a Kubernetes cluster build infrastructure that is configured to run as non-root with `anyuid SCC` (Security Context Constraints) enabled.

For information about the buildah plugin, go to [Build and push with non-root users](https://developer.harness.io/docs/continuous-integration/use-ci/build-and-upload-artifacts/build-and-push-nonroot).

#### Can I enable BuildKit support with Build and Push steps?

The [Build and Push steps use kaniko or drone-docker](#what-drives-the-build-and-push-steps-what-is-kaniko) to build images. If you need to use BuildKit, you can't use the built-in Build and Push steps. Instead, you need to run Docker-in-Docker in a Background step, and then run your `docker build` and `docker push` in a Run step. For instructions, go to [Run Docker-in-Docker in a Build stage](https://developer.harness.io/docs/continuous-integration/use-ci/run-ci-scripts/run-docker-in-docker-in-a-ci-stage).

#### Is there a way to use the newer version of kaniko?

Yes, you can update the kaniko image as suggested in this [doc](https://developer.harness.io/docs/continuous-integration/use-ci/set-up-build-infrastructure/harness-ci/).

#### Does Kaniko build use images cached locally on the node?

By default Kaniko does not use the node cache. it performs a full container image build from scratch, so it will always pull the base image. If we want to use cache, then specify the **Remote Cache Repository** option in the build step. If not specified it will always be executed with caching disabled

#### Can I enable caching in Kaniko builds which is being used by the CI build and push step?

Yes, you can enable caching in Kaniko builds by utilizing the Remote Cache Repository option in the build step settings. This option allows Kaniko to leverage previously built layers that haven't changed, which can significantly speed up the image building process.

#### How can we reduce the high execution time in build and push step because the pipeline is not able to cache a remote repo?

You can reconfigure the docker file to create the cache layer and install the dependencies before moving other files to improve the execution time.

#### Can I push without building?

Harness CI provides several options to [upload artifacts](https://developer.harness.io/docs/continuous-integration/use-ci/build-and-upload-artifacts/build-and-upload-an-artifact#upload-artifacts). The **Upload Artifact** steps don't include a "build" component.

#### Can I build without pushing?

You can [build without pushing](https://developer.harness.io/docs/continuous-integration/use-ci/build-and-upload-artifacts/build-without-push).

#### From where does the "Build and Push to ECR" step pull the base images specified in the Dockerfile?

By default, "Build and Push to ECR" step downloads base images from the public container registry 

<!-- dockerfile is from the codebase. The AWS connector in build and push to ECR step is your target container registry to upload the built image. Base image connector setting can use a differnet connector, such as a Docker connector, to pull the base images. -->

#### How can we configure the "Build and Push to ECR" step to pull the base images from our internal container registry with authentication?

<!-- Base image connector setting -->
You could create a authenticated doccker connector and use that as the base image connector in "Build and Push to ECR" step

#### where does the build and push step expect the dockerfile to be present by default?

The Dockerfile is assumed to be in the root folder of the codebase. <!-- use Dockerfile settings to specify a different path -->

#### How do I build a Docker image in a Build and Push step from a base image from a specific registry?

Use the [Base Image Connector setting](https://developer.harness.io/docs/continuous-integration/use-ci/build-and-upload-artifacts/build-and-push-to-ecr-step-settings#base-image-connector) to do this. <!-- only available for build and push to ECR -->

#### How can I configure and use images from multiple Azure Container Registries (ACRs)?

To configure and use images from multiple ACRs in Harness, you need to set up individual Harness service configurations for each ACR you want to use. Within each service configuration, specify the image repository and tag from the respective ACR.

## Upload artifacts

#### How can we send mail from the CI pipeline with an attachement?

You could send mail from the CI pipeline by using the drone plugin [https://plugins.drone.io/plugins/email](https://plugins.drone.io/plugins/email). More details about how the drone plugin can be used in Harness CI pipeline can be reffered in the below doc
[https://developer.harness.io/docs/continuous-integration/use-ci/use-drone-plugins/run-a-drone-plugin-in-ci/](https://developer.harness.io/docs/continuous-integration/use-ci/use-drone-plugins/run-a-drone-plugin-in-ci/)

#### What is PLUGIN_USERNAME & PLUGIN_PASSWORD used in the jfrog command executing as part of `Upload Artifacts to JFrog Artifactory` ?

This is the creds used to upload the artifact to the jfrog artifactory and this is taken from the artifactory connector

#### Can we run `Upload Artifacts to JFrog Artifactory` step with non root user?

No, jfrog command execution will be creating a folder `.jfrog` under / which will fail if the plugin is running with non root user

#### Is it possible to publish custom data, such as outputs from variables or custom messages, strings, or any other information, in the Artifacts tab?

Currently, the only way to publish data in the Artifacts tab is by providing a URL to a publicly accessible location where the artifact is stored. If you do not have any public buckets, you can consider using a private bucket and generating a pre-signed URL to access the artifact.
This URL can be used in the "file_urls" setting of the Artifact Metadata Publisher plugin to publish the artifact in the Artifacts tab. Another option is to use a different cloud storage provider that allows you to generate temporary URLs for private objects, such as Google Cloud Storage signed URLs or AWS S3 pre-signed URLs.

#### Is there a way to store artifact URLs and display them in the Harness platform?

Yes, you can use the Artifact Metadata Publisher plugin to store artifact URLs and display them on the Artifacts tab in the Harness

#### Does the Upload Artifacts to S3 step compress files before uploading them?

No. If you want to upload a compressed file, you must use a [Run step](https://developer.harness.io/docs/continuous-integration/use-ci/run-ci-scripts/run-step-settings) to compress the artifact before uploading it.


## Tests

#### Can I specify multiple paths for test reports in a Run step?

Yes, you can specify multiple paths for test reports. Ensure that the reports do not contain duplicate tests when specifying multiple paths

#### why is the test report is gettinng truncated in tests tab UI? 

The Tests tab may display content truncated if a field in your test report XML file surpasses 8,000 characters, as there is an 8,000-character limit per field

#### Why the run step within the container step group is unable to publish the test report with the error ```Unable to collect test reports``` even after the report path is correctly configured?

Currently publishing the test report via run step within the containerized step group is not supported. However the team is working on supporting this in the future release.

#### If the "Run test" steps fails the Post-Command script will run or not?

No, the Post-Command script will only run if the "Run test" step pass.

#### How do I use Test Intelligence?

Harness Test Intelligence (TI) improves unit test time by running only the unit tests required to confirm the quality of the code changes that triggered the build

For information about how TI works and how to enable it, go to [Test Intelligence overview](https://developer.harness.io/docs/continuous-integration/use-ci/run-tests/test-intelligence/set-up-test-intelligence).

#### Can Test Intelligence speed up my build times? 

You can speed up your test cycles by running only the unit tests required to confirm the quality of the code changes that triggered a build. Test Intelligence 

#### What are some of the other benefits of Test intelligence?

Test Intelligence also identifies negative trends and provides actionable insights to improve quality. 

#### Control memory on "Run Tests" step using Harness Cloud

In the Harness Cloud this resource editing possibility is not available. Hence there is no way to control the memory like we can do for other infrastructure.

####  Is the "Tests" tab in CI Build execution tied to Test Intelligence?

No. You could add the test report path in runstep, background step etc and the test results will be appeared in tests tab of the execution if the test report is in junit format.

#### What criteria does Test Intelligence use to select tests for execution in a pull request scenario?

In a pull request, TI uses the following criteria to select tests:

1) Changed code
2) Changed tests
3) New tests

#### On navigating to the tests tab, why the call graph shows up as empty with a message stating that `No call graph is created when all tests are run`?

The callgraph would be huge and is not shown when all tests are run (full-run or bootstrap run) because it is not useful as no test-selection was done in this case

#### How can I understand the relationship between code changes and the selected tests in a PR?

In the `Tests` tab, the visualization graph provides insights into why each test was selected. It visually represents the relationship between the selected tests and the specific code changes in the PR

## Script execution

#### Does Harness CI support script execution?

Yes, for details, go to [Run scripts](https://developer.harness.io/docs/category/run-scripts).

#### Using \<+codebase.gitUser> results in "None" when using Python as Shell for a Run step

<!-- This is not a solution. -->

The problem here is that none of the 'codebase' variables are being populated when push triggers fires. The solution is to populate the 'codebase' variables to clone the codebase.

#### Is it possible to use an image in the run step that does not include a shell?

In run step, the command is a required field and any shell should be available in the image used to be able to run the commands

#### Is a Docker image is required to run scripts in CI builds with a local runner build infrastructure?

Yes. Container registry and image are always required for Run steps with a local runner build infrastructure.

#### The container that execute the Run command step, it must have docker and docker CLI installed right in order for this to work?

Yes, user need to install docker and docker CLI in order to work.

#### Why the run step is failing with the error ```1 error occurred: * stat /tmp/engine/Zko3loXHTre2vfh-output.env: no such file or directory``` while trying to export the output variable from the run step which uses python shell?

This could happen if you are exiting the python script manually by calling ```exit(0)```. If you configure output variable in the run step that uses python shell, we add few lines of code at the end of your custom script which will add the variable to be exported to a temp file. When you are calling exit(0) at the end of the script, these codes responsible for exporting variable will not be run which causes this issue. 

## Entrypoint

### What does the "Failed to get image entrypoint" error indicate in a Kubernetes cluster build?

This error suggests that there is an issue accessing the entrypoint of the Docker image. It can occur in a Kubernetes cluster build infrastructure when running PostgreSQL services in Background steps.

To resolve this error, you might need to mount volumes for the PostgreSQL data in the build infrastructure's [Volumes](https://developer.harness.io/docs/continuous-integration/use-ci/set-up-build-infrastructure/ci-stage-settings#volumes) setting, and then reference those volumes in the Background step running your PostgreSQL instance. For instructions, go to [Troubleshooting: Failed to get image entrypoint](https://developer.harness.io/docs/continuous-integration/use-ci/manage-dependencies/multiple-postgres#troubleshooting-failed-to-get-image-entrypoint).

#### Does Harness "run container" overwrites the container entrypoint?

Yes, it is an expected behavior. The entrypoint in the base image should be overwritten as we have to run the commands specified in the run step.

#### Why is the default entry point is not running for the container image used in the run step?

The default entry point would be overriden by the commands you specified in the command section of the run step

#### If the the default entry point is not executed for the container image used in the run step, how can we get the service started within a container which would usually be started as part of the default entry point?

You would need to use the background step in this usecase where we would execute the default entry point and run the container in dettached mode

#### How can we run the default entry point of the image used in the run step?

The commands specified in the command section of the run step will override the default entry point. You will need to manually run the default entry point by explicitly calling the script configured as the default entry point

## Docker in Docker

#### Is it supported to run docker-compose from docker in docker in a Background step?

Yes, it's supported to run the docker-compose from docker in docker running in a Background step.

#### Is privileged mode necessary for running DinD in Harness CI?

Yes, Docker-in-Docker (DinD) must run in privileged mode to function correctly

#### Are there any limitations to using DinD on platforms that do not support privileged mode?

DinD cannot be used on platforms that do not support privileged mode. For example, platforms that run containers on Windows or fargate nodes do not support privileged mode

#### why is the dind background step is failing with the error "Pod not supported on Fargate: invalid SecurityContext fields: Privileged"?

The error "Pod not supported on Fargate: invalid SecurityContext fields: Privileged" occurs because AWS Fargate does not support the use of privileged containers.

## Plugins and integrations

#### Which Drone plugins are supported in Harness CI?
You can build your own plugins or use one of the many preexisting plugins from the [Drone Plugins Marketplace](https://plugins.drone.io/), [GitHub Actions Marketplace](https://github.com/marketplace?type=actions), or the [Bitrise Integrations library](https://bitrise.io/integrations/steps).
Yes, for details, go to [Use plugins](https://developer.harness.io/docs/continuous-integration/use-ci/use-drone-plugins/explore-ci-plugins).

#### How do we add a custom plugin to my CI pipeline in Harness?

We can add a custom plugin to the CI pipeline using a Plugin step in your Build stage

#### How can we run the custom plugin locally for testing?

Plugins are regular containers which would execute a predefined task. We can test the custom plugin in a local environment by running it as a Docker container with the required inputs

#### How user use own plugins in Harness CI pipelines?
1. Create your plugin to perform a specific task, written in any programming language.
2. Integrate the plugin into your CI pipeline using a Plugin step.

#### Why is the PATH Variable Overwritten in Parallel GitHub Actions Steps?

The PATH variable can be overwritten when running parallel steps in GitHub Actions because these steps could modify the PATH variable depens on which step ran last. When these steps run in parallel, a race condition occurs, and only one of them will be able to set the PATH variable correctly. To avoid this, consider running these steps sequentially in your workflow.

#### Is it possible to integrate our CI builds with the Datadog Pipeline Visibility feature?

We do not have OOTB support for Datadog Pipeline Visibility. However, I can suggest the following approach to push the pipeline event to a webhook endpoint: Link to documentation on webhook notifications.




## Workspaces, shared volumes, and shared paths

#### What is a workspace in a pipeline, and how does it work?

Workspace is a temporary volume that is created when the pipeline runs. It serves as the current working directory for all the steps within a stage. During initialization, the pipeline clones your codebase to the root of this workspace. The workspace persists for the entire duration of the stage, allowing steps to communicate and share state information. 

#### Is workspace persists after the stage completion?
No, the workspace is destroyed when the stage ends.

#### How do I share data between steps in a CI stage?

We could use shared paths to allow steps within a stage to share data with each other. You can specify custom paths for data sharing or cache purposes. For more information, go to [Share data across steps and stages](https://developer.harness.io/docs/continuous-integration/use-ci/caching-ci-data/share-ci-data-across-steps-and-stages).
For example, you can [save and restore a cache from an Amazon S3 bucket.](https://developer.harness.io/docs/continuous-integration/use-ci/caching-ci-data/saving-cache)

#### What volume will be created when we add a shared path in a CI pipeline?

When a shared path is added in the CI pipeline, we will create an empty directory type volume and this volume will be mounted on all the step containers. 

#### Can I share additional volumes between steps in a stage?

Yes, you can share additional volumes between steps in a stage by adding Shared Paths in the Build stage settings. This will allows you to specify specific directories or locations for all steps in the stage can access and share data from, in addition to the default workspace.

#### Does shared path in SAM Build Manifest shows where the download happens ?

No , shared paths does not dictate where the download happens. There could be multiple shared paths provided , but it does not mean our manifests would be downloaded in that shared path. More details on shared path can be read in the following [Documentation](https://developer.harness.io/docs/continuous-integration/use-ci/caching-ci-data/share-ci-data-across-steps-and-stages/)

#### Why the changes made on the container image filesystem in a CI step is not available in the subseqent step where the same container image is used?

When we pick a container image for a step, any changes we make there will only affect that step. The next step won't notice these changes even we use the same image unless we edit the `/harness` directory, which is automatically shared among all steps.

## Caching

####  How can I download files from an S3 bucket in Harness?

You have two common options to download files from an S3 bucket in Harness:
1. **Using the "Save and Restore Cache from S3" Step:** You can achieve this by utilizing the [Save and Restore Cache from S3 step](https://developer.harness.io/docs/continuous-integration/use-ci/caching-ci-data/saving-cache/). This step is specifically designed for downloading files from S3 and simplifies the process.
2. **Custom Shell Script:** Alternatively, you can create a custom shell script by following the guidelines outlined in the [shell script documentation](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/cd-steps/utilities/shell-script-step/). This approach offers more flexibility, allowing you to tailor the download operation to your specific needs and preferences.

#### Using GCS to cache and restore between Steps?

Yes, for details, go to [Save and Restore Cache from GCS](https://developer.harness.io/docs/continuous-integration/use-ci/caching-ci-data/save-cache-in-gcs).

#### Does Harness CI support Multilayer caching?

Yes, for details, go to [https://developer.harness.io/docs/continuous-integration/use-ci/caching-ci-data/multilayer-caching](https://developer.harness.io/docs/continuous-integration/use-ci/caching-ci-data/multilayer-caching).

#### How to use an artifact generated on a different stage?

You could use the save/restore cache step or Harness cache intelligence to achieve this use case depending on where your build is running.

#### What is the purpose of saving and restoring cache from GCS/S3 in Harness CI?

The purpose of saving and restoring cache from GCS/S3 in Harness CI is to improve build times and enable the sharing of data across different stages in your CI pipelines

#### Are there alternatives to saving and restoring cached data from GCS in Harness CI pipelines?

Yes, you can also save and restore cached data from other sources like S3 or use Harness Cache Intelligence for data management

#### What is the purpose of the "Fail if Key Doesn't Exist" option in the "Restore Cache from GCS" step?

This option determines whether the step should fail if the specified cache key doesn't exist in the GCS bucket. If selected, the step fails when the key is not found

#### Is remote caching supported in Build and Push steps?

Harness supports multiple Docker layer caching methods depending on what infrastructure is used. Go to [Docker layer caching](/docs/continuous-integration/use-ci/caching-ci-data/docker-layer-caching) to learn more.

#### Does harness override the cache when using the save cache to S3 step?

By default ```save cache to s3``` step will not override the cache however there is an optional configuration which will overrode the cache with the same key if enabled

#### How user can configure the Restore Cache step to check if a cache was restored?

In the configuration of the Restore Cache step:

1. Set it to fail if the target cache key isn't found.
2. Enable a failure strategy that allows the pipeline to continue despite the step failure.

### Cache Intelligence

#### Cache Intelligence on Harness Cloud Infrastructure

Harness only currently supports cache intelligence on the Harness Cloud infrastructure. 
See [https://developer.harness.io/docs/continuous-integration/use-ci/caching-ci-data/cache-intelligence/](https://developer.harness.io/docs/continuous-integration/use-ci/caching-ci-data/cache-intelligence/)

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

#### Why I can't toggle cache intelligence in my CI pipeline?

Currently, Cache Intelligence is only available for Linux and Windows platforms on Harness Cloud, the Harness-hosted build environment.
For other build infrastructures, you can use Save and Restore Cache steps, such as Save and Restore Cache from S3, to include caching in your CI pipelines. For more information: [Supported Build Infra](https://developer.harness.io/docs/continuous-integration/use-ci/caching-ci-data/cache-intelligence/#supported-build-infrastructures)

#### Why is the ```Enable Cache Intelligence``` option is greyed out in the CI pipeline?

Harness cache intelligence is currently supported when you run the build in Harness cloud on Linux and Windows platforms. For all the other build infra, this option would be greyed out.

#### Does Cache Intelligence have the capability to expire the cache?"

Yes, The cache will be expired every 15 days

## Background steps and service dependencies

#### Why is background step is always marked as succeess even if there are failures executing the entrypoint?

This is expected behaviour as we start background step and will immedeatly move on to next step by marking the step status as success. We should be having a subsequent run step to check if the services being started as part of the background step is accessible before trying to use them in the pipeline.

#### How to use Background step settings?

Use Background steps to manage dependent services that need to run for the entire lifetime of a Build stage. 
For details, go to  [Background step settings](https://developer.harness.io/docs/continuous-integration/use-ci/manage-dependencies/background-step-settings).

#### What options are available for running health checks on background services in Harness CI?

You can add a run step to your pipeline to run health checks on background services to ensure they are up and running as expected. These checks help validate the service's readiness

#### What is the purpose of Background steps in CI stage?

Background steps are used to manage dependent services that need to run for the entire lifetime of a Build stage

#### Can Background steps run multiple services simultaneously?

Yes, you can set up your pipeline to run multiple background services, creating a local, multi-service application

#### Do Background steps have limitations?

Yes. Background steps have these limitations:

* Background steps don't support failure strategies or output variables.
* Steps running in containers can't communicate with Background steps running on [Harness Cloud build infrastructure](https://developer.harness.io/docs/continuous-integration/use-ci/set-up-build-infrastructure/use-harness-cloud-build-infrastructure) because they don't have a common host.
* If your build stage uses Harness Cloud build infrastructure and you are running a Docker image in a Background step, you must specify [Port Bindings](https://developer.harness.io/docs/continuous-integration/use-ci/manage-dependencies/background-step-settings#port-bindings) if you want to reference the Background step in a later step in the pipeline (such as in a cURL command in a Run step).

#### Can user configure service dependencies in Gradle builds?

Yes, you can configure service dependencies in Gradle builds.

#### What prerequisites are there for running Background steps?

The build environment must have the necessary binaries for PostgreSQL. Depending on the build infrastructure, Background steps can use existing binaries in the environment or pull an image, such as a Docker image, containing the required binaries.

#### Can Background steps use external images for PostgreSQL services?

Yes, depending on the build infrastructure, Background steps can either use existing binaries in the build environment or pull an image from public or private Docker image, that contains the required PostgreSQL binaries.

#### How do user add volumes for PostgreSQL data in the build infrastructure settings?
In the build infrastructure settings, configure one empty directory volume for each PostgreSQL service. This can typically be done through the Kubernetes configuration or deployment files.

#### How do I add a Run step to test PostgreSQL services?

In the same CI stage where you added the Background steps, include a Run step after the Background steps. Ensure that the Run step is not in the parallel group to avoid conflicts.

#### What is the use of the Run step for psql commands?

A4: The Run step for psql commands serves as a validation step before proceeding with subsequent actions.

#### How can I check that a LocalStack service running in a Background step is healthy?

1. In the "Run" step
2. Enter "localstack health" in the Name field.
3. Enter a cURL command in the Command field to ping the LocalStack service running in a Background step.

   Depending on your build infrastructure, you might reference the service by the Background step ID, localhost, or IP address and the container port or host port. For more information go to [Background step settings - Name and ID](https://developer.harness.io/docs/continuous-integration/use-ci/manage-dependencies/background-step-settings#name-and-id) and [Background step settings - Port Bindings](https://developer.harness.io/docs/continuous-integration/use-ci/manage-dependencies/background-step-settings#port-bindings).

4. Expand the Optional Configuration section, configure the Container Registry field, and select your Docker Hub connector.
5. Enter "curlimages/curl:7.83.1" in the Images field.



## Conditional executions, looping, parallelism, and failure strategies

#### How can we configure a specific step to only run when a certain file, like a .toml configuration file, has changed in the repository?

To achieve conditional step execution based on changes to a specific file, you can set up webhook triggers with file-based conditions. Configure the trigger to activate the step only when the targeted file (e.g., config.toml) has been modified in the repository.

#### How can we configure a step/stage/pipeline to fail/pass based on the % of test cases failure/success?

We wouldn't be able to natively configure a stage/pipeline to fail/pass depending the % of test cases failure/success. To achieve this use case, we would need to manually parse the test result which will be created after the test step execution and have few variables exported from the test step which will have the  % of test cases failure/success and then the value of this variable can decide the status of the stage/pipeline.

#### What does a failure strategy consist of?

First: Error conditions that trigger the failure strategy.

Second: Actions to take when the specified error conditions occur.

#### Why is the CI Initialize step failing with a Null Value Error when a step is configured with looping Strategy?

This could happen when you use an expression for an output variable from a previous step under the repeat looping strategy in the subsequent step. In CI stages, the execution happens on separate build pods, and all the expressions needs to be available before we start the initialize step.

#### Can pipeline execution be aborted when the referenced branch is deleted?

This is not natively supported however we could have a pipeline listening on delete webhook event and abort all the running pipelines referencing the deleted branch via API.

#### Is there a way to abort a running pipeline from a step in that pipeline?

We could use the ```putHandleInterrupt``` API to abort a running pipeline from a step in that pipeline. More details about this pipeline can be reffered in the [doc](https://apidocs.harness.io/tag/Pipeline-Execute/#operation/putHandleInterrupt)

#### Can I assert an environment variable within JEXL conditions?

While we support output variables that can point to an environment variable, we do not support the direct referencing of environment variables in JEXL conditions, even when using the feature flag `CI_OUTPUT_VARIABLES_AS_ENV` (which automatically makes environment variables available for other steps in the same build stage).

The conditions in JEXL only allow the use of variable expressions that can be resolved before the stage is executed. Since environment variables are resolved during runtime, it is not possible to utilize variable expressions that cannot be resolved until the stage is run.

## Logs and execution history

#### Does Harness limit the length of a log line?

Yes, there is a single-line limit of 25KB. If an individual line exceeds this limit, it is truncated and ends with `(log line truncated)`. Furthermore, there is an overall log limit of 5MB per step. Harness truncates logs larger than 5MB.

If you need to extract long log lines or logs larger than 5MB, include a Run step in your pipeline that writes the logs to a file and uploads the file as an artifact. For more information, go to [Troubleshoot CI: Truncated execution logs](https://developer.harness.io/docs/continuous-integration/troubleshoot-ci/troubleshooting-ci#truncated-execution-logs).

#### Why does the Harness step continue to show success even after executing exit 1 inside a bash function that is running in background in the script?

The step in Harness determines its status based on the exit status received from the script execution. When you call a function in the background within your script, it doesn't directly impact the exit status of the main script. Therefore, if you manually call exit 1 within the function, it won't cause the step to fail. This behavior is consistent with how scripts operate both inside and outside of Harness.

#### Is it possible to get the logs of a service running in Harness cloud VM when a specific run step is executing?

Yes. We could add a parallel step to the run step and tail the service specific logs to get all the logs while the build is running. A similar use case is documented [here](https://developer.harness.io/docs/continuous-integration/use-ci/set-up-build-infrastructure/resource-limits/#use-a-parallel-step-to-monitor-failures)

#### Why are my builds from over 30 days ago not appearing on the Project Overview page?

Often overlooked, you can check the timescale for the overview page. By default, it is set to 30 days. 

#### Builds dashboard is not showing a previous deployment, why? 

Please check the timescale control on the dashboard. This is set to 30 days by default. You can adjust this scale to display older builds. 

#### How to view changes in a Harness Pipeline between deployments

Harness allows users to compare changes to a pipeline YAML. This is often a useful tool to determine why a pipeline has changed behavior. 
See the site for more details [https://developer.harness.io/docs/platform/pipelines/view-and-compare-pipeline-executions/]

## Debug mode

#### Why the debug mode ssh session is getting closed after sometime?

SSH debug session will automatically terminate after one hour or at the step timeout limit, whichever occurs first

#### When we run the pipeline in debug mode, do we need to have a step failure in order to be able to remotely connect to the build pod/VM?

Yes. The remote debug ssh session details will only be shown after a step failure when you run the pipeline in debug mode

#### How can we get the remote rebug session of a pipeline running without any failure for troubleshooting purpose?

Remote debug session will only be presented if there is a failure in the pipeline. If the pipeline is executing successfully but we still want to have the debug session for troubleshooting purpose, we could add a run step with command ```exit 1```   which will fail the build and you can then rerun it in debug mode

#### Why can we not see the option `Re-run in debug mode` for a new pipeline?

Debug mode is not available for the first build of the pipeline. We should run the pipeline atleast once to be able to run it in debug mode.

## Templates and input sets

#### Can we change the Git Connector of a template and keep the version, repo, etc?

There's direct option to change such things. Go to template listing page, click on 3 dots on any template for further options and you will see "edit git metadata" option over there.

#### Why can't we find the Notify Option in my Stage Template?

The absence of the 'Notify' option in the Stage template is expected behavior as the notifications are configured at the pipeline level and it is not available at the individual stage level. Therefore, you won't find the 'Notify' option when creating a stage-level template.

#### How Can I Set Up Notifications for Failures in Stage Templates?

While notifications are a pipeline-level setting and not available at the stage level, you can still set up notifications for failures in your Stage templates. You can achieve this by adding a plugin step in a CI stage that sends notifications. Harness supports drone plugins like email and Slack, which can be used to notify about failures.

#### How can Harness input sets help automate a CI pipeline?

Input sets are a collection of runtime inputs for a Pipeline execution. With input sets, you can use the same pipeline for multiple scenarios. You can define each scenario in an input set or overlay, and then select the appropriate scenario when you execute the pipeline. 

## CI with CD

#### Why did the CI stage still go through despite setting a freeze window?

[Freeze windows only apply to CD stages.](https://developer.harness.io/docs/continuous-delivery/manage-deployments/deployment-freeze/#freeze-windows-only-apply-to-cd-stages)

#### Why the build status is not getting updated for approval stage?

Build status is updated at the stage level and happens only for the CI stage

#### Can we use \<+codebase.commitSha> variable in CD Stage to get commit id?
Yes you can able to get the commit id by using \<+codebase.commitSha> variable, you can use the same variable in the CD stage to get the commit id in same pipeline after CI stage.

#### Will \<+codebase.commitSha> variable will work in CD stage if CI stage is not present in the pipeline?
The \<+codebase.commitSha> variable will not work in the CD Stage without the CI stage in the pipeline.

#### If user can again define clone step in the CD and will they can able to get the commidID there again without CI stage in the pipeline?
No, user can't able to get commit id in that case.

#### How can we reference the secret type output variable exported from CD/custome stage in CI stage?

Currently, the secret-type output variable exported from a step in a CD/custom stage is not supported in CI stage

## Triggers

#### Is it possible to trigger a CI stage by a trigger of type artifact ?

While it is possible to [trigger deployments with artifact triggers](https://developer.harness.io/docs/platform/triggers/trigger-on-a-new-artifact/), there are currently no CI-specific triggers for artifacts.

#### What expression can I use to refer to the repository name from the incoming payload for a trigger?

The expression ```<+eventPayload.repository.name>``` can be used to reference the repository name from the incoming trigger payload

## Default user, root access, rootless, non-root

#### Is rootless configuration supported for Windows build infrastructures?

No, currently this is not supported for Windows builds.

#### Can I enable root access for a single step?

If your build runs as non-root (meaning you have set `runAsNonRoot: true`), you can run a specific step as root by setting **Run as User** to `0` in the step's settings. This setting uses the root user for this specific step while preserving the non-root user configuration for the rest of the build. This setting is not available for all build infrastructures, as it is not applicable to those build infrastructures.

#### Which user does Harness uses to run steps like Git clone, Run, and so on?

Harness uses user 1000 by default.

#### What is the default user set on the windows lite-engine and addon image?

The default user set on the windows lite-engine and addon image is `ContainerAdministrator`

#### Can the default user in Windows LE/Addon images be changed?

No, the default user in Windows LE/Addon images needs to be `ContainerAdministrator` because specific path and tool installations require it, and Windows does not allow setting the path otherwise.

#### How does `ContainerAdministrator` differ from other user identities in Windows LE/Addon images?

`ContainerAdministrator` is assigned elevated privileges similar to the root user on Linux, allowing for system-level configurations and installations within the Windows container

#### Why is the execution failing with the error `Error: container has runAsNonRoot and image has non-numeric user (harness), cannot verify user is non-root`, when we enable "Run as Non-Root"?

This happens when you enable the option "Run as Non-Root" but not configured the default USRID. When we enable the option "Run as Non-Root", we need to configure a default user ID for all step containers in the Run as User field.

#### What is the default user ID assigned to a step container?

By default, the step containers will be running with USERID 1000 and this can be configured in the step's optional configuration

## Performance and build time

#### How can we improve the build process duration apart from cache layer?

You can increase the Memory and CPU of the Build and Push step to improve the build process duration.

#### Is there any best practices to follow while implementing the pipeline for build time?

Yes, you can refer to our [documentation](https://developer.harness.io/docs/continuous-integration/use-ci/optimize-and-more/optimizing-ci-build-times/#optimize-docker-images) to optimize and enhance the build process.

#### How can I reduce the time spent on downloading dependencies during CI builds?

You can pre-build Docker images that include all required dependencies and periodically update these images with the latest dependencies. This approach minimizes download time during the build process.

#### What are the benefits of excluding unnecessary files and packages from Docker images?

Excluding unnecessary files and packages not only reduces build times but also results in smaller, more efficient, and portable Docker images.

### Harness Platform rate limits

For stability, Harness applies limits to prevent excessive API usage. Harness reserves the right to change these limits at any time. For more information, go to [Platform rate limits](https://developer.harness.io/docs/platform/rate-limits/).

### Running concurrent builds shows "queued license limit reached"

Queued license limit reached means that your account has reached the maximum build concurrency limit. The concurrency limit is the number of builds that can run at the same time. Any builds triggered after hitting the concurrency limit either fail or are queued.

If you frequently run many concurrent builds, consider enabling [Queue Intelligence](https://developer.harness.io/docs/continuous-integration/use-ci/optimize-and-more/queue-intelligence) for Harness CI, which queues additional builds rather than failing them.

## Maven

#### How can I retrieve the Maven project version from the pom.xml file and pass it to the subsequent Docker build step as the build argument?

You could assign the version value to a variable in a run step with a command something similar to `version=$(cat pom.xml | grep -oP '(?<=<version>)[^<]+')` and then this variable can be configured as the output variable in the run step. In the subsequent build step you could use this output variable from the previous run step as the build argument using an expression similar to `<+pipeline.stages.test.spec.execution.steps.Run_2.output.outputVariables.version>` (In this example, stage name=test, step name=Run_2 and the output variable name is version)

#### Where to store mvn project settings.xml in harness ci

You can add this settings.xml as a secret file in Harness and then configure a shell script so that this file goes to the desired directory in the build.

[Override secrets in settings.xml at runtime](https://developer.harness.io/docs/continuous-integration/use-ci/run-tests/modify-and-override-build-settings-before-a-build)

To share it between stages, use `sharedpath`.

[Share CI data across steps and stages](https://developer.harness.io/docs/continuous-integration/use-ci/caching-ci-data/share-ci-data-across-steps-and-stages)

#### How to store mvn project settings.xml in Harness CI?

You can achieve this by storing the XML as a secret and referring to it within a step. For example:
`echo '<+secrets.getValue("account.[settingsXMLSecretID]")>' > settings.xml`

## Gradle

#### How can user enable the Gradle Daemon in builds?

To enable the Gradle Daemon in your Harness CI builds, you can include the `--daemon` option when running Gradle commands in your build scripts. This option instructs Gradle to use the daemon process.
