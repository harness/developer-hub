---
title: Cancel a Stuck Pipeline
---

## Introduction
When a pipeline is stuck and cannot be cancelled via the UI, the following are some steps that can be used to cancel a pipeline.

## Prerequisites
### Locate the Pipeline ID and Pipeline Execution ID 
#### Via Source
Both pieces of information can be found in the execution details.  Navigate to the pipeline, and go to **Execution Details** -> **Source**
The pipeline id will be labeled ```id``` and will be one of the first lines.
The execution id will be ```execution_id``` and will be towards the end.

#### Via the URL of Resources in the Console
The URL for the pipeline when editing the pipeline from the console also contains the ```Pipeline ID``````/#/applications//executions/configure/****```
The URL for the permalink (next to the source location above) will contain the information about the ```Pipeline Execution ID``````/#/applications//executions/details/****?stage=0&step=0&details=```

#### Via Orca Logs
The ```Pipeline Execution ID``` can also be found within the logs of the Orca instance, by running
```kubectl logs -n  deploy/spin-orca -f ```
Sometimes, locating the execution ID can be difficult unless it can be identified from any other executions that are running at the time

## Instructions
### Via Swagger UI
* Navigate to ```/swagger-ui.html```(You can find your gate endpoint, as an example, by running ```kubectl get svc``` if you are using Spinnaker on kubernetes or kubernetes cloud environments.  For more information about exposing endpoints, please look here: [https://docs.armory.io/docs/spinnaker/exposing-spinnaker/](https://docs.armory.io/docs/spinnaker/exposing-spinnaker/))* From there you can navigate to the pipeline controller and ```/pipelines/{id}/cancel```* Once there, add the ```pipeline execution ID``` from the source of the pipeline and execute the cancel* A ```200 response``` means the pipeline was successfully cancelled* Check back in your Deck UI to confirm the cancellation

### If Using Redis and Need to Remove Pipeline from Execution
The following are commands that can be run in **redis-cli** that can be used to manage and remove pipeline executions.  The commands should be run in order, once the ```Pipeline ID``` and ```Pipeline Execution ID``` has been located 
**Command****Function**
```zrange pipeline:executions:pipeline_id 0 -1```
*this displays all executions from this pipeline for each execution that you want to remove*
```zrem pipeline:executions:pipeline_id execution_id```
*unlink the execution from pipeline_config_id
*del pipeline:execution_id
*delete the execution pipeline
*del orchestration:execution_id
*delete the execution orchestration
 
The following KB article advises about how to put all the commands together to complete the deletion:[https://kb.armory.io/s/article/Delete-Pipeline-Executions-in-Redis](https://kb.armory.io/s/article/Delete-Pipeline-Executions-in-Redis)

### If Using MySQL and Need to Remove Pipeline from Execution
The following KB article advises about how to remove a stuck pipeline from MySQL:
[https://kb.armory.io/s/article/Stuck-Pipeline-Orca-with-MySQL-Editing-the-Database](https://kb.armory.io/s/article/Stuck-Pipeline-Orca-with-MySQL-Editing-the-Database)

### ORCA Zombie
Please read the following about resolving ORCA zombie executions.  The documentation outlines how to determine if it is an ORCA zombie or not, and what to do to remediate the issue[https://spinnaker.io/guides/runbooks/orca-zombie-executions/](https://spinnaker.io/guides/runbooks/orca-zombie-executions/) 

