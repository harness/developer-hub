---
sidebar_position: 5
description: This build automation guide describes how to build and push an application container to Google Artifact Registry
keywords: [Hosted Build, Continuous Integration, Hosted, CI Tutorial,Go,GCP]
---

# Push Application Containers to Google Artifact Registry

## Objectives

At the end of this tutorial you will learn,

- [x] How to register for a Harness Account and activate your Free Tier
- [x] What is a __Project__ and how to configure one on your Harness Account
- [x] What are [__Secrets__](https://docs.harness.io/article/hv2758ro4e-learn-harness-key-concepts#secrets_management) and how to add them to your Project
- [x] What are [__Connectors__](https://docs.harness.io/article/hv2758ro4e-learn-harness-key-concepts#connectors) and how to add a Docker Registry Connector to your Project
- [x] How to build Application container image using [kaniko](https://github.com/GoogleContainerTools/kaniko)

## Pre-requisites

Before you get started with the tutorial make sure you have the following accounts,credentials and tools,

- [GitHub](https://github.com) account, where you may need to fork the tutorial sources.
- [Google Cloud Account](https://cloud.google.com)
- [gcloud CLI](https://cloud.google.com/sdk/gcloud)
- [Drone CLI](https://docs.drone.io/cli/install/) to build the application locally.
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)

## Overview

As part of this tutorial we will be building a simple __Go__  application that calls <https://httpbin.org/get> and returns a JSON response. e.g. 

```json
{
  "args": {}, 
  "headers": {
    "Accept-Encoding": "gzip, deflate, br", 
    "Accept-Language": "en-GB,en-US;q=0.9,en;q=0.8", 
    "Host": "httpbin.org", 
    "Referer": "https://httpbin.org/", 
    "User-Agent": "go-resty/2.7.0 (https://github.com/go-resty/resty)", 
    "X-Amzn-Trace-Id": "Root=1-63bd82a6-48984f670886c5f55890feea", 
    "X-My-Header": "harness-tutorial-demo"
  }, 
  "origin": "192.168.1.1", 
  "url": "https://httpbin.org/get"
}
```

## Tutorial Source

The complete demo source is available here <https://github.com/harness-apps/httpbin-get>, fork the repository on to your GitHub account. For rest of the tutorial we will refer to this repository as `$TUTORIAL_GIT_REPO`.

## Building Application Locally

Languages and package formats have build specific tools. One of the core problems that a developer might face is to install the right version of those tools on their local machines. This approach has potential pit falls and leads to __Works only on my machine__ scenarios.

Docker containers solved this problem and helped us to have clean environment that had right set of tools, encouraging the __DevOps__ best practices right from the start. This approach also helps to identify the potential issues with the application at development stage.

[Drone by Harness](https://drone.io) is an open source CI platform that can help building and testing on your local machines without the need of installing the tools as required by the programming languages.

But before we start to build the application, we need place to store the artifacts of the build i.e. container images. In container/Cloud Native world this is called a __Container Registry__ e.g Docker Hub, Quay.io, Harbor etc.,

## Configure Container Registry

Like any file you want to share with the world, storing them in an external spot makes them more accessible. A big benefit of using containers as a packaging format is the ecosystem of container registries out there. Your firm might have a registry provider such as Docker Hub, Quay.io, Harbor, Google Artifact Registry(GAR), Elastic Container Registry(ECR) etc.,

For this tutorial we will be using [Google Artifact Registry](https://cloud.google.com/artifact-registry/docs/overview), where we will push our `httpbin-get` application container image.

We will be using [terraform](htttps://terraform.io) scripts to provision Google Cloud Resources that will be required for this tutorial. To run the terraform scripts we need a [Google Service Account](https://cloud.google.com/iam/docs/service-accounts) with following roles,

- __Artifact Registry Administrator__ - to create and manage Docker Artifact Repositories
- __Service Account Admin__ - to create service accounts that will be used in this tutorial
- __Service Account Key Admin__ - to create service accounts keys that will be used in this tutorial
- __Security Admin__ - to set bind IAM policies of a SA to Google Cloud Project

Create the [Service Account](https://cloud.google.com/iam/docs/creating-managing-service-accounts) and download the Service Account Key JSON. We will refer to this service account as `$INFRA_SA` and the Service Account Key JSON will be referred to as `$GOOGLE_APPLICATION_CREDENTIALS`. [Activate the Service Account](https://cloud.google.com/sdk/gcloud/reference/auth/activate-service-account) to use the same in upcoming steps.

Let us clone the tutorial application from <https://github.com/harness-apps/httpbin-get>,

```shell
#  clone httpbin-get repository
git clone https://github.com/harness-apps/httpbin-get.git \
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

You can also create your fork from the tutorial repository <https://github.com/harness-apps/httpbin-get> directly from GitHub.

:::

The terraform scripts will,

- [x] Create a Google Artifact Registry repository called `harness-tutorial`
- [x] Create a Google Service Account called `harness-tutorial-sa` with permissions to
  - [x] Administer the `harness-tutorial` Google Artifact Registry repository
  - [x] Deploy services to Google Cloud Run

The `terraform.tfvars` has all defaults. Edit and update `project_id` and `region` to suit your Google Cloud settings.

Deploy the infrastructure,

```shell
make init apply
```

On the successful run of the terraform, the service account key file will be generated in the `$TUTORIAL_HOME/.keys/harness-tutorial-sa` folder.

Let us verify our infrastructure by running a simple drone pipeline locally. The verification ensures that we are able build a container image and use it to deploy it via Google Cloud Run.

### Environment Variables

As part of the CI pipeline we will be using the following environment variables,

- `PLUGIN_IMAGE` - The name of the application container image.
- `PLUGIN_SERVICE_ACCOUNT_JSON` - The base64 encoded content of Google Cloud Service Account key file.

:::note

- The `PLUGIN_` prefix to the variables allows it to be implicitly passed as __parameters__ a.k.a __settings__ of [Drone plugins](https://plugins.drone.io).
- We will also refer to these variables in when building the Harness CI pipeline.
  
:::

Running the following script will generate a file `$TUTORIAL_HOME/.env` with aforementioned variables and their respective values,

```shell
$TUTORIAL_HOME/scripts/set-env.sh
```

Let us try pushing the image to Google Artifact Registry `harness-tutorial/httpbin-get`,

```shell
drone exec --env-file=.env
```

:::note
It will take few mins for the build and push to complete as Drone will try to pull the container images if not exists.
:::

If all went well your command line output(trimmed for brevity) should like,

```text
...
[build and push:41] INFO[0110] Taking snapshot of files...                  
[build and push:42] INFO[0110] EXPOSE 8080                                  
[build and push:43] INFO[0110] Cmd: EXPOSE                                  
[build and push:44] INFO[0110] Adding exposed port: 8080/tcp                
[build and push:45] INFO[0110] CMD ["/app"]                                 
[build and push:46] INFO[0110] Pushing image to <your gcp region>-docker.pkg.dev/<your google cloud project>/harness-tutorial/httpbin-get 
[build and push:47] INFO[0113] Pushed <your gcp region>-docker.pkg.dev/<your google cloud project>/harness-tutorial/httpbin-get@sha256:67cca19fd29b9c49bb09e5cd2d50c4f447bdce874b11c87c8aae4c3171e659e4 
...
```

You can check the pushed image at <https://$PLUGIN_IMAGE>.

Simple enough locally to get your local build and packaging in. Our process to build and push the __go__ application looks like,

![Pipeline Steps](static/ci-tutorial-push-to-gar/pipeline_steps.png)

These sequence of steps is referred to as a __Pipeline__ in Continuous Integration(CI) world.

The drone pipeline `build and push` step uses [kaniko](https://github.com/GoogleContainerTools/kaniko) without docker daemon. It also allows you to build the multi arch/platform images with much ease.

The `drone exec` that we did earlier is OK as long you are playing/learning a technology in other words laptop use cases, when you are working on a team to deliver some enterprise application then it becomes super critical that this process be centralized and automated. [Harness Platform](https://harness.io/) helps you do exactly that and much more.

The next sections this tutorial helps you get started on the building your CI Pipeline using Harness platform.

## Harness Continuous Integration Pipeline

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

On the new project page, click __Create Project__ to create a new project named _Google Cloud Demos_.

![Create Fruits API Project](static/ci-tutorial-push-to-gar/google_cloud_project.png)

Leave other options to defaults and click __Save and Continue__. On the modules select _Continuous Integration_,

![Module CI](static/ci-tutorial-go-containers/modules_ci.png)

Now you are ready to wire in the pieces to Harness Continuous Integration.

## Create Pipeline

In the Build Module [Harness Continuous Integration], walking through the wizard is the fastest path to get your build running. Click Get Started. This will create a basic Pipeline for you.

![Get Started](static/ci-tutorial-node-docker/get_started.png)

Click __Get Started__, select GitHub as the repository to use, and enter your GitHub Access Token `$GITHUB_PAT` and finally click __Test Connection__ to verify your credentials work,

![SCM Choice](static/ci-tutorial-go-containers/scm_choice.png)

Click __Continue__, click __Select Repository__ to select the Git Hub Repository that you want to build [the sample is called _httpbin-get_].

![Go Docker Repo](static/ci-tutorial-push-to-gar/go_docker_repo.png)

:::note
Please ensure the repository you select here is your fork of <https://github.com/harness-apps/httpbin-get>.
:::

Can leverage one of the Starter Configs or create a Starter Pipeline. In this case if leveraging the example app which is Go based, leveraging the __Go__ Starter Configuration works fine.

![Configure Go](static/ci-tutorial-push-to-gar/go_starter_pipeline.png)

Click __Create Pipeline__ to start adding the pipeline steps.

There are two ways to add your pipeline steps, _visual_ or _YAML_. For rest of the tutorial we will use the _visual_ editor.

![Pipeline Visual](static/ci-tutorial-push-to-gar/go_docker_pipeline_visual.png)

The scaffolding would have added a single stage called _Build_ with a single default step __Echo Welcome Message`. We will be updating this step to build and push the image to Google Artifact Registry.

Before we get to adding other steps, we need some resources that the steps require namely secrets and connectors.

### Create Google Service Account Key Secret

Navigate to __Project Setup__ --> __Secrets__,

![Project Secrets](static/ci-tutorial-push-to-gar/project_secrets.png)

Click __+ New Secret__ and select __Text__,

![New Text Secret](static/ci-tutorial-push-to-gar/new_file_secret.png)

Fill the file secret wizard as shown,

![Google Cloud SA](static/ci-tutorial-push-to-gar/gcp_sa_key_secret_file.png)

Make a note of the __Id__ of the __harness tutorial sa key__ from the secrets list, we will need that when defining the CI pipeline later,

![Project Secrets](static/ci-tutorial-push-to-gar/project_secrets_list_1.png)

:::note
For the __Select File__, pick and choose the `$TUTORIAL_HOME/.keys/harness-tutorial-sa-key.json` file.
:::

### Create Google Cloud Platform(GCP) Connector

Next let we need to add __Connector__ that allows us to connect to Google Cloud Platform,

Navigate to __Project Setup__ --> __Connectors__,

![Project Connectors](static/ci-tutorial-push-to-gar/project_connectors.png)

Click __+ New Connector__ and select __GCP__,

![GCP Connector](static/ci-tutorial-push-to-gar/gcp_connector.png)

On the new connector wizard __Overview__ screen, enter the name of the connector as `google cloud`,

![GCP Connector Overview](static/ci-tutorial-push-to-gar/gcp_connector_overview.png)

Click __Continue__ to configure the credentials, on the __Details__ select _Specify Credentials here_ and choose the __harness tutorial sa key__ secret that we created earlier,

![GCP Connector Credentials](static/ci-tutorial-push-to-gar/gcp_connector_details.png)

Click __Continue__  and use the _Harness Platform_ as the connectivity mode option,

![GCP Connector Connectivity Mode](static/ci-tutorial-push-to-gar/gcp_connect_to_provider_harness_platform.png)

Click __Save and Continue__ to perform the connectivity test,

![Docker Connector Success](static/ci-tutorial-push-to-gar/gcp_connector_test_successful.png)

Click __Finish__ to complete the creation of Connector resource.

![Connectors List](static/ci-tutorial-push-to-gar/project_connectors_list.png)

Now you are all set to add other steps to the __Build httpbin-get__ pipeline.

### Update Pipeline Steps

Navigate to the __Projects__ --> __Pipelines__,

![Pipelines List](static/ci-tutorial-push-to-gar/project_pipelines.png)

Click __Build httpbin-get__ pipeline and click __Build__ stage,

![Build httpbin-get Pipeline](static/ci-tutorial-push-to-gar/select_build_httpbin-get_pipeline.png)

Delete the existing __Echo Welcome Message__ step by clicking the `x` that appears when you hover over the step.

Click __Save__ to save the pipeline.

Click __Add Step__ to add a new step called __build and push__, from the _Step Library_ choose step type as __Run__ and configure the step with details:

__Name__:

```text
build and push
```

__Description__:

```text
build the httpbin-get go application
```

Select the __Shell__ to be `Sh`.

__Command__:

```shell
echo "$PLUGIN_SERVICE_ACCOUNT_JSON" > "$GOOGLE_APPLICATION_CREDENTIALS"
/kaniko/executor --customPlatform=linux/amd64 --context=/harness --destination=$PLUGIN_IMAGE
```

![Build and Push Step](static/ci-tutorial-push-to-gar/go_pipeline_step_build_and_push_1.png)

For the __build and push__ step to push the container image to Google Cloud Artifact registry, we need provide kaniko with `$GOOGLE_APPLICATION_CREDENTIALS`, add the following environment variables to the step configuration.

The _environment_ variables could be added by clicking __+ Add__ under __Environment Variables__ section of the step configuration,

| Variable Name | Variable Value | Description
| ------------- | -------------- | ------------
| PLUGIN_SERVICE_ACCOUNT_JSON | `<+secrets.getValue("harness_tutorial_sa_key")>`| The Google Service Account Key secret
| GOOGLE_APPLICATION_CREDENTIALS | `/kaniko/sa.json` | The file where the service account json key content will be written
| PLUGIN_IMAGE | `$PLUGIN_IMAGE` | The container image name

:::important

- Ensure `PLUGIN_SERVICE_ACCOUNT_JSON` environment variable value is of __Expression__ type
- The `PLUGIN_IMAGE` is value of `$PLUGIN_IMAGE` variable from from the `$TUTORIAL_HOME/.env`
  
:::

![Build environment Variables](static/ci-tutorial-push-to-gar/go_pipeline_step_build_and_push_env_vars.png)

Click __Apply Changes__ to save the step and click __Save__ to save the pipeline.

![Build and Push app](static/ci-tutorial-push-to-gar/build_and_push_app.png)

### Build and push the Application Container Image

Let us verify if were able to build and push our go application.

Click __Run__ from the pipeline editor page,

![Run Pipeline](static/ci-tutorial-push-to-gar/run_pipeline.png)

Leaving everything to defaults namely __Git Branch__ and __Branch Name__ to be _main_, click __Run Pipeline__ to start the pipeline run. If all ran well you should see a successful pipeline run as shown,

![Build Success](static/ci-tutorial-push-to-gar/go_pipeline_build_and_push_success.png)

:::tip
You can click on each step to view the logs of the respective step
:::

Having tasted the success with our pipeline run, let us add the other step of building and pushing the go application to the container registry.

## Continuing on Your Continuous Integration Journey

You can now execute your builds whenever you want in a consistent fashion. Can modify the trigger to watch for SCM events so upon commit, for example, the Pipeline gets kicked off automatically. All of the objects you create are available for you to re-use. Lastly, you can even save your backing work / have it as part of your source code. Everything that you do in Harness is represented by YAML; feel free to store it as part of your project.

After you have built your artifact, the next step is to deploy your artifact. This is where Continuous Delivery steps in and make sure to check out some other [CD Tutorials](/tutorials/deploy-services#all-tutorials).
