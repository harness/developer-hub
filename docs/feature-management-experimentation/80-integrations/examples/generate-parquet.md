---
title: Generating Parquet Files for the Amazon S3 Integration Using Python
description: Learn how to generate Parquet files for the Amazon S3 integration using Python.
sidebar_position: 1
sidebar_label: Generating Parquet Files
---

## Overview

Use the following Python script to convert an NDJson file containing events into a Parquet file for use with the Amazon S3 integration with Split.

### Prerequisites

The following environments:

- Python 3.7
- Pandas 1.2.2
- Pyarrow 3.0.0
- ndjson 0.3.1

## Prepare your event file

The NDJSON file must contain a valid structure for Split events.

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

1. Replace the file names and paths in the `input_file` and `output_file` variables in the script.
1. Replace the values for:
   
   - `key` (Customer key)
   - `value` (Event value)
   - Property names and values under `properties`

1. Make sure the timestamp field uses Epoch time in milliseconds.
1. To add more events, repeat the append line: `df = df.append(...)`.
1. The resulting Parquet file can be copied to the Amazon S3 bucket used for Split’s event ingestion.

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

# converts dictionary type into proper structure that when saved to parquet will be interpreted as MapType
def dict2keyvalue(dict):
    keyvalues = []
    for key in dict.keys():
        keyvalues.append([("key", key), ("value", str(dict[key]))])
    return keyvalues

properties_type = pa.map_(
    pa.string(),
    pa.string(),
)

schema = pa.schema(
    [   pa.field("environmentId", pa.string()),
        pa.field("trafficTypeId", pa.string()),
        pa.field("eventTypeId", pa.string()),
        pa.field("key", pa.string()),
        pa.field("timestamp", pa.int64()),
        pa.field("value", pa.float64()),
        pa.field("properties", properties_type),
    ]
)

with open(input_file) as f:
    js = ndjson.load(f)
data = pd.DataFrame(js)
data["properties"] = data["properties"].apply(lambda x: dict2keyvalue(x))
data = pa.Table.from_pandas(data, schema)

# Save to parquet file
pq.write_table(data, output_file)
```