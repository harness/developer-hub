---
title: Security Testing Orchestration
description: Provides an overview of new features and fixed issues.
date: 2022-10-31T10:00
tags: [NextGen, "security testing orchestration"]
sidebar_position: 8
---

Harness Security Testing Orchestration is updated regularly in Harness SaaS. Review the notes below for details about recent changes.

:::note
Harness deploys updates progressively to different Harness SaaS clusters. You can identify the cluster hosting your account in your Account Overview page. The features and fixes in the release notes may not be available in your cluster immediately.

Additionally, the release notes below are only for NextGen SaaS. FirstGen SaaS release notes are available [here](/docs/first-gen/firstgen-release-notes/harness-saa-s-release-notes) and Self-Managed Enterprise Edition release notes are available [here](/release-notes/self-managed-enterprise-edition).
:::

## October 31, 2022

### What's New

- New output variables – This release includes a new set of output variables you can use to determine the next stage of your pipeline. These variables show the number of new issues detected in the current scan compared to the last scan. If this is the first scan for the target, these variables reflect new issues compared to the baseline. You can use these variables to determine the next stage of your pipeline:
  - NEW_CRITICAL
  - NEW_HIGH
  - NEW_MEDIUM
  - NEW_LOW
  - NEW_UNASSIGNED (Reserved for future use)
  - NEW_TOTAL (STO-4866)
- STO Overview – The STO Overview provides a single, interactive view of all baseline issues detected by all scans in your project. A time series chart shows the daily distribution of issues by severity over the past 30 or 90 days. A daily snapshot shows the sum of all baseline issues based on the latest scan of each baseline. You can also drill down into active, failed, and in-progress baseline scans. (STO-3629)
- STO scans on VMs using Docker delegates – You can now run builds with STO scans using Docker delegates running on Linux VMs in AWS and other cloud platforms. This extends the support for STO scans with Kubernetes delegates.
  For information about setting up a VM build infrastructure, see Set Up Build Infrastructure in the CI docs. (STO-4639)
- Two-step Exemption and Security Review – This release enhances support for a two-step process for requesting and approving security exemptions:
  - Developers can request (but not approve) exemptions to unblock pipeline builds for specific issues.
  - Only SecOps users can approve exemption requests and choose to mute or ignore specific issues. (STO-4479)
- AWS Security Hub – STO now supports scans in AWS Security Hub. (STO-4873)
- AWS ECR – STO now supports scans on AWS Elastic Container Registry (ECR). (STO-4969)

## August 2, 2022

### What's New

The STO module launches its first GA product with the following capabilities:

- Pipeline-Driven STO:
  - Standalone STO:
    - Provision to create standalone STO Stages and secure Pipelines (Ex: Pipelines initiated via Gitlab or Github).
  - Orchestrate scanners inside Harness CI Pipeline:
    - Run scanners as an additional stage or steps within a Harness CI Pipeline.
  - Orchestrate scanners inside Harness CD Pipeline:
    - Run scanners as an additional Stage or Steps within a Harness CD Pipeline.
- Developer-first Remediation: Security testing results normalized, deduplicated, and prioritized across all scanners.
- Dedicated Security Exemptions Section: Ability to grant and manage security exemptions by SecOps owners on identified vulnerabilities or issues during security testing. Exemptions can also be made in the STO Pipeline against specific issues.
- Custom Dashboards & Reports: Ability to create custom visualizations and reports based on attributes related to STO and secure pipeline creation (40+ attributes).
- OPA-based Governance Policies: Support for crafting governance policies for STO specific Pipelines and workflows.
- Platform Integration: Audit trails and other Enterprise Platform features like RBAC, Notifications, Pipeline Config-as-Code
  - Default RBAC roles for STO Developer & STO SecOps Personas
  - Notification Channels:
    - Email, Slack, PagerDuty, Microsoft Teams
- Self-Managed Platform (On-premise software)
  - Helm Chart package with bundled Harness CI and CD modules

See Security Testing Orchestration Basics.

### Enhancements

N/A

### Fixed issues

N/A
