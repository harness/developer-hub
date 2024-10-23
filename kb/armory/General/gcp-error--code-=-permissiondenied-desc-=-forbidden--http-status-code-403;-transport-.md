---
title: GCP error- code = PermissionDenied desc = Forbidden- HTTP status code 403; transport-
---

## Issue
In this example, two clusters are operating, and one cluster has been working for a while.  The second cluster is newly created and runs on a separate Service Account.  When creating a new Google service account and associating it with Armory Agent, the new agent is not able to register with the ```gRPC``` ```server```, however the original cluster and Agent pair works without issue
A Terraform module was used to automate building a second service account and bind it to the Kubernetes service account for the agent, but a similar situation can happen in a manual process.  
When utilizing the newly-created service account to launch an agent service in a second cluster, the agent throws the following error:
```
time="2021-08-17T18:26:30Z" level=info msg="registration starting" func="armory/kubesvc/pkg/register.(*AgentRegistry).Run.func3" file="/workspace/pkg/register/registration.go:126" instanceId=.......
time="2021-08-17T18:26:30Z" level=info msg="registering with 1 kubernetes servers" func="armory/kubesvc/pkg/register.(*AgentRegistry).register" file="/workspace/pkg/register/registration.go:249" instanceId=.....
time="2021-08-17T18:26:30Z" level=info msg="stopping all tasks" func="armory/kubesvc/pkg/throttle.(*Throttler).StopAll" file="/workspace/pkg/throttle/throttler.go:234" instanceId=......
time="2021-08-17T18:26:30Z" level=warning msg="registration failed, restarting registrationb......" func="armory/kubesvc/pkg/register.(*AgentRegistry).logRegistrationErr" file="/workspace/pkg/register/registration.go:277" error="client error receiving ops: rpc error: code = PermissionDenied desc = Forbidden: HTTP status code 403; transport: received the unexpected content-type \"text/html; charset=UTF-8\"" instanceId=.....
```
In the example, the agent in the first cluster running under the original Google service account continues to work properly.  If the agent in the new cluster is deployed using the original service account, both agents work properly.  
If both agents services are adjusted to use the new service account, both fail. The Golang code that fetches the OIDC token appears to be working with both the new and old service account.  If run manually from a shell on the agent pod, it returns a valid token.
 

## Cause
The issue can be traced back to the GCP IAP settings and how they are used to authenticate the Agents to the Agent plugin endpoint. The error is due the way that the users have configured the new service accounts.
 
 
 

