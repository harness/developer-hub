---
title: GitHub Copilot 
description: Learn how to configure and use the GitHub Copilot plugin to view usage insights in Harness Internal Developer Portal (IDP).
tags:
  - copilot
  - github
  - plugin
  - developer-experience
  - harness-idp
keywords:
  - GitHub Copilot
  - Harness IDP
  - Backstage plugin
  - developer insights
  - plugin setup
  - GitHub Enterprise
  - IDP layout
  - delegate proxy
---
# GitHub Copilot 

## Overview

The **Github Copilot plugin** provides GitHub Copilot Enterprise insights directly within Harness IDP. It helps visualize Copilot usage metrics such as:

- Suggestion acceptance rates  
- Language-wise usage distribution  
- Overall Copilot activity  

These insights help engineering teams assess the adoption and effectiveness of GitHub Copilot across their services.



## Plugin Metadata

| Field         | Value                |
|---------------|----------------------|
| **Created by** | Backstage Community  |
| **Category**   | Developer Experience |
| **Source**     | [GitHub](https://github.com/backstage/community-plugins/tree/main/workspaces/copilot/plugins/copilot)               |
| **Type**       | Open-source plugin   |



## Configuration

### Application Configuration YAML


```yaml
copilot:
  scheduler:
    frequency:
      cron: '0 2 * * *'
    timeout:
      minutes: 2
    initialDelay:
      seconds: 15
host: github.com  # or ghe.myenterprise.com
organization: githubOrg
# enterprise: enterpriseName  (if you are on GitHub enterprise)

```

:::info 
Update the `host`, `enterprise`, and `organization` values to match your GitHub Copilot Enterprise setup.
:::

:::note 
The plugin pulls data using GitHub REST APIs and requires **authorization via a token** which depends on the [Git Integration](https://developer.harness.io/docs/internal-developer-portal/get-started/setup-git-integration#connector-setup) setup done at IDP under "Configure" -> "Git Integrations" page, make sure to use the same host as one that's configured in the Git integration
:::


### Delegate Proxy (Optional)

Set up a **delegate proxy** if:

* GitHub APIs are not directly accessible from Harness SaaS.
* The GitHub token (secret) is not stored in the built-in Secret Manager.

#### Steps:

1. Add the host (`github.com`) under *Host URL or IP Address*.
2. Use a delegate with access to GitHub and your Secret Manager.
3. Provide delegate selector tags if needed.

Use a **single delegate tag** for consistency.


## Layout Integration

This plugin exports:

* ✅ 1 Page
* ❌ 0 Cards
* ❌ 0 Tabs

#### To add the page to the portal layout:

Update your layout config in the Admin Panel under `Layout > Sidenav Layout` like so:

```yaml
- name: SidebarItem
  props:
    to: copilot
    text: CoPilot
```

<!-- > By default, the page is added to **service** and **website** layouts. You can modify this from **Layout Management** — reorder, remove, or reassign the page to different entity types as needed. -->

---

## Annotations

* No specific annotations are required.

