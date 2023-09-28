---
title: Add a stage
description: Learn how to add and configure a pipeline stage.
sidebar_position: 3
helpdocs_topic_id: 2chyf1acil
helpdocs_category_id: kncngmy17o
helpdocs_is_private: false
helpdocs_is_published: true
---

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

A stage is a part of a pipeline that contains the logic to perform a major segment of a larger workflow defined in a pipeline. Stages are often based on the different workflow milestones, such as building, approving, and delivering.

The process of adding a stage to a pipeline is the same for all Harness modules. When you add a stage to a pipeline, you select the stage type, such as **Build** for CI or **Deploy** for CD. The available stage settings are determined by the stage type, and, if applicable, the module associated with the selected stage type.

This functionality is limited to the modules and settings that you have access to.

This topic assumes you are familiar with [Harness' key concepts](../../getting-started/learn-harness-key-concepts.md) and you have a [Harness project](../organizations-and-projects/create-an-organization.md).

## Add a stage

1. Create a pipeline in any module in your project.
2. In your pipeline, select **Add stage** and configure the stage settings.

   * You must provide a few initial settings to add a stage to a pipeline, and then you configure additional settings, such as **Infrastructure** or **Stage Variables** after adding the stage.
   * The available settings depend on the module and stage type. Go to your module's documentation for more information about that module's stage settings.

3. For certain modules (CI, CD, STO, etc.), in the **Execution** tab, add steps to the stage to define the tasks to perform in that stage. The available steps depend on the stage type.

:::tip

If a specific module or stage type isn't shown, make sure the module is enabled in your project. For more information, go to [Create organizations and projects](../organizations-and-projects/create-an-organization.md).

:::

## Stage names

When you create a stage, you give it a name. Harness automatically creates and **Id** ([Entity Identifier](../20_References/entity-identifier-reference.md)) based on the name. You can change the **Id** during initial stage creation; however, once the stage is saved, the **Id** becomes immutable.

You can change the **Name** at any time, but you can't change the **Id**.

## Stage variables

Stage variables are variables that you add to a stage and then reference in the entity settings and steps in that stage. Stage variables can be custom variables or modify known variables (service variables, environment variables, etc.).

You can add stage variables in the Pipeline Studio's Visual Editor or YAML Editor.

```mdx-code-block
<Tabs>
  <TabItem value="Visual" label="Visual">
```

To add stage variables, go to a stage's **Overview** tab, expand the **Advanced** section, and then select **Add Variable**.

<figure>

![](./static/add-a-stage-56.png)

<figcaption>The <b>Overview</b> tab for a <b>Deploy</b> stage.</figcaption>
</figure>

```mdx-code-block
  </TabItem>
  <TabItem value="YAML" label="YAML" default>
```

```yaml
    - stage:
        ...
        variables:
          - name: VAR_NAME
            type: String ## String or Secret
            description: ""
            value: 90
```

```mdx-code-block
  </TabItem>
</Tabs>
```

Variable values can be [fixed values, runtime inputs, or expressions](/docs/platform/References/runtime-inputs).

Stage variables are available across the pipeline and you can override their values in later stages. You can also reference stage variables in files fetched at runtime. For example, you could create a stage variable called `NAME` and then reference it in the Kubernetes `values.yaml` file used by that stage by calling the stage variable expression: `<+stage.variables.NAME>`. For example:

```yaml
name: <+stage.variables.NAME>  
replicas: 2  
  
image: <+primary.artifact.image>  
...
```

When you run this pipeline, the value you set for `NAME` in the stage settings is supplied to the `values.yaml` file.

To reference stage variables in the same stage where they are defined, use the expression `<+stage.variables.VAR_NAME>`.

To reference stage variables in other stages, use the expression `<+pipeline.stages.STAGE_ID.variables.VAR_NAME>`.

## Advanced stage settings

On the **Advanced** tab, you can configure:

* [Conditional executions](/docs/platform/Pipelines/w_pipeline-steps-reference/step-skip-condition-settings)
* [Failure strategies](/docs/platform/Pipelines/w_pipeline-steps-reference/step-failure-strategy-settings)
* [Looping strategies - Matrix, repeat, parallelism](/docs/platform/Pipelines/looping-strategies-matrix-repeat-and-parallelism)
