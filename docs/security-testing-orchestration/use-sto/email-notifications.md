---
title: Set up email notifications for detected issues
description: Set up your pipeline to send emails automatically when issues are detected.
sidebar_position: 210
---

This topic describes an example workflow for generating email notifications. This topic describes two separate methods for generating email notifications:

* Add an Email notification step that sends emails based a JEXL filter -- for example: "Send am email if any issues with MEDIUM severity or higher are found." 
* Add an OPA policy step that sends a notification and fails the pipeline if any issues with HIGH or CRITICAL severity are found. 

## Before you begin

* Set up your scan step in a Security stage or a CI Build stage. 

When you run a scan, the step generates a set of of output variables that capture the number of issues detected at each severity level: CRITICAL, HIGH, MEDIUM, and so on. In the next steps, you will add steps to send emails and fail the pipeline based on these variables. 

## Generate notifications using output variables

1. Add a **Custom** stage to your pipeline after the stage that runs the scan.

2. Add an Email step to the stage and configure it as follows. Replace SCAN_STAGE_ID, SCAN_STEP_ID, and ACCOUNT_ID with your stage, step, and account IDs. 

```yaml
  - step:
      type: Email
      name: emailOnDetectedIssues
      identifier: emailOnDetectedIssues
      spec:
        to: douglas.bothwell@harness.io
        cc: ""
        subject: "STO ALERT: Scan results for <+pipeline.name>"
        body: |- 
             "STO scan of <+pipeline.name> found the following issues:  
             Critical : <+pipeline.stages.SCAN_STAGE_ID.spec.execution.steps.SCAN_STEP_ID.output.outputVariables.CRITICAL> 
             New Critical : <+pipeline.stages.SCAN_STAGE_ID.spec.execution.steps.SCAN_STEP_ID.output.outputVariables.NEW_CRITICAL> 
             High: <+pipeline.stages.SCAN_STAGE_ID.spec.execution.steps.SCAN_STEP_ID.output.outputVariables.HIGH> 
             New High: <+pipeline.stages.SCAN_STAGE_ID.spec.execution.steps.SCAN_STEP_ID.output.outputVariables.NEW_HIGH> 
             Medium: <+pipeline.stages.SCAN_STAGE_ID.spec.execution.steps.SCAN_STEP_ID.output.outputVariables.MEDIUM> 
             New Medium: <+pipeline.stages.SCAN_STAGE_ID.spec.execution.steps.SCAN_STEP_ID.output.outputVariables.NEW_MEDIUM>  
             See https://app.harness.io/ng/#/account/ACCOUNT_ID/sto/orgs/default/"
      timeout: 1d
```
For more information about pipeline and other variables, go to [Built-in and Custom Harness Variables Reference](/docs/platform/Variables-and-Expressions/harness-variables).

