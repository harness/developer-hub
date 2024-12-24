---
title: Import events from Splunk
sidebar_label: Import events from Splunk
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360031329351-Python-App-importing-events-from-Splunk-server-to-Split-example </button>
</p>

Basic code to use Python to import events from Splunk server to Split organization using Split Admin API

### Environment

- Python 2.7.15
- requests 2.18.1
- splunk-sdk 1.6.6

## How to use

 - Class wrapper for Admin API  is:
         SplitAPI.py

 - Class wrapper for Splunk library  is:
         SplunkAPI.py

 - Update the following variables for Snowflake and Split in Main.py:
      splitApiKey, splitEnvironment, splitTrafficType

      SplunkHOST, SplunkPORT, SplunkUSERNAME, SplunkPASSWORD

 - Update the search query command for Splunk
Modify the Dictionary keys needed to set the Split event fields values.

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

[Download link](https://drive.google.com/a/split.io/file/d/1YC6IzzBp6lfH5ug_hZTh0uyQNUuv4MfS/view?usp=sharing) 