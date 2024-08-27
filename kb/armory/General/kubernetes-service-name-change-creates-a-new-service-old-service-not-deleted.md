---
title: Kubernetes Service Name Change Creates A New Service (old service not deleted)
---

## Issue
When modifying the k8s manifest to change the service name, a new service is getting generated. The old service is not getting deleted automatically. Manual service delete needs to be done.

## Cause
This is working as expected.  Kubernetes does not delete the old service as it is a function that can break other functions elsewhere.  It will rely on a manual judgement from the user to complete the "cleanup"

