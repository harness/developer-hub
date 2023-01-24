---
title: Add an AWS KMS Secret Manager
description: To store and use encrypted secrets (such as access keys), you can add an AWS KMS Secrets Manager.
# sidebar_position: 2
helpdocs_topic_id: pt52h8sb6z
helpdocs_category_id: 48wnu4u0tj
helpdocs_is_private: false
helpdocs_is_published: true
---

To store and use encrypted secrets (such as access keys) and files, you can add an AWS KMS Secret Manager.

This topic describes how to add an AWS KMS Secret Manager in Harness.

### Before you begin

* [Learn Harness' Key Concepts](https://docs.harness.io/article/hv2758ro4e-learn-harness-key-concepts).
* [Harness Secret Manager Overview](../6_Security/1-harness-secret-manager-overview.md).

### Step 1: Add a Secret Manager

This topic assumes you have a Harness Project set up. If not, see [Create Organizations and Projects](../1_Organizations-and-Projects/2-create-an-organization.md).

You can add a Connector from any module in your Project in Project setup, or in your Organization, or Account Resources.

In **Connectors**, click **Connector**.

In **Secret Managers**, click **AWS KMS**. The **AWS Key Management Service** settings appear.

![](./static/add-an-aws-kms-secrets-manager-53.png)
### Step 2: Overview

Enter **Name** for your secret manager.

You can choose to update the **ID** or let it be the same as your secret manager's name. For more information, see [Entity Identifier Reference](../20_References/entity-identifier-reference.md).

Enter **Description** for your secret manager.

Enter **Tags** for your secret manager.

Click **Continue**.

### Option: Credential Type

You can select the following options for authenticating with AWS:

* **AWS Access Key.**
* **Assume IAM role on delegate.**
* **Assume Role using STS on delegate.**

### Option: AWS Access Key

Use your AWS IAM user login credentials.

Either from the JSON for the **Key Policy**, or in the AWS **IAM** console, under **Encryption keys,** gather the **AWS Access Key ID**, **AWS Secret Key**, and **Amazon Resource Name (ARN)**.

![](./static/add-an-aws-kms-secrets-manager-54.png)
For more information, see [Finding the Key ID and ARN](https://docs.aws.amazon.com/kms/latest/developerguide/viewing-keys.html#find-cmk-id-arn) from Amazon.

#### AWS Access Key ID

Click **Create or Select a Secret**.

In the secret settings dialog, you can create/select a [Secret](./2-add-use-text-secrets.md) and enter your AWS Access Key as it's value.

The AWS Access Key is the AWS Access Key ID for the IAM user you want to use to connect to Secret Manager.

#### AWS Secret Access Key

Click **Create or Select a Secret**.

You can create a new [Secret](./2-add-use-text-secrets.md) with your Access Key ID's secret key as the **Secret Value**, or use an existing secret.

#### AWS ARN

Click **Create or Select a Secret**.

As explained above, you can create a new [Secret](./2-add-use-text-secrets.md) with your ARN as the **Secret Value**, or use an existing secret.

### Option: Assume IAM Role on Delegate

If you select **Assume the IAM Role on Delegate** Harness will authenticate using the IAM role assigned to the AWS host running the Delegate, you select using a Delegate Selector.

### Option: Assume Role using STS on Delegate

This option uses the [AWS Security Token Service](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_temp.html) (STS) feature. Typically, you use `AssumeRole` within your account or for AWS cross-account access.

#### Role ARN

Enter the Amazon Resource Name (ARN) of the role that you want to assume. This is an IAM role in the target deployment AWS account.

#### External ID

If the administrator of the account to which the role belongs provided you with an external ID, then enter that value.

For more information, see [How to Use an External ID When Granting Access to Your AWS Resources to a Third Party](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_create_for-user_externalid.html) from AWS.

#### Assume Role Duration (seconds)

This is the AssumeRole Session Duration. See Session Duration in the [AssumeRole AWS docs](https://docs.aws.amazon.com/STS/latest/APIReference/API_AssumeRole.html).

### Step 3: Setup Delegates

In **Delegates** **Setup**, enter [**Selectors**](../2_Delegates/delegate-guide/select-delegates-with-selectors.md#option-select-a-delegate-for-a-connector-using-tags) for specific **Delegates** that you want to allow to connect to this Connector. Click **Save and Continue**.

### Step 4: Test Connection

In **Connection** **Test**, click **Finish** after your connection is successful**.**

