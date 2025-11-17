---
title: Accessing  Armory Scale Agent Endpoints to help in Troubleshooting
---

## Introduction
Customers using Armory Scale Agent for Kubernetes may encounter issues when running Kubernetes deployments.  The endpoints below can be used to diagnose and gain more information to aid in troubleshooting.  The following KB article explains how to access those endpoints.
Customers may also want to access the CloudDriver endpoints and dig into information that can be found there.  They can do so by following the information in this KB article:[https://support.armory.io/support?id=kb_article_view&sysparm_article=KB0010601](https://support.armory.io/support?id=kb_article_view&sysparm_article=KB0010601)

## Prerequisites
* Armory Enterprise Spinnaker with Armory Scale Agent for Kubernetes enabled.* Access to the cluster in which Agent is deployed.* Users would also require to port-forward the Agent pod to access the endpoints. The process to do so can be found below in the Instructions section.

## Instructions
**Port Forward to the Agent ports**
Customers will first need to set up a port forward to the Agent pod.  This can be accomplished by executing the below command. After running the command, the Clouddriver service will be accessible on ```localhost:8082 ```
```kubectl port-forward pod/armory-agent-xxx 8082```
**Get details about the Armory Agent account**
To get the details about the accounts that are configured in Armory Agent and if they were loaded after the Agent startup, invoke the below endpoint
```curl -kv http://localhost:8082/accounts/```
**Attain Agent goroutines **
Armory Agent is written in Golang. For troubleshooting purposes, it might be necessary to capture the list of ```goroutines``` that are run within the Agent to see if a particular function is being executed or not. Invoking the below endpoint would return the list of ```goroutines``` within Agent.
```curl -kv http://:8082/debug/pprof/goroutine?debug=1```

