---
title: RunJob Does not Execute Due to Write Permissions in FIAT
---

## Issue
Group has been provided Read access via Fiat and is unable to execute an existing pipeline.  As an example, the below error occurs when attempting to execute
```Access denied to application k8s2 - required authorization: WRITE```

## Cause
```runJobManifest``` does not work without write permission due to permissions and access set within OSS Spinnaker.  This was previously done by design. 

