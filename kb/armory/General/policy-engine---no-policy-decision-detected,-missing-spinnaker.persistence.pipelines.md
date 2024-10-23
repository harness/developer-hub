---
title: Policy Engine - No Policy Decision Detected, missing spinnaker.persistence.pipelines
---

## Issue
Even though it may appear that your declarations are correct, Policy Engine can possibly return the below error when initializing. 
```There was an error saving your pipeline: Policy Error: No policy decision detected. This is likely because a missing spinnaker.persistence.pipelines.before package.. [dismiss]```

## Cause
Setting Policy Engine to ```failOpen: false``` can cause the issue if no policies are declared.When Spinnaker sends a specific payload via Policy Engine to OPA to be validated by a policy and the policy doesn't exist, it will return the error message.  By default, with this setting Front50 will ```fail close```.

