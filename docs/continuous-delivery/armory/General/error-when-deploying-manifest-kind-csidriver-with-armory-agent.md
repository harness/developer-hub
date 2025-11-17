---
title: Error when deploying manifest kind CSIDriver with Armory Agent
---

## Issue
When Armory Agent is utilized in ***Service Mode*** on (Armory version: 2.26.0, Armory agent plugin version: 0.9.16 and Armory agent version: 0.6.0), it is observed that with a pipeline that deploys a manifest of kind ```CSIDriver```, the stage never finishes.
The following errors are seen in Clouddriver:

```12021-09-13 18:42:50.444 WARN 1 --- [.0-7002-exec-11] c.n.s.c.k.c.ManifestController : Failed to read manifest io.armory.kubesvc.services.ops.executor.KubesvcRuntimeException: Error occurred when Get CSIDriver/ebs.... default: (404: unknown kind CSIDriver in group for account ........eks)```

 
During the agent startup, CSIDriver is can be found under two agent groups, for example: ([storage.k8s.io/v1](http://storage.k8s.io/v1) and [storage.k8s.io/v1beta1)](http://storage.k8s.io/v1beta1)
time="2021-09-13T17:03:23Z" level=info msg="Kind: CSIDriver, Group: storage.k8s.io/v1, Resource=csidrivers" .....eks instanceId=.....
time="2021-09-13T17:03:23Z" level=info msg="Kind: CSIDriver, Group: storage.k8s.io/v1beta1, Resource=csidrivers" account=........-eks instanceId=......
 
However, the error seen during the deployment does not have any group tagged to it
time="2021-09-13T18:43:57Z" level=error msg="Error for operation ........with type Get and status 404: unknown kind CSIDriver in group  for account ......-eks" error="" instanceId=.....

In the situation, the manifest for CSIDriver that is being deployed has the correct group and the pipeline does not fail, but rather remains stuck until it reaches timeout.

## Cause
The error is due to Clouddriver not sending the ```group id``` in the response. 

