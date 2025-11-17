---
title: Kubernetes and Docker Accounts are not visible in Spinnaker Console UI
---

## Issue
Customers may find that when adding new Kubernetes accounts or new Docker Registry accounts and deploying the manifest, the accounts do not show up in the UI.
For Docker Registry accounts, they will show that the ```Registry Name``` is ```blank``` for possible options whenever referring to the account values:
For Kubernetes accounts, they will show that the ```Accounts``` field is ```blank``` for possible options whenever referring to the account values:
 
Attempting to access the Console UI with a new, flushed session (e.g in an Incognito Browser) and/or restarting services does not resolve the issue. The Clouddriver logs show that the account is not being picked up when restarting. For example the Kubernetes account ```test-aws-1``` or ```test-common``` for the Docker account are defined in the ```SpinnakerService``` custom resource, but are not visible in the logs.
````
2021-12-16 15:13:33.240  INFO 1 --- [           main] .....hikari.HikariDataSource       : tasks - Starting...

2021-12-16 15:13:33.267  INFO 1 --- [           main] c....hikari.HikariDataSource       : tasks - Start completed.

2021-12-16 15:13:34.914  INFO 1 --- [           main] c.n.s.c.security.ProviderUtils           : Adding accounts [docker-registry, ....registry, apm] of type DockerRegistryNamedAccountCredentials...

2021-12-16 15:13:35.619  INFO 1 --- [           main] c.n.spinnaker.cats.sql.cache.SqlCache    : Configured for kubernetes

2021-12-16 15:13:35.619  INFO 1 --- [           main] c.n.spinnaker.cats.sql.cache.SqlCache    : Configured for com.netflix.spinnaker.clouddriver.sql.SqlProvider
````

 
Similarly, the Clouddriver logs show that the Kubernetes accounts do not show ```test-aws-1```, but all other previously set accounts can be seen:
````
2021-12-16 15:13:35.619  INFO 1 --- [           main] ....spinnaker.cats.sql.cache.SqlCache    : Configured for kubernetes

2021-12-16 15:13:35.619  INFO 1 --- [           main] ....spinnaker.cats.sql.cache.SqlCache    : Configured for com.netflix.spinnaker.clouddriver.sql.SqlProvider

2021-12-16 15:13:35.619  INFO 1 --- [           main] c.n.spinnaker.cats.sql.cache.SqlCache    : Configured for com.netflix.spinnaker.clouddriver.sql.SqlProvider

2021-12-16 15:13:35.620  INFO 1 --- [           main] c.n.spinnaker.cats.sql.cache.SqlCache    : Configured for com.netflix.spinnaker.clouddriver.docker.registry.provider.DockerRegistryProvider

2021-12-16 15:13:35.620  INFO 1 --- [           main] c.n.spinnaker.cats.sql.cache.SqlCache    : Configured for com.netflix.spinnaker.clouddriver.core.provider.CoreProvider

.....
2021-12-16 15:13:38.714  INFO 1 --- [           main] .s.KubernetesCredentialsLifecycleHandler : Adding 2 agents for new account a-sandbox

2021-12-16 15:13:39.584  INFO 1 --- [           main] .s.KubernetesCredentialsLifecycleHandler : Adding 2 agents for new account b-stage
````


## Cause
This issue can stem from a number of reasons such as incorrect account configuration, insufficient permissions, or limits set at the namespace level.

