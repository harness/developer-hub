---
title: Using `Find Artifacts From Resource (Manifest)` overwrites rendered artifacts
---

## Issue
This occurs when there is a pipeline that uses ```Find Artifacts From Resource (Manifest)``` to find details of the currently running deployment.However, when using the ```Find Artifacts From Resource (Manifest)``` stage, it overrides any pod images with the one that is currently in production.
Example issue: [https://github.com/spinnaker/spinnaker/issues/6506](https://github.com/spinnaker/spinnaker/issues/6506)

## Cause
There was no specification available to opt-out of this artifact binding. Without this, it will always bind the artifact by ```default```.

