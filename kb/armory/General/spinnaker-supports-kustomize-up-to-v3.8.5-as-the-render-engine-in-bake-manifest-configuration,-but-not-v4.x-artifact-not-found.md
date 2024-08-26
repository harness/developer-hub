---
title: Spinnaker supports KUSTOMIZE up to v3.8.5 as the Render Engine in Bake (Manifest) Configuration, but not v4.x (Artifact not found)
---

## Issue
When using ```Kustomize``` as the declared Render Engine, user may get exceptions as seen below:

```Exception ( Monitor Deploy ) The following required artifacts could not be bound: '[ArtifactKey(type=docker/image, name=250312325083.dkr.ecr.us-east-1.amazonaws.com/hive-won-airings, version=0.1.5, location=null, reference=250312325083.dkr.ecr.us-east-1.amazonaws.com/hive-won-airings:0.1.5)]'. Check that the Docker image name above matches the name used in the image field of your manifest. Failing the stage as this is likely a configuration error.```


## Cause
The latest versions of ```Kustomize```, for example, v4.5.5, etc., are not supported within in the cluster due to the mismatch with the API version declared.  

