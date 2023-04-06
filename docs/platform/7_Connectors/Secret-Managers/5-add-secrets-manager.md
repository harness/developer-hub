---
title: Add a Secret Manager
description: This document explains how to store and use encrypted secrets (such as access keys) using the built-in Harness Secrets Manager, AWS KMS, Google Cloud KMS, HashiCorp Vault, Azure Key Vault, CyberArk, and SSH via Kerberos.
sidebar_position: 3
helpdocs_topic_id: bo4qbrcggv
helpdocs_category_id: 48wnu4u0tj
helpdocs_is_private: false
helpdocs_is_published: true
---

Harness includes a built-in Secret Management feature that enables you to store encrypted secrets, such as access keys, and use them in your Harness Connectors and Pipelines.

Looking for specific secret managers? See:

* [Add an AWS KMS Secret Manager](../Secret-Managers/7-add-an-aws-kms-secrets-manager.md)
* [Add a HashiCorp Vault Secret Manager](../Secret-Managers/12-add-hashicorp-vault.md)
* [Add an Azure Key Vault Secret Manager](../Secret-Managers/8-azure-key-vault.md)
* [Add Google KMS as a Harness Secret Manager](../Secret-Managers/10-add-google-kms-secrets-manager.md)
* [Add an AWS Secrets Manager](../Secret-Managers/6-add-an-aws-secret-manager.md)

### Before you begin

* [Learn Harness' Key Concepts](../../../getting-started/learn-harness-key-concepts.md)
* [Harness Secret Management Overview](../Secret-Managers/1-harness-secret-manager-overview.md)

### Step 1: Configure Secret Manager

1. Select your **Account** or **Organization** or **Project**.
2. Select **Connectors** in **Setup**.
3. Create new **Connector.** The **Connectors** page appears**.**
4. Select a Secret Manager type under **Secret Managers**. See:
* [Add an AWS KMS Secret Manager](./7-add-an-aws-kms-secrets-manager.md)
* [Add a HashiCorp Vault Secret Manager](./12-add-hashicorp-vault.md)
* [Add an Azure Key Vault Secret Manager](./8-azure-key-vault.md)
* [Add Google KMS as a Harness Secret Manager](./10-add-google-kms-secrets-manager.md)
* [Add an AWS Secrets Manager](./6-add-an-aws-secret-manager.md)
5. Provide the account access information for the new secret manager.
6. If you choose to set this secret manager as the default, select **Use as Default Secret Manager**.
7. Click **Finish**.

When a new Default Secret Manager is set up, only new Cloud Provider and/Connector secret fields are encrypted and stored in the new Default Secret Manager. Cloud Providers and Connectors that were created before the modification, are unaffected. Where is the Secret for the Secret Manager Stored?

Harness stores all your secrets in your Secret Manager.

The secret you use to connect Harness to your Secret Manager (password, etc) is stored in the Harness Default Secret Manager.

You can't add secrets to the Org or Project scopes using an Account or Org Scope Secret Manager.

### Next steps

* Adding Secret Managers
	+ [Add an AWS KMS Secret Manager](./7-add-an-aws-kms-secrets-manager.md)
	+ [Add a HashiCorp Vault Secret Manager](./12-add-hashicorp-vault.md)
	+ [Add an Azure Key Vault Secret Manager](./8-azure-key-vault.md)
	+ [Add Google KMS as a Harness Secret Manager](./10-add-google-kms-secrets-manager.md)
	+ [Add an AWS Secrets Manager](./6-add-an-aws-secret-manager.md)
* Managing Secrets
	+ [Add Text Secrets](../../6_Secrets/2-add-use-text-secrets.md)
	+ [Add File Secrets](../../6_Secrets/3-add-file-secrets.md)
	+ [Add SSH Keys](../../6_Secrets/4-add-use-ssh-secrets.md)

