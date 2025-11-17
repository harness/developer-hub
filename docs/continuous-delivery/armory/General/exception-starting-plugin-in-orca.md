---
title: Exception Starting Plugin in Orca
---

## Issue
The following exception occurs when Orca starts:
```com.netflix.spinnaker.kork.exceptions.IntegrationException: 'com.jpmc.cto.spinnaker.tasks.CheckEntitlementsTask' extension has unsupported constructor argument type 'com.jpmc.cto.spinnaker.PreflightPluginConfig'. Expected argument classes should be annotated with @ExpectedConfiguration or implement PluginSdks.```

This occurs when trying to inject a class (```PreflightPluginConfig```) that is annotated as ```@PluginConfiguration``` into the constructor of ```CheckEntitlementsTask``` (an ```@Extension```), the same way ```RandomWaitConfig``` is being injected into the extension here: [https://github.com/spinnaker-plugin-examples/pf4jStagePlugin/blob/190259a3510c8ced30ce26c385e3881e7d07a17b/random-wait-orca/src/main/kotlin/io/armory/plugin/stage/wait/random/RandomWaitPlugin.kt#L49](https://github.com/spinnaker-plugin-examples/pf4jStagePlugin/blob/190259a3510c8ced30ce26c385e3881e7d07a17b/random-wait-orca/src/main/kotlin/io/armory/plugin/stage/wait/random/RandomWaitPlugin.kt#L49) 

## Cause
This is for users running Spinnaker 1.20.3 with the following setup in Gradle:
* spinnakerGradleVersion=8.4.0* pf4jVersion=3.2.0* korkVersion=7.75.1* orcaVersion=8.8.0

