---
title: Generate automated emails for detected issues in STO
description: Send emails automatically based on severity levels
sidebar_label: Set up email notifications
sidebar_position: 20
---

When you run a scan, the security step generates a set of [output variables](/docs/security-testing-orchestration/get-started/key-concepts/output-variables) that capture the number of issues detected at each severity level: CRITICAL, HIGH, MEDIUM, and so on. This topic describes how to set up automatic notifications based on these variables. 

In this workflow, you add an Email step that sends a notification whenever the previous scan step finishes successfully. 

1. Add a **Custom** stage to your pipeline immediately after the Build or Security stage that runs the scan.

2. Add an **Email** step to the stage and configure it as follows. Replace `SCAN_STAGE_ID`, `SCAN_STEP_ID`, and `ACCOUNT_ID` with your stage, step, and account IDs. 

```yaml
  - step:
      type: Email
      name: emailOnDetectedIssues
      identifier: emailOnDetectedIssues
      spec:
        to: your.email@your-org.org
        cc: devs@your-org.org
        subject: "STO ALERT: Scan results for <+pipeline.name>"
        body: |- 
             "STO scan of <+pipeline.name> found the following issues:  <br>
             Critical : <+pipeline.stages.SCAN_STAGE_ID.spec.execution.steps.SCAN_STEP_ID.output.outputVariables.CRITICAL> <br>
             New Critical : <+pipeline.stages.SCAN_STAGE_ID.spec.execution.steps.SCAN_STEP_ID.output.outputVariables.NEW_CRITICAL> <br>
             High: <+pipeline.stages.SCAN_STAGE_ID.spec.execution.steps.SCAN_STEP_ID.output.outputVariables.HIGH> <br>
             New High: <+pipeline.stages.SCAN_STAGE_ID.spec.execution.steps.SCAN_STEP_ID.output.outputVariables.NEW_HIGH> <br>
             Medium: <+pipeline.stages.SCAN_STAGE_ID.spec.execution.steps.SCAN_STEP_ID.output.outputVariables.MEDIUM> <br>
             New Medium: <+pipeline.stages.SCAN_STAGE_ID.spec.execution.steps.SCAN_STEP_ID.output.outputVariables.NEW_MEDIUM> <br> 
             See https://app.harness.io/ng/#/account/MY_ACCOUNT_ID/sto/orgs/default/"
      timeout: 1d
```

Now, when the stage with the scan step finishes successfully, the pipeline sends an email like this:

```
"STO scan of sto-notify-test-pipeline found the following issues:
Critical : 0
New Critical : 1
High: 0
New High: 2
Medium: 0
New Medium: 1
See https://app.harness.io/ng/#/account/MY_ACCOUNT_ID/sto/orgs/default/"
```

For more information about pipeline variables and other variables, go to [Built-in and Custom Harness Variables Reference](/docs/platform/Variables-and-Expressions/harness-variables).