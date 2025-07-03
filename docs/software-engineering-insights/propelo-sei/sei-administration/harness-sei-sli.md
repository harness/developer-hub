---
title: Harness SEI SLIs
description: How we compute uptime for different Harness SEI Services
sidebar_label: Harness SEI SLIs
sidebar_position: 20
redirect_from:
  - /docs/software-engineering-insights/sei-administration/harness-sei-sli
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
| APIs Error rate | More than 5% over 5 min rolling window | Major outage |
| API Response Time | 95th percentile: > 2s over 5 min rolling window | Degraded performance|
| Ingestion & data processing delay | Delay of more than 72 hours for the latest data to appear on the dashboard. <br />This threshold excludes delays caused by pending customer actions. In the event of failures, processing historical data may take additional time depending on the volume of data that needs to be backfilled. | Degraded performance |

:::info Third-party integrations and ingestion impact

Changes, upgrades, or issues in third-party integrations can sometimes lead to delays in data ingestion and processing.

While these delays do not indicate an internal failure, they can affect the timeliness of data availability. To address this, our system will send in-product notifications to keep users informed, ensuring transparency and reducing any unnecessary concerns.

:::





