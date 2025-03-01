---
title: Monthly Tracked Keys (MTKs)
sidebar_label: Monthly Tracked Keys
helpdocs_is_private: false
helpdocs_is_published: true
description: "The number of unique user IDs counted to your account per month"
---

A [key](/docs/feature-management-experimentation/10-getting-started/docs/key-concepts/keys/keys.md) is an identifier used for a feature flag evaluation. Harness FME counts the number of unique keys you evaluate in a month. This number is called **Monthly Tracked Keys (MTKs)**.

:::info
MTKs are the units used to measure your FME usage (and costs).  Go to [Account Usage Data](https://help.split.io/hc/en-us/articles/360034159232-Account-usage-data#usage-data) for more information.
:::

#### How are MTKs calculated?

A key can (and should) be used in many feature flag evaluations. The number of flag evaluations (the number of times one flag is evaluated and the number of flags evaluated) does not affect your MTK count.

For example, if a user with the key “John” sees three different feature flags within a month, "John" would be counted as a single MTK. If “John” sees the same feature flag 100 times within a month, "John" would still be counted as a single MTK. If the anonymous ID “ABC-123” is created for John and stored in a cookie, and that key is evaluated with FME, then that is an additional MTK because it is a different key value. If "ABC-123" continues to have impressions, that is still just one additional MTK, for a total of two. Now if John clears his cookies, or visits as an anonymous user from a different device, then that would be an additional key used by the SDK, and as a result, an additional (third) MTK.