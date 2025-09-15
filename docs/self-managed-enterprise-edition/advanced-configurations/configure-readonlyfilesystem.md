---
title: Configure read-only root filesystem
description: Configure read-only root filesystems for individual services to improve security and stability
sidebar_position: 3
tags:
  - security
  - filesystem
  - containers
  - helm
  - configuration
keywords:
  - read-only filesystem
  - root filesystem
  - container security
  - helm charts
  - writable volumes
  - security context
---

Read-only root filesystems strengthen container security by preventing unauthorized modifications to the root filesystem while maintaining full service functionality through dedicated writable volumes.

## Why Enable Read-Only Root Filesystems

Implementing read-only root filesystems provides critical benefits for enterprise environments:

- **Attack Surface Reduction**: Prevents attackers from modifying system files if they compromise a container
- **Operational Integrity**: Ensures consistent container behavior across deployments

The implementation automatically creates writable volumes for legitimate write operations (logs, temporary files, caches) at specific mount points like `/tmp` and `/var/log`.

## Supported Services

Read-only root filesystems are supported for these Harness services:

**Chaos Module:**
- `chaos-web`

* **Platform module**

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

## Configuration Methods

### Individual Service Configuration

Enable read-only root filesystem for specific services using Helm overrides:

```yaml
<module_name>:
  <service_name>:
    securityContext:
      readOnlyRootFilesystem: true
```

Replace `<module_name>` with either `chaos` or `platform` depending on the service, and `<service_name>` with one of the services listed above.

Example:

```yaml
platform:
  gateway:
    securityContext:
      readOnlyRootFilesystem: true
```

### Complete Configuration

To enable read-only root filesystems for all supported services, create an override file named `readonly-filesystem.yaml`:

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
  -f readonly-filesystem.yaml \
```
This command upgrades your existing Harness installation with read-only root filesystem security enabled for all configured services.








