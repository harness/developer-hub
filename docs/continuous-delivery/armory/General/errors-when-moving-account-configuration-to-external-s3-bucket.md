---
title: Errors when moving account configuration to external S3 bucket
---

## Issue
When attempting to move Kubernetes accounts from Halyard config file to an external file in AWS S3 bucket (ref: [https://spinnaker.io/docs/setup/other_config/configuration/#external-account-configuration](https://spinnaker.io/docs/setup/other_config/configuration/#external-account-configuration%29)) the accounts defined in the external ```.yml``` file are not loaded successfully.
The following example error is seen in the UI:
 "credentials not found (name: ....)") when deploying app into the namespace of "...". 

 
Clouddriver logs show the following:
```2021-08-01 22:10:16.334  INFO 1 --- [ecutionAction-5] c.n.s.c.k.s.KubernetesCredentials        : Kind apiService will not be cached in account 'spinnaker-test' because it cannot be listed.```

## Cause
Utilizing dynamic account configuration with Spring Cloud Config Server is not the recommended workflow.
 
The following document notes that: *Armory does not support using dynamic account configuration with Spring Cloud Config Server:*[https://docs.armory.io/docs/feature-status/armory-enterprise-matrix/armory-enterprise-matrix-2-26/#dynamic-accounts](https://docs.armory.io/docs/feature-status/armory-enterprise-matrix/armory-enterprise-matrix-2-26/#dynamic-accounts)




