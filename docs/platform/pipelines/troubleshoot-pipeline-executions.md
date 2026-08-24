---
title: Troubleshoot pipeline executions
description: Diagnose and resolve common issues with Harness pipeline executions, including queued pipelines, delegate failures, trigger problems, and connector errors.
sidebar_label: Troubleshoot pipelines
sidebar_position: 45
keywords:
  - pipeline troubleshooting
  - pipeline execution failed
  - pipeline stuck
  - delegate error
  - pipeline queued
  - connector error
  - pipeline trigger not working
tags:
  - pipelines
  - troubleshooting
---

This topic covers common issues you may encounter when creating, running, or managing Harness pipelines, and how to resolve them.

---

## Execution and status

<Troubleshoot
  issue="Pipeline execution is stuck in Queued status"
  mode="docs"
  fallback="Check your account's concurrent execution limit under Account Settings > Default Settings > Pipeline. If no delegates are running, the execution queues indefinitely. Go to Project Settings > Delegates to verify delegate health, or install a delegate if none exist."
/>

<Troubleshoot
  issue="Pipeline execution is stuck in Running status but the Overview page shows it as active while the execution history shows it completed"
  mode="docs"
  fallback="This can occur when the DEBEZIUM_ENABLED feature flag is not enabled for your account. Contact Harness Support at support@harness.io to enable this feature flag."
/>

<Troubleshoot
  issue="Pipeline execution status shows Waiting for Approval but no approval notification was received"
  mode="docs"
  fallback="Check the notification settings on the Approval step. Verify the notification channel (Slack, email, or PagerDuty) is configured correctly and that the user group or email addresses in the approval configuration are correct. Also confirm the connector used for notifications is healthy under Project Settings > Connectors."
/>

<Troubleshoot
  issue="Pipeline stage is skipped unexpectedly"
  mode="docs"
  fallback="Check the conditional execution settings on the stage. A 'when' condition that evaluates to false causes the stage to be skipped. Go to the stage's Advanced tab and review the conditional execution expression. Also confirm the previous stage's status matches the condition."
/>

<Troubleshoot
  issue="Pipeline execution expired before completing"
  mode="docs"
  fallback="The pipeline or a stage hit its timeout limit. Go to the stage or pipeline's Advanced tab and increase the timeout value. For long-running steps, increase the step-level timeout under the step's Advanced settings. Default pipeline timeout is 24 hours."
/>

<Troubleshoot
  issue="Abort pipeline is not stopping execution immediately"
  mode="docs"
  fallback="When you abort a pipeline, Harness finishes the currently running task on the delegate before stopping execution. This is by design to avoid leaving infrastructure in an inconsistent state. The abort takes effect after the current task completes."
/>

<Troubleshoot
  issue="Pipeline name appears differently in Pipeline Studio compared to the Pipeline Listing page"
  mode="docs"
  fallback="Pipeline Studio displays values from the YAML file in your Git branch, while the Pipeline Listing page pulls from the Harness database, which reflects the last update made via the UI or API. This discrepancy occurs when the YAML in Git has been edited directly without syncing to Harness. Reconcile by opening the pipeline in Pipeline Studio and saving it to update the Harness database."
/>

---

## Delegates and connectors

<Troubleshoot
  issue="Shell Script step fails with 'No delegates could perform the required capabilities'"
  mode="docs"
  fallback="Ensure a Harness Delegate is installed and connected to your project. Go to Project Settings > Delegates to verify delegate health and capability tags. If the step requires a specific delegate, check the delegate selector on the step's Advanced tab. For pipelines using Harness Cloud, use a CI Build stage instead of a Custom stage with Shell Script."
/>

<Troubleshoot
  issue="Connector error causing pipeline failure"
  mode="docs"
  fallback="Connectors are often tied to a secret (password or SSH key) that has expired. Check the connector configuration under Project Settings > Connectors and verify the credentials are not expired. You can run a connection test from the connector settings to confirm connectivity."
/>

<Troubleshoot
  issue="VAULT operation error: Decryption failed after 3 retries for secret"
  mode="docs"
  fallback="This error indicates the delegate cannot reach the Vault instance. Verify that the delegate is running and healthy under Project Settings > Delegates. Log in to the delegate host and manually curl the Vault URL to confirm network connectivity. Also confirm the Vault token has not expired."
/>

<Troubleshoot
  issue="Cannot resume pipeline after a delegate was upgraded or restarted"
  mode="docs"
  fallback="Harness caches connected delegates and refreshes every 3 minutes. After a delegate restart, wait up to 3 minutes for the new delegate to become eligible for tasks. If the pipeline cannot resume, it may need to be re-run. To avoid this, ensure your delegate YAML includes a minReadySeconds field so old pods are not terminated before the new pod is ready."
/>

<Troubleshoot
  issue="Pipeline always picks the wrong delegate"
  mode="docs"
  fallback="Use delegate selectors on the step, stage, or pipeline level to target a specific delegate or delegate group. Go to the step or stage Advanced tab and add a delegate selector matching the tags on the intended delegate."
/>

---

## Triggers and reconciliation

<Troubleshoot
  issue="Pipeline trigger is not firing when a Git event occurs"
  mode="docs"
  fallback="Verify the trigger is enabled on the Triggers page (the Enabled toggle must be on). Confirm the webhook is registered with your Git provider and the payload URL matches the trigger's webhook URL. Also check that the trigger's branch filter and event type match the actual Git event. Check the trigger activity log for delivery errors."
/>

<Troubleshoot
  issue="Automated pipeline triggers are not working after a template or entity change"
  mode="docs"
  fallback="Automated triggers do not run when a pipeline requires reconciliation. Open the pipeline in Pipeline Studio and reconcile all referenced entities before the trigger will fire again. Go to the pipeline options menu and select Reconcile to start the process."
/>

<Troubleshoot
  issue="Trigger curl request returns a 400 or 401 error"
  mode="docs"
  fallback="A 400 error usually means the payload format is incorrect for the trigger type. Verify the payload matches the schema expected by a Custom webhook trigger. A 401 error means authentication failed. Confirm the API key or token used in the Authorization header is valid and has Execute Pipeline permissions."
/>

<Troubleshoot
  issue="Pipeline trigger apiUrl returns an error immediately after the trigger fires"
  mode="docs"
  fallback="The trigger apiUrl only returns a successful response after pipeline execution begins, not when the trigger fires. There is a delay while Harness loads the pipeline YAML and referenced templates, especially for Git-stored pipelines. Use a polling approach: wait 10 seconds, call the API, and retry every 10 seconds until execution starts."
/>

<Troubleshoot
  issue="Some of the entities referenced in this pipeline have gone out of sync"
  mode="docs"
  fallback="This error appears when a referenced entity (template, environment, or service) was updated outside Pipeline Studio. Open the pipeline in Pipeline Studio and select Reconcile from the pipeline options menu. Reconcile the out-of-sync entities and save the pipeline."
/>

---

## Access and permissions

<Troubleshoot
  issue="Error: You are missing the following permission: Create / Edit Pipelines"
  mode="docs"
  fallback="You need the Pipeline: Create/Edit permission assigned through a role in your Harness project or organization. Ask your Harness administrator to assign a role with this permission to your user account via Project Settings > Access Control."
/>

<Troubleshoot
  issue="Pipeline option is not visible in the left navigation"
  mode="docs"
  fallback="Make sure you are at the project scope, not the account or organization scope. Select your project from the top navigation bar. If Pipelines is still not visible, confirm that at least one Harness module is enabled for the project under Project Settings > Modules."
/>

<Troubleshoot
  issue="Cannot delete a pipeline when the delete option is missing or returns an error"
  mode="docs"
  fallback="You need the Pipeline: Delete permission to remove a pipeline. If you have the permission but still cannot delete, your account may need Force Delete enabled. Go to Account Resources > Default Settings > General and enable Force Delete of Harness Resources. Disable this setting after deleting the pipeline."
/>

---

## YAML and templates

<Troubleshoot
  issue="Pipeline YAML validation fails with 'incoming YAML document exceeds the limit'"
  mode="docs"
  fallback="The pipeline YAML has exceeded the 3 MB (3,145,728 code points) size limit. Reduce the YAML by extracting large inline scripts into the Harness File Store or a Git repository, replacing inline templates with referenced templates, or splitting the pipeline into chained pipelines."
/>

<Troubleshoot
  issue="Pipeline template reconciliation prompt appears every time I open the pipeline"
  mode="docs"
  fallback="This typically happens when a referenced template has been updated or when there are significant changes to runtime inputs in the template. Open the pipeline, review the reconciliation diff, accept the changes, and save. If the prompt reappears immediately, check whether the template has unstable or constantly changing runtime inputs."
/>

<Troubleshoot
  issue="YAML editor changes are not reflected in the visual editor"
  mode="docs"
  fallback="Use the Visual / YAML toggle at the top of Pipeline Studio to switch between editors. Both editors stay in sync when you toggle between them. If changes appear lost, confirm you clicked Apply in the YAML editor before switching. Unsaved changes in the YAML editor are not persisted until you save the pipeline."
/>

---

## Next steps

- <a href="/docs/platform/pipeline-faq" target="_blank" rel="noopener noreferrer">Pipeline FAQs</a>: Browse common questions about pipeline configuration, triggers, templates, and API usage.
- <a href="/docs/platform/pipelines/failure-handling/define-a-failure-strategy-on-stages-and-steps" target="_blank" rel="noopener noreferrer">Define failure strategies</a>: Configure automatic recovery actions for stage and step failures.
- <a href="/docs/platform/delegates/install-delegates/overview" target="_blank" rel="noopener noreferrer">Install a delegate</a>: Set up a Harness Delegate to resolve delegate-related execution failures.
- <a href="/docs/platform/pipelines/executions-and-logs/view-and-compare-pipeline-executions" target="_blank" rel="noopener noreferrer">View and compare pipeline executions</a>: Navigate execution history and compare runs to diagnose recurring issues.
