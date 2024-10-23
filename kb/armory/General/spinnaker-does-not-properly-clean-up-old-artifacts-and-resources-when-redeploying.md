---
title: Spinnaker does not properly clean up old artifacts and resources when redeploying
---

## Issue
An organization may encounter an issue that Spinnaker does not delete old artifacts during a deployment, which are not part of the new deployment. This happens for Kubernetes deployments, which leads to a dirty cluster state and potential security risks e.g old istio rules being existent, and causes significant manual work needed to clean it up.

## Cause
This issue is caused by how OSS Spinnaker communicates with Kubernetes, there is currently no automatic way of determining what is and what isn't a used artifact or resource. This issue is being tracked on OSS Spinnaker [https://github.com/spinnaker/spinnaker/issues/4236](https://github.com/spinnaker/spinnaker/issues/4236)There is also related work going on in this issue [https://github.com/spinnaker/spinnaker/issues/4550](https://github.com/spinnaker/spinnaker/issues/4550)There are two sides to it. On the one side for singular pipelines that have a set number of resources, this can be handled with a delete resources stage as mentioned in the issue above.For multiple resource pipelines, it gets trickier as there currently isn't an ideal way of tracking those resources 

