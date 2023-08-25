---
title: Add an Azure Key Vault secret manager
description: This document explains steps to add and use Azure Key Vault to store and use encrypted secrets, such as access keys.
# sidebar_position: 2
helpdocs_topic_id: 53jrd1cv4i
helpdocs_category_id: 48wnu4u0tj
helpdocs_is_private: false
helpdocs_is_published: true
---

To store and use encrypted secrets (such as access keys) and files, you can add an Azure Key Vault Secret Manager.

## Before you begin

* Go to [Harness Secret Manager Overview](../Secrets-Management/1-harness-secret-manager-overview.md).
* Go to [About Azure Key Vault](https://docs.microsoft.com/en-us/azure/key-vault/general/overview) by Microsoft.
* Go to [Azure Key Vault Basic Concepts](https://docs.microsoft.com/en-us/azure/key-vault/general/basic-concepts).
* Make sure you have set up an Azure account.
* Make sure you have **View** and **Create/Edit** permissions for secrets.

## Secret manager overview

For a full overview of how your secrets are used with the Secrets Managers you configure in Harness, go to [Harness Secrets Management Overview](../Secrets-Management/1-harness-secret-manager-overview.md) and [Harness Security FAQs](../../../frequently-asked-questions/harness-faqs/harness-security-faqs.md).

Here's a visual summary:

![](../static/azure-key-vault-00.png)

## Limitations

* Key Vault stores and manages secrets as sequences of octets (8-bit bytes), with a maximum size of 25k bytes each. For more information, go to [Azure Key Vault secrets](https://docs.microsoft.com/en-us/azure/key-vault/secrets/about-secrets).

## Create an Azure Reader role

To enable Harness to later fetch your Azure vaults (in Step 7 below), you must first set up a **Reader** role in Azure. You can do this two ways:

* Azure portal
* PowerShell command

### Create a Reader role in Azure

To create a **Reader** role in the Azure portal UI:

Navigate to Azure's **Subscriptions** page.

![](../static/azure-key-vault-02.png)

Under **Subscription name**, select the subscription where your vaults reside.

![](../static/azure-key-vault-03.png)


:::tip
Copy and save the **Subscription ID**. You can paste this value into Harness Manager below at Option: Enter Subscription.Select your **Subscription’s Access control (IAM)** property.
:::


![](../static/azure-key-vault-04.png)

On the resulting **Access control (IAM)** page, select **Add a role assignment**.

In the resulting right pane, set the **Role** to **Reader**.

![](../static/azure-key-vault-05.png)

Accept the default value: **Assign access to**: **Azure AD user**, **group, or service principal**.

In the **Select** drop-down, select the name of your Azure App registration.

![](../static/azure-key-vault-06.png)

Click **Save**.

On the **Access control (IAM)** page, select the **Role assignments** tab. Make sure your new role now appears under the **Reader** group.

![](../static/azure-key-vault-07.png)


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

1. In Harness, select your project.
2. Select **Connectors** and then select **New Connector**.

   ![](../static/azure-key-vault-08.png)

3. In **Secret Managers**, select **Azure Key Vault**.

   ![](../static/azure-key-vault-09.png)

4. Enter a **Name** for the secret manager.

   You can choose to update the **ID** or let it be the same as your secret manager's name. For more information, go to [Entity Identifier Reference](../../20_References/entity-identifier-reference.md).

5. Enter **Description** and **Tags** for your secret manager.

6. Select **Continue**.

## Configure details of the Azure Key Vault connector

To configure the details for your Azure Key Vault connector, you can do one of the following: 
- Specify credentials
- Use the credentials of a specific delegate

### Specify credentials

1. Select **Specify credentials here**.
2. Enter **Client ID**, **Tenant ID** corresponding to the fields highlighted below in the Azure UI:

   ![](../static/azure-key-vault-10.png)

   To provide these values:

   * In Azure, navigate to the **Azure Active Directory** > **App registrations** page, then select your App registration. (For details, see Azure's [Quickstart: Register an application with the Microsoft identity platform](https://docs.microsoft.com/en-us/azure/active-directory/develop/quickstart-v1-add-azure-ad-app).)
   * Copy the **Application (client) ID** for the Azure App registration you are using, and paste it into the Harness dialog's **Client ID** field.
   * Copy the **Directory (tenant) ID** of the Azure Active Directory (AAD) where you created your application, and paste it into the Harness dialog's **Tenant ID** field. (For details, go to Microsoft Azure's [Get values for signing in](https://docs.microsoft.com/en-us/azure/active-directory/develop/howto-create-service-principal-portal#get-values-for-signing-in) topic.)
3. In **Subscription**, you can optionally enter your Azure Subscription ID (GUID).

   To find this ID, navigate to Azure's **Subscriptions** page, as outlined above in [Step 1: Create Azure Reader Role](../Secrets-Management/8-azure-key-vault.md#create-an-azure-reader-role). From the resulting list of subscriptions, copy the **Subscription ID** beside the subscription that contains your vaults.

   ![](../static/azure-key-vault-11.png)

   :::note
   If you do not enter a GUID, Harness uses the default subscription for the [Client ID](#setup-delegates) you've provided above.
   :::

4. In **Key**, select **Create or Select a Secret**. For detailed steps on creating a new secret, go to [Add Text Secrets](../2-add-use-text-secrets.md).

   ![](../static/specify-credentials.png)

   The secret that you reference here should have the Azure authentication key as the **Secret Value**. The image below shows the creation of a secret with Azure authentication key as its value:

   ![](../static/azure-key-vault-13.png)

   To create and exchange the azure authentication key, follow these steps:

   1. Navigate to Azure's **Certificates & secrets** page. (For details, go to Microsoft Azure's [Create a new application secret](https://docs.microsoft.com/en-us/azure/azure-resource-manager/resource-group-create-service-principal-portal#get-application-id-and-authentication-key) documentation.)
   2. In the resulting page’s **Client secrets** section, select **New client secret**.

   ![](../static/azure-key-vault-14.png)

   3. Enter a **Description** and expiration option, then click **Add**.

   ![](../static/azure-key-vault-15.png)

   4. Find your new key in the **Client secrets** section, and copy its value to your clipboard.

   ![](../static/azure-key-vault-16.png)

    
   :::note
   This is your only chance to view this key's value in Azure. Store the value somewhere secure, and keep it on your clipboard.
   :::

   5. Click **Continue**.

### Use the credentials of a specific delegate

1. Select **Use the credentials of a specific Harness Delegate (IAM role, service account, managed identity, etc)**.
2. In **Subscription**, enter your Azure Subscription ID (GUID).
3. In **Environment**, select your environment.
4. In **Authentication**, select one of the following: 
   - **System Assigned Managed Identity**: If you select this, you need not provide any Ids.

     ![](../static/system-assigned-managed-identity.png)

   - **User Assigned Managed Identity**: If you select this, you need to provide the Application (client) Id in **Client Id**.
    
     ![](../static/user-assigned-managed-identity.png)

## Set up delegates

In **Delegates** **Setup**, enter [**Selectors**](../../2_Delegates/manage-delegates/select-delegates-with-selectors.md#option-select-a-delegate-for-a-connector-using-tags) for specific delegates that you want to allow to connect to this Connector. Click **Continue**.

## Set up vault

Click **Fetch Vault**.

After a slight delay, the **Vault** drop-down list populates with vaults corresponding to your client secret. Select the Vault you want to use.

Click **Save and Continue**.

## Test connection

Once the Test Connection succeeds, click Finish. You can now see the Connector in Connectors.


:::important
Important: Harness tests connections by generating a fake secret in the Secret Manager or Vault. For the Test Connection to function successfully, make sure you have the Create permission for secrets.  
The Test Connection fails if you do not have the Create permission. However, Harness still creates the Connector for you. You may use this Connector to read secrets if you have View permissions.
:::
