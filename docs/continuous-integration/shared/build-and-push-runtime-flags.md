**Build and Push** steps use plugins to complete build and push operations. With Kubernetes cluster build infrastructures, these steps use [kaniko](https://github.com/GoogleContainerTools/kaniko/blob/main/README.md), and, with other build infrastructures, these steps use [drone-docker](https://github.com/drone-plugins/drone-docker/blob/master/README.md).

These plugins have a number of additional runtime flags that you might need for certain use cases. For information about the flags, go to the [kaniko plugin documentation](https://github.com/GoogleContainerTools/kaniko/blob/main/README.md#additional-flags) and the [drone-docker plugin documentation](https://plugins.drone.io/plugins/docker).

Use **Environment Variables** to set these flags. You must input a **Name** and **Value** for each variable. Format the name as `PLUGIN_FLAG_NAME`.

For example, to set `--skip-tls-verify` for kaniko, add an environment variable named `PLUGIN_SKIP_TLS_VERIFY` and set the variable value to `true`.

```yaml
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

Previously, you could set some plugin runtime flags as [stage variables](/docs/platform/pipelines/add-a-stage/#stage-variables). Harness recommends changing these to environment variables; however, stage variables are inherently available to steps as environment variables.

:::