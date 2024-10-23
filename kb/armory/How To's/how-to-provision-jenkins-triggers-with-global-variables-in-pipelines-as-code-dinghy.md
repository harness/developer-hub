---
title: How to Provision Jenkins Triggers with Global Variables in Pipelines as Code/Dinghy
---

## Introduction
Pipelines as Code is a powerful feature of Spinnaker, which can deploy complex pipelines for applications reusing the same code. This article will showcase how we can provision two distinct Jenkins triggers with global variables defined in a top-level dinghyfile.

## Prerequisites
* Pipelines as Code plugin/service available in Spinnaker (Installation and configuration instructions available [here](https://docs.armory.io/plugins/pipelines-as-code/install/armory-cd/))* ARM-CLI used for debugging purposes and validation - [ARM-CLI](https://docs.armory.io/plugins/pipelines-as-code/arm-cli/)* Jenkins configured in Spinnaker: [JenkinsCI](https://spinnaker.io/docs/setup/other_config/ci/jenkins/)

## Instructions
In this article, we want to provision a simple pipeline with two Jenkins triggers and an Evaluate Variables stage that ingests the Jenkins trigger parameters, all using Pipelines as Code.

The Jenkins triggers are based on global variables corresponding to the Jenkins job names we want to trigger the pipeline.
The top-level dinghyfile would look like the below example. 
In the example:
* We initialized two global variables ```configmap_trigger``` and ```application_trigger``` which we pass on to the Jenkins trigger submodule* Both triggers are enabled* ```jenkins_Main``` is the name of the Jenkins account configured in Spinnaker
```
{
  "application": "DynamicJenkinsTriggers",
  "globals": {
    "save_app_on_update": true,
    "application": "DynamicJenkinsTriggers",
    "application_trigger" : "application_backend",
    "configmap_trigger": "configmap_backend",
    "jenkins_Main": "Jenkins_master"
  },
  "pipelines": [
    {
      "application": "DynamicJenkinsTriggers",
      "locked": {
        "allowUnlockUi": true,
        "description": "",
        "ui": true
      },
      "name": "PipelineWithTriggers",
      "stages": [
        {
          "failOnFailedExpressions": true,
          "isNew": true,
          "name": "Evaluate Variables",
          "type": "evaluateVariables",
          "variables": [
            {
              "key": "JenkinsJOB",
              "value": "${trigger.job}"
            }
          ]
        }
    ],
      "triggers": [
        {{ module "dinghy-modules/stage.automatedTriggers.module"
          "type" "jenkins"
          "job" (var "application_trigger")
          "master" (var "jenkins_Main")
          "enabled" "true"
        }},
        {{ module "dinghy-modules/stage.automatedTriggers.module"
        "type" "jenkins"
        "job" (var "configmap_trigger")
        "master" (var "jenkins_Main")
        "enabled" "true"
        }}]
      }]}
```
The Sub-module used would look like the following definition below.
```
{
  "name": "{{ var "name" ?: "Build in Jenkins" }}",
  "enabled" : {{ var "enabled" ?: "true" }},
  "type": "jenkins",
  "refId": "{{ var "refId" }}",
  "requisiteStageRefIds": {{ var "requisiteStageRefIds" ?: [] }},
  "master": "{{ var "master" }}",
  "job": "{{ var "job" }}",
  "parameters": {{ var "parameters" ?: {} }},
  "propertyFile": "{{ var "propertyFile" }}",
  "expectedArtifacts": {{ var "expectedArtifacts" ?: [] }}
}
```
Upon rendering the pipeline in Spinnaker, we will end up with the following pipeline JSON:
```
{
  "keepWaitingPipelines": false,
  "lastModifiedBy": "anonymous",
  "limitConcurrent": false,
  "locked": {
    "allowUnlockUi": true,
    "ui": true
  },
  "parallel": false,
  "schema": "1",
  "spelEvaluator": "",
  "stages": [
    {
      "failOnFailedExpressions": true,
      "isNew": true,
      "name": "Evaluate Variables",
      "type": "evaluateVariables",
      "variables": [
        {
          "key": "JenkinsJOB",
          "value": "${trigger.job}"
        }
      ]
    }
  ],
  "triggers": [
    {
      "enabled": true,
      "expectedArtifacts": [],
      "job": "application_backend",
      "master": "Jenkins_master",
      "name": "Build in Jenkins",
      "parameters": {},
      "propertyFile": "",
      "refId": "",
      "requisiteStageRefIds": [],
      "type": "jenkins"
    },
    {
      "enabled": true,
      "expectedArtifacts": [],
      "job": "configmap_backend",
      "master": "Jenkins_master",
      "name": "Build in Jenkins",
      "parameters": {},
      "propertyFile": "",
      "refId": "",
      "requisiteStageRefIds": [],
      "type": "jenkins"
    }
  ],
  "updateTs": "1697023404864"
}
```
* We evaluate the ```trigger.job``` parameter in the Evaluate Variable stage so we can use this value further down the pipeline. If we run the corresponding jobs in Jenkins, the pipeline will get triggered, as seen in the below image:
 

