---
title: AWS CDK in IaCM
sidebar_label: Overview
description: Understand how AWS CDK fits into Harness IaCM, the CDK deployment lifecycle, and how Stacks, languages, and pipelines work together.
keywords:
  - aws cdk
  - cloud development kit
  - IaCM
  - infrastructure as code
  - bootstrap
  - synth
  - stacks
tags:
  - iacm
  - aws-cdk
redirect_from:
  - /docs/infra-as-code-management/aws-cdk/overview
sidebar_position: 10
---

import { FAQ } from '@site/src/components/AdaptiveAIContent';

AWS Cloud Development Kit (CDK) lets you define cloud infrastructure using general-purpose programming languages instead of a domain-specific language like HCL. The code you write compiles to CloudFormation templates, which AWS uses to provision and manage the underlying resources. Harness IaCM currently supports Python and TypeScript, with JavaScript, Java, C#, and Go support coming in subsequent releases.

Harness IaCM treats CDK as a first-class provisioner alongside Terraform, OpenTofu, and Terragrunt. You create a CDK workspace, connect your AWS account and Git repository, and run a default deploy pipeline that manages the full CDK lifecycle. You can use pipeline controls such as approval steps with CDK.

Go to [Get started with IaCM](/docs/infra-as-code-management/get-started#awscdk) to create your first CDK workspace and run a deploy pipeline.

---

## The CDK deployment lifecycle

CDK workspaces in Harness IaCM run four pipeline steps in sequence. Each step corresponds to a phase of the CDK workflow:

**Bootstrap** provisions the CDK toolkit resources in your target AWS account and region. The toolkit consists of an S3 bucket to store CloudFormation assets and an ECR repository to store container image assets. Bootstrap is a one-time operation per account and region. Once the toolkit exists, subsequent pipeline runs skip or fast-forward this step.

**Synth** compiles your CDK app code into one or more CloudFormation templates. This step validates your code, resolves constructs, and produces the asset manifest that the deploy step will use. If your app contains errors, synth fails before any AWS resources are touched.

**Diff** compares the synthesized CloudFormation template against the currently deployed stack and reports what will change: resources to add, modify, or remove. It shows intent without executing anything.

**Deploy** executes the CloudFormation change set and provisions your infrastructure. Harness records the result in the workspace activity history, broken down by stack.

Go to [CDK pipeline steps](/docs/infra-as-code-management/iac-provisioners/cdk/cdk-pipeline-steps) to read the full reference on each step's inputs and configuration options.

---

## Stacks

A CDK app can define one or more **stacks**. Each stack maps to a CloudFormation stack and is the unit of deployment. Resources inside a stack are provisioned and managed together.

When you run a CDK deploy pipeline in Harness, all stacks in your app are deployed by default. If you want to deploy a single stack (for example, when you have independent stacks per environment or service), set the **Stack Path** field on your pipeline steps to the identifier of the target stack.

The workspace activity history in Harness shows deployment results broken down by stack, so you can tell which stacks changed and their status within a single pipeline run.

---

## Supported languages

CDK supports multiple programming languages because it compiles to CloudFormation regardless of which language you use. Harness IaCM installs the required language runtime and package manager dynamically at pipeline execution time, rather than requiring a pre-baked Docker image.

When you create a CDK workspace, you select:

- **AWS CDK version:** The CDK version to run your app against.
- **Programming Language:** Python or TypeScript.
- **Language Version:** The runtime version to install.
- **Package Manager:** The package manager to use to install dependencies.
- **Package Manager Version:** The package manager version to install.

---

## CDK plugin environment variables

CDK pipeline steps read plugin environment variables (the same `PLUGIN_*` pattern as other IaCM steps, for example [`PLUGIN_AWS_SESSION_DURATION`](/docs/infra-as-code-management/manage-projects/iacm-aws-connectors#cloud)). You must always set **`PLUGIN_AWS_REGION`** explicitly (for example as a manual variable on the workspace **Connectors and Variables** tab, or on the stage, pipeline, or step **Environment Variables**). Set **`PLUGIN_AWSCDK_STACKS`** only when you want the run to process specific stacks instead of every stack in the app; if you omit it, all stacks are included. Harness is working on a more seamless experience for stack selection.

| Variable | Required | Description |
| --- | --- | --- |
| `PLUGIN_AWS_REGION` | Yes | Target AWS Region for the deployment (for example `us-east-1`). Must be set for CDK steps to know where to deploy. |
| `PLUGIN_AWSCDK_STACKS` | No | Comma-separated logical stack IDs when you need only certain stacks processed (for example `SQSStack,S3Stack`). Omit to process every stack in the app. |

You can still target a single stack from the pipeline UI using the **Stack Path** field on CDK steps; use `PLUGIN_AWSCDK_STACKS` when you want to drive a comma-separated list from variables or YAML. Go to [AWS connector configuration (optional)](/docs/continuous-delivery/cd-infrastructure/aws-cdk#aws-connector-configuration-optional) to review optional region and role overrides at the step level in CD.

---

## FAQs

<FAQ
  question="Do I need to run bootstrap every time I deploy?"
  mode="docs"
  fallback="No. Bootstrap is a one-time operation per AWS account and region. Once the CDK toolkit resources exist, subsequent pipeline runs detect them and proceed without re-bootstrapping."
/>

<FAQ
  question="Can I use CDK with an existing CloudFormation stack?"
  mode="docs"
  fallback="Yes, but you need to import the existing stack into your CDK app first. CDK does not automatically manage resources that were not created through it."
/>

<FAQ
  question="How does Harness track CDK state?"
  mode="docs"
  fallback="CDK state is managed by AWS CloudFormation, not by Harness. Harness tracks activity history and stack-level deployment results, but there is no Harness-managed state file for CDK workspaces."
/>

---

## Related concepts

- Go to [Get started with IaCM](/docs/infra-as-code-management/get-started#awscdk) to create your first CDK workspace and run a deploy pipeline.
- Go to [CDK pipeline steps](/docs/infra-as-code-management/iac-provisioners/cdk/cdk-pipeline-steps) to read the reference for the bootstrap, synth, diff, and deploy steps.
- Go to [AWS CDK provisioning: Step settings common to multiple steps](/docs/continuous-delivery/cd-infrastructure/aws-cdk#step-settings-common-to-multiple-steps) for shared settings on containerized CDK steps in CD and IaCM.