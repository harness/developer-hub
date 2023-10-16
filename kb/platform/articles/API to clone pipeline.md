---
description: KB - How to clone pipeline through API
title: API to clone the pipeline
---

# Clone Pipeline through API

This knowledge base article walks you through how you can clone the pipeline through API also.

## cURL request to perform

Example cURL:

```
curl -X POST 'https://app.harness.io/gateway/pipeline/api/pipelines/clone?routingId=<ACCOUNT_ID>&accountIdentifier=<ACCOUNT_ID>&storeType=INLINE' \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer YOUR BEARER TOKEN' \
  -d '{
    "cloneConfig": {
        "connectors": false,
        "inputSets": false,
        "templates": false,
        "triggers": false
    },
    "connectors": false,
    "inputSets": false,
    "templates": false,
    "triggers": false,
    "destinationConfig": {
        "orgIdentifier": "DemoOrg",
        "projectIdentifier": "Test1",
        "pipelineIdentifier": "testpipeline",
        "pipelineName": "testpipeline"
    },"sourceConfig":{
    "orgIdentifier": "DemoOrg",
    "pipelineIdentifier": "testpipeline_Clone",
    "projectIdentifier": "Test2"
}
}'
```  