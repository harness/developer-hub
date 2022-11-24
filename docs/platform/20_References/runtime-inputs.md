---
title: Fixed Values, Runtime Inputs, and Expressions
description: Most settings in Harness Pipelines allow you to use Fixed Values, Runtime Inputs, and Expressions. This topic describes each of these options. Fixed Values. Fixed Values are simply values that you en…
# sidebar_position: 2
helpdocs_topic_id: f6yobn7iq0
helpdocs_category_id: fb16ljb8lu
helpdocs_is_private: false
helpdocs_is_published: true
---

Most settings in Harness Pipelines allow you to use Fixed Values, Runtime Inputs, and Expressions.

![](https://files.helpdocs.io/i5nl071jo5/articles/f6yobn7iq0/1632343764491/clean-shot-2021-09-22-at-13-49-02.png)This topic describes each of these options.

### Fixed Values

Fixed Values are simply values that you enter manually when you configure a setting and do not change at runtime.

These are settings you don't need to change based on some other step or runtime operation.

For example, here'a a **Timeout** setting:

![](https://files.helpdocs.io/i5nl071jo5/articles/f6yobn7iq0/1632343921363/clean-shot-2021-09-22-at-13-51-50.png)You can enter a value for this setting such as `10m 30s`. That value is fixed and nothing that happens at runtime will change it.

### Runtime Inputs

When you use Runtime Inputs, you are setting placeholders for values that will be provided when you start a Pipeline execution.

![](https://files.helpdocs.io/i5nl071jo5/articles/f6yobn7iq0/1622673970519/image.png)You can template (or templatize) your Pipeline using Runtime Inputs, enabling users to select different values for each execution. For example, you can turn the Infrastructure Definition settings into Runtime Inputs and have users provide Dev, QA, and Prod values with each execution.

This templating is different from the Harness Template Library feature.Furthermore, you can create Input Sets for the Runtime Inputs. Harness Input Sets are collections of runtime variables and values that can be provided to Pipelines before execution. You set up Input Sets for different Pipeline uses cases, and then simply select the Input Set you want to use at runtime.

See [Run Pipelines using Input Sets and Overlays](/article/gfk52g74xt-run-pipelines-using-input-sets-and-overlays).

Sometimes, the inputs and settings for all of the stages in a Pipeline aren't known before you deploy. Some inputs and settings can depend on the execution of the previous stages in the Pipeline.

For example, you might have an Approval step as part of the stage or Pipeline. Once the approval is received, you want to resume the next stage of the Pipeline execution by providing new inputs.

To do this, when you add certain stage settings to your Pipeline, use Runtime Inputs.

#### How Do Runtime Inputs Work?

You select Runtime Input as the option for a setting.

The Runtime Input is identified using the expression `<+input>`.

When you run a Pipeline, you provide the value for the input.

You can enter a value for the variable or use a Harness expression.

Later, if you choose to rerun a Pipeline, the Pipeline will run using the Runtime Inputs you provided the last time it ran.

#### Use Runtime Inputs in a Stage or Pipeline

Using Runtime Inputs templates some or all of a stage or Pipeline's settings. The same Pipeline can be run using different values for all of the Runtime Inputs.

#### CI Example

You can use Runtime Inputs in a CI stage's Infrastructure. Here's an example using a Runtime Input in the **Namespace** setting.

![](https://files.helpdocs.io/i5nl071jo5/articles/f6yobn7iq0/1613423003147/image.png)#### CD Example

You can use Runtime Inputs for the Service in a CD stage's Service settings.

![](https://files.helpdocs.io/i5nl071jo5/articles/f6yobn7iq0/1613423253137/image.png)### Using Runtime Inputs During Execution

Currently, this feature is behind the feature flag `NG_EXECUTION_INPUT`. Contact [Harness Support](mailto:support@harness.io) to enable the feature.You can add runtime input to a pipeline that runs when a stage or a step is executed. If a custom stage is setup for runtime input, you can enter a shell script when prompted by Harness during execution. If a Harness Approval step is setup for runtime input, when the pipeline executes, you can specify the Harness Groups that will approve that step.

#### Limitations and Requirements

The following limitations and requirements apply to this feature:

ServiceV2 and EnvironmentV2 are not supported for runtime input.

As a user, you must have the Pipeline Execute permission to be able to submit runtime input during execution.

#### Using Runtime Input During Execution With a Shell Script

If a runtime input was specified for a step with execution input, you are prompted to enter the values before the step begins. Harness prompts you for values in the Step details. The Pipeline runs when the values are entered.

When you create a pipeline with a custom stage, add a variable to the step and select **Running input**. To specify an input as runtime input during execution, add the following to the input by substituting the value within the quotes:

`<+input>.default("abc").runtimeInput()`

The **Value** field is populated with <+input>.

In the **Configure Options** window, click the checkbox for **Request input value when the stage/step is being executed** and click **Submit**.

![](https://files.helpdocs.io/kw8ldg1itf/articles/f6yobn7iq0/1661366460035/runtime-configure-options.png)In **Execution**, click **Add Step for a Shell Script**, select **Shell Script**, and add a name for the shell script. In the **Script** window, add the variable that was created. For example:

`<<stage.variables.Variable1>`

![](https://files.helpdocs.io/kw8ldg1itf/articles/f6yobn7iq0/1661372201923/runtime-shell-script.png)Save and run the pipeline.

#### Using Runtime Input with an Approval Step

To add a runtime input with an Approval step, create a new pipeline, add an Approval stage, and click Set Up Stage.

In the workflow for Execution, click **Approval**.

In **Manual Approval**, enter a name for this step.

![](https://files.helpdocs.io/kw8ldg1itf/articles/f6yobn7iq0/1661372425283/runtime-manual-approval.png)For Approvers, click **User Groups** and select **Runtime input**.

Click the settings icon for **User Groups**.

In **Configure Options**, select **Request input value** when the stage/step is being executed, and click **Submit**.

Save the pipeline and run it for the approval step.

### Expressions

With Expressions you can use Harness input, output, and execution variables in a setting.

All of these variables represent settings and values in the Pipeline before and during execution.

See [Built-in Harness Variables Reference](/article/lml71vhsim-harness-variables).

When you select **Expression**, you type `<+` and a value and the list of available variables appears.

![](https://files.helpdocs.io/i5nl071jo5/articles/f6yobn7iq0/1632344509541/clean-shot-2021-09-22-at-14-01-37.png)Simply click a variable name to use it as the value for this setting.

At runtime, Harness will replace the variable with the runtime value.

### See Also

* [Platform Technical Reference](/category/akr4ga1dfq-platform-technical-reference)

