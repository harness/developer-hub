---
title: DX 
description: Improve developer experience with the DX plugin.
---

| Plugin details |                                                                               |
| -------------- | ----------------------------------------------------------------------------- |
| **Created by** | DX                                                                      |
| **Category**   | Developer Experience                                                                         |
| **Source**     | [GitHub](https://github.com/get-dx/backstage-plugin) |
| **Type**       | Open-source plugin                                                            |

## Overview
The **DX plugin** is designed to enhance the overall developer experience and streamline the development process by providing insights, tools, and integrations tailored to support your workflow. 

## Configuration

### Prerequisites
Here are the prerequisites required to configure this plugin: 
1. **DX_HOST_URL**: You can get your **DX Host URL** from https://app.getdx.com/datacloud/api_keys
2. **DX_API_TOKEN**: **Token** can be found at https://app.getdx.com/datacloud/api_keys

### Application Configuration YAML
Under the **"Plugins"** tab in your **"Configure"** settings, navigate to the ``app-config.yaml`` file and click **Edit YAML** to begin configuring the plugin.

You can use the following ``YAML`` snippet as the application configuration for this plugin:
```YAML
proxy:
  endpoints:
    "/dx":
      target: <DX_HOST_URL>
      headers:
        Authorization: Bearer ${DX_API_TOKEN}
dx: #optional
  schedule:  #optional
    frequency:
      hours: 1
    timeout:
      minutes: 2
    initialDelay:
      seconds: 3
  catalogSyncAllowedKinds: [API, Component, User, Group]  #optional
  disableCatalogSync: true  #optional
```

#### Application Configuration YAML Details:
The following``proxy`` snippet in the YAML configures a proxy endpoint with your **DX Host** and **Token**:
```YAML
proxy:
  endpoints:
    "/dx":
      target: <DX_HOST_URL>
      headers:
        Authorization: Bearer ${DX_API_TOKEN}
```

**Optional Parameters**:
1. **Schedule**: You can optionally configure schedule for the tasks using the following format and definition: 
```YAML
schedule:  
    frequency:
      hours: 1
    timeout:
      minutes: 2
    initialDelay:
      seconds: 3
```
2. **Entity Filter**: You can optionally set ``catalogSyncAllowedKinds`` to only send specific kinds of entities to DX using the following definition:
```YAML
catalogSyncAllowedKinds: [API, Component, User, Group]
```
3. **Disable Catalog Sync**: You can optionally set ``disableCatalogSync`` to disable running the software catalog sync scheduled task.
```YAML
disableCatalogSync: true
```

## Layout

:::important Component Update
In the [latest release](/release-notes/internal-developer-portal#breaking-change-dx-plugin--visualization-components-consolidated), all the individual component cards (EntityChangeFailureRateCard, EntityDeploymentFrequencyCard, EntityDORAMetricsContent, EntityDXDashboardContent, EntityLeadTimeCard, EntityOpenToDeployCard, EntityTimeToRecoveryCard, EntityTopContributorsTable) have been **replaced** by the more versatile `DxDataChart` component that now covers all this functionality.
:::

The following configuration is the current recommended layout for this plugin:

```YAML
       - component: DxDataChart
          specs:
            props:
              variant: gridItem
              item: 400
            gridProps:
              md: 6
        - component: EntityScorecardsCard
          specs:
            props:
              variant: gridItem
              item: 400
            gridProps:
              md: 6
        - component: EntityTasksCard
          specs:
            props:
              variant: gridItem
              item: 400
            gridProps:
              md: 6
        - component: EntityScorecardsPage
          specs:
            props:
              variant: gridItem
              item: 400
            gridProps:
              md: 6
        - component: EntityTasksPage
          specs:
            props:
              variant: gridItem
              item: 400
            gridProps:
              md: 6
```
## Annotations
To configure the plugin for a service in the software catalog, add the following annotation to its ``catalog-info.yaml`` definition file:

```YAML
metadata:
  annotations:
    github.com/project-slug: 'project-slug'
```

## Support
The plugin is owned by **DX** and managed in this [repository](https://github.com/get-dx/backstage-plugin) as an open-source project. Create a GitHub issue to report bugs or suggest new features for the plugin.



