---
title: Delegate installation options
description: Install Harness Delegates using Helm, Terraform, Kubernetes, or Docker
sidebar_position: 1
---

import DelegateInstall from '/docs/platform/get-started/tutorials/install-delegate.md';
import InitScript from './install-a-delegate-with-3-rd-party-tool-custom-binaries.md';
import CustomImage from './build-custom-delegate-images-with-third-party-tools.md';

## Install the default delegate

Expand the section below for instructions on installing the default delegate for your Harness account. It can be either a Kubernetes delegate installed using a Helm chart, Terraform Helm Provider, or Kubernetes manifest or a Docker delegate using the `docker run` command. For more information, go to [Install Harness Delegate on Kubernetes or Docker](/docs/platform/get-started/tutorials/install-delegate).

<details>
<summary>Install the default delegate on Kubernetes or Docker</summary>
<DelegateInstall />
</details>

This video shows how to install a delegate.

<DocVideo src="https://www.loom.com/embed/a935f18296ee4156900efcf60f20f224" width="100%" height="600" />

The default delegate image, denoted by the `yy.mm.verno` image tag, includes a set of pre-installed 3rd-party custom binaries for convenience. For the list of these binaries, go to [Third-party tools included in teh delegate image type](/docs/platform/delegates/delegate-concepts/delegate-image-types#third-party-tools-included-in-the-delegate-image-type). If you are concerned about the security vulnerabilities that potentially come with these pre-installed binaries, Harness recommends that you use the minimal delegate explained below.

## Install minimal delegate with 3rd party custom binaries

The minimal delegate image, denoted by the `yy.mm.verno.minimal` image tag, does not include any pre-installed 3rd-party custom binaries for ensuring the lowest footprint and hence lowest number of security vulnerabilities.

### Use INIT_SCRIPT

This option installs the 3rd party custom binaries on a delegate container instance without changing the delegate image. Below is an inline tutorial that shows you how to use this option. You can also review the tutorial directly. Go to [Install a delegate with third-party tool custom binaries](/docs/platform/delegates/install-delegates/install-a-delegate-with-3-rd-party-tool-custom-binaries.md).

<details>
<summary>Use INIT_SCRIPT</summary>
<InitScript />
</details>

### Build a custom image

This option installs the 3rd party custom binaries on a new custom delegate image that uses the Harness minimal delegate image as its base image. Below is an inline tutorial that shows you how to use this option. You can also review the tutorial directly. Go to [Build custom delegate images with third-party tools](/docs/platform/delegates/install-delegates/build-custom-delegate-images-with-third-party-tools.md).

<details>
<summary>Build a custom image</summary>
<CustomImage />
</details>

## Configure options

### Network proxy

For network proxy details, go to [Configure delegate proxy settings](/docs/platform/delegates/manage-delegates/configure-delegate-proxy-settings.md).

### CI-specific variables

Delegate variables specific to CI are described where necessary, such as in [Set up a local runner build infrastructure](/docs/continuous-integration/use-ci/set-up-build-infrastructure/define-a-docker-build-infrastructure) and [Set up VM build infrastructures](/docs/category/set-up-vm-build-infrastructures).

### Custom certificates

For custom certificates, go to [Install delegates with custom certificates](/docs/platform/delegates/secure-delegates/install-delegates-with-custom-certs.md).

### Group names

The legacy delegate used `DELEGATE_GROUP_NAME` for group names. This environment is not valid in NextGen. Use `DELEGATE_NAME` for group names.

## Additional installation approaches

### Install Docker delegate to Amazon ECS Fargate

You can install the Docker delegate into Amazon ECS Fargate. For more information, go to [Deploy a Docker delegate to Amazon ECS or AWS Fargate](/docs/platform/delegates/install-delegates/docker-delegate-to-ecs-fargate.md).

### Install a legacy Kubernetes delegate

import Deleos from '/docs/platform/shared/delegate-legacy-eos.md'

<Deleos />

The legacy Kubernetes delegate, denoted `latest` container image tag, is used primarily in Harness FirstGen had the auto-upgrade setting ON by default and did not have the flexibility to turn OFF this setting if needed. This type of delegate is now deprecated for new Harness accounts. For more information, go to [Install a legacy Kubernetes delegate](/docs/platform/delegates/install-delegates/install-a-kubernetes-delegate.md).

### Install Docker delegate using Podman

You can install the Docker delegate using Podman by adding Podman commands to your Dockerfile.

To install the Docker delegate using Podman, do the following:

1. In Harness, select **Deployments**, then select your project.
2. Under **Project Setup**, select **Delegates**.
3. Select **Install a Delegate** to open the **New Delegate** dialog.

   ![](./static/install-a-docker-delegate-podman.png)

4. Under **Select where you want to install your Delegate**, select **Docker**.

5. Copy the Docker installation command.

6. Paste the Docker installation command from the UI in your CLI, and replace the `docker run` command with the `podman run` command below.

   ```bash
   podman run --restart=always --hostname="$(hostname -f)"
   -e DELEGATE_NAME=docker-delegate \
   -e NEXT_GEN="true" \
   -e DELEGATE_TYPE="DOCKER" \
   -e ACCOUNT_ID=<ACCOUNT_ID_COPIED_FROM_THE_UI_COMMAND> \
   -e DELEGATE_TOKEN=<DELEGATE_TOKEN_COPIED_FROM_THE_UI_COMMAND>= \
   -e LOG_STREAMING_SERVICE_URL=https://app.harness.io/log-service/ \
   -e MANAGER_HOST_AND_PORT=https://app.harness.io harness/delegate:yy.mm.verno
   ```

7. Run the command.
