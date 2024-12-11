---
title: Audit logs
sidebar_label: Audit logs
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360020579472-Audit-logs <br /> ✘ images still hosted on help.split.io </button>
</p>

# Overview

Audit logs are captured every time a member changes a feature flag, segment, or metric. These logs provide detailed records of every change that took place and who made them. Here are the changes we track:  

| **Feature flags** | **Segments** | **Metrics** |
| --- | --- | --- |
| Adding tags | Adding tags | Adding tags |
| Removing tags | Removing tags | Removing tags |
| Adding owners | Adding owners | Adding owners |
| Removing owners | Removing owners | Removing owners |
| Creating targeting rules | Adding members | Creating a metric |
| Updating targeting rules | Removing members | Updating a metric definition |
| Killing a feature flag | | Creating an alert policy |
| Reallocating a feature flag | | Updating an alert policy |
| | | Removing an alert policy |

# Titles and comments in changes
When you click review changes after making a change to a feature flag, segment, or metric, a panel displays offering a diff view of the changed elements. You can enter a title and comments for the change made to make it easier for teammates to understand why the change was made. If you want to make titles and comments required for all changes in a project, refer to the [Projects](https://help.split.io/hc/en-us/articles/360023534451-Projects#editing-a-project) guide for more information.

<p>
    <img src="https://help.split.io/hc/article_attachments/15614601902733" alt="Screen_Shot_2023-05-09_at_8.41.21_AM.png" />
</p>

# Viewing audit logs

To find audit log entries, click the **Audit logs** tab when viewing a feature flag, segment, or metric. 

**Note: To see aggregated audit logs for feature flags in an environment, refer to the [Environment-level audit logs](https://help.split.io/hc/en-us/articles/13084776229773-Environment-level-audit-logs) guide.**

<p>
  <img src="https://help.split.io/hc/article_attachments/15614799260813" alt="Screen_Shot_2023-05-09_at_8.49.20_AM.png" />
</p>

When you hover over the row for an audit log, click the comment for that change to see more information about each update, including a diff view of what elements of the targeting rules were edited.

<p>
  <img src="https://help.split.io/hc/article_attachments/15614887547021" alt="Screen_Shot_2023-05-09_at_8.52.15_AM.png" />
</p>

You can monitor this data using the user interface to audit every modification made to feature flags over time or to troubleshoot any issues that occur during rollout. You can pull out this data using third-party integrations or the [outgoing webhook](https://help.split.io/hc/en-us/articles/360020957991-Outgoing-webhook-audit-log) for analysis within other tools.
