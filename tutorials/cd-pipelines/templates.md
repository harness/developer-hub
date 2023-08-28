---
sidebar_position: 7
title: Pipeline templates
description: Get started with templates in Harness pipelines.
---

This tutorial focuses on how to use templates with Harness pipelines. We will guide you through saving a sample deployment pipeline as a template, and then using it to get started with a new pipeline at project level. 

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

## Templates in Harness CD Pipeline

Harness templates allow you to design reusable content, logic, and parameters, ensuring that the application is the major focus of your pipelines. Instead of creating pipelines from scratch each time, Harness lets you select from pre-built templates and link them to your pipelines. The process of developing pipelines thus becomes easier by reducing duplication and increasing reusability.

## Why should you use templates?

- Share common logic without duplicating it on multiple pipelines. For example, if you have some tasks or operations that every pipeline must do, then make them a part of a template to use in your pipelines.
- Reduce the complexity and size of creating a single pipeline.
- Set a pattern that you and your team can follow throughout your pipelines.
- Save time and create generic templates that you can use across all scopes in your Harness account.
- Add or remove a change in one file rather than a lot of stages.

## Before you begin 

Make sure you have followed the [get started](https://developer.harness.io/tutorials/cd-pipelines/kubernetes/manifest) tutorial, and have a deployment pipeline up and running. 

## Save a pipeline as template

1. Assuming you already have followed the the [get-started](https://developer.harness.io/tutorials/cd-pipelines/kubernetes/manifest) tutorial and created a `guestbook` deployment pipeline, go to the **Pipeline Studio** of the `guestbook` pipeline you have created, and on the top right corner click on the dropdown beside **Save** button. 
2. Select **Save as Template**, enter the **Name** `harness-deployment-template` and the **Version Label** `0.0.1`. 
   1. You have 3 options under **Save To** to declare the scope of the template: [Project, Organization](https://developer.harness.io/docs/getting-started/learn-harness-key-concepts#organizations-and-projects), and [Account](https://developer.harness.io/docs/getting-started/learn-harness-key-concepts#account). 
3. For this tutorial, select **Save To** `Project`.

### Set up Template

```mdx-code-block
<Tabs>
<TabItem value="Inline">
```

1. Select **Inline** and **Save** the Template.
2. Go to **Templates** under **Project Setup** in the left navigation. 

```mdx-code-block
</TabItem>
<TabItem value="Remote">
```

1. In **Git Connector**, select the `harness_gitconnector` you created during the get-started tutorial It will pre-fill the other settings.
2. Select **Save**. 
3. Connect to your Github account and select **Commit to a New Branch**.
4. Select **Save**.
5. Harness will create the template and push it to Github. 
6. When prompted to use use the template, select **No**. 
7. Check your forked `harenesscd-example` apps repo and under **master-patch** branch you'll find the deployment-template under `.harness` directory. 


```mdx-code-block
</TabItem>
</Tabs>
```

## Use the pipeline template

1. In **Default Project**, select **Pipelines**.
2. Select **New Pipeline**.
3. Enter the name `guestbook_template_pipeline`.
4. Select **Inline** to store the pipeline in Harness.
5. Now select **Start with Template**.
6. Select the `harness-deployment-template` you just created and select **Use Template**.
7. Select **Save** and then select **Run** to run the pipeline. 

:::caution

The `harness-deployment-template` will only work under the `default_project` which already has all the pipeline resources created during get started pipleine. 

:::

