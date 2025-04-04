---
title: Reference Existing Secret Manager Secrets
description: If you already have secrets created in your Secrets Manager, you can reference them.
# sidebar_position: 2
helpdocs_topic_id: cwp7rlauzn
helpdocs_category_id: o9x167at52
helpdocs_is_private: false
helpdocs_is_published: true
---

This content is for Harness FirstGen. Switch to [NextGen](/docs/platform/secrets/secrets-management/reference-existing-secret-manager-secrets).

If you already have secrets created in a secrets manager such as HashiCorp Vault or AWS Secrets Manager, you do not need to re-create the existing secrets in Harness.

Harness does not query the secrets manager for existing secrets, but you can create a secret in Harness that references an existing secret in HashiCorp Vault or AWS Secrets Manager. No new secret is created in those providers. If you delete the secret in Harness, it does not delete the secret in the provider.

### Before You Begin

* See [Add an AWS Secrets Manager](add-an-aws-secrets-manager.md).
* See [Add a HashiCorp Vault Secrets Manager](add-a-hashi-corp-vault-secrets-manager.md).
* See [Add Azure Key Vault Secrets](azure-key-vault.md).

### Option: Vault Secrets

You can create a Harness secret that refers to the existing Vault secret using a path and key, such as `/path/secret_key#my_key`.

![](./static/reference-existing-secrets-44.png)
In the above example, `/foo/bar` is the pre-existing path, `MyVaultSecret` is the secret name, and `MyKey` is the key used to lookup the secret value.

Do not prepend the Vault secrets engine to the path. In the above example, if the secret (`/foo/bar/MyVaultSecret#MyKey`) had been generated by a Vault secrets engine named `harness-engine`, it would reside in this full path `/harness-engine/foo/bar/MyVaultSecret#MyKey`. However, in the **Value** field, you would enter only `/foo/bar/MyVaultSecret#MyKey`.This Harness secret is simply a reference pointing to an existing Vault secret. Deleting this Harness secret will not delete the Vault secret referred to by this secret.

You can also reference pre-existing Vault secrets in the Harness YAML editor, as described in [Encrypted Information in YAML](../../techref-category/configuration-as-code-yaml/harness-yaml-code-reference.md#encrypted-information-in-yaml).

### Option: AWS Secrets Manager Secrets

You can create a Harness secret that refers to an existing secret in AWS Secrets Manager using the name of the secret, and a prefix if needed. For example, `devops/mySecret`.

![](./static/reference-existing-secrets-45.png)


##### Referencing Secret Keys

In AWS Secrets Manager, your secrets are specified as key-value pairs, using a JSON collection:

![](./static/reference-existing-secrets-46.png)
To reference a specific key in your Harness secret, add the key name following the secret name, like `secret_name#key_name`. In the above example, the secret is named **example4docs**. To reference the **example1** key, you would enter `example4docs#example1`.

![](./static/reference-existing-secrets-47.png)


### Option: Azure Key Vault Secrets

You can create a Harness secret that refers to an existing secret in Azure Key Vault, using that secret's name (for example: `azureSecret`). You can also specify the secret's version (for example: `azureSecret/05`).

![](./static/reference-existing-secrets-48.png)


### Option: Google Cloud Secret Manager

You can create a Harness secret that refers to an existing secret in Google Cloud Secret Manager.

In Secrets Manager, select the Google Cloud Secrets Manager you added to Harness. See [Add a Google Cloud Secrets Manager](add-a-google-cloud-secrets-manager.md).

In **Reference Secret Name**, enter the name of an existing secret in GCP.

In **Version**, enter the secret version you want to use.

In **Region**, enter the location of the secret. If the secret is **Automatically replicated**, leave this empty.

![](./static/reference-existing-secrets-49.png)


### Next Steps

* [Migrate Secrets Between Secrets Managers](migrate-secrets-between-secrets-managers.md)

