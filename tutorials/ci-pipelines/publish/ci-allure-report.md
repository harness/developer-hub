---
title: Publish anything to the Artifacts tab
sidebar_position: 4
description: You can publish any URL to the Artifacts tab.
keywords:
  [Hosted Build, Continuous Integration, Hosted, CI Tutorial, maven, Allure]
slug: /ci-pipelines/publish/artifacts-tab
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<CTABanner
  buttonText="Learn More"
  title="Continue your learning journey."
  tagline="Take a Continuous Integration Certification today!"
  link="/certifications/continuous-integration"
  closable={true}
  target="_self"
/>

You can publish any URL to the **Artifacts** tab on the [Build details page](/docs/continuous-integration/use-ci/viewing-builds). To do this, you need to:

- Create an artifact, such as a test report.
- Upload the artifact to cloud storage, such as S3.
- Use the [Artifact Metadata Publisher plugin](https://github.com/drone-plugins/artifact-metadata-publisher) or [S3 Upload and Publish plugin](https://github.com/harness-community/drone-s3-upload-publish) to publish the artifact URL on the **Artifacts** tab.

This tutorial demonstrates how to do this by creating a Harness CI pipeline that builds a Java Maven application and generates an [Allure report](https://qameta.io/allure-report/) that you can view in Harness.

## Prerequisites

This tutorial assumes you have a [CI pipeline](/docs/continuous-integration/use-ci/prep-ci-pipeline-components) with a [Build stage](/docs/continuous-integration/use-ci/set-up-build-infrastructure/ci-stage-settings).

If you haven't created a pipeline before, try [Get started with the fastest CI](/tutorials/ci-pipelines/fastest-ci) or [Build on a Kubernetes cluster](/tutorials/ci-pipelines/kubernetes-build-farm) before starting this tutorial.

## Prepare cloud storage

1. You need access to one of the following cloud storage providers: S3, GCS, JFrog, or Sonatype Nexus.

   This tutorial uses GCS. If you use another option, you'll need to modify some of the steps according to your chosen cloud storage provider.

2. For S3, GCS, and JFrog, you must have a Harness connector to use with the **Upload Artifact** step:

   - S3: [AWS connector](/docs/platform/connectors/cloud-providers/add-aws-connector)
   - GCS: [GCP connector](/docs/platform/connectors/cloud-providers/connect-to-google-cloud-platform-gcp)
   - JFrog: [Artifactory connector](/docs/platform/connectors/cloud-providers/ref-cloud-providers/artifactory-connector-settings-reference)

   :::tip

   Store authentication and access keys for connectors as [Harness secrets](/docs/platform/secrets/add-file-secrets).

   :::

3. In your cloud storage, create a bucket or repo where you can upload your artifact.

   To access the artifact directly from the **Artifacts** tab, the upload location must be publicly available. If the location is not publicly available, you might need to log in to view the artifact or use an different artifact URL (such as a console view URL). This tutorial uses a publicly available GCS bucket to store the report.

## Prepare artifacts to upload

Add steps to your pipeline that generate and prepare artifacts to upload, such as [Run steps](/docs/continuous-integration/use-ci/run-ci-scripts/run-step-settings). The steps you use depend on what artifacts you ultimately want to upload.

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

## Upload to cloud storage

Add a step to upload your artifact to cloud storage:

- [Upload Artifacts to JFrog](/docs/continuous-integration/use-ci/build-and-upload-artifacts/upload-artifacts-to-jfrog)
- [Upload Artifacts to GCS](/docs/continuous-integration/use-ci/build-and-upload-artifacts/upload-artifacts-to-gcs-step-settings)
- [Upload Artifacts to S3](/docs/continuous-integration/use-ci/build-and-upload-artifacts/upload-artifacts-to-s-3-step-settings)
- [Upload Artifacts to Sonatype Nexus](/docs/continuous-integration/use-ci/build-and-upload-artifacts/upload-artifacts-to-sonatype-nexus)

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

## View artifacts on the Artifacts tab

At this point, you can run the pipeline and then manually find the uploaded artifact in your cloud storage bucket or repo. Alternately, you can use a [Drone plugin](/docs/continuous-integration/use-ci/use-drone-plugins/plugin-step-settings-reference) to publish the artifact URL to the **Artifacts** tab in Harness. This makes it easier to find the artifact directly associated with a particular build.

<Tabs>
  <TabItem value="artifactmetadata" label="Artifact Metadata Publisher plugin" default>

The [Artifact Metadata Publisher plugin](https://github.com/drone-plugins/artifact-metadata-publisher) pulls content from cloud storage and publishes it to the **Artifacts** tab. You can use this plugin with any cloud storage provider.

To use this plugin, add a [Plugin step](/docs/continuous-integration/use-ci/use-drone-plugins/plugin-step-settings-reference) after your upload artifact step.

For example, this step publishes the URL for the combined Allure report on GCS:

```yaml
- step:
    type: Plugin
    name: publish artifact metadata
    identifier: publish_artifact_metadata
    spec:
      connectorRef: account.harnessImage
      image: plugins/artifact-metadata-publisher
      settings:
        file_urls: https://storage.googleapis.com/YOUR_GCS_BUCKET/<+pipeline.sequenceId>/complete.html ## Provide the URL in your cloud storage bucket for the previously-uploaded artifact. If you uploaded multiple artifacts, you can provide a list of URLs.
        artifact_file: artifact.txt ## Provide any '.txt' file name. Harness uses this to store the artifact URL and display it on the Artifacts tab. This value is not the name of your uploaded artifact, and it has no relationship to the artifact object itself.
```

:::info

For `file_url`, provide the URL to the artifact that uses the **Bucket**, **Target**, and artifact name specified in the **Upload Artifacts** step. The format depends on your cloud storage provider. For example:

- GCS: `https://storage.googleapis.com/GCS_BUCKET_NAME/TARGET_PATH/ARTIFACT_NAME_WITH_EXTENSION`
- S3: `https://BUCKET.s3.REGION.amazonaws.com/TARGET/ARTIFACT_NAME_WITH_EXTENSION`

The resolved value of `file_urls` is the URL that is published on the **Artifacts** tab. It is derived from the upload location specified in the **Upload Artifact** step.

For example, this tutorial uses `https://storage.googleapis.com/YOUR_GCS_BUCKET/<+pipeline.sequenceId>/complete.html`, which references the value of `bucket`, `target`, and artifact object name from the Upload Artifact step. When the pipeline runs, the expression `<+pipeline.sequenceId>` is resolved into a valid URL.

For private S3 buckets, use the console view URL, such as `https://s3.console.aws.amazon.com/s3/object/BUCKET?region=REGION&prefix=TARGET/ARTIFACT_NAME_WITH_EXTENSION`.

If you uploaded multiple artifacts, you can provide a list of URLs, such as:

```yaml
file_urls:
  - https://BUCKET.s3.REGION.amazonaws.com/TARGET/artifact1.html
  - https://BUCKET.s3.REGION.amazonaws.com/TARGET/artifact2.txt
```

:::

</TabItem>
  <TabItem value="s3publisher" label="S3 Upload and Publish plugin">

If you use S3 as your cloud storage provider, you can use the [S3 Upload and Publish plugin](https://github.com/harness-community/drone-s3-upload-publish) to both upload your artifact and publish the URL to the **Artifacts** tab.

If you use this plugin, you **do not** need an **Upload Artifacts to S3** step in your pipeline.

This plugin only supports S3.

Add a [Plugin step](/docs/continuous-integration/use-ci/use-drone-plugins/plugin-step-settings-reference) that uses the `drone-s3-upload-publish` plugin, for example:

```yaml
              - step:
                  type: Plugin
                  name: s3-upload-publish
                  identifier: custom_plugin
                  spec:
                    connectorRef: account.harnessImage
                    image: harnesscommunity/drone-s3-upload-publish
                    settings:
                     aws_access_key_id: <+pipeline.variables.AWS_ACCESS> ## Reference to your AWS access ID.
                      aws_secret_access_key: <+pipeline.variables.AWS_SECRET> ## Reference to your AWS access key.
                      aws_default_region: ap-southeast-2 ## Set to your default AWS region.
                      aws_bucket: BUCKET_NAME ## The target S3 bucket.
                      artifact_file: artifact.txt ## Provide any '.txt' file name. Harness uses this to store the artifact URL and display it on the Artifacts tab. This value is not the name of your uploaded artifact, and it has no relationship to the artifact object itself.
                      source: target/allure-report/complete.html ## Provide the path to the file or directory that you want to upload.
                      target: <+pipeline.sequenceId> ## Optional. Provide a path, relative to the 'aws_bucket', where you want to store the artifact. Do not include the bucket name. If unspecified, Harness uploads the artifact to the bucket's main directory.
                    imagePullPolicy: IfNotPresent
```

:::tip

For `aws_access_key_id` and `aws_secret_access_key`, use [expressions](/docs/platform/variables-and-expressions/runtime-inputs/#expressions) to reference [Harness secrets](/docs/category/secrets) or [pipeline variables](/docs/platform/Variables-and-Expressions/add-a-variable) that contain your AWS access ID and key.

This tutorial also uses an expression for the `target`: The expression `<+pipeline.sequenceId>` creates a directory based on the incremental build ID. This ensures that artifacts uploaded by this pipeline are stored in unique directories and don't overwrite one another.

If you want to upload a compressed file, you must use a [Run step](/docs/continuous-integration/use-ci/run-ci-scripts/run-step-settings) to compress the artifact before uploading it.

:::

</TabItem>
</Tabs>

## YAML examples

<Tabs>
  <TabItem value="hosted" label="Harness Cloud" default>

This example uses [Harness Cloud build infrastructure](/docs/continuous-integration/use-ci/set-up-build-infrastructure/use-harness-cloud-build-infrastructure) and uploads the artifact to GCS.

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
                      artifact_file: artifact.txt
```

</TabItem>
  <TabItem value="k8s" label="Self-hosted">

This example uses a [Kubernetes cluster build infrastructure](/docs/category/set-up-kubernetes-cluster-build-infrastructures) and uploads the artifact to GCS.

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
                      artifact_file: artifact.txt
```

</TabItem>
</Tabs>
