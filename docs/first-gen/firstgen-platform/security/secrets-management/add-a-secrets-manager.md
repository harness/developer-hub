---
title: Add a Secrets Manager
description: To store and use encrypted secrets (such as access keys), your options include the built-in Harness Secrets Manager, AWS KMS, Google Cloud KMS, HashiCorp Vault, Azure Key Vault, CyberArk, and SSH via Kerberos.
# sidebar_position: 2
helpdocs_topic_id: uuer539u3l
helpdocs_category_id: o9x167at52
helpdocs_is_private: false
helpdocs_is_published: true
---

Harness includes a built-in Secrets Management feature that enables you to store encrypted secrets, such as access keys, and use them in your Harness applications.

In this topic:

* [Before You Begin](#before_you_begin)
* [Step 1: Configure Secrets Manager](#step_1_configure_secrets_manager)
* [Where is the Secret for the Secret Manager Stored?](#where_is_the_secret_for_the_secret_manager_stored)
* [Next Steps](#next_steps)

Looking for specific secrets managers? See:

* [Add a Google Cloud KMS Secrets Manager](/article/avo98eldl0-add-a-google-cloud-kms-secrets-manager)
* [Add a Google Cloud Secrets Manager](/article/t0rj3ze6ui-add-a-google-cloud-secrets-manager)
* [Add an AWS Secrets Manager](/article/otkxijqoa6-add-an-aws-secrets-manager)
* [Add an AWS KMS Secrets Manager](/article/qj4psb5vsf-add-an-aws-kms-secrets-manager)
* [Add a HashiCorp Vault Secrets Manager](/article/am3dmoxywy-add-a-hashi-corp-vault-secrets-manager)
* [Add an Azure Key Vault Secrets Manager](/article/2nv0gy1wnh-azure-key-vault)

### Before You Begin

* See [Harness Key Concepts](/article/4o7oqwih6h-harness-key-concepts).
* See [Secrets Management Overview](/article/au38zpufhr-secret-management).

### Step 1: Configure Secrets Manager

1. Select **Security** > **Secrets Management**. The **Secrets Management** page appears.
2. Click **Configure Secrets Managers**. In the resulting **Secrets Managers** page, the **Status** column indicates the **Default** provider.![](https://files.helpdocs.io/kw8ldg1itf/articles/uuer539u3l/1595260970175/default-sm.png)
3. Click **Add Secrets Manager**. The **Configure Secrets Manager** dialog appears.![](https://files.helpdocs.io/kw8ldg1itf/articles/q7fqo7wt73/1585269893376/image.png)
4. Provide the account access information for the new secrets manager.
5. If you choose to set this secrets manager as the default, select **Use as Default Secrets Manager**.
6. For **Usage Scope**, see [Scope Secret Managers to Applications and Environments](/article/e4ikpd00f6-scope-secret-managers-to-applications-and-environments).
7. Click **Submit**.

When a new Default Secrets Manager is set up, only new Cloud Provider and/Connector secret fields are encrypted and stored in the new Default Secrets Manager. Existing Cloud Providers and Connectors created before the change are unaffected.

### Where is the Secret for the Secret Manager Stored?

Harness stores all your secrets in your Secret Manager.

The secret you use to connect Harness to your Secrets Manager (password, etc), is stored in the Harness Default Secret Manager.

### Next Steps

* Adding Secret Managers
	+ [Add a Google Cloud KMS Secrets Manager](/article/avo98eldl0-add-a-google-cloud-kms-secrets-manager)
	+ [Add an AWS Secrets Manager](/article/otkxijqoa6-add-an-aws-secrets-manager)
	+ [Add an AWS KMS Secrets Manager](/article/qj4psb5vsf-add-an-aws-kms-secrets-manager)
	+ [Add a HashiCorp Vault Secrets Manager](/article/am3dmoxywy-add-a-hashi-corp-vault-secrets-manager)
	+ [Add an Azure Key Vault Secrets Manager](/article/2nv0gy1wnh-azure-key-vault)
* Managing Secrets
	+ [Scope Secret Managers to Applications and Environments](/article/e4ikpd00f6-scope-secret-managers-to-applications-and-environments)
	+ [Restrict Secrets Usage](/article/e5q9qcho4y-restrict-secrets-usage)
	+ [Use Encrypted Text Secrets](/article/ygyvp998mu-use-encrypted-text-secrets)
	+ [Use Encrypted File Secrets](/article/nt5vchhka4-use-encrypted-file-secrets)
	+ [Migrate Secrets between Secrets Managers](/article/prjsaaev0c-migrate-secrets-between-secrets-managers)
	+ [Restrict Secrets Usage](/article/e5q9qcho4y-restrict-secrets-usage)
	+ [Reference Existing Secrets](/article/cwp7rlauzn-reference-existing-secrets)
	+ [Use Secrets in a Delegate Profile](/article/imzgiz9h41-use-a-secret-in-a-delegate-profile)

