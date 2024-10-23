---
title: GCP- Exception ( Wait For Server Group Disabled ) - Error while querying target pool instance health
---

## Issue
When creating a cluster in GKE within a pipeline , users may look to to deploy an image and then Destroy it to Disable it.
When trying to run the stage ```Destroy Server Group``` with a GCP cluster, a time out is hit after ```30 min``` in the ```Wait For Server Group Disabled``` task.
The following exception can be seen within the Spinnaker UI:
Exception ( Wait For Server Group Disabled )
WaitForDisabledServerGroupTask of stage disableServerGroup timed out after 30 minutes 5 seconds. pausedDuration: 0 seconds, elapsedTime: 30 minutes 5 seconds, timeoutValue: 30 minutes



 
 
The ```Task Status``` shows that the ```Wait for Server Group Disabled``` takes the most time when taking a look at the individual task progression:

 
Admins will also see the following error in Clouddriver logs:
```{"@timestamp":"2021-065-23T19:46:24.349+00:00","@version":1,"message":"Error while querying target pool instance health: The resource 'projects/.....' was not found",...":"com.netflix.spinnaker.clouddriver.google.provider.agent.GoogleNetworkLoadBalancerCachingAgent","thread_name":......","level":"ERROR","level_value":40000}```
 

## Cause
Destroying server groups within GCP is not a supported workflow for Clouddriver.

