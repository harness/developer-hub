---
title: GitHub DinghyFiles referring to Mixed Case Applications Fail
---

## Issue
If an application is manually created in Spinnaker with a case-sensitive name (e.g. thisTestPipeline), users will encounter a ```404 error``` with regards to executing the pipeline when referring to the case-sensitive application name.
The pipeline refers to the case sensitive name properly (e.g. ```thisTestPipeline```) in the JSONThe dinghyfile is stored in a GitHub repository.

## Cause
GitHub references to the application end up being converted into lower case.  As an example, if you attempt to execute a ```dinghyfile``` and attempt to create the application from the pipeline execution, users will see that ```thisTestPipeline``` will be converted to ```thistestpipeline``` when looking at the application within Spinnaker

