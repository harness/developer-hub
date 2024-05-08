---
title: Tag
description: Create and manage tags in your Harness Code repositories.
sidebar_position: 40
---

With Harness Code, you can create [tags] in the Harness Code UI or you can [clone your repo](./clone-repos.md) and create tags with command line Git, IDEs, or other Git tools.

Tags you see in the Harness Code UI exist in your remote repositories. If you're working from a [local clone](./clone-repos.md), you need to push your tags to the remote to see those tags in Harness Code.

This topic explains how to work with tags in the Harness Code UI. For details about tagging with command line Git, an IDE, or another local Git tool, refer to the documentation for your preferred tool.

## Create a tag

1. When viewing a repository in Harness Code, go to **Tags** and select **New Tag**.
2. Enter a tag **Name**.
3. Select the branch or tag to base the tag on.
4. Enter a **Description**. Descriptions are required for tags created in the Harness UI because they are annotated tags. If you want to create lightweight tags, use command line Git.
5. Select **Create Tag**.

Upon creating a tag, the **Tags** page shows the name, description, and the commit that the tag is based on, as well as the person who created the tag and the creation date.

## Inspect a tag

When viewing a repository in Harness Code, there are several ways you can inspect the files and commits associated with a tag:

* Go to **Tags** and select the name of the tag that you want to inspect. You're redirected to the **Files** page with the selected tag as the current context.
* Go to **Commits**, select the default branch name to open the branch/tag dropdown menu, select **Tags**, and then select a tag. The **Commits** page updates to show the commit history for the selected tag.
* Go to **Files**, select the default branch name to open the branch/tag dropdown menu, select **Tags**, and then select a tag. The **Files** page updates according to the context of the selected tag.

## Create a branch from a tag

You can create branches from tags.

1. When viewing a repository in Harness Code, go to **Tags**.
2. Locate the relevant tag, select **More options** (&vellip;), and then select **Create Branch**.
3. Enter a branch **Name**.
4. Select **Create Branch**.

<!-- If you get a `not found` error when you select **Create Branch**, re-select the tag in the **Based on** field and select **Create Branch** again. -->

## Delete a tag

:::warning

You can't recover tags that are deleted from Harness Code.

:::

1. When viewing a repository in Harness Code, go to **Tags**.
2. Select **More options** (&vellip;) next to the tag you want to delete, and select **Delete Tag**.
