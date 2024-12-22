---
title: Export event records from Snowflake to FME
sidebar_label: Export event records from Snowflake to FME
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360057485811-How-to-export-event-records-from-Snowflake-to-Split </button>
</p>

Using the S3 Events Integration with Split, it is possible to import events data to Split platform using parquet formatted files. Snowflake provides an easy way to export records to parquet files which can be used in the S3 integration. 

Make sure to check [the docs](https://help.split.io/hc/en-us/articles/360053674072-Amazon-S3) link for how to setup the S3 integration before proceeding.

Below is an example of what data types to use, the sample Snowflake table structure should be as follows:

```sql
name type 
TRAFFICTYPEID VARCHAR(16777216)
EVENTTYPEID VARCHAR(16777216)
KEY VARCHAR(16777216)
TIMESTAMP NUMBER(38,0) / TIMESTAMP_NTZ(3) 
VALUE FLOAT
FOREIGNID VARCHAR(16777216) 
PROPERTIES VARCHAR(16777216)
ENVIRONMENTID VARCHAR(16777216)
```

Here is a sample INSERT SQL statement that represent the Event data, please note the timestamp value is Epoch time in milliseconds:

```sql
INSERT INTO SPLIT_DEV.S3_SPLIT_TESTING.SNOWFLAKE_TESTING
(ENVIRONMENTID, TRAFFICTYPEID, EVENTTYPEID, KEY, TIMESTAMP, VALUE, PROPERTIES, FOREIGNID)
VALUES
('029bd160-7e36-11e8-9a1c-0acd31e5aef0', 'e6910420-5c85-11e9-bbc9-12a5cc2af8fe', 's3-glossier', 'key1', 1613757288000, 3.0, '{ "location": "us", "age": "30"}', NULL);
```

To generate the parquet file to S3, use the command below, make sure you have a stage S3 configured, as in the example below:

```sql
USE SPLIT_DEV.S3_SPLIT_TESTING;
copy into @S3_INTEGRATION_TESTING/test2
from (select ENVIRONMENTID AS "environmentId",
             TRAFFICTYPEID AS "trafficTypeId",
             EVENTTYPEID AS "eventTypeId",
             KEY AS "key",
             TIMESTAMP AS "timestamp",
             VALUE AS "value",
             PROPERTIES AS "properties",
             FOREIGNID AS "foreignId"
      from SPLIT_DEV.S3_SPLIT_TESTING.SNOWFLAKE_TESTING t
      )
file_format=(type=parquet)
header = true;
```