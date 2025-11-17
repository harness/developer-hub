---
title: Spinnaker not removing the old Auto Scaling Group after a new deployment
---

## Issue
Customers may find that there is a significant increase of the EC2 instances in some accounts.  
Upon further investigation, this can be attributed to Spinnaker not removing the old Auto Scaling Group after a new deployment. This results in the retention of a lot of versions for each service, and generates an increase in costs, greater pressure on services, and hitting API rate limits.
In this example, the deployment timeout per pipeline is set for 30 minutes. 
In the UI in the Deploy Configurations for the Red/Black strategy, the option for "Rollback to previous server group if deployment fails" has been set as well:






## Cause
What occurs is that the new server group fails to pass the health check.
As a result, no rollback happens to a previous version, and the new version does not get deleted either. Spinnaker tries to restart the failing server(s) repeatedly.
If the deployment is repeated again, with yet another failing version, server groups continue to be created. The environment then has numerous instances in AWS that are in a failing state. The Health checks for these instances show that the deployed ones fail, and are also restarted by Spinnaker.
 
The logs show the following:
```2021-09-14 14:20:52.665  WARN 1 --- [    handlers-15] c.n.s.o.c.t.i.WaitForUpInstancesTask     : [integration.spinnaker@...... Short circuiting initial target capacity determination after 10 minutes (serverGroup: aws:....._orders-main-stage-v030, executionId: .......)```
```Stage Deploy in ....... timed out after 30 minutes 6 seconds```
After that the server is left unhealthy in the server group and does not get removed.

