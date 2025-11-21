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

:::note Version Compatibility Notes
When upgrading between ArgoCD versions, be aware of these important changes:

**ArgoCD 2.10 to 2.14 Changes:**
- **ApplicationSet Controller Permissions**: In version 2.10, the ApplicationSet controller only required `get` permissions on app projects, but in version 2.14 it also requires `list` permission on app projects. Update your RBAC configurations accordingly.
- **Cluster Secret Scoping**: From version 2.12, cluster secrets with a non-empty project field are now strictly scoped to that project. Applications or ApplicationSets from other projects can no longer use these secrets.
- **Project API Response**: In version 2.14, project API responses were sanitized to remove sensitive information like credentials of project-scoped repositories and clusters for security reasons.
- **Helm Version**: Helm was upgraded multiple times between these versions, with version 2.14 using Helm 3.16.2.

When upgrading, always refer to the [official ArgoCD upgrade documentation](https://argo-cd.readthedocs.io/en/latest/operator-manual/upgrading/overview/) for complete details.
:::

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

### Supported Generator Types

Harness supports all Argo CD ApplicationSet generators. Each generator reads from a different source and produces parameters for creating applications.

| Generator | Description | Use Case |
|-----------|-------------|----------|
| **[List](https://argo-cd.readthedocs.io/en/stable/operator-manual/applicationset/Generators-List/)** | Static list of parameters | Deploy to known set of environments/clusters |
| **[Cluster](https://argo-cd.readthedocs.io/en/stable/operator-manual/applicationset/Generators-Cluster/)** | Generate from registered clusters | Deploy to all clusters matching labels |
| **[Git - Directories](https://argo-cd.readthedocs.io/en/stable/operator-manual/applicationset/Generators-Git/#git-generator-directories)** | Generate from Git directories | Monorepo with multiple apps in directories |
| **[Git - Files](https://argo-cd.readthedocs.io/en/stable/operator-manual/applicationset/Generators-Git/#git-generator-files)** | Generate from Git files | Config-driven deployments with JSON/YAML files |
| **[Matrix](https://argo-cd.readthedocs.io/en/stable/operator-manual/applicationset/Generators-Matrix/)** | Combine multiple generators | Deploy multiple apps to multiple clusters |
| **[Merge](https://argo-cd.readthedocs.io/en/stable/operator-manual/applicationset/Generators-Merge/)** | Merge parameters from generators | Override parameters from multiple sources |
| **[SCM Provider](https://argo-cd.readthedocs.io/en/stable/operator-manual/applicationset/Generators-SCM-Provider/)** | Generate from SCM repos | Deploy from all repos in GitHub/GitLab org |
| **[Pull Request](https://argo-cd.readthedocs.io/en/stable/operator-manual/applicationset/Generators-Pull-Request/)** | Generate from pull requests | Preview environments for PRs |
| **[Cluster Decision Resource](https://argo-cd.readthedocs.io/en/stable/operator-manual/applicationset/Generators-Cluster-Decision-Resource/)** | Generate from custom resources | Dynamic cluster selection based on custom logic |
| **[Plugin](https://argo-cd.readthedocs.io/en/stable/operator-manual/applicationset/Generators-Plugin/)** | Custom generator plugins | Custom logic for parameter generation |

### List Generator Example

The List generator is ideal for initial setup and testing ApplicationSets. It uses a static list of parameters to generate applications.

Here's an example using the List generator:

```yaml
apiVersion: argoproj.io/v1alpha1
kind: ApplicationSet
metadata:
  name: guestbook
spec:
  generators:
  - list:
      elements:
      - ns: engineering-dev
        url: https://kubernetes.default.svc
      - ns: engineering-prod
        url: https://kubernetes.default.svc
  template:
    metadata:
      name: '{{ns}}-guestbook'
      labels:
        harness.io/serviceRef: guestbook
        harness.io/envRef: '{{ns}}'
    spec:
      project: default
      source:
        repoURL: https://github.com/argoproj/argo-cd.git
        targetRevision: HEAD
        path: applicationset/examples/list-generator/guestbook/{{ns}}
      destination:
        server: '{{url}}'
        namespace: '{{ns}}'
      syncPolicy:
        automated:
          prune: true
          selfHeal: true
```

This example creates two applications (one for dev, one for prod) from a static list of parameters.

### Git Generator Example

The Git generator is the most common pattern for production use cases. It follows the GitOps methodology by storing application configurations in Git, allowing you to track changes through Git history and leverage Git workflows for managing applications.

Here's an example using the Git Directory generator:

```yaml
apiVersion: argoproj.io/v1alpha1
kind: ApplicationSet
metadata:
  name: cluster-addons
spec:
  generators:
  - git:
      repoURL: https://github.com/argoproj/argo-cd.git
      revision: HEAD
      directories:
      - path: applicationset/examples/git-generator-directory/cluster-addons/*
  template:
    metadata:
      name: '{{path.basename}}'
      labels: 
        harness.io/envRef: '{{envTag}}'
        harness.io/serviceRef: '{{serviceTag}}'
        harness.io/buildRef: '{{releaseTag}}'
    spec:
      project: "default"
      source:
        repoURL: https://github.com/argoproj/argo-cd.git
        targetRevision: HEAD
        path: '{{path.path}}'
      destination:
        server: https://kubernetes.default.svc
        namespace: '{{path.basename}}'
      syncPolicy:
        syncOptions:
        - CreateNamespace=true
```

This example:
- Scans the specified Git repository path for directories
- Creates one application per directory found
- Uses the directory name as the application name and namespace
- Includes Harness-specific labels for Service and Environment tracking

**When to use List vs Git generators:**
- **List Generator**: Best for initial setup, testing, and scenarios with a small, fixed number of environments that rarely change
- **Git Generator**: Recommended for production use as it stores application change logs in Git, follows GitOps principles, and scales better for managing multiple applications

For more information and examples of Git generators (including Git Files generator), refer to the [Argo CD Git Generator documentation](https://argo-cd.readthedocs.io/en/stable/operator-manual/applicationset/Generators-Git/) and [Argo CD ApplicationSet examples](https://github.com/argoproj/applicationset/tree/master/examples).

## Sync Policy Options

When creating an ApplicationSet, you can configure sync policies that govern how the ApplicationSet manages its child applications. These policies are set during ApplicationSet creation and determine the lifecycle management of generated applications.

### Sync Options

#### Preserve Resource On Deletion

When enabled, this option preserves Kubernetes resources even when the application is deleted from Argo CD. This is useful when you want to remove the application from Argo CD management but keep the deployed resources running in the cluster.

### Applications Sync

The Applications Sync policy controls how the ApplicationSet controller manages the lifecycle of its child applications. This policy is configured in the ApplicationSet manifest and determines whether the controller can create, update, or delete applications.

:::info Harness Support Status
In Harness, currently only the **Sync** policy is supported. Other policy options may appear in the UI but are not yet functional. Below is the complete list of available Argo CD policies for reference.
:::

You can select one of the following options:

#### Create-Only (`applicationsSync: create-only`)

- **Behavior**: Only creates new applications when they are generated by the ApplicationSet. Prevents the ApplicationSet controller from modifying or deleting applications.
- **Updates**: Does not update existing applications automatically
- **Deletions**: Does not delete applications when they are no longer generated
- **Use Case**: When you want manual control over application updates and deletions after initial creation

#### Create-Update (`applicationsSync: create-update`)

- **Behavior**: Creates new applications and updates existing ones. Prevents the ApplicationSet controller from deleting applications but allows updates.
- **Updates**: Automatically updates applications when generator parameters change
- **Deletions**: Does not delete applications when they are no longer generated
- **Use Case**: When you want automatic updates but manual control over deletions

#### Create-Delete (`applicationsSync: create-delete`)

- **Behavior**: Creates new applications and deletes removed ones. Prevents the ApplicationSet controller from modifying applications but allows deletion.
- **Updates**: Does not update existing applications automatically
- **Deletions**: Automatically deletes applications when they are no longer generated
- **Use Case**: When you want automatic cleanup but manual control over updates

#### Sync (default behavior)

- **Behavior**: Fully automated lifecycle management. The ApplicationSet controller can create, update, and delete applications.
- **Updates**: Automatically updates applications when generator parameters change
- **Deletions**: Automatically deletes applications when they are no longer generated
- **Use Case**: Recommended for most scenarios where you want full automation

:::tip
The **Sync** option is currently the only supported policy in Harness and is recommended as it provides full automation and keeps your applications in sync with the ApplicationSet configuration.
:::

:::note
The sync policy for ApplicationSets is managed by the Argo CD ApplicationSet controller and is separate from the sync policy of individual applications. Application-level sync operations (manual or automated) are controlled by Argo CD's application controller based on each application's own `syncPolicy` configuration.
:::


## Additional Resources

- [Create and manage ApplicationSets](/docs/continuous-delivery/gitops/applicationsets/harness-git-ops-application-set-tutorial)
- [Argo CD ApplicationSet Generators](https://argo-cd.readthedocs.io/en/stable/operator-manual/applicationset/Generators/)
- [Argo CD ApplicationSet Specification](https://argo-cd.readthedocs.io/en/stable/operator-manual/applicationset/applicationset-specification/)
- [Harness GitOps PR Pipelines](/docs/continuous-delivery/gitops/pr-pipelines/)
