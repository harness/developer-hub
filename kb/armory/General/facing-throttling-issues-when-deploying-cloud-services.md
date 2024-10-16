---
title: Facing Throttling Issues when Deploying Cloud Services
---

## Issue
Customers can be facing throttling issues when deploying services to AWS Cloud.  Throttling exception errors can be found in Spinnaker logs.Error example:
```ERROR: Exception ( Monitor Deploy ) Rate exceeded (Service: AmazonElasticLoadBalancing; Status Code: 400; Error Code: Throttling; Request ID: 723d8890-d134-4744-b2ea-36dd5537e428)```

## Cause
The polling can cause cloud providers, such as AWS, to throttle the requests on the account.If the environment has a large number of Auto-Scaling Groups and Elastic Load Balancers in the account or other services commonly querying the same APIs then it is expected to see throttling exceptions in the Spinnaker logs.

