---
title: Write custom plugins
description: You can write your own plugins.
sidebar_position: 20
---

Plugins perform predefined tasks. They are essentially templated scripts that can be written in any programming language. While you can [run scripts in CI pipelines](/docs/category/run-scripts), if you reuse a script, it is easier to maintain a single plugin rather than modify multiple instances of a script.

You can write your own plugins and run them in a **Plugin** step in your Harness CI pipelines. There are also many [preexisting plugins](./explore-ci-plugins.md) you can use.

You can write plugins for anything. If it can be scripted, it can be a plugin. For example, you could write plugins that:

* Scrape commit information from a Git repo.
* Extract Jira issue numbers from Git commit messages.
* Print an extended build history.
* Create a file, write to it, and store it remotely.

## Create your plugin

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

   The above example script includes variable inputs: `PLUGIN_PATH`, `PLUGIN_REPO_URL`, and `PLUGIN_BRANCH`. [Variables in plugin scripts](#variables-in-plugin-scripts) become the plugin's **Settings** when you [add the Plugin step](#add-the-plugin-step) to your CI pipeline.

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

3. Using the method of your choice, build and publish the plugin image to a Docker registry. Take note of the Docker repo and image name, such as `my-docker-repo/git-clone-plugin`. You need it when you [add the Plugin step](#add-the-plugin-step) to your CI pipeline.

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

## Add the Plugin step

Use a **Plugin** step to run a plugin in a Harness CI pipeline. The following instructions use the `clone.sh` plugin example from [Create a plugin](#create-your-plugin).

For more information about configuring **Plugin** steps, go to the [Plugin step settings reference](./plugin-step-settings-reference.md) and [Use Drone plugins](./run-a-drone-plugin-in-ci.md).

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

```mdx-code-block
<Tabs>
  <TabItem value="Visual" label="Visual">
```

Add the **Plugin** step to the **Build** stage of your CI pipeline. The following settings are always or usually required:

* **Name:** A name for the step.
* **Container Registry:** A [Docker connector](/docs/platform/Connectors/Cloud-providers/ref-cloud-providers/docker-registry-connector-settings-reference) that can connect to the Docker registry where you uploaded the plugin image.
* **Image:** The plugin's Docker repo and image.
* **Settings:** Key-value pairs representing plugin settings. Settings are derived from [variables in your plugin script](#variables-in-plugin-scripts).

For example, the following configuration could be used for the `clone.sh` plugin:

* **Name:** `Git clone plugin`
* **Container Registry:** `account.docker-connector`
* **Image:** `my-docker-repo/git-clone-plugin`.
* **Settings:** The `clone.sh` script takes the following inputs:
  * `repo_url`: The URL of the repo to clone, such as `https://github.com/<some-account>/<some-repo>.git`.
  * `branch`: The branch to clone, such as `main`.
  * `path`: The location in the [stage workspace](/docs/continuous-integration/use-ci/caching-ci-data/share-ci-data-across-steps-and-stages#share-data-between-steps-in-a-stage) where the repo should be cloned, such as `codebase`.

```mdx-code-block
  </TabItem>
  <TabItem value="YAML" label="YAML" default>
```

Add the `Plugin` step to your `CI` stage. The following settings are always or usually required:

* `type: Plugin`
* `name:` A name for the step
* `connectorRef:` The ID of a [Docker connector](/docs/platform/Connectors/Cloud-providers/ref-cloud-providers/docker-registry-connector-settings-reference) that can connect to the Docker registry where you uploaded the plugin image.
* `image:` The plugin's Docker repo and image.
* `settings:` A mapping of key-value pairs representing plugin settings. Settings are derived from [variables in your plugin script](#variables-in-plugin-scripts).

For example, the following YAML definition could be used for the `clone.sh` plugin:

```yaml
              - step:
                  type: Plugin
                  name: git clone plugin
                  identifier: git_clone_plugin
                  spec:
                    connectorRef: account.docker-connector
                    image: my-docker-repo/git-clone-plugin
                    settings:
                      repo_url: https://github.com/<some-account>/<some-repo>.git ## URL of the repo to clone.
                      branch: main ## Branch to clone.
                      path: codebase ## Location in the stage workspace to clone the repo.
```

```mdx-code-block
  </TabItem>
</Tabs>
```

### Variables in plugin scripts

**Settings** keys in **Plugin** steps originate as environment variables prefixed by `PLUGIN_` in your [plugin script](#create-your-plugin). For example, the following script includes three variables: `PLUGIN_PATH`, `PLUGIN_REPO_URL`, and `PLUGIN_BRANCH`.

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

When defined in a **Plugin** step's **Settings**, don't include the `PLUGIN_` prefix. For example, `PLUGIN_PATH` becomes `path`, `PLUGIN_REPO_URL` becomes `repo_url`, and `PLUGIN_BRANCH` becomes `branch`.

```yaml
                settings:
                  path: value
                  repo_url: value
                  branch: value
```

:::tip Expressions and secrets

You can use [Harness expressions](/docs/platform/references/runtime-inputs/#expressions) for **Settings** values. For example `password: <+stage.variables.[TOKEN_SECRET]>` supplies a [stage variable](/docs/platform/Pipelines/add-a-stage#stage-variables) containing a [secret](/docs/category/secrets) to a setting called `password`.

Related to this, it is a best practice to use [text secrets](/docs/platform/Secrets/add-use-text-secrets) for sensitive information, such as passwords and tokens, required by plugins.

:::

## See also

The following resources demonstrate how to create Drone plugins. The process for creating the plugin is the same, but, when using the plugin in a pipeline, be aware that there are [differences between Drone YAML and Harness YAML](./run-a-drone-plugin-in-ci.md#convert-drone-yaml-to-harness-yaml).

* [Drone tutorial: Example Bash plugin](https://docs.drone.io/plugins/tutorials/bash/)
* [Drone tutorial: Example Go plugin](https://docs.drone.io/plugins/tutorials/golang/)
* [Video tutorial: Building your first Drone plugin](https://www.youtube.com/watch?v=JJgkX9ZYPpY)
