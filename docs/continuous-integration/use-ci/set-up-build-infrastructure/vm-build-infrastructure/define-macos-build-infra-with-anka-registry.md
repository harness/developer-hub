---
title: Set up a macOS VM build infrastructure with Anka Registry
description: Set up a Harness macOS build farm that uses an Anka registry and controller.
sidebar_position: 40
---

<DocsTag  text="Team plan" link="/docs/continuous-integration/ci-quickstarts/ci-subscription-mgmt" /> <DocsTag  text="Enterprise plan" link="/docs/continuous-integration/ci-quickstarts/ci-subscription-mgmt" />

:::note

Currently, this feature is behind the Feature Flag `CI_VM_INFRASTRUCTURE`. Contact [Harness Support](mailto:support@harness.io) to enable the feature.

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
* Familiarity with the [Harness Platform](/docs/get-started/key-concepts.md) and [CI pipeline creation](../../prep-ci-pipeline-components.md).
* Familiarity with Harness Delegates, VM runners, and pools.
  * [Harness Delegates](/docs/platform/delegates/delegate-concepts/delegate-overview)
  * [Drone VM runner overview](https://docs.drone.io/runner/vm/overview/)
  * [Drone pools](https://docs.drone.io/runner/vm/configuration/pool/)
  * [Drone Amazon drivers](https://docs.drone.io/runner/vm/drivers/amazon/)
  * [Drone Anka drivers](https://docs.drone.io/runner/vm/drivers/anka/)

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
10. Optionally, you can [enable token authentication for the controller and registry](https://docs.veertu.com/anka/anka-build-cloud/advanced-security-features/root-token-authentication/).

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
   * Inbound rules: Allow ingress on port 5900. This is required to [Connect to your instance's GUI](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-mac-instances.html#connect-to-mac-instance:~:text=public%2Ddns%2Dname-,Connect%20to%20your%20instance%27s%20graphical%20user%20interface,-(GUI)).

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

## Install the delegate and runner

Set up the Harness Delegate and Harness Runner.

For information about installing delegates, go to [Delegate installation overview](/docs/platform/delegates/install-delegates/overview).

<!-- need the command to launch to runner -->
<!-- need more info about pool.yml -->
<!-- move delegat & runner install step after the pool.yml config step -->

  * [GitHub repository - Drone runner AWS](https://github.com/drone-runners/drone-runner-aws)

## Set up the runner to communicate with the Anka controller

On the Harness runner host, update up the `pool.yml` file as shown in the following Harness Runner config example:

```yaml
version: "1"
instances: 
 - name: anka-build
   default: true
   type: ankabuild
   pool: 1
   limit: 100
   platform:
     os: darwin
     arch: amd64
   spec:
     account:
       username: anka-user
       password: admin
     vm_id: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxx
     registry_url: https://anka-controller.myorg.com:8089 #make sure to specify the controller URL
     tag: 1.0.6
     auth_token: sometoken
```
## Configure build infrastructure

In your Harness Project, go to a pipeline that includes a Build stage.

In the Infrastructure tab of the Build Stage, define your infrastructure as follows:

* Type = **VMs**
* Pool Name = The `name` field in your `pool.yml` file.
* OS = **MacOS**

Your macOS build infrastructure is now set up. You can now run your Build stages in your build infrastructure.

##  Add other Mac nodes and VM templates to the Anka registry

Now that you've gone through the entire end-to-end workflow, you can add more nodes and templates as needed. After you join a node to the cluster, it can pull templates from the registry and use them to create nodes.

:::note

Before you push each VM to the registry, make sure that you enable port forwarding as described in [Set up port forwarding on the VM](#set-up-port-forwarding-on-the-vm) above.

:::
