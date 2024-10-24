---
title: Publish anything to the Artifacts tab
description: You can publish any URL to the Artifacts tab.
sidebar_position: 31
redirect_from:
  - /tutorials/ci-pipelines/publish/artifacts-tab
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

You can use the [Artifact Metadata Publisher plugin](https://github.com/drone-plugins/artifact-metadata-publisher) to publish any URL on the **Artifacts** tab of the [Build details page](/docs/continuous-integration/use-ci/viewing-builds).

:::tip

If you use AWS S3, you can use either the Artifact Metadata Publisher plugin or the [S3 Upload and Publish plugin](/docs/continuous-integration/use-ci/build-and-upload-artifacts/upload-artifacts/upload-artifacts-to-s3/#use-the-s3-upload-and-publish-plugin), which combines the upload artifact and publish URL steps in one plugin.

:::

## Configure the Artifact Metadata Publisher plugin

To use the Artifact Metadata Publisher plugin, add a [Plugin step](/docs/continuous-integration/use-ci/use-drone-plugins/plugin-step-settings-reference) to your [CI pipeline](/docs/continuous-integration/use-ci/prep-ci-pipeline-components).

For artifacts generated in the same pipeline, the Plugin step is usually placed after the step that [uploads the artifact](./build-and-upload-an-artifact.md#upload-artifacts) to cloud storage.

```yaml
               - step:
                  type: Plugin
                  name: publish artifact metadata
                  identifier: publish_artifact_metadata
                  spec:
                    connectorRef: account.harnessImage
                    image: plugins/artifact-metadata-publisher
                    settings:
                      file_urls: https://domain.com/path/to/artifact
```

### Plugin step specifications

Use these specifications to configure the Plugin step to use the Artifact Metadata Publisher plugin.

#### connectorRef

Use the built-in Docker connector (`account.harness.Image`) or specify your own Docker connector. Harness uses this to pull the plugin Docker image.

This setting is labeled **Container Registry** in the Visual editor.

#### image

Set to `plugins/artifact-metadata-publisher`.

#### file_urls

Provide the URL for the artifact you want to link on the **Artifacts** tab. In the Visual editor, set this as a key-value pair under **Settings**.

For artifacts in cloud storage, use the appropriate URL format for your cloud storage provider, for example:

* GCS: `https://storage.googleapis.com/GCS_BUCKET_NAME/TARGET_PATH/ARTIFACT_NAME_WITH_EXTENSION`
* S3: `https://BUCKET.s3.REGION.amazonaws.com/TARGET/ARTIFACT_NAME_WITH_EXTENSION`

For artifacts uploaded through [Upload Artifacts steps](/docs/continuous-integration/use-ci/build-and-upload-artifacts/build-and-upload-an-artifact.md#upload-artifacts), use the **Bucket**, **Target**, and artifact name specified in the **Upload Artifacts** step.

For private S3 buckets, use the console view URL, such as `https://s3.console.aws.amazon.com/s3/object/BUCKET?region=REGION&prefix=TARGET/ARTIFACT_NAME_WITH_EXTENSION`.

If you uploaded multiple artifacts, you can provide a list of URLs, such as:

```yaml
  file_urls:
    - https://BUCKET.s3.REGION.amazonaws.com/TARGET/artifact1.html
    - https://BUCKET.s3.REGION.amazonaws.com/TARGET/artifact2.pdf
```


You can also set **display name** for each of the URLs set in the plugin, by using the format `name:::file_url`, where `:::` is the delimiter that separates the name and url. For example: 
```yaml
  file_urls:
    - artifact1:::https://BUCKET.s3.REGION.amazonaws.com/TARGET/artifact1.html
    - artifact2:::https://BUCKET.s3.REGION.amazonaws.com/TARGET/artifact2.pdf
```
For information about using Harness CI to upload artifacts, go to [Build and push artifacts and images](/docs/continuous-integration/use-ci/build-and-upload-artifacts/build-and-upload-an-artifact).


## Build logs and artifact files

When you run the pipeline, you can observe the step logs on the [Build details page](../viewing-builds.md), and you can find the artifact URL on the [Artifacts tab](../viewing-builds.md).

On the **Artifacts** tab, select the step name to expand the list of artifact links associated with that step.

If your pipeline has multiple steps that upload artifacts, use the dropdown menu on the **Artifacts** tab to switch between lists of artifacts uploaded by different steps.

<!-- ![](./static/artifacts-tab-with-link.png) -->

<DocImage path={require('./static/artifacts-tab-with-link.png')} />

## Tutorial: Upload an Allure report to the Artifacts tab

This tutorial demonstrates how to use the Artifacts Metadata Publisher plugin by generating and uploading an [Allure report](https://qameta.io/allure-report/).

<details>
<summary>Part 1: Prepare cloud storage</summary>

1. You need access to a cloud storage provider. This tutorial uses GCS. If you use another option, you'll need to modify some of the steps according to your chosen cloud storage provider.
2. If you use S3, GCS, or JFrog, you need a Harness connector to use with the **Upload Artifact** step:

   - S3: [AWS connector](/docs/platform/connectors/cloud-providers/add-aws-connector)
   - GCS: [GCP connector](/docs/platform/connectors/cloud-providers/connect-to-google-cloud-platform-gcp)
   - JFrog: [Artifactory connector](/docs/platform/connectors/cloud-providers/ref-cloud-providers/artifactory-connector-settings-reference)

   :::tip

   Store authentication and access keys for connectors as [Harness secrets](/docs/platform/secrets/add-file-secrets).

   :::

3. In your cloud storage, create a bucket or repo where you can upload your artifact.

   To access the artifact directly from the **Artifacts** tab, the upload location must be publicly available. If the location is not publicly available, you might need to log in to view the artifact or use a different artifact URL (such as a console view URL). This tutorial uses a publicly available GCS bucket to store the report.

</details>

<details>
<summary>Part 2: Prepare artifacts to upload</summary>

Add steps to your pipeline that generate and prepare artifacts to upload, such as [Run steps](/docs/continuous-integration/use-ci/run-step-settings). The steps you use depend on what artifacts you ultimately want to upload.

For example, this tutorial uses three **Run** steps to generate and prepare an artifact:

- The first step runs tests with Maven.
- The second step generates an Allure report. To ensure the build environment has the Allure tool, the step uses a Docker image that has this tool: `solutis/allure:2.9.0`.
- The third step combines the Allure report into a single HTML file.
  - To view an Allure report in a browser, you must run a web server with the `allure open` command; however, this command won't persist after the CI pipeline ends. Instead, use the [allure-combine](https://pypi.org/project/allure-combine/) tool to convert the Allure report into a single HTML file.
  - Running the `allure-combine .` command inside `allure-report` generates the `complete.html` file.
  - To ensure the build environment as access to the allure-combine tool, you can include steps to install it or use a Docker image that has the tool, such as `shubham149/allure-combine:latest`.

```yaml
- step:
    type: Run
    name: run maven tests
    identifier: run_maven_tests
    spec:
      connectorRef: account.harnessImage
      image: openjdk:11
      shell: Sh
      command: ./mvnw clean test site
- step:
    type: Run
    name: generate allure report
    identifier: generate_allure_report
    spec:
      connectorRef: account.harnessImage
      image: solutis/allure:2.9.0
      command: |
        cd target
        allure generate allure-results --clean -o allure-report
- step:
    type: Run
    name: combine report
    identifier: combine_report
    spec:
      connectorRef: account.harnessImage
      image: shubham149/allure-combine:latest
      command: |
        cd target/allure-report
        allure-combine .
        cd ../..
        cp target/allure-report/complete.html .
```

:::tip

For `connectorRef`, you can use the built-in Docker connector, `account.harnessImage`, or use your own [Docker Hub connector](/docs/platform/connectors/cloud-providers/ref-cloud-providers/docker-registry-connector-settings-reference).

:::

</details>

<details>
<summary>Part 3: Upload to cloud storage</summary>

Add a step to upload your artifact to cloud storage:

- [Upload Artifacts to JFrog](/docs/continuous-integration/use-ci/build-and-upload-artifacts/upload-artifacts/upload-artifacts-to-jfrog)
- [Upload Artifacts to GCS](/docs/continuous-integration/use-ci/build-and-upload-artifacts/upload-artifacts/upload-artifacts-to-gcs-step-settings)
- [Upload Artifacts to S3](/docs/continuous-integration/use-ci/build-and-upload-artifacts/upload-artifacts/upload-artifacts-to-s3)
- [Upload Artifacts to Sonatype Nexus](/docs/continuous-integration/use-ci/build-and-upload-artifacts/upload-artifacts/upload-artifacts-to-sonatype-nexus)

For example, this tutorial uploads the combined Allure report to GCS:

```yaml
- step:
    type: GCSUpload
    name: upload report
    identifier: upload_report
    spec:
      connectorRef: YOUR_GCP_CONNECTOR_ID
      bucket: YOUR_GCS_BUCKET
      sourcePath: target/allure-report/complete.html
      target: <+pipeline.sequenceId>
```

:::tip

The `target` value uses a [Harness expression](/docs/platform/variables-and-expressions/runtime-inputs/#expressions), `<+pipeline.sequenceId>`, to ensure that artifacts uploaded by this pipeline are stored in unique directories and don't overwrite one another.

:::

</details>

<details>
<summary>Part 4: Add URLs to the Artifacts tab</summary>

At this point, you can run the pipeline and then manually find the uploaded artifact in your cloud storage bucket or repo. Alternately, you can [use the Artifact Metadata Publisher plugin](#configure-the-artifact-metadata-publisher-plugin), which makes it easier to find the artifact directly associated with a particular build.

For example, this step publishes the URL for the combined Allure report on the Artifacts tab:

```yaml
- step:
    type: Plugin
    name: publish artifact metadata
    identifier: publish_artifact_metadata
    spec:
      connectorRef: account.harnessImage
      image: plugins/artifact-metadata-publisher
      settings:
        file_urls: https://storage.googleapis.com/YOUR_GCS_BUCKET/<+pipeline.sequenceId>/complete.html
```

For details about these settings, go to [Configure the Artifact Metadata Publisher plugin](#configure-the-artifact-metadata-publisher-plugin).

</details>

<details>
<summary>Tutorial YAML examples</summary>

These YAML examples demonstrate the pipeline created in the preceding tutorial. This pipeline:

1. Builds a Java Maven application.
2. Generates and compiles an Allure report.
3. Uploads the report to cloud storage.
4. Provides a URL to access the report from the **Artifacts** tab in Harness.

<Tabs>
  <TabItem value="hosted" label="Harness Cloud" default>

This example uses [Harness Cloud build infrastructure](/docs/continuous-integration/use-ci/set-up-build-infrastructure/use-harness-cloud-build-infrastructure) and uploads the Allure report artifact to GCS.

```yaml
pipeline:
  name: allure-report-upload
  identifier: allurereportupload
  projectIdentifier: YOUR_HARNESS_PROJECT_ID
  orgIdentifier: default
  tags: {}
  properties:
    ci:
      codebase:
        connectorRef: YOUR_CODEBASE_CONNECTOR_ID
        repoName: YOUR_CODE_REPO_NAME
        build: <+input>
  stages:
    - stage:
        name: test and upload artifact
        identifier: test_and_upload_artifact
        description: ""
        type: CI
        spec:
          cloneCodebase: true
          platform:
            os: Linux
            arch: Amd64
          runtime:
            type: Cloud
            spec: {}
          execution:
            steps:
              - step:
                  type: Run
                  name: run maven tests
                  identifier: run_maven_tests
                  spec:
                    connectorRef: account.harnessImage
                    image: openjdk:11
                    shell: Sh
                    command: ./mvnw clean test site
              - step:
                  type: Run
                  name: generate allure report
                  identifier: generate_allure_report
                  spec:
                    connectorRef: account.harnessImage
                    image: solutis/allure:2.9.0
                    command: |
                      cd target
                      allure generate allure-results --clean -o allure-report
              - step:
                  type: Run
                  name: combine report
                  identifier: combine_report
                  spec:
                    connectorRef: account.harnessImage
                    image: shubham149/allure-combine:latest
                    command: |
                      cd target/allure-report
                      allure-combine .
                      cd ../..
                      cp target/allure-report/complete.html .
              - step:
                  type: GCSUpload
                  name: upload report
                  identifier: upload_report
                  spec:
                    connectorRef: YOUR_GCP_CONNECTOR_ID
                    bucket: YOUR_GCS_BUCKET
                    sourcePath: target/allure-report/complete.html
                    target: <+pipeline.sequenceId>
              - step:
                  type: Plugin
                  name: publish artifact metadata
                  identifier: publish_artifact_metadata
                  spec:
                    connectorRef: account.harnessImage
                    image: plugins/artifact-metadata-publisher
                    settings:
                      file_urls: https://storage.googleapis.com/YOUR_GCS_BUCKET/<+pipeline.sequenceId>/complete.html
```

</TabItem>
  <TabItem value="k8s" label="Self-managed">

This example uses a [Kubernetes cluster build infrastructure](/docs/category/set-up-kubernetes-cluster-build-infrastructures) and uploads the Allure report artifact to GCS.

```yaml
pipeline:
  name: allure-report-upload
  identifier: allurereportupload
  projectIdentifier: YOUR_HARNESS_PROJECT_ID
  orgIdentifier: default
  tags: {}
  properties:
    ci:
      codebase:
        connectorRef: YOUR_CODEBASE_CONNECTOR_ID
        repoName: YOUR_CODE_REPO_NAME
        build: <+input>
  stages:
    - stage:
        name: build
        identifier: build
        description: ""
        type: CI
        spec:
          cloneCodebase: true
          infrastructure:
            type: KubernetesDirect
            spec:
              connectorRef: YOUR_KUBERNETES_CLUSTER_CONNECTOR_ID
              namespace: YOUR_KUBERNETES_NAMESPACE
              automountServiceAccountToken: true
              nodeSelector: {}
              os: Linux
          execution:
            steps:
              - step:
                  type: Run
                  name: run maven tests
                  identifier: run_maven_tests
                  spec:
                    connectorRef: account.harnessImage
                    image: openjdk:11
                    shell: Sh
                    command: ./mvnw clean test site
              - step:
                  type: Run
                  name: generate allure report
                  identifier: generate_allure_report
                  spec:
                    connectorRef: account.harnessImage
                    image: solutis/allure:2.9.0
                    command: |
                      cd target
                      allure generate allure-results --clean -o allure-report
              - step:
                  type: Run
                  name: combine report
                  identifier: combine_report
                  spec:
                    connectorRef: account.harnessImage
                    image: shubham149/allure-combine:latest
                    command: |
                      cd target/allure-report
                      allure-combine .
                      cd ../..
                      cp target/allure-report/complete.html .
              - step:
                  type: GCSUpload
                  name: upload report
                  identifier: upload_report
                  spec:
                    connectorRef: YOUR_GCP_CONNECTOR_ID
                    bucket: YOUR_GCS_BUCKET
                    sourcePath: target/allure-report/complete.html
                    target: <+pipeline.sequenceId>
              - step:
                  type: Plugin
                  name: publish artifact metadata
                  identifier: publish_artifact_metadata
                  spec:
                    connectorRef: account.harnessImage
                    image: plugins/artifact-metadata-publisher
                    settings:
                      file_urls: https://storage.googleapis.com/YOUR_GCS_BUCKET/<+pipeline.sequenceId>/complete.html
```

</TabItem>
</Tabs>

</details>

## See also

* [View test reports on the Artifacts tab](/docs/continuous-integration/use-ci/run-tests/viewing-tests/#view-reports-on-the-artifacts-tab)
* [View code coverage reports on the Artifacts tab](/docs/continuous-integration/use-ci/run-tests/code-coverage/#view-code-coverage-reports-on-the-artifacts-tab)
* [View GCS artifacts on the Artifacts tab](/docs/continuous-integration/use-ci/build-and-upload-artifacts/upload-artifacts/upload-artifacts-to-gcs-step-settings/#view-artifacts-on-the-artifacts-tab)
* [View JFrog artifacts on the Artifacts tab](/docs/continuous-integration/use-ci/build-and-upload-artifacts/upload-artifacts/upload-artifacts-to-jfrog/#view-artifacts-on-the-artifacts-tab)
* [View Sonatype Nexus artifacts on the Artifacts tab](/docs/continuous-integration/use-ci/build-and-upload-artifacts/upload-artifacts/upload-artifacts-to-sonatype-nexus/#view-artifacts-on-the-artifacts-tab)
* [View S3 artifacts on the Artifacts tab](/docs/continuous-integration/use-ci/build-and-upload-artifacts/upload-artifacts/upload-artifacts-to-s3#view-artifacts-on-the-artifacts-tab)

## Troubleshoot the Artifacts tab

Go to the [CI Knowledge Base](/kb/continuous-integration/continuous-integration-faqs) for questions and issues related to the Artifacts tab, such as:

* [Is it possible to publish custom data, such as outputs from variables or custom messages, to the Artifacts tab?](/kb/continuous-integration/continuous-integration-faqs/#is-it-possible-to-publish-custom-data-such-as-outputs-from-variables-or-custom-messages-to-the-artifacts-tab)
* [Do Upload Artifacts steps compress files before uploading them?](/kb/continuous-integration/continuous-integration-faqs/#does-the-upload-artifacts-to-s3-step-compress-files-before-uploading-them)
