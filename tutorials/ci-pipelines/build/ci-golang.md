---
sidebar_position: 5
title: Build and test a Go app
description: Use a CI pipeline to build and test a Go application.
keywords: [Hosted Build, Continuous Integration, Hosted, CI Tutorial]
slug: /ci-pipelines/build/golang
---

# Build and test a Go app

Build and test a [Go](https://go.dev/) application using a Linux platform on [Harness Cloud build infrastructure](/docs/continuous-integration/use-ci/set-up-build-infrastructure/use-harness-cloud-build-infrastructure).

## Create pipeline

1. Under **Project Setup**, select **Get Started**.
2. Select your Go application repository from the repository list.
3. Select **Generate my Pipeline configuration**, then select **Create Pipeline**.
4. You will see the visual pipeline editor with a stage named **Build** with a step named **Echo Welcome Message**.
5. Select **YAML** to switch to the YAML editor.

## Install dependencies

Add a [**Run**](/docs/continuous-integration/use-ci/run-ci-scripts/run-step-settings/) step to install any necessary dependencies with `go get`.

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

## Cache dependencies

Cache your Go module dependencies with [**Cache Intelligence**](/docs/continuous-integration/use-ci/caching-ci-data/cache-intelligence).

Add caching to your stage.

```yaml
    - stage:
        spec:
          caching:
            enabled: true
```

## Build and run tests

Add **Run** steps to build and run your tests.

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

## Visualize test results

Test results can be [viewed](/docs/continuous-integration/use-ci/set-up-test-intelligence/viewing-tests/) in the **Tests** tab in your pipeline execution. Test results must be in JUnit XML format.

[go-junit-report](https://github.com/jstemmer/go-junit-report) can be used to output compatible JUnit XML reports.

Modify your test step to generate the JUnit XML, and add the reports path.

```yaml
              - step:
                  type: Run
                  identifier: test
                  name: Test
                  spec:
                    shell: Sh
                    command: |-
                      go install github.com/jstemmer/go-junit-report/v2@latest
                      go test -v ./...
                      cat report.out | go-junit-report -set-exit-code > report.xml
                    reports:
                      type: JUnit
                      spec:
                        paths:
                          - report.xml
```

## Specify version

Hosted CI runners come with Go pre-installed, see [Platforms and image specifications](/docs/continuous-integration/use-ci/set-up-build-infrastructure/use-harness-cloud-build-infrastructure#platforms-and-image-specifications).

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

To install multiple versions of Go, use a [matrix looping strategy](/docs/platform/pipelines/looping-strategies-matrix-repeat-and-parallelism/) in your stage.

<details>
<summary>Install multiple versions of Go</summary>

Add the matrix strategy configuration to your stage.

```yaml
        strategy:
          matrix:
            # matrix strategy with Go versions 1.19 and 1.20
            goVersion:
              - "1.19"
              - "1.20"
```

Add a **Run** step to install Go.

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

## Full pipeline examples

Full pipeline examples based on the steps above.

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
<summary>Use multiple versions of Go</summary>

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

## Next steps

Learn how to publish your Go binary to various artifact repositories with our [Build and upload artifacts](/docs/category/build-and-upload-artifacts) documentation.