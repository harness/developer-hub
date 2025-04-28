import Tar from '/docs/continuous-integration/shared/build-and-push-local-tar.md';

**Build and Push** steps use plugins to complete build and push operations. With Kubernetes cluster build infrastructures, these steps use [kaniko](https://github.com/GoogleContainerTools/kaniko/blob/main/README.md), and, with other build infrastructures, these steps use [drone-docker](https://github.com/drone-plugins/drone-docker/blob/master/README.md).

These plugins have a number of additional runtime flags that you might need for certain use cases. For information about the flags, go to the [kaniko plugin documentation](https://github.com/GoogleContainerTools/kaniko/blob/main/README.md#additional-flags) and the [drone-docker plugin documentation](https://plugins.drone.io/plugins/docker).

In **Environment Variables** for your step, add the environment variable `PLUGIN_BUILDX_OPTIONS` to pass any [supported options](https://docs.docker.com/reference/cli/docker/buildx/build/#options) to the buildx command used by the build and push steps.

How you configure plugin runtime flags depends on your build infrastructure.

<details>
<summary>Set plugin runtime flags with Kubernetes cluster build infrastructure</summary>

When using the built-in **Build and Push** steps with a Kubernetes cluster build infrastructure, you can use the **Environment Variables** setting to set kaniko plugin runtime flags.

:::warning

Unlike in other Harness CI steps, the **Environment Variables** setting in **Build and Push** steps _only_ accepts the known kaniko plugin runtime flags. You must set other types of environment variables in your Dockerfile, build arguments, or as stage variables, depending on their usage and purpose in your build.

:::

In **Environment Variables**, you must input a **Name** and **Value** for each variable. Format the name as `PLUGIN_FLAG_NAME`.

For example, to set `--skip-tls-verify`, add an environment variable named `PLUGIN_SKIP_TLS_VERIFY` and set the variable value to `true`.

```yaml
              - step:
                  identifier: buildandpush
                  name: buildandpush
                  type: BuildAndPush---
                  spec:
                    ...
                    envVariables:
                      PLUGIN_SKIP_TLS_VERIFY: true
```

To [build without pushing](/docs/continuous-integration/use-ci/build-and-upload-artifacts/build-without-push), use the `no-push` kaniko flag.

<details>
<summary>YAML example: Build and Push step with multiple environment variables</summary>

This YAML example shows a Build and Push to GAR step with several `PLUGIN` environment variables.

```yaml
- step:
    identifier: pushGAR
    name: push GAR
    type: BuildAndPushGAR ## Type depends the selected Build and Push step, such as Docker, GAR, ACR, and so on.
    spec: ## Some parts of 'step.spec' vary by Build and Push step type (Docker, GAR, ACR, etc).
      connectorRef: GAR_CONNECTOR
      host: "us-docker.pkg.dev/gar-prod-setup/harness-public"
      projectID: "some-gcp-project"
      imageName: "some-image-name"
      tags:
        - "1.0"
        - "1.2"
      buildArgs:
        foo: bar
        hello: world
      labels:
        foo: bar
        hello: world
      target: dev-env
      context: "."
      dockerfile: "harnessDockerfile"
      remoteCacheImage: "test/cache"
      envVariables: ## Specify plugin runtime flags as environment variables under 'step.spec'.
        PLUGIN_TAR_PATH: ./harnesstarpath
        PLUGIN_IMAGE_DOWNLOAD_RETRY: "2"
        PLUGIN_COMPRESSED_CACHING: "false"
        PLUGIN_USE_NEW_RUN: "true"
        PLUGIN_GARBAGE: yoyo
```

</details>

:::info Stage variables

Previously, you could set some kaniko runtime flags as [stage variables](/docs/platform/pipelines/add-a-stage/#stage-variables). If you had done this _and you are using Kubernetes cluster build infrastructure_, then Harness recommends moving these kaniko plugin stage variables to the **Environment Variables** in your **Build and Push** step. Don't change non-kaniko plugin variables, such as `PLUGIN_USER_ROLE_ARN`.

For other types of environment variables (that aren't Build and Push plugin runtime flags), stage variables are still inherently available to steps as environment variables. However, where you declare environment variables depends on their usage and purpose in your build. You might need to set them in your Dockerfile, build args, or otherwise.

However some flags still require using a stage variable: 

- `ignore-path`: Set this flag to ignore a comma separated list of file paths when taking an image snapshot. Required when ignoring multiple paths. 

Format these stage variables as `PLUGIN_FLAG_NAME`.

:::

</details>

<details>
<summary>Set plugin runtime flags with other build infrastructures</summary>

With Harness Cloud, self-managed VM, or local runner build infrastructures, you can set _some_ drone-docker plugin runtime flags as stage variable.

Currently, Harness supports the following drone-docker flags:

- `auto_tag`: Enable auto-generated build tags.
- `auto_tag_suffix`: Auto-generated build tag suffix.
- `custom_labels`: Additional arbitrary key-value labels.
- `artifact_file`: Harness uses this to show links to uploaded artifacts on the [Artifacts tab](/docs/continuous-integration/use-ci/viewing-builds).
- `dry_run`: Disables pushing to the registry. Used to [build without pushing](/docs/continuous-integration/use-ci/build-and-upload-artifacts/build-without-push).
- `custom_dns`: Provide your custom CNS address.

To set these flags in your Build and Push steps, add [stage variables](/docs/platform/pipelines/add-a-stage/#stage-variables) formatted as `PLUGIN_FLAG_NAME`.

For example, to set `custom_dns`, add a stage variable named `PLUGIN_CUSTOM_DNS` and set the variable value to your custom DNS address.

```yaml
variables:
  - name: PLUGIN_CUSTOM_DNS
    type: String
    description: ""
    required: false
    value: "vvv.xxx.yyy.zzz"
```

</details>

<details>
<summary>Mounting Docker Secrets</summary>

Harness now allows mounting Docker build secrets securely in 'Build and Push' steps. This feature enables you to pass sensitive data such as credentials or configuration files during Docker builds, either as environment variables or file-based secrets. It ensures secure handling of secrets, reducing the risk of exposing sensitive information.

:::note

- This feature is currently configurable only through YAML.
- In Kubernetes, unlike other build infrastructures (e.g., Harness Cloud), "Build and Push" steps default to Kaniko rather than Buildx. To enable this feature in Kubernetes, you must enable the feature flag `CI_USE_BUILDX_ON_K8`. Additionally, note that Kubernetes build infrastructure using Buildx requires privileged access.
  :::

<details>
<summary>YAML example: Mounting Docker secrets</summary>

This example demonstrates how to configure a Build and Push step with Docker secrets passed as both environment variables and file-based secrets:

```yaml
- step:
    identifier: buildAndPush
    type: BuildAndPushDockerRegistry
    name: Build and Push Docker Image
    spec:
      connectorRef: dockerConnector
      repo: dockerRepo/imageName
      tags:
        - ci-<+pipeline.executionId>
      envDockerSecrets:
        USERNAME: a_user # Reference in Dockerfile:reference to env variable
        PASSWORD: a_pass
      fileDockerSecrets:
        docker_user2: <+secrets.getValue("myusername")> # File secret defined in Harness
        docker_pass2: <+secrets.getValue("mydockerpass")>
        docker_user3: /harness/test.txt # path to local file in workspace containing the secret
      caching: true
```

The `envDockerSecrets` field allows you to define Docker secrets that will be passed to the build process through environment variables.

- Key: The reference ID that will be used to identify the secret in the Dockerfile (used with `--mount=type=secret,id=USERNAME`).
- Value: The reference to the environment variable containing the secret value. If the value is a secret or contains a secret, Harness will implicitly create the environment variable for you.

The `fileDockerSecrets` field allows you to mount secrets as files into the Docker build process. This is useful for passing configuration files, certificates, or other file-based sensitive data.

- Key: The name of the secret as it will be referenced during the Docker build.
- Value: The path to the file or a dynamic reference to a secret in Harness that will be mounted as a file.

</details>

</details>

<details>
<summary>Using Local Tar Output</summary>

<Tar />

</details>
