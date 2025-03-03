---
title: Traffic type
sidebar_label: Traffic type
helpdocs_is_private: false
helpdocs_is_published: true
description: "A way of categorizing keys"
---

When you create a feature flag, metric, or segment, you must specify a traffic type. Traffic types are a way of categorizing your [keys](/docs/feature-management-experimentation/10-getting-started/docs/key-concepts/keys/keys.md).

The traffic types you choose will determine the granularity of your feature flag targeting rules and metric results.

For example, if your users share accounts, and you want to provide an identical user experience (the same feature variation for each evaluated flag) to all users within an account, then you could set your traffic type to be 'account'. (Your users will share [MTKs](/docs/feature-management-experimentation/10-getting-started/docs/key-concepts/keys/mtks.md) and this will reduce your costs, but your targeting will be less granular and your metric results will not differentiate between individual end users).

Most customers choose to use the **'user'** traffic type. This would allow you to see the precise percentage of users impacted by a feature variation.

:::tip
You can use [segments](/docs/feature-management-experimentation/10-getting-started/docs/key-concepts/segments.md) to group keys. Segments can be used in feature flag targeting rules.
:::

Traffic types should define your **most granular level** of feature flag targeting decisions. (Note that you can also set feature flag targeting rules based on [attributes](/docs/feature-management-experimentation/10-getting-started/docs/key-concepts/attributes.md).) Take a moment and carefully consider your traffic type choices. Our customer success advisors are on hand to help validate your plan.

:::warning
Your choice of traffic types determines the feature flags that you can use together. This is because you must assign one traffic type to each feature flag.

**When a SDK factory client is instantiated, the SDK will download the definitions for all the feature flags that share the same traffic type.** (The SDK will also periodically synchronize the definitions, incurring network traffic and, for some SDKs, running up to four background threads.) If you want to use another traffic type in the same app, you will need to instantiate another factory client, incurring the same overhead. We strongly encourage keeping the number of SDK factory clients down to **one** or **two**.
:::

<div style={{ display: props.developer=='hidden' ? "none" : "block" }}>

:::note[Note for developers]
If you are using an SDK and you are unsure what traffic type you are using, then you are most likely using the **'user'** traffic type. This is the default traffic type when none is specified. Depending on the type of SDK, you can pass a traffic type when initializing the SplitFactory instance (client-side SDKs), calling the `getTreatment` method (server-side SDKs), or calling the `track` method (most client-side and server-side SDKs).
:::

</div>