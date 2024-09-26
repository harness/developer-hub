---
title: Add an Azure Key Vault secret manager
description: This document explains steps to add and use Azure Key Vault to store and use encrypted secrets, such as access keys.
sidebar_position: 7
helpdocs_topic_id: 53jrd1cv4i
helpdocs_category_id: 48wnu4u0tj
helpdocs_is_private: false
helpdocs_is_published: true
---

To store and use encrypted secrets (such as access keys) and files, you can add an Azure Key Vault Secret Manager.

## Before you begin

* Go to [Harness Secret Manager Overview](/docs/platform/secrets/secrets-management/harness-secret-manager-overview).
* Go to [About Azure Key Vault](https://docs.microsoft.com/en-us/azure/key-vault/general/overview) by Microsoft.
* Go to [Azure Key Vault Basic Concepts](https://docs.microsoft.com/en-us/azure/key-vault/general/basic-concepts).
* Go to [Store authentication credentials](/docs/platform/secrets/secrets-management/store-authentication-credentials).
* Make sure you have set up an Azure account.
* Make sure you have **View** and **Create/Edit** permissions for secrets.

## Secret manager overview

For a full overview of how your secrets are used with the Secrets Managers you configure in Harness, go to [Harness Secrets Management Overview](/docs/platform/secrets/secrets-management/harness-secret-manager-overview) and [Harness Security FAQs](../../../faqs/harness-security-faqs.md).

Here's a visual summary:

![](../../secrets/static/azure-key-vault-00.png)

## Limitations

* Key Vault stores and manages secrets as sequences of octets (8-bit bytes), with a maximum size of 25k bytes each. For more information, go to [Azure Key Vault secrets](https://docs.microsoft.com/en-us/azure/key-vault/secrets/about-secrets).

import Storeauth from '/docs/platform/shared/store-auth-credentials.md'

<Storeauth />

## Create an Azure Reader role

To enable Harness to later fetch your Azure vaults (in Step 7 below), you must first set up a **Reader** role in Azure. You can do this two ways:

* Azure portal
* PowerShell command

### Create a Reader role in Azure

To create a **Reader** role in the Azure portal UI:

Navigate to Azure's **Subscriptions** page.

![](../../secrets/static/azure-key-vault-02.png)

Under **Subscription name**, select the subscription where your vaults reside.

![](../../secrets/static/azure-key-vault-03.png)


:::tip
Copy and save the **Subscription ID**. You can paste this value into Harness Manager below at Option: Enter Subscription.Select your **Subscription's Access control (IAM)** property.
:::


![](../../secrets/static/azure-key-vault-04.png)

On the resulting **Access control (IAM)** page, select **Add a role assignment**.

In the resulting right pane, set the **Role** to **Reader**.

![](../../secrets/static/azure-key-vault-05.png)

Accept the default value: **Assign access to**: **Azure AD user**, **group, or service principal**.

In the **Select** drop-down, select the name of your Azure App registration.

![](../../secrets/static/azure-key-vault-06.png)

Select **Save**.

On the **Access control (IAM)** page, select the **Role assignments** tab. Make sure your new role now appears under the **Reader** group.

![](../../secrets/static/azure-key-vault-07.png)


:::note
Microsoft Azure's [Manage subscriptions](https://docs.microsoft.com/en-us/azure/cost-management-billing/manage/add-change-subscription-administrator#to-assign-a-user-as-an-administrator) documentation adds details about the above procedure but focuses on the **Administrator** rather than the **Reader** role.
:::


### Create a Reader role using a PowerShell command

You can also create a **Reader** role programmatically via this PowerShell command, after gathering the required parameters:


```
New-AzRoleAssignment -ObjectId <object_id> -RoleDefinitionName "Reader" -Scope /subscriptions/<subscription_id>
```
For details and examples, go to Microsoft Azure's [Add or remove role assignments](https://docs.microsoft.com/en-us/azure/role-based-access-control/role-assignments-powershell#application-at-a-subscription-scope) documentation.

## Add an Azure Key Vault secret manager in Harness

You can add an Azure Key Vault connector in account or org or project [scope](/docs/platform/role-based-access-control/rbac-in-harness#permissions-hierarchy-scopes).

This topic explains steps to add an Azure Key Vault connector in the project scope.

To add an Azure Key Vault secret manager:

1. In Harness, select your project.
2. Select **Connectors** and then select **New Connector**.

   ![](../../secrets/static/azure-key-vault-08.png)

3. In **Secret Managers**, select **Azure Key Vault**.

   ![](../../secrets/static/azure-key-vault-09.png)

4. Enter a **Name** for the secret manager.

   You can choose to update the **ID** or let it be the same as your secret manager's name. For more information, go to [Entity Identifier Reference](../../references/entity-identifier-reference.md).

5. Enter **Description** and **Tags** for your secret manager.

6. Select **Continue**.

## Configure details of the Azure Key Vault connector

To configure the details for your Azure Key Vault connector, you can do one of the following:
- Specify credentials
- Use the credentials of a specific delegate

### Specify credentials

1. Select **Specify credentials here**.
2. Enter **Client ID**, **Tenant ID** corresponding to the fields highlighted below in the Azure UI:

   ![](../../secrets/static/azure-key-vault-10.png)

   To provide these values:

   * In Microsoft Entra admin center, navigate to the **Identity** > **Applications** > **App registrations** page, then select your App registration. (For details, go to Microsoft Entra's [Quickstart: Register an application with the Microsoft identity platform](https://docs.microsoft.com/en-us/azure/active-directory/develop/quickstart-v1-add-azure-ad-app).)
   * Copy the **Application (client) ID** for the Azure App registration you are using, and paste it into the Harness dialog's **Client ID** field.
   * Copy the **Directory (tenant) ID** of the Microsoft Entra ID where you created your application, and paste it into the Harness dialog's **Tenant ID** field. (For details, go to Microsoft Azure's [Get values for signing in](https://docs.microsoft.com/en-us/azure/active-directory/develop/howto-create-service-principal-portal#get-values-for-signing-in) topic.)
3. In **Subscription**, you can optionally enter your Azure Subscription ID (GUID).

   To find this ID, navigate to Azure's **Subscriptions** page, as outlined above in [Step 1: Create Azure Reader Role](/docs/platform/secrets/secrets-management/azure-key-vault.md#create-an-azure-reader-role). From the resulting list of subscriptions, copy the **Subscription ID** beside the subscription that contains your vaults.

   ![](../../secrets/static/azure-key-vault-11.png)

   :::note
   If you do not enter a GUID, Harness uses the default subscription for the [Client ID](#setup-delegates) you've provided above.
   :::

4. In **Key**, select **Create or Select a Secret**. For detailed steps on creating a new secret, go to [Add Text Secrets](/docs/platform/secrets/add-use-text-secrets).

   ![](../../secrets/static/specify-credentials.png)

   The secret that you reference here should have the Azure authentication key as the **Secret Value**.

   To create and exchange the azure authentication key, follow these steps:

   1. Navigate to Azure's **Certificates & secrets** page. (For details, go to Microsoft Azure's [Create a new application secret](https://docs.microsoft.com/en-us/azure/azure-resource-manager/resource-group-create-service-principal-portal#get-application-id-and-authentication-key) documentation.)
   2. In the resulting page's **Client secrets** section, select **New client secret**.

   ![](../../secrets/static/azure-key-vault-14.png)

   3. Enter a **Description** and expiration option, then click **Add**.

   ![](../../secrets/static/azure-key-vault-15.png)

   4. Find your new key in the **Client secrets** section, and copy its value to your clipboard.

   ![](../../secrets/static/azure-key-vault-16.png)


   :::note
   This is your only chance to view this key's value in Azure. Store the value somewhere secure, and keep it on your clipboard.
   :::

5. Optional: Deselect **Purge Secrets**.

   ![](../../secrets/static/azure-key-vault-17.png)

   This option is selected by default and purges deleted secrets instead of soft deleting them. For more information, go to [Purge deleted secret](https://learn.microsoft.com/en-us/rest/api/keyvault/secrets/purge-deleted-secret/purge-deleted-secret) in the Microsoft documentation.

   :::note
   **Purge Protection Handling**

   - If you have Purge Protection enabled on the Azure side, you must ensure that the `enablePurge` setting is set to `false` in the Azure vault connector. This is crucial because, with Purge Protection enabled in Azure, you will not be able to delete secrets if the `enablePurge` setting is `true`.

   - Purge Protection is a feature in Azure that prevents the permanent deletion of secrets. When enabled, any deletion operation is soft-deleted, and the secret can be recovered within a certain retention period. Setting `enablePurge` to false ensures compatibility with this feature.
   :::

6. Select **Continue**.

### Use the credentials of a specific delegate

1. Select **Use the credentials of a specific Harness Delegate (IAM role, service account, managed identity, etc)**.
2. In **Subscription**, enter your Azure Subscription ID (GUID).
3. In **Environment**, select your environment.
4. In **Authentication**, select one of the following:
   - **System Assigned Managed Identity**: If you select this, you need not provide any Ids.

     ![](../../secrets/static/system-assigned-managed-identity.png)

   - **User Assigned Managed Identity**: If you select this, you need to provide the Application (client) Id in **Client Id**.

     ![](../../secrets/static/user-assigned-managed-identity.png)

## Set up delegates

In **Delegates Setup**, enter [**Selectors**](../../delegates/manage-delegates/select-delegates-with-selectors.md#option-select-a-delegate-for-a-connector-using-tags) for specific delegates that you want to allow to connect to this Connector. Select **Continue**.

## Set up vault

Select **Fetch Vault**.

After a slight delay, the **Vault** drop-down list populates with vaults corresponding to your client secret. Select the Vault you want to use.

Select **Save and Continue**.

## Test connection

Once the Test Connection succeeds, select **Finish**. You can now see the connector in **Connectors**.

:::important
Important: Harness tests connections by generating a fake secret in the Secret Manager or Vault. For the Test Connection to function successfully, make sure you have the Create permission for secrets.
The Test Connection fails if you do not have the Create permission. However, Harness still creates the Connector for you. You may use this Connector to read secrets if you have View permissions.
:::

## Creating and referencing Azure Vault secrets

To create a new Harness text or file secret in Azure Key Vault, do the following:

1. In **Account/Organization/Project Settings**, select **Secrets**.
2. Select New Secret and then select **Text**, **File**, **SSH Credential**, or **WinRM Credential**.
   For details on creating **SSH Credential** or **WinRM Credential**, go to [Add SSH keys](/docs/platform/secrets/add-use-ssh-secrets/) or [Add WinRM keys](/docs/platform/secrets/add-winrm-keys).
3. In **Secrets Manager**, select the Harness Azure Key Vault connector to use.

### Text secrets

Select **Inline Secret Value** or **Reference Secret**:

- **Inline Secret Value:** Enter the value for the encrypted text. For Azure Key Vault, you can set an expiry date in **Expires on**.
- **Reference Secret:** Enter the _name_ of the existing secret in your **Azure Key Vault**, and then select **Test** to test the reference path. You can also specify the secret's version (for example: `azureSecret/05`).

For details on text secrets, go to [Add and reference text secrets](/docs/platform/secrets/add-use-text-secrets).

### File secrets

For details on file secrets, go to [Add and reference file secrets](/docs/platform/secrets/add-file-secrets).

## Reference JSON secrets

import Refj from '/docs/platform/shared/reference-via-json.md';

<Refj />
