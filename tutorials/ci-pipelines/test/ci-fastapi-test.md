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

* Knowledge of Python and FastAPI.
* Git and GitHub basics.
* [A GitHub Account](https://github.com/join).
* [A Harness Account](https://app.harness.io/).

```mdx-code-block
import CISignupTip from '/tutorials/shared/ci-signup-tip.md';
```

<CISignupTip />

## Prepare the codebase

<!-- fork repo and create code repo connector -->

Let’s start with a FastAPI project to work with.

For this tutorial we already have a to-do REST API with sample test cases hosted in Harness Community [repository](https://github.com/harness-community/fastapi-harness-sample). Follow the following steps to run the project on your machine.

* [Fork the project](https://github.com/harness-community/fastapi-harness-sample) on GitHub with your account.
* Clone the forked repo to your machine.

Your cloned project should have the structure shown below:

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

**Some important files in the codebase:**

* fastapi-todo-tests/requirements.txt - contains a list of all the dependencies for  our project.
* fastapi-todo-tests/app/main.py - Implements three API endpoints for : creating a task, deleting a task, and getting a list of created tasks.
* fastapi-todo-tests/test_main.py - This file defines three test cases.

<details> <summary>Optional exercise: Local set up</summary>

:::info

In addition to a Harness & Github account, this tutorial requires the following:
* Python (pythom3). For installation, go to [Python Installation Guide](https://www.python.org/downloads/).
* Uvicorn (uvicorn). An ASGI web server implementation for Python.

:::


* Create a virtual environment name test-env 

```mdx-code-block
<Tabs>
  <TabItem value="linux or mac" label="Linux or MacOS">
```

```bash
python3 -m venv test-env
```

```mdx-code-block
  </TabItem>
  <TabItem value="windows" label="Windows" default>
```

```bash
python -m venv test-env
```

```mdx-code-block
  </TabItem>
</Tabs>
```

* Activate the virtual environment

```mdx-code-block
<Tabs>
  <TabItem value="linux or mac" label="Linux or MacOS">
```

```bash
source test-env/bin/activate
```

```mdx-code-block
  </TabItem>
  <TabItem value="windows" label="Windows" default>
```

```bash
.\test-env\Scripts\activate
```

```mdx-code-block
  </TabItem>
</Tabs>
```

* Install the dependencies

```bash
cd <project root>
pip install -r requirements.txt
```
* Run all the tests defined in the test_main.py file

```bash
pytest
```

* Start the development server

```bash
uvicorn app.main:app --reload
```

* Go to **localhost:8000/docs** on your browser to test things out in the local server.

</details>

## Prepare the pipeline


### Create a pipeline
<!-- pipeline creation-->

In this tutorial we focus on running some basic test cases but you can configure the pipeline to run integration tests, mutation tests, etc.

1. From the left pane, select **Pipelines**, then select **Create a Pipeline**.
2. In the **Name** field, enter a name for your pipeline, then select **Start**.
3. Add build stage.
4. Specify build infra.

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
```

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
```

### Install dependencies

<!-- Check python guide https://developer.harness.io/tutorials/ci-pipelines/build/python -->

<!-- Harness Cloud has some software preinstalled on the images. Check the image specs to see if this is necessary.

https://developer.harness.io/docs/continuous-integration/use-ci/set-up-build-infrastructure/use-harness-cloud-build-infrastructure#platforms-and-image-specifications -->

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
```

### Run tests

<!-- Check python guide https://developer.harness.io/tutorials/ci-pipelines/build/python -->

```yaml
              - step:
                  type: Run
                  name: Run Pytest
                  identifier: Pytest
                  spec:
                    shell: Sh
                    command: |
                      pytest --junitxml=output-test.xml
                    reports:
                      type: JUnit
                      spec:
                        paths:
                          - output-test.xml
```

```yaml
              - step:
                  type: Run
                  name: Pytest
                  identifier: Pytest
                  spec:
                    shell: Sh
                    command: |
                      pytest --junitxml=output-test.xml
                    reports:
                      type: JUnit
                      spec:
                        paths:
                          - output-test.xml
```

## Run the pipeline

Save and run the pipeline.

While the build runs, you can view the logs and monitor build activity on the [Build details page](docs/continuous-integration/use-ci/viewing-builds).

After the pytest step, if the step succeeded, you find logs indicating that the `output-test.xml` file was generated.

You can [view test results](/docs/continuous-integration/use-ci/set-up-test-intelligence/viewing-tests) on the Tests tab or the Artifacts tab.

## Add the trigger

You can run this pipeline manually as it is, or you can add a trigger to automatically run these tests whenever the codebase changes. To do this, add a [Git event trigger](/docs/platform/Triggers/triggering-pipelines) that listens for an event on a specific branch of your FastAPI project's code repository.

For this tutorial, you'll create a trigger that listens for pushes to the `main` branch.

<details><summary>Register the webhook in the Git provider</summary>

For all Git providers supported by Harness, non-custom webhooks are automatically created in the repo. For details about automatically-registered Git events, go to the [Triggers reference](https://developer.harness.io/docs/platform/pipelines/w_pipeline-steps-reference/triggers-reference/).


However, if automatic registration fails or you created a custom webhook, you must manually copy the webhook URL and add it to your repo webhooks.

:::info Required permissions

To configure a functioning Git event webhook trigger:

* You must have the appropriate level of access to configure repo webhooks in your Git provider.
* The personal access token use for code repo connector authentication must have the appropriate scopes.

For example, for GitHub, you must be a repo admin and the GitHub personal access token used in the pipeline's GitHub connector must include all `repo`, `user`, and `admin:repo_hook` options for **Scopes**.

For information about other provider's token scopes, go to:

* [GitLab - Personal access token scopes](https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html#personal-access-token-scopes)
* [Bitbucket Cloud - Repository access token permissions](https://support.atlassian.com/bitbucket-cloud/docs/repository-access-token-permissions/)
* [AWS - Permissions for actions on triggers](https://docs.aws.amazon.com/codecommit/latest/userguide/auth-and-access-control-permissions-reference.html#aa-triggers)

:::

1. Go to your pipeline in Harness and select **Triggers**.
2. Select your custom webhook.
3. Select the link icon to copy the webhook URL.
4. Log in to your repo in Github and navigate to the repo's webhook settings.
5. Create a new webhook and paste the webhook URL you copied from Harness.
6. Make sure that the content type for outbound requests is **Application/json**.
7. Make sure that **Enable verification** is enabled.
8. Select the events that you would like to trigger this webhook. The following example selected **Just the push event**, which means that this webhook is only triggered if there is a push event.
9. Select **Update webhook**.
For more information about manual webhook registration, go to the [Triggers reference](https://developer.harness.io/docs/platform/pipelines/w_pipeline-steps-reference/triggers-reference/).

</details>

## Test the trigger

To test the Git event trigger, go to your FastAPI repo, make a change, and commit and push it to `main`. For this tutorial, you could commit directly to `main`, but in a real world development situation, you would want to create and merge a PR.

Upon pushing to `main` (either directly or by merging a PR), the trigger should start your pipeline within a few moments. Check the [Builds page](docs/continuous-integration/use-ci/viewing-builds) in Harness to confirm that the build started.

## Pipeline YAML examples

<!-- full pipelines with triggers for self-hosted and cloud -->

```mdx-code-block
<Tabs>
  <TabItem value="Cloud" label="Harness Cloud" default>
```

This pipeline has:

* A **Build** (`CI`) stage.
* [Harness Cloud build infrastructure](/docs/continuous-integration/use-ci/set-up-build-infrastructure/use-harness-cloud-build-infrastructure).
* A **Run** step that installs dependencies for the FastAPI project, as defined in `requirements.txt`.
* A **Run** step that uses `pytest` to run unit tests.
* A Git event webhook trigger.

```yaml
  properties:
    ci:
      codebase:
        connectorRef: YOUR_CODEBASE_CONNECTOR_ID
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
              - step:
                  type: Run
                  name: Run Pytest
                  identifier: Pytest
                  spec:
                    shell: Sh
                    command: |
                      pytest --junitxml=output-test.xml
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

This pipeline has:

* A **Build** (`CI`) stage.
* [Kubernetes cluster build infrastructure](/docs/category/set-up-kubernetes-cluster-build-infrastructures).
* A **Run** step that installs dependencies for the FastAPI project, as defined in `requirements.txt`.
* A **Run** step that uses `pytest` to run unit tests and output results in JUnit XML format.
* A Git event webhook trigger.

```yaml
  properties:
    ci:
      codebase:
        connectorRef: YOUR_CODEBASE_CONNECTOR_ID
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
                    shell: Sh
                    command: |-
                      sudo apt-get update && sudo apt-get install -y python3-dev && sudo apt-get install default-libmysqlclient-dev
                      pip install --cache-dir .pip_cache -r requirements.txt
              - step:
                  type: Run
                  name: Pytest
                  identifier: Pytest
                  spec:
                    shell: Sh
                    command: |
                      pytest --junitxml=output-test.xml
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
