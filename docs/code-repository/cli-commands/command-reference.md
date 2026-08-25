---
title: Code Repository command reference
sidebar_label: Command Reference
sidebar_position: 20
description: Complete reference for every Harness CLI command in the Code Repository module, covering repositories, pull requests, reviews, AI review insights, branches, commits, tags, comments, and checks.
keywords:
  - harness cli
  - code repository cli commands
  - command reference
  - harness list pr
  - harness create pr
  - harness execute pr merge
  - harness list branch
  - harness create tag
  - code review cli
tags:
  - code-repository
  - cli
---

This page is the complete command reference for the Code Repository module. It documents all 41 commands, with syntax and examples for repositories, pull requests, reviews, Harness Code AI insights, branches, commits, tags, comments, and status checks.

Every command follows the same grammar:

```sh
harness <verb> <noun> [identifier] [flags]
```

For an install, authentication, and end-to-end review walkthrough, see [Harness CLI for Code Repository](/docs/code-repository/cli-commands/harness-cli).

---

## Before you begin

- **Harness CLI installed and authenticated:** For setup steps, see [Install and upgrade](/docs/platform/harness-cli/install-and-upgrade) and [Authenticate](/docs/platform/harness-cli/authenticate).
- **Project scope configured:** Code Repository resources require `--org` and `--project`. Set them in your profile with `harness auth setscope`, or pass them on each command.
- **Code Repository permissions:** You need **View** on repositories, plus **Edit** to create or update them and **Push** to merge pull requests. For the full list, see the [Permissions reference](/docs/platform/role-based-access-control/permissions-reference#code-repository).

---

## Resource identifiers

Repositories are top-level resources. Pull requests, branches, commits, and tags live inside a repository, so they use compound identifiers that combine the repository with the child resource:

- **`<repo>`:** A repository.
- **`<repo>/<pr_number>`:** A pull request in a repository.
- **`<repo>/<branch>`:** A branch in a repository.
- **`<repo>/<sha>`:** A commit in a repository.
- **`<repo>/<pr_number>/<reviewer_id>`:** A reviewer on a pull request.
- **`<repo>/<pr_number>/<comment_id>`:** A comment on a pull request.

Leave the slash in a compound identifier unencoded. For the `--set`, `--del`, `-f`, `--format`, paging, and scope conventions that apply to every command on this page, see [Global flags and output](/docs/platform/harness-cli/global-flags-and-output).

---

## Command summary

| Resource | Commands |
| --- | --- |
| [Repositories](#repositories) | `list repository`, `get repository`, `create repository`, `update repository`, `delete repository` |
| [Pull requests](#pull-requests) | `list pr`, `list pr:mine`, `list pr:review_pending`, `get pr`, `create pr`, `update pr`, `execute pr:merge`, `execute pr:close` |
| [Reviews, reviewers, and codeowners](#reviews-reviewers-and-codeowners) | `execute pr:review`, `list code_principal`, `list pr_reviewer`, `create pr_reviewer`, `delete pr_reviewer`, `list pr_codeowner` |
| [AI review insights](#ai-review-insights) | `get pr:insight`, `get pr:review_group`, `list pr_suggested_reviewer`, `list pr_suggested_label`, `list pr_success_criterion` |
| [Activity, comments, and checks](#pull-request-activity-comments-and-checks) | `list pr_activity`, `list pr_comment`, `create pr_comment`, `update pr_comment`, `delete pr_comment`, `list pr_check`, `list commit_check` |
| [Branches](#branches) | `list branch`, `get branch`, `create branch`, `delete branch` |
| [Commits](#commits) | `list commit`, `list pr_commit`, `get commit` |
| [Tags](#tags) | `list tag`, `create tag`, `delete tag` |

---

## Repositories

A repository stores your source code and tracks changes through git. Each repository belongs to a project and has a default branch, description, and access settings.

### List repositories

View all repositories in your project to browse available codebases. Repository is a multi-level noun, so it also supports account and organization scope.

```sh
harness list repository
harness list repository --all --format json
harness list repository --search "<repository_name>"
harness list repository --columns "name,id,defaultBranch"
harness list repository --level account
```

### Get repository details

Retrieve the full metadata for a repository, including its default branch, size, clone URLs, and creation date.

```sh
harness get repository <repository_id>
harness get repository <repository_id> --format json
```

### Create a repository

Create a new empty repository. Only `identifier` is required. The `default_branch`, `description`, and `is_public` fields are optional.

```sh
harness create repository \
  --set identifier=<repository_id> \
  --set default_branch=main \
  --set description="<description>" \
  --set is_public=true
```

### Update a repository

Modify the `description`, `default_branch`, or `is_public` setting on an existing repository.

```sh
harness update repository <repository_id> --set description="<description>"
harness update repository <repository_id> --set default_branch=<branch_name>
harness update repository <repository_id> --set is_public=false
```

### Delete a repository

Remove a repository and all its contents, branches, and history. This action is irreversible.

```sh
harness delete repository <repository_id>
```

---

## Pull requests

A pull request proposes changes from one branch to another for code review. Pull requests track the discussion, review decisions, and merge status of a set of commits.

### List pull requests

View pull requests in a repository. Pass the repository identifier as a positional argument.

```sh
harness list pr <repository_id>
harness list pr <repository_id> --state open
harness list pr <repository_id> --author <email|uid|id>
harness list pr <repository_id> --search "<search_term>"
harness list pr <repository_id> --created-after <date>
harness list pr <repository_id> --sort <field> --order <asc|desc>
harness list pr <repository_id> --all --format json
```

### List your own pull requests

List the pull requests you authored across every repository in scope. This command does not take a repository identifier.

```sh
harness list pr:mine
harness list pr:mine --state open
harness list pr:mine --created-after <date> --created-before <date>
```

### List pull requests awaiting your review

List the pull requests that await your review across every repository in scope.

```sh
harness list pr:review_pending
harness list pr:review_pending --state open
harness list pr:review_pending --created-after <date> --created-before <date>
```

### Get pull request details

Retrieve the full metadata for a pull request using the `<repo_id>/<pr_number>` format. The default output is rich text produced by the workflow formatter.

```sh
harness get pr <repository_id>/<pr_number>
harness get pr <repository_id>/<pr_number> --format json
```

### Create a pull request

Open a new pull request from a source branch to a target branch. Pass the repository as a positional argument. To supply the description body from a file, use `-f`.

```sh
harness create pr <repository_id> \
  --set title="<pr_title>" \
  --set source_branch=<source_branch> \
  --set target_branch=<target_branch>

harness create pr <repository_id> \
  --set title="<pr_title>" \
  --set source_branch=<source_branch> \
  --set target_branch=<target_branch> \
  -f desc.md
```

### Update a pull request

Modify the title, description, draft state, or other editable fields on an existing pull request.

```sh
harness update pr <repository_id>/<pr_number> --set title="<updated_title>"
harness update pr <repository_id>/<pr_number> --set description="<updated_description>"
harness update pr <repository_id>/<pr_number> --set is_draft=false
```

### Merge a pull request

Merge an approved pull request into its target branch. Use `--method` to select the merge strategy, `--delete-branch` to remove the source branch after the merge, and `--dry-run` to validate the merge without applying it.

```sh
harness execute pr:merge <repository_id>/<pr_number>
harness execute pr:merge <repository_id>/<pr_number> --method merge|squash|rebase|fast-forward
harness execute pr:merge <repository_id>/<pr_number> --method squash --delete-branch
harness execute pr:merge <repository_id>/<pr_number> --dry-run
```

:::tip Verify before you merge
Run the merge with `--dry-run` first. The command reports whether the pull request is mergeable and what would happen, without changing the branch.
:::

### Close a pull request

Close a pull request without merging its changes. Use this to abandon proposals that are no longer relevant.

```sh
harness execute pr:close <repository_id>/<pr_number>
```

---

## Reviews, reviewers, and codeowners

A review records a decision on a pull request. Reviewers are the principals asked to review the changes, and codeowners are the reviewers that repository ownership rules assign automatically based on the files a pull request touches.

### Submit a review decision

Approve a pull request or request changes on it.

```sh
harness execute pr:review <repository_id>/<pr_number> --decision approve
harness execute pr:review <repository_id>/<pr_number> --decision changereq
```

### List Code principals

List the Code principals, such as users and service accounts, that are available in scope. Use this to look up the identifier of a reviewer before you add them.

```sh
harness list code_principal
harness list code_principal --search "<search_term>"
```

### List reviewers

View the reviewers on a pull request, along with each reviewer's decision, type, and the principal who added them.

```sh
harness list pr_reviewer <repository_id>/<pr_number>
harness list pr_reviewer <repository_id>/<pr_number> --format json
```

### Add a reviewer

Add a reviewer to a pull request. The CLI resolves the value you pass to `--reviewer` automatically, so you can use an email address, a UID, or an identifier.

```sh
harness create pr_reviewer <repository_id>/<pr_number> --reviewer <email|uid|id>
```

### Remove a reviewer

Remove a reviewer from a pull request using the `<repo_id>/<pr_number>/<reviewer_id>` format.

```sh
harness delete pr_reviewer <repository_id>/<pr_number>/<reviewer_id>
```

### List codeowners

View the codeowners evaluated on a pull request, including the matched pattern, the owner, and the review decision.

```sh
harness list pr_codeowner <repository_id>/<pr_number>
harness list pr_codeowner <repository_id>/<pr_number> --format json
```

---

## AI review insights

Harness Code AI review analyzes a pull request and produces review guidance: a risk summary, risk-bucketed file groups, suggested reviewers, suggested labels, and success-criteria results. Use these commands to pull that guidance into the terminal or into a script.

### Get the risk summary insight

Retrieve the risk summary insight for a pull request.

```sh
harness get pr:insight <repository_id>/<pr_number>
harness get pr:insight <repository_id>/<pr_number> --format json
```

### Get risk-bucketed review groups

Retrieve the risk-bucketed file groups for review. The default output is formatted for terminal display.

```sh
harness get pr:review_group <repository_id>/<pr_number>
harness get pr:review_group <repository_id>/<pr_number> --format json
```

### List suggested reviewers

List the reviewers that AI review suggests for a pull request.

```sh
harness list pr_suggested_reviewer <repository_id>/<pr_number>
```

### List suggested labels

List the labels that AI review suggests for a pull request.

```sh
harness list pr_suggested_label <repository_id>/<pr_number>
```

### List success-criteria results

List the AI review success-criteria results for a pull request.

```sh
harness list pr_success_criterion <repository_id>/<pr_number>
```

For more information about the AI review capabilities behind these commands, see [AI agents](/docs/code-repository/pull-requests/ai-agents).

---

## Pull request activity, comments, and checks

Pull request activity is the complete log of events on a pull request: comments, review decisions, status changes, and commit updates. Comments carry the review discussion, and checks report the status results that pipelines and other integrations publish.

### List pull request activity

View the activity timeline for a pull request. Filter the timeline with `--kind` and `--type`.

```sh
harness list pr_activity <repository_id>/<pr_number>
harness list pr_activity <repository_id>/<pr_number> --kind <kind> --type <type>
harness list pr_activity <repository_id>/<pr_number> --format json
```

### List comments

View the comments on a pull request.

```sh
harness list pr_comment <repository_id>/<pr_number>
harness list pr_comment <repository_id>/<pr_number> --format json
```

### Post a comment

Post a comment on a pull request. Supply the comment body with `-f <file>` or on stdin. To reply within an existing thread, pass the parent comment identifier to `--reply-to`.

```sh
harness create pr_comment <repository_id>/<pr_number> -f comment.md
echo "<comment_text>" | harness create pr_comment <repository_id>/<pr_number> -f -
harness create pr_comment <repository_id>/<pr_number> -f reply.md --reply-to <comment_id>
```

### Update a comment

Edit the text of an existing comment using the `<repo_id>/<pr_number>/<comment_id>` format.

```sh
harness update pr_comment <repository_id>/<pr_number>/<comment_id> --text "<updated_text>"
```

### Delete a comment

Remove a comment from a pull request.

```sh
harness delete pr_comment <repository_id>/<pr_number>/<comment_id>
```

### List pull request checks

View the status checks on a pull request. When a check reports them, the output includes the pipeline identifier, the execution identifier, and the stage.

```sh
harness list pr_check <repository_id>/<pr_number>
harness list pr_check <repository_id>/<pr_number> --format json
```

### List commit checks

View the status checks on a specific commit SHA.

```sh
harness list commit_check <repository_id>/<commit_sha>
harness list commit_check <repository_id>/<commit_sha> --search "<search_term>"
```

---

## Branches

A branch is a named pointer to a commit in a repository. Branches let multiple developers work on different features simultaneously without interfering with each other.

### List branches

View all branches in a repository to see active development work. Pass the repository as a positional argument.

```sh
harness list branch <repository_id>
harness list branch <repository_id> --search "<search_term>"
harness list branch <repository_id> --all --format json
```

### Get branch details

Retrieve metadata for a specific branch using the `<repo_id>/<branch_name>` format.

```sh
harness get branch <repository_id>/<branch_name>
harness get branch <repository_id>/<branch_name> --format json
```

### Create a branch

Create a new branch from a specified target commit or branch. Pass the repository as a positional argument.

```sh
harness create branch <repository_id> \
  --set name=<branch_name> \
  --set target=<target_branch_or_sha>
```

### Delete a branch

Remove a branch that has been merged or is no longer needed.

```sh
harness delete branch <repository_id>/<branch_name>
```

---

## Commits

A commit is an immutable snapshot of repository contents at a point in time. Each commit records who made the change, when, and why, through the commit message.

### List recent commits

View the commit history for a repository. Pass the repository as a positional argument. Use `--branch` to list commits on a specific ref and `--path` to list commits that touch a specific file.

```sh
harness list commit <repository_id>
harness list commit <repository_id> --branch <ref>
harness list commit <repository_id> --path <file_path>
harness list commit <repository_id> --limit 20 --format json
```

### List commits in a pull request

View only the commits that a pull request contains.

```sh
harness list pr_commit <repository_id>/<pr_number>
harness list pr_commit <repository_id>/<pr_number> --format json
```

### Get commit details

Retrieve the full metadata for a specific commit using the `<repo_id>/<sha>` format.

```sh
harness get commit <repository_id>/<commit_sha>
harness get commit <repository_id>/<commit_sha> --format json
```

---

## Tags

A tag marks a specific commit with a human-readable name, typically used to identify release versions. Unlike branches, tags do not move forward with new commits.

### List tags

View all tags in a repository to see the release history. Pass the repository as a positional argument.

```sh
harness list tag <repository_id>
harness list tag <repository_id> --search "<search_term>"
harness list tag <repository_id> --format json
```

### Create a tag

Create a new tag pointing to a specific commit. Pass the repository as a positional argument.

```sh
harness create tag <repository_id> \
  --set name=<tag_name> \
  --set target=<commit_sha>
```

### Delete a tag

Remove a tag that was created in error or is no longer relevant. The underlying commit remains unchanged.

```sh
harness delete tag <repository_id>/<tag_name>
```

---

## Related articles

- [Harness CLI for Code Repository](/docs/code-repository/cli-commands/harness-cli): Install the CLI, authenticate, and run a guided review and merge workflow.
- [Supported resources and actions](/docs/platform/harness-cli/supported-resources-and-actions): Confirm which actions each resource supports before you script against it.
- [Global flags and output](/docs/platform/harness-cli/global-flags-and-output): Review the flags, output formats, and paging options that apply to every command.
- [Create a pull request](/docs/code-repository/pull-requests/create-pr): Compare the CLI flow with the equivalent UI workflow.
