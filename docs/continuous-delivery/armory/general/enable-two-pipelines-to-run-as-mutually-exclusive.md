---
title: Enable two pipelines to run as Mutually Exclusive
---

## Introduction
If two pipelines need to run as mutually exclusive, there is currently no way to achieve this in Armory Spinnaker or OSS Spinnaker without creating some kind of Custom Stage. This article will cover a workaround that can be used in the event a Custom Stage could not be made.
Please note that mutually exclusive example in this article will refer to the below scenario.
Given two pipelines, Pipeline A and Pipeline B
* If pipeline A is running, pipeline B can’t start.* Similarly, if pipeline B is running, pipeline A can’t start.

 
There are potentially better solutions for smaller pipelines as well as caveats to taking this approach that should be considered before following this article
* If the pipelines are small/simple in nature, the Conditional Expressions can be set for all stages in order to stop them from running, thereby making for easier configuration. The method described in this article was selected instead to provide a solution in the case there are larger pipeline definitions or in the event that the pipeline's deploy stages change frequently.* There are no loop stages in Spinnaker and this article covers how to artificially create one. Please keep in mind that this can potentially cause issues such as infinite loops.* We are using two check preconditions stages since there are no options to choose a path upon failure.

## Prerequisites
N/A

## Instructions
There are two potential solutions to this scenaril
***Solution 1:***  Merge Pipeline A and Pipeline B into one pipeline and leverage the Check Preconditions Stage in order to direct the pipeline down the appropriate path.
***Solution 2:*** Use webhooks to re-trigger pipelines until there are no pipelines running for Pipeline A or Pipeline B.
 
Solution 1
* Create a pipelineCreate two Check Pre-Conditions Stages 
* This should check whether or not to deploy to PROD or DEV. The specific condition will vary depending on what is being passed. In this example, we are using a parameter that the user inputs before executing the pipeline.* For more information on how to define these conditions, please refer to the [OSS SpEL expression documentation](https://spinnaker.io/docs/guides/user/pipeline/expressions/)
* Input the condition into the Check-Preconditions Stage and make sure the ```Fail Pipeline``` checkbox is unchecked* Next, ensure that the entire pipeline does not fail when these stages fail and instead only discontinue their respective pipeline branches. This can be achieved by setting the Execution Options for both the Check-Preconditions Stages.* Last, setup the deploy stages for PROD and DEV.
 
 
Solution 2
* Create two pipelines (Both pipelines will have the same configuration and only differ slightly in the Webhook configurations and Deploy Stages)
* Next, create a Webhook stage to the ```getLatestExecutionsByConfigIdsUsingGET``` Spinnaker API[https://spinnaker.io/docs/reference/api/docs.html#api-Executionscontroller-getLatestExecutionsByConfigIdsUsingGET](https://spinnaker.io/docs/reference/api/docs.html#api-Executionscontroller-getLatestExecutionsByConfigIdsUsingGET)* Set the limit to ```1``` and the status to ```RUNNING```
* Make sure to capture the Pipeline IDs of both pipelines and input them into the Webhook URL. (Pipeline A will do a webhook call to Pipeline B's Pipeline ID and vice versa)
* When all is done, the stage should look similar to below.
* Next, create two Check Preconditions Stages just like in the first solution. For the conditions, we want to check whether or not the Webhook returned any running pipelines for either Pipeline A or Pipeline B and if there are any running pipelines for either. To do this, please refer to the SpEL expressions doc in the More Info section of the article. In this example, we will be using the below conditions to check if there are running pipelines or if there are no running pipelines.
```${execution.stages[0].context.webhook.body.toString().contains("RUNNING")}``````${!execution.stages[0].context.webhook.body.toString().contains("RUNNING")}```
* Make sure to unset the ```Fail Pipeline``` checkbox as well as configure both Check Preconditions Stages to only fail the branch upon failure.
* From here, create a Wait Stage after the Check PreConditions Stage. (Please note that this Wait Stage should be configured after the Check PreConditions Stage that checks if there IS a running pipeline) This wait stage will act as a timeout function that will wait a set amount of time before retrying to check if there are any running pipelines.
* Next, Configure another Webhook after the Wait Stage to the ```invokePipelineConfigUsingPOST1``` Spinnaker API and input the current pipeline's ID into the Webhook URL.[https://spinnaker.io/docs/reference/api/docs.html#api-Pipelinecontroller-invokePipelineConfigUsingPOST1](https://spinnaker.io/docs/reference/api/docs.html#api-Pipelinecontroller-invokePipelineConfigUsingPOST1)This will re-trigger the pipeline in the event that a running pipeline was found for either Pipeline A or Pipeline B.
* Last, configure the deploy stage and set that stage to run after the Check Preconditions Stage that has the condition to check if the Webhook did NOT find any running pipelines.
* When this is setup properly, the pipelines should look similar to the example below.

