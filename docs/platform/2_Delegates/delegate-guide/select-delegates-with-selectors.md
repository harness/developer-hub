---
title: Select delegates with delegate selectors and tags
description: Use Delegate Tags to select specific Delegates in Connectors, steps, and more.
# sidebar_position: 2
helpdocs_topic_id: nnuf8yv13o
helpdocs_category_id: m9iau0y3hv
helpdocs_is_private: false
helpdocs_is_published: true
---

Harness runs tasks by using Harness Delegate to connect your environment to resources. Harness selects the best delegate based on previous use or round-robin selection. See [How Does Harness Manager Pick Delegates?](/article/2k7lnc7lvl-delegates-overview#how_does_harness_manager_pick_delegates)

In some cases, you might want Harness to select specific delegates. In these cases, you can use the **Delegate Selector** settings in Pipelines, Connectors, and so on, with corresponding delegate tags.

### Review: Delegate tags

A delegate tag is added to your delegate automatically when you set it up in Harness. The tag is added using the name you give your Delegate.

You can also add more tags in the **Tags** field during the setup process:

![](https://files.helpdocs.io/i5nl071jo5/articles/nnuf8yv13o/1654274177068/clean-shot-2022-06-03-at-09-35-54.png)For detailed information on how delegates are selected during execution, see [Delegates Overview](/article/2k7lnc7lvl-delegates-overview).

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

![](https://files.helpdocs.io/kw8ldg1itf/articles/nnuf8yv13o/1657746136816/clean-shot-2022-07-13-at-14-02-04.png)The step level has the highest priority. Any delegate selected in a step's **Delegate Selector** setting overrides any Delegates selected in 2-5 above.

A connector can be used in multiple places in a pipeline, such as a stage infrastructure's **Cloud Provider** setting or even in certain step settings.### Option: Step and step group delegate selector

Delegates can be selected for steps and [step groups](/article/ihnuhrtxe3-run-steps-in-parallel-using-a-step-group) in their **Advanced** settings.

Here is a step example:

![](https://files.helpdocs.io/kw8ldg1itf/articles/nnuf8yv13o/1657742633092/clean-shot-2022-07-13-at-13-03-12.png)Here is a step group example:

![](https://files.helpdocs.io/kw8ldg1itf/articles/nnuf8yv13o/1657742697622/clean-shot-2022-07-13-at-13-04-15.png)### Option: Select a delegate for a connector using tags

When you add a connector you are given the option of connecting to your third part account using any available delegate or specific delegates.

![](https://files.helpdocs.io/i5nl071jo5/articles/nnuf8yv13o/1625693513715/clean-shot-2021-07-07-at-14-31-31.png)You select specific delegates using their tags.

You only need to select one of a delegate's tags to select it. All delegates with the tag are selected.

Here, the tag is **test1**, and you can see multiple delegates match it:

![](https://files.helpdocs.io/i5nl071jo5/articles/nnuf8yv13o/1625693674019/clean-shot-2021-07-07-at-14-34-13.png)### Option: Pipeline delegate selector

Delegates can be selected for an entire pipeline in the pipeline **Advanced Options** settings.

![](https://files.helpdocs.io/kw8ldg1itf/articles/nnuf8yv13o/1657742306209/clean-shot-2022-07-13-at-12-58-04.png)### Option: Stage delegate selector

Delegates can be selected for an entire stage in the stage **Advanced** settings.

![](https://files.helpdocs.io/kw8ldg1itf/articles/nnuf8yv13o/1657742384596/clean-shot-2022-07-13-at-12-59-30.png)### Option: Infrastructure connector

Delegates can be selected for the connector used in a stage's Infrastructure settings, such as a CD stage's **Cluster Details** > **Connector** setting.

![](https://files.helpdocs.io/kw8ldg1itf/articles/nnuf8yv13o/1657742439869/clean-shot-2022-07-13-at-13-00-20.png)### Option: Select a delegate for a step using tags

You can select one or more delegates for each pipeline step.

In each step, in **Advanced**, there in the **Delegate Selector** option:

![](https://files.helpdocs.io/i5nl071jo5/articles/nnuf8yv13o/1625694858143/clean-shot-2021-07-07-at-14-54-08.png)You only need to select one of a delegate's tags to select it. All delegates with the tag are selected.

### Option: Modify tags using Harness API

See [Delegate Group Tags Resource](https://harness.io/docs/api/tag/Delegate-Group-Tags-Resource/).

### See also

* [Delegates Overview](/article/2k7lnc7lvl-delegates-overview)

