---
title: Harness Entity Reference
description: The term entity is used to refer to the components of Harness. Most entities can be created at the account, organization, and project level. In this topic --  Examples of Entities. Entity Identifiers. E…
# sidebar_position: 2
helpdocs_topic_id: tygjin99y9
helpdocs_category_id: fb16ljb8lu
helpdocs_is_private: false
helpdocs_is_published: true
---

The term entity is used to refer to the components of Harness. Most entities can be created at the account, organization, and project level.


### Examples of Entities

Here are some example of entity types in Harness:

* Account
* User
* Users Group
* Service
* Service Definition
* Environment
* Infrastructure
* Infrastructure Definition
* Pipeline
* Connectors
* Secrets
* Secret Managers

### Entity Identifiers

Most Harness entities and resources include a unique Id (Identifier) that is immutable once the entity is created.

Identifiers provide a permanent way to refer to an entity, and avoid issues that can arise when a name is changed.

See [Entity Identifier Reference](entity-identifier-reference.md).

### Entity Id Scope

Entity Id is scoped at the level where it is created. For example, two Pipelines can have the same Id if they are in different Projects.

Entity Id has the following rules:

* There cannot be 2 or more Orgs with the same Id within the account.
* There cannot be 2 or more Projects with the same Id within the Org.
* There cannot be 2 or more Pipelines with the same Id within the Project.
* There cannot be 2 or more stages with the same Id within the Pipeline.
* There cannot be 2 or more steps with the same Id within the stage.

### Id Naming

The identifier must start with `a-z`, `A-Z` or `_` and can then be followed by `0-9`, `a-z`, `A-Z`, `_` or `$`.

### Reserved Words

The Id should not be any of the following words:

* or
* and
* eq
* ne
* lt
* gt
* le
* ge
* div
* mod
* not
* null
* true
* false
* new
* var
* return
* step
* parallel
* stepGroup
* org
* account

### See also

* [Entity Identifier Reference](entity-identifier-reference.md)
* [Entity Retention Policy](entity-retention-policy.md)
* [Entity Deletion Reference](entity-deletion-reference.md)

