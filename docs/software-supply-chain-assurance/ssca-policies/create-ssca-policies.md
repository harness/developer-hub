---
title: Create SSCA policies
description: Create SSCA policies in the Harness File Store.
sidebar_position: 10
---

With Harness SSCA, you can define and enforce policies governing the use of open-source components within your software artifacts. This policy management and enforcement capability helps you ensure compliance with your security, legal, and operational requirements.

You must create a [OPA policy](https://developer.harness.io/docs/continuous-delivery/x-platform-cd-features/advanced/cd-governance/harness-governance-overview/) set containing rules that you want Harness SSCA to enforce.  When you enforce SSCA policies in a Harness pipeline, the policy rules are evaluated against each component in the artifact's SBOM.

:::tip Tutorial

For an end-to-end walkthrough, try this tutorial: [Generate SBOM and enforce policies](/tutorials/secure-supply-chain/generate-sbom).

:::
