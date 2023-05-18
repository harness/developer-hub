---
sidebar_position: 6
title: Swift application
description: Use a CI pipeline to build and test a Swift application.
keywords: [Hosted Build, Continuous Integration, Hosted, CI Tutorial]
slug: /ci-pipelines/build/swift
---

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CISignupTip from '/tutorials/shared/ci-signup-tip.md';
```

You can build and test a [Swift](https://developer.apple.com/swift/) application using a macOS platform on [Harness Cloud](/docs/continuous-integration/use-ci/set-up-build-infrastructure/use-harness-cloud-build-infrastructure) or a [self-hosted VM](/docs/continuous-integration/use-ci/set-up-build-infrastructure/vm-build-infrastructure/define-macos-build-infra-with-anka-registry/) build infrastructure.

This guide assumes you've created a Harness CI pipeline. For more information about creating pipelines, go to:

* [CI pipeline creation overview](/docs/continuous-integration/use-ci/prep-ci-pipeline-components)
* [Harness Cloud pipeline tutorial](/tutorials/ci-pipelines/fastest-ci)
* [Kubernetes cluster pipeline tutorial](/tutorials/ci-pipelines/build/kubernetes-build-farm)

<CISignupTip />

## Build and run tests

Add [Run steps](/docs/continuous-integration/use-ci/run-ci-scripts/run-step-settings/) to build and [run tests in Harness CI](/docs/continuous-integration/use-ci/set-up-test-intelligence/run-tests-in-ci).

```mdx-code-block
<Tabs>
<TabItem value="Harness Cloud">
```

```yaml
              - step:
                  type: Run
                  name: npm test
                  identifier: npm_test
                  spec:
                    shell: Sh
                    command: |-
                      npm install
                      npm run build --if-present
                      npm test
                    reports:
                      type: JUnit
                      spec:
                        paths:
                          - report.xml
```

```mdx-code-block
</TabItem>

<TabItem value="Self-hosted">
```

```yaml
              - step:
                  type: Run
                  name: npm test
                  identifier: npm test
                  spec:
                    connectorRef: account.harnessImage
                    image: node:latest
                    shell: Sh
                    command: |-
                      npm install
                      npm run build --if-present
                      npm test
                    reports:
                      type: JUnit
                      spec:
                        paths:
                          - report.xml
```

```mdx-code-block
</TabItem>
</Tabs>
```

### Visualize test results

If you want to [view test results in Harness](/docs/continuous-integration/use-ci/set-up-test-intelligence/viewing-tests/),  make sure your test commands produce reports in JUnit XML format and that your steps include the `reports` specification.

```yaml
                    reports:
                      type: JUnit
                      spec:
                        paths:
                          - report.xml
```

## Install dependencies

Use **Run** steps to install dependencies in the build environment. [Plugin steps](/docs/continuous-integration/use-ci/use-drone-plugins/explore-ci-plugins) are also useful for installing dependencies. You can use [Background steps](/docs/continuous-integration/use-ci/manage-dependencies/background-step-settings) to run dependent services that are needed by multiple steps in the same stage.

```mdx-code-block
<Tabs>
<TabItem value="Harness Cloud">
```

```yaml
              - step:
                  type: Run
                  identifier: dependencies
                  name: Dependencies
                  spec:
                    shell: Sh
                    command: |-
                      npm install express@4.18.2 --no-save
```

```mdx-code-block
</TabItem>

<TabItem value="Self-hosted">
```

```yaml
              - step:
                  type: Run
                  identifier: dependencies
                  name: Dependencies
                  spec:
                    connectorRef: account.harnessImage
                    image: node:14.18.2-alpine
                    command: |-
                      npm install express@14.18.2 --no-save
```

```mdx-code-block
</TabItem>
</Tabs>
```
## Cache dependencies

```mdx-code-block
<Tabs>
  <TabItem value="cloud" label="Harness Cloud" default>
```

With Harness Cloud build infrastructure, use [Cache Intelligence](/docs/continuous-integration/use-ci/caching-ci-data/cache-intelligence) to automate caching of Node dependencies. Add `caching.enabled.true` to your `stage.spec`.

```yaml
    - stage:
        spec:
          caching:
            enabled: true
```

```mdx-code-block
  </TabItem>
  <TabItem value="selfhosted" label="Self-hosted">
```

With self-hosted build infrastructures, you can:

* [Save and Restore Cache from S3](/docs/continuous-integration/use-ci/caching-ci-data/saving-cache/)
* [Save and Restore Cache from GCS](/docs/continuous-integration/use-ci/caching-ci-data/save-cache-in-gcs)

Here's an example of a pipeline with **Save Cache to S3** and **Restore Cache from S3** steps.

```yaml
            steps:
              - step:
                  type: RestoreCacheS3
                  name: Restore Cache From S3
                  identifier: Restore_Cache_From_S3
                  spec:
                    connectorRef: AWS_Connector
                    region: us-east-1
                    bucket: your-s3-bucket
                    key: cache-{{ checksum filepath1 }}
                    archiveFormat: Tar
              - step:
                  type: Run
                  ...
              - step:
                  type: BuildAndPushDockerRegistry
                  ...
              - step:
                  type: SaveCacheS3
                  name: Save Cache to S3
                  identifier: Save_Cache_to_S3
                  spec:
                    connectorRef: AWS_Connector
                    region: us-east-1
                    bucket: your-s3-bucket
                    key: cache-{{ checksum filepath1 }}
                    sourcePaths:
                      - directory1
                      - directory2
                    archiveFormat: Tar
```

```mdx-code-block
  </TabItem>
</Tabs>
```

## Specify version

```mdx-code-block
<Tabs>
<TabItem value="Harness Cloud">
```

Node is pre-installed on Hosted Cloud runners. For details about all available tools and versions, go to [Platforms and image specifications](/docs/continuous-integration/use-ci/set-up-build-infrastructure/use-harness-cloud-build-infrastructure#platforms-and-image-specifications).

If your application requires a specific Node version, add a **Run** step to install it.

<details>
<summary>Install one Node version</summary>

```yaml
              - step:
                  type: Run
                  name: Install Node
                  identifier: installnode
                  spec:
                    shell: Sh
                    envVariables:
                      NODE_VERSION: 18.16.0
                    command: |-
                      mkdir $HOME/nodejs
                      curl -L https://nodejs.org/dist/v${NODE_VERSION}/node-v${NODE_VERSION}-linux-x64.tar.xz | tar xJ -C $HOME/nodejs
                      export PATH=$HOME/nodejs/node-v${NODE_VERSION}-linux-x64/bin:$PATH
```

</details>

<details>
<summary>Install multiple Node versions</summary>

1. Add the [matrix looping strategy](/docs/platform/pipelines/looping-strategies-matrix-repeat-and-parallelism/) configuration to your stage.

```yaml
    - stage:
        strategy:
          matrix:
            nodeVersion:
              - 18.16.0
              - 20.2.0
```

2. Reference the matrix variable in your steps.

```yaml
              - step:
                  type: Run
                  name: Install node
                  identifier: installnode
                  spec:
                    shell: Sh
                    command: |-
                      mkdir $HOME/nodejs
                      curl -L https://nodejs.org/dist/v${NODE_VERSION}/node-v${NODE_VERSION}-linux-x64.tar.xz | tar xJ -C $HOME/nodejs
                      export PATH=$HOME/nodejs/node-v${NODE_VERSION}-linux-x64/bin:$PATH
                    envVariables:
                      NODE_VERSION: <+matrix.nodeVersion>
```

</details>

```mdx-code-block
</TabItem>

<TabItem value="Self-hosted">
```

Specify the desired [Node Docker image](https://hub.docker.com/_/node) tag in your steps. There is no need for a separate install step when using Docker.

<details>
<summary>Use a specific Node version</summary>

```yaml
              - step:
                  type: Run
                  name: Node Version
                  identifier: nodeversion
                  spec:
                    connectorRef: account.harnessImage
                    image: node:18.16.0
                    shell: Sh
                    command: |-
                      npm version
```

</details>

<details>
<summary>Use multiple node versions</summary>

1. Add the [matrix looping strategy](/docs/platform/pipelines/looping-strategies-matrix-repeat-and-parallelism/) configuration to your stage.

```yaml
    - stage:
        strategy:
          matrix:
            nodeVersion:
              - 18.16.0
              - 20.2.0
```

2. Reference the matrix variable in the `image` field of your steps.

```yaml
              - step:
                  type: Run
                  name: Node Version
                  identifier: nodeversion
                  spec:
                    connectorRef: account.harnessImage
                    image: node:<+matrix.nodeVersion>
                    shell: Sh
                    command: |-
                      npm version
```

</details>

```mdx-code-block
</TabItem>
</Tabs>
```

## Full pipeline examples

Here's a YAML example of a pipeline that:

1. Tests a Node code repo.
2. Builds and pushes an image to Docker Hub.

This pipeline uses [Harness Cloud build infrastructure](/docs/continuous-integration/use-ci/set-up-build-infrastructure/use-harness-cloud-build-infrastructure), [Cache Intelligence](/docs/continuous-integration/use-ci/caching-ci-data/cache-intelligence), and [Test Intelligence](/docs/continuous-integration/ci-quickstarts/test-intelligence-concepts).

If you copy this example, replace the bracketed values with corresponding values for your Harness project, connector IDs, account/user names, and repo names.

<details>
<summary>Pipeline YAML</summary>

```yaml
pipeline:
  name: nodejs-sample
  identifier: nodejssample
  projectIdentifier: [project-ID]
  orgIdentifier: default
  tags: {}
  stages:
    - stage:
        name: Build Node App
        identifier: Build_Node_App
        description: ""
        type: CI
        spec:
          cloneCodebase: true
          caching:
            enabled: true
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
                  name: npm test
                  identifier: npm_test
                  spec:
                    shell: Sh
                    command: |-
                      npm install
                      npm run build --if-present
                      npm test
              - step:
                  type: BuildAndPushDockerRegistry
                  name: BuildAndPushDockerRegistry_1
                  identifier: BuildAndPushDockerRegistry_1
                  spec:
                    connectorRef: [Docker-connector-ID]
                    repo: [Docker-Hub-username]/[Docker-repo]
                    tags:
                      - <+pipeline.sequenceId>
  properties:
    ci:
      codebase:
        connectorRef: [code-repo-connector]
        repoName: [scm-account-name]/[repo-name]
        build: <+input>
```

</details>

## Next steps

Now that you have created a pipeline that builds and tests a Swift app, you could:

* Create [triggers](/docs/category/triggers) to automatically run your pipeline.
* Add steps to [build and upload artifacts](/docs/category/build-and-upload-artifacts).
* Add a step to [build and push an image to a Docker registry](/docs/continuous-integration/use-ci/build-and-upload-artifacts/build-and-push-to-docker-hub-step-settings/).
* Explore other ways to [optimize and enhance CI pipelines](/docs/continuous-integration/use-ci/optimize-and-more/optimizing-ci-build-times).