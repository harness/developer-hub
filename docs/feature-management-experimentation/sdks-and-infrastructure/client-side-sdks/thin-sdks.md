---
title: Client-side Thin SDKs
description: Learn about Harness FME client-side thin SDKs and remote evaluation.
---

Harness FME provides client-side SDKs that let you evaluate feature flags, run experiments, and deliver personalized experiences directly in your application's frontend.

Thin SDKs delegate flag evaluation to the **Remote Evaluator** in FME cloud rather than computing treatments locally. Rollout rules stay in the cloud, and the SDK sends the target to FME cloud each time it fetches an evaluation. Use a thin SDK when keeping rollout rules off the client is the deciding factor.

If you have not chosen between local and remote evaluation yet, see [Choosing an evaluation mode](/docs/feature-management-experimentation/sdks-and-infrastructure/client-side-sdks/evaluation-modes).

import { Section, clientSideThinSDKs } from '@site/src/components/Docs/data/fmeSDKSData';

## Get started

Select a platform to start integrating an FME thin SDK into your client application.

<Section items={clientSideThinSDKs} />
