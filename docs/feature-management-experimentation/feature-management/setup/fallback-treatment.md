---
title: Fallback treatment
sidebar_position: 8
description: Learn how to configure global and per-flag fallback treatments in Harness FME SDKs to ensure predictable feature flag evaluations when the SDK cannot determine a value.
---

## Overview

Fallback treatments are returned by an FME SDK when your application requests a treatment for a feature flag but the SDK cannot determine the value through normal evaluation. 

:::info
This behavior is defined in the SDK itself and is not configured through the Harness FME UI.
:::

Fallback treatments are applicable in the following scenarios:

- The SDK cannot connect to Harness services (for example, due to network failure or missing attributes)
- A feature flag or segment evaluation times out
- The flag evaluation cannot be fetched or cached locally
- The evaluation context is incomplete or invalid for targeting
- An unexpected error occurs during evaluation

## How fallback treatments differ from control treatment

The [control treatment](/docs/feature-management-experimentation/feature-management/setup/control-treatment) is a reserved treatment in FME that the SDK returns in cases such as missing flag definitions, initialization is not compete, unsupported targeting rules, or unexpected exceptions.

The fallback treatment, on the other hand, is customizable. You choose what the SDK should return if evaluation cannot be completed (for example, `"off"` or `"old-version"`).

Harness recommends providing a fallback treatment when calling the SDK to ensure a predictable user experience if Harness is unavailable, and using low-risk values (like `"off"`) as fallbacks to reduce exposure risk.

## Global vs. flag-level fallback treatments

Fallback treatments can be defined **globally** for the entire SDK or **per flag** for more granular control:

- **Global fallback**: Returned whenever any flag cannot be evaluated, unless a flag-level fallback is defined.
- **Flag-level fallback**: Overrides the global fallback for that specific flag, taking precedence when both are defined. This allows you to customize behavior for individual flags without affecting the global default.

For example:

```java
// Global fallback treatment

FallbackTreatmentsConfiguration fallbackTreatmentsConfiguration = new FallbackTreatmentsConfiguration(
    new FallbackTreatment("on-fallback", "{\"prop1\":\"val1\"}"),
    null
);

SplitClientConfig config = SplitClientConfig.builder()
    .fallbackTreatments(fallbackTreatmentsConfiguration)
    .build();

SplitFactory factory = SplitFactoryBuilder.build("YOUR_API_KEY", config);
SplitClient client = factory.client();

// Flag-level fallback treatment
// Overrides the global fallback for the specified flag
FallbackTreatmentsConfiguration flagFallbackConfig = new FallbackTreatmentsConfiguration(
    null,
    new HashMap<String, FallbackTreatment>() {{
        put("FEATURE_FLAG_NAME", new FallbackTreatment("off", "{\"prop2\":\"val2\"}"));
    }}
);

SplitClientConfig clientConfigWithFlagFallback = SplitClientConfig.builder()
    .fallbackTreatments(flagFallbackConfig)
    .build();

SplitFactory factoryWithFlagFallback = SplitFactoryBuilder.build("YOUR_API_KEY", clientConfigWithFlagFallback);
SplitClient clientWithFlagFallback = factoryWithFlagFallback.client();
```

import { Section, fallbackSDKs } from '@site/src/components/Docs/data/fmeSDKSFallback';

## Supported SDKs for fallback treatments

Select an SDK to configure fallback treatments for both client and server applications.

| Android | iOS | Browser | JavaScript | React | React Native |  Java   | Python | Ruby | .NET   | Node.js   | Go    |
| ------- | ----- | ----- | ----- | ----- | ------ | ------ | ------ | ------- | ------ | ----- | ----- |
| 5.4.1 | 3.4.0 | 1.6.0 | 11.8.0 | 2.6.0 | 1.5.0 | 4.18.0 | 10.5.1 | 8.9.0 | 7.12.0 | 11.8.0  | 6.9.0 |

<Section items={fallbackSDKs} />