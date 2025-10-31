---
title: Generating Parquet Files From NDJson Format for the Amazon S3 Integration Using Python
description: Learn how to convert NDJson files to Parquet files for the Amazon S3 integration using Python.
sidebar_position: 2
sidebar_label: Generating Parquet Files From NDJson Files
---

## Overview

Use the following Python script to convert an NDJSON file containing events into a Parquet file for use with the Amazon S3 integration with Split.

### Prerequisites

The following environments:

- Python 3.7
- Pandas 1.2.2
- Pyarrow 3.0.0
- ndjson 0.3.1

## Prepare your event file

1. Ensure your NDJSON file follows the correct Split event structure.
   
   For example: 

    ```json
    {
    "environmentId": "029bd160-7e36-11e8-9a1c-0acd31e5aef0",
    "trafficTypeId": "e6910420-5c85-11e9-bbc9-12a5cc2af8fe",
    "eventTypeId": "agus_event",
    "key": "gDxEVkUsd3",
    "timestamp": 1625088419634,
    "value": 86.5588664346,
    "properties": {
        "age": "51",
        "country": "argentina",
        "tier": "basic"
    }
    }
    ```

1. Update the file paths in the `input_file` and `output_file` variables.
1. The script assumes that all values in the properties object are strings.

## Run the Python script

```python
import pandas as pd
import pyarrow as pa
import pyarrow.parquet as pq
import ndjson

##################################
input_file = "sample_ndjson.json"
output_file = "event21.parquet"
##################################

def dict2keyvalue(dict):
    keyvalues = []
    for key in dict.keys():
        keyvalues.append([("key", key), ("value", str(dict[key]))])
    return keyvalues

properties_type = pa.map_(
    pa.string(),
    pa.string(),
)

schema = pa.schema([
    pa.field("environmentId", pa.string()),
    pa.field("trafficTypeId", pa.string()),
    pa.field("eventTypeId", pa.string()),
    pa.field("key", pa.string()),
    pa.field("timestamp", pa.int64()),
    pa.field("value", pa.float64()),
    pa.field("properties", properties_type),
])

with open(input_file) as f:
    js = ndjson.load(f)
data = pd.DataFrame(js)
data["properties"] = data["properties"].apply(lambda x: dict2keyvalue(x))
data = pa.Table.from_pandas(data, schema)

pq.write_table(data, output_file)
```
