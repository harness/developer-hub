---
title: Set Up OpenTofu Provisioner
description: Run your first OpenTofu provision and add production-ready features like approval gates, cost estimation, and variable management.
keywords:
  - opentofu
  - provisioner
  - setup
  - approval
  - variables
  - cost estimation
  - provisioning
  - iacm
tags:
  - iacm
  - opentofu
sidebar_position: 10
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

You ran your first provision in the [OpenTofu quickstart](/docs/infra-as-code-management/get-started#opentofu). Now add production-ready features like approval gates, cost estimation, and variable management. By the end, your provisioner will be ready to safely manage infrastructure changes.

---

## Before you begin

Before you continue, make sure the following are in place:

- **Completed the quickstart:** You have created a workspace, built a pipeline, and run your first provision. Go to [Get started with IaCM](/docs/infra-as-code-management/get-started#opentofu) to complete the quickstart.
- **OpenTofu configuration files:** Your Git repository contains at least one `.tf` file that declares infrastructure resources.
- **Pipeline permissions:** View, Create/Edit, and Execute permissions for Pipelines. Go to [RBAC in Harness](/docs/platform/role-based-access-control/rbac-in-harness) to review permissions.
- **Secret management access:** Permissions to create and manage secrets in Harness. Go to [Harness Secret Manager](/docs/platform/secrets/secrets-management/harness-secret-manager-overview) to understand secret management.

---

## Verify your provisioned infrastructure

You ran your provision pipeline in the [Get Started with OpenTofu steps](/docs/infra-as-code-management/get-started/#opentofu) and the apply step completed. Now verify that infrastructure was provisioned correctly in both Harness and your cloud provider.

:::tip Verification best practice

Always verify infrastructure in both Harness and your cloud provider console after provisioning. This confirms that the state in Harness matches what actually exists in your cloud account.

:::

To verify your provisioned infrastructure, do the following:

1. Navigate to your workspace in the **Workspaces** view.
2. Select the **Resources** tab to see the infrastructure resources managed by this workspace.
3. Review the list of resources created during the apply operation.
4. Log in to your cloud provider console and verify that the resources exist:
   - **AWS:** Check the relevant service console (EC2, VPC, S3) for newly created resources.
   - **Azure:** Navigate to the resource group specified in your configuration.
   - **GCP:** Review the project and region where resources were created.

---

## Add approval gates

Your pipeline currently runs automatically from plan to apply. In production, you want to review changes before they take effect.

### Why you need approval gates

Approval gates prevent unintended infrastructure changes by requiring manual review. With approval gates, you can:

- Review what will change by reading the plan output before it executes.
- See estimated costs (if cost estimation is enabled) before committing to changes.
- Reject dangerous changes before they affect your infrastructure.
- Create an audit trail of who approved each infrastructure change.

The most common pattern is to add an approval step between plan and apply operations.

### Add an approval step

<Tabs>
<TabItem value="Interactive guide">
<DocVideo src="https://app.tango.us/app/embed/e84d97b6-413b-4e04-a4dc-fd4c802d0f05?skipCover=true&defaultListView=false&skipBranding=false&makeViewOnly=true&hideAuthorAndDetails=true" title="Add Approval step to your OpenTofu Pipeline in Harness IaCM" />
</TabItem>
<TabItem value="Step-by-step">

To add an approval step to your provision pipeline, do the following:

1. In the Harness UI, navigate to the **Infrastructure** module.
2. Select **Pipelines** and open your OpenTofu provision pipeline.
3. In the Pipeline Studio, locate the **Execution** tab.
4. Click the **+** icon between the `plan` and `apply` steps.
5. Select **Add Step**.
6. Under **IACM**, select **IACM Approval**.
7. Enter a name for the approval step (for example, `Review Plan`).
8. Click **Apply Changes**.

</TabItem>
</Tabs>

### Configure approval criteria

Configure who can approve the pipeline and set timeout values.

To configure approval criteria, do the following:

1. In the approval step configuration, select the **Approval** tab.
2. Under **User Groups**, select the user groups authorized to approve this step.
3. Set a **Timeout** value (the maximum time the pipeline will wait for approval before timing out).
4. Optionally, configure **Auto-Reject** settings to automatically reject if certain conditions are met.
5. Click **Apply Changes** and save the pipeline.

When the pipeline reaches the approval step, it pauses and displays the plan output. Authorized users receive a notification and can approve or reject the execution from the pipeline view or the Harness mobile app.

:::warning Approval steps hold resources

When a pipeline pauses at an approval step, the underlying compute resources remain allocated until the approval resolves. This consumes compute hours even while waiting. Set reasonable timeout values to avoid unnecessary resource consumption.

:::

### Test your approval gate

To verify that your approval gate works, do the following:

1. Make a small, safe change to your OpenTofu configuration (such as adding a tag to a resource).
2. Commit and push the change to your Git repository.
3. Run your provision pipeline.
4. Verify that the pipeline pauses at the approval step and displays the plan output.
5. Review the changes shown in the plan.
6. Click **Approve** to continue the pipeline.
7. Verify that the apply step completes successfully.

---

## Enable cost estimation

Cost estimation shows you the financial impact of your OpenTofu changes before you apply them. When enabled, the plan step displays estimated monthly costs for resources being added, modified, or destroyed.

To enable cost estimation on your workspace, do the following:

1. Navigate to your workspace in the **Infrastructure** module.
2. Click **Edit Workspace** (pencil icon in the top right).
3. In the **Provisioner** section, toggle **Enable Cost Estimation** to on.
4. Click **Save**.

The next time your pipeline runs a plan operation, cost estimates appear in the plan step logs and in the approval step if you have configured one.

Go to [Cost Estimation](/docs/infra-as-code-management/workspaces/cost-estimation) to learn how cost estimation works, review supported resources and providers, and understand estimation limitations.

---

## Configure workspace variables

Workspace variables let you separate configuration from code. Variables declared in your OpenTofu `.tf` files as `variable` blocks can be supplied through the workspace Variables tab.

**OpenTofu example:** If your configuration declares:

```hcl
variable "aws_region" {
  type    = string
  default = "us-east-1"
}

variable "instance_type" {
  type = string
}
```

Add matching workspace variables:
- **Key:** `aws_region`, **Value:** `us-west-2` (overrides the default)
- **Key:** `instance_type`, **Value:** `t3.medium`

For sensitive values like passwords or API keys, toggle **Secret** when adding the variable and select an existing secret from your Harness Secret Manager. Go to [Secrets Management](/docs/category/secrets-management) to learn how to create and manage secrets.

Go to [Connectors and Variables](/docs/infra-as-code-management/configuration/connectors-and-variables/connectors-variables) to learn about workspace variables, environment variables, variable precedence, and variable sets.

---

## Understand remote state

Harness IaCM automatically configures itself as the remote backend for your OpenTofu state when you create a workspace. You do not need to add a backend block in your `.tf` files. State is encrypted at rest and access is controlled through Harness RBAC permissions.

State locking prevents concurrent modifications. When a provision operation runs, Harness locks the state for that workspace until the operation completes.

Go to [State Management](/docs/infra-as-code-management/iac-provisioners/opentofu/state-management) to learn about viewing state in the UI, migrating existing state, using external backends, and accessing state locally.

---

## Verify your production-ready setup

You have now added approval gates, cost estimation, and variable management to your provisioner. Run through a complete provision cycle to verify everything works together.

### Run a complete provision cycle

To test your complete setup, do the following:

1. Make a small, safe change to your OpenTofu configuration (such as modifying a tag or changing an instance type).
2. Commit and push the change to your Git repository.
3. Run your provision pipeline.
4. Verify that the init and plan steps complete successfully.
5. When the pipeline pauses at the approval step, review:
   - The plan output showing what will change.
   - The cost estimation showing the financial impact.
6. Click **Approve** to continue.
7. Verify that the apply step completes successfully.
8. Check the workspace **Resources** tab to confirm the change is reflected in the state.
9. Verify the change in your cloud provider console.

---

## Troubleshooting

<Troubleshoot
  issue="OpenTofu init fails with authentication errors to the cloud provider in Harness IaCM"
  mode="docs"
  fallback="Verify that your cloud provider connector has valid credentials and the necessary permissions to access the target account. Test the connector using the Test Connection feature in the connector settings."
/>

<Troubleshoot
  issue="Plan step succeeds but apply step fails with permission denied errors in OpenTofu workspace"
  mode="docs"
  fallback="The cloud provider connector may have read permissions but lack write permissions. Update the connector credentials to include permissions for creating and modifying resources."
/>

<Troubleshoot
  issue="OpenTofu init step hangs or times out in Harness IaCM pipeline"
  mode="docs"
  fallback="Check delegate connectivity. The delegate running the pipeline must be able to reach the Git repository and the OpenTofu provider registry. Review delegate logs for network errors."
/>

<Troubleshoot
  issue="Approval step does not show cost estimation in OpenTofu pipeline"
  mode="docs"
  fallback="Verify that cost estimation is enabled on the workspace. Go to the workspace settings, edit the workspace, and confirm the Enable Cost Estimation toggle is on in the Provisioner section."
/>

<Troubleshoot
  issue="OpenTofu variables not being applied during plan step in Harness IaCM"
  mode="docs"
  fallback="Ensure variable names in the workspace Variables tab match the variable names declared in your OpenTofu configuration files exactly. Variable names are case-sensitive. Check for typos or extra spaces."
/>

<Troubleshoot
  issue="Workspace Resources tab shows no resources after successful apply operation"
  mode="docs"
  fallback="Wait a few moments for state synchronization to complete. Refresh the page. If resources still do not appear, verify that the apply step completed successfully in the pipeline logs."
/>

<Troubleshoot
  issue="State lock is preventing pipeline execution in OpenTofu workspace"
  mode="docs"
  fallback="Check the workspace Activity tab to see if another pipeline run is active. If no runs are active but the lock persists, an administrator can manually unlock the state from the workspace settings."
/>

<Troubleshoot
  issue="Secret variables appear in OpenTofu logs or plan output"
  mode="docs"
  fallback="Verify that the variable is marked as Secret in the workspace Variables tab. If the variable is not marked as secret, Harness treats it as plain text and may display it in logs. Edit the variable and toggle the Secret option on."
/>

---

## Next steps

Your OpenTofu provisioner is now set up for production use.

- Go to [Remote Backends](/docs/infra-as-code-management/remote-backends/use-backends) to migrate existing infrastructure state into Harness IaCM.
- Go to [Workspace cost estimation](/docs/infra-as-code-management/workspaces/cost-estimation) to review supported resources and providers for cost visibility.
- Go to [RBAC in Harness](/docs/platform/role-based-access-control/rbac-in-harness) to configure approval user groups and permissions.
