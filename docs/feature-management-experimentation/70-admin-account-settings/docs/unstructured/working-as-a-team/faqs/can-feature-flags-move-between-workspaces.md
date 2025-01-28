---
title: Can feature flags move between workspaces?
sidebar_label: Can feature flags move between workspaces?
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360022711211-Can-feature-flags-move-between-workspaces </button>
</p>

## Question

Using the Workspace feature to allow developers and teams to create feature flags, segments and traffic types in their own workspace, is it possible to migrate existing feature flags from one Workspace to another?

## Answer

There is no migration path for existing feature flags between workspaces. This is due to the fact that environments, API keys, segments, and traffic types are all children of and unique to a single workspace, so to cut over a feature flag from one workspace to another you’d need to also move or copy any segments used by that feature flag.  You probably want to make sure the traffic type is consistent, though that’s not really required. 

You will need to change the API key used in code for feature flags that are moved, so you’ll want to leave any feature flags getting traffic in place, copy the feature flag to the new workspace, change the API key, traffic will start flowing to the new workspace, and then you can delete the feature flag from the original workspace.

Finally, if any of the feature flags are using random, percentage-based targeting the bucketing will change when the feature flag is recreated in the new workspace.

What we recommend instead, if possible, is to create the workspaces needed for each team and have them start to use those workspaces for all their net new releases. All existing releases should continue forward and be completed in the current "Default" workspace and then removed from the code in the normal fashion.

In this manner there will be no potential impact on existing flags, allowing to incrementally phase teams into their own workspaces.