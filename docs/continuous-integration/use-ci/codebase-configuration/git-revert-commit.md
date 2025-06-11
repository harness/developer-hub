---
title: git revert from a CI pipeline
description: Use a run step to revert git commit(s).
sidebar_position: 35
---

You might need to revert a pull request in a Git repository if the changes cause problems, introduce bugs, or become unnecessary. Harness CI supports native git revert using the [drone-git-revert-commit plugin](https://github.com/harness-community/drone-git-revert-commit), which simplifies the process compared to running manual git commands in a **Run** step.

## Using the git-revert-commit plugin

Here is an example of a **Plugin** step that reverts a git commit based on the commit SHA in the pipeline context:

```yaml
- step:
    type: Plugin
    name: Git Revert Commit
    identifier: git_revert_commit
    spec:
      connectorRef: YOUR_IMAGE_REGISTRY_CONNECTOR
      image: plugins/git-revert-commit:linux-amd64
      settings:
        git_pat: <+secrets.getValue("YOUR_GIT_PAT_SECRET")>
        commit_sha: <+codebase.commitSha>
```

:::note
The plugin requires a Git Personal Access Token (PAT) with read/write permissions to the repository.
:::

For more configuration options, see the [plugin README](https://github.com/harness-community/drone-git-revert-commit/blob/main/README.md).

[This guide](../../development-guides/security/git_revert_from_pr) shows how to use a similar script to revert a commit from a PR based on security scan results.