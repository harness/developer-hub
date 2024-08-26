---
title: Auto cleanup pipeline executions of specific applications in Spinnaker 
---

## Introduction
Admins of Armory CDSH / OSS Spinnaker instances may want to clean up older pipeline executions and retain executions only for a certain period to free space on the database and provide a better user experience. 
This can help with managing database space and can also improve UI at times when loading historical information.

## Prerequisites
An Operational Spinnaker instance, with Administration access

## Instructions
To clean up pipeline executions after a certain period, apply the below config to Orca’s profile settings in the ```SpinnakerConfig.yml``` file``` spinnakerConfig.profiles.orca```for Operator-based installations and ```orca-local.yml ```in the case of Halyard-based installations
pollers:

```
  oldPipelineCleanup:
    enabled: true                  # This enables old pipeline execution cleanup (default: false)
    intervalMs: 3600000            # How many milliseconds between pipeline cleanup runs (default: 1hr or 3600000)
    thresholdDays: 60              # How old a pipeline execution must be to be deleted (default: 30)
    minimumPipelineExecutions: 10   # How many executions to keep around (default: 5)
```
The above setting applies to pipeline executions under all the applications. If Administrators would like to have different thresholds for different sets of applications, please include the applications under ```exceptionalApplications``` as shown below
```
        pollers:
          oldPipelineCleanup:
            enabled: true
            thresholdDays: 30
            minimumPipelineExecutions: 30
            exceptionalApplicationsThresholdDays: 5
            exceptionalApplications:
            - application1
            - application2
            - application3
```