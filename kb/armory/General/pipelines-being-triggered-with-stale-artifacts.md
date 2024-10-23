---
title: Pipelines being triggered with Stale Artifacts
---

## Issue
After a Spinnaker upgrade, one or more pipelines is triggered with old/stale artifacts. This can be caught by the build number moving back on the affected pipelines from a bigger to a smaller value (eg. from build # 100 to 20). This behaviour has been observed on pipelines with an ECR and Jenkins trigger. 

## Cause
While the cause has not yet been confirmed, the culprit is suspected to lie with leftover stale data in Orca's queue, left in there prior to the upgrade.

