---
title: Harness SEI SLIs
description: How we compute uptime for different Harness SEI Services
sidebar_label: Harness SEI SLIs
sidebar_position: 20
---

This is a Harness operational reference guide for all the Service Level Indicators (SLIs) across the Harness Software Engineering Insights module. Our SLO gets calculated based on these user centric SLIs. 

## Weightage factor

Harness operations apply a weighting factor to the SLIs post any incidents. 

- Major outage = 100% of the downtime hit 
- Partial = 30% of the downtime hit
- Degraded performance = None. This is because our stance is that a degraded performance does impact the user experience but it’s not technically downtime.

A production incident, commonly known as an "incident," is an unexpected event or problem that arises within our live production environments, resulting in either complete or partial service disruptions. In the case of a partial incident, it renders one or more functions of a module nonfunctional or inaccessible. All production incidents are posted in our status page (https://status.harness.io) and our users can subscribe to the feeds from this site to get notified. 

## SEI SLIs

| **SLI**         | **Threshold**                           | **Availability**|
|-------------------------------------------|-----------------|-----------------------------------------|
| Integrations list API Error Rate | failure rate (5XX) of the API  in 5 minutes > 0.5 | Major outage |
| Integrations list API Latency | Response time greater than 30 seconds | Degraded performance|
| Ingestion & data processing delay | Greater than 72 hrs of no data received | Degraded performance |
| UI dashboard widget loading time | Greater than 3 mins for a consecutive duration of 10 mins for all customers | Degraded performance |
| UI landing page/dashboard page not loading| For a consecutive duration of 5 mins |Major outage|
| Trellis events| Delay in processing trellis data > 24 hours or monthly calculation not finished in first 7 days |Degraded performance|
| Server API Error rate (5XX) | More than 1% over 5 min rolling window | Major outage|
| API Response Time | 95th percentile: > 15s over 5 min rolling window | Degraded performance|

:::info Third-party integrations and ingestion impact

Changes, upgrades, or issues in third-party integrations can sometimes lead to delays in data ingestion and processing.

While these delays do not indicate an internal failure, they can affect the timeliness of data availability. To address this, our system will send in-product notifications to keep users informed, ensuring transparency and reducing any unnecessary concerns.

:::





