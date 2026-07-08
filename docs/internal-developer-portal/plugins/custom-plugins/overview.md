---
title: Overview of custom plugins in IDP
sidebar_label: Overview
description: Learn about custom plugins in Internal Developer Portal and how to use them to customize IDP.
sidebar_position: 1
---

The Custom Plugins feature in IDP allows users to plug their own private Backstage plugins into Harness IDP and use them along with the curated plugins available for everyone. Custom plugins are developed, owned and maintained by the users themselves.

:::warning[React and React Router Version Requirements]

When developing custom plugins for Harness IDP, ensure you use **React version 17.0.2** and **React DOM version 17.0.2** in your plugin's dependencies. Additionally, you must use **React Router v6** for any routing functionality in your plugin.

:::

:::warning

This feature is in **BETA** and is available behind the feature flag `IDP_ENABLE_CUSTOM_PLUGINS`. If you want to try out this feature, reach out to the IDP team. We would love to work with you and take feedback. This feature is currently **not 
available in the EU region clusters**. 


<DocVideo src="https://www.youtube.com/embed/6ab9xQY7kSE?si=zbG2ZUnZZQNJrlfS"/>

:::

:::info

At present, we only support the **Frontend Plugins** allowing you to create your own UI components, and use the **Backstage proxy** and **Delegates**, to connect to your internal systems and show meaningful data on the IDP UI.

:::



## How do we do it

In Harness IDP we allow two ways in which you can add your custom plugins

1. The npm package URL for **public npm packages** of the plugin (e.g. `https://www.npmjs.com/package/@parsifal-m/plugin-dev-quotes-homepage`)
2. The `package.tgz` folder which has the packaged plugin packed using `yarn pack`

Follow the detailed steps mentioned on these [docs](/docs/internal-developer-portal/plugins/custom-plugins/add-a-custom-plugin) to add your custom plugins to the IDP. 

## Custom plugins V2

Harness IDP also supports a newer Custom Plugins V2 framework. Unlike the original approach, V2 plugins are built using a dedicated React SDK (`@harnessio/idp-pluginssdk`) and deployed as a self-contained HTML file. This eliminates the need to package and upload a Backstage plugin archive.

Custom Plugins V2 is currently in **BETA** behind the feature flag `IDP_ENABLE_CUSTOM_PLUGINS_V2`. Go to [Custom Plugins V2](/docs/internal-developer-portal/plugins/custom-plugins/custom-plugins-v2) to set up and use this framework.


