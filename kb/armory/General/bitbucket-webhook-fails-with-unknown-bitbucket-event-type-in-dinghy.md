---
title: BitBucket Webhook Fails with Unknown Bitbucket Event Type in Dinghy
---

## Issue
Upon publishing and completing the Pull Request from an on premise BitBucket, the pipeline fails.Dinghy reports an error ```Unknown bitbucket event type``` in Dinghy
Echo reports an error such as the following: 
```
failed processing event: Event(details=Metadata(source=bitbucket, type=git, created=xxxxxxxxxxxxx, organization=null, project=null, application=null, _content_id=null, attributes=null, requestHeaders={accept=[application/json], accept-encoding=[gzip], connection=[Keep-Alive], content-length=[1301], content-type=[application/json; charset=UTF-8], host=[spin-echo.spinnaker-system:8084], user-agent=[okhttp/3.14.6], x-event-key=[repo:refs_changed], x-spinnaker-anonymous=[anonymous], x-spinnaker-application=[xxxxxxxxx-api]}), 
...
eventId=deb121ab-4cff-4c23-94f3-1f8e8ae28fda)\nretrofit.RetrofitError: 500 Internal Server Error\n\tat retrofit.RetrofitError.httpError(RetrofitError.java:40)\n\tat retrofit.RestAdapter$RestHandler.invokeRequest(RestAdapter.java:388)\n\tat retrofit.RestAdapter$RestHandler.invoke(RestAdapter.java:240)\n\tat com.sun.proxy.$Proxy187.SendPayload(Unknown Source)\n\tat io.armory.spinnaker.echo.internal.webhooks.ArmoryWebhookService.sendPayload(ArmoryWebhookService.java:19)\n\tat io.armory.spinnaker.echo.internal.webhooks.ArmoryWebhookEventListener.processEvent(ArmoryWebhookEventListener.java:47)\n\tat com.netflix.spinnaker.echo.events.EventPropagator.lambda$null$0(EventPropagator.java:47)\n\tat com.netflix.spinnaker.security.AuthenticatedRequest.lambda$propagate$0(AuthenticatedRequest.java:92)\n\tat com.netflix.spinnaker.echo.events.EventPropagator.lambda$processEvent$2(EventPropagator.java:54)\n\tat rx.internal.util.ActionSubscriber.onNext(ActionSubscriber.java:39)\n\tat rx.observers.SafeSubscriber.onNext(SafeSubscriber.java:134)\n\tat rx.internal.operators.OperatorObserveOn$ObserveOnSubscriber.call(OperatorObserveOn.java:224)\n\tat rx.internal.schedulers.CachedThreadScheduler$EventLoopWorker$1.call(CachedThreadScheduler.java:230)\n\tat rx.internal.schedulers.ScheduledAction.run(ScheduledAction.java:55)\n\tat java.base/java.util.concurrent.Executors$RunnableAdapter.call(Unknown Source)\n\tat java.base/java.util.concurrent.FutureTask.run(Unknown Source)\n\tat java.base/java.util.concurrent.ScheduledThreadPoolExecutor$ScheduledFutureTask.run(Unknown Source)\n\tat java.base/java.util.concurrent.ThreadPoolExecutor.runWorker(Unknown Source)\n\tat java.base/java.util.concurrent.ThreadPoolExecutor$Worker.run(Unknown Source)\n\tat java.base/java.lang.Thread.run(Unknown Source)",
```

## Cause
Updates to the Webhook payload format from Atlassian for Bitbucket 6.9.1 have changed the process making it also not backwards compatible with the existing Spinnaker. An update needed to be added to Spinnaker to accept the new payload format.

