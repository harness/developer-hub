---
title: Why can't I edit the feature flags I create?
sidebar_label: Why can't I edit the feature flags I create?
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360046838712-Why-can-t-I-edit-the-feature-flags-I-create </button>
</p>

## Question

Every time I create a feature flag it doesn't mark me as an editor so I can't make new rules!

## Answer

This is probably because the administrator has set most of the environments with editors restricted.  This means that any feature flag that gets created needs to have editing rights manually assigned before it can be edited by anyone other than those assigned at an Environment-level.  There are two potential suggestion for the administrator to mitigate this issue:

1. Create at least one environment in a workspace that is a sandbox of sorts where anyone can edit.  This would allow you to immediately edit a feature flag that you create.  To get promoted to a real environment would need to be done by someone with editing rights for that environment. 
2. Use approvals.  This is a feature that provides greater flexibility, in most cases, allowing anyone to edit feature flags and segments in a restricted environment, but preventing them from publishing those edits. Today’s restricted editors can be your approvers, potentially eliminating a bottleneck in getting updates done and reducing administrative overhead on those who currently have to grant permissions.

You have two options:
* The user can request a teammate approve the change, to ensure a second set of eyes is on a change, or
* You can identify a group of authorized approvers, as noted above, perhaps the same people who have default edit rights in your locked-down environments.