---
title: Tags reference
description: You can add tags to Harness entities and then use the Tags to search for all matching entities. For example, you can add a Tag to a Harness project and then filter the list of projects by tag. What a…
# sidebar_position: 2
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

* [Runtime inputs](runtime-inputs.md) (`<+input>`) are not supported in Tags.
* Harness variable expressions cannot be used in Tags. Go to [Built-in Harness Variables Reference](../12_Variables-and-Expressions/harness-variables.md).

### Delegate tags and general tags

Delegate tags are different from general Tags in the following ways:

* Delegate tags are tags added to delegates.
* Delegate tags are not used in searches.
* Delegates are only tagged with delegate tags. General tags are not applied to delegates.

### Tag expressions

You can reference tags using [Harness expressions](../12_Variables-and-Expressions/harness-variables.md).

You simply reference the tagged entity and then use `tags.[tag name]`, like `<+pipeline.tags.docs>`.

For example, here are several different references:

* `<+pipeline.tags.[tag name]>`
* `<+stage.tags.[tag name]>`
* `<+pipeline.stages.s1.tags.[tag name]>`
* `<+serviceConfig.service.tags.[tag name]>`

### Related reference material

* [Built-in and custom Harness variables reference](../12_Variables-and-Expressions/harness-variables.md)
