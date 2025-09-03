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
    "/dx-web-api":
      target: https://api.getdx.com
      pathRewrite:
        '/api/proxy/dx-web-api/?': '/'  
      headers:
        Authorization: Bearer ${DX_API_TOKEN}
      allowedHeaders:
        - X-Client-Type
        - X-Client-Version
        
dx: #optional
  appId: staging  #optional
```

## Layout

:::important Component Update
In the [latest update](/release-notes/internal-developer-portal#breaking-change-dx-plugin--visualization-components-consolidated) of this plugin, all the individual component cards (EntityChangeFailureRateCard, EntityDeploymentFrequencyCard, EntityDORAMetricsContent, EntityDXDashboardContent, EntityLeadTimeCard, EntityOpenToDeployCard, EntityTimeToRecoveryCard, EntityTopContributorsTable) have been **replaced** by the more versatile `DxDataChartCard` component that now covers all this functionality.
:::

This plugin exports:

- ❌ 0 Page
- ✅ 3 Cards
- ✅ 2 Tabs


**The following cards can be added to your overview screen**


```YAML
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

```

#### Configuring DxDataChartCard

- Example of Table chart

```yaml
        - component: DxDataChartCard
          specs:
            props:
              title: Recent Deployments
              description: Last 10 deployments
              datafeedToken: your-datafeed-token
              unit: deployments
              chartConfig:
                type: table
            gridProps:
              md: 6
```
- Example of Line chart


```yaml
       - component: DxDataChartCard
          specs:
            props:
              title: Deployment Frequency
              description: Weekly deployments over time
              datafeedToken: your-datafeed-token
              unit: deployments
              chartConfig:
                type: line
                xAxis: date
                yAxis: count
            gridProps:
              md: 6
```

**Similary the following tabs can be added to your entity:**

```YAML
    - name: EntityScorecardsPage
      path: /dx-scorecards
      title: Scorecards
      contents:
        - component: EntityScorecardsPage

    - name: EntityTasksPage
      path: /dx-tasks
      title: Tasks
      contents:
        - component: EntityTasksPage
```
## Annotations

As of now you don't really need annotations to configure the plugin.

Although make sure that the Entity identifier of DX should match with the `Identifier of IDP 2.0` or `metadata.name` of IDP 1.0.

## Support
The plugin is owned by **DX** and managed in this [repository](https://github.com/get-dx/backstage-plugin) as an open-source project. Create a GitHub issue to report bugs or suggest new features for the plugin.



