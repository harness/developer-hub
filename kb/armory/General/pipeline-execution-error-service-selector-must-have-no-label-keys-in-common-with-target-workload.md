---
title: Pipeline Execution Error "Service selector must have no label keys in common with target workload"
---

## Issue
After migrating Spinnaker to ```2.24.x+``` from a previous version, and upon utilizing the migrated pipelines from the previous version, the following error is observed at the Deploy stage:
```"Service selector must have no label keys in common with target workload"```
The UI shows the following:

## Cause
This is resulting from the following caveat ([https://spinnaker.io/docs/guides/user/kubernetes-v2/traffic-management/#caveats](https://spinnaker.io/docs/guides/user/kubernetes-v2/traffic-management/#caveats)) and an issue impacting prior versions of Spinnaker ([https://github.com/spinnaker/clouddriver/pull/4504](https://github.com/spinnaker/clouddriver/pull/4504)).

