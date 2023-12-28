---
title: Upload Helm charts to Docker
description: Use a plugin to publish Helm charts to Docker registries
sidebar_position: 34
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

You can use the [Push Helm chart to Docker registry plugin](https://github.com/harness-community/drone-push-helm-chart-docker-registry) to upload [Helm charts](https://helm.sh/docs/topics/charts/) to Docker Hub registries <!-- The plugin doesn't support all Docker-compliant registries due to the way the script is written -->. You might find this useful if you [store Helm charts in OCI registries](https://helm.sh/blog/storing-charts-in-oci/).

:::info

Currently, this plugin supports uploading Helm charts to Docker Hub registries in the namespace for the account you use to login to Docker Hub only.

If you need to upload to another namespace or another Docker-compliant OCI registry, you can run the necessary `helm` commands in a [Run step](/docs/continuous-integration/use-ci/run-ci-scripts/run-step-settings). For more information, go to the [Helm documentation on using an OCI-based registry](https://helm.sh/docs/topics/registries/#using-an-oci-based-registry).

:::

You need:

* Helm charts to upload. Charts must be stored in a location available to the pipeline workspace.
* A Docker Hub account where you want to upload your Helm charts. <!-- When this is changed to support other namespaces, add these requirements: You need the username and password for a user or service account that has permission to upload to the target registry. Make sure the target repository/namespace for your chart exists in your registry. -->
* A [CI pipeline](../prep-ci-pipeline-components.md) with a [Build stage](../set-up-build-infrastructure/ci-stage-settings.md). If you haven't created a pipeline before, try one of the [CI tutorials](../../get-started/tutorials.md).

## Use the Push Helm chart to Docker registry plugin

The Push Helm chart to Docker registry plugin uses `helm package`, `helm registry`, and `helm push` commands to package a `.tgz` chart file, access the target registry, and push the `.tgz` file to the target repo/namespace in the registry. To review the script used by the plugin, go to the [drone-push-helm-chart-docker-registry GitHub repository](https://github.com/harness-community/drone-push-helm-chart-docker-registry). For more information about Helm commands, go to the [Helm documentation on using an OCI-based registry](https://helm.sh/docs/topics/registries/#using-an-oci-based-registry).

<Tabs>
  <TabItem value="Visual" label="Visual">

1. In your CI pipeline's **Build** stage, add a [Plugin step](../use-drone-plugins/plugin-step-settings-reference.md).
2. Enter a **Name** and optional **Description**.
3. For **Container Registry**, select a [Docker connector](/docs/platform/connectors/cloud-providers/ref-cloud-providers/docker-registry-connector-settings-reference). Harness uses this connector to pull the plugin image, as specified in the **Image** field.
4. In the **Image** field, enter `harnesscommunity/drone-helm-chart-docker-registry`.
5. Under **Optional Configuration**, add **Settings** to configure the plugin's properties as described in the following table.

| Keys | Type | Description | Value example |
| - | - | - | - |
| `chart_name` | String | The Helm chart `.tgz` file basename. | `mywebapp` |
| `chart_version` | String | The Helm chart version number. This is appended to the `chart_name` as a Docker tag. The default is `1.0.0`. | `0.1.0` |
| `docker_registry` | String | The base URL for the target Docker registry. The default is `registry.hub.docker.com`. | `registry-1.docker.io` |
| `chart_path` | String | The path to the directory containing the Helm chart to upload, relative to the pipeline workspace. The default is `/harness` (the pipeline workspace root directory). | `charts` (navigates to `/harness/charts`) |
| `docker_username` | String | A username for accessing the target Docker registry. This is appended to the `docker_registry` as the target namespace where the chart will be uploaded. | `my_docker_user` |
| `docker_password` | String | An [expression referencing a secret](/docs/platform/secrets/add-use-text-secrets#step-3-reference-the-encrypted-text-by-identifier) containing the password for the specified username. | `<+secrets.getValue("docker_chart_registry_password")>` |

</TabItem>
  <TabItem value="YAML" label="YAML" default>

The following YAML example describes a [Plugin step](../use-drone-plugins/plugin-step-settings-reference.md) in a `CI` stage that uses the Push Helm chart to Docker registry plugin.

```yaml
              - step:
                  type: Plugin
                  name: upload_helm_chart
                  identifier: upload_helm_chart
                  spec:
                    connectorRef: account.harnessImage
                    image: harnesscommunity/drone-helm-chart-docker-registry
                    settings:
                      chart_name: mywebapp
                      chart_version: 0.1.0
                      docker_registry: registry-1.docker.io
                      chart_path: charts
                      docker_username: my_docker_user
                      docker_password: <+secrets.getValue("docker_chart_registry_password")>
```

### Plugin step specifications

*  `type: Plugin`
*  `name:` Specify a step name.
*  `identifier:` Specify a unique step ID.
*  `connectorRef:` Specify a [Docker connector](/docs/platform/connectors/cloud-providers/ref-cloud-providers/docker-registry-connector-settings-reference).
*  `image: harnesscommunity/drone-helm-chart-docker-registry`
*  `settings:` Configure the plugin's properties as described in the following table.

| Keys | Type | Description | Value example |
| - | - | - | - |
| `chart_name` | String | The Helm chart `.tgz` file basename. | `mywebapp` |
| `chart_version` | String | The Helm chart version number. This is appended to the `chart_name` as a Docker tag.<br/>If unspecified, the default is `1.0.0`. | `0.1.0` |
| `docker_registry` | String | The base URL for the target Docker registry. The default is `registry.hub.docker.com`. | `registry-1.docker.io` |
| `chart_path` | String | The path to the directory containing the Helm chart to upload, relative to the pipeline workspace. The default is `/harness` (the pipeline workspace root directory). | `charts` (navigates to `/harness/charts`) |
| `docker_username` | String | A username for accessing the target Docker registry.<br/>The `docker_username` is appended to the `docker_registry` as the target namespace where the chart will be uploaded. | `my_docker_user` |
| `docker_password` | String | An [expression referencing a secret](/docs/platform/secrets/add-use-text-secrets#step-3-reference-the-encrypted-text-by-identifier) containing the password for the specified username. | `<+secrets.getValue("docker_chart_registry_password")>` |

</TabItem>
</Tabs>

:::tip Tips

You can use variable expressions for **Settings** values. For example, `password: <+stage.variables.docker_user_name>` references a [stage variable](/docs/platform/Pipelines/add-a-stage#stage-variables) called `DOCKER_USER_NAME`.

Create [text secrets](/docs/platform/secrets/add-use-text-secrets) for sensitive information, such as passwords.

:::

## View artifacts on the Artifacts tab

You can use the [Artifact Metadata Publisher plugin](https://github.com/drone-plugins/artifact-metadata-publisher) to publish artifact URLs on the [Artifacts tab](../viewing-builds.md). This makes it easier to find artifacts associated with specific builds. To do this, add another **Plugin** step after the Push Helm chart to Docker registry plugin step.

<Tabs>
  <TabItem value="Visual" label="Visual">

Configure the **Plugin** step to use the Artifact Metadata Publisher plugin:

* **Name:** Enter a name.
* **Container Registry:** Select a Docker connector.
* **Image:** Enter `plugins/artifact-metadata-publisher`.
* **Settings:** Add the following two settings as key-value pairs.
  * `file_urls`: The URL to the Helm chart artifact. If you uploaded multiple artifacts, you can provide a list of URLs.
  * `artifact_file`: Provide any `.txt` file name, such as `artifact.txt` or `url.txt`. This is a required setting that Harness uses to store the artifact URL and display it on the **Artifacts** tab. This value is not the name of your uploaded artifact, and it has no relationship to the artifact object itself.

</TabItem>
  <TabItem value="YAML" label="YAML" default>

Add a `Plugin` step that uses the `artifact-metadata-publisher` plugin.

```yaml
               - step:
                  type: Plugin
                  name: publish artifact metadata
                  identifier: publish_artifact_metadata
                  spec:
                    connectorRef: account.harnessImage
                    image: plugins/artifact-metadata-publisher
                    settings:
                      file_urls: https://complete/url/to/helm/chart/artifact
                      artifact_file: artifact.txt
```

* `connectorRef`: Use the built-in Docker connector (`account.harness.Image`) or specify your own Docker connector.
* `image`: Must be `plugins/artifact-metadata-publisher`.
* `file_urls`: Provide the URL to the Helm chart artifact. If you uploaded multiple artifacts, you can provide a list of URLs.
* `artifact_file`: Provide any `.txt` file name, such as `artifact.txt` or `url.txt`. This is a required setting that Harness uses to store the artifact URL and display it on the **Artifacts** tab. This value is not the name of your uploaded artifact, and it has no relationship to the artifact object itself.

</TabItem>
</Tabs>

## Build logs and artifact files

When you run the pipeline, you can observe the step logs on the [build details page](../viewing-builds.md).

If the Push Helm chart to Docker registry plugin step succeeds, you can find the Helm chart in your Docker registry at `hub.docker.com/DOCKER_USERNAME/CHART_NAME`. Helm charts are tagged by the `docker_version` provided in the plugin step's settings. 

If you used the [Artifact Metadata Publisher plugin](#view-artifacts-on-the-artifacts-tab), go to the **Artifacts** tab and select the step name to expand the list of artifact links associated with that step. If your pipeline has multiple steps that upload artifacts, use the dropdown menu on the **Artifacts** tab to switch between lists of artifacts uploaded by different steps.

<!-- ![](./static/artifacts-tab-with-link.png) -->

<DocImage path={require('./static/artifacts-tab-with-link.png')} />

:::
