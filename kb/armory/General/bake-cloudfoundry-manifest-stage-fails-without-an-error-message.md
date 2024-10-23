---
title: Bake CloudFoundry Manifest Stage Fails without an error message
---

## Issue
When a pipeline fails in the Bake CloudFoundry manifest stage, there are no errors displayed in Deck.
In an example scenario, where Clouddriver is unable to download the artifact from Bitbucket, the Rosco logs show the following:

Clouddriver logs show the following, for example:
```
2021-04-22 14:24:00.966  WARN 1 — [0.0-7002-exec-6] c.n.s.k.w.e.GenericExceptionHandlers     : Handled error in generic exception handler
com.netflix.spinnaker.clouddriver.artifacts.exceptions.FailedDownloadException: Unable to download the contents of artifact Artifact(type=......t/file, customKind=false, name=manifests/uat/vars.qa.3z.yml, version=null, location=null, reference=https://bitbucketdc-cluster07.jpmchase.net/projects...../c360-income-businessrule-service/raw/manifests/uat/v.......yml?at=refs/heads/feature/spinnaker, metadata={}, artifactAccount=bitbucket, provenance=null, uuid=null): Received 404 status code from .......
at com.netflix.spinnaker.clouddriver.artifacts.config.SimpleHttpArtifactCredentials.download(SimpleHttpArtifactCredentials.java:51) 
```
 
The user has to obtain error information from the Rosco and Clouddriver logs, as the UI does not state the error message:

## Cause
The error pertaining to the Bake CloudFoundry Manifest Stage Failing is not seen in the Deck UI.

