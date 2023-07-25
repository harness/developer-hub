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

## Setting up the Project Locally

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

**Now let’s understand the pipeline snippet above:**

* Here we first created a single Builds stage and specified our infrastructure settings as Harness Cloud(OS: Linux & Architecture: AMD64) or Kubernetes

* We then configured the execution settings for the Builds stage and defined 4 steps: 
    * Install Dependencies: This step executes the command to install all the project dependencies from the requirements.txt file
    * We then define & run the unit tests in the next step using pip & pytest command.

Now open the GitHub repository that you’ve already forked. Here you’ll notice that it automatically pushed the Harness CI pipeline under the .harness/ directory in the codebase.

And that’s it. Now you can jump in back to the Harness CI module and test the pipeline execution manually. Note that we can also automate the pipeline invocation using the [git-event triggers](https://developer.harness.io/docs/category/triggers) for push, pull request, etc.. 
