---
title: git revert from a CI pipeline
description: Use a run step to revert git commit(s).
sidebar_position: 35
---

At times, you might want to undo changes introduced by a pull request (PR) in a Git repository. This can happen for various reasons, such as if the changes introduced by the PR are found to be problematic, introduce bugs, or if they are no longer needed. 

The following example shows how to use a run step to revert a git commit introduced by a PR:

```yaml
            - step:
                  type: Run
                  name: rollback
                  identifier: rollback
                  spec:
                    connectorRef: docker_connector
                    image: alpine/git
                    shell: Sh
                    command: |-
                      git config --global user.email "GIT_USER_EMAIL"
                      git config --global user.name "GIT_USER_NAME"
                      git config --global --add safe.directory /harness
                      git config --global credential.helper 'cache --timeout 600'
                      << eof tr -d ' ' | git credential-cache store 
                        protocol=https
                        host=github.com
                        username="GIT_USER_ID"
                        password=<+secrets.getValue("github_pat")>
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

This **Run** step, named `rollback`, runs when a previous step fails. It uses the `alpine/git` Docker image to configure Git, pull the latest changes from the `main` branch, revert the latest commit, and push the changes back to the `main` branch.

The above is an example showing GitHub but you can modify the code for your choice of SCM provider.