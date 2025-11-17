---
title: Dinghyfiles with defined Application Permissions fails to create/update pipelines (Forbidden Error)
---

## Issue
Customers that define [application permissions](https://docs.armory.io/armory-enterprise/spinnaker-user-guides/using-dinghy/#application-permissions) via Dinghy may encounter an issue where it fails to create and update applications and pipelines.
```
{
  "application": "fiat-dinghytest",
  "spec": {
    "appmetadata": {
      "permissions": {
        "READ": [
          "spin-admin-test"
        ],
        "WRITE": [
          "spin-admin-test"
        ],
        "EXECUTE": [
          "spin-admin-test"
        ]
      } 
    }
  },
  "pipelines": [
      {
          "application": "fiat-dinghytest”,
          "name": "DinghyValidation-Tests",
          "keepWaitingPipelines": false,
          "limitConcurrent": true,
          "stages": [
              {
                  "name": "Wait",
                   "refId": "1",
                   "requisiteStageRefIds": [],
                   "type": "wait",
                   "waitTime": 30
               }
           ],
           "triggers": []
      }
  ]
}
```
 
 
 
The following errors may be found in the Dinghy logs.
```
time="2022-10-25T11:01:35Z" level=error msg="Failed to create application (Forbidden: {\"timestamp\":\"2022-10-25T11:01:35.821+00:00\",\"status\":403,\"error\":\"Forbidden\",\"message\":\"Access denied to application fiat-dinghytest - required authorization: READ\"})"
time="2022-10-25T11:01:35Z" level=error msg="Failed to update Pipelines for dinghyfile: Forbidden: {\"timestamp\":\"2022-10-25T11:01:35.821+00:00\",\"status\":403,\"error\":\"Forbidden\",\"message\":\"Access denied to application fiat-dinghytest - required authorization: READ\"}"
time="2022-10-25T11:01:36Z" level=error msg="Error processing Dinghyfile: Forbidden: {\"timestamp\":\"2022-10-25T11:01:35.821+00:00\",\"status\":403,\"error\":\"Forbidden\",\"message\":\"Access denied to application fiat-dinghytest - required authorization: READ\"}"
time="2022-10-25T11:01:36Z" level=error msg="ProcessPush Failed (other): Forbidden: {\"timestamp\":\"2022-10-25T11:01:35.821+00:00\",\"status\":403,\"error\":\"Forbidden\",\"message\":\"Access denied to application fiat-dinghytest - required authorization: READ\"}"
time="2022-10-25T11:01:36Z" level=error msg="Forbidden: {\"timestamp\":\"2022-10-25T11:01:35.821+00:00\",\"status\":403,\"error\":\"Forbidden\",\"message\":\"Access denied to application fiat-dinghytest - required authorization: READ\"}"
```
## Cause
The cause of this issue is due to Dinghy not having a Service Account/Fiat User assigned to it with adequate permissions.  As a result, after the application and pipeline are created initially, an update fails because there are inadequate permissions to do so

