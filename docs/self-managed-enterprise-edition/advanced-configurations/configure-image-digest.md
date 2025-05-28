---
title: Configure Image Digest
description: Learn how to configure Image Digest for Harness Self-Managed Enterprise Edition installations.
sidebar_position: 4
---

:::note NOTE:
    This feature is available from Harness Helm Chart version 0.27.0
    By default, Harness Helm Chart uses image tags for all services. 
    If an image digest is not available, the system automatically falls back to using image tags.
:::

This topic describes how to configure Harness services to use image digests instead of tags for container images.

### Overview

Container image digests are cryptographic hashes of an image's content, providing an immutable identifier for a specific version of an image. Unlike tags which can be moved or overwritten, digests ensure you're always deploying the exact same image content.

### Configure Image Digest for all services

You can enable image digest for all services using the global override of helm chart.

```yaml
global:
  preferDigest: true
```

### Important Note

This feature will only work if default registry used is same as in helm charts. Mismatched digests will cause pull failures when `preferDigest: true` is enabled.