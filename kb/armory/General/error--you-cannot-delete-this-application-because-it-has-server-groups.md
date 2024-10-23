---
title: Error- You cannot delete this application because it has server groups
---

## Issue
When attempting to delete an application using the Spinnaker Console UI, the following error is returned:
```Delete Application - You cannot delete this application because it has server groups```
The UI shows the following:

After a while, either the screen logs out or the following error is seen:

## Cause
This error is seen because there are Server Groups associated with the application, and they need to be removed.

