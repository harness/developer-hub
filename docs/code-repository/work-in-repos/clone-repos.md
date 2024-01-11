---
title: Clone
description: Clone your Harness Code repos to your local machine
sidebar_position: 10
---

After [creating a repository](../config-repos/create-repo.md), you can work directly in the Harness Code UI or you can clone your repo to your local machine and use your favorite IDE.

## Clone over HTTPS

1. In your Harness project, go to the **Code** module, select **Repositories**, and then select the repository you want to clone.
2. Go to **Files** and select **Clone**.
3. If this is the first time you've cloned this repository, select **Generate Clone Credentials**, and then copy the **Password (API Token)** and store it somewhere secure. Clone credentials are only shown once.

   When you select **Generate Clone Credentials**, Harness Code automatically creates an [API token](/docs/platform/automation/api/add-and-manage-api-keys) in your user profile.

   :::warning

   Tokens carry many privileges; treat your user tokens as passwords and store them securely.

   :::

4. Copy the Git clone URL shown on the **Clone** dropdown, and use it to clone your repository through command line Git or with your preferred Git GUI tool.

   When cloning the repository, you will be prompted for your Harness user name and the API token, which were shown when you generated clone credentials.

5. Once cloned locally, you can work with your Harness Code repository as you would with other Git repositories, by creating commits, pushing to the remote, pulling changes, and more.
