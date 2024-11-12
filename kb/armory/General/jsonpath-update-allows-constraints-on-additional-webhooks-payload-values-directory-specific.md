---
title: JSONPath Update Allows Constraints on Additional Webhooks Payload Values (Directory Specific)
---

## Introduction
Due to Armory's contribution to the Spinnaker OSS project, users can now define constraints based on nested JSON values in the webhook. 
[https://github.com/spinnaker/echo/pull/1078](https://github.com/spinnaker/echo/pull/1078)
The purpose of this example is to show how the trigger of a pipeline can be constrained to only occur when changes occur in a subdirectory of a Repo.   Folder changes in a Github webhook are one of the many values that do not exist on the parent/root of the webhook payload.  The above change now allows users to more finely tune when a trigger is executed.

## Prerequisites
Github webhook trigger should be set up and tested beforehand
Environment should be running 1.25.x or 2.25.x or higher.

## Instructions
First, please look at the following snippet of the Webhook Payload from Github, truncated and sanitized of information  
```
{
  "ref": "refs/heads/main",
  "before": "9999999999x999x9999x9xxxx99999x99999xxxx9",
  "after": "x9999999x99999x99999x99999xxxx99xxx9999x",
  "repository": {
    "id": 999999999,
    "node_id": "XXXxXXXXxX9xxXXxxxxxXXxxXXX9Xxx=",
    "name": "test-armoryTest",
    "full_name": "armory/test-armoryTest",
    "private": true,
[...]
  "head_commit": [
    {
      "id": "x9999999x99999x99999x99999xxxx99xxx9999x",
{...]
      "added": [

      ],
      "removed": [

      ],
      "modified": [
        "TerraformFiles/File1.txt"
      ]
    }
  ],
[...]
}
```

As can be seen in the example, the folder information is located within the commits information, customers previously would not be able to run any constraints based on the data located in the ```added```, ```removed```, or ```modified``` sections.  Thanks to the update, JSONPath can be used to access these values.

### Setting up a Payload Constraint based on a Directory
Please read through the [documentation on setting up a webhook trigger](https://spinnaker.io/setup/triggers/github/) and that it is set up according to the documentation. The logic behind this set up is explained further in this [article in the OSS documentation](https://spinnaker.io/guides/user/pipeline/triggers/webhooks/).
In our example, the payload will be sent to the ```https:///webhooks/webhook/gitrepo``` location.  The ```gitrepo``` portion of the payload destination can be defined as a different value, but it should be noted down for Step 2b below.  
It is recommended that if users want to test their constraints, they can do so with a ***simple wait stage***.  Apply the trigger to the wait stage and test it out, before adding the constraint to the final pipeline.  
* Log in to the Spinnaker instance.  Proceed to the pipeline that will be configured with the trigger.To first test the set up, it is recommended that users test a trigger without any constraints.  In the configuration stage of the pipeline, go to the ```Automated Triggers``` Section
* Set the *Type* to *Webhook* Set the *Source* to the destination value when the webhook was set in Github.  (e.g. in our example, ```gitrepo```)
* Save the Pipeline
* Complete a PR request in the GitRepo and ensure the pipeline is triggered.  Please note that it can take a little time for the pipeline to complete the modifications so that the webhook will trigger the pipeline
* Once the test is completed successfully, it is possible to now add constraints.  Log into the pipelineIn the Automated Triggers, we will now define the Payload Constraints to trigger *based on any files modified in the directory*
* In the Key section, set the key using ```JsonPath expression``` ([https://github.com/json-path/JsonPath](https://github.com/json-path/JsonPath)). In our example, ```$.head_commit.modified``` will restrict based on values in the ```head_commit``` root member object, and the ```modified``` sub member object of the payload
* In the Value section, set it to the directory (e.g. in our example, ```TerraformFiles/*``` allowing us to trigger the pipeline based on any changes to the ```TerraformFiles``` folder in the repo)* If an ***AND*** condition needs included, add an additional payload constraint to this trigger
To provide an ***OR ***condition, since we would like to add a trigger *based on any files added into the directory*
* In the Key section, set the key using ```JSONPath expression``` again, but this time, in our example, ```$.head_commit.added``` will restrict based on values in the ```head_commit``` root member object, and the ```added``` sub member object of the payload* In the Value section, set it to the directory (e.g. in our example, ```TerraformFiles/*``` allowing us to trigger the pipeline based on any additional files added to the ```TerraformFiles``` folder in the repo)
* If an ***AND*** condition needs included, add an additional payload constraint to this trigger
* Save the pipeline* What should now happen is that if any files are modified or added to the directory specified, the webhook should trigger the pipeline.  Any files removed will not trigger the pipeline, nor will any changes anywhere else in the repo trigger the pipeline.  It is recommended that this be tested to ensure the pipeline trigger is functioning as expected
The [following information about JSONPath](https://github.com/json-path/JsonPath) can further assist users with defining constraints beyond the example provided.   Potentially, users can constrain webhooks based on any parts of the payload, including on changes to particular files, or changes made by particular users.  



