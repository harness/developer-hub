---
title: Add an AWS KMS Secrets Manager
description: To store and use encrypted secrets (such as access keys), you can add an AWS KMS Secrets Manager.
# sidebar_position: 2
helpdocs_topic_id: qj4psb5vsf
helpdocs_category_id: o9x167at52
helpdocs_is_private: false
helpdocs_is_published: true
---

This content is for Harness [FirstGen](https://docs.harness.io/article/1fjmm4by22). Switch to [NextGen](/article/pt52h8sb6z-add-an-aws-kms-secrets-manager).To store and use encrypted secrets (such as access keys) and files, you can add an AWS KMS Secrets Manager.

In this topic:

* [Before You Begin](https://docs.harness.io/article/qj4psb5vsf-add-an-aws-kms-secrets-manager#before_you_begin)
* [Step 1: Configure Secrets Manager](https://docs.harness.io/article/qj4psb5vsf-add-an-aws-kms-secrets-manager#step_1_configure_secrets_manager)
* [Step 2: Display Name](https://docs.harness.io/article/qj4psb5vsf-add-an-aws-kms-secrets-manager#step_2_display_name)
* [Option: Credentials Type](https://docs.harness.io/article/qj4psb5vsf-add-an-aws-kms-secrets-manager#option_credentials_type)
* [Option: Assume IAM Role on Delegate](https://docs.harness.io/article/qj4psb5vsf-add-an-aws-kms-secrets-manager#option_assume_iam_role_on_delegate)
	+ [Delegate Selector](https://docs.harness.io/article/qj4psb5vsf-add-an-aws-kms-secrets-manager#delegate_selector)
* [Option: AWS Access Keys Manually](https://docs.harness.io/article/qj4psb5vsf-add-an-aws-kms-secrets-manager#option_aws_access_keys_manually)
	+ [Access Key](https://docs.harness.io/article/qj4psb5vsf-add-an-aws-kms-secrets-manager#access_key)
	+ [Secret Key](https://docs.harness.io/article/qj4psb5vsf-add-an-aws-kms-secrets-manager#secret_key)
* [Option: Assume Role Using STS on Delegate](https://docs.harness.io/article/qj4psb5vsf-add-an-aws-kms-secrets-manager#option_assume_role_using_sts_on_delegate)
	+ [Role ARN](https://docs.harness.io/article/qj4psb5vsf-add-an-aws-kms-secrets-manager#role_arn)
	+ [External ID](https://docs.harness.io/article/qj4psb5vsf-add-an-aws-kms-secrets-manager#external_id)
	+ [Assume Role Duration](https://docs.harness.io/article/qj4psb5vsf-add-an-aws-kms-secrets-manager#assume_role_duration)
* [Step 3: Key ARN](https://docs.harness.io/article/qj4psb5vsf-add-an-aws-kms-secrets-manager#step_3_key_arn)
* [Step 4: Region](https://docs.harness.io/article/qj4psb5vsf-add-an-aws-kms-secrets-manager#step_4_region)
* [Step 5: Usage Scope](https://docs.harness.io/article/qj4psb5vsf-add-an-aws-kms-secrets-manager#step_5_usage_scope)

### Before You Begin

* See [Harness Key Concepts](/article/4o7oqwih6h-harness-key-concepts).
* See [Secrets Management Overview](/article/au38zpufhr-secret-management).

### Step 1: Configure Secrets Manager

1. In **Security**, select **Secrets Management**, and then click **Configure Secrets Managers.**  
In the **Secrets Managers** page, the **Status** column indicates the **Default** provider.
2. Click **Add Secrets Manager**. The **Configure Secrets Manager** settings appear.
3. Select **AWS KMS** from the drop-down list.

### Step 2: Display Name

Enter a name for this secrets manager.

### Option: Credentials Type

You can select the following options for authenticating with AWS:

* **Assume IAM Role on Delegate.**
* **Enter AWS Access Keys Manually**.
* **Assume Role Using STS on Delegate.**

### Option: Assume IAM Role on Delegate

If you select **Assume the IAM Role on Delegate**, Harness will authenticate using the IAM role assigned to the AWS host running the Delegate you select using a Delegate Selector.

#### Delegate Selector

In **Delegate Selector**, enter the Selector of the Delegate that this Secrets Manager will use for all connections. For information about Selectors, see [Select Delegates for Specific Tasks with Selectors](https://docs.harness.io/article/c3fvixpgsl-select-delegates-for-specific-tasks-with-selectors).

### Option: AWS Access Keys Manually

Use your AWS IAM user login credentials.

Either from the JSON for the **Key Policy**, or in the AWS **IAM** console, under **Encryption keys,** gather the **AWS Access Key ID**, **AWS Secret Key**, and **AWS Resource Name (ARN)**.

For more information, see [Finding the Key ID and ARN](https://docs.aws.amazon.com/kms/latest/developerguide/viewing-keys.html#find-cmk-id-arn) from Amazon.

#### Access Key

The AWS Access Key ID for the IAM user you want to use to connect to Secrets Manager.

#### Secret Key

Paste in the contents of the Secret Key corresponding to the Access Key ID.

### Option: Assume Role Using STS on Delegate

This option uses the [AWS Security Token Service](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_temp.html) (STS) feature. Typically, you use `AssumeRole` within your account or for AWS cross-account access.

#### Role ARN

Enter the Amazon Resource Name (ARN) of the role that you want to assume. This is an IAM role in the target deployment AWS account.

#### External ID

If the administrator of the account to which the role belongs provided you with an external ID, then enter that value.

For more information, see [How to Use an External ID When Granting Access to Your AWS Resources to a Third Party](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_create_for-user_externalid.html) from AWS.

#### Assume Role Duration

This is the AssumeRole Session Duration. See Session Duration in the [AssumeRole AWS docs](https://docs.aws.amazon.com/STS/latest/APIReference/API_AssumeRole.html).

### Step 3: Key ARN

Enter the Amazon Resource Name (ARN) for the customer master key (CMK).

### Step 4: Region

Select the AWS Region for the Secrets Manager.

### Step 5: Usage Scope

See [Scope Secret Managers to Applications and Environments](/article/e4ikpd00f6-scope-secret-managers-to-applications-and-environments).

