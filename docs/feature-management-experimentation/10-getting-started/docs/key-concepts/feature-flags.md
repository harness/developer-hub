---
title: Feature flags
sidebar_label: Feature flags
helpdocs_is_private: false
helpdocs_is_published: true
---

Feature flags are a software development tool that allow you to enable or disable a feature without modifying the source code or performing a new deployment.

Feature flags are used in conditional statements (e.g., if-then-else) to determine which code path will be executed. Their power lies in the ability to determine at runtime which functionality is executed and to make these decisions at the user or request level, not just globally.

:::tip
With feature flags, you can deploy new features “turned off” so they are not initially visible to users or executed by back-end processes.  When ready, you can selectively turn these features on for specific subsets of users and environments.
:::

FME feature flags are created in Harness UI and evaluated at runtime using FME SDKs.

:::note
Other names for feature flags include **feature toggles**, **release toggles**, **feature flippers**, and **remote configurations**. 
:::