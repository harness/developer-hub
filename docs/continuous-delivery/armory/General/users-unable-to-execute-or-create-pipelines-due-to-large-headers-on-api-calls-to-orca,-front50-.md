---
title: Users unable to execute or create pipelines due to large headers on API calls to Orca, front50 
---

## Issue
It may be noticed that certain users who are mapped to a large number of user groups are unable to create pipelines or applications or even execute a pipeline. Below errors may be seen on the gate logs 
**Error when creating a pipeline**
2021-12-22 16:55:17.179 ERROR 1 --- [0.0-8084-exec-3] c.n.s.k.w.e.GenericExceptionHandlers   : Bad Request: com.netflix.spinnaker.gate.controllers.PipelineController$PipelineException: Pipeline save operation did not succeed: 01FQHH31DF5N6V14D079DJAHGF (status: TERMINAL)
2021-12-22 16:55:17.193 ERROR 1 --- [0.0-8084-exec-3] o.a.c.c.C.[.[.[/].[dispatcherServlet]  : Servlet.service() for servlet [dispatcherServlet] threw exception
2021-12-22 16:55:17.179 ERROR 1 --- [0.0-8084-exec-3] c.n.s.k.w.e.GenericExceptionHandlers   : Bad Request: com.netflix.spinnaker.gate.controllers.PipelineController$PipelineException: Pipeline save operation did not succeed: 01FQHH31DF5N6V14D079DJAHGF (status: TERMINAL)
**Error when triggering a pipeline**
2021-12-22 14:17:51.408  WARN 1 --- [.0-8084-exec-10] c.n.s.k.w.e.GenericExceptionHandlers     : Handled error in generic exception handler

com.netflix.spinnaker.kork.web.exceptions.NotFoundException: Pipeline not found (id: 01FQH82MK14WWNEPR8TYQBVXYW)
	at com.netflix.spinnaker.gate.controllers.PipelineController.getPipeline(PipelineController.groovy:112)
	at com.netflix.spinnaker.gate.controllers.PipelineController$$FastClassBySpringCGLIB$$e4bc6ec4.invoke()
	at org.springframework.cglib.proxy.MethodProxy.invoke(MethodProxy.java:218)
	at org.springframework.aop.framework.CglibAopProxy$DynamicAdvisedInterceptor.intercept(CglibAopProxy.java:687)

## Cause
When a pipeline is triggered, there is a cascade of api calls starting from ```deck->gate->echo->orca``` . When investigated at various levels, it can be seen that orca returns a ```HTTP response 400``` when it is unable to handle a request. The same might happen with Front50 for creating a pipeline or application. This is because, the default header size for Tomcat is only 8KB. If this limit is exceeded, Orca, Front50, Rosco will timeout and throw ```400 errors``` as it is unable to parse the entire header. 

