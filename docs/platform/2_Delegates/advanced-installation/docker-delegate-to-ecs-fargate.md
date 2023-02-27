---
title: Deploy a Docker delegate to Amazon ECS or AWS Fargate
description: Provides information and YAML for the installation of a delegate into an Amazon ECS or AWS Fargate cluster.
# sidebar_position: 2
---

# Deploy a Docker delegate to Amazon ECS or AWS Fargate

Harness Delegate carries out the tasks in your Continuous Integration (CI) and Continuous Delivery (CD) pipelines. The delegate is a software component that installs in your environment and registers with Harness Manager. The delegate connects to Harness Manager for the assignment and completion of CI/CD tasks.
You can use Harness NextGen to deploy a Docker delegate to Amazon Elastic Container Service (ECS) or AWS Fargate. This tutorial steps through the process of installing the delegate into an ECS cluster as an ECS service. The installed delegate connects to your AWS resources.

## Deploy a delegate to Amazon ECS 

Use the following steps to deploy a delegate to an Amazon ECS cluster. This process requires an immutable delegate.

### Create the cluster

Create an ECS cluster. Use an EC2 instance type with networking. 

For more information, see [EC2 instance types](https://aws.amazon.com/ec2/instance-types/) in the AWS documentation.

### Create the task definition

1. Copy the following task `spec` into a file. Save the file as task-spec.json.

```
  {
    "containerDefinitions": [
      {
        "portMappings": [
          {
            "hostPort": 8080,
            "protocol": "tcp",
            "containerPort": 8080
          }
        ],
        "cpu": 1,
        "environment": [
          {
            "name": "ACCOUNT_ID",
            "value": "<ACCOUNT_ID>"
          },
          {
            "name": "DELEGATE_TOKEN",
            "value": "<DELEGATE_TOKEN>"
          },
          {
            "name": "DELEGATE_TYPE",
            "value": "DOCKER"
          },
          {
            "name": "INIT_SCRIPT",
            "value": ""
          },
          {
            "name": "DEPLOY_MODE",
            "value": "KUBERNETES"
          },
          {
            "name": "MANAGER_HOST_AND_PORT",
            "value": "<MANAGER_HOST_AND_PORT>"
          },
          {
            "name": "DELEGATE_NAME",
            "value": "<DELEGATE_NAME>"
          },
         {
            "name": "LOG_STREAMING_SERVICE_URL",
            "value": "<LOG_STREAMING_SERVICE_URL>"
          },
         {
            "name": "DELEGATE_TAGS",
            "value": ""
          },

          {
            "name": "NEXT_GEN",
            "value": "true"
          }
        ],
        "memory": 2048,
        "image": "harness/delegate:22.12.77802",
        "essential": true,
        "hostname": "<DELEGATE_HOST>",
        "name": "<DELEGATE_NAME>"
      }
    ],
    "memory": "2048",
    "requiresCompatibilities": [
      "EC2"
    ],
  
    "cpu": "1024",
    "family": "harness-delegate-task-spec"
  }
```

2. Enter the fields of the task definition as follows:

   | **Field** | **Description** |
   | :-- | :-- |
   | `ACCOUNT_ID` | Your Harness account ID. |
   | `DELEGATE_TOKEN` | The delegate token stored in your Harness account. |
   | `MANAGER_HOST_AND_PORT` | Information about your manager host. This depends on the Harness production cluster you use: Prod1: https://app.harness.io, Prod2: https://app.harness.io/gratis, or Prod3: https://app3.harness.io. |
   | `DELEGATE_NAME` | The name you gave your delegate. This is usually the name you specified during delegate installation. |
   | `IMAGE` | Use the most recent delegate image from https://hub.docker.com/r/harness/delegate/{tags}. The correct image uses an image tag in the following format: `harness/delegate:yy.mm.xxxxx`. |
   | `LOG_STREAMING_SERVICE_URL` | The URL of your log streaming service. This depends on the Harness production cluster you use: Prod1: https://app.harness.io/log-service/, Prod2: https://app.harness.io/gratis/log-service/, or Prod3: https://app3.harness.io/log-service/. |


### Create your services

Use the following steps to create a service.

1. Open AWS CLI. Use the following instruction to create your AWS services:

   ```
   ecs create-service --service-name <SERVICE_NAME> --task-definition
   ```
   
   Replace `service-name` with the unique name of your service. Replace `task-definition` with the task definition that the service runs. 
   
   For information on the specification of ECS service parameters, see [`create-service`](https://docs.aws.amazon.com/cli/latest/reference/ecs/create-service.html).
   
2. Use the following instruction to increase the count of replica pods to the desired number:

   ```
   harness-delegate-task-spec --cluster <CLUSTER_NAME> --desired-count 1
   ```
   

## Deploy a delegate to Amazon Fargate

Use the following steps to deploy a delegate to an Amazon Fargate cluster. This process requires an immutable delegate.

### Create the cluster 

Create a cluster on Amazon Fargate. Use an instance type with networking.

For more information, see [EC2 instance types](https://aws.amazon.com/ec2/instance-types/) in the AWS documentation.

### Create the task definition

Use the following steps to create a task definition. For information about task definition in Amazon ECS, see [Task Definition Template](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task-definition-template.html).

1. Copy the following task `spec` into a file. Save the file as task-spec.json.

   ```
   {
      "containerDefinitions": [
        {
          "portMappings": [
            {
              "hostPort": 8080,
              "protocol": "tcp",
              "containerPort": 8080
            }
          ],
          "cpu": 1,
          "environment": [
           {
              "name": "ACCOUNT_ID",
              "value": "<ACCOUNT_ID>"
            },
            {
              "name": "DELEGATE_TOKEN",
              "value": "<DELEGATE_TOKEN>"
            },
            {
              "name": "DELEGATE_TYPE",
              "value": "DOCKER"
            },
            {
              "name": "LOG_STREAMING_SERVICE_URL",
              "value": "<LOG_STREAMING_SERVICE_URL>"
            },
            {
              "name": "DELEGATE_TAGS",
              "value": ""
            },
            {
              "name": "INIT_SCRIPT",
              "value": ""
            },
            {
              "name": "DEPLOY_MODE",
              "value": "KUBERNETES"
            },
            {
              "name": "MANAGER_HOST_AND_PORT",
              "value": "<HOST>"
            },
            {
              "name": "DELEGATE_NAME",
              "value": "<DELEGATE_NAME>"
            },
            {
              "name": "NEXT_GEN",
              "value": "true"
            }
          ],
         "memory": 2048,
         "image": "harness/delegate:22.12.77802",
         "essential": true,
         "name": "ecs-delegate-im"
        }
      ],
      "executionRoleArn": "arn:aws:iam::<ACC_ID>:role/ecsTaskExecutionRole",
      "memory": "6144",
      "requiresCompatibilities": [
        "FARGATE"
      ],
      "networkMode": "awsvpc",
      "cpu": "1024",
      "family": "harness-delegate-task-spec"
    }
    ```

2. Edit the fields of the task definition as follows.

   | **Field** | **Description** |
   | :-- | :-- |
   | `ACCOUNT_ID` | Your Harness account ID. |
   | `DELEGATE_TOKEN` | The delegate token stored in your Harness account. |
   | `MANAGER_HOST_AND_PORT` | Information about your manager host. This depends on the Harness production cluster you use: Prod1: https://app.harness.io, Prod2: https://app.harness.io/gratis, or Prod3: https://app3.harness.io. |
   | `DELEGATE_NAME` | The name you gave your delegate. This is usually the name you specified during delegate installation. |
   | `IMAGE` | Use the most recent delegate image from https://hub.docker.com/r/harness/delegate/{tags}. The correct image uses an image tag in the following format: `harness/delegate:yy.mm.xxxxx`. |
   | `LOG_STREAMING_SERVICE_URL` | The URL of your log streaming service. This depends on the Harness production cluster you use: Prod1: https://app.harness.io/log-service/, Prod2: https://app.harness.io/gratis/log-service/, or Prod3: https://app3.harness.io/log-service/. |

### Create the service

1. Edit the service.json file as follows:

   ```
   {
      "launchType": "FARGATE",
      "cluster": "<CLUSTER_NAME>",
      "serviceName": "<SERVICE_NAME>",
      "taskDefinition": "harness-delegate-task-spec",
      "desiredCount": 1,
      "loadBalancers": [],
      "networkConfiguration": {
        "awsvpcConfiguration": {
          "subnets": [
            "<SUBNET>"
          ],
          "securityGroups": [
            "SEC_GROUP"
          ],
          "assignPublicIp": "ENABLED"
        }
      },
      "platformVersion": "LATEST",
      "schedulingStrategy": "REPLICA",
      "enableECSManagedTags": true
    }
   ```
   
 2. After the service is created and modified, use the JSON files to register the task and service definitions.
 
 3. From AWS CLI, use the following instruction to register the task definition:
 
    ```
    aws ecs registger-task-definition --cli-input-json file://task-spec.json
    ```
    
 4. Then register the service definition:
 
    ```
    aws ecs create-service --cli-input-json file://service.json
    ```
