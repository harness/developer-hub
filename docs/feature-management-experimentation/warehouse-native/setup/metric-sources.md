---
title: Preparing Metric Source Tables for Warehouse Native Experimentation
description: Learn how to prepare your metric source tables in your data warehouse for Warehouse Native Experimentation.
sidebar_label: Prepare Metric Source Tables
sidebar_position: 2
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

To prepare Metric Sources for Warehouse Native Experimentation, transform your raw event logs into a clean, standardized table that serves as the foundation for calculating metrics. 

This page describes the required fields, recommended fields, and best practices for preparing your metric source tables.

## Required columns

Every <Tooltip id="fme.warehouse-native.metric-source">Metric Source</Tooltip> table must include the following columns:

| **Column**          | **Type**             | **Description**                                                                                                                                   |
| ------------------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Unique Key**      | `STRING`               | Unique identifier for the unit of randomization (e.g., `user_id`, `account_id`, or custom key). Must align with the key in the Assignment Source. |
| **Event Timestamp** | `DATETIME` / `TIMESTAMP` | The precise time when the event occurred.                                                                                                         |
| **Event Name**      | `STRING`               | The type of event (e.g., `purchase`, `page_view`, `add_to_cart`).                                                                                 |

:::info
These fields are mandatory. Without them, Warehouse Native cannot define and calculate metrics.
:::

## Recommended columns

While not required, these fields make debugging, filtering, and governance more efficient.

| **Column**                 | **Type**                 | **Description**                                                                                                                                                                                                                                             |
| -------------------------- | ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Event Value**            | `FLOAT` / `INTEGER`          | For metrics like revenue or page load time. Examples: order amount in USD, page load time in seconds. Required for aggregation in average and sum metrics.                                                                                                  |
| **Properties (flattened)** | `STRING`, `BOOLEAN`, `NUMERIC` | Useful for filtering metrics (e.g., `country`, `device_type`, `plan_tier`).                                                                                                                                                                                 |
| **Environment ID**         | `STRING`                   | Separate prod/staging data when the same event schema is used. When configuring a Metric Source in FME, you can map column values to a Harness environment or hard-code a single environment. Metrics automatically filter by the experiment’s environment. |
| **Traffic Type**           | `STRING`                   | Distinguishes the unit type (e.g., `user`, `account`, `anonymous`). Align with Assignment Sources when experiments randomize on different units.                                                                                                             |

## Common raw table schemas

### Web/App Analytics Event Logs

| **Example Raw Schema**                                                                                    | **Transformations**                                                                                                                                                                                                                |
| --------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `user_id`  <br /> `event_name`  <br /> `event_time`  <br /> `properties (JSON)` | • Flatten properties into columns for key attributes used in metrics (e.g., `properties.amount` → `event_value`, `properties.tier` → `plan_type`). <br /> • Standardize `event_time` → `event_timestamp`. <br /> • Ensure event names are consistent (`purchase` vs `checkout_completed`). |

### E-commerce Transaction Logs

| **Example Raw Schema**                                                                                    | **Transformations**                                                                                                                                                                                                                |
| --------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `user_id`  <br /> `order_id`  <br /> `order_time`  <br /> `order_amount` <br /> `order_status` | • Map `order_time` → `event_timestamp`. <br /> • Set `event_name = 'purchase'`. <br /> • Use `order_amount` as `event_value`. <br /> • Filter only completed/valid orders (`order_status = 'completed'`). |

### Custom Business Event Tables

| **Example Raw Schema**                                                                                    | **Transformations**                                                                                                                                                                                                                |
| --------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `account_id`  <br /> `metric_type`  <br /> `metric_value`  <br /> `created_at` | • Map `account_id` → `user_id`. <br /> • Map `metric_type` → `event_name`. <br /> • Standardize `metric_value` → `event_value`. |

## Prepare your metric table

- **Consistency with Assignment Source**: Use the same key (`user_id`, `account_id`) in both tables. This is critical for joining exposures to outcomes.
- **De-duplication**: Remove duplicate event logs, which is common in streaming pipelines. Define uniqueness as (`user_id`, `event_name`, `event_timestamp`, `value`) when possible.
- **Timestamps in UTC**: Always store `event_timestamp` in UTC.
- **Flatten Properties Early**: JSON blobs are flexible but slow in downstream queries. Extract only the fields needed for metrics (e.g., `amount`, `plan_tier`, `country`).
- **Event Naming Conventions**: Standardize event names across products and teams. Avoid mixing singular and plural (for example: `purchase` vs `purchases`).
- **Partitioning and Indexing**: Partition large tables by `DATE(event_timestamp)`. Cluster or index by `user_id` or `event_name` for efficient joins with Assignment Sources.

Value Handling

Handle nulls carefully (exclude vs treat as 0 depending on the metric).
Ensure numeric fields (event_value) use consistent units (e.g., always USD, not mixed currencies).

## Example prepared table schema

| **Column**         | **Type**                   | **Notes**                                 |
| ------------------ | -------------------------- | ----------------------------------------- |
| `user_id`          | `STRING`                     | Required                                  |
| `event_timestamp`  | `TIMESTAMP`                  | Required                                  |
| `event_name`       | `STRING`                     | Required                                  |
| `event_value`      | `FLOAT`                      | Required for average and sum metric types |
| `any_custom_field` | `STRING` / `BOOLEAN` / `NUMERIC` | Optional (flattened from properties)      |
| `environment_id`   | `STRING`                     | Recommended                               |
| `traffic_type`     | `STRING`                     | Optional                                  |

Once your Metric Source tables are prepared and validated, see [Setting Up an Metric Source](/docs/feature-management-experimentation/warehouse-native/setup/) to connect them in Harness FME.