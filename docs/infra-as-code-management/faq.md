---
title: IaCM FAQs
description: Frequently asked questions about IaCM
sidebar_position: 100
sidebar_label: FAQs
---

## Workspace-related questions

<details>
    <summary>Can we use multiple workspaces in a single stage?</summary>

    No, a single stage is limited to one workspace. However, a pipeline can include multiple stages, and each stage can be configured to reference a different workspace. This allows you to structure your pipeline to handle multiple workspaces by chaining stages, each performing specific tasks on its assigned workspace.

</details>

## Cost-related questions

<details>
    <summary>Can drift detection incur additional costs?</summary>

    No, usage charges are only incurred when an `apply` changes resources. The `plan` command and drift detection are free.

</details>

## Module registry-related questions

<details>
    <summary>Can the same module be used with OpenTofu and Terraform?</summary>

    Yes, modules are agnostic and can be used with either an OpenTofu or Terraform provisioner.

</details>

## Drift detection questions

<details>
    <summary>Does drift detection behave the same for OpenTofu and Terraform?</summary>

    No, drift detection behaves differently for OpenTofu and Terraform.

    Harness uses OpenTofu's `tofu plan -refresh-only` for drift detection, which is more sensitive to any changes outside of OpenTofu—including metadata like `updated_at`—and treats all such changes as drift. This is by design in OpenTofu. In contrast, a normal `tofu plan` (and its Harness Step) only reports changes that affect your actual infrastructure, ignoring irrelevant differences. This means drift detection with OpenTofu may show more changes than you might expect, but these are set by OpenTofu’s approach.

</details>

## Remote backend question

<details>
    <summary>Does Harness support the `cloud {}` configuration block?</summary>

    No. Harness IaCM currently supports remote state management using the `http` backend, not the `cloud` block.
    The `cloud` configuration was originally designed for Terraform Cloud/Enterprise and retained in OpenTofu for backward compatibility.

    To work with Harness IaCM workspaces via the CLI, use the `harness iacm` commands or configure an `http` backend that points to your workspace.
    
    If you want to inspect or modify state files locally, you can:
    - Create a temporary backend.tf file with the HTTP backend configuration.
    - Add the file to .gitignore to prevent conflicts with pipeline runs.
    - Remove the file after inspection to avoid breaking speculative plan pipelines.

</details>
