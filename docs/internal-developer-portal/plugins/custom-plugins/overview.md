---
title: Overview of custom plugins in IDP
sidebar_label: Overview
description: Learn about custom plugins in Internal Developer Portal and how to use them to customize IDP.
sidebar_position: 1
---

The Custom Plugins feature in IDP allows users to plug their own private Backstage plugins into Harness IDP and use them along with the curated plugins available for everyone. Custom plugins are developed, owned and maintained by the users themselves.

:::warning

This feature is in **BETA** and is available behind the feature flag `IDP_ENABLE_CUSTOM_PLUGINS` . If you want to try out this feature, please reach out to the IDP team. We would love to work with you and take feedback.

<DocVideo src="https://www.youtube.com/embed/6ab9xQY7kSE?si=zbG2ZUnZZQNJrlfS"/>

:::

:::info

At present we only support the **Frontend Plugins** allowing you to create your own UI components, and use the **Backstage proxy** and **Delegates**, to connect to your internal systems and show meaningful data on the IDP UI.

:::

## How Do We Do It

In Harness IDP we allow two ways in which you can add your custom plugins

1. The npm package URL for **public npm packages** of the plugin (eg. `https://www.npmjs.com/package/@parsifal-m/plugin-dev-quotes-homepage`)
2. The `package.tgz` folder which has the packaged plugin packed using `yarn pack`

Follow the detailed steps mentioned on this [docs](/docs/internal-developer-portal/plugins/custom-plugins/add-a-custom-plugin) to add your custom plugins to the IDP. 


