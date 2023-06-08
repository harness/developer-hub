---
sidebar_position: 5
title: Ruby application
description: Use a CI pipeline to build and test a Ruby application.
keywords: [Hosted Build, Continuous Integration, Hosted, CI Tutorial]
slug: /ci-pipelines/build/ruby
---

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CISignupTip from '/tutorials/shared/ci-signup-tip.md';
```

<ctabanner
  buttonText="Learn More"
  title="Continue your learning journey."
  tagline="Take a Continuous Integration Certification today!"
  link="/certifications/continuous-integration"
  closable={true}
  target="_self"
/>

You can build and test a [Ruby](https://www.ruby-lang.org/en/) application using a Linux platform on [Harness Cloud](/docs/continuous-integration/use-ci/set-up-build-infrastructure/use-harness-cloud-build-infrastructure) or a [self-hosted Kubernetes cluster](/docs/category/set-up-kubernetes-cluster-build-infrastructures/) build infrastructure.

This guide assumes you've created a Harness CI pipeline. For more information about creating pipelines, go to:

* [CI pipeline creation overview](/docs/continuous-integration/use-ci/prep-ci-pipeline-components)
* [Harness Cloud pipeline tutorial](/tutorials/ci-pipelines/fastest-ci)
* [Kubernetes cluster pipeline tutorial](/tutorials/ci-pipelines/build/kubernetes-build-farm)

<CISignupTip />

## Install dependencies

Run [Bundler](https://bundler.io/guides/getting_started.html) commands in a [Run step](/docs/continuous-integration/use-ci/run-ci-scripts/run-step-settings) to install dependencies in the build environment.

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
                      bundle check || bundle install
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
                    image: ruby:latest
                    command: |-
                      bundle check || bundle install
```

```mdx-code-block
</TabItem>
</Tabs>
```

:::tip

In addition to Run steps, [Plugin steps](/docs/continuous-integration/use-ci/use-drone-plugins/explore-ci-plugins) are also useful for installing dependencies.

You can use [Background steps](/docs/continuous-integration/use-ci/manage-dependencies/background-step-settings) to run dependent services that are needed by multiple steps in the same stage.

:::

## Cache dependencies

```mdx-code-block
<Tabs>
<TabItem value="cloud" label="Harness Cloud" default>
```

<!-- not sure what the cache path is for Ruby. Also update in full pipeline example. -->

You can cache your Ruby dependencies with [Cache Intelligence](/docs/continuous-integration/use-ci/caching-ci-data/cache-intelligence). Add `caching.enabled.true` to your `stage.spec` and specify the cache paths (in `paths` and `sharedPaths`).

```yaml
    - stage:
        spec:
          caching:
            enabled: true
            key: cache-{{ checksum "gemfile.lock" }}
            paths:
              - "/vendor/cache" ## ?? /vendor/bundle??
          sharedPaths:
            - /vendor/cache ## ??
```

```mdx-code-block
</TabItem>
<TabItem value="selfhosted" label="Self-hosted">
```

With self-hosted build infrastructures, you can:

* [Save and Restore Cache from S3](/docs/continuous-integration/use-ci/caching-ci-data/saving-cache/)
* [Save and Restore Cache from GCS](/docs/continuous-integration/use-ci/caching-ci-data/save-cache-in-gcs)

Here's an example of a pipeline with **Save Cache to S3** and **Restore Cache from S3** steps.

<!-- need a run step to do `bundle cache` and then save the cache? -->

```yaml
            steps:
              - step:
                  type: RestoreCacheS3
                  name: Restore Cache From S3
                  identifier: Restore_Cache_From_S3
                  spec:
                    connectorRef: AWS_connector
                    region: us-east-1
                    bucket: some_s3_bucket
                    key: cache-{{ checksum "gemfile.lock" }}
                    archiveFormat: Tar
              - step:
                  type: Run
                  ...
              - step:
                  type: BuildAndPushDockerRegistry
                  ...
              - step:
                  type: Run
                  identifier: dependencies
                  name: Dependencies
                  spec:
                    connectorRef: account.harnessImage
                    image: ruby:latest
                    command: |-
                      bundle cache
              - step:
                  type: SaveCacheS3
                  name: Save Cache to S3
                  identifier: Save_Cache_to_S3
                  spec:
                    connectorRef: AWS_connector
                    region: us-east-1
                    bucket: some_s3_bucket
                    key: cache-{{ checksum "gemfile.lock" }} ## How do you save what was cached by `bundle cache`?
                    sourcePaths:
                      - /vendor/cache
                    archiveFormat: Tar
```

```mdx-code-block
</TabItem>
</Tabs>
```

## Run tests

Add [Run steps](/docs/continuous-integration/use-ci/run-ci-scripts/run-step-settings/) to [run tests in Harness CI](/docs/continuous-integration/use-ci/set-up-test-intelligence/run-tests-in-ci).

```mdx-code-block
<Tabs>
<TabItem value="Harness Cloud">
```

```yaml
                - step:
                  type: Run
                  name: Run Ruby Tests
                  identifier: run_ruby_tests
                  spec:
                    shell: Sh
                    command: |-
                      bundle exec rake test
```

```mdx-code-block
</TabItem>
<TabItem value="Self-hosted">
```

```yaml
              - step:
                  type: Run
                  name: Run Ruby Tests
                  identifier: run_ruby_tests
                  spec:
                    connectorRef: account.harnessImage
                    image: ruby:latest
                    shell: Sh
                    command: |-
                      bundle exec rake test
```

```mdx-code-block
</TabItem>
</Tabs>
```

### Visualize test results

If you want to [view test results in Harness](/docs/continuous-integration/use-ci/set-up-test-intelligence/viewing-tests/), your test reports must be in JUnit XML format and your steps must include the `reports` specification. The following examples use the [Minitest JUnit Formatter](https://github.com/aespinosa/minitest-junit). For more information and an RSpec example, go to [Format test reports - Ruby](/docs/continuous-integration/use-ci/set-up-test-intelligence/test-report-ref#ruby).

```mdx-code-block
<Tabs>
<TabItem value="Harness Cloud">
```

```yaml
              - step:
                  type: Run
                  name: Run Ruby Tests
                  identifier: run_ruby_tests
                  spec:
                    shell: Sh
                    command: |-
                      bundle exec rake test --junit
                  reports:
                    type: JUnit
                    spec:
                      paths:
                        - "/harness/report.xml" ## Can this just be /report.xml?
```

```mdx-code-block
</TabItem>
<TabItem value="Self-hosted">
```

```yaml
              - step:
                  type: Run
                  name: Run Ruby Tests
                  identifier: run_ruby_tests
                  spec:
                    connectorRef: account.harnessImage
                    image: ruby:latest
                    shell: Sh
                    command: |-
                      bundle exec rake test --junit
                    reports:
                      type: JUnit
                      spec:
                        paths:
                          - "/harness/report.xml"
```

```mdx-code-block
</TabItem>
</Tabs>
```

<!-- commented out due to bug  CI-8203 - ## Specify version

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
-->

## Full pipeline examples

Here's a YAML example of a pipeline that:

1. Tests a Ruby code repo.
2. Builds and pushes an image to Docker Hub.

This pipeline uses [Harness Cloud build infrastructure](/docs/continuous-integration/use-ci/set-up-build-infrastructure/use-harness-cloud-build-infrastructure) and [Cache Intelligence](/docs/continuous-integration/use-ci/caching-ci-data/cache-intelligence).

If you copy this example, replace the placeholder values with appropriate values for your connector IDs, account/user names, and repo names. Depending on your project and organization, you may also need to replace `projectIdentifier` and `orgIdentifier`.

<details>
<summary>Pipeline YAML</summary>

```yaml
pipeline:
  name: ruby
  identifier: ruby
  projectIdentifier: default
  orgIdentifier: default
  tags: {}
  properties:
    ci:
      codebase:
        connectorRef: YOUR_CODE_REPO_CONNECTOR_ID
        repoName: YOUR_REPO_NAME
        build: <+input>
  stages:
    - stage:
        name: build
        identifier: build
        description: ""
        type: CI
        spec:
          cloneCodebase: true
          caching:
            enabled: true
            key: cache-{{ checksum "gemfile.lock" }}
            paths:
              - /vendor/cache ## ?
          sharedPaths:
            - /vendor/cache ## ?
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
                  identifier: dependencies
                  name: Dependencies
                  spec:
                    shell: Sh
                    command: bundle check || bundle install
              - step:
                  type: BuildAndPushDockerRegistry
                  name: BuildAndPushDockerRegistry_1
                  identifier: BuildAndPushDockerRegistry_1
                  spec:
                    connectorRef: YOUR_DOCKER_CONNECTOR_ID
                    repo: YOUR_DOCKER_HUB_USERNAME/YOUR_DOCKER_REPO_NAME
                    tags:
                      - <+pipeline.sequenceId>
```

</details>

<!-- need a K8s pipeline example -->

## Next steps

Now that you have created a pipeline that builds and tests a Ruby app, you could:

* Create [triggers](/docs/category/triggers) to automatically run your pipeline.
* Add steps to [build and upload artifacts](/docs/category/build-and-upload-artifacts).
* Add a step to [build and push an image to a Docker registry](/docs/continuous-integration/use-ci/build-and-upload-artifacts/build-and-push-to-docker-hub-step-settings/).
* Explore other ways to [optimize and enhance CI pipelines](/docs/continuous-integration/use-ci/optimize-and-more/optimizing-ci-build-times).
