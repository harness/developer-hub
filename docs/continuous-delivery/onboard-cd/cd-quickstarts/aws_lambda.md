# AWS Lambda Deployment Support + Quickstart

## Introduction

Harness supports the deployment of AWS Lambda Functions. Below is a guide to get started on using the swimlane to deploy your Lambda functions through Harness CD! The swimlane only deploys the Lambda Function, it doesn't update any auxillary things like the API Gateway, or the Triggers etc. It's designed to empower developers to launch their Lambda code with ease without having to mess with the infrastructure components around AWS Lambda. Harness can deploy a new Lambda function or update an existing Lambda Function.

*Note: AWS native lambda feature is behind FF: `CDS_AWS_NATIVE_LAMBDA`*



## Lambda Service Configuration

Harness lets users define a service that represents their AWS Lambda Function they wish to deploy. 

<img width="1512" alt="image" src="https://user-images.githubusercontent.com/52221549/225522422-1834e511-4393-4e61-8784-e1a032cd9404.png">


### Artifacts

Harness supports deploying your AWS Lambda's that are packaged as `.zip` in S3 Buckets or as containers from `ECR`. These are the only two artifact sources AWS Cloud Provider supports today with AWS Lambda. 

<img width="857" alt="image" src="https://user-images.githubusercontent.com/52221549/225522517-d2451973-e443-45e5-9969-d1abdff5d3a8.png">


### Function Definition

Harness has introduced a JSON configuration file to define the AWS Lambda you wish to deploy. This configuration lets you define things like:

- VPC
- Lambda Layers
- Runtime
- Handler
- Tags


For a full list of supported fields, please check out the [AWS Lambda Create Function Request](https://docs.aws.amazon.com/lambda/latest/dg/API_CreateFunction.html)


Below is are some Sample Function Definition to get started:

**Node JS Hello World Function**

```JSON
{
   "runtime": "nodejs16.x",
   "functionName": "Hello World",
   "handler": "handler.hello",
   "role": "<YOUR_AWS_ARN>"
}

```

You can use [Service Variables] in your function definition json, this allows your function definition yaml to be reusable across multiple lambdas. It can also be used to override configuration of a particular Lambda per environment.

```JSON
{
   "runtime": "<+serviceVariables.runtime>",
   "functionName": "<+serviceVariables.functionName>",
   "handler": "<+serviceVariables.handler>",
   "role": "<+serviceVariables.roleARN>"
}
```


**ECR Lambda Function**

```JSON
{
   "functionName": "helloworld-lambda-ecr",
   "role": "<YOUR_ARN>"
}
```



### Sample Service YAML

Below is a Sample Service Definition YAML in for the AWS Lambda


```YAML
service:
  name: helloworld
  identifier: helloworld
  description: "Hello World AWS Lambda"
  tags: {}
  serviceDefinition:
    spec:
      manifests: # Harness introduces a function definition to define the properties of your AWS Lambda function
        - manifest:
            identifier: lambdaFunctionDefinition 
            type: AwsLambdaFunctionDefinition
            spec:
              store:
                type: Github
                spec:
                  connectorRef: rohitgithub
                  gitFetchType: Branch
                  paths:
                    - serverless/aws-lambda/createFunction.json
                  branch: master
      artifacts: # The artifact is the packaged .zip or Docker image you wish to deploy to AWS
        primary:
          primaryArtifactRef: <+input>
          sources:
            - spec:
                connectorRef: awscp
                bucketName: sainathlambda
                region: us-east-2
                filePath: <+serviceVariables.workload_name>
              identifier: test
              type: AmazonS3
      variables:
        - name: workload_name
          type: String
          description: "sample variable definition"
          value: workloadNameValue
    type: AwsLambda

```


## Lambda Environment and Infrastructure Configuration

User's will need to configure an Environment and Infrastructure Definition to tell Harness where to deploy the Lambda Function Service defined earlier.

We will need an [AWS Connector](https://developer.harness.io/docs/platform/connectors/add-aws-connector/) to be able to connect to an AWS Account and specify a region to deploy. This connector will be used to deploy your Lambda and access the AWS cloud provider.



<img width="1512" alt="image" src="https://user-images.githubusercontent.com/52221549/225532637-ec71cb3a-556b-4422-9048-76c2e8722290.png">


Below is the YAML Definition for Environment:

```YAML
environment:
  name: aws
  identifier: aws
  description: "sandbox aws account"
  tags: {}
  type: PreProduction
  orgIdentifier: default
  projectIdentifier: serverlesstest
  variables: []

```



<img width="860" alt="image" src="https://user-images.githubusercontent.com/52221549/225532468-faafcc00-4e65-481e-bc3b-0a80a280c443.png">

Below is the YAML Definition for Infrastructure:

```YAML
infrastructureDefinition:
  name: aws-lambda
  identifier: awslambda
  description: ""
  tags: {}
  orgIdentifier: default
  projectIdentifier: serverlesstest
  environmentRef: aws
  deploymentType: AwsLambda
  type: AwsLambda
  spec:
    connectorRef: awscp
    region: us-east-2
  allowSimultaneousDeployments: false

```

## Lambda Steps

Harness offers various steps for users to consume for deployment. To deploy Lambda and manage rollback of Lambda, Harness offers two steps in particular:

- Deploy Lambda Step
- Rollback AWS Lambda Step

<img width="560" alt="image" src="https://user-images.githubusercontent.com/52221549/225532995-354adc52-c76b-4574-9cce-416a031089c8.png">


### Lambda Deployment Steps

<img width="457" alt="image" src="https://user-images.githubusercontent.com/52221549/225533065-a2253490-3f20-4087-897f-8fb7a408c6ab.png">


Below is a YAML snippet of the Deploy Lambda Step. It requires minimal configuration because Harness handles the logic to deploy the artifact to the proper AWS Account and Region. Harness will deploy the Lambda function and automatically route the traffic from the old version of the Lambda function to the newly deployed one.


```YAML
- step:
                  name: Deploy Aws Lambda
                  identifier: deployawslambda
                  type: AwsLambdaDeploy
                  timeout: 10m
                  spec: {}
                  when:
                    stageStatus: Success
                    condition: "false"
                  failureStrategies: []
```

### Rollback Deploy Step

<img width="452" alt="image" src="https://user-images.githubusercontent.com/52221549/225533147-15081d52-8b63-4fe9-b23c-b68cadaf4809.png">

Below is the YAML snippet for the AWS Lambda Rollback Step. When a Pipeline fails, Harness will automatically rollback your Lambda function to the previous version using the Rollback step. Harness remembers the successful version of the AWS Lambda Service deployed and rollback for you. 

```YAML
            rollbackSteps:
              - step:
                  name: Aws Lambda rollback
                  identifier: awslambdarollback
                  type: AwsLambdaRollback
                  timeout: 10m
                  spec: {}
```

## Sample Pipeline 

<img width="1512" alt="image" src="https://user-images.githubusercontent.com/52221549/225534374-5bf7cf90-91c7-4c31-a1f3-2bda4375b7f6.png">


Below is a Sample Pipeline YAML that has been configured:

```YAML
pipeline:
  name: lambda-deploy
  identifier: lambdaDeploy
  projectIdentifier: serverless
  orgIdentifier: default
  tags: {}
  stages:
    - stage:
        name: deploy lambda
        identifier: deploy
        description: "deploy lambda"
        type: Deployment
        spec:
          deploymentType: AwsLambda
          service:
            serviceRef: lambda
            serviceInputs:
              serviceDefinition:
                type: AwsLambda
                spec:
                  artifacts:
                    primary:
                      primaryArtifactRef: <+input>
                      sources: <+input>
          environment:
            environmentRef: aws
            deployToAll: false
            infrastructureDefinitions:
              - identifier: awslambda
          execution:
            steps:
              - step:
                  name: Deploy Aws Lambda
                  identifier: deployawslambda
                  type: AwsLambdaDeploy
                  timeout: 10m
                  spec: {}
                  when:
                    stageStatus: Success
                    condition: "false"
                  failureStrategies: []
              - step:
                  type: ShellScript
                  name: Echo Service variables
                  identifier: ShellScript
                  spec:
                    shell: Bash
                    onDelegate: true
                    source:
                      type: Inline
                      spec:
                        script: echo <+serviceVariables.workload_name>
                    environmentVariables: []
                    outputVariables: []
                  timeout: 10m
            rollbackSteps:
              - step:
                  name: Aws Lambda rollback
                  identifier: awslambdarollback
                  type: AwsLambdaRollback
                  timeout: 10m
                  spec: {}
        tags: {}
        failureStrategies:
          - onFailure:
              errors:
                - AllErrors
              action:
                type: StageRollback

```

## Configuration via API

User's can configure the Harness AWS Lambda Service Resource via API. Users will need to use the [Create Service API](https://apidocs.harness.io/tag/Services#operation/createServiceV2) and specify the service type to be `AwsLambda`

## Configure via Terraform

User's can configure the Harness AWS Lambda Service Resource via the Terraform Provider. Please use the [service platform resource in the NextGen Provider](https://registry.terraform.io/providers/harness/harness/latest/docs/resources/platform_service).

service:
  name: helloworld
  identifier: helloworld
  description: "Hello World AWS Lambda"
  tags: {}
  serviceDefinition:
    spec:
      manifests: # Harness introduces a function definition to define the properties of your AWS Lambda function
        - manifest:
            identifier: lambdaFunctionDefinition 
            type: AwsLambdaFunctionDefinition
            spec:
              store:
                type: Github
                spec:
                  connectorRef: rohitgithub
                  gitFetchType: Branch
                  paths:
                    - serverless/aws-lambda/createFunction.json
                  branch: master
      artifacts: # The artifact is the packaged .zip or Docker image you wish to deploy to AWS
        primary:
          primaryArtifactRef: <+input>
          sources:
            - spec:
                connectorRef: awscp
                bucketName: sainathlambda
                region: us-east-2
                filePath: <+serviceVariables.workload_name>
              identifier: test
              type: AmazonS3
      variables:
        - name: workload_name
          type: String
          description: "sample variable definition"
          value: workloadNameValue
    type: AwsLambda

```YAML
resource "harness_platform_service" "service" {
  identifier  = "helloworld"
  name        = "hello-world lambda"
  description = "lambda function"
  org_id      = "default"
  project_id  = "serverless"

  yaml = <<-EOT
            service:
              name: helloworld
              identifier: helloworld
              description: "Hello World AWS Lambda"
              tags: {}
              serviceDefinition:
                spec:
                  manifests: # Harness introduces a function definition to define the properties of your AWS Lambda function
                    - manifest:
                        identifier: lambdaFunctionDefinition 
                        type: AwsLambdaFunctionDefinition
                        spec:
                          store:
                            type: Github
                            spec:
                              connectorRef: rohitgithub
                              gitFetchType: Branch
                              paths:
                                - serverless/aws-lambda/createFunction.json
                              branch: master
                  artifacts: # The artifact is the packaged .zip or Docker image you wish to deploy to AWS
                    primary:
                      primaryArtifactRef: <+input>
                      sources:
                        - spec:
                            connectorRef: awscp
                            bucketName: sainathlambda
                            region: us-east-2
                            filePath: <+serviceVariables.workload_name>
                          identifier: test
                          type: AmazonS3
                  variables:
                    - name: workload_name
                      type: String
                      description: "sample variable definition"
                      value: workloadNameValue
                type: AwsLambda
              EOT
}

```













