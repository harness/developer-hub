---
title: Error displayed on the UI- Exception (Resolve Target Manifest)
---

## Issue
In deployments and replicasets utilizing the delete and scale manifest stages, when the oldest or the newest version is attempted to be deleted, the following error is observed:
Exception (Resolve Target Manifest)
No manifests matching (account: spinnaker, location: default, kind: deployment, app testartifactrepo, cluster: deployment frontend, criteria: oldest) found
The UI shows the following:



## Cause
The error observed is due to bug affecting all dynamic actions with Kubernetes objects. This is related to strategy selected during deployment, and the value set for ```max versions to keep```. If the chosen strategy disables old replicas when the new one is ready, then it is not required that the replicas be manually disabled or deleted.
``````

