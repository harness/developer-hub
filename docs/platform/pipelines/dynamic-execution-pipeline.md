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

Before you can execute pipelines dynamically, you need to enable two settings at both the **Account** and **Pipeline** levels.

1. Account Level Setting

Navigate to **Account Setting** -> **Default Settings** -> **Pipeline** -> Enable **Allow Dynamic Execution for Pipelines**

If you need to disable dynamic execution for the account, you can do so at any time by simply turning off this setting.


2. Pipeline Level Setting 

:::info note
The pipeline-level setting for dynamic execution will only be visible once the Account-Level Setting is enabled
:::

After enabling the account setting, you must enable the pipeline-level setting:

Navigate to **Advanced Options** -> **Dynamic Execution Settings (optional)** -> **Enable Allow Dynamic Execution for Pipeline**

![](./static/pipeline-setting-dynamic-execution.png)

### Permissions

Users need both [**Edit and Execute**](/docs/platform/role-based-access-control/add-manage-roles.md) permissions on the Pipelines.

### YAML Configuration

:::info note
Dynamic execution of pipelines is only supported via the [API](#dynamic-execution-api) and not through the UI.
:::

To execute a pipeline dynamically, you must provide a valid YAML configuration through the Dynamic Execution API.

## Dynamic Execution API

The Dynamic Execution API in Harness allows you to execute a pipeline dynamically by passing YAML configurations directly in the request body.

```curl
curl --location 'https://app.harness.io/gateway/pipeline/api/v1/orgs/default/projects/PROJECT_ID/pipelines/PIPELINE_ID/execute/dynamic' \
--header 'accept: */*' \
--header 'content-type: application/json' \
--header 'origin: https://app.harness.io' \
--header 'Harness-Account: ACCOUNT_ID' \
--header 'x-api-key: HARNESS_API_KEY' \
--data '{
    "yaml": ""
}'
```

Upon successful execution, the API returns the following response:

```json
{
    "execution_details": {
        "execution_id": "EXECUTION_ID",
        "status": "RUNNING"
    }
}
```
Once the API is triggered, you can monitor the pipeline execution in the Harness UI.

![](./static/dynamic-pipeline-execution-ui.png)

In the trigger summary you will see a message indicating **This was executed dynamically**. This confirms that the pipeline was triggered using the Dynamic Execution API.

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
6. Runtime Inputs





