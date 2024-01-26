---
title: Fail on Severity threshold to fail STO pipelines based on the severity of detected issues
description: Fail the pipeline if any issue meets or exceeds the specified severity.
sidebar_position: 40
sidebar_label: Fail pipelines by severity
redirect_from:
  - /docs/security-testing-orchestration/onboard-sto/key-concepts/fail-pipelines-by-severity
---

You can set up your pipelines to fail automatically if a scan step detects any issues with a specified [severity](./severities.md) or higher. This is good practice for all integrated pipelines because it ensures that the pipeline doesn't build and publish updates with serious vulnerabilities. 

## Basic workflow to fail pipelines by severity in STO


import StoConceptFailOnSeverity from '../../sto-techref-category/shared/step_palette/_sto-ref-ui-fail-on-severity.md';


<StoConceptFailOnSeverity  />


## Use Policy as Code to fail pipelines and notify users in STO

You can implement failure-handling mechanisms using [Harness Policy as Code](/docs/category/policy-as-code). Using policies to stop pipelines has the following advantages:

* You can define one set of policies based on your organization's requirements and then enforce these policies across all pipelines. This allows for centralized enforcement. 

* You can define advanced policies such as "The target can't have any critical or high-severity issues, or any medium-severity issues that aren't in the target's baseline."

* Because the pipeline fails after (not during) the scan, you can view the test results in detail after the pipeline fails. You can include the scan results in automatic email or Slack notifications when a target violates specific policies.

For an example workflow, go to [Stop pipelines automatically using governance policies](/docs/security-testing-orchestration/use-sto/stop-builds-based-on-scan-results/stop-pipelines-using-opa).