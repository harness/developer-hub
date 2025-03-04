---
title: Issue Exemption Workflow
description: Issue exemptions flow for requesting and approving.
sidebar_label: Issue exemption workflow
sidebar_position: 59
redirect_from: 
---

STO’s exemption workflows help developers [raise exemption](/docs/security-testing-orchestration/exemptions/exemption-workflows#request-an-sto-exemption) windows with product security teams for shipping software with vulnerabilities. Developers can request exemptions for specific vulnerabilities to allow their build pipelines to proceed even if these vulnerabilities are detected.

:::note 
[Security Testing Developers](/docs/security-testing-orchestration/get-started/onboarding-guide#add-security-testing-roles) and [Security Testing SecOps](/docs/security-testing-orchestration/get-started/onboarding-guide#add-security-testing-roles) users can request exemptions, but only Security Testing SecOps users can approve them.
::: 

<DocImage path={require('./static/issue-exemption-workflow.png')} width="100%" height="100%" title="Click to view full size image" />

Users with roles *Security Testing Developer* and *Security Testing SecOps* can raise exemptions. Only Security Testing SecOps users can [review, approve, reject,](#review-an-sto-exemption) and [update](#good-practice-review-and-update-sto-exemptions-periodically) exemptions. Refer to [Request Issue Exemptions](./exemption-workflows) and [Manage Issue Exemptions](./manage-exemptions) documentation for further details.

## When exemptions are useful

Here are some reasons wny your organization might want to exempt an issue:

- Your organization has practices in place to mitigate the security risks of the issue.
- The issue is in compliance with your organization's acceptable use policies.
- The security risk is low and remediation would require too much effort or expense.
- The scanner detects an issue but it is, in fact, a false positive.
- You need to exempt an issue so you can deploy a hotfix. In this case, you can request a temporary exemption that expires within your organization's SLA for fixing security issues.
- There are currently no known fixes or remediation steps available for the detected vulnerability. You might want to enable [Harness AI Development Assistant (AIDA™)](/docs/security-testing-orchestration/remediations/ai-based-remediations) to help you remediate your issues using AI.


import request_exemption from '../use-sto/static/request-exemption.png'
import open_exemption_details from '../use-sto/static/open-exemption-details.png'
import baseline_not_defined from '../use-sto/static/exemption-workflows-no-baseline-defined.png'

## What happens when an STO exemption gets approved

To see the list of pending exemptions, select **Exemptions** in the left menu. Each exemption corresponds to one vulnerability. If a scan detects a vulnerability with an active exemption, the pipeline proceeds even if the vulnerability matches the failure criteria for the step.

<!-- ## Important notes for exemptions in STO

This topic assumes that you have the following:

* An STO pipeline as described in [Set up Harness for STO](../get-started/onboarding-guide.md).
* The scan step has failure criteria specified.

  STO supports two methods for specifying failure criteria: 

   - [Fail on Severity](/docs/security-testing-orchestration/get-started/key-concepts/fail-pipelines-by-severity)  Every scan step has a Fail on Severity setting that fails the step if the scan detects any issues with the specified severity or higher. 

   - [OPA policies](/docs/security-testing-orchestration/policies/create-opa-policies) You can use Harness Policy as Code to write and enforce policies based on severity, reference ID, title, CVE age, STO output variables, and number of occurrences.

* At least one successful build with a set of detected security issues. 
* Security Testing Developer or [Security Testing SecOps](/docs/security-testing-orchestration/get-started/onboarding-guide#add-security-testing-roles)  user permissions are required to [request exemptions](#request-an-sto-exemption).
* Only Security Testing SecOps users can [review, approve, reject,](#review-an-sto-exemption) and [update](#good-practice-review-and-update-sto-exemptions-periodically) exemptions.   -->
