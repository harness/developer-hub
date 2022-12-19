---
title: Use Secrets in a Delegate Profile (Deprecated)
description: Create encrypted text in Harness Secrets Management for the credentials, and then use variable names for those credentials in the Delegate Profile.
sidebar_position: 120
helpdocs_topic_id: imzgiz9h41
helpdocs_category_id: gyd73rp7np
helpdocs_is_private: false
helpdocs_is_published: true
---

```mdx-code-block
import image_1 from './static/use-a-secret-in-a-delegate-profile-24.png'
import image_2 from './static/use-a-secret-in-a-delegate-profile-29.png'
import image_3 from './static/use-a-secret-in-a-delegate-profile-30.png'
```
:::caution
Using Profiles is Deprecated. Please use [Run Initialization Scripts on Delegates](run-initialization-scripts-on-delegates.md).
:::

To use secrets in a Delegate Profile, create encrypted text in Harness Secrets Management for the credentials, and then use variable names for those credentials in the Delegate Profile.

In this topic:

* [Before You Begin](#before-you-begin)
* [Step 1: Add Encrypted Texts](#step-1-add-encrypted-texts)
* [Step 2: Manage Delegate Profiles](#step-2-manage-delegate-profiles)
* [Step 3: Use Secret in Profile Script](#step-3-use-secret-in-profile-script)
* [Review: Use Config Files in Delegate Profiles](#review-use-config-files-in-delegate-profiles)

## Before You Begin

* [Harness Key Concepts](../../../starthere-firstgen/harness-key-concepts.md)
* [Secrets Management Overview](../../security/secrets-management/secret-management.md)
* [Use Encrypted Text Secrets](../../security/secrets-management/use-encrypted-text-secrets.md)
* [Run Scripts on Delegates using Profiles](run-scripts-on-the-delegate-using-profiles.md)

## Step 1: Add Encrypted Text

For [Delegate Profiles](delegate-installation.md#delegate-profiles), if you wanted to add a Helm repo that requires login credentials to every Kubernetes pod running a Harness Kubernetes Delegate, you can create encrypted text in Harness Secrets Management for those credentials, and then use variable names for those credentials in the Delegate Profile using the `${secrets.getValue("secret_name")}` expression.

For more information about Delegate Profiles, see [Run Scripts on Delegates using Profiles](run-scripts-on-the-delegate-using-profiles.md) and [Common Delegate Profile Scripts](../../techref-category/account-ref/delegate-ref/common-delegate-profile-scripts.md).

1. In Harness, select **Continuous Security** > **Secrets Management**.  
The **Secrets Management** page appears.
2. Under **Execution Credentials**, click **Encrypted Text**. The **Encrypted Text** page appears.
3. Click **Add Encrypted Text**. The **Add Encrypted Text** dialog appears.

```mdx-code-block
<img src={image_1} height="400" width="500" />
```


4. In **Name**, enter **repoUsername**. This name will be used later in the **Delegate Profile** script to reference this secret.
5. In **Value**, enter any **username**. The dialog will look like this:

![](./static/use-a-secret-in-a-delegate-profile-25.png)

6. In **Usage Scope**, click **Scope to Account**. This will scope the secret to the Account-level. It can then be used in a Delegate Profile.
:::note
You must set **Usage Scope** to **Scope to Account** to use the secret in a Delegate Profile. Once it is set to **Scope to Account**, the secret can used in a Delegate Profile only.
:::

![](./static/use-a-secret-in-a-delegate-profile-26.png)

7. Click **Submit**.
8. Add a second encrypted text with the name **repoPassword**, using any password. Be sure to set **Usage Scope** to **Scope to Account**, also. The dialog will look like this:

![](./static/use-a-secret-in-a-delegate-profile-27.png)

9. Click **Submit**. Now you can create a Delegate Profile and use these secrets.

## Step 2: Manage Delegate Profiles

1. Click **Setup**.
2. Click **Harness Delegates**.
3. Click **Manage Delegate Profiles**, and then **Add Delegate Profile**.

![](./static/use-a-secret-in-a-delegate-profile-28.png)

The **Manage Delegate Profile** dialog appears.
4. In **Name**, enter **Helm Repo**.

## Step 3: Use Secret in Profile Script

1. In **Startup Script**, enter your Helm commands using the secrets you created:  
  
`helm init --client-only`  
  
`helm repo add --username`**`${secrets.getValue(“repoUsername”)}`**`--password`**`${secrets.getValue(“repoPassword”)}`**`nginx https://charts.bitnami.com/bitnami`  
  
`helm repo update`  
  
The secrets are referenced as variables using `${secrets.getValue()}` and the names you gave them, **repoUsername** and **repoPassword**:  
  
`${secrets.getValue(“repoUsername”)}`  
`${secrets.getValue(“repoPassword”)}`  
  
The **Manage Delegate Profile** dialog will look like this:

```mdx-code-block
<img src={image_2} height="400" width="500" />
```

2. Click **Submit**.

Now when you add this profile to a Kubernetes Delegate, it will add the Helm repo using the credentials you added as **Encrypted Text** in Harness **Secrets Management**.

A quick way to get the name of a secret is to hover over the secrets in **Secrets Management** and click the Copy icon:

```mdx-code-block
<img src={image_3} height="100" width="200" />
```

## Review: Use Config Files in Delegate Profiles

The [Service Config file](../../../continuous-delivery/model-cd-pipeline/setup-services/add-service-level-configuration-files.md) expressions `${configFile.getAsString("fileName")}` and `${configFile.getAsBase64("fileName")}` are not supported in [Delegate Profiles](run-scripts-on-the-delegate-using-profiles.md).

Instead, encode the file in base64 and then add the file to Harness as an [Encrypted File Secret](../../security/secrets-management/use-encrypted-file-secrets.md).

Next, in the Delegate Profile script, reference the secret, pipe it to base64 and output it to the path where you need it:


```
echo ${secrets.getValue("secret_name")} | base64 -d > /path/to/file
```
