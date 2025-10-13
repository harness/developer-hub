---
title: Security Context Configuration
description: Configure security contexts for Harness services to enhance container security and compliance
sidebar_position: 3
tags:
  - security
  - containers
  - helm
  - configuration
  - security-context
keywords:
  - security context
  - container security
  - runAsUser
  - runAsNonRoot
  - read-only filesystem
  - capabilities
  - helm charts
  - security hardening
---

:::tip Feature availability
  This feature is available in Harness SMP 0.32.1 and later.
:::

Security contexts define privilege and access control settings for containers. This document covers the `readOnlyRootFilesystem` security context field. Additional security context configurations will be added as they become available.

### Why enable read-only root filesystems

Read-only root filesystems provide essential security hardening:

- **Prevent malware persistence**: Attackers cannot install backdoors or modify system binaries, limiting damage from successful breaches
- **Ensure deployment consistency**: Containers remain identical to their original image, eliminating configuration drift and unexpected behavior
- **Meet compliance requirements**: Satisfies regulatory frameworks like SOC 2 and PCI DSS that mandate immutable infrastructure controls
- **Block privilege escalation**: Prevents exploitation of vulnerabilities that rely on writing to system directories

The implementation automatically provisions writable volumes at `/tmp`, `/var/log`, and service-specific directories to maintain full functionality.

### Supported services

Read-only root filesystem configuration is supported for these Harness services:

* **Chaos module:**

  * `chaos-web`

* **Platform module:**

  * `audit-event-streaming`
  * `access-control`
  * `change-data-capture`
  * `debezium-service`
  * `gateway`
  * `log-service`
  * `ng-manager`
  * `ng-dashboard-aggregator`
  * `pipeline-service`
  * `platform-service`
  * `policy-mgmt`
  * `queue-service`
  * `scm-service`
  * `template-service`
  * `ng-auth-ui`
  * `harness-manager`
  * `next-gen-ui`

### Configuration methods

#### Individual service configuration

Enable read-only root filesystem for specific services using Helm overrides:

```yaml
<module_name>:
  <service_name>:
    securityContext:
      readOnlyRootFilesystem: true
```

Replace `<module_name>` with either `chaos` or `platform` depending on the service, and `<service_name>` with one of the services listed above.

Example for gateway service:

```yaml
platform:
  gateway:
    securityContext:
      readOnlyRootFilesystem: true
```

#### Complete configuration

To enable read-only root filesystems for all supported services, create an override file named `readonly-filesystem-override.yaml` and add the following configuration:

```yaml
# Enable read-only root filesystems for all supported Harness services
chaos:
  chaos-web:
    securityContext:
      readOnlyRootFilesystem: true

platform:
  access-control:
    securityContext:
      readOnlyRootFilesystem: true
  audit-event-streaming:
    securityContext:
      readOnlyRootFilesystem: true
  change-data-capture:
    securityContext:
      readOnlyRootFilesystem: true
  debezium-service:
    securityContext:
      readOnlyRootFilesystem: true
  gateway:
    securityContext:
      readOnlyRootFilesystem: true
  harness-manager:
    securityContext:
      readOnlyRootFilesystem: true
  log-service:
    securityContext:
      readOnlyRootFilesystem: true
  ng-auth-ui:
    securityContext:
      readOnlyRootFilesystem: true
  ng-dashboard-aggregator:
    securityContext:
      readOnlyRootFilesystem: true
  ng-manager:
    securityContext:
      readOnlyRootFilesystem: true
  next-gen-ui:
    securityContext:
      readOnlyRootFilesystem: true
  pipeline-service:
    securityContext:
      readOnlyRootFilesystem: true
  platform-service:
    securityContext:
      readOnlyRootFilesystem: true
  policy-mgmt:
    securityContext:
      readOnlyRootFilesystem: true
  queue-service:
    securityContext:
      readOnlyRootFilesystem: true
  scm-service:
    securityContext:
      readOnlyRootFilesystem: true
  template-service:
    securityContext:
      readOnlyRootFilesystem: true
```

## Implementation

Apply the read-only filesystem configuration during your Harness deployment:

```bash
helm upgrade <HARNESS_RELEASE_NAME> harness/harness-prod -n <HARNESS_NAMESPACE> \
  -f readonly-filesystem-override.yaml
```

This command upgrades your existing Harness installation with read-only root filesystem security enabled for all configured services.










