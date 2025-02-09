---
title: SDKs
sidebar_label: SDKs
sidebar_position: 1
helpdocs_is_private: false
helpdocs_is_published: true
---

import SDKDataFlowImage from './SDKDataFlowImage.js';

FME SDKs are central to FME. Using Harness FME means using FME SDKs.

<SDKDataFlowImage />

Running in your app, the FME SDK client pulls your [rollout plans](docs/feature-management-experimentation/10-getting-started/docs/key-concepts/fme-definitions.md) (feature flags and targeting rules) from Harness servers and stores this data. This locally cached data ensures your feature flag evaluations execute instantly, in under 5 ms. At regular configurable intervals, the SDK sends feature flag [performance and behavioral data](docs/feature-management-experimentation/10-getting-started/docs/key-concepts/fme-definitions.md) to Harness for analytics, to power your team's feature monitoring and experimentation.

Use the left sidebar to navigate to the FME SDK tailored to your coding language and tech stack.

For a quick overview of the features supported by each SDK go to [Supported features](/docs/feature-management-experimentation/getting-started/whats-supported#fme-sdk-supported-features). You will find a detailed matrix with embedded links.