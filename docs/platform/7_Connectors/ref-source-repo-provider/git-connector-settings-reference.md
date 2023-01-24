---
title: Git Connector Settings Reference
description: This topic provides settings and permissions for the Git Connector.
# sidebar_position: 2
helpdocs_topic_id: tbm2hw6pr6
helpdocs_category_id: xyexvcc206
helpdocs_is_private: false
helpdocs_is_published: true
---

This topic provides settings and permissions for the platform-agnostic Git Connector. For Connectors to popular Git platforms like GitHub, see [Code Repo Connectors](https://docs.harness.io/category/code-repo-connectors).

### Limitations

* Before Harness syncs with your Git repo, it'll confirm that all Harness' settings are in a valid state. If a connection isn't working, Harness won't sync with your Git repo.

### Name

The unique name for this Connector.

### ID

See [Entity Identifier Reference](../../20_References/entity-identifier-reference.md).

### Description

A description of this Connector.

### Tags

See [Tags Reference](../../20_References/tags-reference.md).

### URL Type

You can select **Account** or **Repository**.

You can add a connection to your entire Git account or just a repo in the account. Selecting a Git account enables you to use one Connector for all of your subordinate repositories.

Later when you test this connection, you will use a repo in the account.

In either case, when you use the Connector later in Harness, you will specify which repo to use.

### Connection Type

You can select **HTTPS** or **SSH** for the connection.

You will need to provide the protocol-relevant URL.

If you use Two-Factor Authentication for your Git repo, you connect over **HTTPS** or **SSH**. **HTTS** requires a personal access token.

For SSH, ensure that the key is not OpenSSH, but rather PEM format. To generate an SSHv2 key, use: `ssh-keygen -t rsa -m PEM` The `rsa` and `-m PEM` ensure the algorithm and that the key is PEM. Next, follow the prompts to create the PEM key. For more information, see the [ssh-keygen man page](https://linux.die.net/man/1/ssh-keygen).

#### Github deprecated RSA

Starting March 15, 2022, GitHub is fully deprecating RSA with SHA-1. GitHub will allow ECDSA and Ed25519 to be used. RSA keys uploaded after this date will work with SHA-2 signatures only (RSA keys uploaded before this date will continue to work with SHA-1). See [Improving Git protocol security on GitHub](https://github.blog/2021-09-01-improving-git-protocol-security-github/#when-are-these-changes-effective) from GitHub.  
  
Generating an SSH key in ECDSA looks like this:  
  
`ssh-keygen -t ecdsa -b 256 -f /home/user/Documents/ECDSA/key -m pem`

### Git Account or Repository URL

The URL for your Git repo. Ensure that it matches the Connection Type option you selected.

If you selected **Git Repository** in **URL** **Type**, enter the full URL for the repo.

If you selected **Git Account** in **URL** **Type**, enter the URL without the repo name. When you use this Connector in a Harness setting you will be prompted to provide a repo name.

### Username

The username for the account.

### Password

A [Harness Encrypted Text](../../6_Security/2-add-use-text-secrets.md) secret for the credentials of your Git user account.

### SSH Key

If you selected **SSH** as the connection protocol, you must add the **Username** as `git` and an **SSH Key** for use with the connection as a [Harness Encrypted Text secret](../../6_Security/2-add-use-text-secrets.md).

### Setup Delegates

You can select **Connect via any available delegate** or **Connect only via delegates which has all of the following tags**.

You need to enter **Selectors** to connect via specific delegates. For more information see [Select Delegates with Tags](../../2_Delegates/delegate-guide/select-delegates-with-selectors.md).

