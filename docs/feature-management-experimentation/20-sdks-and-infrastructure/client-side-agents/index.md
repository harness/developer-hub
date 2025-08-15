---
title: Client-side Agents
description: Learn about Harness FME client-side agents.
---

## Overview

Harness FME provides client-side agents which act as intermediaries between your application and the Harness FME service.

They handle streaming updates, caching, and advanced delivery logic so your application stays responsive and always serves the latest feature configurations.

Use a client-side agent when:

- You need to manage multiple SDK connections in one place
- You want to minimize network traffic to the FME service
- You require offline evaluation for certain use cases

## Get started

Select an agent for your platform.

| **SDK** | **API Key/Type** | **Links** |
| --- | --- | --- | 
| Android | client-side | [Docs](/docs/feature-management-experimentation/sdks-and-infrastructure/client-side-agents/android-rum-agent), [GitHub](https://github.com/splitio/android-rum-agent-examples) | 
| Browser | client-side | [Docs](/docs/feature-management-experimentation/sdks-and-infrastructure/client-side-agents/browser-rum-agent), [GitHub](https://github.com/splitio/browser-rum-agent-examples) |
| iOS | client-side | [Docs](/docs/feature-management-experimentation/sdks-and-infrastructure/client-side-agents/ios-rum-agent), [GitHub](https://github.com/splitio/ios-rum) | 