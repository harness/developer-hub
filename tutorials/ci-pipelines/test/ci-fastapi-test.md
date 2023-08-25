---
sidebar_position: 4
description: Use Harness CI to run automated tests in a FastAPI project.
keywords: [Continuous Integration, CI Tutorial, FastAPI, Testing, Run Tests]
title: Test a FastAPI project
slug: /ci-pipelines/test/fastapi
---

```mdx-code-block
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

[FastAPI](https://fastapi.tiangolo.com/) is a modern and highly performant web framework that you can use to build APIs in Python 3.7+ using standard Python type hints. In this tutorial, you'll use Harness CI to automatically run tests on your FastAPI project when changes are pushed to a specific branch of your code repository.

## Prerequisites

You need the following for this tutorial:

* Knowledge of Python, FastAPI, Git, and GitHub.
* [A GitHub account](https://github.com/join).
* [A Harness account](https://app.harness.io/).

```mdx-code-block
import CISignupTip from '/tutorials/shared/ci-signup-tip.md';
```

<CISignupTip />

## Prepare the codebase

1. Fork the [fastapi-harness-sample repository](https://github.com/harness-community/fastapi-harness-sample) into your GitHub account.
2. In Harness, [create a project](/docs/platform/organizations-and-projects/create-an-organization#create-a-project) or select an existing project, and then go to the CI module.
3. Select **Connectors** under **Project Setup**.
4. Select **New Connector**, and select **GitHub** under **Code Repositories**.
5. Configure the [GitHub connector settings](/docs/platform/Connectors/Code-Repositories/ref-source-repo-provider/git-hub-connector-settings-reference) so that the connector can access your fork of the sample repo.

The sample repo has a simple FastAPI project and unit tests. Notable files include:

* `fastapi-todo-tests/requirements.txt`: Contains a list of project dependencies.
* `fastapi-todo-tests/app/main.py`: The sample FastAPI project builds a "To Do" list. It has three API endpoints, one that creates tasks, one that deletes tasks, and one that gets the task list.
* `fastapi-todo-tests/test_main.py`: Defines three test cases.

<details><summary>Optional exercise: Local set up</summary>

Optionally, you can build the project and test it locally before running tests in a Harness CI pipeline.

1. Make sure you have [Python/Python3](https://www.python.org/downloads/) and [Uvicorn](https://www.uvicorn.org/) installed on your local machine.
2. Clone the FastAPI sample repo to your local machine.

   The sample repo should have the following structure:

   ```
   ├── .harness
   │   ├── Pipeline.yaml
   ├── app
   │   ├── main.py
   │   ├── schemas.py
   │   ├── util.py
   │   ├── __init__.py
   ├── LICENSE
   ├── README.md
   ├── requirements.txt
   └── test_main.py
   ```

3. Create a virtual environment named `test-env`.

   * Linux or macOS: `python3 -m venv test-env`
   * Windows: `python -m venv test-env`

4. Activate the virtual environment.

   * Linux or macOS: `source test-env/bin/activate`
   * Windows: `.\test-env\Scripts\activate`

5. Install dependencies.

   ```bash
   cd <project root>
   pip install -r requirements.txt
   ```

6. Run tests defined in `test_main.py`.

   ```bash
   pytest
   ```

7. Start the development server.

   ```bash
   uvicorn app.main:app --reload
   ```

8. Navigate to `localhost:8000/docs` on your browser to access the local server test environment.

</details>

## Prepare the pipeline

These steps summarize pipeline creation. For more information, go to [CI pipeline creation overview](/docs/continuous-integration/use-ci/prep-ci-pipeline-components).

1. In your Harness project, go to the CI module.
2. Select **Pipelines**, and then select **Create a Pipeline**.
3. Enter a **Name** and select **Start**.
4. Add a **Build** (`CI`) stage.

### Add the Build stage and infrastructure

```mdx-code-block
<Tabs>
  <TabItem value="Visual" label="Visual" default>
```

1. Select **Add Stage**, and select the **Build** stage.
2. Enter a **Stage Name**, such as `Test FastAPI`.
3. For **Connector**, select the GitHub connector you created earlier in [Prepare the codebase](#prepare-the-codebase).
4. Select **Set Up Stage**.
5. In the **Build** stage, select the **Infrastructure** tab, and [set up your build infrastructure](/docs/category/set-up-build-infrastructure).

```mdx-code-block
  </TabItem>
  <TabItem value="YAML" label="YAML">
```

In the Pipeline Studio's YAML editor, add a `CI` stage and [set up your build infrastructure](/docs/category/set-up-build-infrastructure).

For example, this CI stage uses Harness Cloud build infrastructure:

```yaml
    - stage:
        name: test
        identifier: test
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
            ...
```

And this CI stage uses a Kubernetes cluster build infrastructure:

```yaml
    - stage:
        name: test
        identifier: test
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
            ...
```

```mdx-code-block
  </TabItem>
</Tabs>
```

### Install dependencies

Add a [Run step](/docs/continuous-integration/use-ci/run-ci-scripts/run-step-settings) to install dependencies for the FastAPI project.

```mdx-code-block
<Tabs>
  <TabItem value="hosted" label="Harness Cloud" default>
```

```yaml
              - step:
                  type: Run
                  name: Install Dependencies
                  identifier: Install_Dependencies
                  spec:
                    shell: Sh
                    command: |-
                      sudo apt-get update && sudo apt-get install -y python3-dev && sudo apt-get install default-libmysqlclient-dev
                      pip install --cache-dir .pip_cache -r requirements.txt
                    envVariables:
                      PIP_CACHE_DIR: /root/.cache
```

```mdx-code-block
  </TabItem>
  <TabItem value="sh" label="Self-hosted">
```

```yaml
              - step:
                  type: Run
                  name: Install Dependencies
                  identifier: Install_Dependencies
                  spec:
                    connectorRef: account.harnessImage
                    image: python:latest
                    shell: Sh
                    command: |-
                      sudo apt-get update && sudo apt-get install -y python3-dev && sudo apt-get install default-libmysqlclient-dev
                      pip install --cache-dir .pip_cache -r requirements.txt
```

```mdx-code-block
  </TabItem>
</Tabs>
```

### Run tests

Add a [Run step](/docs/continuous-integration/use-ci/run-ci-scripts/run-step-settings) that runs unit tests and outputs the results in JUnit XML format.

This tutorial runs basic unit tests, but you can run all types of tests (integration tests, mutation tests, and so on) in Harness CI. For more information, go to [Run tests in CI pipelines](/docs/continuous-integration/use-ci/set-up-test-intelligence/run-tests-in-ci).

```mdx-code-block
<Tabs>
  <TabItem value="hosted" label="Harness Cloud" default>
```

```yaml
              - step:
                  type: Run
                  name: Pytest
                  identifier: Pytest
                  spec:
                    shell: Sh
                    command: |-
                      pytest test_main.py --junit-xml=output-test.xml
                    reports:
                      type: JUnit
                      spec:
                        paths:
                          - output-test.xml
```

```mdx-code-block
  </TabItem>
  <TabItem value="sh" label="Self-hosted">
```

```yaml
              - step:
                  type: Run
                  name: Pytest
                  identifier: Pytest
                  spec:
                    connectorRef: account.harnessImage
                    image: python:latest
                    shell: Sh
                    command: |-
                      pytest test_main.py --junit-xml=output-test.xml
                    reports:
                      type: JUnit
                      spec:
                        paths:
                          - output-test.xml
```

```mdx-code-block
  </TabItem>
</Tabs>
```

To [view test reports in Harness](/docs/continuous-integration/use-ci/set-up-test-intelligence/viewing-tests/), test results must be in JUnit XML format, and the `reports` specification must be included.

## Add the trigger

You can run this pipeline manually as it is, or you can add a trigger to automatically run these tests whenever the codebase changes. To do this, add a [Git event trigger](/docs/platform/Triggers/triggering-pipelines) that listens for an event on a specific branch of your FastAPI repo fork.

For this tutorial, you'll create a trigger that listens for pushes to the `main` branch.

1. In Harness, in the same pipeline, select **Triggers** in the Pipeline Studio header, and then select **Add New Trigger**.
2. Select **GitHub** under **Webhook**.
3. Enter a **Name**.
4. For **Connector**, select your GitHub connector, and enter the FastAPI repo name if necessary.
5. For **Event**, select **Push**.
6. Select **Continue**
7. On the **Conditions** tab, configure a **Branch Name** condition. Set the **Operator** to **Equals**, and set the **Matches Value** to `main`. The entire condition should read like `Branch Name = main`.
8. Select **Continue**, and select **Create Trigger**.

GitHub webhooks are usually automatically created in the target repo. If automatic registration fails, you must manually copy the webhook URL and add it to your repo webhooks. For instructions on manual webhook registration, go to [Register the webhook in the Git provider](/docs/platform/Triggers/triggering-pipelines#register-the-webhook-in-the-git-provider).

## Run the pipeline

To test the Git event trigger and run the pipeline, go to your FastAPI repo fork, make a change, and commit and push it to `main`. For this tutorial, you could commit directly to `main`, but in a real world development situation, you would want to create and merge a PR.

Upon pushing to `main` (either directly or by merging a PR), the trigger should start your pipeline within a few moments. While the build runs, you can view the logs and monitor build activity on the [Build details page](/docs/continuous-integration/use-ci/viewing-builds).

After the pytest step runs, you can find logs indicating that the `output-test.xml` file was generated, and you can [view the test results](/docs/continuous-integration/use-ci/set-up-test-intelligence/viewing-tests) on the Tests tab.

## Complete YAML examples

Here are complete YAML examples for this tutorial. If you copy these examples, make sure to replace the placeholders with valid values.

### Pipeline YAML

These pipelines include a **Build** (`CI`) stage with two **Run** steps. One step installs dependencies defined in `requirements.txt` and the other runs unit tests.

```mdx-code-block
<Tabs>
  <TabItem value="Cloud" label="Harness Cloud" default>
```

This example uses [Harness Cloud build infrastructure](/docs/continuous-integration/use-ci/set-up-build-infrastructure/use-harness-cloud-build-infrastructure).

```yaml
pipeline:
  name: YOUR_PIPELINE_NAME
  identifier: YOUR_PIPELINE_ID
  projectIdentifier: YOUR_HARNESS_PROJECT_ID
  orgIdentifier: default
  tags: {}
  properties:
    ci:
      codebase:
        connectorRef: YOUR_GITHUB_CONNECTOR_ID
        repoName: fastapi-harness-sample
        build: <+input>
  stages:
    - stage:
        name: test
        identifier: test
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
                  name: Install Dependencies
                  identifier: Install_Dependencies
                  spec:
                    shell: Sh
                    command: |-
                      sudo apt-get update && sudo apt-get install -y python3-dev && sudo apt-get install default-libmysqlclient-dev
                      pip install --cache-dir .pip_cache -r requirements.txt
                    envVariables:
                      PIP_CACHE_DIR: /root/.cache
              - step:
                  type: Run
                  name: Pytest
                  identifier: Pytest
                  spec:
                    shell: Sh
                    command: |
                      pytest test_main.py --junit-xml=output-test.xml
                    reports:
                      type: JUnit
                      spec:
                        paths:
                          - output-test.xml
```

```mdx-code-block
</TabItem>
<TabItem value="selfhosted" label="Self-hosted">
```

This example uses a [Kubernetes cluster build infrastructure](/docs/category/set-up-kubernetes-cluster-build-infrastructures).

```yaml
pipeline:
  name: YOUR_PIPELINE_NAME
  identifier: YOUR_PIPELINE_ID
  projectIdentifier: YOUR_HARNESS_PROJECT_ID
  orgIdentifier: default
  tags: {}
  properties:
    ci:
      codebase:
        connectorRef: YOUR_GITHUB_CONNECTOR_ID
        repoName: fastapi-harness-sample
        build: <+input>
  stages:
    - stage:
        name: test
        identifier: test
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
                  name: Install Dependencies
                  identifier: Install_Dependencies
                  spec:
                    connectorRef: account.harnessImage
                    image: python:latest
                    shell: Sh
                    command: |-
                      sudo apt-get update && sudo apt-get install -y python3-dev && sudo apt-get install default-libmysqlclient-dev
                      pip install --cache-dir .pip_cache -r requirements.txt
              - step:
                  type: Run
                  name: Pytest
                  identifier: Pytest
                  spec:
                    connectorRef: account.harnessImage
                    image: python:latest
                    shell: Sh
                    command: |
                      pytest test_main.py --junit-xml=output-test.xml
                    reports:
                      type: JUnit
                      spec:
                        paths:
                          - output-test.xml
```

```mdx-code-block
  </TabItem>
</Tabs>
```

### Trigger YAML

Trigger YAML is separate from pipeline YAML. However, you can write triggers in a YAML editor just as you can for pipelines. The YAML for this tutorial's trigger is as follows:

```yaml
trigger:
  name: fastapi trigger
  identifier: fastapi_trigger
  enabled: true
  encryptedWebhookSecretIdentifier: ""
  description: ""
  tags: {}
  orgIdentifier: default
  stagesToExecute: []
  projectIdentifier: YOUR_HARNESS_PROJECT_ID
  pipelineIdentifier: YOUR_PIPELINE_ID
  source:
    type: Webhook
    spec:
      type: Github
      spec:
        type: Push
        spec:
          connectorRef: YOUR_GITHUB_CONNECTOR_ID
          autoAbortPreviousExecutions: false
          payloadConditions:
            - key: targetBranch
              operator: Equals
              value: main
          headerConditions: []
          repoName: fastapi-harness-sample
          actions: []
```
