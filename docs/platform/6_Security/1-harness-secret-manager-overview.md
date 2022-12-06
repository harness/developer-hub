---
title: Harness Secrets Management Overview
description: Harness includes a built-in Secrets Management feature that enables you to store encrypted secrets, such as access keys, and use them in your Harness account. Some key points about Secrets Management…
# sidebar_position: 2
helpdocs_topic_id: hngrlb7rd6
helpdocs_category_id: sy6sod35zi
helpdocs_is_private: false
helpdocs_is_published: true
---

Harness includes a built-in Secrets Management feature that enables you to store encrypted secrets, such as access keys, and use them in your Harness account. Some key points about Secrets Management:

* Secrets are always stored in encrypted form and decrypted when they are needed.
* Harness Manager does not have access to your key management system, and only the Harness Delegate, which sits in your private network, has access to it. Harness never makes secrets management accessible publicly. This adds an important layer of security.

### Before you begin

* See [Harness Key Concepts](https://docs.harness.io/article/hv2758ro4e-learn-harness-key-concepts)

### Visual Summary

You can choose to use your own secrets management solution, or the built-in Harness Secrets Manager. This diagram shows how Harness handles secrets:

![](./static/harness-secret-manager-overview-44.png)
### Harness Secrets Management Process Overview

Harness sends only encrypted data to the Secrets Manager, as follows: 

1. Your browser sends data over HTTPS to Harness Manager.
2. Harness Manager relays encrypted data to the Harness Delegate, also over HTTPS.
3. The Delegate exchanges a key pair with the Secrets Manager, over an encrypted connection.
4. The Harness Delegate uses the encrypted key and the encrypted secret and then discards them. The keys never leave the Delegate.

Any secrets manager requires a running Harness Delegate to encrypt and decrypt secrets. Any Delegate that references a secret requires direct access to the Secrets Manager.You can manage your secrets in Harness using either a Key Management Service or third-party Secrets Manager.

#### Using Key Management Services

Google Cloud Key Management Service is the default Secrets Manager in Harness and is named Harness Secrets Manager Google KMS.

The Key Management Service (Google Cloud KMS or AWS KMS) only stores the key. Harness uses [envelope encryption](https://cloud.google.com/kms/docs/envelope-encryption) to encrypt and decrypt secrets. The encrypted secret and the encrypted Data Encryption Key (used for envelope encryption) are stored in the Harness database. 

If you are using a KMS, rotation of keys is not supported by Harness and you might lose access to your secrets if the older version of the key is removed from your KMS.

#### Using Third-Party Secrets Managers

You can also use third-party Secrets Managers, for example, HashiCorp Vault, Azure Key Vault, and AWS Secrets Manager.

These Secrets Managers store the key, perform encryption and decryption, and also store the secrets (encrypted key pair). Neither the keys nor the secrets are stored in the Harness database. A reference to the secret is stored in the Harness database.

#### Secrets in Harness Community and Self-Managed Enterprise Edition Accounts

In Community and Self-Managed Enterprise Edition accounts, Harness uses a random-key secrets store as the Harness Secrets Manager.

Once you have installed Self-Managed Enterprise Edition, [Add a Secrets Manager](./5-add-secrets-manager.md). By default, Self-Managed Enterprise Edition installations use the local Harness MongoDB for the default Harness Secrets Manager. This is not recommended.Harness does not currently support migrating secrets from the random-key secrets store. If you add secrets here, you will need to recreate them in any custom secrets manager you configure later.All Harness secrets managers require a running Harness Delegate to encrypt and decrypt secrets.

If you created a Harness trial account, a Delegate is typically provisioned by Harness, and the default Harness Secrets Manager performs encryption/decryption.

#### Harness Secrets and Harness Git Experience

When you set up [Harness Git Experience](../10_Git-Experience/git-experience-overview.md), you select the Connectivity Mode for Git syncing. You have two options:

* **Connect Through Manager:** Harness SaaS will connect to your Git repo whenever you make a change and Git and Harness sync.
* **Connect Through Delegate:** Harness will make all connections using the Harness Delegate. This option is used for Self-Managed Enterprise Edition frequently, but it is also used for Harness SaaS. See [Harness Self-Managed Enterprise Edition Overview](https://docs.harness.io/article/tb4e039h8x-harness-on-premise-overview).

If you select **Connect Through Manager**, the Harness Manager decrypts the secrets you have set up in the Harness Secrets Manager.

This is different than **Connect Through Delegate** where only the Harness Delegate, which sits in your private network, has access to your key management system.

