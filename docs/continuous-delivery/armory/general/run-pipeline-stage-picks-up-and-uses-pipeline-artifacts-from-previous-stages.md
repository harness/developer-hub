---
title: Run Pipeline Stage picks up and uses Pipeline Artifacts from previous stages
---

## Issue
When Deploying a Pipeline that consists of multiple ```run pipeline``` stages, the artifacts from the initial stage are saved in a cache and can be used in subsequent stages.
However, this may not be the ideal behavior for some pipelines, especially for Canary processes.  
As an example and test of how this can be an issue,
* Run a canary analysis pipeline with Canary Enabled first. * If the execution is successful, it may be necessary to run the same Canary Analysis pipeline with the Canary disabled around 5-10 times to deploy it to 5-10 different K8s clusters.* The runs after the initial execution will use the Canary Artifacts produced in the initial stage into the subsequent stages, possibly leading to a conflict.

## Cause
The default behavior is to pass artifacts downstream to other pipelines running from the parent pipeline. 
There is no explicit method to turn this setting off via the Spinnaker Console UI.  However, users can define a value to adjust this behavior and prevent the artifacts from passing into subsequent pipelines.

