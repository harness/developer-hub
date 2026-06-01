---
title: Client-side SDK Suites
description: Learn about Harness FME client-side SDK Suites.
---

import { Section, clientSideSuites } from '@site/src/components/Docs/data/fmeSDKSData';

Harness FME provides client-side SDK suites which bundle core Harness FME functionality with additional utilities, integrations, and framework-specific enhancements.  

They provide a faster path to production by packaging pre-built configurations, dependency integrations, and performance optimizations for your chosen tech stack.

## Certificate pinning

If your application uses certificate pinning with streaming-enabled Harness FME SDK suites, you may need to update your certificate pinning configuration to support streaming infrastructure migrations and future SDK capabilities. Applications using strict certificate pinning may reject updated streaming infrastructure endpoints unless the required certificate hashes are trusted. 

This only applies if:

- [Streaming mode](/docs/feature-management-experimentation/sdks-and-infrastructure#streaming-versus-polling) is enabled
- Certificate pinning is configured for `streaming.split.io`

Harness recommends validating certificate pinning behavior in staging environments before production rollout and ensuring all application releases containing updated pins are fully deployed before removing older pins.

For required certificate hashes and configuration examples, see the [Certificate Pinning Migration Guide](/docs/feature-management-experimentation/sdks-and-infrastructure/examples/certificate-pinning-migration).

## Get started

Choose a suite to enable feature flagging and experimentation in your frontend application.

<Section items={clientSideSuites} />