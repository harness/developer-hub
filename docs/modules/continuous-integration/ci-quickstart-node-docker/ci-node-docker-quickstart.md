---
sidebar_position: 1
---

# Continuous Integration Node and Docker Tutorial

## Background on Continuous Integration

Continuous Integration is automated builds that can be triggered by some sort of event, such as a code check-in, merge, or on a regular schedule. The end goal of a build is to be deployed somewhere, and the main goal of [Continuous Integration](https://harness.io/blog/continuous-integration/what-is-continuous-integration/) is to build and publish that deployable unit. 

However, more than the compiled source code can go into a build. The end product for Continuous Integration is a release candidate. A release candidate is the final form of an artifact to be deployed. There could be quality steps taken to produce the artifact, such as finding bugs, and identifying their fix. Packaging, distribution, and configuration all go into a release candidate. 

According to [Paul Duvall](https://www.oreilly.com/library/view/continuous-integration-improving/9780321336385/), co-author of Continuous Integration, in a nutshell, CI will improve quality and reduce risk. Having a Continuous Integration approach frees teams from the burden of manual builds and also makes builds more repeatable, consistent, and available. If you are unfamiliar with CI, this guide will get you started on your first automated build. 

## Your Local Build - Onramp to Continuous Integration

To create a build, you need to have something that can be built, which means source code. The steps you take to build and package your application or service need to be represented in a CI tool or platform for automation. CI platforms will need to connect to source code management e.g SCM to start the build process. This can be as simple as connecting your public GitHub Repository for something that needs to be built. 

![Local Build Overview](static/local_build_overview.png)

### How to Build an App Locally?
Languages and package formats have build specific tools. As an example, here is a simplistic NodeJS Application that can be built into a Docker Image; the Dockerfile has specifics on how to build and package the app. 

Sample App Repo:
[https://github.com/ravilach/easy-node-docker](https://github.com/ravilach/easy-node-docker)

To execute the local build, the first step if using the sample application is to download/clone the repository to your local machine. 

![Docker File](static/dockerfile.png)

Building and packaging this sample application locally requires a few pieces, NPM and Docker.
If you don’t have those runtimes, on a Windows Machine, you can use [Chocolatey](https://chocolatey.org/install) to install, or if using a Mac, [Homebrew](https://brew.sh/).

```
NPM:
choco install nodejs
brew install node

Docker:
choco install docker
brew install docker
```
Once you build your application, you will need to store the binaries somewhere, in this case, the Docker Image. The next step, Docker Build, will call the underlying NPM Install to start the build process.  

### Creating and Storing Your Image

Like any file you want to share with the world, storing them in an external spot makes them more accessible. A big benefit of using Docker as a packaging format is the ecosystem of Docker Registries out there. Your firm might have a registry provider. A good free registry for yourself is [Docker Hub](https://hub.docker.com/). If you do not have a registry available to you, you can create a Docker Hub account and create a registry, e.g “samplejs”.

![Sample JS Docker Registry](static/samplejs_repo.png)

With those pieces, you can build and push your image to the registry. 

```
docker build --tag your_user/repo:tag .
docker push your_user/repo:tag
```
E.g in my case, at the root of the project:

```
docker build --tag rlachhman/samplejs:1.0.4 .
docker push rlachhman/samplejs:1.0.4
```

![Docker Push](static/docker_push.png)

Can validate that this has been placed into the Docker Registry. 

![Local Push](static/local_push.png)

Simple enough locally to get your local build and packaging in. The next step is now to externalize this, which is exactly what creating a Continuous Integration Pipeline is all about. 

## Your First Continuous Integration Pipeline
If you took a closer look at what your machine was doing during those local builds, the machine was bogged down for a few moments. For yourself, that is fine, but imagine having to support 10’s or 100’s or even 1000’s of engineers, this process can be taxing on systems. Luckily, modern Continuous Integration Platforms are designed to scale with distributed nodes. Harness Continuous Integration is designed to scale and simplify getting your local steps externalized; this is the Continuous Integration Pipeline. Let’s enable Harness Continuous Integration to mimic your local steps and create your first CI Pipeline. Once you are done, you will have a repeatable, consistent, and distributed build process. There are a few Harness Objects to create along the way, which this guide will walk through step-by-step. 

![Harness CI Overview](static/harness_ci_overview.png)

### Starting off with Harness
Harness is a Platform, but we will focus on the Continuous integration module. First, sign up for a [Harness account to get started](https://app.harness.io/auth/#/signup/?module=ci). 

![Harness Signup](static/harness_signup.png)

Your onramp and workhorse in the Harness Platform is the Harness Delegate which can run in several places. For this example, using the Harness Kubernetes Delegate is the easiest. 

### Wiring The Harness Kubernetes Delegate [Progressive]
todo: Link to Doc for Delegate Install

https://docusaurus.io/docs/markdown-features/links

### Access To Your Sourcecode
Assuming you are leveraging GitHub, Harness will need access to the repository. For the example, providing a Personal Access Token that is scooped to “repo” will allow for connectivity. 

If you have not created a Personal Access Token before.

* GitHub -> Settings -> Developer Settings -> Personal Access Tokens
* Name: harnessci
* Scopes: repo
* Expiration: 30 days

Make sure to jot down the token as the token will only be displayed once.

![Repo Scope](static/repo_scope.png) 

Now you are ready to wire in the pieces to Harness Continuous Integration. 

## Create Your First Pipeline
In the Build Module [Harness Continuous Integration], walking through the wizard is the fastest path to get your build running. Click Get Started. This will create a basic Pipeline for you. 

![Get Started](static/get_started.png)

Once you click Get Started, select GitHub as the repository you use, and then you can enter your GitHub Access Token that was created or being leveraged for the example. 

![SCM Choice](static/scm_choice.png)

Click Continue. Then click Select Repository to select the Repository that you want to build.

![Node Docker Repo](static/node_docker_repo.png)

Select the repository, then click Create Pipeline. The step to focus on will be Build.

![Build Step](static/build_step.png)

Click Continue to define what infrastructure to run the build on. With the quick start, you can leverage Harness Provided infrastructure or your own Kubernetes infrastructure. Below, will be leveraging your infrastructure.  

First change the infrastructure to “Kubernetes”.

![Where to Build](static/where_to_build.png)

Then select the drop-down “Select Kubernetes Cluster”. Then + New Connector. 

![New K8s Connector](static/new_connector.png)

In the wizard, name the Kubernetes connection “myfirstcinode”.

![First CI Node](static/first_ci_node.png)

Click continue. With Harness, you can use the same cluster the Harness Delegate is running on by selecting “Use Credentials of a specific Harness Delegate”. The Harness Delegate will facilitate all needed work on the Kubernetes cluster. 

![Delegate Connect](static/delegate_connect.png)

Click continue. Now select the Harness Delegate that corresponds to your Kubernetes cluster. 

![Kubernetes Delegate](static/k8s_delegate.png)

Click “Save and Continue” and the connection will be validated. 
Back in the Pipeline Builder, “myfirstcinode” will be listed.

Provide a Namespace and OS to run. 

* Namespace: default
* OS: Linux [if using Windows WSL, Linux is the correct setting]. 

![Build Infra](static/build_infra.png)

After the Build Infrastructure is set, now time to set up the Push step to push the artifact to a Docker Registry. In the Pipeline View, click  + Add Stage and create a Staged called “Push”.Then click on “Set Up Stage”.

![Push Stage](static/push_stage.png)

Click on “Set Up Stage”.

![Set Up Push](static/set_up_push.png)

In the setup of the Stage, can leverage the infrastructure that the previous artifact build was run on by selecting “Propagate from an existing stage”. 

![Where To Run](static/where_to_run.png)

Click Continue now, you can add a Step to represent the Docker Push.  Click “Add Step”.

![Add Publish](static/add_publish.png)

Select “Build and Push” image to Docker Registry. 

![Docker Publish](static/docker_publish.png)

Can create a new Push connector. 

Name: pushtodockerhub

![Push Connector](static/push_connector.png)

Next, set up the Docker Connector by clicking on the dropdown for Docker Connector. 
Then create a new connector.

![Docker Connector](static/docker_connector.png)

Can name the new docker registry connector “dockerhub”.

![Docker Hub Conncetor](static/dh_connector.png)

Click continue and can enter your credentials to Docker Hub. 

* Provider Type: Docker Hub
* Docker Registry URL: https://registry.hub.docker.com/v2/
* Authentication: your_user
* Password: your_password [Will be saved as a Harness Secret]

![Docker Hub Creds](static/dh_creds.png)

Click Continue and select the Harness Delegate to execute on. This will be your Kubernetes infrastructure. 

![Kubernetes Delegate](static/k8s_delegate.png)

Click Save and Continue, and the connection will validate. 
Then click Finish. Lastly, enter your Docker Repository and Tag information. 

* Docker Repository: *your_account/your_registry*
* Tags: cibuilt

![Push Settings](static/push_settings.png)

Then click “Apply Changes” and Save the Changes.

![Save Changes](static/save_changes.png)

With those changes saved, you are ready to execute your first CI Pipeline. 

## Running Your First CI Pipeline
Executing is simple. Head back to your pipeline and click on “Run”. Unlike your local machine, where you had to wire in NPM and Docker dependencies, Harness CI will resolve these by convention. 


![Pipeline](static/pipeline.png)

Then you can select a branch to run off of and execute a step. 
Branch Name: main [if using the example repo]

![Run Pipeline](static/run_pipeline.png)

Now you are ready to execute. Click “Run Pipeline”. 

![Execute Pipeline](static/execution.png)

Once a successful run, head back to Docker Hub, and `cibuilt` is there!

![Sucess](static/success.png)

This is just the start of your Continuous Integration journey. It might seem like multiple steps to get your local build in the platform, but it unlocks the world of possibilities. 

## Continuing on Your Continuous Integration Journey  
You can now execute your builds whenever you want in a consistent fashion. Can modify the trigger to watch for SCM events so upon commit, for example, the Pipeline gets kicked off automatically. All of the objects you create are available for you to re-use. One part we did not touch upon in this example is executing your [test suites](https://docs.harness.io/article/x0d77ktjw8-ci-pipeline-quickstart#step_4_build_and_run_unit_tests) in a similar format. Lastly, you can even save your backing work / have it as part of your source code. Everything that you do in Harness is represented by YAML; feel free to store it as part of your project. 

![CI as Code](static/ci_as_code.png)

After you have built your artifact, the next step is to deploy your artifact. This is where Continuous Delivery steps in. 