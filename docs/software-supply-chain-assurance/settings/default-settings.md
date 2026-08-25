---
title: Default Settings
description: Manage SCS Settings 
sidebar_position: 10

tags:
  - harness-scs 
  - settings  
---

Default settings for Harness SCS can be configured at the account, organization, or project level.
These settings ensure consistent behavior across all SCS steps and pipelines without requiring repetitive configuration.


### Use Base64 encoded secrets for attestation:

When enabled, all secrets fetched from external secret managers such as Vault must be provided in Base64 format. This ensures consistent handling and compatibility across different environments.

### Enable SCS airgap:

When enabled, Airgap mode allows Harness SCS to operate in closed or offline networks, ensuring that all SCS steps use local resources and internal registries instead of public endpoints.


<DocImage path={require('./static/default-settings.png')} width="100%" height="80%" title="Click to view full size image" />

:::note

The default settings for SCS can be viewed only in the SCS module.
:::

## Next steps

* [Manage SCS access control with RBAC](/docs/software-supply-chain-assurance/settings/rbac): Configure roles and permissions for SCS resources.
* [Configure image tags for SCS plugins](/docs/software-supply-chain-assurance/settings/configure-image-tags-for-scs-plugins): Pin plugin image versions for your pipelines.