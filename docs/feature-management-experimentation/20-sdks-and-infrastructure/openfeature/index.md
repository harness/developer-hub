---
title: OpenFeature Providers
id: index
slug: /feature-management-experimentation/sdks-and-infrastructure/openfeature
sidebar_position: 1
description: Learn about using Harness OpenFeature providers for feature management.
---

## Overview

[OpenFeature](https://openfeature.dev/docs/reference/intro) offers a standardized, vendor-agnostic SDK for feature flagging that can integrate with a variety of third-party providers. Whether you're using an open-source or commercial solution, self-hosted or cloud-hosted, OpenFeature gives developers a unified API for consistent feature flag evaluation. 

OpenFeature SDKs provide flexible abstractions that make it easy to integrate feature flags into any application. Within your application, the feature flagging client uses the OpenFeature SDK to evaluate <Tooltip id="fme.openfeature.feature-flag">feature flags</Tooltip> through the <Tooltip id="fme.openfeature.evaluation-api">Evaluation API</Tooltip>. 

Each flag evaluation passes an <Tooltip id="fme.openfeature.evaluation-context">evaluation context</Tooltip>, which provides relevant data about the application or user.

```mermaid
flowchart LR
  %% Outer app box
  subgraph YourApp["Your App"]
    style YourApp fill:#D0E4FF,stroke:#0000FF,stroke-width:2px

    %% Feature Flagging Client (yellow dotted box)
    subgraph FeatureFlagClient["Feature Flagging Client"]
      style FeatureFlagClient stroke:#FFD700,stroke-dasharray: 5 5

      %% Puzzle piece: OpenFeature SDK
      subgraph OpenFeatureSDK["OpenFeature SDK"]
        style OpenFeatureSDK fill:#FFFF99,stroke:#FFD700

        %% Flag Evaluation API inside SDK
        FlagEvalAPI["Flag Evaluation API"]
      end

      %% OpenFeature Provider in second half of puzzle piece
      OpenFeatureProvider["Harness FME <br> OpenFeature Provider"]
    end

    %% Arrows from Flag Eval through Eval Context directly into FlagEvalAPI
    FlagEval1["Flag Eval"] --> EvalCtx1["Eval Context"] --> FlagEvalAPI
    FlagEval2["Flag Eval"] --> EvalCtx2["Eval Context"] --> FlagEvalAPI
  end

  %% External Harness FME Service in cloud
  HarnessFME["Harness FME Service"]:::cloudStyle

  %% Bidirectional arrow between OpenFeature Provider and Harness FME
  OpenFeatureProvider <--> HarnessFME

  %% Styling for cloud
  classDef cloudStyle fill:#A4E5A4,stroke:#2E8B57,stroke-width:2px,shape:cloud
```

<br />

The <Tooltip id="fme.openfeature.provider">OpenFeature Provider</Tooltip> acts as a connector between the SDK and the Harness Feature Management & Experimentation (FME) service, translating evaluation requests and returning flag values. The provider and the Harness FME service communicate continuously, ensuring that flag configurations and state changes are kept up to date.

## Use OpenFeature SDKs

Harness FME offers official OpenFeature providers for the following SDKs. 

import { Section, openfeatureSDKs } from '@site/src/components/Docs/data/fmeOpenfeature';

<Section items={openfeatureSDKs} />

You can use these providers instead of the Harness FME SDK in your application.