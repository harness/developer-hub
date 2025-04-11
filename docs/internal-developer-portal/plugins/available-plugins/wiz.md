---
title: Wiz  
description: See Wiz issue status in your Harness IDP.
---

| Plugin details |                                                                               |
| -------------- | ----------------------------------------------------------------------------- |
| **Created by** | Roadie                                                                      |
| **Category**   | Cloud Security                                                                     |
| **Source**     | [GitHub](https://github.com/RoadieHQ/roadie-backstage-plugins/tree/main/plugins/frontend/backstage-plugin-wiz) |
| **Type**       | Open-source plugin                                                            |

## Overview
**Wiz** is the unified cloud security platform with prevention and response capabilities, enabling security and development teams to build faster and more securely. This plugin is designed to integrate Wiz into your IDP, providing information about recently created issues, their status and severity.

## Configuration

### Prerequisites
Here are the prerequisites required to configure this plugin: 
- Wiz API URL (API Endpoint URL)
- Wiz Token URL
- Client ID and Client Secret

Refer to the official [Wiz documentation](https://win.wiz.io/reference/prerequisites) for detailed instructions on how to obtain these values.

The Wiz GraphQL API uses a single endpoint format:
``https://api.<TENANT_DATA_CENTER>.app.wiz.io/graphql``. 
Here, ``<TENANT_DATA_CENTER>`` refers to your Wiz **regional data center** (e.g., us1, us2, eu1, or eu2).

### Application Configuration YAML
Under the **"Plugins"** tab in your **"Configure"** settings, navigate to the ``app-config.yaml`` file and click **Edit YAML** to begin configuring the plugin.

You can use the following ``YAML`` snippet as the application configuration for this plugin:
```YAML
wiz:
  clientId: <retrieved above>
  clientSecret: <retrieved above>
  tokenUrl: https://auth.wiz.io/token (retrieved above)
  wizAPIUrl: https://auth.wiz.io/token (retrieved above)
  dashboardLink: <Your-WIZ-URL> # -----> this is an optional parameter
```

## Layout
The following configuration is the default config for **Layout** for this plugin:
```YAML
        - component: EntityWizIssues
          specs:
            props:
              variant: gridItem
              item: 400
            gridProps:
              md: 6
        - component: EntityIssuesWidget
          specs:
            props:
              variant: gridItem
              item: 400
            gridProps:
              md: 6
        - component: EntityIssuesChart
          specs:
            props:
              variant: gridItem
              item: 400
            gridProps:
              md: 6
        - component: EntityOrphanWarning
          specs:
            props:
              variant: gridItem
              item: 400
            gridProps:
              md: 6
        - component: EntitySeverityChart
          specs:
            props:
              variant: gridItem
              item: 400
            gridProps:
              md: 6
        - component: EntityRelationWarning
          specs:
            props:
              variant: gridItem
              item: 400
            gridProps:
              md: 6
        - component: EntityProcessingErrorsPanel
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
      wiz.io/project-id: <your-project-id>
```

## Support
The plugin is owned by **Roadie** and managed in this [repository](https://github.com/RoadieHQ/roadie-backstage-plugins/tree/main/plugins/frontend/backstage-plugin-wiz) as an open-source project. Create a GitHub issue to report bugs or suggest new features for the plugin.


