---
title: Fallback treatment
sidebar_position: 8
---

## Overview

Fallback treatments are returned by an FME SDK when your application requests a treatment for a feature flag but the SDK cannot determine the value through normal evaluation. 

:::danger
This behavior is defined in the SDK itself and is not configured through the Harness FME UI.
:::

Fallback treatments are applicable in the following scenarios:

- The SDK cannot connect to Harness services (for example, network failure or missing attributes)
- Your code explicitly provides a fallback treatment when calling `getTreatment` 

## How fallback treatments differ from control treatment

The [control treatment](/docs/feature-management-experimentation/feature-management/setup/control-treatment) is a reserved treatment in FME that the SDK returns in cases such as missing flag definitions, initialization is not compete, unsupported targeting rules, or unexpected exceptions.

The fallback treatment, on the other hand, is customizable. You choose what the SDK should return if evaluation cannot be completed (for example, `"off"` or `"old-version"`).

Harness recommends providing a fallback treatment when calling the SDK to ensure a predictable user experience if Harness is unavailable, and using low-risk values (like `"off"`) as fallbacks to reduce exposure risk.

import { Section, fallbackSDKs } from '@site/src/components/Docs/data/fmeSDKSFallback';

## Supported SDKs for fallback treatments

Select an SDK to configure fallback handling in your client application.

<Section items={fallbackSDKs} />