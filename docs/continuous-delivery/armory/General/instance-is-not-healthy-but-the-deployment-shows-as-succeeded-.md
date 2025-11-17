---
title: Instance is not healthy but the deployment shows as succeeded 
---

## Issue
In an ECS deployment, the UI shows "successfully deployed" but fails health-check fail 5 seconds later. Health checks are fail but the application still shows as being deployed.The following stage for example is being utilized:
````
  "completeOtherBranchesThenFail": true,
  "dependsOn": [],
  "executionOptions": {
    "successful": true
  },
  "failPipeline": false,
  "name": "Deploy app Stack [dev, ........",
  "stageTimeoutMs": 900000,
  "type": "deploy"
}
````
The pipeline completes as succeeded but in the ```server group logs``` there are messages for ```failures``` (service unhealthy).

## Cause
Ideally, the deployment should only succeed if the underlying service/task is healthy. This issue is currently being investigated further by Armory Engineering.

