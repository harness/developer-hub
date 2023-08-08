---
title: GitHub Catalog Discovery
description: Automatically discovery catalog info YAML from your GitHub organizations and repositories
---

| Plugin details |                                                                   |
| -------------- | ----------------------------------------------------------------- |
| **Created by** | Backstage core                                                    |
| **Category**   | Catalog automated discovery                                       |
| **Source**     | [GitHub](https://backstage.io/docs/integrations/github/discovery) |
| **Type**       | Open-source plugin                                                |

## Configuration

### Application configuration YAML

This plugin allows you to configure certain rules based on which the entity definition files e.g. `catalog-info.yaml` can be auto-discovered from your GitHub organizations and repositories. Once configured, you will no longer need to manually register all the catalog info YAML files. Any new files created will also be automatically registered in the catalog.

Please check out the [official documentation](https://backstage.io/docs/integrations/github/discovery#configuration) to understand the YAML configuration for this plugin. Here is an example -

```YAML
catalog:
  providers:
    github:
      # the provider ID can be any camelCase string
      providerId:
        organization: 'backstage' # string
        catalogPath: '/catalog-info.yaml' # string
        filters:
          branch: 'main' # string
          repository: '.*' # Regex
        schedule: # optional; same options as in TaskScheduleDefinition
          # supports cron, ISO duration, "human duration" as used in code
          frequency: { minutes: 30 }
          # supports ISO duration, "human duration" as used in code
          timeout: { minutes: 3 }
      customProviderId:
        organization: 'new-org' # string
        catalogPath: '/custom/path/catalog-info.yaml' # string
        filters: # optional filters
          branch: 'develop' # optional string
          repository: '.*' # optional Regex
      wildcardProviderId:
        organization: 'new-org' # string
        catalogPath: '/groups/**/*.yaml' # this will search all folders for files that end in .yaml
        filters: # optional filters
          branch: 'develop' # optional string
          repository: '.*' # optional Regex
      topicProviderId:
        organization: 'backstage' # string
        catalogPath: '/catalog-info.yaml' # string
        filters:
          branch: 'main' # string
          repository: '.*' # Regex
          topic: 'backstage-exclude' # optional string
      topicFilterProviderId:
        organization: 'backstage' # string
        catalogPath: '/catalog-info.yaml' # string
        filters:
          branch: 'main' # string
          repository: '.*' # Regex
          topic:
            include: ['backstage-include'] # optional array of strings
            exclude: ['experiments'] # optional array of strings
      validateLocationsExist:
        organization: 'backstage' # string
        catalogPath: '/catalog-info.yaml' # string
        filters:
          branch: 'main' # string
          repository: '.*' # Regex
        validateLocationsExist: true # optional boolean
      visibilityProviderId:
        organization: 'backstage' # string
        catalogPath: '/catalog-info.yaml' # string
        filters:
          visibility:
            - public
            - internal
      enterpriseProviderId:
        host: ghe.example.net
        organization: 'backstage' # string
        catalogPath: '/catalog-info.yaml' # string
```

### Secrets

Ensure that you have a GitHub connector configured in your IDP Admin -> Connectors page. This plugin does not need any additional secrets.

### Delegate proxy

_No action required_

This plugin does not require a delegate proxy to be set up because GitHub is publicly accessible. If you are using GHE, the GitHub connect will already have the delegate information.

## Layout

_No action required_

This plugin does not export any layout components.

## Annotations

_No action required_

This plugin does not need any catalog-info.yaml annotations to work.

## Support

The plugin is owned by the [Backstage core](https://backstage.io) and managed in the [Backstage official repository](https://github.com/backstage/backstage) as an open-source project. Create a GitHub issue to report bugs or suggest new features for the plugin.
