---
title: Built-in and custom Harness variables reference
description: List of default (built-in) Harness expressions.
sidebar_position: 20
helpdocs_topic_id: lml71vhsim
helpdocs_category_id: dr1dwvwa54
helpdocs_is_private: false
helpdocs_is_published: true
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

For most settings in Harness pipelines, you can use [fixed values, runtime inputs, or expressions](./runtime-inputs.md).

You can use expressions (also called Harness expressions, variable expressions, or sometimes Harness variables) to reference Harness input, output, and execution variables. These variables represent settings and values that exist in the pipeline before and during execution. These can include environment variables, secrets, pipeline/stage/step identifiers, and more.

This topic describes some built-in and custom Harness expressions, as well as the prefixes used to identify user-created variables.

Expressions are powerful and offer many options for modification or interaction. For more information about using expressions, go to:

* [Write expressions using any JSON parser tool](./expression-v2.md)
* [Use Java string methods](./expressions-java-methods.md)
* [Expression status type reference](./status-type-reference.md)
* [Add variables](./add-a-variable.md)

## What is a Harness variable expression?

Harness variable expressions refer to a value in Harness, such as an entity name or a configuration setting. At pipeline runtime, Harness evaluates any expressions present in the pipeline and replaces them with the resolved value.

For example, the expression `<+pipeline.name>` resolves to name of the pipeline where you're using that expression.

**Harness variables are powerful because they enable templatizing of configuration information, pipeline settings, values in scripts, and more. They also enable your pipelines to pass information between stages and settings.**


:::important limitation
Pipelines won't run if the default value of variables start with `*`. You can use `*` within `" "` as a workaround.
:::


## Expression usage

Harness variables are declared as expressions using the expression delimiter `<+...>`, such as `<+pipeline.name>` or `<+secrets.getValue("someSecret")>`.

<Tabs>
  <TabItem value="Visual" label="Visual">

In the Pipeline Studio's Visual Editor, you can use the **Value type selector** to select **Expression**.

![](./static/runtime-inputs-03.png)

Harness provides suggestions for built-in expressions as you type. You can manually trigger the suggestions by placing your cursor after `<+` and pressing `ctrl + space`.

![](./static/runtime-inputs-10.png)

In free-text fields, such as **Command**, you can directly enter values using the appropriate syntax without changing the value type.

![](./static/runtime-inputs-12.png)

You can continue typing or select the expression from the list of suggestions.

</TabItem>
  <TabItem value="YAML" label="YAML" default>

When writing pipelines in YAML, enter the expression as the value for a field.

For example, this expression references a [pipeline variable](./add-a-variable.md) named `myConnector`.

```
          connectorRef: <+pipeline.variables.myConnector>
```

When you type `<+`, Harness provides suggestions for built-in expressions as you type. You can manually trigger the suggestions by placing your cursor after `<+` and pressing `ctrl + space`.

![](./static/runtime-inputs-13.png)

You can continue typing or select the expression from the list of suggestions.

</TabItem>
</Tabs>

Mechanically, Harness passes the content within the delimiter (`<+...>`) to the [Java Expression Language (JEXL)](http://commons.apache.org/proper/commons-jexl/) for evaluation.

You can [use JEXL methods to build complex variable expressions](./expression-v2.md). For example, here is a complex expression that uses information from a [webhook trigger](/docs/platform/triggers/triggers-reference.md) payload:

```
<+<+trigger.payload.pull_request.diff_url>.contains("triggerNgDemo")> || <+trigger.payload.repository.owner.name> == "wings-software"
```

Harness pre-populates many variables, as documented below, and you can set your own variables in the form of context output from [shell scripts](/docs/continuous-delivery/x-platform-cd-features/cd-steps/utilities/shell-script-step) and other steps.

## Java string methods

You can [use any Java string method on Harness variable expressions](./expressions-java-methods.md).

## FQNs and expressions

Everything in Harness can be referenced by a Fully Qualified Name (FQN) expression.

The FQN is the path to a setting in the YAML of your pipeline.

![](./static/harness-variables-14.png)

You can use the expression in nearly any setting in the pipeline editor.

You don't need to build the expression yourself. Harness provides multiple places where you can copy the variable expression.

For example, you can click the copy button in a pipeline execution to get the expressions of output settings and values.

![](./static/harness-variables-15.png)

When building a pipeline in Pipeline Studio, you can copy the FQN of a setting using **Variables**.

![](./static/harness-variables-16.png)

## Stage level and pipeline level expressions

You can create variables at the pipeline and stage level and reference them using the FQN expressions within their scope.

Click **Variables** in the pipeline to view all the inputs and copy their expressions.

<DocImage path={require('./static/21a3df06a049a40a2787e3f0e929617974284e0afd8a86ebe8890d8a4d9c871d.png')} width="60%" height="60%" title="Click to view full size image" />

The pipeline and stage level variable expressions follow these formats:

- **Pipeline-level** expressions use the format `<+pipeline.variables.VAR_NAME>`.
- **Stage-level** expressions use these formats:
  - **Use in this stage:** Use this option to reference the input anywhere in its stage. The format is `<+stage.variables.VAR_NAME>`.
  - **Use anywhere in the pipeline:** Use this option to reference the input anywhere in the pipeline. The format is `<+pipeline.stages.STAGE_NAME.VAR_NAME>`.
- **Pipeline-level** variables can be accessed as a collection of key-value pairs using `<+pipeline.variables>`.
- **Stage-level** variables can be accessed as a collection of key-value pairs using `<+stage.variables>`.

### Expression examples

Here is an example of a Shell script step echoing some common variable expressions.

```
echo "Harness account name: "<+account.name>

echo "Harness comp name: "<+account.companyName>

echo "pipeline executionId: "<+pipeline.executionId>

echo "pipeline sequenceId: "<+pipeline.sequenceId>

echo "stage name: "<+stage.name>

echo "service name: "<+service.name>

echo "service variables: "<+serviceVariables.example_var>

echo "artifact image: "<+artifacts.primary.image>

echo "artifact image path: "<+artifacts.primary.imagePath>

echo "environment name: "<+env.name>

echo "infrastructure connectorRef: "<+infra.connectorRef>

echo "infrastructure namespace: "<+infra.namespace>

echo "infrastructure releaseName: "<+infra.releaseName>
```

Here is an example of the output.

```
Harness account name: Harness.io

Harness comp name: Harness.io

pipeline executionId: T4a7uBs7T-qWhNTr-LnFDw

pipeline sequenceId: 16

stage name: dev

service name: nginx

service variables: foo

artifact image: index.docker.io/library/nginx:stable

artifact image path: library/nginx

environment name: quickstart

infrastructure connectorRef: account.harnesstestpmdemocluster

infrastructure namespace: default

infrastructure releaseName: docs

Command completed with ExitCode (0)
```

Here is another example of how to use `<+stage.variables>`.

```
for var in <+stage.variables>;
do

    IFS=":"
    read -r key value <<< "$var"
    unset IFS
    echo "Key: $key"
    echo "Value: $value"

done
```

The above Bash script prints all the key-value pairs for the stage variables.
If the `<+stage.variables>` is `{"a":"A","b":"B","c":"C"}` then the output will be as follows:

```
Executing command ...
Key: a
Value: A
Key: b
Value: B
Key: c
Value: C
Command completed with ExitCode (0)
```

## Input and output variables

You can reference the inputs and outputs of any part of your pipeline.

- **Input variable expressions** reference the values and setting selections you made _in your pipeline_.
- **Output variable expressions** reference _the results_ of a pipeline's execution.

### Input variables in the pipeline

You can copy and reference the input settings for steps using the pipeline **Variables** panel.

<DocImage path={require('./static/2d3f480ea623c75e83c074a1e8a6d90d1fb1eccc1d9c3bcda1184179483ef529.png')} width="60%" height="60%" title="Click to view full size image" />

Input variables follow this format:

- **Stage-level**: `<+execution.steps.STEP_ID.SETTING>`.
- **Pipeline-level**: `<+pipeline.stages.STAGE_ID.spec.execution.steps.STEP_ID.SETTING>`.

:::info

Pipeline and stage custom variable expressions use the _variable name_ to reference the variable. The execution step variables use the _stage/step identifier (ID)_ in references.

:::

### Input and output variable expressions in executions

Inputs and outputs are displayed for every part of the pipeline execution.

Here are the inputs and outputs for a Kubernetes rollout deployment step.

| **Inputs**                                                                                                                      | **Outputs**                                                                                                                     |
| :------------------------------------------------------------------------------------------------------------------------------ | :------------------------------------------------------------------------------------------------------------------------------ |
| <DocImage path={require('./static/rolloutdeployment1.png')} width="100%" height="100%" title="Click to view full size image" /> | <DocImage path={require('./static/rolloutdeployment3.png')} width="100%" height="100%" title="Click to view full size image" /> |

You can copy the expressions for the names or values of any input or output.

| **Name**                                                                                                          | **Value**                                                                                                          |
| :---------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------- |
| <DocImage path={require('./static/name.png')} width="100%" height="100%" title="Click to view full size image" /> | <DocImage path={require('./static/value.png')} width="100%" height="100%" title="Click to view full size image" /> |

Here are the **Name** and **Value** expressions for the `podIP` setting.

- Name:

  ```
  <+pipeline.stages.k8s_deployment.spec.execution.steps.rolloutDeployment.deploymentInfoOutcome.serverInstanceInfoList[0].podIP>
  ```

- Value: `10.100.0.6`

## Using expressions in settings

You can use Harness variable expressions in most settings.

When you select the **Expression** option for a setting, you can type `<+` and the list of available variable expressions appears.

![](./static/harness-variables-19.png)

Select a variable expression to use it as the value for this setting.

At runtime, Harness will replace the variable with the runtime value.

You can also paste expressions that don't appear. For example, expressions that reference settings in previous stages.

For more information, go to [Fixed Values, Runtime Inputs, and Expressions](../variables-and-expressions/runtime-inputs.md).

## Expression guidelines and boundaries

Review the following guidelines to avoid errors when using variable expressions.

### Scope

When Harness automatically presents variable expressions in a setting, it only exposes the expressions that can be used in that setting. You will not see a variable expression available in a setting where it cannot be used.

This does not prevent you from trying to use an expression outside of its scope.

Here are some guidelines to help you use expressions successfully:

- Don't refer to a step's expressions within the same step.
- Don't refer to the settings for a subsequent step in a previous step.
- Don't refer to inputs or outputs of a stage's **Execution** tab in the stage's **Service** or **Environment** tabs.
  - The execution takes place after the service and environment settings are used. Consequently, the expressions used in the execution cannot be resolved when running the service and environment sections.

:::info Exception
You can reference the environment name variable, `<+env.name>`, in a service's Values YAML file, specs, and config files.
:::

### Only use expressions after they can be resolved

When Harness encounters an expression during pipeline execution, it tries to resolve the expression with the information it has at that point in the execution. Consequently, your pipelines can use expressions only after Harness has the required information to resolve the expression's value. If you try to use an expression before Harness has the necessary information, the expression resolves to null and the pipeline can fail or execute incorrectly.

#### Demonstration of Harness expression resolution in a CD stage

This example demonstrates when and where certain expressions (by prefix) are resolved over the duration of a CD stage, so that you can determine which events need to occur before you can safely reference a certain expression and ensure that it is successfully resolved when the pipeline runs.

<figure>

![](./static/harness-variables-20.png)

<figcaption>Different expressions originate from different parts of a stage. </figcaption>
</figure>

Here's when you can reference expressions resolved from information in each of these stage sections:

- **Service expressions** can be resolved only after Harness has progressed through the **Service** section of the pipeline. Consequently, you can use service expressions in the **Infrastructure** and **Execution** sections of the stage.
- **Infrastructure expressions** can be resolved only after Harness has progressed through the **Infrastructure** section of the pipeline.
  - In the **Infrastructure** section, you can reference **Service** settings.
  - Since **Execution** follows **Infrastructure**, you can reference **Infrastructure** expressions in **Execution**.
- **Execution expressions** apply to steps in **Execution**.
  - Each step's **Execution** expressions can be referenced only after Harness has progressed through that step in the **Execution** section.

<DocImage path={require('./static/harness-variables-21.png')} width="80%" height="80%" title="Click to view full size image" />

#### CI stage initialization fails with a "null value" error

If a Build (`CI`) stage fails at initialization with a "null value" error, this can indicate that an expression was called before its value could be resolved. For more information, go to [Initialize step fails with a "null value" error](https://developer.harness.io/kb/continuous-integration/continuous-integration-faqs#initialize-step-to-fails-with-a-null-value-error).

### Variable value size

A variable value (the evaluated expression) is limited to 256 KB.

### Expressions not allowed in comments of Values YAML or Kustomize patches

You cannot use Harness expressions in comments in:

- Values YAML files (values.yaml) in Kubernetes, Helm chart, or Native Helm deployments.
- Kustomize patches files.

For example, here is a values.yaml file with a Harness expression in the comment:

```yaml
name: test
replicas: 4
image: <+artifacts.primary.image>
dockercfg: <+artifacts.primary.imagePullSecret>
createNamespace: true
namespace: <+infra.namespace>
# using expression <+infra.namespace>
```

This values.yaml file will not process successfully. Remove any expressions from comments and the file will process successfully.

### Scripts within expressions

You cannot write scripts in expressions. For example, the following script will not work:

```
if ((x * 2) == 5) { <+pipeline.name = abc>; } else { <+pipeline.name = def>; }
```

Instead, feed the expression value into a variable and then call the variable in your script.

```
NAME = <+pipeline.name>

if ((x * 2) == 5) { $NAME = abc; } else { $NAME = def; }
```

### Variable name uniqueness

<!-- This seems like it's missing information. You couldn't have two pipeline variables or account variables with the same name either? And I think you could have a stage variable and pipeline variable with the same names, but the expression reference would differentiate their scope, eg. https://developer.harness.io/docs/platform/variables-and-expressions/add-a-variable#reference-variables-in-a-pipeline ?? -->

When defining variables at the stage level, variable names must be unique within that stage. You can use the same variable names in different stages of the same pipeline or other pipelines, but not within the same stage.

### Avoid hyphens in variable names

Harness recommends not using hyphens/dashes (`-`) in variable names, because these characters can cause issues with headers and they aren't allowed in some Linux distributions and deployment-related software.

For example, this expression won't work: `<+execution.steps.httpstep.spec.headers.x-auth>`.

If you must reference a variable name that has a hyphen, such as `x-auth`, you can wrap the variable name in double quotes (`""`), such as `<+execution.steps.httpstep.spec.headers["x-auth"]>`.

This also works for nested expressions, such as:

```
<+execution.steps.httpstep.spec.newHeaders["x-auth"]["nested-hyphen-key"]>
<+execution.steps.httpstep.spec.newHeaders["x-auth"].nonhyphenkey>
```

When referencing your [custom variables](./add-a-variable.md), you need to use the `get()` method, as explained in [Special characters in custom variables can required escaping or additional handling](#special-characters-in-custom-variables-can-require-escaping-or-additional-handling).

### Special characters in custom variables can require escaping or additional handling

When you [add a variable](./add-a-variable.md), note the following restrictions and considerations for variable names:

* Variable names must start with a letter or underscore (`_`).
* Variable names can contain lowercase and uppercase letters, numbers 0-9, underscores (`_`), periods (`.`), hyphens/dashes (`-`), and dollar signs (`$`).
* Variable names can't contain [reserved words](#reserved-words).
* Periods and hyphens require [additional escaping](#use-get-for-custom-variable-names-with-hyphens-and-periods) when referencing those variable names in Harness expressions, such as `foo` in `<+stage.variables.foo>`. This handling is explained below.
* Additional variable naming restrictions can apply depending on the platforms and tools you use. For example, Kubernetes doesn't allow underscores. Ensure that your expressions resolve to the allowed values of your target platforms.

#### Use get() for custom variable names with hyphens and periods

Harness recommends [avoiding hyphens in variable names](#avoid-hyphens-in-variable-names).

However, if you need to reference a custom variable that includes a period or hyphen/dash in the name, you must wrap the variable name in double quotes and use the `get()` method in the expression, such as `.get("some-var")`.

For example:

```
<+pipeline.variables.get("pipeline-var")>
<+pipeline.stages.custom.variables.get("stage-var")>
<+pipeline.variables.get("pipeline.var")>
<+pipeline.stages.custom.variables.get("stage.var")>
```

This handling is also required for [matrix dimension names](/docs/platform/pipelines/looping-strategies/looping-strategies-matrix-repeat-and-parallelism) with hyphens.

### Reserved words

The following keywords are reserved, and cannot be used as a variable name or property.

```
or
and
eq
ne
lt
gt
le
ge
div
mod
not
null
true
false
new
var
return
shellScriptProvisioner
class
```

For more information, go to [JEXL grammar details](https://people.apache.org/~henrib/jexl-3.0/reference/syntax.html).

### Number variables

Number type variables are always treated as doubles (double-precision floating-point).

- -1.79769313486231E308 to -4.94065645841247E-324 for negative values.
- 4.94065645841247E-324 to 1.79769313486232E308 for positive values.

For example, here is a pipeline variable of number type.

```
  variables:
    - name: double_example
      type: Number
      description: ""
      value: 10.1
```

The expression to reference that pipeline variable, `<+pipeline.variables.double_example>`, will be treated as a double when it is resolved to `10.1`.

#### Numbers as doubles and strings

Whether the number in a variable is treated as a double or string depends on the field that you use it in.

If you enter `123` in a string setting, such as a **Name**, it is treated as a string. If you enter `123` in a count setting, such as **Instances**, it is treated as a double.

### Contains method

When using `contains`, ensure the expression is wrapped within `<+ >` and the specific string is within `"`.

For example, `<+<+stage.name>.contains("s1")>`.

### Split method

When using `split`, ensure the expression is wrapped within `<+ >`.

For example, `<+<+pipeline.variables.abc>.split(':')[1]>`.

### Complex expression

When using a complex expression, ensure the expression is wrapped within `<+ >`.

For example:

```
<+ <+<+trigger.payload.pull_request.diff_url>.contains("triggerNgDemo")> || <+trigger.payload.repository.owner.name> == "wings-software">
```

### Ternary operator

When using ternary conditional `?:` operators, do not use spaces between the operators and values. Ensure the expression is wrapped within the expression delimiter `<+ >`.

:::info

When you evaluate Harness expressions using any operator (including ternary operators), the expression values must be available for resolution at the time of the evaluation.

For example, if you use an expression for the value of a pipeline stage step setting, such as `<+pipeline.stages.mystage.spec.execution.steps.myapplystep.executionUrl>`, ensure that the evaluation using that expression happens after the step `myapplystep` has run.

:::

Ternary operators in Harness follow the standard format, but you cannot use spaces between the operators and values.

For example, `<+condition ? <value_if_true> : <value_if_false>>` will not work.

Use `<+condition?<value_if_true>:<value_if_false>>` instead.
Ensure the expression is wrapped within `<+ >`:

```
<+condition?<value_if_true>:<value_if_false>>
```

<details>
<summary>Pipeline example</summary>

Here's a simple Harness YAML pipeline example of evaluating a Harness variable value with the ternary operator:

```yaml
pipeline:
  name: exp
  identifier: exp
  projectIdentifier: CD_Docs
  orgIdentifier: default
  tags: {}
  stages:
    - stage:
        name: ternarydemo
        identifier: ternarydemo
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
                    onDelegate: true
                    source:
                      type: Inline
                      spec:
                        script: echo <+stage.variables.myvar>
                    environmentVariables: []
                    outputVariables: []
                  timeout: 10m
              - step:
                  type: ShellScript
                  name: ternary
                  identifier: ternary
                  spec:
                    shell: Bash
                    onDelegate: true
                    source:
                      type: Inline
                      spec:
                        script: echo <+ <+stage.variables.myvar> == "1.1"?"this is right":"this is wrong" >
                    environmentVariables: []
                    outputVariables: []
                  timeout: 10m
        tags: {}
        variables:
          - name: myvar
            type: String
            description: ""
            required: true
            value: "1.1"
```

In this example, there is a stage variable named `myvar` with a value of `1.1`. In the `ShellScript` step named `ternary` the variable expression for the stage variable, `<+stage.variables.myvar>`, is evaluated with the ternary expression:

`<+ <+stage.variables.myvar> == "1.1"?"this is right":"this is wrong" >`

</details>

Ternary operators are also discussed in the [Harness Knowledge Base](https://developer.harness.io/kb/continuous-delivery/articles/ternary-operator/).

### Equals operator

When using the `==` operator, ensure the expression is wrapped within `<+ >`.

For example, `<+<+pipeline.name> == "pipeline1">` or `<+<+stage.variables.v1> == "dev">`.

:::info note
Greater than and Less than operators are not supported for string expression types. Only Equal to and Not equal to are supported.

:::

### Variable concatenation

Harness string variables can be concatenated by default. Each expression can be evaluated and substituted in the string.

Previously, Harness users were forced to use a ‘+’, or `.concat()`, the concatenation operator, to join multiple expressions together. Now, you can simply use `<+pipeline.name> <+pipeline.executionId>`.

For example, Harness supports complex usages such as the following:

- `us-west-2/nonprod/eks/eks123/<+env.name>/chat/`
- `<+stage.spec.execution.steps.s1<+strategy.identifierPostFix>.steps.ShellScript_1.output.outputVariables.v1>`
  - This example uses the index of the looped execution to pick the correct step.
- `<+pipeline.stages.<+pipeline.variables.stagename>.status>`
  - This example shows an elegant way to print out the status of a stage.

All existing expressions will continue to work. For example, the following syntax will still work.

1. Use `+` operator to add string value variables: `<+<+pipeline.variables.var1> + "_suffix">`.
2. Use Java `concat` method to add string variables:

- `<+<+pipeline.variables.var1>.concat("_suffix")>`

Ensure the expression is wrapped within `<+ >` in both of these examples.

:::info

When concatenating expressions as strings, each expression must evaluate to a string.

If an expression does not satisfy this condition, use the `toString()` [method](/docs/platform/variables-and-expressions/expressions-java-methods) to convert it to a string.

For example, in `/tmp/spe/<+pipeline.sequenceId>` the variable `sequenceId` evaluates to an integer. When concatenating this with other string expressions, it must be converted to a string, such as: `/tmp/spe/<+pipeline.sequenceId.toString()>`

:::

### Passing JSON values using variables

When using expressions in JSON as a string, they must be wrapped in quotation marks for valid JSON.

For example, consider the following JSON:

```json
"{\"a\":[ { \"name\": \"svc1\", \"version\": \"<+pipeline.variables.version>\", \"hosts\": <+<+pipeline.variables.hosts>.split(\",\")> } ]}"
```

In the JSON above, the expression `<+pipeline.variables.version>` must be wrapped in quotation marks because it resolves as a string inside JSON (and Strings need to be quoted). The expression `<+<+pipeline.variables.hosts>.split(\",\")>` doesn't need to be wrapped in quotation marks because it will be resolved as a list.

Let's look at an example using allowed values and JSON strings.

A variable with `<+input>.allowedValues({"x":"y"})` and `"<+input>.allowedValues({x:y})"` have the same value, which is `{x:y}`. You can add space in the second example, `"<+input>.allowedValues({x: y})"` to get `{x: y}` and it doesn't cause any errors.

You can do this with quotes as well. For example, `"<+input>.allowedValues({\\\"x\\\": \\\"y\\\"})"` produces `{"x": "y"}`.

### Best practices for expressions usage

- When using an expression, if you want to treat it as a string, you must wrap it within quotation marks.

  For example, consider following expression:

  ```
  <+<+pipeline.variables.changeType> =~ ["<+stage.name>","All"]>
  ```

  In the above expression, the `<+stage.name>` is wrapped within quotation marks because it is an element in a list of strings.

- While using `,` inside a method invocation with an expression, the expression must be wrapped in quotation marks.

  For example, consider the following expression:

  ```
  <+<+pipeline.variables.var2>.replace("a", "<+pipeline.variables.var1>")>
  ```

  In the above expression, `<+pipeline.variables.var1>` must be wrapped in quotation marks because the expression is a string parameter for a method.

- While using method invocation with an expression, the expression before method invocation should also be wrapped within `<+...>`.

  For example, consider the following expression:

  ```
  <+<+pipeline.variables.var1>.concat("concatenating a string")>
  ```

  To invoke the method `concat` on the expression `<+pipeline.variables.var1>`, you must wrap `<+pipeline.variables.var1>` within `<+...>` and then invoke the method using `.concat()`.

- When using an expression for the Harness secret functor, `<+secrets.getValue("sec")>`, it should not be wrapped within quotation marks.

  This expression gets resolved to another Harness internal functor,`${ngSecretManager.obtain("sec")}`, which is resolved on the delegate. Since its value is not a primitive type string, it should not be wrapped within quotation marks.

  For example, consider the following expression for the value of a pipeline or stage variable:

  ```
  <+<+<+pipeline.variables.var1>=="secret1">?<+secrets.getValue("secret1")>:<+secrets.getValue("defaultSecret")>>
  ```

  This secret expression should not be wrapped within quotation marks.

- If expressions don't need to be evaluated in the pipeline YAML but are added as script comments in the Shell Script step, the Run step, or another step, they will still be processed and evaluated. This might cause failures and unnecessary processing. Review and remove any unnecessary script comments from the pipeline YAML to streamline the evaluation process.

- Usage of `getClass()` in expressions is not supported and will not be evaluated.

## Debugging expressions

An easy way to debug expressions in your pipeline is to use Compiled Mode in your **Variables** panel. You can enable this mode using a radio button at the top of the **Variables** Panel. When Compile Mode is turned on, all of the expressions in the panel are compiled and their values are displayed. By default, the compilation happens against the pipeline's latest execution. You can change this by selecting from a displayed list of previous executions.

![](./static/expression-evaluator-screen.png)

Expressions that are incorrect or cannot be evaluated using the execution data are highlighted in the **Variable** values column. You can switch the panel back to normal mode and correct the expression.

To test an expression that isn't part of a variable (say, something in a script), you can create a temporary variable in the panel, assign the expression to it, and use Compiled Mode to debug it.

## CI codebase and environment variables

You can use Harness expressions to reference various environment variables and [codebase](/docs/continuous-integration/use-ci/codebase-configuration/create-and-configure-a-codebase.md) attributes in Harness CI pipelines, stages, and steps. For more information, go to:

- [CI codebase variables reference](/docs/continuous-integration/use-ci/codebase-configuration/built-in-cie-codebase-variables-reference.md)
- [CI environment variables reference](/docs/continuous-integration/use-ci/optimize-and-more/ci-env-var.md)

## Account

### \<+account.identifier>

The entity [identifier](../references/entity-identifier-reference.md) of the Harness account.

![](./static/harness-variables-22.png)

### \<+account.name>

Harness account name.

### \<+account.companyName>

The name of the company for the account.

### Custom account variables

For more information, go to [Add Account, Org, and Project-level Variables](add-a-variable.md).

## Org

### \<+org.identifier>

The entity [identifier](../references/entity-identifier-reference.md) of an organization.

![](./static/harness-variables-23.png)

### \<+org.name>

The name of the org.

### \<+org.description>

The description of the org.

### Custom org variables

For more information, go to [Add Account, Org, and Project-level Variables](add-a-variable.md).

## Project

### \<+project.name>

The name of the Harness project.

### \<+project.description>

The description of the Harness project.

### \<+project.tags>

All Harness Tags attached to the project.

### \<+project.identifier>

The entity [identifier](../references/entity-identifier-reference.md) of the Harness project.

### Custom project variables

For more information, go to [Add Account, Org, and Project-level Variables](add-a-variable.md).

## Pipeline

### Pipeline-level variables

Here is a quick video that explains how to create and reference pipeline, stage, and service variables.

<!-- Video:
https://www.youtube.com/watch?v=lqbmO6EVGuU-->
<DocVideo src="https://www.youtube.com/watch?v=lqbmO6EVGuU" />

### \<+pipeline.identifier>

The [identifier](../references/entity-identifier-reference.md) (Id) for the pipeline.

![](./static/harness-variables-24.png)

### \<+pipeline.executionId>

Every execution of a pipeline is given a universally unique identifier (UUId). The UUId can be referenced anywhere.

For example, in the following execution URL, the UUId follows `executions` and is `kNHtmOaLTu66f_QNU-wdDw`.

```
https://app.harness.io/ng/#/account/12345678910/cd/orgs/default/projects/CD_Quickstart/pipelines/Helm_Quickstart/executions/kNHtmOaLTu66f_QNU-wdDw/pipeline
```

### \<+pipeline.executionUrl>

The execution URL of the pipeline. This is the same URL you see in your browser when you are viewing the pipeline execution.

For example:

```
https://app.harness.io/ng/#/account/12345678910/cd/orgs/default/projects/CD_Docs/pipelines/Triggers/executions/EpE_zuNVQn2FXjhIkyFQ_w/pipeline
```

:::warning
The version of this expression with an additional period, `<+pipeline.execution.Url>`, has been deprecated.
:::

### \<+pipeline.executionMode>

This expression describes the pipeline's execution mode:

* `NORMAL`: A normal execution. It could either have succeeded or failed.
* `POST_EXECUTION_ROLLBACK`: A [post-deployment rollback](/docs/continuous-delivery/manage-deployments/rollback-deployments.md) execution.
* `PIPELINE_ROLLBACK`: A [rollback pipeline](/docs/platform/pipelines/failure-handling/define-a-failure-strategy-for-pipelines) execution.

![](./static/execution-mode-expression.png)

You can use this expression in conditional executions.

![](./static/execution-mode-conditional-execution.png)

For example, you can create a conditional execution to ensure that a step runs only when a post-deployment rollback happens. Here's an example of the logs for this conditional execution scenario:

![](./static/execution-mode-execution-output.png)

### \<+pipeline.name>

The name of the current pipeline.

![](./static/harness-variables-25.png)

### \<+pipeline.sequenceId>

The incremental sequential Id for the execution of a pipeline. A `<+pipeline.executionId>` is randomly generated for each execution, but a `<+pipeline.sequenceId>` is incremented with each run of the pipeline.

The first run of a pipeline receives a sequence Id of 1 and each subsequent execution is incremented by 1.

For CD pipelines, the Id is named execution. For CI pipelines, the Id is named builds.

![](./static/harness-variables-26.png)

You can use `<+pipeline.sequenceId>` to tag a CI build when you push it to a repository, and then use `<+pipeline.sequenceId>` to pull the same build and tag in a subsequent stage. For examples, go to [Build and test on a Kubernetes cluster build infrastructure tutorial](/docs/continuous-integration/use-ci/set-up-build-infrastructure/k8s-build-infrastructure/tutorial-ci-kubernetes-build-infra) and [Integrating CD with other Harness modules](/docs/continuous-delivery/get-started/integrating-cd-other-modules).

### \<+pipeline.startTs>

The start time of a pipeline execution in [Unix Epoch format](https://www.epoch101.com/). For more information, go to [Triggers](/docs/category/triggers).

### \<+pipeline.triggerType>

The type of trigger. For more information, go to [Triggers](/docs/category/triggers).

Here are the possible `<+pipeline.triggerType>` and `<+trigger.type>` values.

| **\<+pipeline.triggerType>** | **\<+trigger.type>** | **Description**                                               |
| :--------------------------- | :------------------- | :------------------------------------------------------------ |
| ARTIFACT                     | Artifact             | New artifact trigger. For example, new Docker Hub image tag   |
| SCHEDULER_CRON               | Scheduled            | Scheduled Cron trigger                                        |
| MANUAL                       | _null_               | Pipeline triggered using the RUN button in the user interface |
| WEBHOOK_CUSTOM               | Custom               | Custom webhook trigger                                        |
| WEBHOOK                      | Webhook              | SCM webhook trigger. For example, GitHub pull request         |

### \<+pipeline.triggeredBy.name>

The name of the user or the trigger name if the pipeline is triggered using a webhook. For more information, go to [Trigger Pipelines using Git Events](../triggers/triggering-pipelines.md).

If a user name is not present in the event payload, the `<+pipeline.triggeredBy.name>` expression will resolve as empty. For example, in the SaaS edition of Bitbucket, a user name is not present.

### \<+pipeline.triggeredBy.email>

The email of the user who triggered the pipeline. This returns NULL if the pipeline is triggered using a webhook. For more information, go to [Trigger How-tos](/docs/category/triggers).

### \<+pipeline.selectedStages>

The list of stages selected for execution.

### \<+pipeline.delegateSelectors>

The pipeline level delegate selectors selected via runtime input.

### \<+pipeline.storeType>

If the pipeline is stored in Harness, the expression resolves to `inline`. If the pipeline is stored in a Git repository, the expression resolves to `remote`.

### \<+pipeline.repo>

For remote pipelines, the expression resolves to the Git repository name. For inline pipelines, the expression resolves to `null`.

### \<+pipeline.branch>

For remote pipelines, the expression resolves to the Git branch where the pipeline exists. For inline pipelines, the expression resolves to `null`.

## Deployment, pipeline, stage, and step status

<!-- move to status topic and redirect? -->

Deployment status values are a Java enum. You can see the list of values in the deployments **Status** filter:

![](./static/harness-variables-27.png)

You can use any status value in a JEXL condition. For example, `<+pipeline.stages.stage1.status> == "FAILED"`.

### Stage status

The expression `<+pipeline.stages.STAGE_ID.status>` resolves to the status of a stage.

You must use the expression after the stage in execution.

### Step status

The expression `<+pipeline.stages.STAGE_ID.spec.execution.steps.STEP_ID.status>` resolves to the status of a step. For example, `<+pipeline.stages.MyStageName.spec.execution.steps.mystep.status>`.

You must use the expression after the step in execution.

## InputSet

Displays the Input Set values for the execution as a JSON value. The list of values can be searched via `<+inputSet>`.

Here's an example where the **Timeout** settings for the two steps preceding the step using `<+inputSet>` are using values from an Input Set:

```
{pipeline:identifier:Custom} {pipeline:stages:[{stage:identifier:Custom}]} {pipeline:stages:[{stage:type:Custom}]} {pipeline:stages:[{stage:spec:{execution:steps:[{step:identifier:ShellScript_1}}}]} {pipeline:stages:[{stage:spec:{execution:steps:[{step:type:ShellScript}}}]} {pipeline:stages:[{stage:spec:{execution:steps:[{step:timeout:10s}}}]} {pipeline:stages:[{stage:spec:{execution:{step:identifier:json_format}]}}]} {pipeline:stages:[{stage:spec:{execution:{step:type:ShellScript}]}}]} {pipeline:stages:[{stage:spec:{execution:{step:timeout:10m}]}}]}
```

## Stage

The following variables provide information on the pipeline stage.

### Stage-level variables

Here is a quick video that explains how to create and reference pipeline, stage, and service variables.

<!-- Video:
https://www.youtube.com/watch?v=lqbmO6EVGuU-->
<DocVideo src="https://www.youtube.com/watch?v=lqbmO6EVGuU" />

Once you've created a stage, its settings are in the **Overview** tab. For example, here is the **Overview** tab for a deploy stage.

![](./static/harness-variables-28.png)

In **Advanced**, you can add **Stage Variables**.

Stage variables are custom variables you can add and reference in your stage and pipeline. They're available across the pipeline. You can override their values in later stages.

You can even reference stage variables in the files fetched at runtime.

For example, you could create a stage variable `name` and then reference its identifier in the Kubernetes values.yaml file used by this stage: `name: <+stage.variables.name>`:

```
name: <+stage.variables.name>
replicas: 2

image: <+artifacts.primary.image>
...
```

When you run this pipeline, the value for `name` is used for the values.yaml file. The value can be a fixed value, expression, or runtime input.

You reference stage variables **within their stage** using the expression `<+stage.variables.VARIABLE_NAME>`.

You reference stage variables **outside their stage** using the expression `<+pipeline.stages.STAGE_NAME.variables.VARIABLE_NAME>`.

### \<+stage.name>

The name of the stage where the expression is evaluated.

![](./static/harness-variables-30.png)

### \<+stage.description>

The description of the stage where the expression is evaluated.

### \<+stage.tags>

The tags on the stage where the expression is evaluated. For more information, go to [Tags Reference](../references/tags-reference.md).

These tags are different from Docker image tags.

### \<+stage.identifier>

The [entity identifier](../references/entity-identifier-reference.md) of the stage where the expression is evaluated.

### \<+stage.output.hosts>

Lists all of the target hosts when deploying to multiple hosts.

When you are deploying to multiple hosts, such as with an SSH, WinRM, or deployment template stage, you can run the same step on all of the target hosts.

To run the step on all hosts, you use the repeat [Looping Strategy](../pipelines/looping-strategies/looping-strategies-matrix-repeat-and-parallelism.md) and identify all the hosts for the stage as the target.

```
repeat:
  items: <+stage.output.hosts>
```

Here is an example with a Shell script step.

![](./static/harness-variables-31.png)

For examples, see the looping strategies used in the [Secure Shell (SSH) deployments](/docs/continuous-delivery/deploy-srv-diff-platforms/traditional/ssh-ng).

### \<+stage.executionUrl>

The execution URL of the stage. This is the same URL you see in your browser when you are viewing the pipeline execution.

Use the following fully qualified expression to get the execution URL for a specific stage in the pipeline:

```
<+pipeline.stages.STAGE_ID.executionUrl>

```

### \<+stage.delegateSelectors>

The stage level delegate selectors selected via runtime input

## Service

Currently, there are two versions of services and environments, v1 and v2. Services and environments v1 are being replaced by services and environments v2.

The use of variable expressions is different between v1 and v2.

For more information, go to [Services and Environments Overview](/docs/continuous-delivery/get-started/services-and-environments-overview).

### Service-level variables for service v2

To reference a service variable, use the expression `<+serviceVariables.VARIABLE_NAME>`.

For example, `<+serviceVariables.myvar>`.

### Service-level variables for service v1

Here is a quick video that explains how to create and reference pipeline, stage, and service variables.

<!-- Video:
https://www.youtube.com/watch?v=lqbmO6EVGuU-->
<DocVideo src="https://www.youtube.com/watch?v=lqbmO6EVGuU" />

### \<+serviceConfig.serviceDefinition.spec.variables.VAR_NAME>

The value of the service-level variable in `VAR_NAME`.

![](./static/harness-variables-32.png)

Use expression anywhere after the service step in the pipeline.

To reference the variables, click the copy button.

![](./static/harness-variables-33.png)

There are two options:

- **Copy variable name:** use this option if you will only be referencing this variable in the current stage. Expression:
  - `<+serviceConfig.serviceDefinition.spec.variables.NAME>`
- **Copy fully qualified name:** use this option if you will be referencing this variable in another stage. Example:
  - `<+pipeline.stages.STAGE_NAME.spec.serviceConfig.serviceDefinition.spec.variables.NAME>`

You can use these expressions in any setting in your pipeline. Select the expression option and enter the expression.

![](./static/harness-variables-34.png)

To override the service variable in a script, reference its name and use a new value.

### \<+service.name>

The name of the service where the expression is evaluated.

![](./static/harness-variables-35.png)

### \<+service.description>

The description of the service where the expression is evaluated.

### \<+service.tags>

The tags on the service where the expression is evaluated.

To reference a specific tag use `<+service.tags.TAG_KEY>`.

### \<+service.identifier>

The [entity identifier](../references/entity-identifier-reference.md) of the service where the expression is evaluated.

### \<+service.type>

Resolves to stage service type, such as Kubernetes.

![](./static/harness-variables-36.png)

### \<+service.gitOpsEnabled>

Resolves to a boolean value to indicate whether the GitOps option is enabled (true) or not (false).

![](./static/harness-variables-37.png)

For details on using the GitOps option, go to [Harness GitOps ApplicationSet and PR Pipeline Tutorial](/docs/continuous-delivery/gitops/get-started/harness-cd-git-ops-quickstart).

### \<+serviceVariableOverrides.VARIABLE_NAME>

Override a service variable during the execution of a step group. This provides significant flexibility and control over your pipelines. For more information, go to [Override service variables in step groups](/docs/continuous-delivery/x-platform-cd-features/cd-steps/step-groups/#override-service-variables-in-step-groups)

## Manifest

There are generic and deployment type-specific expressions for manifests.

Manifest settings are referenced by **Id**.

You can always determine the expressions you can use by looking at the service YAML.

For example, the expression `<+manifests.mymanifest.valuesPaths>` can be created by using the manifest Id and the `valuesPaths` key in the YAML.

```
...
      manifests:
        - manifest:
            identifier: mymanifest
            type: K8sManifest
            spec:
              store:
                type: Harness
                spec:
                  files:
                    - account:/Templates
              valuesPaths:
                - account:/values.yaml
              skipResourceVersioning: false
...
```

Let's look at a few generic manifest expressions.

### \<+manifests.MANIFEST_ID.identifier>

Resolves to the manifest Id in Harness.

```
...
      manifests:
        - manifest:
            identifier: mymanifest
...
```

### \<+manifests.MANIFEST_ID.type>

Resolves to the manifest type. For example, `K8sManifest`.

```
...
      manifests:
        - manifest:
            identifier: mymanifest
            type: K8sManifest
...
```

### \<+manifests.MANIFEST_ID.store>

Resolves to where the manifest is stored. For example, this manifest is stored in the [Harness File Store](/docs/continuous-delivery/x-platform-cd-features/services/add-inline-manifests-using-file-store).

```
...
      manifests:
        - manifest:
            identifier: mymanifest
            type: K8sManifest
            spec:
              store:
                type: Harness
                spec:
                  files:
                    - account:/Templates
...
```

### \<+manifest.MANIFEST_ID.commitId>

The commit Id of the manifests used in a service. This is captured in the [output section](#input-and-output-variable-expressions-in-executions) of a deployment step.

You can copy the expressions for the Id and value of `commitId`.

For example:

Name: `<+pipeline.stages.satr.spec.execution.steps.rolloutDeployment.output.manifest.values.commitId>`

Value: `8d30fc49e6ed13155590b7d8c16931cd1a7b5bac`

## Artifact

In order to use an artifact expression, you must select an artifact in the service definition of the Harness service you are deploying.

If you have not selected an artifact, you will be prompted to select an artifact at runtime. If the artifact in the service definition is a runtime input, you will be prompted also.

This is true even if the stage does not deploy an artifact, such as a custom stage.

For example, here is how the common artifact expressions resolve for a Kubernetes deployment with a Docker image on Docker Hub:

- **\<+artifacts.primary.tag>:** `stable`
- **\<+artifacts.primary.image>:** `index.docker.io/library/nginx:stable`
- **\<+artifacts.primary.imagePath>:** `library/nginx`
- **\<+artifacts.primary.imagePullSecret>:** `****`
- **\<+artifacts.primary.dockerConfigJsonSecret>:** `****`
- **\<+artifacts.primary.type>:** `DockerRegistry`
- **\<+artifacts.primary.connectorRef>:** `DockerHub`

<details>
<summary>Example output for all artifact expressions</summary>

Here's an example where we use a Shell Script step to echo all the artifact expressions.

```
echo "artifacts.primary.image: "<+artifacts.primary.image>
echo "artifacts.primary.connectorRef: "<+artifacts.primary.connectorRef>
echo "artifacts.primary.digest: "<+artifacts.primary.digest>
echo "artifacts.primary.identifier: "<+artifacts.primary.identifier>
echo "artifacts.primary.imagePath: "<+artifacts.primary.imagePath>
echo "artifacts.primary.imagePullSecret: "<+artifacts.primary.imagePullSecret>
echo "artifacts.primary.label: "<+artifacts.primary.label>
echo "artifacts.primary.metadata: "<+artifacts.primary.metadata>
echo "artifacts.primary.primaryArtifact: "<+artifacts.primary.primaryArtifact>
echo "artifacts.primary.tag: "<+artifacts.primary.tag>
echo "artifacts.primary.type: "<+artifacts.primary.type>
```

Here's the output:

```
Executing command ...
artifacts.primary.image: index.docker.io/johndoe/tweetapp:21
artifacts.primary.connectorRef: Docker_Hub_with_Pwd
artifacts.primary.digest: null
artifacts.primary.identifier: primary
artifacts.primary.imagePath: johndoe/tweetapp
artifacts.primary.imagePullSecret: 123abc
artifacts.primary.metadata: {image=index.docker.io/johndoe/tweetapp:21, tag=21}
artifacts.primary.primaryArtifact: true
artifacts.primary.tag: 21
artifacts.primary.type: DockerRegistry
Command completed with ExitCode (0)
```

</details>

### \<+artifacts.primary.tag>

Not Harness tags. This expression evaluates to the tags on the artifact pushed, pulled, or deployed. For example, AMI tags. If you are deploying the Docker image `nginx:stable-perl`, the tag would be `stable-perl`.

### \<+artifacts.primary.image>

The full location to the Docker image. For example, `docker.io/bitnami/nginx:1.22.0-debian-11-r0`.

For non-containerized artifacts, use `<+artifacts.primary.path>`, described [below](#artifact_path). To see just the image name, use `<+artifacts.primary.imagePath>`.

Use `<+artifacts.primary.image>` or `<+artifacts.primary.imagePath>` in your values YAML file when you want to deploy an artifact you have added to the **Artifacts** section of a CD stage service definition.

For example, here is the **Artifacts** section with an artifact:

![](./static/harness-variables-38.png)

Here is the Values YAML file referencing the artifact in **Artifacts**:

```
name: example
replicas: 2

image: <+artifacts.primary.image>
# dockercfg: <+artifacts.primary.imagePullSecret>

createNamespace: true
namespace: <+infra.namespace>

...
```

For more information, go to [Example Kubernetes Manifests using Go Templating](/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/cd-k8s-ref/example-kubernetes-manifests-using-go-templating).

### \<+artifacts.primary.path>

The full path to the non-containerized artifact. This expression is used in non-containerized deployments.

### \<+artifacts.primary.filePath>

The file name of the non-containerized artifact. This expression is used in non-containerized deployments. For example, a ZIP file in AWS S3.

### \<+artifacts.primary.imagePath>

The image name, such as `nginx`. To see the entire image location use `<+artifacts.primary.image>`.

### \<+artifacts.primary.imagePullSecret>

If some cases, your Kubernetes cluster might not have the permissions needed to access a private Docker registry. For these cases, the values.yaml or manifest file in service definition **Manifests** section must use the `dockercfg` parameter.

If the Docker image is added in the service definition **Artifacts** section, you can reference it as `dockercfg: <+artifacts.primary.imagePullSecret>`.

values.yaml:

```
name: <+stage.variables.name>
replicas: 2

image: <+artifacts.primary.image>
dockercfg: <+artifacts.primary.imagePullSecret>

createNamespace: true
namespace: <+infra.namespace>
...
```

Go to [Pull an Image from a Private Registry for Kubernetes](/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/cd-kubernetes-category/pull-an-image-from-a-private-registry-for-kubernetes) for more information.

### \<+artifacts.primary.dockerConfigJsonSecret>

In some cases, your Kubernetes cluster might not have the permissions needed to access a private Docker registry. For such cases, the values.yaml or manifest files in the service definition **Manifests** section must use the `dockerconfigjson` parameter.

If the Docker image is added in the service definition **Artifacts** section, you can reference it as `dockerconfigjson: <+artifact.dockerConfigJsonSecret>`.

Here is a sample values.yaml:

```
name: <+stage.variables.name>
replicas: 2

image: <+artifacts.primary.image>
dockerconfigjson: <+artifacts.primary.dockerConfigJsonSecret>

createNamespace: true
namespace: <+infra.namespace>
...
```

For more information, go to [Pull an Image from a Private Registry for Kubernetes](/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/cd-kubernetes-category/pull-an-image-from-a-private-registry-for-kubernetes).

### \<+artifacts.primary.type>

The type of repository used to add this artifact in the service **Artifacts**. For example, Docker Hub, ECR, or GCR.

### \<+artifacts.primary.connectorRef>

The [entity identifier](../references/entity-identifier-reference.md) for the connector used to connect to the artifact repository.

![](./static/harness-variables-39.png)

### \<+\<+artifacts.primary.label>.get("")>

This expression resolves to the Docker labels of a Docker image.

For example, here are the labels for a Docker image:

- `maintainer=dev@someproject.org`
- `build_date=2017-09-05`
- `multi.author=John Doe`
- `key-value=xyz`
- `multi.key.value=abc`

In a Harness Shell script step or any setting where you want use the labels, you can reference them.

```
echo <+<+artifacts.primary.label>.get("maintainer")>
echo <+<+artifacts.primary.label>.get("build_date")>
echo <+<+artifacts.primary.label>.get("multi.author")>
echo <+<+artifacts.primary.label>.get("key-value")>
echo <+<+artifacts.primary.label>.get("multi.key.value")>
```

When you run the pipeline, the expressions will resolve to their respective label values.

![](./static/harness-variables-40.png)

### \<+artifacts.primary.metadata.SHA> or \<+artifacts.primary.metadata.SHAV2>

Digest/SHA256 hash of the Docker image.
Since Docker image manifest API supports two schema versions, schemaVersion1 and schemaVersion2, there could be SHA values corresponding to each version.

Here are the expressions for referencing each version:

SHA value of schemaVersion1: `<+artifacts.primary.metadata.SHA>`

SHA value of schemaVersion2: `<+artifacts.primary.metadata.SHAV2>`

### \<+artifact.primary.identifier>

The Id of the Primary artifact added in a Service **Artifacts** section.

![](./static/harness-variables-41.png)

### \<+artifact.metadata.fileName>

The file name of the Artifactory artifact.

This variable is added to the metadata of the Artifactory artifacts with generic repository format. You can view this variable in the **Output** tab of the **Service** step of a pipeline execution.

![](./static/artifact-file-name-variable.png)

### Artifact rollback variables

You can use the syntax, `<+rollbackArtifact.ARTIFACT_DEFINITION_IDENTIFIER>` to pull artifact rollback information. For example, use `<+rollbackArtifact.metadata.image>` to pull the metadata of the artifact image used in the last successful deployment. 

Harness pulls rollback artifact information from last successful deployment. If there's no previous, successful deployment, then the rollback artifact will return null. 

### Sidecar artifacts

Sidecar artifact expressions use the **Sidecar Identifier** to reference the sidecar artifact.

![](./static/harness-variables-42.png)

The sidecar identifier is set when you add the sidecar artifact. You can see it in the artifact listing.

![](./static/harness-variables-43.png)

Here are the sidecar expressions:

- `<+artifacts.sidecars.SIDECAR_IDENTIFIER.imagePath>`
- `<+artifacts.sidecars.SIDECAR_IDENTIFIER.image>`
- `<+artifacts.sidecars.SIDECAR_IDENTIFIER.type>`
- `<+artifacts.sidecars.SIDECAR_IDENTIFIER.tag>`
- `<+artifacts.sidecars.SIDECAR_IDENTIFIER.connectorRef>`

## Approval

Whenever a user grants an approval in an Approval step, the pipeline maintains the user information of the approver for the rest of the pipeline execution. You can use these variables in notifications after an approval is granted.

These variables are available for Approval steps only, not stages.

:::note
Currently, the `<+approval>` functor is supported for Harness approvals only.
:::

In the following example, a Deploy stage has two Approval steps. For each approval, the pipeline maintains a separate set of approval variables. Use the array index to access the variables for a specific approval.

![](./static/approved-user-pipeline-example.png)

### \<+approval.approvalActivities[0].user.name>

The Harness username of the approver.

### \<+approval.approvalActivities[0].user.email>

The email address of the approver.

### \<+approval.approvalActivities[0].comments>

User comments from the approval, formatted as a single string. This variable is populated from the Comment output variable generated by the approval step.

## Config files

Files added in the **Config Files** section of a service are referenced using the following Harness expressions.

- Plain text file contents: `<+configFile.getAsString("CONFIG_FILE_ID")>`
- Base64-encoded file contents: `<+configFile.getAsBase64("CONFIG_FILE_ID")>`

For more details, go to [Use config files in your deployments](/docs/continuous-delivery/x-platform-cd-features/services/cd-services-config-files).

If the config file has multiple text or encrypted files attached, you must use fileStore or secrets variables expressions:

- `<+fileStore.getAsString("SCOPED_FILEPATH")>`
- `<+fileStore.getAsBase64("SCOPED_FILEPATH")>`
- `<+secrets.getValue("SCOPED_SECRET_ID")>`

Here are some examples:

- `<+configFile.getAsString("cf_file")>`
- `<+configFile.getAsBase64("cf_file")>`
- `<+fileStore.getAsString("/folder1/configFile")>`
- `<+fileStore.getAsBase64("account:/folder1/folder2/configFile")>`
- `<+secrets.getValue("account.MySecretFileIdentifier")>`

## Environments

### Environment-level variables for service v2

Currently, there are two versions of services and environments, v1 and v2. Services and environments v1 are being replaced by services and environments v2.

The use of variable expressions is different between v1 and v2.

For more information, go to [Services and Environments Overview](/docs/continuous-delivery/get-started/services-and-environments-overview).

To reference an environment-level variable, use the expression `<+env.variables.variableName>`.

For example, to reference an environment variable named `envvar`, use the following expression:

`<+env.variables.envvar>`

![](./static/harness-variables-44.png)

### \<+env.name>

The name of the stage environment.

![](./static/harness-variables-45.png)

### \<+env.identifier>

The [entity identifier](../references/entity-identifier-reference.md) of the stage's environment.

### \<+env.description>

The description of the environment.

### \<+env.type>

The environment type, such as `Production` or `PreProduction`.

The available values are:

- `PreProduction`
- `Production`

### \<+env.envGroupName>

The name of the environment group to which the environment belongs (if defined). This expression resolves only if the deployment is done to an environment group.

### \<+env.envGroupRef>

The environment group reference. This expression resolves only if the deployment is done to an environment group.

You can evaluate the expression using JEXL in the **Conditional Execution** settings of steps or stages:

```
<+env.type> != "Production"
```

:::tip

Environment expressions can be used in service steps as well.

:::

## Infrastructure

The following expressions provide information about the pipeline infrastructure settings. The infrastructure in a pipeline is the **Infrastructure Definition** in the Harness environment used in the CD stage's **Environment** section.

### \<+infra.name>

The name of the infrastructure definition used in the pipeline stage.

![](./static/harness-variables-46.png)

### \<+infra.infraIdentifier>

The Id of the infrastructure definition used in the pipeline stage.

### \<+infra.tags>

The [tags on an infrastructure definition](/docs/continuous-delivery/get-started/services-and-environments-overview/#infrastructure-tags) used in the same CD stage where the expression is evaluated.

To reference a specific tag use `<+infra.tags.TAG_KEY>`.

### \<+infra.connectorRef>

The Id of the connector used in the infrastructure definition.

### \<+infra.connector.name>

The name of the connector used in the infrastructure definition.

### \<+INFRA_KEY>

:::warning

This expression is literally `<+INFRA_KEY>`. In this case `INFRA_KEY` *isn't* a placeholder.

:::

The infrastructure key. The key is a unique string that identifies a deployment target infrastructure. It is typically used in the **Release Name** setting to add labels to release for tracking.

For example, in the infrastructure definition of a deploy stage, the `<+INFRA_KEY>` is used in the **Release Name** to give the release a unique name.

![](./static/harness-variables-47.png)

When you deploy, Harness adds the release name as a label. For example, in a Kubernetes deployment you can see `harness.io/release-name=release-2f9eadcc06e2c2225265ab3cbb1160bc5eacfd4f`.

```
...
Pod Template:
  Labels:  app=hello
           deployment=hello
           harness.io/release-name=release-2f9eadcc06e2c2225265ab3cbb1160bc5eacfd4f
  Containers:
   the-container:
    Image:      monopole/hello:1
...
```

Harness can now track the release for comparisons and rollback.

The infrastructure key is a combination of `serviceIdentifier`, `environmentIdentifer` and set of values unique to each infrastructure definition implementation (Kubernetes cluster, etc.) hashed using `SHA-1`. For example, in case of a Kubernetes Infrastructure, the infrastructure key is a hash of `serviceIdentifier-environmentIdentifier-connectorRef-namespace`. The format is `sha-1(service.id-env.id-[set of unique infra values])`.

See also [\<+INFRA_KEY_SHORT_ID>](/docs/platform/variables-and-expressions/harness-variables#infra_key_short_id).

### \<+INFRA_KEY_SHORT_ID>

Shortened form of the infrastructure key described in [\<+INFRA_KEY>](/docs/platform/variables-and-expressions/harness-variables#infra_key).

The shortened form is obtained by removing all but the first six characters of the hash of the infrastructure key described in [\<+INFRA_KEY>](/docs/platform/variables-and-expressions/harness-variables#infra_key).

The shortened form replaces `<+INFRA_KEY>` in the default expression that is used to generate a release name for the resources in Kubernetes and Native Helm deployments. In other words, the **Release name** field in the **Cluster Details** > **Advanced** section of an infrastructure definition is pre-populated with the expression `release-<+INFRA_KEY_SHORT_ID>`. The shorter form resolves issues that Kubernetes and Native Helm deployments experienced with the longer `release-<+INFRA_KEY>` format.

### \<+infra.namespace>

The namespace used in the infrastructure definition.

### \<+infra.releaseName>

The release name used in the infrastructure definition.

## Step

The following instance expressions are for stage steps.

### \<+step.name>

The step name.

### \<+step.identifier>

The step [identifier](/docs/platform/references/entity-identifier-reference/).

### \<+step.executionUrl>

The execution URL of the step. This is the same URL you see in your browser when you are viewing the pipeline execution.

Use the following fully qualified expression to get the execution URL for a specific step in the pipeline:

```
<+pipeline.stages.STAGE_ID.spec.execution.steps.STEP_ID.executionUrl>
```

### \<+steps.STEP_ID.retryCount>

When you set the failure strategy to **Retry Step**, you can specify the retry count for a step or all steps in the stage.

Harness includes a `retryCount` built-in expression that resolves to the total number of times a step was retried:

```
<+execution.steps.STEP_ID.retryCount>
```

You can use this expression in a Shell Script step script anywhere after the step that you identify in the expression.

For example, here is a script that resolves the retry count for the step with the Id `ShellScript_1`:

```
echo "retry count of ShellScript_1: <+execution.steps.ShellScript_1.retryCount>"
```

During pipeline execution, the expression would resolve to something like this:

```
retry count of ShellScript_1: 2
```

## Instances

The following instance expressions are supported in SSH, WinRM, and custom deployments using deployment templates. These deployments can be done on physical data centers, AWS, and Azure.

For details on these deployment types, go to [Secure Shell (SSH) deployments](/docs/continuous-delivery/deploy-srv-diff-platforms/traditional/ssh-ng), [WinRM deployments](/docs/continuous-delivery/deploy-srv-diff-platforms/traditional/win-rm-tutorial), and [Custom deployments using Deployment Templates](/docs/continuous-delivery/deploy-srv-diff-platforms/custom-deployment-tutorial).

To use these instance expressions in a step, you must use the repeat [Looping Strategy](../pipelines/looping-strategies/looping-strategies-matrix-repeat-and-parallelism.md) and identify all the hosts for the stage as the target.

```
repeat:
  items: <+stage.output.hosts>
```

![](./static/harness-variables-48.png)

For examples, see [Run a script on multiple target instances](/docs/continuous-delivery/x-platform-cd-features/cd-steps/run-a-script-on-multiple-target-instances).

For Microsoft Azure, AWS, or any platform-agnostic Physical Data Center (PDC):

- `​<+instance.hostName>​`
- `​<+instance.host.instanceName>`
- `​<+instance.name>`

For Microsoft Azure or AWS:

- `​<+instance.host.privateIp>​`
- `​<+instance.host.publicIp>`

### Deployment templates

For [Deployment Templates](/docs/continuous-delivery/deploy-srv-diff-platforms/custom-deployment-tutorial), you can use `<+instance...>` expressions to reference host(s) properties.

The `<+instance...>` expressions refer to the **Instance Attributes** in the deployment template:

![](./static/harness-variables-49.png)

The following expressions refer to instance(s) collected by the mandatory **instancename** field.

- `​<+instance.hostName>​`
- `​<+instance.host.instanceName>`
- `​<+instance.name>`

The expression `<+instance.host.properties.PROPERTY_NAME>` can used to reference the other properties you added to **Instance Attributes**.

For example, in the example above you can see the `artifact` field name mapped to the `artifactBuildNo` property.

To reference `artifact` you would use `<+instance.host.properties.artifact>`.

`instance.name` has the same value as `instance.hostName`. Both are available for backward compatibility.

### \<+instance.hostName>

The host/container/pod name where the microservice/application is deployed.

If you use this variable in a pipeline, such as in a Shell script step, Harness will apply the script to all target instances. You do not have to loop through instances in your script.

### ​\<+instance.host.instanceName>

The same as `<+instance.hostName>`.

### \<+instance.name>

The name of the instance on which the service is deployed.

If you use this variable in a pipeline, such as in a Shell script step, Harness will apply the script to all target instances. You do not have to loop through instances in your script.

### \<+instance.host.privateIp>

The private IP of the host where the service is deployed.

If you use this variable in a pipeline, such as in a Shell script step, Harness will apply the script to all target instances. You do not have to loop through instances in your script.

### \<+instance.host.publicIp>

The public IP of the host where the service is deployed.

If you use this variable in a pipeline, such as in a Shell script step, Harness will apply the script to all target instances. You do not have to loop through instances in your script.

## Strategy

You can use Harness expressions to retrieve the current execution status or identifiers for iterations of a [matrix or repeat looping strategy](/docs/platform/pipelines/looping-strategies/looping-strategies-matrix-repeat-and-parallelism).

### Strategy status

<!-- move to status page and redirect? -->

The statuses of the nodes (stages/steps) using a matrix/repeat looping strategy can be `RUNNING`, `FAILED`, or `SUCCESS`.

Harness provides the following expressions to retrieve the current status of the node (stage/step) using a looping strategy. The expressions are available in pipelines during execution and rollback.

#### \<+strategy.currentStatus>

The current status of the looping strategy for the node with maximum depth.

When this expression is used in a step, Harness will resolve it to the looping strategy current status of the first parent node (stage/step) of the step.

In cases where both the step and the stage have the looping strategy configured, the expression will resolve to the looping strategy status of the current step.

If the step (or step group) does not have the looping strategy configured, the expression will instead resolve to the looping strategy status of the current stage.

#### \<+strategy.node.STRATEGY_NODE_IDENTIFIER.currentStatus>

The current status of the looping strategy for the node with a specific stage/step identifier, `STRATEGY_NODE_IDENTIFIER`.

For example, `echo <+strategy.node.cs1.currentStatus>`.

#### \<+\<+strategy.node>.get("STRATEGY_NODE_IDENTIFIER").currentStatus>

The current status of the looping strategy for the node with a specific stage/step identifier, `STRATEGY_NODE_IDENTIFIER`.

For example, `echo <+<+strategy.node>.get("ShellScript_1").currentStatus>`.

### Strategy identifierPostFix

When you use a looping strategy like matrix or parallelism on a stage/step/step group, Harness automatically generates the unique Ids of the child stages/steps/step groups created by the looping operation.

The `identifierPostFix` is a postfix added to the identifiers of nodes (stage/step/step group) during execution when the node is a child of the looping strategy. This ensures that all children of the looping strategy have unique identifiers.

For example, here is a matrix strategy for a stage:

```
strategy:
  matrix:
    repo:
      - docker
      - gcr
      - ecr
```

The above matrix will spawn 3 stages by picking `repo` values `docker`, `gcr`, and `ecr`.

The `identifierPostfix` values would be `_docker`, `_gcr`, and `_ecr` for the different combinations of each stage run.

Let's look at an example for parallelism:

```
strategy:
  parallelism: 4
```

The above strategy will spawn 4 stages/steps and the `identifierPostfix` values will be `_0`, `_1`, `_2`, and `_3`.

#### \<+strategy.identifierPostFix>

This expression retrieves the `identifierPostFix` of the current node or any parent node that is a child of the looping strategy.

When used in a step, Harness resolves `<+strategy.identifierPostFix>` to the `identifierPostFix` of the child node belonging to the first looping strategy parent node (either stage or step).

If both the step and stage have the looping strategy configured, the expression resolves to the `identifierPostFix` of the step.

If the step (or stepGroup) does not have the looping strategy configured, the expression resolves to the `identifierPostFix` of the stage.

Let's look at an example using the execution of a stage with the identifier `build_and_upload` and matrix looping strategy.

Multiple child stages will be created from the `build_and_upload` stage. These child stages will have identifiers with the postfix appended, such as `build_and_upload_0`, `build_and_upload_docker`, etc. In this scenario, using the expression `<+strategy.identifierPostFix>` will result in value `_0` or `_docker`.

#### \<+step.identifierPostFix>

This expression returns the `identifierPostFix` of the current step when the step is a child of a looping strategy.

#### \<+stage.identifierPostFix>

This expression retrieves the `identifierPostFix` of the stage when the current node's stage is a child of a looping strategy.

#### \<+stepGroup.identifierPostFix>

This expression returns the `identifierPostFix` of the step group when the current node is under the step group, or when the current node is the step group itself, and that step group is a child of a looping strategy.

#### \<+strategy.node.STRATEGY_NODE_IDENTIFIER.identifierPostFix>

This expression retrieves the `identifierPostFix` for the node that is the child of a looping strategy with the identifier `STRATEGY_NODE_IDENTIFIER`.
For example, let's consider two nested step groups, sg1 and sg2 (child of sg1). Both sg1 and sg2 have a looping strategy configured. The expression, `<+stepGroup.identifierPostFix>` always retrieves the `identifierPostFix` of sg2.

Use the following expressions to obtain the `identifierPostFix` for a specific step group:

- `<+strategy.node.sg1.identifierPostFix>`: Retrieves the `identifierPostFix` for the node with the identifier sg1 (parent step group).
- `<+strategy.node.sg2.identifierPostFix>`: Retrieves the `identifierPostFix` for the node with the identifier sg2 (child step group).

![](./static/nested-looping-strategy.png)

Similarly, you can use other strategy expressions for any specific strategy level if a looping strategy is configured for both the parent and child nodes.

#### \<+strategy.node.STRATEGY_NODE_IDENTIFIER.\*>

Using this format, you can retrieve the values of any strategy expressions associated with looping strategies at various levels. This is useful when looping strategies are configured within nested levels.

Here are some examples:

- `<+strategy.node.sg1.iteration>`: Retrieves the current iteration of the node with the identifier sg1 (parent step group).
- `<+strategy.node.sg2.iteration>`: Retrieves the current iteration of the node with the identifier sg2 (child step group).
- `<+strategy.node.some_node_with_looping_strategy.iteration>`: Retrieves the current the iteration of the node with identifier `some_node_with_looping_strategy` (`some_node_with_looping_strategy` can be any type of node stage, step, or step group).
- `<+strategy.node.sg1.iterations>`: Retrieves the total iterations of the node with the identifier sg1.
- `<+strategy.node.sg2.iterations>`: Retrieves the total iterations of the node with the identifier sg2.
- `<+strategy.node.some_node_with_looping_strategy.iterations>`: Retrieves the total iterations of the node with the identifier `some_node_with_looping_strategy`.
- `<+strategy.node.sg1.matrix.key1>`: Retrieves the value for the matrix axis key1 for the node with the identifier sg1 if a matrix looping strategy is configured for sg1.
- `<+strategy.node.sg2.matrix.key1>`: Retrieves the value for the matrix axis key1 for the node with the identifier sg2 if a matrix looping strategy is configured for sg2.
- `<+strategy.node.some_node_with_looping_strategy.matrix.key1>`: Retrieves the value for the matrix axis key1 for the node with the identifier `some_node_with_looping_strategy` if a matrix looping strategy is configured for `some_node_with_looping_strategy`.

## Triggers

### \<+trigger.artifact.build>

Resolves to the artifact version (such as a Docker Tag) that initiated an [On New Artifact Trigger](../triggers/trigger-on-a-new-artifact.md).

When you add a new artifact trigger, you select the artifact to listen on, and its **Tag** setting is automatically populated with `<+trigger.artifact.build>`.

![](./static/harness-variables-50.png)

The `<+trigger.artifact.build>` used for **Tag** makes sure that the new artifact version that executed the trigger is used for the deployment.

Adding a new tag to the artifact fires the trigger and executes the pipeline. Harness resolves `<+trigger.artifact.build>` to the tag that fired the trigger. This makes sure that the new tag is used when pulling the artifact and the new artifact version is deployed.

### \<+trigger.artifact.source.connectorRef>

Resolves to the Harness connector Id for the connector used to monitor the artifact registry that fired the trigger.

### \<+trigger.artifact.source.imagePath>

Resolves to the image path for the artifact that fired the trigger.

### Git trigger and payload expressions

Harness includes built-in expressions for referencing trigger details such as a PR number.

For example:

- `<+trigger.type>`
  - Webhook.
- `<+trigger.event>`
  - PR, PUSH, etc.

For a complete list, see [Triggers Reference](../triggers/triggers-reference.md).

### Triggers and RBAC

Harness RBAC is applied to triggers in Harness, but it is not applied to the repositories used by the triggers.

For example, you might have an [On New Artifact Trigger](../triggers/trigger-on-a-new-artifact.md) that is started when a new artifact is added to the artifact repo. Or a [Webhook Trigger](../triggers/triggering-pipelines.md) that is started when a PR is merged.

You can select who can create and use these triggers within Harness. However, you must use your repository's RBAC to control who can add the artifacts or initiate events that start the Harness trigger.

## Kubernetes

### $\{HARNESS_KUBE_CONFIG_PATH}

The path to a Harness-generated kubeconfig file containing the credentials you provided to Harness. The credentials can be used by kubectl commands by exporting its value to the KUBECONFIG environment variable.

Harness only generates this kubeconfig file when a delegate is outside of the target cluster and is making a remote connection. When you set up the Kubernetes cluster connector to connect to the cluster, you select the **Specify master URL and credentials** option. The master URL and credentials you supply in the connector are put in the kubeconfig file and used by the remote delegate to connect to the target cluster.

Consequently, you can only use `${HARNESS_KUBE_CONFIG_PATH}` when you are using a delegate outside the target cluster and a Kubernetes cluster connector with the **Specify master URL and credentials** option.

If you are running the script using an in-cluster delegate with the **Use the credentials of a specific Harness Delegate** credentials option, then there are no credentials to store in a kubeconfig file since the Delegate is already an in-cluster process.

You can use this variable in a [Shell script](/docs/continuous-delivery/x-platform-cd-features/cd-steps/utilities/shell-script-step) step to set the environment variable at the beginning of your kubectl script:

`export KUBECONFIG=${HARNESS_KUBE_CONFIG_PATH}`

Example: Get the pods in the default namespace

```
export KUBECONFIG=${HARNESS_KUBE_CONFIG_PATH} kubectl get pods -n default
```

Example: Restart a deployment object in the Kubernetes Cluster

```
export KUBECONFIG=${HARNESS_KUBE_CONFIG_PATH}
kubectl rollout restart deployment/mysql-deployment
```

The `${HARNESS_KUBE_CONFIG_PATH}` expression can be used in scripts in Shell script steps. It cannot be used in other scripts such as a Terraform script.

### kubernetes.release.revision

Harness expression for the deployment revision number.

You can use the expression `<+kubernetes.release.revision>` in values.yaml, OpenShift Params, and Kustomize Patches.

This will help you to:

- Reference the current Harness release number as part of your manifest.
- Reference versioned ConfigMaps and Secrets in custom resources and fields unknown by Harness.

**Important:** Users must update their delegate to version 1.0.79100 to use this expression.

## Helm chart expressions

import HelmManifestExpressions from '/docs/continuous-delivery/shared/helm-manifest-expressions.md';

<HelmManifestExpressions name="helmexpressions" />

## Tag expressions

You can reference tags using Harness expressions.

You simply reference the tagged entity and then use `tags.TAG_NAME`, like `<+pipeline.tags.docs>`

For example, here are several different references:

- `<+pipeline.tags.TAG_NAME>`
- `<+stage.tags.TAG_NAME>`
- `<+pipeline.stages.STAGE_ID.tags.TAG_NAME>`
- `<+serviceConfig.service.tags.TAG_NAME>`

## Migrate FirstGen expressions to NextGen

Use this information if you need to migrate expressions from Harness FirstGen to Harness NextGen.

:::warning

All FirstGen expressions use the delimiter `${...}`, such as `${approvedBy.name}`.

In NextGen, the delimiter is `<+...>`, such as `<+approvedBy.name>`.

:::

<details>
<summary>AMI expressions</summary>

| FirstGen | NextGen |
| -------- | ------- |
| `ami.newAsgName` | Rolling: `pipeline.stages.STAGE_ID.spec.execution.steps.AsgRollingDeployStep.output.asg.autoScalingGroupName`<br/>Blue Green: `pipeline.stages.STAGE_ID.spec.execution.steps.AsgRollingDeployStep.output.prodAsg.autoScalingGroupName`       |
| `ami.oldAsgName`    | Rolling: `pipeline.stages.STAGE_ID.spec.execution.steps.AsgRollingDeployStep.output.asg.autoScalingGroupName`<br/>Blue Green: `pipeline.stages.STAGE_ID.spec.execution.steps.AsgRollingDeployStep.output.stageAsg.autoScalingGroupName`    |

</details>

<details>
<summary>Approvals expressions</summary>

| FirstGen | NextGen |
| -------- | ------- |
| `approvedBy.name`  | `pipeline.stages.STAGE_ID.spec.execution.steps.HarnessApproval.output.approvalActivities[0].user.name`  |
| `approvedBy.email` | `pipeline.stages.STAGE_ID.spec.execution.steps.HarnessApproval.output.approvalActivities[0].user.email ` |

</details>

<details>
<summary>Artifacts expressions</summary>

| FirstGen | NextGen |
| -------- | ------- |
| `artifact.metadata.image`  | `artifact.image`  |
| `artifact.source.dockerconfig` | `artifact.imagePullSecret`  |
| `artifact.metadata.tag`<br/>`artifact.buildNo`<br/>`artifact.revision`  | `artifact.tag`    |
| `artifact.url` | `artifact.metadata.url` |
| `artifact.metadata.image`      | `artifact.imageartifact.image`<br/>Path for sidecar artifact: `artifacts.sidecars.sidecarId.PROPERTY`  |
| `artifact.metadata.KEY`     | `artifact.metadata.KEY` |
| `artifact.key`  | `artifact.metadata.key`   |
| `artifact.source.registryUrl`   | Depends on artifact source type. Check the output of the Service step.   |
| `artifact.source.repositoryName`   | Depends on artifact source type. Check the output of the Service step.   |
| `artifact.metadata.artifactId`      | `artifact.metadata.artifactId` |
| `artifact.bucketName`   | `artifact.metadata.bucketName` |
| `artifact.artifactPath`    | `artifact.metadata.artifactPath`   |
| `artifact.metadata.repositoryName`   | `artifact.metadata.repositoryName`    |
| `artifact.metadata.harness`     | `artifact.metadata.harness`     |
| `artifact.metadata.groupId`      | `artifact.metadata.groupId`     |
| `artifact.fileName`     | `artifact.metadata.fileName`    |
| `artifact.metadata.getSHA()`  | `artifact.metadata.SHA`   |
| Application  | Application (account, org, project)    |
| `app.name`   | `account.name`<br/>`account.companyName`<br/>`org.name`<br/>`project.name`<br/>`projectidentifier`   |
| `app.description`   | `project.description`<br/>`org.description`   |
| `app.accountId`  | `account.identifier`    |
| `app.defaults.[variable_name]`     | `variable.[VARIABLE_ID]`  |
| `artifact.displayName`   |    |
| `artifact.label.label-key`  |    |
| `artifact.buildFullDisplayName`  |       |
| `artifact.label.get("[label-key]")`   |    |
| `artifact.serviceIds`    | Not applicable in NextGen    |
| `artifact.description`   | Not applicable in NextGen   |
| `artifact.source.username`   | Not applicable in NextGen |

</details>

<details>
<summary>CloudFormation expressions</summary>

| FirstGen | NextGen |
| -------- | ------- |
| `cloudformation.OUTPUT_NAME`    | `pipeline.stages.STAGE_ID.spec.execution.steps.CreateStack.output.OUTPUT_NAME`   |
| `cloudformation.region`  | `pipeline.stages.stage1.spec.execution.steps.CreateStack.output.region`    |

</details>

<details>
<summary>CONFIG file and CONFIG path expressions</summary>

Harness NextGen has expressions for CONFIG files. These expressions, listed below, have no equivalent FirstGen expressions. This is not an exhaustive list of all NextGen expressions or NextGen expressions without a FirstGen equivalent.

* `configFile.getAsString("cf_file")`
* `configFile.getAsBase64("cf_file") `
* `configFile.getAsString("cf_secret") `
* `configFile.getAsBase64("cf_secret")`
* `fileStore.getAsString("/folder1/configFileProject")`
* `fileStore.getAsBase64("account:/folder1/folder2/ConfigFile")`

For information about the replacement for the FirstGen KUBE_CONFIG_PATH expression `infra.kubernetes.infraId`, go to [HARNESS_KUBE_CONFIG_PATH](#harness_kube_config_path).

</details>

<details>
<summary>Email step expressions</summary>

| FirstGen | NextGen |
| -------- | ------- |
| `toAddress`  | `pipeline.stages.STAGE_ID.spec.execution.steps.STEP_ID.spec.to`    |
| `ccAddress`   | `pipeline.stages.STAGE_ID.spec.execution.steps.STEP_ID.spec.cc`    |
| `subject`       | `pipeline.stages.STAGE_ID.spec.execution.steps.STEP_ID.spec.subject`     |
| `body`     | `pipeline.stages.STAGE_ID.spec.execution.steps.STEP_ID.spec.body`      |

</details>

<details>
<summary>Environment expressions</summary>

| FirstGen | NextGen |
| -------- | ------- |
| `env.description`    | FQN: `stages.STAGE_ID.spec.infrastructure.environment.name`(Alias: `env.description`)<br/>FQN: `stages.STAGE_ID.spec.infrastructure.environment.description`   |
| `env.environmentType`   | `env.type`     |
| `env.name`   | `env.name`     |
| `env.accountId`    | `account.identifier`    |
| `env.keywordsenvironmentVariable.variable_name`   | `env.variables.var_name`    |

</details>

<details>
<summary>HTTP step expressions</summary>

| FirstGen | NextGen |
| -------- | ------- |
| `httpResponseCode` | `httpResponseCode` |
| `httpResponseBody` | `httpResponseBody` |
| `httpMethod` | `httpMethod` |
| `httpUrl` | `httpUrl` |
| `httpResponseMethod` | `pipeline.stages.HTTP.spec.execution.steps.STEP_ID.output.httpMethod` |
| `httpResponseCode` | `pipeline.stages.HTTP.spec.execution.steps.STEP_ID.output.httpResponseCode` |
| `httpResponseBody` | `pipeline.stages.HTTP.spec.execution.steps.STEP_ID.output.httpResponseBody` |

</details>

<details>
<summary>Infrastructure expressions</summary>

| FirstGen | NextGen |
| -------- | ------- |
| `infra.kubernetes.namespace`   | `infra.namespace`<br/>`infra.releaseName`<br/>FQN: `stages.STAGE_ID.spec.infrastructure.infrastructureDefinition.spec.namespace` |
| `infra.name`   | `infra.name`    |
| `infra.cloudProvider.name`   | `infra.connectorRef`    |
| `infra.route`    |      |
| `infra.tempRoute`   |         |

</details>

<details>
<summary>Instance and host expressions</summary>

All FirstGen `host` expressions are deprecated. Host properties are available using `instance` expressions.

| FirstGen | NextGen |
| -------- | ------- |
| `instance.name`   | `instance.name`     |
| `instance.hostName`   | `instance.hostName`     |
| `instance.host.hostName`     | `instance.host.hostName`     |
| `instance.host.ip`   | `instance.host.privateIp`<br/>`instance.host.publicIp`<br/>`privateIp `and `publicIp` are supported for Azure, AWS, and SSH/WinRM deployments. |
| `instance.EcsContainerDetails.completeDockerId`<br/>`instance.EcsContainerDetails.dockerId`   | `pipeline.stages.STAGE_IDENTIFIER.spec.execution.steps.STEP_IDENTIFIER.steps.STEP_IDENTIFIER.deploymentInfoOutcome.serverInstanceInfoList[x].containers[x].runtimeId`     |
| `instance.ecsContainerDetails.taskId`<br/>`instance.ecsContainerDetails.taskArn`   | `pipeline.stages.STAGE_IDENTIFIER.spec.execution.steps.STEP_IDENTIFIER.steps.STEP_IDENTIFIER.deploymentInfoOutcome.serverInstanceInfoList[x].taskArn` |
| `ECSServiceSetup.serviceName`    | `service.name` (This expression works only if you use it in the service definition manifest as well)<br/>`pipeline.stages.ecs.spec.execution.steps.STEP_ID.output.serviceName`   |
| `ECSServiceSetup.clusterName`  | `infra.cluster`     |
| `instance.dockerId`    | TBD     |
| `[step__name].serviceName`    | Not applicable in NextGen    |
| `instance.host.publicDns`    | Not applicable in NextGen    |

Deprecated `host` expressions (In NextGen, host properties are available using `instance` expressions):
* `host.name`
* `host.ip`
* `host.publicDns`
* `host.ec2Instance.instanceId`
* `host.ec2Instance.instanceType`
* `host.ec2Instance.imageId`
* `host.ec2Instance.architecture`
* `host.ec2Instance.kernelId`
* `host.ec2Instance.keyName`
* `host.ec2Instance.privateDnsName`
* `host.ec2Instance.privateIpAddress`
* `host.ec2Instance.publicDnsName`
* `host.ec2Instance.publicIpAddress`
* `host.ec2Instance.subnetId`
* `host.ec2Instance.vpcId`
* `host.hostName`

</details>

<details>
<summary>Pipeline variables</summary>

| FirstGen | NextGen |
| -------- | ------- |
| `pipeline.name`   | `pipeline.name`  |
| `deploymentUrl`  | `pipeline.executionUrl`     |
| `deploymentTriggeredBy`   | `pipeline.triggeredBy.name`<br/>`pipeline.triggeredBy.email`     |

</details>

<details>
<summary>Rollback artifact variables</summary>

| FirstGen | NextGen |
| -------- | ------- |
| `rollbackArtifact.buildNo`   | `artifact.tagrollback`<br/>`artifact.imagerollback`<br/>`artifact.imagePathrollback`<br/>`artifact.typerollback`<br/>`artifact.connectorRef`<br/>For sidecar artifact: `rollbackArtifact.sidecars.sidecar_Id`[property]    |
| `rollbackArtifact.metadata.image`    | `rollbackArtifact.image`    |
| `rollbackArtifact.metadata.tag`     | `rollbackArtifact.tag`    |
| `rollbackArtifact.buildFullDisplayName`    |         |
| `rollbackArtifact.ArtifactPath`    |     |
| `rollbackArtifact.description`  |       |
| `rollbackArtifact.displayName`     |      |
| `rollbackArtifact.fileName`    |    |
| `rollbackArtifact.key`     |      |
| `rollbackArtifact.source.registryUrl`       |               |
| `rollbackArtifact.url`   | Not applicable in NextGen   |

</details>

<details>
<summary>Service expressions</summary>

| FirstGen | NextGen |
| -------- | ------- |
| `service.name`   | `service.name`    |
| `service.description`  | `service.description`  |
| `serviceVariable.VAR_NAME`    | `serviceVariables.VAR_NAME`  |
| `service.manifest`  | `manifest.name`   |
| `service.manifest.repoRoot`   | `manifest.repoName`     |

</details>

<details>
<summary>Tanzu application services expressions</summary>

| FirstGen | NextGen |
| -------- | ------- |
| `pcf.finalRoutes`    | `pcf.finalRoutes`     |
| `pcf.oldAppRoutes`    | `pcf.oldAppRoutes`   |
| `pcf.oldAppRoutes[0]`  | `pcf.oldAppRoutes[0]` |
| `pcf.tempRoutes`    | `pcf.tempRoutes`   |
| `pcf.newAppRoutes`     | `pcf.newAppRoutes`    |
| `pcf.newAppRoutes[0]`   | `pcf.newAppRoutes[0]`  |
| `pcf.newAppName`   | `pcf.newAppName`      |
| `pcf.newAppGuid`<br/>`host.pcfElement.applicationId`  | `pcf.newAppGuid`   |
| `pcf.oldAppName`      | `pcf.oldAppName`   |
| `pcf.activeAppName`     | `pcf.activeAppName`    |
| `pcf.inActiveAppName`     | `pcf.inActiveAppName`   |
| `pcf.oldAppGuid`    | `pcf.oldAppGuid`   |
| `infra.pcf.cloudProvider.name`     | `infra.connector.name`  |
| `infra.pcf.organization`    | `infra.organization`  |
| `infra.pcf.space`     | `infra.space`  |
| `host.pcfElement.displayName`    | Basic or Canary deployment: `pcf.newAppName`<br/>Blue Green deployment: `pcf.inActiveAppName`     |
| `host.pcfElement.instanceIndex`    |    |

</details>

<details>
<summary>Terraform and Helm expressions</summary>

| FirstGen | NextGen |
| -------- | ------- |
| `terraform.clusterName` | `STEP_ID.output.OUTPUT_NAME`<br/>For example: `pipeline.stages.stage1.spec.execution.steps.TerraformApply.output.clusterName` |
| `terraformPlan.jsonFilePath()`<br/>`terraformPlan.destroy.jsonFilePath()`  | `execution.steps.TERRAFORM_PLAN_STEP_ID.plan.jsonFilePath`<br/>For example: `execution.steps.terraformPlan.plan.jsonFilePath`  |
| `terraformApply.tfplanHumanReadable`<br/>`terraformDestroy.tfplanHumanReadable` | `execution.steps.TERRAFORM_PLAN_STEP_ID.plan.humanReadableFilePath`<br/>For example: `execution.steps.terraformPlan.plan.humanReadableFilePath`   |
| `terraform.OUTPUT_NAME` | `pipeline.stages.STAGE_ID.spec.execution.steps.TerraformApply.output.OUTPUT_NAME`   |
| `terraformApply.tfplan`   |   |
| `terraformDestroy.tfplan` |   |
| `terraformApply.add` |   |
| `terraformApply.change` |   |
| `terraformApply.destroy` |    |
| `terraformDestroy.add` |     |
| `terraformDestroy.change` |   |
| `terraformDestroy.destroy` |    |
| `infra.helm.releaseName.service.name-env.name-infra.helm.shortId`   | `pipeline.stages.STAGE_ID.spec.infrastructure.infrastructureDefinition.spec.output.releaseName`<br/>`pipeline.stages.STAGE_ID.spec.execution.steps.rolloutDeployment.deploymentInfoOutcome.serverInstanceInfoList[2].releaseName`  |
| `helmChart.description`   | `service.description`   |
| `helmChart.displayName`   | `pipeline.stages.STAGE_ID.spec.serviceConfig.output.manifestResults.SERVICE_ID.chartName`   |
| `helmChart.name`       | `pipeline.stages.STAGE_ID.spec.execution.steps.rolloutDeployment.output.releaseName`   |
| `helmChart.version`     | `pipeline.stages.STAGE_ID.spec.serviceConfig.output.manifestResults.SERVICE_ID.helmVersion`    |
| `infra.helm.shortId`   | Not applicable in NextGen   |
| `helmChart.metadata.basePath`    | Not applicable in NextGen |
| `helmChart.metadata.bucketName`    | Not applicable in NextGen |
| `helmChart.metadata.repositoryName`      | Not applicable in NextGen  |
| `helmChart.metadata.url`    | Not applicable in NextGen  |

:::note nested expressions

The way you declare nested expressions has changed in NextGen.

For example, these are nested FirstGen expressions: `secrets.getValue("terraform-aws-env_name-id")`.

To achieve this same result in NextGen, you must declare each expression with separate expression delimiters and concatenate them together, such as:

```
<+secrets.getValue("test_secret_" + <+pipeline.variables.envVar>)>
<+<secrets.getValue("test_secret")>.concat(<+pipeline.variables.envVar>)>
```

:::

</details>

<details>
<summary>Workflow expressions</summary>

| FirstGen | NextGen |
| -------- | ------- |
| `workflow.releaseNo`   | `stage.identifier`     |
| `workflow.displayName`  | `stage.name`<br/>`pipeline.name`   |
| `workflow.description`  | `stage.description`<br/>`pipeline.description`    |
| `workflow.pipelineDeploymentUuid`   | `pipeline.executionId`<br/>`pipeline.sequenceId`   |
| `workflow.startTs`  | `pipeline.startTs`   |
| `workflow.variables.VAR_NAME`    | `pipeline.variables.VAR_NAME`<br/>`stage.variables.VAR_NAME`   |
| `deploymentUrl`  | `pipeline.executionUrl` |
| `deploymentTriggeredBy`  | `pipeline.triggeredBy.name`<br/>`pipeline.triggeredBy.email`      |
| `currentStep.name`   | `step.name`   |
| `timestampId`   | In FirstGen `${timestampId}` is the time when the constant is set on the target host.<br/>NextGen doesn't use setup variables, because Harness has an internal step that creates a temp dir for the execution.<br/>Harness creates a working directory in the Command Init unit on this `%USERPROFILE%` location. |
| `context.published_name.var_name`  |   |
| `workflow.pipelineResumeUuid`   | Not applicable in NextGen |
| `workflow.lastGoodReleaseNo`    | Not applicable in NextGen     |
| `workflow.lastGoodDeploymentDisplayName`     | Not applicable in NextGen    |
| `regex.extract("v[0-9]+.[0-9]+", artifact.fileName)`   | Not applicable in NextGen     |
| `currentStep.type`  | Not applicable in NextGen    |

</details>

For more information about migrating to NextGen, go to:

- [Upgrade guide](/docs/continuous-delivery/get-started/upgrading/upgrade-nextgen-cd.md)
- [FirstGen and NextGen CD parity matrix](/docs/continuous-delivery/get-started/upgrading/feature-parity-matrix/)
- [Harness CD upgrading FAQ](/docs/continuous-delivery/get-started/upgrading/cdng-upgrade-faq/)
