---
title: Add a stage
sidebar_label: Add a Stage
description: Learn how to add and configure a pipeline stage.
sidebar_position: 10
keywords:
  - pipeline stage
  - custom stage
  - dynamic stage
tags:
  - pipelines
helpdocs_topic_id: 2chyf1acil
helpdocs_category_id: kncngmy17o
helpdocs_is_private: false
helpdocs_is_published: true
redirect_from:
  - /docs/platform/pipelines/add-a-custom-stage
canonical_url: https://www.harness.io/blog/ci-cd-pipeline
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Stages are the primary building blocks of a Harness pipeline. A stage defines what work the pipeline performs and on what infrastructure that work runs. You can add stages of different types depending on the modules you have enabled in your project. This topic explains how to add and configure stages, including standard stages, custom stages, and dynamic stages.

This functionality is limited to the modules and settings that you have access to.

## What you will learn from this topic

- How to add a [stage](#add-a-stage) to your pipeline
- How to configure [stage names](#stage-names) and identifiers
- How to use [stage variables](#stage-variables) to pass data
- How to configure [advanced stage settings](#advanced-stage-settings) such as conditional executions and failure strategies
- How to add a [custom stage](#add-a-custom-stage) for use cases outside standard stage types
- How to add a [dynamic stage](#add-a-dynamic-stage) to execute generated pipeline YAML

---

## Before you begin

- **Harness project access:** Ensure you have View and Create/Edit permissions on <a href="/docs/platform/role-based-access-control/permissions-reference#pipelines" target="_blank" rel="noopener noreferrer">Pipelines</a>. An administrator must assign you a role that includes these permissions. For more information, refer to <a href="/docs/platform/role-based-access-control/rbac-in-harness" target="_blank" rel="noopener noreferrer">RBAC in Harness</a>.
- **Module enablement:** The available stage types depend on which Harness modules are enabled in your project. For more information, refer to <a href="/docs/platform/get-started#create-an-organization" target="_blank" rel="noopener noreferrer">Create organizations and projects</a>.

---

## Add a stage

Perform the following steps to add a stage to a pipeline:

1. Navigate to your Harness project and create a pipeline in any module that supports pipelines.
2. In your pipeline, select **Add Stage**, and then select the stage type.

   The following stage types are available:

   * **Deploy:** Deploy services, serverless functions, or other workloads.
   * **Build:** Build, test, and push artifacts to repositories.
   * **Approval:** Approve or reject changes during pipeline progress.
   * **Feature Flag:** Enable or disable functionality remotely without redeploying code.
   * **Pipeline:** Run a pipeline as a stage in another pipeline.
   * **Custom Stage:** <a href="#add-a-custom-stage">Custom stages</a> are flexible stages you can configure for use cases outside the standard stage types.
   * **Infrastructure**: Provision, configure, and manage infrastructure resources as part of the pipeline.
   * **Dynamic Stage:** <a href="#add-a-dynamic-stage">Dynamic Stage</a> allows you to import pipeline YAMLs within a stage. These YAMLs can either be generated and transformed at runtime or be directly passed to the input source field of the dynamic stage in encoded form.
   * **Developer Portal**: Integrate with your developer portal to automate and manage developer workflows within the pipeline.

   <div align="center"><DocImage path={require('./static/all-stages-including-dynamic-stages.png')} alt="Stage type selection dialog showing all available stage types" width="80%" /></div>

   :::tip

   If a specific module or stage type is not shown, make sure the module is enabled in your project. For more information, refer to <a href="/docs/platform/get-started#create-an-organization" target="_blank" rel="noopener noreferrer">Create organizations and projects</a>.

   :::

3. **Configure the stage settings.**

   You must provide a few initial settings, such as the **Stage Name**, to add a stage to a pipeline. 
   
   After adding the stage, you can configure additional settings across the available tabs, such as <a href="#stage-variables">Stage Variables</a>, <a href="/docs/continuous-delivery/x-platform-cd-features/environments/environment-overview" target="_blank" rel="noopener noreferrer">Environment</a>, <a href="/docs/continuous-delivery/x-platform-cd-features/environments/infrastructure-definitions" target="_blank" rel="noopener noreferrer">Infrastructure</a>, and other stage-specific options.

   The available settings depend on the module and stage type. For more information about the stage settings available for that module, refer to your module's documentation.

4. **Configure the stage execution.**

   If applicable to the stage type or module, use the **Execution** tab to add and configure the steps that define the tasks performed by the stage. 
   
   You can also configure execution-related settings, such as <a href="/docs/continuous-delivery/manage-deployments/deployment-concepts" target="_blank" rel="noopener noreferrer">Execution Strategy</a>, <a href="/docs/platform/pipelines/step-skip-condition-settings" target="_blank" rel="noopener noreferrer">Conditional Execution</a>, <a href="/docs/platform/pipelines/looping-strategies/looping-strategies-matrix-repeat-and-parallelism" target="_blank" rel="noopener noreferrer">Looping Strategy</a>, and <a href="/docs/platform/pipelines/failure-handling/define-a-failure-strategy-on-stages-and-steps" target="_blank" rel="noopener noreferrer">Failure Strategy</a>. The available steps and settings depend on the stage type. For details about configuring the available execution options, refer to your module's documentation.

---

### Stage names

When you create a stage, you give it a name. Harness automatically creates an **Id** (<a href="/docs/platform/references/entity-identifier-reference" target="_blank" rel="noopener noreferrer">Entity Identifier</a>) based on the name. 

You can change the **Id** during initial stage creation. However, once the stage is saved, the **Id** becomes immutable.

You can change the **Name** at any time, but you cannot change the **Id**.

---

### Stage variables

Stage variables are variables defined at the stage level and used to configure or reference values within the stage and in subsequent stages of the pipeline.

You can add stage variables in the Pipeline Studio's Visual Editor or YAML Editor.

<style>
{`
  .tabs--full-width {
    width: 100%;
  }
  .tabs--full-width .tabs__item {
    flex: 1;
    text-align: center;
    justify-content: center;
  }
`}
</style>

<Tabs className="tabs--full-width">
  <TabItem value="Visual" label="Visual">

To add stage variables, go to a stage's **Overview** tab, expand the **Advanced** section, and then select **Add Variable**.

<div align="center"><DocImage path={require('./static/add-a-stage-56.png')} alt="Overview tab showing the Add Variable button in the Advanced section" width="80%" /></div>

  </TabItem>
  <TabItem value="YAML" label="YAML" default>

```yaml
- stage:
    ...
    variables:
      - name: VAR_NAME
        type: String ## String or Secret
        description: ""
        value: 90
```

  </TabItem>
</Tabs>

Variable values can be <a href="/docs/platform/variables-and-expressions/runtime-inputs" target="_blank" rel="noopener noreferrer">fixed values, runtime inputs, or expressions</a>.

Stage variables are available across the pipeline and you can override their values in later stages.

- To reference stage variables in the same stage where they are defined, use the expression `<+stage.variables.VAR_NAME>`.
- To reference stage variables in other stages, use the expression `<+pipeline.stages.STAGE_ID.variables.VAR_NAME>`.
- You can also reference stage variables in files fetched at runtime. 
  For example, create a stage variable called `NAME` and then reference it in the Kubernetes `values.yaml` file used by that stage by calling the <a href="/docs/platform/variables-and-expressions/harness-variables" target="_blank" rel="noopener noreferrer">Harness expression</a> `<+stage.variables.NAME>`. 

  ```yaml
  name: <+stage.variables.NAME>  
  replicas: 2  
  
  image: <+primary.artifact.image>  
  ...
  ```
  When you run this pipeline, the value you set for `NAME` in the stage settings is supplied to the `values.yaml` file.

---

### Advanced stage settings

On the **Advanced** tab, you can configure:

* **Manual Execution**: Allows you to pause the pipeline at a stage and require a user to manually trigger the stage before it can continue. You can also configure a timeout; if the stage is not manually triggered within the specified time, the stage fails. For more information, refer to <a href="/docs/platform/pipelines/pipeline-manual-run" target="_blank" rel="noopener noreferrer">Run a pipeline</a>.
  - **Timeout**: Specifies the maximum amount of time Harness waits for the stage to complete. For manual stages, the timeout also determines how long the stage can remain waiting for manual execution before it fails.
* **Delegate Selector (optional)**: Allows you to specify which Harness Delegate should execute the stage or its associated tasks. Delegate selectors use delegate tags to target delegates with the required connectivity or capabilities. Stage-level delegate selectors can also be overridden by selectors configured at the step or step-group level. For more information, refer to <a href="/docs/platform/delegates/manage-delegates/select-delegates-with-selectors" target="_blank" rel="noopener noreferrer">Select delegates with selectors</a>.
* <a href="/docs/platform/pipelines/step-skip-condition-settings" target="_blank" rel="noopener noreferrer">Conditional executions</a>: Control when a stage executes based on conditions you define.
* <a href="/docs/platform/pipelines/failure-handling/define-a-failure-strategy-on-stages-and-steps" target="_blank" rel="noopener noreferrer">Failure strategies</a>: Define how the pipeline responds when a stage fails.
* <a href="/docs/platform/pipelines/looping-strategies/looping-strategies-matrix-repeat-and-parallelism" target="_blank" rel="noopener noreferrer">Looping strategies</a>: Run stages multiple times using matrix, repeat, or parallelism strategies.
* **Send Status to Git**: Allows Harness to send the stage's execution status to the Git provider for pipelines triggered by Git events, such as pull requests. This can be used to display the stage as a status check on the pull request and, where supported, customize the status check name. For more information, refer to <a href="/docs/platform/git-experience/git-experience-overview" target="_blank" rel="noopener noreferrer">Git Experience</a>.
  - **Name**: Specifies the name displayed for the stage's status check in the Git provider. You can use a fixed value or a <a href="/docs/platform/variables-and-expressions/harness-variables" target="_blank" rel="noopener noreferrer">Harness expression</a> to generate the name dynamically.

---

## Add a custom stage

:::warning

Custom stage executions will count towards service license consumption. Harness CD will consume 1 Service license for every 2000 custom stage executions. For more information, refer to <a href="/docs/continuous-delivery/cd-onboarding/service-licensing-for-cd#pipelines-with-no-service" target="_blank" rel="noopener noreferrer">licensing for pipelines with no service</a>.

:::

Harness provides predefined stages for common pipeline operations, including [Build (CI)](https://developer.harness.io/docs/continuous-integration/), [Deploy (CD)](https://developer.harness.io/docs/continuous-delivery/), and [Approval](https://developer.harness.io/docs/platform/approvals/adding-harness-approval-stages/) stages. Each stage type provides settings and steps specific to its intended use case.

Use a **Custom** stage when you need to perform operations that do not require the predefined settings or functionality of the standard stage types. For example, you can use a Custom stage for ad hoc provisioning or to run jobs before or after a deployment stage. Unlike Build, Deploy, or Approval stages, a Custom stage has no predefined functionality or requirements and provides flexibility for use cases outside the standard stages.

Perform the following steps to add a Custom stage to your pipeline:

1. Select **Add Stage** in the pipeline.
2. Select **Custom** as the stage type.
   <div align="center"><DocImage path={require('./static/add-a-custom-stage-58.png')} alt="Custom stage option in stage type selection" width="80%" /></div>
3. Enter a name for the stage and configure the required settings.
4. Add the required steps in the **Execution** tab.
5. Configure optional settings, such as **Stage Variables**, **Environment**, **Infrastructure**, and **Advanced** settings.
6. Save the stage.

### Environments and infrastructure definitions in custom stages

You can also use **Environment** and **Infrastructure Definition** in Custom stages. 

- **Service** is not supported in Custom stages.
- Both **Environment** and **Infrastructure Definition** are optional. You can have a Custom stage with no **Environment** or **Infrastructure Definition** or with only **Environment** or with both **Environment** and **Infrastructure Definition**. 
- Currently, you can only use a single environment and single infrastructure.
- Harness does not support environment propagation in the Custom stage.
- Harness does not support dynamic infrastructure provisioning in the Custom stage.
- Harness does not support environment and infrastructure filtering in the Custom stage.
- You can add both environment global and infrastructure global overrides in Custom stages.
- Service-specific overrides are not supported as services are not supported in Custom stages.

### Custom stage capabilities

Custom stages support the following capabilities:

* <a href="#stage-variables">Stage variables</a>.
* <a href="#advanced-stage-settings">Advanced stage settings</a>: Conditional executions, failure strategies, and looping strategies.
* <a href="/docs/platform/templates/template" target="_blank" rel="noopener noreferrer">Templates</a>: You can <a href="/docs/platform/templates/add-a-stage-template" target="_blank" rel="noopener noreferrer">create stage templates</a> based on Custom stages, and you can use step templates in Custom stages. You can also create pipeline templates from pipelines that have Custom stages.
* <a href="/docs/platform/delegates/manage-delegates/select-delegates-with-selectors" target="_blank" rel="noopener noreferrer">Delegate selectors</a>: You can select the <a href="/docs/platform/delegates/delegate-concepts/delegate-overview" target="_blank" rel="noopener noreferrer">Harness Delegate</a> to use for each step in a Custom stage. If you do not specify a delegate, Harness uses the default delegate selection process.

:::info Rollback

Custom stages do not support <a href="/docs/platform/pipelines/failure-handling/define-a-failure-strategy-for-pipelines" target="_blank" rel="noopener noreferrer">rollback failure strategies</a>, but you can use <a href="/docs/platform/pipelines/step-skip-condition-settings" target="_blank" rel="noopener noreferrer">conditional executions</a> to run steps or stages based on the outcomes of other steps or stages. For example, run a step only if a previous step succeeded.

:::

### Steps in custom stages

* The Custom stage leverages steps from other stage types. Any steps listed in the Step Library for your Custom stages are also available for Build, Deploy, or Approval stages. Harness has no steps that are applicable only to the Custom stage.
* The Custom stage cannot use module-specific steps. Steps specific to CI and CD stages, like the Rolling Deployment step, are not available for the Custom stage.
* Licensing is applied to steps in Custom stages. For example, CD steps, such as the HTTP step, are available for the Custom stage only if you have a CD license.

:::note
Delegate-based steps, such as shell scripts and command steps, can run for a maximum of 4 days. This applies to any tasks executed via the Harness Delegate. Ensure that your workflows account for this runtime, as any delegate-based step exceeding 4 days will not complete successfully.
:::

---

## Add a dynamic stage

A **Dynamic Stage** is a Harness pipeline feature that allows you to import and execute pipeline YAML within a stage. It is similar to running an entire pipeline within a stage. The pipeline YAML can be generated or transformed at runtime by a previous stage, or provided directly to the Dynamic Stage's source input in encoded form. Dynamic Stages work across Harness CI and CD modules.

:::note
Dynamic Stage is behind the Feature Flag `PIPE_DYNAMIC_STAGE_EXECUTION`. Contact <a href="mailto:support@harness.io">Harness Support</a> to enable this stage.
:::

Perform the following steps to add a Dynamic Stage to your pipeline:

1. Select **Add Stage** in the pipeline. 
2. Select **Dynamic Stage** as the stage type.
   <div align="center"><DocImage path={require('./static/add-a-dynamic-stage.png')} alt="Dynamic Stage option in stage type selection" width="80%" /></div>

3. Enter the **Stage Name** and click **Set Up Stage**.
4. In the **Overview** tab, select **Source Location**:
   - <a href="#define-inline-source-location">Inline</a>: Provide the pipeline YAML directly in the Dynamic Stage.
   - <a href="#define-remote-source-location">Remote</a>: Load the pipeline YAML from a Git repository.
5. Configure execution-related settings, such as <a href="/docs/continuous-delivery/manage-deployments/deployment-concepts" target="_blank" rel="noopener noreferrer">Execution Strategy</a>, <a href="/docs/platform/pipelines/step-skip-condition-settings" target="_blank" rel="noopener noreferrer">Conditional Execution</a>, <a href="/docs/platform/pipelines/looping-strategies/looping-strategies-matrix-repeat-and-parallelism" target="_blank" rel="noopener noreferrer">Looping Strategy</a>, and <a href="/docs/platform/pipelines/failure-handling/define-a-failure-strategy-on-stages-and-steps" target="_blank" rel="noopener noreferrer">Failure Strategy</a> in the **Advanced** tab, if required.
6. Save the pipeline.

### Define inline source location 

Define the inline source to provide pipeline YAML to the Dynamic Stage using the following two methods:

Upon execution, the Dynamic Stage executes the stages and steps as per the Dynamic Stage Source YAML. You can click on the **View Source** option to view the decoded pipeline YAML. 

<div align="center"><DocImage path={require('./static/dynamic-stages-breakdown-yaml.png')} alt="Dynamic Stage execution showing View Source option" width="80%" /></div>

#### Encoded YAML using Expressions

Dynamic Stage accepts Expressions in the source input field, which enables the execution of YAML pipelines generated at runtime. To achieve this, you can use an expression to output the YAML pipeline in base64-encoded form, for example, through a previous stage or step that outputs the pipeline YAML in base64-encoded form through an output variable. 

The following example demonstrates a pipeline in which a Drone pipeline is converted into a Harness pipeline through a plugin, and the encoded Harness pipeline YAML is passed to the Dynamic Stage through an expression containing the output variable belonging to the stage prior to the Dynamic Stage. This output variable stores the encoded pipeline YAML and, hence, serves as the source for the Dynamic Stage.

<div align="center"><DocImage path={require('./static/run-generated-yaml-into-harness-dynamic-stage.png')} alt="Pipeline showing Dynamic Stage receiving encoded YAML from previous stage" width="80%" /></div>

#### Encoded YAML via Fixed Value

Dynamic Stage accepts the encoded value of the pipeline YAML in the source input field. You can convert any Harness Pipeline YAML into base64-encoded form and pass it to the Dynamic Stage.

The example below demonstrates a pipeline consisting of a Dynamic Stage where the encoded Pipeline YAML is being provided to the source as a Fixed Value. 

<div align="center"><DocImage path={require('./static/dynamic-stage-as-fixed-value.png')} alt="Dynamic Stage configuration with fixed value encoded YAML" width="80%" /></div>

### Define remote source location

Load the pipeline YAML from a Git repository.
- **Git Connector:** Select the connector used to access the Git repository.
- **Repository:** Select or enter the name of the Git repository containing the pipeline YAML.
- **Branch Name:** Select or enter the branch containing the pipeline YAML.
- **File Path:** Specify the path to the pipeline YAML file in the repository.
- **Commit ID:** Optionally specify the commit from which to retrieve the pipeline YAML.

<div align="center"><DocImage path={require('./static/dynamic-stage-as-remote-value.png')} alt="Dynamic Stage configuration with remote git encoded" width="80%" /></div>

---

## Next steps

- <a href="/docs/platform/pipelines/use-step-groups" target="_blank" rel="noopener noreferrer">Organize steps in step groups</a>: Group and organize steps within a stage for better organization.
- <a href="/docs/platform/pipelines/pipeline-chaining" target="_blank" rel="noopener noreferrer">Pipeline chaining in Harness</a>: Chain pipelines together to create complex workflows.
- <a href="/docs/platform/pipelines/failure-handling/define-a-failure-strategy-on-stages-and-steps" target="_blank" rel="noopener noreferrer">Define failure strategies</a>: Configure how stages handle failures.
