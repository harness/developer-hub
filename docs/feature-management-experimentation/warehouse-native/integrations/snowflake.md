---
title: Connect Snowflake 
description: Learn how to integrate Snowflake with Harness FME to enable Warehouse Native Experimentation.
sidebar_label: Snowflake
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

<Tooltip id="fme.warehouse-native.warehouse-native">Warehouse Native Experimentation</Tooltip> allows you to run experiments on data that already lives in your <Tooltip id="fme.warehouse-native.data-warehouse">data warehouse</Tooltip>. By connecting Harness FME directly to your Snowflake instance, you can securely query and analyze experiment data from your source of truth. 

To begin, connect your Snowflake instance as a data source.

### Prerequisites

Ensure that you have the following before getting started:

- Access to your organization's Snowflake instance
- A Snowflake role with appropriate read access to the database and schema containing experiment data, and write access to a results table
- A private key and associated user configured for key-pair authentication
- A designated results table where experiment results are stored in Snowflake

## Setup

Harness recommends the following best practices:

- Use a service account rather than a personal Snowflake user.
- Grant read-only access to the databases and schemas Harness FME queries.
- Rotate private keys periodically.
- If your Snowflake instance enforces [inbound restrictions](https://docs.snowflake.com/en/developer-guide/external-network-access/creating-using-external-network-access), confirm network and IP allowlisting.

To integrate Snowflake as a data warehouse for Warehouse Native Experimentation:

1. Select Snowflake as your data warehouse. In the **Data Sources** tab of your Harness FME project, select **Snowflake** from the list of supported data warehouses.
1. Enter the following connection details:

   | Field | Description | Example |
   |---|---|---|
   | Server (Account Identifier) | Your Snowflake account identifier or server URL. | `xy12345.us-west-2` |
   | Warehouse | The compute warehouse Harness FME should use to execute queries. | `ANALYTICS_WH` |
   | Database | The database containing your experimentation data. | `PROD_EXPERIMENTS` |
   | Schema | The schema within your database containing your experiment or metric data. | `AB_TESTING` |
   | Username | The Snowflake username tied to your private key. | `fme_service_user` |
   | Role | The Snowflake role to assume for this connection. | `DATA_ANALYST` |
   | Results Table Name | The name of the table where experiment results are stored. | `EXPERIMENT_RESULTS` |

   :::info Note
   Harness FME respects Snowflake's built-in [role-based access controls](https://docs.snowflake.com/en/user-guide/security-access-control-privileges). The data source connection only has access to objects allowed for the specified role.
   :::
  
1. Provide authentication credentials. Harness FME supports [key pair authentication](https://docs.snowflake.com/en/user-guide/key-pair-auth) for secure, password-less access. 

   * Option 1: Paste your private key directly into the text field.
   * Option 2: Upload a private key file.

   Ensure the key corresponds to the username provided and is not encrypted with a passphrase.

1. Select a database and a schema. After authentication, you can browser available databases, schemas, and tables based on your role permissions. Select the database and schema that contain your <Tooltip id="fme.warehouse-native.assignment-source">assignment</Tooltip> and <Tooltip id="fme.warehouse-native.metric-source">metric source</Tooltip> tables.
1. Specify a results table. Designate a results table where Harness FME will write experiment analysis results. Ensure the following:

   * The table exists in your database.
   * The schema matches the expected format for experiment results below.

   <br />
   | Field | Type | Description |
   |---|---|---|
   | `METRICRESULTID` | `VARCHAR` | Unique identifier representing a specific calculation per metric, per experiment, per analysis run. |
   | `TREATMENT` | `VARCHAR` | The experiment variant (e.g., Control or Treatment) associated with the metric results. |
   | `DIMENSIONNAME`  | `VARCHAR` | The name of the dimension being analyzed (e.g., country, platform). |
   | `DIMENSIONVALUE` | `VARCHAR` | The corresponding value of the analyzed dimension. |
   | `ATTRIBUTEDKEYSCOUNT` | `NUMBER` | Count of unique keys (users, sessions, etc.) attributed to this metric result. |
   | `REQUESTTIMESTAMP` | `TIMESTAMP_NTZ` | Timestamp when the metric computation request occurred. |
   | `MIN` | `FLOAT` | Minimum observed value for the metric. |
   | `MAX` | `FLOAT` | Maximum observed value for the metric. |
   | `COUNT` | `NUMBER` | Total number of observations included in the metric calculation. |
   | `SUM` | `FLOAT` | Sum of all observed metric values. |
   | `MEAN` | `FLOAT` | Average (mean) of the metric values. |
   | `P50` | `FLOAT` | 50th percentile (median) metric value. |
   | `P95` | `FLOAT` | 95th percentile metric value. |
   | `P99` | `FLOAT` | 99th percentile metric value. |
   | `VARIANCE` | `FLOAT` | Variance of the metric values. |
   | `EXCLUDEDUSERCOUNT` | `NUMBER` | Number of users excluded from the analysis (due to filters, SRM, etc.). |
   | `ASOFTIMESTAMP` | `TIMESTAMP_NTZ` | Timestamp representing when the result snapshot was written. |

   To create the results table with the correct structure, run the following SQL statement in Snowflake:

   ```sql
   CREATE OR REPLACE TABLE <DATABASE_NAME>.<SCHEMA_NAME>.<TABLE_NAME> (
      METRICRESULTID VARCHAR(16777216),
      TREATMENT VARCHAR(16777216),
      DIMENSIONNAME VARCHAR(16777216),
      DIMENSIONVALUE VARCHAR(16777216),
      ATTRIBUTEDKEYSCOUNT NUMBER(38,0),
      REQUESTTIMESTAMP TIMESTAMP_NTZ(9),
      MIN FLOAT,
      MAX FLOAT,
      COUNT NUMBER(38,0),
      SUM FLOAT,
      MEAN FLOAT,
      P50 FLOAT,
      P95 FLOAT,
      P99 FLOAT,
      VARIANCE FLOAT,
      EXCLUDEDUSERCOUNT NUMBER(38,0),
      ASOFTIMESTAMP TIMESTAMP_NTZ(9)
   );
   ```

1. Test the connection by clicking **Test Connection**. Harness FME confirms the following:

   * The credentials and key pair are valid.
   * The warehouse and role are accessible.
   * The specified database and schema exist and are accessible.

1. Save and activate. Once the test passes, click **Save** to create the connection. 

Your Snowflake data source can now be used to create assignment and metric sources for Warehouse Native Experimentation.

## Example Snowflake configuration

| Setting           | Example              |
| ----------------- | -------------------- |
| Vendor        | Snowflake            |
| Server        | `xy12345.us-west-2`  |
| Warehouse     | `ANALYTICS_WH`       |
| Database      | `PROD_EXPERIMENTS`   |
| Schema        | `PUBLIC`             |
| Username      | `fme_service_user`   |
| Role          | `DATA_ANALYST`       |
| Results Table | `EXPERIMENT_RESULTS` |
