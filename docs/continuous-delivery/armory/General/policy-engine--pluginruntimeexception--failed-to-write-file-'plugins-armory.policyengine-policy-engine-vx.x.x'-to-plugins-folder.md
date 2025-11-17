---
title: Policy Engine- PluginRuntimeException- Failed to write file 'plugins/Armory.PolicyEngine-policy-engine-vX.X.X' to plugins folder
---

## Issue
When attempting to enable Policy Engine, the following error, or similar can be found in gate logs when attempting to use Armory Policy Engine with OSS and Halyard
```
org.pf4j.PluginRuntimeException: Failed to write file 'plugins/Armory.PolicyEngine-policy-engine-vX.X.X.zip' to plugins folder
	at com.netflix.spinnaker.kork.plugins.update.SpinnakerUpdateManager.write(SpinnakerUpdateManager.kt:174)
	at com.netflix.spinnaker.kork.plugins.update.SpinnakerUpdateManager.download(SpinnakerUpdateManager.kt:102)
	at com.netflix.spinnaker.kork.plugins.update.SpinnakerUpdateManager.downloadPluginReleases$kork_plugins(SpinnakerUpdateManager.kt:66)
	at com.netflix.spinnaker.kork.plugins.v2.SpinnakerPluginService$initialize$1.invoke(SpinnakerPluginService.kt:81)
	at com.netflix.spinnaker.kork.plugins.v2.SpinnakerPluginService$initialize$1.invoke(SpinnakerPluginService.kt:49)
	at com.netflix.spinnaker.kork.plugins.v2.SpinnakerPluginService.withTiming(SpinnakerPluginService.kt:170)
	at com.netflix.spinnaker.kork.plugins.v2.SpinnakerPluginService.initialize(SpinnakerPluginService.kt:71)
	at com.netflix.spinnaker.kork.plugins.v2.PluginFrameworkInitializer.postProcessBeanDefinitionRegistry(PluginFrameworkInitializer.kt:37)
	at org.springframework.context.support.PostProcessorRegistrationDelegate.invokeBeanDefinitionRegistryPostProcessors(PostProcessorRegistrationDelegate.java:280)
	at org.springframework.context.support.PostProcessorRegistrationDelegate.invokeBeanFactoryPostProcessors(PostProcessorRegistrationDelegate.java:109)
	at org.springframework.context.support.AbstractApplicationContext.invokeBeanFactoryPostProcessors(AbstractApplicationContext.java:707)
	at org.springframework.context.support.AbstractApplicationContext.refresh(AbstractApplicationContext.java:533)
	at org.springframework.boot.web.servlet.context.ServletWebServerApplicationContext.refresh(ServletWebServerApplicationContext.java:141)
[...]
Caused by: java.nio.file.NoSuchFileException: /tmp/pf4j-update-downloader00000000000000000000/policy-engine-vX.X.X.zip -> plugins/Armory.PolicyEngine-policy-engine-vX.X.X.zip
	at java.base/sun.nio.fs.UnixException.translateToIOException(UnixException.java:92)
	at java.base/sun.nio.fs.UnixException.rethrowAsIOException(UnixException.java:111)
	at java.base/sun.nio.fs.UnixCopyFile.move(UnixCopyFile.java:478)
	at java.base/sun.nio.fs.UnixFileSystemProvider.move(UnixFileSystemProvider.java:267)
	at java.base/java.nio.file.Files.move(Files.java:1422)
	at com.netflix.spinnaker.kork.plugins.update.SpinnakerUpdateManager.write(SpinnakerUpdateManager.kt:172)
	... 47 common frames omitted
```
## Cause
Additional definitions may be required to use Plugin with OSS, using Halyard. The plugin's original design and suggested use case is to be used with Armory Enterprise Operator and Halyard and is maintained with those installations in mind.

