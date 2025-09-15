---
title: Pipeline Insights Field Reference
description: Complete catalog of data fields available in Harness Pipeline Analytics for building dashboards, reports, and analytics queries.
sidebar_position: 5
sidebar_label: Pipeline Insights
tags:
  - pipeline analytics
  - fields
  - dimensions
  - measures
  - dashboards
  - reporting
keywords:
  - harness
  - pipeline analytics
  - ci/cd metrics
  - dashboard fields
  - pipeline executions
  - stage executions
  - step executions
---

Pipeline Insights offers a comprehensive set of data fields that organizations can use to construct sophisticated dashboards, generate detailed reports, and perform advanced analytics on their CI/CD pipeline metrics.

## Overview

Pipeline Insights provides three main data explores:
- **Pipeline Executions**: High-level pipeline run data
- **Stage Executions**: Individual stage performance within pipelines  
- **Step Executions**: Granular step-level execution details

Each explore contains **Dimensions** (attributes for grouping and filtering) and **Measures** (calculated metrics for analysis).

## Pipeline Executions

Track overall pipeline performance, success rates, and execution patterns.

### Dimensions
| Field | Description |
|-------|-------------|
| **Duration** | Total time taken for the pipeline execution |
| **End Time** | When the pipeline finished (available as date, month, quarter, time, year, week) |
| **Error Message** | Error details for failed pipeline runs |
| **Execution ID** | Unique identifier for each pipeline execution |
| **Name** | Pipeline name |
| **Pipeline ID** | Unique identifier for the pipeline definition |
| **Pipeline URL** | Direct link to the pipeline in Harness UI |
| **Start Time** | When the pipeline run began (available as date, month, quarter, time, year, week) |
| **Status** | Execution outcome (Success, Failed, etc.) |

### Measures
| Field | Description |
|-------|-------------|
| **Duration** | Statistical analysis of execution times (Average, 10th, 25th, 75th, 80th, 90th, 95th percentiles) |
| **Execution Count** | Total number of pipeline executions in the selected time period |
| **Failure Rate** | Percentage of executions that failed (includes Failed, Aborted, Rejected, Error, Expired, Discontinuing statuses) |
| **Last Execution Time** | Most recent execution timestamp for the pipeline |
| **Success Rate** | Percentage of executions that completed successfully |

---

## Stage Executions

Analyze individual stage performance within your pipelines.

### Dimensions
| Field | Description |
|-------|-------------|
| **Duration** | Time taken for the stage execution |
| **End Time** | When the stage completed (available as date, month, quarter, time, year, week) |
| **Execution ID** | Unique identifier for the stage execution |
| **Is Evaluated** | Whether conditional evaluation was performed (Yes/No) |
| **Is Input Configured** | Whether the stage had configured input parameters (Yes/No) |
| **Is Rollback** | Whether this is a rollback stage (Yes/No) |
| **Name** | Stage display name |
| **Pipeline ID** | Parent pipeline identifier |
| **Pipeline Status** | Status of the parent pipeline after this stage |
| **Stage ID** | Unique identifier for the stage definition |
| **Start Time** | When the stage began execution (available as date, month, quarter, time, year, week) |
| **Status** | Stage execution outcome (Succeeded, Failed, etc.) |
| **Type** | Stage category (Approval, Deployment, Custom, etc.) |
| **When Condition** | Conditional logic that determined if the stage should run |

### Measures
| Field | Description |
|-------|-------------|
| **Duration** | Statistical analysis of stage execution times (Average, 10th, 25th, 75th, 80th, 90th, 95th percentiles) |
| **Execution Count** | Total number of stage executions |
| **Failure Rate** | Percentage of stage executions that failed (includes Failed, Aborted, Rejected, Error, Expired, Discontinuing statuses) |
| **Last Execution Time** | Most recent stage execution timestamp |
| **Stage Count** | Number of stages across all pipeline runs in the selected scope |
| **Success Rate** | Percentage of stage executions that completed successfully |
| **Total Pipeline Runs** | Total pipeline executions in the selected scope (useful for context and normalization) |

---

## Step Executions

Examine detailed step-level execution data for granular analysis.

### Dimensions
| Field | Description |
|-------|-------------|
| **Duration** | Time taken for the individual step execution |
| **End Time** | When the step completed (available as date, month, quarter, time, year, week) |
| **Execution ID** | Unique identifier for the step execution |
| **Name** | Step display name |
| **Pipeline ID** | Parent pipeline identifier (for tracing back to pipeline level) |
| **Stage Execution ID** | Parent stage execution identifier |
| **Start Time** | When the step began execution (available as date, month, quarter, time, year, week) |
| **Status** | Step execution outcome (Success, Failed, Skipped, etc.) |
| **Step ID** | Unique identifier for the step definition |
| **Type** | Step category (script, plugin, approval, etc.) |

### Measures
| Field | Description |
|-------|-------------|
| **Duration** | Statistical analysis of step execution times (Average, 10th, 25th, 75th, 80th, 90th, 95th percentiles) |
| **Execution Count** | Total number of step executions in the selected scope |
| **Failure Rate** | Percentage of step executions that failed (includes Failed, Aborted, Rejected, Error, Expired, Discontinuing statuses) |
| **Last Execution Time** | Most recent step execution timestamp |
| **Step Count** | Total number of steps across all pipelines (useful for aggregate analysis) |
| **Success Rate** | Percentage of step executions that completed successfully |

---

## Account Context Fields

These fields provide organizational context and are available across all explores.

| Field | Description |
|-------|-------------|
| **Account ID** | Your Harness account identifier |
| **Organization ID** | Organization identifier within your account |
| **Project ID** | Project identifier for scoping data |

---

## Usage Tips

- **Time-based Analysis**: Use Start Time and End Time dimensions with different granularities (date, week, month, quarter, year) for trend analysis
- **Performance Monitoring**: Combine Duration measures with percentile breakdowns to identify performance outliers
- **Success Tracking**: Use Success Rate and Failure Rate measures to monitor pipeline reliability
- **Hierarchical Analysis**: Link Pipeline ID → Stage Execution ID → Step Execution ID to drill down from high-level trends to specific issues
- **Filtering**: Use Status dimensions to focus on specific execution outcomes
- **Comparative Analysis**: Use Execution Count measures to understand volume patterns across different time periods

## Related Resources

- [Harness Pipeline Documentation](https://developer.harness.io/docs/platform/pipelines/)
- [Dashboard Creation Guide](https://developer.harness.io/docs/platform/dashboards/)
- [CCM Analytics Example](https://developer.harness.io/docs/cloud-cost-management/use-ccm-cost-reporting/use-ccm-dashboards/ccm-explore/)
