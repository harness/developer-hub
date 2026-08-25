---
title: Harness CLI for Code Repository
sidebar_label: Harness CLI
sidebar_position: 10
description: Install, authenticate, and run the Harness CLI to manage repositories, pull requests, reviews, branches, and tags from your terminal.
keywords:
  - harness cli
  - code repository cli
  - harness auth login
  - harness list pr
  - harness execute pr merge
  - harness create pr
  - pull request cli
  - code review cli
tags:
  - code-repository
  - cli
  - onboarding
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

The **Harness CLI** is the unified command-line interface for Harness. It uses one consistent grammar across every module, so the way you install, authenticate, and run commands for Code Repository matches the rest of the Harness platform. This guide shows you how to install the CLI, log in, set your scope, and manage repositories, pull requests, reviews, branches, and tags from your terminal.

---

## What you will learn in this topic

- How to install the Harness CLI and verify the installation
- How to authenticate and set your default org and project scope
- How to create and inspect repositories from the terminal
- How to open, review, and merge pull requests without leaving your shell
- How to manage reviewers, codeowners, branches, tags, comments, and status checks

---

## Before you begin

- **A Harness account:** Access to a project that contains at least one code repository. For steps to create one, see [Create a repository](/docs/code-repository/config-repos/create-repo).
- **A supported operating system:** macOS or Linux on `amd64` or `arm64`. Windows is not supported. Use WSL (Windows Subsystem for Linux) if you are on Windows. The installer downloads the matching binary automatically.
- **Code Repository permissions:** You need **View** on repositories, plus **Edit** to create or update them and **Push** to merge pull requests. For the full list, see the [Permissions reference](/docs/platform/role-based-access-control/permissions-reference#code-repository).
- **An API key (optional):** Required only for CI pipelines and automated scripts. For steps to create one, see [Manage API keys](/docs/platform/automation/api/add-and-manage-api-keys).
- **`curl` available on your `PATH`:** The install step uses `curl` to download the installer.

---

## Command overview

Every command follows the `harness <verb> <noun> [identifier] [flags]` grammar. The following table lists all 41 Code Repository commands, grouped by task. For the full syntax and flags for each one, see the [Code Repository command reference](/docs/code-repository/cli-commands/command-reference).

| Task | Commands |
| --- | --- |
| [Repositories](#manage-repositories) | `list repository`, `get repository`, `create repository`, `update repository`, `delete repository` |
| [Pull requests](#work-with-pull-requests) | `list pr`, `list pr:mine`, `list pr:review_pending`, `get pr`, `create pr`, `update pr`, `execute pr:merge`, `execute pr:close`, `execute pr:review` |
| [Reviewers and codeowners](#manage-reviewers-and-codeowners) | `list code_principal`, `list pr_reviewer`, `create pr_reviewer`, `delete pr_reviewer`, `list pr_codeowner` |
| [AI review insights](#review-insights-from-harness-code-ai) | `get pr:insight`, `get pr:review_group`, `list pr_suggested_reviewer`, `list pr_suggested_label`, `list pr_success_criterion` |
| [Branches, commits, and tags](#manage-branches-commits-and-tags) | `list branch`, `get branch`, `create branch`, `delete branch`, `list commit`, `get commit`, `list pr_commit`, `list tag`, `create tag`, `delete tag` |
| [Activity, comments, and checks](#track-activity-comments-and-checks) | `list pr_activity`, `list pr_comment`, `create pr_comment`, `update pr_comment`, `delete pr_comment`, `list pr_check`, `list commit_check` |

---

## Set up the CLI

Install the CLI, log in, and set the org and project that your commands target by default.

```bash
# 1. Install the CLI
curl -fsSL https://raw.githubusercontent.com/harness/cli/main/install.sh | sh

# 2. Confirm the install
harness version

# 3. Log in
harness auth login

# 4. Set the scope your commands target
harness auth setscope --org <org-id> --project <project-id>

# 5. Confirm your profile, account, and token state
harness auth status
```

Windows is not supported. Use WSL (Windows Subsystem for Linux) if you are on Windows.
:::tip Non-interactive authentication
For CI pipelines and automated scripts, set the `HARNESS_API_KEY` environment variable instead of running an interactive login. Interactive login requires a TTY.
:::

Enable tab completion so the CLI resolves repository names, branch names, and pull request numbers against the live Harness API as you type.

<Tabs>
<TabItem value="zsh" label="Zsh" default>

```bash
source <(harness completion zsh)
```

</TabItem>
<TabItem value="bash" label="Bash">

```bash
source <(harness completion bash)
```

</TabItem>
</Tabs>

For installer flags, profile management, token expiry, and the full authentication precedence order, see [Install and upgrade](/docs/platform/harness-cli/install-and-upgrade) and [Authenticate](/docs/platform/harness-cli/authenticate).

---

## Resource identifiers

The Harness CLI grammar is `harness <verb> <noun> [identifier] [flags]`. Repositories are top level, and everything else lives inside a repository, so Code Repository nouns use compound identifiers built with slashes.

| Identifier form | Used by | Example |
| --- | --- | --- |
| `<repo>` | Repositories, and the list commands scoped to a repository | `my-service` |
| `<repo>/<pr_number>` | Pull requests, reviewers, codeowners, comments, activity, checks | `my-service/42` |
| `<repo>/<branch>` | Branches | `my-service/release-1.2` |
| `<repo>/<sha>` | Commits and commit checks | `my-service/a1b2c3d` |
| `<repo>/<pr_number>/<reviewer_id>` | Reviewer removal | `my-service/42/alice` |
| `<repo>/<pr_number>/<comment_id>` | Comment updates and deletion | `my-service/42/108` |

Leave the slash in a compound identifier unencoded. For the `--set`, `--del`, `-f`, `--format`, paging, and scope conventions that apply to every command on this page, see [Global flags and output](/docs/platform/harness-cli/global-flags-and-output).

---

## Manage repositories

Repositories support the full create, read, update, and delete cycle. The `list` command is multi-level, so `--level` targets account, org, or project scope.

| Command | Description |
| --- | --- |
| `harness list repository` | List repositories in scope. Supports `--level account\|org\|project`. |
| `harness get repository <repo>` | Get a repository by identifier. |
| `harness create repository <repo>` | Create a repository with `--set`. |
| `harness update repository <repo>` | Update `description`, `default_branch`, or `is_public`. |
| `harness delete repository <repo>` | Delete a repository by identifier. |

List the repositories in your project, then look at one:

```bash
harness list repository
harness list repository --level org --org my-org
harness get repository my-service
```

Create a repository and set its default branch:

```bash
harness create repository my-service \
  --set identifier=my-service default_branch=main description="Billing service" is_public=false
```

Update the description and switch the default branch:

```bash
harness update repository my-service --set description="Billing and invoicing service"
harness update repository my-service --set default_branch=develop
```

---

## Work with pull requests

Pull requests are the core of the CLI workflow for Code Repository. You can open a pull request, track it, review it, and merge it without opening the UI.

| Command | Description |
| --- | --- |
| `harness list pr <repo>` | List pull requests for a repository. |
| `harness list pr:mine` | List pull requests you authored across every repository in scope. |
| `harness list pr:review_pending` | List pull requests awaiting your review across every repository in scope. |
| `harness get pr <repo>/<pr_number>` | Get pull request details. |
| `harness create pr <repo>` | Create a pull request. |
| `harness update pr <repo>/<pr_number>` | Update the title, description, or draft state. |
| `harness execute pr:merge <repo>/<pr_number>` | Merge a pull request. |
| `harness execute pr:close <repo>/<pr_number>` | Close a pull request without merging. |
| `harness execute pr:review <repo>/<pr_number>` | Submit a review decision. |

### Find the pull requests that need you

Two qualified nouns work across every repository in scope, which makes them a good start to your day:

```bash
harness list pr:mine
harness list pr:review_pending
```

Both accept `--state`, `--created-after`, and `--created-before`.

```bash
harness list pr:mine --state open
harness list pr:review_pending --created-after 2026-08-01
```

To scope to a single repository, pass the repository identifier and filter as needed:

```bash
harness list pr my-service --state open
harness list pr my-service --author alice@example.com --sort created --order desc
harness list pr my-service --search "rate limit"
```

`--author` accepts an email address, a user ID, or a numeric principal ID.

### Create a pull request

Set the title and the source and target branches with `--set`. Pass a Markdown file with `-f` to supply the description body.

```bash
harness create pr my-service \
  --set title="Add retry to billing client" source_branch=feature/retry target_branch=main
```

```bash
harness create pr my-service \
  --set title="Add retry to billing client" source_branch=feature/retry target_branch=main \
  -f pr-description.md
```

### Update a pull request

```bash
harness get pr my-service/42
harness update pr my-service/42 --set title="Add retry and backoff to billing client"
harness update pr my-service/42 --set is_draft=false
```

### Review a pull request

Submit a decision with `--decision`. Use `approve` to approve, or `changereq` to request changes.

```bash
harness execute pr:review my-service/42 --decision approve
harness execute pr:review my-service/42 --decision changereq
```

### Merge or close a pull request

Choose the merge method explicitly. Add `--delete-branch` to clean up the source branch, and `--dry-run` to check mergeability first.

```bash
harness execute pr:merge my-service/42 --method squash --delete-branch
harness execute pr:merge my-service/42 --method merge --dry-run
harness execute pr:close my-service/42
```

`--method` accepts `merge`, `squash`, `rebase`, and `fast-forward`.

:::tip Verify before you merge
Run the merge with `--dry-run` first. The command reports whether the pull request is mergeable and what would happen, without changing the branch.
:::

---

## Manage reviewers and codeowners

Add and remove reviewers from the terminal, and check how codeowner rules evaluated against a pull request.

| Command | Description |
| --- | --- |
| `harness list code_principal` | List Code principals (users and service accounts) in scope. Supports `--search`. |
| `harness list pr_reviewer <repo>/<pr_number>` | List reviewers with their decision, type, and who added them. |
| `harness create pr_reviewer <repo>/<pr_number>` | Add a reviewer with `--reviewer`. |
| `harness delete pr_reviewer <repo>/<pr_number>/<reviewer_id>` | Remove a reviewer. |
| `harness list pr_codeowner <repo>/<pr_number>` | List codeowners evaluated on the pull request, with pattern, owner, and decision. |

Find a principal, add them as a reviewer, then confirm:

```bash
harness list code_principal --search alice
harness create pr_reviewer my-service/42 --reviewer alice@example.com
harness list pr_reviewer my-service/42
```

`--reviewer` resolves an email address, user ID, or numeric principal ID automatically.

Remove a reviewer, and review which codeowner rules applied:

```bash
harness delete pr_reviewer my-service/42/alice
harness list pr_codeowner my-service/42
```

---

## Review insights from Harness Code AI

Harness Code AI produces risk summaries, review groupings, and suggestions on a pull request. The CLI reads all of them, which is useful for triaging a large pull request before you open the diff.

| Command | Description |
| --- | --- |
| `harness get pr:insight <repo>/<pr_number>` | Get the risk summary insight for a pull request. |
| `harness get pr:review_group <repo>/<pr_number>` | Get risk-bucketed file groups for review. |
| `harness list pr_suggested_reviewer <repo>/<pr_number>` | List AI-suggested reviewers. |
| `harness list pr_suggested_label <repo>/<pr_number>` | List AI-suggested labels. |
| `harness list pr_success_criterion <repo>/<pr_number>` | List AI review success-criteria results. |

Triage a pull request by risk before you read the code:

```bash
harness get pr:insight my-service/42
harness get pr:review_group my-service/42
```

Check the suggestions, then act on them:

```bash
harness list pr_suggested_reviewer my-service/42
harness list pr_suggested_label my-service/42
harness list pr_success_criterion my-service/42
```

For more information about the AI review capabilities behind these commands, see [AI agents](/docs/code-repository/pull-requests/ai-agents).

---

## Manage branches, commits, and tags

| Command | Description |
| --- | --- |
| `harness list branch <repo>` | List branches. Supports `--search`. |
| `harness get branch <repo>/<branch>` | Get branch details. |
| `harness create branch <repo>` | Create a branch with `--set name=<branch> target=<sha_or_branch>`. |
| `harness delete branch <repo>/<branch>` | Delete a branch by name. |
| `harness list commit <repo>` | List commits. Supports `--branch <ref>` and `--path <file>`. |
| `harness get commit <repo>/<sha>` | Get commit details. |
| `harness list pr_commit <repo>/<pr_number>` | List the commits in a pull request. |
| `harness list tag <repo>` | List tags. Supports `--search`. |
| `harness create tag <repo>` | Create a tag with `--set name=<tag> target=<sha>`. |
| `harness delete tag <repo>/<tag>` | Delete a tag by name. |

Create a release branch off `main`, then confirm it exists:

```bash
harness create branch my-service --set name=release-1.2 target=main
harness get branch my-service/release-1.2
harness list branch my-service --search release
```

Inspect history, including the commits on a single file:

```bash
harness list commit my-service --branch main
harness list commit my-service --path src/billing/client.go
harness get commit my-service/a1b2c3d
harness list pr_commit my-service/42
```

Tag a release, then clean up an old branch:

```bash
harness create tag my-service --set name=v1.2.0 target=a1b2c3d
harness list tag my-service
harness delete branch my-service/feature/retry
```

---

## Track activity, comments, and checks

| Command | Description |
| --- | --- |
| `harness list pr_activity <repo>/<pr_number>` | List the activity timeline, including comments, reviews, and state changes. Supports `--kind` and `--type`. |
| `harness list pr_comment <repo>/<pr_number>` | List comments on a pull request. |
| `harness create pr_comment <repo>/<pr_number>` | Post a comment from a file or stdin. Supports `--reply-to <id>`. |
| `harness update pr_comment <repo>/<pr_number>/<comment_id>` | Edit an existing comment with `--text`. |
| `harness delete pr_comment <repo>/<pr_number>/<comment_id>` | Delete a comment. |
| `harness list pr_check <repo>/<pr_number>` | List status checks on a pull request, including pipeline and execution IDs. |
| `harness list commit_check <repo>/<sha>` | List status checks on a commit SHA. Supports `--search`. |

Read the timeline, then post a comment:

```bash
harness list pr_activity my-service/42
harness list pr_comment my-service/42
harness create pr_comment my-service/42 -f review-notes.md
```

Pass `-` to read the comment body from stdin, which works well in scripts:

```bash
echo "Verified against staging. Approving." | harness create pr_comment my-service/42 -f -
```

Reply in a thread, edit a comment, or remove it:

```bash
harness create pr_comment my-service/42 --reply-to 108 -f follow-up.md
harness update pr_comment my-service/42/108 --text "Corrected: this affects only the retry path."
harness delete pr_comment my-service/42/108
```

Check pipeline status before you merge:

```bash
harness list pr_check my-service/42
harness list commit_check my-service/a1b2c3d
```

:::tip Discover any command
Append `--help` at any level to list the available verbs, nouns, and flags, for example `harness execute pr:merge --help`.
:::

---

## Example: review and merge from the terminal

The following sequence covers a full review pass without opening the UI.

```bash
# 1. Find what is waiting on you
harness list pr:review_pending --state open

# 2. Triage the change by risk
harness get pr:insight my-service/42
harness get pr:review_group my-service/42

# 3. Confirm checks passed
harness list pr_check my-service/42

# 4. Leave a comment and approve
echo "Retry logic looks correct. Approving." | harness create pr_comment my-service/42 -f -
harness execute pr:review my-service/42 --decision approve

# 5. Merge and clean up
harness execute pr:merge my-service/42 --method squash --delete-branch
```

---

## Troubleshooting

<Troubleshoot
  issue="harness: command not found after installing the Harness CLI"
  mode="fallback-only"
  fallback={`The install directory is not on your PATH. Add ~/.local/bin to your PATH (export PATH="$HOME/.local/bin:$PATH"), then restart your shell or re-run the installer and accept the PATH update prompt.`}
/>

<Troubleshoot
  issue="harness auth login fails or hangs with no interactive prompt in Harness CLI"
  mode="fallback-only"
  fallback="Interactive login requires a TTY. In CI or a non-interactive shell, set the HARNESS_API_KEY environment variable instead of running harness auth login."
/>

<Troubleshoot
  issue="harness list repository returns no repositories or an empty result in Harness Code Repository"
  mode="docs"
  fallback="Your default org and project may be unset or pointing at the wrong scope. Run harness auth setscope --org <org-id> --project <project-id>, and add --level org or --level account if the repository lives above project scope."
/>

<Troubleshoot
  issue="Harness CLI reports a resource not found error for a pull request or branch in Harness Code Repository"
  mode="docs"
  fallback="Code Repository nouns use compound identifiers. Pass the repository with the resource, for example my-service/42 for a pull request and my-service/release-1.2 for a branch, and leave the slash unencoded."
/>

<Troubleshoot
  issue="harness execute pr:merge fails with a permission or mergeability error in Harness Code Repository"
  mode="docs"
  fallback="Merging requires Push permission on the repository, and the pull request must satisfy its branch rules. Run the command with --dry-run to see what blocks the merge, and check harness list pr_check for failing status checks."
/>

---

## Related articles

For the full command reference and the UI workflows that these commands map onto, see the following topics.

- [Code Repository command reference](/docs/code-repository/cli-commands/command-reference): Review every Code Repository command, flag, and output option.
- [Supported resources and actions](/docs/platform/harness-cli/supported-resources-and-actions): Confirm which actions each resource supports before you script against it.
- [Create a pull request](/docs/code-repository/pull-requests/create-pr): Compare the CLI flow with the equivalent UI workflow.
- [Review a pull request](/docs/code-repository/pull-requests/review-pr): Understand review decisions, approvals, and branch rules.
