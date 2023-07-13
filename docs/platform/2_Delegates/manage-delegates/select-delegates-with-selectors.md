---
title: Use delegate selectors
description: Use delegate tags to select specific delegates in connectors, steps, and more.
sidebar_position: 4
helpdocs_topic_id: nnuf8yv13o
helpdocs_category_id: m9iau0y3hv
helpdocs_is_private: false
helpdocs_is_published: true
---

Harness runs tasks by using Harness Delegate to connect your environment to resources. Harness selects the best delegate based on previous use or round-robin selection. For more information, go to [How Harness Manager picks delegates](/docs/platform/2_Delegates/delegate-concepts/delegate-overview.md#how-harness-manager-picks-delegates).

In some cases, you might want Harness to select specific delegates. In these cases, you can use the **Delegate Selector** settings in Pipelines, Connectors, and so on, with corresponding delegate tags.

:::info note
If no delegates are selected for a CD step's **Delegate Selector** setting, Harness prioritizes the delegate used successfully for the infrastructure definition connector. For more information, go to [Which delegate is used during pipeline execution?](/docs/platform/delegates/delegate-concepts/delegate-overview/#which-delegate-is-used-during-pipeline-execution)
:::

### Delegate tags

A delegate tag with the same name as your delegate is automatically added to your delegate during the configuration process. You can add one or more comma-separated tags on the `helm` command line or in the Kubernetes YAML file, as shown in the following example.

```
...  
    env:
    ....
    - name: DELEGATE_TAGS
      value: "tag1,tag2"
...
```

You can also add tags to the **Tags** field during the setup process:

![](./static/select-delegates-with-selectors-17.png)

For detailed information on how delegates are selected during execution, go to [Delegate overview](/docs/platform/2_Delegates/delegate-concepts/delegate-overview.md).

You can select a delegate based on its tags in the **Delegate Selector** settings of Harness entities like pipelines and connectors.

### Delegate selector priority

You can use delegate selectors at multiple places, such as the pipeline, stage, and step levels.

It's important to know which delegate selectors are given priority so that you ensure the correct delegate is used when you want it used.

The delegate selector priority is:

1. Step
2. Step Group
3. Stage
4. Pipeline
5. Connector

![](./static/select-delegates-with-selectors-18.png)

The step level has the highest priority. Any delegate selected in a step's **Delegate Selector** setting overrides any delegates selected in 2-5 above.

A connector can be used in multiple places in a pipeline, such as a stage infrastructure's **Cloud Provider** setting or even in certain step settings.

### Step and step group delegate selector

Delegates can be selected for steps and [step groups](/docs/continuous-delivery/x-platform-cd-features/cd-steps/step-groups) in their **Advanced** settings.

Here is a step example:

![](./static/select-delegates-with-selectors-19.png)

Here is a step group example:

![](./static/select-delegates-with-selectors-20.png)

:::info

Step and step group delegator selectors are not available for [Harness CI](/docs/continuous-integration) because CI stages run in self-contained build pods.

:::

### Selecting a delegate for a connector using tags

When you add a connector, you are given the option of connecting to your third-party account using any available delegate or specific delegates.

![](./static/select-delegates-with-selectors-21.png)

You select specific delegates using their tags.

You only need to select one of a delegate's tags to select it. All delegates with the tag are selected.

Here, the tag is **test1**, and you can see multiple delegates match it:

![](./static/select-delegates-with-selectors-22.png)

### Pipeline delegate selector

Delegates can be selected for an entire pipeline in the pipeline **Advanced Options** settings.

![](./static/select-delegates-with-selectors-23.png)

### Stage delegate selector

Delegates can be selected for an entire stage in the stage **Advanced** settings.

![](./static/select-delegates-with-selectors-24.png)

### Infrastructure connector

Delegates can be selected for the connector used in a stage's **Infrastructure** settings, such as a CD stage's **Cluster Details** > **Connector** setting.

![](./static/select-delegates-with-selectors-25.png)

import Selector from '/docs/platform/2_Delegates/shared/selector-infrastructure.md'

<Selector />

### Selecting a delegate for a step using tags

You can select one or more delegates for each pipeline step.

In each step, in **Advanced**, in the **Delegate Selector** option:

![](./static/select-delegates-with-selectors-26.png)

You only need to select one of a delegate's tags to select it. All delegates with the tag are selected.

### Modifying tags using Harness API

Go to [Delegate Group Tags Resource](https://harness.io/docs/api/tag/Delegate-Group-Tags-Resource/).

### Defining delegate selectors as a fixed value, runtime input, or expression

Delegate selectors in pipeline, stage, step, and step group can be defined as a fixed value, runtime input, or expression. 

If you're using expressions, there are two options, either the entire list of delegate selectors can be an expression or elements of delegate selectors can be expressions.

Here's a video about delegate selectors defined as expression:

<!-- Video:
https://harness-24.wistia.com/medias/8ffcic0xpi-->
<docvideo src="https://harness-24.wistia.com/medias/8ffcic0xpi" />

### See also

* [Delegate overview](/docs/platform/2_Delegates/delegate-concepts/delegate-overview.md)
