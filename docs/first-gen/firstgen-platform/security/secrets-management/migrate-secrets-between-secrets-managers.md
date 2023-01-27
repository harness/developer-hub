---
title: Migrate Secrets between Secrets Managers
description: Harness Secrets Management supports the ability to migrate your secrets between secrets managers. In this topic --  Before You Begin. Review --  Important Migration Topics. Step --  Migrating Secrets. Next St…
# sidebar_position: 2
helpdocs_topic_id: prjsaaev0c
helpdocs_category_id: o9x167at52
helpdocs_is_private: false
helpdocs_is_published: true
---

Harness Secrets Management supports the ability to migrate your secrets between secrets managers.

In this topic:

* [Before You Begin](#before_you_begin)
* [Review: Important Migration Topics](#review_important_migration_topics)
* [Step: Migrating Secrets](#step_migrating_secrets)
* [Next Steps](#next_steps)

### Before You Begin

* [Harness Key Concepts](../../../starthere-firstgen/harness-key-concepts.md)
* [Add a Secrets Manager](add-a-secrets-manager.md)

### Limitations

For Harness On-Prem, you cannot migrate from a third-party secret manager to **Harness Secrets Manager**. You can migrate from Harness Secrets Manager to a third-party secret manager, but not back to Harness Secrets Manager.

Instead, simply migrate between your third-party secret managers without attempting to revert to Harness Secrets Manager.

### Review: Important Migration Topics

#### HashiCorp Vault Migration

When migrating to HashiCorp Vault, the vault must not be read-only. If it is read-only, the migration will fail.

The migrated secrets are created in the vault at the path specified by:

* Encrypted text:  
 `/<SECRET_ENGINE_NAME>/<BASE_PATH_IN_VAULT_CONFIGURATION>/<SECRET_TEXT>/<NAME OF THE SECRET>`
* Encrypted file:  
`/<SECRET_ENGINE_NAME>/<BASE_PATH_IN_VAULT_CONFIGURATION>/<CONFIG_FILE>/<NAME OF THE FILE>`

#### Secret References and Migration

Encrypted text secrets are referenced in Harness components using the expression `${secrets.getValue("secret_name")}`.

Encrypted file secrets are referenced by these expressions:

* `${configFile.getAsBase64("secret_name")}` — This displays the contents of the file encoded in Base64 binary-to-text encoding schemes.
* `${configFile.getAsString("secret_name")}` — This displays the contents of the file as a string.

When you migrate secrets, any references to the secrets do not need to be changed in any way. The same secrets will work with the new secret manager. No action is required.

#### Secrets in Transit during Migration

During migration transmission, secrets are encrypted by AES 256 encryption. They are always transmitted over HTTPS.

### Step: Migrating Secrets

1. In **Secrets Management**, click **Configure Secrets Managers**.
2. Next to the secrets manager from which you want to migrate secrets, click **Migrate**.![](./static/migrate-secrets-between-secrets-managers-59.png)

3. In the **Migrate Secrets** dialog, select your target secrets manager in the **Transition Secrets to:** drop‑down list, and click **Submit**.![](./static/migrate-secrets-between-secrets-managers-60.png)


### Next Steps

* [Use Encrypted Text Secrets](use-encrypted-text-secrets.md)
* [Use Encrypted File Secrets](use-encrypted-file-secrets.md)

