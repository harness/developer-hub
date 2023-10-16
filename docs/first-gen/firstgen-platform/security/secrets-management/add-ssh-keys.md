---
title: Add SSH Keys
description: This content is for Harness FirstGen. Switch to NextGen. You can add SSH keys for use in connecting to remote servers, such as an AWS EC2 instance. In this topic --  Before You Begin. Step 1 --  Configure…
# sidebar_position: 2
helpdocs_topic_id: gsp4s7abgc
helpdocs_category_id: o9x167at52
helpdocs_is_private: false
helpdocs_is_published: true
---

This content is for Harness [FirstGen](../../../../get-started/harness-first-gen-vs-harness-next-gen.md). Switch to [NextGen](/docs/platform/secrets/add-use-ssh-secrets).You can add SSH keys for use in connecting to remote servers, such as an AWS EC2 instance.

In this topic:

* [Before You Begin](#before_you_begin)
* [Step 1: Configure SSH Connectivity](#step_1_configure_ssh_connectivity)
* [Step 2: Test Host Connectivity](#step_2_test_host_connectivity)
* [Notes](#notes)
* [Next Steps](#next_steps)

### Before You Begin

* See [Harness Key Concepts](../../../starthere-firstgen/harness-key-concepts.md).
* See [Secrets Management Overview](secret-management.md).

### Step 1: Configure SSH Connectivity

Currently, Harness does not support OpenSSH private keys for SSH keys. Support will be added soon. To generate an SSHv2 key using OpenSSH, use `ssh-keygen -t rsa -m PEM` (`rsa` specifies SSHv2) and then follow the prompts to create the PEM key. Also, ensure that the `BEGIN RSA` and `END RSA` lines are included when you paste the key into Harness (`pbcopy` is useful for copying the key). For more information, see the [ssh-keygen man page](https://linux.die.net/man/1/ssh-keygen).Starting March 15, 2022, GitHub is fully deprecating RSA with SHA-1. GitHub will allow ECDSA and Ed25519 to be used. RSA keys uploaded after this cut-off date will work only with SHA-2 signatures (RSA keys uploaded before this date will continue to work with SHA-1). See [Improving Git protocol security on GitHub](https://github.blog/2021-09-01-improving-git-protocol-security-github/#when-are-these-changes-effective) from GitHub.Generating an SSH key in ECDSA looks like this:`ssh-keygen -t ecdsa -b 256 -f /home/user/Documents/ECDSA/key -m pem`For example, if you want to SSH into an EC2 instance, in a terminal, enter the following command:

`ssh -i "example.pem" ec2-user@ec2-76-939-110-125.us-west-1.compute.amazonaws.com`

The SSH secret you add here can be used in Harness components wherever they need to SSH into your remote server. For example, in a Harness Environment **Service Infrastructure/**[Infrastructure Definition](../../../continuous-delivery/model-cd-pipeline/environments/environment-configuration.md#add-an-infrastructure-definition) dialog, you specify **Connection Attributes** that use the SSH secret to connect to the target host.

To add an SSH key that can be referenced in Harness entities, do the following:

1. In Secrets Management, click **SSH**.
2. Click **Add SSH Key**. The **SSH Configuration** dialog appears.
3. Enter a **Display Name** for the SSH credentials.If you change this display name at a later date, the key will still work. You do not need to do anything.
4. In Auth Scheme, select one of the following:
	1. **SSH Key/Password:** add SSH keys for Harness to use when connecting to remote servers.
	2. **Kerberos:** SSH into a target host via the Kerberos protocol. See [Use SSH Key via Kerberos for Server Authentication](use-ssh-key-via-kerberos-for-server-authentication.md).
5. In **User Name**, provide the user name for the user account on the remote server. For example, if you want to SSH into an AWS EC2 instance, the user name would be **ec2-user**.
6. Do one of the following:
	1. Click **SSH Key File.** You must create or use an existing Encrypted SSH Key file. In the **Select Encrypted SSH key File** drop down, select an existing file or create a new one. For more information on creating a new Encrypted SSH Key file, see [Harness Encrypted File Secrets](use-encrypted-file-secrets.md).If you are modifying an existing SSH Key File, you will not be able to edit the existing inline key that you have entered earlier. Instead, you should select an existing file or create a new Encrypted SSH key file.
	1. Click **SSH Key****File Path (on Delegate)** and specify the location of the key. This is the file path on the server running the Harness Delegate, such as **/home/johndoe/example.pem**.
	2. Click **Password** and **Select Encrypted Password** for the user account. You must use an Encrypted Text Secret to save your password and select it here. Either select an existing Encrypted Text Secret from the drop down list or create a new one by clicking **+ Create Encrypted Text**.
	3. For **Vault SSH**, see [Add HashiCorp Vault Signed SSH Certificate Keys](add-hashi-corp-vault-signed-ssh-certificate-keys.md).
7. In **Select Encrypted Passphrase**, select the SSH key [passphrase](https://www.ssh.com/ssh/passphrase) from the drop down if one is required. It is **not** required by default for AWS or many other platforms. Make sure you use a Harness Encrypted Text secret to save the passphrase and refer it here. Either select an existing secret from the drop down list or create a new one by clicking **+ Create Encrypted Text**.  
For more information on creating an Encrypted Text Secret, see [Harness Encrypted Text secret](use-encrypted-text-secrets.md).
8. In **SSH Port**, leave the default **22** or enter in a different port if needed.
9. If you want to restrict the use of these SSH credentials to specific Harness components, do the following:
	1. In **Usage Scope**, click the drop-down under **Applications**, and click the name of the application.
	2. In **Environments**, click the name of the environment.

### Step 2: Test Host Connectivity

1. Click **TEST**. The **Host Connectivity Test** tool appears.![](./static/add-ssh-keys-25.png)

2. In **Host Name**, enter the host name of the remote server you want to SSH into. For example, if it is an AWS EC2 instance, it will be something like, `ec2-76-939-110-125.us-west-1.compute.amazonaws.com`.
3. Click **RUN**. If the test is unsuccessful, you might see an error stating that no Harness Delegate could reach the host, or that a credential is invalid. Ensure that your settings are correct and that a Harness Delegate is able to connect to the server.
4. When a test is successful, click **Submit**.

### Notes

You can convert your OpenSSH key to a PEM format with:

 `ssh-keygen -p -m PEM -f your_private_key`

This will convert your existing file headers from:

`-----BEGIN OPENSSH PRIVATE KEY-----`

to

`-----BEGIN RSA PRIVATE KEY-----`

### Next Steps

* [Use SSH Keys via Kerberos for Server Authentication](use-ssh-key-via-kerberos-for-server-authentication.md)
* [Add WinRM Connection Credentials](add-win-rm-connection-credentials.md)

