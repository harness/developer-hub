---
title: Git connector settings reference
description: This topic provides settings and permissions for the Git connector.
sidebar_position: 20
helpdocs_topic_id: tbm2hw6pr6
helpdocs_category_id: xyexvcc206
helpdocs_is_private: false
helpdocs_is_published: true
---

This topic provides settings and permissions for the platform-agnostic Git connector. For specialized connectors for popular Git platforms, like GitHub, go to [Code Repo Connectors](https://developer.harness.io/docs/category/code-repo-connectors).

## Overview settings

* **Name:** The unique name for this connector. Harness generates an **Id** ([Entity Identifier](../../../20_References/entity-identifier-reference.md)) based on the **Name**. You can edit the **Id** during initial connector creation. Once you save the connector, the **Id** is locked.
* **Description:** Optional text string.
* **Tags:** Optional labels you can use for filtering. For details, go to the [Tags reference](../../../20_References/tags-reference.md).

## Details settings

The **Details** settings specify which Git account or repository you want this connector to connect to, whether to connect over HTTP or SSH, and the URL to use.

### URL Type

Select **Account** to connect an entire Git account or organization. This option lets you use one connector to connect to all repositories in the specified account. Make sure you have at least one repo in the account; you need a repo to test the connection and save the connector.

Select **Repository** to connect to a single, specific repo in a Git account.

### Connection Type

Select the protocol, **HTTP** or **SSH**, to use for cloning and authentication. The **Connection Type** determines the URL format required for the [Git Account or Repository URL field](#git-account-or-repository-url). It also determines the **Authentication** method you must use in the [Credentials settings](#credentials-settings).

Both connection types support two-factor authentication.

:::info

If you select **SSH**, make sure HTTPS is enabled on port 443. This is the protocol and port used by the Harness connection test for Git connectors.

:::

### Git Account or Repository URL

Enter the URL for the Git account or repository that you want to connect to. The required value is determined by the **URL Type** and **Connection Type**.

If you selected **Git Repository** for **URL Type**, enter the full URL for the repo.

If you selected **Git Account** for **URL Type**, enter the URL without the repo name. When you use this Connector in a Harness setting you will be prompted to provide a repo name.

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

```mdx-code-block
<Tabs>
  <TabItem value="account" label="URL Type: Account" default>
```

In the **Git Account URL** field, provide only the account-identifying portion of the Git URL, such as `https://github.com/my-account`. Do not include a repo name in the URL.

The URL format depends on the Git provider and **Connection Type**:

* HTTP format: `https://<git-provider>.com/USERNAME`
* SSH format: `git@<git-provider>.com:USERNAME`

### Test Repository

This field is only required if the **URL Type** is **Account**. Provide the name of a repo in your Git account that Harness can use to test the connector. Harness uses this repo path to validate the connection only. When you use this connector in a pipeline, you'll specify a true code repo in your pipeline configuration or at runtime.

```mdx-code-block
  </TabItem>
  <TabItem value="repo" label="URL Type: Repository">
```

In the **Git Repository URL** field, provide the complete URL to the Git repository that you want this connector to point to.

The URL format depends on the Git provider and **Connection Type**:

* HTTP format: `https://<git-provider>.com/USERNAME/REPO_NAME`
* SSH format: `git@<git-provider>.com:USERNAME/REPO_NAME`

```mdx-code-block
  </TabItem>
</Tabs>
```

## Credentials settings

Provide authentication credentials for the connector. The **Connection Type** you chose in the [Details settings](#details-settings) determines the authentication method.

```mdx-code-block
<Tabs>
  <TabItem value="http" label="Username and Password" default>
```

The **HTTP** Connection Type requires **Username** and **Password** authentication for all accounts and repos, including read-only repos.

In the **Username** field, enter the Git account username. You can use either plaintext or a [Harness encrypted text secret](../../../Secrets/2-add-use-text-secrets.md).

In the **Password** field, provide the account password or a personal access token. Passwords and tokens are stored as [Harness encrypted text secrets](../../../Secrets/2-add-use-text-secrets.md).

If your Git account uses two-factor authentication, you must provide a personal access token for the **Password**.

```mdx-code-block
  </TabItem>
  <TabItem value="ssh" label="SSH Key">
```

The **SSH** Connection Type requires an **SSH Key** in PEM format. OpenSSH keys are not supported. In Harness, SSH Keys are stored as [Harness SSH credential secrets](/docs/platform/Secrets/add-use-ssh-secrets). When creating an SSH credential secret for a code repo connector, the SSH credential's **Username** must be `git`.

:::tip

If you use the `keygen` command to generate an SSH key, include arguments such as `rsa` and `-m PEM` to ensure your key is properly formatted and uses the RSA algorithm. For example, this command creates a PEM-formatted SSHv2 key:

```
ssh-keygen -t rsa -m PEM
```

Make sure to follow the prompts to finish creating the key. For more information, go to the Linux [ssh-keygen man page](https://linux.die.net/man/1/ssh-keygen).

For GitHub repos, your SSH key must use ECDSA or Ed25519 instead of RSA. As an example, the following `ssh-keygen` command generates a PEM-formatted SSH key in ECDSA:

```
ssh-keygen -t ecdsa -b 256 -f /home/user/Documents/ECDSA/key -m pem
```

For more information about GitHub's deprecation of RSA support, go to the GitHub announcement on [Improving Git protocol security on GitHub](https://github.blog/2021-09-01-improving-git-protocol-security-github/#when-are-these-changes-effective).

:::

```mdx-code-block
  </TabItem>
</Tabs>
```

## Connectivity Mode settings

Select whether you want Harness to connect directly to your Git account or repo, or if you want Harness to communicate with your Git account or repo through a delegate.

### Delegates Setup

If you select **Connect through a Harness Delegate**, you can select **Use any available Delegate** or **Only use Delegates with all of the following tags**.

If you want to use specific delegates, you must identify those delegates. For more information, go to [Select Delegates with Tags](../../../2_Delegates/manage-delegates/select-delegates-with-selectors.md).

## Troubleshooting

Before Harness syncs with your Git repo, it runs a connection test to confirm that the connector's settings are valid. If the connection fails, Harness won't sync with your Git repo.

If your connector uses the **SSH** [Connection Type](#connection-type), and the connection test fails due to an unknown SCM request failure, make sure HTTPS is enabled on port 443. This is the protocol and port used by the Harness connection test for Git connectors.
