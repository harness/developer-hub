---
title: Jenkins CI driver can start but Spinnaker fails to monitor the Jenkins job (Tomcat Server)
---

## Issue
When a Jenkins CI provider is set up, it is possible to add a master with a Jenkins service account/API token. The pipeline is kicked off from a Jenkins job and is able to execute.However, it fails almost immediately with an ```HTTP 400 error bad request``` upon trying to monitor the status of the job it ran.The error starts around the line:
```Error running MonitorJenkinsJobTask for pipeline[**]```
The Jenkins environment would be hosted in a Tomcat server. In this test and example, the environment is:
* Java 8u144* Tomcat 8.5.23* Jenkins 2.176.4

## Cause
Tomcat ends up blocking the characters within a Jenkins' URL.  For example, when Jenkins' API URL includes  the pipe single character ```|``` or in the "exclude" portion of a query string ```{}```.When either the URL or query string includes those characters, Tomcat would throw a 500 response; not including it gave the aforementioned log message with a 400 response. 

