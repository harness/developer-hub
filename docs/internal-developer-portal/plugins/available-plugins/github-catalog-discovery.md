---
title: GitHub Catalog Discovery
description: Automatically discover catalog-info.yaml files in your GitHub organizations and repositories.
---

| Plugin details |                                                                   |
| -------------- | ----------------------------------------------------------------- |
| **Created by** | Backstage core                                                    |
| **Category**   | Catalog automated discovery                                       |
| **Source**     | [GitHub](https://backstage.io/docs/integrations/github/discovery) |
| **Type**       | Open-source plugin                                                |

## Configuration

### Application configuration YAML

This plugin enables you to configure rules based on which the entity definition files (for example, `catalog-info.yaml`) can be auto-discovered from your GitHub organizations and repositories. Once you've configured rules, you no longer need to manually register all the catalog information YAML files. Any new files created will also be automatically registered with the catalog.

Go to the [official documentation](https://backstage.io/docs/integrations/github/discovery#configuration) to understand the YAML configuration for this plugin. Here is an example:

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

Make sure that you have a GitHub connector configured on your **IDP Admin** > **Connectors** page. This plugin does not need any additional secrets.

### Delegate proxy

_No action required_

This plugin does not require a delegate proxy to be set up because GitHub is publicly accessible. If you are using GitHub Enterprise, the GitHub connector will already have the delegate information.

## Layout

_No action required_

This plugin does not export any layout components.

## Annotations

_No action required_

This plugin does not need any catalog-info.yaml annotations to work.

## Scripts to create new services, register new services 

- The GitHub Catalog Discovery plugin registers one location per repository. This might not be a good idea when there are many (3000+ in this case) as any error in fetching one `catalog-yaml` would mark the whole location as failed and create trouble with the entity sync.

- To solve this we would recommend you to use the following scripts which would register separate locations for all the matching catalog-info.yaml files and hence would be synchronised separately.

### [Registered Locations](https://github.com/harness-community/idp-samples/blob/main/catalog-scripts/register_discovered_locations.py)

- Discover `catalog-info.yaml` matching the regex filter and register under the catalog provided in `apiurl`. This would separate locations for all the matching catalog-info.yaml files and hence would be synchronised separately.

### [Create Services](https://github.com/harness-community/idp-samples/blob/main/catalog-scripts/create_services.py)

- Generates a monorepo with the following file structure, assigning random English names.

```sh
repo
   - antronasal-service
      - catalog-info.yaml
   - cespititous-service
      - catalog-info.yaml
   - ....
   - geomaly-service
        - catalog-info.yaml
```

### [Delete Services](https://github.com/harness-community/idp-samples/blob/main/catalog-scripts/delete_services.py)

- Will clean up the services already created.


## Support

The plugin is owned by [Backstage core](https://backstage.io) and managed in the [Backstage official repository](https://github.com/backstage/backstage) as an open-source project. Create a GitHub issue to report bugs or suggest new features for the plugin.
