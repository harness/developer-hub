---
sidebar_position: 7
title: Pipeline Templates
description: Tutorial to get started with Templates in Harness Pipelines.
---
This tutorial focuses on how to use templates with Harness Pipelines. We will guide you through saving a sample deployment pipeline as template and using the same to get started with another pipeline at project level. 

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```
## Templates in Harness CD Pipeline

Harness' templates allow you to design reusable content, logic, and parameters, ensuring that the application is the major focus of your pipelines. Instead of creating pipelines from scratch each time, Harness lets you select from pre-built templates and link them to your pipelines. The process of developing pipelines thus becomes easier by reducing duplication and increasing reusability.

## Why should you use templates?
- Share common logic without duplicating it on multiple pipelines.
For example, if you have some tasks or operations that every pipeline must do, then make them a part of a template to use in your pipelines.
- Reduce the complexity and size of creating a single pipeline.
- Set a pattern that you and your team can follow throughout your   pipelines.
- Save time and create generic templates that you can use across the scopes in your Harness account.
- Add or remove a change in one file rather than a lot of stages.

## Before you begin 

Make sure you have followed the [get started](https://developer.harness.io/tutorials/cd-pipelines/kubernetes/manifest) tutorial, and have a deployment pipeline up and running. 

## Save a pipeline as template

1. Assuming you already have followed the the [get-started](https://developer.harness.io/tutorials/cd-pipelines/kubernetes/manifest) tutorial and created a `guestbook` deployment pipeline. 

2. Go to the **Pipeline Studio** of the `guestbook` pipeline you have created, and on the top right corner click on the dropdown beside **Save** button. 

3. Now select **Save as Template** add the **Name** as `harness-deployment-template` and **Version Label** as `0.0.1` to it. 

4. You have 3 options under **Save To** to declare the scope of the template i.e., [Project, Organization](https://developer.harness.io/docs/getting-started/learn-harness-key-concepts#organizations-and-projects) and [Account](https://developer.harness.io/docs/getting-started/learn-harness-key-concepts#account). 

5. For this tutorial we will **Save To** `Project`.

### Set up Template

```mdx-code-block
<Tabs>
<TabItem value="Inline">
```
6. Select **Inline** and **Save** the Template.
7. Go to the **Templates** under the **Project Setup** in left-nav bar and you can find your templates. 

```mdx-code-block
</TabItem>
<TabItem value="Remote">
```
6. Select the `harness_gitconnector` as **Git Connector** which you created during the get-started tutorial.

7. It will pre-fill the other fields, now click on **Save**. 

8. Connect to your github in the new dialog box and Select `commit to a new branch` now save it.

9. It will create the template and push it to your github and promt to use use the template, select **No** here. 

10. Check your forked harenesscd-example apps repo and under **master-patch** branch you'll find the deployment-template under `.harness` directory. 

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
6. Select the `harness-deployment-template` you just created above and **Use Template**.
7. Now **Save** and **Run** the pipeline. 

:::caution

The `harness-deployment-template` will only work under the `default_project` which already has all the pipeline resources created during get started pipleine. 

:::

