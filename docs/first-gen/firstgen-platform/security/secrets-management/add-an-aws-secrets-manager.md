---
title: Add an AWS Secrets Manager
description: You can use AWS Secrets Manager for your Harness secrets.
# sidebar_position: 2
helpdocs_topic_id: otkxijqoa6
helpdocs_category_id: o9x167at52
helpdocs_is_private: false
helpdocs_is_published: true
---

This content is for Harness [FirstGen](https://docs.harness.io/article/1fjmm4by22). Switch to [NextGen](/article/a73o2cg3pe-add-an-aws-secret-manager).You can use AWS Secrets Manager for your Harness secrets. AWS Secrets Manager differs from AWS KMS in that AWS Secrets Manager stores both secrets and encryption keys whereas with AWS KMS, Harness stores the secret in its Harness store and retrieves the encryption keys from KMS.

In this topic:

* [Before You Begin](https://docs.harness.io/article/otkxijqoa6-add-an-aws-secrets-manager#before_you_begin)
* [Permissions: Test AWS Permissions](https://docs.harness.io/article/otkxijqoa6-add-an-aws-secrets-manager#permissions_test_aws_permissions)
* [Step 1: Configure Secrets Manager](https://docs.harness.io/article/otkxijqoa6-add-an-aws-secrets-manager#step_1_configure_secrets_manager)
* [Step 2: Display Name](https://docs.harness.io/article/otkxijqoa6-add-an-aws-secrets-manager#step_2_display_name)
* [Option: Credentials Type](https://docs.harness.io/article/otkxijqoa6-add-an-aws-secrets-manager#option_credentials_type)
* [Option: Assume IAM Role on Delegate](https://docs.harness.io/article/otkxijqoa6-add-an-aws-secrets-manager#option_assume_iam_role_on_delegate)
	+ [Delegate Selector](https://docs.harness.io/article/otkxijqoa6-add-an-aws-secrets-manager#delegate_selector)
* [Option: AWS Access Keys Manually](https://docs.harness.io/article/otkxijqoa6-add-an-aws-secrets-manager#option_aws_access_keys_manually)
	+ [Access Key](https://docs.harness.io/article/otkxijqoa6-add-an-aws-secrets-manager#access_key)
	+ [Secret Key](https://docs.harness.io/article/otkxijqoa6-add-an-aws-secrets-manager#secret_key)
* [Option: Assume Role Using STS on Delegate](https://docs.harness.io/article/otkxijqoa6-add-an-aws-secrets-manager#option_assume_role_using_sts_on_delegate)
	+ [Role ARN](https://docs.harness.io/article/otkxijqoa6-add-an-aws-secrets-manager#role_arn)
	+ [External ID](https://docs.harness.io/article/otkxijqoa6-add-an-aws-secrets-manager#external_id)
	+ [Assume Role Duration](https://docs.harness.io/article/otkxijqoa6-add-an-aws-secrets-manager#assume_role_duration)
* [Step 3: Secret Name Prefix](https://docs.harness.io/article/otkxijqoa6-add-an-aws-secrets-manager#step_3_secret_name_prefix)
* [Step 4: Region](https://docs.harness.io/article/otkxijqoa6-add-an-aws-secrets-manager#step_4_region)
* [Step 5: Usage Scope](https://docs.harness.io/article/otkxijqoa6-add-an-aws-secrets-manager#step_5_usage_scope)
* [Limitations](https://docs.harness.io/article/otkxijqoa6-add-an-aws-secrets-manager#limitations)

### Before You Begin

* See [Harness Key Concepts](/article/4o7oqwih6h-harness-key-concepts).
* See [Secrets Management Overview](/article/au38zpufhr-secret-management).

### Permissions: Test AWS Permissions

Harness uses the same minimum IAM policies for AWS secret manager access as the AWS CLI.

The AWS account you use for the AWS Secret Manager must have the following policies at a minimum:


```
{  
    "Version": "2012-10-17",  
    "Statement": {  
        "Effect": "Allow",  
        "Action": [  
            "secretsmanager:Describe*",  
            "secretsmanager:Get*",  
            "secretsmanager:List*"   
        ],  
        "Resource": "*"  
    }  
}
```
These policies let you list secrets which will allow you to add the Secrets Manager and refer to secrets, but it will not let you read secrets values.

The following policy list lets Harness perform all the secrets operations you might need:


```
{  
    "Version": "2012-10-17",  
    "Statement": {  
        "Effect": "Allow",  
        "Action": [  
          "secretsmanager:CreateSecret",  
          "secretsmanager:DescribeSecret",  
          "secretsmanager:DeleteSecret",  
          "secretsmanager:GetRandomPassword",  
          "secretsmanager:GetSecretValue",  
          "secretsmanager:ListSecretVersionIds",  
          "secretsmanager:ListSecrets",  
          "secretsmanager:PutSecretValue",  
          "secretsmanager:UpdateSecret"   
        ],  
        "Resource": "*"  
    }  
}
```
See [Using Identity-based Policies (IAM Policies) for Secrets Manager](https://docs.aws.amazon.com/secretsmanager/latest/userguide/auth-and-access_identity-based-policies.html) from AWS.

To test use the AWS account when running [aws secretsmanager list-secrets](https://docs.aws.amazon.com/cli/latest/reference/secretsmanager/list-secrets.html#examples) on either the Harness Delegate host or another host.

### Step 1: Configure Secrets Manager

1. In **Security**, select **Secrets Management**, and then click **Configure Secrets Managers.** In the resulting **Secrets Managers** page, the **Status** column indicates the **Default** provider.
2. Click **Add Secrets Manager**. The **Configure Secrets Manager** settings appear.
3. Select **AWS Secrets Manager** from the drop-down list.For information on restrictions on names and maximum quotas, see [Quotas for AWS Secrets Manager](https://docs.aws.amazon.com/secretsmanager/latest/userguide/reference_limits.html).![](https://files.helpdocs.io/kw8ldg1itf/articles/otkxijqoa6/1600960592209/screenshot-2020-09-24-at-8-45-19-pm.png)

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

Either from the JSON for the **Key Policy**, or in the AWS **IAM** console, under **Encryption keys,** gather the following required details — **Display Name**, **AWS Access Key ID**, **AWS Secret Key**, and **AWS Resource Name (ARN)**.

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

### Step 3: Secret Name Prefix

Enter a prefix to be added to all secrets. For example, `devops` will result in secrets like `devops/mysecret`. The prefix is not a folder name, but a prefix. Secrets Manager uses is a flat naming method.

![](https://files.helpdocs.io/kw8ldg1itf/articles/au38zpufhr/1558646489700/image.png)### Step 4: Region

Select the AWS Region for the Secrets Manager.

### Step 5: Usage Scope

See [Scope Secret Managers to Applications and Environments](/article/e4ikpd00f6-scope-secret-managers-to-applications-and-environments).

### Limitations

* For limitations of AWS secrets, see [Quotas for AWS Secrets Manager](https://docs.aws.amazon.com/secretsmanager/latest/userguide/reference_limits.html).
* Secret names must be alphanumeric (Vault and KMS do not have this limitation). When migrating secrets created using Vault or KMS into AWS Secrets Manager, failures might occur due to the secret name limitation. You will have to rename those secrets into an alphanumeric format before they can be transitioned into AWS Secrets Manager.

