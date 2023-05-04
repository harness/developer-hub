---
title: Use Drone plugins
description: Drone plugins are Docker containers that perform predefined tasks.

sidebar_position: 30
helpdocs_topic_id: fjagoj8mez
helpdocs_category_id: ei5fgqxb0j
helpdocs_is_private: false
helpdocs_is_published: true
---

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

Drone plugins are Docker containers that perform predefined tasks. You can use the **Plugin** step to run plugins from the [Drone Plugins Marketplace](https://plugins.drone.io/) in your Harness CI pipelines. You can also [write your own custom plugins](https://harness.io/blog/continuous-integration/write-first-plugin-for-cie/). For more information about plugins, go to [Explore plugins](./explore-ci-plugins.md).

This topic assumes you're familiar with [pipeline creation](../prep-ci-pipeline-components.md). If you haven't created a pipeline before, try one of the [CI tutorials](../../ci-quickstarts/ci-pipeline-quickstart.md)

## Add the Plugin step

To demonstrate how to add a Drone plugin to a Harness CI pipeline, the following instructions use the [Download plugin](https://plugins.drone.io/plugins/download) as an example. This plugin downloads an archive to the [stage workspace](/docs/continuous-integration/use-ci/caching-ci-data/share-ci-data-across-steps-and-stages#share-data-between-steps-in-a-stage).

```mdx-code-block
<Tabs>
  <TabItem value="Visual" label="Visual">
```

Add the **Plugin** step to the **Build** stage of your CI pipeline, and configure the settings as follows:

* **Name:** Enter a name for the step.
* **Description:** Optional description.
* **Container Registry:** Select a [Docker connector](/docs/platform/Connectors/Cloud-providers/ref-cloud-providers/docker-registry-connector-settings-reference).
* **Image:** Enter the plugin's Docker image, such as `plugins/download`. You can find this on the plugin's page on the [Drone Plugins Marketplace](https://plugins.drone.io/).
* **Settings:** Enter key-value pairs representing plugin settings. You can find this on the plugin's page on the [Drone Plugins Marketplace](https://plugins.drone.io/) or in the plugin's README.
* For information about other settings, go to the [Plugin step settings reference](./plugin-step-settings-reference.md).

The following screenshot shows a **Plugin** step configured for the [Download plugin](https://plugins.drone.io/plugins/download).

![](./static/run-a-drone-plugin-in-ci-00.png)

```mdx-code-block
  </TabItem>
  <TabItem value="YAML" label="YAML" default>
```

Add the `Plugin` step to your `CI` stage with the following settings:

* `type: Plugin`
* `name:` A name for the step
* `connectorRef:` The ID of a [Docker connector](/docs/platform/Connectors/Cloud-providers/ref-cloud-providers/docker-registry-connector-settings-reference).
* `image:` The plugin's Docker image, such as `plugins/download`. You can find this on the plugin's page on the [Drone Plugins Marketplace](https://plugins.drone.io/).
* `settings:` A mapping of key-value pairs representing plugin settings. You can find this on the plugin's page on the [Drone Plugins Marketplace](https://plugins.drone.io/) or in the plugin's README.
* For information about other settings, go to the [Plugin step settings reference](./plugin-step-settings-reference.md).

The following example shows the YAML definition for a `Plugin` step configured for the [Download plugin](https://plugins.drone.io/plugins/download).

```yaml
              - step:
                  type: Plugin
                  name: drone plugin
                  identifier: drone_plugin
                  spec:
                    connectorRef: account.docker
                    image: plugins/download
                    settings:
                      source: https://github.com/drone/drone-cli/releases/download/v0.8.5/drone_linux_amd64.tar.gz
					  username: my-username
					  password: `<+secrets.getValue("mygithubpersonalaccesstoken")>`
```

```mdx-code-block
  </TabItem>
</Tabs>
```

:::tip Tips

You can use variable expressions for **Settings** values, such as `credentials: <+stage.variables.[TOKEN_SECRET]>`, which uses a [stage variable](/docs/platform/Pipelines/add-a-stage#option-stage-variables).

Create [text secrets](/docs/platform/Secrets/add-use-text-secrets) for sensitive information, such as passwords and tokens, required by the plugin.

When you run the pipeline, [check the log output](../viewing-builds.md) to verify that the plugin works as intended.

:::

### Output variables

For information about output variables produced by plugins, refer to [Output variables in the Plugin step settings reference](/docs/continuous-integration/use-ci/use-drone-plugins/plugin-step-settings-reference#output-variables).

## Convert Drone YAML to Harness YAML

The YAML examples in the [Drone Plugins Marketplace](https://plugins.drone.io/) can help you configure `settings` for a **Plugin** step in Harness CI. Many plugins offer both Harness and standalone Drone YAML samples, as indicated by the **Drone/Harness** toggle in the **Example** section.

<!-- ![](./static/drone_marketplace_toggle_yaml.png) -->

<docimage path={require('./static/drone_marketplace_toggle_yaml.png')} />

Because Drone plugins can be used outside Harness CI, there are some differences, as explained below, in the YAML format when using Drone plugins in Harness CI versus outside Harness CI. This information focuses on the `step` YAML definition.

### Step structure

The following examples compare the YAML structure for a step when a Drone plugin is used in a Drone pipeline and a Harness CI pipeline.

```mdx-code-block
<Tabs>
  <TabItem value="drone" label="Drone YAML" default>
```

```yaml
steps:
- name: download
  image: plugins/download
  settings:
    source: https://github.com/drone/drone-cli/releases/download/v0.8.5/drone_linux_amd64.tar.gz
```

```mdx-code-block
  </TabItem>
  <TabItem value="harness" label="Harness YAML">
```

```yaml
            steps:
              - step:
                  type: Plugin
                  name: drone plugin
                  identifier: drone_plugin
                  spec:
                    connectorRef: account.harnessImage
                    image: plugins/download
                    settings:
                      source: https://github.com/drone/drone-cli/releases/download/v0.8.5/drone_linux_amd64.tar.gz
```

```mdx-code-block
  </TabItem>
</Tabs>
```

### Listed and nested settings

To list-formatted settings from Drone Plugin YAML to Harness CI YAML, merge them with comma separation.

```mdx-code-block
<Tabs>
  <TabItem value="drone" label="Drone YAML" default>
```

```yaml
Settings:
  tags:
    - latest
	- '1.0.1'
	- '1.0'
```

```mdx-code-block
  </TabItem>
  <TabItem value="ci" label="Harness YAML">
```

```yaml
settings:
  tags: latest,1.0.1,1.0
```

```mdx-code-block
  </TabItem>
</Tabs>
```

For nested settings, maintain key-value pair definitions, as shown in the following Harness CI YAML example:

```yaml
settings:
  mynestedsetting:
    nextlevel:
      varname: 100
  mylistsetting:
   - itemone
   - itemtwo
```

It's often easier to define complex settings in the Harness Pipeline Studio's YAML editor, rather than the Visual editor. The settings in the above example would be defined in the Visual editor as shown in the following screenshot.

![](./static/run-a-drone-plugin-in-ci-02.png)

### Text secrets

The following snippets illustrate the different ways that Drone and Harness CI handle [text secrets](/docs/platform/Secrets/add-use-text-secrets).

Note that the CI definition includes a few additional fields and that some fields use different formats.

```mdx-code-block
<Tabs>
  <TabItem value="drone" label="Drone Plugin Marketplace definition" default>
```

```yaml
steps:
    - name: download
	  image: plugins/download
	  settings:
	    username:
		    from_secret: username
		password:
			from_secret: password
		source: https://github.com/drone/drone-cli/releases/download/v0.8.5/drone_linux_amd64.tar.gz
```

```mdx-code-block
  </TabItem>
  <TabItem value="ci" label="Harness CI definition">
```

```yaml
  - step:
    type: Plugin
	name: download-drone
	identifier: downloaddrone
	spec:
	    connectorRef: mygithubconnector
		image: plugins/download
		privileged: false
		settings:
		    username: <+secrets.getValue("myusernamesecret")>
			password: <+secrets.getValue("mypasswordsecret")>
			source: https://github.com/drone/drone-cli/releases/download/v0.8.5/drone_linux_amd64.tar.gz
```

```mdx-code-block
  </TabItem>
</Tabs>
```

## Configuration examples

Here are some YAML examples of **Plugin** steps configured for some popular Drone plugins.

<details>
<summary>heading</summary>
content in md format
</details>

<details>
<summary>heading</summary>
content in md format
</details>

<details>
<summary>heading</summary>
content in md format
</details>

