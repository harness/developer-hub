---
title: Delete Pipeline Executions in Redis
---

## Introduction
Redis can be used as a backend storage that will store the pipeline executions. In the case that there is a stuck pipeline or the pipeline execution needs to be deleted the following steps an be taken to manually delete the executions.

## Prerequisites
### Locate the Pipeline ID and Pipeline Execution ID 
#### Via Source
Both pieces of information can be found in the execution details.  Navigate to the pipeline, and go to **Execution Details** -> **Source**
The pipeline id will be labeled ```id``` and will be one of the first lines.
The execution id will be ```execution_id``` and will be towards the end.
#### Via the URL of Resources in the Console
The URL for the pipeline when editing the pipeline from the console also contains the ```Pipeline ID`/#/applications//executions/configure/****```
The URL for the permalink (next to the source location above) will contain the information about the ```Pipeline Execution ID /#/applications//executions/details/****?stage=0&step=0&details=```
#### Via Orca Logs
The ```Pipeline Execution ID``` can also be found within the logs of the Orca instance, by running
```kubectl logs -n  deploy/spin-orca -f ```
Sometimes, locating the execution ID can be difficult unless it can be identified from any other executions that are running at the time

## Instructions
Display all executions from this pipeline:
```zrange pipeline:executions:{pipeline_id} 0 -1 ​```
2. For each execution that you want to remove:
```zrem pipeline:executions:{pipeline_id} {execution_id}​```
3. Delete the execution:
````
del pipeline:${execution_id}
del orchestration:${execution_id} ​
````