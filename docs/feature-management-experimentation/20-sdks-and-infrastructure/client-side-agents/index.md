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

import { Section, clientSideAgents } from '@site/src/components/Docs/data/fmeSDKSData';

## Get started

Select a client-side agent for your platform.

<Section items={clientSideAgents} />