---
title: Create a Customer Attribute and Update Existing Customer Identity
description: Learn how to create customer attributes and update existing customer keys with identity values using the Admin API.
sidebar_position: 7
sidebar_label: Create a Customer Attribute and Update Existing Customer Identity
---

## Overview

Use this script to create customer attributes and update existing customer keys with identity values in a given environment.

### Prerequisites

- Install the [Python Admin API Wrapper](/docs/feature-management-experimentation/api/wrappers/python-admin-api).
- You've created an Admin API key from the Split UI.

## Configuration

Before running the script, update the following variables in the code:

- `ADMIN API KEY`: Your Split Admin API key.
- `workspaceName`: The name of the workspace.
- `environmentName`: The name of the environment.
- `trafficTypeName`: The name of the traffic type.
- `customerKey`: The name of the customer key.

Run this script using Python 3 from your local machine or preferred development environment. The script creates two attributes (Age and Country) and adds values for them to the given customer key. 

:::info
`SaveCustomerIdentity()` wipes out any previous stored identities for the customer key. `UpdateCustomerIdentity()` only updates the identities in the call. 
:::

```python
from splitapiclient.main import get_client

#############################################
workspaceName="Default"
environmentName="Production"
trafficTypeName="employees"
customerKey="dave"
#############################################

client = get_client({'apikey': 'ADMIN API KEY'})
ws = client.workspaces.find(workspaceName)
tp = client.traffic_types.find('user', ws.id)
env = client.environments.find(environmentName, ws.id)

at1 = tp.add_attribute({"id": "attrib90", "displayName": "Age", "description": "age",
"dataType": "STRING", "isSearchable": False, "workspaceId": ws.id})
at2 = tp.add_attribute({"id": "attrib11", "displayName": "Country", "description": "country name",
"dataType": "STRING", "isSearchable": False, "workspaceId": ws.id})

# Adding 50 as age
at = tp.add_identity({'key': customerKey, 'values': {'attrib456': '50'}, 'environmentId': env.id})
# Adding USA as country
at = tp.add_identity({'key': customerKey, 'values': {'attrib11': 'USA'}, 'environmentId': env.id})
```