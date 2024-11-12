---
title: How to Cleanup Old Executions in Orca MySQL Database
---

## Introduction

Some customers may have reasons for clearing old pipeline and task execution data out of Spinnaker, such as compliance requirements.  This explains how to run a few queries to remove old pipeline and task execution data.Important Tables:
* orchestration_stages: Task Stage Executions (ref back to orchestrations)* orchestrations: Tasks (in Tasks tab)(e.g. Save Pipeline Task)* pipeline_stages: Stage Executions (ref back to pipelines)* pipelines: Pipeline Executions


## Prerequisites
MySQL client access to the Orca database

## Instructions
### To Remove Pipeline Executions:
Create temporary tables with the IDs of rows to remove:
``` CREATE TEMPORARY TABLE old_pipelines SELECT id FROM pipelines WHERE (updated_at / 1000) ```

Remove rows:
```
DELETE FROM pipeline_stages WHERE id IN (SELECT id FROM old_pipeline_stages);
DELETE FROM pipelines WHERE id IN (SELECT id FROM old_pipelines);​
Cleanup the temporary tables:
DROP TABLE old_pipeline_stages;
DROP TABLE old_pipelines;​
```
### To Remove Orchestration Executions (Tasks Tab):
Create temporary tables with the IDs of rows to remove:
``` CREATE TEMPORARY TABLE old_orchestrations SELECT id FROM orchestrations WHERE (updated_at / 1000) ```

Remove rows:
```
DELETE FROM orchestration_stages WHERE id IN (SELECT id FROM old_orchestration_stages);
DELETE FROM orchestrations WHERE id IN (SELECT id FROM old_orchestrations);​
Cleanup the temporary tables:
DROP TABLE old_orchestration_stages;
DROP TABLE old_orchestrations;​
```

