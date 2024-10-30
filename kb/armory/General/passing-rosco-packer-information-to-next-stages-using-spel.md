---
title: Passing Rosco/Packer Information to Next Stages using SPeL
---

## Introduction
Users may find that information in Rosco/Packer about the built images need to be sent immediately to stages within the pipeline.  An example of this situation would be if a customer would like to tag these images that are built in separate accounts and separate regions using a Python script
There would be several methods that customers can use to fulfill the tagging requirements. 
* A ```RunJob``` as a part of the pipeline which contains the necessary components to run and execute the Python scriptAn AWS Lambda Function, with one of the following trigger mechanisms
* (indirectly) A Cloudwatch Event Rule monitor for the deployment of a new AMI independently of Spinnaker, which will trigger the Lambda function automatically once the build is completed (no information would need to be passed)* (directly) A [Spinnaker Webhook Stage](https://docs.armory.io/docs/spinnaker-user-guides/webhooks/) send a payload to the an AWS API Gateway to execute on the Lambda function* (directly) Using the [AWS Lambda Stage](https://docs.armory.io/docs/armory-admin/aws/aws-lambda/) function developed by AWS

In most of these cases, passing the information from the Rosco/Packer stage to the subsequent stages would be necessary.  Using [Spinnaker Pipeline Expression Language](https://docs.armory.io/docs/spinnaker-user-guides/expression-language/) to pass that information would be the easiest method

## Instructions
In the examples provided, we will be looking at two possible ways/examples of sending the Rosco outputs to subsequent stages.  Depending on how the subsequent stages and logic are set, it will influence how that information should be formatted
If individuals would like to understand how to pull these values, they can look at the execution history of a pipeline, and click on ```View as JSON``` to see the raw information that can be addressed using SPeL expressions

### Process Information into Separate Values
In the example below, the information provided by the Packer stage will be split off into separate variables for each created AMI.  There may also be other ways to perform this task, but for the purposes of a simple example, we will be providing the information so that each value is assigned its own variable.  
Note that this method should be used if the processing of the set of AMIs needs to be prepared before injecting them into subsequent stages.
* After the ```Bake Stage``` has completed, an ```Evaluate Variables``` stage will need to be set* The ```Evaluate Variable``` stage will depend on the ```Bake Stage```.  Use the ```Variable Previews``` section to ensure that the variables accessed will be accurateSet a ```Variable Name``` for each JSON Payload or Variable Value, depending on the need of the subsequent stages.  In general, it is recommended that processing the JSON Payload rather than Individual Variable Values is preferred, to cut down on the amount of adjustments that may need to be done in Spinnaker to define each individual variable.
By Individual Variable (Use preview to determine if the variable pulled is correct)
* ***Variable Name:*** Define as needed as a unique value (e.g. useast1_Prod_amiID)* ***Variable Value:*** 
```
${#stage('``````').outputs.deploymentDetails[``````].``````}  (e.g. ```${#stage('Bake us-east-1 and eu-west-1').outputs.deploymentDetails[0].imageID}```)* Add additional variables as needed for each variable, and each image
By JSON Payload (Use preview to determine if the variable pulled is correct).  Note: The payload information will need to be parsed by the Python Function
* ***Variable Name:*** Define as needed as a unique value (e.g. useast1_Prod_ami1)* ***Variable Value:*** ${#stage('``````').outputs.deploymentDetails[``````]}  (e.g. ```${#stage('Bake us-east-1 and eu-west-1').outputs.deploymentDetails[0]```)* Add additional variables as needed for each image in the deploymentDetails list.
```
* Each Variable can then be called in subsequent stages when necessary by using the expression ```${}``` (e.g. ```${useast1_Prod_amiID}``` for the individual AMI ID for the first image, or ```${useast1_Prod_ami1}``` for the JSON Payload of the first image) 

### Process Information as a Singular JSON Payload
In the example below, the information provided by the Packer stage will sent as a single payload to the subsequent stages.  This allows for more flexibility so that the Python code will interpret the payload and number of images, rather than leaving it to Spinnaker.  This may mean more complexity in the Python script, but allows for more flexibility as the Baking Stage grows. 

* After the ```Bake Stage``` has completed, an ```Evaluate Variables``` stage will need to be set* The ```Evaluate Variable``` stage will depend on the ```Bake Stage```.  Use the ```Variable Previews``` section to ensure that the variables accessed will be accurateSet a Variable for the JSON Payload which will be used for reference in subsequent stages
* ***Variable Name:*** Define as needed as a unique value (e.g. nginx_genericAMI)* ***Variable Value:*** 
```
${#stage('``````').outputs.deploymentDetails}  (e.g. ```${#stage('Bake us-east-1 and eu-west-1').outputs.deploymentDetails```)* Add additional variables as needed for each image in the deploymentDetails list.
```
* The entire ```Bake Stage``` output can now be referenced as a variable and can be injected into subsequent stages when necessary by using ```${}``` (e.g. ```${nginx_genericAMI}```) and can then be interpreted/parsed with the Python Script.   


