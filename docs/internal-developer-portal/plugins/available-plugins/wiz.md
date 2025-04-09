---
title: Wiz  
description: Easily view your Azure Pipelines within the Software Catalog.
---

| Plugin details |                                                                               |
| -------------- | ----------------------------------------------------------------------------- |
| **Created by** | Roadie                                                                      |
| **Category**   | Developer Experience                                                                         |
| **Source**     | [GitHub](https://github.com/get-dx/backstage-plugin) |
| **Type**       | Open-source plugin                                                            |

## Overview
This plugin is designed to improve the overall developer experience and streamline the development process by offering insights, tools and integrations tailored to enhance the development workflow. 

If you face any issues with the plugin, please contact the plugin creator team. 

## Configuration
Here's how you can configure your DX Plugin: 

### Application Configuration YAML
Under the Plugins tab in Admin, go to ``app-config.yaml`` and ``Edit YAML`` to configure this plugin: 

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
To configure the plugin for a service in the software catalog, set the following annotation in its catalog-info.yaml definition file:

```YAML
metadata:
  # ...
  annotations:
    github.com/project-slug: 'project-slug'
  # ..
```

## Support
The plugin is owned by **Roadie**. (More details needed)

