---
title: NoUniqueBeanDefinitionException error with Armory Cloud enabled
---

## Issue
When upgrading from ***2.25.x*** to ***2.26.x***, Clouddriver, Echo, Front50, Igor fail to startup.Clouddriver logs show the following:
2021-10-18 16:10:04.637  WARN 1 --- [           main] ConfigServletWebServerApplicationContext : Exception encountered during context initialization - cancelling refresh attempt: org.springframework.beans.factory.UnsatisfiedDependencyException: Error creating bean with name 'catsSqlAdminController' defined in URL [jar:file:/opt/clouddriver....


2021.09.17.18.53.46.release-1.26.x.jar!/com/netflix/spinnaker/cats/sql/controllers/CatsSqlAdminController.class]: Unsatisfied dependency expressed through constructor parameter 0; nested exception is org.springframework.beans.factory.UnsatisfiedDependencyException: Error creating bean with name 'fiatPermissionEvaluator' defined in URL [jar:file:/opt......fiat-api-1.27.0.jar!/com/netflix/spinnaker/fiat/shared/FiatPermissionEvaluator.class]: Unsatisfied dependency expressed through constructor parameter 1; nested exception is org.springframework.beans.factory.UnsatisfiedDependencyException: Error creating bean with name 'fiatService' defined in class path resource [com/netflix/spinnaker/fiat/shared/FiatAuthenticationConfig.class]: Unsatisfied dependency expressed through method 'fiatService' parameter 1; nested exception is org.springframework.beans.factory.NoUniqueBeanDefinitionException: No qualifying bean of type 'com.netflix.spinnaker.okhttp.SpinnakerRequestInterceptor' available: expected single matching bean but found 2: armoryCloudRequestInterceptor,spinnakerRequestInterceptor
Echo logs show the following:
```2021-10-18 16:29:55.282  WARN 1 --- [           main] ConfigServletWebServerApplicationContext : Exception encountered during context initialization - cancelling refresh attempt: org.springframework.beans.factory.UnsatisfiedDependencyException: Error creating bean with name 'pipelineTriggerJob' defined in URL [jar:file:/opt/echo/lib/echo-scheduler-2021.04.29.16.51.35.release-1.26.x.jar!/com/netflix/spinnaker/echo/scheduler/actions/pipeline/PipelineTriggerJob.class]: Unsatisfied dependency expressed through constructor parameter 0; nested exception is org.springframework.beans.factory.UnsatisfiedDependencyException: Error creating bean with name 'pipelineInitiator' defined in URL [jar:file:/opt/echo/lib/echo-pipelinetriggers-2```
Igor logs show the following:
```2021-10-18 16:24:21.990  WARN 1 --- [           main] ConfigServletWebServerApplicationContext : Exception encountered during context initialization - cancelling refresh attempt: org.springframework.beans.factory.UnsatisfiedDependencyException: Error creating bean with name 'fiatPermissionEvaluator' defined in URL [jar:file:/opt/igor/lib/fiat-api-1.27.0.jar!/com/netflix/spinnaker/fiat/shared/FiatPermissionEvaluator.class]: Unsatisfied dependency expressed through constructor parameter 1; nested exception is org.springframework.beans.factory.UnsatisfiedDependencyException: Error creating bean with name 'fiatService' defined in class path resource [com/netflix/spinnaker/fiat/shared/FiatAuthenticationConfig.class]: Unsatisfied dependency expressed through method 'fiatService' parameter 1; nested exception is org.springframework.beans.factory.NoUniqueBeanDefinitionException: No qualifying bean of type 'com.netflix.spinnaker.okhttp.SpinnakerRequestInterceptor' available: expected single matching bean but found 2: ```


## Cause
This is due to a known issue, and pertains to the existence of beans of the same type as one already present in OSS.  

The fix for the issue is in ```armory-commons``` and the following PR provides more information:[https://github.com/armory-io/armory-commons/pull/199](https://github.com/armory-io/armory-commons/pull/199)

