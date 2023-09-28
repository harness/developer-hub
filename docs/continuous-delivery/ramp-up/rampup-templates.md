---
title: Templates ramp-up guide
description: Standardize patterns, streamline processes, eliminate duplication.
sidebar_position: 3
---


Harness templates serve as a powerful tool to standardize deployment patterns, streamline processes, and eliminate duplicate efforts. 

This guide outlines a set of best practices to utilize Harness templates more effectively.

For more information on templates, go to:

- [Templates overview](/docs/platform/templates/template).
- [Best practices and guidelines for templates](/docs/platform/Templates/templates-best-practices).
- [Use a template](/docs/platform/Templates/use-a-template).

## Variables with templates

:::note

For general information and a list of Harness built-in variables, please see [Built-in and custom Harness variables reference](/docs/platform/variables-and-expressions/harness-variables). 

:::

Templates should have a well defined interface for expected inputs and should not rely on the assumption that certain variables exist in a pipeline where they will be used. 

For example, when defining a step or stage template, avoid referencing any pipeline-level variables (such as `<+pipeline.variables.VAR_NAME>`). This practice can break encapsulation and might not clearly communicate to the template users that their pipeline requires these variables to be defined. 

This rule also applies to using stage-level variables inside of a step template (for example, `<+stage.variables.VAR_NAME>`).

Instead, use [runtime inputs](/docs/platform/variables-and-expressions/runtime-inputs) (`<+input>`) to expose *necessary* variables in your templates. Additionally, Harness provides numerous [built-in variables](/docs/platform/variables-and-expressions/harness-variables), such as `<+env.name>`, that are very useful. 

As a best practice, limit the usage of these variables inside templates as much as possible. Instead, assign the decision to the template user. This allows for greater flexibility and adaptability when applying the template to different use cases.

### Runtime inputs

When marking a setting or variable as `<+input>`, always try and provide a default value.

### Descriptions

Always aim to provide detailed descriptions of variables. Additionally, use the **Description** setting on the template itself to offer further guidance on its usage. 

Descriptions not only enhance clarity but also facilitate efficient and correct usage of the templates by end users.

### Step templates

:::note

For details on step templates, go to:

- [Create a step template](/docs/platform/templates/run-step-template-quickstart).
- [Create a remote step template](https://developer.harness.io/docs/platform/templates/create-a-remote-step-template).

:::


Step templates serve as an efficient way to encapsulate common tasks that can be reused across multiple pipelines. 

Make sure to mark all configurable fields as `<+input>`. With shell scripts specifically, you should define input variables as `<+input>` and then reference them in the script using `${SOME_VAR}` for bash or `$Env:SOME_VAR` for PowerShell.

Below are examples of proper and improper usage:

#### Bad

In this example, a pipeline-level variable is directly referenced. This practice makes it unclear for the template users about the required variables.

```yaml
template:
  name: Example Step Template - Bad
  identifier: Example_Step_Template_Bad
  type: Step
  spec:
    type: ShellScript
    spec:
      shell: Bash
      source:
        type: Inline
        spec:
          script: echo "<+pipeline.variables.my_var>"
```

#### Good

This example correctly uses an input variable and references it within the script, promoting clarity and flexibility.

```yaml
template:
  name: Example Step Template - Good
  type: Step
  spec:
    type: ShellScript
    spec:
      shell: Bash
      source:
        type: Inline
        spec:
          script: echo "${SOME_VAR}"
      environmentVariables:
        - name: SOME_VAR
          type: String
          value: <+input>
```

### Stage templates

Stage templates are a great way to standardize complex workflows and deployment stages across multiple pipelines. They enable consistent application deployment practices, promoting reliability and efficiency. 

As with step templates, you should mark all configurable fields as `<+input>`, creating a clear interface for those using the template. This approach ensures that stage templates remain flexible and adaptable to various use cases, ultimately contributing to the robustness and scalability of your DevOps processes.

Stage templates offer a wide range of configurable parameters. You should generally set values such as `environment`, `infrastructure`, `connectors`, `namespace`, and other stage-specific settings as runtime inputs. This practice provides maximum flexibility when integrating these templates into pipelines later.

Marking certain settings within steps as `<+input>` for user configuration might seem intuitive, but this can break encapsulation and should be avoided when possible. 

Instead, aim to create a well-defined interface by utilizing **stage variables** and marking them as `<+input>`. You can then incorporate these into the step by referencing them as `<+stage.variables.VAR_NAME>`. This principle applies whether you're using inline steps or referencing step templates.

To further clarify these points, below are examples illustrating both improper and proper practices:


#### Bad

In this example, a setting within a step is directly marked as `<+input>`, which disrupts encapsulation.

```yaml
template:
  name: Stage Template Example - Bad
  identifier: Stage_Template_Example_Bad
  type: Stage
  spec:
    type: CI
    spec:
      cloneCodebase: true
      execution:
        steps:
          - step:
              type: Run
              name: echo
              identifier: echo
              spec:
                shell: Bash
                command: echo "${MY_VAR}"
                envVariables:
                  MY_VAR: <+input>
```

#### Good

This example effectively utilizes a stage variable marked as `<+input>`, maintaining encapsulation and providing a clear interface.

```yaml
template:
  name: Stage Template Example - Good
  identifier: Stage_Template_Example_Good
  type: Stage
  spec:
    type: CI
    spec:
      cloneCodebase: true
      execution:
        steps:
          - step:
              type: Run
              name: echo
              identifier: Run_1
              spec:
                shell: Bash
                command: echo "${MY_VAR}"
                envVariables:
                  MY_VAR: <+stage.variables.my_var>
    variables:
      - name: my_var
        type: String
        description: ""
        value: <+input>
```

### Pipeline templates

Pipeline templates are a fantastic tool for standardizing the entire CI/CD process across a diverse set of projects or teams. They provide a comprehensive framework for defining end-to-end workflows, including various stages, steps, environment variables, and other configurations.

When a step in a pipeline requires user input, it's advisable to first create a corresponding stage-level variable and reference it in the step using `<+stage.variables.VAR_NAME>`. Next, create a corresponding pipeline-level variable and reference it by setting the value of the stage variable to `<+pipeline.variables.VAR_NAME>`.

Why not just reference the pipeline variable directly in the step in this case? This might seem like an unnecessary level of indirection at first, but later on if you decide to make a template out of the stage, this will make it much easier without having to update all the references to `<+pipeline.variables.VAR_NAME>`.

### Secrets

When defining a variable in a template as a secret, there are additional considerations to bear in mind. For instance, you cannot have multiple levels of indirection with secrets. 

Let's consider an example. You're creating a pipeline containing a stage-level template, following the guidelines mentioned above. This stage template has a variable `aws_secret_key` marked as a secret and `<+input>`. 

While using this in your pipeline, you might create a pipeline-level variable named `aws_secret_key` also marked as a secret and `<+input>`, and set the stage-level value to `<+pipeline.variables.aws_secret_key>`. 

This creates a problem. Now you have a pipeline-level variable marked as a secret, being passed into the stage-level variable which is also expecting a secret. This can lead to resolution issues.

To circumvent this problem, define all variables in stage and step-level templates as non-secret types. Then, depend on the consumers of these templates to create higher-level variables marked as secrets. This approach ensures the secure handling of sensitive data without the complications of multilevel indirection.

## Referencing and copying templates

When using a template, there are two options: **Use Template** or **Copy Template**.

### Use Template

Choosing **Use Template** means that you are creating a *reference* to the template. In this case, any updates made to the template will automatically reflect for all who are using it. 

For example, if you have created a stage template for CI and later decide to add an image scanning step, this can be incorporated directly into the template. 

Consequently, everyone referencing this template will have the new step included in their configuration automatically. For more details about how updates are managed, go to the [versioning](#versioning) section of this topic.

### Copy Template

The **Copy Template** option can be useful when you wish to provide a starting point but want to allow complete flexibility over the configuration. This approach can be beneficial in certain situations but should be used with caution, as it can lead to configuration sprawl.

A common use case where this can be helpful, but also still provide some amount of centralized control, is a pipeline template made up of stage templates. The pipeline template can be used like a *stamp* to provide a starting point, but the actual release process inside can be modified for organizations where this process might vary across teams.

As a general rule, start with the **Use Template** option and only opt for **Copy Template** when absolutely necessary. This ensures that updates to the template benefit all users and helps prevent unnecessary divergence in configuration.

## Failure strategies and advanced settings

When possible, it's best to mark all the stage and step [failure strategies](/docs/continuous-delivery/x-platform-cd-features/executions/step-and-stage-failure-strategy) and advanced settings as `<+input>` to ensure the greatest amount of flexibility by your team members. If these settings are not externalized as inputs to the template, then end users of the template are not able to modify them.

For details on advanced settings, go to:

* [Delegate Selector](/docs/platform/delegates/manage-delegates/select-delegates-with-selectors).
* [Conditional Execution](/docs/platform/pipelines/w_pipeline-steps-reference/step-skip-condition-settings).
* [Failure Strategy](/docs/platform/pipelines/w_pipeline-steps-reference/step-failure-strategy-settings).
* [Looping Strategy](/docs/platform/pipelines/looping-strategies-matrix-repeat-and-parallelism).
* [Policy Enforcement](/docs/platform/governance/Policy-as-code/harness-governance-overview).

## Versioning

The proper versioning of templates is an important part of maintaining a stable and efficient CI/CD process. 

Versioning facilitates the gradual rollout of template changes, enabling users to test and adapt to new versions in non-critical environments before fully deploying them in production. This strategy effectively mitigates the risks associated with introducing new template versions.

[Semantic versioning](https://semver.org/) is the preferred nomenclature for how to version templates.  Where the *major* version can indicate breaking changes, the *minor* version indicates small changes to functionality that are backwards compatible. The patch version indicates bug fixes. This is represented as `major.minor.patch` such as `1.0.0`.

### Pinning to stable version

When utilizing a pipeline as a reference, you're given the choice to either select a specific version or always use the stable version (**Set as Stable** option in a template). 

By always using the stable version, your pipeline is always kept up-to-date. Whenever a new version is released and marked as `stable`, your pipeline will automatically adopt any updates made in this revised template. 

This feature streamlines the integration of improvements and new features, eliminating the need for manual intervention to update the templates. Nonetheless, it's important to thoroughly test each new version in a non-production environment to ensure stability and compatibility with your pipeline's configuration.

Releasing a new version of a template that requires a change to the inputs in the template should not be done by directly updating the stable version. A release process for these kind of changes is described [below](#releasing-breaking-changes-to-templates).

### Branching

As an alternative to versioning, you can track template changes in different branches in Git using Harness [Git Experience](https://developer.harness.io/docs/platform/git-experience/git-experience-overview/).

A new version of a template should be released under a new branch for testing, and then merged down to the branch the template is configured to track (`main` or `master` preferred, but it might be something like `harness`).

Pipelines can be changed to use the template from this branch, or a new pipeline can be created from the template that targets this branch.

When using branches for versioning, it's best to avoid also using the built-in versioning. So something like `from-branch` or `latest` should be used in the version field when using this technique.

Just like with versioning using the `stable` tag, breaking changes like adding extra inputs should not be released without following the process described in [Releasing breaking changes to templates](#releasing-breaking-changes-to-templates).

## Testing changes

Before implementing any modifications, it's prudent to create a new version of your template. This practice safeguards your existing version from inadvertent overwrites.

After saving your modifications to the new version, you can then create a pipeline that utilizes your template to test out the new functionality. Once you're satisfied with the changes, consumers of your template can update the version or branch they're referencing to incorporate the changes. 

You also have the option to **Set as Stable** for your new version. As a result, any consumer [using the stable version](#pinning-to-stable-version) will automatically receive the updates.

## Releasing breaking changes to templates

Updates made to templates that can be considered breaking changes should be released in a metered way. Updates examples include modifying the input interface to a template or changes in behavior that require template consumers to make adjustments.

By releasing in a metered way, a change does not immediately impact all pipelines that are consuming the template. The actual technique varies whether you're using versioning or branching, and both are described below.


### Using versioning

Template updates for templates using versioning should be released under a new major version. For example, a current template version of `1.0.0` modified in this way should get a version of `2.0.0`.  

If the `stable` tag is used on the template and template consumers automatically push updates, then `stable` should not be updated to the latest major version until consumers of the tag are made aware and can adjust to the changes.

This can be done by having users modify their pipelines to use the new major version instead of `stable`, updating the inputs as the new version requires, and then testing the changes.

Once all the pipelines using the template have been updated and tested, the new version can be marked `stable`, and pipelines built from the template can move back to tracking `stable`.


### Using branching

Template updates for templates using branching should be created on a new branch.  

Pipelines that are built from this template should be updated to use the template from this new branch, adjust the inputs as required, and then test their pipeline using the latest version.

Once all pipelines have been modified to use this new branch, this branch can be merged down to the branch the template is configured to track, and teams should modify their pipelines to track this branch once again.

### Use default values to minimize impact

The use of default values in inputs can often be used to turn what would be a breaking change into a backwards compatible one. When changing the input interface your template, all effort should be made to find a default value for each input that can preserve the current behavior.

For example, take a template that works on all files in a directory, but add a filter parameter that can make it operate on a subset of files. Choosing a default value of `**/*` can make the template work for current users as is, while allowing someone to modify that filter and narrow down the scope to a subset of the files.

## Conclusion

Templates are a powerful way to standardize processes, centralize common tasks to avoid code duplication, and help end users get started quickly. Applying the practices above allows for maximum reuse, while minimizing the disruption to template consumers during updates.









