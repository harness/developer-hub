---
title: Continuous Integration (CI) FAQs
description: This article addresses some frequently asked questions about Harness Continuous Integration (CI).
sidebar_position: 2
---

## Can I use Harness CI for mobile app development?

Yes. [Harness CI offers many options for mobile app development.](https://developer.harness.io/docs/continuous-integration/use-ci/mobile-dev-with-ci)

## I have a MacOS build, do I have to use homebrew as the installer?

No. Your build infrastructure can be configured to use whichever tools you like. For example, Harness Cloud build infrastructure includes p-reinstalled versions of xcode and other tools, and you can install other tools or versions of tools that you prefer to use. For more information, go to the [CI macOS and iOS guide](https://developer.harness.io/tutorials/ci-pipelines/build/ios).

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

### Can I run builds locally? Can I run builds directly on my computer?

Yes. For instructions, go to [Set up a local runner build infrastructure](https://developer.harness.io/docs/continuous-integration/use-ci/set-up-build-infrastructure/define-a-docker-build-infrastructure).

### Can I use the same build VM for multiple CI stages?

No. The build VM terminates at the end of the stage and a new VM is used for the next stage.

### Why are build VMs running when there are no active builds?

With [self-hosted VM build infrastructure](https://developer.harness.io/docs/category/set-up-vm-build-infrastructures), the `pool` value in your `pool.yml` specifies the number of "warm" VMs. These VMs are kept in a ready state so they can pick up build requests immediately.

If there are no warm VMs available, the runner can launch additional VMs up to the `limit` in your `pool.yml`.

If you don't want any VMs to sit in a ready state, set your `pool` to `0`. Note that having no ready VMs can increase build time.

For AWS VMs, you can set `hibernate` in your `pool.yml` to hibernate warm VMs when there are no active builds. For more information, go to [Configure the Drone pool on the AWS VM](https://developer.harness.io/docs/continuous-integration/use-ci/set-up-build-infrastructure/vm-build-infrastructure/set-up-an-aws-vm-build-infrastructure#configure-the-drone-pool-on-the-aws-vm).

### Do I need to install Docker on the VM that runs the Harness Delegate and Runner?

Yes. Docker is required for [self-hosted VM build infrastructure](https://developer.harness.io/docs/category/set-up-vm-build-infrastructures).

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

Yes. With a Kubernetes cluster build infrastructure, you can make the certs available to the delegate pod, and then set `DESTINATION_CA_PATH`. For `DESTINATION_CA_PATH`, provide a list of paths in the build pod where you want the certs to be mounted, and mount your certificate files to `opt/harness-delegate/ca-bundle`. For more information, go to [Configure a Kubernetes build farm to use self-signed certificates](https://developer.harness.io/docs/continuous-integration/use-ci/set-up-build-infrastructure/k8s-build-infrastructure/configure-a-kubernetes-build-farm-to-use-self-signed-certificates).

### Can I use self-signed certs with local runner build infrastructure?

With a local runner build infrastructure, you can use `CI_MOUNT_VOLUMES` to use self-signed certificates. For more information, go to [Set up a local runner build infrastructure](https://developer.harness.io/docs/continuous-integration/use-ci/set-up-build-infrastructure/define-a-docker-build-infrastructure).

### How do I make internal CA certs available to the delegate pod?

There are multiple ways you can do this:

* Build the delegate image with the certs baked into it, if you are custom building the delegate image.
* Create a secret/configmap with the certs data, and then mount it on the delegate pod.
* Run commands in the `INIT_SCRIPT` to download the certs while the delegate launches and make them available to the delegate pod file system.

### Where should I mount internal CA certs on the build pod?

The usage of the mounted CA certificates depends on the specific container image used for the step. The default certificate location depends on the base image you use. The location where the certs need to be mounted depends on the container image being used for the steps that you intend to run on the build pod.

## Windows builds

### Error when running Docker commands on Windows build servers

Make sure that the build server has the [Windows Subsystem for Linux](https://learn.microsoft.com/en-us/windows/wsl/about) installed. This error can occur if the container can't start on the build system.

### Is rootless configuration supported for builds on Windows-based build infrastructures?

No, currently this is not supported for Windows builds.

### What is the default user set on the Windows Lite-Engine and Addon image?

The default user for these images is `ContainerAdministrator`.

### Can I change the default user in the Windows LE/Addon images?

No. The default user for these images must be `ContainerAdministrator` because specific path and tool installations require it, and Windows doesn't allow setting the path otherwise.

### How does `ContainerAdministrator` differ from other user identities in the Windows LE/Addon images?

`ContainerAdministrator` is assigned elevated privileges similar to the root user on Linux, allowing for system-level configurations and installations within the Windows container.

### Can I use custom cache paths on a Windows platform with Cache Intelligence?

Yes, you can use [custom cache paths](https://developer.harness.io/docs/continuous-integration/use-ci/caching-ci-data/cache-intelligence#customize-cache-paths) with Cache Intelligence on Windows platforms.

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

## Default user, root access, and run as non-root

### Which user does Harness use to run steps like Git Clone, Run, and so on? What is the default user ID for step containers?

Harness uses user `1000` by default. You can use a step's **Run as User** setting to use a different user for a specific step.

### Can I enable root access for a single step?

If your build runs as non-root (meaning you have set `runAsNonRoot: true` in your build infrastructure settings), you can run a specific step as root by setting **Run as User** to `0` in the step's settings. This setting uses the root user for this specific step while preserving the non-root user configuration for the rest of the build. This setting is not available for all build infrastructures, as it is not applicable to all build infrastructures.

### When I try to run as non-root, the build fails with "container has runAsNonRoot and image has non-numeric user (harness), cannot verify user is non-root"

This error occurs if you enable **Run as Non-Root** without configuring the default user ID in **Run as User**. For more information, go to [CI Build stage settings - Run as non-root or a specific user](https://developer.harness.io/docs/continuous-integration/use-ci/set-up-build-infrastructure/ci-stage-settings#run-as-non-root-or-a-specific-user).

## Codebases

### What is a codebase in a Harness pipeline?

The codebase is the Git repository where your code is stored. Pipelines usually have one [primary or default codebase](https://developer.harness.io/docs/continuous-integration/use-ci/codebase-configuration/create-and-configure-a-codebase#configure-the-default-codebase). If you need files from multiple repos, you can [clone additional repos](https://developer.harness.io/docs/continuous-integration/use-ci/codebase-configuration/clone-and-process-multiple-codebases-in-the-same-pipeline).

### How do I connect my code repo to my Harness pipeline?

For instructions on configuring your pipeline's codebase, go to [Configure codebase](https://developer.harness.io/docs/continuous-integration/use-ci/codebase-configuration/create-and-configure-a-codebase).

### Can I skip the built-in clone codebase step in my CI pipeline?

Yes, you can disable the built-in clone codebase step for any Build stage. For instructions, go to [Disable Clone Codebase for specific stages](https://developer.harness.io/docs/continuous-integration/use-ci/codebase-configuration/create-and-configure-a-codebase#disable-clone-codebase-for-specific-stages).

### Can I configure a failure strategy for a built-in clone codebase step?

No, you can't configure a [failure strategy](https://developer.harness.io/docs/platform/pipelines/define-a-failure-strategy-on-stages-and-steps) for the built-in clone codebase step. If you have concerns about clone failures, you can [disable Clone Codebase](https://developer.harness.io/docs/continuous-integration/use-ci/codebase-configuration/create-and-configure-a-codebase#disable-clone-codebase-for-specific-stages), and then add a [Git Clone step](https://developer.harness.io/docs/continuous-integration/use-ci/codebase-configuration/clone-and-process-multiple-codebases-in-the-same-pipeline#add-a-git-clone-or-run-step) with a [step failure strategy](https://developer.harness.io/docs/platform/pipelines/define-a-failure-strategy-on-stages-and-steps#add-a-step-failure-strategy) at the beginning of each stage where you need to clone your codebase.

### Can I recursively clone a repo?

Currently, the built-in clone codebase step doesn't support recursive cloning. However, you can [disable Clone Codebase](https://developer.harness.io/docs/continuous-integration/use-ci/codebase-configuration/create-and-configure-a-codebase#disable-clone-codebase-for-specific-stages), and then add a [Run step](https://developer.harness.io/docs/continuous-integration/use-ci/run-ci-scripts/run-step-settings) with `git clone --recursive`. This is similar to the process you would follow to [clone a subdirectory instead of the entire repo](https://developer.harness.io/docs/continuous-integration/use-ci/codebase-configuration/clone-subdirectory).

If you want to recursively clone a repo in addition to your default codebase, you can [pull the Git credentials from your code repo connector to use in your Run step](./articles/Using_Git_Credentials_from_Codebase_Connector_in_CI_Pipelines_Run_Step.md).

### Can I clone a specific subdirectory rather than an entire repo?

Yes. For instructions, go to [Clone a subdirectory](https://developer.harness.io/docs/continuous-integration/use-ci/codebase-configuration/clone-subdirectory).

### Can I clone the default codebase to a different folder than the root?

The built-in clone codebase step always clones your repo to the root of the workspace, `/harness`. If you need to clone elsewhere, you can [disable Clone Codebase](https://developer.harness.io/docs/continuous-integration/use-ci/codebase-configuration/create-and-configure-a-codebase#disable-clone-codebase-for-specific-stages) and use a [Git Clone or Run step](https://developer.harness.io/docs/continuous-integration/use-ci/codebase-configuration/clone-and-process-multiple-codebases-in-the-same-pipeline#add-a-git-clone-or-run-step) to clone your codebase to a specific subdirectory.

### What is the default clone depth setting for CI builds?

The built-in clone codebase step has the following depth settings:

* For manual builds, the default depth is `50`.
* For webhook or cron triggers, the default depth is `0`.

For more information, go to [Configure codebase - Depth](https://developer.harness.io/docs/continuous-integration/use-ci/codebase-configuration/create-and-configure-a-codebase#depth).

### Can I change the depth of the built-in clone codebase step?

Yes. Use the [Depth](https://developer.harness.io/docs/continuous-integration/use-ci/codebase-configuration/create-and-configure-a-codebase#depth) setting to do this.

### How can I reduce clone codebase time?

There are several strategies you can use to improve codebase clone time:

* Depending on your build infrastructure, you can set [Limit Memory](https://developer.harness.io/docs/continuous-integration/use-ci/codebase-configuration/create-and-configure-a-codebase#set-container-resources) to 1Gi in your codebase configuration.
* For builds triggered by PRs, set the [Pull Request Clone Strategy](https://developer.harness.io/docs/continuous-integration/use-ci/codebase-configuration/create-and-configure-a-codebase#pull-request-clone-strategy) to **Source Branch** and set [Depth](https://developer.harness.io/docs/continuous-integration/use-ci/codebase-configuration/create-and-configure-a-codebase#depth) to `1`.
* If you don't need the entire repo contents for your build, you can disable the built-in clone codebase step and use a Run step to execute specific git clone arguments, as explained in [Clone a subdirectory](https://developer.harness.io/docs/continuous-integration/use-ci/codebase-configuration/clone-subdirectory).

### What codebase environment variables are available to use in triggers, commands, output variables, or otherwise?

For a list of `<+codebase.*>` and similar expressions you can use in your build triggers and otherwise, go to the [CI codebase variables reference](https://developer.harness.io/docs/continuous-integration/use-ci/codebase-configuration/built-in-cie-codebase-variables-referencee).

### How do I configure the Git Clone step? What is the Clone Directory setting?

For details about Git Clone step settings, go to:

* [Git Clone step - Depth](https://developer.harness.io/docs/continuous-integration/use-ci/codebase-configuration/clone-and-process-multiple-codebases-in-the-same-pipeline#depth)
* [Git Clone step - Clone Directory](https://developer.harness.io/docs/continuous-integration/use-ci/codebase-configuration/clone-and-process-multiple-codebases-in-the-same-pipeline#clone-directory)
* [All Git Clone step settings](https://developer.harness.io/docs/continuous-integration/use-ci/codebase-configuration/clone-and-process-multiple-codebases-in-the-same-pipeline#add-a-git-clone-or-run-step)

### Does Harness CI support Git Large File Storage?

Yes. For more information, go to the Harness CI documentation on [Git Large File Storage](https://developer.harness.io/docs/continuous-integration/use-ci/codebase-configuration/gitlfs).

### Can I run git commands in a CI Run step?

Yes. You can run any commands in a Run step. With respect to Git, for example, you can use a Run step to [clone multiple code repos in one pipeline](https://developer.harness.io/docs/continuous-integration/use-ci/codebase-configuration/clone-and-process-multiple-codebases-in-the-same-pipeline), [clone a subdirectory](https://developer.harness.io/docs/continuous-integration/use-ci/codebase-configuration/clone-subdirectory), or use [Git LFS](https://developer.harness.io/docs/continuous-integration/use-ci/codebase-configuration/gitlfs).

### What expression can I use to get the repository name and the project/organization name for a trigger?

You can use the expressions `<+eventPayload.repository.name>` or `<+trigger.payload.repository.name>` to reference the repository name from the incoming trigger payload.

If you want both the repo and project name, and your Git provider's webhook payload doesn't include a single payload value with both names, you can concatenate two expressions together, such as `<+trigger.payload.repository.project.key>/<+trigger.payload.repository.name>`.

### The expression `<+eventPayload.repository.name>` causes the clone step to fail when used with a Bitbucket account connector.

Try using the expression `<+trigger.payload.repository.name>` instead.

## SCM status updates and PR checks

### Does Harness supports Pull Request status updates?

Yes. Your PRs can use the build status as a PR status check. For more information, go to [SCM status checks](https://developer.harness.io/docs/continuous-integration/use-ci/codebase-configuration/scm-status-checks).

### How do I configure my pipelines to send PR build validations?

Harness uses the pipeline's codebase connector to send status updates to PRs in your Git provider. To get status updates in your PRs, you must:

1. [Configure a default codebase for your pipeline.](https://developer.harness.io/docs/continuous-integration/use-ci/codebase-configuration/create-and-configure-a-codebase#configure-the-default-codebase)
2. Make sure you enable API access in your [code repo connector](https://developer.harness.io/docs/continuous-integration/use-ci/codebase-configuration/create-and-configure-a-codebase#code-repo-connectors) settings.
3. Run PR builds. Branch and tag builds don't send PR status updates. You can use [webhook triggers](https://developer.harness.io/docs/platform/triggers/triggering-pipelines) to automatically run builds when PRs are created or updated.

### Can I use the Git Clone step, instead of the built-in clone codebase step, to get build statues on my PRs?

No. You must use the built-in clone codebase step (meaning, you must [configure a default codebase](https://developer.harness.io/docs/continuous-integration/use-ci/codebase-configuration/create-and-configure-a-codebase#configure-the-default-codebase)) to get [pipeline links in PRs](https://developer.harness.io/docs/continuous-integration/use-ci/codebase-configuration/scm-status-checks#pipeline-links-in-prs).

### Can I export a failed step's output to a pull request comment?

To do this, you could:

1. Modify the failed step's command to save output to a file, such as `your_command 2>&1 | tee output_file.log`.
2. After the failed step, add a Run step that reads the file's content and uses your Git provider's API to export the file's contents to a pull request comment.
3. Configure the subsequent step's [conditional execution settings](https://developer.harness.io/docs/platform/pipelines/w_pipeline-steps-reference/step-skip-condition-settings) to **Always execute this step**.

### Build statuses don't show on my PRs, even though the code base connector's token has all repo permissions.

If the user account used to generate the token doesn't have repository write permissions, the resulting token won't have sufficient permissions to post the build status update to the PR. Specific permissions vary by connector. For example, [GitHub connector credentials](https://developer.harness.io/docs/platform/connectors/code-repositories/ref-source-repo-provider/git-hub-connector-settings-reference#credentials-settings) require that personal access tokens have all `repo`, `user`, and `admin:repo_hook` scopes, and the user account used to generate the token must have admin permissions on the repo.

For repos under organizations or projects, check the role/permissions assigned to the user in the target repository. For example, a user in a GitHub organization can have some permissions at the organization level, but they might not have those permissions at the individual repository level.

### Does my pipeline have to have a Build stage to get the build status on the PR?

Yes, the build status is updated on a PR only if a Build (CI) stage runs.

### My pipeline has multiple Build stages. Is the build status updated for each stage or for the entire pipeline?

The build status on the PR is updated for each individual Build stage.

### My pipeline has multiple Build stages, and I disabled Clone Codebase for some of them. Why is the PR status being updated for the stages that don't clone my codebase?

Currently, Harness CI updates the build status on a PR even if you [disabled Clone Codebase](https://developer.harness.io/docs/continuous-integration/use-ci/codebase-configuration/create-and-configure-a-codebase#disable-clone-codebase-for-specific-stages) for a specific build stage. We are investigating enhancements that could change this behavior.

### Is there any character limit for the PR build status message?

Yes. For GitHub, the limit is 140 characters. If the message is too long, the request fails with `description is too long (maximum is 140 characters)`.

### What identifiers are included in the PR build status message?

The pipeline identifier and stage identifier are included in the build status message.

### I don't want to send build statuses to my PRs.

Because the build status updates operate through the default codebase connector, the easiest way to prevent sending PR status updates would be to [disable Clone Codebase](https://developer.harness.io/docs/continuous-integration/use-ci/codebase-configuration/create-and-configure-a-codebase#disable-clone-codebase-for-specific-stages) for all Build stages in your pipeline, and then use a [Git Clone or Run step](https://developer.harness.io/docs/continuous-integration/use-ci/codebase-configuration/clone-and-process-multiple-codebases-in-the-same-pipeline#add-a-git-clone-or-run-step) to clone your codebase.

You could try modifying the permissions of the code repo connector's token so that it can't write to the repo, but this could interfere with other connector functionality.

Removing API access from the connector is not recommended because API access is required for other connector functions, such as cloning the codebase.

### What is the format of the content in the PR build status message?

The PR build status message format is `PIPELINE_IDENTIFIER-STAGE_IDENTIFIER — Execution status of Pipeline - PIPELINE_IDENTIFIER (EXECUTION_ID) Stage - STAGE_IDENTIFIER was STATUS`

### Why was the PR build status not updated for Approval stage?

Build status updates occur for Build stages only.

## Pipeline initialization and Harness CI images

### Initialize step to fails with a "Null value" error

This can occur if an expression or variable is called before it's value is resolved. In Build (CI) stages, steps run in separate containers/build pods, and you can only [use expressions after they are resolved](https://developer.harness.io/docs/platform/variables-and-expressions/harness-variables#only-use-expressions-after-they-can-be-resolved). For example, if you use an expression for an output variable from a step in a [repeat looping strategy](https://developer.harness.io/docs/platform/pipelines/looping-strategies/looping-strategies-matrix-repeat-and-parallelism#repeat-strategies) in step that runs before the repeat loop completes, then the expression's value isn't available to the step that requested it.

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

### How can I improve build time, aside from caching?

You can increase the Memory and CPU of the Build and Push step to improve the build process duration.

### Where does the pipeline get code for a build?

The codebase declared in the first stage of a pipeline becomes the pipeline's [default codebase](https://developer.harness.io/docs/continuous-integration/use-ci/codebase-configuration/create-and-configure-a-codebase#configure-the-default-codebase). If your build requires files from multiple repos, you can [clone additional repos](https://developer.harness.io/docs/continuous-integration/use-ci/codebase-configuration/clone-and-process-multiple-codebases-in-the-same-pipeline).

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

## Gradle

#### How can user enable the Gradle Daemon in builds?

To enable the Gradle Daemon in your Harness CI builds, you can include the `--daemon` option when running Gradle commands in your build scripts. This option instructs Gradle to use the daemon process.

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

#### Why am I unable to connect to the hostname using the step identifier in a background step, resulting in the error "Unknown server host xxxx"?

The utilization of Step Id is restricted to VM flows exclusively. To address this issue, consider using `localhost` or `127.0.0.1` instead.

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

### Run a step only run if a certain file, like a .toml configuration file, changes in my repo

To run a step only when a certain file changes, you can configure a [conditional execution](https://developer.harness.io/docs/platform/pipelines/w_pipeline-steps-reference/step-skip-condition-settings/#step-conditions) based on a JEXL condition that evaluates to true for the specific file. For example, you might use a [payload expression](https://developer.harness.io/docs/platform/variables-and-expressions/harness-variables/#git-trigger-and-payload-expressions) to get details from a Git event payload, such as a PR event that triggers a build.

Alternately, you could isolate the step in a stage by itself, configure a [Git webhook trigger](https://developer.harness.io/docs/platform/triggers/triggering-pipelines) with a Changed File [trigger condition](https://developer.harness.io/docs/platform/triggers/triggering-pipelines#set-trigger-conditions) that listens for changes to the target file, and then configure the trigger to run [selective stage execution](https://developer.harness.io/docs/platform/triggers/selective-stage-execution-using-triggers) and run all stages that you want to run when that file changes, including the stage with your isolated step.

### Can I assert an environment variable within a JEXL conditions?

While we support output variables that can point to an environment variable, we do not support the direct referencing of environment variables in JEXL conditions, even when using the feature flag `CI_OUTPUT_VARIABLES_AS_ENV` (which automatically makes environment variables available for other steps in the same build stage).

The conditions in JEXL only allow the use of variable expressions that can be resolved before the stage is executed. Since environment variables are resolved during runtime, it is not possible to utilize variable expressions that cannot be resolved until the stage is run.

### What does a failure strategy consist of?

[Failure strategies](https://developer.harness.io/docs/platform/pipelines/define-a-failure-strategy-on-stages-and-steps) include error conditions that trigger the failure and actions to take when the specified failure occurs.

### Can I make a step, stage, or pipeline fail based on the percentage of test cases that fail or succeed?

Currently, Harness can't fail a step/stage/pipeline based on a percentage of test results. To achieve this, you would need to manually parse the test results (which are created after the test step execution) and export some variables containing the percentages you want to track. You could then have a step throw an error code based on the variable values to trigger a [failure strategy](https://developer.harness.io/docs/platform/pipelines/define-a-failure-strategy-on-stages-and-steps), or you could manually review the outputs and manually [mark the stage as failed](https://developer.harness.io/docs/platform/pipelines/mark-as-failed).

Due to potential subjectivity of test results, it would probably be better to handle this case with an [Approval stage or step](https://developer.harness.io/tutorials/cd-pipelines/approvals/) where the approver [reviews the test results](https://developer.harness.io/docs/continuous-integration/use-ci/run-tests/viewing-tests).

### Can I abort a pipeline if the referenced branch is deleted?

This is not natively supported; however you could create a [Git webhook trigger](https://developer.harness.io/docs/platform/triggers/triggering-pipelines) that listens for a specific delete event with [auto-abort previous execution](https://developer.harness.io/docs/platform/triggers/triggers-reference/#auto-abort-previous-execution). This trigger would only go off on the specified delete event and, therefore, it would only cancel the ongoing executions if the delete event occurred.

### Is there a way to abort a running pipeline from a step in that pipeline?

You can use the [putHandleInterrupt API](https://apidocs.harness.io/tag/Pipeline-Execute/#operation/putHandleInterrupt) to abort a running pipeline from a step in the pipeline.

### Can I add notifications, such as failure notifications, to stage templates?

While notifications are a pipeline-level setting that is not explicitly available at the stage level, you can use Plugin steps to add notifications in your stage templates. Configure the Plugin step to use a [use a Drone plugin](https://developer.harness.io/docs/continuous-integration/use-ci/use-drone-plugins/run-a-drone-plugin-in-ci) or a [custom plugin](https://developer.harness.io/docs/continuous-integration/use-ci/use-drone-plugins/custom_plugins) to send an [email notification](https://developer.harness.io/docs/continuous-integration/use-ci/use-drone-plugins/drone-email-plugin), [Slack notification](https://plugins.drone.io/plugins/slack), or otherwise.

## Logs and execution history

### Does Harness limit log line length?

Yes, there is a single-line limit of 25KB. If an individual line exceeds this limit, it is truncated and ends with `(log line truncated)`. Furthermore, there is an overall log limit of 5MB per step. Harness truncates logs larger than 5MB.

If you need to extract long log lines or logs larger than 5MB, include a Run step in your pipeline that writes the logs to a file and uploads the file as an artifact. For more information, go to [Troubleshoot CI - Truncated execution logs](https://developer.harness.io/docs/continuous-integration/troubleshoot-ci/troubleshooting-ci#truncated-execution-logs).

### Step succeeds even when explicitly executing exit 1 in a Bash script that is runs in script's background

The step in Harness determines its status based on the exit status received from the primary script execution. When you call a function in the background of a script, it doesn't directly impact the exit status of the main script. Therefore, if you manually call exit 1 within a background function, it won't cause the step to fail. This behavior is consistent with how scripts operate both inside and outside of Harness.

### Can I get logs for a service running on Harness Cloud when a specific Run step is executing?

Yes. To do this, you can add a step that runs in parallel step to the Run step, and have that parallel step get the service's logs while the build runs. For an example, go to [Resource allocation - Use a parallel step to monitor failures](https://developer.harness.io/docs/continuous-integration/use-ci/set-up-build-infrastructure/resource-limits#use-a-parallel-step-to-monitor-failures).

### Builds older than 30 days aren't on the Project Overview page.

The default timescale setting for the overview page is 30 days. You can change this setting.

### A previous execution is missing from my Builds dashboard.

First, check the timescale setting on the dashboard. The default is 30 days, which hides builds older than 30 days. 

Then, make sure you are in the correct project and that you have permission to view that particular pipeline.

Finally, if your build is older than six months, it is outside the data retention window. For more information, go to [data retention](https://developer.harness.io/docs/platform/references/data-retention/).

### Can I compare pipeline changes between builds?

Yes. Go to [view and compare pipeline executions](https://developer.harness.io/docs/platform/pipelines/view-and-compare-pipeline-executions/).

## Debug mode

### Why does the debug mode SSH session close after some time?

Sessions automatically terminate after one hour or at the step timeout limit, whichever occurs first.

### Why can't I launch a remote debug session? Can I debug a pipeline that doesn't have an obvious failure?

There are several [debug mode requirements](https://developer.harness.io/docs/continuous-integration/troubleshoot-ci/debug-mode#debug-mode-requirements), namely that the pipeline must have a failed step in order to generate the debug session details. If your build doesn't have any failed steps, you won't be able to access a remote debug session. However, you can force a build to fail if you need to troubleshoot pipelines that appear to build successfully but still need remote troubleshooting. To do this, add a Run step with the command exit 1. This forces the build to fail so you can re-run it in debug mode.

### Re-run in debug mode isn't available for a new pipeline

Debug mode is not available for a pipeline's first build. Run the pipeline again and, if it meets the [debug mode requirements](https://developer.harness.io/docs/continuous-integration/troubleshoot-ci/debug-mode#debug-mode-requirements), you should be able to trigger re-run in debug mode.

## CI with CD

### Why did the CI stage still go through despite setting a freeze window?

[Freeze windows only apply to CD stages.](https://developer.harness.io/docs/continuous-delivery/manage-deployments/deployment-freeze/#freeze-windows-only-apply-to-cd-stages)

### Can I use the expression \<+codebase.commitSha> in a CD stage to get the commit ID?

Yes, you can use `<+codebase.commitSha>` to get the commit ID if the CD stage is after the Build (CI) stage in your pipeline.

This expression doesn't work if there is no CI stage in your pipeline, or if the CD stage runs before the CI stage.

Additionally, including a clone step in your CD stage won't populate the `<+codebase.commitSha>` expression. This expression is dependent on the CI stage's built-in clone codebase step.

### Can I reference a secret type output variable exported from a CD or custom stage in CI stage?

No. Currently CI stages don't support secret type output variables from CD or custom stages.

### Can I trigger a Build stage with an artifact trigger?

While it is possible to [trigger deployments with artifact triggers](https://developer.harness.io/docs/platform/triggers/trigger-on-a-new-artifact/), there are currently no CI-specific triggers for artifacts.

## Performance and build time

### What are the best practices to improve build time?

For information about making your pipelines faster and more efficient, go to [Optimize and enhance CI pipelines](https://developer.harness.io/docs/continuous-integration/use-ci/optimize-and-more/optimizing-ci-build-times).

### How do I reduce the time spent downloading dependencies for CI builds?

You can create pre-built Docker images that have all required dependencies, and then periodically update these images with the latest dependencies. This approach minimizes dependency download time during the build process by packaging your dependencies into one image. Harness offers [pre-build public images](https://developer.harness.io/docs/continuous-integration/use-ci/set-up-build-infrastructure/public-docker-images) that contain common and useful tools for CI pipelines.

### What are the benefits of excluding unnecessary files and packages from Docker images?

Excluding unnecessary files and packages reduces build times and creates in smaller, more efficient, and more portable Docker images.

### How can Harness input sets help automate a CI pipeline?

[Input sets](https://developer.harness.io/docs/platform/pipelines/input-sets/) are collections of runtime inputs for a pipeline executions. With input sets, you can use the same pipeline for multiple scenarios. You can define each scenario in an input set or overlay, and then select the appropriate scenario when you execute the pipeline.

### Harness Platform rate limits

For stability, Harness applies limits to prevent excessive API usage. Harness reserves the right to change these limits at any time. For more information, go to [Platform rate limits](https://developer.harness.io/docs/platform/rate-limits/).

### Running concurrent builds shows "queued license limit reached"

Queued license limit reached means that your account has reached the maximum build concurrency limit. The concurrency limit is the number of builds that can run at the same time. Any builds triggered after hitting the concurrency limit either fail or are queued.

If you frequently run many concurrent builds, consider enabling [Queue Intelligence](https://developer.harness.io/docs/continuous-integration/use-ci/optimize-and-more/queue-intelligence) for Harness CI, which queues additional builds rather than failing them.
