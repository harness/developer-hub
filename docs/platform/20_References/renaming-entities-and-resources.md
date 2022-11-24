---
title: Entity Name and Id Rules
description: This topic covers the rules about identical names and Ids for Harness entities.
# sidebar_position: 2
helpdocs_topic_id: 7rsydu6iq2
helpdocs_category_id: fb16ljb8lu
helpdocs_is_private: false
helpdocs_is_published: true
---

Entities and Resources in Harness have names and Ids ([entity Identifier](/article/tygjin99y9-harness-entity-reference)). For example, here's a GitHub Connector with the name **scm-hge** and the Id **scmhge**:

![](https://files.helpdocs.io/i5nl071jo5/articles/7rsydu6iq2/1650578060234/clean-shot-2022-04-21-at-14-54-10.png)Entity Ids are used to refer to Harness entities in [Harness variable expressions](/article/lml71vhsim-harness-variables).

Ids are immutable once the entity has been created, but names can be changed at any time.

Once the entity is created, you can change the name but the Id remains the same.

There are some important rules to know:

* [Entities of the same type in the same Project cannot use use Identical Ids](https://ngdocs.harness.io/article/7rsydu6iq2-renaming-entities-and-resources#entities_of_the_same_type_in_the_same_project_cannot_use_use_identical_ids)
* [You can use the Same Id in Different Orgs and Projects](https://ngdocs.harness.io/article/7rsydu6iq2-renaming-entities-and-resources#you_can_use_the_same_id_in_different_orgs_and_projects)
* [Different Types of Entities can have Identical Ids](https://ngdocs.harness.io/article/7rsydu6iq2-renaming-entities-and-resources#different_types_of_entities_can_have_identical_ids)

### Entities of the same type in the same Project cannot use use Identical Ids

Entities of the same type in the same Project can have the same names but must have different Ids. For example, these secrets are both named **foo**, but they have different Ids:

![](https://files.helpdocs.io/i5nl071jo5/articles/7rsydu6iq2/1650580526743/clean-shot-2022-04-21-at-15-35-02.png)For example, if you try to add a Connector to a Project that already has a Connector with the same Id, you will get an error:

![](https://files.helpdocs.io/i5nl071jo5/articles/7rsydu6iq2/1650579756496/clean-shot-2022-04-21-at-15-21-05.png)### You can use the Same Id in Different Orgs and Projects

Entities in different Harness Orgs can use identical Ids, and entities in the different Projects in the same Org can use identical Ids.

For information on Organizations and Projects, see [Organizations and Projects Overview](/article/7fibxie636-projects-and-organizations).For example, here are two GitHub Connectors with the same names and Ids but in different Harness Orgs:

![](https://files.helpdocs.io/i5nl071jo5/articles/7rsydu6iq2/1650579018631/clean-shot-2022-04-21-at-15-10-02.png)You can also have identical entities in different Projects in the same Org:

![](https://files.helpdocs.io/i5nl071jo5/articles/7rsydu6iq2/1650579518905/clean-shot-2022-04-21-at-15-18-20.png)### Different Types of Entities can have Identical Ids

Two entities of the same type, like Connectors, cannot have identical Ids in the same Project.

Two entities of different types, like Connectors and Pipelines, or even Pipelines and Stages, can have identical Ids in the same Project.

For example, in this Project there are four different types of entities with identical Ids:

![](https://files.helpdocs.io/i5nl071jo5/articles/7rsydu6iq2/1650580367504/clean-shot-2022-04-21-at-15-32-15.png)### See Also

* [Organizations and Projects Overview](/article/7fibxie636-projects-and-organizations)
* [Entity Deletion Reference](/article/amj1oz4x4k-entity-deletion-reference)
* [Entity Retention Policy](/article/9i2kt42ztb-entity-retention-policy)
* [Entity Identifier Reference](/article/li0my8tcz3-entity-identifier-reference)

