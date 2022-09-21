---
sidebar_position: 1
---

# Continuous Delivery Helm Tutorial

## Background on Helm
Introduced during the first KubeCon, [Helm](https://harness.io/blog/what-is-helm) has been a stalwart in the Kubernetes ecosystem almost since the inception of Kubernetes. If you are unfamiliar with Helm, Helm is a package manager for Kubernetes; similarly to Homebrew on your Mac or Chocolatey on your Windows machine. 

A Helm Chart is the unit of packaging that Helm creates/applies. Helm also has templating abilities so interactions or reuse with Helm Charts can be templated out. 

*Example structure of a Wordpress Helm Chart:*

![Helm Structure](static/first-helm-deployment/helm_structure.png)

Having a Helm Chart(s) as part of your Continuous Delivery Pipeline when deploying to Kubernetes is simple with Harness. From installing third party pieces of software/platforms to deploying your own application represented with Helm, this example will get your Helm Deployment integrated into a Pipeline. 

## Building Blocks of a Helm Deployment Pipeline
To leverage Helm, you do need a few pieces. The first would be a Kubernetes Cluster and then Helm Resources to deploy. 

![Overview](static/first-helm-deployment/overview.png)

Harness does simplify this experience that you do not need to install a Helm Client on your machine to leverage Helm. There are several great Helm Chart Repositories out there, [Bitnami](https://bitnami.com/stacks/helm) being a great host to many Helm Charts. In this example, let’s wire a Bitnami Helm Chart into a Continuous Delivery Pipeline.  

## Getting Started with Harness Continuous Delivery to Deploy a Helm Chart
Getting started with Harness CD is simple, first if you do not have a Harness Account, you can sign up for [free for Harness CD Account](https://app.harness.io/auth/#/signup/?module=cd).  

Once signed up, navigate to the Deployments icon on the left hand navigation and create your start your free forever CD Free Plan. 

![Start CD](static/first-helm-deployment/start_cd.png)

Once you have clicked on “Start CD Free Plan”, a default Harness Project will be created for you automatically. Projects are logical groupings of resources. The generated default project is perfect for the first time deployment. 

When navigating back to Deployments, can set the project context to the Default Project by clicking on the blue chevrons >> and selecting Default Project. 

![Default Project](static/first-helm-deployment/default_project.png)

With the Default Project selected, clicking on Overview will bring up a wizard to create your first Pipeline/Deployment.

![New Pipeline](static/first-helm-deployment/new_pipeline.png)

There are a few Harness Objects that will need to be created in Harness. Harness works on a concept of worker nodes called [Harness Delegates](https://docs.harness.io/article/2k7lnc7lvl-delegates-overview). These Delegates can perform work on your behalf. One will need to be set up to deploy into a Kubenetes cluster. The second will be access to the Helm Chart Repository. Let’s set up the Harness Delegate first. 
