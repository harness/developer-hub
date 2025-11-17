---
title: During Migration to IAM for Service Accounts, CloudDriver in HA returns error- Access Denied Service- Amazon S3; Status Code 403
---

## Issue
When trying to migrate to utilize IAM for Service accounts from the working Spinnaker solution with KIAM, the ```clouddriver-rw``` pod fails it's readiness probing checks and the logs for it show the following:
```
***************************
APPLICATION FAILED TO START
***************************

Description:

Failed to bind properties under 'sql.connectionpools.default.password' to java.lang.String:

    Reason: Access Denied (Service: Amazon S3; Status Code: 403; Error Code: AccessDenied; Request ID: ....; S3 Extended Request ID: .....=; Proxy: null)
```
## Action:

Update your application's configuration
Users can confirm that by performing a ```kubectl describe pod``` on the ```clouddriver-rw``` pod, the secrets token for service accounts are mounted on the pod. This issue impacts all of the Spinnaker pods when trying to switch to utilizing IAM for Service Accounts.
The user is not able to exec into the Clouddriver pod as the pod is doing a ```CrashLoopBackoff```. ```kubectl describe pod``` logs the following events:
```
Events:
  Type     Reason            Age                    From                Message
  ----     ------            ----                   ----                -------

  Normal   Started           3m18s (x3 over 4m9s)   kubelet             Started container clouddriver-rw
  Warning  Unhealthy         3m1s (x3 over 3m51s)   kubelet             Readiness probe failed:
  Warning  BackOff           2m48s (x3 over 3m31s)  kubelet             Back-off restarting failed container
```

## Cause
This issue could be due to a number of reasons.
* It may be that the worker nodes need permissions to read S3 bucket where the secrets are located* The ```securityContext``` is missing information on ```fsGroup```* ``````Tokens are mounted to ```/var/run/secrets/eks.amazonaws.com/serviceaccount/toke```n but they are missing the special permissions and the pod could be running as a different user (by default, a ```nobody``` account)

