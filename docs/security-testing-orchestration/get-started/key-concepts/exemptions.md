---
title: Exemptions for specific issues
description: You can expempt specific issues from STO failure policies.
sidebar_label: Exemptions for specific issues
sidebar_position: 50
redirect_from:
  - /docs/security-testing-orchestration/onboard-sto/key-concepts/exemptions
---

You can set up an STO step to fail if a scan detects vulnerabilities that match the failure criteria specified for that step. You can also create exemptions for specific vulnerabilities to allow the pipeline to proceed even if they're detected.

 STO supports two methods for specifying failure criteria: 

   - [Fail on Severity](/docs/security-testing-orchestration/get-started/key-concepts/fail-pipelines-by-severity) Every scan step has a Fail on Severity setting that fails the step if the scan detects any issues with the specified severity or higher. 

   - [OPA policies](/docs/security-testing-orchestration/policies/create-opa-policies) You can use Harness Policy as Code to write and enforce policies based on severity, reference ID, title, CVE age, STO output variables, and number of occurrences.

For a full workflow description, go to [Exemptions to override STO failure policies](/docs/security-testing-orchestration/exemptions/exemption-workflows).