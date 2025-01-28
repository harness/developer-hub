---
title: Add a traffic type (user) attribute
sidebar_label: Add a traffic type (user) attribute
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360044397972-Python-Admin-API-sample-Create-customer-attribute-and-update-existing-Identity </button>
</p>

Basic code uses REST Admin API to create new customer attributes and update existing customer key with identity values in a given environment.

## How to use

 - Class wrapper for FME API, installation instructions in this link: [Python Library Wrapper for FME API](https://help.split.io/hc/en-us/articles/4412331052685)
 - Update your Split Admin API key in the code below.
 - Update the `workspaceName` (project name), `environmentName`, `trafficTypeName`, and 'customerKey` (user ID) variables.

The code creates two new attributes (Age and Country), then add values for them to the given customer key.

Please note that SaveCustomerIdentity() will wipe out any previous stored identities for the customer key, while UpdateCustomerIdentity() will only update the identities in the call. 

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