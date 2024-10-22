---
title: Tags reference
description: You can add tags to Harness entities and then use the tags to search for all matching entities. For example, you can add a tag to a Harness project and then filter the list of projects by tag.
sidebar_position: 10
helpdocs_topic_id: i8t053o0sq
helpdocs_category_id: phddzxsa5y
helpdocs_is_private: false
helpdocs_is_published: true
---

You can add tags to Harness entities and then use the tags to search for all matching entities. For example, you can add a tag to a Harness project and then filter the list of projects by tag.

:::info note

Tags are not available for feature flags.

:::

### What are tags?

Tags are simply metadata added to Harness entities. They are strings that can contain any characters.

Harness tags are applied to entities and then used to filter them. You can add multiple tags to an entity, creating a list of tags.

For example, the tag **docs** has been added to two projects. A search for **doc** returns projects with names and tags that match:

![](./static/tags-reference-18.png)

### Tags sources and syncing

There are two locations where Tags are stored:-

- In the Pipeline YAML.
- In the Harness Metadata (properties of the Pipeline that Harness stores for fast reference/indexing/filtering).

#### Handling Tag updates in Pipeline YAML 

##### Inline

The Harness Metadata for a Pipeline is synced with the latest values of the Tags whenever the Pipeline is saved in Harness, i.e., when YAML is stored as Inline. This includes updates made via the Update API.

##### Remote

If you update the Tags in the Pipeline YAML directly, i.e., you go and update the YAML stored in Git (when your Pipeline is stored Remotely), this does not update the Harness Metadata. This can lead to discrepancies in displayed Tags.

### Tags Display Logic

The Tags are displayed on two main pages: the Pipeline List page and the Pipeline Detail page. The Tags are read from different locations for these pages.

1. **Pipeline Detail Page**: Reads the latest Pipeline YAML from the source (repo or inline), displaying the newest values of the Tags.
2. **Pipeline List Page**: Reads Tags from the Harness Metadata. Changes made directly in the YAML that are not synced by saving the Pipeline will not reflect here.

To ensure Tags are displayed correctly in both the List and Filters, save the Pipeline in Harness after making any changes

### Limitations

* [Runtime inputs](/docs/platform/variables-and-expressions/runtime-inputs) (`<+input>`) are not supported in Tags.
* Harness variable expressions are used in pipeline tags. For more information, go to [Built-in Harness Variables and Expressions Reference](/docs/platform/variables-and-expressions/harness-variables).

### Delegate tags and general tags

Delegate tags are different from general tags in the following ways:

* Delegate tags are tags added to delegates.
* Delegate tags are not used in searches.
* Delegates are only tagged with delegate tags. General tags are not applied to delegates.

### Handling multiple branches in Git

When different versions of the Pipeline exist in different branches in Git, the Harness Metadata is synced to the branch that was last saved in Harness. This can cause the Tags to vary if multiple users work on different branches of the Pipeline in Harness. The Tags will update based on the latest saved branch.
