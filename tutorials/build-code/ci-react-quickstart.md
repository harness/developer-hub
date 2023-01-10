---
sidebar_position: 5
description: This build automation guide walks you through building and testing a sample React application in a CI Pipeline
keywords: [Hosted Build, Continuous Integration, Developer Guide, CI Tutorial]
---

# Build, Test, and Publish a Docker Image for a sample React application

## What is Continuous Integration

Continuous integration is an approach to development of software where changes in codebase are continuously merged into a shared repository or branch. The combined codebase is then built into a test application over which automated tests are run to find and track any potential bug. The discovered application defects are then turned back over to the developers to fix.

The objectives of any CI process is to:
- Find Bugs Faster
- Reduce time for software validation & releases
- Higher Product Quality etc

In this tutorial we'll be working on an react application hosted in Github. Checkout the codebase of the application [here](https://github.com/harnesscommunity/react-pipeline-sample).

Firstly we'll understand how we can build our application locally and push the docker image to DockerHub and then will create a Harness CI pipeline to automate the entire process implementing the following functions:

1. Build & test the sample react application
2. Build the Docker image & Publish it on DockerHub

```mdx-code-block
import CISignupTip from '/tutorials/shared/ci-signup-tip.md';
```

<CISignupTip />

## How to Build the App Locally?

To create a new React project you can use the tool npx, provided you have an npm version of at least 5.2. In this case we already have the project setup and the project structure is given below:

```bash
react-sample-app
├── README.md
├── node_modules
├── package.json
├── package-lock.json
├── .gitignore
├── Dockerfile
├── nginx
├── LICENSE
├── public
└── src
```

We'll need NPM and Docker to build and package our application. If you don’t have those runtimes, on a Windows Machine, you can use Chocolatey to install, or if using a Mac, Homebrew.

In this guide we'll be using Docker to store our application as an image. Docker makes it very easy for other peers to use the application with the support of the different docker registries that are available in the market. Here we'll be using DockerHub as the Docker registry. If you do not have a registry available to you, you can create a Docker Hub account and create a repository, e.g "test-react".

Use the below command format to build you Docker image locally and then push the image to DockerHub registry

```
docker build --tag your_user/repo:tag .
docker push your_user/repo:tag
```

E.g in my case, at the root of the project:

```
docker build --tag harnesscommunity/test-react:latest .
docker push harnesscommunity/test-react:latest
```
![Docker Push](static/ci-react-quickstart/docker-log-two.png)

Can validate that this has been placed into the Docker Registry.

![Docker Hub](static/ci-react-quickstart/dockerhub.png)


## Create your pipeline

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

1. Fork the repository https://github.com/harness-community/react-pipeline-sample into your GitHub account.
2. Follow the **Get Started** wizard in Harness CI.

```mdx-code-block
<Tabs>
<TabItem value="newaccount" label="New account" default>
```
[Sign up](https://app.harness.io/auth/#/signup/?module=ci&?utm_source=website&utm_medium=harness-developer-hub&utm_campaign=ci-plg&utm_content=get-started) for a new Harness account. Select the **Continuous Integration** module after your initial sign in. This brings you to the **Get Started** wizard.
```mdx-code-block
</TabItem>
<TabItem value="existingaccount" label="Existing account">
```
[Log in](https://app.harness.io/auth/#/signin) to your Harness account. You can either create a new project or select an existing project and then select the **Continuous Integration** module. In the **Project** pane, expand the **Project Setup** menu, and then select **Get Started**.
```mdx-code-block
</TabItem>
</Tabs>
```

3. When you are prompted to select a repository, search for **react-pipeline-sample**, select the repository that you forked in the previous step, and then select **Configure Pipeline**.
4. Select **Starter Pipeline**, and then click on **Create Pipeline**.

### Docker Hub connector

You need a [Docker Hub](https://hub.docker.com/) connector. This connector is used to establish the communication between the Docker registry i.e DockerHub in this tutorial and Harness CI App.

If you have not created a Docker Hub connector yet, follow these steps.

<details><summary>Create connector</summary>
<p>

```mdx-code-block
import DockerHubConnector from '/tutorials/shared/dockerhub-connector-includes.md';
```

<DockerHubConnector />

</p>
</details>

:::info

The Docker connector needs an access token with **Read, Write, Delete** permissions.

:::

### Modify the pipeline

From the left pane, select **Pipelines**, and then select your **react-pipeline-sample** pipeline from the list.

Switch from the **Visual** view to the **YAML** view, and then select **Edit YAML**. (By default the YAML editor is on read mode. Here you'll need to enable the edit option for YAML editor)

A starter pipeline is created with a single stage. It should look similar to this:

```yaml
pipeline:
  name: Build react sample pipeline
  identifier: Build_react_sample_pipeline
  orgIdentifier: default
  // highlight-start
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
                  name: Echo Welcome Message
                  identifier: Run
                  spec:
                    shell: Sh
                    command: echo "Welcome to Harness CI"
          platform:
            os: Linux
            arch: Amd64
          runtime:
            type: Cloud
            spec: {}
  // highlight-end
  properties:
    ci:
      codebase:
        connectorRef: account.Github_OAuth
        repoName: your_user/react-sample-pipeline
        build: <+input>
```

Replace the sample `stages` section with the following `variables` and `stages` sections:

```yaml
  variables:
    - name: DOCKERHUB_USERNAME
      type: String
      description: Your Docker Hub username
      value: <+input>
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
                  name: install node modules
                  identifier: install_node_modules
                  spec:
                    shell: Sh
                    command: npm install
              - step:
                  type: Run
                  name: build app
                  identifier: build_app
                  spec:
                    shell: Sh
                    command: npm run build
              - step:
                  type: Run
                  name: run tests
                  identifier: run_tests
                  spec:
                    shell: Sh
                    command: "npm run test"
              - step:
                  type: BuildAndPushDockerRegistry
                  name: Build and Push an image to Docker Registry
                  identifier: BuildandPushanimagetoDockerRegistry
                  spec:
                    connectorRef: harnesscommunitydocker
                    repo: <+pipeline.variables.DOCKERHUB_USERNAME>/test-react
                    tags:
                      - <+pipeline.sequenceId>
          platform:
            os: Linux
            arch: Amd64
          runtime:
            type: Cloud
            spec: {}

```

:::info

This configuration requires the Docker Hub connector ID to be `Docker_Hub`. If your connector ID is different, replace `Docker_Hub` with the correct ID.

:::

Select **Save** in the YAML editor.

## Run your pipeline

1. In the **Pipeline Studio**, select **Run**.
2. Enter your Docker Hub username in the `DOCKERHUB_USERNAME` field.
2. In the **Build Type** field, select **Git Branch**, and then enter **main** in the **Branch Name** field.
3. Select **Run Pipeline**.
4. Observe each step of the pipeline execution. When the first stage completes, test results appear on the **Tests** tab.


:::tip

For a comprehensive guide on application testing, Harness provides O'Reilly's **Full Stack Testing** book for free at https://harness.io/resources/oreilly-full-stack-testing.

:::