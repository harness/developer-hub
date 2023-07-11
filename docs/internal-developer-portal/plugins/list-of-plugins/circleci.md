---
title: CircleCI
---

| Plugin details |                                                                               |
| -------------- | ----------------------------------------------------------------------------- |
| **Created by** | Spotify                                                                       |
| **Category**   | CI/CD                                                                         |
| **Source**     | [GitHub](https://github.com/backstage/backstage/tree/master/plugins/circleci) |
| **Type**       | Open Source plugin                                                            |

## Configuration

### 1. App config YAML

_No action required_

This plugin needs a backend proxy config to make calls to CircleCI with authentication. This is set by default and you do not need to change anything here.

```yaml
proxy:
  "/circleci/api":
    target: https://circleci.com/api/v1.1
    pathRewrite:
      "api/proxy/circleci/api/?": "/"
    headers:
      Circle-Token: ${CIRCLECI_AUTH_TOKEN}
```

### 2. Secrets

Since `CIRCLECI_AUTH_TOKEN` variable is used in the app config, you need to generate a CircleCI API token and set it as a secret value of `CIRCLECI_AUTH_TOKEN`. [Read the instructions](https://circleci.com/docs/api/#add-an-api-token) on how to create a CircleCI API token.

### 3. Delegate proxy

_No action required_

This plugin does not need a delegate proxy to be setup since CircleCI can be accessed publicly on the cloud.

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
          - if: isCircleCIAvailable
            content:
              component: EntityCircleCIContent
          - content:
              component: EmptyState
              specs:
                props:
                  title: No CI/CD available for this entity
                  missing: info
                  description: You need to add an annotation to your component if you want to enable CI/CD for it. You can read more about annotations in Backstage by clicking the button below.
```

The `isCircleCIAvailable` condition is met when the `circleci.com/project-slug` annotation is present in the software components's `catalog-info.yaml` definition file.

## Annotations

In order to configure the plugin for a service in the software catalog, the following annotation must be set in its `catalog-info.yaml` definition file.

```yaml
metadata:
  annotations:
    circleci.com/project-slug: github/my-org/my-repo
    # Or bitbucket/xxx/yyy
```

## Support

The plugin is owned by Spotify and managed in the [Backstage repository](https://github.com/backstage/backstage) as an Open Source project. Create a GitHub issue to report bugs or suggest new features on the plugin.
