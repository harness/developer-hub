---
sidebar_position: 3
---

# Shell variables

Index of environment variables that are automatically injected into the shell of pipeline steps.

:::note

Variables are prefixed with `DRONE_` for compatibility with Drone pipelines.

:::

## CI

Identifies the current environment as a Continuous Integration environment.

```
CI=true
```

## DRONE

Identifies the current environment as the Drone Continuous Integration environment.

```
DRONE=true
```

## DRONE_BRANCH

Provides the target branch for the push or pull request. This value may be empty for tag events.

```
DRONE_BRANCH=main
```

## DRONE_BUILD_ACTION

Provides the action that triggered the pipeline execution. Use this value to differentiate between the pull request being created, reopened, or when commits are pushed to the branch.

```none
DRONE_BUILD_ACTION=pullreq_created
DRONE_BUILD_ACTION=pullreq_branch_updated
DRONE_BUILD_ACTION=pullreq_reopened
```

## DRONE_BUILD_CREATED

Provides the unix timestamp for when the build object was created by the system.

```
DRONE_BUILD_CREATED=915148800
```

## DRONE_BUILD_EVENT

Provides the event that triggered the pipeline execution.

```
DRONE_BUILD_EVENT=push
DRONE_BUILD_EVENT=pull_request
DRONE_BUILD_EVENT=tag
```

## DRONE_BUILD_FINISHED

Provides the unix timestamp for when the build is finished. A running build cannot have a finish timestamp, therefore, the system always sets this value to the current timestamp.

```
DRONE_BUILD_FINISHED=915148800
```

## DRONE_BUILD_LINK

Provides a deep link the Drone build results.

```
DRONE_BUILD_LINK=https://gitness.company.com/example/hello-world/42
```

## DRONE_BUILD_NUMBER

Provides the build number for the current running build.

```
DRONE_BUILD_NUMBER=42
```

## DRONE_BUILD_PARENT

Provides the parent build number for the current running build. The parent build number is populated from an exiting build that is being promoted.

```
DRONE_BUILD_PARENT=42
```

## DRONE_BUILD_STARTED

Provides the unix timestamp for when the build was started by the system.

```
DRONE_BUILD_STARTED=915148800
```

## DRONE_BUILD_STATUS

Provides the status for the current running build. If build pipelines and build steps are passing, the build status defaults to success.

```
DRONE_BUILD_STATUS=success
DRONE_BUILD_STATUS=failure
```

_Please note this is point in time snapshot. This value may not accurately reflect the overall build status when multiple pipelines are running in parallel_.

## DRONE_BUILD_TRIGGER

The source of the trigger for the build. eg a user, or webhook (@hook).

```
DRONE_BUILD_TRIGGER=root
DRONE_BUILD_TRIGGER=f.bar
DRONE_BUILD_TRIGGER=@hook
DRONE_BUILD_TRIGGER=tphoney
```

## DRONE_COMMIT

Provides the git commit sha for the current running build.

```
DRONE_COMMIT=bcdd4bf0245c82c060407b3b24b9b87301d15ac1
```

## DRONE_COMMIT_AFTER

Provides the git commit sha after the patch is applied.

```
DRONE_COMMIT_AFTER=bcdd4bf0245c82c060407b3b24b9b87301d15ac1
```

## DRONE_COMMIT_AUTHOR

Provides the commit author username for the current running build. This is the username from source control management system (e.g. GitHub username).

```
DRONE_COMMIT_AUTHOR=janedoe
```

## DRONE_COMMIT_AUTHOR_AVATAR

Provides the commit author avatar for the current running build. This is the avatar from source control management system (e.g. GitHub).

```
DRONE_COMMIT_AUTHOR_AVATAR=https://githubusercontent.com/u/...
```

## DRONE_COMMIT_AUTHOR_EMAIL

Provides the commit email address for the current running build. _Note this is a user-defined value and may be empty or inaccurate._

```
DRONE_COMMIT_AUTHOR_EMAIL=janedoe@example.com
```

## DRONE_COMMIT_AUTHOR_NAME

Provides the commit author name for the current running build. _Note this is a user-defined value and may be empty or inaccurate._

```
DRONE_COMMIT_AUTHOR_NAME=Jane Doe
```

## DRONE_COMMIT_BEFORE

Provides the git commit sha before the patch is applied.

```
DRONE_COMMIT_BEFORE=bcdd4bf0245c82c060407b3b24b9b87301d15ac1
```

## DRONE_COMMIT_BRANCH

Provides the target branch for the push or pull request. This value may be empty for tag events.

```
DRONE_COMMIT_BRANCH=main
```

## DRONE_COMMIT_LINK

Provides a link the git commit or object in the source control management system.

```
DRONE_COMMIT_LINK=https://gitness.company.com/example/hello-world/pull/42
```

## DRONE_COMMIT_MESSAGE

Provides the commit message for the current running build.

```
DRONE_COMMIT_MESSAGE=Updated README.md
```

## DRONE_COMMIT_REF

Provides the git reference for the current running build.

```
DRONE_COMMIT_REF=refs/heads/main
```

```
DRONE_COMMIT_REF=refs/tags/v1.0.0
```

```
DRONE_COMMIT_REF=refs/pull/42/head
```

## DRONE_COMMIT_SHA

Provides the git commit sha for the current running build.

```
DRONE_COMMIT_SHA=bcdd4bf0245c82c060407b3b24b9b87301d15ac1
```

## DRONE_FAILED_STAGES

Provides a comma-separate list of failed pipeline stages for the current running build.

```
DRONE_FAILED_STAGES=build,test
```

_Please note this is point in time snapshot. This value may not accurately reflect the latest results when multiple pipelines are running in parallel_.

## DRONE_FAILED_STEPS

Provides a comma-separate list of failed pipeline steps.

```
DRONE_FAILED_STEPS=backend,frontend
```

## DRONE_GIT_HTTP_URL

Provides the `git+http` url that should be used to clone the repository. 

```
DRONE_GIT_HTTP_URL=https://gitness.company.com/example/hello-world.git
```

## DRONE_GIT_SSH_URL

Provides the `git+ssh` url that should be used to clone the repository. 

```
DRONE_GIT_SSH_URL=ssh://git@gitness.company.com:example/hello-world.git
```

## DRONE_PULL_REQUEST

Provides the pull request number for the current running build. If the build is not a pull request the variable is empty.

```
DRONE_PULL_REQUEST=42
```

## DRONE_PULL_REQUEST_TITLE

Provides the pull request title for the current running build.

:::note

If the build is not a pull request the variable is empty.

:::

```
DRONE_PULL_REQUEST_TITLE="ci: upgrade linters"
```

## DRONE_REMOTE_URL

Provides the `git+https` url that should be used to clone the repository. _This is a legacy value included for backward compatibility only._

```
DRONE_REMOTE_URL=https://gitness.company.com/example/hello-world.git
```

## DRONE_REPO

Provides the full repository name for the current running build.

```
DRONE_REPO=example/hello-world
```

## DRONE_REPO_BRANCH

Provides the default repository branch for the current running build.

```
DRONE_REPO_BRANCH=main
```

## DRONE_REPO_LINK

Provides the repository link for the current running build.

```
DRONE_REPO_LINK=https://gitness.company.com/example/hello-world
```

## DRONE_REPO_NAME

Provides the repository name for the current running build.

```
DRONE_REPO_NAME=hello-world
DRONE_REPO=example/hello-world
```

## DRONE_REPO_NAMESPACE

Provides the repository namespace for the current running build. The namespace is an alias for the source control management account that owns the repository.

```
DRONE_REPO_NAMESPACE=example
DRONE_REPO=example/hello-world
```

## DRONE_REPO_OWNER

Provides the repository namespace for the current running build. The namespace is an alias for the source control management account that owns the repository.

```
DRONE_REPO_OWNER=example
DRONE_REPO=example/hello-world
```

## DRONE_REPO_PRIVATE

Provides a boolean flag that indicates whether or not the repository is private or public.

```
DRONE_REPO_PRIVATE=false
```

## DRONE_REPO_SCM

Provides the repository type for the current running build.

```
DRONE_REPO_SCM=git
```

List of all possible values:

```
DRONE_REPO_SCM=git
DRONE_REPO_SCM=hg
```

## DRONE_REPO_VISIBILITY

Provides the repository visibility level for the current running build.

```
DRONE_REPO_VISIBILITY=public
```

List of all possible values:

```
DRONE_REPO_VISIBILITY=public
DRONE_REPO_VISIBILITY=private
DRONE_REPO_VISIBILITY=internal
```

## DRONE_SEMVER

If the git tag is a valid [semantic version](https://semver.org/) string, the system provides the tag as a semver string.

```
DRONE_SEMVER=1.2.3-alpha.1
```

The semver string is also available in the following formats:

```
DRONE_SEMVER_SHORT=1.2.3
DRONE_SEMVER_PATCH=3
DRONE_SEMVER_MINOR=2
DRONE_SEMVER_MAJOR=1
DRONE_SEMVER_PRERELEASE=alpha.1
```

## DRONE_SEMVER_BUILD

If the git tag is a valid semver string, this variable provides the build from the semver string.

```
DRONE_SEMVER_BUILD=001
DRONE_SEMVER=1.2.3+001
```

## DRONE_SEMVER_ERROR

If the git tag is _not_ a valid semver string, this variable provides the semver parsing error.

```
DRONE_SEMVER_ERROR=strconv.ParseInt: parsing "4.5": invalid syntax
```

## DRONE_SEMVER_MAJOR

If the git tag is a valid semver string, this variable provides the major version number from the semver string.

```
DRONE_SEMVER_MAJOR=1
DRONE_SEMVER=1.2.3
```

## DRONE_SEMVER_MINOR

If the git tag is a valid semver string, this variable provides the minor version number from the semver string.

```
DRONE_SEMVER_MINOR=2
DRONE_SEMVER=1.2.3
```

## DRONE_SEMVER_PATCH

If the git tag is a valid semver string, this variable provides the patch from the semver string.

```
DRONE_SEMVER_PATCH=3
DRONE_SEMVER=1.2.3
```

## DRONE_SEMVER_PRERELEASE

If the git tag is a valid semver string, this variable provides the prelease from the semver string.

```
DRONE_SEMVER_PRERELEASE=alpha.1
DRONE_SEMVER=1.2.3-alpha.1
```

## DRONE_SEMVER_SHORT

If the git tag is a valid semver string, this variable provides the short version of the semver string where labels and metadata are truncated.

```
DRONE_SEMVER_SHORT=1.2.3
```

## DRONE_SOURCE_BRANCH

Provides the source branch for the pull request. This value may be empty for certain source control management providers.

```
DRONE_SOURCE_BRANCH=feature/develop
```

This environment variable can be used in conjunction with the target branch variable to get the pull request base and head branch.

```
DRONE_SOURCE_BRANCH=feature/develop
DRONE_TARGET_BRANCH=main
```

## DRONE_STAGE_ARCH

Provides the platform architecture for the current build stage.

```
DRONE_STAGE_ARCH=amd64
```

List of all possible values:

```
DRONE_STAGE_ARCH=386
DRONE_STAGE_ARCH=amd64
DRONE_STAGE_ARCH=arm64
DRONE_STAGE_ARCH=arm
```

## DRONE_STAGE_DEPENDS_ON

Provides a comma-separated list of dependencies for the current pipeline stage.

```
DRONE_STAGE_DEPENDS_ON=backend,frontend
```

## DRONE_STAGE_FINISHED

Provides the unix timestamp for when the pipeline is finished. A running pipeline cannot have a finish timestamp, therefore, the system always sets this value to the current timestamp.

```
DRONE_STAGE_FINISHED=915148800
```

## DRONE_STAGE_KIND

Provides the kind of resource being executed. This value is sourced from the `kind` attribute in the yaml configuration file.

```
DRONE_STAGE_KIND=pipeline
```

## DRONE_STAGE_MACHINE

Provides the name of the host machine on which the pipeline is currently running.

```
DRONE_STAGE_MACHINE=ec2-203-0-113-25.compute-1.amazonaws.com
```

## DRONE_STAGE_NAME

Provides the stage name for the current running pipeline stage.

```
DRONE_STAGE_NAME=build
```

## DRONE_STAGE_NUMBER

Provides the stage number for the current running pipeline stage.

```
DRONE_STAGE_NUMBER=1
```

## DRONE_STAGE_OS

Provides the target operating system for the current build stage.

```
DRONE_STAGE_OS=linux
```

List of all possible values:

```
DRONE_STAGE_OS=darwin
DRONE_STAGE_OS=dragonfly
DRONE_STAGE_OS=freebsd
DRONE_STAGE_OS=linux
DRONE_STAGE_OS=netbsd
DRONE_STAGE_OS=openbsd
DRONE_STAGE_OS=solaris
DRONE_STAGE_OS=windows
```

## DRONE_STAGE_STARTED

Provides the unix timestamp for when the pipeline was started by the runner.

```
DRONE_STAGE_STARTED=915148800
```

## DRONE_STAGE_STATUS

Provides the status for the current running pipeline. If all pipeline steps are passing, the pipeline status defaults to success.

```
DRONE_STAGE_STATUS=success
DRONE_STAGE_STATUS=failure
```

## DRONE_STAGE_TYPE

Provides the type of resource being executed. This value is sourced from the `type` attribute in the yaml configuration file.

```
DRONE_STAGE_TYPE=docker
```

## DRONE_STAGE_VARIANT

Provides the target operating architecture variable for the current build stage. This variable is optional and is only available for arm architectures.

```
DRONE_STAGE_VARIANT=v7
```

## DRONE_STEP_NAME

Provides the step name for the current running pipeline step.

```
DRONE_STEP_NAME=build
```

## DRONE_STEP_NUMBER

Provides the step number for the current running pipeline step.

```
DRONE_STEP_NUMBER=1
```

## DRONE_SYSTEM_HOST

Provides the hostname used by the Drone server. This can be combined with the protocol to construct to the server url.

```
DRONE_SYSTEM_HOST=gitness.company.com
```

## DRONE_SYSTEM_HOSTNAME

Provides the hostname used by the Drone server. This can be combined with the protocol to construct to the server url.

```
DRONE_SYSTEM_HOSTNAME=gitness.company.com
```

## DRONE_SYSTEM_PROTO

Provides the protocol used by the Drone server. This can be combined with the hostname to construct to the server url.

```
DRONE_SYSTEM_PROTO=https
```

## DRONE_SYSTEM_VERSION

Provides the version of the Drone server.

```
DRONE_SYSTEM_VERSION=1.2.3
```

## DRONE_TAG

Provides the tag for the current running build. This value is only populated for tag events and promotion events that are derived from tags.

```
DRONE_TAG=v1.0.0
```

## DRONE_TARGET_BRANCH

Provides the target branch for the push or pull request. This value may be empty for tag events.

```
DRONE_TARGET_BRANCH=main
```

This environment variable can be used in conjunction with the source branch variable to get the pull request base and head branch.

```
DRONE_SOURCE_BRANCH=feature/develop
DRONE_TARGET_BRANCH=main
```

## DRONE_WORKSPACE

The working directory for a stage is known as the `DRONE_WORKSPACE`. The repository is cloned to this directory. It is the working directory for each step in your pipeline stage, and it is shared / persisted throughout the lifecycle of the stage.

```
DRONE_WORKSPACE=/gitness
```

