---
sidebar_position: 200
---

# FAQ

Frequently asked questions, common errors and solutions.

## Running Harness Open Source in Offline Environments

### How can I run Harness Open Source in an offline environment without internet access?

Running Harness Open Source in an offline environment is possible with the following approaches:

**Local Docker Cache**:

1. Pull the necessary Docker images (e.g., drone/git) on a machine with internet access.

2. Use docker save to export these images to a file.

3. Transfer the file to your offline environment and use docker load to import the images into the local Docker cache.

**Docker Mirroring**:

- Configure your Docker daemon to use a local registry mirror. When Harness attempts to pull an image, it will request it from the local Docker daemon, which will then pull from your offline registry if configured.

### What images are required to run Harness Open Source offline?

The only essential image required to run Harness pipelines is the `drone/git` image. Additional plugin images are available but are optional and not required for basic functionality.

### How can I avoid Harness from pulling the `:latest` tag of an image?

Harness will always attempt to pull the `:latest` tag if it is specified. To avoid this:

- Use a specific tagged version (e.g., `:1.0.0`) instead of `:latest`.

- Add `pull: if-not-exists` to the step in your pipeline YAML to ensure the image is only pulled if it doesn’t already exist locally.

### Can I override the default cloning task image used by Harness?

Yes, you can override the default cloning task image by ensuring the desired image is available in your local Docker cache or by using a Docker registry mirror. Harness will use the locally cached image if it exists.

### How can I handle SSL errors when using the default clone task?

If you encounter SSL errors, you can bypass them by setting `clone.insecure=true`. However, if you prefer not to disable SSL, you can configure your Docker environment to trust the necessary certificates.


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
2. Harness Open Source inherits authentication from the host, see Docker's [login](https://docs.docker.com/reference/cli/docker/login/) command documentation

## Pipeline step fails with /bin/sh: exec format error

__Full error:__

```
exec /bin/sh: exec format error
```

__Potential causes:__

The [container](/docs/open-source/reference/pipelines/yaml/container) defined in the [step](/docs/category/steps-1) is for a different OS and/or architecture.

__Solutions:__

Switch to a container supported by your machine (see Docker's [Multi-platform images](https://docs.docker.com/build/building/multi-platform/) documentation).
