---
title: Query Parquet Data with Amazon Athena
description: Learn how to query Parquet data stored in Amazon S3 using Amazon Athena.
sidebar_position: 6
sidebar_label: Querying Parquet Data
---

Harness FME can export impression and event data to Amazon S3 in Parquet format. You can query this data directly using Amazon Athena by creating external tables that reference your S3 export location. 

Use the following Athena table definitions and SQL examples to start querying your Harness FME export data.

### Prerequisites

Before you begin, make sure you have the following: 

- An Amazon S3 bucket configured for Harness FME exports 
- Access to Amazon Athena 
- Harness FME data already being delivered to your S3 bucket in Parquet format

## Create an Athena table for impression data

Use the following SQL statement in Athena to create an external table for Harness FME impression data stored in Parquet format.

```sql 
CREATE EXTERNAL TABLE IF NOT EXISTS split.impressions ( 
   key STRING, 
   label STRING, 
   treatment STRING, 
   splitName STRING, 
   splitVersion INT, 
   environmentId STRING, 
   trafficTypeId STRING, 
   sdk STRING, 
   sdkVersion STRING, 
   timestamp BIGINT, 
   receptionTimestamp BIGINT 
) 
STORED AS PARQUET 
LOCATION 's3://<YOUR_BUCKET_NAME>/schema-v1/'; -- Replace `YOUR_BUCKET_NAME` with the name of your S3 bucket
```

## Query impression data

After creating the table, you can query your impression data using standard SQL.

```sql
SELECT *
FROM split.impressions
LIMIT 10;
```
