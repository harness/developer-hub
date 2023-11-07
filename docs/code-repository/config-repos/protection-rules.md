---
title: Enable protection rules
description: Set up branch protection rules in Harness Code
sidebar_position: 20
---

:::note

Currently, branch protection rules are in pre-beta. These features might not function as expected while they are in development.

:::

In Harness Code, you can create branch protection rules for a single branch or multiple branches in a repository.

## Add branch protection rules

1. Go to the repository where you want to enable branch protection, and select **Settings**.
2. Select the **Protection Rules** tab.
3. Select **New Branch Protection Rule**.
4. Enter the rule **Name** and optional **Description**.
5. In **Target Patterns**, specify branches covered by this rule according to branch name patterns. You can enter specific names, regex patterns, and select whether the rule should apply to the default branch (such as `main`). Patterns can be inclusive or exclusive.
6. In **Bypass List**, you can specify users who can bypass certain branch protections.
7. For each of the [**Protections**](#available-protections), select the rule you want to enable and provide additional specifications, if necessary. For example, if you select **Require a minimum number of reviewers**, you must specify the minimum number of reviewers.
8. Select **Create Rule**.

### Available protections

The following protections are available when adding branch protection rules. Some protections require additional configuration.

| Rule | Additional configuration |
| ---- | ------------------------ |
| **Require a minimum number of reviewers** | You must specify the minimum number of reviewers. |
| **Require review from code owners** | This rule requires a `CODEOWNERS` file in your branches. If there is no `CODEOWNERS` file, Harness can't enforce the rule. |
| **Require approval of new changes** | None. |
| **Require comment resolution** | None. |
| **Require status checks to pass** | You must specify the checks that must pass. |
| **Limit merge strategies** | You must select the allowed merge strategies. |
| **Auto delete branch on merge** | None. |
| **Block branch creation** | This rule doesn't block users in the **Bypass List**. |
| **Block branch deletion** | This rule doesn't block users in the **Bypass List**. |
| **Block merge without pull request** | This rule doesn't block users in the **Bypass List**. |

## Toggle rules

You can toggle branch protection rules on and off.

1. Go to your repository and select **Settings**.
2. Select the **Protection Rules** tab.
3. Use the switch next to each rule to enable or disable rules.

## Edit or delete rules

1. Go to your repository and select **Settings**.
2. Select the **Protection Rules** tab.
3. Locate the rule you want to edit or delete, select **More options** (&vellip;), and then select **Edit Rule** or **Delete Rule**.
