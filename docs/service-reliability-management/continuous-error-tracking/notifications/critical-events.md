---
title: Critical events
description: Learn how to add a condition for marking an event as critical.
sidebar_position: 30
---

You can add a condition that specifies when an event should be marked as critical. When an event occurs and matches the condition that you set, it will be flagged as **CRITICAL** in the Events page.


## Add a condition for marking an event as critical

To add a condition:

1. In your Harness project, navigate to **Service Reliability Management**, expand **PROJECT SETUP**, and then select **Code Error Settings**.

2. In the top right corner of the Project Code Error Settings page, select **Critical Events** and then **+ Add Condition**.

3. Enter an **event type**, **entry point**, and **optional location**.

- You can choose multiple events.
  
- If you select caught exception, uncaught exception, or swallowed exception as event type, then you must also select an **exception type**.

4. Select ✔️ (the check mark) to save the condition.

When an event occurs that meets the condition you specified, it is labeled **CRITICAL** on the Events page.
