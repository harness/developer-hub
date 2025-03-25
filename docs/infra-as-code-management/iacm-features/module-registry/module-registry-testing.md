---
title: Module Registry Testing
description: Learn how to add module registry testing to your Harness IaCM Pull Requests
sidebar_position: 50
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Module Registry Testing enables automated testing of your infrastructure modules through dedicated pipelines that don't consume workspace credits. This feature ensures your modules are reliable and functional before they're merged into your main branch.

## Common use case
1. When you have a module and create a Pull Request (PR), it automatically triggers auto-generated testing pipelines
2. These pipelines run at the project level scope, when you select the use module registry testing option, your testing pipelines will run and test your module executing the `init`, `plan`, `apply`, and `destroy` commands.
3. Upon successful test completion, your PR can proceed with the merge process

## Types of Testing Pipelines
As part of the module registry testing feature, two testing pipelines are created for you:

### Integration Testing Pipeline

Integration testing verifies your module by:
- Creating real infrastructure
- Testing functionality
- Destroying the infrastructure

Requirements:
- Your repository must include an `examples` folder
- The example subdirectories must follow this structure:
  - `init/`
  - `plan/`
  - `apply/`
  - `destroy/`

### Tofu/Terraform Testing Pipeline
For Tofu testing, you need either:
- A `tests` folder in your module with a `test.tftest.hcl` file, or
- A root `test.tftest.hcl` file

## Pipeline Configuration
Key aspects of the testing pipelines:
- Each pipeline contains a testing stage with a single step
- You can select a default testing pipeline for your module
- When a PR is created, your default pipeline automatically executes

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

## Using Module Testing
<Tabs>
<TabItem value="Interactive guide">
<DocVideo src="https://app.tango.us/app/embed/b8ed4345-45b1-4b68-b3ff-09ed5ecc04d1" title="Automated Module Registry Testing with Harness IaCM" />
</TabItem>
<TabItem value="Step-by-step">
1. From the IaCM Module Registry page, select a module.
2. Select the **Test Executions** tab.
3. Select **Set up Module testing**.
4. Select and **Organization** and **Project**, then select **Next**.
5. Select a Cloud Provider Connector, then select **Apply selected**.
6. Select your provisioner, and Version, e.g. **OpenTofu**.
7. Select **Next**.
8. Select your default pipelines to run against your pull request to test your module.
    - By default, an **Integration Test** and **Tofu/Terraform Test** pipeline are created for you.
9. Select **Finish**.
</TabItem>
</Tabs>