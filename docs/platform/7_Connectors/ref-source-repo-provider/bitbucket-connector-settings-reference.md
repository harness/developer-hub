---
title: Bitbucket Connector Settings Reference
description: This topic provides settings and permissions for the Bitbucket Connector.
# sidebar_position: 2
helpdocs_topic_id: iz5tucdwyu
helpdocs_category_id: xyexvcc206
helpdocs_is_private: false
helpdocs_is_published: true
---

This topic provides settings and permissions for the Bitbucket Connector.

### Limitations

* Before Harness syncs with your Git repo, it verifies all the connection settings in Harness. If Harness cannot establish a connection, it won't sync with your Git repo.

Harness supports both Cloud and Data Center (On-Prem) versions of Bitbucket. The following settings are applicable for both versions.

### Name

The unique name for this Connector.

### ID

See [Entity Identifier Reference](../../20_References/entity-identifier-reference.md).

### Description

Text string.

### Tags

See [Tags Reference](../../20_References/tags-reference.md).

### URL Type

Select one type:

* **Account:** Connect to your entire Git account. This enables you to use one Connector for all repos in the account. If you select this, you must provide a repository name to test the connection.
* **Repository:** Connect to one repo in the account.

### Connection Type

The protocol to use for cloning and authentication. Select one type:

* **HTTPS:** Requires a personal access token.
* **SSH:** You must use a key in PEM format, not OpenSSH.  
To generate an SSHv2 key, use: `ssh-keygen -t rsa -m PEM` The `rsa` and `-m PEM` ensure the algorithm and that the key is PEM. Next, follow the prompts to create the PEM key. For more information, see the [ssh-keygen man page](https://linux.die.net/man/1/ssh-keygen).

### Bitbucket Account URL

The URL for your Git repo. Make sure that it matches the Connection Type option you selected.

If the URL Type is **Repository**, enter the full URL for the repo.

If the URL Type is **Account**, enter the URL without the repo name. You will provide a repo name when you use the Connector.

If the Connection Type is **HTTP**, enter the URL in the format `https://bitbucket.org/<userName>/<repoName>.git`.

### Authentication

Bitbucket repos with read-only access also require a username and password.You can use a password for HTTPS credentials.

If you selected **SSH** as the connection protocol, you must add the **SSH Key** for use with the connection. 

If you log into Bitbucket using a Google account, you can create an application password in Bitbucket to use with Harness. For steps on this, see [App passwords](https://confluence.atlassian.com/bitbucket/app-passwords-828781300.html) from Atlassian.

#### Username

The username for the account.

#### Password

A [Harness Encrypted Text secret](../../6_Security/2-add-use-text-secrets.md) for the credentials of your Bitbucket user account.

If you have set up Two-Factor Authentication in your Bitbucket account, you need to generate a personal access token in your repo and enter that token in the **Password/Token** field.

#### SSH Key

If you selected **SSH** as the connection protocol, you must add the **SSH Key** for use with the connection as a [Harness Encrypted File secret](../../6_Security/3-add-file-secrets.md). For steps to create an SSH Key, see [Add new SSH Key](https://support.atlassian.com/bitbucket-cloud/docs/set-up-an-ssh-key/).

#### Enable API access

This option is required for using Git-based triggers, Webhook management, and updating Git statuses. If you are using Harness Git Experience, you will need to use this setting.

### API Authentication

#### UserName

The username for the account.

You must enter a plain-text username or a username secret for *both* Authentication and API Authentication. You cannot use a plain-text password for one field and a secret for the other.

#### Personal Access Token

A [Harness Encrypted Text secret](../../6_Security/2-add-use-text-secrets.md) for the App password of your Bitbucket user account.

![](./static/bitbucket-connector-settings-reference-05.png)