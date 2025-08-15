---
title: Integrations
id: index
slug: /feature-management-experimentation/integrations
description: Learn how to integrate Harness FME with third-party tools.
---

## Overview

Split integrates across several categories, including messaging, monitoring, issue management, customer data platforms, and analytics. In addition, the Split developer community has contributed numerous integrations that bring data from your feature delivery platform into the tools your team already uses, helping make all of your tools **feature-flag aware** and improving cross-team collaboration. 

:::tip
If you're not seeing a tool you need to be connected to Split, you can use Split’s [API](https://docs.split.io/) and [SDKs](/docs/feature-management-experimentation/sdks-and-infrastructure) to connect with the tools your team uses. For assistance with Split’s SDK or API, contact [Harness Support](/docs/feature-management-experimentation/fme-support).
:::

import { Section, supportedWorkflows, supportedDatasources, supportedAdminchanges, supportedCommunity } from '/src/components/Docs/data/fmeIntegrations';

<Section 
  title="Split-supported Workflow Integrations" 
  items={supportedWorkflows} 
  perRow={6} 
  rowSpacing="20px" 
  description="Split-supported workflow integrations allow you to send feature flag changes directly to the tools your team relies on, helping your team act on flag updates in real time." 
/>

<Section 
  title="Split-supported Data Integrations" 
  items={supportedDatasources} 
  perRow={6} 
  rowSpacing="20px" 
  description="Split-supported data source integrations send event data to Split to power experiments, helping you measure the impact of features on metrics derived from your customer data. Split-supported data export integrations allow you to send impression data to analytics platforms, data warehouses, or CRM tools to enrich your business intelligence and reporting." 
/>

<Section 
  title="Split-supported Admin Integrations" 
  items={supportedAdminchanges} 
  perRow={6} 
  rowSpacing="20px" 
  description="Split-supported admin integrations let you propagate administrative changes (such as user or configuration updates) to the tools your team uses, keeping your workflows consistent and up-to-date." 
/>

<Section 
  title="Community-supported Integrations" 
  items={supportedCommunity} 
  perRow={6} 
  rowSpacing="20px" 
  description="In addition to native integrations, the Split community has contributed a wide variety of integrations, enabling you to bring feature flag data into additional tools not natively supported, from monitoring dashboards to analytics platforms." 
/>

<br />

:::info
Already built out your own integration or want to request an integration? Contact [Harness Support](/docs/feature-management-experimentation/fme-support). We’d like to feature your work to the entire Split developer community.
:::