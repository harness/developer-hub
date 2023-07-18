---
title: GitHub Pull Requests
description: View all open and closed pull requests in a GitHub repository.
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

This plugin requires the user to log in using the configured GitHub OAuth app. Make sure that you have a GitHub OAuth application created and configured in IDP. For instructions to configure a GitHub OAuth app, go to [OAuth support for plugins](../oauth-support-for-plugins.md).

### Delegate proxy

_No action required_

This plugin does not require a delegate proxy to be set up because GitHub is publicly accessible.

## Layout

This plugin exports a UI tab that you can use as a new tab for a service or for any other layout page. It also exports a UI card that you can add to the **Overview** section of a catalog layout. Go to **Admin** - **Layout**, select **Service** in the dropdown menu, and then add the following YAML code in a new section:

```yaml
- name: pull-requests
  path: /pull-requests
  title: Pull Requests
  contents:
    - component: EntityGithubPullRequestsContent
```

You can also add a smaller card on the overview page, as follows:

```yaml
- component: EntityGithubPullRequestsOverviewCard
```

## Annotations

If the `catalog-info.yaml` descriptor file for the component is stored in GitHub, the `github.com/project-slug` is automatically added as the `org/repo` where the file is stored. However, you can manually configure or override this setting:

```yaml
metadata:
  annotations:
    github.com/project-slug: org/repo
```

## Support

The plugin is owned by [Roadie](https://roadie.io) and managed in the [Roadie plugins repository](https://github.com/roadieHQ/roadie-backstage-plugins) as an open-source project. Create a GitHub issue to report bugs or suggest new features for the plugin.
