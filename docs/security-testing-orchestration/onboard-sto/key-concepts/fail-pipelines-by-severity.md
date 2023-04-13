---
title: Failing pipelines by severity in STO
description: Fail integrated pipelines based on the severity of detected issues
sidebar_position: 40
---

You can set up your pipelines to fail automatically if a scan step detects any issues with a specified [severity](./severities.md) or higher. This is good practice for all integrated pipelines because it ensures that the pipeline doesn't build and publish updates with serious vulnerabilities. 

## Basic workflow: Fail on Severity

```mdx-code-block
import StoConceptFailOnSeverity from '../../sto-techref-category/shared/step_palette/_sto-ref-ui-fail-on-severity.md';
```

<StoConceptFailOnSeverity  />

:::note
`fail_on_severity` is a "brute-force" approach to stopping your pipelines. As soon as a scan step detects a blocking issue, the pipeline stops and does not retain output variables or any other security-test data. For this reason, you might want to stop your pipelines using policies as described below. 
:::

## Advanced workflow: Use Policy as Code to stop pipelines and notify users

You can implement robust failure-handling mechanisms using [Harness Policy as Code](/docs/category/policy-as-code). Using policies to stop pipelines has the following advantages:

* You can define one set of policies based on your organization's requirements and then enforce these policies across all pipelines. This allows for centralized enforcement. 

* You can define advanced policies such as "The target can't have any critical or high-severity issues, or any medium-severity issues that aren't in the target's baseline."

* Because the pipeline fails after (not during) the scan, you can view the test results in detail after the pipeline fails. You can include the scan results in automatic email or Slack notifications when a target violates specific policies.

For an example workflow, go to [Stop pipelines automatically using governance policies](/docs/security-testing-orchestration/use-sto/stop-builds-based-on-scan-results/stop-pipelines-using-opa).