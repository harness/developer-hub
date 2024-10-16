---
title: Clouddriver unable to download artifacts from private github instance due to SSL errors
---

## Issue
An organization may have its own private Github instance for source code management instead of using public Github instance.  They may choose to use custom SSL certificates for secure access of the private Github instance. If Spinnaker is configured to fetch artifacts from private Github instance, users may notice SSL errors in Clouddriver logs when trying to fetch artifacts similar to the one below

```
2021-07-26 10:02:02.326  INFO 1 --- [      MvcAsync3] c.n.s.c.a.gitRepo.GitJobExecutor         : Cloning git/repo https://github.wdf.xxx.com/repo/reponame into /tmp/gitrepos/72fe7405e214a959ef3c55848d91da00d90f4f13e4eb1d1dae9361cdf0c93dd5
2021-07-26 10:02:02.355  WARN 1 --- [0.0-7002-exec-3] c.n.s.k.w.e.GenericExceptionHandlers     : Handled error in generic exception handlerjava.io.IOException: git clone --branch master --depth 1 https://token:$GIT_TOKEN@github.wdf.xxx.com/repo/reponame failed. Error: Cloning into 'reponame'...
fatal: unable to access 'https://github.wdf.xxx.com/repo/reponame/': SSL certificate problem: unable to get local issuer certificate
 Output:
        at com.netflix.spinnaker.clouddriver.artifacts.gitRepo.GitJobExecutor.cloneBranchOrTag(GitJobExecutor.java:156) ~[clouddriver-artifacts-8.0.4-20210625060028.jar:8.0.4-20210625060028]
        at com.netflix.spinnaker.clouddriver.artifacts.gitRepo.GitJobExecutor.clone(GitJobExecutor.java:138) ~[clouddriver-artifacts-8.0.4-20210625060028.jar:8.0.4-20210625060028]
        at com.netflix.spinnaker.clouddriver.artifacts.gitRepo.GitJobExecutor.cloneOrPull(GitJobExecutor.java:98) ~[clouddriver-artifacts-8.0.4-20210625060028.jar:8.0.4-20210625060028]
        at com.netflix.spinnaker.clouddriver.artifacts.gitRepo.GitRepoArtifactCredentials.getInputStream(GitRepoArtifactCredentials.java:126) ~[clouddriver-artifacts-8.0.4-20210625060028.jar:8.0.4-20210625060028]
        at com.netflix.spinnaker.clouddriver.artifacts.gitRepo.GitRepoArtifactCredentials.getLockedInputStream(GitRepoArtifactCredentials.java:93) ~[clouddriver-artifacts-8.0.4-20210625060028.jar:8.0.4-20210625060028]
        at com.netflix.spinnaker.clouddriver.artifacts.gitRepo.GitRepoArtifactCredentials.download(GitRepoArtifactCredentials.java:69) ~[clouddriver-artifacts-8.0.4-20210625060028.jar:8.0.4-20210625060028]
        at com.netflix.spinnaker.clouddriver.artifacts.ArtifactDownloader.download(ArtifactDownloader.java:37) ~[clouddriver-artifacts-8.0.4-20210625060028.jar:8.0.4-20210625060028]
        at com.netflix.spinnaker.clouddriver.controllers.ArtifactController.lambda$fetch$0(ArtifactController.java:67) ~[clouddriver-web-8.0.4-20210625060028.jar:8.0.4-20210625060028]
        at org.springframework.web.servlet.mvc.method.annotation.StreamingResponseBodyReturnValueHandler$StreamingResponseBodyTask.call(StreamingResponseBodyReturnValueHandler.java:111) ~[spring-webmvc-5.2.9.RELEASE.jar:5.2.9.RELEASE]
        at org.springframework.web.servlet.mvc.method.annotation.StreamingResponseBodyReturnValueHandler$StreamingResponseBodyTask.call(StreamingResponseBodyReturnValueHandler.java:98) ~[spring-webmvc-5.2.9.RELEASE.jar:5.2.9.RELEASE]
        at org.springframework.web.context.request.async.WebAsyncManager.lambda$startCallableProcessing$4(WebAsyncManager.java:337) ~[spring-web-5.2.11.RELEASE.jar:5.2.11.RELEASE]
        at java.base/java.util.concurrent.Executors$RunnableAdapter.call(Executors.java:515) ~[na:na]
        at java.base/java.util.concurrent.FutureTask.run(FutureTask.java:264) ~[na:na]
        at java.base/java.lang.Thread.run(Thread.java:834) ~[na:na]2021-07-26 10:02:02.355 ERROR 1 --- [0.0-7002-exec-3] c.n.s.k.w.e.GenericExceptionHandlers     : Internal Server Error
```

## Cause
Although the certificate for private github instance may be imported into the ```java keystore``` and later mounted to Clouddriver by following the steps from the knowledge article: [https://support.armory.io/support?id=kb_article_view&sysparm_article=KB0010087](https://support.armory.io/support?id=kb_article_view&sysparm_article=KB0010087), it would work only for ```http``` calls that are made by Clouddriver.
However in this particular scenario, Clouddriver pulls the artifacts through git command instead of http and the error by itself is actually from the git command. This can be replicated by running the git commands from the Clouddriver pods.

