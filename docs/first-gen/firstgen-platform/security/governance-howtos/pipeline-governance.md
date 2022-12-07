---
title: Pipeline Governance
description: Pipeline Governance enables you to measure how closely your Pipelines conform to your regulatory and operations standards.
# sidebar_position: 2
helpdocs_topic_id: zhqccv0pff
helpdocs_category_id: 934m8pvgnk
helpdocs_is_private: false
helpdocs_is_published: true
---

The Pipeline Governance feature is behind a feature flag. Contact [Harness Support](mailto:support@harness.io) to enable the feature.Harness Pipeline Governance feature enables you to measure how conformant your Pipelines are with your regulatory and operations standards.

In this topic:

* [Before You Begin](https://docs.harness.io/article/zhqccv0pff-pipeline-governance#before_you_begin)
* [Video Overview](https://docs.harness.io/article/zhqccv0pff-pipeline-governance#video_overview)
* [High-Level Governance Process](https://docs.harness.io/article/zhqccv0pff-pipeline-governance#high_level_governance_process)
* [Prerequisites](https://docs.harness.io/article/zhqccv0pff-pipeline-governance#prerequisites)
* [Add a Pipeline Governance Standard](https://docs.harness.io/article/zhqccv0pff-pipeline-governance#add_a_pipeline_governance_standard)
	+ [Define Conformance Rules](https://docs.harness.io/article/zhqccv0pff-pipeline-governance#define_conformance_rules)
	+ [Scope Standards using Advanced Settings](https://docs.harness.io/article/zhqccv0pff-pipeline-governance#scope_standards_using_advanced_settings)
	+ [Drafting Pipeline Governance Standards Without Applying Them](https://docs.harness.io/article/zhqccv0pff-pipeline-governance#drafting_pipeline_governance_standards_without_applying_them)
* [Measure Conformance Before Deployment](https://docs.harness.io/article/zhqccv0pff-pipeline-governance#measure_conformance_before_deployment)
* [Measure Conformance During Deployment](https://docs.harness.io/article/zhqccv0pff-pipeline-governance#measure_conformance_during_deployment)

### Before You Begin

* Make sure you have **Administer Other Account Functions** permissions to access Governance in Harness. For more information, see [Account Permissions](/article/ven0bvulsj-users-and-permissions#account_permissions).

### Video Overview

See related blog: [Pipeline Governance – Measuring Regulatory Conformance](https://harness.io/2019/11/pipeline-governance-measuring-regulatory-conformance/).

### High-Level Governance Process

Using Harness Pipeline Governance is a simple process. After you create Workflows that perform or verify some regulatory operation, you describe them using [Tags](/article/nrxfix3i58-tags).

Next, you use those Tags to create rules in a Pipeline Governance Standard. You assign a weight to each rule to indicate how important it is.

The standards are used to score the conformance of Pipelines. A score lets you measure the conformance level of the Workflows a Pipeline contains.

You can see the score before you deploy a Pipeline, and during Pipeline Approval steps.

Below is an example of a Pipeline Governance Standard and how a Pipeline Approval step measures conformance with the standard during deployment:

![](https://files.helpdocs.io/kw8ldg1itf/other/1571264351741/image.png)Let's take a high-level view of the major steps:

1. Create Workflows and Pipelines that meet or perform regulatory operations for your application.
2. Add [Tags](/article/nrxfix3i58-tags) to your Workflows to identify what operations they perform, such as PCI, FDIC, etc. Here are two Workflows with Tags that identify their regulatory operations:![](https://files.helpdocs.io/kw8ldg1itf/other/1571264793258/image.png)
3. Add Pipeline Governance Standards to your Harness Application:
	1. Create Governance Standards rules in **Pipeline Governance** by selecting the Tags you added.
	2. Weight each rule to set its importance. In this example, both rules are weighted as 1, meaning they are equally important:![](https://files.helpdocs.io/kw8ldg1itf/other/1571267452473/image.png)
4. Measure conformance before and during deployment:  
  
Before you deploy a Pipeline that has Governance Standards applied to it, Harness displays the conformance as a percentage. The following example shows a score of 100% because the Pipeline contains both conformance Workflows:![](https://files.helpdocs.io/kw8ldg1itf/other/1571353885888/image.png)During Pipeline deployment, any Approval steps in the Pipeline measure how the Pipeline meets all Governance Standards. This measurement allows you to decide to approve or reject the Pipeline deployment.

![](https://files.helpdocs.io/kw8ldg1itf/articles/zhqccv0pff/1620840141673/h-ulu-tx-7-fryt-hidtx-4-p-e-0-byy-jlh-putt-gjac-9-t-ruz-yiy-zbi-atz-jpxp-fur-ub-3-ueb-susj-1-r-sbf-xb-lhr-0-my-7-snh-d-1-jj-m-2-ypz-bpoy-rfhvd-0-t-j-1-a-hn-o-6-wjl-mqp-ez-orz-ifsr-z-4-p-ssk-jrg-8-ez-cq)In this topic, we will cover adding Pipeline Governance Standards and measuring conformance before and during deployment.

Learn how to add Tags to your Applications, Workflows, and Pipelines in [Using Tags](/article/nrxfix3i58-tags).

### Prerequisites

This topic covers creating and applying Pipeline Governance Standards, and assumes you are familiar with Harness Tags (see [Using Tags](/article/nrxfix3i58-tags)).

This topic assumes that you have the following prerequisites:

* A Pipeline containing Workflows that meet or evaluate standards and regulations.
* Tags on the Workflows that indicate their regulatory function, such as **PCI Compliance**.

Here is an example of a Pipeline containing two Workflows, each tagged with a Tag that describes their regulatory conformance:

![](https://files.helpdocs.io/kw8ldg1itf/other/1571265638090/image.png)### Add a Pipeline Governance Standard

A Pipeline Governance Standard is comprised of rules. A rule contains one or more of the Tags assigned to your conformance Workflows. Each rule is given a weight relative to its importance.

To add a Pipeline Governance Standard, do the following:

1. Before you begin, review [Prerequisites](https://docs.harness.io/article/zhqccv0pff/preview#prerequisites).
2. In Harness, click **Continuous Security**, and then click **Governance**. The Governance page displays the existing Pipeline Governance standards.![](https://files.helpdocs.io/kw8ldg1itf/other/1571267818630/image.png)
3. Click **Add Governance Standard**. The Pipeline Governance Standard settings appear.![](https://files.helpdocs.io/kw8ldg1itf/other/1571268089287/image.png)
4. In **Name**, enter a name that will identify the standard when it appears in Pipelines and Pipeline Approval steps.
5. In **Description**, describe what the standard will evaluate, like **FDIC Compliance**.
6. In **Conformance Rule**, click **Add Rule**. Define the **Conformance Rule** for the standard as described below.

#### Define Conformance Rules

Conformance Rules are a combination of the following:

* **Tags** you have assigned to Workflows.
* **Matching** requirements for the Tags, such as ANY or ALL.
* **Weights** that you assign to each rule to define its importance relative to other rules.

To define a conformance rule, do the following:

1. In **Conformance Rule**, click **Tag**. The Tag search appears.
2. Select the Tag that you want to add to the rule, and then click **Submit**. For example, if you have a Workflow with the Tag **PCI Compliance**, you would select **PCI Compliance** in the Tag search.

![](https://files.helpdocs.io/kw8ldg1itf/other/1571269056857/image.png)You can also create the Tag and add it to the Workflow later. Typically, Tags are added to the Workflow first.1. Add as many Tags as you need to identify the Workflows that the rule applies to.
2. If you added multiple Tags, in **Match**, select **ALL** to apply the rule only when all the Tags are present in a Pipeline, or **ANY** to apply the rule when any of the Tags are present.
3. In **Weight**, enter a value to define the importance of the rule. You might what to create all of the rules first, and then assign their weights.  
  
When your standard is displayed in a Pipeline or Pipeline Approval step, its weights are presented as a percentage using the formula *Weight / Sum of Weight = Percentage*.  
  
For example, here the rules are weighted 4 and 6, and when they are displayed in a Pipeline, they are scored 40% and 60%:![](https://files.helpdocs.io/kw8ldg1itf/other/1571270120866/image.png)
4. For each rule, click the **Note** icon to add any notes that can provide information for other users.
5. Repeat the above steps to add more rules, if needed.
6. Click **Submit**. The new Pipeline Governance Standard is added to the **Governance** page under **Pipeline Governance**.

![](https://files.helpdocs.io/kw8ldg1itf/other/1571270374887/image.png)By default, this standard is available to every Application in your Harness account. Every Pipeline you open or create will display this standard and indicate how the Pipeline measures up. In a new Pipeline with no steps, you can see that the standard has a 0% score for each rule and their **Occurrence** is empty:

![](https://files.helpdocs.io/kw8ldg1itf/other/1571270551876/image.png)In a Pipeline that includes a only one Workflow assigned a rule's Tag, the weight is **4(40%)** and the total score is **40%**:

![](https://files.helpdocs.io/kw8ldg1itf/other/1571270965177/image.png)#### Scope Standards using Advanced Settings

By default, when you create a Pipeline Governance Standard it is available to every Application in your account. Consequently, it appears on every Pipeline and as part of every Approval step.

If the default scope of a Pipeline Governance Standard is too wide, in the **Advanced Settings** of the Pipeline Governance Standard you can limit the Applications that can use the standard.

![](https://files.helpdocs.io/kw8ldg1itf/other/1571354123000/image.png)To limit the Applications that can use the standard, do the following:

1. Click **Advanced Settings** to expand it.
2. In **Applications**, select the Applications that may use the standard.
3. In **Tags**, select the Tags of Applications and Pipelines that may use the standard.
4. Click **Submit**.

The standard is now limited to the Applications you selected and/or components tagged with the Tags you selected.

#### Drafting Pipeline Governance Standards Without Applying Them

If you want to draft a Pipeline Governance Standard, but not have it appear in every Application, Pipeline, and Approval step in your account, you can scope the standard to a Tag that is not applied to any Application or Pipeline.

For example, you can create a Tag in [Tags Management](/article/nrxfix3i58-tags) named **Draft Compliance**, and not apply it to any Application or Pipeline. Then, in **Advanced Settings**' in the Pipeline Governance Standard, select **Draft Compliance** in **Tags**:

![](https://files.helpdocs.io/kw8ldg1itf/other/1571355452495/image.png)Now the draft Pipeline Governance Standard is not applied to any Application or Pipeline.

### Measure Conformance Before Deployment

When you open a Pipeline in Harness, you will see all of the Pipeline Governance Standards available to it, and their individual scores.

![](https://files.helpdocs.io/kw8ldg1itf/other/1571353425254/image.png)The scores indicate how many of the Tags that define the Pipeline Governance Standard are present in the Pipeline's Workflows, and their relative weight.

Scoring provides you with an overall view of the conformance of your Pipeline, helping you to make an educated decision on whether or not to deploy the Pipeline.

In some cases, a Pipeline Governance Standard might not be relevant but it is displayed in a Pipeline page because it has not been scoped to specific Applications and Pipelines. To scope a Pipeline Governance Standard, see [Scope Standards using Advanced Settings](https://docs.harness.io/article/zhqccv0pff-pipeline-governance#scope_standards_using_advanced_settings).

### Measure Conformance During Deployment

Approval steps in Pipelines display the Pipeline Governance Standards available to that Pipeline.

For example, here is an Approval step in a Pipeline displaying two standards and their scores:

![](https://files.helpdocs.io/kw8ldg1itf/articles/zhqccv0pff/1620840142090/9-hfst-j-2-qsroep-mdp-wrixakx-yh-aqisw-sigw-byg-z-2-e-8-syd-3-h-zlq-9-vf-zkt-sfvee-zua-a-4-g-lq-2-b-1-lp-ckzb-a-5-yfl-dx-mxf-nnzi-bcgpf-bq-otc-ah-q-2-y-9-cy-gw-2-gdt-m-narp-a-7-gyin-2-z-cfla-hu-i)The **Gold Standard** has a score of **0%** because no Workflow in the Pipeline includes the Tags defined in the Gold Standard.

The **Doc-Example** has a score of 100% because the Workflows in the Pipeline, or Pipeline itself, include the Tags defined in **Doc-Example**.

Now you can evaluate the conformance of the Pipeline before approving its deployment.

### Related Topics

* [Using Tags](/article/nrxfix3i58-tags)
* [Approvals](/article/0ajz35u2hy-approvals)

