---
title: OPA FAQs
description: Frequently asked questions about Harness OPA Policies.
sidebar_position: 1000
---

This article addresses some frequently asked questions about Harness OPA Policies.


### Why isn't the full OPA policy evaluation message displayed in the console?

The full OPA policy evaluation message is not displayed in the console because the Policy step is not available for all stage types.  An enhancement request has been filed to improve this.

### What does the Policy Evaluation tab in the pipeline display?

The Policy Evaluation tab is designed to display On_Run events and policy sets.
Policies evaluated during On_Step or on-save events are not shown in the Policy Evaluation tab. Instead, the outputs for such events are logged at the step level and can be viewed in the console logs.

### Can OPA policies be applied to filters?
No, applying OPA policies on filters is not supported. During stage and pipeline evaluations, filters are ignored when OPA policies are applied.

### Can OPA policies be used to enforce artifact selection in a pipeline?
OPA policies can enforce conditions on artifact selection, but they do not override manually provided artifacts. Ensure that policies align with the expected artifact sources.
