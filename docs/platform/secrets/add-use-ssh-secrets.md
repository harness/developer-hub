---
title: Add SSH credentials
description: Learn how to add SSH credentials and use them to securely connect to remote servers.
# sidebar_position: 2
helpdocs_topic_id: xmp9j0dk8b
helpdocs_category_id: 48wnu4u0tj
helpdocs_is_private: false
helpdocs_is_published: true
---

SSH credentials provide secure authentication to remote servers and Git repositories. You can use SSH credentials in Harness pipelines and connectors without exposing private keys.

## Prerequisites

Before creating SSH credentials, ensure you have:

- **Permissions**: [Create/Edit](/docs/platform/role-based-access-control/permissions-reference#shared-resources) permissions for Secrets at the account, organization, or project level
- **SSH key pair**: A valid SSH private key
- **Harness Delegate**: A running delegate in your environment

:::tip Convert OpenSSH keys to PEM format

Harness requires SSH keys in PEM format. If your SSH key was generated with OpenSSH (common with newer versions of `ssh-keygen`), you need to convert it to PEM format before uploading.

Use this command to convert your OpenSSH key:

```bash
ssh-keygen -p -m PEM -f your_private_key
```

This converts the key header from `-----BEGIN OPENSSH PRIVATE KEY-----` to `-----BEGIN RSA PRIVATE KEY-----` (or similar PEM format), which Harness can process.

:::

## Add an SSH credential

To create an SSH credential, go to your desired scope (Account, Organization, or Project)**Settings** → **[YOUR-SCOPE]-level resources** → **Secrets** and select **SSH Credential**.

<DocImage path={require('./static/add-use-ssh-secrets-17.gif')} /> 

Complete the SSH credential configuration:

1. Enter a **Name** for the SSH credential and select **Continue**.
2. Under **Select an Auth Scheme**, select one of the following:

   * **SSH Key:** Add SSH keys for Harness to use when connecting to remote servers.
   * **Kerberos:** SSH into a target host via the Kerberos protocol.

3. Choose your authentication method:

   - **Username/SSH Key:** Upload your SSH key as an [encrypted file secret](/docs/platform/secrets/add-file-secrets). You can create a new file or select an existing one. 
   - **Username/SSH Key File Path:** Specify the file path to an SSH key on the server running the Harness Delegate (e.g., `/home/user/example.pem`)
   - **Username/Password:** Use password authentication (less secure) 

4. Provide the relevant **Username**. This may be the username for the user account on the remote server or another username. For example, if you want to SSH into an AWS EC2 instance, the username would be `ec2-user`.

   :::info Code repo connectors
   If this SSH key secret is for a [code repo connector](/docs/platform/connectors/code-repositories/connect-to-code-repo/), the **Username** must be `git`.
   :::

5. In **Select or create a SSH Key**, create or select an [Encrypted File Secret](/docs/platform/secrets/add-file-secrets) that contains the relevant SSH Key file.

   :::note
   To update an SSH key, you must create a new encrypted file secret. You cannot edit existing encrypted file secrets.
   :::

6. (Optional) Enter the [SSH Key Passphrase](https://www.ssh.com/ssh/passphrase) if your key requires one. Most SSH keys do not require passphrases. Passphrases are stored as Harness [Encrypted Text Secrets](/docs/platform/secrets/add-use-text-secrets).

7. For **SSH Port**, leave the default port **22** or enter a different port, if needed, and then select **Save and Continue**.

8. Enter the **Host Name** of the remote server you want to SSH into. For example, if it is an AWS EC2 instance, it might be something like `ec2-76-939-110-125.us-west-1.compute.amazonaws.com`.

9. Select **Test Connection**.

   If the test is unsuccessful, you might see an error stating that no Harness Delegate could reach the host, or that a credential is invalid. Make sure that your settings are correct and that a Harness Delegate is able to connect to the server.

   When the test succeeds, select **Submit** to save the SSH credential.
