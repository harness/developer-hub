---
title: Spinnaker Timesout After 60000 milliseconds when Updating to Spinnaker 2.19.x from 2.18.x or lower
---

## Issue
Spinnaker errors out when upgrading to a new version.  Issue occurs only when going to 2.19.x.  It does not happen when downgrading below 2.18.x nor does it happen when going from a lower version than 2.18.x to 2.18.x
Halyard log will show an error similar to:
```Interrupting task [Generate config] (**************) - RUNNING that timed out after 60000 millis.```

## Cause
There can be multiple reasons for this issue to occur.  How Spinnaker handles kubeconfig files is different starting in 2.19.x.  This is due to a regression bug found in Halyard 1.8.x, and it may only download one kubeconfig file because the decryption is not being done by Halyard.
With Spinnaker 2.19.x forward, the bug may cause Halyard to attempt to download all kubeconfig files, increasing the chance of Network Latency Errors/Failures.

