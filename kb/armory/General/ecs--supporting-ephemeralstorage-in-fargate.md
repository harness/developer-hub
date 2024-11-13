---
title: ECS- Supporting EphemeralStorage in Fargate
---

## Issue
In some versions of Spinnaker and Armory Enterprise, [AWS Ephemeral Storage for Fargate](https://aws.amazon.com/about-aws/whats-new/2021/04/amazon-ecs-aws-fargate-configure-size-ephemeral-storage-tasks/) is not available.  When a user attempts to define EphemeralStorage in ECS from an artifact definition, such as with the following definition:
```
    "ephemeralStorage": {

        "sizeInGiB": 100

    },
```
 
The storage of 100GB does not get assigned.

## Cause
This issue is as a result of [https://github.com/spinnaker/kork/pull/862](https://github.com/spinnaker/kork/pull/862) and the related [dependency.](https://github.com/spinnaker/spinnaker/issues/6417)
 

