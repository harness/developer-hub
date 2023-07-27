---
title: Manage flags using Git Experience
sidebar_label: Manage flags with Git
description: Using Harness Git Experience with Feature Flags allows you to manage your Flags from a .yaml file in your Git repository.
tags: 
   - git experience
   - feature flag
   - SCM
sidebar_position: 80
helpdocs_topic_id: 6f5eylg819
helpdocs_category_id: 77l6flntwl
helpdocs_is_private: false
helpdocs_is_published: true
---
```mdx-code-block
import git_1 from './static/5-manage-featureflags-in-git-repos-04.png'
import git_2 from './static/5-manage-featureflags-in-git-repos-05.png' 
import git_3 from './static/5-manage-featureflags-in-git-repos-06.png' 
import git_4 from './static/5-manage-featureflags-in-git-repos-07.png' 
import git_5 from './static/5-manage-featureflags-in-git-repos-08.png' 
import git_6 from './static/4-git-blue-circle.png'  
import git_7 from './static/5-manage-featureflags-in-git-repos-09.png' 
import git_8 from './static/8-git-off.png' 
```

:::caution
 There is a known issue with this feature. When you turn on a Feature Flag, some target rules may be reordered in your Git repo. This doesn't affect the functionality of your Feature Flag or targets and we are working to fix this issue as soon as possible.
:::

Using Harness Git Experience with Feature Flags allows you to manage your flags from a YAML file in your Git repository. When you enable Git Experience, changes you make to flags on the Harness Platform are committed on Git, and commits you make on Git are reflected in the Harness Platform. This means you can work on flags entirely from Git, the Harness Platform, or both, and your changes will be synchronized in both places. 

:::info note
This feature is not supported on the Harness Self-Managed Enterprise Edition (on-prem).
:::

## How Git Experience works with Feature Flags

When you set up Git Experience and enable it in your Feature Flag Project, Harness automatically creates a file specified by the user during the setup phase, for example, `flags.yaml`. All your flag, environment, and target information is stored in this file. 

The following example YAML file shows:

* A non-permanent boolean flag named `Flag_1.`
* `Flag_1` sits within Environment `Env_1`.
* The variations of `Flag_1` within `Env_1`, and which variations are set as default.
* The current state of `Flag_1`, which is toggled `on`.
* A target with the ID `T_1`.
* The variation served to `T_1`.

### Example YAML file for flags

<details>
  <summary>Example of a YAML file for Feature Flags</summary>

Here is a sample `flags.yaml` file:

```
featureFlags:  
 flags:  
  - flag:   
     name: Flag_1  
     identifier: Flag_1   
     description: "GitExFlag"   
     permanent: false   
     spec:   
         type: boolean   
         default:  
             onVariation: "true"   
             offVariation: "false"  
         variations:  
            - identifier: "true"  
              value: "true"   
            - identifier: "false"   
              value: "false"     
      environments:   
         - identifier: Env_1   
           default:  
              onVariation: "true"   
              offVariation: "false"  
           state: "on"  
targetRules:  
   - targets:   
          - identifier: T1  
            variation: "false"   
projectIdentifier: FF_Docs_Demo  
orgIdentifier: Docs
```
</details> 

The synchronization between the Harness Platform and the `flags.yaml` file works in both directions:

* When you update the Harness Platform, the changes are committed to Git. Changes are synced to the remote repository immediately.
* When you commit changes to Git, the Harness Platform is periodically updated. The changes will be synced up to 5 min after you commit in Git.


If you don’t see the changes you made in Git reflected on the Harness Platform after approxymately 5 min, refresh the page.

:::caution
 Syncing changes between a remote file and the Harness Platform can take up to 5 mins. During this window the changes are commited to the remote file but not yet pulled and synced by the Harness Platform. Any changes made to the Harness Platform within that window trigger remote file updates, which overwrite the content of the remote file.
:::

## Prerequisites

### Create at least one flag in Harness

In order to access the Git Sync setup in the Harness UI, you must [add at least one flag](/docs/feature-flags/ff-creating-flag/create-a-feature-flag) in Harness.

### Create or identify a Git repository

Your repository must have at least one branch.

### Create a Personal Access Token (if adding a new Git connector)

When you set up Git Experience, you either select an existing Git connector in Harness, or create a new one.  

If you're creating a new Git connector, you must first create a Personal Access Token (PAT) for your Git account to supply to the connector. The PAT must have the following scopes selected:

  * **In GitHub**
    * repo (all permissions)
    * user (all permissions)

  * **In Bitbucket**
    * Pull requests: Write
    * Issues: Read
    * Webhooks: Read and write

You can create the connector beforehand in Harness, or you can create it while setting up Git Experience.

## Set up Git Experience

You must set up Git Experience before you can turn on syncing with Git in your Feature Flags project. 

:::caution
Do not use **Git Management** in Project Setup. This is an older version of Git Experience that does not work with Feature Flags.
:::

During the setup, you are asked to either select an existing Harness Git connector, or create a new one. If creating a new one, have your [PAT](#create-a-personal-access-token-if-adding-a-new-git-connector) ready to enter into the connector configuration. You can also create a Git connector before starting this procedure. Go to [Connect to a Git repository](/docs/platform/Connectors/Code-Repositories/connect-to-code-repo) for instructions.

To set up Git Experience:

1. In Harness, select **Feature Flags**, and in the Feature Flags page, select **Set Up Git Sync** at the top.

  :::info note
  You must [add at least one flag](/docs/feature-flags/ff-creating-flag/create-a-feature-flag) on this page in order to see the **Set Up Git Sync** button.
  :::

  The **Set up a Git connection** form appears:

  ![Set up a git connection form](./static/gitex-setup-git-connection.png)

1. Configure these fields, and then select **Save**:

    * **Git Connector** - Select an existing connector, or select **+ New Connector** to create a new one.

      If creating a new connector, you must enter the access token ([PAT](#create-a-personal-access-token-if-adding-a-new-git-connector)) to your Git repo in the Credentials step, and be sure to select **Enable API access**.

      ![New Git Connector form with **Enable API access** checkbox selected](./static/gitex-connector-enable-api-access.png)

      For more information, go to [Connect to a Git repository](/docs/platform/Connectors/Code-Repositories/connect-to-code-repo), and [Git connector settings reference](/docs/platform/connectors/code-repositories/ref-source-repo-provider/git-connector-settings-reference/).

    * **Repository** - Select or enter the name of your repository.
    * **Git branch** - Select or enter a branch name.
    * **YAML Path** - Enter the path to the [YAML file](#example-yaml-file-for-flags) containing your flag information.

## Turn on syncing with Git

You can turn the synchronization between the Harness Platform and Git on or off. The Git Experience icon is displayed on many pages, and you can toggle it on or off from any page where it appears.

:::caution
 Turning sync on triggers an immediate attempt to sync Harness content to the remote file.
 Any changes you made to the remote file before syncing are overwritten. This can result in losing content or configurations that are not yet synced to Harness.
:::

To turn on synchronization between the Harness Platform and Git: 

1. Ensure that Git Experience has been [enabled](/docs/platform/Git-Experience/configure-git-experience-for-harness-entities) for your project.

1. Select **Feature Flags**.

  In the top bar navigation, the Git repository and the branch you connected are displayed.

  ![The Sync with Git toggle highlighted](./static/5-manage-featureflags-in-git-repos-04.png)

1. Select the branch, and then toggle **Sync with Git** on. 

    (See [Auto-commit to the selected branch](#auto-commit-to-the-selected-branch) for the second toggle.)

    If you enable only **Sync with Git**, each time you make a change to a flag on Harness, you are prompted to confirm which branch you want to commit to, and to add a commit message. For example:

    ```mdx-code-block
    <img src={git_2} alt="An example commit message." height="500" width="400" />
    ```

1. Optionally, you can select **Always commit to this branch and do not prompt for commit message**. 

  This toggles on the [**Auto-commit to the selected branch**](#auto-commit-to-the-selected-branch) option, described below.

### Auto-commit to the selected branch

When you sync your Feature Flags project with Git, whenever you change a flag, you're prompted for the branch and a commit message, which then updates your flag configurations file in the Git repo.

If you want to always commit to the same branch, and not be prompted for commit messages, follow these steps:

1. In Harness, go to the project you enabled Git Experience for.

1. Select **Feature Flags**.

  In the top bar navigation, the Git repository and the branch you connected are displayed.

    ![Sync with Git turned on, auto-commit turned on](./static/5-manage-featureflags-in-git-repos-07.png)

1. Select the branch, and then turn on **Auto-commit to selected branch**. 

  Now, whenever you change a flag in Harness, an auto-commit is done automatically, and your flag changes are synced to the flag configuration file (for example, `flags.yaml`) in the Git repository. Auto-committed have the prefix `[AUTO-COMMIT]`, for example:

  ```mdx-code-block
  <img src={git_5} alt="A screenshot of an auto commit message on GitHub. " height="500" width="700" />
  ```  

  <details>
  <summary>Possible Auto-commit messages</summary>

  [AUTO-COMMIT] Created feature flag  

  [AUTO-COMMIT] Toggled feature flag  

  [AUTO-COMMIT] Updated feature flag details  

  [AUTO-COMMIT] Updated feature flag rules  

  [AUTO-COMMIT] Updated feature flag targeting  

  [AUTO-COMMIT] Updated feature flag variations  

  [AUTO-COMMIT] Deleted feature flag variations 

  [AUTO-COMMIT] Updated feature flag prerequisites  

  [AUTO-COMMIT] Updated feature flag targets  

  [AUTO-COMMIT] Deleted feature flag  

  [AUTO-COMMIT] Added feature flag to targets

  </details>

## Turn off syncing with Git

When you turn off syncing with Git, any changes you make to flags in Harness are not committed to the flags YAML file in your Git repository. Any changes to that file in your repository are not synced with Harness until you [turn on syncing](#turn-on-syncing-with-git) again.

To turn off syncing with Git:

1. In Harness, go to the project you enabled Git Experience for, and then select **Feature Flags**.

1. In the top bar navigation, next to the Git repository, select the branch, and then toggle **Sync with Git** off. 

  ![Sync with Git turned off](./static/5-manage-featureflags-in-git-repos-09.png)

  When syncing is off, the branch icon is a red warning circle:

  ```mdx-code-block
  <img src={git_8} alt="A screenshot of the Git sync toggle turned off." height="500" width="300" />
  ``` 

## Reset the Git connection

This procedure removes the connection to the Git repository that you configured when you [set up Git Experience](#set-up-git-experience).

To reset Git settings:

1. In Harness, go to the project you enabled Git Experience for, and then select **Feature Flags**.

1. In the top bar navigation, next to the Git repository, select the branch, and then select **Reset Git Settings**. 

  ![Reset Git Settings button circled](./static/gitex-reset-button.png)

