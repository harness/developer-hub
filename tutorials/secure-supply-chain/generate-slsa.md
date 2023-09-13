---
sidebar_position: 2
description: Use SSCA module steps to generate and verify SLSA Provenance in Harness pipelines.
keywords: [SSCA]
title: Generate and verify SLSA Provenance
slug: /secure-supply-chain/generate-slsa
---

* Create public and private key
* Enable SLSA Provenance verification in Build stage settings.
* Configure OPA policies for provenance verification (optional?)
* Add SLSA Verification step to Deploy stage to verify the SLSA provenance (generate attestation).
* Run pipeline and view SLSA Provenance on Artifacts tab. Attestation is stored in the container registry. If the verification fails (based on OPA policies), select FAIL (or go to the Policy Evaluation tab) to inspect the results o the policy verification.