---
title: Feature Management & Experimentation release notes
sidebar_label: Feature Management & Experimentation
date: 2024-12-13T08:00:00
tags: ["fme", "feature management experimentation"]

sidebar_position: 11
---

import HarnessApiData from '../src/components/HarnessApiData/index.tsx';

<DocsButton icon = "fa-solid fa-square-rss" text="Subscribe via RSS" link="https://developer.harness.io/release-notes/infrastructure-as-code-management/rss.xml" />

These release notes describe recent changes to Harness Feature Management & Experimentation.

:::info About Harness Release Notes

- **Progressive deployment:** Harness deploys changes to Harness SaaS clusters on a progressive basis. This means that the features described in these release notes may not be immediately available in your cluster. To identify the cluster that hosts your account, go to your **Account Overview** page in Harness. In the new UI, go to **Account Settings**, **Account Details**, **General**, **Account Details**, and then **Platform Service Versions**.
- **Security advisories:** Harness publishes security advisories for every release. Go to the [Harness Trust Center](https://trust.harness.io/?itemUid=c41ff7d5-98e7-4d79-9594-fd8ef93a2838&source=documents_card) to request access to the security advisories.
- **More release notes:** Go to [Harness Release Notes](/release-notes) to explore all Harness release notes, including module, delegate, Self-Managed Enterprise Edition, and FirstGen release notes.
:::

#### Last updated: September 30, 2024

## September 2024

### 2024-09-30

#### Better Together: Split + Harness

##### New Colors, Names for Organization and Workspace

Starting on September 30th, we began a progressive rollout to update the Split UI, bringing it closer to the look of Harness:

![Image](https://www.split.io/wp-content/uploads/Better-Together-Color-Changes.png)

Beyond a change in color scheme, you will also see two changes to **terminology**:

- **Workspaces** will now be known as **Projects** in the UI
- **Organizations** will now be known as **Accounts** in the UI

![Image](https://www.split.io/wp-content/uploads/Admin-Settings-New-Nomenclature-1920x977.png)

Note: These terminology changes are being made only to labels in the UI at this time. To avoid introducing a breaking change, the [Admin API](https://docs.split.io/reference/introduction) will continue to use the strings ws, workspace, organizationId, and orgId until further notice.

### 2024-09-12

#### Monitoring

##### Traffic Insights and Alerts

The **Alerts** tab has been renamed **Monitoring** and expanded to show real-time traffic insights over time and any alerts fired for the flag on a single page.

![Image](https://www.split.io/wp-content/uploads/monitoring_tab_in_docs-1920x1431.png)

By default, traffic over the **Last 48 hours** is shown, but you may also select the **Last 7 days**, another **Time range**, or a specific **Feature flag version**:

![Image](https://www.split.io/wp-content/uploads/Traffic_last48-by-defaultother_options-1920x573.png)

Changes made to flags (i.e., new flag versions) are displayed as vertical bars for context:

![Image](https://www.split.io/wp-content/uploads/flag-versions-vertical-bars.png)

For more information, have a look at the [Monitoring tab docs](https://help.split.io/hc/en-us/articles/30098162579853-Monitoring-tab).
