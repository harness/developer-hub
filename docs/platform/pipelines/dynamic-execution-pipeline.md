---
title: Dynamic execution of Pipelines
description: You can dynamically execute pipelines in Harness.
---

Dynamic execution of Pipelines allows you to execute pipelines by providing pipeline YAML configuration during runtime without requiring pre-saved configurations in Harness. Essentially, Harness is being used as a pure execution engine, while an external system within the ecosystem handles YAML creation and editing. This is particularly useful when pipelines are dynamically generated based on user actions. At the same time, it enables seamless integration with the existing ecosystem while maintaining Harness's robust security and governance controls.

## Pre-Requisites

### Account and Pipeline Level Setting

:::info note
Currently, this setting is behind the Feature Flag `PIPE_DYNAMIC_PIPELINES_EXECUTION`. Contact [Harness Support](mailto:support@harness.io) to enable this Feature Flag.
:::

You need to enable two settings at Account and Pipeline level before starting with Dynamic execution of Pipelines:-

1. Account Level Setting

Navigate to **Account Setting** -> **Default Settings** -> **Pipeline** -> Enable **Allow Dynamic Execution for Pipelines**

![](./static/account-settings-dynamic-execution.png)

2. Pipeline Level Setting 

:::info note
Pipeline Setting for dynamic execution will only be visible once you enable the above Account Setting.
:::

Once you have enabled the above Account Setting, you need to enable the Pipeline level setting for Dynamically executing the Pipeline:-

Navigate to **Advanced Options** -> **Dynamic Execution Settings (optional)** -> **Enable Allow Dynamic Execution for Pipeline**

![](./static/pipeline-setting-dynamic-execution.png)

### Permissions

Users need both [**Edit and Execute**](/docs/platform/role-based-access-control/add-manage-roles.md) permissions on the Pipelines.

### YAML Configuration

:::info note
Dynamic execution of Pipeline is only supported via an API not through UI.
:::

You need to provide valid YAML configuration provided through Dynamic Execution API.



## Dynamic Execution API

## What's Supported 

Dynamically executing pipelines support usage of following features:-

1. Template resolution at runtime
2. Expression resolution
3. Services and environments
4. Secrets and connectors
5. OPA policy enforcement

## Limitations

Dynamically executing pipelines doesn't support following features:-

1. Input sets
2. Selective stage Execution
3. Retry/Re-Run capability
4. Automatic Triggers
5. Post Production Rollback





