---
title: Customers Unable to Access Resources due to GitHub sunseting Deprecated Teams API Endpoints
---

## Issue
Customers may find a lack of access to resources in Spinnaker if they have been using the Teams API.  This is due to a change in the Teams API from a top-level path under ```/teams/:team_id```.  Customers not using the Team API will not be affected. 
Those who are using the API, will find that resources will not show up in Spinnaker UI and FIAT may display the following in logs:

```
ERROR 1 — [0.0-8083-exec-3] n.s.f.s.FiatAccessDeniedExceptionHandler : Encountered exception while processing request GET:/applications/dqcloud/tasks with headers={x-spinnaker-application=tempTest, host=spin-orca.spinnaker:8083, connection=Keep-Alive, x-spinnaker-user=ArmoryUser, x-spinnaker-accounts=prod,build, accept-encoding=gzip, accept=application/json, user-agent=okhttp/3.14.7} 
```
 
For more information about these changes, please take a look at the following Blog:[https://github.blog/changelog/2022-02-22-sunset-notice-deprecated-teams-api-endpoints/](https://github.blog/changelog/2022-02-22-sunset-notice-deprecated-teams-api-endpoints/)
 

## Cause
Due to deprecation, code in FIAT must be updated to account for changes.  The following PR contains the changes to FIAT to be rolled out in 1.28.x
[https://github.com/spinnaker/fiat/pull/911](https://github.com/spinnaker/fiat/pull/911)

