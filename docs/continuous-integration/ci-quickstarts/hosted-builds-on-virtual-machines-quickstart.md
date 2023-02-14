---
title: Get started with Harness Cloud
description: You can run your build on Harness-hosted VMs.
sidebar_position: 10
helpdocs_topic_id: jkh1wsvajv
helpdocs_category_id: pjovrkldfq
helpdocs_is_private: false
helpdocs_is_published: true
---

With Harness Cloud you can run builds in isolation on Harness-hosted virtual machines (VMs). You can run builds at scale on Linux, Windows, and macOS machines that are preconfigured with the tools, packages, and settings that are commonly used in CI pipelines.

Harness hosts, maintains, and upgrades these machines so that you can focus on building great software instead of maintaining build infrastructure.

Harness Cloud provides the following advantages:

* Free monthly credits for up to 2,000 build minutes.
* Starter pipelines for different programming languages.
* Blazing fast builds.
* Run anywhere. Use hosted runners to run your builds on Linux, macOS, or Windows.

[Sign up now](https://harness.io/products/continuous-integration) to get started.

For a comparison of build infrastructure options, go to [Which build infrastructure is right for me?](../use-ci/set-up-build-infrastructure/which-build-infrastructure-is-right-for-me.md)

## What happens when pipelines run on Harness Cloud?

During a pipeline run that uses Harness Cloud build infrastructure, Harness executes each CI stage in a new, ephemeral VM.

![Example pipeline on Harness Cloud](./static/hosted-builds-on-virtual-machines-quickstart-11.png)

All steps in the stage execute on the VM, allowing the steps in that job to share information using the underlying filesystem. You can run CI steps either directly on the VM or in a Docker container. When the job is finished, the VM is automatically terminated.

### Sample pipeline

The following YAML shows a pipeline with one CI stage that contains a __Run__ step executing an `echo` command. The `platform` property defines the target machine where the stage is executed.

```
 pipeline:
  projectIdentifier: Docs
  orgIdentifier: default
  identifier: Hello_World
  name: Hello World
  properties:
    ci:
      codebase: //  Use the codebase section if the stage is set to automatically clone the codebase.
        connectorRef: account.Github // The git connector holds your Docker credentials. It's needed to pull the image from Docker.
        repoName: keen-software/jhttp
        build: <+input>
  stages:
    - stage:
        name: Print welcome message
        identifier: welcome_message
        type: CI
        spec:
          cloneCodebase: true
          platform: // Platform properties are used to describe the target machine that is needed for the execution of the CI stage.
            os: Linux
            arch: Amd64
          runtime:
            type: Cloud // Run the build on Harness-provided infrastructure.
            spec: {}
          execution:
            steps:
              - step:
                  type: Run
                  name: Welcome
                  identifier: Welcome
                  spec:
                    connectorRef: my_dockerhub // (Optional) The Docker connectors hold your Docker credentials. It's needed to pull the image from Docker.
                    image: alpine // (Optional) If no image is specified, the step runs on the host machine,
                    shell: Sh
                    command: Echo "Welcome to Harness CI"
```
