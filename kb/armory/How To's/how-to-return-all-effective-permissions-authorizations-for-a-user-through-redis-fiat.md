---
title: How to Return All Effective Permissions/Authorizations for a User Through Redis/Fiat
---

## Introduction
In some situations, it can be useful to investigate and audit a user's effective permissions and authorizations.  This can be accomplished in multiple ways.  One of the ways is to query Redis via FiatFor example, in the cases Redis is being used with Spinnaker, these permissions are stored under the following keys ```spinnaker:fiat:permissions::``` and stored as a hash with the following info:
* ```key``` = name of the resource (e.g. name of the app)* ```value``` = ```{"name": , "permissions": { : [list of roles] } }```

## Prerequisites
Fiat (authorization) service should enabled and running properly, as well as Redis

## Instructions
1. Exec into Redis pod (```kubectl exec  -it sh```)
2. Once inside the Redis pod, run the command ```redis-cli```.
3. Then, once inside the redis-cli shell, run the below command to return the stored hash:

```HGETALL spinnaker:fiat:permissions::applications```

HGETALL is a Redis command returns all fields and values of the hash stored at ```key```. 

For example, on __unrestricted_user__:
```
HGETALL spinnaker:fiat:permissions:__unrestricted_user__:applications
"app1" 
"{\n  \"name\" : \"app1\",\n  \"permissions\" : { }\n}"
"ncecs"
"{\n  \"name\" : \"app2\",\n  \"permissions\" : { }\n}"
"cam"
"{\n  \"name\" : \"app3\",\n  \"permissions\" : { }\n}"
```
Another example, poll the permissions for user "brian":
```
127.0.0.1:6379> HGETALL spinnaker:fiat:permissions:brian:applications
"BRIANAPPLICATION"
"{\n  \"name\" : \"BRIANAPPLICATION\",\n  \"permissions\" : {\n    \"READ\" : [ \"baz\" ],\n    \"WRITE\" : [ \"baz\" ],\n    \"EXECUTE\" : [ \"baz\" ]\n  },\n  \"details\" : {\n    \"instancePort\" : 80,\n    \"lastModifiedBy\" : \"brian\",\n    \"createTs\" : \"1586446405209\",\n    \"cloudProviders\" : \"aws,kubernetes\",\n    \"providerSettings\" : {\n      \"aws\" : {\n        \"useAmiBlockDeviceMappings\" : false\n      }\n    },\n    \"updateTs\" : \"1603129132000\",\n    \"user\" : \"brian\",\n    \"dataSources\" : {\n      \"disabled\" : [ ],\n      \"enabled\" : [ \"canaryConfigs\" ]\n    },\n    \"email\" : \"brian@armory-test.io\",\n    \"trafficGuards\" : [ ]\n  }\n}"
127.0.0.1:6379> 
```
