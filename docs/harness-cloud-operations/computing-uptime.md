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

## CDNG
All the Pipeline and Platform SLIs are applicable here. 

| **Component**                             | **SLI**         | **Threshold**                           | **Availability**|
|-------------------------------------------|-----------------|-----------------------------------------|----------------|
| Artifacts                         | Fetch Deployable artifact Error Rate | More than 1% over 5 min rolling window |Major Outage|
| GitOps | APIs Error rate| More than 1% over 5 min rolling window |Partial Outage|
|                                           | API Response Time | 95th percentile: > 1s over 5 min rolling window|Degraded Performance|

## Test Intelligence
All the Pipeline and Platform SLIs are applicable here. 

| **SLI**         | **Threshold**                           | **Availability**|
|-------------------------------------------|-----------------|-----------------------------------------|
| APIs Error rate | More than 1% over 5 min rolling window |Degraded performance|
| API Response Time | 95th percentile: > 1s over 5 min rolling window |Degraded Performance|

## Feature Flags 
All the Platform SLIs are applicable here. Pipeline relevant if the FF use case is tied to a pipeline. 

| **SLI**         | **Threshold**                           | **Availability**|
|-------------------------------------------|-----------------|-----------------------------------------|
| Evaluation SDK Response time | 95th percentile: > 30s over a 10 minute rolling window |Degraded performance|
| Evaluation SDK API Success rate | Less than .1% over 10 min rolling window (fails to respond or returns a 5xx)|Major Outage|
| SDK metrics publish Error rate | Metrics API fails to respond or returns 5xx (95th percentile)|Partial Outage|
| SDK Events Channel Error rate | Pushpin API fails to respond or returns 5xx (95th percentile)|Degraded performance|
| Admin CRUD Response Time | 95th percentile : < 30s over a rolling 10 min window|Degraded performance|
| Admin CRUD Error Rate | Less than .1% over a rolling 10 min window|Partial Outage|

## Dashboards 

| **SLI**         | **Threshold**                           | **Availability**|
|-------------------------------------------|-----------------|-----------------------------------------|
| Dashboards not Loading | For a duration of 60 secs |Major Outage|
| Latency in Loading dashboards | 2x of average latency in a rolling window of 5 mins |Degraded performance|
| CRUD/Actions not working | For a duration of 60 secs |Partial Outage|

## Cloud Cost Manager 
All the Pipeline and Platform SLIs are applicable here. 

| **SLI**         | **Threshold**                           | **Availability**|
|-------------------------------------------|-----------------|-----------------------------------------|
| APIs Error rate | More than 1% over 5 min rolling window |Major Outage|
| API Response Time | 95th percentile: > 1s over 5 min rolling window |Degraded performance|
| CCM UI is down (ping failure) | For a consecutive duration of 30secs |Major Outage|
| Perspective load times | Greater than 2 mins for a consecutive duration of 10 mins |Partial Outage|
| Max AutoStopping rule warmup time | Greater than 10 mins for a consecutive duration of 30 mins|Partial Outage|
| Max asset gov policy evaluation | Greater than 15 mins for a consecutive duration of 30 mins|Partial Outage|
| Cloud provider data ingestion delay | Greater than 48hrs of no data received|Partial Outage|
| K8s data at hourly granularity | No events received for more than 6 hrs|Partial Outage|
| K8s data at daily granularity | No events received for more than 48 hrs|Partial Outage|

## Chaos Engineering 
All the Platform SLIs are applicable here. Pipeline relevant if the chaos use case is tied to a pipeline. 

| **SLI**         | **Threshold**                           | **Availability**|
|-------------------------------------------|-----------------|-----------------------------------------|
| APIs Error rate | More than 1% over 5 min rolling window |Major Outage|
| API Response Time | 95th percentile: > 1s over 5 min rolling window |Degraded performance|
| Chaos UI components are not accessible | Not accessible for more than 60s |Major Outage|
| Load times on UI | Data load time > 10s consecutively over a 5 min period |Degraded performance|
| ChaosGuard Rule Evaluation Duration  | The ChaosGuard rule evaluation stage takes >10s consecutively over a 5 min period across experiment runs |Degraded performance|

## Security Test Orchestration 
All the Platform SLIs are applicable here. Pipeline relevant if the STO use case is tied to a pipeline. 

| **SLI**         | **Threshold**                           | **Availability**|
|-------------------------------------------|-----------------|-----------------------------------------|
| APIs Error rate | More than 1% over 5 min rolling window |Major Outage|
| API Response Time | 95th percentile: > 1s over 5 min rolling window |Degraded performance|
| Security Step Executions Failures | 25% increase in security stage execution failures in a rolling window of 5 mins |Partial outage|

## Error Tracking
All the Platform SLIs are applicable here. 

| **SLI**         | **Threshold**                           | **Availability**|
|-------------------------------------------|-----------------|-----------------------------------------|
| APIs Error rate | More than 1% over 5 min rolling window |Major Outage|
| API Response Time | 95th percentile: > 1s over 5 min rolling window |Degraded performance|
| Agent cannot connect to CET collector | For a consecutive duration of 60 secs |Major outage|
| Agent not being shown as connected in the UI | For a consecutive duration of 60 secs |Partial outage|
|| Latency greater than 30 seconds for a consecutive duration of 10 mins (95th percentile) |Degraded performance|
| UI is down | For a consecutive duration of 30 secs |Major outage|
| ARC screen is down | No hit is openable |Major outage|
|| Some hits aren’t openable - at least 20% of the hits in a total of at least 20 unique events |Degraded performance|
| Tiny links not working | Tiny link doesn’t direct to a viewable ARC screen |Partial outage|
|| Tiny link should be clickable after no more than 90s after it was logged |Degraded performance|
| New events/Metrics don’t show up on the summary or event list | For a consecutive duration of 180 secs |Major outage|
|| Latency greater than 125 seconds in metrics since happened in the agent until shown in the UI |Degraded performance|
| Notifications | Expected notification doesn’t arrive for a consecutive duration of 60 secs after the ETA |Major outage|
|| Latency greater than 30 seconds |Degraded performance|
|| Links in notifications don’t work |Degraded performance|
| Admin operations not working
(Including: Tokens, Critical events, hide & resolve events, Jira integration, Notifications, Saved Search) |For a consecutive duration of 30secs |Major outage|

## Developer Platform
All the Platform SLIs are applicable here. 

| **SLI**         | **Threshold**                           | **Availability**|
|-------------------------------------------|-----------------|-----------------------------------------|
| IDP UI is down(Included: Catalog, Self service Hub, Scorecards Excluded: Non-Harness owned plugins)| For a consecutive duration of 30secs |Major Outage|
| IDP admin UI is down | For a consecutive duration of 30secs |Partial Outage|
| Unable to access Service Catalog APIs | 5XX Errors for a consecutive duration of 30secs (95th percentile) |Major outage|
|| Latency greater than 30 seconds for a consecutive duration of 10 mins (95th percentile) |Partial outage|
| Scorecards not functional | 5XX Errors for a consecutive duration of 30secs (95th percentile) |Partial outage|
|| Latency greater than 60 seconds for a consecutive duration of 10 mins (95th percentile) |Degraded Performance|
| Issue with IDP admin operations | 5XX Errors for a consecutive duration of 30secs (95th percentile) |Partial outage|
|| Latency greater than 10 seconds for a consecutive duration of 10 mins (95th percentile) |Degraded Performance|
| Open Source Plugins functionality | 5XX Errors for a consecutive duration of 30secs (95th percentile) |Degraded Performance|
|| Latency greater than 30 seconds for a consecutive duration of 10 mins (95th percentile) |Degraded Performance|
