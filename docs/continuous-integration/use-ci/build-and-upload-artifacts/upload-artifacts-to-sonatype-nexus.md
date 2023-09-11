---
title: Upload artifacts to Sonatype Nexus
description: You can use Harness CI to upload artifacts to Sonatype Nexus Repository Manager.
sidebar_position: 90
---

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

You can use the [Nexus Publish Drone plugin](https://github.com/harness-community/drone-nexus-publish) in your CI pipelines to upload artifacts to [Sonatype Nexus Repository Manager](https://www.sonatype.com/products/sonatype-nexus-repository).

You can also [upload artifacts to S3](./upload-artifacts-to-s-3-step-settings.md), [upload artifacts to GCS](./upload-artifacts-to-gcs-step-settings.md), and [upload artifacts to JFrog](./upload-artifacts-to-jfrog.md). For other upload locations, you can use a script in a [Run step](../run-ci-scripts/run-step-settings.md).

## Requirements

* You have access to a Sonatype Nexus Repository Manager instance.
* You have a [CI pipeline](../prep-ci-pipeline-components.md) with a [Build stage](../set-up-build-infrastructure/ci-stage-settings.md). If you haven't created a pipeline before, try one of the [CI tutorials](../../get-started/tutorials.md).
* Your pipeline has steps that generate artifacts to upload, such as by running tests or building code. The steps you use depend on what artifacts you ultimately want to upload.

## Add the Plugin step

```mdx-code-block
<Tabs>
  <TabItem value="Visual" label="Visual">
```

1. In your CI pipeline's **Build** stage, add a [Plugin step](../use-drone-plugins/plugin-step-settings-reference.md).
2. Enter a **Name** and optional **Description**.
3. For **Container Registry**, select a [Docker connector](/docs/platform/Connectors/Cloud-providers/ref-cloud-providers/docker-registry-connector-settings-reference).
4. In the **Image** field, enter `harnesscommunity/publish-nexus-repository:1.1.1`.
5. Under **Optional Configuration**, add **Settings** to configure the Nexus Publisher plugin's properties, as described in the following table.

| Keys | Type | Description | Value example |
| - | - | - | - |
| `username` | String | A username for accessing Nexus Repository Manager. | <ul><li>`admin`</li><li>`test-user`</li></ul> |
| `password` | String | An [expression referencing a secret](/docs/platform/secrets/add-use-text-secrets#step-3-reference-the-encrypted-text-by-identifier) containing the password for the specified username. | `<+secrets.getValue("nexus_password")>` |
| `server_url` | Public URL | The URL of your Nexus Repository Manager instance. | `http://34.235.128.201:8081/` |
| `filename` | String | The path to the target artifact that you want to upload. | `./target/example-1.0.jar` |
| `format` | String | The repository format. | <ul><li>`maven2`</li><li>`raw`</li></ul> |
| `repository` | String | The name of the repository where you want to upload the artifact. | `maven-releases` |
| `attributes` | String of key-value pairs | Component and asset attributes providing additional artifact metadata.  `-CgroupId=org.dronetest -CartifactId=example -Cversion=1.0 -Aextension=jar -Aclassifier=bin` |

<!-- ![A Plugin step configured for the Nexus Publisher plugin.](./static/sonatype-nexus-plugin-visual-settings.png) -->

<docimage path={require('./static/sonatype-nexus-plugin-visual-settings.png')} />

```mdx-code-block
  </TabItem>
  <TabItem value="YAML" label="YAML" default>
```
The following YAML example describes a [Plugin step](../use-drone-plugins/plugin-step-settings-reference.md) in a `CI` stage that updates the Jira **Build** field when there is a successful build.

```yaml
              - step:
                  type: Plugin
                  name: upload_sonatype
                  identifier: upload_sonatype
                  spec:
                    connectorRef: account.harnessImage ## Docker Hub container registry connector
                    image: harnesscommunity/publish-nexus-repository:1.1.1
                    settings:
                      username: deploy-user ## Nexus Repository Manager username
                      password: <+secrets.getValue("nexus_password")> ## Nexus Repository Manager password
                      server_url: http://34.235.128.201:8081/ ## Nexus Repository instance URL
                      filename: ./target/example-1.0.jar ## Path to the artifact to upload
                      format: maven2 ## Repository format
                      repository: maven-releases ## Destination repository name
                      attributes: "-CgroupId=org.dronetest -CartifactId=example -Cversion=1.0 -Aextension=jar -Aclassifier=bin" ## Key-value pairs providing additional metadata
```

### Plugin step specifications

*  `type: Plugin`
*  `name:` Specify a step name.
*  `identifier:` Specify a unique step ID.
*  `connectorRef:` Specify a [Docker connector](/docs/platform/Connectors/Cloud-providers/ref-cloud-providers/docker-registry-connector-settings-reference).
*  `image: harnesscommunity/publish-nexus-repository:1.1.1`
*  `settings:` Configure the Nexus Publisher plugin's properties, as described in the following table.

| Keys | Type | Description | Value example |
| - | - | - | - |
| `username` | String | A username for accessing Nexus Repository Manager. | <ul><li>`admin`</li><li>`test-user`</li></ul> |
| `password` | String | An [expression referencing a secret](/docs/platform/secrets/add-use-text-secrets#step-3-reference-the-encrypted-text-by-identifier) containing the password for the specified username. | `<+secrets.getValue("nexus_password")>` |
| `server_url` | Public URL | The URL of your Nexus Repository Manager instance. | `http://11.222.333.444:8000/` |
| `filename` | String | The path to the target artifact that you want to upload. | `./target/example-1.0.jar` |
| `format` | String | The repository format. | <ul><li>`maven2`</li><li>`raw`</li></ul> |
| `repository` | String | The name of the repository where you want to upload the artifact. | `maven-releases` |
| `attributes` | String of key-value pairs | Component and asset attributes providing additional artifact metadata.  `"-CgroupId=org.dronetest -CartifactId=example -Cversion=1.0 -Aextension=jar -Aclassifier=bin"` |

```mdx-code-block
  </TabItem>
</Tabs>
```

:::tip Tips

You can use variable expressions for **Settings** values. For example, `password: <+stage.variables.nexus_password>` uses a [stage variable](/docs/platform/Pipelines/add-a-stage#stage-variables).

Create [text secrets](/docs/platform/secrets/add-use-text-secrets) for sensitive information, such as passwords.

When you run the pipeline, you can observe the step logs on the [build details page](../viewing-builds.md). If the Nexus Publisher plugin step succeeds, you can find the artifact in your Sonatype Nexus repo. You can use the Artifact Metadata Publisher plugin to [view artifacts on the Artifacts tab](#view-artifacts-on-the-artifacts-tab).

:::

## View artifacts on the Artifacts tab

You can use the [Artifact Metadata Publisher Drone plugin](https://github.com/drone-plugins/artifact-metadata-publisher) to publish artifact URLs on the [Artifacts tab](../viewing-builds.md). This makes it easier to find artifacts associated with specific builds. To do this, add another **Plugin** step after the Nexus Publisher plugin step.

```mdx-code-block
<Tabs>
  <TabItem value="Visual" label="Visual">
```

Configure the **Plugin** step to use the Artifact Metadata Publisher plugin:

* **Name:** Enter a name.
* **Container Registry:** Select a Docker connector.
* **Image:** Enter `plugins/artifact-metadata-publisher`.
* **Settings:** Add the following two settings as key-value pairs.
  * `file_urls`: The URL to the artifact that was uploaded by the Nexus Publisher plugin. If you uploaded multiple artifacts, you can provide a list of URLs.
  * `artifact_file`: Provide any `.txt` file name, such as `artifact.txt` or `url.txt`. This is a required setting that Harness uses to store the artifact URL and display it on the **Artifacts** tab. This value is not the name of your uploaded artifact, and it has no relationship to the artifact object itself.

```mdx-code-block
  </TabItem>
  <TabItem value="YAML" label="YAML" default>
```

Add a `Plugin` step that uses the `artifact-metadata-publisher` plugin.

```yaml
               - step:
                  type: Plugin
                  name: publish artifact metadata
                  identifier: publish_artifact_metadata
                  spec:
                    connectorRef: account.harnessImage ## Docker Hub container registry connector
                    image: plugins/artifact-metadata-publisher
                    settings:
                      file_urls: ## Provide the URL to the artifact that was uploaded by the Nexus Publisher plugin. If you uploaded multiple artifacts, you can provide a list of URLs.
                      artifact_file: artifact.txt ## Provide any '.txt' file name, such as 'artifact.txt' or 'url.txt'. This is a required setting that Harness uses to store the artifact URL and display it on the Artifacts tab. This value is not the name of your uploaded artifact, and it has no relationship to the artifact object itself.
```

```mdx-code-block
  </TabItem>
</Tabs>
```

## YAML example

This example pipeline has steps that build an artifact, upload it to a Sonatype Nexus repo, and then use the Artifact Metadata Publisher plugin to show a link to the artifact on the **Artifacts** tab.

```yaml
pipeline:
  name: YOUR_PIPELINE_NAME
  identifier: YOUR_PIPELINE_ID
  projectIdentifier: default
  orgIdentifier: default
  tags: {}
  properties:
    ci:
      codebase:
        connectorRef: YOUR_CODEBASE_CONNECTOR
        repoName: YOUR_CODE_REPO
        build: <+input>
  stages:
    - stage:
        name: stage1
        identifier: stage1
        type: CI
        spec:
          cloneCodebase: true
          execution:
            steps:
              - step:
                  type: Run
                  name: Build
                  identifier: build
                  spec:
                    shell: Sh
                    command: "mvn clean package"
              - step:
                  type: Plugin
                  name: upload_nexus
                  identifier: upload_nexus
                  spec:
                    connectorRef: account.harnessImage
                    image: harnesscommunity/publish-nexus-repository:1.1.1
                    settings:
                      username: test-user
                      password: <+secrets.getValue("nexus_password")>
                      server_url: http://11.222.333.444:8000/
                      format: maven2
                      filename: ./target/example-1.0.jar
                      repository: maven-releases
                      attributes: "-CgroupId=org.dronetest -CartifactId=example -Cversion=1.0 -Aextension=jar -Aclassifier=bin"
               - step:
                  type: Plugin
                  name: publish artifact metadata
                  identifier: publish_artifact_metadata
                  spec:
                    connectorRef: account.harnessImage
                    image: plugins/artifact-metadata-publisher
                    settings:
                      file_urls: https://repository.sonatype.org/content/sites/...
                      artifact_file: artifact.txt
          platform:
            os: Linux
            arch: Amd64
          runtime:
            type: Cloud
            spec: {}
```
