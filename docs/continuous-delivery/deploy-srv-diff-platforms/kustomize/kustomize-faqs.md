---
title: Kustomize Deployment FAQs
description: Frequently asked questions about Kustomize deployments.
sidebar_position: 3
---

This article addresses some frequently asked questions about Kustomize deployments in Harness.

### What is Kustomize, and how does it relate to Harness Next-Gen?
Kustomize is a Kubernetes-native configuration management tool that simplifies the customization of Kubernetes manifests. In Harness Next-Gen, Kustomize is used to manage and customize Kubernetes manifests for deployments.


### What are Kustomize overlays, and why are they useful?
Kustomize overlays are a way to customize and extend Kubernetes manifests without modifying the original base manifests. Overlays allow you to apply environment-specific configurations, such as namespace, labels, and resource limits, to the base manifests, making it easier to manage different environments (e.g., dev, test, prod) within a single repository.


### Can I use variables and secrets with Kustomize overlays in Harness?
Yes, you can use Harness variables and secrets in your Kustomize overlays to parameterize configurations and securely manage sensitive data.


### What is the deployment process for Kustomize-based applications in Harness Next-Gen?
When you deploy a Kustomize-based application in Harness, Harness will automatically apply the specified overlay based on the target environment, ensuring that the Kustomized Kubernetes manifests are deployed correctly.


### Can I preview and validate Kustomize manifests in Harness before deployment?
Yes, Harness provides a preview and validation feature for Kustomize manifests, allowing you to review and validate the customized manifests for correctness before initiating a deployment.


### What are the benefits of using Kustomize manifest with Harness Next-Gen for Kubernetes deployments?
Using Kustomize with Harness simplifies the management of Kubernetes manifests by providing a declarative and version-controlled approach to customizations. It ensures consistency across environments and simplifies the deployment process.


### What Kustomize binary versions Harness Support?

Harness includes Kustomize binary versions 3.5.4 and 4.0.0. By default, Harness uses 3.5.4. 
To use 4.0.0, you must enable the feature flag NEW_KUSTOMIZE_BINARY in your account


### What are the constraints regarding Kustomize build commands within Harness, specifically in terms of supported commands and their functionality?

Harness supports the Kustomize `build` command only. The Kustomize `build` command builds a kustomization target from a directory or URL.
Please read more on this in the following [Documentation](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/kustomize/use-kustomize-for-kubernetes-deployments#limitations-1)


### Can I design a pipeline to deploy Helm charts hosted in a remote private Helm registry and using Kustomize to patch the Helm charts?

Native Helm doesn't support Kustomize; however, you could use [service hooks](https://developer.harness.io/docs/continuous-delivery/deploy-srv-diff-platforms/helm/deploy-helm-charts/#service-hooks) for this.
