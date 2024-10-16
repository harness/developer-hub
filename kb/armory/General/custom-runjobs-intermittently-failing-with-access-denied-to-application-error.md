---
title: Custom runjobs intermittently failing with "Access denied to application" error
---

## Issue
A custom runjob stage in Armory Spinnaker 2.26.0 or earlier fails with the following error displayed in the UI: 
```Exception - Access denied to application  - required authorization: READ```
No permission or configuration changes have been applied prior to this failure, and the same stage successfully completes at an intermittent basis. 

## Cause
This is a known issue that has been addressed in Armory Spinnaker 2.26.1, specifically in Orca:[https://github.com/spinnaker/orca/pull/4134](https://github.com/spinnaker/orca/pull/4134)
The issue stems from Orca passing an application name to Clouddriver to ask for permissions, however no such application actually exists.
In order to confirm this indeed is the case for a particular execution failure, look at the Clouddriver log for the following error:
```FiatAccessDeniedExceptionHandler : Encountered exception while processing request GET:/{}applications/```

And confirm it is not an application that exists in your environment.

