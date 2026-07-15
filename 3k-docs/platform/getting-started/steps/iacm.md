---
title: Infrastructure as Code Steps
sidebar_label: IaCM Steps
description: Reference for IaCM step templates in Harness 3.0; Terraform, OpenTofu, TFLint, and Tofu Module Test for full infrastructure lifecycle management within pipelines.
sidebar_position: 5
---

Harness 3.0 provides native IaCM steps for Terraform and OpenTofu, enabling infrastructure provisioning directly within pipelines. These steps support the full lifecycle of infrastructure management — from planning and validation to deployment and teardown.

## Available IaCM steps

| Step | Template ID | Description |
|---|---|---|
| Terraform | `terraformStep@1.0.0` | Execute Terraform commands (init, plan, apply, destroy, and more) |
| OpenTofu | `openTofuStep@1.0.0` | Execute OpenTofu commands with full Terraform compatibility |
| TFLint | `tfLintStep@1.0.0` | Lint Terraform configurations for errors and best practice violations |
| Tofu Module Test | `tofuModuleTestStep@1.0.0` | Test OpenTofu modules for expected outputs and behavior |

---

## Terraform step

**Template:** `terraformStep@1.0.0` · Module: IaCM

Execute Terraform commands within your pipeline. Supports the full Terraform lifecycle including init, plan, apply, destroy, and more. Runs in the `plugins/harness_terraform_vm` container image.

### Supported commands

| Command | Description |
|---|---|
| `init` | Initialize Terraform working directory |
| `plan` | Create execution plan |
| `apply` | Apply changes to infrastructure |
| `destroy` | Destroy managed infrastructure |
| `plan-destroy` | Plan infrastructure destruction |
| `plan-refresh-only` | Plan with refresh only (no changes) |
| `apply-refresh-only` | Apply refresh only |
| `detect-drift` | Detect configuration drift |
| `validate` | Validate configuration files |
| `migrate-state` | Migrate state between backends |
| `import` | Import existing infrastructure |

### Inputs

| Input | Type | Required | Description |
|---|---|---|---|
| `command` | select | Yes | Terraform command to execute |
| `target` | array | No | Target resources (visible when `command=plan`) |
| `replace` | array | No | Resources to replace (visible when `command=plan`) |
| `import` | list (grid) | No | Import resources with ID and Address (visible when `command=import`) |
| `image` | string | No | Plugin image (default: `plugins/harness_terraform_vm`) |

### Provider authentication

The Terraform step automatically handles authentication for major cloud providers:

| Provider | Supported Methods |
|---|---|
| AWS | Access key, secret key, session token, assume role, OIDC |
| GCP | OIDC token, project ID, workload pool, service account |
| Azure | Client ID, tenant ID, client secret, client certificate |
| Git Repository | HTTP/SSH for remote state and modules |

:::tip Automatic Credential Injection
The Terraform step automatically inherits cloud provider credentials from connectors configured in your IaCM workspace. You don't need to manually pass AWS keys or GCP service accounts — they are injected as environment variables at runtime.
:::

### Examples

```yaml title="terraform-plan.yaml"
steps:
  - name: Terraform Plan
    uses: terraformStep@1.0.0
    with:
      command: plan
      target:
        - aws_instance.web
```

```yaml title="terraform-apply.yaml"
steps:
  - name: Terraform Apply
    uses: terraformStep@1.0.0
    with:
      command: apply
```

```yaml title="terraform-import.yaml"
steps:
  - name: Import Resources
    uses: terraformStep@1.0.0
    with:
      command: import
      import:
        - id: i-1234567890abcdef0
          address: aws_instance.web
```

```yaml title="terraform-drift.yaml"
steps:
  - name: Detect Drift
    uses: terraformStep@1.0.0
    with:
      command: detect-drift
```

---

## OpenTofu step

**Template:** `openTofuStep@1.0.0` · Module: IaCM

Execute OpenTofu commands within your pipeline. OpenTofu is the open-source fork of Terraform and is fully compatible with Terraform configurations.

The OpenTofu step mirrors the Terraform step interface — same supported commands, same inputs, same cloud provider authentication. It uses a different plugin image optimized for OpenTofu.

```yaml title="opentofu-plan-apply.yaml"
steps:
  - name: OpenTofu Plan
    uses: openTofuStep@1.0.0
    with:
      command: plan
  - name: OpenTofu Apply
    uses: openTofuStep@1.0.0
    with:
      command: apply
```

:::tip Migrating Between Terraform and OpenTofu
OpenTofu and Terraform steps share the same interface. Migrating between them requires only changing the step template reference — no changes to inputs or configuration.
:::

---

## TFLint step

**Template:** `tfLintStep@1.0.0` · Module: IaCM

Run TFLint to lint Terraform configurations for potential errors, best practice violations, and deprecated syntax. Best used before plan and apply steps to catch issues early.

```yaml title="tflint.yaml"
steps:
  - name: Lint Terraform
    uses: tfLintStep@1.0.0
```

---

## Tofu module test step

**Template:** `tofuModuleTestStep@1.0.0` · Module: IaCM

Test OpenTofu modules to verify they produce expected outputs and behavior.

```yaml title="tofu-module-test.yaml"
steps:
  - name: Test Module
    uses: tofuModuleTestStep@1.0.0
```

---

## Complete IaCM pipeline example

A typical IaCM pipeline follows the pattern: **Lint → Plan → Approve → Apply**. Use the TFLint step first, then Terraform/OpenTofu plan, add an approval gate, and finally apply.

```yaml title="iacm-pipeline.yaml"
pipeline:
  stages:
    - name: Infrastructure
      spec:
        steps:
          - name: Lint
            uses: tfLintStep@1.0.0
          - name: Plan
            uses: terraformStep@1.0.0
            with:
              command: plan
          - name: Approval
            type: approval
            spec:
              type: harness
              message: "Review Terraform plan before applying"
          - name: Apply
            uses: terraformStep@1.0.0
            with:
              command: apply
```