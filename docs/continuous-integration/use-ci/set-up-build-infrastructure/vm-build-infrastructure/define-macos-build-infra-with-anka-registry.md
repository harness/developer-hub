---
title: Set up a macOS VM build infrastructure with Anka Registry
description: Set up a Harness macOS build farm that uses an Anka registry and controller.
sidebar_position: 40
---


import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


<DocsTag  text="Team plan" link="/docs/continuous-integration/ci-quickstarts/ci-subscription-mgmt" /> <DocsTag  text="Enterprise plan" link="/docs/continuous-integration/ci-quickstarts/ci-subscription-mgmt" />

:::note

Currently, this feature is behind the Feature Flag `CI_VM_INFRASTRUCTURE`. Contact [Harness Support](mailto:support@harness.io) to enable the feature.

:::

:::warning

**Harness recommends [Harness Cloud](/docs/continuous-integration/use-ci/set-up-build-infrastructure/use-harness-cloud-build-infrastructure) for macOS builds.**

This recommendation is due to licensing requirements and the complexity of managing macOS VMs with Anka virtualization.

With Harness Cloud, your builds run on Harness-managed runners, and you can start running builds in minutes.

:::

This topic describes how to use AWS EC2 instances to run a macOS build farm with [Anka's virtualization platform for macOS](https://docs.veertu.com/anka/what-is-anka/). This configuration uses [AWS EC2 instances and dedicated hosts](https://aws.amazon.com/blogs/compute/getting-started-with-anka-on-ec2-mac-instances/) to host a Harness Delegate and Runner, as well as the Anka Controller, Registry, and Virtualization. Working through the Anka controller and registry, the Harness Runner creates VMs dynamically in response to CI build requests.

For more information about Anka and Mac on EC2 go to the Anka documentation on [What is the Anka Build Cloud](https://docs.veertu.com/anka/anka-build-cloud/), [Setting up the Controller and Registry on Linux/Docker](https://docs.veertu.com/anka/anka-build-cloud/getting-started/setup-controller-and-registry/), and [Anka on AWS EC2 Macs - Community AMIs](https://docs.veertu.com/anka/aws-ec2-mac/#community-ami).

The following diagram illustrates how Harness CI and Anka work together. The [Harness Delegate](/docs/platform/delegates/delegate-concepts/delegate-overview) communicates directly with your Harness instance. The [VM runner](https://docs.drone.io/runner/vm/overview/) maintains a pool of VMs for running builds. When the delegate receives a build request, it forwards the request to the runner, which runs the build on an available VM. The [Anka registry and controller](https://docs.veertu.com/anka/#controller--registry) orchestrate and maintain the Mac VMs. Once you set up the Harness and Anka components, you can scale up your build farm with additional templates, build nodes, and VMs.

![](../static/macos-build-infra-with-anka-registry-mult-nodes.png)

This is one of several build infrastructure options, for example, you can also run Mac builds on [Harness Cloud build infrastructure](../use-harness-cloud-build-infrastructure.md)

## Requirements

This configuration requires:

* An [Anka Build license](https://veertu.com/anka-build/).
* Familiarity with AWS EC2, Anka, and the macOS ecosystem.
   * [What is the Anka build cloud?](https://docs.veertu.com/anka/anka-build-cloud/)
   * [Getting started with Anka on EC2 Mac instances](https://aws.amazon.com/blogs/compute/getting-started-with-anka-on-ec2-mac-instances/)
   * [Anka on AWS EC2 instances](https://docs.veertu.com/anka/aws-ec2-mac/)
* Familiarity with the [Harness Platform](/docs/platform/get-started/key-concepts.md) and [CI pipeline creation](../../prep-ci-pipeline-components.md).
* Familiarity with Harness Delegates, VM runners, and pools.
  * [Harness Delegates](/docs/platform/delegates/delegate-concepts/delegate-overview)
  * [Drone VM runner overview](https://docs.drone.io/runner/vm/overview/)
  * [Drone pools](https://docs.drone.io/runner/vm/configuration/pool/)
  * [Drone Anka drivers](https://docs.drone.io/runner/vm/drivers/anka/)
  * [GitHub repository - Drone runner AWS](https://github.com/drone-runners/drone-runner-aws)

## Set up the Anka Controller and Registry

Install the Anka Controller and Registry on your Linux-based EC2 instance. For more information about this set up and getting acquainted with the Anka Controller and Registry, go to the Anka documentation on [Setting up the Controller and Registry on Linux/Docker](https://docs.veertu.com/anka/anka-build-cloud/getting-started/setup-controller-and-registry/).

1. In the [AWS EC2 Console](https://console.aws.amazon.com/ec2/), launch a Linux-based instance. Make sure this instances has enough resources to support the Anka Controller and Registry, at least 10GB. Harness recommends a size of **t2-large** or greater or storage of 100 GiB.
2. [SSH into your Linux-based EC2 instance](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AccessingInstancesLinux.html).
3. [Install Docker](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/docker-basics.html#install_docker).
4. [Install Docker Compose](https://docs.docker.com/compose/install/).
5. Follow the [Docker Compose post-installation setup](https://docs.docker.com/install/linux/linux-postinstall/) so you can run `docker-compose` without `sudo`.
6. [Download and extract the Anka Docker Package.](https://docs.veertu.com/anka/anka-build-cloud/getting-started/setup-controller-and-registry/#download-and-extract-the-docker-package)
7. [Configure Anka settings in docker-compose.yml.](https://docs.veertu.com/anka/anka-build-cloud/getting-started/setup-controller-and-registry/#configuration)
8. Run `docker-compose up -d` to start the containers.
9. Run `docker ps -a` and verify the `anka-controller` and `anka-registry` containers are running.
10. Optionally, you can [enable token authentication for the Controller and Registry](https://docs.veertu.com/anka/anka-build-cloud/advanced-security-features/root-token-authentication/).

## Set up Anka Virtualization

After setting up the Anka Controller and Registry, you can set up [Anka Virtualization](https://docs.veertu.com/anka/anka-virtualization-cli/) on a Mac-based EC2 instance. For more information, go to [Anka on AWS EC2 Macs](https://docs.veertu.com/anka/aws-ec2-mac/). These instructions use an [Anka community AMI](https://docs.veertu.com/anka/aws-ec2-mac/#community-ami).

1. In AWS EC2, [allocate a dedicated host](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/how-dedicated-hosts-work.html#dedicated-hosts-allocating). For **Instance family**, select **mac-m2**.
2. [Launch an instance on the dedicated host](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/how-dedicated-hosts-work.html#launching-dedicated-hosts-instances), configured as follows:

   * Application and OS Images: Select **Browse AMIs** and select an [Anka community AMI](https://docs.veertu.com/anka/aws-ec2-mac/#community-ami). If you don't want to use a preconfigured AMI, you can use a different macOS AMI, but you'll need to take additional steps to [install Anka Virtualization](https://docs.veertu.com/anka/anka-virtualization-cli/getting-started/installing-the-anka-virtualization-package/) on the instance.
   * Instance type: Select a **mac-m2** instance.
   * Key pair: Select an existing key pair or create one.
   * Advanced details - Tenancy: Select **Dedicated host - Launch this instance on a dedicated host**
   * Advanced details - Target host by: Select **Host ID**
   * Advanced details - Tenancy host ID: Select your mac-m2 dedicated host.
   * User data: Refer to the Anka documentation on [User data](https://docs.veertu.com/anka/aws-ec2-mac/#user-data-envs).
   * Network settings: **Allow HTTP Traffic from the Internet** might be required to use virtualization platforms, such as VNC viewer.

    The first three minutes of this [Veertu YouTube video](https://www.youtube.com/watch?v=DoRaiMklIP0) briefly demonstrate the Anka community AMI set up process, include details about **User data**.

3. [Connect to your instance's GUI](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-mac-instances.html#connect-to-mac-instance:~:text=public%2Ddns%2Dname-,Connect%20to%20your%20instance%27s%20graphical%20user%20interface,-(GUI)).
4. Open a terminal and run `anka version` to check if Anka Virtualization is installed. If it is not, [Install Anka Virtualization](https://docs.veertu.com/anka/anka-virtualization-cli/getting-started/installing-the-anka-virtualization-package/).
5. Make sure the environment is updated and necessary packages are installed. For example, you can run `softwareupdate -i -a`.
6. [Join your Anka Virtualization node to the Controller](https://docs.veertu.com/anka/anka-build-cloud/getting-started/preparing-and-joining-your-nodes/)

## Create Anka VM templates

1. In your Anka Virtualization EC2 instance, [create one or more Anka VMs](https://docs.veertu.com/anka/anka-virtualization-cli/getting-started/creating-vms/#create-your-first-vm).

   Anka VMs created with `anka create` are [VM templates](https://docs.veertu.com/anka/anka-build-cloud/getting-started/registry-vm-templates-and-tags/). You can use these to create Vms on other Anka Virtualization nodes you launch in EC2.

2. Set up port forwarding on each VM template to enable connectivity between the Harness Runner and your Anka VMs. For each VM template, stop the VM and run the following command:

   ```
   anka modify $VM_NAME add port-forwarding service -g 9079
   ```

   For more information about `anka modify`, go to the Anka documentation on [Modifying your VM](https://docs.veertu.com/anka/anka-virtualization-cli/getting-started/modifying-your-vm/).

3. [Push your VM templates to the Registry.](https://docs.veertu.com/anka/anka-build-cloud/getting-started/preparing-and-joining-your-nodes/#push-the-vm-to-the-registry)

## Install the Harness Delegate and Runner

Install a Harness Docker Delegate and Runner on the Linux-based AWS EC2 instance where the Anka Controller and Registry are running.

### Configure pool.yml

The `pool.yml` file defines the VM pool size, the Anka Registry host location, and other information used to run your builds on Anka VMs. A pool is a group of instantiated VMs that are immediately available to run CI pipelines.

1. [SSH into your Linux-based EC2 instance](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AccessingInstancesLinux.html) where your Anka Controller and Registry are running.
2. Create a `/runner` folder and `cd` into it.

   ```
   mkdir /runner
   cd /runner
   ```

3. In the `/runner` folder, create a `pool.yml` file.
4. Modify `pool.yml` as described in the following example and the [Pool settings reference](#pool-settings-reference). You can configure multiple pools in pool.yml, but you can only specify one pool (by `name`) in each Build (`CI`) stage in Harness.

```yaml
version: "1"
instances:
 - name: anka-build
   default: true
   type: ankabuild
   pool: 2
   limit: 10
   platform:
     os: darwin
     arch: amd64
   spec:
     account:
       username: anka
       password: admin
     vm_id: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxx
     registry_url: https://anka-controller.myorg.com:8089
     tag: 1.0.6
     auth_token: sometoken
```

#### Pool settings reference

You can configure the following settings in your `pool.yml` file. You can also learn more in the Drone documentation for the [Pool File](https://docs.drone.io/runner/vm/configuration/pool/) and [Anka drivers](https://docs.drone.io/runner/vm/drivers/anka/).

| Setting | Type | Description |
| ------- | ---- | ----------- |
| `name` | String | Unique identifier of the pool. You will need to specify this pool name in Harness when you [set up the CI stage build infrastructure](#specify-build-infrastructure). |
| `pool` | Integer | Warm pool size number. Denotes the number of VMs in ready state to be used by the runner. |
| `limit` | Integer | Maximum number of VMs the runner can create at any time. `pool` indicates the number of warm VMs, and the runner can create more VMs on demand up to the `limit`.<br/>For example, assume `pool: 3` and `limit: 10`. If the runner gets a request for 5 VMs, it immediately provisions the 3 warm VMs (from `pool`) and provisions 2 more, which are not warm and take time to initialize. |
| `username`, `password` | Strings | User name and password of the Anka VM in the Anka Virtualization machine (the mac-m2 EC2 machine). These are set when you [run anka create](https://docs.veertu.com/anka/anka-virtualization-cli/getting-started/creating-vms/#:~:text=After%20executing%20anka%20create%2C%20Anka%20will%20automatically%20set%20up%20macOS%2C%20create%20the%20user%20anka%20with%20password%3A%20admin%2C%20disable%20SIP%2C%20and%20enable%20VNC%20for%20you.%20The%20VM%20will%20then%20be%20stopped.). |
| `vm_id` | String - ID | ID of the Anka VM. |
| `registry_url` | String - URL | Registry/Controller URL and port. This URL must be reachable by your Anka nodes. You can configure `ANKA_ANKA_REGISTRY` in your [Controller's docker-compose.yml](https://docs.veertu.com/anka/anka-build-cloud/configuration-reference/). |
| `tag` | String - Tag | [Anka VM template tag.](https://docs.veertu.com/anka/anka-build-cloud/getting-started/registry-vm-templates-and-tags/) |
| `auth_token` | String - Token | Required if you [enabled token authentication for the Controller and Registry](https://docs.veertu.com/anka/anka-build-cloud/advanced-security-features/root-token-authentication/). |

### Start the runner

[SSH into your Linux-based EC2 instance](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AccessingInstancesLinux.html) and run the following command to start the runner:

```
docker run -v /runner:/runner -p 3000:3000 drone/drone-runner-aws:latest  delegate --pool /runner/pool.yml
```

This command mounts the volume to the Docker runner container and provides access to `pool.yml`, which is used to authenticate with AWS and pass the spec for the pool VMs to the container. It also exposes port 3000.

You might need to modify the command to use sudo and specify the runner directory path, for example:

```
sudo docker run -v ./runner:/runner -p 3000:3000 drone/drone-runner-aws:latest  delegate --pool /runner/pool.yml
```

:::info What does the runner do?

When a build starts, the delegate receives a request for VMs on which to run the build. The delegate forwards the request to the runner, which then allocates VMs from the warm pool (specified by `pool` in `pool.yml`) and, if necessary, spins up additional VMs (up to the `limit` specified in `pool.yml`).

The runner includes lite engine, and the lite engine process triggers VM startup through a cloud init script. This script downloads and installs Scoop package manager, Git, the Drone plugin, and lite engine on the build VMs. The plugin and lite engine are downloaded from GitHub releases. Scoop is downloaded from `get.scoop.sh`.

Firewall restrictions can prevent the script from downloading these dependencies. Make sure your images don't have firewall or anti-malware restrictions that are interfering with downloading the dependencies.

:::

### Install the delegate

1. In Harness, go to **Account Settings**, select **Account Resources**, and then select **Delegates**.

   You can also create delegates at the project scope. In your Harness project, select **Project Settings**, and then select **Delegates**.

2. Select **New Delegate** or **Install Delegate**.
3. Select **Docker**.
4. Enter a **Delegate Name**.
5. Copy the delegate install command and paste it in a text editor.
6. To the first line, add `--network host`, and, if required, `sudo`. For example:

   ```
   sudo docker run --cpus=1 --memory=2g --network host
   ```

7. [SSH into your Linux-based EC2 instance](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AccessingInstancesLinux.html) and run the delegate install command.

:::tip

The delegate install command uses the default authentication token for your Harness account. If you want to use a different token, you can create a token and then specify it in the delegate install command:

1. In Harness, go to **Account Settings**, then **Account Resources**, and then select **Delegates**.
2. Select **Tokens** in the header, and then select **New Token**.
3. Enter a token name and select **Apply** to generate a token.
4. Copy the token and paste it in the value for `DELEGATE_TOKEN`.

:::

For more information about delegates and delegate installation, go to [Delegate installation overview](/docs/platform/delegates/install-delegates/overview).

### Verify connectivity

1. Verify that the delegate and runner containers are running correctly. You might need to wait a few minutes for both processes to start. You can run the following commands to check the process status:

	 ```
	 docker ps
	 docker logs DELEGATE_CONTAINER_ID
	 docker logs RUNNER_CONTAINER_ID
	 ```

2. In the Harness UI, verify that the delegate appears in the delegates list. It might take two or three minutes for the delegates list to update. Make sure the **Connectivity Status** is **Connected**. If the **Connectivity Status** is **Not Connected**, make sure the Docker host can connect to `https://app.harness.io`.

   ![](../static/set-up-an-aws-vm-build-infrastructure-13.png)

The delegate and runner are now installed, registered, and connected.

## Specify build infrastructure

Configure your pipeline's **Build** (`CI`) stage to use your Anka VMs as build infrastructure.


<Tabs>
  <TabItem value="Visual" label="Visual">


1. In Harness, go to the CI pipeline that you want to use the AWS VM build infrastructure.
2. Select the **Build** stage, and then select the **Infrastructure** tab.
3. Select **VMs**.
4. For **Operating System**, select **MacOS**.
5. Enter the **Pool Name** from your [pool.yml](#configure-poolyml).
6. Save the pipeline.

<!-- ![](../static/ci-stage-settings-vm-infra.png) -->

<DocImage path={require('../static/ci-stage-settings-vm-infra.png')} />


</TabItem>
  <TabItem value="YAML" label="YAML" default>


```yaml
    - stage:
        name: build
        identifier: build
        description: ""
        type: CI
        spec:
          cloneCodebase: true
          infrastructure:
            type: VM
            spec:
              type: Pool
              spec:
                poolName: POOL_NAME_FROM_POOL_YML
                os: MacOS
          execution:
            steps:
            ...
```


</TabItem>
</Tabs>

### Delegate selectors with self-managed VM build infrastructures

:::note

Currently, delegate selectors for self-managed VM build infrastructures is behind the feature flag `CI_ENABLE_VM_DELEGATE_SELECTOR`. Contact [Harness Support](mailto:support@harness.io) to enable the feature.

:::

Although you must install a delegate to use a self-managed VM build infrastructure, you can choose to use a different delegate for executions and cleanups in individual pipelines or stages. To do this, use [pipeline-level delegate selectors](/docs/platform/delegates/manage-delegates/select-delegates-with-selectors#pipeline-delegate-selector) or [stage-level delegate selectors](/docs/platform/delegates/manage-delegates/select-delegates-with-selectors#stage-delegate-selector).

Delegate selections take precedence in the following order:

1. Stage
2. Pipeline
3. Platform (build machine delegate)

This means that if delegate selectors are present at the pipeline and stage levels, then these selections override the platform delegate, which is the delegate that you installed on your primary VM with the runner. If a stage has a stage-level delegate selector, then it uses that delegate. Stages that don't have stage-level delegate selectors use the pipeline-level selector, if present, or the platform delegate.

For example, assume you have a pipeline with three stages called `alpha`, `beta`, and `gamma`. If you specify a stage-level delegate selector on `alpha` and you don't specify a pipeline-level delegate selector, then `alpha` uses the stage-level delegate, and the other stages (`beta` and `gamma`) use the platform delegate.

<details>
<summary>Early access feature: Use delegate selectors for codebase tasks</summary>

:::note

Currently, delegate selectors for CI codebase tasks is behind the feature flag `CI_CODEBASE_SELECTOR`. Contact [Harness Support](mailto:support@harness.io) to enable the feature.

:::

By default, delegate selectors aren't applied to delegate-related CI codebase tasks.

With this feature flag enabled, Harness uses your [delegate selectors](/docs/platform/delegates/manage-delegates/select-delegates-with-selectors) for delegate-related codebase tasks. Delegate selection for these tasks takes precedence in order of [pipeline selectors](/docs/platform/delegates/manage-delegates/select-delegates-with-selectors/#pipeline-delegate-selector) over [connector selectors](/docs/platform/delegates/manage-delegates/select-delegates-with-selectors/#infrastructure-connector).

</details>

##  Add more Mac nodes and VM templates to the Anka Registry

You can [launch more Anka Virtualization nodes on your EC2 dedicated host](#set-up-anka-virtualization) and [create more VM templates](#create-anka-vm-templates) as needed. After you join a Virtualization node to the Controller cluster, it can pull VM templates from the registry and use them to create VMs.

## Troubleshoot self-managed VM build infrastructure

Go to the [CI Knowledge Base](/kb/continuous-integration/continuous-integration-faqs) for questions and issues related to self-managed VM build infrastructures, including:

* [Can I use the same build VM for multiple CI stages?](/kb/continuous-integration/continuous-integration-faqs/#can-i-use-the-same-build-vm-for-multiple-ci-stages)
* [Why are build VMs running when there are no active builds?](/kb/continuous-integration/continuous-integration-faqs/#why-are-build-vms-running-when-there-are-no-active-builds)
* [How do I specify the disk size for a Windows instance in pool.yml?](/kb/continuous-integration/continuous-integration-faqs/#how-do-i-specify-the-disk-size-for-a-windows-instance-in-poolyml)
* [Clone codebase fails due to missing plugin](/kb/continuous-integration/continuous-integration-faqs/#clone-codebase-fails-due-to-missing-plugin)
* [Can I limit memory and CPU for Run Tests steps running on self-managed VM build infrastructure?](/kb/continuous-integration/continuous-integration-faqs/#can-i-limit-memory-and-cpu-for-run-tests-steps-running-on-harness-cloud)
