---
title: Test a Module
description: Set up automated integration and Tofu/Terraform testing pipelines for your Harness IaCM Module Registry modules to catch issues before teams adopt new versions.
sidebar_position: 70
sidebar_label: Test a Module
keywords:
  - IaCM
  - Module Registry
  - module testing
  - integration testing
  - Terraform testing
  - OpenTofu testing
  - testing pipeline
tags:
  - IaCM
  - registry
redirect_from: /docs/infra-as-code-management/iacm-features/module-registry/module-registry-testing
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

Test module changes before teams adopt new versions. Harness Module Registry supports integration testing and native OpenTofu/Terraform testing through automated testing pipelines.

Integration testing provisions real infrastructure and destroys it after the test. OpenTofu/Terraform testing runs native test files against the module.

:::note
Setting up module testing does not run a test. Testing pipelines run when a pull request targets the configured branch or when you trigger a pipeline manually.
:::

---

## Before you begin

- **Registered module**: A module registered in the Harness IaCM Module Registry. Go to [Register a Module](/docs/infra-as-code-management/registry/module-registry) to register a module.
- **Harness project access**: Execute permissions on IaCM pipelines. Go to [RBAC in Harness](/docs/platform/role-based-access-control/rbac-in-harness) to configure roles.
- **Cloud provider connector** (integration testing only): A connector with credentials to create and destroy real infrastructure. Go to [Add an AWS connector](/docs/platform/connectors/cloud-providers/add-aws-connector) to set up a connector.

---

## Choose a testing method

<Tabs>
<TabItem value="integration" label="Integration testing" default>

Integration testing validates your module against real infrastructure. Harness runs `init → plan → apply → destroy` for each example in the module's `examples/` directory.

### Add integration test cases

To enable integration testing, add an `examples/` directory to your module repository. Each subdirectory represents a test case and should contain a valid OpenTofu or Terraform configuration:

```
module-repository/
├── main.tf
├── variables.tf
├── outputs.tf
├── examples/              # Required for integration testing
│   ├── basic-example/     # Test case 1
│   │   ├── main.tf
│   │   ├── variables.tf   # Optional
│   │   └── outputs.tf     # Optional
│   └── advanced-example/  # Test case 2
│       ├── main.tf
│       ├── variables.tf   # Optional
│       └── outputs.tf     # Optional
└── README.md
```

:::info Examples directory
Integration testing runs once for each subdirectory in `examples/`. If the `examples/` directory is absent or contains no subdirectories, there are no integration test cases to run.
:::

</TabItem>
<TabItem value="tofu-terraform" label="OpenTofu/Terraform testing">

OpenTofu/Terraform testing runs the native test framework using `*.tftest.hcl` or `*.tftest.json` files. Place test files at the module root or in the `tests/` directory.

### Add native OpenTofu/Terraform tests

```
module-repository/
├── main.tf
├── variables.tf
├── outputs.tf
├── test.tftest.hcl        # Root-level test file (optional)
├── tests/                 # Required for OpenTofu/Terraform testing
│   └── test.tftest.hcl
└── README.md
```

:::warning Ignored files
Test files in locations other than the module root or the `tests/` directory are ignored.
:::

</TabItem>
</Tabs>

---

## Configure the target branch

Module testing uses the target branch configured when you register the module. A pull request targeting that branch triggers the module's configured testing pipelines. Go to [Register a Module](/docs/infra-as-code-management/registry/module-registry) to set the target branch.

---

## How module testing works

A pull request against the configured branch triggers the testing pipeline through a webhook. The pipeline runs the `IACM Module Test` step and returns a pass or fail result for the module version.

The testing pipeline receives the module's `moduleId` as a runtime input through the webhook. In the pipeline YAML, `moduleId` is defined as `<+input>`, which makes the pipeline reusable across modules.

### Example pipeline YAML

The testing pipeline receives the module ID as a runtime input. In this example, `IACM Module Test` runs the `integration-test` command:

```yaml
pipeline:
  name: iacm_integration_testing
  identifier: iacm_integration_testing
  projectIdentifier: project_77777
  orgIdentifier: org_66666
  description: Testing pipeline for module testing using integration-test
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

:::warning
Provisioning workspaces are not supported in module testing pipelines. Use the `moduleId` runtime input to identify the module under test. Adding a provisioning workspace stage causes execution to fail.
:::

---

## Requirements

**Integration testing** requires a cloud provider connector. Integration tests create and destroy real infrastructure, so the connector provides the credentials required to provision the test resources.

**OpenTofu/Terraform testing** requires selecting a provisioner and version during setup (for example, **OpenTofu 1.9.0**). No cloud provider connector is required.

---

## Set up module testing

Set up testing from the **Test Executions** tab of the module you want to test. The setup wizard is titled **Module Registry Testing Setup**.

<Tabs>
<TabItem value="interactive" label="Interactive guide" default>

<DocVideo src="https://app.tango.us/app/embed/b8ed4345-45b1-4b68-b3ff-09ed5ecc04d1?skipCover=false&defaultListView=false&skipBranding=false&makeViewOnly=false&hideAuthorAndDetails=true" title="Automated Module Registry Testing with Harness IaCM" />

</TabItem>
<TabItem value="step-by-step" label="Step-by-step">

1. From the IaCM Module Registry, select a module.
2. Select the **Test Executions** tab, then click **Set up Module testing**.
3. In the **Organization and Project** step, select an organization and project, then click **Next**.
4. In the **Testing workspaces** step, select a cloud provider connector and your provisioner and version, for example, **OpenTofu 1.9.0**, then click **Next**.

   :::note
   This step configures the connector and provisioner settings the test pipelines use. It does not create a provisioning workspace.
   :::

5. In the **Testing Pipeline** step, select your default pipelines to run against pull requests.
   - By default, an **Integration test** (`iacm_auto_generated_integration_testing`) and an **OpenTofu/Terraform test** (`iacm_auto_generated_tofu_testing`) pipeline are created for you.
6. Select **Finish**.

</TabItem>
<TabItem value="custom" label="Custom pipeline setup">

To create a custom module testing pipeline:

1. Navigate to **Pipelines**, then click **Create**.
2. Add a **Testing** stage and select **Integration Testing** or **OpenTofu/Terraform Testing**.
3. Use the **IACM Module Test** step to run tests against the module.
4. Set `moduleId` as a runtime input (`<+input>`) so the pipeline can be reused across modules.
5. Do not add provisioning workspace stages. Provisioning workspaces are not supported in module testing pipelines.

:::info Credit usage
Pipelines using Harness testing steps do not consume credits. Custom logic using workspaces will.
:::

</TabItem>
</Tabs>

---

## Credit usage

:::tip
Harness-provided module testing pipelines do not consume workspace credits. Custom pipelines that use workspaces do consume credits.
:::

| Scenario | Credit usage |
| --- | --- |
| Default testing pipelines or custom pipelines using Harness steps | No credits consumed |
| Custom pipelines using workspaces | Credits consumed |

---

## Troubleshooting

<Troubleshoot
  issue="The module testing pipeline does not trigger when a pull request is opened against the configured branch in Harness IaCM"
  mode="general"
  fallback="Confirm that the PR targets the exact branch configured during testing setup. Also verify that the webhook trigger is active on the testing pipeline by navigating to the pipeline's Triggers tab. If the trigger is missing or shows a Failed status, re-run the Module Registry Testing Setup wizard to recreate it."
/>

<Troubleshoot
  issue="The IACM Module Test step fails with a missing or invalid moduleId in Harness IaCM"
  mode="general"
  fallback="The testing pipeline receives moduleId as a runtime input from the webhook trigger. Confirm that moduleId is defined as <+input> in the pipeline YAML and that you have not hardcoded a value. Do not add a provisioning workspace stage to the testing pipeline — this is not supported and causes execution to fail."
/>

<Troubleshoot
  issue="Integration tests fail during the apply step when testing a Harness IaCM module"
  mode="general"
  fallback="Confirm that the cloud provider connector has sufficient permissions to create and destroy the resources defined in the examples/ directory. Each subdirectory in examples/ is treated as an independent test case. Check the pipeline execution logs for the specific resource error and verify that the connector credentials are valid."
/>

---

## Next steps

- Go to [PR automation](/docs/infra-as-code-management/pipelines/operations/pr-automation) to create a PR and see automated testing in action.
- Go to [Manage Version Lifecycle](/docs/infra-as-code-management/registry/module-registry/module-version-lifecycle-management) to manage the lifecycle of tested versions.
- Go to [Govern Module Usage](/docs/infra-as-code-management/registry/module-registry/module-governance) to apply OPA policies controlling which modules and versions teams can use.
