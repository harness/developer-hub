---
title: Delete Thousands of Keys in a Segment
description: Learn how to delete segment keys in chunks using the Admin API.
sidebar_position: 13
sidebar_label: Delete Thousands of Keys in a Segment
---

## Overview

Use this script to delete segment keys in chunks when a segment contains thousands of user keys.

### Prerequisites

- Install the [Python Admin API Wrapper](/docs/feature-management-experimentation/api/wrappers/python-admin-api).
- You've created an Admin API key from the Split UI.

## Configuration

Before running the script, update the following variables in the code:

- `ADMIN API KEY`: Your Split Admin API key.
- `workspaceName`: The name of the workspace. If you only have one workspace, use the Default workspace.
- `environmentName`: The name of the environment.
- `segmentName`: The name of the segment.

Run this script using Python 3 from your local machine or preferred development environment. 

```python
from splitapiclient.main import get_client

#############################################
workspaceName = "Defaults"
environmentName = "Production"
segmentName = "employees"
#############################################

client = get_client({'apikey': 'ADMIN API KEY'})
ws = client.workspaces.find(workspaceName)
env = client.environments.find(environmentName, ws.id)
segDef = client.segment_definitions.find(segmentName, env.id, ws.id)

segKeys = segDef.get_keys()
cnt=0
keys = []
for key in segKeys:
    cnt = cnt + 1
    if cnt > 90:
        final = {"keys": keys, "comment":"removing 1k keys"}
        segDef.remove_keys(final)
        keys = []
        cnt = 0
    keys.append(key)
if cnt < 90:
    final = {"keys": keys, "comment":"removing 1k keys"}
    segDef.remove_keys(final)
```