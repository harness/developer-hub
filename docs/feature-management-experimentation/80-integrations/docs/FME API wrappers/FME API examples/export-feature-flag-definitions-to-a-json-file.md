---
title: Export feature flag definitions to a JSON file
sidebar_label: Export feature flag definitions to a JSON file
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360031029132-Python-Admin-API-sample-Export-all-feature-flags-definitions-JSON-structure-to-files </button>
</p>

Basic code to use Python and Split REST API to export all feature flags definitions JSON structure in all environments and workspaces to files.

## How to use

 - Class wrapper for FME API, installation instructions in this link: [Python Library Wrapper for FME API](https://help.split.io/hc/en-us/articles/4412331052685)
 - Update your Split Admin API key in the code below.
 
The JSON filename will be \[Project name\]\_\[Environment name\]\_\[Feature flag name\].json.

```python
from splitapiclient.main import get_client

#############################################
workspaceName = "Defaults"
environmentName = "Production"
targetFolder="/Users/bilalal-shahwany/Desktop/WeWork/"
#############################################

def SaveToFile(splitDefinition, splitName, workspaceName, environmentName):
    reportObj = open(targetFolder+workspaceName+"_"+environmentName+"_"+splitName+".json", "w")
    json.dump(splitDefinition, reportObj)
    reportObj.close()

ws = client.workspaces.find(workspaceName)
env = client.environments.find(environmentName, ws.id)
for splitDef in client.split_definitions.list(env.id, ws.id):
   print ("Exporting Split: "+splitDef._name)
   trs = []
   for tr in splitDef._treatments:
      trs.append(tr.export_dict())
   rls = []
   for rl in splitDef._rules:
      rls.append(rl.export_dict()) 
   drls = []
   for drl in splitDef._default_rule:
      drls.append(drl.export_dict()) 
   splitDefinition = {"treatments": trs,"defaultTreatment": splitDef._default_treatment, "rules": rls, "defaultRule": drls}
   SaveToFile(splitDefinition, splitDef._name, ws._name, env._name)
```