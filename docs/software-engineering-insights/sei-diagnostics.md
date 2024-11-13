---
title: Diagnostics
description: Validate your data in SEI 
sidebar_label: Diagnostics
sidebar_position: 85
---

Diagnostics helps you validate data accuracy, monitor data ingestion, and troubleshoot integration related issues in the application. It provides visibility into data ingestion status, progress, and alerts to ensure the SEI system is healthy and  has the latest data updated.

## Primary scenarios

Use SEI Diagnostics if you need to:

* Compare data between Jira or supported SCM tools and SEI and verify the accuracy and completeness of ingested data
* Track real-time status of all integrations and view the summary of data ingested from each source.
* Identify and resolve integration misconfigurations
* Investigate missing tickets, commits, or pull request data in SEI reports
* Monitor status and progress of data ingestion jobs
* Receive alerts for anomalies or issues in the ingestion process

:::info Supported Integrations:

* Issue Management: Jira by Atlassian
* Source Control Management (SCM): All SCM integrations supported by SEI
:::

## System Status

Get an overview of your entire SEI system's health.

### Injestion Jobs

View details on recent and ongoing data ingestion processes.

![](./static/system-status.png)

### Ingestion Satellite Status

Monitor the health of ingestion satellites for on-prem integration setups.

## Integration Status

Check the status of individual integrations and drill down into specific issues.

![](./static/integration-status.png)

## Run Spot Check

Perform targeted validation of data for a specific timeframe or data subset.