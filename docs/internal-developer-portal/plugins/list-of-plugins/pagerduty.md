---
title: Pagerduty
description: PagerDuty plugin offers a simple way to identify any active incidents for an entity and the escalation policy.
---

| Plugin details |                                                                                |
| -------------- | ------------------------------------------------------------------------------ |
| **Created by** | Spotify                                                                        |
| **Category**   | Monitoring                                                                     |
| **Source**     | [GitHub](https://github.com/backstage/backstage/tree/master/plugins/pagerduty) |
| **Type**       | Open Source plugin                                                             |

## Configuration

### 1. App config YAML

_No action required_

This plugin needs a backend proxy config to make calls to Pagerduty with authentication. This is set by default and you do not need to change anything here.

```yaml
proxy:
  "/pagerduty":
    target: https://api.pagerduty.com
    pathRewrite:
      "api/proxy/pagerduty/?": "/"
    headers:
      Authorization: Token token=${PAGERDUTY_TOKEN}
```

### 2. Secrets

Since `PAGERDUTY_TOKEN` variable is used in the app config, you need to generate a Pagerduty API key and set it as a secret value of `PAGERDUTY_TOKEN`. [Read the instructions](https://github.com/backstage/backstage/tree/master/plugins/pagerduty#in-pagerduty) on how to create a Pagerduty API integration.

![](./static/pagerduty-secret.png)

### 3. Delegate proxy

_No action required_

This plugin does not need a delegate proxy to be setup since Pagerduty can be accessed publicly on the cloud.

## Layout

This plugin exports a UI Card which can be shown on the **Overview** tab of a service or any other layout pages. Go to the layout section from **Admin** -> **Layout**, choose **Service** from the dropdown and add the following in the **Overview** section.

```yaml
- component: EntityPagerDutyCard
```

You can also make the card appear conditionally for services only if Pagerduty is configured for a service by replacing the card with a switch case, as below

```yaml
- component: EntitySwitch
  specs:
    cases:
      - if: isPagerDutyAvailable
        content:
          component: EntityPagerDutyCard
```

## Annotations

In order to configure the plugin for a service in the software catalog, one of the following annotations must be set in its `catalog-info.yaml` definition file.

(Recommended)

```yaml
metadata:
  annotations:
    pagerduty.com/integration-key: [INTEGRATION_KEY]
```

(Alternative)

```yaml
metadata:
  annotations:
    pagerduty.com/service-id: [SERVICE_ID]
```

[Read more](https://github.com/backstage/backstage/tree/master/plugins/pagerduty#annotating-with-service-id)

## Support

The plugin is owned by Spotify and managed in the [Backstage repository](https://github.com/backstage/backstage) as an Open Source project. Create a GitHub issue to report bugs or suggest new features on the plugin.
