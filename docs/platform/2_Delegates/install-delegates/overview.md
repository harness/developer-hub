---
title: Delegate installation overview
description: How to install Harness delegates using Helm, Terraform, Kubernetes, or Docker
sidebar_position: 1
---
```mdx-code-block
import DelegateInstall from '/tutorials/platform/install-delegate.md';
import InitScript from './install-a-delegate-with-3-rd-party-tool-custom-binaries.md';
import CustomImage from './build-custom-delegate-images-with-third-party-tools.md';
```

## Install the default delegate

The inline [tutorial](/tutorials/platform/install-delegate) below shows you how to install the default delegate for your Harness account. It can be either a Kubernetes delegate installed using a Helm chart, Terraform Helm Provider, and Kubernetes manifest or a Docker delegate using the `docker run` command. 

<details>
<summary>Install the default delegate on Kubernetes or Docker</summary>
<DelegateInstall />
</details>

The default delegate image, denoted by the `yy.mm.xxxx` image tag, includes a set of pre-installed 3rd-party custom binaries for convenience. You can find the list of these binaries here. If you are concerned about the security vulnerabilities that potentially come with these pre-installed binaries, our recommendation is to use the minimal delegate noted below.

## Install minimal delegate with 3rd party custom binaries

The minimal delegate image, denoted by the `yy.mm.xxxx.minimal` image tag, does not include any pre-installed 3rd-party custom binaries for ensuring the lowest footprint and hence lowest number of security vulnerabilities.

### Use INIT_SCRIPT

This option installs the 3rd party custom binaries on a delegate container instance without changing the delegate image itself. Here is an inline [document](./install-a-delegate-with-3-rd-party-tool-custom-binaries) that shows how to use this option.

<details>
<summary>Use INIT_SCRIPT</summary>
<InitScript />
</details>

### Build a custom image

This option installs the 3rd party custom binaries on a new custom delegate image that uses the Harness minimal delegate image as its base image. Here is an inline [document](./build-custom-delegate-images-with-third-party-tools) that shows how to use this option.

<details>
<summary>Build a custom image</summary>
<CustomImage />
</details>

## Configure options

### Network proxy

This option is detailed in this [document](/docs/platform/2_Delegates/manage-delegates/configure-delegate-proxy-settings.md).

### CI-specific variables

This option is detailed in this [document](/docs/continuous-integration/use-ci/set-up-build-infrastructure/define-a-docker-build-infrastructure#install-the-delegate).

### Custom certificates

This option is detailed in this [document](/docs/platform/2_Delegates/secure-delegates/install-delegates-with-custom-certs.md).

## Additional installation approaches

### Install Docker delegate to Amazon ECS Fargate

The Docker delegate can be installed into Amazon ECS Fargate using this instructions provided in this [document](./docker-delegate-to-ecs-fargate).

### Install a legacy Kubernetes delegate

The legacy Kubernetes delegate, denoted `latest` container image tag, is used primarily in Harness FirstGen had the auto-upgrade setting ON by default and did not have the flexibility to turn OFF this setting if needed. This type of delegate is now deprecated for new Harness accounts. Here is a [document](./install-a-kubernetes-delegate) that shows how to install a legacy Kubernetes delegate.


