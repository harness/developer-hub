---
title: Plugin step
description: Use plugins to perform predefined tasks any programming language.
sidebar_position: 6
---

:::note

Currently, the Plugin step in Deploy stages is behind the feature flag `CDS_CONTAINER_STEP_GROUP`. Contact [Harness Support](mailto:support@harness.io) to enable the feature.

:::

Plugins perform predefined tasks. They are essentially templated scripts that can be written in any programming language.

You can use plugins for anything. If it can be scripted, it can be a plugin. For example, you could use plugins that:

- Scrape commit information from a Git repo.
- Extract Jira issue numbers from Git commit messages.
- Print an extended build history.
- Create a file, write to it, and store it remotely.

## Supported plugins

You can build your own plugins or use one of the many preexisting plugins from the [Drone Plugins Marketplace](https://plugins.drone.io/) and [GitHub Actions Marketplace](https://github.com/marketplace?type=actions).

The [Bitrise Integrations library](https://bitrise.io/integrations/steps) is not supported in the CD Plugin step at this time.


## Creating custom plugins

To create a plugin, you need to prepare a script, create a Docker image to run the script, and then build and publish the plugin image to a Docker registry.

1. Write the script that you want the plugin to run. You can write plugins in any programming language. For example, the following Bash script, called `clone.sh`, clones a Git repo and prints the latest commit information.

   ```bash
   #!/bin/sh
   set -xe

   # If path setting is not set, then use current directory
   path=${PLUGIN_PATH:-.}
   mkdir -p ${path}
   cd ${path}

   # Clones the public git repo and checkout to a branch
   git clone ${PLUGIN_REPO_URL} .
   git checkout ${PLUGIN_BRANCH}

   # Prints the last commit
   git log -1 --stat
   ```

   :::info Variables

   The above example script includes variable inputs: `PLUGIN_PATH`, `PLUGIN_REPO_URL`, and `PLUGIN_BRANCH`. Variables in plugin scripts become the plugin's **Settings** when you add the Plugin step to your Deploy stage.

   :::

2. Create a Docker image to run your script by specifying the script as the [ENTRYPOINT in a Dockerfile](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/#entrypoint). For example, the following Dockerfile runs the `clone.sh` script:

   ```
   FROM alpine/git

   # Copies the clone script to the Docker image
   COPY clone.sh /usr/local/bin/

   # Makes the clone script executable
   RUN chmod +x /usr/local/bin/clone.sh

   ENTRYPOINT [ "/usr/local/bin/clone.sh" ]
   ```

3. Using the method of your choice, build and publish the plugin image to a Docker registry. Take note of the Docker repo and image name, such as `my-docker-repo/git-clone-plugin`. You need it when you add the Plugin step to your Deploy stage.

   ```
   docker build -t my-docker-repo/git-clone-plugin .
   docker push my-docker-repo/git-clone-plugin
   ```

### Test plugins locally

You can test your plugin in a local environment by running it as a Docker container. For example, the following Docker command runs the `clone.sh` plugin locally by supplying the required inputs (`PLUGIN_PATH`, `PLUGIN_REPO_URL`, and `PLUGIN_BRANCH`) and specifying the plugin's Docker repo and image (`my-docker-repo/git-clone-plugin`).

```
docker run --rm \
 -e PLUGIN_PATH=codebase \
 -e PLUGIN_REPO_URL=https://github.com/<some-account>/<some-repo>.git \
 -e PLUGIN_BRANCH=main \
 my-docker-repo/git-clone-plugin
```

### Distribute plugins

Plugins are distributed as Docker images.

If your plugin image is private, others in your organization can use your plugin in their Harness CI pipelines by using a [Docker connector](/docs/platform/Connectors/Cloud-providers/ref-cloud-providers/docker-registry-connector-settings-reference) configured for the private registry where your plugin image is stored.

If your plugin image is public, you can share it with anyone. You can submit a pull request to the [drone-plugin-index repository](https://github.com/drone/drone-plugin-index) if you'd like your plugin to be considered for the [Drone Plugins Marketplace](https://plugins.drone.io/).


## Plugin step settings

The Plugin step has the following settings.

### Container Registry and Image

**Container Registry** is a Harness container registry connector that has access to Docker Hub. If you have created your own plugin, the connector must have access to the container registry where your plugin image is located.

The name of the plugin's Docker image. The image name should include the tag, or it defaults to the `latest` tag if unspecified. For more information about tags, go to [Docker build tags](https://docs.docker.com/engine/reference/commandline/build/#tag).

You can use any Docker image from any Docker registry, including Docker images from private registries.


### Privileged

Select this option to run the container with escalated privileges. This is the equivalent of running a container with the Docker `--privileged` flag.


### Settings

Specify plugin-specific settings according to the plugin's documentation. 

### Output variables

:::info

Output variables are not available for all plugins.

:::

Output variables are exposed values that can be used by other steps or stages in the pipeline. If the plugin writes outputs to the `.env` file present in the `DRONE_OUTPUT` path, you can use expressions to reference output variables in other steps and stages in the pipeline.

To reference an output variable in a later step or stage in the same pipeline, use a variable [expression](/docs/platform/references/runtime-inputs/#expressions) that includes the originating step's Id and the variable's name.

Use either of the following expressions to reference an output variable in another step in the same stage:


```
<+steps.STEP_ID.output.outputVariables.VAR_NAME>
<+execution.steps.STEP_GROUP_ID.steps.STEP_ID.output.outputVariables.VAR_NAME>
```

Use either of the following expressions to reference an output variable in a different stage than the one where it originated:

```
<+pipeline.stages.STAGE_ID.spec.execution.steps.STEP_GROUP_ID.steps.STEP_ID.output.outputVariables.VAR_NAME>
```


### Image Pull Policy

Select an option to set the pull policy for the image.

* **Always**: The kubelet queries the container image registry to resolve the name to an image digest every time the kubelet launches a container. If the kubelet encounters an exact digest cached locally, it uses its cached image; otherwise, the kubelet downloads (pulls) the image with the resolved digest, and uses that image to launch the container.
* **If Not Present**: The image is pulled only if it is not already present locally.
* **Never**: The image is assumed to exist locally. No attempt is made to pull the image.

### Set Container Resources

Maximum resource limits for containers that clone the codebase at runtime. For more information, go to [Resource units in Kubernetes](https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/#resource-units-in-kubernetes).


## Advanced settings

In **Advanced**, you can use the following options:

* [Conditional Execution](https://developer.harness.io/docs/platform/pipelines/w_pipeline-steps-reference/step-skip-condition-settings/)
* [Failure Strategy](https://developer.harness.io/docs/platform/pipelines/w_pipeline-steps-reference/step-failure-strategy-settings/)
* [Looping Strategy](https://developer.harness.io/docs/platform/pipelines/looping-strategies-matrix-repeat-and-parallelism/)
* [Policy Enforcement](https://developer.harness.io/docs/platform/governance/policy-as-code/harness-governance-overview/)