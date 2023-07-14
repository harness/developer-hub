---
title: Overrides V2
description: Manage service, environment, and infrastructure overrides.
sidebar_position: 300
---

:::info

Currently, this feature beta and is behind the feature flag, `CDS_SERVICE_OVERRIDES_2_0`. Contact [Harness Support](mailto:support@harness.io) to enable the feature.

:::  

Harness has introduced an enhanced experience for service, environment, and infrastructure overrides in Continuous Delivery (CD). A new panel, **Overrides** is added in the **Deployments** section where you can override services, environments, and infrastructures.

Overrides can defined at project, organization, and account levels.

```
identifier: service_override_v2
name: Service Override V2 Enabled
category: CD
defaultValue: false
valueType: BOOLEAN
allowOverrides: true
allowedScopes:
  - ACCOUNT
  - ORGANIZATION
  - PROJECT
```

When you create a new project or organization within an account, enable the account resource setting, **Enable Service Override V2** under **Account Settings > Account Resources > Continuous Deployment**.

![overridesV2](./static/overrides-v2.png)

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