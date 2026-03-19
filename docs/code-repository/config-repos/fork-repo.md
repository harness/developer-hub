---
title: Fork repositories
description: Fork repositories in Harness Code to create independent copies for contributions and experimentation.
sidebar_position: 25
---

Forking creates a personal copy of a repository under a different scope (account, organization, or project), giving you a safe space to experiment or develop features without affecting the original repository. Forks maintain a link to the original (upstream) repository, so you can sync changes and contribute back through pull requests.

Forking is especially useful for open-source contribution workflows and scenarios where contributors don't have write access to the upstream repository.

:::note

This feature is behind the `CODE_FORK_ENABLED` feature flag. To enable it, contact [Harness Support](mailto:support@harness.io).

:::

## Create a fork

1. Navigate to the repository you want to fork and go to **Summary**.
2. Select **Fork**.
3. Configure the fork settings:

   - **Fork type:** Choose between two types:
     - **Branch fork:** Creates a copy with only a single branch. This is useful when you only need to work on changes based on one branch and want a lighter-weight copy.
     - **Full fork:** Creates a copy of the entire repository, including all branches. Use this when you need the full history and branch structure.
   - **Branch** (branch fork only): Select which branch to include in the fork.
   - **Destination:** Choose the account, organization, or project where the fork will be created.
   - **Name:** Enter a name for the forked repository. Repository names can contain alphanumeric characters, dashes, dots, and underscores.
   - **Visibility:** Select **Public** or **Private**. If the source repository is private, the fork is always private. If the source is public, you can choose to make the fork private.

4. Select **Fork Repository**.

After the fork is created, you are redirected to the new fork's summary page. A **Forked from** label appears in the repository header, linking back to the upstream repository.

## Sync a fork with upstream

Over time, the upstream repository may receive new commits that your fork doesn't have. Harness Code provides a built-in mechanism to keep your fork up to date without manual Git operations.

1. In your forked repository, go to **Summary** or **Files**.

   If your fork's current branch is behind the upstream, a banner appears indicating how many commits behind you are.

2. Select **Fetch Upstream**, then select **Fetch and merge**.

   This merges the latest changes from the upstream branch into the corresponding branch in your fork.

:::tip

If you want to review the upstream changes before merging, select **Compare** instead. This opens the compare view where you can inspect the differences between your fork and the upstream branch.

:::

## Create a pull request from a fork

Forks integrate with the pull request workflow, allowing you to propose changes back to the upstream repository or between the fork and upstream in either direction.

1. In your forked repository, go to **Pull Requests** and select **New Pull Request**.
2. Use the **repository selector** next to each branch picker to choose which repository each branch belongs to:

   - **Base:** The repository and branch you want to merge changes *into*. Select the upstream repository to contribute changes back to the original project, or select the fork to pull upstream changes into your fork.
   - **Compare:** The repository and branch that contains your changes.

3. Review the diff to confirm the changes are correct.
4. Add a **Title** and **Description**, then select **Create pull request**.

The pull request is created in the base repository. If the base is the upstream repository, the PR appears in the upstream's pull request list.

:::note

When a pull request involves two different repositories (fork and upstream), the source and target branches display with repository context so reviewers can identify where the changes originate. A fork tag appears next to the source branch in the PR header and in the PR list.

:::

## Avoid reusing branches across pull requests

A common mistake when working with forks is to commit directly to a long-lived branch (such as `main`), open a PR to the upstream from that branch, and then sync upstream back into the same branch after the PR is merged. This creates problems because your fork's branch now contains both the original commits *and* the merged version of those commits from upstream. The next PR you open from that branch will show duplicate or phantom changes that have already been merged.

:::warning Anti-pattern: branch reuse cycle

The following workflow leads to duplicate commits and polluted diffs:

1. Push changes directly to `main` in your fork.
2. Open a PR from your fork's `main` to the upstream `main`.
3. The PR is merged (via merge commit or squash) into upstream.
4. Sync upstream back into your fork's `main` using **Fetch Upstream**.
5. Push new changes to the same `main` branch and open another PR.

At step 5, the new PR includes the original commits from step 1 (which already exist in upstream in a different form), resulting in a confusing diff and potential merge conflicts.

:::

**Recommended workflow:** Always create a dedicated feature branch for each contribution. Keep your fork's default branch clean and in sync with upstream — use it only as a base for new branches, never as a working branch.

1. **Sync your fork's default branch** with upstream using **Fetch Upstream**.
2. **Create a new branch** off the default branch for your changes (for example, `fix/login-bug` or `feat/dashboard-widget`).
3. **Push changes** to the feature branch and open a PR from it to the upstream.
4. After the PR is merged, **delete the feature branch** and sync your default branch again.
5. **Repeat** from step 1 for the next contribution.

This keeps each PR isolated, prevents commit duplication, and ensures clean diffs every time.

## View fork pull requests

Pull requests created from forks are visible in the target repository's pull request list alongside regular PRs. Fork PRs are distinguished by a **fork tag** next to the source branch name, indicating the PR originates from a different repository.

In the PR detail view, the header shows the full source context (repository and branch) so reviewers can trace the origin of the changes.

## Next steps

After forking a repository, you can:

- [Clone your fork](../work-in-repos/clone-repos.md) to work locally.
- [Create branches](../work-in-repos/branch.md) in your fork for feature development.
- [Open pull requests](../pull-requests/create-pr.md) to contribute changes back to the upstream repository.
- [Configure branch rules](./rules.md) on your fork for your own workflow.
