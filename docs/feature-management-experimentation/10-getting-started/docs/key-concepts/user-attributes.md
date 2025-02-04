---
title: User attributes
sidebar_label: User attributes
helpdocs_is_private: false
helpdocs_is_published: true
description: "Properties associated with user IDs"
---

A user attribute (also called traffic type attribute) is a property associated with a [user key (user ID)](./user-ids.md), like 'membership level' or 'signup date'.

:::note
User attributes are also called **identify attributes** and **traffic type attributes** (because they can be defined for all user IDs in a given traffic type).

User attributes are also called **custom attributes** (because they are not pre-defined). You can define them in Admin settings, using the Split API [attributes](https://docs.split.io/reference/attributes-overview) endpoint, or in feature flag targeting rules.
:::

User attributes can be [used in feature flag targeting rules](/docs/feature-management-experimentation/40-feature-management/docs/target-with-flags/targeting-rules/target-with-user-attributes/target-with-user-attributes.md).

:::info[Attribute values remain private]
User attribute values are never sent over the network to Harness and are never stored by FME SDKs.

What FME SDKs do download and cache is the [FME payload (including feature flag targeting rules)](./fme-architecture-diagram.md). You can define targeting rules that target based on attribute values (for example, 'OS version >= 14'), and an [impression](./impressions.md) will show the targeting rule that evaluated to true, but the actual value (for example, 14 or 15) will not be stored or sent over the network.
:::