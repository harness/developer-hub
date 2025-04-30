---
title: Test Module Versions
description: Learn how to validate changes of modules to ensure the reliability and functionality of your modules.
sidebar_position: 50
---

<CTABanner
buttonText="Learn more"
  title="Coming soon!"
  tagline="Module Registry Testing is currently pending release and will be available soon!"
  link="/docs/infra-as-code-management/iacm-features/module-registry/"
  closable={true}
  target="_blank"
/>

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::warning
**Module registry testing** is currently **pending release** and will be available soon!
:::

Modern infrastructure development relies on reusable modules to ensure consistency and scalability. However, without proper testing, modules can create risks such as regression, breaking existing functionality, and introducing security vulnerabilities.

Harness simplifies module testing by automating the process, reducing potential errors, and increasing confidence in your infrastructure code across environments. 

## Types of testing pipelines
As part of module registry testing, Harness creates two default pipelines per module:

<Tabs>
<TabItem value="Integration testing pipeline">

Integration testing verifies your module by:
- Creating real infrastructure
- Testing functionality
- Destroying the infrastructure

:::info example folder
Integration testing iterates and runs tests for each example in the `examples/` folder.
:::

#### File structure
To enable integration testing, include an `examples/` folder in your module repository. Each subfolder should contain standard Terraform code (e.g., `main.tf`, `variables.tf`, `outputs.tf`).

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

Harness provides an out-of-the-box pipeline for integration testing that will execute the [`init → plan → apply → destroy` commands](/docs/infra-as-code-management/pipelines/terraform-plugins) against your `main.tf` file in each subfolder. If you require customization, you can amend the pipeline or select your own custom pipeline.
</TabItem>
<TabItem value="Tofu/Terraform testing pipeline">

Tofu/Terraform testing requires a `test.tftest.hcl` file either at the root level or within a `tests/` folder, as shown in the [file structure](#file-structure) below. 

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

**1. Testing stage and steps:**
  - Each testing pipeline includes a dedicated testing stage with a single step using the `IACM Module Test` plugin. The `moduleId` input is dynamically passed via webhooks, ensuring precise targeting of modules during testing.

**2. Default testing pipeline:**
  - You can select a default testing pipeline for your module
  - When a PR is created, your default pipeline automatically executes

:::info workspace restrictions
Workspaces are not supported in module testing pipelines and will cause execution to fail. 
Use the `moduleId` input instead for module-specific testing.
:::

**3. Using the `moduleId` input:**
    - The `moduleId` is passed automatically as part of the pipeline execution via webhooks set up during the module configuration process.
  - The `moduleId` is defined in the pipeline as a dynamic input using the `<+input>` expression. This allows for flexible and reusable pipeline configurations tailored to different modules.
</TabItem>
<TabItem value="YAML">

This YAML configuration demonstrates the use of ` moduleId: <+input>` as a dynamic input for module-specific testing. The `IACM Module Test` plugin step executes the `integration-test` command, ensuring comprehensive test coverage.

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
---

## Branch configuration
When defining a module while [registering it in the module registry](/docs/infra-as-code-management/iacm-features/module-registry/#register-a-module), you configure a target branch. Any PRs created against this configured branch will trigger the associated testing pipelines.

## Select a connector
If you choose to use integration testing, you must select a connector. This is necessary because:
- Integration tests create and destroy real infrastructure
- The connector provides the necessary credentials and access

## Credit Usage
:::tip avoid credit consumption
Testing pipelines using Harness-provided plugins (e.g., Integration Testing or Tofu/Terraform Testing) do not consume workspace credits. 

However, custom pipelines or the use of regular plugin steps against your workspace will consume credits.
:::

| Scenario                                                          | Credit Usage                           |
| ----------------------------------------------------------------- | -------------------------------------- |
| Default testing pipelines or Custom pipelines using Harness steps | No credits consumed :white_check_mark: |
| Custom pipelines using workspaces                                 | Credits consumed :x:                   |


## Use module testing
<Tabs>
<TabItem value="Interactive guide">
<DocVideo src="https://app.tango.us/app/embed/b8ed4345-45b1-4b68-b3ff-09ed5ecc04d1?skipCover=false&defaultListView=false&skipBranding=false&makeViewOnly=false&hideAuthorAndDetails=true" title="Automated Module Registry Testing with Harness IaCM" />
</TabItem>
<TabItem value="Step-by-step">

1. From the IaCM Module Registry page, select a module
2. Select the **Test Executions** tab
3. Select **Set up Module testing**
4. Select an **Organization** and **Project**, then select **Next**
5. Select a Cloud Provider Connector, then select **Apply selected**
6. Select your **Provisioner**, and **Version**, e.g. **OpenTofu 1.9.0**
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

1. **Set up your repository structure** using the examples above.
2. [**Configure module testing**](#configure-module-testing) in your Harness IaCM account
3. [**Create a PR**](/docs/infra-as-code-management/pipelines/operations/pr-automation) to see automated testing in action

By implementing module testing, you'll catch issues earlier, ensure consistent behavior across environments, and build confidence in your infrastructure modules.