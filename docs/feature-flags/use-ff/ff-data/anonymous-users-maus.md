---
title: Track anonymous users and monthly active users
description: This topic defines anonymous users, how their data is handled in Harness Feature Flags, and how they relate to the Monthly Active Users (MAUs) count.
sidebar_position: 30
helpdocs_topic_id: 1ne3nozg3d
helpdocs_category_id: axthyiihah
helpdocs_is_private: false
helpdocs_is_published: true
redirect_from:
  - /docs/feature-flags/ff-data/anonymous-users-maus
---

This topic defines anonymous users, how their data is handled in Harness Feature Flags, and how they relate to the Monthly Active Users (MAUs) count.

:::info note
 Monthly Active Users (MAUs) are only applicable to client-side applications (JavaScript, iOS, Android, React, etc.).
:::

## How do anonymous users contribute to MAUs?

MAUs are defined as unique end users evaluating flags from client-side SDKs (JavaScript, iOS, Android, React, etc.) over a 30-day period. If a user evaluates flags across multiple devices and sessions in a 30-day period, we count this as 1 MAU.

* Anonymous users can be assigned a target ID as any other target would, ensuring that multiple visits only account for one MAU. Essentially, you'd create a single target that applies to all of your anonymous traffic, and the anonymous traffic would be counted as one MAU.
