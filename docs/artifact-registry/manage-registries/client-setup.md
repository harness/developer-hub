---
title: Client Setup
description: Configure your client to pull and push artifact registries
sidebar_position: 30
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Harness Artifact Registry provides a secure, centralized way to manage artifacts for deployments. Before using artifacts, configure your environment with the Client Setup feature. 

:::tip create a registry
If you haven’t created a registry yet, see [create a registry](/docs/artifact-registry/manage-registries/create-registry).
:::

Client Setup simplifies authentication and ensures proper configuration for different artifact types (e.g., container images, Helm charts). It also helps prevent common misconfigurations when pulling or pushing artifacts.

## Client setup
1. Select **Registries**, then select a container register of type `ARTIFACT REGISTRY`, e.g. Docker or Maven.
2. Select **Set up client**.
3. Follow the on-screen instructions.

### Configuration steps
The Client Setup process provides step-by-step guidance, including:
- Logging in to the registry.
- Generating a password token.
- Pulling an image or package.
- Pushing an image or package.

Now, you should see the artifact appear in your docker registry as well as the **Artifacts** tab in the left navigation panel.