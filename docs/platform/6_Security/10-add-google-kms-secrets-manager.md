---
title: Add Google KMS as a Harness Secret Manager
description: This topic explains steps to add Google KMS as a Secret Manager.
# sidebar_position: 2
helpdocs_topic_id: cyyym9tbqt
helpdocs_category_id: 48wnu4u0tj
helpdocs_is_private: false
helpdocs_is_published: true
---

You can use Google [Cloud Key Management Service](https://cloud.google.com/security-key-management) (Cloud KMS) as a Harness Secret Manager. Once Google KMS is added as a Secrets Manager, you can create encrypted secrets in Google KMS and use them in your Harness account.

For details on Harness Secret Managers, see [Harness Secret Manager Overview](/article/hngrlb7rd6-harness-secret-manager-overview).

This topic describes how to add a Google KMS Secret Manager in Harness.


### Add a secret manager

This topic assumes you have a Harness Project set up. If not, see [Create Organizations and Projects](/article/36fw2u92i4-create-an-organization).

You can add a Connector from any module in your Project in Project setup, or in your Organization or Account Resources.

In **Connectors**, click **Connector**.

In **Secret Managers**, click **GCP KMS** under **Secret Managers**.

![](https://files.helpdocs.io/i5nl071jo5/articles/cyyym9tbqt/1633930160335/screenshot-2021-10-11-at-10-54-51-am.png)The **GCP Key Management Service** settings appear.

![](https://files.helpdocs.io/i5nl071jo5/articles/cyyym9tbqt/1633535711169/screenshot-2021-10-06-at-9-24-27-pm.png)In **Name,** enter a name for your Secret Manager.  You will use this name to select this Secret Manager when adding or selecting a secret.

Enter a description for your Secret Manager.

Enter tags for your Secret Manager.

Click **Continue**.

### Obtain Google Cloud symmetric key

To obtain the values for the Details page, you'll need a Google Cloud Symmetric Key.

In the [Google Cloud Console](https://console.cloud.google.com/), select your project.

Select **Security** > **Key** **Management**.

Select/create a key ring. Select/create a key in the key ring.

To create resources in this or the next step, see Google Cloud's [Creating Symmetric Keys](https://cloud.google.com/kms/docs/creating-keys) topic.Open the Actions menu (⋮), then click **Copy Resource Name**.

![](https://files.helpdocs.io/i5nl071jo5/articles/cyyym9tbqt/1633670463751/screenshot-2021-10-08-at-10-49-00-am.png)A reference to the key is now on your clipboard.

Paste the reference into an editor. You can now copy and paste its substrings into each of the Harness Secret Manager’s **Details** settings as shown below.

![](https://files.helpdocs.io/i5nl071jo5/articles/cyyym9tbqt/1633693386649/screenshot-2021-10-08-at-5-12-29-pm.png)

### Attach service account key (credentials) file

Next, you will export your Google Cloud service account key and attach it to the **Details** page in Harness.

First, you need to grant a Principal the Cloud KMS CryptoKey Encrypter/Decrypter (cloudkms.cryptoKeyEncrypterDecrypter) role.

In Google Cloud Console, go to the IAM page.

Locate the Principal you want to use, and click Edit.

In Edit permissions, add the Cloud KMS CryptoKey Encrypter/Decrypter role and click Save.

![](https://files.helpdocs.io/i5nl071jo5/articles/cyyym9tbqt/1634892938561/screenshot-2021-10-22-at-11-48-30-am.png)See Google [Permissions and roles](https://cloud.google.com/kms/docs/reference/permissions-and-roles) and Cloud's Using Cloud IAM with KMSCloud's Using Cloud IAM with KMS topics.

Next, you'll select the Service Account for that Principal and export its Key file.

In the Google Cloud Console, in IAM & Admin, go to Service Accounts.

Scroll to the service account for the Principal you gave the Cloud KMS CryptoKey Encrypter/Decrypter role. If no service account is present, create one.

Open your service account's Actions ⋮ menu, then select **Manage keys**.

Select **ADD KEY** > **Create new key**.

![](https://files.helpdocs.io/i5nl071jo5/articles/cyyym9tbqt/1633690607040/screenshot-2021-10-08-at-4-22-40-pm.png)In the resulting Create private key dialog, select JSON, create the key, and download it to your computer.

Return to the Secret Manager's Details page in Harness.

Under GCP KMS Credentials File, click **Create or Select a Secret**. You can create a new [File Secret](https://ngdocs.harness.io/article/77tfo7vtea-add-file-secrets)  and upload the key file you just exported from Google Cloud.

![](https://files.helpdocs.io/i5nl071jo5/articles/cyyym9tbqt/1633691386119/screenshot-2021-10-08-at-4-39-07-pm.png)Click **Save** and then **Continue**.

### Setup delegates

In **Delegates** **Setup****,** use [**Selectors**](/article/nnuf8yv13o-select-delegates-with-selectors#option_select_a_delegate_for_a_connector_using_tags) to select any specific **Delegates** that you want this Connector to use. Click **Save and Continue.**

### Test connection

In **Connection** **Test**, click **Finish** after your connection is successful**.**

![](https://files.helpdocs.io/i5nl071jo5/articles/cyyym9tbqt/1634895260101/screenshot-2021-10-22-at-1-02-10-pm.png)