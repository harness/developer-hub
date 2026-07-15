---
title: Code Repository
sidebar_label: Code Repository
description: Use the Harness CLI to manage the Code Repository module, including repositories, pull requests, branches, commits, tags, and pull request activity.
sidebar_position: 5
keywords:
  - harness cli
  - code repository
  - repositories
  - pull requests
  - branches
  - commits
  - tags
  - git
---

Harness Code Repository provides built-in git hosting within the Harness platform. The CLI gives you full access to repository management, pull request workflows, branch operations, and commit history without switching to a browser or external git host. Use these commands to automate code review workflows, manage branches at scale, and integrate repository operations into scripts and pipelines.

This page covers all Code Repository resources and actions available in the CLI.

---

## What will you learn in this topic?

By the end of this page, you will know how to:

- List, create, update, and delete repositories.
- Open, update, merge, and close pull requests from the terminal.
- View pull request activity and review history.
- Create and manage branches and tags.
- Inspect commit history and individual commit details.

---

## Before you begin

- **Harness CLI installed and authenticated:** Go to [Install and upgrade](/docs/platform/harness-cli/install-and-upgrade) and [Authenticate](/docs/platform/harness-cli/authenticate) to set up the CLI.
- **Project scope configured:** Code Repository resources require `--org` and `--project`. Set them in your profile or pass them on each command.

---

## Repositories

A repository stores your source code and tracks changes through git. Each repository belongs to a project and has a default branch, description, and access settings. Use repository commands to create new projects, update configurations, or remove archived code.

### List repositories

View all repositories in your project to browse available codebases.

```sh
harness list repository
harness list repository --all --format json
harness list repository --search "<repository_name>"
harness list repository --columns "name,id,defaultBranch"
```

### Get repository details

Retrieve the full metadata for a repository, including its default branch, size, clone URLs, and creation date.

```sh
harness get repository <repository_id>
harness get repository <repository_id> --format json
```

### Create a repository

Create a new empty repository with a specified default branch.

```sh
harness create repository \
  --set identifier=<repository_id> \
  --set name="<repository_name>" \
  --set defaultBranch=<branch_name>
```

### Update a repository

Modify repository settings such as the description or default branch.

```sh
harness update repository <repository_id> --set description="<description>"
harness update repository <repository_id> --set defaultBranch=<branch_name>
```

### Delete a repository

Remove a repository and all its contents, branches, and history. This action is irreversible.

```sh
harness delete repository <repository_id>
```

---

## Pull requests

A pull request proposes changes from one branch to another for code review. Pull requests track the discussion, review decisions, and merge status of a set of commits. Use the CLI to manage the entire pull request lifecycle from creation through merge.

### List pull requests

View open pull requests in a repository. Pass the repository identifier as a positional argument.

```sh
harness list pr <repository_id>
harness list pr <repository_id> --format json
harness list pr <repository_id> --search "<search_term>"
harness list pr <repository_id> --all
```

### Get pull request details

Retrieve the full metadata for a pull request using the `<repo_id>/<pr_number>` format.

```sh
harness get pr <repository_id>/<pr_number>
harness get pr <repository_id>/<pr_number> --format json
```

### Create a pull request

Open a new pull request from a source branch to a target branch. Pass the repository as a positional argument.

```sh
harness create pr <repository_id> \
  --set title="<pr_title>" \
  --set source_branch=<source_branch> \
  --set target_branch=<target_branch>
```

### Update a pull request

Modify the title, description, or other editable fields on an existing pull request.

```sh
harness update pr <repository_id>/<pr_number> --set title="<updated_title>"
harness update pr <repository_id>/<pr_number> --set description="<updated_description>"
```

### Merge a pull request

Merge an approved pull request into its target branch. The merge strategy follows the repository settings.

```sh
harness execute pr:merge <repository_id>/<pr_number>
```

### Close a pull request

Close a pull request without merging its changes. Use this to abandon proposals that are no longer relevant.

```sh
harness execute pr:close <repository_id>/<pr_number>
```

---

## Pull request activity

Pull request activity is the complete log of events on a pull request: comments, review decisions, status changes, and commit updates. Use activity to track the review history and understand how a pull request evolved.

```sh
harness list pr_activity <repository_id>/<pr_number>
harness list pr_activity <repository_id>/<pr_number> --format json
```

---

## Branches

A branch is a named pointer to a commit in a repository. Branches let multiple developers work on different features simultaneously without interfering with each other. Use branch commands to create feature branches, inspect branch state, or clean up merged branches.

### List branches

View all branches in a repository to see active development work. Pass the repository as a positional argument.

```sh
harness list branch <repository_id>
harness list branch <repository_id> --format json
harness list branch <repository_id> --all
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

A commit is an immutable snapshot of repository contents at a point in time. Each commit records who made the change, when, and why (through the commit message). Use commit commands to browse history and inspect individual changes for debugging or auditing.

### List recent commits

View the commit history for a repository. Pass the repository as a positional argument.

```sh
harness list commit <repository_id>
harness list commit <repository_id> --format json
harness list commit <repository_id> --limit 20
```

### Get commit details

Retrieve the full metadata for a specific commit using the `<repo_id>/<sha>` format.

```sh
harness get commit <repository_id>/<commit_sha>
harness get commit <repository_id>/<commit_sha> --format json
```

---

## Tags

A tag marks a specific commit with a human-readable name, typically used to identify release versions. Unlike branches, tags do not move forward with new commits. Use tags to create stable release markers that you can reference in deployments and changelogs.

### List tags

View all tags in a repository to see the release history. Pass the repository as a positional argument.

```sh
harness list tag <repository_id>
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

## Next steps

- Go to [Continuous Delivery](/docs/platform/harness-cli/harness-cli-commands/cd-and-pipeline-commands) to manage pipelines and deployment resources.
- Go to [Platform](/docs/platform/harness-cli/harness-cli-commands/platform-commands) to manage account resources, connectors, and secrets.
