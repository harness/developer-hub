---
title: Calculating Successful Pipeline Execution
---

## Introduction
Note: The following KB outlines how customers can calculate their executions for renewals, true-ups, and licensing.  This type of licensing is dependent on the customer contract and does not apply to all customers.  Contracts either depend on executions or the number of users.  This article relates to contracts based on executions. 
 
Armory’s Spinnaker product offerings utilize successful pipeline executions as the metric for calculating licensing costs.
A Successful Pipeline Execution (SPE) occurs when any pipeline in the production instance of Spinnaker executes with a ```complete``` status as reported by the Orca service.
#### This does include pipeline executions:
* that deploy artifacts from a production Spinnaker to non-production target environments (e.g., deploy to a staging environment)
* that do not deploy anything (e.g., an infrastructure setup/tear-down pipeline, Run Job (Manifest) task, etc.)
#### This does not include pipeline executions:
* that have a status of canceled or terminal
* take place in a non-production instance of Spinnaker or CDSH
* from Smoke Testing Applications (Armory recommends creating a dedicated application in Spinnaker for continual smoke testing to validate Spinnaker is functioning correctly)

## Prerequisites
SPEs must be calculated and reported quarterly to Armory.  There are two options for reporting an environment's SPEs:
* Let Armory do it by sending us the diagnostic data: [https://docs.armory.io/continuous-deployment/installation/ae-instance-reg/](https://docs.armory.io/continuous-deployment/installation/ae-instance-reg/)
* Calculate it by querying Orca event log data and providing the data to Armory.  Access to log data, and it is recommended data be stored in a log aggregator [https://docs.armory.io/continuous-deployment/armory-admin/observe/integrations-logging/](https://docs.armory.io/continuous-deployment/armory-admin/observe/integrations-logging/)

## Instructions
#### Option 1 - Armory Calculates
When Admins send diagnostic data to debug.armory.io, Armory can calculate the SPEs for the environment and share that information regularly.

#### Option 2 - Customer Calculates
If a company decides not to send diagnostic data to debug.armory.io, then administrators will be required to calculate SPEs according to the definition above and report it back to Armory.
The following diagram demonstrates a typical monitoring stack often used with Spinnaker.   To calculate SPEs, administrators can get it through a visualization tool, directly querying the monitoring data source or, in some cases, directly querying the Orca database.

Administrators should select an approach most suitable for how the Spinnaker environment is configured.  However, Armory recommends choosing one of the following methods:
* Querying the observability monitoring metrics datastore* Querying the events datastore* Querying the Orca database directly(Note: The Orca database is a cache database that, as a default, only retains information for about 30 days.  Depending on the configuration, data may be deleted even sooner.  If this method is selected, Admins must keep this setting in mind for data retention.)
Below are some example queries for querying two popular monitoring data sources.  Customers can also log a support ticket with Armory for additional help if using a different monitoring stack or have further questions.

#### Example Queries
Below are some example queries for typical monitoring data stores and an SQL query.  They may help get administrators to get started.
Querying the observability monitoring metrics datastore - New Relic - NRQL
```
SELECT sum(executions.completed) FROM Metric WHERE executionType = 'PIPELINE'
and status = 'SUCCEEDED' since 90 days ago where application != 'smoketesting'
Querying the observability monitoring metrics datastore - Prometheus - PromQL
increase(executions_completed_total{status="SUCCEEDED",
executionType="PIPELINE"}[90d])
Querying the Orca database directly - SQL
select count(*) from pipelines where status = 'SUCCEEDED' AND application !=
'smoketesting' and from_unixtime(start_time/1000) BETWEEN DATE_SUB(NOW(),
INTERVAL 90 DAY) AND NOW();
```
