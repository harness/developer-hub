---
title: Preparing Assignment Source Tables for Warehouse Native Experimentation
description: Learn how to prepare your assignment source tables in your data warehouse for Warehouse Native Experimentation.
sidebar_label: Prepare Assignment Source Tables
sidebar_position: 1
---

<CTABanner
  buttonText="Request Access"
  title="Warehouse Native is in beta!"
  tagline="Get early access to run Harness FME experiments directly in your data warehouse."
  link="https://developer.harness.io/docs/feature-management-experimentation/fme-support"
  closable={true}
  target="_self"
/>

## Overview

To prepare Assignment Sources for Warehouse Native Experimentation, transform your raw exposure or impression logs into a clean, standardized table that serves as the foundation for experimentation analyses.

This page describes the required fields, recommended fields, and best practices for preparing your assignment source tables.

## Required columns

Every <Tooltip id="fme.warehouse-native.assignment-source">Assignment Source</Tooltip> table must include the following columns:

| Column                        | Type                     | Description                                                                                                                                             |
| ----------------------------- | ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Unique Key**                | `STRING`                 | Unique identifier for the unit of randomization (for example, `user_id`, `account_id`, or a custom key). Must be stable across the experiment duration. |
| **Exposure Timestamp**        | `DATETIME` / `TIMESTAMP` | The precise time when the assignment occurred (for example, when an impression was logged, a flag evaluated, or `getTreatment` was called).             |
| **Treatment (Variant Group)** | `STRING`                 | The assigned experiment variant (for example, `control`, `treatment_a`, `variant_1`).                                                                   |

:::info
These fields are mandatory. Without them, Warehouse Native cannot map exposures to experiment results.
:::

## Recommended columns

While not required, the following fields make debugging, filtering, and governance more efficient.

| Column                   | Type     | Description                                                                                                                                                                                                                                                                         |
| ------------------------ | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Experiment ID / Name** | `STRING` | Helps differentiate exposures when multiple experiments are logged in the same raw table.                                                                                                                                                                                           |
| **Targeting Rule**       | `STRING` | Indicates which targeting rule or condition led to the assignment. Useful for audit and debugging. If you are using FME feature flag impressions, filter by a single targeting rule to ensure the experiment analyzes the intended population.                                              |
| **Environment ID**       | `STRING` | Allows filtering by environment (for example, `production`, `staging`). When configuring an assignment source in FME, you can map column values to a matching Harness environment or hard-code a single environment. When creating an experiment, it must be scoped to one environment. |
| **Traffic Type**         | `STRING` | Distinguishes the unit type (for example, `user`, `account`, `anonymous visitor`). When configuring an assignment source, you can map column values or hard-code the environment. Each experiment must be scoped to one traffic type.                                                     |

## Common raw table schemas

Most organizations log impressions or exposures from feature flag evaluations, SDKs, or event pipelines. Below are common raw schemas and how to normalize them.

### Feature Flag Evaluation Logs

| **Example Raw Schema**                                                                                    | **Transformations**                                                                                                                                                                                                                |
| --------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `user_id`  <br /> `flag_name`  <br /> `treatment`  <br /> `impression_time`  <br /> `environment`  <br /> `rule_id` | • Map `flag_name` values → `experiment_id` (if multiple flags correspond to the same experiment). <br /> • Cast `evaluation_time` to `TIMESTAMP`. <br /> • Deduplicate on `(user_id, experiment_id)` by keeping the earliest exposure. |

### A/B Test Impression Logs

| **Example Raw Schema**                                                          | **Transformations**                                                                                                                                                            |
| ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `experiment_id`  <br /> `user_id`  <br /> `bucket` or `arm`  <br /> `impression_time` | • Standardize `bucket` → `treatment`. <br /> • Standardize `impression_time` → `exposure_timestamp`. <br /> • Deduplicate to keep only the first exposure per user per experiment. |


### Event Logging Pipelines (Custom Analytics Events)

| **Example Raw Schema**                                                                                                 | **Transformations**                                                                                                                                                        |
| ---------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `event_name`  <br /> `event_time`  <br /> `properties.experiment_id`  <br /> `properties.variant`  <br /> `properties.user_id` | • Flatten nested fields (`JSON` → explicit columns). <br /> • Filter to only `event_name = 'experiment_exposure'`. <br /> • Standardize column names to match required schema. |

## Prepare your assignment table

Follow these best practices for preparing your assignment table in your data warehouse.

- **De-duplication**: Keep only the earliest exposure per user per experiment. For example: 

  ```sql
  QUALIFY ROW_NUMBER() OVER (
    PARTITION BY user_id, experiment_id
    ORDER BY exposure_timestamp ASC
  ) = 1
  ```

- **Consistent Variant Labels**: Standardize variant naming (`control`, `treatment`, `variant_1`) across experiments. Avoid null or empty strings; default to `control` if needed.

- **Timestamps in UTC**: Store all exposure timestamps in UTC for consistent comparisons across regions.

- **Stable Identifiers**: Use the same user or account key across <Tooltip id="fme.warehouse-native.assignment-source">Assignment Source</Tooltip> and <Tooltip id="fme.warehouse-native.metric-source">Metric Source</Tooltip> tables. If your system logs multiple IDs (for example, `cookie_id` and `user_id`), choose the most stable one.

- **Environment Separation**: If raw tables mix environments (for example, `staging` and `production`), add an `environment_id` column and filter accordingly. This prevents accidental inclusion of test data in production environments.

- **Partitioning and Indexing**: Partition large tables by `DATE(exposure_timestamp)` to optimize query performance. Cluster or index by `experiment_id` and `user_id` for faster lookups.

## Example prepared table schema

| Column             | Type      | Example                |
| ------------------ | --------- | ---------------------- |
| `user_id`            | `STRING`    | `abc123`               |
| `experiment_id`      | `STRING`    | `checkout_flow_v2`     |
| `treatment`          | `STRING`    | `control`              |
| `exposure_timestamp` | `TIMESTAMP` | `2025-03-14T12:45:00Z` |
| `environment_id`     | `STRING`    | `prod`                 |
| `traffic_type`       | `STRING`    | `user`                 |

Once your Assignment Source tables are prepared and validated, see [Setting Up an Assignment Source](/docs/feature-management-experimentation/warehouse-native/setup/) to connect them in Harness FME.