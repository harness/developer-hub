---
title: Attribute
sidebar_label: Attribute
helpdocs_is_private: false
helpdocs_is_published: true
description: "Property associated with a traffic key"
User_attribute: Attribute
user_attribute: attribute
---

An attribute (also called traffic type attribute) is a property associated with a [key](/docs/feature-management-experimentation/10-getting-started/docs/key-concepts/keys/keys.md), like 'membership level' or 'signup date'.

:::note
**Attributes** are also called **identify attributes** and **traffic type attributes** (because they can be defined for all keys of a given traffic type).
:::

 You can [define custom {props.user_attribute ?? frontMatter.user_attribute}s](https://help.split.io/hc/en-us/articles/360020793231-Target-with-custom-attributes#creating-custom-attributes) in Split Admin settings, using the Split API attributes endpoint, or in feature flag targeting rules.

{props.User_attribute ?? frontMatter.User_attribute}s can be [used in feature flag targeting rules](https://help.split.io/hc/en-us/articles/360020793231-Target-with-custom-attributes#using-custom-attributes-in-feature-flag-targeting) to selectively rollout features to a specific audience.

:::info[Values remain private]
{props.User_attribute ?? frontMatter.User_attribute} values are never sent over the network to Harness and are never stored by FME SDKs.

What FME SDKs do download and cache is the [FME definitions (including feature flag targeting rules)](./fme-object-architecture-diagram.md). You can define targeting rules that target based on attribute values (for example, 'OS version >= 14'), and an [impression](./impressions.md) will show the targeting rule that evaluated to true, but the actual value (for example, 14 or 15) will not be stored or sent over the network.
:::