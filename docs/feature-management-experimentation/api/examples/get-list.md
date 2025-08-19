---
title: Get a List of Feature Flags with Rollout Status
description: Learn how to retrieve a list of feature flag names and their status using the Admin API.
sidebar_position: 15
sidebar_label: Get a List of Feature Flags with Rollout Status
---

## Overview

Use this script to retrieve a list of feature flag names and their status for a given workspace.

### Prerequisites

- Install the [Python Admin API Wrapper](/docs/feature-management-experimentation/api/wrappers/python-admin-api).
- You've created an Admin API key from the Split UI.

## Configuration

Before running the script, update the following variables in the code:

- `ADMIN API KEY`: Your Split Admin API key.
- `workspaceName`: The name of the workspace. If you only have one workspace, use the Default workspace.

Run this script using Python 3 from your local machine or preferred development environment. This script returns a list of feature flag names and the rollout status value.

```python
from splitapiclient.main import get_client

#############################################
workspaceName="Default"
#############################################

client = get_client({'apikey': 'ADMIN API KEY'})
ws = client.workspaces.find(workspaceName)
for sp in client.splits.list(ws.id):
    if sp._rolloutStatus != {}:
        print (sp.name+", "+str(sp._rolloutStatus['name']))
```