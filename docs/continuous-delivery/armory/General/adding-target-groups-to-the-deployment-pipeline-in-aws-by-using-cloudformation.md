---
title: Adding Target Groups to the Deployment Pipeline in AWS by Using CloudFormation
---

## Introduction
Users may find a need to add additional target groups or listeners to their Load Balancers and then use those resources when then deploying an AWS resource for example, an EC2 instance
In this situation, Spinnaker does not have a native stage to define all these resources.  Instead, users should leverage infrastructure tools such as CloudFormation, Terraform, Jenkins, or even a Runjob to do the deployment of the AWS resources and then leverage Spinnaker to ingest that information into the deployment stage.  
There are several approaches to this general idea.  
* As a part of the pipeline, before the deploy stage, create the resources (Target Group and Listeners) and then pass this information via a Spinnaker property, so that the Deploy Stage can ingest it as a SPEL Function 
* Create the final resource first in the Deploy Stage, and then modify it with the Target Group and Listeners afterwards with additional stages
* For simplicity sake, it is suggested to create the resources first so that they can be used as a part of the deployment


## Prerequisites
AWS permissions should be provided before hand so that users can create resources as needed.  

## Instructions
There are severals ways to approach the creation of the Target Group and Application Load Balancer Listener, but there are no specific stages to handle this creation.  Instead, customers can leverage using Jenkins, Terraform, or CloudFormation scripts to create this infrastructure to pass on to the Deployment Stage.
The Runjob/CloudFormation/Terraform Stage should output the information about the Target Group as a Spinnaker Property, so it can be used in the Deploy Stage. If there is more than one Target group that needs to be referenced, customers can instead use Spinnaker Config JSON.
Customers can then use [SPEL (Spinnaker Pipeline Expression Language)](https://docs.armory.io/docs/spinnaker-user-guides/expression-language/) to then ingest any of this information and interpret it for the purpose of deploying the instances
For the example below, we will use [CloudFormation to create the Target Group and Listener resources](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/AWS_ElasticLoadBalancingV2.html)
Below is the sample Pipeline we will be using, and we will be breaking down the stages to explain the logic
```
{
  "description": "Create ALB target group dynamically and deploy an instance to it.",
  "keepWaitingPipelines": false,
  "lastModifiedBy": "admin",
  "limitConcurrent": true,
  "parameterConfig": [
    {
      "default": "arn:aws:",
      "description": "ARN of ALB",
      "hasOptions": false,
      "label": "",
      "name": "ALB",
      "options": [
        {
          "value": ""
        }
      ],
      "pinned": true,
      "required": true
    },
    {
      "default": "",
      "description": "VPC ID of the ALB",
      "hasOptions": false,
      "label": "",
      "name": "VPC",
      "options": [
        {
          "value": ""
        }
      ],
      "pinned": true,
      "required": true
    }
  ],
  "spelEvaluator": "v4",
  "stages": [
    {
      "clusters": [
        {
          "account": "",
          "availabilityZones": {
            "us-east-1": [
              "us-east-1a",
              "us-east-1b",
              "us-east-1c",
              "us-east-1d",
              "us-east-1e",
              "us-east-1f"
            ]
          },
          "capacity": {
            "desired": 1,
            "max": 1,
            "min": 1
          },
          "cloudProvider": "aws",
          "cooldown": 10,
          "copySourceCustomBlockDeviceMappings": false,
          "ebsOptimized": false,
          "enabledMetrics": [],
          "freeFormDetails": "test",
          "healthCheckGracePeriod": 600,
          "healthCheckType": "ELB",
          "iamRole": "BaseIAMRole",
          "instanceMonitoring": false,
          "instanceType": "t3.nano",
          "keyPair": "",
          "loadBalancers": [],
          "moniker": {
            "app": "awstest",
            "detail": "test",
            "stack": "dyn"
          },
          "provider": "aws",
          "securityGroups": [
            "",
            ""
          ],
          "spelLoadBalancers": [],
          "spelTargetGroups": [
            "${dynTargetGroup}"
          ],
          "spotPrice": "",
          "stack": "dyn",
          "strategy": "highlander",
          "subnetType": "",
          "suspendedProcesses": [],
          "tags": {
            "Name": "",
            "owner": ""
          },
          "targetGroups": [
            "${dynTargetGroup}"
          ],
          "targetHealthyDeployPercentage": 100,
          "terminationPolicies": [
            "Default"
          ],
          "useAmiBlockDeviceMappings": false
        }
      ],
      "name": "Deploy Dyn Target Group",
      "refId": "1",
      "requisiteStageRefIds": [
        "5"
      ],
      "type": "deploy"
    },
    {
      "baseLabel": "release",
      "baseName": "nginx-test",
      "baseOs": "focal",
      "cloudProviderType": "aws",
      "extendedAttributes": {
        "aws_associate_public_ip_address": "false",
        "aws_ena_support": "true"
      },
      "name": "Bake",
      "package": "nginx",
      "refId": "2",
      "regions": [
        "us-east-1"
      ],
      "requisiteStageRefIds": [],
      "storeType": "ebs",
      "type": "bake",
      "user": "admin",
      "vmType": "hvm"
    },
    {
      "credentials": "",
      "name": "Deploy CF",
      "parameters": {
        "ALB": "${parameters.ALB}",
        "VPC": "${parameters.VPC}"
      },
      "refId": "4",
      "regions": [
        "us-east-1"
      ],
      "requisiteStageRefIds": [
        "2"
      ],
      "source": "text",
      "stackName": "",
      "tags": {
        "owner": ""
      },
      "templateBody": "AWSTemplateFormatVersion: \"2010-09-09\"\nDescription: \"Create ALB target groups and listeners\"\nParameters:\n    VPC:\n        Type: String\n        Description: The vpc to launch the service\n        Default: vpc-ID\n\n    ALB:\n        Type: String\n        Description: The ARN of the Application LoadBalancer\n        Default: alb-arn\n\n\nResources:\n    HTTPListener:\n        Type: \"AWS::ElasticLoadBalancingV2::Listener\"\n        Properties:\n            LoadBalancerArn: !Ref ALB\n            Port: 80\n            Protocol: \"HTTP\"\n            DefaultActions: \n              - \n                Order: 1\n                TargetGroupArn: !Ref TargetGroup\n                Type: \"forward\"\n                                           \n    TargetGroup:\n        Type: \"AWS::ElasticLoadBalancingV2::TargetGroup\"\n        Properties:\n            HealthCheckIntervalSeconds: 30\n            HealthCheckPath: \"/\"\n            Port: 80\n            Protocol: \"HTTP\"\n            HealthCheckPort: \"traffic-port\"\n            HealthCheckProtocol: \"HTTP\"\n            HealthCheckTimeoutSeconds: 5\n            UnhealthyThresholdCount: 2\n            TargetType: \"instance\"\n            Matcher: \n                HttpCode: \"200\"\n            HealthyThresholdCount: 5\n            VpcId: !Ref VPC\n            Name: \"awstest-dyn-test-tg1\"\n            HealthCheckEnabled: true\n            TargetGroupAttributes: \n              - \n                Key: \"stickiness.enabled\"\n                Value: \"false\"\n              - \n                Key: \"deregistration_delay.timeout_seconds\"\n                Value: \"300\"\n              - \n                Key: \"stickiness.type\"\n                Value: \"lb_cookie\"\n              - \n                Key: \"stickiness.lb_cookie.duration_seconds\"\n                Value: \"86400\"\n              - \n                Key: \"slow_start.duration_seconds\"\n                Value: \"0\"\n              - \n                Key: \"load_balancing.algorithm.type\"\n                Value: \"round_robin\"\n\n \nOutputs:        \n    ALB:\n        Description: ALB ARN\n        Value: !Ref ALB\n\n    TargetGroup:\n        Description: The created TargetGroup\n        Value: !GetAtt TargetGroup.TargetGroupName\n",
      "type": "deployCloudFormation"
    },
    {
      "failOnFailedExpressions": true,
      "name": "Evaluate Variables",
      "refId": "5",
      "requisiteStageRefIds": [
        "4"
      ],
      "type": "evaluateVariables",
      "variables": [
        {
          "key": "dynTargetGroup",
          "value": "${#stage(\"Deploy CF\").outputs.outputs.TargetGroup}"
        }
      ]
    }
  ],
  "triggers": [],
  "updateTs": "1619037264000"
}
```
Below is an overall look of stages of the pipeline.  We will be skipping ahead from the Configuration and Bake stages, and pick this up from the Deploy CloudFormation Stage


### Deploy CloudFormation Stage
The below Deploy CloudFormation Stage deploys the AWS resources, specifically in this example, changes to the ```Target Group```.  The CloudFormation can also be modified to adapt for new listeners and any other adjustments, but for the purposes of this example, it is deploy a ```Target Group```
* The stage defines several input parameters.  Input information required are the ALB and the VPC information as ARNs* ```TargetGroups``` and ```ALB``` are the defined Outputs from this current stage to be sent to the next stages in the pipeline.  If additional items are defined and need to be passed on (e.g. additional Load Balancers) they will also need to be added to the Output section.
Sample Code:
```
{
  "credentials": "",
  "name": "Deploy CF",
  "parameters": {
    "ALB": "${parameters.ALB}",
    "VPC": "${parameters.VPC}"
  },
  "regions": [
    "us-east-1"
  ],
  "source": "text",
  "stackName": "",
  "tags": {
    "owner": ""
  },
  "templateBody": "AWSTemplateFormatVersion: \"2010-09-09\"\nDescription: \"Create ALB target groups and listeners\"\nParameters:\n    VPC:\n        Type: String\n        Description: The vpc to launch the service\n        Default: vpc-ID\n\n    ALB:\n        Type: String\n        Description: The ARN of the Application LoadBalancer\n        Default: alb-arn\n\n\nResources:\n    HTTPListener:\n        Type: \"AWS::ElasticLoadBalancingV2::Listener\"\n        Properties:\n            LoadBalancerArn: !Ref ALB\n            Port: 80\n            Protocol: \"HTTP\"\n            DefaultActions: \n              - \n                Order: 1\n                TargetGroupArn: !Ref TargetGroup\n                Type: \"forward\"\n                                           \n    TargetGroup:\n        Type: \"AWS::ElasticLoadBalancingV2::TargetGroup\"\n        Properties:\n            HealthCheckIntervalSeconds: 30\n            HealthCheckPath: \"/\"\n            Port: 80\n            Protocol: \"HTTP\"\n            HealthCheckPort: \"traffic-port\"\n            HealthCheckProtocol: \"HTTP\"\n            HealthCheckTimeoutSeconds: 5\n            UnhealthyThresholdCount: 2\n            TargetType: \"instance\"\n            Matcher: \n                HttpCode: \"200\"\n            HealthyThresholdCount: 5\n            VpcId: !Ref VPC\n            Name: \"awstest-dyn-test-tg1\"\n            HealthCheckEnabled: true\n            TargetGroupAttributes: \n              - \n                Key: \"stickiness.enabled\"\n                Value: \"false\"\n              - \n                Key: \"deregistration_delay.timeout_seconds\"\n                Value: \"300\"\n              - \n                Key: \"stickiness.type\"\n                Value: \"lb_cookie\"\n              - \n                Key: \"stickiness.lb_cookie.duration_seconds\"\n                Value: \"86400\"\n              - \n                Key: \"slow_start.duration_seconds\"\n                Value: \"0\"\n              - \n                Key: \"load_balancing.algorithm.type\"\n                Value: \"round_robin\"\n\n \nOutputs:        \n    ALB:\n        Description: ALB ARN\n        Value: !Ref ALB\n\n    TargetGroup:\n        Description: The created TargetGroup\n        Value: !GetAtt TargetGroup.TargetGroupName\n",
  "type": "deployCloudFormation"
}
```
### Evaluate Variables Stage
The below Evaluate Variable Stage takes the output from the previous stage, specifically the ```Target Group``` and makes it available for the upcoming stage for deployment.  
* The ```Target Group``` is being passed by the previous CloudFormation stage and being interpreted by this stage and allowing it to be referred by the key ```dynTargetGroup``` in this example.  * If additional outputs are sent, they should be added to this stage and evaluated as a separate variable (e.g., If listeners are being created and need to be referred to later, they will also need to be added as separate entries)* The reason why the variables need to be evaluated are so that they can be ingested in the Deploy Stage. Directly providing the value ```${#stage("Deploy CF").outputs.outputs.TargetGroup}``` in the deploy stage will fail
Sample Stage:
```
{
  "failOnFailedExpressions": true,
  "name": "Evaluate Variables",
  "type": "evaluateVariables",
  "variables": [
    {
      "key": "dynTargetGroup",
      "value": "${#stage(\"Deploy CF\").outputs.outputs.TargetGroup}"
    }
  ]
}
```
### Deploy Resource into Dynamic Target Group Stage
The below stage now will deploy the image from the Bake Stage into the Target Group that was created.  
* The section that contains ```spelTargetGroups``` injests the defined variable from the previous stage.  The ```targetGroups``` declaration also contains the variable as a deployment target for the created resource* If a user wants to define the LoadBalancer, they can also use ```spelLoadBalancers``` and ```loadBalancers``` definitions in a similar manner
```
{
  "clusters": [
    {
      "account": "",
      "application": "awstest",
      "availabilityZones": {
        "us-east-1": [
          "us-east-1a",
          "us-east-1b",
          "us-east-1c",
          "us-east-1d",
          "us-east-1e",
          "us-east-1f"
        ]
      },
      "capacity": {
        "desired": 1,
        "max": 1,
        "min": 1
      },
      "cloudProvider": "aws",
      "cooldown": 10,
      "copySourceCustomBlockDeviceMappings": false,
      "ebsOptimized": false,
      "enabledMetrics": [],
      "freeFormDetails": "test",
      "healthCheckGracePeriod": 600,
      "healthCheckType": "ELB",
      "iamRole": "BaseIAMRole",
      "instanceMonitoring": false,
      "instanceType": "t3.nano",
      "keyPair": "",
      "loadBalancers": [],
      "moniker": {
        "app": "awstest",
        "detail": "test",
        "stack": "dyn"
      },
      "provider": "aws",
      "securityGroups": [
        
      ],
      "spelLoadBalancers": [],
      "spelTargetGroups": [
        "${dynTargetGroup}"
      ],
      "spotPrice": "",
      "stack": "dyn",
      "strategy": "highlander",
      "subnetType": "",
      "suspendedProcesses": [],
      "tags": {
        "Name": "",
        "owner": ""
      },
      "targetGroups": [
        "${dynTargetGroup}"
      ],
      "targetHealthyDeployPercentage": 100,
      "terminationPolicies": [
        "Default"
      ],
      "useAmiBlockDeviceMappings": false
    }
  ],
  "name": "Deploy Dyn Target Group",
  "type": "deploy"
}
```
