---
title: Feature Flags (FF) FAQs
description: This article addresses some frequently asked questions about Harness Feature Flags (FF).
# sidebar_position: 2
helpdocs_topic_id: 
helpdocs_category_id: 
helpdocs_is_private: false
helpdocs_is_published: true
---

# FAQ


### Below are some potential issues and fixes for Feature Flags

#### Flag creation keeps failing

When creating a feature flag it could be that the identifier has a character that's not permitted.  The regex used for flag identifiers is:

```
^[a-zA-Z0-9_][a-zA-Z0-9._$-]*$
```
