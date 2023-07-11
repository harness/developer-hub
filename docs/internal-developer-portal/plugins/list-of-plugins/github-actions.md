---
title: GitHub Actions
---

| Plugin details |                                                                                     |
| -------------- | ----------------------------------------------------------------------------------- |
| **Created by** | Spotify                                                                             |
| **Category**   | CI/CD                                                                               |
| **Source**     | [GitHub](https://github.com/backstage/backstage/tree/master/plugins/github-actions) |
| **Type**       | Open Source plugin                                                                  |

## Configuration

### 1. App config YAML

_No action required_

This plugin does not need any app config to be configured.

### 2. Secrets

This plugin requires the user to login using the configured GitHub OAuth app. Please ensure that you have a GitHub OAuth app created and configured in IDP for this plugin to work. Read more on the [instructions to configure a GitHub OAuth app](../oauth-support-for-plugins.md).

### 3. Delegate proxy

_No action required_

This plugin does not need a delegate proxy to be setup since GitHub can be accessed publicly on the cloud.

## Layout

This plugin exports a UI Tab which can be added as a new "CI/CD" tab of a service or any other layout pages. Go to the layout section from **Admin** -> **Layout**, choose **Service** from the dropdown and add the following in the **CI/CD** section.

```yaml
- name: ci-cd
  path: /ci-cd
  title: CI/CD
  contents:
    - component: EntitySwitch
      specs:
        cases:
          - if: isGithubActionsAvailable
            content:
              component: EntityGithubActionsContent
          - content:
              component: EmptyState
              specs:
                props:
                  title: No CI/CD available for this entity
                  missing: info
                  description: You need to add an annotation to your component if you want to enable CI/CD for it. You can read more about annotations in Backstage by clicking the button below.
```

The `isGithubActionsAvailable` condition is met when the `github.com/project-slug` annotation is present in the software components's `catalog-info.yaml` definition file.

## Annotations

If the `catalog-info.yaml` descriptor file for the component is stored in GitHub, the `github.com/project-slug` is automatically added as the `org/repo` where the file is stored. However, this also can be manually configured or overridden.

```yaml
metadata:
  annotations:
    github.com/project-slug: org/repo
```

## Support

The plugin is owned by Spotify and managed in the [Backstage repository](https://github.com/backstage/backstage/tree/master/plugins/github-actions) as an Open Source project. Create a GitHub issue to report bugs or suggest new features on the plugin.
