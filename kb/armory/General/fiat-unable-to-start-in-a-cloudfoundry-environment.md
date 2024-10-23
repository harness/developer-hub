---
title: FIAT unable to start in a CloudFoundry Environment
---

## Issue
FIAT is showing unable to start even without any change to the Spinnaker Manifest.  However, a rolling restart was issued to the environment, and once all pods are up and running, FIAT continues to frequently restart.
Upon inspecting the FIAT logs, they will discover error messages about FIAT's inability to contact CloudDriver, such as the following:
```s.f.c.RetrofitConfig$RetryingInterceptor : [] Request for http://spin-clouddriver:7002/credentials failed. Backing off for 2000ms```

## Cause
The issue has to do with an issue where the FIAT service is failing to start if there are any invalid Cloud Foundry accounts.
If an invalid CF account is onboarded to spinnaker, the api ([https://spin-clouddriver:7002/credentials)](https://spin-clouddriver:7002/credentials%29) is seen to return 400 response code.
The issue did not appear until changes in 2.26.3

