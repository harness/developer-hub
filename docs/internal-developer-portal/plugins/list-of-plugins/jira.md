---
title: Jira
---

| Plugin details |                                                    |
| -------------- | -------------------------------------------------- |
| **Created by** | [Roadie](https://roadie.io)                        |
| **Category**   | Agile Planning                                     |
| **Source**     | [GitHub](https://roadie.io/backstage/plugins/jira) |
| **Type**       | Open Source plugin                                 |

## Configuration

### 1. App config YAML

_No action required_

This plugin needs a backend proxy config to make calls to Pagerduty with authentication. You need to update the `<your-jira-url>` with the Jira instance project, for example https://mycompany.atlassian.net

```yaml
proxy:
  "/jira/api":
    target: "<your-jira-url>"
    pathRewrite:
      "api/proxy/jira/api/?": "/"
    headers:
      Authorization: ${JIRA_TOKEN}
      Accept: "application/json"
      Content-Type: "application/json"
      X-Atlassian-Token: "nocheck"
      User-Agent: "MY-UA-STRING"
```

### 2. Secrets

Since `JIRA_TOKEN` variable is used in the app config, you need to generate a Jira API key and set it as a secret value of `JIRA_TOKEN`. [Read the instructions](https://developer.atlassian.com/server/framework/atlassian-sdk/consuming-an-activity-streams-feed/#authentication) on how to create it.

### 3. Delegate proxy

_No action required_

This plugin does not need a delegate proxy to be setup since Jira can be accessed publicly on the cloud.

## Layout

This plugin exports a UI Card which can be shown on the **Overview** tab of a service or any other layout pages. Go to the layout section from **Admin** -> **Layout**, choose **Service** from the dropdown and add the following in the **Overview** section.

```yaml
- component: EntityJiraOverviewCard
```

You can also make the card appear conditionally for services only if Jira is configured for a service by replacing the card with a switch case, as below

```yaml
- component: EntitySwitch
  specs:
    cases:
      - if: isJiraAvailable
        content:
          component: EntityJiraOverviewCard
```

## Annotations

In order to configure the plugin for a service in the software catalog, one of the following annotations must be set in its `catalog-info.yaml` definition file.

```yaml
metadata:
  annotations:
    jira/project-key: <example-jira-project-key>
    jira/component: <example-component> # optional, you might skip this value to fetch data for all components
```

## Support

The plugin is owned by [Roadie](https://roadie.io) and managed in the [Roadie plugins repository](https://github.com/roadieHQ/roadie-backstage-plugins) as an Open Source project. Create a GitHub issue to report bugs or suggest new features on the plugin.
