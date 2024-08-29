---
title: git revert from a CI pipeline
description: Use a run step to revert git commit(s).
sidebar_position: 35
---

You might need to revert a pull request in a Git repository if the changes cause problems, introduce bugs, or become unnecessary. The following example shows how to use a **Run** step to revert a git commit:

```yaml
            - step:
                  type: Run
                  name: rollback
                  identifier: rollback
                  spec:
                    connectorRef: YOUR_DOCKER_CONNECTOR_ID
                    image: alpine/git
                    shell: Sh
                    command: |-
                      git config --global user.email "GIT_USER_EMAIL"
                      git config --global user.name "GIT_USER_NAME"
                      git config --global --add safe.directory /harness
                      git config --global credential.helper 'cache --timeout 600'
                      << eof tr -d ' ' | git credential-cache store 
                        protocol=https
                        host=GIT_HOST_URL
                        username="GIT_USER_ID"
                        password=<+secrets.getValue("YOUR_HARNESS_GIT_PAT_SECRET")>
                      eof
                      git pull origin main
                      echo "Last Commit"
                      git rev-parse HEAD
                      git revert -m 1 <+codebase.commitSha>
                      echo "Restored Commit"
                      git rev-parse HEAD
                      git push --set-upstream origin main
                  when:
                    stageStatus: Failure
```

:::note
- The Git PAT should have read/write permissions to the repository and webhook creation.
- For `host`, you can use **github.com** for GitHub, **git.harness.io** for Harness Code Repository, **gitlab.com** for GitLab, etc.
- The above example shows a single Git commit revert. If you want to revert multiple commits, you need to modify the script.
:::

This **Run** step, named `rollback`, runs when a previous step fails. It uses the `alpine/git` Docker image to configure Git, pull the latest changes from the `main` branch, revert the latest commit, and push the changes back to the `main` branch.

[This guide](../../development-guides/security/git_revert_from_pr) shows how to use a similar script to revert a commit from a PR based on security scan results.