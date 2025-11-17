---
title: ReplicaSet Versioning is erratic, sometimes will work, sometimes will not
---

## Issue
When trying to use ReplicaSet Versioning in order to maintain a solid backup system, an organization may run into a known issue where versioning will perform erratically and either not update the version at all or even revert the versioning number. Examplev000 > v001 > v002 > v003 > v002 > v003
Additionally, previous versions can be deleted after some time, which removes the value of having a backup.

## Cause
For some of these issues, this is a cache invalidation issue which can arise in any Spinnaker or Armory version prior to 2.23.

The difference between older versions of Spinnnaker is that live manifest calls only searches for the live manifest of what’s it is currently deploying (i.e. ```replicaset $APPLICATION```), while ```2.23.x``` does query all the related artifacts before evaluating runtime labels (e.g. the previous versions currently deployed to get newer version).

This can be observed in the ```orca``` logs when deploying applications, but as of version ```2.23.x, ```live manifests calls happen in ```clouddriver```.

This issue can be exacerbated if an organization uses a stage called ```Delete ReplicaSets``` which is done via a ```custom runJobManifest``` instead of the Spinnaker-managed ```Delete (Manifest)``` stage,

These are most likely the reasons the Spinnaker cache becomes invalid and makes versioning run incorrectly on the next pipeline call. This can be erratic, especially if wait stages are used.  If the caching agent happens to get a chance to refresh the cache before the next stage, these problems will not occur. 


