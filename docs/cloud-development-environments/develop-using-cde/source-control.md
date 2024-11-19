---
title: Using Source Control in your Gitpaces
description: Learn how to execute various Git functions directly in your Gitspace.
sidebar_position: 1
sidebar_label: Source Control
---

This guide walks you through using source control in your Gitspaces, allowing you to perform all necessary Git actions directly within your Gitspace. 

:::info

You can also monitor and track all changes made in your Gitspaces directly through the Harness UI. [Learn more about tracking Gitspace changes in the documentation](docs/cloud-development-environments/features-of-gitspaces/tracking-changes.md).

:::

**Pre-Requisite**

Ensure you have created a Gitspace using the Harness UI and verify that it is running and in an active state.

## Creating (Switching) a New Branch  
In your Gitspace, you can create a new branch or switch between existing branches. The current branch you're working on is displayed in the bottom-left corner.

<img width="500" alt="branch-1" src="https://github.com/user-attachments/assets/a0485c50-e629-4a37-a5ff-f798b79dd53d"/>

### Using the CLI
Using the CLI
1. To create a new branch, use the following command in your terminal:  
   ```git branch <new_branch_name>```

2. To switch to the new branch, run:  
   ```git checkout <new_branch_name>```

<img width="550" alt="branch-2" src="https://github.com/user-attachments/assets/3b1bb740-3cc6-44e7-ba41-6f287806a660"/>


### Using the IDE
1. Locate the branch name in the bottom-left corner of your status bar. 
<img width="500" alt="branch-1" src="https://github.com/user-attachments/assets/a0485c50-e629-4a37-a5ff-f798b79dd53d"/>

2. Click on it to open a dropdown menu where you can:
   - Create a new branch by entering its details.
   - Select and switch to an existing branch.

<img width="600" alt="branch-3" src="https://github.com/user-attachments/assets/08fa6a02-cd80-445e-b733-5a7baa1d8f3b"/>
<img width="600" alt="branch-4" src="https://github.com/user-attachments/assets/e6c047bd-630e-4759-85d4-6317665d6e92"/>

## Commiting Changes to the Remote Repository
After making changes to your source code, you need to add and commit them to the remote repository.

### Using the CLI
1. Add your changes to the staging area:  
   ```git add .```

2. Commit the changes with a message:  
   ```git commit -m "<commit_message>"```

<img width="650" alt="commit-1" src="https://github.com/user-attachments/assets/b32c8a9e-309d-4311-b722-b01bb90ae49d"/>

### Using the IDE
1. Open the **Source Control** view from the Activity Bar.  
2. To stage changes, click the plus sign next to individual files or next to the **Changes** heading to stage all files at once.  
<img width="300" alt="commit-2" src="https://github.com/user-attachments/assets/3b91a092-3d93-42f0-9e08-7e4b25f99467"/>
3. Type a commit message describing your changes in the provided text box.  
4. Click **Commit** to save these changes.
<img width="330" alt="commit-3" src="https://github.com/user-attachments/assets/d0a768d8-efe1-4b93-892d-2a945ef5a514"/>


## Pushing Changes to the Remote Repository
Push your commits to the remote repository to make your changes available.

### Using the CLI
Use the following command to push commits:  
```git push```

If prompted to set an upstream branch, this associates your local branch with a branch on the remote repository.
<img width="700" alt="push-1" src="https://github.com/user-attachments/assets/b2934ead-d9b7-4097-b632-fc6c3b054e34"/>


### Using the IDE
1. In the **Source Control** view, locate and click the **arrow icon** next to the **Commit** option.  
2. From the dropdown menu, select **Commit and Push** to stage, commit, and immediately push your changes to the remote repository.

<img width="450" alt="push-2" src="https://github.com/user-attachments/assets/0ac1a360-f2b5-42e2-923f-3db968254b99"/>


## Pulling Changes from the Remote Repository
Sync your local repository with the latest changes from the remote repository.

### Using the CLI
To pull changes from the remote repository, use:  
```git pull```

This downloads and integrates remote updates into your local repository.
<img width="500" alt="pull-1" src="https://github.com/user-attachments/assets/7ccbb6e2-5200-4877-9110-bbf31f605bf4"/>


### Using the IDE
1. Open the **Source Control** view from the Activity Bar.  
2. Click the pull icon at the top of the sidebar.  
3. Select **Pull** from the dropdown menu.

<img width="450" alt="pull-2" src="https://github.com/user-attachments/assets/13388b12-cb45-4352-a492-42a5ea77c888"/>


## Creating a Pull Request (PR)
You can create a Pull Request (PR) using the CLI or your IDE.

### Using the CLI
1. Push your changes to the upstream branch:  
   ```git push origin <branch_name>```

<img width="700" alt="pr-2" src="https://github.com/user-attachments/assets/24c72b4e-1f3b-4029-98c0-103da532bc3e"/>


2. Navigate to your Git provider (e.g., GitHub) to create the Pull Request.

<img width="800" alt="pr-1" src="https://github.com/user-attachments/assets/b8c5db38-3fbf-4542-88eb-9d58eb5417c2"/>

### Using the IDE
1. Install the [GitHub Pull Requests Extension](https://marketplace.visualstudio.com/items?itemName=GitHub.vscode-pull-request-github) in your IDE.  
2. Access your open issues and Pull Requests directly from the sidebar.  
3. Click the Pull Requests icon, fill in the required details, and submit your PR.

<img width="250" alt="pr-3" src="https://github.com/user-attachments/assets/2b295d47-3806-4bbe-a2f9-f86d495e14ea"/>

<img width="250" alt="pr-4" src="https://github.com/user-attachments/assets/e0b5a87d-41aa-4b0e-b914-7762ec98d53a"/>

By following this guide, you can efficiently manage source control tasks within your Gitspaces, enhancing your workflow.

