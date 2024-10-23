---
title: 403 Errors around GitHub access and Rate Limit Issues
---

## Issue
Customers may encounter 403 errors around GitHub either as a part of their calls to retrieve Artifacts, Dinghy, or other services.  There are a variety of reasons why this may happen, but customers will often see that their CloudDriver logs will indicate the following errors:

```com.netflix.spinnaker.clouddriver.artifacts.exceptions.FailedDownloadException: Unable to determine the download URL of artifact Artifact(type=github/file, customKind=false, name=null, version=main, location=null, reference=https://api.github.com/, metadata={}, artifactAccount=, provenance=null, uuid=null): Received 403 status code from api.github.com```


or a 403 Status in their Spinnaker UI Console

## Cause
Multiple factors may be causing a Github 403 status.  

