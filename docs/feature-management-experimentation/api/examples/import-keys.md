---
title: Import Thousands of Customer Keys to an Existing Segment
description: Learn how to import user keys into an existing segment using the Admin API.
sidebar_position: 8
sidebar_label: Import Thousands of Customer Keys to an Existing Segment
---

## Overview

Use this script to import user keys into an existing segment in a given environment.

### Prerequisites

- Install the [Python Admin API Wrapper](/docs/feature-management-experimentation/api/wrappers/python-admin-api).
- You've created an Admin API key from the Split UI.

## Configuration

Before running the script, update the following variables in the code:

- `ADMIN API KEY`: Your Split Admin API key.
- `workspaceName`: The name of the workspace.
- `environmentName`: The name of the environment.
- `segmentName`: The name of the segment.

Run this script using Python 3 from your local machine or preferred development environment. 

:::info
This example below demonstrates importing customer keys from a CSV file, and the script will import keys in batches of 1,000 count. 
:::

```python
from splitapiclient.main import get_client

#############################################
workspaceName = "Default"
environmentName = "Production"
segmentName = "test_24k"
sourceFile = "/Users/bilalal-shahwany/Downloads/all_keys.csv"
#############################################

client = get_client({'apikey': 'ADMIN API KEY'})
ws = client.workspaces.find(workspaceName)
env = client.environments.find(environmentName, ws.id)
segDef = client.segment_definitions.find(segmentName, env.id, ws.id)

with open(sourceFile, "r") as a_file:
    cnt=0
    keys = []
    for line in a_file:
        cnt = cnt + 1
        if cnt > 1000:
            final = {"keys": keys, "comment":"adding 1k keys"}
            print(final)
            segDef.import_keys_from_json("false", final)
            keys = []
            cnt = 0
        keys.append(line.strip())
    if cnt < 1000:
        final = {"keys":keys, "comment":"adding 1k keys"}
        segDef.import_keys_from_json("false", final)
```