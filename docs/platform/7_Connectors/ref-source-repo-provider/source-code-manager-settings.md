---
title: Source Code Manager Settings
description: Currently, this feature is in Beta and behind a Feature Flag. Contact Harness Support to enable the feature. Feature Flags can only be removed for Harness Professional and Essentials editions. Once t…
# sidebar_position: 2
helpdocs_topic_id: kqik8km5eb
helpdocs_category_id: xyexvcc206
helpdocs_is_private: false
helpdocs_is_published: true
---


:::note
Currently, this feature is in Beta and behind a Feature Flag. Contact [Harness Support](https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=support@harness.io) to enable the feature. Feature Flags can only be removed for Harness Professional and Essentials editions. Once the feature is released to a general audience, it is available for Trial and Community Editions.

:::

This topic describes the settings in **My Source Code Manager**. It's a reference you can use when you are trying to find the requirements and options for a specific **My Source Code Manager** setting.

For instructions on setting up and using My Source Code Manager, see [Add Source Code Managers](https://docs.harness.io/article/p92awqts2x-add-source-code-managers).

**My Source Code Manager** is required for Harness Git Experience. For details on Harness Git Experience, see [Harness Git Experience Overview](../../10_Git-Experience/git-experience-overview.md).


### Source Code Manager Overview

In Harness Git Experience, a Harness Project is synced with a Git provider and has multiple Harness Users making commits to multiple branches.

It can be difficult to audit all the Users making commits in the same Project without some way of identifying the users in Harness and your Git provider. Without some way of identifying them, all commits will look like they came from the same person.

A **Source Code Manager** (SCM) uses your personal Git account information to identify the commits you make. A Source Code Manager is useful for auditing who is making changes to a Project, Pipeline, Connector, etc.

**A Source Code Manager is mandatory for Harness Git Experience.** If you don’t have a SCM when you try to enable Harness Git Experience, Harness will warn you and require you set one up.

### GitHub Authentication

* **Supported Methods:** username and Personal Access Token (PAT). For information on creating PAT in GitHub, see [Creating a personal access token](https://docs.github.com/en/github/authenticating-to-github/keeping-your-account-and-data-secure/creating-a-personal-access-token).
* **Scopes:** select all the **repo** and **user** options.![](./static/source-code-manager-settings-06.png)

Your GitHub Personal Access Token is stored in your Harness secret, which is a private key to which only you have access. This secret cannot be accessed or referenced by any other user.

### Bitbucket Authentication

* **Supported Methods:**
	+ Username and Password. This is the Bitbucket username and App password in your Bitbucket account settings.![](./static/source-code-manager-settings-07.png)
	+ SSH Key. This is the private key. The corresponding public key is added to your Bitbucket account settings.![](./static/source-code-manager-settings-08.png)
* **See also:** [Set up an SSH key](https://support.atlassian.com/bitbucket-cloud/docs/set-up-an-ssh-key/) from Bitbucket.

### GitLab Authentication

* **Supported Methods:**
	+ Username and Password.
	+ Username and Personal Access Token (PAT).
	+ Kerberos.
	+ SSH Key. This is the private key. The corresponding public key is added to your GitLab account settings.![](./static/source-code-manager-settings-09.png)
* **Scopes:** select **api**.![](./static/source-code-manager-settings-10.png)
* **See also:** [Set up your organization](https://docs.gitlab.com/ee/topics/set_up_organization.html) from GitLab.

### Azure DevOps Authentication

* **Supported Methods:**
	+ Username and password.
	+ Username and Personal Access Token (PAT).
	+ SSH key.
* **Scopes:** for Personal Access Tokens, **Code: Full**.![](./static/source-code-manager-settings-11.png)
* **See also:** [View permissions for yourself or others](https://docs.microsoft.com/en-us/azure/devops/organizations/security/view-permissions) from Azure.

