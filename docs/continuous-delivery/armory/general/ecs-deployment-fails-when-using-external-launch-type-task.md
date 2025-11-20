---
title: ECS Deployment fails when using EXTERNAL launch type Task
---

## Issue
Users automating Amazon Elastic Container Services (ECS) cannot deploy and may see errors from Clouddriver. The logs may indicate caching cycle failures when a Service in the ECS account with deployment type EXTERNAL is defined with ```taskSets```, and Spinnaker retrieves an empty ```TaskDefinitionArn```, which doesn’t ignore and tries to describe it continuously and causes this failure:
``` 'com.amazonaws.services.ecs.model.InvalidParameterException: Task Definition can not be blank. (Service: AmazonECS; Status Code: 400; Error Code: InvalidParameterException; Request ID: fcf39ec3-0e98-48f3-bb40-8b6ab19a7be5; Proxy: null)' ```
 

## Cause
There's a reported** issue** in OSS Spinnaker where the ECS provider causes the caching agent to fail when an ACTIVE service is defined with an EXTERNAL launch type. The error occurs when calling a task definition** **because there is no task definition** **but uses the taskSet field. 
This is the sample service definition:
```
{
    "services": [
        {
            "serviceArn": "arn:aws:ecs:us-east-1:xxxxxxxxxxxx:service/test-cluster/test",
            "serviceName": "test",
            "clusterArn": "arn:aws:ecs:us-east-1:xxxxxxxxxxxx:cluster/test-cluster",
            "loadBalancers": [],
            "serviceRegistries": [],
            "status": "ACTIVE",
            "desiredCount": 1,
            "runningCount": 0,
            "pendingCount": 0,
            "launchType": "EC2",
            "deploymentConfiguration": {
                "maximumPercent": 200,
                "minimumHealthyPercent": 100
            },
            "taskSets": [],
            "deployments": [],
            "roleArn": "arn:aws:iam::xxxxxxxxxxxx:role/aws-service-role/ecs.amazonaws.com/AWSServiceRoleForECS",
            "events": [],
            "createdAt": 1640098677.085,
            "placementConstraints": [],
            "placementStrategy": [],
            "schedulingStrategy": "REPLICA",
            "deploymentController": {
                "type": "EXTERNAL"
            },
            "createdBy": "arn:aws:iam::xxxxxxxxxxxx:role/admin",
            "enableECSManagedTags": false,
            "propagateTags": "NONE",
            "enableExecuteCommand": false
        }
    ],
    "failures": []
}
```
