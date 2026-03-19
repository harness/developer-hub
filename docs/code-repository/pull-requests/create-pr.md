---
title: Create PRs
description: Create PRs in Harness Code
sidebar_position: 10
---

Pull requests (PRs) foster collaboration within your team, ensuring code changes go through required reviews, approvals, and checks before being merged to the base branch.

## Create a pull request

1. In your repository, go to **Pull Requests** and select **New Pull Request**.
2. Select the *base branch* and the *compare branch*, which is the branch that you want to merge into the base branch.
3. Add the **Title** and **Description**.
4. If this PR is ready for review, select **Create pull request**.

   To save a PR as a draft, select the dropdown next to **Create pull request**, and then select **Create draft pull request**.

5. [Request reviews](./review-pr.md) and then [merge the PR](./merge-pr.md).

:::tip

You can also create PRs by [comparing branches](../work-in-repos/branch.md#compare-branches-create-a-pr) and when [committing changes](../work-in-repos/commit.md#create-a-commit).

To create a PR from a [forked repository](../config-repos/fork-repo.md#create-a-pull-request-from-a-fork), use the repository selector in the compare view to choose between the fork and upstream repository.

:::

### Compare & Pull Request Banner

When a commit is pushed to a branch without an existing pull request, Harness Code Repository displays a banner at the top of the repository page, allowing the user to quickly create a PR from that branch.

<DocImage path={require('/docs/code-repository/pull-requests/static/pr-banner-on-new-change.png')} />

:::note Banner Visibility
The banner appears for **2 hours** after changes are pushed to a branch. Once this time window passes, the banner no longer displays on page load.

Only the **three most recently updated branches** are eligible to show the banner.
:::

## AI PR Summary

Harness AI can automatically generate intelligent summaries for your pull requests based on the code changes and diff. This feature helps streamline code reviews by providing context-aware descriptions of what changed and why.

### Prerequisites

To use AI PR Summary, Harness AI must be enabled in your account settings:

1. Navigate to **Account Settings** in your Harness account
2. Go to the **Harness AI** section  
3. Enable **Harness AI** by toggling the switch to **ON**

### Generate an AI summary

When creating or editing a pull request:

1. Open your pull request in Harness Code Repository
2. In the PR description area, click the **AI Summary** button
3. Harness AI will analyze the PR diff and generate an intelligent summary describing:
   - What changes were made
   - The purpose and impact of the changes
   - Key modifications across files

The AI-generated summary provides a concise overview that helps reviewers quickly understand the scope and intent of your changes, making the code review process more efficient.

:::note
AI PR Summary requires Harness AI to be enabled in your account settings and may take a few moments to generate based on the size of your PR diff.
:::

## Close a pull request

If you decide a pull request is invalid or not ready for review, you can close it.

1. In your repository, go to **Pull Requests**, and select the PR you want to close.
2. Select **More options** (&vellip;) next to **Squash and merge**.
3. Select **Close pull request**.

To reopen the PR, select **Open for review**.
<!-- 
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

When a contributor opens a PR, Harness checks for `pull_request_template.md` in the `.harness` directory and populates the PR description with the template. -->
