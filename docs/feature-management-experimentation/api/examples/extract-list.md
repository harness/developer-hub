---
title: Export a List of Tags for Feature Flags and Segments
description: Learn how to extract a list of tags associated with feature flags and segments using the Admin API.
sidebar_position: 3
sidebar_label: Export a List of Tags for Feature Flags and Segments
---

## Overview

Use this script to extract a list of tags associated with feature flags and segments.

### Prerequisites

- Install the [Python Admin API Wrapper](/docs/feature-management-experimentation/api/wrappers/python-admin-api).
- You've created an Admin API key from the Split UI.
- Make sure you have the tag name associated with your feature flags and segments.

## Configuration

Before running the script, update the following variables in the code:

- `ADMIN API KEY`: Your Split Admin API key.

Run this script using Python 3 from your local machine or preferred development environment.

```python
from splitapiclient.main import get_client

client = get_client({'apikey': 'ADMIN API KEY'})
print('workspace, split, segment, tag')
for ws in client.workspaces.list():
    for split in client.splits.list(ws.id):
        if split._tags is None:
            continue
        for tag in split._tags:
            print(ws.name+","+split._name+",,"+tag['name']))
    for segment in client.segments.list(ws.id):
        if segment._tags is None:
            continue
        for tag in segment._tags:
            print(ws.name+","+split._name+",,"+tag['name']))
```