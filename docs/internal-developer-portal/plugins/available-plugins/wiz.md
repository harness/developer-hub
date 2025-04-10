---
title: Wiz  
description: See Wiz issue status in your Harness IDP.
---

| Plugin details |                                                                               |
| -------------- | ----------------------------------------------------------------------------- |
| **Created by** | Roadie                                                                      |
| **Category**   | Cloud Security                                                                     |
| **Source**     | [GitHub](https://roadie.io/docs/integrations/wiz/) |
| **Type**       | Open-source plugin                                                            |

## Overview
Wiz is the unified cloud security platform with prevention and response capabilities, enabling security and development teams to build faster and more securely.
This plugin is designed to integrate Wiz into your IDP, providing information about recently created issues, their status and severity. 

If you face any issues with the plugin, please contact the owner of the plugin. 

## Configuration
Let's deep dive into the configuration details of this plugin: 

### Prerequisites
To integrate this plugin, you'll need the following parameters:
- Wiz API URL (API Endpoint URL)
- Wiz Token URL
- Client ID and Client Secret

Please go through the official [Wiz docs](https://win.wiz.io/reference/prerequisites) to learn more about how to retrieve these values. 

### Application Configuration YAML
Under the **"Plugins"** tab in your **"Configure"** settings, go to ``app-config.yaml`` and click on ``Edit YAML`` to configure this plugin. You can use the following YAML snippet as the application configuration YAML for this plugin: 

```YAML
wiz:
  clientId: <retrieved above>
  clientSecret: <retrieved above>
  tokenUrl: https://auth.wiz.io/token (retrieved above)
  wizAPIUrl: https://auth.wiz.io/token (retrieved above)
  dashboardLink: https://auth.com # -----> this is an optional parameter
```

## Layout

## Annotations
To configure the plugin for a service in the software catalog, add the following annotation to its ``catalog-info.yaml`` definition file:

```YAML
metadata:
  annotations:
      wiz.io/project-id: <your-project-id>
```

## Support
The plugin is owned by **Roadie**. If you encounter any issues, please reach out to the plugin creator team for assistance.

