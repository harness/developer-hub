---
title: Overview
description: Add, manage, and remove tags from pipelines to organize and filter resources in Harness.
sidebar_position: 1
sidebar_label: Overview
helpdocs_topic_id: i8t053o0sq
helpdocs_category_id: phddzxsa5y
helpdocs_is_private: false
helpdocs_is_published: true
redirect_from:
  - /docs/platform/references/tags-reference
  - /docs/category/tags
  - /docs/platform/tags/tags-with-pipeline
keywords:
  - tags
  - pipelines
  - metadata
  - filters
  - search
  - resource management
tags:
  - tags
  - pipelines
  - metadata
---

Tags are metadata that you can attach to Harness entities, such as pipelines, services, environments, and repositories. They allow you to organize, search, and filter resources. You can add multiple tags to an entity in the form of key-value pairs or key-only flags.

:::info note
Tags are unavailable for feature flags.
:::

---

## What will you learn in this topic?

By the end of this topic, you will know how to:

- Add tags to new and existing pipelines.
- Search and filter pipelines using tags.
- Remove tags from pipelines.
- Understand how tags sync between pipeline YAML and Harness metadata.
- Handle tags for Git-stored pipelines across multiple branches.

---

## Before you begin

Before you work with pipeline tags, ensure you have the following:

- **Access to a Harness project**: You need permissions to view and edit pipelines. Go to [RBAC in Harness](/docs/platform/role-based-access-control/rbac-in-harness) to configure roles.
- **Understanding of pipelines**: Familiarity with creating and managing pipelines in Harness. Go to [Create your pipeline](/docs/continuous-delivery/get-started/key-concepts#create-a-pipeline) to learn the basics.

---

## Create tags for pipelines

In your Harness account, go to **Pipelines** and <a href="/docs/continuous-delivery/getting-started/#step-1-create-your-pipeline" target="_blank">create a pipeline</a> or select an existing pipeline. You can specify tags when you are creating a new pipeline. 

If you want to add tags to an existing pipeline, use the pencil icon next to the name of the pipeline, and specify tags under the **Tags (optional)** field.

### Search and filter using tags

You can use tags to search for all matching entities. For example, if you add the tag **docs** to two projects, a search for **doc** returns projects with names and tags that match:

<div style={{textAlign: 'center'}}>
  <DocImage path={require('./static/tags-reference.png')} width="80%" height="60%" title="Click to view full size image" /> </div>

---

## Remove tags from pipelines

Go to the pipeline whose tag you want to remove and select **Edit**.
Remove the tag and click **Save** to apply the changes.

--- 

## Tag sources and syncing

There are two locations where tags are stored:

- **In the pipeline YAML:** The source of truth for pipeline configuration.
- **In the Harness metadata:** Properties that Harness stores for fast reference, indexing, and filtering.

---

## Handle tag updates in pipeline YAML 

### Inline pipelines

The Harness metadata for a pipeline is synced with the latest values of the tags whenever the pipeline is saved in Harness (when YAML is stored as inline). This includes updates made via the `Update` API.

### Remote pipelines

If you update the tags in the pipeline YAML directly (by updating the YAML stored in Git when your pipeline is stored remotely), this does not update the Harness metadata. This can lead to discrepancies in displayed tags.

---

## Display tags

Tags are displayed on two main pages: the page that lists the pipelines (**Pipeline List** page) and the page that gives details about a specific pipeline (**Pipeline Detail page** page).

- **Pipeline List page**: Reads tags from the Harness metadata. Changes made directly in the YAML that are not synced by saving the pipeline will not reflect here.
- **Pipeline Detail page**: Reads the latest pipeline YAML from the source (repository or inline), displaying the newest values of the tags.

To ensure tags are displayed correctly in both the list and filters, save the pipeline in Harness after making any changes.

---

## Delegate tags and general tags

Delegate tags are different from general tags in the following ways:

- **Delegate tags:** Tags added to delegates.
- **Not used in searches:** Delegate tags are not used in searches.
- **Separate tagging:** Delegates are only tagged with delegate tags. General tags are not applied to delegates.

---

## Handling multiple branches in Git

When different versions of the pipeline exist in different branches in Git, the Harness metadata is synced to the branch that was last saved in Harness. This can cause the tags to vary if multiple users work on different branches of the pipeline in Harness. The tags will update based on the latest saved branch.

---

## Limitations

- **Runtime inputs**: [Runtime inputs](/docs/platform/variables-and-expressions/runtime-inputs) (`<+input>`) are not supported in tags.
- **Variable expressions**: Harness variable expressions can be used in pipeline tags. Go to [Built-in Harness Variables and Expressions Reference](/docs/platform/variables-and-expressions/harness-variables) to learn more.

---

## Next steps

You have learned how to add, remove, and manage tags for pipelines. Tags help you organize and filter resources at scale.

- <a href="/docs/platform/role-based-access-control/rbac-in-harness" target="_blank">RBAC in Harness</a>: Understand the permissions and role-based access control in Harness.
- <a href="/docs/platform/role-based-access-control/tag-based-rbac-for-pipelines" target="_blank">Manage pipeline access with tag-based RBAC</a>: Control permissions using tags instead of selecting individual pipelines.
- <a href="/docs/platform/tags/apply-filters-using-tags" target="_blank">Apply filters using tags</a>: Filter and search Harness entities based on tags.
- <a href="/docs/platform/tags/assign-metadata-using-tags" target="_blank">Assign metadata using tags</a>: Organize and categorize resources with tag metadata.

