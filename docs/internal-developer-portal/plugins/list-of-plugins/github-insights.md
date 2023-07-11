---
title: GitHub Insights
---

| Plugin details |                                                                |
| -------------- | -------------------------------------------------------------- |
| **Created by** | [Roadie](https://roadie.io)                                    |
| **Category**   | Source Control Management                                      |
| **Source**     | [GitHub](https://github.com/roadieHQ/roadie-backstage-plugins) |
| **Type**       | Open Source plugin                                             |

## Configuration

### 1. App config YAML

_No action required_

This plugin does not need any additional app config.

### 2. Secrets

This plugin requires the user to login using the configured GitHub OAuth app. Please ensure that you have a GitHub OAuth app created and configured in IDP for this plugin to work. Read more on the [instructions to configure a GitHub OAuth app](../oauth-support-for-plugins.md).

### 3. Delegate proxy

_No action required_

This plugin does not need a delegate proxy to be setup since GitHub can be accessed publicly on the cloud.

## Layout

This plugin exports a UI Tab which can be added as a new tab of a service or any other layout pages. It also exports several cards that can be added in the **Overview** section of any catalog layout. Go to the layout section from **Admin** -> **Layout**, choose **Service** from the dropdown and add the following in a new section.

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

If the `catalog-info.yaml` descriptor file for the component is stored in GitHub, the `github.com/project-slug` is automatically added as the `org/repo` where the file is stored. However, this also can be manually configured or overridden.

```yaml
metadata:
  annotations:
    github.com/project-slug: org/repo
```

## Support

The plugin is owned by [Roadie](https://roadie.io) and managed in the [Roadie plugins repository](https://github.com/roadieHQ/roadie-backstage-plugins) as an Open Source project. Create a GitHub issue to report bugs or suggest new features on the plugin.
