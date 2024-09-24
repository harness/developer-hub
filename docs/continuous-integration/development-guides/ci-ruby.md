---
title: Ruby
description: Use a CI pipeline to build and test a Ruby application.
sidebar_position: 90
redirect_from:
  - /tutorials/ci-pipelines/build/ruby
canonical_url: https://www.harness.io/blog/ci-ruby-test-intelligence
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<CTABanner
  buttonText="Learn More"
  title="Continue your learning journey."
  tagline="Take a Continuous Integration Certification today!"
  link="/university/continuous-integration"
  closable={true}
  target="_self"
/>

You can build and test a [Ruby](https://www.ruby-lang.org/en/) application using a Linux platform on [Harness Cloud](/docs/continuous-integration/use-ci/set-up-build-infrastructure/use-harness-cloud-build-infrastructure) or a [self-managed Kubernetes cluster](/docs/category/set-up-kubernetes-cluster-build-infrastructures/) build infrastructure.

This guide assumes you've [created a Harness CI pipeline](/docs/continuous-integration/use-ci/prep-ci-pipeline-components).

## Install dependencies

Run [Bundler](https://bundler.io/guides/getting_started.html) commands in a [Run step](/docs/continuous-integration/use-ci/run-step-settings) to install dependencies in the build environment.

<Tabs>
<TabItem value="Harness Cloud">

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

</TabItem>
<TabItem value="Self-managed">

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

</TabItem>
</Tabs>

## Cache dependencies

<Tabs>
<TabItem value="cacheint" label="Cache Intelligence" default>

You can cache your Ruby dependencies with [Cache Intelligence](/docs/continuous-integration/use-ci/caching-ci-data/cache-intelligence). Add `caching.enabled.true` to your `stage.spec` and specify the cache paths (in `paths` and `sharedPaths`).

```yaml
- stage:
    spec:
      caching:
        enabled: true
        key: cache-{{ checksum "Gemfile.lock" }}
        paths:
          - "vendor/bundle"
      sharedPaths:
        - vendor/bundle
```

</TabItem>
<TabItem value="builtin" label="Save and Restore Cache steps">

You can use built-in steps to:

- [Save and Restore Cache from S3](/docs/continuous-integration/use-ci/caching-ci-data/saving-cache/)
- [Save and Restore Cache from GCS](/docs/continuous-integration/use-ci/caching-ci-data/save-cache-in-gcs)

Here's an example of a pipeline with **Save Cache to S3** and **Restore Cache from S3** steps.

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
                    key: cache-{{ checksum "Gemfile.lock" }}
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
                    connectorRef: AWS_connector
                    region: us-east-1
                    bucket: some_s3_bucket
                    key: cache-{{ checksum "Gemfile.lock" }}
                    sourcePaths:
                      - vendor/bundle
                    archiveFormat: Tar
```

</TabItem>
</Tabs>

## Build and run tests

You can use **Run** and **Test** steps to [run tests in Harness CI](/docs/continuous-integration/use-ci/run-tests/run-tests-in-ci).

The following examples run tests in a **Run** step.

<Tabs>
<TabItem value="Harness Cloud">

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

</TabItem>
<TabItem value="Self-managed">

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

</TabItem>
</Tabs>

### Visualize test results

If you want to [view test results in Harness](/docs/continuous-integration/use-ci/run-tests/viewing-tests/), your test reports must be in JUnit XML format.

If you use a **Run** step to run tests, your **Run** step must include the `reports` specification. The `reports` specification is not required for [Test steps (Test Intelligence)](#run-tests-with-test-intelligence).

The following examples use the [Minitest JUnit Formatter](https://github.com/aespinosa/minitest-junit). For more information and an RSpec example, go to [Format test reports - Ruby](/docs/continuous-integration/use-ci/run-tests/test-report-ref#ruby).

<Tabs>
<TabItem value="Harness Cloud">

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
          - report.xml
```

</TabItem>
<TabItem value="Self-managed">

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
            - report.xml
```

</TabItem>
</Tabs>

### Run tests with Test Intelligence

[Test Intelligence](/docs/continuous-integration/use-ci/run-tests/ti-overview.md) is available for Ruby unit tests.

### Test splitting

Harness CI supports [test splitting (parallelism)](/docs/continuous-integration/use-ci/run-tests/speed-up-ci-test-pipelines-using-parallelism) for both **Run** and **Test** steps.

## Specify version

<Tabs>
<TabItem value="Harness Cloud">

Ruby is pre-installed on Harness Cloud runners. For details about all available tools and versions, go to [Platforms and image specifications](/docs/continuous-integration/use-ci/set-up-build-infrastructure/use-harness-cloud-build-infrastructure#platforms-and-image-specifications).

If your application requires a specific Ruby version, add a **Run** or **GitHub Action** step to install it.

Use the [setup-ruby](https://github.com/ruby/setup-ruby) action in a [GitHub Action step](/docs/continuous-integration/use-ci/use-drone-plugins/ci-github-action-step/) to install the required Ruby version.

You will need a [personal access token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token), stored as a [secret](/docs/platform/secrets/add-use-text-secrets), with read-only access for GitHub authentication.

<details>
<summary>Install one Ruby version</summary>

```yaml
- step:
    type: Action
    name: Install ruby
    identifier: installruby
    spec:
      uses: ruby/setup-ruby@v1
      with:
        ruby-version: 3.0
```

</details>

<details>
<summary>Use multiple Ruby versions</summary>

1. Add a [matrix looping strategy](/docs/platform/pipelines/looping-strategies/looping-strategies-matrix-repeat-and-parallelism) configuration to your stage.

```yaml
- stage:
    strategy:
      matrix:
        rubyVersion:
          - 3.2.2
          - 2.7.8
```

2. Reference the matrix variable in your steps.

```yaml
- step:
    type: Action
    name: Install ruby
    identifier: installruby
    spec:
      uses: ruby/setup-ruby@v1
      with:
        ruby-version: <+ stage.matrix.rubyVersion >
```

</details>

</TabItem>
<TabItem value="Self-managed">

Specify the desired [Ruby Docker image](https://hub.docker.com/_/ruby) tag in your steps. There is no need for a separate install step when using Docker.

<details>
<summary>Use a specific Ruby version</summary>

```yaml
- step:
    type: Run
    name: Ruby Version
    identifier: rubyversion
    spec:
      connectorRef: account.harnessImage
      image: ruby:latest
      shell: Sh
      command: |-
        ruby --version
```

</details>

<details>
<summary>Use multiple Ruby versions</summary>

1. Add a [matrix looping strategy](/docs/platform/pipelines/looping-strategies/looping-strategies-matrix-repeat-and-parallelism) configuration to your stage.

```yaml
- stage:
    strategy:
      matrix:
        rubyVersion:
          - 3.2.2
          - 2.7.8
```

2. Reference the matrix variable in the `image` field of your steps.

```yaml
- step:
    type: Run
    name: Ruby Version
    identifier: rubyversion
    spec:
      connectorRef: account.harnessImage
      image: ruby:<+ stage.matrix.rubyVersion >
      shell: Sh
      command: |-
        ruby --version
```

</details>

</TabItem>
</Tabs>

## Full pipeline examples

The following YAML examples describe pipelines that install dependencies, run tests, use caching, and build and push images to Docker Hub.

<Tabs>
  <TabItem value="hosted" label="Harness Cloud" default>

This pipeline uses [Harness Cloud build infrastructure](/docs/continuous-integration/use-ci/set-up-build-infrastructure/use-harness-cloud-build-infrastructure) and [Cache Intelligence](/docs/continuous-integration/use-ci/caching-ci-data/cache-intelligence).

If you copy this example, replace the placeholder values with appropriate values for your connector IDs, account/user names, and repo names. Depending on your project and organization, you may also need to replace `projectIdentifier` and `orgIdentifier`.

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
            key: cache-{{ checksum "Gemfile.lock" }}
            paths:
              - vendor/bundle
          sharedPaths:
            - vendor/bundle
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
                    command: bundle install --path vendor/bundle
              - step:
                  type: Run
                  name: Run Ruby Tests
                  identifier: run_ruby_tests
                  spec:
                    shell: Sh
                    command: bundle exec rake test --junit
                  reports:
                    type: JUnit
                    spec:
                      paths:
                        - report.xml
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

</TabItem>
  <TabItem value="self" label="Self-managed">

This pipeline uses [self-managed Kubernetes cluster build infrastructure](/docs/category/set-up-kubernetes-cluster-build-infrastructures/) and [Save and Restore Cache from S3 steps](/docs/continuous-integration/use-ci/caching-ci-data/saving-cache/).

If you copy this example, replace the placeholder values with appropriate values for your connector IDs, account/user names, repo names, and other settings. Depending on your project and organization, you may also need to replace `projectIdentifier` and `orgIdentifier`.

```yaml
pipeline:
  name: ruby-k8s
  identifier: ruby_k8s
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
          execution:
            steps:
              - step:
                  type: RestoreCacheS3
                  name: Restore Cache From S3
                  identifier: Restore_Cache_From_S3
                  spec:
                    connectorRef: YOUR_AWS_CONNECTOR_ID
                    region: us-east-1 ## Set to your bucket's AWS region
                    bucket: YOUR_AWS_BUCKET_NAME
                    key: cache-{{ checksum "Gemfile.lock" }}
                    archiveFormat: Tar
              - step:
                  type: Run
                  identifier: dependencies
                  name: Dependencies
                  spec:
                    shell: Sh
                    command: bundle install --path vendor/bundle
                    connectorRef: account.harnessImage
                    image: ruby:latest
              - step:
                  type: Run
                  name: Run Ruby Tests
                  identifier: run_ruby_tests
                  spec:
                    shell: Sh
                    command: bundle exec rake test --junit
                    connectorRef: account.harnessImage
                    image: ruby:latest
                  reports:
                    type: JUnit
                    spec:
                      paths:
                        - report.xml
              - step:
                  type: BuildAndPushDockerRegistry
                  name: BuildAndPushDockerRegistry_1
                  identifier: BuildAndPushDockerRegistry_1
                  spec:
                    connectorRef: YOUR_DOCKER_CONNECTOR_ID
                    repo: YOUR_DOCKER_HUB_USERNAME/YOUR_DOCKER_REPO_NAME
                    tags:
                      - <+pipeline.sequenceId>
              - step:
                  type: SaveCacheS3
                  name: Save Cache to S3
                  identifier: Save_Cache_to_S3
                  spec:
                    connectorRef: YOUR_AWS_CONNECTOR_ID
                    region: us-east-1 ## Set to your bucket's AWS region
                    bucket: YOUR_AWS_BUCKET_NAME
                    key: cache-{{ checksum "Gemfile.lock" }}
                    sourcePaths:
                      - vendor/bundle
                    archiveFormat: Tar
          infrastructure:
            type: KubernetesDirect
            spec:
              connectorRef: YOUR_KUBERNETES_CLUSTER_CONNECTOR_ID
              namespace: YOUR_KUBERNETES_NAMESPACE
              automountServiceAccountToken: true
              nodeSelector: {}
              os: Linux
```

</TabItem>
</Tabs>

## Next steps

Now that you have created a pipeline that builds and tests a Ruby app, you could:

- Create [triggers](/docs/category/triggers) to automatically run your pipeline.
- Add steps to [build and upload artifacts](/docs/category/build-push-upload-download).
- Add a step to [build and push an image to a Docker registry](/docs/continuous-integration/use-ci/build-and-upload-artifacts/build-and-push/build-and-push-to-docker-registry).
