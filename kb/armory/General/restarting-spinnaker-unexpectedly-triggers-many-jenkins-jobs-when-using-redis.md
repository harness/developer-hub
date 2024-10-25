---
title: Restarting Spinnaker Unexpectedly Triggers Many Jenkins Jobs when using Redis
---

## Issue
When restarting Spinnaker, many unexpected Jenkins jobs are triggered.  This process can cause a lot of unintended consequences for the environment.  
This issue occurs when the default Spinnaker Redis service and the Redis database and service are not persistent.  (e.g., The environment is not using an external Redis or RDS MySQL)

## Cause
If we use the default ```spin-redis``` service in SpinnakerService Custom Resource (CR), and the Redis service is not persisted.  The Redis service will restart when Spinnaker restarts.  
As a consequence, the Jenkins jobs will be triggered, and this is by design.  Restarting a setup with Redis configured in this way will also cause the loss of the execution data.

