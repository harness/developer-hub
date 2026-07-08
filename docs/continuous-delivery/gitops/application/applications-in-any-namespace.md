---
title: Applications in any namespace
sidebar_label: Applications in Any Namespace
description: Configure your GitOps agent to deploy Argo CD applications into namespaces other than the agent namespace.
keywords:
  - gitops
  - applications
  - namespace
  - multi-tenancy
  - appproject
  - sourceNamespaces
tags:
  - gitops
sidebar_position: 6
---

import { Troubleshoot } from '@site/src/components/AdaptiveAIContent';

By default, Harness GitOps deploys Argo CD Application resources into the namespace where the GitOps Agent is installed. The **Applications in any namespace** feature lets you deploy Application resources into other namespaces on the same cluster, which enables multi-tenancy and self-service workflows for application teams.

Each participating namespace must be declared in two places:

- The agent's **Application Namespaces** field, which tells the agent's informer which namespaces to watch.
- The AppProject's `sourceNamespaces` field, which enforces the security boundary and controls which namespaces can host Applications that belong to the project.

---

## Before you begin

- **Cluster-wide agent required.** The agent must be installed in cluster-wide mode (`isNamespaced=false`). Namespace-scoped agents and Harness Hosted agents do not support this feature.
- **AppProject access.** You need permission to create or edit AppProjects in Harness. Go to [Manage permissions](/docs/continuous-delivery/gitops/application/manage-permissions) to review the required roles.
- **Existing resources are unaffected.** Enabling Application Namespaces on an agent does not change existing applications. They continue to run without any migration.

---

## Enable Application Namespaces on a new agent

When you create a new agent in Harness, the **Application Namespaces** field is under **Advanced** > **Argo CD Settings** in the agent creation wizard.

1. In your Harness project, go to **GitOps** and select **Settings > GitOps Agents**.
2. Select **New GitOps Agent**.
3. Complete the agent configuration steps.
4. Expand **Advanced** and select **Argo CD Settings**.
5. In the **Application Namespaces** field, enter a comma-separated list of namespaces the agent should watch.

   - Enter `*` to allow all namespaces on the cluster.
   - Leave the field empty to default to the agent's own namespace only.

6. Finish creating the agent and install the generated manifests on your cluster.

---

## Update Application Namespaces after agent creation

You cannot update the **Application Namespaces** value through the agent API or the Harness UI after the agent is created. The only supported path is the **Generate YAML** workflow.

1. In your Harness project, go to **GitOps** and select **Settings > GitOps Agents**.
2. Select the agent you want to update.
3. Select **Generate YAML**, expand **Advanced**, select **Argo CD Settings**, and update the **Application Namespaces** field.
4. Download or copy the regenerated manifests.
5. Apply the updated manifests on your cluster.

The source of truth for the agent's namespace configuration is the `argocd-cmd-params-cm` ConfigMap on the cluster. If you edit this ConfigMap directly outside of Harness, the Harness UI will show stale configuration until you regenerate and re-apply the manifests through Harness.

---

## Configure AppProject source namespaces

The `sourceNamespaces` field on an AppProject controls which namespaces are permitted to host Application resources that belong to the project. Without this field, only the agent namespace is allowed.

### Create or edit an AppProject with source namespaces

1. In your Harness project, go to **GitOps** and select **Settings > AppProjects**.
2. Create a new AppProject or open an existing one.
3. In the **Source Namespaces** field, enter the namespaces that are permitted to host applications.

   - Use a specific name such as `my-team-ns`.
   - Use a wildcard pattern such as `team-*` to match all namespaces that start with `team-`.
   - Use a regex pattern such as `/^team-[a-z]+$/` for more precise matching.
   - Use `*` to allow all namespaces.

4. Save the AppProject.

### Example: Terraform configuration

```hcl
resource "harness_platform_gitops_app_project" "example" {
  agent_id   = "my-agent"
  org_id     = var.org_id
  project_id = var.project_id
  upsert     = true

  project {
    metadata {
      name      = "my-app-project"
      namespace = "argocd" # namespace where the agent is installed
      finalizers = ["resources-finalizer.argocd.argoproj.io"]
    }
    spec {
      destinations {
        namespace = "my-team-ns"
        server    = "https://kubernetes.default.svc"
      }

      source_namespaces = ["my-team-ns"]

      source_repos = ["*"]

      orphaned_resources {
        warn = "false"
      }
    }
  }
}
```

---

## Create an application in a non-default namespace

When you create a GitOps application in Harness, the **Source Namespace** field in the application metadata controls where the Application resource is deployed.

- If you leave **Source Namespace** empty, the Application resource is deployed in the agent namespace.
- If you set a value in **Source Namespace**, the Application resource is deployed in that namespace. The namespace must be listed in both the agent's Application Namespaces and the AppProject's `sourceNamespaces`.
- The **destination namespace** is separate from **Source Namespace**. It is where the application's workload resources are deployed and can differ from the namespace that hosts the Application CR.

### Example: Terraform configuration

```hcl
resource "harness_platform_gitops_applications" "example" {
  application {
    metadata {
      name      = "my-app"
      namespace = "my-team-ns" # Source Namespace: Application CR location
    }
    spec {
      project = "my-app-project"
      source {
        repo_url         = "https://github.com/my-org/my-repo.git"
        path             = "apps/my-app"
        target_revision  = "main"
      }
      destination {
        namespace = "my-app-workloads" # where deployed resources run
        server    = "https://kubernetes.default.svc"
      }
      sync_policy {
        automated {
          self_heal = true
          prune     = true
        }
      }
    }
  }

  org_id     = var.org_id
  project_id = var.project_id
  agent_id   = "my-agent"
  cluster_id = "in-cluster"
  repo_id    = "my-repo"
  name       = "my-app"
}
```

The `namespace` in `application.metadata` is the **Source Namespace**. It is set on Create and is **immutable**. An Update request that changes this field returns a `400` error. To move an Application CR to a different namespace, delete and recreate the application.

---

## How Harness names applications

Harness allows multiple applications with the same name in different source namespaces on the same agent. To keep each application unique in Harness, the system prefixes the source namespace to the application name when **Source Namespace** differs from the agent namespace.

- **Prefixed names:** An application named `app1` in source namespace `ns1` is stored in Harness as `ns1/app1`. An application named `app2` in source namespace `ns2` is stored as `ns2/app2`.
- **Same name across namespaces:** Two applications both named `app1` in source namespaces `ns1` and `ns2` are stored as `ns1/app1` and `ns2/app1`.
- **Agent namespace:** If **Source Namespace** matches the agent namespace, Harness stores the application by name only with no namespace prefix.

---

## Resource tracking recommendation

When Application Namespaces is enabled, Argo CD generates tracking labels in the format `namespace/app-name`. Kubernetes labels have a 63-character limit, so application names that result in a combined `namespace/name` string longer than 63 characters cause tracking failures.

Harness recommends switching to **annotation-based tracking** or **annotation+label tracking** when you use Application Namespaces. Annotation values are not subject to the 63-character limit.

Go to [Manage Argo CD configs](/docs/continuous-delivery/gitops/connect-and-manage/manage-argo-configs) to configure the resource tracking method for your agent.

---

## Known limitations

- **ApplicationSets cannot generate applications in a different namespace.** An ApplicationSet must live in the same namespace as the applications it generates. This is an upstream Argo CD limitation tracked in [issue #11104](https://github.com/argoproj/argo-cd/issues/11104).
- **Namespace-scoped agents are not supported.** Only cluster-wide agents (`isNamespaced=false`) support Application Namespaces.
- **Harness Hosted agents are not supported.** Application Namespaces is only available for self-managed agents.
- **Filtering applications by CR namespace in the application list is not yet available.** This is deferred to a future release.

---

## Troubleshooting

<Troubleshoot
  issue="GitOps application fails with 'namespace is not permitted' when using a non-default namespace"
  mode="docs"
  fallback="Ensure the target namespace is listed in both the agent's Application Namespaces field and the AppProject's sourceNamespaces field. Regenerate and re-apply the agent manifests after updating Application Namespaces."
/>

<Troubleshoot
  issue="GitOps agent informer does not see applications after enabling Application Namespaces"
  mode="docs"
  fallback="Regenerate the agent manifests using the Generate YAML workflow and re-apply them on the cluster to update the argocd-cmd-params-cm ConfigMap."
/>

<Troubleshoot
  issue="AppProject sourceNamespaces configuration is rejected when creating a GitOps application via Terraform"
  mode="docs"
  fallback="Verify that the namespace in application.metadata.namespace matches an entry in the AppProject sourceNamespaces list and that the AppProject is linked to the agent in the Harness UI."
/>

<Troubleshoot
  issue="Harness GitOps UI shows stale Application Namespaces configuration after editing argocd-cmd-params-cm directly on the cluster"
  mode="docs"
  fallback="The source of truth is the cluster ConfigMap. Regenerate the agent manifests in Harness using the Generate YAML workflow and re-apply them to realign the Harness configuration with the cluster state."
/>

---

## Next steps

- Go to [Manage AppProjects](/docs/continuous-delivery/gitops/gitops-entities/projects/manage-projects) to configure source namespaces and destinations on your AppProjects.
- Go to [Install a Harness GitOps Agent](/docs/continuous-delivery/gitops/gitops-entities/agents/install-a-harness-git-ops-agent) to review agent installation options and cluster-wide mode requirements.
- Go to [Manage Argo CD configs](/docs/continuous-delivery/gitops/connect-and-manage/manage-argo-configs) to configure annotation-based resource tracking.
