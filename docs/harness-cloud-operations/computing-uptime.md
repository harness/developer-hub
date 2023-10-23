---
title: Computing uptime for Harness Modules
description: How we compute uptime for different Harness Modules
sidebar_label: Computing uptime for Harness Modules
---

This is a Harness operational reference guide for all the Service Level Indicators (SLIs) across our modules. Our SLO gets calculated based on these user centric SLIs. 

## Weightage Factor
Harness operations apply a weighting factor to the SLIs post any incidents. 

Major outage = 100% of the downtime hit 
Partial = 30% of the downtime hit
Degraded performance = None  (our stance is that a degraded performance does impact the user experience but it’s not technically downtime)

A production incident, commonly known as an "incident," is an unexpected event or problem that arises within our live production environments, resulting in either complete or partial service disruptions. In the case of a partial incident, it renders one or more functions of a module nonfunctional or inaccessible. All production incidents are posted in our status page (https://status.harness.io) and our users can subscribe to the feeds from this site to get notified. 

## Service Level Indicators specific to Harness Modules

## Pipelines
Pipeline is a core construct of the Harness platform. All of the SLIs defined here will be applicable to CD, CI, STO and for that fact, any other modules where the usage is tied to a pipeline. 

| **Component**                             | **SLI**         | **Threshold**                           | **Availability**|
|-------------------------------------------|-----------------|-----------------------------------------|----------------|
| Pipeline/Triggers                         | APIs Error rate | More than 1% over 5 min rolling window |Major Outage|
|                                           | API Response Time | 95th percentile: > 1s over 5 min rolling window |Degraded Performance|
| Pipeline Executions failure caused by Harness platform | Failure rate Increase| More than 1% over 5 min rolling window |Partial Outage|
|                                           | Slow Executions | 2x of average latency in a rolling window of 5 mins|Degraded Performance|
| Triggers                                  | Trigger Activations | More than 1% over 5 min rolling window |Degraded Performance|

## Platform
Core platform constructs and services are foundational to Harness modules and any breach of these SLIs will impact all of the Harness modules. 

| **Component**                             | **SLI**         | **Threshold**                           | **Availability**|
|-------------------------------------------|-----------------|-----------------------------------------|----------------|
| Access Control                         | Permissions Change Processing Time | New permissions (additions/removals) should take effect within 5 minutes  |Degraded Performance|
| Platform resources (All APIs) - Account, Login, Project/Org, Connectors, Secrets, Delegate, Settings, Notifications, Audits, Templates, Services, Environments , Policies, File Store, Log Uploads| API Error rate | More than 1% over 5 min rolling window | Partial Outage |                               
||API Response Time|95th percentile: > 1s over 5 min rolling window|Degraded Performance|
| Notifications                         | Notification Delivery Latency | 99% of notifications are dispatched within 1 minute from the moment they are sent to the notification service |Degraded Performance|





## Continuous Delivery (Current Gen)
| **SLI**                                   | **Threshold**                                                | Outage Kind    |
|-------------------------------------------|--------------------------------------------------------------|----------------|
| Dashboard ART                             | Greater than 10 seconds for a consecutive duration of 5 mins | Partial Outage |
| Pipeline and Workflow executions ART      | Greater than 30 seconds for a consecutive duration of 5 mins | Partial Outage |

## Continuous Delivery (Next Gen)
| **SLI**                                                               | **Threshold**                                                | Outage Kind    |
|-----------------------------------------------------------------------|--------------------------------------------------------------|----------------|
| Dashboard ART                             | Greater than 10 seconds for a consecutive duration of 5 mins(P95) | Partial Outage |
| Event In Queue Time      | Greater than 30 seconds for a consecutive duration of 10 mins | Major Outage |
| Event In Queue Time      | Greater than 20s for a consecutive duration of 10 mins | Partial Outage |
| List Executions P95 (Pipeline execution summary)     | If greater than 10 seconds for 5 mins consecutive then major outage| Major Outage |
| List Executions P95 (Pipeline execution summary)`     | If greater than 5 seconds for 5 mins consecutive then partial outage| Partial Outage |
| List Executions P95 (Pipeline list)     | If greater than 10 seconds for 5 mins consecutive then major outage| Major Outage |
| List Executions P95 (Pipeline list)`    | If greater than 5 seconds for 5 mins consecutive then partial outage| Partial Outage |
| GitOps APIs ART     | Greater than 10 seconds for a consecutive duration of 5 mins| Major Outage |
| GitOps APIs ART     | Greater than 5 seconds for a consecutive duration of 5 mins| Partial Outage |

## Continuous Integration 
| **SLI**                                                               | **Threshold**                                                | Outage Kind    |
|-----------------------------------------------------------------------|--------------------------------------------------------------|----------------|
| CI Manager ART                             | Greater than 30 seconds for a consecutive duration of 5 mins | Major Outage |
| CI Manager Execution health ART    | No executions messages for more than 30 mins | Major Outage |
| CIE Self hosted runners (Error Rate Increase (Builds are failing))| 5% of total requests fail with 5xx errors in a rolling window of 5 mins for initialization phase | Major Outage |
| CIE Self hosted runners (Error Rate Increase (Builds are failing))| 5% of total requests fail with 5xx errors in a rolling window of 5 mins for cleanup phase | Partial Outage|
| CIE Self hosted runners (Event processing time (Builds are slow))|2x of average latency in a rolling window of 5 mins for the following: Events framework Redis and 20% decrease is delegate task queue throughput| Degraded performance|
| CIE Cloud Builds - Windows|SLIs similar to CIE Self hosted runners plus additional SLI below| |
| CIE Cloud Builds - Windows|Error Rate Increase (Builds are failing)|5% of total requests fail with 5xx errors in a rolling window of 5 mins for our internal Dlite service |Major Outage|
| CIE Cloud Builds - Linux|SLIs similar to CIE Self hosted runners and CIE Cloud Builds - Windows, plus additional SLI below| |
| CIE Cloud Builds - Linux|Error Rate Increase (Builds are failing but fallback to GCP)|5% of total requests fail with 5xx errors in a rolling window of 5 mins for Nomad and Consul internal services| Degraded performance|
| CIE Cloud Builds - Mac|SLIs similar to CIE Self hosted runners and CIE Cloud Builds - Windows, plus additional SLI below| |
| CIE Cloud Builds - Linux|Error Rate Increase (Builds are failing but fallback to GCP)|5% of total requests fail with 5xx errors in a rolling window of 5 mins for the internal Anka service| Major Outage|

## Cloud Cost Management 
| **SLI**                                                               | **Threshold**                                                | Outage Kind    |
|-----------------------------------------------------------------------|--------------------------------------------------------------|----------------|
| GraphQL / REST API                             | Greater than 30 seconds for a consecutive duration of 5 mins | Major Outage |
| Drops in the incoming message count event-service      | No incoming messages for more than 30 mins | Major Outage |
| Lightwing APIs ART      | Greater than 30 seconds for a consecutive duration of 5 mins | Major Outage |
| Faktory Queue job wait time      | Greater than 30 sec for a consecutive duration of 5 mins | Major Outage |

## Feature Flags 
| **SLI**                                                               | **Threshold**                                                | Outage Kind    |
|-----------------------------------------------------------------------|--------------------------------------------------------------|----------------|
| Feature Flag Dashboard RestAPI ART                            | Greater than 30 seconds for a consecutive duration of 5 mins | Partial Outage |
| Evaluation API      | Greater than 45 seconds for consecutive duration of 5min | Major Outage |
| Metrics API      | Greater than 45 seconds for consecutive duration of 5min | Partial Outage |

## Security Testing Orchestration 
| **SLI**                                                               | **Threshold**                                                | Outage Kind    |
|-----------------------------------------------------------------------|--------------------------------------------------------------|----------------|
| STO Call-HTTP to pipeline-service ART                            | Greater than 10 seconds for a consecutive duration of 5 mins | Major Outage |
| STO Call-HTTP to pipeline-service ART                            | Greater than 5 seconds for a consecutive duration of 5 mins | Partial Outage |
| STO Core API ART                            | Greater than 30 seconds for a consecutive duration of 5 mins  | Major Outage |
| STO pipeline - Create/modify                            | Greater than 30 seconds for a consecutive duration of 5 mins   | Partial Outage |



