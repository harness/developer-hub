---
title: Container Image cannot be selected
---

## Issue
A pipeline has been configured to deploy a service to an ECS cluster within an AWS account. Upon defining a server group in the pipeline using ```inputs```, the Configure Deployment Cluster form is not able to retrieve any of the container images available as per the screenshot belowThe Spinnaker Managed Role has an ECR Read Only policy attached, and supports the ECR repositories on the same account.
The Clouddriver logs show that the aws, ecs and ecr account are caching but the images do not populate in the UI.
2021-08-24 16:22:55.235  INFO 1 --- [           main] c.n.s.c.security.ProviderUtils           : Adding accounts [........, ........,......... ]of type NetflixAmazonCredentials...
2021-08-24 16:22:56.498  INFO 1 --- [           main] c.n.s.c.security.ProviderUtils           : Adding accounts [......-ecr] of type DockerRegistryNamedAccountCredentials...
2021-08-24 16:24:02.186  INFO 1 --- [ecutionAction-0] .d.r.p.a.DockerRegistryImageCachingAgent : Describing items in .......-ecr/DockerRegistryImageCachingAgent[2/3]
2021-08-24 16:24:02.219  INFO 1 --- [ecutionAction-0] .d.r.p.a.DockerRegistryImageCachingAgent : Caching 3 tagged images in ........ecr/DockerRegistryImageCachingAgent[2/3]
2021-08-24 16:24:02.219  INFO 1 --- [ecutionAction-0] .d.r.p.a.DockerRegistryImageCachingAgent : Caching 3 image ids in .......-ecr/DockerRegistryImageCachingAgent[2/3]
....

## Cause
The issue can be traced back to the following exceptions that can be found in the CloudDriver and Gate logs, indicating the issue has to do with Hystrix.  Hystrix has been removed from Spinnaker OSS as of 2.24.x
Clouddriver:
```
2021-08-24 11:42:56.529 ERROR 1 --- [.0-7002-exec-10] c.n.s.k.w.e.GenericExceptionHandlers     : Internal Server Errororg.codehaus.groovy.runtime.typehandling.GroovyCastException: Cannot cast object 'com.netflix.spinnaker.clouddriver.aws.security.NetflixAssumeRoleAmazonCredentials@.... with class 'com.netflix.spinnaker.clouddriver.aws.security.NetflixAssumeRoleAmazonCredentials' to class 'com.netflix.spinnaker.clouddriver.docker.registry.security.DockerRegistryNamedAccountCredentials'
    at org.codehaus.groovy.runtime.typehandling.DefaultTypeTransformation.continueCastOnSAM(DefaultTypeTransformation.java:415) ~[groovy-2.5.10.jar:2.5.10]
    at org.codehaus.groovy.runtime.typehandling.DefaultTypeTransformation.continueCastOnNumber(DefaultTypeTransformation.java:329) ~[groovy-2.5.10.jar:2.5.10]
    at org.codehaus.groovy.runtime.typehandling.DefaultTypeTransformation.castToType(DefaultTypeTransformation.java:243) ~[groovy-2.5.10.jar:2.5.10]
    at org.codehaus.groovy.runtime.ScriptBytecodeAdapter.castToType(ScriptBytecodeAdapter.java:615) ~[groovy-2.5.10.jar:2.5.10]
    at com.netflix.spinnaker.clouddriver.docker.registry.controllers.DockerRegistryImageLookupController$_find_closure5.doCall(DockerRegistryImageLookupController.groovy:104) ~[clouddriver-docker-GCSFIX.jar:na]
******
```
Gate:
```
2021-07-24 11:42:42.213  INFO 1 --- [etricService-10] c.n.s.g.s.internal.ClouddriverService    :  HTTP GET 
2021-07-24 11:42:42.224  INFO 1 --- [overyService-10] c.n.s.g.s.internal.ClouddriverService    : ---> HTTP GET 
2021-07-24 11:42:42.227  INFO 1 --- [ecretService-10] c.n.s.g.s.internal.ClouddriverService    :  HTTP GET 
2021-07-24 11:42:42.586  INFO 1 --- [loadBalancers-8] c.n.s.g.s.internal.ClouddriverService    : ---> HTTP GET 
2021-07-24 11:42:42.603  INFO 1 --- [.0-8084-exec-17] c.n.s.g.s.internal.ClouddriverService    : ---> HTTP GET 
2021-07-24 11:42:42.640  INFO 1 --- [.0-8084-exec-17] c.n.s.g.s.internal.ClouddriverService    :  HTTP GET 
2021-07-24 11:42:42.662  INFO 1 --- [-roleService-10] c.n.s.g.s.internal.ClouddriverService    : ---> HTTP GET 
2021-07-24 11:42:42.667  INFO 1 --- [etricService-10] c.n.s.g.s.internal.ClouddriverService    : ---> HTTP GET 
2021-07-24 11:42:42.669  INFO 1 --- [ecretService-10] c.n.s.g.s.internal.ClouddriverService    : ---> HTTP GET 
2021-07-24 11:42:42.673  INFO 1 --- [overyService-10] c.n.s.g.s.internal.ClouddriverService    : ---> HTTP GET 
2021-07-24 11:42:42.680  INFO 1 --- [-roleService-10] c.n.s.g.s.internal.ClouddriverService    : 
```
