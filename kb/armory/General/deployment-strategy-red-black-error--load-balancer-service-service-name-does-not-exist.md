---
title: Deployment Strategy Red/Black error- Load balancer service <service-name> does not exist
---

## Issue
With the Deploy Strategy set to ***Red/Black***, and when deploying to Kubernetes using ***Kustomize***, the bake stage is successful and the service section is visible in the baked manifest.  However the pipeline fails with the following error:
``` Load balancer service  does not exist```
The UI shows the following, for example:


## Cause
This issue is related to the following Github issues:[https://github.com/spinnaker/spinnaker/issues/5040](https://github.com/spinnaker/spinnaker/issues/5040)[https://github.com/spinnaker/clouddriver/pull/5248](https://github.com/spinnaker/clouddriver/pull/5248)
As reported, Kubernetes has a bug where it will not see the manifest properly and will therefore error out. When utilizing the ```Deploy (Manifest)``` stage with ***Red/Black rollout strategy***, a requirement of using this stage was for a ```Service``` to exist before running the stage in order to read its ```selector``` and apply it to the newly deployed replicaset.  This requirement has been updated, so that now the ```Service``` will first be read from the stage manifest list, and if not found it will proceed with the same behaviour as before, reading it live from the cluster. 

