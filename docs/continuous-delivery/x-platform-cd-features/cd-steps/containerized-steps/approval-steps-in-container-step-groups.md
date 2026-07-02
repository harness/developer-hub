---
title: Use Harness Approval steps in Container Step Groups
description: Add manual approval steps to containerized CD workflows for deployment validation and traffic management.
sidebar_position: 2
---

You can add Harness Approval steps inside Container Step Groups in CD pipelines. This enables manual approval gates within containerized deployment workflows, supporting deployment patterns like canary, blue-green, and traffic-based rollouts. This document explains how to configure stage timeouts to support long-running approvals within containerized workflows.

:::note
This feature is behind the feature flag `CDS_CONTAINER_STEP_GROUP_STAGE_TIMEOUT`. Contact [Harness Support](mailto:support@harness.io) to enable the feature.
:::

---

## Before you begin

Before adding Harness Approval steps to Container Step Groups, ensure you understand the following concepts and have completed the required setup.

- **Container Step Groups:** Run CD steps in your Kubernetes cluster. Go to [Containerized step groups](/docs/continuous-delivery/x-platform-cd-features/cd-steps/containerized-steps/containerized-step-groups) to understand pod lifecycle and resource requirements.

- **Harness Approval steps:** Configure manual gates in Harness pipelines. Go to [Manual approvals](/docs/platform/approvals/approvals-tutorial) to review approver configuration and notification options.

- **Stage timeouts:** Container step group pods have a default 24-hour lifetime. Approval steps that wait longer than 24 hours require extended stage timeouts.

---

## How approval steps work in Container Step Groups

When a Harness Approval step runs inside a Container Step Group, the approval process works as follows:

The Container Step Group creates a pod in your Kubernetes cluster that hosts all steps in the group. When execution reaches a Harness Approval step, the pipeline pauses and waits for human approval. The approval request appears in the Harness UI, and approvers can grant or reject the request. Once approved, execution resumes with the next step in the group.

This workflow enables deployment patterns where you need manual validation between automated deployment phases. For example, you can deploy without traffic, validate the deployment, grant approval, and then shift production traffic to the new version.

---

## Configure stage timeout for approvals

Container Step Group pods have a default maximum lifetime of 24 hours. If your approval step requires more than 24 hours for a user to respond, you must configure an extended stage timeout.

### When to configure stage timeout

Configure an extended stage timeout when your approval steps may require more than 24 hours for human response. Common scenarios include:

- Deployments that span multiple time zones or business days
- Approvals that require coordination across multiple teams
- Production deployments that wait for low-traffic windows

### How stage timeout affects pod lifetime

The pod TTL (Time To Live) is set using the Kubernetes `activeDeadlineSeconds` field on the container step group pod. The `CDS_CONTAINER_STEP_GROUP_STAGE_TIMEOUT` feature flag controls how this value is determined.

**When feature flag is OFF:**
- Pod TTL is always 24 hours (default), regardless of the stage timeout configuration

**When feature flag is ON:**
- **No stage timeout set in YAML**: Pod TTL defaults to 24 hours
- **Stage timeout ≤ 24 hours**: Pod TTL defaults to 24 hours
- **Stage timeout > 24 hours**: Pod TTL equals the stage timeout value

When the feature flag is enabled, the system reads the `timeout` field from the stage YAML. If the stage timeout exceeds 24 hours, the pod TTL is set to match that timeout value. If no stage timeout is specified in the YAML, or if the stage timeout is 24 hours or less, the pod TTL remains at the default 24 hours.

The stage timeout field supports Harness expressions (for example, `<+pipeline.variables.timeout>`), which are resolved at runtime. For example, if the stage timeout is set to `30h`, the pod TTL will be set to 30 hours.

### Configure timeout hierarchy correctly

When using Harness Approval steps in Container Step Groups, configure timeouts at three levels to ensure the approval completes successfully:

**Timeout hierarchy (each level must accommodate the level below):**
1. **Pipeline timeout** must be greater than stage timeout
2. **Stage timeout** must be greater than or equal to approval step timeout
3. **Approval step timeout** determines how long the approval can wait for human response

**Example configuration:**
- If your approval step may take 30 hours for response, configure:
  - Approval step timeout: `30h` (or more)
  - Stage timeout: `30h` (or more) to set pod TTL to 30 hours
  - Pipeline timeout: `> 30h` to allow the entire pipeline to complete

If the stage timeout is less than the approval step timeout, the approval may succeed but the stage will fail when it exceeds the stage timeout. If the stage timeout is 24 hours or less, the pod TTL remains at 24 hours and the pod will be terminated if the approval takes longer than 24 hours.

### Configure stage timeout in YAML

Add the `timeout` field to your stage configuration. The timeout value uses duration format (e.g., `30h` for 30 hours, `2d` for 2 days).

<details>
<summary>Google Cloud Run deployment with approval YAML example</summary>

```yaml
execution:
  steps:
    - stepGroup:
        steps:
          - step:
              type: DownloadManifests
              name: DownloadManifests
              identifier: DownloadManifests
              spec: {}
              failureStrategies: []
          - step:
              type: GoogleCloudRunPrepareRollbackData
              name: Google Cloud Run Prepare Rollback Data
              identifier: Google_Cloud_Run_Prepare_Rollback_Data
              spec:
                connectorRef: account.harnessImage
                image: harness/google-cloud-run-plugin:1.0.9-linux-amd64
                imagePullPolicy: Always
          - step:
              type: GoogleCloudRunDeploy
              name: Google Cloud Run Deploy
              identifier: Google_Cloud_Run_Deploy
              spec:
                connectorRef: account.harnessImage
                image: harness/google-cloud-run-plugin:1.0.9-linux-amd64
                imagePullPolicy: Always
          - step:
              type: HarnessApproval
              name: HarnessApproval_1
              identifier: HarnessApproval_1
              spec:
                approvalMessage: Please review the following information and approve the pipeline progression
                includePipelineExecutionHistory: true
                isAutoRejectEnabled: false
                approvers:
                  userGroups:
                    - account._account_all_users
                  minimumCount: 1
                  disallowPipelineExecutor: false
                approverInputs: []
              timeout: 1d
          - step:
              type: GoogleCloudRunTrafficShift
              name: Google Cloud Run Traffic Shift
              identifier: Google_Cloud_Run_Traffic_Shift
              spec:
                revisionTrafficDetails:
                  - revisionName: latest
                    trafficValue: 100
                connectorRef: account.harnessImage
                image: harness/google-cloud-run-plugin:1.0.9-linux-amd64
                imagePullPolicy: Always
        name: Google Cloud Run Step Group
        identifier: Google_Cloud_Run_Step_Group
        sharedPaths:
          - /var/run
          - /var/lib/docker
        stepGroupInfra:
          type: KubernetesDirect
          spec:
            connectorRef: <+input>
            namespace: default
  rollbackSteps:
    - stepGroup:
        name: Google Cloud Run Rollback Step Group
        identifier: Google_Cloud_Run_Rollback_Step_Group
        steps:
          - step:
              type: GoogleCloudRunRollback
              name: Google Cloud Run Rollback
              identifier: Google_Cloud_Run_Rollback
              spec:
                connectorRef: account.harnessImage
                image: harness/google-cloud-run-plugin:1.0.9-linux-amd64
                imagePullPolicy: Always
        sharedPaths:
          - /var/run
          - /var/lib/docker
        stepGroupInfra:
          type: KubernetesDirect
          spec:
            connectorRef: <+input>
            namespace: default
```

</details>

### Configure stage timeout in the UI

To set stage timeout in the Harness application:

1. In your pipeline, select the deployment stage that contains the Container Step Group.
2. Select the **Advanced** tab for the stage.
3. In the **Timeout** field, enter a duration value (e.g., `48h` for 48 hours).
4. Save the pipeline.

The pod hosting the Container Step Group will remain active for the configured timeout duration, allowing approval steps to wait for human response without the pod being terminated.

---

## Important notes

- Only Harness Approval steps are supported in Container Step Groups. Other approval step types (Jira Approval, ServiceNow Approval, Custom Approval) are not supported.

- The pod hosting the Container Step Group remains active during approval wait time. Ensure your Kubernetes cluster has sufficient resources to support long-running pods if you use extended stage timeouts.

- Stage timeout configuration applies to the entire stage, not just the approval step. The pod lifetime extends to accommodate any long-running approvals within the stage.

- The stage timeout field supports Harness expressions, allowing dynamic timeout values based on pipeline variables or runtime inputs.

---

## Next steps

Go to [Containerized step groups](/docs/continuous-delivery/x-platform-cd-features/cd-steps/containerized-steps/containerized-step-groups) to understand pod lifecycle and resource configuration for CD steps in your Kubernetes cluster.

Go to [Using manual Harness approval stages](/docs/platform/approvals/adding-harness-approval-stages) to explore Harness Approval configuration options and approval workflows.

Go to [Failure strategies](/docs/platform/pipelines/failure-handling/define-a-failure-strategy-on-stages-and-steps) to configure what happens if an approval is rejected or times out.
