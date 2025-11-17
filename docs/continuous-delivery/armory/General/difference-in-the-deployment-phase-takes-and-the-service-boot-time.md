---
title: Difference in the deployment phase takes and the service boot time
---

## Issue
Users may notice that the ***deployment phase*** of a pipeline takes a long time, in comparison with ***service boot time***.
For example, the deployment phase may take around 15 minutes, but the service boot time is significantly lower (e.g. less than 1 minute).
The following screen shows an example:

This may impact the environment as the user would need to wait until the entire pipeline completes before a rollback can be executed. 

## Cause
This issue can be due to cache and cleanup not being configured.

