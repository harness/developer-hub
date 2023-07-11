---
title: Firehydrant plugin
description: View service incidents information from FireHydrant, such as active incidents and incident metrics, directly within Backstage.
---

| Plugin details |                                                                                            |
| -------------- | ------------------------------------------------------------------------------------------ |
| **Created by** | [Firehydrant](https://firehydrant.com/)                                                    |
| **Category**   | Incident management                                                                        |
| **Source**     | [GitHub](https://github.com/backstage/backstage/blob/master/plugins/firehydrant/README.md) |
| **Type**       | Open Source plugin                                                                         |

## Configuration

### 1. App config YAML

_No action required_

This plugin needs a backend proxy config to make calls to Firehydrant with authentication. This is set by default and you do not need to change anything here.

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

### 2. Secrets

Since `FIREHYDRANT_TOKEN` variable is used in the app config, you need to generate a Firehyrant API token and set it as a secret value of `FIREHYDRANT_TOKEN`. You can do this on your [Firehydrant app](https://app.firehydrant.io/organizations/bots).

### 3. Delegate proxy

_No action required_

This plugin does not need a delegate proxy to be setup since Firehyrant can be accessed publicly on the cloud.

## Layout

This plugin exports a UI Card which can be shown on the **Overview** tab of a service or any other layout pages. Go to the layout section from **Admin** -> **Layout**, choose **Service** from the dropdown and add the following in the **Overview** section.

```yaml
- component: FirehydrantCard
```

## Annotations

In order to further configure the plugin for a service in the software catalog, the following annotation can be set in its `catalog-info.yaml` definition file.

```yaml
metadata:
  annotations:
    firehydrant.com/service-name: <firehydrant-service-name>
```

## Support

The plugin is owned by Firehydrant and managed in the [Backstage repository](https://github.com/backstage/backstage) as an Open Source project. Create a GitHub issue to report bugs or suggest new features on the plugin.
