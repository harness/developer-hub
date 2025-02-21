---
title: Key
sidebar_label: Key
helpdocs_is_private: false
helpdocs_is_published: true
description: Identify your application end user (or customer)
slug: ../keys
---

A key identifies your application end user (or customer). This is the user that sees your app's feature flag variations.

:::note
**Keys** are also called **traffic keys** and **user keys**. When they are counted over a month, keys are called [MTKs](/docs/feature-management-experimentation/10-getting-started/docs/key-concepts/keys/mtks.md) (Monthly Tracked Keys).
:::

SDKs evaluate feature flags for a given key at runtime. An SDK will call the `getTreatment` method to retrieve a feature flag treatment for a given key. The treatment (flag variation) returned by the `getTreatment` call depends on the feature flag's targeting rules.

:::tip[Tip: Think outside the box for keys]
You can target customers or users based on their key. When evaluating a feature flag, you can use any string as a key.

Common keys include:
* known user ID
* anonymous user (usually a persistent cookie)
* account ID
* device ID
* session ID
* job ID
* transaction ID
* or any other custom identifiers that you define

For context, most customers will use an ID for known or logged-in users and a cookie for anonymous.  But as you can see, the key can represent any level of granularity.

Be mindful of using random keys, as [overuse of random IDs](https://help.split.io/hc/en-us/articles/26978089134349-MTK-Usage-and-Comparing-Counts#use-of-unstable-ids) can increase your MTK count (and [costs](https://help.split.io/hc/en-us/articles/360034159232-Account-usage-data)) unnecessarily.
:::

For a deep dive into keys, go to [Ensure a consistent user experience](https://help.split.io/hc/en-us/articles/360030024391-How-does-Split-ensure-a-consistent-user-experience).