---
title: Build and push with Docker Buildx Bake
description: Use Docker Buildx Bake for advanced multi-platform and multi-registry builds
sidebar_position: 14
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

[Docker Buildx Bake](https://docs.docker.com/build/bake/) is an advanced build orchestration feature that allows you to define and manage complex build configurations using HCL, JSON, or Docker Compose files. Unlike traditional single-target builds, Bake enables you to build multiple targets simultaneously, push to multiple registries, and manage sophisticated build matrices with declarative configuration.

In Harness CI, you can use Docker Buildx Bake through the **Plugin** step with the `drone-buildx` plugin to orchestrate complex container builds, such as:

- Multi-architecture builds (AMD64, ARM64, etc.)
- Multi-registry pushes in a single step
- Build matrices (multiple versions, variants)
- Advanced caching strategies
- OIDC-based authentication

:::info Advanced Feature

Docker Buildx Bake is designed for advanced use cases where you need to push to multiple registries or orchestrate complex multi-target builds. For simpler scenarios with a single registry, use the standard [Build and Push steps](/docs/continuous-integration/use-ci/build-and-upload-artifacts/build-and-upload-an-artifact).

:::

## When to use Buildx Bake

Use Docker Buildx Bake when you need:

- **Multi-registry pushes**: Push the same image to multiple registries (Docker Hub, ECR, GCR, GitHub Container Registry) in a single build step
- **Multi-architecture builds**: Build and push images for multiple platforms (linux/amd64, linux/arm64) in parallel
- **Build matrices**: Build multiple versions or variants of an image (e.g., different Python versions, different base images)
- **Complex build orchestration**: Coordinate multiple related builds with dependencies
- **Declarative configuration**: Define all build targets, platforms, tags, and outputs in a single bake file

:::note Plugin Step Only

Buildx Bake is only available through the **Plugin** step, not the out-of-the-box (OOTB) Build and Push steps. OOTB steps support only a single connector, while Bake mode requires passing authentication credentials via the plugin's configuration.

:::

## Prerequisites

You need:

- A [Harness CI pipeline](../../prep-ci-pipeline-components.md) with a [Build stage](../../set-up-build-infrastructure/ci-stage-settings.md)
- A Dockerfile and codebase to build from
- A Buildx Bake definition file (HCL, JSON, or Docker Compose format)
- Docker registry credentials (as Harness secrets or via OIDC)
- For OIDC: Configured OIDC trust relationship with your cloud provider

## Bake file basics

A Buildx Bake file defines your build targets, platforms, tags, cache configuration, and outputs. Here's a basic example:

```hcl title="docker-bake.hcl"
variable "TAG" {
  default = "latest"
}

variable "REGISTRY" {
  default = "docker.io/myorg"
}

group "default" {
  targets = ["app"]
}

target "app" {
  context    = "."
  dockerfile = "Dockerfile"
  platforms  = ["linux/amd64", "linux/arm64"]
  tags = [
    "${REGISTRY}/myapp:${TAG}",
    "${REGISTRY}/myapp:latest"
  ]
  cache-from = ["type=registry,ref=${REGISTRY}/myapp:cache"]
  cache-to   = ["type=registry,ref=${REGISTRY}/myapp:cache,mode=max"]
}
```

## Use Buildx Bake in a Plugin step

To use Buildx Bake in Harness CI, add a **Plugin** step in your Build stage and configure it to use the `drone-buildx` plugin.

### Basic example

Here's a minimal example that builds and pushes to Docker Hub using Bake:

<Tabs>
<TabItem value="Visual" label="Visual">

1. In your Build stage, add a **Plugin** step
2. Configure the following settings:
   - **Name**: `Build and Push with Bake`
   - **Container Registry**: Your Docker connector
   - **Image**: `plugins/buildx`
   - **Settings**:
     ```yaml
     bake_file: docker-bake.hcl
     username: <+secrets.getValue("dockerhub_username")>
     password: <+secrets.getValue("dockerhub_password")>
     ```

</TabItem>
<TabItem value="YAML" label="YAML">

```yaml
- step:
    type: Plugin
    name: Build and Push with Bake
    identifier: build_push_bake
    spec:
      connectorRef: account.harnessImage
      image: plugins/buildx
      settings:
        bake_file: docker-bake.hcl
        username: <+secrets.getValue("dockerhub_username")>
        password: <+secrets.getValue("dockerhub_password")>
```

</TabItem>
</Tabs>

:::note Single Registry Limitation

The `username` and `password` settings only work for a single registry. For multi-registry pushes, you must use the `config` setting with a Docker config JSON containing credentials for all registries. See the [complete example](#complete-example-multi-registry-with-oidc-and-matrix-builds) below.

:::

## Complete example: Multi-registry with OIDC and matrix builds

This comprehensive example demonstrates building multi-architecture images for multiple Python versions and pushing to both AWS ECR and GitHub Container Registry using OIDC authentication.

### Pipeline overview

The pipeline consists of three stages:

1. **Setup Docker Config**: Authenticate with AWS using OIDC and create a Docker config JSON with credentials for multiple registries
2. **Parallel Build Stages**: Build for AMD64 and ARM64 architectures in parallel, with a matrix of Python versions (3.9-3.12)
3. **Manifest Stage**: Create multi-architecture manifests combining AMD64 and ARM64 images

### Bake files

**Main bake file**:

```hcl title="docker-bake.hcl"
variable "PYTHON_VERSION" {
  default = "3.12"
}

variable "TAG" {
  default = "latest"
}

variable "ARCH" {
  default = "amd64"
}

variable "ECR_SLUG" {
  default = "123456789012.dkr.ecr.us-east-1.amazonaws.com/myapp"
}

variable "GHCR_SLUG" {
  default = "ghcr.io/myorg/myapp"
}

target "image" {
  context    = "."
  dockerfile = "Dockerfile"
  platforms  = ["linux/${ARCH}"]
  args = {
    PYTHON_VERSION = PYTHON_VERSION
  }
  tags = [
    # ECR tags
    "${ECR_SLUG}:${PYTHON_VERSION}-${TAG}-${ARCH}",
    "${ECR_SLUG}:${PYTHON_VERSION}-${ARCH}",
    # GHCR tags
    "${GHCR_SLUG}:${PYTHON_VERSION}-${TAG}-${ARCH}",
    "${GHCR_SLUG}:${PYTHON_VERSION}-${ARCH}"
  ]
  cache-from = ["type=registry,ref=${ECR_SLUG}:cache-${PYTHON_VERSION}-${ARCH}"]
  cache-to   = ["type=registry,ref=${ECR_SLUG}:cache-${PYTHON_VERSION}-${ARCH},mode=max"]
}
```

**Version-specific override files**:

```hcl title="3.9.hcl"
PYTHON_VERSION = "3.9"
```

```hcl title="3.10.hcl"
PYTHON_VERSION = "3.10"
```

```hcl title="3.11.hcl"
PYTHON_VERSION = "3.11"
```

```hcl title="3.12.hcl"
PYTHON_VERSION = "3.12"
```

### Complete pipeline YAML

```yaml
pipeline:
  name: Multi-Arch Multi-Registry Build
  identifier: multi_arch_build
  projectIdentifier: my_project
  orgIdentifier: default
  stages:
    # Stage 1: Setup authentication
    - stage:
        name: Setup Docker Config
        identifier: Setup
        type: CI
        spec:
          cloneCodebase: false
          platform:
            os: Linux
            arch: Amd64
          runtime:
            type: Cloud
            spec: {}
          execution:
            steps:
              # Get AWS credentials via OIDC
              - step:
                  type: Plugin
                  name: AWS OIDC
                  identifier: AWS_OIDC
                  spec:
                    connectorRef: account.harnessImage
                    image: plugins/aws-oidc:latest
                    settings:
                      iamRoleArn: arn:aws:iam::123456789012:role/harness-ci-role
                      role_session_name: harness-buildx
                      duration: "3600"

              # Get ECR login token
              - step:
                  type: Run
                  name: Get ECR Token
                  identifier: Get_ECR_Token
                  spec:
                    connectorRef: account.harnessImage
                    image: amazon/aws-cli
                    shell: Sh
                    command: |
                      export AWS_ACCESS_KEY_ID=<+execution.steps.AWS_OIDC.output.outputVariables.AWS_ACCESS_KEY_ID>
                      export AWS_SECRET_ACCESS_KEY=<+execution.steps.AWS_OIDC.output.outputVariables.AWS_SECRET_ACCESS_KEY>
                      export AWS_SESSION_TOKEN=<+execution.steps.AWS_OIDC.output.outputVariables.AWS_SESSION_TOKEN>
                      export AWS_REGION=us-east-1
                      export ECR_TOKEN=$(aws ecr get-login-password --region us-east-1)
                    outputVariables:
                      - name: ECR_TOKEN
                        type: Secret
                        value: ECR_TOKEN

              # Create Docker config JSON with multi-registry auth
              - step:
                  type: Run
                  name: Create Docker Config
                  identifier: Create_Docker_Config
                  spec:
                    shell: Sh
                    command: |
                      # Calculate base64-encoded auth for each registry
                      ECR_AUTH=$(echo -n "AWS:<+execution.steps.Get_ECR_Token.output.outputVariables.ECR_TOKEN>" | base64 -w 0)
                      GHCR_AUTH=$(echo -n "<+secrets.getValue("github_username")>:<+secrets.getValue("github_token")>" | base64 -w 0)

                      # Create Docker config JSON
                      echo "{\"auths\":{\"ghcr.io\":{\"auth\":\"$GHCR_AUTH\"},\"123456789012.dkr.ecr.us-east-1.amazonaws.com\":{\"auth\":\"$ECR_AUTH\"}}}" > docker-config.json

                      # Export as single-line JSON (required for passing as variable)
                      export DOCKER_CONFIG_JSON="$(tr -d '\n' < docker-config.json)"

                      echo "$DOCKER_CONFIG_JSON"
                    outputVariables:
                      - name: DOCKER_CONFIG_JSON
                        type: Secret
                        value: DOCKER_CONFIG_JSON

    # Stage 2: Parallel builds for AMD64 and ARM64
    - parallel:
        # AMD64 builds
        - stage:
            name: Build AMD64
            identifier: Build_AMD64
            type: CI
            spec:
              cloneCodebase: true
              platform:
                os: Linux
                arch: Amd64
              runtime:
                type: Cloud
                spec: {}
              execution:
                steps:
                  - step:
                      type: Plugin
                      name: Build Python <+matrix.version>
                      identifier: build_python
                      spec:
                        connectorRef: account.harnessImage
                        image: plugins/buildx
                        settings:
                          bake_file: docker-bake.hcl
                          builder_driver: docker-container
                          bake_options: "-f;<+matrix.version>.hcl;image"
                          config: <+pipeline.stages.Setup.spec.execution.steps.Create_Docker_Config.output.outputVariables.DOCKER_CONFIG_JSON>
                      strategy:
                        matrix:
                          version:
                            - "3.9"
                            - "3.10"
                            - "3.11"
                            - "3.12"
                      envVariables:
                        ECR_SLUG: "123456789012.dkr.ecr.us-east-1.amazonaws.com/myapp"
                        GHCR_SLUG: "ghcr.io/myorg/myapp"
                        TAG: "0.0.1"
                        ARCH: "amd64"

        # ARM64 builds
        - stage:
            name: Build ARM64
            identifier: Build_ARM64
            type: CI
            spec:
              cloneCodebase: true
              platform:
                os: Linux
                arch: Arm64
              runtime:
                type: Cloud
                spec: {}
              execution:
                steps:
                  - step:
                      type: Plugin
                      name: Build Python <+matrix.version>
                      identifier: build_python
                      spec:
                        connectorRef: account.harnessImage
                        image: plugins/buildx
                        settings:
                          bake_file: docker-bake.hcl
                          builder_driver: docker-container
                          bake_options: "-f;<+matrix.version>.hcl;image"
                          config: <+pipeline.stages.Setup.spec.execution.steps.Create_Docker_Config.output.outputVariables.DOCKER_CONFIG_JSON>
                      strategy:
                        matrix:
                          version:
                            - "3.9"
                            - "3.10"
                            - "3.11"
                            - "3.12"
                      envVariables:
                        ECR_SLUG: "123456789012.dkr.ecr.us-east-1.amazonaws.com/myapp"
                        GHCR_SLUG: "ghcr.io/myorg/myapp"
                        TAG: "0.0.1"
                        ARCH: "arm64"

    # Stage 3: Create multi-arch manifests
    - stage:
        name: Create Manifests
        identifier: Create_Manifests
        type: CI
        spec:
          cloneCodebase: false
          platform:
            os: Linux
            arch: Amd64
          runtime:
            type: Cloud
            spec: {}
          execution:
            steps:
              - step:
                  type: Run
                  name: Create Multi-Arch Manifest
                  identifier: create_manifest
                  spec:
                    connectorRef: account.harnessImage
                    image: docker:cli
                    shell: Sh
                    command: |
                      set -Eeuo pipefail

                      # Write Docker config for authentication
                      mkdir -p $HOME/.docker
                      printf '%s' '<+pipeline.stages.Setup.spec.execution.steps.Create_Docker_Config.output.outputVariables.DOCKER_CONFIG_JSON>' > $HOME/.docker/config.json

                      VERSION="<+matrix.version>"
                      echo "Creating multi-arch manifests for Python ${VERSION}..."

                      # Install buildx if not available (required for imagetools command)
                      if ! docker buildx version >/dev/null 2>&1; then
                        echo "Installing buildx plugin..."
                        mkdir -p ~/.docker/cli-plugins
                        ARCH=$(uname -m)
                        [ "$ARCH" = "x86_64" ] && B_ARCH=amd64 || B_ARCH=arm64
                        wget -qO ~/.docker/cli-plugins/docker-buildx \
                          "https://github.com/docker/buildx/releases/download/v0.12.0/buildx-v0.12.0.linux-${B_ARCH}"
                        chmod +x ~/.docker/cli-plugins/docker-buildx
                      fi

                      # Create or use builder
                      docker buildx create --name harness-merge --use 2>/dev/null || docker buildx use harness-merge

                      # Create manifests for both registries
                      for REG in "$ECR_SLUG" "$GHCR_SLUG"; do
                        echo "Creating ${REG}:${VERSION}-${TAG} ..."
                        docker buildx imagetools create \
                          -t "${REG}:${VERSION}-${TAG}" \
                          "${REG}:${VERSION}-${TAG}-amd64" \
                          "${REG}:${VERSION}-${TAG}-arm64"

                        echo "Creating ${REG}:${VERSION} ..."
                        docker buildx imagetools create \
                          -t "${REG}:${VERSION}" \
                          "${REG}:${VERSION}-amd64" \
                          "${REG}:${VERSION}-arm64"

                        echo "Verifying ${REG}:${VERSION}-${TAG} ..."
                        docker buildx imagetools inspect "${REG}:${VERSION}-${TAG}"
                      done
                    envVariables:
                      ECR_SLUG: "123456789012.dkr.ecr.us-east-1.amazonaws.com/myapp"
                      GHCR_SLUG: "ghcr.io/myorg/myapp"
                      TAG: "0.0.1"
                  strategy:
                    matrix:
                      version:
                        - "3.9"
                        - "3.10"
                        - "3.11"
                        - "3.12"
  properties:
    ci:
      codebase:
        connectorRef: my_github_connector
        repoName: my-app
        build: <+input>
```

:::tip Platform Selection

The build architecture is determined by the stage's **platform configuration**. Set `platform.arch` to `Amd64` or `Arm64` to control which architecture the build runs on. The `plugins/buildx` image is multi-arch and will automatically run the correct variant for your selected platform.

:::

### Key components explained

#### 1. Docker Config JSON format

The Docker config uses base64-encoded authentication:

```bash
# Format: base64(username:password) or base64(username:token)
ECR_AUTH=$(echo -n "AWS:${ECR_TOKEN}" | base64 -w 0)
GHCR_AUTH=$(echo -n "${GITHUB_USERNAME}:${GITHUB_TOKEN}" | base64 -w 0)

# Final JSON structure
{
  "auths": {
    "ghcr.io": {
      "auth": "base64_encoded_credentials"
    },
    "123456789012.dkr.ecr.us-east-1.amazonaws.com": {
      "auth": "base64_encoded_credentials"
    }
  }
}
```

The `tr -d '\n'` command removes newlines to create a single-line JSON string, which is required when passing the config as a pipeline variable.

#### 2. Bake options syntax

The `bake_options` setting uses semicolon-delimited arguments:

```yaml
bake_options: "-f;<+matrix.version>.hcl;image"
```

This expands to:
- `-f` flag followed by the version-specific file (e.g., `3.9.hcl`)
- `image` as the target name to build

Multiple bake files are merged, with later files overriding earlier ones.

#### 3. Environment variables in bake files

Pass variables to bake files via environment variables:

```yaml
envVariables:
  ECR_SLUG: "123456789012.dkr.ecr.us-east-1.amazonaws.com/myapp"
  GHCR_SLUG: "ghcr.io/myorg/myapp"
  TAG: "0.0.1"
  ARCH: "amd64"
```

These are automatically available in your bake file as `variable` blocks.

#### 4. Multi-arch manifest creation

The manifest stage uses `docker buildx imagetools` to combine platform-specific images:

```bash
docker buildx imagetools create \
  -t "registry/app:tag" \
  "registry/app:tag-amd64" \
  "registry/app:tag-arm64"
```

This creates a single manifest that points to both architecture variants, allowing Docker to automatically pull the correct image for the runtime platform.

## Plugin settings

### Required settings

| Setting | Description | Example |
|---------|-------------|---------|
| `bake_file` | Path to your Buildx Bake definition file (HCL/JSON/Compose). When set, the plugin runs `docker buildx bake` instead of `docker buildx build`. | `docker-bake.hcl` |

### Authentication settings

You must provide authentication for all registries referenced in your bake file. Choose one of these methods:

| Setting | Description | Example |
|---------|-------------|---------|
| `username` and `password` | Registry username and password. **Only works for single registry.** | `username: <+secrets.getValue("dockerhub_username")>`<br/>`password: <+secrets.getValue("dockerhub_password")>` |
| `config` | Docker config JSON with auth for multiple registries. **Required for multi-registry pushes.** | `config: <+pipeline.stages.Setup.spec.execution.steps.Create_Docker_Config.output.outputVariables.DOCKER_CONFIG_JSON>` |

### Optional settings

| Setting | Description | Default | Example |
|---------|-------------|---------|---------|
| `bake_options` | Semicolon-delimited extra bake CLI args and/or target names. Do NOT include `--push` or `--load` (added automatically). | None | `--progress=plain;web;api`<br/>`-f;override.hcl;image` |
| `builder_driver` | Buildx builder driver. Use `docker-container` for registry cache exports. | `docker` | `docker-container` |
| `builder_name` | Custom builder name | Auto-generated | `my-builder` |
| `metadata_file` | Path to write build metadata | None | `/tmp/metadata.json` |

:::warning Important Notes

- **Do NOT include** `--push` or `--load` in `bake_options`. The plugin automatically adds `--push` for normal builds and `--load` for dry runs.
- **Driver selection**: If your bake file uses `cache-to` with registry exports, set `builder_driver: docker-container` explicitly. The plugin does not auto-switch the driver in Bake mode.
- **Ignored settings**: In Bake mode, the plugin ignores classic cache environment variables (`cache_from`, `cache_to`, `no_cache`). Define cache configuration in your bake file instead.
- **Tar export**: Classic tar export (`tar_path`) is not applied in Bake mode. Define outputs in your bake file if needed.

:::

## Bake file examples

### HCL format (recommended)

```hcl title="docker-bake.hcl"
variable "TAG" {
  default = "latest"
}

variable "REGISTRY" {
  default = "docker.io/myorg"
}

group "default" {
  targets = ["backend", "frontend"]
}

target "backend" {
  context    = "./backend"
  dockerfile = "Dockerfile"
  platforms  = ["linux/amd64", "linux/arm64"]
  tags = [
    "${REGISTRY}/backend:${TAG}",
    "${REGISTRY}/backend:latest"
  ]
  cache-from = ["type=registry,ref=${REGISTRY}/backend:cache"]
  cache-to   = ["type=registry,ref=${REGISTRY}/backend:cache,mode=max"]
}

target "frontend" {
  context    = "./frontend"
  dockerfile = "Dockerfile"
  platforms  = ["linux/amd64", "linux/arm64"]
  tags = [
    "${REGISTRY}/frontend:${TAG}",
    "${REGISTRY}/frontend:latest"
  ]
  cache-from = ["type=registry,ref=${REGISTRY}/frontend:cache"]
  cache-to   = ["type=registry,ref=${REGISTRY}/frontend:cache,mode=max"]
}
```

### JSON format

```json title="docker-bake.json"
{
  "variable": {
    "TAG": {
      "default": "latest"
    },
    "REGISTRY": {
      "default": "docker.io/myorg"
    }
  },
  "target": {
    "app": {
      "context": ".",
      "dockerfile": "Dockerfile",
      "platforms": ["linux/amd64", "linux/arm64"],
      "tags": [
        "${REGISTRY}/myapp:${TAG}",
        "${REGISTRY}/myapp:latest"
      ],
      "cache-from": ["type=registry,ref=${REGISTRY}/myapp:cache"],
      "cache-to": ["type=registry,ref=${REGISTRY}/myapp:cache,mode=max"]
    }
  }
}
```

### Docker Compose format

```yaml title="docker-compose.yml"
version: "3.8"

services:
  app:
    build:
      context: .
      dockerfile: Dockerfile
      platforms:
        - linux/amd64
        - linux/arm64
      cache_from:
        - type=registry,ref=docker.io/myorg/myapp:cache
      cache_to:
        - type=registry,ref=docker.io/myorg/myapp:cache,mode=max
    image: docker.io/myorg/myapp:latest
```

## Advanced use cases

### Multiple bake files with overrides

Use multiple bake files to compose configurations:

**Base configuration**:

```hcl title="docker-bake.hcl"
variable "VERSION" {
  default = "latest"
}

target "app" {
  context = "."
  platforms = ["linux/amd64", "linux/arm64"]
}
```

**Environment-specific overrides**:

```hcl title="prod.hcl"
target "app" {
  tags = ["prod.registry.com/app:${VERSION}"]
  cache-to = ["type=registry,ref=prod.registry.com/app:cache"]
}
```

```hcl title="staging.hcl"
target "app" {
  tags = ["staging.registry.com/app:${VERSION}"]
  cache-to = ["type=registry,ref=staging.registry.com/app:cache"]
}
```

**Pipeline step**:

```yaml
settings:
  bake_file: docker-bake.hcl
  bake_options: "-f;prod.hcl;app"  # Loads both docker-bake.hcl and prod.hcl
```

### Dynamic tagging with Git info

Use Harness expressions for dynamic tags:

**Bake file**:

```hcl title="docker-bake.hcl"
variable "GIT_COMMIT" {
  default = "dev"
}

variable "GIT_BRANCH" {
  default = "main"
}

variable "BUILD_NUMBER" {
  default = "0"
}

target "app" {
  tags = [
    "docker.io/myorg/myapp:${GIT_COMMIT}",
    "docker.io/myorg/myapp:${GIT_BRANCH}-${BUILD_NUMBER}",
    "docker.io/myorg/myapp:latest"
  ]
}
```

**Pipeline step**:

```yaml
spec:
  settings:
    bake_file: docker-bake.hcl
  envVariables:
    GIT_COMMIT: <+codebase.commitSha>
    GIT_BRANCH: <+codebase.branch>
    BUILD_NUMBER: <+pipeline.sequenceId>
```

### Build-time secrets

Pass secrets to your build without storing them in the final image:

**Dockerfile**:

```dockerfile
# syntax=docker/dockerfile:1
FROM python:3.12

# Mount secret at build time
RUN --mount=type=secret,id=pip_token \
    pip config set global.extra-index-url \
    https://token:$(cat /run/secrets/pip_token)@private.pypi.org/simple

RUN pip install my-private-package
```

**Bake file**:

```hcl title="docker-bake.hcl"
target "app" {
  secret = ["id=pip_token,env=PIP_TOKEN"]
  tags = ["docker.io/myorg/app:latest"]
}
```

**Pipeline step**:

```yaml
spec:
  settings:
    bake_file: docker-bake.hcl
  envVariables:
    PIP_TOKEN: <+secrets.getValue("pip_token")>
```

## Troubleshooting

### Build fails with "cache export not supported"

**Problem**: Error message indicates that cache export to registry is not supported.

**Solution**: Set `builder_driver: docker-container` in your plugin settings:

```yaml
settings:
  bake_file: docker-bake.hcl
  builder_driver: docker-container
```

### Authentication fails for one of multiple registries

**Problem**: Build succeeds but push fails for one registry in a multi-registry setup.

**Solution**: Verify all registries are in your Docker config JSON with valid credentials:

```bash
# Check the JSON structure
echo '<+pipeline.stages.Setup.spec.execution.steps.Create_Docker_Config.output.outputVariables.DOCKER_CONFIG_JSON>' | jq .

# Ensure all registries are present
{
  "auths": {
    "docker.io": { "auth": "..." },
    "gcr.io": { "auth": "..." },
    "ghcr.io": { "auth": "..." }
  }
}
```

### Docker config JSON formatting error

**Problem**: Error about invalid config JSON or authentication failures.

**Solution**: Ensure the config JSON is a single line without newlines:

```bash
# Use tr to remove newlines
export DOCKER_CONFIG_JSON="$(tr -d '\n' < docker-config.json)"
```

Also verify base64 encoding includes the `-w 0` flag to prevent line wrapping:

```bash
# Correct
ECR_AUTH=$(echo -n "AWS:${ECR_TOKEN}" | base64 -w 0)

# Incorrect (will have newlines)
ECR_AUTH=$(echo -n "AWS:${ECR_TOKEN}" | base64)
```

### Platform-specific build fails

**Problem**: Build fails for specific platforms (e.g., ARM64).

**Solution**: Verify the stage's platform configuration matches your build requirements:

```yaml
platform:
  os: Linux
  arch: Arm64  # Must match the target platform
```

For ARM builds on AMD64 hosts, QEMU emulation may be needed (slower but functional).

### Bake file not found

**Problem**: Error indicates the bake file cannot be found.

**Solution**: Ensure the `bake_file` path is relative to your repository root:

```yaml
settings:
  bake_file: docker-bake.hcl  # In repo root
  # OR
  bake_file: build/docker-bake.hcl  # In build directory
```

### Matrix strategy not loading override files

**Problem**: Version-specific override files are not being loaded.

**Solution**: Ensure you use the `-f` flag in `bake_options`:

```yaml
settings:
  bake_options: "-f;<+matrix.version>.hcl;image"
```

This tells bake to load both the main file and the version-specific file.

### Environment variables not recognized in bake file

**Problem**: Variables defined in the pipeline are not available in the bake file.

**Solution**: Ensure variables are defined in the bake file and passed via `envVariables`:

**Bake file**:
```hcl
variable "TAG" {
  default = "latest"
}
```

**Pipeline**:
```yaml
envVariables:
  TAG: <+codebase.commitSha>
```

### Manifest creation fails with "manifest not found"

**Problem**: `docker buildx imagetools create` fails with manifest not found.

**Solution**: Verify that the source platform-specific images exist before creating the manifest:

```bash
# Check if source images exist
docker buildx imagetools inspect registry/app:tag-amd64
docker buildx imagetools inspect registry/app:tag-arm64
```

Ensure the Build stages completed successfully before the Manifest stage runs.

## See also

- [Build and upload artifacts overview](/docs/continuous-integration/use-ci/build-and-upload-artifacts/build-and-upload-an-artifact)
- [Build multi-architecture images](/docs/continuous-integration/use-ci/build-and-upload-artifacts/build-multi-arch)
- [Use OIDC with AWS in Harness CI](/docs/continuous-integration/secure-ci/aws-oidc-token-plugin)
- [Docker Buildx Bake documentation](https://docs.docker.com/build/bake/)
- [Docker Buildx Bake reference](https://docs.docker.com/engine/reference/commandline/buildx_bake/)
