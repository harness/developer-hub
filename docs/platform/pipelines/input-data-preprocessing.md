---
title: Input Data Pre-processing for Pipeline
description: You can control the pre-processing of input data
---

As a user, you can control the pre-processing of input data, allowing you to manage how empty values are handled in the background. In the normal case, when you provide an empty value `""` as your input, it will be converted into `<+input>` in the background.

Let's take an example where you are running a pipeline via an input set:-

In this example, we have not provided any value to the input:-
```yaml
inputSet:
  name: input
  tags: {}
  identifier: input
  orgIdentifier: default
  projectIdentifier: Samples
  pipeline:
    identifier: test_expression
    variables:
      - name: var_config
        type: String
        value: ""
```
Now, when we run the pipeline and check the compiled yaml after the execution it would have taken it as `<+input>`.
If you have saved your Input Set in Git and if you check the yaml saved in Git, it will would have taken the value of the variable as `<+input>`.

![](./static/compiled_yaml_processing.png)

As a user, you might want more control over how these empty values are handled, especially in cases where you want the string to remain empty. To handle this behavior Harness provides an optio **Save Blank Fields as Empty String**.

With this option checked, the empty string `""` remains as-is throughout the pipeline execution process. This ensures that the YAML and the visual view are consistent with the final payload sent during execution.

For instance, if you want **var_config** to remain an empty string, enabling Raw Mode will prevent it from being converted to `<+input>`.

This ensures that the input remains exactly as specified, providing you with precise control over your pipeline configurations.


## How to enable this feature?

:::info note
Currently this feature is behind feature flag `CDS_ENABLE_RAW_MODE`. Contact [Harness Support](mailto:support@harness.io) to enable the feature.
:::

You need to enable following settings at account level to use this feature:

1. **Show checkbox to Save Blank Fields as Empty String** - This setting, when enabled, will show the checkbox **Save Blank Fields as Empty String** both while creating the Input Set and during Pipeline runform.
2. **Default value of Blank Fields as Empty String** - When enabled, this setting will automatically select the checkbox **Save Blank Fields as Empty String** by default.

![](./static/blank_field_as_empty_account_setting.png)

## Detailed Behavior Changes

### If Save Blank Fields as Empty String is not enabled (Current Behavior)

- **Creating Input Sets**:
   - **Initial Load**: On load `<+input>` is converted into `""`.
   - **Saving**: On Save, `""` is converted into`<+input>`.

- **Updating Input Sets**:
  - **Initial Load**: On Load, `<+input>` is converted into `""`.
  - **Saving**: On Save, `""` is converted into `<+input>`.

- **Run Pipeline form with Input Set**:
  - **Initial Load**: On Load, `<+input>` is converted into `""`.
  - **Execution**: On Run, `""` stays `<+input>`.

- **Run Pipeline without Input Set**:
  - **Initial Load**: On Load, `<+input>` is changed to `""`.
  - **Execution**: `""` stays `""`.

### If Save Blank Fields as Empty String is enabled

- **Creating Input Sets**:
   - **Initial Load**: On load `<+input>` is converted into `""`
   - **Saving**: On Save, `""` stays `""` and `<+input>` stays `<+input>`.

- **Updating Input Sets**:
  - **Initial Load**: On Load, `<+input>` stays `<+input>`, `""` stays `""`.
  - **Saving**: On Save, `<+input>` stays `<+input>`, `""` stays `""`.

![](./static/blank_field_as_empty_string_input_set.png)

- **Run Pipeline form with Input Set**:
  - **Initial Load**: On Load, `<+input>` stays `<+input>`, `""` stays `""`.
  - **Execution**: On Run, `<+input>` stays` <+input>`, `""` stays `""`.

- **Run Pipeline without Input Set**:
  - **Initial Load**: On Load, `<+input>` is changed to `""`.
  - **Execution**: `""` stays `""`.

![](./static/blank_field_as_empty_runtime.png)