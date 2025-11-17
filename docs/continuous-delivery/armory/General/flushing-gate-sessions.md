---
title: Flushing Gate Sessions
---

## Introduction
Gate depends on Sprint Boot and Spring Session to manage its HTTP sessions. When Gate authenticates a user, this session is serialized and stored in Redis.
This serialization is dependent on the versions of Spring Boot and Spring Session.
When there is a new version of those dependencies, users encounter the following error when they try to log in:
```HTTP Status 500 - Internal Server Error```
Additionally, Deck redirects the browser to the Gate URL.To resolve the issue, perform one of the following actions:
* Remove the browser cookie for all users.* Flush all the stored Gate sessions and force users to log in again
While option 1 is simple, Armory recommends option 2 for deployments where there are a large number of users.

## Prerequisites
You must have network access to Redis and have the ```redis-cli``` installed. If you do not have the ```redis-cli``` already installed, below is the information about installing it.
Install and configure the debugging tool
Armory recommends using the [```armory/docker-debugging-tools```](https://github.com/armory/docker-debugging-tools) and deploying it into your Spinnaker namespace. This image contains ```redis-cli```. Run the following commands:
kubectl --context $MY_CONTEXT -n $MY_NAMESPACE apply -f https://raw.githubusercontent.com/armory/troubleshooting-toolbox/master/docker-debugging-tools/deployment.yml

kubectl --context $MY_CONTEXT -n $MY_NAMESPACE exec -it deploy/debugging-tools -- bash

## Instructions
Step 1. Find your Redis URL:
Run the following command to exec into the Gate pod:
```k --context $MY_CONTEXT -n $MY_NAMESPACE exec -it deploy/spin-gate -c gate -- cat /opt/spinnaker/config/spinnaker.yml | grep -A2 redis```
Capture the Redis url from the ```baseUrl``` field in the resulting output, it will look something like the following:
```
  redis:
    baseUrl: redis://my-redis-url.example.com:6379
    enabled: true
    host: 0.0.0.0
```
In this example, you would use ```my-redis-url.example.com```, without the protocol and port data.Then, run the following command in the pod you started in your cluster to flush the sessions:
```redis-cli -h my-redis-url.example.com keys 'spring:session:*' | xargs redis-cli -h my-redis-url.example.com del```

Step 2. Remove the debugging tools
When you are finished, you can remove the debugging tools by running the following command:
```kubectl --context $MY_CONTEXT -n $MY_NAMESPACE delete deployment debugging-tools```

