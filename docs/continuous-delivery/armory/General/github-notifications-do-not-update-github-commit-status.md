---
title: Github Notifications Do Not Update Github Commit Status
---

## Issue
Although notifications appear to be set up correctly, Spinnaker is unable to update the Github Commit Status to Github properly.   
Echo shows an error related to an unexpected URL and is unable to make API requests to Github, like the following below example:
2020-11-03 17:58:24.224  INFO 1 --- [xIoScheduler-93] c.n.s.e.n.GithubNotificationAgent        : Sending Github status check for application: test
2020-11-03 17:58:24.225  INFO 1 --- [xIoScheduler-93] c.n.spinnaker.echo.github.GithubService  : ---> HTTP GET 'https://api.github.com'/repos/testGit/commits/9da3da385417cd14f9a8a69518845063bc95146b
2020-11-03 17:58:24.225  INFO 1 --- [xIoScheduler-93] c.n.spinnaker.echo.github.GithubService  : Authorization: token xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
2020-11-03 17:58:24.225  INFO 1 --- [xIoScheduler-93] c.n.spinnaker.echo.github.GithubService  : ---> END HTTP (no body)
2020-11-03 17:58:24.225  INFO 1 --- [xIoScheduler-93] c.n.spinnaker.echo.github.GithubService  : ---- ERROR 'https://api.github.com'/repos/testGit/commits/9da3da385417cd14f9a8a69518845063bc95146b
2020-11-03 17:58:24.226  INFO 1 --- [xIoScheduler-93] c.n.spinnaker.echo.github.GithubService  : java.lang.IllegalArgumentException: unexpected url: 'https://api.github.com'/repos/testGit/commits/9da3da385417cd14f9a8a69518845063bc95146b
	at com.squareup.okhttp.Request$Builder.url(Request.java:163)
	at retrofit.client.OkClient.createRequest(OkClient.java:58)
	at retrofit.client.OkClient.execute(OkClient.java:53)
	at retrofit.RestAdapter$RestHandler.invokeRequest(RestAdapter.java:326)
[...]

## Cause
The pipeline status notifications are not building Github status URL correctly.  Spinnaker is using ```'[https://api.github.com'](https://api.github.com%27/);``` to begin the URL reference, instead of just ```[https://api.github.com](https://api.github.com/)```In the above example:
```2020-11-03 17:58:24.225  INFO 1 --- [xIoScheduler-93] c.n.spinnaker.echo.github.GithubService  : ---> HTTP GET 'https://api.github.com'/repos/testGit/commits/9da3da385417cd14f9a8a69518845063bc95146b```

