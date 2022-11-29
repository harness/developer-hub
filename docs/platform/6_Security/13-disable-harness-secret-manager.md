---
title: Disable Built-In Secret Manager
description: Disable Harness built-in Secret Manager.
# sidebar_position: 2
helpdocs_topic_id: p8rcsfra01
helpdocs_category_id: 48wnu4u0tj
helpdocs_is_private: false
helpdocs_is_published: true
---

Currently, this feature is behind the Feature Flag `DISABLE_HARNESS_SM`. Contact [Harness Support](mailto:support@harness.io) to enable the feature.Harness includes a built-in Secret Management feature that enables you to store encrypted secrets, such as access keys, and use them in your Harness Accounts, Organizations, or Projects.

You can choose to disable the Harness built-in Secret Manager at any point and use any other [Secret Manager](/article/bo4qbrcggv-add-secrets-manager) to store secrets.

This topic explains how to disable the built-in Harness Secret Manager.

### Before you begin
* Make sure you have Account Admin permissions to disable the built-in Secret Manager.  
For more information, see [API Permissions Reference](https://ngdocs.harness.io/article/bhkc68vy9c).

### Limitations

* When you disable the built-in Secret Manager, Harness does not move your existing secrets to another secret manager.
* Before you disable Harness built-in secret manager, you must have at least one Secret Manager in the Account scope.

### Review: Harness built-in secret manager

Harness always stores secrets in encrypted form and decrypts them when they are needed. Harness never makes secrets accessible publicly.

By default, Harness provides a built-in Secret Manager that you can use to store your secrets or you can create your own Secret Manager and use that instead. Every new organization or project that you create comes with a built-in Secret Manager by default. The default Secret Manager in Harness is Google Cloud Key Management Service, which is called Harness Built-in Secret Manager.

The Key Management Service only stores the key. Harness uses [envelope encryption](https://cloud.google.com/kms/docs/envelope-encryption) to encrypt and decrypt secrets. The encrypted secret and the encrypted Data Encryption Key (used for envelope encryption) are stored in the Harness database. 

### Step: Disable built-in secret manager

In your Harness Account, go to **Account Settings**.

Click **Connectors**.

![](https://files.helpdocs.io/i5nl071jo5/articles/p8rcsfra01/1645008004645/screenshot-2022-02-16-at-4-07-27-pm.png)Select **Disable default Harness Secret Manager** and then click **Apply.**

![](https://files.helpdocs.io/i5nl071jo5/articles/p8rcsfra01/1645014960647/screenshot-2022-02-16-at-6-05-02-pm.png)The built-in Secret Manager is no longer available in any of the following:

* List of Connectors inside Account/Org/Project Resources.
* List of Secret Managers populated while creating new secrets.
* Any new Organization or Project that you create.

 You can, however, continue to access the secrets created using this Secret Manager before it is disabled.

If you create a new Organization or Project after disabling Harness Built-In Secret Manager, you'll need to either create a new Secret Manager or refer to the Secrets generated in the Account before disabling built-in Secret Manager. This also means that if you try to set up a new Secret Manager in any scope, the credentials for it must already be stored in the Account scope as secrets.

You must have another Secret Manager created at the Account scope with its credentials saved as a secret in the built-in Secret Manager to disable the Harness Secret Manager.You can re-enable the built-in Secret Manager at any time. The built-in Secret Manager will be available in the Organizations and Projects created before it was disabled when you re-enable it. Any Organization or Project you add after you disable the built-in Secret Manager will not have this when you re-enable it.

### See also

* [Add Google KMS as a Harness Secret Manager](https://ngdocs.harness.io/article/cyyym9tbqt-add-google-kms-secrets-manager)
* [Add an AWS KMS Secret Manager](https://ngdocs.harness.io/article/pt52h8sb6z-add-an-aws-kms-secrets-manager)
* [Add an AWS Secret Manager](https://ngdocs.harness.io/article/a73o2cg3pe-add-an-aws-secret-manager)
* [Add an Azure Key Vault Secret Manager](https://ngdocs.harness.io/article/53jrd1cv4i-azure-key-vault)
* [Add a HashiCorp Vault Secret Manager](https://ngdocs.harness.io/article/s65mzbyags-add-hashicorp-vault)

