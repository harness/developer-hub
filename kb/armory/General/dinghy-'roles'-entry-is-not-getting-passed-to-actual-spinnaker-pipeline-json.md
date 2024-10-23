---
title: Dinghy 'roles' entry is not getting passed to actual Spinnaker Pipeline JSON
---

## Issue
An organization may find that that ```roles``` entry in a Dinghy file will not get injected to the Pipeline JSON which is a requirement for triggering Pipelines with permissions.
This can cause blockages, delays, and database errors from so many failed pipelines.

## Cause
This is a known bug with Dinghy, and how it parses app metadata and reads longer logs. This bug will prevent the roles entry from being read correctly which then leads to permissions failures. 
This bug affects all Dinghy versions

