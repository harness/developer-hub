---
title: Enable rules
description: Set up branch and tag rules in Harness Code
sidebar_position: 30
---

In Harness Code, you can use branch rules, tag rules, and CODEOWNERS to manage individual repositories.

For broader permissions, such as the ability to view repos within a specific Harness project, go to [Access control](/docs/code-repository/get-started/onboarding-guide.md#manage-access).

## Add branch rules

In Harness Code, you can create branch rules for a single branch or multiple branches in a repository, project, org, or account. Branch rules establish criteria for approving and merging PRs, define who can create and delete branches, and more.

Branch rules set on a repository only apply to that specific repository but you can also set branch rules at the project, organization or account level to enforce consistent policies across multiple repositories. E.g. A branch rule set on a project will apply to every repository in that project - even newly created repositories. 

If you configure branch rules at multiple levels they are combined with an `AND` clause. This generally means the more restrictive rule applies. E.g If you configure a repository branch rule that requires 1 approval before merging but the org branch rule requires 2 approvals, then 2 approvals are needed. Before the branch can be merged the repository requires 1 approval AND the org requires 2 approvals so 2 approvals are needed.

1. Navigate to the level where you want to enable branch rules: repository, project, org, or account and select **Manage Repositories**.
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
| **Block branch update** | This rule doesn't block users in the **Bypass List**. |
| **Block branch deletion** | This rule doesn't block users in the **Bypass List**. |
| **Block force push** | This rule doesn't block users in the **Bypass List**. |
| **Require pull request** | This rule doesn't block users in the **Bypass List**. |
| **Enable default reviewers** | Automatically assigns default reviewers to new pull requests. Optionally, enforce a minimum number of approvals from default reviewers before merging. [Details](/docs/code-repository/config-repos/rules#default-reviewer). |
| **Require a minimum number of reviewers** | You must specify the minimum number of reviewers. |
| **Add Code Owners as reviewers** | This rule automatically adds relevant Code Owners as reviewers. |
| **Require review from code owners** | This rule requires a [CODEOWNERS file](#codeowners) in your branches. If there is no CODEOWNERS file, Harness can't enforce the rule. |
| **Require approval of new changes** | This rule requires that you *also* enable **Require a minimum number of reviewers** or **Require review from code owners** (or both). Without at least one of those additional rules, this rule has no effect. |
| **Require resolution of change requests** | None. 
| **Require comment resolution** | None. |
| **Require status checks to pass** | You must specify the checks that must pass. |
| **Limit merge strategies** | You must select the allowed merge strategies. |
| **Auto delete branch on merge** | None. |

### Default Reviewer

Default reviewers can be configured as part of branch protection rules. When enabled, specified default reviewers are automatically assigned to new pull requests.

<DocImage path={require('/docs/code-repository/config-repos/assets/default-reviewer1.png')} />

If a minimum number of approvals from default reviewers is required, the PR cannot be merged until at least that many approvals are received. This requirement is displayed in the Approvals section of the PR summary.

<DocImage path={require('/docs/code-repository/config-repos/assets/default-reviewer2.png')} />

Pull requests authored by a default reviewer will skip the required approval check if there aren’t enough remaining default reviewers to meet the condition. To enforce the approval requirement in such cases, consider adding more default reviewers.

:::warning
Updating the rule does not retroactively assign reviewers to existing PRs—it only applies at the time of PR creation.
:::

## Add Tag Rules

Harness Code Repository supports **Tag Rules**, allowing you to enforce fine-grained control over Git tag operations — similar to branch protection rules, but specific to tags.

You can restrict who can create, delete, or update tags, and apply rules to specific tag patterns.

To create a tag rule:

1. Navigate to **Code Repository** → your repo.
2. In the left sidebar, select **Manage Repository**.
3. Go to the **Rules** tab.
4. Click the **+ New branch rule** dropdown and select **New tag rule**.

### Create a Tag Rule

After selecting **New tag rule**, the rule editor appears:

#### Enable

Check this box to activate the rule.

#### Name and Description

* **Name**: A human-readable name for the rule.
* **Description** (optional): Add context for this rule’s purpose.

#### Target Patterns

* Define which tag patterns this rule applies to.
* Use globstar-style matching (e.g.:

  * `v*` for all version tags,
  * `release/**` for nested release tags).

#### Rules: Select all that apply

Choose which operations to restrict for tags matching the pattern:

* **Block tag creation** – Restrict who can create matching tags.
* **Block tag deletion** – Restrict who can delete matching tags.
* **Block tag update** – Restrict who can update matching tags.

#### Bypass List

Allow specific users, user groups, or service accounts to bypass the rule. Only those listed will be able to perform restricted operations.

### Example: Prevent Accidental Release Tagging

If you want to prevent unapproved users from creating or deleting tags like `v1.0.0`, you could:

* Target pattern: `v*`
* Enable:
  * Block tag creation
  * Block tag deletion
  * Block tag update
* Add your CI service account to the bypass list

### Tips

* Use tag rules in combination with **branch rules** for comprehensive Git policy enforcement.
* You can view all active tag rules in the **Rules** tab of the repository, under the **Tag** filter.
* Rules are enforced at the Git operation level — users pushing from Git CLI or through CI tools will see a rejection message if blocked.

## Toggle rules

You can toggle rules on and off.

1. Go to your repository and select **Settings**.
2. Select the **Rules** tab.
3. Use the switch next to each rule to enable or disable rules.

## Edit or delete rules

1. Go to your repository and select **Settings**.
2. Select the **Rules** tab.
3. Locate the rule you want to edit or delete, select **More options**, and then select **Edit Rule** or **Delete Rule**.

## CODEOWNERS

A CODEOWNERS file declares the users <!--and groups-->responsible for a repository or part of a repository. To use a `CODEOWNERS` file, create a new file named `CODEOWNERS` in one of the following locations in your repository:  

- `CODEOWNERS` (at the root level)  
- `.harness/CODEOWNERS`  

Harness Code recognizes CODEOWNERS in a repository if a CODEOWNERS file is present but does not automatically add them as reviewers. This prevents unnecessary notifications when changes affect files that don’t require review from all CODEOWNERS. To auto-add CODEOWNERS as reviewers, enable the **Add Code Owners as reviewers** rule.

You can still manually request reviews from specific CODEOWNERS. If a CODEOWNER voluntarily reviews a PR, Harness adds them as a reviewer for record-keeping, just like any other independent review. If the **Require review from code owners** branch rule is enabled, CODEOWNERS function as an approval policy—meaning a PR cannot be merged unless the changes have been approved by the required CODEOWNERS. This requirement is displayed in the Approvals section of the PR summary.

### CODEOWNERS syntax

In your Harness Code CODEOWNERS file, you can assign code ownership to users <!--and user groups-->within your Harness account<!--, organizations, or projects:-->.

<!--
* Account: `@accountIdentifier/userOrGroupName`
* Organization: `@accountIdentifier/orgIdentifier/userOrGroupName`
* Project: `@accountIdentifier/orgIdentifier/projectIdentifier/userOrGroupName`

`accountIdentifier` is your Harness account ID, `orgIdentifier` is the Harness organization ID, and `projectIdentifier` is the Harness project ID.

You can get your account ID from any Harness URL, such as `https://app.harness.io/ng/#/account/ACCOUNT_ID/home/get-started`.

To quickly get both the org ID and project ID, create or edit a pipeline in the project where you want to assign code ownership, and then check the `projectIdentifier` and `orgIdentifier` in the YAML editor. For example:

```yaml
pipeline:
  name: sample_pipeline
  identifier: sample_pipeline
  projectIdentifier: my_cool_project
  orgIdentifier: my_cool_org
  tags: {}
```

You could then declare a CODEOWNER at the project level with `@accountID/my_cool_org/my_cool_project/userOrGroupName`.

You can get user and group names where you [manage user groups](https://developer.harness.io/docs/platform/role-based-access-control/add-user-groups) and [manage users](https://developer.harness.io/docs/platform/role-based-access-control/add-users).
-->

Declare CODEOWNERS by the email address associated with their Harness user profile.

You can assign ownership to specific files, directories, or otherwise. Wildcards are allowed. For example, this CODEOWNERS file demonstrates different ways you can declare ownership.

```
Harness ---

# Global owner
* @email

# Specific file with multiple owners
Gemfile.lock @email1 @email2

# Subdirectory owners
/some_directory/ @email
/some_directory_2/ @email1 @email2

# Workspace owner
WORKSPACE @email

# Wildcards
**/src/** @email
*.lock @email

```
