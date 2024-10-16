---
title: Producing Artifacts in the Webhook Stage
---

## Introduction
The Webhook Stage is capable of producing artifacts which can be used in downstream stages. This is done by returning a valid array of artifacts in the response of the webhook that you're calling. For example, your webhook may be responsible for generating an artifact and pushing it into an object store such as S3. 

## Prerequisites
N/A

## Instructions
To correctly inform Spinnaker of this artifact, your webhook should respond with the following JSON response.
```
{
    "artifacts": [
        {
            "type": "s3/object",
            "reference": "s3://webhook-example-bucket/webhook-example-object.yaml"
        }
    ]
}
```
In order to use these artifacts within the pipeline, you must first add them under the pipeline **Expected Artifacts section**.

Once you've added a Webhook stage, be sure to add your artifact under the **Produces Artifacts** section in the stage configuration.

For more information on Webhooks, please take a look at the following documentation in our Docs library: [https://docs.armory.io/docs/spinnaker-user-guides/webhooks/](https://docs.armory.io/docs/spinnaker-user-guides/webhooks/)

