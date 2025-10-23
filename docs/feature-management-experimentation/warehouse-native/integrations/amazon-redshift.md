---
title: Connect Amazon Redshift 
description: Learn how to integrate Amazon Redshift with Harness FME to enable Warehouse Native Experimentation.
sidebar_label: Amazon Redshift
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

<Tooltip id="fme.warehouse-native.warehouse-native">Warehouse Native Experimentation</Tooltip> allows you to run experiments on data that already lives in your <Tooltip id="fme.warehouse-native.data-warehouse">data warehouse</Tooltip>. By connecting Harness FME directly to your Amazon Redshift instance, you can securely query and analyze experiment data from your source of truth. 

To begin, connect your Amazon Redshift instance as a data source through a direct connection or using [IAM role-based authentication](https://docs.aws.amazon.com/redshift/latest/mgmt/generating-user-credentials.html).

### Prerequisites

Ensure that you have the following before getting started:

- Access to your organization's Redshift cluster endpoint and database
- An IAM role with appropriate read access to the database and schema containing experiment data, and write access to a results table
- A designated results table where experiment results are stored in Amazon Redshift

## Setup

Harness recommends the following best practices:

- Use IAM Role authentication instead of static credentials.
- Restrict access to read-only privileges.
- Keep Redshift clusters within [secure VPCs](https://docs.aws.amazon.com/redshift/latest/mgmt/managing-clusters-vpc.html) and use SSL connections.
- Regularly audit IAM Roles and access policies.

To integrate Amazon Redshift as a data warehouse for Warehouse Native Experimentation:

1. Select Redshift as your data warehouse. In the **Data Sources** tab of your Harness FME project, select **Redshift** from the list of supported data warehouses.
1. Enter the following connection details:

   | Field | Description | Example |
   |---|---|---|
   | Cluster Endpoint (Host) | The endpoint of your Redshift cluster. | `redshift-cluster.analytics.us-east-1.redshift.amazonaws.com` |
   | Port | The port number used by your Redshift instance (by default, set to `5439`). | `5439` |
   | Database | The database containing your experimentation data. | `experiments` |
   | Schema | The schema within your database containing your experiment or metric tables. | `analytics` |
   | IAM Role ARN | The IAM role with permissions to access your Redshift cluster. | `arn:aws:iam::123456789012:role/FMEAccessRole` |
   | Results Table Name | The name of the table where experiment results are stored. | `FME_RESULTS` |
  
1. Configure authentication. Harness FME supports [IAM role-based authentication](https://docs.aws.amazon.com/redshift/latest/mgmt/redshift-iam-authentication-access-control.html) for secure, temporary access to Redshift. 

   * Create or use an existing IAM role with permissions to access the cluster.
   * Attach a policy granting Redshift read access to relevant databases and schemas.
   * Provide the IAM Role ARN in Harness FME.

1. Select a database and a schema. After authentication, Harness FME retrieves the list of accessible databases and schemas based on your IAM Role permissions. Select the one containing your experiment exposure and event/metric data.
1. Specify a results table. Designate a results table where Harness FME will write experiment analysis results. Ensure the following:

   * The table exists in your database.
   * The schema matches the expected format for experiment results below.

   <br />
   | Field | Type | Description |
   |---|---|---|
   | `METRICRESULTID` | `VARCHAR` | Unique identifier representing a specific calculation per metric, per experiment, per analysis run. |
   | `TREATMENT` | `VARCHAR` | The experiment variant (e.g., Control or Treatment) associated with the metric results. |
   | `DIMENSIONNAME` | `VARCHAR` | The name of the dimension being analyzed (e.g., country, platform). |
   | `DIMENSIONVALUE` | `VARCHAR` | The corresponding value of the analyzed dimension. |
   | `ATTRIBUTEDKEYSCOUNT` | `BIGINT` | Count of unique keys (users, sessions, etc.) attributed to this metric result. |
   | `REQUESTTIMESTAMP` | `TIMESTAMP` | Timestamp when the metric computation request occurred. |
   | `MIN` | `FLOAT8` | Minimum observed value for the metric. |
   | `MAX` | `FLOAT8` | Maximum observed value for the metric. |
   | `COUNT` | `BIGINT` | Total number of observations included in the metric calculation. |
   | `SUM` | `FLOAT8` | Sum of all observed metric values. |
   | `MEAN` | `FLOAT8` | Average (mean) of the metric values. |
   | `P50` | `FLOAT8` | 50th percentile (median) metric value. |
   | `P95` | `FLOAT8` | 95th percentile metric value. |
   | `P99` | `FLOAT8` | 99th percentile metric value. |
   | `VARIANCE` | `FLOAT8` | Variance of the metric values. |
   | `EXCLUDEDUSERCOUNT` | `BIGINT` | Number of users excluded from the analysis (due to filters, SRM, etc.). |
   | `ASOFTIMESTAMP` | `TIMESTAMP` | Timestamp representing when the result snapshot was written. |

   To create the results table with the correct structure, run the following SQL statement in Amazon Redshift:

   ```sql
   CREATE TABLE IF NOT EXISTS <DATABASE_NAME>.<SCHEMA_NAME>.<TABLE_NAME> (
      METRICRESULTID VARCHAR(256),
      TREATMENT VARCHAR(256),
      DIMENSIONNAME VARCHAR(256),
      DIMENSIONVALUE VARCHAR(256),
      ATTRIBUTEDKEYSCOUNT BIGINT,
      REQUESTTIMESTAMP TIMESTAMP,
      MIN FLOAT8,
      MAX FLOAT8,
      COUNT BIGINT,
      SUM FLOAT8,
      MEAN FLOAT8,
      P50 FLOAT8,
      P95 FLOAT8,
      P99 FLOAT8,
      VARIANCE FLOAT8,
      EXCLUDEDUSERCOUNT BIGINT,
      ASOFTIMESTAMP TIMESTAMP
   );
   ```



1. Test the connection by clicking **Test Connection**. If the test fails, verify the following:

   * The IAM Role has the correct trust policy and permissions.
   * The Redshift cluster is publicly accessible (or within a connected VPC).
   * The correct database, schema, and port are entered.

1. Save and activate. Once the test passes, click **Save** to create the connection. 

Your Redshift data source can now be used to create assignment and metric sources for Warehouse Native Experimentation.

## Example Redshift configuration

| Setting           | Example              |
| ----------------- | -------------------- |
| Cluster Endpoint        | `redshift-cluster.analytics.us-east-1.redshift.amazonaws.com`            |
| Port        | `5439`  |
| Database     | `experiments`       |
| Schema        | `analytics`             |
| IAM Role ARN      | `arn:aws:iam::123456789012:role/FMEAccessRole`   |
| Results Table | `FME_RESULTS` |
