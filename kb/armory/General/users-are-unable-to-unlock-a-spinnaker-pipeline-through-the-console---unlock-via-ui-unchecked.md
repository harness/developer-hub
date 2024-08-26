---
title: Users are Unable to Unlock a Spinnaker Pipeline through the Console - Unlock via UI unchecked
---

## Issue
Customers may find that the options to unlock a stage may no longer be visible in the UI after locking a stage.  This issue may be because when locking a pipeline, a user chose to uncheck the ```Unlock via UI``` option

 

## Cause
As outlined, the only way to now unlock the pipeline is via the Spinnaker API.  Customers will then need to send a command via the API to Spinnaker to unlock the pipeline.

