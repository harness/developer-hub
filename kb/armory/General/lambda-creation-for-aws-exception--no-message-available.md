---
title: Lambda Creation for AWS-Exception- No message available
---

## Issue
When creating Lambda functions in Spinnaker, users may see the following non-descriptive error:

 
In checking Clouddriver after receiving the error, the following errors can be found in the logs:
WARN 1 --- [nio-7002-exec-9]  c.n.s.k.w.e.GenericExceptionHandlers     : Handled error in generic  exception handler
com.netflix.spinnaker.clouddriver.orchestration.AtomicOperationConverterNotFoundException: null
...
com.netflix.spinnaker.clouddriver.orchestration.AnnotationsBasedAtomicOperationsRegistry.getAtomicOperationConverter(AnnotationsBasedAtomicOperationsRegistry.groovy:71) 


## Cause
This error is related to the following Github issue request[https://github.com/spinnaker/spinnaker/issues/6355](https://github.com/spinnaker/spinnaker/issues/6355)
Which was subsequently looking to be resolved with the following PR:[https://github.com/spinnaker/clouddriver/pull/5272](https://github.com/spinnaker/clouddriver/pull/5272)

