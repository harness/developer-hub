In some cases, you may prefer to generate a local tarball of the built Docker image instead of pushing it directly to a registry. This approach is useful for testing locally or when registry access is not available during the build step.

Here’s a sample partial pipeline that demonstrates how build the image, generate the tarball, and push it to the registry:

```YAML
- step:
    type: BuildAndPushDockerRegistry
    name: BuildAndPushDockerRegistry_1
    identifier: BuildAndPushDockerRegistry_1
    spec:
      connectorRef: docker_connector
      repo: dockerhub/image_name
      tags:
        - linux-amd64
      caching: false
      dockerfile: ./docker/Dockerfile
      envVariables:
        PLUGIN_TAR_PATH: /harness/image_name.tar
- step:
    type: Run
    name: Run_2
    identifier: Run_2
    spec:
      shell: Sh
      command: ls /harness
```

The `PLUGIN_NO_PUSH: "true"` environment variable prevents the image from being pushed to the registry.Here’s a sample partial pipeline that demonstrates how build the image, generate the tarball, but skip pushing it to the registry:

```YAML
- step:
    type: BuildAndPushDockerRegistry
    name: BuildAndPushDockerRegistry_1
    identifier: BuildAndPushDockerRegistry_1
    spec:
      connectorRef: docker_connector
      repo: dockerhub/image_name
      tags:
        - linux-amd64
      caching: false
      dockerfile: ./docker/Dockerfile
      envVariables:
        PLUGIN_TAR_PATH: /harness/image_name.tar
        PLUGIN_NO_PUSH: "true"
- step:
    type: Run
    name: Run_2
    identifier: Run_2
    spec:
      shell: Sh
      command: ls /harness
```

:::note

The local tar output feature is available only when using Kaniko as the build tool, which is commonly used in Kubernetes environments.

:::
