**Build and Push** steps use plugins to complete build and push operations. With Kubernetes cluster build infrastructures, these steps use [kaniko](https://github.com/GoogleContainerTools/kaniko/blob/main/README.md), and, with other build infrastructures, these steps use [drone-docker](https://github.com/drone-plugins/drone-docker/blob/master/README.md).

These plugins have a number of additional runtime flags that you might need for certain use cases. For information about the flags, go to the [kaniko plugin documentation](https://github.com/GoogleContainerTools/kaniko/blob/main/README.md#additional-flags) and the [drone-docker plugin documentation](https://plugins.drone.io/plugins/docker).

Use **Environment Variables** to set these flags. You must input a **Name** and **Value** for each variable. Format the name as `PLUGIN_FLAG_NAME`.

<details>
<summary>YAML example: Build and Push step with environment variables</summary>

This YAML example shows a Build and Push to GAR step with `PLUGIN` environment variables.

```yaml
              - step:
                  identifier: pushGCR
                  name: push GCR
                  type: BuildAndPushGAR ## Type depends the selected Build and Push step, such as Docker, GAR, ACR, and so on.
                  spec: ## Some parts of 'step.spec' vary by Build and Push step type (Docker, GAR, ACR, etc).
                    connectorRef: YOUR_GCR_CONNECTOR
                    host: "us.gcr.io"
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

For example, to set `--skip-tls-verify` for kaniko, add an environment variable named `PLUGIN_SKIP_TLS_VERIFY` and set the variable value to `true`.

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

To set `custom_dns` for drone-docker, add an environment variable named `PLUGIN_CUSTOM_DNS` and set the variable value to your custom DNS address.

```yaml
                    envVariables:
                      PLUGIN_CUSTOM_DNS: "vvv.xxx.yyy.zzz"
```

Plugin runtime flags are also used to [build without pushing](/docs/continuous-integration/use-ci/build-and-upload-artifacts/build-without-push).

:::info Stage variables

Previously, you could set some plugin runtime flags as [stage variables](/docs/platform/pipelines/add-a-stage/#stage-variables). Harness recommends changing these to environment variables; however, stage variables are still inherently available to steps as environment variables.

:::