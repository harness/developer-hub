---
title: Operator error when performing a Spinnaker upgrade in an air-gapped environment
---

## Issue
When upgrading Spinnaker's version in an air-gapped environment using a pull-through repository, a user may come across the following error in the Operator logs:
```
"{"level":"error","ts":1641324429.9751217,"logger":"controller-runtime.controller","msg":"Reconciler error","controller":"spinnakerservice-controller","request":"spinnaker-service/spinnaker","error":"Unable to retrieve profile \"settings.js\": Error reading contents of S3 using AWS SDK. Region: , Bucket: , Object: profiles/deck//settings.js. Check connectivity and permissions to that bucket. Error: com.amazonaws.services.s3.model.AmazonS3Exception: The specified key does not exist. (Service: Amazon S3; Status Code: 404; Error Code: NoSuchKey; Request "
```

## Cause
Since the error hints at missing files, the pull-through repository might not be up to date with the latest artifacts from Armory's official repo.

