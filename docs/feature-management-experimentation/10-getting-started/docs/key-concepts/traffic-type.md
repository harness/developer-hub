---
title: Traffic Type
sidebar_label: Traffic Type
helpdocs_is_private: false
helpdocs_is_published: true
---

Targeting decisions are made on a per-user or per unique key basis, but what are the available types of unique keys you intend to target? These are your traffic types, and you can define up to ten unique key types at the project level.

For feature flags that make decisions or observe metrics at the userId level, the traffic type should be `user`. If decisions and observations are based on account membership (to facilitate all users for a particular customer being treated the same, for instance), the traffic type should be `account`. Other common types are `anonymous` and `device`, but you have total flexibility in employing different traffic types.

Go to [Traffic type](https://help.split.io/hc/en-us/articles/360019916311-Traffic-type) for more information.
