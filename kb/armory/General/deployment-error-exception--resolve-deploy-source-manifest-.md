---
title: Deployment error Exception ( Resolve Deploy Source Manifest )
---

## Issue
The following error may be observed on a particular single application in a deployment. This error may not appear in all applications in an environment.
 
The error indicates:

```
Exception (Resolve Deploy Source Manifest)
Failure evaluating manifest expressions:
{CONSUL_FULLNAME=""
exec /bin/consul agent
-node="NODE"
-advertise="ADVERTISE_IP"
-bind=0.0.0.0
-client=0.0.0.0
-node-meta=pod.name:HOSTNAME
-hcl='leave_on_terminate=true'
-hcl='ports{grpc=}'
-config-dir=/consul/config
-config-dir=/consul/aclconfig
-datacenter=
-data-dir=/
-encrypt="....."
-retry-join=""
```
The following screen shows the error in the UI:

## Cause
Spinnaker ships with a template parser, and so it needs to escape template expressions of the form ```$(..}```.
After ***OSS 1.13***, there was an addition the Manifest expression evaluation feature. This addition prevents Spinnaker from evaluating ```${}```-wrapped expressions within the ```Deploy (Manifest)``` stage by default. 
Further details are available in: [https://github.com/spinnaker/deck/pull/6696](https://github.com/spinnaker/deck/pull/6696)````````````


