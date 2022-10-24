---
sidebar_position: 1
description: Deploying your first set of Kubernetes Resources in a CD Pipeline with Helm (K8s Package Manager).
---

# Deploy a Helm Chart using a CD Pipeline

## Background on Helm

Introduced during the first KubeCon, [Helm](https://harness.io/blog/what-is-helm) has been a stalwart in the Kubernetes ecosystem almost since the inception of Kubernetes. If you are unfamiliar with Helm, Helm is a package manager for Kubernetes; similarly to Homebrew on your Mac or Chocolatey on your Windows machine.

A Helm Chart is the unit of packaging that Helm creates/applies. Helm also has templating abilities so interactions or reuse with Helm Charts can be templated out.

_Example structure of a Wordpress Helm Chart:_

![Helm Structure](static/first-helm-deployment/helm_structure.png)

Having a Helm Chart(s) as part of your Continuous Delivery Pipeline when deploying to Kubernetes is simple with Harness. From installing third party pieces of software/platforms to deploying your own application represented with Helm, this example will get your Helm Deployment integrated into a Pipeline.

## Building Blocks of a Helm Deployment Pipeline

To leverage Helm, you do need a few pieces. The first would be a Kubernetes Cluster and then Helm Resources to deploy.

![Overview](static/first-helm-deployment/overview.png)

Harness does simplify this experience that you do not need to install a Helm Client on your machine to leverage Helm. There are several great Helm Chart Repositories out there, [Bitnami](https://bitnami.com/stacks/helm) being a great host to many Helm Charts. In this example, let’s wire a Bitnami Helm Chart into a Continuous Delivery Pipeline.

## Getting Started with Harness Continuous Delivery to Deploy a Helm Chart

Getting started with Harness CD is simple, first if you do not have a Harness Account, you can sign up for [free for Harness CD Account](https://app.harness.io/auth/#/signup/?module=cd&?utm_source=website&utm_medium=harness-developer-hub&utm_campaign=cd-plg&utm_content=get-started).

Once signed up, navigate to the Deployments icon on the left hand navigation and create your start your free forever CD Free Plan.

![Start CD](static/first-helm-deployment/start_cd.png)

Once you have clicked on “Start CD Free Plan”, a default Harness Project will be created for you automatically. Projects are logical groupings of resources. The generated default project is perfect for the first time deployment.

When navigating back to Deployments, can set the project context to the Default Project by clicking on the blue chevrons >> and selecting Default Project.

![Default Project](static/first-helm-deployment/default_project.png)

With the Default Project selected, clicking on Overview will bring up a wizard to create your first Pipeline/Deployment.

![New Pipeline](static/first-helm-deployment/new_pipeline.png)

There are a few Harness Objects that will need to be created in Harness. Harness works on a concept of worker nodes called [Harness Delegates](https://docs.harness.io/article/2k7lnc7lvl-delegates-overview). These Delegates can perform work on your behalf. One will need to be set up to deploy into a Kubernetes cluster. The second will be access to the Helm Chart Repository. 

## Install Delegate

Your onramp and workhorse in the Harness Platform is the Delegate which can run in several places. For this example, using the [Kubernetes Delegate](../platform/install-delegate) is the easiest.

## Creating Your First Harness Pipeline with Helm

With the Delegate install out of the way, you are now ready to create your first Harness Pipeline. You will be deploying a [WildFly](https://www.wildfly.org/) Helm Chart coming from a [public Helm Chart Repository](https://github.com/bitnami/charts/tree/master/bitnami/wildfly/#installing-the-chart). The following steps will walk you through how to create a Pipeline with those resources.

- Deployments -> Pipelines + Create new Pipeline
- Name: helm-pipeline
- Setup Pipeline: Inline

![Inline Pipeline](static/first-helm-deployment/inline.png)

Click Start and now can add a Pipeline Stage by clicking the +Add Stage icon.

![Deploy Stage](static/first-helm-deployment/deploy_stage.png)

Select Deploy as the Stage.
Next name the stage “Deploy Wildfly” as a type Service.

![Stage Name](static/first-helm-deployment/stage_name.png)

Then click Set Up Stage.

The first step is to define the Service e.g the “what” you are deploying by clicking on + New Service

![About Service](static/first-helm-deployment/about_service.png)

Name: my-wildfly-instance

![Service Name](static/first-helm-deployment/service_name.png)

Once Saved, the next step is to point to Bitnami’s WildFly Helm Chart. In the Service Definition section, select Native Helm as the Deployment Type. Then you can wire in the Helm Chart Repository information in the Manifest section.

![About Service](static/first-helm-deployment/about_service_defination.png)

Click on + Add Manifest in the Manifests Section then select Helm Chart as the Manifest Type.

![Manifest Type](static/first-helm-deployment/manifest_type.png)

Click Continue and then select HTTP Helm as the Helm Chart Store. Create a new HTTP Helm Repo to connect to Bitnami’s Helm Chart Repository by clicking + New HTTP Helm Repo Connector. Follow the wizard.

- Name: bitnami-helm
- Helm Repository URL: https://charts.bitnami.com/bitnami
- Authentication: Anonymous

![Repo URL](static/first-helm-deployment/repo_url.png)

Click Continue and can specify which Harness Delegate you would want to run the Helm operations on. If using this example, can select “Use any available Delegate”.

![Manifest Delegate](static/first-helm-deployment/manifest_delegate.png)

Click Save and Continue which will run through a Connection Test.

Now you can enter the Helm Chart information.

- Manifest Name: wildfly
- Chart Name: wildfly
- Helm Version: Version 3

![Helm Details](static/first-helm-deployment/helm_details.png)

Click Submit, and the WildFly Helm Chart will be wired to your Harness Pipeline Stage.

![Wired Manifest](static/first-helm-deployment/wired_manifest.png)

With the Helm Chart wired in, now you can define the “where” or the target Kubernetes cluster to deploy your Helm Chart to.

## Setting Your Deployment Target

With the “what” out of the way, the next two steps are the “where” and “how”. Click Continue after wiring in the Helm Chart, and you will be brought to the Infrastructure configuration.

![Add Stage](static/first-helm-deployment/add_stage.png)

The object being set up here is a [Harness Environment](https://docs.harness.io/article/n39w05njjv-environment-configuration); naming and saving the “where” you are deploying.

You can create a new Harness Environment via the wizard by clicking on + New Environment.

- Name: my-k8s-environment
- Environment Type: Pre-Production

![New Environment](static/first-helm-deployment/new_env.png)

Click Save and now you are ready to wire in your Kubernetes cluster. Since your Delegate should be running in a Kubernetes cluster, you can create a reference to this cluster with a Cluster Connector.

Select “Direct Connection” Kubernetes then can fill out the Cluster Details with a New Connector.

![Infra Defination](static/first-helm-deployment/infra_def.png)

Click on Select Connector and then + New Connector

Once clicked on + New Connector, can give a name to your Kubernetes cluster.

Name: my-k8s-cluster

![K8s Cluster Name](static/first-helm-deployment/k8s_name.png)

Click Continue and select “Use the credentials of a specific Harness Delegate” to connect.

![Cluter Connect](static/first-helm-deployment/cluster_connect.png)

Click Continue and select the Harness Delegate you installed into your Kubernetes Cluster e.g my-harness-delegate.

![K8s Delegate](static/first-helm-deployment/k8s_delegate.png)

Click Save and Continue and a connectivity test will occur.
Click Finish and you can enter a namespace that is available on the Kubernetes cluster.

- Namespace: default

![K8s Cluster Details](static/first-helm-deployment/cluster_details.png)

Click Continue and now you are ready to configure how you want your deployment to execute.

## How Your Pipeline Deploys

Clicking Continue, you are now ready to configure the Execution Strategy or the “how” your Pipeline executes. For the example, a Rolling Deployment is simplest.

![Deployment Strategy](static/first-helm-deployment/strategy.png)

Select “Rolling” then click on Use Strategy. Now you are ready to save this Pipeline and execute the Pipeline to create a deployment e.g a [Helm Release](https://helm.sh/intro/using_helm/).

![Pre Run](static/first-helm-deployment/pre_run.png)

Click Save and you are now ready to run your Pipeline executing the Helm Chart.

## Your First Pipeline Execution with Helm

Executing your Pipeline is easy. Just click Run back in the Pipelines menu and you are on your way to a Helm Release.

![Run Pipeline](static/first-helm-deployment/run.png)

Click Run Pipeline and your Pipeline will execute. In the “Install/Upgrade” section of the console output, you will see commands to visit your new Wildfly instance.

![Helm Output](static/first-helm-deployment/helm_output.png)

E.g.

```
kubectl get svc --namespace default release-6b428c463af2c7ed8766defc9ac7c844a02c7385-wildfly
```

Head to the External-IP and check out your new Helm Release.

![External IP](static/first-helm-deployment/external_ip.png)

Heading to http://34.123.210.140

![Wildfly](static/first-helm-deployment/wildfly.png)

Congratulations on your first Harness Helm Deployment [release]!
