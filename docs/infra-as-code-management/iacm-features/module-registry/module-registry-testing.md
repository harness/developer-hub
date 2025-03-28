---
title: Module Registry Testing
description: Learn how to add module registry testing to your Harness IaCM Pull Requests
sidebar_position: 50
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Module Registry Testing enables automated testing of your infrastructure modules through dedicated pipelines that don't consume workspace credits. This feature ensures your infrastructure modules are reliable and functional by automatically testing them when a Pull Request is created. It reduces the risk of broken modules reaching production and helps enforce testing as part of the review process.

## Common use case

1. When you have a module and create a Pull Request (PR), it automatically triggers auto-generated testing pipelines
2. These pipelines run at the project level scope, when you select the **use module registry** option, your testing pipelines will run and test your module executing [the `init`, `plan`, `apply`, and `destroy` commands](/docs/infra-as-code-management/pipelines/terraform-plugins).
3. Upon successful test completion, your PR can proceed with the merge process

## Types of Testing Pipelines

As part of module registry testing, Harness creates two default pipelines per module:

### 1. Integration Testing Pipeline

Integration testing verifies your module by:

- Creating real infrastructure
- Testing functionality
- Destroying the infrastructure

:::info example folder
Integration testing will use your repository's `examples/` folder.
:::

### 2. Tofu/Terraform Testing Pipeline

Tofu/Terraform testing requires either:

- A `tests/` folder with a `test.tftest.hcl` file, **and/or**
- A root-level `test.tftest.hcl` file

:::info requirements

- Do not use a workspace in testing pipelines. This will cause execution to fail.
- `moduleId` must be configured as a runtime input in your pipeline.
  :::

## Pipeline Configuration

Key aspects of the testing pipelines:

- Each pipeline contains a testing stage with a single step
- You can select a default testing pipeline for your module
- When a PR is created, your default pipeline automatically executes
- You cannot use a **workspace** in a module testing pipeline. Doing so will cause the pipeline to fail.
  - Instead, Harness uses a `moduleId` input and provides custom testing steps.
  - The `moduleId` is passed automatically using webhooks created during setup.

### Branch Configuration

When defining a module, you configure a target branch. Any PRs created against this configured branch will trigger the associated testing pipelines.

## Selecting a Connector

When setting up integration testing, you must select a connector. This is necessary because:

- Integration tests create and destroy real infrastructure
- The connector provides the necessary credentials and access

## Credit Usage

Important note about credits:

- Module testing pipelines do not consume workspace credits
- If you use your own custom pipelines with workspaces instead of the testing pipelines, they will consume credits
- If you define your own pipeline but do not use Harness-provided testing steps (e.g., you include a workspace stage), your pipeline **will consume credits**.
- To avoid this, use the provided **Testing**, **Integration Testing**, or **Tofu/Terraform Testing** steps when building custom pipelines.

| Scenario                                                          | Credit Usage                           |
| ----------------------------------------------------------------- | -------------------------------------- |
| Default testing pipelines or Custom pipelines using Harness steps | No credits consumed :white_check_mark: |
| Custom pipelines using workspaces                                 | Credits consumed :x:                   |

## File Structure Expectations

### Integration Testing

- You must have an `examples/` folder in your module repository.
- Inside `examples/`, create subfolders for each test case.
- Each subfolder must contain standard Terraform code (`main.tf`, `outputs.tf`, etc.).
- The pipeline will execute the [`init → plan → apply → destroy` commands](/docs/infra-as-code-management/pipelines/terraform-plugins) against your `main.tf` file in each subfolder.

```markdown
module-repository/
├── main.tf # Main module code
├── variables.tf # Module variables
├── outputs.tf # Module outputs
├── examples/ # Required for integration testing
│ ├── basic-example/ # Test case 1
│ │ ├── main.tf # Uses the module
│ │ ├── variables.tf # (Optional)
│ │ └── outputs.tf # (Optional)
│ └── advanced-example/ # Test case 2
│ ├── main.tf # Uses the module
│ ├── variables.tf # (Optional)
│ └── outputs.tf # (Optional)
└── README.md # Module documentation
```

### Tofu/Terraform Testing

- Harness detects `test.tftest.hcl` in:
  - The repository root, or
  - Inside a `tests/` folder.

```markdown
module-repository/
├── main.tf # Main module code
├── variables.tf # Module variables
├── outputs.tf # Module outputs
├── test.tftest.hcl # Option 1: Root level test file
└── tests/ # Option 2: Tests directory
├── basic.tftest.hcl # Test file 1
└── advanced.tftest.hcl # Test file 2
```

:::warning ignored files
Files in other locations will be ignored.
:::

## Using Module Testing

<Tabs>
<TabItem value="Interactive guide">
<DocVideo src="https://app.tango.us/app/embed/b8ed4345-45b1-4b68-b3ff-09ed5ecc04d1" title="Automated Module Registry Testing with Harness IaCM" />
</TabItem>
<TabItem value="Step-by-step">

1. From the IaCM Module Registry page, select a module.
2. Select the **Test Executions** tab.
3. Select **Set up Module testing**.
4. Select an **Organization** and **Project**, then select **Next**.
5. Select a Cloud Provider Connector, then select **Apply selected**.
6. Select your **Provisioner**, and **Version**, e.g. **OpenTofu 1.9.0**.
7. Select **Next**.
8. Select your default pipelines to run against your pull request to test your module.
   - By default, an **Integration Test** and **Tofu/Terraform Test** pipeline are created for you.
9. Select **Finish**.
</TabItem>
<TabItem value="Custom pipeline setup">

To create your own module testing pipeline:

1. Go to **Pipelines > Create**.
2. Add a **Testing** stage, and select one of:
   - **Integration Testing**
   - **Tofu/Terraform Testing**
3. Ensure you use the **"Use Module Registry"** step instead of a workspace.
4. Set `moduleId` as a **runtime input** to make your pipeline reusable across modules.
5. Avoid adding workspace stages — these will invalidate the testing pipeline.

:::info credit usage
Pipelines using Harness testing steps **will not consume credits**. Custom logic using workspaces will.
:::
</TabItem>
</Tabs>

## Get Started Today
Ready to improve your module quality and reliability? Follow these next steps:

1. **Set up your repository structure** using the patterns shown above
2. [**Configure module testing**](#configure-module-testing) in your Harness IaCM account
3. **Create your first PR** to see automated testing in action

By implementing module testing, you'll catch issues earlier, ensure consistent behavior across environments, and build confidence in your infrastructure modules.