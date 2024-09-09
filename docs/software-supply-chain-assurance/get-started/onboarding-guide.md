---
title: SCS onboarding guide
description: A self-service onboarding guide for Harness SCS.
sidebar_position: 2
sidebar_label: Onboarding guide
redirect_from:
  - /docs/software-supply-chain-assurance/get-started/tutorials
---

This guide explains what you need to know to get started using [Harness SCS](./overview.md).

## Complete Harness Platform onboarding

If you're new to Harness, review the [Harness Platform onboarding guide](/docs/platform/get-started/onboarding-guide) and [Harness Platform key concepts](/docs/platform/get-started/key-concepts) before onboarding to SCS.

## Learn about Harness SCS concepts and features

Learn about the features, components, and key concepts of Harness SCS:

* [SCS overview](./overview.md)
* [SCS key concepts](./key-concepts.md)

## Use SCS

| **Feature** | **Works with Harness Code Repository** | **Works with Harness CI (using Harness Pipeline's Build Stage)**   | **Works with Harness CD (using Harness Pipeline's Deploy Stage)** | **Works with 3rd Party Code Repo/CI/CD (using Harness Pipeline's Security Stage)**  |
|--|--|--|--|--|
|[Repository Security Posture Management](/docs/software-supply-chain-assurance/repository-security-posture-management-rspm) | On Roadmap | No | No | Only GitHub, others are on Roadmap |
|CICD Security Posture Management | Yes | No | No | Only GitHub, others are on Roadmap |
|[Generate or ingest SBOM, followed by SBOM drift detection & SBOM scores](/docs/category/generate-or-ingest-sbom) | Y | Y | Y | Y |
|[Enforce OSS usage with SBOM governance policies](/docs/category/enforce-sbom-policies) | Y | Y | Y | Y |
|[Generate SLSA provenance](/docs/software-supply-chain-assurance/slsa/generate-slsa) | Y | Y | N | N |
|[Verify SLSA provenance with SLSA governance policies](/docs/software-supply-chain-assurance/slsa/verify-slsa) | Y | Y | Y | Y |
|[Create and manage Remediation Trackers](/docs/category/remediation-tracker) | On Roadmap | On Roadmap | Y with Live Tracking | Y without Live Tracking |

## Tutorials

Tutorials go into detail on specific use cases for SCS.

* [Automate SBOM drift detection for GitHub repositories](/docs/software-supply-chain-assurance/sbom/automate-sbom-drift-detection)
