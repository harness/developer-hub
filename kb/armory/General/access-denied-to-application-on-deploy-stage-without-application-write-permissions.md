---
title: Access denied to application on Deploy Stage without application WRITE permissions
---

## Issue
Currently, application ```WRITE``` permissions are required to use the Deploy Stage in Spinnaker with AWS, GCP, Titus and other deployment targets.However, when using the Kubernetes provider, only ```EXECUTE``` permissions are needed to use the Deploy Stage.This is an open issue in OSS Spinnaker: [spinnaker/spinnaker#6400](https://github.com/spinnaker/spinnaker/issues/6400)```EXECUTE``` application permissions were developed recently and, so far, have only been fully implemented on the Kubernetes V2 provider. It is possible to set ```EXECUTE``` permissions on the Deploy Stage for other targets, however the stage will also require application ```WRITE``` permissions to run successfully.

## Cause
Deploy stage on** targets other than the Kubernetes provider** does not run successfully because it does not have application ```WRITE``` permissions set.

