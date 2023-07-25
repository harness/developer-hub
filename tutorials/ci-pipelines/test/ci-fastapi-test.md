---
sidebar_position: 4
description: Use Harness CI to run automated tests in a FastAPI project.
keywords: [Continuous Integration, CI Tutorial, FastAPI, Testing, Run Tests]
title: Test a FastAPI project
slug: /ci-pipelines/test/fastapi
---
<ctabanner
  buttonText="Learn More"
  title="Continue your learning journey."
  tagline="Take a Continuous Integration Certification today!"
  link="/certifications/continuous-integration"
  closable={true}
  target="_self"
/>

In this tutorial, you'll use Harness CI to run automated tests in a FastAPI project when changes are pushed to the `main` branch of your repository.

## Prerequisites

* Knowledge of Python and FastAPI.
* Git and GitHub basics.
* [A GitHub Account](https://github.com/join).
* [A Harness Account](https://app.harness.io/).

```mdx-code-block
import CISignupTip from '/tutorials/shared/ci-signup-tip.md';
```

<CISignupTip />

## Set up the pipeline

In this tutorial we focus on running some basic test cases but you can configure the pipeline to run integration tests, mutation tests, etc.
Let’s start with a FastAPI project to work with.

**Cloning the Project**

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

<details> <summary> Setting up the Project Locally </summary>

:::info

In addition to a Harness & Github account, this tutorial requires the following:
* Python (pythom3). For installation, go to [Python Installation Guide](https://www.python.org/downloads/).
* Uvicorn (uvicorn). An ASGI web server implementation for Python.

:::


* Create a virtual environment name test-env 

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

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

## Create your pipeline

1. From the left pane, select **Pipelines**, then select **Create a Pipeline**.
2. In the **Name** field, enter a name for your pipeline, then select **Start**.
3. Switch from the **Visual** view to the **YAML** view, and then select **Edit YAML**.

Append the following configuration:

```mdx-code-block
<Tabs>
  <TabItem value="Cloud" label="Cloud" default>
```

**Cloud** pipelines run in managed infrastructure provided by Harness.

**Now let’s understand the pipeline snippet above:**

* Here we first created a single Builds stage and specified our infrastructure settings as Harness Cloud(OS: Linux & Architecture: AMD64)

* We then configured the execution settings for the Builds stage and defined 2 steps: 
    * Install Dependencies: This step executes the command to install all the project dependencies from the requirements.txt file
    * We then define & run the unit tests in the next step using the pytest command.

```yaml
  properties:
    ci:
      codebase:
        connectorRef: GIT_CONNECTOR
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
                    reports:
                      type: JUnit
                      spec:
                        paths:
                          - output-test.xml
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

**Kubernetes** pipelines run in a Kubernetes cluster that you manage. Kubernetes pipelines are an enterprise feature.

**Now let’s understand the pipeline snippet above:**

* Here we first created a single Builds stage and specified our infrastructure settings as Kubernetes.

* We then configured the execution settings for the Builds stage and defined 2 steps: 
    * Install Dependencies: This step executes the command to install all the project dependencies from the requirements.txt file
    * We then define & run the unit tests in the next step using the pytest command.

```yaml
  properties:
    ci:
      codebase:
        connectorRef: GIT_CONNECTOR
        repoName: fastapi-harness-sample
        build: <+input>
  stages:
    - stage:
        name: test
        identifier: test
        type: CI
        spec:
          cloneCodebase: true
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
                    reports:
                      type: JUnit
                      spec:
                        paths:
                          - output-test.xml
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
          infrastructure:
            type: KubernetesDirect
            spec:
              connectorRef: Kubernetes_Connector
              namespace: <+pipeline.variables.KUBERNETES_NAMESPACE>
              automountServiceAccountToken: true
              nodeSelector: {}
              os: Linux
```

```mdx-code-block
  </TabItem>
</Tabs>
```

After adding the the above snippet, **save** your pipeline.

## Add the trigger

You can run this pipeline manually as it is. To automatically run tests whenever the codebase changes, you need to add a [Git event trigger](/docs/platform/Triggers/triggering-pipelines) that listens for pushes (or any other git event) to the `main` branch of your code repository (or whichever repository you choose to track).

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

## Run Your Pipeline

1. Click the **Save** button, then click **Run**.
2. Click **Run Pipeline** in the **Run Pipeline** dialogue window.
3. On the Build details page, you can review execution information in the console logs. If the tests were successful you will find the /harness/output-test.xml file generated with the test results.