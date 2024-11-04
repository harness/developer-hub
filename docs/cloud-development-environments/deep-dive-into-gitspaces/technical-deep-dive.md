---
title: Technical Deep-Dive
description: How does Harness CDE operate at a high level? 
sidebar_position: 1
sidebar_label: Technical Deep-Dive
redirect_from:
  - /docs/cloud-development-environment/deep-dive-into-gitspaces/technical-deep-dive
---

:::info

Harness CDE is now available in public beta. To enable it on your account, contact your sales representative or reach out to the team at cde-interest@harness.io

:::

Each time you create a new Gitspace, a dedicated development container is provisioned and hosted on a unique dedicated virtual machine (VM), ensuring an isolated and secure development environment. This development container allows you to work within a containerized version of a build environment. Simply put, it provides you with a pre-configured, ready-to-code setup directly within your IDE. 

This container is built based on the configurations defined in the devcontainer.json file (an industry standard specification that defines metadata and settings required to configure a containerized development environment). You can directly add a devcontainer.json file to your source code repository, allowing you to customize your environment by specifying the base image (required to spin up the container) in the same file. 

If you create a Gitspace from a repository without a devcontainer.json file, Harness will use a default Docker image. For more details on the default image, check out this repository.

Each development container is hosted on a unique virtual machine (VM), which is provisioned according to the resource requirements specified by the user when creating a new Gitspace, allowing for further customization.

## Configuration

Gitspace configuration lives with your source code in a file named `.devcontainer/devcontainer.json`, which is an [industry standard spec](https://containers.dev/implementors/json_reference/) that defines metadata and settings required to configure a containerized development environment. 

You can specify the image used to spin up the container in this config file. Any application dependencies can be prebaked into this image so that you do not spend time installing these each time.

The `devcontainer.json` spec contains many properties that let users customize their development environments. We currently support the `image` and `postCreateCommand` properties.  

If a repository does not have a `devcontainer.json`, we will spin up the CDE with a default docker image at  `mcr.microsoft.com/devcontainers/base:dev-ubuntu-24.04`. The Dockerfile for this default image is available at `https://github.com/devcontainers/images/tree/main/src/base-ubuntu` 

