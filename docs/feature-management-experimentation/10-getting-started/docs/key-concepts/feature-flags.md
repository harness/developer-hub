---
title: Feature flag
sidebar_label: Feature flag
helpdocs_is_private: false
helpdocs_is_published: true
description: "Allows you to enable or disable a feature without deploying source code"
---

A feature flag is a software development tool that allows you to enable or disable a feature without modifying the source code or performing a new deployment.

Feature flags are used in conditional statements (e.g., if-then-else) to determine which code path will be executed. Their power lies in the ability to determine at runtime which functionality is executed and to make these decisions at the user or request level, not just globally.

:::tip
With feature flags, you can deploy new features “turned off” so they are not initially visible to users or executed by back-end processes.  When ready, you can selectively turn these features on for specific subsets of users and environments.
:::

FME feature flags are created in Harness UI and evaluated at runtime using FME SDKs.

:::note
You may also hear **feature flags** commonly referred to as **feature toggles**, **release toggles**, **feature flippers**, and **remote configurations**. 
:::