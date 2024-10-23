---
title: Template design guide
description: Standardize patterns, streamline processes, eliminate duplication.
sidebar_position: 5
---


Harness templates serve as a powerful tool to standardize deployment patterns, streamline processes, and eliminate duplicate efforts. 

This guide outlines a set of best practices to utilize Harness templates more effectively.

For more information on templates, go to:

- [Templates overview](/docs/platform/templates/template).
- [Best practices and guidelines for templates](/docs/platform/templates/templates-best-practices).
- [Use a template](/docs/platform/templates/use-a-template).

## Variables with templates

:::note

For general information and a list of Harness built-in variables, go to [Use Harness expressions](/docs/platform/variables-and-expressions/harness-variables). 

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

When possible, it's best to mark all the stage and step [failure strategies](/docs/continuous-delivery/x-platform-cd-features/executions/step-failure-strategy-settings.md) and advanced settings as `<+input>` to ensure the greatest amount of flexibility by your team members. If these settings are not externalized as inputs to the template, then end users of the template are not able to modify them.

For details on advanced settings, go to:

* [Delegate Selector](/docs/platform/delegates/manage-delegates/select-delegates-with-selectors).
* [Conditional Execution](/docs/platform/pipelines/step-skip-condition-settings).
* [Failure Strategy](/docs/continuous-delivery/x-platform-cd-features/executions/step-failure-strategy-settings.md).
* [Looping Strategy](/docs/platform/pipelines/looping-strategies/looping-strategies-matrix-repeat-and-parallelism).
* [Policy Enforcement](/docs/platform/governance/policy-as-code/harness-governance-overview).

## Template Development and Release Lifecycle

Harness templates provide many different options for managing versions and controlling releases, as well as different ways those changes can be tracked, such as through versioning and using git branches in remote backed templates.

Both should be used in order to effectively manage developing changes safely while releasing those changes to the consuming pipelines with minimal effort. The following template setup recommendations offers best practices for incorporating these strategies into a template development lifecycle.

### Versioning Templates

Template versioning should be utilized, with versions created by the template maintainer for template consumers to select based on their needs. Templates should also be tracked remotely in Git, with consumers typically using the default branch (usually `main`) and the latest integer version. While the **Stable** label may be used, it is not recommended for centrally managed templates, as multiple versions may be supported (and thus considered "stable") for some amount of time.

Integer based “semantic versioning” should be used, where the version includes only the major version component. So a new template will have a version of `v1` and will be checked into `main`.

### Developing Updates

All changes made to a template should be done against a feature branch, to prevent in-progress changes from breaking the pipelines consuming that version. The version used to release the changes will depend on the nature of the changes the template developer intends to introduce. This can be broken down into two parts.

#### Non-Breaking Changes, aka patches and minor releases

Non breaking changes, such as bug fixes or functionality improvements that existing users can use without intervention, should be released as an update to the current template version. These types of changes should be saved on a feature branch off of `main`, saving them under the template version the changes are be developed on (typically the latest, such as `v1` in our example above).  

#### Breaking Changes, aka Major releases

Breaking changes are any changes to runtime inputs, defaults on runtime inputs, or any other change in behavior that requires manual intervention. Updates that include breaking changes should be developed on a feature branch, but also under a new major version.  So in our `v1` example, this update will be saved under a new version `v2`.

### Testing Template Changes

A testing pipeline should be setup to the template being developed which can be run to test the template functionality. This testing pipeline should be setup to use the feature branch under development, and also the new major version if the update includes a breaking change.  You can run this pipeline to test the updates as you develop the change.  When all is complete and the template exectuion is successful, this change can be released to users by merging this feature branch to `main` with a PR.  

Once everything is done and checks out good, merge the feature branch to main, which will push the update to all the consumers of the template with no intervention.  Changes can be rolled back by reverting the commit in git in the event of any issue.

### Releasing Template Updates

When following the above flow, template updates for non breaking changes are released out to users automatically with no intervention once the update is merged.  

For breaking changes, users should be notified when the new version becomes available so they can update their pipelines to consume the new version. An end of life date should be set for the old version, by which all template consumers should complete moving over to the new version. Pipelines in scope can be determined by using the "Referenced By" tab when viewing the template in the templates menu.

Template consumers incorporating new versions containing breaking changes should make their updates on a feature branch, to avoid impacting their users.  Like templates, this is accomplished by using the GitX feature to remotely track the pipeline or template in a git repository.  Saving the changes to a new feature branch, and selecting this branch when running the pipeline to test the change.  Once the changes are tested with a successful pipeline run, merge the feature branch into `main` to roll the change out to the production pipeline.

## Conclusion

Templates are a powerful way to standardize processes, centralize common tasks to avoid code duplication, and help end users get started quickly. Applying the practices above allows for maximum reuse, while minimizing the disruption to template consumers during updates.









