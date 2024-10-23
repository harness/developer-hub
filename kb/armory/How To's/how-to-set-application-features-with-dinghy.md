---
title: How to set Application Features with Dinghy
---

## Introduction
Dinghy has multiple features that allow users to edit and compartmentalize pieces of their pipeline configuration and leverage that in a repeatable fashion throughout Spinnaker. The functionality this article will go over is how to set Application attributes inside of a ```dinghyfile```.

## Prerequisites
* Must have Dinghy installed or ARM CLI installed locally to test* If Dinghy is installed, must have a template repository connected

## Instructions
The available options can be found in the list below. Please note that multiple options can be set in a single ```dinghyfile```.
```
Available Options:
serverGroups      = Clusters
executions        = Pipelines
loadBalancers     = Load Balancers
securityGroups    = Firewalls
canaryConfigs     = Canary Configs (This option is only available if you have Canary setup)
functions         = Functions (This option is only available if you have the Lambda Plugin installed)
```

When enabling/disabling these options in Dinghy, it can be set in the ```spec.dataSources.enabled``` or ```spec.dataSources.disabled``` section. Please find the example ```dinghyfile``` below with an example configuration that enables ```canaryConfigs``` and ```serverGroups``` and disables ```loadBalancers```.
***Please note*** that when setting Application Attributes, it is recommended that the ```globals.save_app_on_update``` option is set to ```true``` within the ```dinghyfile``` (see in the below example)
The reasoning behind this is because when the ```dinghyfile``` is pushed into Spinnaker, it will retroactively update the Application. If this option is not set, Dinghy may have unexpected results. The configuration file below has an example of how to set this.

```
{
   "application":"test",
   "globals":{
      "save_app_on_update":true
   },
   "spec":{
      "dataSources":{
         "enabled":[
            "canaryConfigs",
            "serverGroups"
         ],
         "disabled":[
            "loadBalancers"
         ]
      }
   },
   "pipelines":[
      {
         "application":"test",
         "name":"Wait Pipeline Test 3001",
         "isNew":true,
         "keepWaitingPipelines":false,
         "limitConcurrent":false,
         "stages":[
            {
               "name":"two",
               "type":"wait",
               "waitTime":20
            }
         ],
         "triggers":[
            
         ]
      }
   ]
}
```
