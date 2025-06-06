---
title: Upload Helm charts to container registries
description: Use a plugin to publish Helm charts to Docker registries
sidebar_position: 20
sidebar_label: Upload Helm charts
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The [Helm Push plugin](https://github.com/harness-community/drone-push-helm-chart-docker-registry) streamlines the packaging and distribution of [Helm charts](https://helm.sh/docs/topics/charts/) to container registries.

For more information about why we created this plugin, go to the Harness blog post [Push Helm Charts to Container Registries with Harness CI](https://www.harness.io/blog/helm-container-registries-harness-ci). For more information about the Helm commands used by this plugin, go to the Helm documentation on [Using an OCI-based registry](https://helm.sh/docs/topics/registries/#using-an-oci-based-registry).

For general information about using plugins in CI pipelines, go to [Explore plugins](../../use-drone-plugins/explore-ci-plugins.md) and [Use Drone plugins](../../use-drone-plugins/run-a-drone-plugin-in-ci.md).

## Supported registries

Currently, this plugin supports pushing Helm charts to Docker Hub and Google Artifact Registry.

If you need to upload Helm charts to another to a Docker-compliant OCI registry that is not supported by this plugin, you can run the necessary `helm` commands in a [Run step](/docs/continuous-integration/use-ci/run-step-settings) or use the [Helm Push plugin](https://github.com/harness-community/drone-push-helm-chart-docker-registry) as a basis to [write your own plugin](../../use-drone-plugins/custom_plugins.md). For more information on the `helm` commands, go to the Helm documentation on [Using an OCI-based registry](https://helm.sh/docs/topics/registries/#using-an-oci-based-registry).

## Configure the Helm Push plugin

<Tabs>
<TabItem value="gar" label="Upload Helm charts to GAR" default>

To use the Helm Push plugin to upload Helm charts to GAR, [add a Plugin step](../../use-drone-plugins/run-a-drone-plugin-in-ci.md) to your [CI pipeline](../../prep-ci-pipeline-components.md). For example:

```yaml
              - step:
                  type: Plugin
                  name: upload_helm_chart
                  identifier: upload_helm_chart
                  spec:
                    connectorRef: YOUR_IMAGE_REGISTRY_CONNECTOR
                    image: plugins/helm-push:ARCH_TAG
                    settings:
                      registry_url: LOCATION-docker.pkg.dev
                      registry_username: oauth2accesstoken
                      registry_password: <+secrets.getValue("access_token")>
                      chart_path: path/to/chart
                      gcloud_project_id: PROJECT_ID
                      registry_namespace: REPO_ID
```

To use the Helm Push plugin, configure the [Plugin step settings](../../use-drone-plugins/plugin-step-settings-reference.md) as follows:

| Keys | Type | Description | Value example |
| - | - | - | - |
| `connectorRef` | String | Select a [Docker connector](/docs/platform/connectors/cloud-providers/ref-cloud-providers/docker-registry-connector-settings-reference). | `YOUR_IMAGE_REGISTRY_CONNECTOR` |
| `image` | String | Enter `plugins/helm-push:ARCH_TAG` and replace `ARCH_TAG` with the relevant architecture tag to use. For a list of available tags, go to the [Helm Push plugin README](https://github.com/harness-community/drone-helm-chart-container-registry?tab=readme-ov-file#plugin-image). | `plugins/helm-push:linux-amd64` |
| `registry_url` | String | Base URL for the Docker registry where the packaged chart will be published. For GAR, this must be `LOCATION-docker.pkg.dev`. Replace `LOCATION` with your GAR repository's regional or multi-regional [location](https://cloud.google.com/artifact-registry/docs/repositories/repo-locations). | `us-east4-docker.pkg.dev` |
| `registry_username` | String | For GAR, this must be `oauth2accesstoken` | `oauth2accesstoken` |
| `registry_password` | String | Reference to a [Harness text secret](/docs/platform/secrets/add-use-text-secrets) containing your [GAR Helm access token](https://cloud.google.com/artifact-registry/docs/helm/authentication#token). | `<+secrets.getValue("docker_chart_registry_password")>` |
| `chart_path` | String | Path to the directory containing the Helm chart to upload, relative to the pipeline workspace. The default is `/harness` (the pipeline workspace root directory). | `charts` (navigates to `/harness/charts`) |
| `gcloud_project_id` | String | Your [Google Cloud project ID](https://cloud.google.com/artifact-registry/docs/helm/manage-charts#push) | `my-project` |
| `registry_namespace` | String | Your [GAR repository name](https://cloud.google.com/artifact-registry/docs/helm/manage-charts#push) where you want to publish the chart. | `my-repo` |

</TabItem>
<TabItem value="dh" label="Upload Helm charts to Docker Hub">

To use the Helm Push plugin to upload Helm charts to Docker Hub, [add a Plugin step](../../use-drone-plugins/run-a-drone-plugin-in-ci.md) to your [CI pipeline](../../prep-ci-pipeline-components.md). For example:

```yaml
              - step:
                  type: Plugin
                  name: upload_helm_chart
                  identifier: upload_helm_chart
                  spec:
                    connectorRef: YOUR_IMAGE_REGISTRY_CONNECTOR
                    image: plugins/helm-push:ARCH_TAG
                    settings:
                      registry_url: registry.hub.docker.com
                      registry_username: DOCKER_USERNAME
                      registry_password: <secrets.getValue("docker_pat")>
                      chart_path: path/to/chart
                      registry_namespace: DOCKER_NAMESPACE
```
To use the Helm Push plugin, configure the [Plugin step settings](../../use-drone-plugins/plugin-step-settings-reference.md) as follows:

| Keys | Type | Description | Value example |
| - | - | - | - |
| `connectorRef` | String | Select a [Docker connector](/docs/platform/connectors/cloud-providers/ref-cloud-providers/docker-registry-connector-settings-reference). | `YOUR_IMAGE_REGISTRY_CONNECTOR` |
| `image` | String | Enter `plugins/helm-push:ARCH_TAG` and replace `ARCH_TAG` with the relevant architecture tag to use. For a list of available tags, go to the [Helm Push plugin README](https://github.com/harness-community/drone-helm-chart-container-registry?tab=readme-ov-file#plugin-image). | `plugins/helm-push:linux-amd64` |
| `registry_url` | String | Base URL for the Docker registry where the packaged chart will be published. For Docker Hub, this must be `registry.hub.docker.com` | `registry.hub.docker.com` |
| `registry_username` | String | Username to access your Docker Hub registry | `hubuser` |
| `registry_password` | String | Reference to a [Harness text secret](/docs/platform/secrets/add-use-text-secrets) containing a Docker Hub personal access token. | `<+secrets.getValue("docker_pat")>` |
| `chart_path` | String | Path to the directory containing the Helm chart to upload, relative to the pipeline workspace. The default is `/harness` (the pipeline workspace root directory). | `charts` (navigates to `/harness/charts`) |
| `registry_namespace` | String | The Docker namespace where you want to publish the Helm chart, such as your personal namespace or an org namespace. For more information, go to the Docker documentation on [Pushing a Helm chart to Docker Hub](https://docs.docker.com/docker-hub/oci-artifacts/#push-a-helm-chart). | `myorg` |

</TabItem>
</Tabs>

:::tip

You can use variable expressions for plugin settings. For example, `registry_username: <+stage.variables.docker_user_name>` references a [stage variable](/docs/platform/pipelines/add-a-stage#stage-variables) called `DOCKER_USER_NAME`.

:::

## Build logs and artifact files

When you run the pipeline, you can observe the step logs on the [build details page](../../viewing-builds.md) and then find the Helm chart in your container registry.

Optionally, you can use the [Artifact Metadata Publisher plugin](https://github.com/drone-plugins/artifact-metadata-publisher) to publish artifact URLs on the [Artifacts tab](../../viewing-builds.md). This makes it easier to find artifacts associated with specific builds.
