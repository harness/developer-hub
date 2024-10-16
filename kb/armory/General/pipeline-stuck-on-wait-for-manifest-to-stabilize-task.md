---
title: Pipeline stuck on "Wait for Manifest to Stabilize" Task
---

## Issue
When executing a pipeline the ```Wait For Manifest To Stabilize``` stage gets stuck until the timeout is reached.

## Cause
This can be caused by a few different reasons.  In order to narrow down the potential root cause, please check the following:
* If the execution was initiated by *non-admin* user and when an *admin* user starts the the pipeline, it gets stuck 
* If manually triggering the pipeline shows the same behavior
* If there is a difference in behavior when checking the above, then the issue may be due to the moniker naming convention. 

What happens is that the request to fetch a manifest from Clouddriver does two permission checks:
* Does the user have permission to the account in question?Does the user have permission to the app specified on the manifest's app
* In cases where a ```moniker.app``` is explicitly specified on the manifest, then this is the app that is used.* In cases where there is no ```moniker.app``` specified, then the app is determined by parsing using ```frigga``` as per [this article](https://github.com/Netflix/frigga/blob/d24ab6f96529827d7d99e2e3b23e3417f8435cf6/src/main/java/com/netflix/frigga/Names.java#L95).


