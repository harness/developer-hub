---
sidebar_position: 4
title: NodeJS application
description: Use a CI pipeline to build and test a NodeJS application.
keywords: [Hosted Build, Continuous Integration, Hosted, CI Tutorial]
slug: /ci-pipelines/build/nodejs
---

# Build, test, and publish a NodeJS app

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import DelegateInstall from '/tutorials/platform/install-delegate.md';
import CISignupTip from '/tutorials/shared/ci-signup-tip.md';
```

In this tutorial, you will create a Harness CI pipeline that does the following:

1. Test a NodeJS application.
2. Build and publish a Docker image of that app.

<CISignupTip />

<details>
<summary>What is Continuous Integration?</summary>

[Continuous Integration](https://harness.io/blog/continuous-integration/what-is-continuous-integration/) is a DevOps process based on automated builds that are be triggered by some sort of event, such as a code check-in, merge, or a time schedule. According to [Paul Duvall](https://www.oreilly.com/library/view/continuous-integration-improving/9780321336385/), co-author of Continuous Integration, CI should improve quality and reduce risk. Having a Continuous Integration approach removes the burden of manual builds and also makes builds more repeatable, consistent, and available.

#### Manual vs CI builds

When you build without a CI platform, you deliberately run commands to clone the codebase, install or configure dependencies, compile the code, run tests, and then, usually, package and publish an image to a container registry. When you need to build multiple times per day or you have tens, hundreds, or even thousands of developers running builds, you need the ability to run builds quickly and automatically on build infrastructure that is more substantial and diverse than a single developer's machine.

In a CI platform, such as Harness CI, you create a workflow or pipeline that includes the steps to build and package your application or service. You also specify where your source code exists (such as an SCM repo), and you ensure that the build infrastructure, such as a virtual machine or Kubernetes cluster, has all the required dependencies to build your code. The CI pipeline can then use this information to run builds automatically.

![Local Build Overview](../static/ci-tutorial-node-docker/local_build_overview.png)

#### Sharing images

Eventually, the products of your builds are deployed somewhere, and the main goal of Continuous Integration is to build and publish a deployable unit, which can be referred to as an image, artifact, or release candidate.

A release candidate is the final form of an artifact to be deployed, and this often includes more than compiled source code. For example, there could be quality steps taken to produce the artifact, such as finding and fixing bugs. Additionally, packaging, distribution, and configuration all go into a release candidate.

Once you've prepared a release candidate, you want to share it with your teammates or customers. Like any file you want to share with the world, storing it externally makes it more accessible. There are many options for packaging and sharing images, such as Docker. A big benefit to the Docker packaging format is the broad ecosystem of Docker registries. Your organization might have a registry provider, or your can use a free registry, such as [Docker Hub](https://hub.docker.com/).

![Sample JS Docker Registry](../static/ci-tutorial-node-docker/samplejs_repo.png)

</details>

<details>
<summary>Optional exercise: Build locally</summary>

As an optional exercise, you can build the app used in this tutorial locally before creating a Harness CI pipeline to build and test it automatically.

The codebase used in this tutorial is a [simple NodeJS app](https://github.com/harness-apps/easy-node-docker) that can be built into a Docker image. The Dockerfile has specifics on building and packaging the app.

![Docker File](../static/ci-tutorial-node-docker/dockerfile.png)

To build this app locally:

1. Clone the [easy node docker repo](https://github.com/harness-apps/easy-node-docker) to your local machine.
2. Create a Docker Hub account, if you don't already have a Docker registry account.
3. Create a repo in your Docker registry account where you can push your app image.
4. Make sure your local machine has [NPM](https://nodejs.org/en/download/package-manager) and [Docker](https://docs.docker.com/engine/install/).
5. Use [docker build](https://docs.docker.com/build/building/context/) to call the underlying NPM install and start the build process. In the following example commands, replace the bracketed values with your Docker Hub or Docker registry username, the name of the repo where you want to push the image, and an appropriate image tag, such as `latest`.

   ```
   docker build --tag [your_docker_username]/[your-docker-repo-name]:[tag] .
   docker push [your_docker_username]/[your-docker-repo-name]:[tag]
   ```

6. After the build and push commands run, you can verify that the image has been uploaded to your Docker repo.
Can validate that this has been placed into the Docker Registry.

![Local Push](../static/ci-tutorial-node-docker/local_push.png)

If you took a closer look at what your machine was doing during the local build, the machine was bogged down for a few moments. When building once, for yourself, that is fine, but the resource burden explodes when running multiple concurrent builds at scale to support tens, hundreds, or thousands of developers. Modern Continuous Integration platforms are designed to scale with distributed nodes. Harness CI is designed to scale and simplify the process of externalizing your build process into a CI pipeline. Replicating your workflows into Harness CI pipelines creates repeatable, consistent, and distributed build processes.

The remainder of this tutorial walks you through the process of creating a Harness CI pipeline that builds, tests, and publishes the NodeJS app that you just built manually.

</details>

## Prepare the codebase

1. Fork the [easy node docker tutorial repo](https://github.com/harness-apps/easy-node-docker) into your GitHub account.
2. Create a GitHub personal access token with the `repo`, `admin:repo_hook`, and `user` scopes. For instructions, go to the GitHub documentation on [creating a personal access token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token). For information about the token's purpose in Harness, go to the [GitHub connector settings reference](/docs/platform/Connectors/Code-Repositories/ref-source-repo-provider/git-hub-connector-settings-reference#personal-access-token).

   ![Repo Scope](../static/ci-tutorial-node-docker/repo_scope.png)

3. Copy the token so you can use it when you create the GitHub connector in the next steps.
4. In Harness, select the **Continuous Integration** module and then switch to the **Project** you want to use for this tutorial or create a project.

<details>
<summary>Create a project</summary>

Use these steps to create a project in your Harness account.

1. Select **Projects**, select **All Projects**, and then select **New Project**.
2. Enter a **Name**, such as `CI tutorials`.
3. Leave the **Organization** as **default**.
4. Select **Save and Continue**.
5. On **Invite Collaborators**, you can add others to your project, if desired. You don't need to add yourself.
6. Select **Save and Continue**.
7. On the Modules page, select **Continuous Integration**, and then select **Go to Module**.

If this is your first project with CI, the CI pipeline wizard starts after you select **Go to Module**. You'll need to exit the wizard to create the GitHub connector.

</details>

### Create the GitHub connector

Next, you'll create a _connector_ that allows Harness to connect to your Git codebase. A connector is a configurable object that connects to an external resource automatically while the pipeline runs. For detailed instructions on creating GitHub connectors, go to [Add a GitHub connector](/docs/platform/Connectors/Code-Repositories/add-a-git-hub-connector). For details about GitHub connector settings, go to the [GitHub connector settings reference](/docs/platform/Connectors/Code-Repositories/ref-source-repo-provider/git-hub-connector-settings-reference).

1. Under **Project Setup**, select **Connectors**.
2. Select **New Connector**, and then select **GitHub** under **Code Repositories**.
3. Enter a **Name**, and select **Continue**.
4. Configure the **Details** as follows, and then select **Continue**:

   * **URL Type:** Select **Repository**.
   * **Connection Type:** Select **HTTP**.
   * **GitHub Repository URL:** Enter the URL to your fork of the tutorial repo.

5. Configure the **Credentials** as follows, and then select **Continue**:

   * **Username:** Enter the username for the GitHub account where you forked the tutorial repo.
   * **Personal Access Token:** Create a secret for the personal access token you created earlier. Harness secrets are safe; they're stored in the [Harness Secret Manager](/docs/platform/Secrets/Secrets-Management/harness-secret-manager-overview). You can also use your own Secret Manager with Harness.
   * **Enable API access:** Select this option and select the same personal access token secret.

6. For **Select Connectivity Mode**, select **Connect through Harness Platform**, and then select **Save and Continue**.
7. Wait while Harness tests the connection, and then select **Finish**.

## Prepare the Docker registry

For this tutorial, you'll need a Docker connector to allow Harness to authenticate and publish the NodeJS app image to a Docker registry repository. This tutorial uses Docker Hub for the Docker registry, but you can use other Docker registries with Harness.

1. Create a [Docker Hub](https://hub.docker.com/) account if you don't have one already.
2. Create a repo called `samplejs` in your Docker Hub account.
3. Create a Docker Hub personal access token with **Read, Write, Delete** permissions. Copy the token; you need it when you create the Docker Hub connector in the next steps.
4. In Harness, select the **Continuous Integration** module, and then select your project.
5. Under **Project Setup**, select **Connectors**.
6. Select **New Connector**, and then select **Docker Registry**.
7. Configure the [Docker connector settings](/docs/platform/Connectors/Cloud-providers/ref-cloud-providers/docker-registry-connector-settings-reference) as follows:

   * **Name:** Enter a name.
   * **Provider Type:** Select **DockerHub**.
   * **Docker Registry URL:** Enter `https://index.docker.io/v2/`.
   * **Username:** Enter the username for your Docker Hub account.
   * **Password:** Create a [secret](/docs/platform/Secrets/add-use-text-secrets) for your Docker Hub personal access token.
   * **Select Connectivity Mode:** Select **Connect through Harness Platform**.
   * Select **Save and Continue**, wait for the connectivity test to run, and then select **Finish**.

8. In the list of connectors, make a note of your Docker connector's ID.

## Create a pipeline

1. Under **Project Setup**, select **Get Started**.
2. When prompted to select a repository, search for **easy-node-docker**, select the repository that you forked earlier, and then select **Configure Pipeline**.
3. Select **Generate my Pipeline configuration**, and then select **Create a Pipeline**.

**Generate my Pipeline configuration** automatically creates PR and Push triggers for the selected repository. If you want a more bare bones pipeline, select **Create empty Pipeline configuration**.

<details>
<summary>Generated pipeline YAML</summary>

The YAML for the generated pipeline is as follows. To switch to the YAML editor, select **YAML** at the top of the Pipeline Studio.

```yaml
pipeline:
  name: Build easy-node-docker
  identifier: Build_easy_node_docker
  projectIdentifier: [your-project-ID]
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
                  name: Echo Welcome Message
                  identifier: Echo_Welcome_Message
                  spec:
                    shell: Sh
                    command: echo "Welcome to Harness CI"
          platform:
            os: Linux
            arch: Amd64
          runtime:
            type: Cloud
            spec: {}
  properties:
    ci:
      codebase:
        connectorRef: [your-github-connector]
        repoName: [your-github-account]/easy-node-docker
        build: <+input>
```

</details>

### Understand the build infrastructure

This pipeline uses a Linux AMD64 machine on Harness Cloud build infrastructure, as declared in the stage's `platform` specifications.

```yaml
    - stage:
        ...
        spec:
          cloneCodebase: true
          platform:
            os: Linux
            arch: Amd64
          runtime:
            type: Cloud
            spec: {}
```

You can change the build infrastructure if you want to use a different OS, arch, or infrastructure. With Harness Cloud build infrastructure, your builds run on pre-configured machines provided by Harness. You can also run builds locally or bring your own VMs or Kubernetes cluster build infrastructure. For more information on build infrastructure options, go to [Which build infrastructure is right for me](/docs/continuous-integration/use-ci/set-up-build-infrastructure/which-build-infrastructure-is-right-for-me).

Regardless of the build infrastructure you choose, you must ensure the build farm can run the commands required by your pipeline. For example, this tutorial uses tools that are publicly available through Docker Hub or already installed on [Harness Cloud's preconfigured machines](/docs/continuous-integration/use-ci/set-up-build-infrastructure/use-harness-cloud-build-infrastructure#platforms-and-image-specifications).

In contrast, if you choose to [use a Kubernetes cluster build infrastructure](/docs/continuous-integration/use-ci/set-up-build-infrastructure/k8s-build-infrastructure/set-up-a-kubernetes-cluster-build-infrastructure) and your pipeline requires a tool that is not already available in the cluster, you can configure your pipeline to load those prerequisite tools when the build runs. There are several ways to do this in Harness CI, including:

* [Background steps](/docs/continuous-integration/use-ci/manage-dependencies/dependency-mgmt-strategies) for running dependent services.
* [Plugin steps](/docs/continuous-integration/use-ci/use-drone-plugins/explore-ci-plugins) to run templated scripts, such as GitHub Actions, BitBucket Integrations, or any Drone plugin.
* [Various caching options](/docs/continuous-integration/use-ci/caching-ci-data/share-ci-data-across-steps-and-stages) to load dependency caches.
* [Run steps](/docs/category/run-scripts) for running all manner of scripts and commands.

## Run tests

## Build and push to Docker registry

the build infra will take care of the NPM install for you. End goal would be to have a published Docker Image of your artifact. Can add an additional Step to take care of the Docker Push. 


![Add Publish](../static/ci-tutorial-node-docker/add_publish.png)

Select “Build and Push” image to Docker Registry.

![Docker Publish Step](../static/ci-tutorial-node-docker/add_docker_step.png)

Once selected, you can run a connectivity test and you are ready to provide the registry details. 

* Name: docker_build_and_push
* Docker Connector: `my_docker_hub_account`
* Docker Repository: `<your_user>/<your_repository>`
* Tags: cibuilt

![Docker Build and Push](../static/ci-tutorial-node-docker/docker_build_and_push.png)

Click Apply Changes then Save. 

![Save Hosted](../static/ci-tutorial-node-docker/save_hosted.png)

Now you are ready to run once saved. 



## Run the pipeline

1. In the **Pipeline Studio**, save your pipeline and then select **Run**.
2. In the **Build Type** field, select **Git Branch**, and then enter `main` in the **Branch Name** field.
3. Select **Run Pipeline**.

![Run Pipeline](../static/ci-tutorial-node-docker/run_pipeline.png)

While the build runs you can observe each step of the pipeline execution on the [Build details page](/docs/continuous-integration/use-ci/view-your-builds/viewing-builds).

![Execute Pipeline](../static/ci-tutorial-node-docker/execution.png)

If the build succeeds, you'll find your `cibuilt` image in your Docker Hub repo.

![Success](../static/ci-tutorial-node-docker/success.png)

## Do more with this pipeline

Now that you've created a basic pipeline for building and testing a NodeJS app, you might want to explore the ways that you can [optimize and enhance CI pipelines](/docs/continuous-integration/use-ci/optimize-and-more/optimizing-ci-build-times), including:

* Using [triggers](/docs/category/triggers/) to automatically start pipelines.
* [Caching dependencies](/docs/continuous-integration/use-ci/caching-ci-data/saving-cache).
* [Variables and expressions](/docs/category/variables-and-expressions)

<details>
<summary>Example: Use variables</summary>

Variables and expressions make your pipelines more versatile by allowing variable inputs and values. For example, you can add a pipeline-level variable that lets you specify a Docker Hub username when the pipeline runs.

To add a pipeline variable in the YAML editor, add the following `variables` block between the `properties` and `stages` sections.

```yaml
  variables:
    - name: DOCKERHUB_USERNAME
      type: String
      description: Your Docker Hub username
      value: <+input>
```

To add a pipeline variable in the visual editor:

1. In the Pipeline Studio, select **Variables** on the right side of the Pipeline Studio.
2. Under **Pipeline**, select **Add Variable**.
3. For **Variable Name**, enter `DOCKERHUB_USERNAME`.
4. For **Type** select **String**, and then select **Save**.
5. Enter the value `<+input>`. This allows you to specify a Docker Hub username at runtime.
1. Select **Apply Changes**.

</details>

You can also try adding more steps to add more functionality to this pipeline, such as:

* [Uploading artifacts to JFrog](/docs/continuous-integration/use-ci/build-and-upload-artifacts/upload-artifacts-to-jfrog).
* [Publishing an Allure Report to the Artifacts tab](/tutorials/ci-pipelines/test/allure-report).
* [Including CodeCov code coverage and publishing results to your CodeCov dashboard](/tutorials/ci-pipelines/test/codecov/).
* [Updating Jira issues when builds run](/docs/continuous-integration/use-ci/use-drone-plugins/ci-jira-int-plugin).

After building an artifact, you can deploy your artifact with Harness [Continuous Delivery](/tutorials/cd-pipelines#all-tutorials).

## Reference: Pipeline YAML

Here is the complete YAML for this tutorial's pipeline. If you copy this example, make sure to replace the bracketed values with corresponding values for your Harness project, [GitHub connector ID](#create-the-github-connector), GitHub account name, and [Docker connector ID](#prepare-the-docker-registry).

<details>
<summary>Pipeline YAML</summary>

```yaml
...
```

</details>