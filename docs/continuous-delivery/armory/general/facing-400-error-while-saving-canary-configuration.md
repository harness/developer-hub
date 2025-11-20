---
title: Facing 400 Error while Saving Canary Configuration
---

## Issue
After enabling the **Kayenta** service in Armory, users face an issue where if adding a Canary config, it cannot be saved, as the following error message appears:
```The was an error saving your config: 400```
As seen in the following screenshot:


## Cause
Currently, Armory Spinnaker supports Canary service integration including **AWS, Google, New Relic, Prometheus, Datadog, and SignalFX**. Before using the Canary analysis service in Armory, at least *one metrics service must be configured, along with at least one storage service*. The most common setup is to have one metrics service configured and one storage service (e.g. S3, GCS, etc) configured. 

