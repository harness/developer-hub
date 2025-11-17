---
title: Remove Ability to Manually Trigger Pipelines
---

## Introduction
The following is a very simple method to remove the ability to manually trigger a pipeline.  To enforce it further however, a Police Engine evaluation on the pipeline should be implemented to see if the stage is present and is set correctly.  This Policy Engine evaluation is not included in this article.
The basic concept is to provide an evaluation on the pipeline at the very beginning to check and see if the pipeline should be able to be manually executed.  The use case can be if a user should be able to only trigger a series of pipelines from a initial pipeline, but subsequent pipelines should not be manually triggered.

## Instructions
For this example, we have a pipeline created which has a simple wait stage included.  The pipeline needs to be triggered from a GitRepo
```
{
  "keepWaitingPipelines": false,
  "lastModifiedBy": "anonymous",
  "limitConcurrent": true,
  "spelEvaluator": "v4",
  "stages": [
    {
      "name": "Check Preconditions",
      "preconditions": [
        {
          "context": {
            "expression": "${ trigger['type'] }='manual'",
            "failureMessage": "Pipeline was triggered manually.  Please use Pipeline X instead to trigger"
          },
          "failPipeline": true,
          "type": "expression"
        }
      ],
      "refId": "2",
      "requisiteStageRefIds": [],
      "type": "checkPreconditions"
    },
    {
      "name": "Wait",
      "refId": "3",
      "requisiteStageRefIds": [
        "2"
      ],
      "type": "wait",
      "waitTime": 60
    }
  ],
  "triggers": [
    {
      "enabled": true,
      "payloadConstraints": {
        "$.head_commit.modified": "TerraformFiles/*"
      },
      "source": "gitrepo",
      "type": "webhook"
    },
    {
      "enabled": true,
      "payloadConstraints": {
        "$.head_commit.added": "TerraformFiles/*"
      },
      "source": "gitrepo",
      "type": "webhook"
    }
  ],
  "updateTs": "1624301583000"
}
```
If this pipeline is manually triggered, it will hit an evaluation stage that checks preconditions and will fail the stage if the preconditions are not met.  The specific Spring Pipeline Expression Language is ```${ trigger['type'] }='manual'``` and if the condition is met, then the pipeline will fail.  A message will also be sent out ```Pipeline was triggered manually.  Please use Pipeline X instead to trigger```.  This message can be modified to suit a customer's needs
```
{
  "name": "Check Preconditions",
  "preconditions": [
    {
      "context": {
        "expression": "${ trigger['type'] }='manual'",
        "failureMessage": "Pipeline was triggered manually.  Please use Pipeline X instead to trigger"
      },
      "failPipeline": true,
      "type": "expression"
    }
  ],
  "type": "checkPreconditions"
}
```

