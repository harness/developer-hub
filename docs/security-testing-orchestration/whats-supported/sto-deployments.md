---
title: Harness STO Deployment Options & Supported Features 
description: Supported STO deployments 
sidebar_label: Deployment options
sidebar_position: 01
redirect_from:
  - /docs/security-testing-orchestration/whats-supported
---

This document outlines the supported capabilities in Harness STO, including integrations, features, and infrastructure. The supported details are categorized based on deployment type:

1. [Harness SaaS](#harness-saas)
2. [Harness Self-Managed Enterprise Edition (SMP)](#harness-self-managed-enterprise-edition-smp)
3. [Harness SMP in Offline Environments](#harness-smp-in-offline-environments)

## Harness SaaS

- Harness SaaS fully supports all scanner integrations listed in the [Supported Scanners](/docs/security-testing-orchestration/whats-supported/scanners) documentation.
- STO leverages continuous integration (CI) build infrastructures to manage scans and process identified issues.  The [Infrastructure](/docs/security-testing-orchestration/whats-supported/infrastructure) document lists the infrastructure types STO supports. 
- Harness SaaS includes all the features outlined in the [Harness STO Features](/docs/security-testing-orchestration/whats-supported/features) documentation. 

## Harness Self-Managed Enterprise Edition (SMP)

All [STO features](/docs/security-testing-orchestration/whats-supported/features) supported in [Harness SaaS](#harness-saas) are also supported in Self-Managed Enterprise Edition with the following exceptions:
- Harness AI
- [Custom Dashboards](/docs/platform/dashboards/create-dashboards) is a licensed functionality on Self-Managed Enterprise Edition. Contact [Harness Support](mailto:support@harness.io) to obtain the license.
- You cannot run SaaS-based scans if there is no connectivity between Harness and the external SaaS environment.

## Harness SMP in offline environments

If you're running Harness Self-Managed Enterprise Edition in an offline environment, note the following:

- SaaS-based scanners require network connectivity between Harness and the scanner’s external SaaS environment to function. In an offline environment, SaaS-based scans cannot be executed.

- All STO scanners are supported in both Harness SaaS and Self-Managed Enterprise Edition. Harness regularly updates the container images it uses to run STO scans. If you're running STO in an offline environment, Harness recommends that you download your STO images regularly to ensure that your scanners are up-to-date. For more information, go to  [Configure your pipeline to use STO images from private registry](/docs/security-testing-orchestration/use-sto/set-up-sto-pipelines/configure-pipeline-to-use-sto-images-from-private-registry).
