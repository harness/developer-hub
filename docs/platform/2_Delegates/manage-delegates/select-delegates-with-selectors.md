---
title: Select delegates with delegate selectors and tags
description: Use delegate tags to select specific delegates in connectors, steps, and more.
# sidebar_position: 2
helpdocs_topic_id: nnuf8yv13o
helpdocs_category_id: m9iau0y3hv
helpdocs_is_private: false
helpdocs_is_published: true
---

Harness runs tasks by using Harness Delegate to connect your environment to resources. Harness selects the best delegate based on previous use or round-robin selection. See [How Does Harness Manager Pick Delegates?](/docs/platform/2_Delegates/get-started-with-delegates/delegates-overview.md#how-does-harness-manager-pick-delegates)

In some cases, you might want Harness to select specific delegates. In these cases, you can use the **Delegate Selector** settings in Pipelines, Connectors, and so on, with corresponding delegate tags.

### Review: Delegate tags

A delegate tag with the same name as your delegate is added to your delegate automatically when you set it up in Harness. You can also give additional comma separated tags in the helm command line or in kubernetes yaml file like below

```
...  
    env:
    ....
    - name: DELEGATE_TAGS
      value: "tag1,tag2"
...
```

You can also add more tags in the **Tags** field during the setup process:

![](./static/select-delegates-with-selectors-17.png)

For detailed information on how delegates are selected during execution, see [Delegates Overview](/docs/platform/2_Delegates/get-started-with-delegates/delegates-overview.md).

You can select a delegate based on its tags in the **Delegate Selector** settings of Harness entities like pipelines and connectors.

### Review: Delegate selector priority

You can use delegate selectors at multiple places, such as the pipeline, stage, and step levels.

It's important to know which delegate selectors are given priority so that you ensure the correct delegate is used when you want it used.

The delegate selector priority is:

1. Step
2. Step Group
3. Stage
4. Pipeline
5. Connector

![](./static/select-delegates-with-selectors-18.png)

The step level has the highest priority. Any delegate selected in a step's **Delegate Selector** setting overrides any Delegates selected in 2-5 above.

A connector can be used in multiple places in a pipeline, such as a stage infrastructure's **Cloud Provider** setting or even in certain step settings.

### Option: Step and step group delegate selector

Delegates can be selected for steps and [step groups](/docs/continuous-delivery/cd-technical-reference/cd-gen-ref-category/step-groups.md) in their **Advanced** settings.

Here is a step example:

![](./static/select-delegates-with-selectors-19.png)

Here is a step group example:

![](./static/select-delegates-with-selectors-20.png)

### Option: Select a delegate for a connector using tags

When you add a connector you are given the option of connecting to your third part account using any available delegate or specific delegates.

![](./static/select-delegates-with-selectors-21.png)

You select specific delegates using their tags.

You only need to select one of a delegate's tags to select it. All delegates with the tag are selected.

Here, the tag is **test1**, and you can see multiple delegates match it:

![](./static/select-delegates-with-selectors-22.png)

### Option: Pipeline delegate selector

Delegates can be selected for an entire pipeline in the pipeline **Advanced Options** settings.

![](./static/select-delegates-with-selectors-23.png)

### Option: Stage delegate selector

Delegates can be selected for an entire stage in the stage **Advanced** settings.

![](./static/select-delegates-with-selectors-24.png)

### Option: Infrastructure connector

Delegates can be selected for the connector used in a stage's Infrastructure settings, such as a CD stage's **Cluster Details** > **Connector** setting.

![](./static/select-delegates-with-selectors-25.png)

### Option: Select a delegate for a step using tags

You can select one or more delegates for each pipeline step.

In each step, in **Advanced**, there in the **Delegate Selector** option:

![](./static/select-delegates-with-selectors-26.png)

You only need to select one of a delegate's tags to select it. All delegates with the tag are selected.

### Option: Modify tags using Harness API

See [Delegate Group Tags Resource](https://harness.io/docs/api/tag/Delegate-Group-Tags-Resource/).

### See also

* [Delegate overview](/docs/platform/2_Delegates/get-started-with-delegates/delegates-overview.md)

