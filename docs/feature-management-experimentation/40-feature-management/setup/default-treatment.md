---
title: Set the default treatment
sidebar_label: Set the default treatment
description: "Learn about the default treatment in Harness FME."
sidebar_position: 14
redirect_from:
  - /docs/feature-management-experimentation/feature-management/faqs/what-is-the-difference-between-default-rule-and-default-treatment
  - /docs/feature-management-experimentation/feature-management/default-treatment
---

## Overview

The default treatment is returned by the SDK in the following scenarios:

* **The end user does not meet any defined conditions:** The default treatment is shown to end users who do not meet any of the conditions in the targeting rules.

* **The flag is killed:** If a particular feature flag is killed, the default treatment overrides the existing targeting rules and is returned for **all** customers.

:::tip
You can set any of the treatments in your targeting rules as the default. Harness recommends choosing the safest treatment for your customers as the default treatment (that is, _off_, _old version_) when beginning the rollout. However, when you complete the rollout, you may want to make the new experience the default in the case that feature is accidentally killed before being removed.
:::

## How default treatments differ from default rule

It’s important to understand the difference between the default treatment and the default rule, especially when using traffic allocation:

* When you call the SDK’s `getTreatment`, it is called for 100% of users who encounter the feature flag. Every user will receive some treatment, whether on, off, or something else.
* Traffic Allocation limits the percentage of users who are subject to targeting rules and the default rule. For example, if you set traffic allocation to 10%, then only 10% of users are evaluated against your rules. The remaining 90% will receive the default treatment.
* For scenarios with multiple treatments, such as `version1`, `version2`, and `unallocated` (which means no feature exposure), you might:
  
  * Set Traffic Allocation to 10%, exposing 10% of users to targeting rules.
  * Configure the Default Rule to split that 10% between `version1` and `version2`.
  * Set the Default Treatment to `unallocated`, which 90% of users will get.

* Traffic Allocation helps control user exposure during rollouts and experiments, allowing gradual inclusion without impacting users outside the allocated percentage.
* In simple two-treatment cases, traffic allocation and default treatment can sometimes produce equivalent outcomes.