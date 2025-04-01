---
title: Module Registry Testing
description: Learn how to add module registry testing to your Harness IaCM Pull Requests
sidebar_position: 50
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Module Registry Testing enables automated testing of your infrastructure modules through dedicated pipelines that don't consume workspace credits. This feature ensures your infrastructure modules are reliable and functional by automatically testing them when a Pull Request is created. It reduces the risk of broken modules reaching production and helps enforce testing as part of the review process.

## Common use case
1. When you [create a module](/docs/infra-as-code-management/iacm-features/module-registry/module-registry-creating) and open a [pull request (PR)](/docs/infra-as-code-management/pipelines/operations/pr-automation), it automatically triggers auto-generated testing pipelines
2. These pipelines run at the project level scope, when you select the **use module registry** option, your testing pipelines will run and test your module executing [the `init`, `plan`, `apply`, and `destroy` commands](/docs/infra-as-code-management/pipelines/terraform-plugins).
3. Upon successful test completion, your PR can proceed with the merge process

## Types of testing pipelines
As part of module registry testing, Harness creates two default pipelines per module:

<Tabs>
<TabItem value="Integration testing pipeline">

Integration testing verifies your module by:
- Creating real infrastructure
- Testing functionality
- Destroying the infrastructure

:::info example folder
Integration testing will use your repository's `examples/` folder.
:::

#### File structure
To enable integration testing, your module repository must include an `examples/` folder. Each test case should be in a separate subfolder, containing standard Terraform code (`main.tf`, `variables.tf`, `outputs.tf`, etc.).

```markdown
module-repository/
├── main.tf # Main module code
├── variables.tf
├── outputs.tf
├── examples/ # REQUIRED FOR INTEGRATION TESTING
│ ├── basic-example/ # Test case 1
│ │ ├── main.tf
│ │ ├── variables.tf (Optional)
│ │ └── outputs.tf (Optional)
│ └── advanced-example/ # Test case 2
│ ├── main.tf
│ ├── variables.tf (Optional)
│ └── outputs.tf (Optional)
└── README.md
```

The pipeline will execute the [`init → plan → apply → destroy` commands](/docs/infra-as-code-management/pipelines/terraform-plugins) against your `main.tf` file in each subfolder.
</TabItem>
<TabItem value="Tofu/Terraform testing pipeline">

Tofu/Terraform testing requires at least one of the following (and also supports both):
- A `tests/` folder with a `test.tftest.hcl` file
- A root-level `test.tftest.hcl` file

:::info requirements
- Do not use a workspace in testing pipelines. This will cause execution to fail.
- `moduleId: <+input>` must be configured as a runtime input in your pipeline.
:::

#### File structure

```markdown
module-repository/
├── main.tf
├── variables.tf
├── outputs.tf
├── test.tftest.hcl
├── tests/ # Required for Tofu/Terraform testing
│ ├── test.tftest.hcl
└── README.md 
```

:::warning ignored files
Files in other locations will be ignored.
:::
</TabItem>
</Tabs>
---

## Pipeline configuration

<Tabs>
<TabItem value="Pipeline configuration">
Key aspects of the testing pipelines:

1. Testing stage and steps:
- Each pipeline includes a dedicated testing stage with a single step designed for module testing.
- The step utilizes a custom plugin (`IACMModuleTestPlugin`) to execute module-specific tests.

2. Default testing pipeline:
- You can select a default testing pipeline for your module
- When a PR is created, your default pipeline automatically executes

:::info workspace restrictions
Workspaces cannot be used within a module testing pipeline. Attempting to use a workspace will result in the pipeline failing.
Instead, Harness leverages the `moduleId` input to identify and test the specific module. This approach ensures precise targeting of modules during testing.
:::

3. Using the `moduleId` input:
- The `moduleId` is passed automatically as part of the pipeline execution via webhooks set up during the module configuration process.
- The `moduleId` is defined in the pipeline as a dynamic input using the `<+input>` expression. This allows for flexible and reusable pipeline configurations tailored to different modules.
</TabItem>
<TabItem value="YAML">

The following YAML configuration demonstrates how to set up a testing pipeline using the `moduleId: <+input>` expression. This dynamic input ensures the pipeline targets the correct module during execution.

```yaml
pipeline:
  name: iacm_integration_testing
  identifier: iacm_integration_testing
  projectIdentifier: project_77777
  orgIdentifier: org_66666
  description: Testing pipeline used for module testing using integration-test
  stages:
    - stage:
        name: testing
        identifier: testing
        type: IACM
        spec:
          platform:
            os: Linux
            arch: Amd64
          runtime:
            type: Cloud
            spec: {}
          moduleId: <+input>
          execution:
            steps:
              - step:
                  type: IACMModuleTestPlugin
                  name: IACMModuleTestPlugin_1
                  identifier: IACMModuleTestPlugin_1
                  spec:
                    command: integration-test
                  timeout: 100m
```

:::info key highlights
- `moduleId: <+input>`: This dynamic input allows the pipeline to adapt to the specific module being tested. It is passed automatically via webhooks during setup.
- `IACMModuleTestPlugin`: A custom plugin step that executes the `integration-test` command to ensure module-specific test coverage.
- **Timeout:** Configured with a 100-minute timeout to accommodate extended test durations.
:::

</TabItem>
</Tabs>

### Branch configuration
When defining a module while [registering it in the module registry](/docs/infra-as-code-management/iacm-features/module-registry/#register-a-module), you configure a target branch. Any PRs created against this configured branch will trigger the associated testing pipelines.

## Selecting a connector
When setting up integration testing, you must select a connector. This is necessary because:
- Integration tests create and destroy real infrastructure
- The connector provides the necessary credentials and access

:::tip credit usage
Important note about credits:
- Module testing pipelines do not consume workspace credits
- If you use your own custom pipelines with workspaces instead of the testing pipelines, they will consume credits
- If you define your own pipeline but do not use Harness-provided testing steps (e.g., you include a workspace stage), your pipeline **will consume credits**.
- To avoid this, use the provided **Testing**, **Integration Testing**, or **Tofu/Terraform Testing** steps when building custom pipelines.
:::

| Scenario                                                          | Credit Usage                           |
| ----------------------------------------------------------------- | -------------------------------------- |
| Default testing pipelines or Custom pipelines using Harness steps | No credits consumed :white_check_mark: |
| Custom pipelines using workspaces                                 | Credits consumed :x:                   |


## Using module testing
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
---

## Get started today
Ready to improve your module quality and reliability? Follow these next steps:

1. **Set up your repository structure** using the patterns shown above
2. [**Configure module testing**](#configure-module-testing) in your Harness IaCM account
3. **Create your first PR** to see automated testing in action

By implementing module testing, you'll catch issues earlier, ensure consistent behavior across environments, and build confidence in your infrastructure modules.