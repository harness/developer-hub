---
title: Continuous Integration (CI) FAQs
description: This article addresses some frequently asked questions about Harness Continuous Integration (CI).
sidebar_position: 2
redirect_from:
  - /docs/faqs/continuous-integration-ci-faqs
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

### Does gsutil work with Harness Cloud?

No, gsutil is deprecated and can't be used with Harness Cloud. Please use gcloud-equivalent commands instead, such as `gcloud storage cp` instead of `gsutil cp`.

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

### How can you execute Docker commands in a CI pipeline that runs on a Kubernetes cluster that lacks a Docker runtime?

You can run Docker-in-Docker (DinD) as a service with the `sharedPaths` set to `/var/run`. Following that, the steps can be executed as Docker commands. This works regardless of the Kubernetes container runtime.

The DinD service does not connect to the Kubernetes node daemon. It launches a new Docker daemon on the pod, and then other containers use that Docker daemon to run their commands.

For details, go to [Run Docker-in-Docker in a Build stage](/docs/continuous-integration/use-ci/run-ci-scripts/run-docker-in-docker-in-a-ci-stage.md).

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

### What permissions are required to run CI builds in an OpenShift cluster?

For information about building on OpenShift clusters, go to **Permissions Required** and **OpenShift Support** in the [Kubernetes Cluster Connector Settings Reference](https://developer.harness.io/docs/platform/connectors/cloud-providers/ref-cloud-providers/kubernetes-cluster-connector-settings-reference).

### What are the minimum permissions required for the service account role for a Kubernetes Cluster connector?

For information about permissions required to build on Kubernetes clusters, go to **Permissions Required** in the [Kubernetes Cluster Connector Settings Reference](https://developer.harness.io/docs/platform/connectors/cloud-providers/ref-cloud-providers/kubernetes-cluster-connector-settings-reference).

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

### What permissions are required for GitHub Personal Access Tokens in Harness GitHub connectors?

For information about configuring GitHub connectors, including required permissions for personal access tokens, go to the [GitHub connector settings reference](/docs/platform/connectors/code-repositories/ref-source-repo-provider/git-hub-connector-settings-reference).

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

### How can I share the codebase configuration between stages in a CI pipeline?

The pipeline's [default codebase](https://developer.harness.io/docs/continuous-integration/use-ci/codebase-configuration/create-and-configure-a-codebase) is automatically available to each subsequent Build stage in the pipeline. When you add additional Build stages to a pipeline, **Clone Codebase** is enabled by default, which means the stage clones the default codebase declared in the first Build stage.

If you don't want a stage to clone the default codebase, you can [disable Clone Codebase for specific stages](https://developer.harness.io/docs/continuous-integration/use-ci/codebase-configuration/create-and-configure-a-codebase#disable-clone-codebase-for-specific-stages).

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

### Initialize step occasionally times out at 8 minutes

Eight minutes is the default time out limit for the Initialize step. If your build is hitting the timeout limit due to resource constraints, such as pulling large images, you can increase the [Init Timeout](https://developer.harness.io/docs/continuous-integration/use-ci/set-up-build-infrastructure/ci-stage-settings#init-timeout) in the stage Infrastructure settings.

### When a pipeline pulls artifacts or images, are they stored on the delegate?

Artifacts and images are pulled into the [stage workspace](https://developer.harness.io/docs/continuous-integration/use-ci/prep-ci-pipeline-components#shared-paths), which is a temporary volume that exists during stage execution. Images are not stored on the delegate during pipeline execution. In a Kubernetes cluster build infrastructure, build stages run on build pods that are cleaned automatically after the execution.

### Can I get a list of internal Harness-specific images that CI uses?

For information about the backend/Harness-specific images that Harness CI uses to execute builds, including how to get a list of images and tags that your builds use, go to [Harness CI images](https://developer.harness.io/docs/continuous-integration/use-ci/set-up-build-infrastructure/harness-ci).

Harness CI images are stored in the [Harness GCR project](https://console.cloud.google.com/gcr/images/gcr-prod/global/harness)

### How often are Harness CI images updated?

Harness publishes updates for all CI images on the second and fourth Monday of each month. For more information, go to [Harness CI images - Harness CI image updates](https://developer.harness.io/docs/continuous-integration/use-ci/set-up-build-infrastructure/harness-ci#harness-ci-image-updates).

### How do I get a list of tags available for an image in the Harness image registry?

To list all available tags for an image in `app.harness.io/regstry`, call the following endpoint and replace `IMAGE_NAME` with the name of the image you want to query.

```
https://app.harness.io/registry/harness/IMAGE_NAME/tags/list
```

### What access does Harness use to pull the Harness internal images from the public image repo?

By default, Harness uses anonymous access to to pull Harness images.

If you have security concerns about using anonymous access or pulling Harness-specific images from a public repo, you can [change how your builds connect to the Harness container image registry](https://developer.harness.io/docs/platform/connectors/artifact-repositories/connect-to-harness-container-image-registry-using-docker-connector/).

### Can I use my own private registry to store Harness CI images?

Yes, you can [pull Harness CI images from a private registry](https://developer.harness.io/docs/platform/connectors/artifact-repositories/connect-to-harness-container-image-registry-using-docker-connector/#pull-harness-images-from-a-private-registry).

### Build failed with "failed to pull image" or "ErrImagePull"

* **Error messages:** `ErrImagePull` or some variation of the following, which may have a different image name, tag, or registry: `Failed to pull image "artifactory.domain.com/harness/ci-addon:1.16.22": rpc error: code = Unknown desc = Error response from daemon: unknown: Not Found.`
* **Causes:**
   * Harness couldn't pull an image that is needed to run the pipeline.
   * `ErrImagePull` can be caused by networking issues or if the specified image doesn't exist in the specified repository.
   * `Failed to pull image - Not Found` means that a Harness-specific image or tag, in this case `ci-addon:1.16.22`, isn't present in the specified artifact repository, and you are using the `account.harnessImage` connector to pull Harness images. You can use this connector to pull from your own registry or to pull images from any Docker registry, but it is also used to pull Harness-required CI images. Modifying this connector can cause it to fail to pull the necessary Harness CI images.
* **Solutions:**
   * If you modified the built-in Harness Docker connector, check the connector's configuration to make sure it uses one of the compatible methods for pull Harness-required images, as described in [Connect to the Harness container image registry](https://developer.harness.io/docs/platform/connectors/artifact-repositories/connect-to-harness-container-image-registry-using-docker-connector).
   * If you are trying to pull images from your own registry, check your configuration for [pulling Harness images from a private registry](https://developer.harness.io/docs/platform/connectors/artifact-repositories/connect-to-harness-container-image-registry-using-docker-connector/#pull-harness-images-from-a-private-registry). You might need to use a different connecter than the built-in Harness Docker connector.
   * If you [modified tags for some images](https://developer.harness.io/docs/continuous-integration/use-ci/set-up-build-infrastructure/harness-ci#specify-the-harness-ci-images-used-in-your-pipelines), check that your configuration uses valid tags that are present in the repository from which Harness is attempting to pull the tags.
   * If you believe the issue is due to networking issues, try again later if you think the issue is transient, or check your connector or network configuration to make sure Harness is able to connect to the given registry.

## Build and push images

### Where does a pipeline get code for a build?

The codebase declared in the first stage of a pipeline becomes the pipeline's [default codebase](https://developer.harness.io/docs/continuous-integration/use-ci/codebase-configuration/create-and-configure-a-codebase#configure-the-default-codebase). If your build requires files from multiple repos, you can [clone additional repos](https://developer.harness.io/docs/continuous-integration/use-ci/codebase-configuration/clone-and-process-multiple-codebases-in-the-same-pipeline).

### How do I use a Harness CI pipeline to build and push artifacts and images?

For information about this go to [Build and push artifacts and images](https://developer.harness.io/docs/continuous-integration/use-ci/build-and-upload-artifacts/build-and-upload-an-artifact).

### What drives the Build and Push steps? What is Kaniko?

With Kubernetes cluster build infrastructures, Build and Push steps use [kaniko](https://github.com/GoogleContainerTools/kaniko/blob/main/README.md). Other build infrastructures use [drone-docker](https://github.com/drone-plugins/drone-docker/blob/master/README.md). Kaniko requires root access to build the Docker image.

For more information, go to:

* [Build and push artifacts and images - Kubernetes clusters require root access](https://developer.harness.io/docs/continuous-integration/use-ci/build-and-upload-artifacts/build-and-upload-an-artifact#kubernetes-cluster-build-infrastructures-require-root-access)
* [Harness CI images - Images list](https://developer.harness.io/docs/continuous-integration/use-ci/set-up-build-infrastructure/harness-ci#harness-ci-images-list)

### Does kaniko support non-root users?

With a Kubernetes cluster build infrastructure, **Build and Push** steps use the kaniko plugin. Kaniko requires root access to build Docker images, and it does not support non-root users. However, you can use the buildah plugin to [build and push with non-root users](https://developer.harness.io/docs/continuous-integration/use-ci/build-and-upload-artifacts/build-and-push-nonroot).

### Can I run Build and Push steps as root if my build infrastructure runs as non-root?

If your build infrastructure is configured to run as a non-root user (meaning you have set `runAsNonRoot: true`), you can run a specific step as root by setting **Run as User** to `0` in the step's settings. This setting uses the root user for this specific step while preserving the non-root user configuration for the rest of the build. This setting is not available for all build infrastructures, as it is not applicable to all build infrastructures.

### What if my security policy doesn't allow running as root?

If your security policy strictly forbids running any step as root, you can use the buildah plugin to [build and push with non-root users](https://developer.harness.io/docs/continuous-integration/use-ci/build-and-upload-artifacts/build-and-push-nonroot).

The buildah plugin requires that you use a Kubernetes cluster build infrastructure that is configured to run as non-root with `anyuid SCC` (Security Context Constraints) enabled. For information about the buildah plugin, go to [Build and push with non-root users](https://developer.harness.io/docs/continuous-integration/use-ci/build-and-upload-artifacts/build-and-push-nonroot).

### Can I enable BuildKit support with Build and Push steps?

The [Build and Push steps use kaniko or drone-docker](#what-drives-the-build-and-push-steps-what-is-kaniko) to build images. If you need to use BuildKit, you can't use the built-in Build and Push steps. Instead, you need to [run Docker-in-Docker in a Background step](https://developer.harness.io/docs/continuous-integration/use-ci/run-ci-scripts/run-docker-in-docker-in-a-ci-stage), and then run `docker build` and `docker push` in a Run step.

### Is there a way to use the newer version of kaniko?

Yes, you can update the tag for the kaniko image that Harness uses, as explained in [Harness CI images - Specify the Harness CI images used in your pipelines](https://developer.harness.io/docs/continuous-integration/use-ci/set-up-build-infrastructure/harness-ci#specify-the-harness-ci-images-used-in-your-pipelines).

### Does a kaniko build use images cached locally on the node? Can I enable caching for kaniko?

By default, kaniko does not use the node cache. It performs a full container image build from scratch, so it always pulls the base image. If you want kaniko to cache images and use previously-built layers that haven't changed, specify the **Remote Cache Repository** setting in the Build and Push step. If not specified, caching isn't used. Layer caching can significantly speed up the image building process.

### How can I improve build time when a Build and Push step isn't able to apply remote caching or doesn't cache effectively?

Make sure your Docker file is configured in least- to most-often changed. Make sure it installs dependencies before moving other files. Docker Layer Caching depends on the order that layers are loaded in your Dockerfile. As soon as it detects a changed layer, it reloads all subsequent layers. Therefore, may sure your Dockerfile is structured for optimum caching efficiency.

### Can I push without building?

Harness CI provides several options to [upload artifacts](https://developer.harness.io/docs/continuous-integration/use-ci/build-and-upload-artifacts/build-and-upload-an-artifact#upload-artifacts). The **Upload Artifact** steps don't include a "build" component.

### Can I build without pushing?

You can [build without pushing](https://developer.harness.io/docs/continuous-integration/use-ci/build-and-upload-artifacts/build-without-push).

### Where does the Build and Push to ECR step pull the base images specified in the Dockerfile?

By default, the [Build and Push to ECR step](https://developer.harness.io/docs/continuous-integration/use-ci/build-and-upload-artifacts/build-and-push-to-ecr-step-settings) downloads base images from the public container registry. You can use the [Base Image Connector](https://developer.harness.io/docs/continuous-integration/use-ci/build-and-upload-artifacts/build-and-push-to-ecr-step-settings#base-image-connector) setting to specify an authenticated connector to use. This can prevent rate limiting issues.

### How can I configure the Build and Push to EC" step to pull base images from a different container registry or my internal container registry?

Create a Docker connector for your desired container registry and use it in the [Base Image Connector](https://developer.harness.io/docs/continuous-integration/use-ci/build-and-upload-artifacts/build-and-push-to-ecr-step-settings#base-image-connector) setting.

### Where does the Build and Push step expect the Dockerfile to be?

The Dockerfile is assumed to be in the root folder of the codebase. You can use the **Dockerfile** setting in a Build and Push step to specify a different path to your Dockerfile.

### Can I use images from multiple Azure Container Registries (ACRs)?

Yes. Go to [Use images from multiple ACRs](./articles/using-images-from-multiple-ACRs.md).

### Is remote caching supported in Build and Push steps?

Harness supports multiple Docker layer caching methods depending on what infrastructure is used. Go to [Docker layer caching](/docs/continuous-integration/use-ci/caching-ci-data/docker-layer-caching) to learn more.

## Upload artifacts

### Can I send emails from CI pipelines?

You can [use the Drone Email plugin to send emails and attachments from CI pipelines](https://developer.harness.io/docs/continuous-integration/use-ci/use-drone-plugins/drone-email-plugin).

### What is PLUGIN_USERNAME and PLUGIN_PASSWORD used in the Upload Artifacts to JFrog Artifactory step?

These are derived from your [Artifactory connector](https://developer.harness.io/docs/continuous-integration/use-ci/build-and-upload-artifacts/upload-artifacts-to-jfrog#artifactory-connector).

### Can I run the Upload Artifacts to JFrog Artifactory step with a non-root user?

No. The jfrog commands in the [Upload Artifacts to JFrog Artifactory](https://developer.harness.io/docs/continuous-integration/use-ci/build-and-upload-artifacts/upload-artifacts-to-jfrog) step create a `.jfrog` folder at the root level of the stage workspace, which fails if you use a non-root user.

### How do I show content on the Artifacts tab?

You can use the [Artifact Metadata Publisher plugin](https://developer.harness.io/tutorials/ci-pipelines/publish/artifacts-tab) to store artifact URLs and display them on the Artifacts tab.

### Is it possible to publish custom data, such as outputs from variables or custom messages, to the Artifacts tab?

Currently, the Artifacts tab contains only links. Therefore, any content you want to make available on the Artifacts tab must be uploaded to cloud storage and then queried. You can [use the Artifacts Metadata Publisher plugin](https://developer.harness.io/tutorials/ci-pipelines/publish/artifacts-tab) for this.

You can provide one or more URLs to artifacts. For example, to reference artifacts stored in S3 buckets, you can provide the URL to the target artifact, such as `https://BUCKET.s3.REGION.amazonaws.com/TARGET/ARTIFACT_NAME_WITH_EXTENSION`. If you uploaded multiple artifacts, you can provide a list of URLs. If your S3 bucket is private, use the console view URL, such as `https://s3.console.aws.amazon.com/s3/object/BUCKET?region=REGION&prefix=TARGET/ARTIFACT_NAME_WITH_EXTENSION`.

In addition to the console view URL, you can reference privately-stored artifact by generating pre-signed URLs or temporary URLs, such as Google Cloud Storage signed URLs or AWS S3 pre-signed URLs.

### Does the Upload Artifacts to S3 step compress files before uploading them?

No. If you want to upload a compressed file, you must use a [Run step](https://developer.harness.io/docs/continuous-integration/use-ci/run-ci-scripts/run-step-settings) to compress the artifact before uploading it.

## Tests

#### Can I specify multiple paths for test reports in a Run step?

Yes, you can specify multiple paths for test reports. Ensure that the reports do not contain duplicate tests when specifying multiple paths.

### Why is the test report truncated in Tests tab?

The Tests tab truncates content if a field in your test report XML file surpasses 8,000 characters.

### Run step in a containerized step group can't publish test reports, and it throws "Unable to collect test reports" though the report path is correctly

Currently, publishing test reports from a Run step in a CD containerized step group is not supported. Try running your tests in a Build (CI) stage.

### Is the Tests tab only for Test Intelligence?

No. Test reports from tests run in Run steps also appear there if they are [correctly formatted](https://developer.harness.io/docs/continuous-integration/use-ci/run-tests/test-report-ref).

### If the Run Tests step fails, does the Post-Command script run?

No. The Post-Command script runs only if the Run Tests step succeeds.

### How do I use Test Intelligence?

For instructions, go to [Test Intelligence overview](https://developer.harness.io/docs/continuous-integration/use-ci/run-tests/test-intelligence/set-up-test-intelligence).

### Can Test Intelligence speed up my build times? What are the benefits of Test Intelligence?

Test Intelligence improves test time by running only the unit tests required to confirm the quality of the code changes that triggered a build. It can identify negative trends and help you gain insight into unit test quality. For more information, go to [Test Intelligence overview](https://developer.harness.io/docs/continuous-integration/use-ci/run-tests/test-intelligence/set-up-test-intelligence).

### What criteria does Test Intelligence use to select tests?

For information about how Test Selection selects tests, go to [Test Intelligence overview](https://developer.harness.io/docs/continuous-integration/use-ci/run-tests/test-intelligence/set-up-test-intelligence).

### Can I limit memory and CPU for Run Tests steps running on Harness Cloud?

No. Resource limits are not customizable when using Harness Cloud or self-hosted VM build infrastructures. In these cases, the step can consume the entire memory allocation of the VM.

### How can I understand the relationship between code changes and the selected tests?

On the Tests tab, the visualization call graph provides insights into why each test was selected. It visually represents the relationship between the selected tests and the specific code changes in the PR. For more information, go to [View tests - Results from Run Tests steps](https://developer.harness.io/docs/continuous-integration/use-ci/run-tests/viewing-tests#results-from-run-tests-steps-test-intelligence).

### On the Tests tab, the Test Intelligence call graph is empty and says "No call graph is created when all tests are run"

No call graph is generated if Test Intelligence selects to run all tests because the call graph would be huge and not useful (no test selection logic to demonstrate).

For information about when TI might select all tests, go to [How does Test Intelligence work?](https://developer.harness.io/docs/continuous-integration/use-ci/run-tests/test-intelligence/set-up-test-intelligence#how-does-test-intelligence-work)

## Script execution - Run steps

### Does Harness CI support script execution?

Yes. Go to [Run scripts](https://developer.harness.io/docs/category/run-scripts).

### Running a Python shell in a Run step, the expression \<+codebase.gitUser> resolves to "None"

This means the codebase variable wasn't resolved or resolved to `None`. [Codebase expression](https://developer.harness.io/docs/continuous-integration/use-ci/codebase-configuration/built-in-cie-codebase-variables-reference) values depend on the build trigger type, among other factors.

### Can I use an image that doesn't have a shell in a Run step?

The Run step requires the **Command** and **Shell** fields. Some shell must be available on the specified image to be able to run commands.

### Is a Docker image required to use the Run step on local runner build infrastructure?

Yes. Container Registry and Image are always required for Run steps on a local runner build infrastructure. For more information about when Container Registry and Image are required, go to [Use Run steps - Container Registry and Image](https://developer.harness.io/docs/continuous-integration/use-ci/run-ci-scripts/run-step-settings#container-registry-and-image).

### Is it required for a Run step's image to have Docker and Docker CLI installed?

If your step needs to execute Docker commands, then the image needs to have Docker and the Docker CLI.

### When attempting to export an output variable from a Run step using a Python shell, the step fails with "no such file or directory"

This can happen if you manually exit the Python script by calling `exit(0)`. When you declare an [output variable in a Run step](https://developer.harness.io/docs/continuous-integration/use-ci/run-ci-scripts/run-step-settings#output-variables), Harness runs some additional code at the end of your script to export the variable. If you exit the script manually in your Run step's command, then Harness can't run those additional lines of code.

## Entry point

### What does the "Failed to get image entrypoint" error indicate in a Kubernetes cluster build?

This error suggests that there is an issue accessing the entrypoint of the Docker image. It can occur in a Kubernetes cluster build infrastructure when running PostgreSQL services in Background steps.

To resolve this error, you might need to mount volumes for the PostgreSQL data in the build infrastructure's [Volumes](https://developer.harness.io/docs/continuous-integration/use-ci/set-up-build-infrastructure/ci-stage-settings#volumes) setting, and then reference those volumes in the Background step running your PostgreSQL instance. For instructions, go to [Troubleshooting: Failed to get image entry point](https://developer.harness.io/docs/continuous-integration/use-ci/manage-dependencies/multiple-postgres#troubleshooting-failed-to-get-image-entrypoint).

### Does the Harness Run step overwrite the base image container entry point?

Yes, this is the expected behavior. The entry point in the base image is overwritten so Harness can run the commands specified in the Run step.

### Why is the default entry point is not running for the container image used in the Run step?

The default entry point is overwritten by the commands you specified in the Run step's commands.

### Since the default entry point isn't executed for the container image used in the Run step, how do I start a service started in a container that would usually be started by the default entry point?

You can run the service in a [Background step](https://developer.harness.io/docs/continuous-integration/use-ci/manage-dependencies/background-step-settings), which can execute the default entry point.

### How do I run the default entry point of the image used in the Run step?

The commands specified in the Run step's commands override the default entry point. If you want to run those commands in the Run step, you nee dto include them in the Run step's commands.

## Docker in Docker

### Does CI support running Docker-in-Docker images?

Yes. For details, go to [Run Docker-in-Docker in a Build stage](https://developer.harness.io/docs/continuous-integration/use-ci/run-ci-scripts/run-docker-in-docker-in-a-ci-stage.md).

### Can I run docker-compose from Docker-in-Docker in a Background step?

Yes.

### Is privileged mode necessary for running DinD in Harness CI?

Yes, Docker-in-Docker (DinD) must run in privileged mode to function correctly.

Generally, you can use DinD on platforms that don't support privileged mode, such as platforms that run containers on Windows or fargate nodes that don't support privileged mode.

### Why is my DinD Background step failing with "Pod not supported on Fargate: invalid SecurityContext fields: Privileged"?

This error occurs because AWS Fargate doesn't support the use of privileged containers. Privileged mode is required for DinD.

## Gradle

### How do I enable the Gradle daemon in builds?

To enable the Gradle daemon in your Harness CI builds, include the `--daemon` option when running Gradle commands in your build scripts (such as in Run steps). This option instructs Gradle to use the daemon process.

Optionally, you can [use Background steps to optimize daemon performance](./articles/leverage-service-dependencies-in-gradel-daemon-to-improve-build-performance.md).

### Can I configure service dependencies in Gradle builds?

Yes, you can use [Background steps](https://developer.harness.io/docs/continuous-integration/use-ci/manage-dependencies/background-step-settings) to configure service dependencies in Gradle builds.

## Maven

### I need to get the Maven project version from pom.xml and pass it as a Docker build argument

To do this, you can:

1. Use a Run step to get the version and assign it to a variable. For example, you could use a command like:

   ```
   version=$(cat pom.xml | grep -oP '(?<=<version>)[^<]+')
   ```

2. Specify this variable as an [output variable](https://developer.harness.io/docs/continuous-integration/use-ci/run-ci-scripts/run-step-settings#output-variables) from the Run step.
3. Use an expression to [reference the output variable](https://developer.harness.io/docs/continuous-integration/use-ci/run-ci-scripts/run-step-settings/#reference-an-output-variable) in your build arguments, such as in the Build and Push to Docker step's [Build Arguments](https://developer.harness.io/docs/continuous-integration/use-ci/build-and-upload-artifacts/build-and-push-to-docker-hub-step-settings#build-arguments) or `docker build` commands executed in a Run step.

### Where do I store Maven project settings.xml in Harness CI?

There are several options for handling settings.xml in Harness CI:

* Store settings.xml externally from Harness, such as in a version control repo, and then [use a Git Clone or Run step to clone that repo (or subdirectory of a repo) into your pipeline](https://developer.harness.io/docs/continuous-integration/use-ci/codebase-configuration/clone-and-process-multiple-codebases-in-the-same-pipeline#add-a-git-clone-or-run-step).
* Store settings.xml as a file secret in Harness and then use a shell script in a Run step to copy the file to the relevant directory when your build runs.
* Store values for settings.xml as text secrets, and then add those values to a new settings.xml file that is created when your build runs. An example of this is shown in [Override secrets in settings.xml at runtime](https://developer.harness.io/docs/continuous-integration/use-ci/run-tests/modify-and-override-build-settings-before-a-build).

You can use expressions to reference secrets in step commands, such as:

```
echo '<+secrets.getValue("account.[settingsXMLSecretID]")>' > settings.xml
```

If you need to share `settings.xml` with multiple steps in the same stage, declare it in **Shared Paths**. For more information, go to [Share data between steps in a stage](https://developer.harness.io/docs/continuous-integration/use-ci/caching-ci-data/share-ci-data-across-steps-and-stages/).

## Plugins and integrations

### Which Drone plugins are supported in Harness CI?

You can build your own plugins or use one of the many preexisting plugins from the Drone Plugins Marketplace. For more information, go to [Explore plugins](https://developer.harness.io/docs/continuous-integration/use-ci/use-drone-plugins/explore-ci-plugins).

### How do I convert Drone plugin settings to Harness CI?

For information about using Drone plugins in Harness CI, including converting Drone YAML to Harness YAML, go to [Use Drone plugins](/docs/continuous-integration/use-ci/use-drone-plugins/run-a-drone-plugin-in-ci.md).

### How do I add a custom plugin to my Harness CI pipeline?

For instructions on writing and using custom plugins, go to [Write custom plugins](https://developer.harness.io/docs/continuous-integration/use-ci/use-drone-plugins/custom_plugins).

### Can I test my custom plugin before using it in a pipeline?

Yes, you can [test plugins locally](https://developer.harness.io/docs/continuous-integration/use-ci/use-drone-plugins/custom_plugins#test-plugins-locally).

### Why is the PATH variable overwritten in parallel GitHub Actions steps?

When steps run in parallel and modify the same variables, the resulting value of that common variable depends on the step that modified it last. This can be different with each build, depending on how fast each parallel step executes. This is true for any parallel steps.

When running multiple instances of the same GitHub Action, you must set `XDG_CACHE_HOME`, as explained in [Duplicate Actions](https://developer.harness.io/docs/continuous-integration/use-ci/use-drone-plugins/run-a-git-hub-action-in-cie#duplicate-actions).

If you need a variable's value to remain distinct, either run the steps sequentially (rather than in parallel), or find a way to differentiate the variable that each step is modifying, such as by exporting each value as an output variable where you use [looping strategy expressions](https://developer.harness.io/docs/platform/pipelines/looping-strategies/looping-strategies-matrix-repeat-and-parallelism/#looping-strategy-expressions) to assign unique identifiers to each variable name.

### Can I integrate my CI builds with the Datadog Pipeline Visibility feature?

Harness doesn't have OOTB support for Datadog Pipeline Visibility, but you can use the [Datadog Drone plugin](https://plugins.drone.io/plugins/datadog) in a [Plugin step](https://developer.harness.io/docs/continuous-integration/use-ci/use-drone-plugins/run-a-drone-plugin-in-ci).

## Workspaces, shared volumes, and shared paths

### What is a workspace in a CI pipeline?

Workspace is a temporary volume that is created when a pipeline runs. It serves as the current working directory for all the steps within a stage. You can use **Shared Paths** to share additional volumes to the workspace. For more information about the workspace and shared paths go to [CI pipeline creation overview - Shared Paths](https://developer.harness.io/docs/continuous-integration/use-ci/prep-ci-pipeline-components).

### Does the workspace persist after a stage ends?

No, the workspace is destroyed when the stage ends. If you need to shared data across stages, use [caching](https://developer.harness.io/docs/continuous-integration/use-ci/caching-ci-data/share-ci-data-across-steps-and-stages#share-data-across-stages).

### How do I share data and volumes between steps in a CI stage?

The workspace is the current working directory for all steps in a stage. Any data stored to the workspace is available to other steps in the stage. If you need to share additional volumes, decare them as **Shared Paths**. For more information, go to [CI pipeline creation overview - Shared Paths](https://developer.harness.io/docs/continuous-integration/use-ci/prep-ci-pipeline-components) and [Share data across steps and stages](https://developer.harness.io/docs/continuous-integration/use-ci/caching-ci-data/share-ci-data-across-steps-and-stages).

### What volume is created when I add a shared path?

When you add a [shared path](https://developer.harness.io/docs/continuous-integration/use-ci/prep-ci-pipeline-components), Harness creates an empty directory type volume and mounts it on each step container.

### Does a shared path determine where a file is downloaded?

No, declaring a shared path doesn't dictate where a download happens. Your stage must include steps or commands that load files to volumes declared in your shared paths, otherwise the volumes remain empty. For example, depending on your pipeline configuration, cache steps might automatically interact with a shared path volume, or you might have a Git Clone step that clones a repo to a shared path volume.

### Why are changes made to a container image filesystem in a CI step is not available in the subsequent step that uses the same container image?

Changes to a container image are isolated to the current step. While a subsequent step might use the same base container image, it is not the literal same container as the previous step. To permanently modify workspace data, you need to interact with the `/harness` directory (which is the base workspace directory for all steps in the stage), use shared paths, or use caching to [share data between steps and stages](https://developer.harness.io/docs/continuous-integration/use-ci/caching-ci-data/share-ci-data-across-steps-and-stages).

## Caching

### What does caching do in Harness CI?

[Caching](https://developer.harness.io/docs/continuous-integration/use-ci/caching-ci-data/share-ci-data-across-steps-and-stages) improves build times and lets you share data across stages.

### What caching options does Harness CI offer?

Harness CI offers a variety of [caching](https://developer.harness.io/docs/continuous-integration/use-ci/caching-ci-data/share-ci-data-across-steps-and-stages) options, including S3, GCS, and Harness-hosted Cache Intelligence.

###  How can I download files from an S3 bucket in Harness CI?

There are two options to download files from an S3 bucket in Harness:

* Use the [Save and Restore Cache from S3 steps](https://developer.harness.io/docs/continuous-integration/use-ci/caching-ci-data/saving-cache/). This step is specifically designed for downloading files from S3 and simplifies the process.
* Use a custom shell script in a [Run step](https://developer.harness.io/docs/continuous-integration/use-ci/run-ci-scripts/run-step-settings).

### Can I use GCS for caching with Harness CI?

Yes. Go to [Save and Restore Cache from GCS](https://developer.harness.io/docs/continuous-integration/use-ci/caching-ci-data/save-cache-in-gcs).

### Does Harness CI support multilayer caching?

Yes. Go to [Multilayer caching](https://developer.harness.io/docs/continuous-integration/use-ci/caching-ci-data/multilayer-caching).

### How can I use an artifact in a different stage from where it was created?

Use caching to [share data across stages](https://developer.harness.io/docs/continuous-integration/use-ci/caching-ci-data/share-ci-data-across-steps-and-stages#share-data-across-stages).

### What does the Fail if Key Doesn't Exist setting do?

The Fail if Key Doesn't Exist setting causes the [Restore Cache from GCS](https://developer.harness.io/docs/continuous-integration/use-ci/caching-ci-data/save-cache-in-gcs#gcs-save-and-restore-cache-step-settings) or [Restore Cache from S3](https://developer.harness.io/docs/continuous-integration/use-ci/caching-ci-data/saving-cache#restore-cache-from-s3-step-settings) step to fail if the defined cache key isn't found.

### Does Harness override the cache when using the Save Cache to S3 step?

By default, the Save Cache to S3 step doesn't override the cache. You can use the [Override Cache](https://developer.harness.io/docs/continuous-integration/use-ci/caching-ci-data/saving-cache#override-cache) setting if you want to override the cache if a cache with a matching key already exists.

### How can I check if the cache was restored?

You can use conditional executions and failure strategies to [check if a cache was downloaded and, if it wasn't, install the dependencies that would be provided by the cache](https://developer.harness.io/docs/continuous-integration/use-ci/caching-ci-data/run-if-no-cache).

## Cache Intelligence

### Cache Intelligence on Harness Cloud Infrastructure

[Cache Intelligence](https://developer.harness.io/docs/continuous-integration/use-ci/caching-ci-data/cache-intelligence) is available on Linux and Windows platforms on Harness Cloud build infrastructure only.

### Why can't I enable Cache Intelligence in my CI pipeline?

Currently, [Cache Intelligence](https://developer.harness.io/docs/continuous-integration/use-ci/caching-ci-data/cache-intelligence) is only available for Linux and Windows platforms on Harness Cloud build infrastructure. For more information, go to [Cache Intelligence - Supported build infrastructures](https://developer.harness.io/docs/continuous-integration/use-ci/caching-ci-data/cache-intelligence#supported-build-infrastructures).

### What is the Cache Intelligence cache storage limit?

Harness Cloud provides up to 2GB of [cache storage](https://developer.harness.io/docs/continuous-integration/use-ci/caching-ci-data/cache-intelligence#cache-storage) per account.

### What is the cache retention window for Cache Intelligence? Can the cache expire?

[Cache storage](https://developer.harness.io/docs/continuous-integration/use-ci/caching-ci-data/cache-intelligence#cache-storage) is retained for 15 days. This limit resets whenever the cache is updated.

### Can different pipelines within the same account access and use the same cache storage for Cache Intelligence?

All pipelines in the account use the same [cache storage](https://developer.harness.io/docs/continuous-integration/use-ci/caching-ci-data/cache-intelligence#cache-storage), and each build tool has a unique cache key that is used to restore the appropriate cache data at runtime.

### What is the cache storage location for Cache Intelligence?

By default, Cache Intelligence stores data to be cached in the `/harness` directory. You can [specify custom cache paths](https://developer.harness.io/docs/continuous-integration/use-ci/caching-ci-data/cache-intelligence#customize-cache-paths).

### How does Harness generate cache keys for caching build artifacts?

Harness generates a cache key from a hash of the build lock file (such as` pom.xml`, `build.gradle`, or `package.json`) that Harness detects. If Harness detects multiple tools or multiple lock files, Harness combines the hashes to create the cache key. You can also [set custom cache keys](https://developer.harness.io/docs/continuous-integration/use-ci/caching-ci-data/cache-intelligence#customize-cache-keys).

### Is there any API available for Cache Intelligence?

Yes. Go to [Cache Intelligence API](https://developer.harness.io/docs/continuous-integration/use-ci/caching-ci-data/cache-intelligence#cache-intelligence-api).

## Background steps and service dependencies

### What is the purpose of Background steps in a CI stage?

[Background steps](https://developer.harness.io/docs/continuous-integration/use-ci/manage-dependencies/background-step-settings) are used to [manage dependent services](https://developer.harness.io/docs/continuous-integration/use-ci/manage-dependencies/dependency-mgmt-strategies) that need to run for the entire lifetime of a Build stage.

### How do I configure the Background step settings?

For instructions on configuring Background steps, go to [Background step settings](https://developer.harness.io/docs/continuous-integration/use-ci/manage-dependencies/background-step-settings).

### Can Background steps run multiple services simultaneously?

Yes, you can use multiple background steps to run multiple background services, creating a local, multi-service application.

### Do Background steps have limitations?

Yes. Background steps have these limitations:

* Background steps don't support failure strategies or output variables.
* Other steps running in containers can't communicate with Background steps running on [Harness Cloud build infrastructure](https://developer.harness.io/docs/continuous-integration/use-ci/set-up-build-infrastructure/use-harness-cloud-build-infrastructure) because they don't have a common host.
* If your build stage uses Harness Cloud build infrastructure and you are running a Docker image in a Background step, you must specify [Port Bindings](https://developer.harness.io/docs/continuous-integration/use-ci/manage-dependencies/background-step-settings#port-bindings) if you want to reference the Background step in a later step in the pipeline (such as in a cURL command in a Run step).

### How can a step call a service started by a Background step?

For information about calling services started by Background steps, go to **Name and ID** and **Port Bindings** in [Background step settings](/docs/continuous-integration/use-ci/manage-dependencies/background-step-settings.md).

### I can't connect to the hostname using the step ID from my Background step, and I get an "Unknown server host" error

Not all build infrastructures use the step ID when referencing services running in Background steps. For more information, go to [Background step settings - Name and ID](https://developer.harness.io/docs/continuous-integration/use-ci/manage-dependencies/background-step-settings#name-and-id) and [Background step settings - Port Bindings](https://developer.harness.io/docs/continuous-integration/use-ci/manage-dependencies/background-step-settings#port-bindings).

### Why is Background step always marked as successful even if there are failures executing the entry point?

This is the expected behavior. Once a Background step initializes, Harness proceeds to the next step in the stage and marks the Background step successful. If your services in Background steps aren't starting, or your subsequent steps are running too soon, [add a Run step after the Background step as a health check](https://developer.harness.io/docs/continuous-integration/use-ci/manage-dependencies/health-check-services/).

### How can I make sure my background service is healthy before running the rest of my pipeline? How can I test that my background service is running?

[Add a Run step after the Background step as a health check.](https://developer.harness.io/docs/continuous-integration/use-ci/manage-dependencies/health-check-services/)

### What are the prerequisites for running Background steps?

The build infrastructure or environment must have the necessary binaries to run your service. Depending on the build infrastructure, Background steps can use existing binaries in the environment (such as those that are preinstalled on Harness Cloud runners) or pull an image, such as a Docker image, containing the required binaries. For more information, go to [Background step settings - Container Registry and Image](https://developer.harness.io/docs/continuous-integration/use-ci/manage-dependencies/background-step-settings#container-registry-and-image).

### Can Background steps use an external image for PostgreSQL services?

Yes. Depending on the build infrastructure, Background steps can either use existing binaries in the build environment or pull an image containing the required PostgreSQL binaries. For more information, go to [Background step settings - Container Registry and Image](https://developer.harness.io/docs/continuous-integration/use-ci/manage-dependencies/background-step-settings#container-registry-and-image).

### How do I add volumes for PostgreSQL data in the build workspace?

With a Kubernetes cluster build infrastructure, use the [Volumes](https://developer.harness.io/docs/continuous-integration/use-ci/set-up-build-infrastructure/ci-stage-settings#volumes) setting to add one empty directory volume for each PostgreSQL service you plan to run. For moe information, go to [Troubleshooting: Failed to get image entry point](https://developer.harness.io/docs/continuous-integration/use-ci/manage-dependencies/multiple-postgres#troubleshooting-failed-to-get-image-entrypoint).

### Can I run a LocalStack service in a Background step?

Yes. Go to [Tutorial: Run LocalStack as a Background step](https://developer.harness.io/tutorials/ci-pipelines/test/localstack/).

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

### What is the timeout limit for a CI pipeline?

By default, a stage can run for a maximum of 24 hours on a Kubernetes cluster build infrastructure and a maximum of 30 minutes on Harness Cloud build infrastructure.

For pipelines, the default timeout limit is, generally, the product of the stage limit multiplied by the number of stages. For example, a pipeline with three stages that use a Kubernetes cluster build infrastructure could run for a maximum of 72 hours. However, you can also set an overall pipeline timeout limit in each pipeline's **Advanced Options**.

For steps, you can set a custom timeout limit in each step's **Optional Configuration** settings. In stages that use a Kubernetes cluster build infrastructure, the default timeout for steps is 10 hours. However, this is constrained by the stage timeout limit of 24 hours. For example, if a stage has three steps, the total run time for the three steps can't exceed 24 hours or the stage fails due to the stage timeout limit.
