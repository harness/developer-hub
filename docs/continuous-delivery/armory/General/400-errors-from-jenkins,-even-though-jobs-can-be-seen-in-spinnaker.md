---
title: 400 Errors from Jenkins, even though JOBS can be seen in Spinnaker
---

## Issue
Organizations can run into a common issue where trying to trigger Jenkins with a pipeline leads to a 400 error. This breaks the pipeline and potential deployment. Permissions can be confirmed as the JOB can be viewed in Spinnaker and the connection between the two seems to be working. The issue arises when trying to run pipelines, as logs will show 
Example error #1

```
ERROR 1 --- [0.0-8088-exec-3] c.n.s.k.w.e.GenericExceptionHandlers : Internal Server Errorunexpected end of stream on
http://$ORGANIZATIONURL.com:8080/...
at retrofit.RetrofitError.networkError
```
```
Example Error #2
[TaskScheduler-1] c.n.s.igor.jenkins.client.JenkinsClient : ---- ERROR https://$ORGANIZATIONURL.com:8080/jenkins/api/xml?.....
[TaskScheduler-1] c.n.s.igor.jenkins.client.JenkinsClient : java.net.SocketTimeoutException: connect timed out
at java.base/java.net.PlainSocketImpl.socketConnect(Native Method)
```

## Cause
This is similar to another Jenkins issue where there are invalid characters being reported by Jenkins with more context as to why.  Universally, these are the remote side rejecting the request.  Since Jenkins URLs are very consistent, a 400 response is typically returned by something outside of Armory’s control, which will sometimes require manual fixes

In this case, Armory adds extra parameters to the URLs to acquire “cause” information on pipelines that is not available in open source.  As a result, there are more characters than in OSS that are required to be allowed by Jenkins, as well as Tomcat. Both of these applications have tightened security measures which need to be openlisted for Armory.




