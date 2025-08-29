---
title: Server-side SDKs
---

## Overview

Harness FME provides server-side SDKs that let you evaluate feature flags, run experiments, and control rollouts from your backend services.  

These SDKs are designed for high-throughput, low-latency environments where feature logic must run securely and reliably without exposing rules or targeting logic to the client.

By integrating a server-side SDK, you can:

- Evaluate targeting rules securely on the server
- Maintain consistent behavior across multiple environments
- Implement feature rollouts without redeploying backend code
- Collect event data for experiment analysis

import { Section, serverSideSDKs } from '@site/src/components/Docs/data/fmeSDKSData';

## Get started

Select a backend language or framework to begin.

<Section items={serverSideSDKs} />