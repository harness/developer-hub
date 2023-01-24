---
title: Install the AWS CLI on a Delegate
description: If you want to run AWS CLI scripts on the Harness Delegate, you need to install the AWS CLI on its host(s). For example, you might add a Shell Script step in a Workflow that runs AWS CLI commands to…
sidebar_position: 160
helpdocs_topic_id: lei5kks8nc
helpdocs_category_id: gyd73rp7np
helpdocs_is_private: false
helpdocs_is_published: true
---

```mdx-code-block
import image_1 from './static/install-the-aws-cli-on-a-delegate-41.png'
import image_2 from './static/install-the-aws-cli-on-a-delegate-42.png'
import image_3 from './static/install-the-aws-cli-on-a-delegate-43.png'
```

If you want to run AWS CLI scripts on the Harness Delegate, you need to install the AWS CLI on its host(s).

For example, you might add a [Shell Script step](../../../continuous-delivery/model-cd-pipeline/workflows/capture-shell-script-step-output.md) in a Workflow that runs AWS CLI commands to describe instances.

You can add the installation script to a Harness Delegate Profile and then apply that Profile to all the Delegates you want.

:::note
You don't need to install the AWS CLI onto a Delegate to perform deployments in AWS. See [AWS AMI Quickstart](../../../first-gen-quickstarts/aws-ami-deployments.md), [AWS Lambda Quickstart](../../../first-gen-quickstarts/aws-lambda-deployments.md), [AWS CodeDeploy Quickstart](../../../first-gen-quickstarts/aws-code-deploy-quickstart.md), and [AWS ECS Quickstart](../../../first-gen-quickstarts/aws-ecs-deployments.md).
:::

In this topic:

* [Before You Begin](#before-you-begin)
* [Step 1: Create Delegate Profile](#step-1-create-delegate-profile)
* [Step 2: Add AWS CLI Installation Script](#step-2-add-aws-cli-installation-script)
* [Step 3: Apply Delegate Profile to Delegate](#step-3-apply-delegate-profile-to-delegate)
* [Step 4: Check Profile Status](#step-4-check-profile-status)
* [See Also](#see-also)

## Before You Begin

* [Harness Delegate Overview](delegate-installation.md)
* [Common Delegate Profile Scripts](../../techref-category/account-ref/delegate-ref/common-delegate-profile-scripts.md)
* [Installing the AWS CLI version 2 on Linux](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2-linux.html) from AWS
* [Using the Shell Script Step](../../../continuous-delivery/model-cd-pipeline/workflows/capture-shell-script-step-output.md)

## Step 1: Create Delegate Profile

1. In **Harness**, click **Setup**.
2. Click **Harness Delegates**.
3. Click **Manage Delegate Profiles**, and then click **Add Delegate Profile**. The **Manage Delegate Profile** settings appear.

```mdx-code-block
<img src={image_1} height="300" width="500" />
```

Next, we'll add the script for installing the AWS CLI.

:::note
For information on the **Delegate Requires Approval** setting, see [Approve or Reject Harness Delegates](approve-or-reject-harness-delegates.md).
:::

## Step 2: Add AWS CLI Installation Script

In **Startup Script**, enter the script to install the AWS CLI.

For example, the following Profile script installs the  [AWS CLI version 2](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2-linux.html) on the Delegate host.


```
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"  
unzip awscliv2.zip  
sudo ./aws/install
```
Ensure that the script can be run on the Linux operating system of the Delegate host. This example assumes the Delegate host(s) includes zip.

In some cases, the type of Delegate you use impacts the script. For example, a Docker Delegate won't need sudo.

When you are done, click **Submit**.

## Step 3: Apply Delegate Profile to Delegate

In the listing for the Delegate, in **Profile**, select the Delegate Profile you created.

When you are prompted to confirm, click **Confirm**.

```mdx-code-block
<img src={image_2} height="200" width="400" />
```

The message `Delegate profile Install AWS CLI saved successfully` appears.

Wait a few minutes for the Profile script to run on the Delegate host(s) and for Harness to receive any output.

The Profile status icon indicates whether the script ran successfully.

## Step 4: Check Profile Status

In the listing of the Delegate where you applied the profile, in **Profile**, click **View Logs**.

```mdx-code-block
<img src={image_3} height="300" width="500" />
```

:::note
If you see the message, `Profile execution log temporarily unavailable. Try again in a few moments`, the Delegate is still applying the script. Simply wait a few more minutes.
:::

You will see the successful output of the installation.

If the Profile does not work, change the script in the Profile and try again. To try the new Profile script, switch the Profile on the Delete to another Profile, such as Primary, and then back to the revised AWS CLI Profile.

## See Also

For a list of other script you can apply using Profiles, see [Common Delegate Profile Scripts](../../techref-category/account-ref/delegate-ref/common-delegate-profile-scripts.md).

