---
title: What's supported in Feature Management & Experimentation
description: Platforms and technologies supported by Harness FME
sidebar_label: What's supported
sidebar_position: 10
---

Harness Feature Flags support [client-side and server-side SDKs](/docs/feature-flags/use-ff/ff-sdks/sdk-overview/client-side-and-server-side-sdks.md) for a number of programming languages.

import Fme from '/docs/feature-management-experimentation/shared/fme-supported-platforms.md';

<Fme />

## Relay Proxy [todo: Localhost mode]
The [Relay Proxy](/docs/feature-flags/use-ff/relay-proxy/), which allows for offline and hybrid Feature Flags usage, is provided as a Docker image and can be used in any environment where the Docker image can be run. The Relay Proxy can be enhanced with Redis as a cache in environments where this is possible.

## Hybrid and offline usage

Harness Feature Flags allows for both completely offline usage as well as hybrid usage via the relay proxy. Hybrid usage can be in the form of:

- The application is online and only talks to the Relay Proxy, while the Relay Proxy has connectivity to Harness.
- The Relay Proxy is bundled with the application at build-time with a working configuration file, and neither the application nor the Relay Proxy have connectivity to Harness.

## Cloud limitations

There are no limitations for using Feature Flags in any cloud or non-cloud environment as long as the languages needed are supported with an SDK, and connectivity to either Harness or the Relay Proxy can be established.

For information about what's supported for other Harness modules and the Harness Platform overall, go to [Supported platforms and technologies](/docs/platform/platform-whats-supported.md).
