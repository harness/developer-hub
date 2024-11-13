---
title: Errors Initializing and Starting Up Policy Engine (Configuration Hints, Orca/CloudDriver/Front50)
---

## Issue
Policy Engine has been implemented with settings in Operator/Halyard, but it is not starting up and is causing errors in the initialization.  Example may look like something below:
```
front50 Aug 28, 2020, 5:36:40 PM 2020-08-29 00:36:40.909 ERROR 1 --- [ main] o.s.boot.SpringApplication : Application run failed
front50 Aug 28, 2020, 5:36:40 PM 2020-08-29 00:36:40.210 INFO 1 --- [ main] o.s.c.a.ConfigurationClassPostProcessor : Cannot enhance @Configuration bean definition 'com.netflix.spinnaker.kork.PlatformComponents' since its singleton instance has been created too early. The typical cause is a non-static @Bean method with a BeanDefinitionRegistryPostProcessor return type: Consider declaring such methods as 'static'.
front50 Aug 28, 2020, 5:36:40 PM 2020-08-29 00:36:40.209 INFO 1 --- [ main] o.s.c.a.ConfigurationClassPostProcessor : Cannot enhance @Configuration bean definition 'pluginsAutoConfiguration' since its singleton instance has been created too early. The typical cause is a non-static @Bean method with a BeanDefinitionRegistryPostProcessor return type: Consider declaring such methods as 'static'.
front50 Aug 28, 2020, 5:36:40 PM 2020-08-29 00:36:40.206 INFO 1 --- [ main] i.a.s.f.p.PolicyEnginePluginFront50 : PolicyEngineFront50.start()
```

## Cause
Configurations on Policy Engine require a complete list of declarations.  It can be easy to miss a declaration.

