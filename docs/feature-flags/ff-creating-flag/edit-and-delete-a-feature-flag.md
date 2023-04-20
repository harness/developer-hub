---
title: Edit or delete flags
description: After you have created a Flag, you can edit the following details of it --  Flag Name. Description. Whether or not it is marked as permanent. This topic describes how to edit these details on the Harnes…
tags: 
   - helpDocs
   - feature flag
sidebar_position: 40
helpdocs_topic_id: u80hwpf1wq
helpdocs_category_id: skrwlcueml
helpdocs_is_private: false
helpdocs_is_published: true
---

```mdx-code-block
import edit_flag from './static/2-edit-and-delete-a-feature-flag-06.png'
```

## Edit the details of a flag

After you have created a flag, you can edit the following details:

* Flag name
* Description
* Whether or not it is marked as permanent

To edit a flag:

1. In Harness, go to **Feature Flags**.
2. In your Project, click **Feature Flags**. All your current Flags are listed.
3. Next to the Flag you want to edit, click **more options︙**.
4. Click **Edit**. The flag details page appears, then click **more options︙**.

   ![A screenshot of the Flag details page, with the more options icon highlighted.](./static/2-edit-and-delete-a-feature-flag-05.png)

5. Edit the relevant details, and then select **Save**.


### See also

* [Edit your Flag Variations](manage-variations.md)
* [Add Prerequisite Flags](/docs/feature-flags/add-prerequisites-to-feature-flag)
* [Manage Your Targets](/docs/feature-flags/ff-target-management/add-targets)

## Delete a flag

When you are finished with a Feature Flag, it's best practice to remove it to keep your Flags and application organised and tidy. This topic describes how to delete a Feature Flag on the Harness Platform and using [Git](/docs/feature-flags/manage-featureflags-in-git-repos).

:::info note
 Make sure you are ready to delete the Flag from all of your Environments. When you delete a Flag on the Harness Platform or on Git, it is removed from all Environments.
:::

### Delete a flag using the Harness Platform

1. In Harness, go to **Feature Flags**, then to the Flag you want to delete.
2. Click **more options (****︙****)**next to the flag that you want to delete, then click **Delete**.

   ![A screenshot showing the Delete button for deleting a Flag on the Harness Platform.](./static/4-delete-a-feature-flag-03.png)

3. In **Delete Flag**, click **Delete**.


### Delete a flag using Git


If you [have set up Git Experience to manage your Flags](/docs/feature-flags/manage-featureflags-in-git-repos) via a `.yaml` file on Git, you can delete Flags from there. To do this:


1. Go to the `.yaml` file where you manage your Feature Flags.
2. Find the Flag you want to delete.
3. Delete the `- flag` object. For example, the following highlighted section would be deleted for the Flag called `New_Flag:`

   ![The .yaml file on Github. The flag object is highlighed for deletion. ](./static/4-delete-a-feature-flag-04.png)



