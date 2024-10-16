---
title: Ingesting AWS CloudFormation Templates Larger than 51200 Bytes as an Artifact
---

## Issue
Executing an AWS CloudFormation Template which is larger than 51200 bytes as an artifact leads to the following error in Spinnaker when using the CloudFormation Stage
```'templateBody' failed to satisfy constraint: Member must have length less than or equal to 51200```

## Cause
The process of ingesting an Artifact, even from S3, is to take the artifact into Spinnaker so it can be manipulated and used across stages.  At that point, the file is no longer being ingested direction from S3, and is therefore, constrained by the AWS file size limitations outlined here:[https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cloudformation-limits.html](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cloudformation-limits.html)

