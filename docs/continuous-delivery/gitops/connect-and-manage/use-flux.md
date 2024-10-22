---
title: Manage Flux applications with Harness GitOps
description: Manage Flux applications from the Harness GitOps user interface.
sidebar_label: Manage Flux applications
sidebar_position: 4
---

If you are managing workloads with Flux, you can also manage them from the GitOps user interface in Harness. Support for managing Flux workloads is accomplished by connecting the Harness GitOps agent to Flux through a special flux application resource in ArgoCD. The resource is the Flux Subsystem for Argo (FSA), also known as Flamingo. You can use the GitOps user interface to manage both regular ArgoCD and Flux resources, and view them all on the GitOps dashboard. 

When you create a Flux application, to make the application available in the GitOps user interface, you only need to specify that the application is of type *Flux* and provide the existing Flux manifests. You also need to select Flux as the sync policy so that Flux becomes the GitOps reconciler for that application. For more information about how FSA works, go to [Flux Subsystem for Argo](https://flux-subsystem-argo.github.io/website/).

## Prerequisites:

Before you can manage Flux applications from the Harness GitOps user interface, complete the following tasks:

* Install Flux in your Kubernetes cluster. For information about installing Flux, go to the [Flux installation](https://fluxcd.io/flux/installation/) documentation. 

* Create a Harness account and verify that you have access to the Continuous Delivery and GitOps module.

## Configure Harness to manage a Flux application

To enable Harness to manage a Flux application, do the following:
* When creating a GitOps agent, select Flux as the GitOps operator. You configure all other configuration settings in the same way as you configure a Harness GitOps agent. For more information, go to [Install a Harness GitOps Agent](/docs/continuous-delivery/gitops/connect-and-manage/install-a-harness-git-ops-agent).
* When creating an application, select Flux as the GitOps operator. You configure all other configuration settings in the same way as you configure any GitOps application. For more information, go to [Harness CD GitOps tutorial](/docs/continuous-delivery/gitops/get-started/harness-cd-git-ops-quickstart).