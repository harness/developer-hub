---
title: Maximum Call Stack Size Exceeded Error
---

## Issue
An organization may encounter an error of ```Maximum call stack size exceeded``` when attempting to deploy a pipeline. The logs will show the call stack increasing in size until reaching some arbitrary limit. The pipeline will not deploy correctly.

## Cause
This error means that somewhere in the pipeline code, a function or stage is being called which in turn calls another function  or stage and so forth, until you hit the call stack limit.
An example would be a pipeline Json that has an incorrect dependancy, such as a stage that depends on a non-existing stage.

```
"stages": [

  {

   "application": “$CLIENT-generic-service-example-preGA-test",

   "failPipeline": true,

   "name": "Deploy Application Test",

   "pipeline": "97723e2b-18e9-4bcb-a79c-990c0cfd7a5c",

   "pipelineParameters": {

    "requiresApproval": "${trigger['parameters']['testRequiresApproval']}"

   },

   "refId": "deployAppTest",

   "requisiteStageRefIds": [],

   "stageEnabled": {

    "expression": "trigger['artifacts'][0]['version'].matches(\"(pull-|master-|release-).*\") && trigger['parameters']['deployToTest'] == \"true\"",

    "type": "expression"

   },

   "type": "pipeline",

   "waitForCompletion": true

  },

  {

   "application": "$CLIENT-generic-service-example-preGA-test”,

   "failPipeline": true,

   "name": "Deploy Application Production",

   "pipeline": "2ee35d72-1925-455d-a2e9-9e57d2aa3a6c",

   "pipelineParameters": {

    "requiresApproval": "${trigger['parameters']['prodRequiresApproval']}"

   },

   "refId": "deployAppProd",

   "requisiteStageRefIds": [

    "deployAppUat"

   ],

   "stageEnabled": {

    "expression": "trigger['artifacts'][0]['version'].matches(\"(master-|release-).*\") && (trigger['parameters']['deployToTest'] == \"true\" || trigger['parameters']['deployToUat'] == \"true\") && trigger['parameters']['deployToProd'] == \"true\"",

    "type": "expression"

   },

   "type": "pipeline",

   "waitForCompletion": true

  }

 ],
```


