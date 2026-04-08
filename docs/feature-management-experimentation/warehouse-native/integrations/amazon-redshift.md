---
title: Connect Amazon Redshift 
description: Learn how to integrate Amazon Redshift with Harness FME to enable Warehouse Native Experimentation.
sidebar_label: Amazon Redshift
sidebar_position: 2
---

<CTABanner
  buttonText="Request Access"
  title="Warehouse Native Experimentation is GA!"
  tagline="Run Harness FME experiments directly in your data warehouse. Contact Sales or your account manager to enable access."
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
- A designated results table where experiment results are stored in Amazon Redshift

## Setup

Harness recommends the following best practices:

- Use IAM Role authentication instead of static credentials.
- Restrict access to read-only privileges.
- Keep Redshift clusters within [secure VPCs](https://docs.aws.amazon.com/redshift/latest/mgmt/managing-clusters-vpc.html) and use SSL connections.
- Regularly audit IAM Roles and access policies.

To integrate Amazon Redshift as a data warehouse for Warehouse Native Experimentation:

1. From the Harness FME navigation menu, click **FME Settings** and click **View** on a project on the **Projects** page. Then, navigate to the **Data Source** tab.
1. Select Redshift as your data warehouse. In the **Data Sources** tab of your Harness FME project, select **Redshift** from the list of supported data warehouses.

   :::info Project experimentation type
   A project uses a single experimentation type based on the metric source used.

   When you add a data source to a project, the project’s experimentation type is set to `Warehouse Native`. All metrics in the project must then use Warehouse Native metric sources.

   If a project instead uses metrics created from an [ingested event source](/docs/feature-management-experimentation/getting-started/overview/send-event-data/), the project’s experimentation type is set to `Cloud`.
   :::

1. Enter the following connection details:

   | Field | Description | Example |
   |---|---|---|
   | Server (Host URL) | The endpoint of your Redshift cluster. | `redshift-cluster.analytics.us-east-1.redshift.amazonaws.com` |
   | Port | The port number used by your Redshift instance (by default, set to `5439`). | `5439` |
   | Database | The database containing your experimentation data. | `experiments` |
   | Username | The database user that Harness FME uses to authenticate with your Redshift cluster. Ensure this user has read access to the required schemas and tables. | `fme_user` |
   | Schema | The schema within your database containing your experiment or metric tables. | `analytics` |
   | IAM Role ARN | The IAM role with permissions to access your Redshift cluster. | `arn:aws:iam::123456789012:role/FMEAccessRole` |
   | External ID | A unique identifier used in the IAM role trust policy to ensure that only Harness FME can assume the role. Ths is commonly used for secure cross-account or third-party access and is required if the IAM role trust policy specifies an External ID. | `AbcDeFg-hYjkClm7nop-sKViFlWo5REVqatyHp3zbrZvmd3QuJxCBhkYDVKEhWwjHbWBYFdKQKbKlmi7Hf2DRgc-6NduSqZ5Q` |
   | Results Table Name | The name of the table where experiment results are stored. | `FME_RESULTS` |
  
1. Select an authentication method. Harness FME supports two authentication methods for connecting to Amazon Redshift: 

   * [IAM role-based authentication](https://docs.aws.amazon.com/redshift/latest/mgmt/redshift-iam-authentication-access-control.html) (recommended): Harness FME can assume an IAM role to obtain temporary credentials for accessing your Redshift cluster.  

     * Create or use an existing IAM role with permissions to access the cluster.
     * Attach a policy granting Redshift read access to relevant databases and schemas.
     * Provide the IAM Role ARN in Harness FME.
   
   * Username and password authentication: Provide a Redshift database username and password with read access to the required databases and schemas. Ensure the user has permission to query the tables required for experiment metrics.

1. Configure network access for private VPC deployments. If your Amazon Redshift cluster is deployed in a private VPC, Harness must be allowed network access to run experiment calculations against your warehouse. 

   To enable connectivity:

   * Update your Redshift cluster's security group inbound rules to allow connections from the Harness outbound IP addresses.
   * Allow traffic on the Redshift port (default: `5439`) or your custom port if configured.

   Harness FME maintains a list of [static outbound IP addresses](https://our-ips.split.io/) used for warehouse connections. You must allow these addresses in your security group rules.

1. Test the connection by clicking **Test Connection**. If the test fails, verify the following:

   * The IAM Role has the correct trust policy and permissions.
   * The Redshift cluster is publicly accessible (or within a connected VPC).
   * The correct database, schema, and port are entered.
   
1. Select a database and a schema. After authentication, Harness FME retrieves the list of accessible databases and schemas based on your IAM Role permissions. Select the one containing your experiment exposure and event/metric data.
1. Specify a results table. Create a results table where Harness FME will write experiment analysis results. Ensure the following:

   * The table exists in your database.
   * The schema matches the expected format for experiment results below.

   <br />
   | Field | Type | Description |
   |---|---|---|
   | `METRICID`   | `VARCHAR` | Unique identifier for the metric being calculated. |
   | `METRICNAME` | `VARCHAR` | Human-readable name of the metric being calculated. |
   | `METRICRESULTID` | `VARCHAR` | Unique identifier representing a specific calculation per metric, per experiment, per analysis run. |
   | `EXPID`      | `VARCHAR` | Unique identifier for the experiment associated with this metric calculation. |
   | `EXPNAME`    | `VARCHAR` | Human-readable name of the experiment associated with this metric calculation. |
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
      ASOFTIMESTAMP TIMESTAMP,
      METRICID VARCHAR(256),
      METRICNAME VARCHAR(256),
      EXPID VARCHAR(256),
      EXPNAME VARCHAR(256)
   );
   ```

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
