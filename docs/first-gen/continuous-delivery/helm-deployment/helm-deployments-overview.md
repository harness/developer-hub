---
title: Helm Native Deployment Guide Overview
description: Overview of deploying a Docker image to a Kubernetes cluster using a Helm chart.
sidebar_position: 10
helpdocs_topic_id: ii558ppikj
helpdocs_category_id: 7gqn6m2t46
helpdocs_is_private: false
helpdocs_is_published: true
---

This content is for Harness [FirstGen](../../../getting-started/harness-first-gen-vs-harness-next-gen.md). Switch to [NextGen](https://docs.harness.io/article/lbhf2h71at).

Harness supports Helm 2 and Helm v3. This guide will walk you through deploying a Docker image to a Kubernetes cluster using a Helm chart. This deployment scenario is very popular and a walkthrough of all the steps involved will help you set up this scenario in Harness for your own microservices and apps.

Harness includes both Kubernetes and Helm deployments, and you can use Helm charts in both. Harness [Kubernetes Deployments](../kubernetes-deployments/kubernetes-deployments-overview.md) allow you to use your own Helm chart (remote or local), and Harness executes the Kubernetes API calls to build everything without Helm and Tiller (for Helm v2) needing to be installed in the target cluster. See [Helm Charts](https://docs.harness.io/article/t6zrgqq0ny-kubernetes-services#helm_charts).

### Harness Helm or Kubernetes Deployments?

You can also use Helm with Harness Kubernetes Service and deployments and take advantage of Harness advanced Kubernetes features. See [Kubernetes Deployments Overview](../kubernetes-deployments/kubernetes-deployments-overview.md).

The main difference is that the Helm deployment performed using the Harness Helm Service and described in this guide uses Tiller. If you use Harness Kubernetes Service for deployment, you do not need to use Tiller.

### Blog Post

The following blog post walks you through creating a Helm 3 deployment from scratch using Harness, including a video walkthrough:

[Welcome to the Harness Family, Helm V3!](https://harness.io/2020/02/welcome-to-the-harness-family-helm-v3/?wvideo=1adpr2fxl1)

### Introduction

You can perform all of the steps in this guide using free accounts. You will need a Docker Hub account and a Google Cloud Platform account. Both offer free accounts.

This document covers Harness Helm implementation. For Kubernetes implementation, see [Kubernetes Deployments](https://docs.harness.io/category/kubernetes-deployments).

#### Intended Audience

* Developers and DevOps with a working knowledge of Docker, Kubernetes, and Helm.
* Harness users with a working knowledge of the Harness Delegate. For information, see [Delegate Installation](https://docs.harness.io/article/h9tkwmkrm7-delegate-installation), [Harness Requirements](https://docs.harness.io/article/70zh6cbrhg-harness-requirements), and [Connectivity and Permissions Requirements](https://docs.harness.io/article/11hjhpatqz-connectivity-and-permissions-requirements).

If you are entirely new to Harness, please see the [Quick Start Setup Guide](https://docs.harness.io/article/9hd68pg5rs-quick-start-setup-guide).

#### What Are We Going to Do?

This guide walks you through deploying a publicly available Docker image of NGINX to a Google Cloud Platform (GCP) Kubernetes cluster using a publicly available Bitnami Helm chart. Basically, we do the following:

* **Docker** - Pull a Docker image of NGINX from Docker Hub.
* **Helm** - Use a Bitnami Helm chart for NGINX from their Github repo and define the Kubernetes service and deployment rules.
* **Kubernetes** - Deploy to a GCP Kubernetes cluster that is configured with Helm and Tiller.

Sound fun? Let's get started.

#### What Are We Not Going to Do?

This is a simple guide that covers the basics of deploying Docker images to Kubernetes using Helm. It does not cover the following:

* **Ingress Rules** - Harness supports Ingress Rules for Kubernetes deployments. You can learn how to use Ingress Rules in [Ingress Rules](https://docs.harness.io/article/fc3nlsr0hh-ingress-rules). For a Harness deployment using Helm, you can add Ingress rules in a Helm chart file (**kind: Ingress**) and Harness will use those during deployment. For information about Ingress rules and Helm, see [Secure Kubernetes Services With Ingress, TLS And LetsEncrypt](https://docs.bitnami.com/kubernetes/how-to/secure-kubernetes-services-with-ingress-tls-letsencrypt/) from Bitnami.

#### What Harness Needs Before You Begin

The following are required to deploy to Kubernetes using Helm via Harness:

* **An account with a Docker Artifact Server** you can connect to Harness, such as Docker Hub.
* **An account with a Kubernetes provider** you can connect to Harness, such as Google Cloud Platform.
* Kubernetes Cluster with **Helm and Tiller** installed and running on one pod.
* **Helm chart** hosted on a server accessible with anonymous access.
* **Harness Delegate** installed that can connect to your Artifact Server and Cloud Provider.

We will walk you through the process of setting up Harness with connections to the artifact server and cloud provider, specifications for the Kubernetes cluster, commands for setting up Helm and Tiller on your Kubernetes cluster, and provide examples of a working Helm chart template.

### Next Step

* [1 - Delegate, Providers, and Helm Setup](2-connectors-providers-and-helm-setup.md)

