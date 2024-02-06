---
title: Overview of custom plugins in IDP
sidebar_label: Overview
description: Learn about custom plugins in Internal Developer Portal and how to use them to customize IDP.
sidebar_position: 1
---

The Custom Plugins feature in IDP will allow users to plug their own private Backstage plugins into the Harness IDP and use them along with the curated plugins available for everyone. The development and ownership of these plugins is dependent on the users. 

:::warning

This feature is **not available in production environment yet**, meanwhile take a look at the demo of custom plugins to get an overview of it. In case you want to try out this feature please reach out to the IDP team.

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


