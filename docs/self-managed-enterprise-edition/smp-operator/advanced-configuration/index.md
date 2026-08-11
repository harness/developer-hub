---
title: Advanced configuration
sidebar_label: Advanced Configuration
description: Tune pod security context and resource sizing for the Harness SMP Operator.
sidebar_position: 1
keywords:
  - advanced configuration
  - smp operator
  - pod security context
  - resource sizing
tags:
  - self-managed-enterprise-edition
  - smp-operator
---

This topic covers the security context and resource sizing settings for the Harness SMP Operator. The installer applies a default value for each of them, and you override the defaults through the same `override.yaml` file or `clustermgr` flags you use to install.

---

## Configuration topics

Each topic lists the default values the installer applies and shows how to override them with either Helm or clustermgr.

- [Pod security context](/docs/self-managed-enterprise-edition/smp-operator/advanced-configuration/pod-security-context): Change the user and group IDs the containers run as, if the defaults do not meet your organization's security policies.
- [Resource sizing](/docs/self-managed-enterprise-edition/smp-operator/advanced-configuration/resource-sizing): Review the default CPU and memory requests and limits, and resize them if there is a recommendation from the Harness SMP team.

---

## Related articles

- [CLI reference](/docs/self-managed-enterprise-edition/smp-operator/cli-reference): Installation parameters for the helm and clustermgr flows.
- [Installation](/docs/self-managed-enterprise-edition/smp-operator/install): Deploy the operator before you tune these settings.
- [Upgrade](/docs/self-managed-enterprise-edition/smp-operator/upgrade): Upgrade an existing SMP Operator installation.
