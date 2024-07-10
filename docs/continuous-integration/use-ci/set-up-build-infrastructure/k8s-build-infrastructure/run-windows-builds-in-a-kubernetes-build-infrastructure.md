---
title: Run Windows builds in a Kubernetes build infrastructure
description: You can run Windows builds in your Kubernetes build infrastructure.
sidebar_position: 50
helpdocs_topic_id: ud5rjfcp8h
helpdocs_category_id: rg8mrhqm95
helpdocs_is_private: false
helpdocs_is_published: true
---

<DocsTag  text="Team plan" link="/docs/continuous-integration/ci-quickstarts/ci-subscription-mgmt" /> <DocsTag  text="Enterprise plan" link="/docs/continuous-integration/ci-quickstarts/ci-subscription-mgmt" />

You can run Windows builds in your Kubernetes build infrastructure. Windows Server 2019 and 2022 images are available for running CI builds and for out-of-the-box CI steps such as Run, Save Cache, and Restore Cache.

## Prerequisites

These conditions apply when running Windows builds on Harness CI Kubernetes cluster build infrastructure.

### Windows Server 2022 or 2019 is required

Windows Server 2019 and 2022 images are supported.

* Amazon EKS: The [AMI type](https://docs.aws.amazon.com/AWSEC2/latest/WindowsGuide/aws-windows-ami.html) must be [Windows Server Core](https://hub.docker.com/_/microsoft-windows-servercore).
* GCP: Only Windows Server 2019 is supported.
* GKS: Use the recommended image type for Windows Server 2019 or 2022.

   ![](../static/run-windows-builds-in-a-kubernetes-build-infrastructure-10.png)

### Some built-in steps aren't supported

The following steps aren't supported on Windows platforms on Kubernetes cluster build infrastructures: **Build and Push an image to Docker Registry**, **Build and Push to ECR**, **Build and Push to GAR**, and **Build and Push to GCR**. Try using the [buildah plugin](../../build-and-upload-artifacts/build-and-push-nonroot.md) instead.

### Docker commands aren't supported

If your build process needs to run Docker commands, [Docker-in-Docker (DinD) with privileged mode](../../manage-dependencies/run-docker-in-docker-in-a-ci-stage.md) is necessary when using a Kubernetes cluster build infrastructure; **however, Windows doesn't support privileged mode.** If you need to run Docker commands, you must use another build infrastructure, such as [Harness Cloud](../use-harness-cloud-build-infrastructure.md) or a [VM build infrastructure](/docs/category/set-up-vm-build-infrastructures), where you can run Docker commands directly on the host.

## Configure cluster and build infrastructure

1. Set up your cluster with both Linux and Windows node pools. Linux is required for running the Delegate.
2. [Install the Delegate](/docs/platform/delegates/delegate-concepts/delegate-overview) on the Linux node pool by specifying the Linux node pool selector. For example, on GKE the Linux node pool label is `kubernetes.io/os: linux` and the Windows node pool label is `kubernetes.io/os: windows`. The selectors are automatically set up on the nodes.
3. In your pipeline's **Build** stage, go to the **Infrastructure** tab and configure the following settings:
   1. Select **Windows** for the **OS**.
   2. Expand the **Advanced** section, and add a **Node Selector** to use the Windows node pool. Enter `kubernetes.io/os` as the **Key** and `windows` as the **Value**.

  ![](../static/run-windows-builds-in-a-kubernetes-build-infrastructure-11.png)

4. Save and run your pipeline.

:::info

If you use a custom Windows image in a Run step, the base image for the custom image must include the `netapi32.dll` file. To include this file in your image, add the following command to the Dockerfile:

```
COPY --from=core /windows/system32/netapi32.dll /windows/system32/netapi32.dll
```

:::

### Pipeline YAML example

This example pipeline runs on a Windows platform on a Kubernetes cluster build infrastructure. Note the presence of `os` and `nodeSelector` in `stage.spec.infrastructure.spec`.

```yaml
pipeline:  
  name: WindowsK8  
  identifier: WindowsK8  
  projectIdentifier: myproject  
  orgIdentifier: default  
  tags: {}  
  properties:  
    ci:  
      codebase:  
        connectorRef: $GITHUB_CONNECTOR  
        repoName: testing-flask-with-pytest  
        build: <+input>  
  stages:  
    - stage:  
        name: Build and Test  
        identifier: Build_and_Test  
        type: CI  
        spec:  
          cloneCodebase: true  
          infrastructure:  
            type: KubernetesDirect  
            spec:  
              connectorRef: $K8S_CONNECTOR  
              namespace: harness-delegate-ng  
              automountServiceAccountToken: true  
              nodeSelector:  
                kubernetes.io/os: windows  
              os: Windows  
          execution:  
            steps:  
              - step:  
                  type: Run  
                  name: helloWorld  
                  identifier: Pre  
                  spec:  
                    connectorRef: $DOCKERHUB_CONNECTOR  
                    image: winamd64/python  
                    shell: Powershell  
                    command: "Write-Host \"hello world\" "
```

## Default user for Windows builds

Harness CI builds use a Lite-Engine and, for Kubernetes cluster build infrastructures, an Addon image. The Lite-Engine drives the stage workspace, and the Addon image drives additional build-related tasks required for Kubernetes cluster build infrastructures.

The default user for the Windows Lite-Engine and Addon image is `ContainerAdministrator`. `ContainerAdministrator` is assigned elevated privileges similar to the root user on Linux, allowing for system-level configurations and installations within the Windows container.

Don't change the default user for these images. The default user must be `ContainerAdministrator` because specific path and tool installations require it, and Windows doesn't allow setting the path otherwise.

For individual steps that run in containers, Harness uses user `1000` by default. You can use a step's **Run as User** setting to use a different user for a specific step.

## Troubleshoot Windows builds on Kubernetes cluster build infrastructure

Go to the [CI Knowledge Base](/kb/continuous-integration/continuous-integration-faqs) for questions and issues related to Windows builds on Kubernetes cluster build infrastructure, including:

* [Error when running Docker commands on Windows build servers](/kb/continuous-integration/continuous-integration-faqs/#error-when-running-docker-commands-on-windows-build-servers)
* [Step continues running for a long time after the command is complete](/kb/continuous-integration/continuous-integration-faqs/#step-continues-running-for-a-long-time-after-the-command-is-complete)
* [Is privileged mode necessary for running DinD in Harness CI?](/kb/continuous-integration/continuous-integration-faqs/#is-privileged-mode-necessary-for-running-dind-in-harness-ci)
