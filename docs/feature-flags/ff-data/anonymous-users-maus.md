---
title: Track anonymous users and monthly active users
description: This topic defines anonymous users, how their data is handled in Harness Feature Flags, and how they relate to the Monthly Active Users (MAUs) count.
sidebar_position: 30
helpdocs_topic_id: 1ne3nozg3d
helpdocs_category_id: axthyiihah
helpdocs_is_private: false
helpdocs_is_published: true
---

This topic defines anonymous users, how their data is handled in Harness Feature Flags, and how they relate to the Monthly Active Users (MAUs) count.

:::info note
 Monthly Active Users (MAUs) are only applicable to client-side applications (JavaScript, iOS, Android, React, etc.).
:::

## How do anonymous users contribute to MAUs?

MAUs are defined as unique end users evaluating flags from client-side SDKs (JavaScript, iOS, Android, React, etc.) over a 30-day period. If a user evaluates flags across multiple devices and sessions in a 30-day period, we count this as 1 MAU.

* Anonymous users are assigned a session ID, ensuring that multiple visits only account for one MAU. All anonymous users are assigned a shared user identifier by the SDKs, preventing them from directly inflating the monthly MAUs. Essentially, you'd create a single target that applies to all of your anonymous traffic, and the anonymous traffic would be counted as one MAU. However, you also have the option of having the SDK assign a unique identifier so that you can track anonymous users individually.
* You can also set up the SDK to connect the two user sessions (anonymous and unique) and treat them as one single evaluation across multiple sessions and platforms. This will allow you to connect a unique user and their anonymous user session.

