---
title: Warehouse Native Experimentation Integrations
description: Learn how to connect your data warehouse with Harness FME to setup Warehouse Native Experimentation.
sidebar_label: Connect Your Data Warehouse
sidebar_position: 2
---

<CTABanner
  buttonText="Request Access"
  title="Warehouse Native is in beta!"
  tagline="Get early access to run Harness FME experiments directly in your data warehouse."
  link="https://developer.harness.io/docs/feature-management-experimentation/fme-support"
  closable={true}
  target="_self"
/>

## Overview

To run experiment analyses using <Tooltip id="fme.warehouse-native.warehouse-native">Warehouse Native</Tooltip>, Harness FME connects directly to your <Tooltip id="fme.warehouse-native.data-warehouse">data warehouse</Tooltip>. This allows you to use your existing event and metric data without duplicating or moving it. 

Warehouse Native Experimentation requires the following permissions:

* Read access to event, exposure, and metric tables
* Write access to a dedicated Harness schema for storing analysis results
* Permission to run queries and scheduled jobs

## Supported integrations

Warehouse Native Experimentation supports the following data warehouses:

import { Section, dataWarehouses } from '@site/src/components/Docs/data/whnIntegrations';

<Section items={dataWarehouses} />

Set up your connection, configure access, and apply recommended policies to start analyzing experiments in your data warehouse.