---
title: While Disabling Policy Engine, Orca Continually Advises that it Cannot Communicate with OPA Server
---

## Issue
When disabling and removing Policy Engine, the following error continues to occur in Orca logs. There are however, no issues with deployments or executions of pipelines
2020-11-05 07:36:17.726 ERROR 1 --- [    handlers-15] io.armory.spinnaker.opa.PolicyEnforcer   : [johnsmith@abc.com] Policy Error: Unable to communicate with OPA Server
[...]

## Cause
Not all configurations were removed, and so references still exist to check for the OPA server.

