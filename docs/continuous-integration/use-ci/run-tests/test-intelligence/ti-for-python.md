---
title: Enable TI for Python
description: Set up TI for Python codebases.
sidebar_position: 40
---


## View test reports and test selection

For information about test reports for Test Intelligence, go to [View tests](../viewing-tests.md).

## Troubleshooting TI for Python

If you encounter errors with TI for Python, make sure you have met the following requirements:

* Your project is written in Python 3, and your repo is a pure Python 3 repo.
* You don't use resource file relationships. TI for Python doesn't support resource file relationships.
* You don't use dynamic loading and metaclasses. TI for Python might miss tests or changes in repos that use dynamic loading or metaclasses.
* Your [Build Tool](#build-tool) is pytest or unittest.
* The Python 3 binary is preinstalled on the build machine, available in the specified [Container Registry and Image](#container-registry-and-image), or installed at runtime in [Pre-Command](#pre-command).
* If you use another command, such as `python`, to invoke Python 3, you have added an alias, such as `python3 = "python"`.

If you get errors related to code coverage for Python:

* If you included [Build Arguments](#build-arguments), these don't need coverage flags (`--cov` or `coverage`).
* You don't need to install coverage tools in [Pre-Command](#pre-command).






## Pipeline YAML examples

```mdx-code-block
<Tabs>
  <TabItem value="cloud" label="Harness Cloud" default>
```

This example shows a pipeline that uses Harness Cloud build infrastructure and runs tests on Python with pytest and Test Intelligence.

```yaml
pipeline:
  name: Test Intelligence Demo
  identifier: testintelligencedemo
  projectIdentifier: default
  orgIdentifier: default
  properties:
    ci:
      codebase:
        build: <+input>
        connectorRef: YOUR_CODEBASE_CONNECTOR_ID
  stages:
    - stage:
        type: CI
        identifier: Build_and_Test
        name: Build and Test
        spec:
          cloneCodebase: true
          execution:
            steps:
              - step:
                  type: RunTests
                  name: Run Python Tests
                  identifier: Run_Python_Tests
                  spec:
                    language: Python
                    buildTool: Pytest ## Specify pytest or unittest
                    args: "--junitxml=out_report.xml" ## Optional.
                    runOnlySelectedTests: true  ## Set to false if you don't want to use TI.
                    preCommand: |
                      python3 -m venv .venv
                      . .venv/bin/activate

                      python3 -m  pip install pytest
                      python3 -m pip install coverage
                      python3 -m pip install -r requirements/dev.txt
                      python3 -m pip install -e .
                    reports: ## Optional.
                      type: JUnit
                      spec:
                        paths:
                          - out_report.xml*
                    envVariables:
                      PYTHONPATH: /harness ## Exclude if not applicable.
          platform:
            arch: Amd64
            os: Linux
          runtime:
            spec: {}
            type: Cloud
```

```mdx-code-block
  </TabItem>
  <TabItem value="sh" label="Self-hosted">
```

This example shows a pipeline that uses a Kubernetes cluster build infrastructure and runs tests on Python with pytest and Test Intelligence.

```yaml
pipeline:
  name: Test Intelligence Demo
  identifier: testintelligencedemo
  projectIdentifier: default
  orgIdentifier: default
  properties:
    ci:
      codebase:
        build: <+input>
        connectorRef: YOUR_CODEBASE_CONNECTOR_ID
  stages:
    - stage:
        type: CI
        identifier: Build_and_Test
        name: Build and Test
        spec:
          cloneCodebase: true
          execution:
            steps:
              - step:
                  type: RunTests
                  name: Run Python Tests
                  identifier: Run_Python_Tests
                  spec:
                    connectorRef: account.harnessImage ## Specify if required by your build infrastructure.
                    image: python:latest ## Specify if required by your build infrastructure.
                    language: Python
                    buildTool: Pytest ## Specify pytest or unittest.
                    args: "--junitxml=out_report.xml" ## Optional.
                    runOnlySelectedTests: true  ## Set to false if you don't want to use TI.
                    preCommand: |
                      python3 -m venv .venv
                      . .venv/bin/activate

                      python3 -m  pip install pytest
                      python3 -m pip install coverage
                      python3 -m pip install -r requirements/dev.txt
                      python3 -m pip install -e .
                    reports: ## Optional.
                      type: JUnit
                      spec:
                        paths:
                          - out_report.xml*
                    envVariables:
                      PYTHONPATH: /harness ## Exclude if not applicable.
          infrastructure:
            type: KubernetesDirect
            spec:
              connectorRef: YOUR_KUBERNETES_CLUSTER_CONNECTOR_ID
              namespace: YOUR_KUBERNETES_NAMESPACE
              automountServiceAccountToken: true
              nodeSelector: {}
              os: Linux
```

```mdx-code-block
  </TabItem>
</Tabs>
```