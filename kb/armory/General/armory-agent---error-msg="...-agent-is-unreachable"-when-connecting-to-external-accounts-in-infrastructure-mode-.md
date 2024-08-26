---
title: Armory Agent - Error msg= "agent is unreachable" when Connecting to External Accounts in Infrastructure Mode 
---

## Issue
Customers may find the Armory Agent fails to connect to its partner Kubernetes cluster. When trying to onboard a new cluster with the Armory Agent running in ***infrastructure mode***, the Agent logs display the following:

```time="2021-06-03T15:38:06Z" level=error msg="...-agent is unreachable" error="dial tcp ...: connect: connection timed out"```

Utilizing the command directly in the Agent, customers will find the following:
```
....
* SSL certificate problem: unable to get local issuer certificate
* Closing connection 0
curl: (60) SSL certificate problem: unable to get local issuer certificate
More details here: https://curl.haxx.se/docs/sslcerts.html
...
```
Agent logs further show the following:
```
time="2021-06-08T17:10:35Z" level=info msg="connecting to spin-clouddriver-........."

time="2021-06-08T17:10:35Z" level=info msg="starting task runner"

time="2021-06-08T17:10:35Z" level=debug msg="attempting connection"

time="2021-06-08T17:10:35Z" level=info msg="connected to spin-clouddriver-......."

time="2021-06-08T17:10:35Z" level=info msg="connecting to Spinnaker: ...."

time="2021-06-08T17:10:35Z" level=info msg="registering with uuid: ...."

time="2021-06-08T17:14:56Z" level=error msg=".....gent is unreachable" error="dial tcp ......: connect: connection timed out"
```
 

## Cause
This is a known issue impacting older Agent versions in separate environments with external accounts.   The Agent isn't able to properly connect/authenticate with external environments, even though the credentials set should work across to external accounts..

