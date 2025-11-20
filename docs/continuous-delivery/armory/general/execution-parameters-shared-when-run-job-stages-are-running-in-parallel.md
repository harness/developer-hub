---
title: Execution parameters shared when Run Job stages are running in parallel
---

## Issue
When two separate Run Job stages are executing simultaneously with identical names in the ```metadata.name``` field, job execution parameters are shared between both pipelines.
This may result in pipeline failure, however they may not fail if the Job configuration is still valid. In this case, the issue can still cause a number of incidents, including:
* Deploying to incorrect location* Notifications sent to the wrong contact* Incorrect parameters being passed onto an external tool

## Cause
Armory 2.22 introduces a breaking change where Spinnaker no longer automatically appends a unique suffix to the name of jobs created by the Kubernetes Run Job stage. More info: [Release Notes for Armory Enterprise v2.22.2](https://docs.armory.io/docs/release-notes/rn-armory-spinnaker/armoryspinnaker_v2-22-2/#suffix-no-longer-added-to-jobs-created-by-kubernetes-run-job-stage)
In practice, this means that the Kubernetes provider assumes both configurations are referring to the same Job, since they are both running under the same ```metadata.name```. When the parallel execution is triggered, the Kubernetes provider tries to modify the existing Job instead of creating a new one.

