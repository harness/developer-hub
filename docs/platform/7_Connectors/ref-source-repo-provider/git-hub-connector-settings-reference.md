---
title: GitHub Connector Settings Reference
description: This topic provides settings and permissions for the GitHub Connector. You can also use a GitHub App for authentication in a Harness GitHub Connector. See Use a GitHub App in a GitHub Connector. Name…
# sidebar_position: 2
helpdocs_topic_id: v9sigwjlgo
helpdocs_category_id: xyexvcc206
helpdocs_is_private: false
helpdocs_is_published: true
---

This topic provides settings and permissions for the GitHub Connector.

You can also use a GitHub App for authentication in a Harness GitHub Connector. See [Use a GitHub App in a GitHub Connector](../git-hub-app-support.md).

### Name

The unique name for this Connector.

### ID

See [Entity Identifier Reference](../../20_References/entity-identifier-reference.md).

### Description

Text string.

### Tags

See [Tags Reference](../../20_References/tags-reference.md).

### URL Type

You can select Git Account (which is a GitHub **organization**) or Git Repository.

You can add a connection to your entire Git org or just a repo in the org. Selecting a Git org enables you to use one Connector for all of your subordinate repos.

Later, when you test this connection, you'll use a repo in the org.

In either case, when you use the Connector later in Harness, you'll specify which repo to use.

### Connection Type

You can select **HTTPS** or **SSH** for the connection.

You will need to provide the protocol-relevant URL in **URL**.

If you use Two-Factor Authentication for your Git repo, you connect over **HTTPS** or **SSH**. HTTPS connections require a personal access token.

For SSH, make sure that the key is PEM and not OpenSSH. To generate an SSHv2 key, use:   
`ssh-keygen -t rsa -m PEM`   
Use `rsa` and `-m PEM` to make sure that the algorithm and the key are PEM.  
Next, follow the prompts to create the PEM key. See the  [ssh-keygen man page](https://linux.die.net/man/1/ssh-keygen) and [Connecting to GitHub with SSH](https://help.github.com/en/github/authenticating-to-github/connecting-to-github-with-ssh).Starting March 15, 2022, GitHub is fully deprecating RSA with SHA-1. GitHub will allow ECDSA and Ed25519 to be used. RSA keys uploaded after this date will work with SHA-2 signatures only (RSA keys uploaded before this date will continue to work with SHA-1). See [Improving Git protocol security on GitHub](https://github.blog/2021-09-01-improving-git-protocol-security-github/#when-are-these-changes-effective) from GitHub.  
  
Generating an SSH key in ECDSA looks like this:  
  
`ssh-keygen -t ecdsa -b 256 -f /home/user/Documents/ECDSA/key -m pem`

### GitHub Repository URL

The URL for a Git org or repo. The URL format must match the [Connection Type](#connection_type) you selected --for example:

* HTTPS: `https://github.com/wings-software/harness-docs.git`.
* SSH: `git@github.com:wings-software/harness-docs.git`.

You can get the URL from GitHub using its Code feature:

![](./static/git-hub-connector-settings-reference-00.png)
If you selected **Git Repository** in [URL Type](#url_type), enter the full URL for the repo with the format `https://github.com/[org-name]/[repo-name]`.

If you selected **Git Account** in [URL Type](#url_type), enter the URL without the repo name, like `https://github.com/[org-name]`. You will need to provide a repo name before you can use the Connector in Harness.

### Authentication

Read-only GitHub repos also require a username and password/token.You can use a password/token for HTTPS credentials.

If you selected **SSH** as the connection protocol, you must add the **SSH Key** to use with the connection. 

### Username

Your personal GitHub account username.

### Personal Access Token

A [Harness Encrypted Text secret](../../6_Security/2-add-use-text-secrets.md) for the credentials of your GitHub user account.

A Personal Access Token (PAT) is required if your GitHub authentication uses 2FA.

Typically, you can validate your token from the command line before using it in Harness. For example:

`curl -i https://api.github.com -u <username>:<token>`

If you have Two-Factor Authentication set up in your Git repo, then you need to generate a personal access token in your repo and enter that token in the **Personal Access Token** field. In GitHub, you can set up the personal access token at <https://github.com/settings/tokens/new>.

#### PAT Permissions

To use a personal access token with a GitHub organization that uses SAML single sign-on (SSO), you must first authorize the token. See [Authorizing a personal access token for use with SAML single sign-on](https://docs.github.com/en/enterprise-cloud@latest/authentication/authenticating-with-saml-single-sign-on/authorizing-a-personal-access-token-for-use-with-saml-single-sign-on) from GitHub.* The GitHub user account used to create the Personal Access Token must have admin permissions on the repo.
* GitHub doesn't provide a way of scoping a PAT for read-only access to repos. You must select the following permissions:

![](./static/git-hub-connector-settings-reference-01.png)
### SSH Key

If you selected **SSH** as the connection protocol, you must add the **SSH Key** to use with the connection as a [Harness Encrypted Text secret](../../6_Security/2-add-use-text-secrets.md). For detailed steps to create an SSH Key, see [Add new SSH Key](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account).

Harness also supports [GitHub deploy keys](https://docs.github.com/en/developers/overview/managing-deploy-keys#deploy-keys). Deploy keys grant access to a single repo. Using a deploy key ensures that the Connector only works with the specific repo you selected in **URL Type**.

### Enable API access

This option is required for using Git-based triggers, Webhooks management, and updating Git statuses.

You can use the same token you used in **Personal Access Token**.

#### API Authentication

You should use the same [Personal Access Token](#password_personal_access_token) for both Authentication and API Authentication.

