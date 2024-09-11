---
title: Set up an AWS VM build infrastructure
description: Set up a CI build infrastructure using AWS VMs.
sidebar_position: 10
canonical_url: https://www.harness.io/blog/harness-ci-aws-vms
helpdocs_topic_id: z56wmnris8
helpdocs_category_id: rg8mrhqm95
helpdocs_is_private: false
helpdocs_is_published: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<DocsTag  text="Team plan" link="/docs/continuous-integration/ci-quickstarts/ci-subscription-mgmt" /> <DocsTag  text="Enterprise plan" link="/docs/continuous-integration/ci-quickstarts/ci-subscription-mgmt" />

:::note

Currently, this feature is behind the Feature Flag `CI_VM_INFRASTRUCTURE`. Contact [Harness Support](mailto:support@harness.io) to enable the feature.

:::

This topic describes how to use AWS VMs as Harness CI build infrastructure. To do this, you will create an Ubuntu VM and install a Harness Delegate and Drone VM Runner on it. The runner creates VMs dynamically in response to CI build requests. You can also configure the runner to hibernate AWS Linux and Windows VMs when they aren't needed.

This is one of several CI build infrastructure options. For example, you can also [set up a Kubernetes cluster build infrastructure](../k8s-build-infrastructure/set-up-a-kubernetes-cluster-build-infrastructure.md).

The following diagram illustrates a CI build farm using AWS VMs. The [Harness Delegate](/docs/platform/delegates/delegate-concepts/delegate-overview) communicates directly with your Harness instance. The [VM runner](https://docs.drone.io/runner/vm/overview/) maintains a pool of VMs for running builds. When the delegate receives a build request, it forwards the request to the runner, which runs the build on an available VM.

![](../static/set-up-an-aws-vm-build-infrastructure-12.png)

:::info

This is an advanced configuration. Before beginning, you should be familiar with:

* Using the AWS EC2 console and interacting with AWS VMs.
* [Harness key concepts](/docs/platform/get-started/key-concepts.md)
* [CI pipeline creation](../../prep-ci-pipeline-components.md)
* [Harness Delegates](/docs/platform/delegates/delegate-concepts/delegate-overview)
* Drone VM Runners and pools:
  * [Drone documentation - VM runner overview](https://docs.drone.io/runner/vm/overview/)
  * [Drone documentation - Drone Pool](https://docs.drone.io/runner/vm/configuration/pool/)
  * [Drone documentation - Amazon drivers](https://docs.drone.io/runner/vm/drivers/amazon/)
  * [GitHub repository - Drone runner AWS](https://github.com/drone-runners/drone-runner-aws)

:::

## Prepare the AWS EC2 instance

These are the requirements to configure the AWS EC2 instance. This instance is the primary VM where you will host your Harness Delegate and runner.

### Configure authentication for the EC2 instance

The recommended authentication method is an [IAM role](https://console.aws.amazon.com/iamv2/home#/users) with an access key and secret ([AWS secret](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html#Using_CreateAccessKey)). You can use an access key and secret without an IAM role, but this is not recommended for security reasons.

1. Create or select an IAM role for the primary VM instance. This IAM role must have CRUD permissions on EC2. This role provides the runner with temporary security credentials to create VMs and manage the build pool. For details, go to the Amazon documentation on [AmazonEC2FullAccess Managed policy](https://docs.aws.amazon.com/aws-managed-policy/latest/reference/AmazonEC2FullAccess.html).
2. If you plan to run Windows builds, go to the AWS documentation for [additional configuration for Windows IAM roles for tasks](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task-iam-roles.html#windows_task_IAM_roles). This additional configuration is required because containers running on Windows can't directly access the IAM profile on the host. For example, you must add the [AdministratorAccess policy](https://docs.aws.amazon.com/IAM/latest/UserGuide/getting-started_create-admin-group.html) to the IAM role associated with the access key and access secret.
3. If you haven't done so already, create an access key and secret for the IAM role.

### Launch the EC2 instance

1. In the [AWS EC2 Console](https://console.aws.amazon.com/ec2/), launch a VM instance that will host your Harness Delegate and runner. This instance must use an Ubuntu AMI that is `t2.large` or greater.

   The primary VM must be Ubuntu. The build VMs (in your VM pool) can be Ubuntu, AWS Linux, or Windows Server 2019 or higher. All machine images must have Docker installed.

2. Attach a key pair to your EC2 instance. Create a key pair if you don't already have one.
3. You don't need to enable **Allow HTTP/HTTPS traffic**.

### Configure ports and security group settings

1. Create a Security Group in the EC2 console. You need the Security Group ID to configure the runner. For information on creating Security Groups, go to the AWS documentation on [authorizing inbound traffic for your Linux instances](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/authorizing-access-to-an-instance.html).
2. In the Security Group's **Inbound Rules**, allow ingress on port 9079. This is required for security groups within the VPC.
3. In the EC2 console, go to your EC2 VM instance's **Inbound Rules**, and allow ingress on port 22.
4. If you want to run Windows builds and be able to RDP into your build VMs, you must also allow ingress on port 3389.
5. Set up VPC firewall rules for the build instances on EC2.

### Install Docker and attach IAM role

1. [SSH into your EC2 instance](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AccessingInstancesLinux.html).
2. [Install Docker](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/docker-basics.html#install_docker).
3. [Install Docker Compose](https://docs.docker.com/compose/install/).
4. Attach the IAM role to the EC2 VM. For instructions, go to the AWS documentation on [attaching an IAM role to an instance](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/iam-roles-for-amazon-ec2.html#attach-iam-role).

### Use a custom Windows AMI

If you plan to use a custom Windows AMI in your AWS VM build farm, you must delete `state.run-once` from your custom AMI.

In Windows, sysprep checks if `state.run-once` exists at `C:\ProgramData\Amazon\EC2Launch\state.run-once`. If the file exists, sysprep doesn't run post-boot scripts (such as `cloudinit`, which is required for Harness VM build infrastructure). Therefore, you must delete this file from your AMI so it doesn't block the VM init script.

If you get an error about an unrecognized `refreshenv` command, you might need to [install Chocolatey](https://chocolatey.org/install) and add it to `$profile` to enable the `refreshenv` command.

## Configure the Drone pool on the AWS VM

<!-- This isn't possible anymore because of the new delegate install UI.

:::tip Option: Use Terraform

If you have Terraform and Go installed on your EC2 environment, you can use the [cie-vm-delegate script](https://github.com/harness/cie-vm-delegate). Follow the setup instructions described in the script's README.-->

<!-- Might need these steps - I think the Terraform workflow still uses docker-compose:

When you reach the step to download the delegate YAML, follow these steps to get the docker-compose.yaml file:

1. In your Harness account, organization, or project, select **Delegates** under **Project Settings**.
2. Click **New Delegate** and select **Switch back to old delegate install experience**.
3. Select **Docker** and then select **Continue**.
4. Enter a **Delegate Name**. Optionally, you can add **Tags** or **Delegate Tokens**. Then, select **Continue**.
5. Select **Download YAML file** to download the `docker-compose.yaml` file to your local machine.

You may need to add the runner spec to the delegate definition:

1. Append the following to the end of the `docker-compose.yaml` file:

   ```yaml
   drone-runner-aws:  
       restart: unless-stopped  
       image: drone/drone-runner-aws
       network_mode: "host" 
       volumes:  
        - /runner:/runner  
       entrypoint: ["/bin/drone-runner-aws", "delegate", "--pool", "pool.yml"]  
       working_dir: /runner
   ```

2. Under `services: harness-ng-delegate: restart: unless-stopped`, add the following line:

   ```yaml
   network_mode: "host"
   ```

The Harness Delegate and runner run on the same VM. The runner communicates with the Harness Delegate on `localhost` and port `3000` of your VM.

:::
-->

The `pool.yml` file defines the VM spec and pool size for the VM instances used to run the pipeline. A pool is a group of instantiated VMs that are immediately available to run CI pipelines. You can configure multiple pools in `pool.yml`, such as a Windows VM pool and a Linux VM pool. To avoid unnecessary costs, you can configure `pool.yml` to hibernate VMs when not in use.

1. Create a `/runner` folder on your delegate VM and `cd` into it:

   ```
   mkdir /runner
   cd /runner
   ```

2. In the `/runner` folder, create a `pool.yml` file.
3. Modify `pool.yml` as described in the following example and the [Pool settings reference](#pool-settings-reference).

### Example pool.yml

The following `pool.yml` example defines both an Ubuntu pool and a Windows pool.

```yaml
version: "1"
instances:
  - name: ubuntu-ci-pool ## The settings nested below this define the Ubuntu pool.
    default: true
    type: amazon
    pool: 1
    limit: 4
    platform:
      os: linux
      arch: amd64
    spec:
      account:
        region: us-east-2 ## To minimize latency, use the same region as the delegate VM.
        availability_zone: us-east-2c ## To minimize latency, use the same availability zone as the delegate VM.
        access_key_id: XXXXXXXXXXXXXXXXX
        access_key_secret: XXXXXXXXXXXXXXXXXXX
        key_pair_name: XXXXX
      ami: ami-051197ce9cbb023ea
      size: t2.nano
      iam_profile_arn: arn:aws:iam::XXXX:instance-profile/XXXXX
      network:
        security_groups:
        - sg-XXXXXXXXXXX
  - name: windows-ci-pool ## The settings nested below this define the Windows pool.
    default: true
    type: amazon
    pool: 1
    limit: 4
    platform:
      os: windows
    spec:
      account:
        region: us-east-2 ## To minimize latency, use the same region as the delegate VM.
        availability_zone: us-east-2c ## To minimize latency, use the same availability zone as the delegate VM.
        access_key_id: XXXXXXXXXXXXXXXXXXXXXX
        access_key_secret: XXXXXXXXXXXXXXXXXXXXXX
        key_pair_name: XXXXX
      ami: ami-088d5094c0da312c0
      size: t3.large
      hibernate: true
      network:
        security_groups:
        - sg-XXXXXXXXXXXXXX
```

### Pool settings reference

You can configure the following settings in your `pool.yml` file. You can also learn more in the Drone documentation for the [Pool File](https://docs.drone.io/runner/vm/configuration/pool/) and [Amazon drivers](https://docs.drone.io/runner/vm/drivers/amazon/).

| Setting | Type | Example | Description |
| ------- | ---- | ------- | ----------- |
| `name` | String | `name: windows_pool` | Unique identifier of the pool. You will need to specify this pool name in Harness when you [set up the CI stage build infrastructure](#specify-build-infrastructure). |
| `pool` | Integer | `pool: 1` | Warm pool size number. Denotes the number of VMs in ready state to be used by the runner. |
| `limit` | Integer | `limit: 3` | Maximum number of VMs the runner can create at any time. `pool` indicates the number of warm VMs, and the runner can create more VMs on demand up to the `limit`.<br/>For example, assume `pool: 3` and `limit: 10`. If the runner gets a request for 5 VMs, it immediately provisions the 3 warm VMs (from `pool`) and provisions 2 more, which are not warm and take time to initialize. |
| `platform` | Key-value pairs, strings | Go to [platform example](#platform-example). | Specify VM platform operating system (`os: linux` or `os: windows`). `arch` and `variant` are optional. `os_name: amazon-linux` is required for AL2 AMIs. The default configuration is `os: linux` and `arch: amd64`. |
| `spec` | Key-value pairs, various | Go to [Example pool.yml](#example-poolyml) and the examples in the following rows. | Configure settings for the build VMs and AWS instance. Contains a series of individual and mapped settings, including `account`, `tags`, `ami`, `size`, `hibernate`, `iam_profile_arn`, `network`, `user_data`, `user_data_path`, and `disk`. Details about these settings are provided below. |
| `account` | Key-value pairs, strings | Go to [account example](#account-example). | AWS account configuration, including region and access key authentication.<br/><ul><li>`region`: AWS region. To minimize latency, use the same region as the delegate VM.</li><li>`availability_zone`: AWS region availability zone. To minimize latency, use the same availability zone as the delegate VM.</li><li>`access_key_id`: The AWS access key for authentication. If using an IAM role, this is the access key associated with the IAM role.</li><li>`access_key_secret`: The secret associated with the specified `access_key_id`.</li><li>`key_pair_name`: The key pair name specified when you set up the EC2 instance. Don't include `.pem`. </li></ul> |
| `tags` | Key-vale pairs, strings | Go to [tags example](#tags-example). | Optional tags to apply to the instance. |
| `ami` | String | `ami: ami-092f63f22143765a3` | The AMI ID. You can use the same AMI as your EC2 instance or [search for AMIs](https://cloud-images.ubuntu.com/locator/ec2/) in your Availability Zone for supported models (Ubuntu, AWS Linux, Windows 2019+). AMI IDs differ by Availability Zone. |
| `size` | String | `size: t3.large` | The AMI size, such as `t2.nano`, `t2.micro`, `m4.large`, and so on. Make sure the size is large enough to handle your builds. |
| `hibernate` | Boolean | `hibernate: true` | When set to `true` (which is the default), VMs hibernate after startup. When `false`, VMs are always in a running state. This option is supported for AWS Linux and Windows VMs. Hibernation for Ubuntu VMs is not currently supported. For more information, go to the AWS documentation on [hibernating on-demand Linux instances](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/Hibernate.html). |
| `iam_profile_arn` | String | `iam_profile_arn: arn:aws:iam::XXXX:instance-profile/XXX` | If using IAM roles, this is the instance profile ARN of the IAM role to apply to the build instances. |
| `network` | Key-value pairs, various | Go to [network example](#network-example). | AWS network information, including security groups. For more information on these attributes, go to the AWS documentation on [creating security groups](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/get-set-up-for-amazon-ec2.html#create-a-base-security-group).<br/><ul><li>`security_groups`: List of security group IDs as strings.</li><li>`vpc`: If using VPC, this is the VPC ID as an integer.</li><li>`vpc_security_groups`: If using VPC, this is a list of VPC security group IDs as strings.</li><li>`private_ip`: Boolean.</li><li>`subnet_id`: The subnet ID as a string.</li></ul> |
| `user_data` or `user_data_path` | Key-value pairs, strings | Go to [user data example](#user-data-example). | Define custom user data to apply to the instance. Provide [cloud-init data](https://docs.drone.io/runner/vm/configuration/cloud-init/) either directly in `user_data` or as a path to a file in `user_data_path`. |
| `disk` | Key-value pairs, various | Go to [disk example](#disk-example). | Optional AWS block information.<br/><ul><li>`size`: Integer, size in GB.</li><li>`type`: `gp2`, `io1`, or `standard`.</li><li>`iops`: If `type: io1`, then `iops: iops`.</li></ul> |

#### platform example

```yaml
    instance:
      platform:
        os: linux
        arch: amd64
        version:
        os_name: amazon-linux
```

#### account example

```yaml
      account:
        region: us-east-2
        availability_zone: us-east-2c
        access_key_id: XXXXX
        access_key_secret: XXXXX
        key_pair_name: XXXXX
```

#### tags example

```yaml
      tags:
        owner: USER
        ttl: '-1'
```

#### network example

```yaml
      network:
        private_ip: true
        subnet_id: subnet-XXXXXXXXXX
        security_groups:
          - sg-XXXXXXXXXXXXXX
```

#### user data example

Provide [cloud-init data](https://docs.drone.io/runner/vm/configuration/cloud-init/) in either `user_data_path` or `user_data`.

```yaml
      user_data_path: /path/to/custom/user-data.yml
```

```yaml
      user_data: |
        #cloud-config
        apt:
          sources:
            docker.list:
              source: deb [arch={{ .Architecture }}] https://download.docker.com/linux/ubuntu $RELEASE stable
              keyid: KEY_TO_IMPORT
        packages:
        - wget
        - docker-ce
        write_files:
        - path: {{ .CaCertPath }}
          permissions: '0600'
          encoding: b64
          content: {{ .CACert | base64  }}
        - path: {{ .CertPath }}
          permissions: '0600'
          encoding: b64
          content: {{ .TLSCert | base64 }}
        - path: {{ .KeyPath }}
          permissions: '0600'
          encoding: b64
          content: {{ .TLSKey | base64 }}
        runcmd:
        - 'wget "{{ .LiteEnginePath }}/lite-engine-{{ .Platform }}-{{ .Architecture }}" -O /usr/bin/lite-engine'
        - 'chmod 777 /usr/bin/lite-engine'
        - 'touch /root/.env'
        - 'touch /tmp/some_directory'
        - '/usr/bin/lite-engine server --env-file /root/.env > /var/log/lite-engine.log 2>&1 &'
```

#### disk example

```yaml
      disk:
        size: 16
        type: io1
        iops: iops
```

## Start the runner

[SSH into your EC2 instance](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AccessingInstancesLinux.html) and run the following command to start the runner:

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

Firewall restrictions can prevent the script from downloading these dependencies. Make sure your images don't have firewall or anti-malware restrictions that are interfering with downloading the dependencies. For more information, go to [Troubleshooting](#troubleshooting).

:::

## Install the delegate

Install a Harness Docker Delegate on your AWS EC2 instance.

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

7. [SSH into your EC2 instance](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AccessingInstancesLinux.html) and run the delegate install command.

:::tip

The delegate install command uses the default authentication token for your Harness account. If you want to use a different token, you can create a token and then specify it in the delegate install command:

1. In Harness, go to **Account Settings**, then **Account Resources**, and then select **Delegates**.
2. Select **Tokens** in the header, and then select **New Token**.
3. Enter a token name and select **Apply** to generate a token.
4. Copy the token and paste it in the value for `DELEGATE_TOKEN`.

:::

For more information about delegates and delegate installation, go to [Delegate installation overview](/docs/platform/delegates/install-delegates/overview).

## Verify connectivity

1. Verify that the delegate and runner containers are running correctly. You might need to wait a few minutes for both processes to start. You can run the following commands to check the process status:

	 ```
	 docker ps
	 docker logs DELEGATE_CONTAINER_ID
	 docker logs RUNNER_CONTAINER_ID
	 ```

2. In the Harness UI, verify that the delegate appears in the delegates list. It might take two or three minutes for the Delegates list to update. Make sure the **Connectivity Status** is **Connected**. If the **Connectivity Status** is **Not Connected**, make sure the Docker host can connect to `https://app.harness.io`.

   ![](../static/set-up-an-aws-vm-build-infrastructure-13.png)

The delegate and runner are now installed, registered, and connected.

## Specify build infrastructure

Configure your pipeline's **Build** (`CI`) stage to use your AWS VMs as build infrastructure.

<Tabs>
  <TabItem value="Visual" label="Visual">

1. In Harness, go to the CI pipeline that you want to use the AWS VM build infrastructure.
2. Select the **Build** stage, and then select the **Infrastructure** tab.
3. Select **VMs**.
4. Enter the **Pool Name** from your [pool.yml](#configure-the-drone-pool-on-the-aws-vm).
5. Save the pipeline.

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
                os: Linux
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

## Troubleshoot AWS VM build infrastructure

Go to the [CI Knowledge Base](/kb/continuous-integration/continuous-integration-faqs) for questions and issues related to self-managed VM build infrastructures, including:

* [Build VM creation fails with no default VPC](/kb/continuous-integration/continuous-integration-faqs/#aws-build-vm-creation-fails-with-no-default-vpc)
* [AWS VM builds stuck at the initialize step on health check](/kb/continuous-integration/continuous-integration-faqs/#aws-vm-builds-stuck-at-the-initialize-step-on-health-check)
* [Delegate connected but builds fail](/kb/continuous-integration/continuous-integration-faqs/#aws-vm-delegate-connected-but-builds-fail)
* [Use internal or custom AMIs](/kb/continuous-integration/continuous-integration-faqs/#use-internal-or-custom-amis-with-self-managed-aws-vm-build-infrastructure)
* [Where can I find self-managed VM lite engine and cloud init output logs?](/kb/continuous-integration/continuous-integration-faqs/#where-can-i-find-logs-for-self-managed-aws-vm-lite-engine-and-cloud-init-output)
* [Can I use the same build VM for multiple CI stages?](/kb/continuous-integration/continuous-integration-faqs/#can-i-use-the-same-build-vm-for-multiple-ci-stages)
* [Why are build VMs running when there are no active builds?](/kb/continuous-integration/continuous-integration-faqs/#why-are-build-vms-running-when-there-are-no-active-builds)
* [How do I specify the disk size for a Windows instance in pool.yml?](/kb/continuous-integration/continuous-integration-faqs/#how-do-i-specify-the-disk-size-for-a-windows-instance-in-poolyml)
* [Clone codebase fails due to missing plugin](/kb/continuous-integration/continuous-integration-faqs/#clone-codebase-fails-due-to-missing-plugin)
* [Can I limit memory and CPU for Run Tests steps running on self-managed VM build infrastructure?](/kb/continuous-integration/continuous-integration-faqs/#can-i-limit-memory-and-cpu-for-run-tests-steps-running-on-harness-cloud)
