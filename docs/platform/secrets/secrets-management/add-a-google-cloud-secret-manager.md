---
title: Add a Google Cloud secret manager
description: Topic explaining how to add a Google Cloud Secret Manager.
# sidebar_position: 2
helpdocs_topic_id: nzqofaebno
helpdocs_category_id: 48wnu4u0tj
helpdocs_is_private: false
helpdocs_is_published: true
---


You can link your Google Cloud Secret Manager to Harness and use it to store any sensitive data you use in Harness, including secrets.

Harness also supports [Google KMS as a secrets manager](/docs/platform/secrets/secrets-management/add-google-kms-secrets-manager.md).This topic explains how to add a GCP Secrets Manager in Harness.

## Before you begin

* Go to [Harness Key Concepts](/docs/get-started/key-concepts)
* Go to [Secrets Management Overview](/docs/platform/secrets/secrets-management/harness-secret-manager-overview)

## Google Cloud secret manager important notes

* Inline secrets saved to GCP Secrets Manager must follow the naming limitations of Google Cloud Secret Manager. Secret names can only contain alphabets, numbers, dashes (-), and underscores (\_). Google Secret Manager restrictions are subject to change. Go to [Secret Manager](https://cloud.google.com/secret-manager) in the GCP documentation for details.
* The maximum size for encrypted files saved to Google Cloud Secret Manager is 64KiB.
* Inline secrets saved to Google Cloud Secret Manager have a region assignment by default. An automatic assignment is the same as not selecting the **Regions** setting when creating a secret in Google Cloud Secret Manager.
* Harness does not support Google Cloud Secret Manager labels at this time.
* **Versions for reference secrets:**
	+ Any modification to the content of a secret stored by Harness in Google Cloud Secret Manager creates a new version of that secret.
	+ When you delete a secret present in Google Cloud Secret Manager from Harness, the entire secret is deleted and not just a version.
* You cannot update the name of an inline or referenced secret stored in the Google Cloud Secret Manager using the Harness Secret Manager.
* Harness does not support changing an inline secret to a reference secret or vice versa in Harness.

For more information, go to [Supported Platforms and Technologies](/docs/get-started/supported-platforms-and-technologies).

## Google Cloud secret manager permission requirements

* Make sure you have Create/Edit permissions for Secrets.
* Make sure you have **Create/Edit** permissions for connectors.
* The GCP Service Account you use in the **Google Secrets Manager Credentials File** should have the following IAM roles:
	+ `roles/secretmanager.admin` or `roles/secretmanager.secretAccessor` and `roles/secretmanager.secretVersionManager`.

Go to [Managing secrets](https://cloud.google.com/secret-manager/docs/access-control) from Google.

## Add a Google Cloud secret manager

This topic assumes you have a Harness Project set up. If not, go to [Create Organizations and Projects](../../organizations-and-projects/create-an-organization.md).

You can add a connector from any module in your project, in the Project setup, or in your organization or account resources.

This topic explains the steps to add a Google Cloud Secrets Manager to the account [scope](/docs/platform/role-based-access-control/rbac-in-harness#permissions-hierarchy-scopes).

1. In your Harness Account, click **Account Settings**.
2. Click **Account Resources**.
3. Click **Connectors** and then click **New Connector**.
4. In Secret Managers, click **GCP Secrets Manager**.  
   The GCP Secrets Manager settings appear.

   ![](../../secrets/static/add-a-google-cloud-secret-manager-39.png)

## Add overview

1. In **Name**, enter a name for your secret manager.
2. You can choose to update the **Id** or let it be the same as your secret manager's name. For more information, go to [Entity Identifier Reference](../../references/entity-identifier-reference.md).
3. Enter the **Description** for your secret manager.
4. Enter **Tags** for your secret manager.
5. Click **Continue.**

## Configure details

Select one of the following options to configure details for the Google cloud secret manager: 
- **Specify credentials here**
- **Use the credentials of a specific Harness Delegate (IAM role, service account, etc)**

![](../../secrets/static/GCP-details.png)

### Specify credentials here

#### Attach a Google Secret Manager credentials file

You must export your Google Cloud service account key and add it as an [Encrypted File Secret](/docs/platform/secrets/add-file-secrets) in Harness.

1. In the Google Cloud console, select **IAM & admin** > **Service account**.
2. Scroll to the service account you want to use. If no service account is present, create one.
3. Grant this service account the Google Cloud Secret Manager permissions needed.  
To do this, edit the service account and click **Permissions**. Click **Roles**, and then add the roles needed.  
Go to [Managing secrets](https://cloud.google.com/secret-manager/docs/access-control) in the Google Cloud documentation.
4. Open your service account's Actions ⋮ menu, then select **Create key.**
5. In the resulting **Create private key** dialog, select the **JSON** option, create the key, and download it to your computer.
6. Go back to Harness.
7. In **Google Secrets Manager Credentials File**, select the encrypted file you just added in Harness.

   ![](../../secrets/static/GCP-specifyCredentials.png)
   
You can also create a new [File Secret](/docs/platform/secrets/add-file-secrets) here and add the Google Cloud service account key that you downloaded.

Click **Continue**.

### Use the credentials of a specific Harness Delegate (IAM role, service account, etc)

If you select this option, Harness will authenticate using the IAM role assigned to the specific delegate you select. This would be the Application Default Credentials.

For more information, go to [Application Default Credentials](https://cloud.google.com/docs/authentication/application-default-credentials).

You can select a delegate using a Delegate Selector.

Click **Continue**.

## Step 4: Setup delegates

1. In **Delegates** **Setup**, enter [**Selectors**](../../delegates/manage-delegates/select-delegates-with-selectors.md#option-select-a-delegate-for-a-connector-using-tags) for specific delegates that you want to allow to connect to this connector.
2. Click **Save and** **Continue**.

## Step 5: Test connection

Once the Test Connection succeeds, click **Finish**. You can now see the connector in **Connectors**.

## Add an inline secret to the GCP Secrets Manager

Let us add an inline text secret to the GCP Secrets Manager we just created.

1. In your Harness account, click **Account Settings**.
2. Click **Account Resources** and then click **Secrets**.
3. Click **New Secret** and then click **Text**.  
The **Add new Encrypted Text** settings appear.
4. Select the GCP Secrets Manager you just created.
5. Enter a **Name** for your secret.
6. The default selection is **Inline Secret Value**.
7. Enter the **Secret Value**.
8. Select **Configure Region** to add the region(s) for your secret.

   ![](../static/add-a-google-cloud-secret-manager-41.png)

9. Click **Save**.

## Add a secret reference to the GCP Secrets Manager

Let us add a secret reference to the GCP Secrets Manager we just created.

1. In your Harness account, click **Account Settings**.
2. Click **Account Resources** and then click **Secrets**.
3. Click **New Secret** and then click **Text**.  
The **Add new Encrypted Text** settings appear.
4. Select the GCP Secrets Manager you just created.
5. Enter a **Name** for your secret.
6. Select **Reference Secret**.

   ![](../static/add-a-google-cloud-secret-manager-42.png)

7. Enter your secret identifier in **Reference Secret Identifier**.
8. In **Version**, enter the version of your secret that you want to reference.  
You can either enter a version number like `1`, `2`, or enter `latest` to reference the latest version.
9. Click **Save**.

## Add an encrypted file secret to the GCP Secrets Manager

Let us add an encrypted file secret to the GCP Secrets Manager we just created.

1. In your Harness account, click **Account Settings**.
2. Click **Account Resources** and then click **Secrets**.
3. Click **New Secret** and then click **File**.  
The **Add new Encrypted File** settings appear.
4. Select the GCP Secrets Manager you just created.
5. Enter a **Name** for your secret.
6. In **Select File**, browse, and select your file.
7. Select **Configure Region** to add the region(s) for your secret.

   ![](../../secrets/static/add-a-google-cloud-secret-manager-43.png)

8. Click **Save**.

## Reference JSON secrets

import Refj from '/docs/platform/shared/reference-via-json.md';

<Refj />

## See also

* [Add Google KMS as a Harness Secret Manager](/docs/platform/secrets/secrets-management/add-google-kms-secrets-manager.md)
* [Add an AWS KMS Secret Manager](/docs/platform/secrets/secrets-management/add-an-aws-kms-secrets-manager)
* [Add an AWS Secret Manager](/docs/platform/secrets/secrets-management/add-an-aws-secret-manager.md)
* [Add an Azure Key Vault Secret Manager](/docs/platform/secrets/secrets-management/azure-key-vault.md)
* [Add a HashiCorp Vault Secret Manager](/docs/platform/secrets/secrets-management/add-hashicorp-vault.md)

