---
title: Plugins
sidebar_label: Overview
description: Learn about the plugins in Internal Developer Portal and how to customize IDP using them.
sidebar_position: 10
---

Harness IDP is built on top of the [Backstage plugin architecture](https://backstage.io/docs/plugins/) and supports a curated list of plugins. Plugins are often used to show additional metadata about a software component on the software catalog, for example, the CI/CD pipelines, alerts, incidents, project status, etc. The curated list of plugins is a subset of publicly available [Backstage plugins](https://backstage.io/plugins). We are constantly adding new plugins from the marketplace and building new plugins of our own. Coming later this year, you will have the option to build a custom plugin and make IDP even more personal for your organization.

![Plugins section in IDP](./static/plugins-section-in-idp.png)

## Configuration

A typical plugin in IDP is configured using three options

![](./static/plugins-configs.png)

### 1. App config YAML

The app config is a YAML driven way of configuring a plugin's behavior. It's mostly used to define how a frontend-only plugin makes authenticated calls to a third-party provider. Most of the times, you _don't need to change anything_ in the app-config.yaml of a plugin.

### 2. Secrets

Plugin configuration allows you to define variables and their secret values that can be used in the app config YAML of the plugin. This is usually an API key for the third party provider referred supported by the plugin. Any secret variable defined as `${}` under the app config YAML must have a corresponding secret value defined. The secrets configured in IDP are stored in the built-in secret manager provided by the Harness platform.

Note: The secret variables in IDP should be globally unique across all the plugins. Thus, you can re-use a secret variable from one plugin in another plugin's configuration. However, we recommend re-defining variables that are required by a plugin for the benefit of other users.

### 3. (Optional) Delegate proxy

Most of the plugins can connect to third party providers directly on the cloud. However, few plugins need to connect to systems behind your private network, for example, the kubernetes plugin connecting to your private kubernetes cluster. Such plugins require a setup of [Harness delegates](/docs/first-gen/firstgen-platform/account/manage-delegates/delegate-installation), which can be used as an HTTP proxy to connect to services running in your private network. In the configuration of the plugin, you can write a host or an IP address and choose which delegate to use when making the requests.

## FAQs

**What plugins are available in Harness IDP?**

See the [list of curated plugins](/docs/category/list-of-plugins).

**A plugin is available on the Backstage marketplace, but not on Harness IDP. What to do?**

We are happy to expand our curated plugins list as requested by our customers. Let us know about the plugin and we'll be happy to make it available for you.

**We are looking for a plugin which is not present on the Backstage marketplace. What are our options?**

1. Look at the [plugin ideas](https://github.com/backstage/backstage/issues?q=is%3Aopen+is%3Aissue+label%3Aplugin) by the Backstage community and see if a request already exists. If not, you can [create one](https://github.com/backstage/backstage/issues/new?assignees=&labels=plugin&projects=&template=plugin.yaml&title=%F0%9F%94%8C+Plugin%3A+%3Ctitle%3E).
2. You can build a new Backstage plugin and publish on the marketplace. Start [here](https://backstage.io/docs/plugins/create-a-plugin) and search for "how to create a Backstage plugin".
3. (Coming soon) You can build a custom plugin and use it in Harness IDP, without making the source public.
