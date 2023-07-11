---
title: Override services, infrastructures, and environments
description: Override services, environments, and infrastructures.
sidebar_position: 300
---

:::info

Currently, this feature is behind the feature flag, `CDS_SERVICE_OVERRIDES_2_0`. Contact [Harness Support](mailto:support@harness.io) to enable the feature.

:::  

In DevOps, it is common to have multiple environments, such as development, testing, staging, and production. Each environment might require different configurations or settings for the same service or infrastructure. For example, in the development environment, a service may need to use a local database for testing, while in the production environment, it should use a high-availability database cluster.

DevOps teams can override service and infrastructure settings for each environment.

Overrides can defined at project, organization, and account levels.

## Override global environments

1. In **Deployments**, select your project, and then select **Overrides**.
2. Select **Global Environment**, and then select **New Override**.
3. In **Environment**, select a project, organization, or account level environment.
4. In **Override Type**, select one of the following override type:  
   - Variable
   - Manifest
   - Config File
   - Application Settings
   - Connection Strings