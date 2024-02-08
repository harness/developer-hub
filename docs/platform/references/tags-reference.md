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

### Limitations

* [Runtime inputs](/docs/platform/variables-and-expressions/runtime-inputs) (`<+input>`) are not supported in Tags.
* Harness variable expressions cannot be used in Tags. For more information, go to [Built-in Harness Variables Reference](/docs/platform/variables-and-expressions/harness-variables).

### Delegate tags and general tags

Delegate tags are different from general tags in the following ways:

* Delegate tags are tags added to delegates.
* Delegate tags are not used in searches.
* Delegates are only tagged with delegate tags. General tags are not applied to delegates.
