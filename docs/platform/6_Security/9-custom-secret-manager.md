---
title: Add a Custom Secret Manager
description: This topic explains how to create and use a Custom Secret Manager.
# sidebar_position: 2
helpdocs_topic_id: mg09uspsx1
helpdocs_category_id: 48wnu4u0tj
helpdocs_is_private: false
helpdocs_is_published: true
---

Currently, this feature is behind the feature flag `CUSTOM_SECRET_MANAGER_NG`. Contact Harness Support to enable the feature.Harness includes a built-in Secrets Management feature that enables you to store encrypted secrets, such as access keys, and use them in your Harness account.

You can also access your encrypted secrets stored in third-party Secret Managers using the Harness Custom Secret Manager.

This topic explains how to add and use a Custom Secret Manager in Harness.

### Permissions

* Create/Edit Secrets
* Create/Edit Connectors![](https://files.helpdocs.io/kw8ldg1itf/articles/mg09uspsx1/1661140577769/screenshot-2022-08-22-at-9-25-27-am.png)

### Important

* Harness Custom Secret Manager is a read-only Secret Manager.
* Harness can read/decrypt secrets, but it cannot write secrets to the Custom Secrets Manager.

### Harness custom secret manager overview

Harness includes a built-in Secrets Management feature that enables you to store encrypted secrets, such as access keys, and use them in your Harness Account. 

Harness integrates with the following third-party Secret Managers along with a built-in Secret Manager:

* AWS KMS
* AWS Secrets Manager
* Azure Key Vault
* GCP KMS
* HashiCorp Vault

You can also use third-party Secrets Managers that are not integrated with Harness, to store your encrypted secrets. With Harness Custom Secret Manager you can integrate Harness with your third-party Secret Managers and read or access your secrets.

Your Custom Secret Manager uses a shell script that you can execute either on a Delegate or on a remote host which is connected to the Delegate. Harness fetches and reads your secrets from the third-party Secret Manager through this shell script.

### Step 1: Create a secret manager template

You can create a Secret Manager Template at Account, Org, or Project scope.

This topic shows you how to create a Secret Manager Template at the Project scope.

1. In your Harness Account, go to your Project.
2. In Project Setup, click **Templates** and then click **New Template**.![](https://files.helpdocs.io/kw8ldg1itf/articles/mg09uspsx1/1661429380441/screenshot-2022-08-25-at-5-39-14-pm.png)
3. Click Secret Manager. The Secret Manager Template settings appear.
4. Enter a **Name** for your Secret Manager Template.
5. Enter a **Version Label**.
6. Click **Start**.![](https://files.helpdocs.io/kw8ldg1itf/articles/mg09uspsx1/1661429521315/screenshot-2022-08-25-at-5-41-34-pm.png)
7. Enter your script in **Script**.
8. Click **Save**.  
For detailed steps to create a Secret Manager Template, see [Create a Secret Manager Template](/article/n41cqkjrla-create-a-secret-manager-template).

### Step 2: Add a custom secret manager

You can add a Custom Secret Manager at Account, Org, and Project scope.

To do this, go to Project setup, Organization, or Account Resources.

This topic shows you how to add a Custome Secret Manager in the Project scope.

1. In your Harness Account, go to your Project.
2. In Project Setup, click **Connectors** and then click **New Connector**.
3. In **Secret Managers**, click **Custom Secret Manager**.![](https://files.helpdocs.io/kw8ldg1itf/articles/mg09uspsx1/1661768475809/screenshot-2022-08-29-at-3-50-18-pm.png)The Custom Secret Manager settings appear.
4. Enter a **Name** for your Custom Secret Manager. Click **Continue**.
5. Click **Select Template**. The Template Library appears with all the [Secret Manager Templates](/article/n41cqkjrla-create-a-secret-manager-template) listed.
6. Select the desired scope and select a Secret Manager Template from the Template Library.![](https://files.helpdocs.io/kw8ldg1itf/articles/mg09uspsx1/1661770010704/screenshot-2022-08-29-at-4-07-42-pm.png)You can also search for a specific Secret Manager Template by entering its name in **Search**.
7. Once you select the Secret Manager Template, the details are displayed in the Template Studio.  
Click **Use Template**.
	1. Enter values for the required Input Variables.  
	Harness allows you to use [Fixed Values and Runtime Inputs](https://docs.harness.io/article/f6yobn7iq0-runtime-inputs).![](https://files.helpdocs.io/kw8ldg1itf/articles/mg09uspsx1/1661771501272/screenshot-2022-08-29-at-4-38-08-pm.png)Click **Fixed** to make the variable values fixed. Harness won't ask you these values when you create Secrets.
8. Click **Continue**.
9. In **Delegates** **Setup****,** enter [**Selectors**](/article/nnuf8yv13o-select-delegates-with-selectors#option_select_a_delegate_for_a_connector_using_tags) for specific **Delegates** that you want to allow to connect to this Connector. Click **Save and Continue**.
10. In **Connection** **Test**, click **Finish** after your connection is successful**.**

### Step 3: Use the custom secret manager

Create an Encrypted Text using the Custom Secrets Manager you created earlier. Enter the name and values of all the Input Variables defined while creating the Shell Script Template. 

For more information on creating Encrypted Text Secret, see [Add Encrypted Text](/article/osfw70e59c-add-use-text-secrets).

If you want to create a secret on a Target Host Custom Secrets Manager, you must also select the Connection Attribute.

