---
title: How to Limit Logs to Information to Specific Logs by Finding the Absolute Path
---

## Introduction
Administrators may, at some point, want to limit or reduce their logs in Spinnaker to specific logs.  This may aid them in the following situations:
* Controlling specific logs can prevent high CPU and Memory when using debug mode from the root level.* Reduce the amount of non-immediately relevant info logs by changing them only to show ERROR/WARN logs.* Easy to track.* Not overwhelming the console or aggregation tool
 
 

## Prerequisites
Access to a Running Spinnaker InstanceAccess to change the Spinnaker Configuration

## Instructions
Below is an example log, where we may want to limit to WARN/ERROR messagesWhen looking at the list of logs, admins can see that the logs are using a short path in the console, which makes it harder to know how to limit this specific log. The reason is when changing log mode, we need to specify the ```full path```:
```c.n.s.c.sql.event.SqlEventCleanupAgent``````s.k.p.u.r.r.RemotePluginInfoReleaseCache``` ← will show an example of this log``` i.a.k.a.r.ClouddriverAgentCleanup```
There are two options to find an absolute path for logs:
* Looking in the ```lib folder``` for the logs class* Configuring advanced logs with ```logback``` -> will automatically show the full path of each log
In this KB, we will be focusing on the first option.In the example below, we will do it for Clouddriver:
* We exec into the Clouddriver pod* We will navigate to the lib folder by using the following command: ```cd /opt/clouddriver/lib/```* In the ```lib``` folder, we will have a lot of different ```jar``` files.* We will use the following command to narrow the list of possible jar files for the specific log we are looking for: ```find | grep plugin```. We are using grep with the word* because we can see the word ```plugin``` in the log sample.The command above will provide us with the following .jar files: 
./armory-commons-plugins-3.13.5.jar
./kork-plugins-7.169.1.jar
./kork-plugins-api-7.169.1.jar
./kork-plugins-spring-api-7.169.1.jar
./spring-plugin-core-1.2.0.RELEASE.jar
./spring-plugin-metadata-1.2.0.RELEASE.jar
 
*  In some cases, it will be easier to locate to correct ```.jar``` file, and in other cases, we will search for the absolute path in all of them*  If we are checking the first two letters initial log example, ```s.k```, we know the first latter will be Spinnaker, and based on the ```.jar``` list, the second is ```Kork```*  We will use the following command to search for the log absolute path inside the Kork .jar files:  ```jar tvf ./kork-plugins-7.169.1.jar | grep RemotePluginInfoReleaseCache```*  After running the above command in step 9, the following output will be displayed:```com/netflix/spinnaker/kork/plugins/update/release/remote/RemotePluginInfoReleaseCache.class```* We will use the full path we found in step 9, like the example below:```        logging:``````          level:``````            com.netflix.spinnaker.kork.plugins.updates.release.remote.RemotePluginInfoReleaseCache: WARN```
The short path log is ```s.k.p.u.r.r.RemotePluginInfoReleaseCache ```The full path log is ```com.netflix.spinnaker.kork.plugins.updates.release.remote.RemotePluginInfoReleaseCache```

