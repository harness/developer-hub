---
title: Warehouse Native Experimentation
id: index
slug: /feature-management-experimentation/warehouse-native
sidebar_label: Overview
sidebar_position: 1
description: Learn how to run experiments in your data warehouse using Harness Feature Management & Experimentation (FME).
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

Warehouse Native enables [experimentation](/docs/feature-management-experimentation/experimentation/setup/) workflows, from targeting and assignment to analysis, and provides a statistical engine for analyzing existing experiments with measurement tools in Harness Feature Management & Experimentation (FME).

## How Warehouse Native works

Warehouse Native runs experimentation jobs directly in your <Tooltip id="fme.warehouse-native.data-warehouse">data warehouse</Tooltip> by using your existing data to calculate metrics and enrich experiment analyses. 

![](./static/data-flow.png)

The data model is designed around two two primary types of data: **assignment data** and **performance/behavioral data**, which power the FME statistical engine in your warehouse. 

Key components include:

- **Assignment data**: Tracks user or entity assignments to experiments. This includes metadata about the experiment.
- **Performance and behavioral data**: Captures metrics, events, and user behavior relevant to the experiment.
- **Experiment metadata**: Contains definitions for experiments, including the experiment ID, name, start/end dates, traffic allocation, and grouping logic.
- **Metric definitions**: Defines how metrics are computed in the warehouse, including aggregation logic and denominators. These definitions ensure analyses are standardized across experiments.

### Cloud Experimentation

<Tooltip id="fme.warehouse-native.cloud-experimentation">Cloud Experiments</Tooltip> are executed and analyzed within Harness FME, which collects feature flag impressions and performance data from your application and integrations. For more information, see the [Cloud Experimentation documentation](/docs/feature-management-experimentation/experimentation).

```mermaid
flowchart LR
  %% Customer infrastructure
  subgraph CI["Customer Infrastructure"]
    direction TB
    subgraph APP["Your Application"]
      FME["FME SDK"]
      style FME fill:#9b5de5,stroke:#9b5de5,color:#fff
    end

    integrations["Integrations including Google Analytics, Segment, Sentry, mParticle, Amplitude, and Amazon S3"]
    style integrations fill:none,stroke:none,color:#fff
  end
  style CI fill:#8110B5,stroke:#8110B5,color:#fff

  %% Harness FME System
  subgraph HFM["Harness FME"]
    direction TB

    %% Horizontal input boxes without a subgraph
    FF["FME Feature Flags"]
    PD["Performance and behavioral data"]
    style FF fill:#9b5de5,stroke:#9b5de5,color:#fff
    style PD fill:#9b5de5,stroke:#9b5de5,color:#fff

    AE["FME Attribution Engine"]
    style AE fill:#9b5de5,stroke:#9b5de5,color:#fff

    %% Connect inputs to Attribution Engine
    FF --> AE
    PD --> AE
  end
  style HFM fill:#8110B5,stroke:#8110B5,color:#fff

  %% Arrows from Customer Infra to input boxes
  CI -- "Feature flag impression data" --> FF
  CI -- "Performance and additional event data" --> PD
```

### Warehouse Native

<Tooltip id="fme.warehouse-native.warehouse-native">Warehouse Native Experiments</Tooltip> are executed directly in your data warehouse, leveraging assignment and behavioral data from Harness FME to calculate metrics and run statistical analyses at scale. 

```mermaid
flowchart LR
  subgraph DW["Data Warehouse"]
    style DW fill:#8110B5,stroke:#8110B5,color:#fff
    direction TB
    AF["Assignment and FME feature flag data"]
    PB["Performance and behavioral data"]
    AE["FME Attribution Engine"]
    style AF fill:#9b5de5,stroke:#9b5de5,color:#fff
    style PB fill:#9b5de5,stroke:#9b5de5,color:#fff
    style AE fill:#9b5de5,stroke:#9b5de5,color:#fff
  end

  subgraph HFME[" "]
    direction TB
    HFM["Harness FME"]
    PAD1[" "]:::invisible
    PAD2[" "]:::invisible
  end

  classDef invisible fill:none,stroke:none;
  style HFM fill:#8110B5,stroke:#8110B5,color:#fff

  DW --> HFM

```

## Get started

To get started, [connect a data warehouse](/docs/feature-management-experimentation/warehouse-native/integrations/) and set up [assignment and metric sources](/docs/feature-management-experimentation/warehouse-native/setup/) to enable Warehouse Native Experimentation in Harness FME.