---
title: Task definition from a Github artifact does not replace task IAM role
---

## Issue
An organization deploying an application onto ECS using a task definition from a Github artifact may run into the following issue, depending on their corporate role policies.  
For security reasons, administrators may wish to limit IAM role access to maintain least-privilege access.  As a result, if users are launching an application using the same base container and definition, and use deployment tags to influence where the deployment will land, the different applications may require different IAM roles for access to the different deployment targets.
As an example, Spinnaker would discover the correct images in ECR using ```Find image from tags``` stages. However, it cannot replace the ```taskRoleArn``` within the artifact with a newly defined IAM role in Spinnaker.
 
As an example, the following ```taskRoleARN``` was set within the artifact itself.  
```"taskRoleArn": "arn:aws:iam::############:role/production/[ORG]/[ROLE]".```
After ingesting the artifact into Spinnaker, the stage within Spinnaker then attempts to set an ```iamRole``` value.  The expectation is that the ```taskRoleArn``` defined in the artifact would be replaced, thereby allowing the image to be deployed with a differing role depending on the application.
```"iamRole": "[ROLE]". ```
However, Spinnaker does not end up using the newly defined role, and instead continues to use the predefined ```taskRoleArn```.
 
 

## Cause
Clouddriver currently cannot modify IAM Roles when deploying from an artifact. The specific source code can be found here. 
[https://github.com/spinnaker/clouddriver/blob/10bba2d2e18506c3eebfd2e466cf0ee1d8a4c71e/clouddriver-ecs/src/main/java/com/netflix/spinnaker/clouddriver/ecs/deploy/ops/CreateServerGroupAtomicOperation.java#L421-L441](https://github.com/spinnaker/clouddriver/blob/10bba2d2e18506c3eebfd2e466cf0ee1d8a4c71e/clouddriver-ecs/src/main/java/com/netflix/spinnaker/clouddriver/ecs/deploy/ops/CreateServerGroupAtomicOperation.java#L421-L441)
This is the code for creating a task definition from an artifact, whereas the following code does the expected replacement when creating a task from the wizard.
[https://github.com/spinnaker/clouddriver/blob/10bba2d2e18506c3eebfd2e466cf0ee1d8a4c71e/clouddriver-ecs/src/main/java/com/netflix/spinnaker/clouddriver/ecs/deploy/ops/CreateServerGroupAtomicOperation.java#L307](https://github.com/spinnaker/clouddriver/blob/10bba2d2e18506c3eebfd2e466cf0ee1d8a4c71e/clouddriver-ecs/src/main/java/com/netflix/spinnaker/clouddriver/ecs/deploy/ops/CreateServerGroupAtomicOperation.java#L307)

