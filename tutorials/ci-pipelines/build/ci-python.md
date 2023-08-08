---
sidebar_position: 5
title: Python application
description: Use a CI pipeline to build and test a Python application.
keywords: [Hosted Build, Continuous Integration, Hosted, CI Tutorial]
slug: /ci-pipelines/build/python
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

You can build and test a [Python](https://www.python.org/) application using a Linux platform on [Harness Cloud](/docs/continuous-integration/use-ci/set-up-build-infrastructure/use-harness-cloud-build-infrastructure) or a [self-hosted Kubernetes cluster](/docs/category/set-up-kubernetes-cluster-build-infrastructures/) build infrastructure.

This guide assumes you've created a Harness CI pipeline. For more information about creating pipelines, go to:

* [CI pipeline creation overview](/docs/continuous-integration/use-ci/prep-ci-pipeline-components)
* [Harness Cloud pipeline tutorial](/tutorials/ci-pipelines/fastest-ci)
* [Kubernetes cluster pipeline tutorial](/tutorials/ci-pipelines/build/kubernetes-build-farm)

<CISignupTip />

## Install dependencies

Use [Run steps](/docs/continuous-integration/use-ci/run-ci-scripts/run-step-settings) to install dependencies in the build environment.

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
                      python -m pip install --upgrade pip
                      pip install -r requirements.txt
                    envVariables:
                      PIP_CACHE_DIR: "/root/.cache"
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
                    image: python:latest
                    command: |-
                      python -m pip install --upgrade pip
                      pip install -r requirements.txt
```

```mdx-code-block
</TabItem>
</Tabs>
```

:::tip

[Background steps](/docs/continuous-integration/use-ci/manage-dependencies/background-step-settings) can be used to run dependent services that are needed by steps in the same stage.

:::

## Cache dependencies

Add caching to your stage.

```mdx-code-block
<Tabs>
<TabItem value="Harness Cloud">
```

Cache your Python module dependencies with [Cache Intelligence](/docs/continuous-integration/use-ci/caching-ci-data/cache-intelligence).

Add caching to your `stage.spec`.

```yaml
    - stage:
        spec:
          caching:
            enabled: true
            key: cache-{{ checksum "requirements.txt" }}
            paths:
              - "/root/.cache"
          sharedPaths:
            - /root/.cache
```

```mdx-code-block
</TabItem>
<TabItem value="Self-hosted">
```

With self-hosted build infrastructures, you can:

 * [Save and Restore Cache from S3](/docs/continuous-integration/use-ci/caching-ci-data/saving-cache/)
 * [Save and Restore Cache from GCS](/docs/continuous-integration/use-ci/caching-ci-data/save-cache-in-gcs)

<details>
<summary>Python cache key and path requirements</summary>

Python pipelines typically reference `requirements.txt` in **Save Cache** and **Restore Cache** steps, for example:

```yaml
                  spec:
                    key: cache-{{ checksum "requirements.txt" }}
```

Additionally, `spec.sourcePaths` must include the python cache (typically `/root/.cache`) in the **Save Cache** step, for example:

```yaml
                  spec:
                    sourcePaths:
                      - "/root/.cache"
```

</details>

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
                    key: cache-{{ checksum "requirements.txt" }}
                    archiveFormat: Tar
              - step:
                  type: Run
                    envVariables:
                      PIP_CACHE_DIR: "/root/.cache"
                  ...
              - step:
                  type: SaveCacheS3
                  name: Save Cache to S3
                  identifier: Save_Cache_to_S3
                  spec:
                    connectorRef: AWS_Connector
                    region: us-east-1
                    bucket: your-s3-bucket
                    key: cache-{{ checksum "requirements.txt" }}
                    sourcePaths:
                      - "/root/.cache"
                    archiveFormat: Tar
```

</details>

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
                  name: Test
                  identifier: test
                  spec:
                    shell: Sh
                    command: |-
                      pip install pytest
                      pytest tests.py --junit-xml=report.xml
                    envVariables:
                      PIP_CACHE_DIR: /root/.cache
```

```mdx-code-block
</TabItem>
<TabItem value="Self-hosted">
```

```yaml
              - step:
                  type: Run
                  name: Test
                  identifier: test
                  spec:
                    connectorRef: account.harnessImage
                    image: python:latest
                    shell: Sh
                    command: |-
                      python -m pip install --upgrade pip
                      pip install -r requirements.txt
                      pip install pytest
                      pytest tests.py --junit-xml=report.xml
```

```mdx-code-block
</TabItem>
</Tabs>
```

### Visualize test results

If you want to [view test results in Harness](/docs/continuous-integration/use-ci/set-up-test-intelligence/viewing-tests/), make sure your test commands produce reports in JUnit XML format and that your steps include the `reports` specification.

```yaml
                    reports:
                      type: JUnit
                      spec:
                        paths:
                          - report.xml
```

## Specify version

```mdx-code-block
<Tabs>
<TabItem value="Harness Cloud">
```

Python is pre-installed on Harness Cloud runners. For details about all available tools and versions, go to [Platforms and image specifications](/docs/continuous-integration/use-ci/set-up-build-infrastructure/use-harness-cloud-build-infrastructure#platforms-and-image-specifications).

If your application requires a specific Python version, add a **Run** step to install it.

Use the [setup-python](https://github.com/actions/setup-python) action in a [GitHub Actions step](/docs/continuous-integration/use-ci/use-drone-plugins/ci-github-action-step/) to install the required Python version.

You will need a [personal access token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token), stored as a [secret](/docs/platform/Secrets/add-use-text-secrets), with read-only access for GitHub authentication.

<details>
<summary>Install one Python version</summary>

```yaml
              - step:
                  type: Action
                  name: Install python
                  identifier: installpython
                  spec:
                    uses: actions/setup-python@v4
                    with:
                      python-version: 3.10.10
                      token: <+ secrets.getValue("github_token") >
```

</details>

<details>
<summary>Install multiple Python versions</summary>

1. Add the [matrix looping strategy](/docs/platform/pipelines/looping-strategies-matrix-repeat-and-parallelism/) configuration to your stage.

```yaml
    - stage:
        strategy:
          matrix:
            pythonVersion:
              - 3.11.2
              - 3.10.10
```

2. Reference the matrix variable in your steps.

```yaml
              - step:
                  type: Action
                  name: Install python
                  identifier: installpython
                  spec:
                    uses: actions/setup-python@v4
                    with:
                      python-version: <+ stage.matrix.pythonVersion >
                      token: <+ secrets.getValue("github_token") >
```

</details>

```mdx-code-block
</TabItem>

<TabItem value="Self-hosted">
```

Specify the desired [Python Docker image](https://hub.docker.com/_/python) tag in your steps. There is no need for a separate install step when using Docker.

<details>
<summary>Use a specific Python version</summary>

```yaml
              - step:
                  type: Run
                  name: Python Version
                  identifier: pythonversion
                  spec:
                    connectorRef: account.harnessImage
                    image: python:3.10.10
                    shell: Sh
                    command: |-
                      python --version
```

</details>

<details>
<summary>Use multiple Python versions</summary>

1. Add the [matrix looping strategy](/docs/platform/pipelines/looping-strategies-matrix-repeat-and-parallelism/) configuration to your stage.

```yaml
    - stage:
        strategy:
          matrix:
            pythonVersion:
              - 3.11.2
              - 3.10.10
```

2. Reference the matrix variable in the `image` field of your steps.

```yaml
              - step:
                  type: Run
                  name: Python Version
                  identifier: pythonversion
                  spec:
                    connectorRef: account.harnessImage
                    image: python:<+ stage.matrix.pythonVersion >
                    shell: Sh
                    command: |-
                      python --version
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

This pipeline uses [Harness Cloud build infrastructure](/docs/continuous-integration/use-ci/set-up-build-infrastructure/use-harness-cloud-build-infrastructure) and [Cache Intelligence](/docs/continuous-integration/use-ci/caching-ci-data/cache-intelligence).

If you copy this example, replace the placeholder values with appropriate values for your [code repo connector](/docs/continuous-integration/use-ci/codebase-configuration/create-and-configure-a-codebase/#code-repo-connectors) and repository name. Depending on your project and organization, you may also need to replace `projectIdentifier` and `orgIdentifier`.

<details>
<summary>Pipeline with default Python version</summary>

```yaml
pipeline:
  name: Test a Python app
  identifier: Test_a_Python_app
  projectIdentifier: default
  orgIdentifier: default
  stages:
    - stage:
        name: Test
        identifier: test
        description: ""
        type: CI
        spec:
          cloneCodebase: true
          caching:
            enabled: true
            key: cache-{{ checksum "requirements.txt" }}
            paths:
              - "/root/.cache"
          execution:
            steps:
              - step:
                  type: Run
                  identifier: dependencies
                  name: Dependencies
                  spec:
                    shell: Sh
                    command: |-
                      python -m pip install --upgrade pip
                      pip install -r requirements.txt
                    envVariables:
                      PIP_CACHE_DIR: "/root/.cache"
              - step:
                  type: Run
                  name: Test
                  identifier: test
                  spec:
                    shell: Sh
                    command: |-
                      pip install pytest
                      pytest tests.py --junit-xml=report.xml
                    envVariables:
                      PIP_CACHE_DIR: /root/.cache
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
          sharedPaths:
            - /root/.cache
  properties:
    ci:
      codebase:
        connectorRef: YOUR_CODE_REPO_CONNECTOR_ID
        repoName: YOUR_REPO_NAME
        build: <+input>
```

</details>

<details>
<summary>Pipeline with multiple Python versions</summary>

```yaml
pipeline:
  name: Test a Python app
  identifier: Test_a_Python_app
  projectIdentifier: default
  orgIdentifier: default
  stages:
    - stage:
        name: Test
        identifier: test
        description: ""
        type: CI
        strategy:
          matrix:
            pythonVersion:
              - 3.11.2
              - 3.10.10
        spec:
          cloneCodebase: true
          caching:
            enabled: true
            key: cache-{{ checksum "requirements.txt" }}
            paths:
              - "/root/.cache"
          execution:
            steps:
              - step:
                  type: Action
                  name: Install python
                  identifier: installpython
                  spec:
                    uses: actions/setup-python@v4
                    with:
                      python-version: <+ stage.matrix.pythonVersion >
                      token: <+ secrets.getValue("github_token") >
              - step:
                  type: Run
                  identifier: dependencies
                  name: Dependencies
                  spec:
                    shell: Sh
                    command: |-
                      python -m pip install --upgrade pip
                      pip install -r requirements.txt
                    envVariables:
                      PIP_CACHE_DIR: "/root/.cache"
              - step:
                  type: Run
                  name: Test
                  identifier: test
                  spec:
                    shell: Sh
                    command: |-
                      pip install pytest
                      pytest tests.py --junit-xml=report.xml
                    envVariables:
                      PIP_CACHE_DIR: /root/.cache
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
          sharedPaths:
            - /root/.cache
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

If you copy this example, replace the placeholder values with appropriate values for your [code repo connector](/docs/continuous-integration/use-ci/codebase-configuration/create-and-configure-a-codebase/#code-repo-connectors), [kubernetes cluster connector](/docs/platform/Connectors/Cloud-providers/add-a-kubernetes-cluster-connector), kubernetes namespace, and repository name. Depending on your project and organization, you may also need to replace `projectIdentifier` and `orgIdentifier`.

<details>
<summary>Pipeline with one specific Python version</summary>

Here is a single-stage pipeline, with steps that use Python 3.10.10.

```yaml
pipeline:
  identifier: Test a Python app
  name: Test_a_Python_app
  orgIdentifier: default
  projectIdentifier: default
  stages:
    - stage:
        identifier: default
        name: default
        spec:
          cloneCodebase: true
          execution:
            steps:
              - step:
                  type: Run
                  name: Test
                  identifier: test
                  spec:
                    connectorRef: account.harnessImage
                    image: python:3.10.10
                    shell: Sh
                    command: |-
                      pip install pytest
                      pytest tests.py --junit-xml=report.xml
                    reports:
                      type: JUnit
                      spec:
                        paths:
                          - "report.xml"
          infrastructure:
            type: KubernetesDirect
            spec:
              connectorRef: YOUR_KUBERNETES_CLUSTER_CONNECTOR_ID
              namespace: YOUR_KUBERNETES_NAMESPACE
              automountServiceAccountToken: true
              nodeSelector: {}
              os: Linux
        type: CI
  properties:
    ci:
      codebase:
        connectorRef: YOUR_CODE_REPO_CONNECTOR_ID
        repoName: YOUR_REPO_NAME
        build: <+input>
```

</details>

<details>
<summary>Pipeline with multiple Python versions</summary>

Here is a single-stage pipeline, with a matrix looping strategy for Python versions 3.11.2 and 3.10.10.

```yaml
pipeline:
  identifier: Test a Python app
  name: Test_a_Python_app
  orgIdentifier: default
  projectIdentifier: default
  stages:
    - stage:
        strategy:
          matrix:
            pythonVersion:
              - 3.11.2
              - 3.10.10
        identifier: default
        name: default
        spec:
          cloneCodebase: true
          execution:
            steps:
              - step:
                  type: Run
                  name: Test
                  identifier: test
                  spec:
                    connectorRef: account.harnessImage
                    image: python:<+ stage.matrix.pythonVersion >
                    shell: Sh
                    command: |-
                      python -m pip install --upgrade pip
                      pip install -r requirements.txt
                      pip install pytest
                      pytest tests.py --junit-xml=report.xml
                    reports:
                      type: JUnit
                      spec:
                        paths:
                          - "report.xml"
          infrastructure:
            type: KubernetesDirect
            spec:
              connectorRef: YOUR_KUBERNETES_CLUSTER_CONNECTOR_ID
              namespace: YOUR_KUBERNETES_NAMESPACE
              automountServiceAccountToken: true
              nodeSelector: {}
              os: Linux
        type: CI
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

Now that you have created a pipeline that builds and tests a Python app, you could:

* Create [triggers](/docs/category/triggers) to automatically run your pipeline.
* Add steps to [build and upload artifacts](/docs/category/build-and-upload-artifacts).
* Add a step to [build and push an image to a Docker registry](/docs/continuous-integration/use-ci/build-and-upload-artifacts/build-and-push-to-docker-hub-step-settings/).
* Explore other ways to [optimize and enhance CI pipelines](/docs/continuous-integration/use-ci/optimize-and-more/optimizing-ci-build-times).