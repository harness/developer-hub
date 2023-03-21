---
title: Manage Your Flags Using Git Experience
description: Using Harness Git Experience with Feature Flags allows you to manage your Flags from a .yaml file in your Git repository.
tags: 
   - git experience
   - feature flag
   - SCM
sidebar_position: 50
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
 There is a known issue with this feature. When you turn on a Feature Flag, some Target rules may be reordered in your Git repo. This doesn't affect the functionality of your Feature Flag or Targets and we are working to fix this issue as soon as possible.
:::

Using Harness Git Experience with Feature Flags allows you to manage your Flags from a .yaml file in your Git repository. When you enable Git Experience, changes you make to Flags on the Harness Platform are committed on Git, and commits you make on Git are reflected in the Harness Platform. This means you can work on Flags entirely from Git, the Harness Platform, or both, and your changes will be synchronized in both places. 

:::note
 In the unlikely circumstance that Harness and Git are connected but out of sync, your Git file is the source of truth. Changes in the Harness Platform don’t take effect until chnages will not be synced from remote file.
:::

## Before you begin

You must set up Git Experience in your Project before you can use it with Feature Flags.To do this:

<!-- TBD DOC-2410 * [ Add a Source Code Manager to your account. ](https://docs.harness.io/article/p92awqts2x-add-source-code-managers) -->
* Follow the steps in [Configure GitSync in Harness](../../platform/10_Git-Experience/git-experience-overview.md)  create a Git repository that contains at least one branch. Then pick up the connector, repository and destination destinaton file where you manage your Feature Flags. Note that currently branch setup cannot be reconfigured after initial setup.

Also ensure you read [How Git Experience works with Feature Flags](#how-git-experience-works-with-feature-flags). 

## How Git Experience works with Feature Flags

When you set up Git Experience and enable it in your Feature Flag Project, Harness automatically creates file specified by the user during the setup phase. All your Flag, Environment, and Target information is stored in this file. 

For example, the following sample shows:

* A non-permanent boolean Flag named `Flag_1.`
* `Flag_1` sits within Environment `Env_1`.
* The Variations of `Flag_1` within `Env_1`, and which Variations are set as default.
* The current state of `Flag_1`, which is toggled `on`.
* A Target with the ID `T_1`.
* The Variation served to `T_1`.

<details>
  <summary>Example of a YAML file for Feature Flags</summary>

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
The synchronization between the Harness Platform and the flags.yaml file works in both directions:

* When you update the Harness Platform, the changes are committed to Git. Changes should be should be synced to repote repo with immediate effect.
* When you commit changes to Git, the Harness Platform is periodically updated. The chances will be synced up to 5 min after commit is made.


If you don’t see the changes you made in Git reflected on the Harness Platformafter approxymately 5 min, refresh the page.

:::caution
 Syncing changes between remote file and Harness Platform can take up to 5 mins. During this window the changes are already commited to the remote file but not yet pulled and synced by Harness Platform. Any changes made to the to the Harness Platform within that window will trigger remote file update which will overwrite the content of the remote file.
:::

## Turn syncing with Git on or off

The Git Experience icons are displayed on many pages, you can turn it on or off from any page where it is displayed.

:::caution
 Turing sync on will trigger immediate attempt to sync Harness platform content to the remote file.
 All the changes made to the remote file while sync was disbled will be overwritten which will result in losing content or configuration not yet synced to the Platform.
:::

After you have enabled Git Experience and understand how it works with Harness Feature Flags, you can turn the synchronization between the Harness Platform and Git on or off by completing the following: 

1. Go to the Project you enabled Git Experience for.
2. Click **Feature Flags**.
3. In the top bar navigation, next to the New Flag button, the Git repository you connected is displayed.
4. Next to the Git repository, the branch you connected is displayed.
5. Click the branch and toggle the sync on or off. You have the following options:

### Sync with Git

```mdx-code-block
<img src={git_1} alt="The Sync with Git toggle highlighted." height="500" width="300" />
```
*Figure 1: Sync with Git turned on, auto-commit turned off*

This turns on syncing with Git. When you toggle only this button, each time you make a change on the Harness Platform, you will be prompted to confirm which branch you want to commit to in Git and to add a commit message. For example: 

```mdx-code-block
<img src={git_2} alt="An example commit message." height="500" width="400" />
```
*Figure 2: Example commit message*

:::note
 If you select the checkbox Always commit to this branch and do not prompt for a commit message, the Auto-commit to the selected branch option will be toggled on.
:::

When you are using this option, the branch icon is a gray circle:

```mdx-code-block
<img src={git_3} alt="A screenshot of the Git Sync button icon when using the Sync with Git option." height="500" width="300" />
```

*Figure 3: The branch icon when syncing with Git is enabled but auto-commit is disabled*

### Auto-commit to the selected branch

```mdx-code-block
<img src={git_4} alt="A screenshot with the Sync with Git and Auto-commit to selected branch toggles turned on." height="500" width="300" />
```
*Figure 4: Sync with Git turned on, auto-commit turned on*

This turns on Auto committing, which means you do not have to manually enter a commit message and confirm the branch you want to commit to. Any changes you make will automatically be synced to the flags.yaml file on Git. Changes that are auto-committed have a [AUTO-COMMIT] prefix, for example:

```mdx-code-block
<img src={git_5} alt="A screenshot of an auto commit message on GitHub. " height="500" width="700" />
```

*Figure 5: An auto-commit message in GitHub*

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

When you are using the auto-commit option, the branch icon is a blue circle:


```mdx-code-block
<img src={git_6} alt="A screenshot of the blue circle on the branch icon." height="500" width="300" />
```

*Figure 6:* *The branch icon when syncing with Git is enabled but auto-commit is enabled*

## Turn off syncing with Git

To turn off syncing with Git, turn off the Sync with Git toggle. 

```mdx-code-block
<img src={git_7} alt="Sync with Git turned off" height="500" width="300" />
``` 

*Figure 7: Sync with Git turned off*

If you turn the toggle on again, your Flags will sync with Git again right away. 

:::note
 The Auto-commit to the selected branch toggle will be the same status as before you turned off synching with Git. 
:::

When syncing is off, the branch icon is a red warning circle:

```mdx-code-block
<img src={git_8} alt="A screenshot of the Git sync toggle turned off." height="500" width="300" />
``` 

*Figure 8: A screenshot of the Git Sync icon when Git Sync is toggled off.*


## See also

For more information about using Git Experience, go to [Git Experience How-tos](../../platform/10_Git-Experience/git-experience-overview.md).

