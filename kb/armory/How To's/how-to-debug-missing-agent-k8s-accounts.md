---
title: How to debug missing Agent K8s accounts
---

## Introduction
This document is addressing a recurring problem with our customers for a while now.
With multiple root causes possible, the goal of this document is to underline the best practices when debugging the Armory Scale Agent issues for our customers.

## Prerequisites
* Scale Agent configured.* Spinnaker configured with FIAT.

## Instructions
Agent K8s accounts can be configured in two ways:
* with a kubeconfig file* with a service account
If the kubeconfig file is mangled/broken or the service account does not exist, the agent will not pick up the config, and the accounts will not appear in the UI.
A good starting point, if possible, is to emulate the connection to the K8s cluster with the kubeconfig file itself to validate the kubeconfig file via the CLI.
Kubeconfig files are not usually stored locally, so a prerequisite is to first get a copy from the location where it is stored (AWS S3, Secrets Manager, etc.)
```kubectl --kubeconfig /custom/path/kube.config get pods```
This is a small differential test to check the validity of the Kubeconfig file.If the syntax of the kubeconfig file is not valid, the agent will not pick up the k8s account, and the above command should fail.
Alternatively, if the account is provisioned with a service account in FIAT, we can easily check the permissions and existence of the service accounts by following the steps described here: [Fiat Deep Dive](https://www.notion.so/Fiat-Deep-Dive-fa22c0ea51174585859310eed9b72b5c)If the above investigation is inconclusive, we can leverage the endpoints of the services starting from (1) Scale Agent, (2) Clouddriver and then (3) Gate
**Scale Agent:**
Access the below endpoint on the Scale Agent to see if the account is onboarded successfully on the agent.
``````curl -kv [http://localhost:8082/accounts/](http://localhost:8082/accounts/)``````
```The output shall look similar to this:```
**Clouddriver:**
If the account is found to be registered and available on the Scale Agent endpoint above, the next step is to check the endpoints exposed by the clouddriver agent plugins. The endpoint in the command below should help with listing the agents and the accounts these agents hold:
``````curl -kv [http://localhost:7002/armory/agents](http://localhost:7002/armory/agents)``````
The output of the above API shall look something like below

**Gate:**Once the accounts show up in the above endpoints, the next step is to check that Gate endpoints as shown below:
```GATE_URL/credentials```
This will return a JSON with all the provisioned accounts successfully ingested.
Example:

 
If the name of the Kubernetes account defined is not present, then the problem is at the configuration level.
If the account is present in the credentials endpoint but has the tag ```authorized: false``` then the problem is at the permissions level provided by OAuth for the current logged in user.
Usually the permissions for the account do not match the FIAT permissions on the service account.
To get a list of allowed accounts for the current user alongside more information about the current logged in user we can try to check the Gate endpoint:
```http://GATE_URL/auth/user```
 
A sample user account endpoint JSON: 

 
 
 

