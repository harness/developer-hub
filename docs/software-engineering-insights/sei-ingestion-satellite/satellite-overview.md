---
title: Overview
description: Integrate your on-premise tools and custom integrations into your SEI project.
sidebar_position: 1
---

Ingestion Satellite is used to integrate your on-premise tools and custom integrations into your SEI project. It enables data ingestion and integration with various third-party applications and services.

### Configure the satellite

Satellites are configured while installing the SEI integrations in the integration configuration, within the Data Settings. Now we can configure the satellite for a supported, application-specific integration or a custom integration. SEI ​does not​ store satellite credentials.

### Application-specific

For application-specific integrations, select Satellite Integration or Use Satellite when installing the integration. For details about a specific integration, refer to the integration's documentation. You can find a list of application-specific integrations on the SEI integrations overview.

Credentials specified in the integration configuration are used to generate the Satellite configuration file, `satellite.yml`. The type of credentials required depends on the specific integration

* For self-managed Jira (on-prem private), you must use username and password credentials for authentication. Go to [JIRA integration](/docs/software-engineering-insights/sei-integrations/automated-integrations/sei-jira-integration) for more information.
* For on-prem GitLab, you must use API key (personal access token) authentication. Go to [Gitlab integration](/docs/software-engineering-insights/sei-integrations/automated-integrations/sei-integration-gitlab) for more information.
* For other application specific integration refer to the relevant documentation [here](/docs/software-engineering-insights/sei-integrations/sei-integrations-overview).

After configuring the integration, you can download the Satellite configuration file, `satellite.yml` which contains the necessary settings for your integration.

:::info 
You can deploy multiple containers for the same integration using the same configuration file.
:::

### Custom integration

For the Custom integration, enter a Name, and then select Install. The Satellite configuration file, `satellite.yml` is automatically downloaded.

### Use Proxy

In certain scenarios, it may be necessary to route Satellite traffic through a proxy either with or without authentication. Follow these steps to configure proxy settings in the `satellite.yml`configuration file:

1. Locate the "satellite" section within the `satellite.yml` file.
2. Add the following proxy settings under the `proxy` subsection:
   * `host`: Specify the IP address or domain of your proxy server. Do not include schemes like `https://` in the `host` field; use only the domain.
   * `port`: Specify the port number for your proxy
3. If authentication is required for your proxy, include the following parameters:
   * `username`: Enter your proxy username.
   * `password`: Enter your proxy password.
4. By default, only traffic to SEI is sent to the proxy. This means that connections to your internal integrations don't use the proxy. If you want to proxy all traffic, include `all_traffic: true`

Here is an example of the proxy configuration in the `satellite.yml` file:

```yaml
satellite:
  ...
  proxy:
    host: YOUR_PROXY_IP_OR_DOMAIN
    port: YOUR_PROXY_PORT
    username: YOUR_USERNAME       # Optional: Include if authentication is required.
    password: YOUR_PASSWORD       # Optional: Include if authentication is required.
    all_traffic: true             # Optional: Include to route all traffic through the proxy.

```

Please note that when using HTTPS with your proxy, a valid SSL certificate is required. If you are utilizing a self-signed certificate, you must provide the certificate to the Satellite for secure communication.

:::info
The Ingestion Satellite requires whitelisting certain Harness IP addresses in order to allow communication between the Harness Platform and your on-premises systems/tools. If the necessary IPs are not whitelisted, the Satellite may fail to authenticate or sync data properly.

To ensure your Ingestion Satellite can work correctly, please refer to the list of [Harness Platform IPs](/docs/platform/references/allowlist-harness-domains-and-ips) that need to be whitelisted in your firewall for the Satellite to function.
:::