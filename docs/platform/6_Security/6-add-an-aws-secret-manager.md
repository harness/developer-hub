---
title: Add an AWS Secrets Manager
description: This topic shows how to create an AWS Secret Manager.
# sidebar_position: 2
helpdocs_topic_id: a73o2cg3pe
helpdocs_category_id: 48wnu4u0tj
helpdocs_is_private: false
helpdocs_is_published: true
---

You can use AWS Secrets Manager for your Harness secrets.

Unlike AWS KMS, AWS Secrets Manager stores both secrets and encrypted keys. With AWS KMS, Harness stores the secret in its Harness store and retrieves the encryption keys from KMS. For information on using an AWS KMS Secrets Manager, see [Add an AWS KMS Secrets Manager](./7-add-an-aws-kms-secrets-manager.md).

This topic describes how to add an AWS Secret Manager in Harness.

### Before you begin

* If you are adding an AWS Secrets Manager running on ROSA, you must also add an environment variable `AWS_REGION` with the appropriate region as its value.  
For example `AWS_REGION=us-east-1`.

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
These policies let you list secrets which will allow you to add the Secret Manager and refer to secrets, but it will not let you read secrets values.

The following policy list enables Harness to perform all the secrets operations you might need:


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
See [Using Identity-based Policies (IAM Policies) for Secret Manager](https://docs.aws.amazon.com/secretsmanager/latest/userguide/auth-and-access_identity-based-policies.html) from AWS.

To test use the AWS account when running [aws secretsmanager list-secrets](https://docs.aws.amazon.com/cli/latest/reference/secretsmanager/list-secrets.html#examples) on either the Harness Delegate host or another host.

### Step 1: Add a Secret Manager

This topic assumes you have a Harness Project set up. If not, see [Create Organizations and Projects](../1_Organizations-and-Projects/2-create-an-organization.md).

You can add a Connector from any module in your Project in Project SETUP, or in your Organization, or Account Resources.

In **Connectors**, click **Connector**.

In **Secret Managers**, click **AWS Secrets Manager**. The AWS Secrets Manager settings appear.


:::note
For information on restrictions on names and maximum quotas, see [Quotas for AWS Secrets Manager](https://docs.aws.amazon.com/secretsmanager/latest/userguide/reference_limits.html).
:::


### Step 2: Overview

Enter **Name** for your secret manager.

You can choose to update the **ID** or let it be the same as your secret manager's name. For more information, see [Entity Identifier Reference](../20_References/entity-identifier-reference.md).

Enter **Description** for your secret manager.

Enter **Tags** for your secret manager.

Click **Continue**.

### Step 3: Details

You can select the following options in **Credential Type** for authenticating with AWS:

* **AWS Access Key.**
* **Assume IAM Role on Delegate.**
* **Assume Role Using STS on Delegate.**

### Option: AWS Access Key

Use your AWS IAM user login credentials.

Gather **AWS - Access Key ID** and **AWS - Secret Access Key** from the JSON for the **Key Policy**, or in the AWS **IAM** console, under **Encryption keys**.

For more information, see [Finding the Key ID and ARN](https://docs.aws.amazon.com/kms/latest/developerguide/viewing-keys.html#find-cmk-id-arn) from Amazon.

#### AWS-Access Key ID

Click **Create or Select a Secret**.

In the secret settings dialog, you can create/select a [Secret](./2-add-use-text-secrets.md) and enter your AWS Access Key as it's value.

The AWS Access Key is the AWS Access Key ID for the IAM user you want to use to connect to Secret Manager.

#### AWS- Secret Access Key

Click **Create or Select a Secret**.

You can either create a new [Secret](./2-add-use-text-secrets.md) with your Access Key ID's secret key as its **Value** or use an existing secret.

#### Secret Name Prefix

Enter **Secret Name Prefix**. All the secrets under this secret manager would have this prefix. For example, `devops` will result in secrets like `devops/mysecret`. The prefix is not a folder name.

#### Region

Select the AWS **Region** for the Secret Manager.

### Option: Assume IAM Role on Delegate

If you select this option, Harness will authenticate using the IAM role assigned to the AWS host running the Delegate you select. You can select a Delegate using a Delegate Selector.

Refer to [Secret Name Prefix](./6-add-an-aws-secret-manager.md#secret-name-prefix) and [Region](./6-add-an-aws-secret-manager.md#region) explained above to add these details.

### Option: Assume Role Using STS on Delegate

This option uses the [AWS Security Token Service](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_temp.html) (STS) feature. Typically, you use `AssumeRole` within your account or for AWS cross-account access.

Refer to [Secret Name Prefix](./6-add-an-aws-secret-manager.md#secret-name-prefix) and [Region](./6-add-an-aws-secret-manager.md#region) explained above to add these details.

#### Role ARN

Enter the Amazon Resource Name (ARN) of the role that you want to assume. This role is an IAM role in the target deployment AWS account.

#### External ID

If the administrator of the account to which the role belongs provided you with an external ID, then enter that value.

For more information, see [How to Use an External ID When Granting Access to Your AWS Resources to a Third Party](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_create_for-user_externalid.html) from AWS.

#### Assume Role Duration

Enter the AssumeRole Session Duration. See Session Duration in the [AssumeRole AWS docs](https://docs.aws.amazon.com/STS/latest/APIReference/API_AssumeRole.html).

### Step 4: Setup Delegates

In **Setup Delegates,** enter [**Selectors**](../2_Delegates/delegate-guide/select-delegates-with-selectors.md#option-select-a-delegate-for-a-connector-using-tags) for specific **Delegates** that you want to allow to connect to this Connector.

### Step 5: Test Connection

Once the Test Connection succeeds, click Finish. You can now see the Connector in Connectors.​


:::note
Important: Test Connection failsHarness tests connections by creating a dummy secret in the Secret Manager or Vault. For the **Test Connection** to function successfully, make sure you have **Create** permission for secrets.  
The Test Connection fails if you do not have Create permission. However, Harness still creates the Connector for you. You may use this Connector to read secrets, if you have **View** permissions.
:::
