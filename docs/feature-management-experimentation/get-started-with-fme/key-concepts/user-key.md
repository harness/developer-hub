---
title: User key
description: A user key that is associated with feature flag treatments (variations)
sidebar_label: ★★ User key
sidebar_position: 15
helpdocs_topic_id: 1j7pdkqh7j
helpdocs_category_id: gjyyhm9f9h
helpdocs_is_private: false
helpdocs_is_published: true
---
import Link from '@docusaurus/Link'

When you evaluate a feature flag in source code, you can pass in any string as a user key. The Split FME ensures the user has a consistent experience, by consistently serving the same feature flag treatments (variations) to a given user key. 

The treatments attributed to a user key does not constitute personally identifyable information (PII) because Harness FME assigns treatments using feature flag targeting rules and percentage distributions are randomly assigned. Harness FME automatically collects no PII.

:::info info
When you pass in a user key in your code, the FME client associates the user key with a <Link to="traffic-type">traffic type</Link>.
:::

:::info tip
You can view the user key associations in Harness by navigating to `/user/your-user-key/`
:::