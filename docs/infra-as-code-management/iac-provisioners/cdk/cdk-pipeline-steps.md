---
title: CDK pipeline steps
sidebar_label: CDK pipeline steps
description: Reference for the bootstrap, synth, diff, and deploy steps available in Harness IaCM CDK pipelines.
keywords:
  - aws cdk
  - bootstrap
  - synth
  - diff
  - deploy
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

CDK workspaces in Harness IaCM use dedicated pipeline steps that map to the CDK deployment lifecycle. Each step is available in the pipeline editor under the **IACM** step category.

Go to [Get started with IaCM](/docs/infra-as-code-management/get-started#awscdk) to understand how these steps fit together in a complete deploy pipeline. Go to [AWS CDK overview](/docs/infra-as-code-management/iac-provisioners/cdk/overview) to understand the lifecycle and stacks.

---

## Bootstrap

Bootstrap provisions the CDK toolkit resources in your target AWS account and region. The toolkit consists of:

- An **S3 bucket** used to store CloudFormation asset files (Lambda code, CloudFormation templates, and other assets produced by synth).
- An **ECR repository** used to store container image assets if your CDK app defines any.

These resources are required before any CDK app can be deployed into an account and region. Bootstrap is a one-time operation. Once the toolkit exists, subsequent pipeline runs detect it and proceed without reprovisioning.

:::tip Run bootstrap once per account and region
If your CDK workspace targets a single AWS account and region, you can run bootstrap as part of your first deploy pipeline and remove it from subsequent runs once the toolkit is confirmed to exist. Alternatively, leave it in place. Bootstrap is idempotent and safe to run on every pipeline execution.
:::

---

## Synth

Synth compiles your CDK app code into one or more CloudFormation templates. During this step, Harness:

1. Installs your language runtime and package manager (as configured on the workspace).
2. Installs your project dependencies.
3. Runs the CDK synth command against your app entrypoint.
4. Produces the CloudFormation templates and asset manifest in the `cdk.out` directory.

If your CDK code contains errors (type errors, missing constructs, or invalid configurations), synth fails here before any AWS API calls are made.

:::info Synth validates your code
A successful synth does not mean your deployment will succeed. It means your CDK code is valid and produces well-formed CloudFormation. CloudFormation validation and resource provisioning happen during deploy.
:::

---

## Diff

Diff compares the CloudFormation templates produced by synth against the currently deployed stack in AWS and reports what will change. The output shows:

- Resources to be **added**
- Resources to be **modified**
- Resources to be **removed**
- Any security group or IAM policy changes (highlighted separately)

:::warning Replacements require care
When diff shows a resource replacement (remove and re-add), the existing resource is destroyed before the new one is created. For stateful resources such as RDS instances or S3 buckets, review replacement notices carefully before approving a deploy.
:::

---

## Deploy

Deploy executes the CloudFormation change set produced by synth and applies the infrastructure changes to your AWS account. Harness records the result in the workspace activity history, broken down by stack.

By default, deploy runs against all stacks defined in your CDK app. To deploy a single stack, set the **Stack Path** field to the identifier of the target stack. Go to [Stacks](/docs/infra-as-code-management/iac-provisioners/cdk/overview#stacks) to understand how stacks work.

:::info CloudFormation manages rollback
If a resource fails to provision during deploy, CloudFormation automatically rolls back the entire stack to its previous state. Harness reflects the rollback status in the activity history.
:::

---

## Troubleshooting

<Troubleshoot
  issue="Bootstrap fails with insufficient permissions"
  mode="docs"
  fallback="The AWS connector used by your workspace needs permissions to create S3 buckets, ECR repositories, IAM roles, and CloudFormation stacks in the target account. Review the IAM policy attached to the connector's role and ensure it includes the permissions required by the CDK bootstrap process."
/>

<Troubleshoot
  issue="Synth fails with a module not found error"
  mode="docs"
  fallback="The package manager step that runs before synth did not install a required dependency. Check that your requirements.txt (Python) or package.json (TypeScript/JavaScript) is committed to the repository and that the Folder Path in your workspace points to the directory containing it."
/>

<Troubleshoot
  issue="Diff shows unexpected replacements for resources that haven't changed"
  mode="docs"
  fallback="CDK generates logical IDs for resources based on the construct tree path. If you renamed a construct or moved it in the tree, CDK treats it as a new resource and marks the old one for deletion. Review your CDK construct identifiers and use explicit physical names where replacement would be disruptive."
/>

<Troubleshoot
  issue="Deploy fails with a CloudFormation stack in ROLLBACK_COMPLETE state"
  mode="docs"
  fallback="A stack in ROLLBACK_COMPLETE must be deleted before it can be redeployed. Delete the stack from the AWS CloudFormation console or using the AWS CLI, then re-run the deploy pipeline."
/>
