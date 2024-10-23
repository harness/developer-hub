---
title: Clouddriver fails to start up Armory Agent during initial install
---

## Issue
When installing Armory Agent, organizations can get the following exceptions when starting clouddriver with armory agent plugin enabled.

```
Error starting ApplicationContext. To display the conditions report re-run your application with 'debug' enabled. 2020-12-08 17:55:15.404 ERROR 1 --- [ main] o.s.boot.SpringApplication : Application run failed org.springframework.beans.factory.UnsatisfiedDependencyException: Error creating bean with name 'documentationPluginsBootstrapper' defined in URL [jar:file:/opt/clouddriver/lib/springfox-spring-web-2.9.2.jar!/springfox/documentation/spring/web/plugins/DocumentationPluginsBootstrapper.class]: Unsatisfied dependency expressed through constructor parameter 1; nested exception is org.springframework.beans.factory.UnsatisfiedDependencyException: Error creating bean with name 'webMvcRequestHandlerProvider' defined in URL [jar:file:/opt/clouddriver/lib/springfox-spring-web-2.9.2.jar!/springfox/documentation/spring/web/plugins/WebMvcRequestHandlerProvider.class]: Unsatisfied dependency expressed through constructor parameter 1; nested exception is org.springframework.beans.factory.BeanCreationException: Error creating bean with name 'Armory.Kubesvc.com.netflix.spinnaker.kork.plugins.api.spring.SpringLoader': Initialization of bean failed; nested exception is org.springframework.beans.factory.BeanDefinitionStoreException: Failed to parse configuration class [io.armory.kubesvc.agent.KubesvcCachingAgentDispatcher]; nested exception is java.io.FileNotFoundException: class path resource [com/netflix/spinnaker/clouddriver/kubernetes/caching/agent/KubernetesV2CachingAgentDispatcher.class] cannot be opened because it does not exist
```

## Cause
OSS Spinnaker and the Armory Extension (1.x.x / 2.x.x ) have different compatibility with the Armory Agent plugin. For incompatible versions, errors will come up as certain dependencies are not met. Typically these errors will be at the Clouddriver level. 

