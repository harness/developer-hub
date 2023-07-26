---
title: Confluence Search
description: Extend IDP Search to include results from your Confluence pages.
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

:::note

If there is no space defined `spaces: []`, then this plugin will not consider any space to start indexing. 

:::

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

If your Confluence website is self-hosted or has an IP allow-list , ensure that you include the base URL `mycompany.atlassian.net` in the delegate proxy section. If your confluence is hosted on public cloud and can be accessed directly using a token, skip this section.
After adding the host, you can select one or more delegates that have access to the host.

:::note

When adding the host, include only the host name. Remove the protocol (HTTP/HTTPS) associated with it.

:::

![](./static/confluence-delegate-proxy.png)

## Layout

This plugin provides components that are included in the Search results page. It does not export any components to be used in the layout section of the IDP Admin UI.

## Annotations

No annotations required for this plugin.

## Support

The plugin is owned by [K-Phoen](https://github.com/K-Phoen) and managed in the [K-Phoen plugins repository](https://github.com/K-Phoen/backstage-plugin-confluence) as an open-source project. Create a GitHub issue to report bugs or suggest new features for the plugin.
