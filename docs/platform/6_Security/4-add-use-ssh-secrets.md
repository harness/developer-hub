---
title: Add SSH Keys
description: This document explains how to add and use SSH secrets.
# sidebar_position: 2
helpdocs_topic_id: xmp9j0dk8b
helpdocs_category_id: 48wnu4u0tj
helpdocs_is_private: false
helpdocs_is_published: true
---

You can add SSH keys for use in connecting to remote servers, such as an AWS EC2 instance.
### Add SSH Credential

To add an SSH key that can be referenced in Harness entities, do the following:

1. Select your **Account**/**Organization**/**Project**.
2. In **ACCOUNT SETUP**/**ORG SETUP**/**PROJECT SETUP**, Click **Secrets**.
3. Click **New Secret** and select **SSH Credential.**

   ![](./static/add-use-ssh-secrets-17.png)

   The **SSH Credential** settings appear.

   ![](./static/add-use-ssh-secrets-18.png)

4. Enter a **Name** for the SSH Credential and click **Continue**.
5. Under **Select an Auth Scheme**, select one of the following:
	1. **SSH Key:** add SSH keys for Harness to use when connecting to remote servers.
	2. **Kerberos:** SSH into a target host via the Kerberos protocol.
6. In **User Name**, provide the username for the user account on the remote server. For example, if you want to SSH into an AWS EC2 instance, the username would be **ec2-user**.
7. In **Select or create a SSH Key**, click **Create or Select a Secret**.
8. You can do one of the following:
	1. Click **Create a new secret**. You can create an [Encrypted File Secret](./3-add-file-secrets.md) or an [Encrypted Text Secret](./2-add-use-text-secrets.md).
	2. Click **Select an existing secret.** You can add an existing [Encrypted File Secret](./3-add-file-secrets.md) or an [Encrypted Text Secret](./2-add-use-text-secrets.md) present at your Project, Account or Organization level.


:::note
If you are editing an existing SSH Key File, you will not be able to edit the existing inline key that you have entered earlier. Instead, you should select an existing file or create a new Encrypted SSH key file.

:::

9. In **Select Encrypted Passphrase**, add the SSH key [passphrase](https://www.ssh.com/ssh/passphrase) if one is required. It is **not** required by default for AWS or many other platforms. Make sure you use a Harness Encrypted Text secret to save the passphrase and refer to it here. Either select an existing secret from the drop-down list or create a new one by clicking  **Create or Select a Secret**. For more information on creating an Encrypted Text Secret, see [Add Text Secrets](./2-add-use-text-secrets.md).
10. In **SSH Port**, leave the default **22** or enter a different port if needed.
11. Click **Save and Continue**.
12. In **Host Name**, enter the hostname of the remote server you want to SSH into. For example, if it is an AWS EC2 instance, it will be something like, `ec2-76-939-110-125.us-west-1.compute.amazonaws.com`.
13. Click **Test Connection**. If the test is unsuccessful, you might see an error stating that no Harness Delegate could reach the host, or that a credential is invalid. Make sure that your settings are correct and that a Harness Delegate is able to connect to the server.
14. When a test is successful, click **Submit**.

### Notes

You can convert your OpenSSH key to a PEM format with:

`ssh-keygen -p -m PEM -f your_private_key`

This will convert your existing file headers from:

`-----BEGIN OPENSSH PRIVATE KEY-----`

to

`-----BEGIN RSA PRIVATE KEY-----`

