---
title: Bitbucket connector settings reference
description: Harness connects to Bitbucket repositories through Bitbucket connectors.
sidebar_position: 10
helpdocs_topic_id: iz5tucdwyu
helpdocs_category_id: xyexvcc206
helpdocs_is_private: false
helpdocs_is_published: true
---

This topic describes settings and permissions for the Bitbucket connector. Harness supports both Cloud and Data Center (On-Prem) versions of Bitbucket. The following settings are applicable to both versions.

<!--Before Harness syncs with your Git repo, it verifies all the connection settings in Harness. If Harness cannot establish a connection, it won't sync with your Git repo.-->

## Overview settings

* **Name:** The unique name for this connector. Harness generates an **Id** ([Entity Identifier](../../20_References/entity-identifier-reference.md)) based on the **Name**. You can edit the **Id** during initial connector creation. Once you save the connector, the **Id** is locked.
* **Description:** Optional text string.
* **Tags:** Optional labels you can use for filtering. For details, go to the [Tags reference](../../20_References/tags-reference.md).

## Details settings

The **Details** settings specify which BitBucket account or repository you want this connector to connect to, whether to connect over HTTP or SSH, and the URL to use.

### URL Type

Select **Account** to connect an entire Bitbucket account. This option lets you use one connector to connect to all repos in the specified Bitbucket account. Make sure you have at least one repo in the account; you need a repo to test the connection and save the connector.

Select **Repository** to connect to a single, specific repo in a Bitbucket account.

### Connection Type

Select the protocol, **HTTP** or **SSH**, to use for cloning and authentication. The **Connection Type** determines the URL format required for the **Bitbucket Account/Repository URL** field. It also determines the **Authentication** method you must use in the [Credentials settings](#credentials-settings).

### Bitbucket Account/Repository URL

Enter the URL for the Bitbucket account or repository that you want to connect to. The required value is determined by the **URL Type** and **Connection Type**.

<!--table-->

* **Bitbucket Repository URL:** Enter the complete Bitbucket URL for the specific repository that you want to connect to.
* **Bitbucket Account URL:** Enter the Bitbucket URL without a repo name, such as `https://bitbucket.org/<username>`. In the **Test Repository** field, 

HTTP connections must be formatted as `https://bitbucket.org/<username>/<repo-name>.git` or `https://bitbucket.org/<user-name>`.

SSH connections use the `git@bitbucket.org` scheme, such as `git@bitbucket.org:<username>/<repo-name>.git` or `git@bitbucket.org:<username>`

For Bitbucket Data Center (On-Prem) accounts or repos, use the `<domain-name>:<port>` format for the authority portion of the URL.

### Test Repository

This field is required only if the **URL Type** is **Account**. Provide the path to a repo in your Bitbucket account that Harness can use to test the connector, such as `<repo-name>.git`. For BitBucket Data Center (On-Prem) accounts, include the project ID, such as `<project-id>/<repo-name>.git`.

Harness uses this repo path to validate the connection only. When you use this connector in a pipeline, you'll specify a repo in your pipeline configuration or at runtime.

## Credentials settings

Provide authentication credentials for the connector.

### Authentication

The **Authentication** method is determined by the **Connection Type** you chose in the [Details settings](#details-settings).

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

```mdx-code-block
<Tabs>
  <TabItem value="http" label="Username and Password" default>
```

The **HTTP** Connection Type requires **Username** and **Password** authentication for all accounts and repos, including read-only repos.

* **Username:** The Bitbucket account username, as specified in your Bitbucket **Account settings**.

   ![Bitbucket Personal settings screen, highlighting the Account settings page and the Username field.](./static/bitbucket-username-in-acct-settings.png)

* **Password:** Provide a Bitbucket [Access token](https://support.atlassian.com/bitbucket-cloud/docs/access-tokens/), [HTTP access token](https://confluence.atlassian.com/bitbucketserver/http-access-tokens-939515499.html), or [App password](https://support.atlassian.com/bitbucket-cloud/docs/create-an-app-password/). Passwords are stored as [Harness Encrypted Text secrets](../../6_Security/2-add-use-text-secrets.md).

App passwords need the following permissions:
* Issues: Read
* Webhooks: Read and write
* Repositories: Read, Write
* Pull requests: Read, Write

If you use a Google account to log in to Bitbucket, you must use an App password.

Bitbucket accounts with two-factor authentication must use access tokens.

![](./static/bitbucket-connector-settings-reference-05.png)

```mdx-code-block
  </TabItem>
  <TabItem value="ssh" label="SSH Key">
```

The **SSH** Connection Type requires an **SSH Key** in PEM format. OpenSSH keys are not supported. In Harness, SSH keys are stored as [Harness Encrypted File secrets](../../6_Security/3-add-file-secrets.md).

For details on creating SSH keys and adding them to your Bitbucket account, go to the Bitbucket documentation to [Configure SSH and two-step verification](https://support.atlassian.com/bitbucket-cloud/docs/configure-ssh-and-two-step-verification/)

:::tip

You use arguments such as `rsa` and `-m PEM` in your `keygen` commands to ensure your key is properly formatted and uses the RSA algorithm, for example this command creates an SSHv2 key:

```
ssh-keygen -t rsa -m PEM
```

Make sure to follow the prompts to finish creating the key. For more information, go to the Linux [ssh-keygen man page](https://linux.die.net/man/1/ssh-keygen).

:::

```mdx-code-block
  </TabItem>
</Tabs>
```

### Enable API access

You must enable API access to use Git-based triggers, manage webhooks, or update Git statuses with this connector. If you are using the Harness Git Experience, this setting is required.

* **API Authentication:** API access requires username and password authentication.
* **Username**: Provide the Bitbucket account username, as specified in your Bitbucket **Account settings**.

   ![Bitbucket Personal settings screen, highlighting the Account settings page and the Username field.](./static/bitbucket-username-in-acct-settings.png)

* **Personal Access Token:** Provide a Bitbucket [App password](https://support.atlassian.com/bitbucket-cloud/docs/create-an-app-password/), [Access token](https://support.atlassian.com/bitbucket-cloud/docs/access-tokens/), or [HTTP access token](https://confluence.atlassian.com/bitbucketserver/http-access-tokens-939515499.html). Passwords are stored as [Harness Encrypted Text secrets](../../6_Security/2-add-use-text-secrets.md).

:::caution

For **HTTP** Connection Types, use the same password you used earlier, and make sure the **Username** fields are both plaintext or encrypted. You can't use a plain-text username for one field and a secret for the other.

:::

![](./static/bitbucket-connector-settings-reference-05.png)

## Connectivity Mode settings

Select whether you want Harness to connect directly to your Bitbucket account/repo, or if you want Harness to communicate with your Bitbucket account/repo through a delegate.

## Troubleshooting

If the connection test returns a `not authorized` error, make sure you used the **Username** shown in the Bitbucket **Account settings**.

![Bitbucket Personal settings screen, highlighting the Account settings page and the Username field.](./static/bitbucket-username-in-acct-settings.png)