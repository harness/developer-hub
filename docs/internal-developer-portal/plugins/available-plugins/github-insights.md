---
title: GitHub Insights
description: View insights such as top contributors, releases, and READMEs from GitHub.
---

| Plugin details |                                                                |
| -------------- | -------------------------------------------------------------- |
| **Created by** | [Roadie](https://roadie.io)                                    |
| **Category**   | Source Control Management                                      |
| **Source**     | [GitHub](https://github.com/roadieHQ/roadie-backstage-plugins) |
| **Type**       | Open-source plugin                                             |

## Configuration

### Application configuration YAML

_No action required_

This plugin does not require you to add application configuration.

### Secrets

This plugin requires the user to log in using the configured GitHub OAuth application. Make sure that you have a GitHub OAuth application created and configured in IDP. For instructions to configure a GitHub OAuth app, go to [OAuth support for plugins](../oauth-support-for-plugins.md).

### Delegate proxy

_No action required_

This plugin does not require a delegate proxy to be set up because GitHub is publicly accessible.

## Layout

This plugin exports a UI tab that you can use as a new tab for a service or for any other layout page. It also exports several cards that can be added to the **Overview** section of a catalog layout. Go to **Admin** > **Layout**, select **Service** in the dropdown menu, and then add the following YAML code in a new section:

```yaml
- name: code-insights
  path: /code-insights
  title: Code Insights
  contents:
    - component: EntitySwitch
      specs:
        cases:
          - if: isGithubInsightsAvailable
            content:
              component: EntityGithubInsightsContent
```

The `isGithubInsightsAvailable` condition is met when the `github.com/project-slug` annotation is present in the software components's `catalog-info.yaml` definition file.

## Annotations

If the `catalog-info.yaml` descriptor file for the component is stored in GitHub, the `github.com/project-slug` is automatically added as the `org/repo` where the file is stored, as follows. However, you can manually configure or override this setting:

```yaml
metadata:
  annotations:
    github.com/project-slug: org/repo
```

## Support

The plugin is owned by [Roadie](https://roadie.io) and managed in the [Roadie plugins repository](https://github.com/roadieHQ/roadie-backstage-plugins) as an open-source project. Create a GitHub issue to report bugs or suggest new features for the plugin.
