---
title: Harness SEI SLIs
description: How we compute uptime for different Harness SEI Services
sidebar_label: Harness SEI SLIs
sidebar_position: 20
---

This is a Harness operational reference guide for all the Service Level Indicators (SLIs) across the Harness Software Engineering Insights module. Our SLO gets calculated based on these user centric SLIs. 

| **SLI**         | **Threshold**                           | **Availability**|
|-------------------------------------------|-----------------|-----------------------------------------|
| Login Failure | Greater than 30 seconds for a consecutive duration of 5 minutes |Major Outage|
| Integrations list API Error Rate | failure rate (5XX) of the API  in 5 minutes > 0.5 |Major Outage|
| Integrations list API Latency | Response time greater than 30 seconds | Degraded Performance|
| Ingestion Delay | Delay in receiving any events > 24 hours |Partial Outage|
| ETL / Aggregations  Delay| Delay in receiving any events > 48 hours |Partial Outage|
| ETL / Aggregations  Performance| Jobs stuck in scheduled state for more than 12 hours |Degraded Performance|
| ES Indexing  Delay| Delay in receiving any events > 48 hours |Partial Outage|
| UI dashboard widget Load times| Greater than 3 mins for a consecutive duration of 10 mins for all customers |Degraded Performance|
| UI landing page/dashboard page not loading| For a consecutive duration of 5 mins |Major Outage|
| Trellis Events| Delay in processing events > 24 hours or monthly calculation not finished in first 7 days |Degraded Performance|
| DB Health | DB Load > 80%  |Degraded Performance|
| ES Cluster health | ES cluster state RED / read-only mode |Partial Outage|
| Server API Error rate (5XX) | More than 1% over 5 min rolling window | Major Outage|
| API Response Time | 95th percentile: > 15s over 5 min rolling window | Degraded performance|
