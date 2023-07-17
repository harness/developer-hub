---
title: FireHydrant plugin
description: View service incident information from FireHydrant, such as active incidents and incident metrics.
---

| Plugin details |                                                                                            |
| -------------- | ------------------------------------------------------------------------------------------ |
| **Created by** | [FireHydrant](https://firehydrant.com/)                                                    |
| **Category**   | Incident management                                                                        |
| **Source**     | [GitHub](https://github.com/backstage/backstage/blob/master/plugins/firehydrant/README.md) |
| **Type**       | Open-source plugin                                                                         |

## Configuration

### Application configuration YAML

_No action required_

This plugin requires a backend proxy configuration to make calls to FireHydrant with authentication. The following configuration is set by default and you do not need to change anything:

```yaml
proxy:
  "/firehydrant/api":
    target: "https://api.firehydrant.io/v1/"
    pathRewrite:
      "api/proxy/firehydrant/api/?": "/"
    changeOrigin: true
    headers:
      Authorization: Bearer ${FIREHYDRANT_TOKEN}
```

### Secrets

Since the `FIREHYDRANT_TOKEN` variable is used in the application configuration, you must generate a FireHydrant API token and set it as the value of `FIREHYDRANT_TOKEN`. You can do this in your [FireHydrant app](https://app.firehydrant.io/organizations/bots).

### Delegate proxy

_No action required_

This plugin does not require a delegate proxy to be set up because FireHydrant is publicly accessible.

## Layout

This plugin exports a UI card that you can show on the **Overview** tab of a service or on any other layout page. Go to **Admin** > **Layout**, choose **Service** in the dropdown menu, and then add the following YAML code in the **Overview** section:

```yaml
- component: FirehydrantCard
```

## Annotations

To further configure the plugin for a service in the software catalog, set the following annotation in its `catalog-info.yaml` definition file:

```yaml
metadata:
  annotations:
    firehydrant.com/service-name: <firehydrant-service-name>
```

## Support

The plugin is owned by FireHydrant and managed in the [Backstage repository](https://github.com/backstage/backstage) as an open-source project. Create a GitHub issue to report bugs or suggest new features for the plugin.
