---
title: Add a custom secret manager
description: This topic explains how to create and use a Custom Secret Manager.
# sidebar_position: 2
helpdocs_topic_id: mg09uspsx1
helpdocs_category_id: 48wnu4u0tj
helpdocs_is_private: false
helpdocs_is_published: true
---

Harness includes a built-in Secrets Management feature that enables you to store encrypted secrets, such as access keys, and use them in your Harness account.

You can also access your encrypted secrets stored in third-party Secret Managers using the Harness Custom Secret Manager.

This topic explains how to add and use a Custom Secret Manager in Harness.

### Before you begin

* [Harness Secret Manager Overview](/docs/platform/secrets/secrets-management/harness-secret-manager-overview)

### Permissions

* Create/Edit Secrets
* Create/Edit Connectors![](../../secrets/static/custom-secret-manager-31.png)

:::info important

* Harness Custom Secret Manager is a read-only Secret Manager. It's not possible to create reference secrets. However, Harness Custom Secret Manager enables you to define templates that include logic to connect to and retrieve secrets from the secret manager. Your template specifies how the secret is retrieved and whether it's a string or JSON format.
* Harness can read/decrypt secrets, but it cannot write secrets to the Custom Secrets Manager.

:::

### Harness Custom Secret Manager Overview

Harness includes a built-in Secrets Management feature that enables you to store encrypted secrets, such as access keys, and use them in your Harness Account. 

Harness integrates with the following third-party Secret Managers along with a built-in Secret Manager:

* AWS KMS
* AWS Secrets Manager
* Azure Key Vault
* GCP KMS
* HashiCorp Vault

You can use third-party Secrets Managers not integrated with Harness to store encrypted secrets. With Harness Custom Secret Manager, you can integrate Harness with your third-party Secret Managers and read or access your secrets.

Your Custom Secret Manager uses a shell script that you can execute either on a delegate or on a remote host which is connected to the delegate. Harness fetches and reads your secrets from the third-party Secret Manager through this shell script.

### Step 1: Create a Secret Manager Template

You can create a Secret Manager Template at Account, Org, or Project scope.

This topic shows you how to create a Secret Manager Template at the Project scope.

1. In your Harness Account, go to your Project.

2. In Project Setup, click **Templates**, and then click **New Template**.
   
   ![](../static/custom-secret-manager-32.png)

3. Click Secret Manager. The Secret Manager Template settings appear.
4. Enter a **Name** for your Secret Manager Template.
5. Enter a **Version Label**.
6. Click **Start**.![](../../secrets/static/custom-secret-manager-33.png)
7. Enter your script in **Script**.
8. Click **Save**.  
For detailed steps to create a Secret Manager Template, go to [Create a Secret Manager Template](../../templates/create-a-secret-manager-template.md).

### Step 2: Add a Custom Secret Manager

You can add a Custom Secret Manager at Account, Org, and Project scope.

To do this, go to Project setup, Organization, or Account Resources.

This topic shows you how to add a Custom Secret Manager in the Project scope.

1. In your Harness Account, go to your Project.
2. In Project Setup, click **Connectors** and then click **New Connector**.
3. In **Secret Managers**, click **Custom Secret Manager**.

   ![](../../secrets/static/custom-secret-manager-34.png)
   
   The Custom Secret Manager settings appear.
4. Enter a **Name** for your Custom Secret Manager. Click **Continue**.
5. Click **Select Template**. The Template Library appears with all the [Secret Manager Templates](../../templates/create-a-secret-manager-template.md) listed.
6. Select the desired scope and select a Secret Manager Template from the Template Library.
   
   ![](../../secrets/static/custom-secret-manager-35.png)

  You can also search for a specific Secret Manager Template by entering its name in **Search**.
  Once you select the Secret Manager Template, the details are displayed in the Template Studio.  
7. Click **Use Template**.
8. Enter values for the required Input Variables.  
   Harness allows you to use [Fixed Values and Runtime Inputs](../../variables-and-expressions/runtime-inputs).
	
	![](../static/custom-secret-manager-36.png)

9. Click **Fixed** to make the variable values fixed. Harness won't ask you these values when you create Secrets.
10. Click **Continue**.
11. In **Delegates** **Setup**, enter [**Selectors**](../../delegates/manage-delegates/select-delegates-with-selectors.md#option-select-a-delegate-for-a-connector-using-tags) for specific **Delegates** that you want to allow to connect to this Connector. Click **Save and Continue**.
12. In **Connection Test**, click **Finish** after your connection is successful**.**

### Step 3: Use the Custom Secret Manager

Create an Encrypted Text using the Custom Secrets Manager you created earlier. Enter the name and values of all the Input Variables defined while creating the Shell Script Template. 

For more information on creating Encrypted Text Secret, go to [Add Encrypted Text](/docs/platform/secrets/add-use-text-secrets).

If you want to create a secret on a Target Host Custom Secrets Manager, you must also select the Connection Attribute.

