---
title: Entity Retention Policy
description: This topic lists the Harness entity retention policy. Retention Policy Defaults. All Harness entities share the same retention policy. You can change the retention policy. The default retention polic…
# sidebar_position: 2
helpdocs_topic_id: 9i2kt42ztb
helpdocs_category_id: fb16ljb8lu
helpdocs_is_private: false
helpdocs_is_published: true
---

This topic lists the Harness entity retention policy.

### Retention Policy Defaults

All Harness entities share the same retention policy. You can change the retention policy.

The default retention policy for deleted entities is 6 months. This includes entity Ids. 

### Reduce the Retention Policy

You can’t reduce the retention policy below the default of 6 months.

You can reduce a policy that is greater than 6 months.

If you reduce the retention policy, it effects existing entities. If existing entities current timestamp is longer than the newly defined policy they are removed from Harness.

### Extend the Retention Policy

You can extend the retention policy by contacting Harness. 

If you extend the retention policy:

* The new retention policy applies on all entities. You can’t have different policies per Project, Pipeline, etc.
* The new retention policy will affect all existing entities and their retention will be extended by the new policy. An extended retention policy does not affect newly created entities only.

### See also

* [Entity Identifier Reference](entity-identifier-reference.md)
* [Harness Entity Reference](harness-entity-reference.md)
* [Entity Deletion Reference](entity-deletion-reference.md)

