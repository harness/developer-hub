---
title: ApplicationSet Basics
description: Understand the basics for ApplicationSet.
sidebar_position: 1
redirect_from:
  - /docs/continuous-delivery/gitops/appset-basics
---
## Introduction
A typical GitOps Application syncs a source manifest to a destination cluster. If you have multiple target clusters, you could create separate GitOps Applications for each one, but that makes management more challenging. What if you want to sync an application with 100s of target clusters? Managing 100s of GitOps Applications is not easy.

To solve this use case, we can explore ApplicationSets.

ApplicationSet can be thought of as a kind of Application factory. It defines one application template and syncs it to multiple target environments. It is similar to an Application but uses a template to achieve application automation with multiple target environments.

ApplicationSet CRD is managed by dedicated kubernetes controller, applicationset-controller similar to Application CRD being managed by application-controller.

ApplicationSets offer the following capabilities:

* Use a single manifest to target multiple Kubernetes clusters.
* Use a single manifest to deploy multiple Applications from a single or multiple git repositories.
* Enhanced support for the monorepos, where multiple Application resources are defined within a single Git repository.

You can find more information about ApplicationSets from the [ApplicationSets documentation site](https://argocd-applicationset.readthedocs.io/en/stable/).

ApplicationSets are often used with the [PR pipeline](/docs/continuous-delivery/gitops/pr-pipelines/). A Harness PR pipeline has the power to update the config and sync changes to the application in just one of the target environments.


## ApplicationSet resource
Each ApplicationSet spec has 2 main fields - generators and template.

### Template
Template is the template for the Application to be created. It has parameterized fields which can be substituted to create the Application.

Parameters should be in the format `{{parameter name}}`.

### Generator
Generator generate parameters to be substituted in the template section of the ApplicationSet resource.

There are many types of generators, Harness supports all ApplicationSet generators. You can add an ApplicationSet for any generator as an Application in Harness. For more information on the available generators, refer to the [documentation](https://argocd-applicationset.readthedocs.io/en/stable/Generators/).

Each generator solves a different use case, but gives you the same end result - deployed Argo CD Applications. What you use would depend on a lot of factors like the number of clusters managed, git repository layout, etc.

#### Support in PR pipeline
* [Git Generator](https://argocd-applicationset.readthedocs.io/en/stable/Generators-Git/) has first class support with the Update Release Repo and Merge PR steps in the PR pipeline.

* All generators can be used in Shell Script steps. For example, you could create a Cluster generator YAML spec in a Shell Script step as a bash variable, and then use git commands in the script to update the ApplicationSet in your repo with the spec in the step. The updated repo spec will be used in the next Application sync(manual or automatic).

For integration with PR pipeline, please refer to the [pipeline documentation](/docs/continuous-delivery/gitops/pr-pipelines/#review-execution-steps).

### Example

The below is an example for the git generator.
```yaml
apiVersion: argoproj.io/v1alpha1
kind: ApplicationSet
metadata:
  name: addons
spec:
  generators:
  - git:
      repoURL: https://github.com/argoproj/argo-cd.git
      revision: HEAD
      directories:
      - path: applicationset/examples/git-generator-directory/cluster-addons/*
  template:
    metadata:
      name: '{{.path.basename}}'
      labels: 
        harness.io/envRef: '{{envTag}}'
        harness.io/serviceRef: '{{serviceTag}}'
        harness.io/buildRef: '{{releaseTag}}'
    spec:
      project: "1bcfghj"
      source:
        repoURL: https://github.com/argoproj/argo-cd.git
        targetRevision: HEAD
        path: '{{.path.path}}'
      destination:
        server: https://kubernetes.default.svc
        namespace: '{{.path.basename}}'
      syncPolicy:
        syncOptions:
        - CreateNamespace=true
```

After the generated parameters are substituted into the template, once for each set of parameters by the ApplicationSet controller, each rendered template is converted into an Application resource, thus creating multiple applications from a unified manifest.

For more information, refer to the [Argo ApplicationSet documentation](https://argo-cd.readthedocs.io/en/stable/operator-manual/applicationset/).
