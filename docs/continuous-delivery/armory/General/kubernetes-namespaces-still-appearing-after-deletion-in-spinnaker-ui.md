---
title: Kubernetes Namespaces still appearing after deletion in Spinnaker UI
---

## Issue
Kubernetes accounts that are removed and deleted from Spinnaker configuration are still showing up in the UI with old resources. When attempting to interact with these resources there is an error and users cannot use them.

## Cause
This can happen if the environment runs Clouddriver with an SQL backend.There is an issue with the SQL backend where it doesn't respect the resource TTLs ([https://github.com/spinnaker/spinnaker/issues/4803](https://github.com/spinnaker/spinnaker/issues/4803)).

