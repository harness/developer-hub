---
title: Add an AWS KMS secret manager
description: To store and use encrypted secrets (such as access keys), you can add an AWS KMS Secrets Manager.
sidebar_position: 3
helpdocs_topic_id: pt52h8sb6z
helpdocs_category_id: 48wnu4u0tj
helpdocs_is_private: false
helpdocs_is_published: true
---

To store and use encrypted secrets (such as access keys) and files, you can add an AWS KMS Secret Manager.

import Storeauth from '/docs/platform/shared/store-auth-credentials.md'

<Storeauth />

This topic describes how to add an AWS KMS Secret Manager in Harness.

### Before you begin

* [Harness' key concepts](/docs/platform/get-started/key-concepts.md)
* [Harness Secret Manager Overview](/docs/platform/secrets/secrets-management/harness-secret-manager-overview)
* [Store authentication credentials](/docs/platform/secrets/secrets-management/store-authentication-credentials)


### Step 1: Add a Secret Manager

This topic assumes you have a Harness Project set up. If not, go to[Create Organizations and Projects](../../organizations-and-projects/create-an-organization.md).

You can add a Connector from any module in your Project in Project setup, or in your Organization, or Account Resources.

In **Connectors**, select **Connector**.

In **Secret Managers**, select **AWS KMS**. The **AWS Key Management Service** settings appear.

![](../../secrets/static/add-an-aws-kms-secrets-manager-53.png)

### Step 2: Overview

Enter a **Name** for your secret manager.

You can choose to update the **ID** or let it be the same as your secret manager's name. For more information, go to [Entity Identifier Reference](../../references/entity-identifier-reference.md).

Enter a **Description** for your secret manager.

Enter **Tags** for your secret manager.

Select **Continue**.

### Option: Credential Type

You can select the following options for authenticating with AWS:

1. **AWS Access Key.**
2. **Assume IAM role on delegate.**
3. **Assume Role using STS on delegate.**
4. **OIDC**

### Option: AWS Access Key

Use your AWS IAM user login credentials.

Either from the JSON for the **Key Policy**, or in the AWS **IAM** console, under **Encryption keys,** gather the **AWS Access Key ID**, **AWS Secret Key**, and **Amazon Resource Name (ARN)**.

![](../../secrets/static/add-an-aws-kms-secrets-manager-54.png)
For more information, go to [Finding the Key ID and ARN](https://docs.aws.amazon.com/kms/latest/developerguide/viewing-keys.html#find-cmk-id-arn) from Amazon.

#### 1. AWS Access Key ID

Select **Create or Select a Secret**.

In the secret settings dialog, you can create/select a [Secret](/docs/platform/secrets/add-use-text-secrets) and enter your AWS Access Key as it's value.

The AWS Access Key is the AWS Access Key ID for the IAM user you want to use to connect to secret manager.

#### AWS Secret Access Key

Select **Create or Select a Secret**.

You can create a new [Secret](/docs/platform/secrets/add-use-text-secrets) with your Access Key ID's secret key as the **Secret Value**, or use an existing secret.

#### AWS ARN

Select **Create or Select a Secret**.

As explained above, you can create a new [Secret](/docs/platform/secrets/add-use-text-secrets) with your ARN as the **Secret Value**, or use an existing secret.

### 2. Assume IAM Role on Delegate

If you select **Assume the IAM Role on Delegate** Harness will authenticate using the IAM role assigned to the AWS host running the Delegate, you select using a Delegate Selector.

### 3. Assume Role using STS on Delegate

This option uses the [AWS Security Token Service](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_temp.html) (STS) feature. Typically, you use `AssumeRole` within your account or for AWS cross-account access.

#### Role ARN

Enter the Amazon Resource Name (ARN) of the role that you want to assume. This is an IAM role in the target deployment AWS account.

#### External ID

If the administrator of the account to which the role belongs provided you with an external ID, then enter that value.

For more information, go to [How to Use an External ID When Granting Access to Your AWS Resources to a Third Party](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_create_for-user_externalid.html) from AWS.

#### Assume Role Duration (seconds)

This is the AssumeRole Session Duration. Go to Session Duration in the[AssumeRole AWS docs](https://docs.aws.amazon.com/STS/latest/APIReference/API_AssumeRole.html).


### 4. OIDC - OpenID Connect.

 This option uses OpenID Connect (OIDC) to authenticate and authorize users. This option is commonly used for secure identity federation across different applications or cloud platforms, enabling seamless authentication and access management.

 ![odic-aws-kms](../../secrets/static/odic-aws-kms.png)

- **Role ARN**: Enter the Amazon Resource Name (ARN) of the role you want to assume.  
- **Region and IAM Role**: Once your configuration is complete, set the IAM role and region below to proceed with the setup, as shown in the image above.

<details>
    <summary>An additional step before proceeding.</summary>

    #### Connectivity mode 

    This additional step allows you to select the connectivity mode.

    Once you have selected OIDC, you will be able to select **connectivity mode**, based on the requirement you can select the provider that can be either connect through a **delegate** or through **Harness platform**. 
        
    ![connetivity-mode](../../secrets/static/oidc-connectivity-mode.png)          
</details>

### Step 3: Setup Delegates

In **Delegates** **Setup**, enter [**Selectors**](../../delegates/manage-delegates/select-delegates-with-selectors.md#option-select-a-delegate-for-a-connector-using-tags) for specific **Delegates** that you want to allow to connect to this Connector. Select **Save and Continue**.

### Step 4: Test Connection

In **Connection** **Test**, select **Finish** after your connection is successful.
