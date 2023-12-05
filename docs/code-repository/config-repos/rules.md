---
title: Enable branch rules
description: Set up branch rules in Harness Code
sidebar_position: 30
---

In Harness Code, you can create branch rules for a single branch or multiple branches in a repository. Branch rules establish criteria for approving and merging PRs, define who can create and delete branches, and more.

## Add branch rules

1. Go to the repository where you want to enable branch rules, and select **Settings**.
2. Select the **Rules** tab.
3. Select **New Branch Rule**.
4. Enter the rule **Name** and optional **Description**.
5. In **Target Patterns**, specify branches covered by this rule according to branch name globstar patterns, such as `string`, `feature-*`, or `releases/**`. You can also select whether the rule should apply to the default branch (such as `main`). Patterns can be inclusive or exclusive.
6. In **Bypass List**, you can specify users who can bypass this rule.
7. For each of the [**Rules**](#available-rules), select the rule you want to enable and provide additional specifications, if necessary. For example, if you select **Require a minimum number of reviewers**, you must specify the minimum number of reviewers.
8. Select **Create Rule**.

### Available rules

The following rules are available when adding branch rules. Some rules require additional configuration.

| Rule | Additional configuration |
| ---- | ------------------------ |
| **Block branch creation** | This rule doesn't block users in the **Bypass List**. |
| **Block branch deletion** | This rule doesn't block users in the **Bypass List**. |
| **Require pull request** | This rule doesn't block users in the **Bypass List**. |
| **Require a minimum number of reviewers** | You must specify the minimum number of reviewers. |
| **Require review from code owners** | This rule requires a `CODEOWNERS` file in your branches. If there is no `CODEOWNERS` file, Harness can't enforce the rule. |
| **Require approval of new changes** | This rule requires that you *also* enable **Require a minimum number of reviewers** or **Require review from code owners** (or both). Without at least one of those additional rules, this rule has no effect. |
| **Require comment resolution** | None. |
| **Require status checks to pass** | You must specify the checks that must pass. |
| **Limit merge strategies** | You must select the allowed merge strategies. |
| **Auto delete branch on merge** | None. |

## Toggle rules

You can toggle branch rules on and off.

1. Go to your repository and select **Settings**.
2. Select the **Rules** tab.
3. Use the switch next to each rule to enable or disable rules.

## Edit or delete rules

1. Go to your repository and select **Settings**.
2. Select the **Rules** tab.
3. Locate the rule you want to edit or delete, select **More options** (&vellip;), and then select **Edit Rule** or **Delete Rule**.
