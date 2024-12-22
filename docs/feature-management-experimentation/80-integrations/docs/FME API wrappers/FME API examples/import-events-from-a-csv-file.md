---
title: Import events from a CSV file
sidebar_label: Import events from a CSV file
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360032634992-Python-App-importing-events-from-CSV-file-to-feature-flag-example </button>
</p>

Basic code to use Python to Import Events from CSV file to Split organization using Split Admin API.

### Environment

- Python 2.7.15
- requests 2.18.1

## How to use

 - Class wrapper for Admin API  is:
         SplitAPI.py

 - Update the source CSV file path and name in Main.py:
csvFile
 - Make sure the csv file is formatted as follows:
 ```
event_name,environment_name,traffictype_name,user_name,timestamp
 ```
 For example:
 ```
conversion,Production,account,user99,1566940852000
conversion,Production,account,user94,1566940852000
conversion,Production,account,user95,1566940852000
 ```

The Events are added in a string variable as a JSON array format, the script will format the results returned from CSV file accordingly, for example:

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