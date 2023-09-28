---
title: What is Secrets Management?
description: Covers the built-in Harness Secrets Manager, and integrations with external Key Management System options like Google Cloud KMS, AWS KMS, and HashiCorp Vault.
# sidebar_position: 2
helpdocs_topic_id: au38zpufhr
helpdocs_category_id: o9x167at52
helpdocs_is_private: false
helpdocs_is_published: true
---

This content is for Harness [FirstGen](../../../../getting-started/harness-first-gen-vs-harness-next-gen.md). Switch to [NextGen](/docs/platform/secrets/secrets-management/harness-secret-manager-overview).Harness includes a built-in Secrets Management feature that enables you to store encrypted secrets, such as access keys, and use them in your Harness applications. Some key points about Secrets Management:

* Secrets are always accessed/decrypted at the time when they are needed, and at no time they are stored unencrypted.
* Harness Manager does not have access to your key management system, and only the Harness Delegate, which sits in your private network, has access to it. Harness never makes secrets management accessible publicly. This adds an important layer of security.

In this topic:

* [Secrets How-tos](#secrets_how_tos)
* [Before You Begin](#before_you_begin)
* [Visual Summary](#visual_summary)
* [Harness Secrets Management Process Overview](#harness_secrets_management_process_overview)
* [Scoping Secrets Usage](#scoping_secrets_usage)
* [Secrets in Harness Community and On-Prem Accounts](#secrets_in_harness_community_and_on_prem_accounts)

### Secrets How-tos

* Adding Secrets Managers
	+ [Add a Google Cloud KMS Secrets Manager](add-a-google-cloud-kms-secrets-manager.md)
	+ [Add an AWS Secrets Manager](add-an-aws-secrets-manager.md)
	+ [Add an AWS KMS Secrets Manager](add-an-aws-kms-secrets-manager.md)
	+ [Add an Azure Key Vault Secrets](azure-key-vault.md)
	+ [Add a HashiCorp Vault Secrets Manager](add-a-hashi-corp-vault-secrets-manager.md)
* Managing Secrets
	+ [Use Encrypted Text Secrets](use-encrypted-text-secrets.md)
	+ [Use Encrypted File Secrets](use-encrypted-file-secrets.md)
	+ [Migrate Secrets between Secrets Managers](migrate-secrets-between-secrets-managers.md)
	+ [Restrict Secrets Usage](restrict-secrets-usage.md)
	+ [Reference Existing Secrets](reference-existing-secrets.md)
	+ [Use Secrets in a Delegate Profile](../../account/manage-delegates/use-a-secret-in-a-delegate-profile.md)
	+ [Add SSH Keys](add-ssh-keys.md)
	+ [Use SSH Keys via Kerberos for Server Authentication](use-ssh-key-via-kerberos-for-server-authentication.md)
	+ [Add HashiCorp Vault Signed SSH Certificate Keys](add-hashi-corp-vault-signed-ssh-certificate-keys.md)
	+ [Add WinRM Connection Credentials](add-win-rm-connection-credentials.md)

### Before You Begin

Before learning about, you should have an understanding of the following:

* [Harness Key Concepts](../../../starthere-firstgen/harness-key-concepts.md)
* [Secrets and Log Sanitization](../../techref-category/techref-security/secrets-and-log-sanitization.md)

### Visual Summary

You can choose to use your own secrets management solution, or the built-in Harness Secrets Manager. This diagram shows how Harness handles secrets:

![](./static/secret-management-55.jpg)

### Harness Secrets Management Process Overview

Harness sends only encrypted data to the secrets manager, as follows: 

1. Your browser sends data over HTTPS to Harness Manager.
2. Harness Manager relays encrypted data to the Harness Delegate, also over HTTPS.
3. The Delegate exchanges a key pair with the secrets manager, over an encrypted connection.
4. The Harness Delegate uses the encrypted key and the encrypted secret, and then discards them. The keys never leave the Delegate.

Any secrets manager requires a running Harness Delegate to encrypt and decrypt secrets. Any Delegate that references a secret requires direct access to the secrets manager.You can manage your secrets in Harness using either a Key Management Service or third party Secrets Managers.

#### Using Key Management Services

Google Cloud Key Management Service is the default Secrets Manager in Harness. 

The Key Management Service (Google Cloud KMS or AWS KMS) only stores the key. Harness uses [envelope encryption](https://cloud.google.com/kms/docs/envelope-encryption) to encrypt and decrypt the secrets. The encrypted secret and the encrypted Data Encryption Key (used for envelope encryption) are stored in the Harness database. 

If you are using a KMS, rotation of keys is not supported by Harness and you might lose access to your secrets if the older version of the key is removed from your KMS.

#### Using Third-Party Secrets Managers

You can also use third-party Secrets Managers — HashiCorp Vault, Azure Key Vault, and AWS Secrets Manager.

These Secrets Managers store the key, perform encryption and decryption, and also store the secrets (encrypted key pair). Neither the keys nor the secrets are stored in the Harness database. A reference to the secret is stored in the Harness database.

### Scoping Secrets Usage

For scoping secrets, see [Restrict Secrets Usage](restrict-secrets-usage.md).

For scoping Secret Managers, see [Scope Secret Managers to Applications and Environments](scope-secret-managers-to-applications-and-environments.md).

### Secrets in Harness Community and On-Prem Accounts

In [Community](../../../starthere-firstgen/harness-editions.md) and [On-Prem](../../../starthere-firstgen/harness-on-premise-versions.md) accounts, Harness uses a random-key secrets store as the Harness Secrets Manager.

Once you have installed On-Prem, [Add a Harness Secrets Manager](add-a-secrets-manager.md). By default, On-Prem installations use the local Harness MongoDB for the default Harness Secrets Manager. This is not recommended.Harness does not currently support migrating secrets from the random-key secrets store. If you add secrets here, you will need to recreate them in any custom secrets manager you configure later.All Harness secrets managers require a running Harness Delegate to encrypt and decrypt secrets.

If you created a Harness trial account, a Delegate is typically provisioned by Harness, and the default Harness Secrets Manager performs encryption/decryption.

