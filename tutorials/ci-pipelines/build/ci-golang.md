---
sidebar_position: 5
title: Build and test a Go app
description: Use a CI pipeline to build and test a Go application.
keywords: [Hosted Build, Continuous Integration, Hosted, CI Tutorial]
slug: /ci-pipelines/build/golang
---

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

# Build and test a Go app

Build and test a [Go](https://go.dev/) application using a Linux platform on [Harness Cloud build infrastructure](/docs/continuous-integration/use-ci/set-up-build-infrastructure/use-harness-cloud-build-infrastructure), or on a [self-hosted Kubernetes cluster](/docs/category/set-up-kubernetes-cluster-build-infrastructures/).

## Create pipeline

1. Under **Project Setup**, select **Get Started**.
2. Select your Go application repository from the repository list.
3. Select **Generate my Pipeline configuration**, then select **Create Pipeline**.
4. Select **YAML** to switch to the YAML editor.

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
                    connectorRef: [your-docker-connector-ID] # replace with your connector ID
                    image: golang
                    command: |-
                      go build
              - step:
                  type: Run
                  identifier: test
                  name: Test
                  spec:
                    connectorRef: [your-docker-connector-ID] # replace with your connector ID
                    image: golang
                    command: |-
                      go test -v ./...
```

```mdx-code-block
</TabItem>
</Tabs>
```

## Install dependencies

If necessary, add a **Run** step to install any dependencies.

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
                    connectorRef: [your-docker-connector-ID] # replace with your connector ID
                    image: golang
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

Cache your Go module dependencies with [**Cache Intelligence**](/docs/continuous-integration/use-ci/caching-ci-data/cache-intelligence).

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

See [Save and Restore Cache from S3](/docs/continuous-integration/use-ci/caching-ci-data/saving-cache/) or [Save and Restore Cache from GCS](/docs/continuous-integration/use-ci/caching-ci-data/save-cache-in-gcs).

```mdx-code-block
</TabItem>
</Tabs>
```

## Visualize test results

Test results can be [viewed](/docs/continuous-integration/use-ci/set-up-test-intelligence/viewing-tests/) in the **Tests** tab in your pipeline execution. Test results must be in JUnit XML format.

[go-junit-report](https://github.com/jstemmer/go-junit-report) can be used to output compatible JUnit XML reports.

Modify your test step to generate the JUnit XML, and add the reports path.

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
                      go install github.com/jstemmer/go-junit-report/v2@latest
                      go test -v ./... | tee report.out
                      cat report.out | $HOME/go/bin/go-junit-report -set-exit-code > report.xml
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
                    connectorRef: [your-docker-connector-ID] # replace with your connector ID
                    image: golang
                    command: |-
                      go install github.com/jstemmer/go-junit-report/v2@latest
                      go test -v ./... | tee report.out
                      cat report.out | $GOPATH/bin/go-junit-report -set-exit-code > report.xml
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

Hosted Cloud runners come with Go pre-installed, see [Platforms and image specifications](/docs/continuous-integration/use-ci/set-up-build-infrastructure/use-harness-cloud-build-infrastructure#platforms-and-image-specifications) for all available tools and versions.

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
                      export GOPATH=$HOME/go
                      go install golang.org/dl/go1.20@latest
                      $GOPATH/bin/go1.20 download
```

</details>

<details>
<summary>Install multiple versions of Go</summary>

Add the [matrix looping strategy](/docs/platform/pipelines/looping-strategies-matrix-repeat-and-parallelism/) configuration to your stage.

```yaml
        strategy:
          matrix:
            # matrix strategy with Go versions 1.19 and 1.20
            goVersion:
              - "1.19"
              - "1.20"
```

Reference the matrix variable in your steps.

```yaml
              - step:
                  type: Run
                  identifier: installgo
                  name: Install Go
                  spec:
                    shell: Sh
                    command: |-
                      export GOPATH=$HOME/go
                      go install golang.org/dl/go<+matrix.goVersion>@latest
                      $GOPATH/bin/go<+matrix.goVersion> download
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
                    connectorRef: [your-docker-connector-ID] # replace with your connector ID
                    # use version 1.20 of Go
                    image: golang:1.20
                    command: |-
                      go build
```

</details>



<details>
<summary>Build using multiple versions of Go</summary>

Add the [matrix looping strategy](/docs/platform/pipelines/looping-strategies-matrix-repeat-and-parallelism/) configuration to your stage.

```yaml
        strategy:
          matrix:
            # matrix strategy with Go versions 1.19 and 1.20
            goVersion:
              - "1.19"
              - "1.20"
```

Reference the matrix variable in the `image` field of your steps.

```yaml
              - step:
                  type: Run
                  identifier: build
                  name: Build
                  spec:
                    connectorRef: [your-docker-connector-ID] # replace with your connector ID
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

Full pipeline examples based on the steps above.

```mdx-code-block
<Tabs>
<TabItem value="Harness Cloud">
```

Replace the bracketed values with corresponding values for your [code repo connector](/docs/continuous-integration/use-ci/codebase-configuration/create-and-configure-a-codebase/#code-repo-connectors) and repository name.

Depending on your project and organization, you may also need to replace `projectIdentifier` and `orgIdentifier`.

<details>
<summary>Use a specific Go version</summary>

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
                      export GOPATH=$HOME/go
                      go install golang.org/dl/go1.20@latest
                      $GOPATH/bin/go1.20 download
              - step:
                  type: Run
                  identifier: build
                  name: Build
                  spec:
                    shell: Sh
                    command: |-
                      export GOPATH=$HOME/go
                      $GOPATH/bin/go1.20 build
              - step:
                  type: Run
                  identifier: test
                  name: Test
                  spec:
                    shell: Sh
                    command: |-
                      export GOPATH=$HOME/go
                      $GOPATH/bin/go1.20 install github.com/jstemmer/go-junit-report/v2@latest
                      $GOPATH/bin/go1.20 test -v | tee report.out
                      cat report.out | $GOPATH/bin/go-junit-report -set-exit-code > report.xml
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
        connectorRef: [your-code-repo-connector-ID] # replace with your connector ID
        repoName: [your-repository-name] # replace with your repository name
        build: <+input>
```

</details>

<details>
<summary>Use multiple Go versions</summary>

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
                      export GOPATH=$HOME/go
                      go install golang.org/dl/go<+matrix.goVersion>@latest
                      $GOPATH/bin/go<+matrix.goVersion> download
              - step:
                  type: Run
                  identifier: build
                  name: Build
                  spec:
                    shell: Sh
                    command: |-
                      export GOPATH=$HOME/go
                      $GOPATH/bin/go<+matrix.goVersion> build
              - step:
                  type: Run
                  name: Test
                  identifier: test
                  spec:
                    shell: Sh
                    command: |-
                      export GOPATH=$HOME/go
                      $GOPATH/bin/go<+matrix.goVersion> install github.com/jstemmer/go-junit-report/v2@latest
                      $GOPATH/bin/go<+matrix.goVersion> test -v ./... | tee report_<+matrix.goVersion>.out
                      cat report_<+matrix.goVersion>.out | $GOPATH/bin/go-junit-report -set-exit-code > report_<+matrix.goVersion>.xml
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
        connectorRef: [your-code-repo-connector-ID] # replace with your connector ID
        repoName: [your-repository-name] # replace with your repository name
        build: <+input>
```

</details>

```mdx-code-block
</TabItem>

<TabItem value="Self-hosted">
```

Replace the bracketed values with corresponding values for your [code repo connector](/docs/continuous-integration/use-ci/codebase-configuration/create-and-configure-a-codebase/#code-repo-connectors), [kubernetes cluster connector](/docs/platform/Connectors/Cloud-providers/add-a-kubernetes-cluster-connector), kubernetes namespace, and repository name.

Depending on your project and organization, you may also need to replace `projectIdentifier` and `orgIdentifier`.

<details>
<summary>Use a specific Go version</summary>

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
                    connectorRef: [your-docker-connector-ID] # replace with your connector ID
                    image: golang:1.20
                    command: |-
                      go build
              - step:
                  type: Run
                  identifier: test
                  name: Test
                  spec:
                    connectorRef: [your-docker-connector-ID] # replace with your connector ID
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
              connectorRef: [your-kube-connector-ID] # replace with your connector ID
              namespace: [your-kube-namespace] # replace with your namespace
            type: KubernetesDirect
          platform:
            arch: Amd64
            os: Linux
  properties:
    ci:
      codebase:
        connectorRef: [your-code-repo-connector-ID] # replace with your connector ID
        repoName: [your-repository-name] # replace with your repository name
        build: <+input>
```

</details>

<details>
<summary>Use multiple Go versions</summary>

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
                    connectorRef: [your-docker-connector-ID] # replace with your connector ID
                    image: golang:<+matrix.goVersion>
                    command: |-
                      go build
              - step:
                  type: Run
                  name: Test
                  identifier: test
                  spec:
                    connectorRef: [your-docker-connector-ID] # replace with your connector ID
                    image: golang:<+matrix.goVersion>
                    command: |-
                      go install github.com/jstemmer/go-junit-report/v2@latest
                      go test -v ./... | tee report_<+matrix.goVersion>.out
                      cat report_<+matrix.goVersion>.out | $GOPATH/bin/go-junit-report -set-exit-code > report_<+matrix.goVersion>.xml
                    reports:
                      type: JUnit
                      spec:
                        paths:
                          - report_*.xml
          infrastructure:
            spec:
              connectorRef: [your-kube-connector-ID] # replace with your connector ID
              namespace: [your-kube-namespace] # replace with your namespace
            type: KubernetesDirect
          platform:
            arch: Amd64
            os: Linux
  properties:
    ci:
      codebase:
        connectorRef: [your-code-repo-connector-ID] # replace with your connector ID
        repoName: [your-repository-name] # replace with your repository name
        build: <+input>
```

</details>

```mdx-code-block
</TabItem>
</Tabs>
```

## Next steps

Create [triggers](https://developer.harness.io/docs/category/triggers) to execute your pipeline.

Learn how to [build and upload artifacts](/docs/category/build-and-upload-artifacts), or how to [build and push an image to a Docker registry](/docs/continuous-integration/use-ci/build-and-upload-artifacts/build-and-push-to-docker-hub-step-settings/).