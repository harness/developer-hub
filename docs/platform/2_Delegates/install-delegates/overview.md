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

The inline tutorial below shows you how to install the default delegate for your Harness account. It can be either a Kubernetes delegate installed using a Helm chart, Terraform Helm Provider, and Kubernetes manifest or a Docker delegate using the `docker run` command. You can also review the tutorial directly [here](/tutorials/platform/install-delegate).

<details>
<summary>Install the default delegate on Kubernetes or Docker</summary>
<DelegateInstall />
</details>


The default delegate image, denoted by the `yy.mm.xxxxx` image tag, includes a set of pre-installed 3rd-party custom binaries for convenience. You can find the list of these binaries [here](/docs/platform/Delegates/delegate-concepts/delegate-image-types#third-party-tools-included-in-the-delegate-image-type). If you are concerned about the security vulnerabilities that potentially come with these pre-installed binaries, our recommendation is to use the minimal delegate noted below.

## Install minimal delegate with 3rd party custom binaries

The minimal delegate image, denoted by the `yy.mm.xxxxx.minimal` image tag, does not include any pre-installed 3rd-party custom binaries for ensuring the lowest footprint and hence lowest number of security vulnerabilities.

### Use INIT_SCRIPT

This option installs the 3rd party custom binaries on a delegate container instance without changing the delegate image itself. Below is an inline tutorial that shows you how to use this option. You can also review the tutorial directly [here](/docs/platform/2_Delegates/install-delegates/install-a-delegate-with-3-rd-party-tool-custom-binaries.md).

<details>
<summary>Use INIT_SCRIPT</summary>
<InitScript />
</details>

### Build a custom image

This option installs the 3rd party custom binaries on a new custom delegate image that uses the Harness minimal delegate image as its base image. Below is an inline tutorial that shows you how to use this option. You can also review the tutorial directly [here](/docs/platform/2_Delegates/install-delegates/build-custom-delegate-images-with-third-party-tools.md).

<details>
<summary>Build a custom image</summary>
<CustomImage />
</details>

## Configure options

### Network proxy

For network proxy details, go to [Configure delegate proxy settings](/docs/platform/2_Delegates/manage-delegates/configure-delegate-proxy-settings.md).

### CI-specific variables

For CI-specific variables, go to [Install the delegate](/docs/continuous-integration/use-ci/set-up-build-infrastructure/define-a-docker-build-infrastructure#install-the-delegate).

### Custom certificates

For custom certificates, go to [Install delegates with custom certificates](/docs/platform/2_Delegates/secure-delegates/install-delegates-with-custom-certs.md).

### Group names

The legacy delegate used `DELEGATE_GROUP_NAME` for group names. This environment is not valid in NextGen. Use `DELEGATE_NAME` for group names. 

## Additional installation approaches

### Install Docker delegate to Amazon ECS Fargate

You can install the Docker delegate into Amazon ECS Fargate. For more information, go to [Deploy a Docker delegate to Amazon ECS or AWS Fargate](/docs/platform/2_Delegates/install-delegates/docker-delegate-to-ecs-fargate.md).

### Install a legacy Kubernetes delegate

The legacy Kubernetes delegate, denoted `latest` container image tag, is used primarily in Harness FirstGen had the auto-upgrade setting ON by default and did not have the flexibility to turn OFF this setting if needed. This type of delegate is now deprecated for new Harness accounts. For more information, go to [Install a legacy Kubernetes delegate](/docs/platform/2_Delegates/install-delegates/install-a-kubernetes-delegate.md).

### Install Docker delegate using Podman

You can install the Docker delegate using Podman by adding Podman commands to your Dockerfile. The example below using a delegate with the immutable image type. For information on delegate types, go to [Delegate image types](/docs/platform/delegates/delegate-concepts/delegate-image-types). 

#### Sample Podman file

```
sudo apt-get -y update

sudo apt-get -y install podman

podman pull docker.io/harness/delegate:yy.mm.xxxxx

podman run --restart=always --hostname="$(hostname -f | head -c 63)"
-e DELEGATE_NAME=podman-delegate
-e NEXT_GEN="true"
-e DELEGATE_TYPE="DOCKER"
-e ACCOUNT_ID=YOUR_ACCOUNT_ID
-e DELEGATE_TOKEN=YOUR_DELEGATE_TOKEN
-e LOG_STREAMING_SERVICE_URL=https://app.harness.io/gratis/log-service/
-e MANAGER_HOST_AND_PORT=https://app.harness.io/gratis docker.io/harness/delegate:yy.mm.xxxxx

podman ps
```
