---
title: CircleCI
description: View CI/CD pipeline executions running in CircleCI.
---

| Plugin details |                                                                               |
| -------------- | ----------------------------------------------------------------------------- |
| **Created by** | Spotify                                                                       |
| **Category**   | CI/CD                                                                         |
| **Source**     | [GitHub](https://github.com/backstage/backstage/tree/master/plugins/circleci) |
| **Type**       | Open-source plugin                                                            |

## Configuration

### Application configuration YAML

_No action required_

This plugin requires a backend proxy configuration to make calls to CircleCI with authentication. The following configuration is set by default and you do not need to change anything:

```yaml
proxy:
  "/circleci/api":
    target: https://circleci.com/api/v1.1
    pathRewrite:
      "api/proxy/circleci/api/?": "/"
    headers:
      Circle-Token: ${CIRCLECI_AUTH_TOKEN}
```

### Secrets

Since the `CIRCLECI_AUTH_TOKEN` variable is used in the application configuration, you must generate a CircleCI API token and set it as the value of `CIRCLECI_AUTH_TOKEN`. For information about how to create a CircleCI API token, go to the [instructions](https://circleci.com/docs/api/#add-an-api-token).

### Delegate proxy

_No action required_

This plugin does not require a delegate proxy to be set up because CircleCI is publicly accessible.

## Layout

This plugin exports a UI tab that you can use as a new CI/CD tab for a service or for any other layout page. Go to **Admin** > **Layout**, select **Service** in the dropdown menu, and then add the following YAML code in the **CI/CD** section:

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

To configure the plugin for a service in the software catalog, set the following annotation in its `catalog-info.yaml` definition file:

```yaml
metadata:
  annotations:
    circleci.com/project-slug: github/my-org/my-repo
    # Or bitbucket/xxx/yyy
```

## Support

The plugin is owned by Spotify and managed in the [Backstage repository](https://github.com/backstage/backstage) as an open-source project. Create a GitHub issue to report bugs or suggest new features for the plugin.
