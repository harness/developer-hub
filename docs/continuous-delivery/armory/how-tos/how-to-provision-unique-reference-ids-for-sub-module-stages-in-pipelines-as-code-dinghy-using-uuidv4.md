---
title: How to provision unique Reference IDs for sub-module stages in Pipelines as Code (Dinghy) using UUIDv4
---

## Introduction
Pipelines as Code (PaC) represent a pivotal capability, facilitating swift and efficient provisioning of intricate Spinnaker pipelines. By judicious employment of Dinghyfiles, users can seamlessly apply the same PaC code across diverse applications, significantly reducing development timelines and enhancing the efficacy of Continuous Deployment workflows.
A common problem using PaC is in provisioning unique reference ID's for stages. In this article, admins and users can learn to leverage the power of the UUID function to provision unique identifiers for each stage.

## Prerequisites
* Pipelines as Code plugin/service available in Spinnaker (installation and configuration instructions available [here](https://docs.armory.io/plugins/pipelines-as-code/install/armory-cd/))* ARM-CLI used for debugging purposes and validation - [ARM-CLI](https://docs.armory.io/plugins/pipelines-as-code/arm-cli/)

## Instructions
This example will generate two stages for two environments by parsing a list.
* Each stage will have a unique reference ID passed on as a sub-module variable using the UUID function.The Wait stage sub-module looks like this:
```
{
  "name": "{{ var "waitname" ?: "defaultname" }}",
  "type": "wait",
  "refId": "{{ var "refId" ?: "defaultrefId" }}",
  "waitTime": {{ var "waitTime" ?: 100 }}
}
```

The module is then used in the top-level ```dinghyfile```. The ```dinghyfile``` looks like this:
```
{
    "application": "uuidexample",
    "pipelines": [
      {
        "name": "uuid",
        "application": "uuid",
        "stages": [
          {{ $listdev := list "10" "dev" }}
          {{ $listqa := list "20" "qa" }}
          {{ $myenvs := list $listdev $listqa }}
          {{ $count := 1 }}
          {{ range $myenvs }}
              {{ module "dinghy-modules/wait.stage.module"  "waitname" ( index . 1  ) "waitTime" ( index . 0  ) "refId" uuidv4 }}
              {{ if ne $count (len $myenvs) }}
                  {{ $count = add $count 1 }}
                  ,
              {{ end }}
          {{ end }}
        ]
      }
    ]
  }
```
* In the above example, administrators and users can aggregate a list of parameters into another list, which can be iterated upon and then pass variables to the sub-module. We pass the ```uuidv4``` function as a ```refId``` variable value.The final pipelines after it has been rendered will look like this:
```
{
    "application": "uuidexample",
    "pipelines": [
      {
        "name": "uuid",
        "application": "uuid",
        "stages": [
          
          
          
          
          
              {
  "name": "dev",
  "type": "wait",
  "refId": "63dbd819-53b4-4312-acd0-dc839cba2aa7",
  "waitTime": 10
}

              
                  
                  ,
              
          
              {
  "name": "qa",
  "type": "wait",
  "refId": "d9bf16a3-b0d0-4760-9c8d-f9a84fcd5a0b",
  "waitTime": 20
}

              
          
        ]
      }
    ]
  }
```

We can easily reference the stages by having unique identifiers for them downstream. In the following example, we manually created a wait stage that depends on the previous two stages by using the reference IDs in the requisiteStageRefIds field
The stages section will look like this : 
```
"stages": [
    {
      "name": "dev",
      "refId": "63dbd819-53b4-4312-acd0-dc839cba2aa7",
      "type": "wait",
      "waitTime": 10
    },
    {
      "name": "qa",
      "refId": "d9bf16a3-b0d0-4760-9c8d-f9a84fcd5a0b",
      "type": "wait",
      "waitTime": 20
    },
    {
      "name": "final",
      "refId": "1",
      "requisiteStageRefIds": [
        "63dbd819-53b4-4312-acd0-dc839cba2aa7",
        "d9bf16a3-b0d0-4760-9c8d-f9a84fcd5a0b"
      ],
      "type": "wait"
    }
  ]
```
 
 
Please note that the ARM-CLI verification tool (v2.3.0) will report the syntax as incorrect, but Spinnaker will successfully render the pipeline on a Pull Request.

