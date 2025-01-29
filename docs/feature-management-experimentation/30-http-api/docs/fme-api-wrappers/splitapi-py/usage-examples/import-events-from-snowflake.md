---
title: Import events from Snowflake
sidebar_label: Import events from Snowflake
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360027624411-Python-App-importing-events-from-Snowflake-DB-to-Split-example </button>
</p>

Basic code to use Python to import events from Snowflake database to Split organization using Split Admin API.

### Environment

- Python 2.7.15
- requests 2.18.1
- snowflake-connector-python 1.7.11

## How to use

 - Class wrapper for Admin API  is:
         SplitAPI.py

 - Class wrapper for Snowflake library  is:
         Snowflake.py

 - Update the following variables for Snowflake and Split in Main.py:
      snowflakeUser, snowflakePassword, snowflakeAccount, snowflakeWarehouse, snowflakeSQL, splitApiKey, splitEnvironment, splitTrafficType

 - Make sure the Snowflake Query fetches three columns: Key id, Timestamp in epoch and Event name

 - Modify the column names in the for loop as needed.

The Events are added in a string variable as a JSON array format, the script will format the results returned from Snowflake accordingly, for example:

```json
[{ 

 "eventTypeId": "conversion", 

 "environmentName": "Production",    

 "trafficTypeName": "account", 

 "key": "key_user99",

 "timestamp": 1555523409000 

}, 

{ 

 "eventTypeId": "page_load_time", 

 "environmentName": "Production",      

 "trafficTypeName": "account", 

 "key": "key_user99", 

 "value": 0.9,

 "timestamp": 1555523409000 

 }]
```

[Download link](https://drive.google.com/a/split.io/file/d/1oxF1pEyqKb7hZKGArtkRbE_cIYntRBiJ/view?usp=sharing)