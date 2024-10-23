---
title: Orca with SQL high memory usage / Tables information dive
---


What:Spinnaker executions fails to show.Spinnaker ui is very slow to load pipeline view with executions.Orca consumes a lot of memory.Orca dies after SSL hand shake error.Why:This error can be because the data in SQL of Orca executions is too big and Orca can't load the data.Can happen because 2 factors, but basically too much data.1) One of Orca rows has reached over the max_allowed_packet size you have defined or over the max (1Gb)2) A pipeline execution in sum has reached over this maximum.How to fix this?
Clean the data.Clear the tables pipelines, pipeline_stages, orchestrations and orchestration_stages.Note: Data can be plenty and deleting it may take a while. Hence this script creates a tmp table to store id's and then deletes from here. No risk in you query dying in the middle.Note1: Always perform a DB snapshot before deleting data in clients Prod Env.
Howto Cleanup Old Executions in Orca MySQL Database
===================================================
Important Tables:- orchestration_stages: Task Stage Executions (ref back to orchestrations)
- orchestrations: Tasks (in Tasks tab)(e.g. Save Pipeline Task)
- pipeline_stages: Stage Executions (ref back to pipelines)
- pipelines: Pipeline ExecutionsTo Remove Pipeline Executions:- Create temporary tables with the IDs of rows to remove:
    CREATE TEMPORARY TABLE old_pipelines SELECT id FROM pipelines WHERE (updated_at / 1000) 
Why Why:
For each pipeline execution Orca saves data.Each time a user loads an application pipeline view (and hence it's executions) Orca loads said executionsIf a user selects to show even more executions Orca fetches that data.Spinnaker can run smooth and fine for all your applications but one, that can be due that said application pipelines are run more often or have bigger artifacts or are run on a loop or are in the form of parent-child with multiple children or grandchildren. 
Why why why:
Orca stores the entire execution in a single column "body".
If a pipeline calls another pipeline ALL the execution of parent pipeline is stored in the child pipeline data instead of an id pointing to said data.

What to avoid:

Recurring pipelines:
```A pipeline calling itself grows significantly big rather quick. For a small footprint pipeline with 10kb artifacts your pipeline you can reach 30MB rows in SQL in 10 iterations.```
Each bake stage saves the baked artifact 4 times on SQL
Each Deploy Stage saves ALL artifacts 2 times on SQL (ALL of them, not just the one used for the deploy)


