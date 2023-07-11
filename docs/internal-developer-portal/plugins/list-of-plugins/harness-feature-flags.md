---
title: Harness Feature Flags
# Hidden until the plugin has been released
hidden: true
---

| Plugin details |                                                        |
| -------------- | ------------------------------------------------------ |
| **Created by** | Harness                                                |
| **Category**   | Feature flags                                          |
| **Source**     | [GitHub](https://github.com/harness/backstage-plugins) |
| **Type**       | Open Source plugin                                     |

## Configuration

### 1. App config YAML

_No action required_

This plugin needs a backend proxy config to make calls to Harness APIs with authentication. This is set by default and you do not need to change anything here.

```yaml
proxy:
  "/harness/prod":
    target: "https://app.harness.io/"
    pathRewrite:
      "/api/proxy/harness/prod/?": "/"
    allowedHeaders:
      - authorization
```

### 2. Secrets

No secrets are required for this plugin since both IDP and Feature Flags are part of Harness.

### 3. Delegate proxy

_No action required_

This plugin does not need a delegate proxy to be setup.

## Layout

This plugin exports a UI Tab which can be added as a new "Feature Flags" tab of a service or any other layout pages. Go to the layout section from **Admin** -> **Layout**, choose **Service** from the dropdown and add the following in a new **Feature Flags** section.

```yaml
- name: feature-flags
  path: /feature-flags
  title: Feature Flags
  contents:
    - component: EntitySwitch
      specs:
        cases:
          - if: isHarnessFeatureFlagAvailable
            content:
              component: EntityHarnessFeatureFlagContent
```

The `isHarnessFeatureFlagAvailable` condition is met when `harness.io/project-url` annotation is present in the software components's `catalog-info.yaml` definition file.

## Annotations

In order to configure the plugin for a service in the software catalog, one of the following or both annotations should be set in its `catalog-info.yaml` definition file.

```yaml
apiVersion: backstage.io/v1alpha1
kind: Component
metadata:
  # ...
  annotations:
    # mandatory annotation
    harness.io/project-url: <harness_project_url>
spec:
  type: service
  # ...
```

## Support

The plugin is owned by Harness and managed in the [Harness plugins repository](https://github.com/harness/backstage-plugins) as an Open Source project. Create a GitHub issue to report bugs or suggest new features on the plugin.
