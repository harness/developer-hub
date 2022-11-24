---
title: Create a Secret Manager Template
description: This topic shows how to add a Secret Manager Template.
# sidebar_position: 2
helpdocs_topic_id: n41cqkjrla
helpdocs_category_id: m8tm1mgn2g
helpdocs_is_private: false
helpdocs_is_published: true
---

Harness enables you to add Templates to create reusable logic and Harness entities like Steps, Stages, Pipelines, and Secret Managers.

Harness Secret Manager Template lets you add a shell script that you can execute either on a Delegate or on a remote host which is connected to the Delegate. Harness fetches and reads your secrets from the third-party Secret Manager through this shell script.

This topic explains how to create a Secret Manager Template in Harness.

### Objectives

You will learn how to:

* Create a Secret Manager Template.
* Add a shell script to the Secret Manager Template.
* Configure Input Variables for the shell script.
* Use the Secret Manager Template in a Custom Secret Manager.

### Before you begin

* [Templates Overview](/article/6tl8zyxeol-template)
* [Harness Secrets Management Overview](/article/hngrlb7rd6-harness-secret-manager-overview)

### Required permissions

* Make sure you have **Create/Edit** permissions for Templates.
* Make sure you have **Create/Edit** permissions for Secrets.
* Make sure you have **Create/Edit** permissions for Connectors.

### Templates Overview

* You can add Secret Manager Templates to Template Libraries at any [scope](/article/vz5cq0nfg2-rbac-in-harness#scope).
* [Tags](/article/i8t053o0sq-tags-reference) can be used to group Templates. You can search or filter Templates using these tags.
* If you change the Template inputs, then you need to update the entities referencing the Template for the changes to get reflected.

### Secret Manager Template scope

You can add Secret ManagerTemplates at any [scope](/article/vz5cq0nfg2-rbac-in-harness) in Harness.

The following table shows what it means to add Templates at different scopes or hierarchies:



|  |  |
| --- | --- |
| **Scope** | **When to add Templates?** |
| **Account** | To share Secret Manager Templates with users in the Account, as well as users within the Organizations and Projects created within this Account. |
| **Organization** | To share Secret Manager Templates with users in the Organization as well as within the Projects created within the Org. |
| **Project** | To share Secret Manager Templates with users within the Project. |

### Step 1: Create a Secret Manager Template

You can create a Secret Manager Template in Account, Org, or Project scope.​

This topic shows you how to create a Secret Manager Template at the Project scope.​

1. In your Harness Account, go to your Project.​
2. In **Project Setup**, click **Templates** and then click **New Template**.​![](https://files.helpdocs.io/kw8ldg1itf/articles/n41cqkjrla/1661432712554/screenshot-2022-08-25-at-5-39-14-pm.png)
3. Click **Secret Manager**. The Secret Manager Template settings appear.​
4. Enter a **Name** for your Secret Manager Template.​
5. In **Version Label**, enter the version of the Secret Manager Template.  
For example v1.   
[Versioning](/article/6tl8zyxeol-template) a Template enables you to create a new Template without modifying the existing one. For more information, see [Versioning](/article/6tl8zyxeol-template).
6. Click **Start**.​![](https://files.helpdocs.io/kw8ldg1itf/articles/n41cqkjrla/1661432761259/screenshot-2022-08-25-at-5-41-34-pm.png)

### Step 2: Add a shell script to the Secret Manager Template

1. Enter your shell script in **Script**.​![](https://files.helpdocs.io/kw8ldg1itf/articles/n41cqkjrla/1661757992321/screenshot-2022-08-29-at-12-55-29-pm.png)Here is an example:
```
curl -o secret.json -X GET https://vaultqa.harness.io/v1/<+spec.environmentVariables.engineName>/<+spec.environmentVariables.path> -H 'X-Vault-Token: <+secrets.getValue("vaultTokenOne")>'  
secret=$(jq -r '.data."<+spec.environmentVariables.key>"' secret.json)
```
In this example, this script assigns the secret variable to your final value. Here are the details of the entries in the script.
	* This script makes a cURL call to the API URL of the third-party Secrets Manager and gets the output to the file secret.json.
	* It includes some parameters such as engine name and path.
	* It uses an existing, already configured Secrets Manager for API access.
	* After getting the file, as shown in the example, it gets the secret by using a third-party tool to retrieve the key from the data object. The key is also a parameter that can be assigned later.In the script, make sure to include a variable to store the fetched secret, and make sure to name the variable `secret`.

### Configure Input Variables for the shell script

All the parameters (engine name, path, and key in this case) can be defined as Input Variables while creating or editing the Secret Manager Template.

To do this, perform the following steps:

1. Click **Configuration** and click **Add Input Variable**.
2. Add **Name**, **Type**, and **Value** for the Input Variables in your script.  
Harness allows you to use [Fixed Values and Runtime Inputs](https://docs.harness.io/article/f6yobn7iq0-runtime-inputs).![The image shows the configuration tab for creating a secrets manager template. The user has specified three variables whose data type is string and whose values are to be specified at run time](https://files.helpdocs.io/kw8ldg1itf/articles/n41cqkjrla/1664385418574/secret-manager-template-configuratio.png)
3. Select **Execution Target**. This is where you want to execute the script that you just added.  
If you want to run the Shell Script on a target host and not on the Harness Delegate, you must first create the required connection attributes.  
To access an SSH-based Custom Secrets Manager, create an SSH credential first. See [Add SSH Keys](/article/xmp9j0dk8b-add-use-ssh-secrets) for the procedure to create SSH credentials.  
This does not apply if you want to run the Custom Secrets Manager on the Harness Delegate.
	1. Select **Specify Host** to execute the script on a specific host.![](https://files.helpdocs.io/kw8ldg1itf/articles/n41cqkjrla/1661762431468/screenshot-2022-08-29-at-2-09-46-pm.png)In **Target Host**, enter the host address.  
	In **SSH Connection Attribute**, create or select an existing secret that has the SSh credential as its value.  
	In **Working Directory**, enter the directory name.
	2. Select **Delegate**, to execute the script on a specific Delegate.
4. Click **Save**. Your Secret Manager Template is now listed in the Template Library.

### See also

* [Add a Custom Secret Manager](/article/mg09uspsx1-custom-secret-manager)

