---
title: Harness Service Reliability Management 
description: Track the SLOs and Error Budgets for Monitored Services
---

| Plugin details |                                                        |
| -------------- | ------------------------------------------------------ |
| **Created by** | Harness                                                |
| **Category**   | SRM                                                  |
| **Source**     | [GitHub](https://github.com/harness/backstage-plugins) |
| **Type**       | Open-source plugin                                     |

## Configuration

### Application configuration YAML

_No action required_

This plugin requires a backend proxy configuration to make calls to Harness APIs with authentication. The following configuration is set by default and you do not need to change anything:

```yaml
proxy:
  "/harness/prod":
    target: "https://app.harness.io/"
    pathRewrite:
      "/api/proxy/harness/prod/?": "/"
    allowedHeaders:
      - authorization
```

### Secrets

No secrets are required for this plugin because both IDP and CI/CD are part of the Harness software delivery platform.

### Delegate proxy

_No action required_

This plugin does not require a delegate proxy to be set up.

## Layout

This plugin exports a UI tab that you can use as a new CI/CD tab for a service or for any other layout page. Go to **Admin** > **Layout**, select **Service** in the dropdown menu, and then add the following YAML code in the **srmContent** section:

```yaml
- name: srm
  path: /srm
  title: Reliability Management
  contents:
    - component: EntitySwitch
      specs:
        cases:
          - if: isHarnessSRMAvailable
            content:
              component: EntityHarnessSrmContent
          - content:
              component: EmptyState
              specs:
                props:
                  title: No SRM available for this entity
                  missing: info
                  description: You need to add an annotation to your component if you want to enable SRM for it. You can read more about annotations in Backstage by clicking the button below.
```

The `isHarnessSRMAvailable` condition is met when the `harness.io/services` annotation is present in the software components's `catalog-info.yaml` definition file.

## Annotations

To configure the plugin for a service in the software catalog, set one or both of the following annotations in its `catalog-info.yaml` definition file:

```yaml
apiVersion: backstage.io/v1alpha1
kind: Component
metadata:
  # ...
  annotations:
    harness.io/services: |
      labelA: <harness_service_url>

spec:
  type: service
  # ...
```

## Support

The plugin is owned by Harness and managed in the [Harness plugins repository](https://github.com/harness/backstage-plugins) as an open-source project. Create a GitHub issue to report bugs or suggest new features for the plugin.
