---
title: Killing Processes where Parent pipeline triggered a large/infinite loop via webhook, keeps triggering child pipelines
---

## Issue
Administrators may encounter a scenario where a parent pipeline was triggered via Webhook, and as a result, multiple/many/infinite child pipelines are triggered, overloading the Spinnaker instance.  
In this scenario, Orca has SQL as a data store.

## Cause
Triggering the webhook can happen accidentally and can possibly occur multiple times.  As a result, administrators may need a way to programmatically stop hundreds of stuck child pipelines.

