---
title: IaCM FAQs
description: Frequently asked questions about IaCM
sidebar_position: 80
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

    No, only the `apply` command incurs charges. The `plan` command and drift detection are free.
</details>

## Module registry-related questions
<details>
    <summary>Can the same module be used with OpenTofu and Terraform?</summary>

    Yes, modules are agnostic and can be used with either an OpenTofu or Terraform provisioner.
</details>