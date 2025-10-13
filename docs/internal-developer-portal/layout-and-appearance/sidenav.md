---
title: Harness IDP Sidebar Navigation
sidebar_label: Sidebar Navigation
description: Learn how you can customize the Sidebar Navigation of Harness IDP
sidebar_position: 20
---

In Harness IDP, you as a platform admin can customize the sidebar navigation to ensure the end-users see what's important for them. This can be used to add new plugins, reorder existing items based on priority, add custom links to different tools for quick access, etc. The Sidenav changes are reflected for everyone using Harness IDP and does not affect any other Harness modules.

![](./static/customizable-sidenav.png)

## The Layout Editor

You can access the Sidenav Layout editor by navigating to Harness IDP and choosing Admin from the sidebar.

![](./static/click-on-admin.png)

You can then choose Layout from the Sidenav and choose the Sidebar Navigation Layout.

![](./static/click-on-layout.png)

![](./static/sidenav-layout-editor.png)

<details>
<summary>Example Sidenav Layout YAML</summary>

```yaml
page:
  children:
    - name: SidebarGroup
      props:
        label: Search
        to: /search
      children:
        - name: SidebarSearchModal
    - name: SidebarDivider
    - name: SidebarItem
      props:
        to: overview
        text: Home
    - name: SidebarItem
      props:
        to: catalog
        text: Catalog
    - name: SidebarItem
      props:
        to: create
        text: Workflows
    - name: SidebarItem
      props:
        to: docs
        text: Docs
    - name: SidebarItem
      props:
        to: api-docs
        text: APIs
    - name: SidebarItem
      props:
        to: catalog-import
        text: Register
    - name: SidebarDivider
```

</details>

## Add a new Link in the Sidenav

Let's take an example of how you can add a new Custom Link to let's say your internal Sonarqube instance. This will open the link in a new tab.

```yaml
- name: SidebarItem
  props:
    to: https://mysonarqube.internal.net
    text: Sonarqube
```

## Change the default Catalog landing page

You can also update existing Sidenav links to change the default landing behavior for users. Let's say you want users to see **Systems** by default when they click on **Catalog**. You can update the Catalog item with the following -

```yaml
- name: SidebarItem
  props:
    to: catalog?filters%5Bkind%5D=system
    text: Catalog
```

## Custom Plugins

If you have built a [Custom Plugin](/docs/internal-developer-portal/plugins/custom-plugins/overview) inside IDP and are exporting a full page component, you can link to the plugin from the Sidenav as well.

```yaml
- name: SidebarItem
  props:
    to: EntityMyCustomPluginPage
    text: MyPlugin
```

## Embedding an Iframe

You can embed an iframe inside the sidenav layout to display external web content directly within your Harness IDP.

![](./static/iframe-embedd.png)

#### Steps to Add an Iframe

1. Navigate to the sidenav layout page.
2. Add a YAML block similar to the example below:

```yaml
- name: SidebarItem
  type: iframe
  props:
    to: iframe/developer_docs
    text: Developer docs
    url: https://developer.harness.io/
```

When configuring the iframe SidebarItem:

* Use `type: iframe` to specify an iframe element (case-insensitive, so `IfRAmE` also works)
* Configure these properties under `props`:
  * `to`: Must follow the format `iframe/${path}` where `${path}` is your custom path segment (this `path` is a unique path i.e. every sidebar item being added must be unique)
  * `text`: The label that appears in the sidebar navigation
  * `url`: The external URL you want to display within the iframe

:::info
iframes come with certain inherent limitations — for example, OAuth will not work and some websites put limits or block themselves from being rendered inside iframes.
:::
