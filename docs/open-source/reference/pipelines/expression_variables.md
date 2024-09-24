---
sidebar_position: 3
---

# Expression variables

Index of variables that can be referenced in pipelines with the expression syntax `${{ variable.name }}`.

## build.action

Provides the action that triggered the pipeline execution. Use this value to differentiate between the pull request being created, reopened, when a branch is created, etc.

| __Action__ | __Value__ |
|------------|-----------|
| Manual Run | |
| Branch Created | `branch_created` |
| Branch Updated | `branch_updated` |
| Pull Request Created | `pullreq_created` |
| Pull Request Updated | `pullreq_branch_updated` |
| Pull Request Reopened | `pullreq_reopened` |
| Pull Request Closed | `pullreq_closed` |
| Tag Created | `tag_created` |
| Tag Updated | `tag_updated` |

## build.after

Provides the git commit sha after the patch is applied.

| __Action__ | __Example value__ |
|------------|-----------|
| All | `bcdd4bf0245c82c060407b3b24b9b87301d15ac1` |

<!-- ## build.author_avatar -->

## build.author_email

Provides the commit email address for the current running build. _Note this is a user-defined value and may be empty or inaccurate._

| __Action__ | __Example value__ |
|------------|-----------|
| All | `janedoe@example.com` |

## build.author_login

Provides the commit author username for the current running build.

| __Action__ | __Example value__ |
|------------|-----------|
| All | `janedoe` |

## build.author_name

Provides the commit author name for the current running build. _Note this is a user-defined value and may be empty or inaccurate._

| __Action__ | __Example value__ |
|------------|-----------|
| All | `Jane Doe` |

## build.before

Provides the git commit sha before the patch is applied.

| __Action__ | __Example value__ |
|------------|-----------|
| All | `bcdd4bf0245c82c060407b3b24b9b87301d15ac1` |

## build.branch

Provides the target branch for the push or pull request.

| __Action__ | __Example values__ |
|------------|-----------|
| All | `main`, `feature/develop` |

## build.commit

Provides the git commit sha for the current running build.

| __Action__ | __Example value__ |
|------------|-----------|
| All | `bcdd4bf0245c82c060407b3b24b9b87301d15ac1` |

<!-- ## build.cron -->

<!-- ## build.debug -->

<!-- ## build.environment -->

## build.event

Provides the event that triggered the pipeline execution.

| __Action__ | __Value__ |
|------------|-----------|
| Manual Run | `manual` |
| Branch Created, Updated | `push` |
| Pull Request Created, Updated, Reopened | `pull_request` |
| Tag Created, Updated | `tag` |

## build.link

Provides a deep link the build results.

| __Action__ | __Example value__ |
|------------|-----------|
| All | `https://gitness.company.com/example/hello-world/42` |

## build.message

Provides the commit message or pull request title for the current running build.

| __Action__ | __Value__ |
|------------|-----------|
| Manual Run | Commit message |
| Branch Created, Updated | Commit message |
| Pull Request Created, Updated, Reopened | Pull request title |
| Tag Created, Updated | Commit message |

## build.number

Provides the build number for the current running build.

| __Action__ | __Example value__ |
|------------|-----------|
| All | `42` |

<!-- ## build.params -->

## build.ref

Provides the git reference for the current running build.

| __Action__ | __Example values__ |
|------------|--------------------|
| Manual Run | `refs/heads/main`, `refs/heads/feature/develop` |
| Branch Created, Updated | `refs/heads/main`, `refs/heads/feature/develop` |
| Pull Request Created, Updated, Reopened | `refs/heads/feature/develop` |
| Tag Created, Updated | `refs/tags/v1.2.3` |

## build.sender

Provides the username for who initiated a manual build.

| __Action__ | __Example values__ |
|------------|--------------------|
| Manual Run | `janedoe` |
| Branch Created, Updated | |
| Pull Request Created, Updated, Reopened | |
| Tag Created, Updated | |

## build.source

Provides the source branch.

| __Action__ | __Example values__ |
|------------|--------------------|
| Manual Run | `main`, `feature/develop` |
| Branch Created, Updated | `main`, `feature/develop` |
| Pull Request Created, Updated, Reopened | `main`, `feature/develop` |
| Tag Created, Updated | `refs/tags/v1.2.3` |

<!-- ## build.source_repo -->

## build.target

Provides the target branch.

| __Action__ | __Example values__ |
|------------|--------------------|
| Manual Run | `main` |
| Branch Created, Updated | `main`, `feature/develop` |
| Pull Request Created, Updated, Reopened | `main` |
| Tag Created, Updated | `refs/tags/v1.2.3` |

## build.title

Provides the commit message or pull request title for the current running build.

| __Action__ | __Value__ |
|------------|--------------------|
| Manual Run | Commit message |
| Branch Created, Updated | Commit message |
| Pull Request Created, Updated, Reopened | Pull request title |
| Tag Created, Updated | Commit message |

<!-- ## repo.active -->

<!-- ## repo.branch -->

<!-- ## repo.config -->

<!-- ## repo.git_http_url

<!-- ## repo.git_ssh_url -->

<!-- ## repo.ignore_forks -->

<!-- ## repo.ignore_pull_requests -->

<!-- ## repo.link -->

<!-- ## repo.name -->

<!-- ## repo.namespace -->

<!-- ## repo.private -->

<!-- ## repo.protected -->

<!-- ## repo.slug -->

<!-- ## repo.trusted -->

<!-- ## repo.uid -->

<!-- ## repo.visibility -->
