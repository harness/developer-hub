## Using SSH Keys During Docker Builds

If your Dockerfile needs to perform SSH-based operations — such as cloning private Git repositories or connecting to internal services — you can securely forward an SSH key into the build using Docker BuildKit's `--ssh` feature. This allows access to sensitive resources without baking credentials into your image.

> The examples below use GitHub as the SSH target, but the approach works with any SSH-based service, including internal Git servers, artifact sources, or deployment infrastructure.

### 1. Enable SSH mount in your Dockerfile

At the top of your Dockerfile, enable BuildKit features:

```Dockerfile
# syntax=docker/dockerfile:1.2
...
```
Then use the `--mount=type=ssh` instruction with a named ID:

```Dockerfile
...
RUN --mount=type=ssh,id=github_ssh git clone git@github.com:your-org/private-repo.git
...
```
:::note
The `id` in `--mount=type=ssh,id=...` is just a label — it can be anything, but must match what’s passed via `PLUGIN_BUILDX_OPTIONS`.
:::

### 2. Configure your Build and Push step
Set the `PLUGIN_BUILDX_OPTIONS` environment variable to pass the SSH option:

```yaml
- step:
    identifier: BuildAndPushDockerRegistry
    type: BuildAndPushDockerRegistry
    name: Build and Push Image
    spec:
      connectorRef: account.harnessImage
      repo: ghcr.io/my-org/my-service
      tags:
        - latest
      caching: true
      envVariables:
        PLUGIN_BUILDX_OPTIONS: "--ssh=github_ssh=id_rsa"
```

### 3. Reference the SSH key from Harness Secrets Manager

Mount the SSH key by referencing it from Secrets Manager using the same key name (`id_rsa`):

```yaml
      secrets:
        id_rsa: <+secrets.getValue("github_deploy_key")>
```

This setup allows your Docker build to securely perform SSH-based operations — such as cloning private Git repositories or connecting to internal services — without exposing credentials in your Docker image or scripts.