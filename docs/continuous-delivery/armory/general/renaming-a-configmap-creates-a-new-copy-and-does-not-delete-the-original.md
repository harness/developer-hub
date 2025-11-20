---
title: Renaming a ConfigMap creates a new copy and does not delete the original
---

## Issue
When a ConfigMap is modified or renamed, a new copy is created. The ConfigMap with the original name is not impacted or deleted.

## Cause
Retaining previous versions of resources like ConfigMaps is the intended behavior.
According to Spinnaker's default Resource Management Policy - if a resource is versioned, it is **always** deployed with a new sequence number, in the format of ```vNNN```, unless no change has been made to it. This is the default behavior for resources like ConfigMaps and ReplicaSets, which don't have their own built-in update policies.

