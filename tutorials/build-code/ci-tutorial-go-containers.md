---
sidebar_position: 5
description: This build automation guide walks you through building a Go application and publish the container image of the application using a CI Pipeline
keywords: [Hosted Build, Continuous Integration, Hosted, CI Tutorial,Go,Ko]
---

# Build Go Application Containers

## Objectives

At the end of this tutorial you will learn,

- [x] How to register for a Harness Account and activate your Free Tier
- [x] What is a __Project__ and how to configure one on your Harness Account
- [x] What are [__Secrets__](https://docs.harness.io/article/hv2758ro4e-learn-harness-key-concepts#secrets_management) and how to add them to your Project
- [x] What are [__Connectors__](https://docs.harness.io/article/hv2758ro4e-learn-harness-key-concepts#connectors) and how to add a Docker Registry Connector to your Project
- [x] How to build Go application container image without using a Dockerfile

## Pre-requisites

Before you get started with the tutorial make sure you have the following accounts,credentials and tools,

- A [GitHub](https://github.com) account, where you may need to fork the tutorial sources.
- A Docker Registry account, e.g [DockerHub](https://hub.docker.com), [Quay.io](https://quay.io)
- [Drone CLI](https://docs.drone.io/cli/install/) to build the application locally.
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)

## Overview

As part of this tutorial we will be building a simple __Go__ REST API called `fruits-api`. The application uses a RDBMS(PostgreSQL or MySQL) or NOSQL(MongoDB) to store the fruits data.

## Tutorial Source

The complete demo source is available here <https://github.com/harness-apps/go-fruits-api>, fork the repository on to your GitHub account. For rest of the tutorial we will refer to this repository as `$TUTORIAL_GIT_REPO`.

## Building Application Locally

Languages and package formats have build specific tools. One of the core problems that a developer might face is to install the right version of those tools on their local machines. This approach has potential pit falls and leads to __Works only on my machine__ scenarios.

Docker containers solved this problem and helped us to have clean environment that had right set of tools, encouraging the __DevOps__ best practices right from the start. This approach also helps to identify the potential issues with the application at development stage.

[Drone by Harness](https://drone.io) is an open source CI platform that can help building and testing on your local machines without the need of installing the tools as required by the programming languages.

But before we start to build the application, we need place to store the artifacts of the build i.e. container images. In container/Cloud Native world this is called a __Container Registry__ e.g Docker Hub, Quay.io, Harbor etc.,

## Configure Container Registry

Like any file you want to share with the world, storing them in an external spot makes them more accessible. A big benefit of using containers as a packaging format is the ecosystem of container registries out there. Your firm might have a registry provider such as Docker Hub, Quay.io, Harbor, Google Container Registry(GCR), Elastic Container Registry(ECR) etc.,

For this tutorial we will be using [Docker Hub](https://hub.docker.com/). If you do not have a registry available to you, you can create a [Docker Hub account](https://hub.docker.com/signup) and then create a repository `fruits-api`, where we will push our `fruits-api` application container image.

![Fruits API Docker Repository](static/ci-tutorial-go-containers/create-docker-repo.png)

With us having created the `fruits-api` repository, lets test our repository by building and pushing the image to the registry,

Login to your Docker Hub Account,

```shell
echo -n "$DOCKER_HUB_PASSWORD" |\
  docker login -u `$DOCKER_HUB_USERNAME` --password-stdin
```

:::info

- `$DOCKER_HUB_USERNAME` - Docker Hub username, the one you used while registering the for the Docker Hub account or the one you wish to use if you already have an account with Docker Hub.
- `$DOCKER_HUB_PASSWORD` - Docker Hub user password

:::

Let us clone the tutorial application from <https://github.com/harness-apps/go-fruits-api>,

```shell
#  clone go-fruits-api repository
git clone https://github.com/harness-apps/go-fruits-api.git \
  && cd "$(basename "$_" .git)"
# navigate to the clone repository folder
export TUTORIAL_HOME="$PWD"
```

:::tip

[GitHub Cli](https://cli.github.com/) is very handy tool to work with the GitHub repositories from the command line.

:::

Create your fork of the tutorial repository,

```shell
gh repo fork
```

:::note

You can also create your fork from the tutorial repository <https://github.com/harness-apps/go-fruits-api> directly from GitHub.

:::

To make things simple let use [Drone by Harness](https://drone.io) to build and push the image from your laptops to the Docker Hub repository `fruits-api`,

Copy `$TUTORIAL_HOME/.env.example` to `$TUTORIAL_HOME/.env`,

```shell
cp $TUTORIAL_HOME/.env.example $TUTORIAL_HOME/.env
```

Edit the `$TUTORIAL_HOME/.env` and update it with following,

```properties
PLUGIN_REGISTRY=docker.io
PLUGIN_USERNAME=$DOCKER_HUB_USERNAME
PLUGIN_PASSWORD=$DOCKER_HUB_PASSWORD
PLUGIN_REPO=$DOCKER_HUB_USERNAME/fruits-api
PLUGIN_TAG=0.0.1
```

:::note
Replace the `$DOCKER_HUB_USERNAME`, `DOCKER_HUB_PASSWORD` with your docker hub username and password values.
:::

```shell
drone exec --env-file=.env
```

:::note
It will take few mins for the build and push to complete as Drone will try to pull the container images if not exists.
:::

If all went well your command line output(trimmed for brevity) should like,

```text
...
[push:350] The push refers to repository [docker.io/$DOCKER_HUB_USERNAME/fruits-api:0.0.1]
[push:351] 639e874c7280: Preparing
[push:352] 96e320b34b54: Preparing
[push:353] c306578afebb: Preparing
[push:354] 96e320b34b54: Layer already exists
[push:355] c306578afebb: Pushed
[push:356] 639e874c7280: Pushed
...
```

You can check the pushed image at <https://hub.docker.com/repository/docker/$DOCKER_HUB_USERNAME/fruits-api>.

Simple enough locally to get your local build and packaging in. Our process to build and push the __go__ application looks like,

![Pipeline Steps](static/ci-tutorial-go-containers/pipeline_steps.png)

These sequence of steps is referred to as a __Pipeline__ in Continuous Integration(CI) world.

The drone pipeline `build and push` step uses [ko-build](https://ko.build/) which can build go container images without the need for _Dockerfile_. It also allows you to build the multi arch/platform images with much ease.

The `drone exec` that we did earlier is OK as long you are playing/learning a technology in other words laptop use cases, when you are working on a team to deliver some enterprise application then it becomes super critical that this process be centralized and automated. [Harness Platform](https://harness.io/) helps you do exactly that and much more.

The next sections this tutorial helps you get started on the building your CI Pipeline using Harness platform.

## Your First Continuous Integration Pipeline

If you took a closer look at what your machine was doing during those local builds, the machine was bogged down for a few moments. For yourself, that is fine, but imagine having to support 10’s or 100’s or even 1000’s of engineers, this process can be taxing on systems. Luckily, modern Continuous Integration Platforms are designed to scale with distributed nodes. Harness Continuous Integration is designed to scale and simplify getting your local steps externalized; this is the Continuous Integration Pipeline. Let’s enable Harness Continuous Integration to mimic your local steps and create your first CI Pipeline. Once you are done, you will have a repeatable, consistent, and distributed build process.

There are a few Harness resources to create along the way, which this guide will walk through step-by-step.There are two paths to take. One path is to have Harness host all of the needed infrastructure for a distributed build. The second is to bring your own infrastructure for the distributed build.

__Hosted Infrastructure__:

![Harness CI Hosted Overview](static/ci-tutorial-node-docker/harness_ci_hosted_infra_overview.png)

__Bring Your Own Infrastructure__:

![Harness CI Bring Your Own Overview](static/ci-tutorial-node-docker/harness_ci_your_infra_overview.png)

For this tutorial we will be using the __Hosted Infrastructure__ as thats the only infrastructure available for _Free Tier_.

### Starting off with Harness

Harness is a Platform which has lot of modules, but for this tutorial we will focus on the Continuous Integration(CI) module. 

First, sign up for a [Harness account to get started](https://app.harness.io/auth/#/signup/?module=ci&?utm_source=website&utm_medium=harness-developer-hub&utm_campaign=ci-plg&utm_content=get-started).

![Harness Signup](static/ci-tutorial-node-docker/harness_signup.png)

### GitHub Personal Access Token(PAT)

Assuming you are leveraging GitHub, Harness will need access to the repository. It is recommended to use GitHub [Personal Access Token(PAT)](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token) as a mode of providing Github credentials.

If you have not created a PAT before, on your GitHub account navigate to __Settings__ -> __Developer Settings__ -> __Personal Access Tokens__.

![GitHub PAT](static/ci-tutorial-go-containers/gh_pat_scopes.png)

:::important

- Make sure to jot down the __token__ as the token will only be displayed once. For rest of the tutorial we will refer to this token value as `$GITHUB_PAT`.
  
:::

If you plan to bring in your PAT then make sure it has the scopes `admin:repo_hook` and `user`.

### Create Project

Harness Platform organizes the resources like pipelines, secrets, connectors at various scopes such as Account, Organization and Project. For this tutorial we will create all our resources at Project scope.

Login to your Harness Account that you created earlier and create a new project,

![New Project](static/ci-tutorial-go-containers/new_project.png)

On the new project page, click __Create Project__ to create a new project named _Fruits API_.

![Create Fruits API Project](static/ci-tutorial-go-containers/fruits_api_project.png)

Leave other options to defaults and click __Save and Continue__. On the modules select _Continuous Integration_,

![Module CI](static/ci-tutorial-go-containers/modules_ci.png)

Now you are ready to wire in the pieces to Harness Continuous Integration.

## Create Your First Pipeline

In the Build Module [Harness Continuous Integration], walking through the wizard is the fastest path to get your build running. Click Get Started. This will create a basic Pipeline for you.

![Get Started](static/ci-tutorial-node-docker/get_started.png)

Click __Get Started__, select GitHub as the repository to use, and enter your GitHub Access Token `$GITHUB_PAT` and finally click __Test Connection__ to verify your credentials work,

![SCM Choice](static/ci-tutorial-go-containers/scm_choice.png)

Click __Continue__, click __Select Repository__ to select the Git Hub Repository that you want to build [the sample is called _go-fruits-api_].

![Go Docker Repo](static/ci-tutorial-go-containers/go_docker_repo.png)

:::note
Please ensure the repository you select here is your fork of <https://github.com/harness-apps/go-fruits-api>.
:::

Can leverage one of the Starter Configs or create a Starter Pipeline. In this case if leveraging the example app which is Go based, leveraging the __Go__ Starter Configuration works fine.

![Configure Go](static/ci-tutorial-go-containers/go_starter_pipeline.png)

Click __Create Pipeline__ to start adding the pipeline steps.

There are two ways to add your pipeline steps, _visual_ or _YAML_. For rest of the tutorial we will use the _visual_ editor.

![Pipeline Visual](static/ci-tutorial-go-containers/go_docker_pipeline_visual.png)

The scaffolding would have added a single step called _Build Go App_. In the upcoming sections we will add the other steps like _**lint**_, _**test**_ and _**push**_.

Before we get to adding other steps, we need some resources that the steps require namely secrets and connectors.

### Create Docker Hub Password Secret

Navigate to __Project Setup__ --> __Secrets__,

![Project Secrets](static/ci-tutorial-go-containers/project_secrets.png)

Click __+ New Secret__ and select __Text__,

![New Text Secret](static/ci-tutorial-go-containers/new_text_secret.png)

Fill your Docker Hub password on the  __Add new Encrypted Text__ window,

![Docker Hub Password](static/ci-tutorial-go-containers/docker_hub_password_secret.png)

### Create Docker Hub Registry Connector

Next let we need to add __Connector__ that allows us to connect and later push the image to our Docker Hub repository.

Navigate to __Project Setup__ --> __Connectors__,

![Project Connectors](static/ci-tutorial-go-containers/project_connectors.png)

Click __+ New Connector__ and select __Docker registry__,

![Docker Registry Connector](static/ci-tutorial-go-containers/docker_registry_connector.png)

On the new connector wizard __Overview__ screen, enter the name of the connector as `docker hub`,

![Docker Connector Overview](static/ci-tutorial-go-containers/docker_connector_overview.png)

Click __Continue__ to configure the credentials,

![Docker Connector Credentials](static/ci-tutorial-go-containers/docker_connector_details.png)

:::note

- Update the __Username__ with your `$DOCKER_HUB_USERNAME`
- For the __Password__ field click _Create or Select a Secret_ to select the secret _**docker hub password**_.

:::

Click __Continue__  and use the _Harness Platform_ as the connectivity mode option,

![Docker Connector Connectivity Mode](static/ci-tutorial-go-containers/docker_connector_thru_harness_platform.png)

Click __Save and Continue__ to perform the connectivity test,

![Docker Connector Success](static/ci-tutorial-go-containers/docker_connector_test_successful.png)

Click __Finish__ to complete the creation of Connector resource.

![Connectors List](static/ci-tutorial-go-containers/project_connectors_list.png)

Now you are all set to add other steps to the __Build Go__ pipeline.

### Update Pipeline

Navigate to the __Projects__ --> __Pipelines__,

![Pipelines List](static/ci-tutorial-go-containers/project_pipelines.png)

Click __Build Go__ pipeline,

![Build Go Pipeline](static/ci-tutorial-go-containers/select_build_go_pipeline.png)

Delete the existing __Build Go App__ step by clicking the `x` that appears when you hover over the step.

Click __Save__ to save the pipeline.

Click __Add Step__ to add a new step called __lint__, from the _Step Library_ choose step type as __Run__ and configure the step with details:

__Name__: 

```text
lint
```

__Description__:

```text
Lint the go application
```

Select the __Shell__ to be `Bash`.

__Command__:

```shell
golangci-lint run
```

![Lint Step](static/ci-tutorial-go-containers/go_pipeline_step_lint.png)

Click __Apply Changes__ to save the step and click __Save__ to save the pipeline.

As did earlier click __Add Step__ to add a new step called __test__, from the _Step Library_ choose step type as __Run__ and configure the step with details:

__Name__: 

```text
test
```

__Description__:

```text
Test the go application
```

Select the __Shell__ to be `Bash`.

__Command__:

```shell
go test -timeout 30s -v ./... 
```

![Test Step](static/ci-tutorial-go-containers/go_pipeline_step_test.png)

While building the application locally we used _SQLite_ as our database. The go application can also run with PostgreSQL or MySQL or Mongodb. For this tutorial we will be using _MySQL_.

For the __test__ step to connect to the __mysql__ service add the following environment variables to the step configuration.

```shell
FRUITS_DB_TYPE: mysql
MYSQL_HOST: "mysql"
MYSQL_PORT: 3306
MYSQL_ROOT_PASSWORD: superS3cret!
MYSQL_PASSWORD: pa55Word!
MYSQL_USER: demo
MYSQL_DATABASE: demodb
```

The _environment_ variables could be added by clicking __+ Add__ under __Environment Variables__ section of the step configuration,

![Test environment Variables](static/ci-tutorial-go-containers/go_pipeline_step_test_env_vars.png)

Click __Apply Changes__ to save the step.

:::tip
You can awake step configuration screen by clicking the step on the visual editor.
:::

Click __Save__ to save the pipeline.

__How can the _test_ step connect to _MySQL_ database ?__

Harness Pipelines support a concept called as __Service Dependency__, it is a detached service that's accessible to all Steps in a Stage. Service dependencies support workflows such as

- Integration testing: You can set up a service and then run tests against this service.

- Running Docker-in-Docker: You can set up a [dind service](https://ngdocs.harness.io/article/ajehk588p4) to process Docker commands in Run Steps.

In our tutorial we will use the _Integration testing_ workflow to make the __test__ step to connect to _MySQL_ and run the integration test cases against it.

### Add the MySQL Service Dependency

On the Pipeline editor click __Add Service Dependency__,

![Add Service Dependency](static/ci-tutorial-go-containers/add_service_dependency.png)

Configure the MySQL Dependency Service with details:

__Name__:

```text
mysql
```

__Description__:

```text
the mysql or mariadb server that will be used for testing.
```

Select the __Container Registry__ to be `docker hub`.

__Image__:

```text
mariadb
```

The service dependency need to be configured with the same environment variables that we added to __test__ step.

```shell
MYSQL_PORT: 3306
MYSQL_ROOT_PASSWORD: superS3cret!
MYSQL_PASSWORD: pa55Word!
MYSQL_USER: demo
MYSQL_DATABASE: demodb
```

![Configure MySQL Dependency](static/ci-tutorial-go-containers/go_pipeline_mysql_service_dependency.png)

Click __Apply Changes__ to save the step and then click __Save__ to save the pipeline.

### Lint and Test the Application

Let us verify if were able to _**lint**_ and _**test**_ our go application.

Click __Run__ from the pipeline editor page,

![Run Pipeline](static/ci-tutorial-go-containers/run_pipeline.png)

Leaving everything to defaults namely __Git Branch__ and __Branch Name__ to be _main_, click __Run Pipeline__ to start the pipeline run. If all ran well you should see a successful pipeline run as shown,

![Lint and Test Success](static/ci-tutorial-go-containers/go_pipeline_lint_test_success.png)

:::tip
You can click on each step to view the logs of the respective step
:::

Having tasted the success with our pipeline run, let us add the other step of building and pushing the go application to the container registry.

### Build and Push Image to Container Registry

As did earlier navigate to the __Projects__ --> __Pipelines__,

![Pipelines List](static/ci-tutorial-go-containers/project_pipelines.png)

And click __Build Go__ pipeline to open the pipeline editor,

![Build Go Pipeline](static/ci-tutorial-go-containers/select_build_go_pipeline_2.png)

Click __Add Step__ to add a new step called __build and push__, from the _Step Library_ choose step type as __Run__ and configure the step with details,

__Name__:

```text
build and push
```

__Description__:

```text
Build go application
```

Choose __Bash__ to be the __Shell__

__Command__:

```shell
echo -n "$DOCKER_HUB_PASSWORD" | ko auth login docker.io -u "$DOCKER_HUB_USERNAME" --password-stdin
ko build --bare --platform linux/amd64 --platform linux/arm64 .
```

![Build and Push Step](static/ci-tutorial-go-containers/go_pipeline_step_build_push.png)

We also need to configure few environment variables that are required by `ko` to build and push the image to `fruits-api` container repository.

Update the __Environment Variables__ section with following values,

```shell
DOCKER_HUB_USERNAME: $DOCKER_HUB_USERNAME
DOCKER_HUB_PASSWORD: <+secrets.getValue("docker_hub_password")>
KO_DOCKER_REPO: docker.io/$DOCKER_HUB_USERNAME/fruits-api
```

![Build and Push Env](static/ci-tutorial-go-containers/go_pipeline_step_build_push_env_vars.png)

:::note

- As marked ensure the `DOCKER_HUB_PASSWORD` is of type __Expression__
- `secrets.getValue` is an expression that allows to get the value from the secret `docker_hub_password`, that was created earlier in the tutorial. Check the [docs](https://developer.harness.io/docs/platform/security/add-use-text-secrets/#step-3-reference-the-encrypted-text-by-identifier) for more info
- All `$DOCKER_HUB_USERNAME` references should your Docker Hub Username

:::

Click __Apply Changes__ to save the step and click __Save__ to save the pipeline.

![Final Pipeline](static/ci-tutorial-go-containers/go_pipeline_final.png)

With those changes saved, you are ready to lint, test, build and push your __go__ application to container registry(DockerHub).

## Run CI Pipeline

As did earlier click __Run__ from the pipeline editor window,

![Run Pipeline](static/ci-tutorial-go-containers/run_pipeline.png)

Leaving everything to defaults namely __Git Branch__ and __Branch Name__ to be _main_, click __Run Pipeline__ to start the pipeline run.

Now you are ready to execute. Click "Run Pipeline".

Once a successful run, head back to Docker Hub, and tag `latest` is there!

![Success](static/ci-tutorial-go-containers/go_pipeline_success.png)

This is just the start of your Continuous Integration journey. It might seem like multiple steps to get your local build in the platform, but it unlocks the world of possibilities.

:::note Exercise

The <https://github.com/harness-apps/go-fruits-api> has another branch __mongodb__. Adapt your pipeline so that it build and test the code from __mongodb__ branch.

:::

## Continuing on Your Continuous Integration Journey

You can now execute your builds whenever you want in a consistent fashion. Can modify the trigger to watch for SCM events so upon commit, for example, the Pipeline gets kicked off automatically. All of the objects you create are available for you to re-use. Lastly, you can even save your backing work / have it as part of your source code. Everything that you do in Harness is represented by YAML; feel free to store it as part of your project.

After you have built your artifact, the next step is to deploy your artifact. This is where Continuous Delivery steps in and make sure to check out some other [CD Tutorials](/tutorials/deploy-services#all-tutorials).
