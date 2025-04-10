---
title: DX 
description: Easily view your Azure Pipelines within the Software Catalog.
---

| Plugin details |                                                                               |
| -------------- | ----------------------------------------------------------------------------- |
| **Created by** | Roadie                                                                      |
| **Category**   | Developer Experience                                                                         |
| **Source**     | [GitHub](https://github.com/get-dx/backstage-plugin) |
| **Type**       | Open-source plugin                                                            |

## Overview
This plugin is designed to enhance the overall developer experience and streamline the development process by providing insights, tools, and integrations tailored to support your workflow.

## Configuration
Let's deep dive into the configuration details of this plugin: 

### Application Configuration YAML
Under the **"Plugins"** tab in your **"Configure"** settings, go to ``app-config.yaml`` and click on ``Edit YAML`` to configure this plugin. You can use the following YAML snippet as the application configuration YAML for this plugin: 

```YAML
proxy:
    endpoints:
      "/dx":
        target: https://dx.api
        headers:
          Authorization: Bearer {s}
    dx:  # -----> this is optional
        schedule: # -----> this is optional
            frequency:
                hours: 1
            timeout:
                minutes: 2
            initialDelay:
                seconds: 3
    catalogSyncAllowedKinds: [hello, Component, User, Group] # -----> this is optional
    appId: staging # -----> this is optional
    disableCatalogSync: true # -----> this is optional
```

## Layout

## Annotations
To configure the plugin for a service in the software catalog, add the following annotation to its ``catalog-info.yaml`` definition file:

```YAML
metadata:
  annotations:
    github.com/project-slug: 'project-slug'
```

## Support
The plugin is owned by **Roadie**. If you encounter any issues, please reach out to the plugin creator team for assistance.


