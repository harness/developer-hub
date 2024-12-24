---
title: Manage users in FME
sidebar_label: Manage users in FME
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360006960311-Manage-users-in-Split </button>
</p>

## Question

How do I manage my Split login users?

## Answer

Split’s permissions model allows for by-environment or by-feature access controls, as well as the creation of groups for easier administration of permissions by teams.

Administrators can visit the admin section of Split to enable or disable access to any environment or feature at the individual user level, or create groups to quickly grant permissions to all the users within them. Any Split user can be a part of as many groups as you’d like.

In addition to [tags](https://docs.split.io/docs/tags), you can use owners to organize and manage feature flags, segments and metrics across the Split user interface. Use owners to isolate feature flags, segments, and metrics in the browse panes to those owned by me and simplify permissions by providing owners edit rights for a single feature flag across all environments by toggling permissions on. When toggled on, permissions will inherit owners as editors.

We recommend using groups where possible as owners. As you onboard new teammates their Split instance will have several feature flags owned by their team.

Visit our documentation to read more about Split’s permissions controls, using owners, and [creating groups](https://docs.split.io/docs/managing-user-groups).