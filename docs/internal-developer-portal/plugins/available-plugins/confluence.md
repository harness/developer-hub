---
title: Confluence Search
description: Index Confluence pages into IDP to allow you to search them with the IDP Search feature.
---

| Plugin details |                                      |
| -------------- |--------------------------------------|
| **Created by** | [K-Phoen](https://github.com/K-Phoen) |
| **Category**   | Search                               |
| **Source**     | [GitHub](https://github.com/K-Phoen/backstage-plugin-confluence/tree/main/plugins/search-confluence-backend)                           |
| **Type**       | Open-source plugin                   |

## Configuration

### Application configuration YAML

This plugin requires a backend configuration to make calls to Confluence with authentication. In the following configuration, replace `<your-org-name>` with the Confluence instance project (for example https://mycompany.atlassian.net). 
Mention list of spaces as `spaces: [ENG, IT, OPS]` that needs to be searched in IDP and specify username for `<your-username>`. 

```yaml
confluence:
  wikiUrl: https://<your-org-name>.atlassian.net/wiki
  spaces: [ENG]
  auth:
    username: <your-username>
    password: ${CONFLUENCE_TOKEN}
```

### Secrets

Since the `CONFLUENCE_TOKEN` variable is used in the application configuration, you must generate a Confluence API key and set it as the value of `CONFLUENCE_TOKEN`. For information about how to generate a API key, go to the [instructions](https://support.atlassian.com/atlassian-account/docs/manage-api-tokens-for-your-atlassian-account/).

### Delegate proxy

If confluence is self-hosted, ensure that you include the base URL `mycompany.atlassian.net` in this section. If confluence is hosted in public cloud, skip this section.

After adding the host, you can select one or more delegates that have access to the host. If you leave the delegate selectors field empty, it is assumed that all delegates in the account have access to the confluence.

:::note

When adding the host, include only the host name. Remove the protocol (HTTP/HTTPS) associated with it.

:::

![](./static/confluence-delegate-proxy.png)

## Layout

This plugin does not export any cards.

## Annotations

No annotations required for this plugin.

## Support

The plugin is owned by [K-Phoen](https://github.com/K-Phoen) and managed in the [K-Phoen plugins repository](https://github.com/K-Phoen/backstage-plugin-confluence) as an open-source project. Create a GitHub issue to report bugs or suggest new features for the plugin.
