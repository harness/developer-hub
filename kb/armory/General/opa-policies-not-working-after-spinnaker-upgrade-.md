---
title: OPA Policies not working after Spinnaker Upgrade 
---

## Issue
An organization may have issues after upgrading Spinnaker where Pipelines with OPA policies attached will fail to deploy.
Below is an example of the sequence of events:
* An organization creates a policy and attaches it to a pipeline.Example - ```"Every pipeline must have a XXXXXX component UUID".```* The organization tries to modify this pipeline, but an error arises even if the change is valid on a previous version of Spinnaker.Example - Successful tests in 2.26.x may not succeed in 2.27.x* After hitting the Save Changes button, Spinnaker shows a banner with:```"There was an error saving your pipeline: policy Every pipeline must have a XXXXXX component UUID.". Please refer to the attached file XXXXXX.rego to see the policy definition.```
An organization may also see Gate logs containing an error message with:
```com.netflix.spinnaker.gate.controllers.PipelineController$PipelineException.```

## Cause
This error is caused by changes to the RegoScript data structure within OPA.
For example, within Spinnaker 2.26.x, the ```input.pipeline.expectedArtifacts``` hierarchy was updated to exist under: ```input.pipeline.any.expectedArtifacts```
As a result, existing RegoScripts would need to be updated. Depending on the policies defined, customers may need to account for these changes with version upgrades.  

