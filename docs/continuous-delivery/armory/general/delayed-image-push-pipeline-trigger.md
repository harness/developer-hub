---
title: Delayed Image Push Pipeline Trigger
---

## Issue
When pushing an image to a repository (Artifactory, Docker, etc,) to trigger a pipeline, the pipeline doesn't start until some time later.

## Cause
There are too many images in the registry that Spinnaker is not able to cache.Essentially what happens is Spinnaker will need to take time to cache all of the images before determining if a particular image was pushed for the pipeline to trigger.

