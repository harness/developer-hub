In scenarios where pushing a Docker image to a registry is not feasible, you can generate a local tarball of the built image instead. This approach is particularly useful for situations like local testing or when registry access is unavailable during the build process.

Once the tarball is generated, you can use a Security Testing Orchestration (STO) step, such as Aqua Trivy, to scan the image for vulnerabilities. This workflow ensures that images are built and scanned effectively, even without access to a remote registry.

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
