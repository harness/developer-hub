---
title: ExecutionID & StageID are not unique in the webhooks sent by Spinnaker CustomWebhook stages
---

## Issue
Pipelines on separate applications are invoked by custom webhooks with the same stage and Execution IDs.

This is observed in the custom webhook where both the pipelines the same custom webhook stage invokes:
```X-Execution-Id: ""```
and
```X-Stage-Id: ""```
Spinnaker is expecting that the above values will be ***unique per stage invocation***.
The following shows an example where it is not the case:
First Pipeline:
```
{
  "type": "PIPELINE",
  "id": "0123",
  "application": "",
  "name": "",
  "buildTime": 1622432694880,
  "canceled": false,
  "limitConcurrent": true,
  "keepWaitingPipelines": false,
  "stages": [
    {
      "id": "0123",
      "refId": "1",
.....
......
........

   "failPipeline": false,
        "customHeaders": {
          "X-Stage-Id": [
            "012345678"
          ],
          "X-Execution-Id": [
            "016789"
          ],
          "X-Execution-User": [
            "sample@sample.com"
          ],
          "Content-Type": [
            "application/json"
          ]
        },
```
Second Pipeline:
```
{
  "type": "PIPELINE",
  "id": "0456",
  "application": "",
  "name": "",
  "buildTime": 1622255063387,
  "canceled": false,
  "limitConcurrent": true,
  "keepWaitingPipelines": false,
  "stages": [
    {
      "id": "0456",
      "refId": "1",
....
....
.....

"failPipeline": false,
        "customHeaders": {
          "X-Stage-Id": [
            "012345678"
          ],
          "X-Execution-Id": [
            "016789"
          ],
          "X-Execution-User": [
            "sample@sample.com"
          ],
          "Content-Type": [
            "application/json"
          ]
        },
```
In the example, both pipeline stages have a different Stage ID but the webhook that is invoked is identical in both pipelines.
```
          "X-Stage-Id": [
            "012345678"
          ],
          "X-Execution-Id": [
            "016789"
```
In an ideal scenario they should refer to the unique Stage and Execution IDs.

## Cause
This issue exists within Orca and the evaluation of SPeL expressions on the CustomWebhook stages and is traced back to the following Spinnaker OSS issue [https://github.com/spinnaker/spinnaker/issues/5910](https://github.com/spinnaker/spinnaker/issues/5910).
Running into this OSS issue causes the baked CRD to be deployed with evaluated the SpEL expressions of the CustomWebhook stages. 


