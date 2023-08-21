---
title: Configure Git Experience for OPA
description: Configure Git Experiemce for your policies.
sidebar_position: 9
---


You can create policies and store them in your Git repository. These policies are called remote policies.
Whenever you modify your policy and push the changes, Harness uses the updated policies.

For information on creating an inline policy, go to [Harness Policy As Code Quickstart](./harness-governance-quickstart.md).

This topic explains how to create a remote policy and apply it using Harness Git Experience.

You can store your policies in one of the following Git providers: 
- GitHub
- Bitbucket Cloud
- Bitbucket Server
- Azure Repos
- GitLab

## Prerequisites
To create a remote policy, you must have:
- **Create/Edit** permissions for policies.
- A Git repo with at least one branch.
- A Git connector with a Personal Access Token (PAT) for your Git account.​​
- A PAT for your Git account.
  - Harness needs the PAT to use the Git platform APIs.
  - You add the PAT to Harness as an [encrypted text](../../Secrets/2-add-use-text-secrets.md), and it is encrypted using a Harness Secret Manager.
  - Your Git Personal Access Token is stored in your Harness secret and is a private key to which only you have access. This secret cannot be accessed or referenced by any other user.

## Important notes

- This feature is currently not supported in Harness Self-Managed Enterprise Edition.

## Demo video

<docvideo src="https://www.loom.com/share/ce2ad5d95b464daa941da264cc43795a?sid=a28b9465-0915-45ed-85e5-62f7dbcdcd8c"/>

## Create a remote policy

To create a remote policy in Harness: 

1. Select **Policies** and then select **New Policy**.
2. Enter a name for your policy.
3. Select **Remote**. The additional settings appear to configure Git Experience.
4. In **Git Connector**, select or create a Git Connector to the repo for your Project. For steps, see [Code Repo Connectors](../../7_Connectors/Code-Repositories/connect-to-code-repo.md).
5. In **Repository**, select your repository. If your repository isn't listed, enter its name since only a select few repositories are filled here.
6. In **Git Branch**, select your branch. If your branch isn't listed, enter its name since only a select few branches are filled here.
7. Harness pre-populates the **Rego Path**. You can change this path and the file name.
   Policies use OPA authoring language Rego. For more information, go to [OPA Policy Authoring](https://academy.styra.com/courses/opa-rego).
8. Click **Apply**.
9. Enter your own Rego policy and select **Save**.

    The **Save Policy to Git** settings appear.

10. In **Select Branch to Commit**, commit to an existing or new branch.

    - **Commit to an existing branch**: you can start a pull request if you like.
    - **Commit to a new branch**: enter the new branch name. You can start a pull request if you like.
12. Select **Save**.

   Your policy now appears in the list as a remote policy with the repository details next to it.

Harness displays the last sync details for this remote policy as well as the **Commit ID**. The sync frequency is every five minutes. Each time the **Commit ID** changes, the latest policy is pulled from Git. 


:::important
Harness always evaluates policies using the main or default branch of the Git repository. Policies are not evaluated until you commit them to the default branch of your repository. To do this, you can merge them or commit directly to the default branch.
:::
