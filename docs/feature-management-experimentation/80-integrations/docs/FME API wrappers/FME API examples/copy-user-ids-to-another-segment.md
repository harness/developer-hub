---
title: Copy user IDs to another segment
sidebar_label: Copy user IDs to another segment
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360022171412-Python-Admin-API-sample-Copy-segment-content-to-another-segment </button>
</p>

Basic code to use Python and Split REST API to copy segment ids to another segment.

## How to use

 - Class wrapper for FME API, installation instructions in this link: [Python Library Wrapper for FME API](https://help.split.io/hc/en-us/articles/4412331052685)
 - Update your Split Admin API key, environment, workspace (project), and source and target segments in the code below.

 :::tip
 If you only have one workspace, use the Default workspace.
 :::

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