---
title: Run Job (Manifest) Configuration has a non-zero backoff does not show results of multi-failure
---

## Issue
An organization may run into a known issue where in a Run Manifest stage, the Run Job (Manifest) Configuration has a non-zero backoff limit e.g.
apiVersion: batch/v1

kind: Job

metadata:

  name: reschedule-iop-tickets

  namespace: spinnaker-jobs

spec:

  backoffLimit: 2

  template:

The console output shows the results of the first attempt only. There is no way to see whether the pods are re-attempting it or failing somewhere else.

## Cause
It is a known issue when the pod crashes, logs are only created in the first instance where the crash occurs. The logs from the latest pod created are pulled.
Sometimes there are multiple executions of a ```runjob```, but there is no place in the UI to let know the users what happened to each pod.
This issue is known to Armory Engineering and the OSS community.

