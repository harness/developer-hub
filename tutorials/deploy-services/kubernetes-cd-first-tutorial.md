---
sidebar_position: 1
description: Deploy a Kubernetes Manifest using a CD Pipeline
---

# Deploy a Kubernetes Manifest using a CD Pipeline

```mdx-code-block
import DelegateInstall from '/tutorials/platform/install-delegate.md';
```

## Background on Continuous Delivery

Releases that were once done on a quarterly basis seem olden now, with the advent of [Agile Development](https://www.agilealliance.org/agile101/), getting incremental features out as fast as possible. Infrastructure and practices need to be in place to allow changes to propagate quickly. If we take a look at the definition of Continuous Delivery from Jez Humble’s book, Continuous Delivery:

_“Continuous Delivery is the ability to get changes of all types—including
new features, configuration changes, bug fixes and experiments—
into production, or into the hands of users, safely and quickly in a
sustainable way._

Safely means pipelines enforce quality, testing and a mechanism to
deal with failure. Quickly implies pipelines promote code without human
intervention, in an automated fashion, and finally, sustainable means
pipelines can consistently achieve all this with low effort and resources.”

Simply put, good pipelines are fast and repeatable, great pipelines are
fast, safe, and repeatable. With Harness Continuous Delivery [Harness CD], you are on the path to creating great delivery pipelines in no time. This example will show you how to get up and started deploying a Kubernetes based workload with a Harness CD Pipeline.

## Building Blocks to Continuous Delivery

Automating your deployments does require a few pieces. You do need something that can be deployed and infrastructure for your deployment to head to. This can be in the form of a binary distribution e.g an image and a Kubernetes cluster. Typically with modern applications, the deployment manifests will be stored in source control, [GitHub](https://github.com/) being a common SCM [source code management] solution.

For this example, we will deploy [Grafana](https://grafana.com/oss/grafana/), an open source analytics tool, to a Kubernetes cluster with Harness CD. The needed Grafana Manifests will be stored on GitHub and you can deploy to a Kubernetes cluster of your choice.

![Overview](static/k8s-cd-first-tutorial/overview.png)

## Getting Started with Harness CD

Getting started with Harness CD is simple, first if you do not have a Harness Account, you can [sign up for free for Harness CD](https://app.harness.io/auth/#/signup/?module=cd&?utm_source=website&utm_medium=harness-developer-hub&utm_campaign=cd-plg&utm_content=get-started).

![Sign Up for Harness CD](static/k8s-cd-first-tutorial/signup_cd.png)

Once signed up, navigate to the Deployments icon on the left hand navigation and create your start your free forever CD Free Plan.

![Free Plan](static/k8s-cd-first-tutorial/freeplan.png)

Once you have clicked on “Start CD Free Plan”, a default [Harness Project](https://docs.harness.io/article/7fibxie636-projects-and-organizations) will be created for you automatically. Projects are logical groupings of resources. The generated default project is perfect for the first time deployment.

When navigating back to Deployments, can set the project context to the Default Project by clicking on the blue chevrons >> and selecting Default Project.

![Default Project](static/k8s-cd-first-tutorial/default_project.png)

With the Default Project selected, clicking on Overview will bring up a wizard to create your first Pipeline/Deployment.

![Create First Pipeline](static/k8s-cd-first-tutorial/first_pipeline.png)

There are a few Harness entities that will need to be created in Harness. The needed objects are wirings to Docker Hub for public image access and GitHub for the Granfa manifest. These objects can be set up during the Pipeline creation or set up ahead of time so they can be reused in multiple Pipelines. 

## Install Delegate

<details>
<summary>Install Delegate</summary>
<DelegateInstall />
</details>

## Your First CD Pipeline with Harness - What To Deploy

With the Delegate install out of the way, you are now ready to create your first Pipeline. You will be deploying a Docker Image with a Kubernetes Manifest coming from Docker Hub and GitHub respectively. The following steps will walk you through how to create a Pipeline with those resources.

- Deployments -> Pipelines + Create new Pipeline
- Name: my-first-pipeline
- Setup: in-line

![New Pipeline](static/k8s-cd-first-tutorial/new_pipeline.png)

Click Start and add a Pipeline Stage by clicking the +Add Stage icon.

![First Pipelien Stage](static/k8s-cd-first-tutorial/first_stage.png)

Select Deploy as the Stage.
Next, name the stage “Deploy Grafana” as a type Service.

![Stage Name](static/k8s-cd-first-tutorial/stage_name.png)

Then click Set Up Stage.

The first step is to define the Service by clicking on + New Service

![About Service](static/k8s-cd-first-tutorial/about_service.png)

Can name the Service “my-grafana-instance”.

![My Grafana](static/k8s-cd-first-tutorial/my_grafana.png)

Once Saved, the next step is to point to a Grafana Kubernetes Manifest.
In the Service Definition section, select Kubernetes as the Deployment Type. Then you can add a Manifest from GitHub.

![Manifest Type](static/k8s-cd-first-tutorial/manifest_type.png)

By selecting +Add Manifest, in the Manifest Wizard, select K8s Manifest.

![K8s Manifest](static/k8s-cd-first-tutorial/k8s_manifest_type.png)

Click continue and select GitHub as the Manifest Source/Store.

![Manifest Store](static/k8s-cd-first-tutorial/manifest_store.png)

Now you are ready to create a GitHub Connector. GitHub does require Personal Access Tokens [PATs] to access git operations. See below if you do not have one setup.

### Wiring GitHub into Harness 

Harness will also need access to where to grab the Kubernetes manifests from GitHub and pull an image down from Docker Hub.

#### GitHub Wiring

GitHub as of 2021 [requires token authentication](https://github.blog/2020-12-15-token-authentication-requirements-for-git-operations/) e.g. no more passwords for git operations. 

If you have not created a Personal Access Token before.

- GitHub -> Settings -> Developer Settings -> Personal Access Tokens
- Name: _harness_
- Scopes: repo 
- Expiration: 30 days

![GitHub PAT](static/k8s-cd-first-tutorial/gh_pat.png)

Make sure to copy down the token that is generated.


In the GitHub Connector Wizard, there are a few steps to wire in your GitHub credentials. For the example authenticate against the repo which is housing the manifest.

Manifest Name: my-gh-connector

![GitHub Connector](static/k8s-cd-first-tutorial/gh_connector.png)

Click Next. Now can set up authentication against the repository.

- URL Type: Repository
- Connection Type: HTTP
- GitHub URL: https://github.com/harness-apps/developer-hub-apps

![GitHub URL](static/k8s-cd-first-tutorial/githuburl.png)

Click Next and provide your GitHub Username and Personal Access Token which can be stored securely in the Harness Secrets Manager.

![GitHub Creds](static/k8s-cd-first-tutorial/config_gh_creds.png)

Click on the Personal Access Token to configure your PAT.

- Secrets Manager: _Harness Built-in Secret Manager_
- Secret Name: _github_pat_

![GitHub PAT Secret](static/k8s-cd-first-tutorial/gh_pat_secret.png)

Once you hit Save then Continue, select a Harness Delegate to run the operation on. If you have more than one Harness Delegate, can narrow the scope down or for the example, can “Use any available delegate” since this is the only one.

![Pick Delegate](static/k8s-cd-first-tutorial/pick_delegate.png)

Click Save and Continue to validate the GitHub Connection.

![Validate GitHub](static/k8s-cd-first-tutorial/validate_gh.png)

Next, you will need to wire in the Manifest Details which are being pulled from [https://github.com/harness-apps/developer-hub-apps/tree/main/applications/grafana](https://github.com/harness-apps/developer-hub-apps/tree/main/applications/grafana).

Looking at the GitHub structure there are two files to leverage, the deployment manifest and a _values.yaml_:

![Grafana Manifest](static/k8s-cd-first-tutorial/grafana_manifest.png)

![Grafana Values.yaml](static/k8s-cd-first-tutorial/grafana_values_yaml.png)

Can wire those two manifests into Harness.

- Manifest Name: grafana
- Branch: main
- File/Folder Path: /applications/grafana/grafana.yaml
- Values.yaml: /applications/grafana/grafana_values.yaml

Harness has the ability to read in input variables in your pipeline. In a deployment manifest, can wire in variables to be picked up by Harness. Later when executing the Pipeline, Harness can prompt you for which tag of the image to deploy with `{{.Values.image}}`.

![Image Value Template](static/k8s-cd-first-tutorial/image_value.png)

![Manifest Details](static/k8s-cd-first-tutorial/manifest_details.png)

Click Submit, and now your Grafana Manifests will be wired to the Pipeline.

![Manifests Wired](static/k8s-cd-first-tutorial/manifest_wired.png)

### Binary Artifact Registry Wiring

To select which version of Grafana to deploy, you can add an Artifact to the Pipeline for Deployment.

![Add Artifact](static/k8s-cd-first-tutorial/add_artifact.png)

Clicking + Add Primary Artifact, select Docker Registry as the Artifact Repository Type.

![Repo Type](static/k8s-cd-first-tutorial/repo_type.png)

Click Continue, the next step is to let Harness know how to connect to the Docker Registry. To head to Docker Hub, can create a new Docker Registry Connector.

+New Docker Registry Connector

Can provide a name for the new Docker Connector.

- Name: `docker_hub_public`

![Docker Hub Public](static/k8s-cd-first-tutorial/dh_public.png)

Next can provide authentication as needed. Certain Docker Hub Registries limit unauthenticated pulls. If you do have Docker Hub credentials, can enter them here. If not, can use Anonymous. Though there might be a chance the public image has reached it’s public unauthenticated pull limit.

- Docker Registry: https://registry.hub.docker.com/v2/
- Authentication: Anonymous

![Docker Hub Config](static/k8s-cd-first-tutorial/dh_url.png)

Click Next and select the Delegate to run the image pull. Can use any available Delegate.

![Docker Hub Delegate](static/k8s-cd-first-tutorial/dh_delegate.png)

Click Save and Continue to test the connection.
Clicking Continue will allow you to enter the artifact location e.g Artifact Details. The image that we will pull is located at [https://hub.docker.com/r/grafana/grafana](https://hub.docker.com/r/grafana/grafana) and has a Docker Pull command of `docker pull grafana/grafana`.

- Image Path: grafana/grafana

![Artifact Details](static/k8s-cd-first-tutorial/artifact_details.png)

Clicking Submit will wire the Artifact into the Harness Pipeline.

![Artifact Wired](static/k8s-cd-first-tutorial/artifact_wired.png)

Click Continue, and now you are ready to wire in where and how you want to deploy.

## Where Your Pipeline Deploys To

The next step is to define the infrastructure or where your Pipeline will deploy to. The first step is to define the “where” as a [Harness Environment](https://docs.harness.io/article/n39w05njjv-environment-configuration).

![First Pipeline no Env](static/k8s-cd-first-tutorial/first_pipeline_no_env.png)

A Harness Environment is your deployment target. You can create a new Harness Environment via the wizard by clicking on + New Environment.

- Name: my-k8s-environment
- Environment Type: Pre-Production

![New Environment](static/k8s-cd-first-tutorial/new_env.png)

Click Save and now you are ready to wire in your Kubernetes cluster. Since your Delegate should be running in a Kubernetes cluster, you can create a reference to this cluster with a Cluster Connector.

Select “Direct Connection” Kubernetes then can fill out the Cluster Details with a New Connector.

![Infra Def](static/k8s-cd-first-tutorial/infra_def.png)

Click on Select Connector and then + New Connector

![New Infra Connector](static/k8s-cd-first-tutorial/new_infra_connector.png)

Once clicked on + New Connector, can give a name to your Kubernetes cluster.

- Name: my-k8s-cluster

![K8s Cluster Name](static/k8s-cd-first-tutorial/k8s_cluster_name.png)

Click Continue and select “Use the credentials of a specific Harness Delegate” to connect.

![Choose K8s Connectivity](static/k8s-cd-first-tutorial/k8s_connect_choice.png)

Click Continue and select the Harness Delegate you installed into your Kubernetes Cluster e.g _my-harness-delegate_.

![K8s Delegate](static/k8s-cd-first-tutorial/k8s_delegate.png)

Click Save and Continue and a connectivity test will occur.

Click Finish and you can enter a namespace that is available on the Kubernetes cluster.

- Namespace: default

![Cluster Details](static/k8s-cd-first-tutorial/cluster_details.png)

Click Continue and now you are ready to configure how you want your deployment to execute.

## How Your Pipeline Deploys

Clicking Continue, you are now ready to configure the Execution Strategy or the “how” your Pipeline executes. Harness can guide you through several deployment strategies such as a [Rolling Deployment](https://kubernetes.io/tutorials/tutorials/kubernetes-basics/update/update-intro/) or a [Canary Deployment](https://www.infoworld.com/article/3644449/how-canary-releases-enable-continuous-deployment.html). For the example, a Rolling Deployment is simplest.

![Exec Strategy](static/k8s-cd-first-tutorial/exec_strategy.png)

Select “Rolling Kubernetes” then click on Use Strategy. Now you are ready to save this Pipeline and execute the Pipeline to create a deployment.

![Unsaved](static/k8s-cd-first-tutorial/first_pipeline_unsaved.png)

Click Save and now you are ready to deploy.

## Running Your First Harness Pipeline

After the setup steps, you are on your way to a repeatable deployment process. Click run in the Pipeline Window.

![Run Pipeline](static/k8s-cd-first-tutorial/run_pipeline.png)

Here you can select the Artifact Tag that you want to deploy. At the time of this tutorial, Grafana 9.x is out can search for “9.”.

![Select Artifact](static/k8s-cd-first-tutorial/select_afrifact.png)

Select a version of the Artifact you want to run e.g “9.1.1” and click Run Pipeline.

![Ready to Run](static/k8s-cd-first-tutorial/ready_to_run.png)

After a few moments, your Grafana Deployment is complete!

![Complete](static/k8s-cd-first-tutorial/complete.png)

Head back to your terminal and run a kubectl command to get the address [External IP] of what you just deployed. If you are using minikube, to expose a Kubernetes Service, you might have to run `minikube tunnel`.

`kubectl get services -A`

![External IP](static/k8s-cd-first-tutorial/external_ip.png)

Head to the External-IP over port 3000 to see Grafana.
E.g `http://34.132.72.143:3000/login`
By default, the Grafana user and password is admin/admin.

![Grafana](static/k8s-cd-first-tutorial/grafana.png)

Congratulations on your first Continuous Delivery Pipeline! The objects that you created can be reused in future pipelines. You are well on your path to Continuous Delivery excellence.
