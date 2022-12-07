---
title: Add HashiCorp Vault Signed SSH Certificate Keys
description: Currently, this feature is behind a Feature Flag. Contact Harness Support to enable the feature. Feature Flags can only be removed for Harness Professional and Essentials editions. Once the feature i…
# sidebar_position: 2
helpdocs_topic_id: 8y73f4o4ph
helpdocs_category_id: o9x167at52
helpdocs_is_private: false
helpdocs_is_published: true
---

Currently, this feature is behind a Feature Flag. Contact [Harness Support](mailto:support@harness.io) to enable the feature. Feature Flags can only be removed for Harness Professional and Essentials editions. Once the feature is released to a general audience, it's available for Trial and Community Editions.You can use Vault Secrets Engine Signed SSH Certificates in Harness.

Vault Secrets Engine provides signed public keys. SSH certificate authentication helps you avoid the common challenges with SSH public key authentication (rekeying, scaling, etc).

The setup process is simple. You add your private key to Harness as an encrypted key file, specify the Vault SSH Engine to use, paste in the public key, and specify the Vault role used for signing client keys.

This topic assumes you are familiar with creating Signed SSH Certificates in Vault and have a running HashiCorp Secrets Engine. For more information, see [Signed SSH Certificates](https://www.vaultproject.io/docs/secrets/ssh/signed-ssh-certificates) from Vault.In this topic:

* [Before You Begin](https://docs.harness.io/article/8y73f4o4ph-add-hashi-corp-vault-signed-ssh-certificate-keys#before_you_begin)
* [Supported Platforms and Technologies](https://docs.harness.io/article/8y73f4o4ph-add-hashi-corp-vault-signed-ssh-certificate-keys#undefined)
* [Visual Summary](https://docs.harness.io/article/8y73f4o4ph-add-hashi-corp-vault-signed-ssh-certificate-keys#visual_summary)
* [Step 1: Add a Harness Vault Secrets Engine Secrets Manager](https://docs.harness.io/article/8y73f4o4ph-add-hashi-corp-vault-signed-ssh-certificate-keys#step_1_add_a_harness_vault_secrets_engine_secrets_manager)
* [Step 2: Create SSH Key](https://docs.harness.io/article/8y73f4o4ph-add-hashi-corp-vault-signed-ssh-certificate-keys#step_2_create_ssh_key)
* [Step 3: Credentials](https://docs.harness.io/article/8y73f4o4ph-add-hashi-corp-vault-signed-ssh-certificate-keys#step_3_credentials)
* [Step 4: Select Encrypted SSH key Files](https://docs.harness.io/article/8y73f4o4ph-add-hashi-corp-vault-signed-ssh-certificate-keys#step_4_select_encrypted_ssh_key_files)
* [Option: Select Encrypted Passphrase](https://docs.harness.io/article/8y73f4o4ph-add-hashi-corp-vault-signed-ssh-certificate-keys#option_select_encrypted_passphrase)
* [Step 5: SSH Port](https://docs.harness.io/article/8y73f4o4ph-add-hashi-corp-vault-signed-ssh-certificate-keys#step_5_ssh_port)
* [Step 6: Select HashiCorp Vault SSH Engine](https://docs.harness.io/article/8y73f4o4ph-add-hashi-corp-vault-signed-ssh-certificate-keys#step_6_select_hashi_corp_vault_ssh_engine)
* [Step 7: Fetch Public Key](https://docs.harness.io/article/8y73f4o4ph-add-hashi-corp-vault-signed-ssh-certificate-keys#step_7_fetch_public_key)
* [Step 8: Add Role](https://docs.harness.io/article/8y73f4o4ph-add-hashi-corp-vault-signed-ssh-certificate-keys#step_8_add_role)
* [Step 9: Test and Submit](https://docs.harness.io/article/8y73f4o4ph-add-hashi-corp-vault-signed-ssh-certificate-keys#step_9_test_and_submit)

### Before You Begin

* [Harness Key Concepts](https://docs.harness.io/article/4o7oqwih6h-harness-key-concepts)
* [Secrets Management Overview](https://docs.harness.io/article/au38zpufhr-secret-management)
* [Add a HashiCorp Vault Secrets Manager](/article/am3dmoxywy-add-a-hashi-corp-vault-secrets-manager)
* [Use HashiCorp Vault Secrets Manager API](/article/ehovbje4p1-use-hashi-corp-vault-secrets-manager-api)

### Supported Platforms and Technologies

See [Supported Platforms and Technologies](/article/220d0ojx5y-supported-platforms).

### Visual Summary

With Vault Secrets Engine Signed SSH Certificates, a Vault server acts as the SSH CA.

You add the trusted public key to all target host's SSH configuration (and restart the SSH service to pick up the changes). This process can be manual or automated using a configuration management tool.

When you SSH into a host machine using the signed key, you supply both the signed public key from Vault **and** the corresponding private key as authentication to the SSH call. For example:


```
$ ssh -i signed-cert.pub -i ~/.ssh/id_rsa username@10.0.23.5 
```
In Harness, you are simply providing the same information in the Harness SSH Key settings:

![](https://files.helpdocs.io/kw8ldg1itf/articles/8y73f4o4ph/1616536901338/image.png)Next, you use the SSH key in a Harness Infrastructure Definition as the target host(s) connection method.

During deployment, the Harness Delegate connects to the Vault server and exchanges the public key for a new certificate.

Since both the target host(s) and Harness trust the Vault server certificates, the Delegate uses the certificate to successfully create an SSH session with the target host(s).

### Step 1: Add a Harness Vault Secrets Engine Secrets Manager

Follow the steps in [Add a HashiCorp Vault Secrets Manager](/article/am3dmoxywy-add-a-hashi-corp-vault-secrets-manager) to add the Vault Secrets Engine for SSH Certificate Keys.

In **Configure Secrets Manager**, you simply select **HashiCorp Vault Secrets Engine - SSH**.

The rest of the setting are described in [Add a HashiCorp Vault Secrets Manager](/article/am3dmoxywy-add-a-hashi-corp-vault-secrets-manager).

You will enter the Vault URL for the Vault server running the Secrets Engine.

Ensure you select the Secrets Engine that will validate the public key from Vault and your corresponding private key.

When you are done, the Secrets Manager will look something like this:

![](https://files.helpdocs.io/kw8ldg1itf/articles/8y73f4o4ph/1616526122315/image.png)### Step 2: Create SSH Key

In **Secrets Management**, click **SSH**, and then click **Add SSH Key**. The **SSH Configuration** settings appear.

Enter a name that identifies the SSH key in **Display Name**.

In **Auth Scheme**, select **SSH Key/Password**.

In **User Name**, enter the name of the user specified when generating the public key (for example, `ssh-keygen -t rsa -C "user@example.com"`).

Users are mapped to roles. They can be mapped many to one.

### Step 3: Credentials

In **Credentials**, select **Vault SSH**. The setting will change for HashiCorp Vault SSH Engine.

### Step 4: Select Encrypted SSH key Files

In **Select Encrypted SSH key Files**, select or create a new Harness Encrypted File using your private key.

For details on Harness Encrypted Files, see [Use Encrypted File Secrets](/article/nt5vchhka4-use-encrypted-file-secrets).

### Option: Select Encrypted Passphrase

In **Select Encrypted Passphrase**, select the SSH key [passphrase](https://www.ssh.com/ssh/passphrase) from the drop down if one is required.

It is **not** required by default for HashiCorp Vault SSH Engine.

### Step 5: SSH Port

In **SSH Port**, leave the default 22 or enter in a different port if needed.

### Step 6: Select HashiCorp Vault SSH Engine

Select the **HashiCorp Vault Secrets Engine - SSH** Secrets Manager you added earlier.

Ensure you select the Secrets Engine that will validate the public key from Vault and your corresponding private key.

### Step 7: Fetch Public Key

Paste in the contents of the public key.

### Step 8: Add Role

Enter the role name of the Vault role used for signing client keys.

For example, if you create a role with `vault write ssh-client-signer/roles/my-role`, enter **my-role** in the Role setting in Harness.

### Step 9: Test and Submit

Click **Test**.

Enter the public address the host you want to connect to use the SSH key.

Click **Run**.

Harness should show a successful test of the SSH key. If you have errors, check [Troubleshooting](https://www.vaultproject.io/docs/secrets/ssh/signed-ssh-certificates#troubleshooting) from Vault.

Click **Submit**.

Now you can use this SSH key in Harness Infrastructure Definition Connection Attributes settings when defining connection setting to a target hosts.

See [Add an Infrastructure Definition](/article/v3l3wqovbe-infrastructure-definitions).

