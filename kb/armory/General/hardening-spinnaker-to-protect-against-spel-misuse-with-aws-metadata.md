---
title: Hardening Spinnaker to Protect Against SPEL Misuse with AWS Metadata
---

## Issue
[SPEL expressions](https://spinnaker.io/docs/guides/user/pipeline/expressions/) are a useful feature which many customers use in Armory Enterprise.  They allow customers to resolve dynamic values at pipeline execution time, but as with many tools, it is possible that it can be misused. 
The following are suggestions for a customer to harden their environment against misuse of SPEL expressions in Armory Enterprise to talk with the AWS Metadata services

## Cause
An example of misusing SPEL expressions would involve having **an attacker with enough privilege to craft a pipeline that can evaluate SPEL expressions to talk to the AWS metadata service**. 
If an environment is left open, users can possibly attain the AWS credentials for the role that Spinnaker uses, thereby gaining the same permissions the hosts have running Spinnaker.  
Since Spinnaker itself often requires elevated permissions for a given environment, the actor will then be able to take the same action Spinnaker can with an AWS account.

