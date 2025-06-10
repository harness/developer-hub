---
title: Create a feature flag
sidebar_label: Create a feature flag
description: ""
sidebar_position: 1
---

<p>
  <button hidden style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/9058495582349-Create-a-feature-flag </button>
</p>

When you create a feature flag, you specify metadata, including the flag name, description, owners, and tags. This information helps you and your team manage your feature flags and customize them to your team's workflow.

## Create a feature flag

To create a feature flag, do the following:

1. From the left navigation, click **Feature flags**. The feature flag list view appears.

2. Click the **Create feature flag** button to create a new feature flag.

    ![](./static/create-a-feature-flag.png)

3. Enter the following information for your new feature flag to help you and your team manage your feature flags and customize them to your team's workflow:

    * **Name.** Enter a name your team can recognize. Feature flag names must start with a letter and can contain the characters - _ a-z A-Z 0-9.  They can't be named *datetime*, *string*, *set*, or *integer* because those are reserved words.
    * **Traffic type.** Select a [traffic type](https://help.split.io/hc/en-us/articles/360019916311) you want to use this feature flag for. A traffic type indicates the type of key you use to split your traffic, for example, user, account, store, etc.
      :::important[Note]
      Once a feature flag is created with specific traffic types, you cannot change the traffic type or name. This is done so the experiment data is not mixed from different traffic types, which could contaminate the results. To use a different traffic type, create a new feature flag with the desired traffic type.
      :::

    * **Owners.** By default, a user creating a feature flag is an owner along with the Admin group. You can add more users or groups as owners for your feature flag. Use owners to organize a feature flag to those *owned by me* for filtering and notification purposes, and to grant edit permissions in environments that [restrict who can edit](https://help.split.io/hc/en-us/articles/360020579052-Permissions).
    * **Tags.** Optionally add one or more [tags](https://help.split.io/hc/en-us/articles/360020839151) to categorize a feature flag or associate it with a particular team, feature release, area of your product, or other internal structure. Tags are useful for filtering lists and rollout boards. Be aware that tags are case sensitive.
    * **Description.** Optionally provide a description of a feature flag. The description explains the flag’s purpose and what functionality is controlled. If the flag being used for an experiment, use this to provide information about the experiment objective.
    * **External objects.** Optionally associate a feature flag with one or more external objects, if a compatible integration is configured. Examples of integrations include [Jira](/docs/feature-management-experimentation/integrations/jira-cloud) and [Azure DevOps](/docs/feature-management-experimentation/integrations/azure-devops).

4. Click the **Create feature flag** button to create your feature flag. Your new flag is displayed. 

    ![](./static/create-a-feature-flag-initiate-environment.png)

## Next step

After you have created your feature flag, you can [define treatments and targeting rules](/docs/feature-management-experimentation/feature-management/define-feature-flag-treatments-and-targeting) for your feature flag.