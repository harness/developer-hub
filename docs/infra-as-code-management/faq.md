---
title: IaCM FAQs
description: Frequently asked questions about IaCM
sidebar_position: 80
sidebar_label: FAQs
---

## Workspace-related questions
<details>
    <summary>Can we use multiple workspaces in a single stage?</summary>

    Yes, multiple workspaces can be used in a single stage. This feature is behind a feature flag enabled by default. If it’s not accessible, contact Harness Support to enable it.
</details>

## Cost-related questions
<details>
    <summary>Can drift detection incur additional costs?</summary>

    No, only the `apply` command incurs charges. The `plan` command and drift detection are free.
</details>

## Module registry-related questions
<details>
    <summary>Can the same module be used with OpenTofu and Terraform?</summary>

    Yes, modules are agnostic and can be used with either an OpenTofu or Terraform provisioner.
</details>