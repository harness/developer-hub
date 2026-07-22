---
title: CDK Pipeline Steps
sidebar_label: CDK Pipeline Steps
description: Reference for the bootstrap, synth, diff, deploy, destroy, drift, and approval steps available in Harness IaCM CDK pipelines.
keywords:
  - aws cdk
  - bootstrap
  - synth
  - diff
  - deploy
  - destroy
  - drift
  - pipeline steps
  - IaCM
tags:
  - iacm
  - aws-cdk
redirect_from:
  - /docs/infra-as-code-management/aws-cdk/cdk-pipeline-steps
sidebar_position: 20
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

CDK workspaces in Harness IaCM use dedicated pipeline steps that correspond to the AWS CDK deployment lifecycle. Add these steps from the **IaCM** step category when you create a pipeline.

A typical deployment pipeline runs Bootstrap, Synth, Diff, and Deploy in sequence. Destroy and Drift are optional steps that you can run independently.

Go to [Set up the AWS CDK provisioner](/docs/infra-as-code-management/iac-provisioners/cdk/set-up-cdk-provisioner) to create the workspace that these steps run against.

---

## Pipeline steps

### Bootstrap

Bootstrap provisions the CDK toolkit resources required to deploy applications into the target AWS account and Region. These resources include:

- An [Amazon S3](https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html) bucket for CloudFormation assets.
- An [Amazon ECR](https://docs.aws.amazon.com/AmazonECR/latest/userguide/what-is-ecr.html) repository for container image assets.

Bootstrap is required only once for each AWS account and Region. After the toolkit resources exist, later pipeline runs detect them and continue without creating them again.

Bootstrap is idempotent and safe to include in every deployment pipeline. If your workspace targets a single account and Region, you can also run it once and remove it from later runs.

Go to [AWS Connector Authentication](/docs/infra-as-code-management/configuration/connectors-and-variables/aws-connector-auth) to review the IAM permissions required for bootstrap. Go to [Bootstrapping your AWS CDK environment](https://docs.aws.amazon.com/cdk/v2/guide/bootstrapping-env.html) in the AWS CDK Developer Guide to review what resources the toolkit creates.

---

### Synth

Synth compiles your CDK application into one AWS CloudFormation template for each stack defined in the application. During this step, Harness installs your application's dependencies, runs `cdk synth`, and generates the CloudFormation templates and asset manifest in the `cdk.out` directory.

If the application contains compilation or validation errors, the pipeline fails before any AWS resources are created or updated. OPA policies for CDK evaluate the templates generated during this step. If a policy denies the synthesized template, the pipeline fails. Go to [OPA Policies](/docs/infra-as-code-management/policies-governance/opa-workspace) to configure policy enforcement.

:::info
A successful Synth confirms that the application produces valid CloudFormation templates. CloudFormation validation and infrastructure provisioning occur during the Deploy step.
:::

---

### Diff

Diff compares the synthesized CloudFormation templates with the deployed CloudFormation stacks and reports the changes that will be applied. The output includes resources that will be:

- Added
- Modified
- Removed

It also highlights changes to IAM policies and security groups.

:::warning
When **Diff** reports a resource replacement, the existing resource is destroyed before the new one is created. For stateful resources such as RDS instances or S3 buckets, review replacement notices before you approve a deploy.
:::

---

### Deploy

**Deploy** applies the infrastructure changes identified during the Diff step to provision or update your infrastructure. After the deployment completes, Harness records the deployment status and activity history for each stack in the workspace.

By default, deploy runs against all stacks. To deploy specific stacks, set `PLUGIN_AWSCDK_STACKS` to a comma-separated list of logical stack IDs, for example `S3Stack,SqsStack`.

:::info
If CloudFormation cannot provision a resource, it rolls back the entire stack to its previous state. Harness reflects the rollback status in the workspace activity history.
:::

---

### Destroy

Destroy runs `cdk destroy` and deletes the CloudFormation stacks and AWS resources managed by the workspace, and removes the associated resources from the workspace resource mapping. The workspace itself is not deleted.

Use this step to clean up temporary or ephemeral environments.

By default, destroy runs against all stacks. To destroy specific stacks, set `PLUGIN_AWSCDK_STACKS` to a comma-separated list of logical stack IDs, for example `S3Stack,SqsStack`.

:::warning
If you delete a stack from `app.py` (or your language equivalent), CloudFormation no longer manages it through the workspace, but the stack and its resources stay live in AWS. To delete the stack, run a **Destroy** operation that targets it or delete it from the AWS CloudFormation console.
:::

---

### Drift

Drift runs a drift detection operation that compares your deployed stacks against your CDK definition, using the [CloudFormation drift detection API](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-cfn-stack-drift.html). Add **Drift** as a pipeline step or run it in a dedicated pipeline.

Drift detection for CDK is on-demand. A change made directly in AWS does not appear as drift automatically. Run the drift step to detect it, then run deploy again to reconcile the stack.

Go to [Drift detection](/docs/infra-as-code-management/pipelines/operations/drift-detection) to review where drift is reported and how to resolve it.

---

### Approvals

Use the IaCM Approval step to gate a deployment with a human review of the diff and OPA results. Go to [Approval step](/docs/infra-as-code-management/pipelines/operations/approval-step) to add one.

:::warning
The CDK step **Command** dropdown may list an `approval` command. It is not operational (it fails with an invalid enum value) and it is being removed. Use the IaCM Approval step instead.
:::

---

## Troubleshooting

<Troubleshoot
  issue="Bootstrap fails with a Cloud Assembly schema mismatch error"
  mode="general"
  fallback="The aws-cdk-lib version in your dependency file is newer than the selected CDK CLI version supports. Pin aws-cdk-lib to a compatible version, for example aws-cdk-lib==2.250.0 for CDK CLI 2.1108.0, or select a newer AWS CDK version in the workspace."
/>

<Troubleshoot
  issue="Bootstrap fails with insufficient permissions"
  mode="general"
  fallback="The AWS connector used by your workspace needs permissions to create S3 buckets, ECR repositories, IAM roles, and CloudFormation stacks in the target account. Review the IAM policy attached to the connector's role and ensure it includes the permissions required by the CDK bootstrap process."
/>

<Troubleshoot
  issue="Synth fails with a module not found error"
  mode="general"
  fallback="The package manager step that runs before synth did not install a required dependency. Check that your requirements.txt (Python) or package.json (TypeScript or JavaScript) is committed to the repository and that the Folder Path in your workspace points to the directory containing it."
/>

<Troubleshoot
  issue="Diff shows unexpected replacements for resources that have not changed"
  mode="general"
  fallback="CDK generates logical IDs from the construct tree path. If you renamed a construct or moved it in the tree, CDK treats it as a new resource and marks the old one for deletion. Review your construct identifiers and use explicit physical names where a replacement would be disruptive."
/>

<Troubleshoot
  issue="A renamed stack creates a new CloudFormation stack and the old one disappears from the workspace"
  mode="general"
  fallback="Renaming a stack ID makes CloudFormation create a new stack and abandon the old one. Harness stops tracking the old stack, but it stays live in AWS. Delete the orphaned stack in the AWS CloudFormation console or using the AWS CLI. Treat a stack ID rename as a destructive change."
/>

<Troubleshoot
  issue="Drift detection does not detect a change made directly in AWS"
  mode="fallback-only"
  fallback="Drift detection for CDK is on-demand, not automatic. Run the drift step to detect changes, then run deploy again to reconcile the stack back to your CDK definition."
/>

<Troubleshoot
  issue="Deploy fails with a CloudFormation stack in ROLLBACK_COMPLETE state"
  mode="general"
  fallback="A stack in ROLLBACK_COMPLETE must be deleted before it can be redeployed. Delete the stack from the AWS CloudFormation console or using the AWS CLI, then re-run the deploy pipeline."
/>

<Troubleshoot
  issue="Unable to save Pipeline YAML to a Harness Code repository. Is this supported?"
  mode="general"
  fallback="Storing the pipeline YAML in a Harness Code repository requires a Git connector. Configure a Git connector for pipeline storage, or store the pipeline inline by selecting Inline for Pipeline Storage."
/>

---

## Related concepts

- Go to [Set up the AWS CDK provisioner](/docs/infra-as-code-management/iac-provisioners/cdk/set-up-cdk-provisioner) to create the workspace and connector that these steps run against.
- Go to [OPA Policies](/docs/infra-as-code-management/policies-governance/opa-workspace) to configure policy enforcement on synthesized CloudFormation templates.
- Go to [Approval step](/docs/infra-as-code-management/pipelines/operations/approval-step) to gate a deployment on a human review of the diff output.
- Go to [Drift detection](/docs/infra-as-code-management/pipelines/operations/drift-detection) to review where drift results are reported and how to resolve them.
