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

In this topic:

* [Before You Begin](https://ngdocs.harness.io/article/pt52h8sb6z#before_you_begin)
* [Step 1: Add a Secret Manager](https://ngdocs.harness.io/article/pt52h8sb6z-add-an-aws-kms-secrets-manager#step_1_add_secrets_manager)
* [Step 2: Overview](https://ngdocs.harness.io/article/pt52h8sb6z#step_2_overview)
* [Option: Credential Type](https://ngdocs.harness.io/article/pt52h8sb6z#option_credential_type)
* [Option: AWS Access Key](https://ngdocs.harness.io/article/pt52h8sb6z#option_aws_access_key)
	+ [AWS Access Key ID](https://ngdocs.harness.io/article/pt52h8sb6z#aws_access_key_id)
	+ [AWS Secret Access Key](https://ngdocs.harness.io/article/pt52h8sb6z#aws_secret_access_key)
	+ [AWS ARN](https://ngdocs.harness.io/article/pt52h8sb6z#aws_arn)
* [Option: Assume IAM Role on Delegate](https://ngdocs.harness.io/article/pt52h8sb6z#option_assume_iam_role_on_delegate)
* [Option: Assume Role using STS on Delegate](https://ngdocs.harness.io/article/pt52h8sb6z#option_assume_role_using_sts_on_delegate)
	+ [Role ARN](https://ngdocs.harness.io/article/pt52h8sb6z#role_arn)
	+ [External ID](https://ngdocs.harness.io/article/pt52h8sb6z#external_id)
	+ [Assume Role Duration (seconds)](https://ngdocs.harness.io/article/pt52h8sb6z#assume_role_duration_seconds)
* [Step 3: Test Connection](https://ngdocs.harness.io/article/pt52h8sb6z#step_3_test_connection)

### Before You Begin

* [Learn Harness' Key Concepts](/article/hv2758ro4e-learn-harness-key-concepts).
* [Harness Secret Manager Overview](/article/hngrlb7rd6-harness-secret-manager-overview).

### Step 1: Add a Secret Manager

This topic assumes you have a Harness Project set up. If not, see [Create Organizations and Projects](https://ngdocs.harness.io/article/36fw2u92i4-create-an-organization).

You can add a Connector from any module in your Project in Project setup, or in your Organization, or Account Resources.

In **Connectors**, click **Connector**.

In **Secret Managers**, click **AWS KMS**. The **AWS Key Management Service** settings appear.

![](https://files.helpdocs.io/i5nl071jo5/articles/pt52h8sb6z/1627881928900/aws-key-management-service-dialo.png)### Step 2: Overview

Enter **Name** for your secret manager.

You can choose to update the **ID** or let it be the same as your secret manager's name. For more information, see [Entity Identifier Reference](/article/li0my8tcz3-entity-identifier-reference).

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

![](https://files.helpdocs.io/i5nl071jo5/articles/pt52h8sb6z/1625570818189/screenshot-2021-07-06-at-4-54-51-pm.png)For more information, see [Finding the Key ID and ARN](https://docs.aws.amazon.com/kms/latest/developerguide/viewing-keys.html#find-cmk-id-arn) from Amazon.

#### AWS Access Key ID

Click **Create or Select a Secret**.

In the secret settings dialog, you can create/select a [Secret](/article/osfw70e59c-add-use-text-secrets) and enter your AWS Access Key as it's value.

The AWS Access Key is the AWS Access Key ID for the IAM user you want to use to connect to Secret Manager.

#### AWS Secret Access Key

Click **Create or Select a Secret**.

You can create a new [Secret](/article/osfw70e59c-add-use-text-secrets) with your Access Key ID's secret key as the **Secret Value**, or use an existing secret.

#### AWS ARN

Click **Create or Select a Secret**.

As explained above, you can create a new [Secret](/article/osfw70e59c-add-use-text-secrets) with your ARN as the **Secret Value**, or use an existing secret.

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

In **Delegates** **Setup****,** enter [**Selectors**](/article/nnuf8yv13o-select-delegates-with-selectors#option_select_a_delegate_for_a_connector_using_tags) for specific **Delegates** that you want to allow to connect to this Connector. Click **Save and Continue**.

### Step 4: Test Connection

In **Connection** **Test**, click **Finish** after your connection is successful**.**

