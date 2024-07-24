---
title: Harness Infrastructure as Code Management
description: View the IACM workspaces and provisioned resources
---

| Plugin details |                                                        |
| -------------- | ------------------------------------------------------ |
| **Created by** | Harness                                                |
| **Category**   | Infrastructure                                         |
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

No secrets are required for this plugin because both IDP and IACM are part of the Harness software delivery platform.

### Delegate proxy

_No action required_

This plugin does not require a delegate proxy to be set up.

## Layout

This plugin exports a UI tab that you can use as a new IACM tab for workspaces or for any other layout page. Go to **Admin** > **Layout**, select **Service** in the dropdown menu, and then add the following YAML code under **iacm** section as we do for the **CI/CD** section:

```yaml
- name: iacm
  path: /iacm
  title: IACM
  contents:
    - component: EntitySwitch
      specs:
        cases:
          - if: isHarnessIacmAvailable
            content:
              component: EntityIacmContent
```

The `isHarnessIacmAvailable` condition is met when `harness.io/workspace-url` annotation is present in the software components's `catalog-info.yaml` definition file.


## Annotations

To configure the plugin for a service in the software catalog, set one or both of the following annotations in its `catalog-info.yaml` definition file, you can fetch the workspaces URL from the [workspaces](https://developer.harness.io/docs/infra-as-code-management/workspaces/create-workspace) page:

```yaml
apiVersion: backstage.io/v1alpha1
kind: Component
metadata:
  # ...
  annotations:
    harness.io/workspace-url: |
      labelA: <harness_iacm_workspace_url>
      labelB: <harness_iacm_workspace_url>
spec:
  type: service
  # ...
```

## Support

The plugin is owned by Harness and managed in the [Harness plugins repository](https://github.com/harness/backstage-plugins) as an open-source project. Create a GitHub issue to report bugs or suggest new features for the plugin.
