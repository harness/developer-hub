---
title: Export Feature Flag Treatments to a YAML File
description: Learn how to export feature flag names and treatments using the Admin API.
sidebar_position: 16
sidebar_label: Export Feature Flag Treatments to a YAML File
---

## Overview

Use this script to export feature flag names and treatments to a YAML file. You can use this YAML file with test automation tools to test all possible treatments for each feature flag.

### Prerequisites

- Install the [Python Admin API Wrapper](/docs/feature-management-experimentation/api/wrappers/python-admin-api).
- You've created an Admin API key from the Split UI.

## Configuration

Before running the script, update the following variables in the code:

- `ADMIN API KEY`: Your Split Admin API key.
- `featureFlagNames`: The names of the feature flags you want to export.
- `projectName`: The name of the project.
- `environmentName`: The name of the environment.
- `targetYamlFile`: The name of the YAML file you want the data exported into.

Run this script using Python 3 from your local machine or preferred development environment. 

```python
from splitapiclient.main import get_client
from yaml import dump

#############################################
featureFlagNames=["clients", "sample_feature"]
projectName="Default"
environmentName="Production"
targetYamlFile="feature_flags_treatment"
#############################################

client = get_client({'apikey': 'ADMIN API KEY'})
ws = client.workspaces.find(projectName)
env = client.environments.find(environmentName, ws.id)

pyarr=[[]]
arrCnt=1
for featureFlagName in featureFlagNames:
    featureFlagInfo = client.split_definitions.find(featureFlagName, env.id, ws.id)
    allTreatments=featureFlagInfo._treatments
    treatmentCnt=1
    for treatment in allTreatments:
        if treatmentCnt>arrCnt:
            pyarr.append([])
            arrCnt=arrCnt+1
        if treatment._configurations != "":
            config = treatment._configurations
            pyarr[treatmentCnt-1].append({featureFlagName: {"treatment": treatment._name, "config": config}})
        else:
            pyarr[treatmentCnt-1].append({featureFlagName: {"treatment": treatment._name}})
        treatmentCnt=treatmentCnt+1
cnt=1
for curarr in pyarr:
    stream = file("temp.yaml", 'w')
    print dump(curarr)
    stream.write(dump(curarr))
    stream.close()
    fin = open("temp.yaml")
    fout = file(targetYamlFile+str(cnt)+".yaml", 'w')
    for line in fin:
        line = line.replace("!!python/str", "")
        fout.write(line)
    fin.close()
    fout.close()    
    cnt=cnt+1
```

This script accepts a list of feature flag names, fetches all treatments for each flag, and writes them to one or more YAML files.

* The first YAML file named `feature_flag_treatments_1.yaml` contains the first treatment for each feature flag. 
* Each subsequent treatment is written to a separate file (e.g. `feature_flag_treatments_2.yaml`, `feature_flag_treatments_3.yaml`), following the same order of flags.

For example: 

For `feature_flag_treatments_1.yaml`:

```yaml
- feature_flag1:
    treatment: 'on'
    config: '{"name":"Staging config with spaces","value":"99"}'

- feature_flag2:
    treatment: 'on'

- feature_flag3:
    treatment: 'on'
```

For `feature_flag_treatments_2.yaml`:

```yaml
- feature_flag1:
    treatment: 'off'

- feature_flag2:
    treatment: 'off'

- feature_flag3:
    treatment: 'off'
```

For `feature_flag_treatments_3.yaml`:

```yaml
- feature_flag1:
    treatment: 'unallocated'
```

Each file helps you track the progression of treatments across your feature flags and can be used for version control, audits, or migration purposes.