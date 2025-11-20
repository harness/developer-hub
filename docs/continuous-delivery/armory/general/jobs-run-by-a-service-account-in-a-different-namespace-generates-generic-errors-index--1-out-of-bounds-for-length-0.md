---
title: Jobs run by a service account in a different namespace generates generic errors (Index -1 out of bounds for length 0)
---

## Issue
Armory has found that when a job is configured to run as a specific service account, and it can't locate that service account within the same namespace context of the job, it will throw an exception in the Run Job Config tab:

```
Exception
Index -1 out of bounds for length 0
waitOnJobCompletion:
Internal Server Error
Index -1 out of bounds for length 0
```

The error is generic and doesn't provide much context. 
 
However, the error message in the Deploy Status tab is more indicative of the root cause:  
```Error creating: pods "test-job-name" is forbidden: error looking up service account namespace1/fake-sa: serviceaccount "fake-sa" not found```
 
Please note that the error message in the Deploy Status tab is based on ephemeral data, and administrators may get the following message if it's been longer than Kubernetes has been configured to store events:
```No recent events found - Kubernetes does not store events for long.```

## Cause
Armory cannot find the service account specified in the job manifest because it doesn't exist, is misspelled, or is in a different namespace from the job itself.  

