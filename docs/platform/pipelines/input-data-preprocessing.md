---
title: Handle empty strings in input variables
sidebar_label: Handle Empty Strings in Input Variables
description: Understand how Harness handles empty strings in input variables and how the Save Blank Fields as Empty String settings keep a blank input variable as an empty string instead of null when you use an input set.
keywords:
  - input variable
  - empty string
  - blank fields
  - input set
  - raw mode
tags:
  - pipelines
  - input-variables
---

Harness handles a blank input variable differently depending on whether you run a pipeline with or without an input set. This topic explains the behavior and shows how to use the **Save Blank Fields as Empty String** setting to preserve empty string values consistently during pipeline execution.

---

## What will you learn in this topic?

- How [Harness handles a blank input variable](#how-harness-handles-blank-input-variables) with and without an input set.
- How to [enable Save Blank Fields as Empty String](#enable-the-save-blank-fields-as-empty-string-setting) with the account-level settings.
- How the pipeline behaves [before](#before-enabling-the-setting) and [after](#after-enabling-the-setting) enabling the setting.

---

## How Harness handles blank input variables

Consider the following pipeline:

```yaml
pipeline:
  name: Input_Pipeline
  identifier: Input_Pipeline
  projectIdentifier: test
  orgIdentifier: default
  tags: {}
  stages:
    - stage:
        name: custom
        identifier: custom
        description: ""
        type: Custom
        spec:
          execution:
            steps:
              - step:
                  type: ShellScript
                  name: ShellScript_1
                  identifier: ShellScript_1
                  spec:
                    shell: Bash
                    executionTarget: {}
                    source:
                      type: Inline
                      spec:
                        script: |
                          input_variable=<+pipeline.variables.input_variable>
                          echo "the value is:$input_variable"
                    environmentVariables: []
                    outputVariables: []
                  timeout: 10m
        tags: {}
  variables:
    - name: input_variable
      type: String
      description: ""
      required: false
      value: <+input>

```

This pipeline has an input variable called `input_variable` that you set at runtime. A simple script prints the value of `input_variable` so you can see whether it is passed as an **empty string** or as **null** when you leave it empty.

The pipeline also has an input set where the value of `input_variable` is left empty. For example:

```yaml
inputSet:
  name: input_set
  tags: {}
  identifier: input_set
  orgIdentifier: default
  projectIdentifier: test
  pipeline:
    identifier: Input_Pipeline
    variables:
      - name: input_variable
        type: String
        value: ""
```

---

## Before enabling the setting

The two ways of running a pipeline (without an input set and with an input set) behave differently.

### Run without an input set

If you run the pipeline without an input set and check the execution, you see this output:

<div align="center"><DocImage path={require('./static/without_input_set_runform.png')} alt="Execution output treating input_variable as empty when run without an input set" width="100%" /></div>

The output takes the value of `input_variable` as empty, which is expected because you provided an empty value for `input_variable` at runtime.

### Run with an input set

Now, run the pipeline using the input set `input_set`.

<div align="center"><DocImage path={require('./static/with_input_set_running.png')} alt="Running the pipeline with the input_set input set" width="100%" /></div>

If you run the pipeline using an input set and check the execution, you see this output:

<div align="center"><DocImage path={require('./static/with_input_set_runform.png')} alt="Execution output treating input_variable as null when run with an input set" width="100%" /></div>

The output treats `input_variable` as **null** when it is left empty.

Without the setting enabled, a blank value supplied through an input set is treated as `null` instead of an empty string. This difference can affect pipeline execution if downstream logic expects an empty string.

This happens because, when Harness saves an input set with an empty value for an input variable, or runs the pipeline with an input set that has an empty string value, it encodes the value as `<+input>`.

:::note
`<+input>` is treated as null in Harness.
:::

---

## Enable the Save Blank Fields as Empty String setting

To preserve blank string values during execution, enable **Save Blank Fields as Empty String**. When enabled, empty string values (`""`) remain unchanged instead of resolving to `null`.

:::note
This feature depends on the `CDS_ENABLE_RAW_MODE` feature flag. Contact [Harness Support](mailto:support@harness.io) to enable the feature.
:::

Enable the following account-level settings to use this feature. Both settings are available under **Account Settings** -> **General** -> **Default Settings** -> **Pipeline**.

- **Show checkbox to Save Blank Fields as Empty String** (`display_raw_mode_setting`): Displays the **Save Blank Fields as Empty String** checkbox when creating input sets, triggers, or running a pipeline. If disabled, the checkbox is hidden and blank fields continue to resolve as `null`.
- **Default Value of Blank Fields Checkbox** (`default_raw_mode_setting_value`): Selects the checkbox by default wherever it is available.

<div align="center"><DocImage path={require('./static/blank_field_as_empty_account_setting.png')} alt="Save Blank Fields as Empty String account-level settings" width="100%" /></div>

:::note
When Harness saves a blank String field as an empty string (`""`), it treats that empty string as a resolved value. As a result, an expression such as `<+expression.isResolved(<+pipeline.variables.input_variable>)>` returns `true` even when no value was entered. 

Harness cannot distinguish an intentionally empty string from a value that was never provided, so it cannot validate against empty strings during execution. 

To require an actual value, mark the variable as required instead of depending on an emptiness check. Go to [Check expression isResolved isUnresolved null replacement](/docs/platform/variables-and-expressions/harness-expressions-reference#check-expression-isresolved-isunresolved-null-replacement) to understand this evaluation.
:::

---

## After enabling the setting

This section uses the same example pipeline and input set from [How Harness handles blank input variables](#how-harness-handles-blank-input-variables).

After you enable the settings, a **Save Blank Fields as Empty String** checkbox appears when you create an input set. Select the checkbox and save the input set. This ensures that Harness treats a blank value as an empty string, not null.

<div align="center"><DocImage path={require('./static/save_blank_field_empty_input_set_creation.png')} alt="Save Blank Fields as Empty String checkbox shown while creating an input set" width="100%" /></div>

Run the pipeline again to see the change in both ways of running a pipeline.

### Run without an input set

A direct run (without an input set) already treats a blank input variable as an empty string, so this path is unaffected by the setting.

### Run with an input set

Now, run the pipeline using the input set `input_set` with the **Save Blank Fields as Empty String** checkbox enabled.

<div align="center"><DocImage path={require('./static/with_input_set_feature_enabled.png')} alt="Input set with the Save Blank Fields as Empty String checkbox enabled" width="100%" /></div>

If you run the pipeline using an input set and check the execution, you see this output:

<div align="center"><DocImage path={require('./static/with_input_set_running_feature_enabled.png')} alt="Execution output treating input_variable as an empty string after enabling the setting" width="100%" /></div>

In this case, the output treats `input_variable` as an **empty string** when it is left empty.

The pipeline now treats blank input values consistently as empty strings, regardless of whether you run it directly or through an input set.

---

## Next steps

- [Pipeline settings](/docs/platform/pipelines/pipeline-settings#save-blank-fields-as-empty-string-settings): Review the account-level settings reference.
- [Input sets and overlays](/docs/platform/pipelines/input-sets): Create reusable sets of runtime input values.
- [Use runtime input](/docs/platform/variables-and-expressions/runtime-input-usage): Understand how runtime input values are validated.