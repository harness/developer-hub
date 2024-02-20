---
title: Manage Kustomize applications with Harness GitOps
description: Manage Kustomize applications from the Harness GitOps user interface.
sidebar_label: Manage Kustomize applications
sidebar_position: 4
---

If you are managing workloads with Kustomize, you can also manage them from the GitOps user interface in Harness. Support for managing Kustomize workloads is accomplished by connecting the Harness GitOps agent to Kustomize through a special application resource in ArgoCD. You can use the GitOps user interface to manage both regular ArgoCD and Kustomize resources, and view them all on the GitOps dashboard. 

When you create a Kustomize application, to make the application available in the GitOps user interface, you only need to specify that the application is of type *Kustomize* and provide the existing Kustomize manifests. You also need to select Kustomize as the sync policy so that Kustomize becomes the GitOps reconciler for that application. 

## Prerequisites:

Before you can manage Kustomize applications from the Harness GitOps user interface, complete the following tasks:

* Install Kustomize in your Kubernetes cluster. For more information, go to [Kustomization file](https://kubectl.docs.kubernetes.io/references/kustomize/kustomization/).

* Create a Harness account and verify that you have access to the Continuous Delivery and GitOps module.

## Configure Harness to manage a Kustomize application

To enable Harness to manage a Kustomize application, do the following:
* When creating a GitOps agent, select Kustomize as the GitOps operator. You configure all other configuration settings in the same way as you configure a Harness GitOps agent. For more information, go to [Install a Harness GitOps Agent](/docs/continuous-delivery/gitops/use-gitops/install-a-harness-git-ops-agent).
* When creating an application, select Kustomize as the GitOps operator. You configure all other configuration settings in the same way as you configure any GitOps application. For more information, go to [Harness CD GitOps tutorial](/docs/continuous-delivery/gitops/get-started/harness-cd-git-ops-quickstart).

Here is a sample Kustomize specific configuration yaml.

```yaml
# kustomize specific config
    kustomize:
      # Optional kustomize version. Note: version must be configured in argocd-cm ConfigMap
      version: v3.5.4
      # Supported kustomize transformers. https://kubectl.docs.kubernetes.io/references/kustomize/kustomization/
      namePrefix: prod-
      nameSuffix: -some-suffix
      commonLabels:
        foo: bar
      commonAnnotations:
        beep: boop-${ARGOCD_APP_REVISION}
      # Toggle which enables/disables env variables substitution in commonAnnotations
      commonAnnotationsEnvsubst: true
      images:
      - gcr.io/heptio-images/ks-guestbook-demo:0.2
      - my-app=gcr.io/my-repo/my-app:0.1
      namespace: custom-namespace
      replicas:
      - name: kustomize-guestbook-ui
        count: 4
```
