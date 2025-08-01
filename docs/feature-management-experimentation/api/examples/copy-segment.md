---
title: Copy Segment IDs to Another Segment
description: Learn how to copy segment IDs to another segment using the Admin API.
sidebar_position: 18
sidebar_label: Copy Segment IDs to Another Segment
---

## Overview

Use this script to copy segment IDs to another segment.

### Prerequisites

- Install the [Python Admin API Wrapper](/docs/feature-management-experimentation/api/wrappers/python-admin-api).
- You've created an Admin API key from the Split UI.

## Configuration

Before running the script, update the following variables in the code:

- `ADMIN API KEY`: Your Split Admin API key.
- `sourceSegmentName`: The name of the segment you want to copy.
- `sourceWorkspaceName`: The name of the workspace containing the source segment. If you only have one workspace, use the Default workspace.
- `sourceEnvironmentName`: The name of the environment where the source segment is defined.
- `targetSegmentName`: The name of the segment you want to create or update.
- `targetWorkspaceName`: The name of the workspace where the target segment will be created. If you only have one workspace, use the Default workspace.
- `targetEnvironmentName`: The name of the environment where the target segment will be created.

Run this script using Python 3 from your local machine or preferred development environment. 

```python
from splitapiclient.main import get_client

#############################################
sourceSegmentName="admin_api_test"
sourceWorkspaceName="Default"
sourceEnvironmentName="Production"
targetSegmentName = "myaccounts"
targetWorkspaceName = "Default"
targetEnvironmentName = "Production"
#############################################

client = get_client({'apikey': 'ADMIN API KEY'})
sourceWs = client.workspaces.find(sourceWorkspaceName)
sourceEnv = client.environments.find(sourceEnvironmentName, sourceWs.id)
sourceSegmentDef = client.segment_definitions.find(sourceSegmentName, sourceEnv.id, sourceWs.id)
targetWs = client.workspaces.find(targetWorkspaceName)
targetEnv = client.environments.find(targetEnvironmentName, targetWs.id)
targetSegmentDef = client.segment_definitions.find(targetSegmentName, sourceEnv.id, sourceWs.id)

keys = sourceSegmentDef.get_keys()
targetSegmentDef.import_keys_from_json("false", {"keys":keys,"comment":"copy keys from segment"})
```
