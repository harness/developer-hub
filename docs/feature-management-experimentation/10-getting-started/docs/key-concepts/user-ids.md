---
title: User IDs
sidebar_label: User IDs
helpdocs_is_private: false
helpdocs_is_published: true
description: Identify your application end user (or customer)
---

A user ID represents your application end user (or customer). This is the user that sees your app's feature flag variations.

:::info
User IDs are also called **keys** and **user keys**. When they are counted over a month, user IDs are called [MTKs](./mtks.md) (Monthly Tracked Keys).
:::

SDKs evaluate feature flags for a given user ID at runtime. An SDK will call the `getTreatment` method to retrieve a feature flag treatment for a given user ID. The treatment (flag variation) returned by the `getTreatment` call depends on the feature flag's targeting rules. Go to How does FME ensure a consistent user experience? for more information.

:::tip[Tip: Think outside the box for User IDs]
You can target customers or users based on their user ID (user key). When evaluating a feature flag, you can use any string as a user ID.

Here are a few examples:
- anonymous user ID
- logged in user ID
- account number
- device ID

Be mindful of using random user IDs, as [overuse of random IDs](https://help.split.io/hc/en-us/articles/26978089134349-MTK-Usage-and-Comparing-Counts#use-of-unstable-ids) can increase your MTK count (and [costs](https://help.split.io/hc/en-us/articles/360034159232-Account-usage-data)) unnecessarily.
:::

For a deep dive into user IDs, go to [Ensure a consistent user experience](/docs/feature-management-experimentation/40-feature-management/docs/target-with-flags/targeting-rules/percentage-rollouts/ensure-a-consistent-user-experience.md).