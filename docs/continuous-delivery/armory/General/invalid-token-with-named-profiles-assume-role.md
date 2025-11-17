---
title: Invalid Token with Named Profiles Assume Role
---

## Issue
When using Terraformer Named Profiles with AWS and assuming a role, an error is returned when running a pipeline.An example of the error is:
```Error: error using credentials to get account ID: error calling sts:GetCallerIdentity: InvalidClientTokenId: The security token included in the request is invalid. status code: 403, request id:```

## Cause
When trying to set up AWS credentials to assume a role in a named profile, a session key is required.  If the session key is not added to the configuration, it will cause the pipeline to fail.

