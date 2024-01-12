---
title: ApplicationSet basics
description: Understand the basics for ApplicationSet.
sidebar_position: 1
---

This topic describes Harness ApplicationSet concepts.

A typical GitOps application syncs a source manifest to a destination cluster. If you have multiple target clusters, you could create separate GitOps applications for each one, but that makes management more challenging. What if you want to sync an application with 100s of target clusters? Managing 100s of GitOps applications is not easy.

To solve this use case, GitOps provides ApplicationSets.

## ApplicationSet overview

An ApplicationSet works like an application factory. It defines one application template and syncs it to multiple target environments. It is similar to an application but uses a template to achieve application automation with multiple target environments.

The ApplicationSet CRD is managed by the dedicated Kubernetes controller, `applicationset-controller`, similar to the Application CRD being managed by `application-controller`.

ApplicationSets offer the following capabilities:

* Use a single manifest to target multiple Kubernetes clusters.
* Use a single manifest to deploy multiple applications from single or multiple git repositories.
* Enhanced support for the monorepos, where multiple application resources are defined within a single Git repository.

You can find more information about ApplicationSets in [Argo CD ApplicationSets documentation](https://argocd-applicationset.readthedocs.io/en/stable/).

In Harness, ApplicationSets are often used with a [PR pipeline](/docs/continuous-delivery/gitops/pr-pipelines/). A Harness PR pipeline has the power to update the config and sync changes to the application in just one of the target environments.

## ApplicationSet resource

Each ApplicationSet spec has 2 main fields: templates and generators.

### Templates

An ApplicationSet template is the template for the application to be created. It has parameterized fields that can be substituted to create the application.

Parameters should be in the format `{{parameter name}}`.

### Generators

An ApplicationSet generator generates parameters to be substituted in the template section of the ApplicationSet resource.

There are many types of generators. Harness supports all ApplicationSet generators. You can add an ApplicationSet for any generator as an application in Harness. 

For more information on available generators, go to the [Argo CD documentation](https://argocd-applicationset.readthedocs.io/en/stable/Generators/).

Each generator solves a different use case, but gives you the same end result: a deployed application. Which generator you select depends factors such as the number of clusters managed, git repository layout, etc.

### Generator support in PR pipelines

* The [Git generator](https://argocd-applicationset.readthedocs.io/en/stable/Generators-Git/) has first class support with the Update Release Repo and Merge PR steps in the Harness PR pipeline.

* All generators can be used in Shell Script steps. For example, you could create a cluster generator YAML spec in a Shell Script step as a bash variable, and then use Git commands in the script to update the ApplicationSet in your repo with the spec in the step. The updated repo spec will be used in the next Application sync (manual or automatic).

For information on PR pipeline integration, review the execution steps in [Create Harness GitOps PR pipelines](/docs/continuous-delivery/gitops/pr-pipelines/#review-execution-steps).

### Generator example

Here is an example for the Git generator.

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

After the generated parameters are substituted into the template, once for each set of parameters by the ApplicationSet controller, each rendered template is converted into an application resource, thus creating multiple applications from a unified manifest.

For more information, refer to the [Argo CD ApplicationSet documentation](https://argo-cd.readthedocs.io/en/stable/operator-manual/applicationset/).
