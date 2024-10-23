---
title: Load Balancer Service svc-spinnaker-demo Does Not Exist
---

## Issue
Deployments fail with the error when baking the manifest and deploy to prod. 
```Load balancer service svc-spinnaker-demo does not exist```
or something very similar. This only happens when using a HELM chart, and if you copy the HELM chart into plain text to deploy it works.

## Cause
While using a HELM chart as well as Red/Black or Highlander Deployment strategy, Kubernetes has a bug where it will not see your manifest properly and thus error out. This is a known issue.
[https://github.com/spinnaker/spinnaker/issues/5040#issuecomment-663736648](https://github.com/spinnaker/spinnaker/issues/5040#issuecomment-663736648)

