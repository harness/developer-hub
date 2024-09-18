---
sidebar_position: 200
---

# FAQ

Frequently asked questions, common errors and solutions.

## Pipeline fails with /bin/sh: no such file or directory error

__Full error:__

```wordWrap=true
Error response from daemon: failed to create task for container: failed to create shim task: OCI runtime create failed: runc create failed: unable to start container process: exec: "/bin/sh": stat /bin/sh: no such file or directory: unknown
```

__Potential causes:__

The [container](/docs/open-source/reference/pipelines/yaml/container) defined in the [step](/docs/category/steps-1) does not contain `/bin/sh`.

__Solutions:__

Publish a new version of the container that has `/bin/sh`, or switch to a different container that already has `/bin/sh`.

## Pipeline fails with resource is denied error

__Full error:__

```
Error response from daemon: pull access denied for IMAGE_NAME, repository does not exist or may require 'docker login': denied: requested access to the resource is denied
```

__Potential causes:__

1. The [container](/docs/open-source/reference/pipelines/yaml/container) defined in the [step](/docs/category/steps-1) does not exist
2. The [container](/docs/open-source/reference/pipelines/yaml/container) defined in the [step](/docs/category/steps-1) is private, and requires authentication

__Solutions:__

1. Verify the container exists and can be pulled by running `docker pull IMAGE_NAME` locally
2. Gitness inherits authentication from the host, see Docker's [login](https://docs.docker.com/reference/cli/docker/login/) command documentation

## Pipeline step fails with /bin/sh: exec format error

__Full error:__

```
exec /bin/sh: exec format error
```

__Potential causes:__

The [container](/docs/open-source/reference/pipelines/yaml/container) defined in the [step](/docs/category/steps-1) is for a different OS and/or architecture.

__Solutions:__

Switch to a container supported by your machine (see Docker's [Multi-platform images](https://docs.docker.com/build/building/multi-platform/) documentation).
