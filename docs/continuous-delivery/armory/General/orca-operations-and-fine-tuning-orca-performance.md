---
title: Orca Operations and Fine Tuning Orca Performance
---


The following KB article explains how a modern Orca operates in Spinnaker and provides guidance towards fine-tuning Orca performance in more modern Spinnaker environments.  
Please note that customers should enable monitoring in their environment before proceeding with any changes.

[Introduction to Orca](#introOrca) [Background on Classic Orca Operations vs Modern Orca Services](#orcabackground) | [Differences and Changes - Blocking Queues](#blockingqueues) | [Differences and Changes - pollSkippedNoCapacity](#pollskipped)[Monitoring Orca](#monitororca) | [Queue Lag](#monitor-queuelag) | [Thread Handling](#monitor-threadhandling) | [Activity Load](#monitor-activityload)[Tuning Orca](#tuningorca)[Scaling](#Scaling) | [Vertical Scaling](#scale-vertical) | [Horizontal Scaling](#scale-horizontal) -->

### Introduction to Orca
Orca is the system that handles and processes "tasks" and "stages" for Spinnaker.
Spinnaker's application saves, server creation, pipeline updates, and everything is run through "tasks" that execute through Orca.  Orca has a few key components:
* The work queue system* The storage system for executions
* The pipeline/stages themselves.
The work queue tracks the in-process task state and schedules/runs the pipeline tasks.  The storage system stores the results of each task and all artifacts tasks generate or add.  

### Background on Classic Orca Operations vs. Modern Orca Services

Changes to Orca's queue to fill up available work: [https://medium.com/@rizza/dev-journal-ed-4-e2cf2ef2fbc6](https://medium.com/@rizza/dev-journal-ed-4-e2cf2ef2fbc6)
Blog on monitoring (Orca emphasis): [https://blog.spinnaker.io/monitoring-spinnaker-part-1-4847f42a3abd](https://blog.spinnaker.io/monitoring-spinnaker-part-1-4847f42a3abd)

While the articles above share some unique insights into Orca operations, the documentation and information are often based upon some blog posts made by Netflix regarding the topic over five years old.

While helpful, these articles present some information that doesn't match how modern Orca operates and the current code.  They contain information that may be useful in generic operational guidance, but several metrics don't match those in currently running systems.

#### Differences and Changes - Blocking Queues
All Java services, as a rule, use thread pools as part of their operations.  In a thread pool, a work queue is responsible for running tasks.  The work queue is added via metrics ```threadPool.*``` with a critical metric reported as ```blockingQueueSize```.  The blogs above state, "***This should always be 0***" when looking at the ```messageHandlerPool``` thread pool (aka the core work pool).  This can be queried using the below query:
```max(threadpool_blockingQueueSize{id="messageHandlerPool",spinSvc="orca"})```

#### Differences and Changes - pollSkippedNoCapacity
Please also note that the ```pollSkippedNoCapacity``` message sometimes referenced in articles and blog posts doesn't work.  It is ignored via a NoOp handler, not added as a metric, or isn't sent via any notification.  This appears to be something Netflix extended or completed internally and never released to OSS. 

### Monitoring Orca
Before tuning the Orca service, customers should have monitoring set up with the [Armory Observability Plugin](https://github.com/armory-plugins/armory-observability-plugin).  
A monitored environment will let Cloud Admins see if their adjustments resolve issues and can help pinpoint fine-tuned adjustments.  For more information about setting up monitoring within a Spinnaker environment, please visit our Docs: [https://docs.armory.io/continuous-deployment/armory-admin/observe/observability-configure/](https://docs.armory.io/continuous-deployment/armory-admin/observe/observability-configure/)

#### Queue Lag
Query by message latency.  The longer a message takes to get through the system, the longer the end user sees pipelines taking.  This is the KPI of how Orca is doing concerning processing messages.

```
-- NRQL
FROM Metric SELECT max(queue.message.lag)/1000 FACET customerName 
TIMESERIES since 7 days ago
-- PromQL (rough)
queue_message_lag_seconds_max
```

#### Thread Handling
This is how Administrators can query threading capacity.  This metric tells Admins how close they are to the maximum usage of the thread work pool.  ***If this metric stays consistently above 80%***, scaling Orca vertically or horizontally is recommended.
-- NRQL for newrelic metrics.

```
FROM Metric SELECT max(threadpool.activeCount)/max(threadpool.maximumPoolSize)
where metricName like 'threadpool.%'  limit 100 
where spinSvc = 'orca' TIMESERIES since 7 days ago 
FACET hostname where id = 'messageHandlerPool'

-- promql ROUGH equivalent... NOT tested

max(threadpool_activeCount_total{spinSvc="orca",id="messageHandlerPool"}/max(threadpool_maximumPoolSize_total{spinSvc="orca",id="messageHandlerPool"})
```

#### Activity Load
There's no current metric to track activity load, but Orca stores all pipeline context in a database.  These operations can generate large amounts of data and communications. It's recommended to monitor
* Database network traffic* Host network traffic* Query the "body" size of pipelines in Orca's database.  Anything over 200MB indicates that some pipelines are too large.* You can set various flags to disable passing context to child pipelines. "Skip downstream output flag" as done via [https://github.com/spinnaker/orca/pull/4080](https://github.com/spinnaker/orca/pull/4080) and [https://github.com/spinnaker/orca/pull/3989](https://github.com/spinnaker/orca/pull/3989).
 
### Tuning Orca
The following are changes recommended to place within the Orca configuration of the Spinnaker manifest as a starting point.  Adjustments should be made within the ```SpinnakerService.yml``` file under the ```spec.spinnakerConfig.profiles.orca``` section.  Please note that adjusting cleanup timings should depend on the organization's compliance rules.  Making the timing shorter will clear logs after a specific date which may not meet the organization's rules around data retention.
```
spec:
  # spec.spinnakerConfig - This section is how to specify configuration spinnaker
  spinnakerConfig:
    # spec.spinnakerConfig.profiles - This section contains the YAML of each service's profile
    profiles:
      orca:
        # Allows plugins to override webhook/job stages
        dynamic-stage-resolver:
          enabled: true
        ## sets it to do a full poll per cycle.  Drastically improves queue handling
        keiko:
          queue:
            fillExecutorEachCycle: true
        ## Don't keep a lot of TASK history - this can be LARGE.  
        ## Defaults to 30 days retention normally.  Depends on the app
        tasks:
          daysOfExecutionHistory: 180
          useManagedServiceAccounts: true
          useSharedManagedServiceAccounts: true
        pollers:
          topApplicationExecutionCleanup:
            enabled: true
            intervalMs: 1200000 # 20 minutes, default 1 hour
            threshold: 1000 # default is 2000
            chunkSize: 20 ## defaults to 1
            exceptionApplicationThresholds:
              appKeyKeepHistory: 2000 ## overrides the threshold for a specific app
          oldPipelineCleanup:
            threshold-days: 90
            enabled: true
```
Note that at this time, SQL Keiko queues are not used by default.  If administrators are interested in enabling Keiko SQL, there are quite a few properties to set differently.  These are documented for testing below.  Note that customers should add the following configuration under the ```spec.spinnakerConfig.profiles.orca.keiko``` section, in addition to the above adjustments.
```
spec:
  spinnakerConfig:
    profiles:
      orca:
        keiko:
          queue:
            sql: 
              enabled: true
            redis:
            enabled: false
        ## it's critical to get the pending execution to use the same queue config
        ## as the main queue so it can repopulate pending executions
        queue:
          pending-execution-service:
            redis:
              enabled: false
            sql:
              enabled: true
```
We are continuously evaluating these configurations as Spinnaker continues to evolve, and we may have further recommendations in the future for SQL.  There have been some reported latency or failures when using SQL for Orca's queues at a massive scale.  Still, it hasn't been determined whether environmental issues were the root cause or an issue between SQL vs. Redis configuration.
 
### Scaling
After making the appropriate reads on the environment, Administrators may want to look at scaling Orca to help with increased traffic/demand. 
One note of caution:Scaling Orca will put an increasing load on the rest of the system.  ***This will cause increased calls to Echo, Rosco, Clouddriver, and other supporting services*** that Orca interacts with to execute tasks.

#### Scaling Vertically
```handlerCorePoolSize``` & ```handlerMaxPoolSize``` directly impact the available threads for queue processing.  Query by ```id``` per the command:```max(threadpool_blockingQueueSize{id="messageHandlerPool",spinSvc="orca"})```To get thread utilization by pool id.
Increase as needed with caution.  Making these changes ***will increase the load per Orca pod***.

#### Scaling Horizontally
Administrators can also scale Orca pods horizontally to increase capacity vs. increasing available threads.
See: [https://github.com/spinnaker/orca/blob/master/orca-core/src/main/java/com/netflix/spinnaker/orca/config/OrcaConfiguration.java#L193](https://github.com/spinnaker/orca/blob/master/orca-core/src/main/java/com/netflix/spinnaker/orca/config/OrcaConfiguration.java#L193)

Many of Orca's thread pools use fixed settings and are non-adjustable via JVM.  Thus scaling horizontally is likely required regardless of any thread settings.  These requests do not get near the traffic and probably won't need the same amount of scaling.
