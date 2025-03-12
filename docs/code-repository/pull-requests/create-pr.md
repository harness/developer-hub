---
title: Create PRs
description: Create PRs in Harness Code
sidebar_position: 10
---

Pull requests (PRs) foster collaboration within your team, ensuring code changes go through required reviews, approvals, and checks before being merged to the base branch.

## Create a pull request

1. In your repository, go to **Pull Requests** and select **New Pull Request**.
2. Select the *base branch* and the *compare branch*, which is the branch that you want to merge into the base branch.
3. You can edit the **Title** and enter a **Description**.
4. If this PR is ready for review, select **Create pull request**.

   To save a PR as a draft, select the dropdown next to **Create pull request**, and then select **Create draft pull request**.

5. [Request reviews](./review-pr.md) and then [merge the PR](./merge-pr.md).

:::tip

You can also create PRs by [comparing branches](../work-in-repos/branch.md#compare-branches-create-a-pr) and when [committing changes](../work-in-repos/commit.md#create-a-commit).

:::

## Close a pull request

If you decide a pull request is invalid or not ready for review, you can close it.

1. In your repository, go to **Pull Requests**, and select the PR you want to close.
2. Select **More options** (&vellip;) next to **Squash and merge**,
3. Select **Close pull request**

To reopen the PR, select **Open for review**.

## Pull request templates

Pull request templates encourage contributors to provide required and optional information in pull request descriptions.

To create a pull request template for a Harness Code repo, create a `pull_request_template.md` file in the repo's `.harness` directory, and then add your Markdown-formatted template to `pull_request_template.md`. For example:

```md
## Change summary

This PR includes changes that...

## Change type

- [ ] Bug fix
- [ ] Enhancements
- [ ] Documentation
- [ ] Maintenance

## Linked issues

This PR includes changes that address the following issues/tickets:

- x
- x
- x

```

When a contributor opens a PR, Harness checks for `pull_request_template.md` in the `.harness` directory and populates the PR description with the template.
