---
title: Use Argo Rollouts
description: Learn how to use Argo Rollouts with Harness GitOps.
sidebar_position: 3
---

## Introduction to Argo Rollouts

Argo Rollouts is an enhancement for ArgoCD that brings advanced deployment capabilities, notably Blue-Green and Canary strategies. 

Harness GitOps integrates with both ArgoCD and Argo Rollouts to provide a declarative model for progressive deployment strategies that can be used with your Harness GitOps managed deployments. 

Progressive deployment strategies improve the deployment process by enabling safer and more controlled updates, which in turn enhance uptime and user experience.

### Why Argo Rollouts?

- **Safer Updates**: Gradual rollouts minimize risks associated with deploying new versions.
- **Traffic Control**: Provides capabilities to manage and steer traffic between old and new versions effectively.
- **Advanced Strategies**: Supports sophisticated deployment strategies like Blue-Green and Canary without the need for complex custom scripting.

## Installation

**Prerequisites**:
- Access to a Kubernetes cluster.
- Harness account with necessary permissions.
- Argo CD instance provided by Harness.
- kubectl installed and configured.

### Install Argo Rollouts Controller:

#### From the CLI 

Deploy the Argo Rollouts controller into your Kubernetes cluster to start using its features.

```
kubectl create namespace argo-rollouts
kubectl apply -n argo-rollouts -f https://github.com/argoproj/argo-rollouts/releases/latest/download/install.yaml
```

#### From a Helm Chart in ArgoCD

First create a new Argo Application. Choose the proper GitOps agent, and optionally add a service and environment.

![](./static/use-argo-rollouts-1.png)

On the next screen setup your sync policy:

![](./static/use-argo-rollouts-2.png)

And on the final screen add the repository:

![](./static/use-argo-rollouts-3.png)

When defining the source, we will use the upstream helm chart:

![](./static/use-argo-rollouts-4.png)

Once complete, ArgoCD will begin deploying all the necessary Argo Rollouts components. 

Navigate to the **GitOps applications** view again and find your new rollouts service with the name you gave it. After a few moments (depending on your cluster's performance), you should see the application enter a synced and healty state.

![](./static/use-argo-rollouts-5.png)

Check the application's resource tab to verify that everything is installed and working before moving on to the next section. 

### Deploying a Canary Deployment

This guide will use a demo repository to help walk through a canary deployment. To use the demo repo, go to [Harness Rollouts Demo](https://github.com/mansong1/rollouts-demo.git).

#### Deploy the Demo Application

First go to github and clone this repo: 

```yaml
repoURL: https://github.com/mansong1/rollouts-demo.git
```

Create a new ArgoCD application. Its name and sync options are up to you, but make sure that you are using the same GitOps agent that you installed Argo Rollouts into above.

Then, use the **Source** setup page to deploy the demo app from the clone you just made. To do so, update the following fields as indicated:

- **Repository URL**: `https://github.com/mansong1/rollouts-demo.git`
- **Target Revision**: `master`
- **Path**: `examples/canary`

Once these are filled, Kustomize options will pop up. You can leave those as is and click **Continue**.

![](./static/use-argo-rollouts-6.png)

Next, choose your cluster and an existing namespace.

![](./static/use-argo-rollouts-7.png)

Now, you should be able to browse to your application in Harness under **GitOps Applications**. Once it has been deployed by the system, you should see something like this:

![](./static/use-argo-rollouts-8.png)

#### Validation and Finalization

Clicking into the `canary-demo` application will reveal a page which shows the progress of your deployment. Check this page after the traffic is switched to ensure the new version is stable and performs as expected. Roll back if any issues are detected.

![](./static/use-argo-rollouts-9.png)

## Best Practices

- **Regularly Update**: Stay current with the latest versions of Argo Rollouts and its plugins.
- **Monitor Rollouts**: Continuously observe rollouts to detect and respond to any issues promptly.
- **Understand Strategy Nuances**: Deeply understand how Blue-Green, Canary, and other strategies work to leverage them effectively.

## Conclusion

Argo Rollouts adds a layer of sophistication to Kubernetes deployments, providing teams with the tools needed for safer, more controlled updates. By utilizing its capabilities, you can ensure that your application rollouts are smooth and reliable.