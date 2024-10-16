---
title: groovy.lang.MissingMethodException when referencing github config artifact for Google App Engine
---

## Issue
```groovy.lang.MissingMethodException``` error occurs when referencing Github config artifact for Google App Engine (GAE) deploy. The config artifacts were of instance of HashMap not an Artifact object.The following is an example of the error found within Spinnaker
```
Exception ( Create Server Group )
No signature of method: com.netflix.spinnaker.orca.pipeline.util.ArtifactUtils.getBoundArtifactForStage() is applicable for argument types: (com.netflix.spinnaker.orca.pipeline.model.Stage, null, HashMap) values: [Stage {id='', executionId=''}, ...] Possible solutions: getBoundArtifactForStage(com.netflix.spinnaker.orca.pipeline.model.Stage, java.lang.String, com.netflix.spinnaker.kork.artifacts.model.Artifact)
```

## Cause
OSS bug:[https://github.com/spinnaker/spinnaker/issues/5836](https://github.com/spinnaker/spinnaker/issues/5836)The config artifacts were returning a HashMap format instead of an artifact format, within the Orca service

