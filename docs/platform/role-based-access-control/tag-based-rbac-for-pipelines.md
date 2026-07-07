---
title: Manage pipeline access with tag-based RBAC
description: Control pipeline permissions using tags to simplify access management at scale.
sidebar_position: 130
keywords:
  - RBAC
  - tags
  - pipelines
  - permissions
  - resource groups
  - access control
  - user groups
tags:
  - rbac
  - permissions
  - tags
  - pipelines
---

Tags are metadata that take the form of `key-value` pairs or `key-only` flags. 
For example:
- **type: prod** - Identifies production pipelines.
- **security: high_severity** - Marks pipelines with high security criticality.
- **dev_only** - A key with no value that acts as a flag for development-only pipelines.

You can attach these tags to Harness entities, such as pipelines, services, environments, repositories, etc. They allow you to organize, search, and filter Harness entities. You can add multiple tags to an entity, creating a list of tags.

Tag-based RBAC allows you to control pipeline access using tags instead of manually selecting individual pipelines in resource groups. This approach simplifies permission management when you have multiple pipelines and need to grant consistent access based on environment, criticality, or other criteria.

:::info note
Currently, this feature is behind the feature flag `PIE_TAG_BASED_ACCESS_TO_PIPELINES`. Contact [Harness Support](mailto:support@harness.io) to enable it.
:::

## What will you learn in this topic?

By the end of this topic, you will be able to:

- [Apply tags to pipelines](#step-1-apply-tags-to-pipelines) to categorize them by environment, criticality, or other attributes.
- [Create resource groups that grant access to pipelines based on tags](#step-2-configure-the-resource-group-to-use-tag-based-access) rather than explicit pipeline selection.
- [Automatically include new pipelines in resource groups](#step-4-assign-the-resource-group-to-a-user-group) by applying the appropriate tags.
- [Understand tag behavior with Git-stored pipelines](#tag-behavior-with-git-stored-pipelines) and how it impacts resource group membership.

---

## Before you begin

Before you use tags with pipelines, ensure you have the following:

- **Understanding of tags**: Familiarity with how tags work as metadata for organizing Harness entities. Go to <a href="/docs/platform/tags/tags-with-pipeline" target="_blank">Tags with Pipeline</a> to learn the basics.
- **Resource group configuration**: Knowledge of how to configure resource groups in Harness. Go to <a href="/docs/platform/role-based-access-control/add-resource-groups" target="_blank">Manage resource groups</a> to configure resource groups.
- **User group management**: Understanding of creating and managing user groups in Harness. Go to <a href="/docs/platform/role-based-access-control/add-user-groups" target="_blank">Manage user groups</a> to create user groups.

---

## Manage environment-based entity access

Take the example of pipelines to understand how tags are used for environment-based access.
Suppose you manage three pipelines for different environments: `Dev`, `QA`, and `Production`. You want specific users in each environment to have appropriate access. For example, you want **developers** to have access to all `Dev` and `QA` pipelines, and **DevOps admins** to have `Pipeline Execute` and `Edit` permissions to `Production` pipelines.

Instead of manually adding each pipeline to a resource group and assigning permissions to users individually, you can use a **type: dev_only** tag to grant **developers** access to all `Dev` and `QA` pipelines.

To access a subset of `Dev` pipelines, you can select specified pipelines or use **By Tag**. If you have multiple pipelines, you can avoid searching through a list of pipelines and select them individually by leveraging **By Tag** option. 
In addition, when you add new `Dev` pipelines in Harness, you would not have to manually include each new pipeline in the resource group. You can apply the tag to your pipeline, and relevant users will automatically have access to the newly added `Dev` pipelines.

### Step 1: Apply tags to pipelines

Based on the example in the [previous section](#manage-environment-based-entity-access), tag your <a href="/docs/continuous-delivery/getting-started/#step-1-create-your-pipeline" target="_blank">pipelines</a> that deploy to the `Dev` environment with the tag **type: dev_only**. Go to <a href="/docs/platform/references/tags-reference#create-tags-for-pipelines" target="_blank">Tags reference</a> to add tags to pipelines.

### Step 2: Configure the resource group to use tag-based access

After you select the resources for which you want to provide user access such as **Pipelines**, **Services**, **Environments**, select the **By Tag** option.

<div style={{textAlign: 'center'}}>
    <DocImage path={require('./static/Pipeline_access_resource_group_tag.png')} width="80%" height="60%" title="Click to view full size image" />
</div>

### Step 3: Select the tag in the resource group

Provide the tag of the pipelines you want users to have access to. In this case, use the tag **type: dev_only**.

<div style={{textAlign: 'center'}}>
    <DocImage path={require('./static/tag_access_example.png')} width="80%" height="60%" title="Click to view full size image" />
</div>

### Step 4: Assign the resource group to a user group

You can grant users the required access by adding users to a user group and assigning permissions to the resource group. For example, you can create a user group for developers that has `Pipeline Execute` access to this resource group. This ensures that all users in this group have access to pipelines tagged with **type: dev_only**. 


<div style={{textAlign: 'center'}}>
    <DocImage path={require('./static/user-group-tag-based-access.png')} width="80%" height="60%" title="Click to view full size image" />
</div>

---

## Remove tags

If you want to remove a pipeline from the resource group, remove the tag from the pipeline. Go to <a href="/docs/platform/tags/overview#remove-tags-from-pipelines" target="_blank">remove tags from pipeline</a> for detailed steps. 
The pipeline is automatically removed from the resource group without requiring you to edit the resource group.

---

## Tag behavior with Git-stored pipelines

When you work with tag-based resource groups, Harness uses the tag found in the Harness metadata for the pipeline.

When pipelines are stored in Git, tags behave in the following manner:

- **Different branches may have different tags**: Different versions of the pipeline stored in different branches may have different tags.
- **Direct Git updates do not sync tags**: Updating the tag in the pipeline directly in Git does not update it in Harness. You must save the pipeline through the Harness UI to sync the tags.
- **Saving a branch updates Harness tags**: When you save a different branch of the pipeline in the Harness UI, Harness updates the tags in the system to match the tags from that specific branch.
- **Pipeline editors control resource group membership**: The editor of the pipeline can add or remove it from the resource group by editing the tags. The editor does not need to edit the resource group directly or have access to it.
- **Expression tags are not resolved at rest**: Using expressions as tags means they are resolved only during runtime. Neither the pipeline executions nor the pipeline with expression tags will be added to the resource group.

This behavior can impact tag-based resource groups. Specifically, a pipeline may enter or exit a group based on the last saved branch from the UI.

---

## Related articles

- <a href="/docs/platform/role-based-access-control/add-resource-groups" target="_blank">Manage resource groups</a>: Understand how to create and configure resource groups.
- <a href="/docs/platform/role-based-access-control/add-user-groups" target="_blank">Manage user groups</a>: Learn how to create and manage user groups in Harness.
