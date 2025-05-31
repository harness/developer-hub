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

<details>
    <summary>Is there a way to increase the session duration for the assumed role on the IACM pod??</summary>

    Yes, there is an environment variable available that can be used to increase the session duration for the assumed role on the IACM pod. You can try setting the following environment variable in your Terraform workspace:
    ```
    PLUGIN_AWS_SESSION_DURATION=30m
    ```
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
