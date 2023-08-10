---
sidebar_position: 2
title: Go application
description: Use a CI pipeline to build and test a Go application.
keywords: [Hosted Build, Continuous Integration, Hosted, CI Tutorial]
slug: /ci-pipelines/build/go
---

```mdx-code-block
import CISignupTip from '/tutorials/shared/ci-signup-tip.md';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

<ctabanner
  buttonText="Learn More"
  title="Continue your learning journey."
  tagline="Take a Continuous Integration Certification today!"
  link="/certifications/continuous-integration"
  closable={true}
  target="_self"
/>

You can build and test a [Go](https://go.dev/) application using a Linux platform on [Harness Cloud](/docs/continuous-integration/use-ci/set-up-build-infrastructure/use-harness-cloud-build-infrastructure) or a [self-hosted Kubernetes cluster](/docs/category/set-up-kubernetes-cluster-build-infrastructures/) build infrastructure.

This guide assumes you've created a Harness CI pipeline. For more information about creating pipelines, go to:

* [CI pipeline creation overview](/docs/continuous-integration/use-ci/prep-ci-pipeline-components)
* [Harness Cloud pipeline tutorial](/tutorials/ci-pipelines/fastest-ci)
* [Kubernetes cluster pipeline tutorial](/tutorials/ci-pipelines/build/kubernetes-build-farm)

<CISignupTip />

## Install dependencies

If necessary, add a [Run step](/docs/continuous-integration/use-ci/run-ci-scripts/run-step-settings) to install any dependencies.

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
                      go get example.com/my-go-module
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
                    image: golang:latest
                    command: |-
                      go get example.com/my-go-module
```

```mdx-code-block
</TabItem>
</Tabs>
```

## Cache dependencies

Add caching to your stage.

```mdx-code-block
<Tabs>
<TabItem value="Harness Cloud">
```

Cache your Go module dependencies with [**Cache Intelligence**](/docs/continuous-integration/use-ci/caching-ci-data/cache-intelligence). Add `caching.enabled.true` to your `stage.spec`.

```yaml
    - stage:
        spec:
          caching:
            enabled: true
```

```mdx-code-block
</TabItem>
<TabItem value="Self-hosted">
```

With self-hosted build infrastructures, you can:

 * [Save and Restore Cache from S3](/docs/continuous-integration/use-ci/caching-ci-data/saving-cache/)
 * [Save and Restore Cache from GCS](/docs/continuous-integration/use-ci/caching-ci-data/save-cache-in-gcs)


:::info Go cache key and path requirements

Go pipelines must reference `go.sum` for `spec.key` in **Save Cache** and **Restore Cache** steps, for example:

```yaml
                  spec:
                    key: cache-{{ checksum "go.sum" }}
```

Additionally, `spec.sourcePaths` must include `/go/pkg/mod` and `/root/.cache/go-build` in the **Save Cache** step, for example:

```yaml
                  spec:
                    sourcePaths:
                      - /go/pkg/mod
                      - /root/.cache/go-build
```

:::

<details>
<summary>YAML example: Save and restore cache steps</summary>

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
                    key: cache-{{ checksum "go.sum" }}
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
                    key: cache-{{ checksum "go.sum" }}
                    sourcePaths:
                      - /go/pkg/mod
                      - /root/.cache/go-build
                    archiveFormat: Tar
```

</details>


```mdx-code-block
</TabItem>
</Tabs>
```

## Build and run tests

Add [**Run**](/docs/continuous-integration/use-ci/run-ci-scripts/run-step-settings/) steps to build and run your tests.

```mdx-code-block
<Tabs>
<TabItem value="Harness Cloud">
```

```yaml
              - step:
                  type: Run
                  identifier: build
                  name: Build
                  spec:
                    shell: Sh
                    command: |-
                      go build
              - step:
                  type: Run
                  identifier: test
                  name: Test
                  spec:
                    shell: Sh
                    command: |-
                      go test -v ./...
```

```mdx-code-block
</TabItem>
<TabItem value="Self-hosted">
```

```yaml
              - step:
                  type: Run
                  identifier: build
                  name: Build
                  spec:
                    connectorRef: account.harnessImage
                    image: golang:latest
                    command: |-
                      go build
              - step:
                  type: Run
                  identifier: test
                  name: Test
                  spec:
                    connectorRef: account.harnessImage
                    image: golang:latest
                    command: |-
                      go test -v ./...
```

```mdx-code-block
</TabItem>
</Tabs>
```

### Visualize test results

You can [view test results](/docs/continuous-integration/use-ci/set-up-test-intelligence/viewing-tests/) on the **Tests** tab of your pipeline executions. Test results must be in JUnit XML format.

You can use [go-junit-report](https://github.com/jstemmer/go-junit-report) to output compatible JUnit XML reports.

For your pipeline to produce test reports, you need to modify the **Run** step that runs your tests. Make sure the `command` generates JUnit XML reports and add the `reports` specification.

```mdx-code-block
<Tabs>
<TabItem value="Harness Cloud">
```

```yaml
              - step:
                  type: Run
                  identifier: test
                  name: Test
                  spec:
                    shell: Sh
                    command: |-
                      export PATH=$(go env GOPATH)/bin:$PATH
                      go install github.com/jstemmer/go-junit-report/v2@latest
                      go test -v ./... | tee report.out
                      cat report.out | go-junit-report -set-exit-code > report.xml
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
                  identifier: test
                  name: Test
                  spec:
                    connectorRef: account.harnessImage
                    image: golang
                    command: |-
                      go install github.com/jstemmer/go-junit-report/v2@latest
                      go test -v ./... | tee report.out
                      cat report.out | go-junit-report -set-exit-code > report.xml
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

## Specify version

```mdx-code-block
<Tabs>
<TabItem value="Harness Cloud">
```

Go is pre-installed on Hosted Cloud runners. For details about all available tools and versions, go to [Platforms and image specifications](/docs/continuous-integration/use-ci/set-up-build-infrastructure/use-harness-cloud-build-infrastructure#platforms-and-image-specifications).

If your application requires a specific version of Go, add a **Run** step to install it.

<details>
<summary>Install a specific version of Go</summary>

```yaml
              - step:
                  type: Run
                  identifier: installgo
                  name: Install Go
                  spec:
                    shell: Sh
                    # install version 1.20 of Go
                    command: |-
                      export PATH=$(go env GOPATH)/bin:$PATH
                      go install golang.org/dl/go1.20@latest
                      go1.20 download
```

</details>

<details>
<summary>Install multiple versions of Go</summary>

1. Add the [matrix looping strategy](/docs/platform/pipelines/looping-strategies-matrix-repeat-and-parallelism/) configuration to your stage.

```yaml
        strategy:
          matrix:
            # matrix strategy with Go versions 1.19 and 1.20
            goVersion:
              - "1.19"
              - "1.20"
```

2. Reference the matrix variable in your steps.

```yaml
              - step:
                  type: Run
                  identifier: installgo
                  name: Install Go
                  spec:
                    shell: Sh
                    command: |-
                      export PATH=$(go env GOPATH)/bin:$PATH
                      go install golang.org/dl/go<+matrix.goVersion>@latest
                      go<+matrix.goVersion> download
```

</details>

```mdx-code-block
</TabItem>
<TabItem value="Self-hosted">
```

Specify the desired [Golang Docker image](https://hub.docker.com/_/golang) tag in your steps. There is no need for a separate install step when using Docker.

<details>
<summary>Build using a specific version of Go</summary>

```yaml
              - step:
                  type: Run
                  identifier: build
                  name: Build
                  spec:
                    connectorRef: account.harnessImage
                    # use version 1.20 of Go
                    image: golang:1.20
                    command: |-
                      go build
```

</details>


<details>
<summary>Build using multiple versions of Go</summary>

1. Add the [matrix looping strategy](/docs/platform/pipelines/looping-strategies-matrix-repeat-and-parallelism/) configuration to your stage.

```yaml
        strategy:
          matrix:
            # matrix strategy with Go versions 1.19 and 1.20
            goVersion:
              - "1.19"
              - "1.20"
```

2. Reference the matrix variable in the `image` field of your steps.

```yaml
              - step:
                  type: Run
                  identifier: build
                  name: Build
                  spec:
                    connectorRef: account.harnessImage
                    image: golang:<+matrix.goVersion>
                    command: |-
                      go build
```

</details>

```mdx-code-block
</TabItem>
</Tabs>
```

## Full pipeline examples

The following full pipeline examples are based on the partial examples above.

```mdx-code-block
<Tabs>
<TabItem value="Harness Cloud">
```

If you copy this example, replace the placeholder values with appropriate values for your [code repo connector](/docs/continuous-integration/use-ci/codebase-configuration/create-and-configure-a-codebase/#code-repo-connectors) and repository name. Depending on your project and organization, you may also need to replace `projectIdentifier` and `orgIdentifier`.

<details>
<summary>Pipeline with one specific Go version</summary>

Here is a single-stage pipeline using cache intelligence, with steps to install Go 1.20, build and test.

```yaml
pipeline:
  name: Build and test Go app
  identifier: Build_and_test_Go_app
  projectIdentifier: default
  orgIdentifier: default
  stages:
    - stage:
        name: Build
        identifier: Build
        type: CI
        spec:
          caching:
            enabled: true
          cloneCodebase: true
          execution:
            steps:
              - step:
                  type: Run
                  identifier: installgo
                  name: Install Go
                  spec:
                    shell: Sh
                    command: |-
                      export PATH=$(go env GOPATH)/bin:$PATH
                      go install golang.org/dl/go1.20@latest
                      go1.20 download
              - step:
                  type: Run
                  identifier: build
                  name: Build
                  spec:
                    shell: Sh
                    command: |-
                      export PATH=$(go env GOPATH)/bin:$PATH
                      go1.20 build
              - step:
                  type: Run
                  identifier: test
                  name: Test
                  spec:
                    shell: Sh
                    command: |-
                      export PATH=$(go env GOPATH)/bin:$PATH
                      go1.20 install github.com/jstemmer/go-junit-report/v2@latest
                      go1.20 test -v | tee report.out
                      cat report.out | go-junit-report -set-exit-code > report.xml
                    reports:
                      type: JUnit
                      spec:
                        paths:
                          - report.xml
          platform:
            os: Linux
            arch: Amd64
          runtime:
            type: Cloud
            spec: {}
  properties:
    ci:
      codebase:
        connectorRef: YOUR_CODE_REPO_CONNECTOR_ID
        repoName: YOUR_REPO_NAME
        build: <+input>
```

</details>

<details>
<summary>Pipeline with multiple Go versions</summary>

Here is a single-stage pipeline using cache intelligence, with a matrix looping strategy for Go versions 1.19 and 1.20.

```yaml
pipeline:
  name: Build and test Go app
  identifier: Build_and_test_Go_app
  projectIdentifier: default
  orgIdentifier: default
  stages:
    - stage:
        name: Build
        identifier: Build
        type: CI
        strategy:
          matrix:
            goVersion:
              - "1.19"
              - "1.20"
        spec:
          caching:
            enabled: true
          cloneCodebase: true
          execution:
            steps:
              - step:
                  type: Run
                  identifier: installgo
                  name: Install Go
                  spec:
                    shell: Sh
                    command: |-
                      export PATH=$(go env GOPATH)/bin:$PATH
                      go install golang.org/dl/go<+matrix.goVersion>@latest
                      go<+matrix.goVersion> download
              - step:
                  type: Run
                  identifier: build
                  name: Build
                  spec:
                    shell: Sh
                    command: |-
                      export PATH=$(go env GOPATH)/bin:$PATH
                      go<+matrix.goVersion> build
              - step:
                  type: Run
                  name: Test
                  identifier: test
                  spec:
                    shell: Sh
                    command: |-
                      export PATH=$(go env GOPATH)/bin:$PATH
                      go<+matrix.goVersion> install github.com/jstemmer/go-junit-report/v2@latest
                      go<+matrix.goVersion> test -v ./... | tee report_<+matrix.goVersion>.out
                      cat report_<+matrix.goVersion>.out | go-junit-report -set-exit-code > report_<+matrix.goVersion>.xml
                    reports:
                      type: JUnit
                      spec:
                        paths:
                          - report_*.xml
          platform:
            os: Linux
            arch: Amd64
          runtime:
            type: Cloud
            spec: {}
  properties:
    ci:
      codebase:
        connectorRef: YOUR_CODE_REPO_CONNECTOR_ID
        repoName: YOUR_REPO_NAME
        build: <+input>
```

</details>

```mdx-code-block
</TabItem>
<TabItem value="Self-hosted">
```

If you copy this example, replace the placeholder values with appropriate values for your [code repo connector](/docs/continuous-integration/use-ci/codebase-configuration/create-and-configure-a-codebase/#code-repo-connectors), [Kubernetes cluster connector](/docs/platform/Connectors/Cloud-providers/add-a-kubernetes-cluster-connector), Kubernetes namespace, and repository name. Depending on your project and organization, you may also need to replace `projectIdentifier` and `orgIdentifier`.

<details>
<summary>Pipeline with one specific Go version</summary>

Here is a single-stage pipeline, with steps to install Go 1.20, build and test.

```yaml
pipeline:
  name: Build and test Go app
  identifier: Build_and_test_Go_app
  projectIdentifier: default
  orgIdentifier: default
  stages:
    - stage:
        name: Build
        identifier: Build
        type: CI
        spec:
          cloneCodebase: true
          execution:
            steps:
              - step:
                  type: Run
                  identifier: build
                  name: Build
                  spec:
                    connectorRef: account.harnessImage
                    image: golang:1.20
                    command: |-
                      go build
              - step:
                  type: Run
                  identifier: test
                  name: Test
                  spec:
                    connectorRef: account.harnessImage
                    image: golang:1.20
                    command: |-
                      go install github.com/jstemmer/go-junit-report/v2@latest
                      go test -v ./... | tee report.out
                      cat report.out | go-junit-report -set-exit-code > report.xml
                    reports:
                      type: JUnit
                      spec:
                        paths:
                          - report.xml
          infrastructure:
            spec:
              connectorRef: YOUR_KUBERNETES_CONNECTOR_ID
              namespace: YOUR_KUBERNETES_NAMESPACE
            type: KubernetesDirect
          platform:
            arch: Amd64
            os: Linux
  properties:
    ci:
      codebase:
        connectorRef: YOUR_CODE_REPO_CONNECTOR_ID
        repoName: YOUR_REPO_NAME
        build: <+input>
```

</details>

<details>
<summary>Pipeline with multiple Go versions</summary>

Here is a single-stage pipeline, with a matrix looping strategy for Go versions 1.19 and 1.20.

```yaml
pipeline:
  name: Build and test Go app
  identifier: Build_and_test_Go_app
  projectIdentifier: default
  orgIdentifier: default
  stages:
    - stage:
        name: Build
        identifier: Build
        type: CI
        strategy:
          matrix:
            goVersion:
              - "1.19"
              - "1.20"
        spec:
          cloneCodebase: true
          execution:
            steps:
              - step:
                  type: Run
                  identifier: build
                  name: Build
                  spec:
                    connectorRef: account.harnessImage
                    image: golang:<+matrix.goVersion>
                    command: |-
                      go build
              - step:
                  type: Run
                  name: Test
                  identifier: test
                  spec:
                    connectorRef: account.harnessImage
                    image: golang:<+matrix.goVersion>
                    command: |-
                      go install github.com/jstemmer/go-junit-report/v2@latest
                      go test -v ./... | tee report_<+matrix.goVersion>.out
                      cat report_<+matrix.goVersion>.out | go-junit-report -set-exit-code > report_<+matrix.goVersion>.xml
                    reports:
                      type: JUnit
                      spec:
                        paths:
                          - report_*.xml
          infrastructure:
            spec:
              connectorRef: YOUR_KUBERNETES_CLUSTER_CONNECTOR_ID
              namespace: YOUR_KUBERNETES_NAMESPACE
            type: KubernetesDirect
          platform:
            arch: Amd64
            os: Linux
  properties:
    ci:
      codebase:
        connectorRef: YOUR_CODE_REPO_CONNECTOR_ID
        repoName: YOUR_REPO_NAME
        build: <+input>
```

</details>

```mdx-code-block
</TabItem>
</Tabs>
```

## Next steps

Now that you have created a pipeline that builds and tests a Go app, you could:

* Create [triggers](/docs/category/triggers) to automatically run your pipeline.
* Add steps to [build and upload artifacts](/docs/category/build-and-upload-artifacts).
* Add a step to [build and push an image to a Docker registry](/docs/continuous-integration/use-ci/build-and-upload-artifacts/build-and-push-to-docker-hub-step-settings/).
