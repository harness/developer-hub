---
title: Jira
description: View project summaries and latest activities in your Jira project.
---

| Plugin details |                                                    |
| -------------- | -------------------------------------------------- |
| **Created by** | [Roadie](https://roadie.io)                        |
| **Category**   | Agile Planning                                     |
| **Source**     | [GitHub](https://roadie.io/backstage/plugins/jira) |
| **Type**       | Open-source plugin                                 |

## Configuration

### Application configuration YAML

This plugin requires a backend proxy configuration to make calls to Jira with authentication. In the following configuration, replace `<your-jira-url>` with the Jira instance project (for example https://mycompany.atlassian.net):

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

### Secrets

Since the `JIRA_TOKEN` variable is used in the application configuration, you must generate a Jira API key and set it as the value of `JIRA_TOKEN`. For information about how to generate a Jira API key, go to the [instructions](https://developer.atlassian.com/server/framework/atlassian-sdk/consuming-an-activity-streams-feed/#authentication).

### Delegate proxy

_No action required_

This plugin does not require a delegate proxy to be set up because Jira is publicly accessible.

## Layout

This plugin exports a UI card that you can show on the **Overview** tab of a service or any other layout page. Go to **Admin** > **Layout**, select **Service** in the dropdown menu, and then add the following in the **Overview** section:

```yaml
- component: EntityJiraOverviewCard
```

You can also make the card appear conditionally for services (only if Jira is configured for the service) by replacing the card with a switch case, as follows:

```yaml
- component: EntitySwitch
  specs:
    cases:
      - if: isJiraAvailable
        content:
          component: EntityJiraOverviewCard
```

## Annotations

To configure the plugin for a service in the software catalog, set one of the following annotations in its `catalog-info.yaml` definition file:

```yaml
metadata:
  annotations:
    jira/project-key: <example-jira-project-key>
    jira/component: <example-component> # optional, you might skip this value to fetch data for all components
```

## Support

The plugin is owned by [Roadie](https://roadie.io) and managed in the [Roadie plugins repository](https://github.com/roadieHQ/roadie-backstage-plugins) as an open-source project. Create a GitHub issue to report bugs or suggest new features for the plugin.
