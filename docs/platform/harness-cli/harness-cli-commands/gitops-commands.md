---
title: GitOps
sidebar_label: GitOps
description: Use the Harness CLI to manage the GitOps module, including agents, applications, destination clusters, source repositories, and ApplicationSets.
sidebar_position: 6
keywords:
  - harness cli
  - gitops
  - argo cd
  - gitops agent
  - gitops application
  - applicationset
  - sync
  - cluster
---

Harness GitOps is backed by Argo CD. A GitOps agent runs as the control plane inside your cluster, and applications, destination clusters, source repositories, and ApplicationSets are registered against that agent. The CLI lets you register and inspect all of these resources, trigger syncs, and refresh application state without opening the Harness UI or the Argo CD console.

This page covers all GitOps resources and actions available in the CLI.

---

## What you will learn in this topic

By the end of this page, you will know how to:

- List, create, and delete GitOps agents, and fetch the manifests that install them.
- Create, update, and delete GitOps applications.
- Sync and refresh an application.
- Register destination clusters and source repositories against an agent.
- Manage ApplicationSets.

---

## Before you begin

- **Harness CLI installed and authenticated:** For setup steps, see [Install and upgrade](/docs/platform/harness-cli/install-and-upgrade) and [Authenticate](/docs/platform/harness-cli/authenticate).
- **Project scope configured:** GitOps resources require `--org` and `--project`. Set them in your profile or pass them on each command.
- **Cluster access:** To install an agent you need `helm` or `kubectl` access to the target cluster. The CLI produces the install manifest but does not apply it for you.

---

## Resource identifiers

Agents are top-level resources. Everything else is registered against an agent, so it uses a compound identifier:

- **`<agent>/<name>`:** An application, cluster, or repository on an agent.
- **`<agent>/<uuid>`:** An ApplicationSet on an agent.

Leave the slash in a compound identifier unencoded. For the `--set`, `-f`, `--format`, paging, and scope conventions that apply to every command on this page, see [Global flags and output](/docs/platform/harness-cli/global-flags-and-output).

---

## Agents

A GitOps agent is the control plane that runs in your cluster and reconciles desired state from Git against live state in the cluster. Create the agent record in Harness first, then install the agent workload into the cluster.

### List agents

Filter agents by type, scope, health, or connection state.

```sh
harness list gitops_agent
harness list gitops_agent --type <type>
harness list gitops_agent --scope <scope>
harness list gitops_agent --health-status <health_status>
harness list gitops_agent --connected-status <connected_status>
harness list gitops_agent --search "<search_term>"
```

### Get agent details

```sh
harness get gitops_agent <agent_id>
harness get gitops_agent <agent_id> --format json
```

### Create an agent

Create the agent record in Harness. This registers the agent but does not install anything into a cluster.

```sh
harness create gitops_agent <agent_id> \
  --set name="<agent_name>" \
  --set namespace=<namespace>

harness create gitops_agent <agent_id> -f <agent_file>.yaml
```

### Get the agent install manifest

Fetch the Helm override values or the kubectl manifest that installs the agent into a cluster. `--output_file` is required. Pass `-f` to supply install options from a file.

```sh
harness execute gitops_agent:install <agent_id> \
  --method helm \
  --output_file <values_file>.yaml

harness execute gitops_agent:install <agent_id> \
  --method yaml \
  --output_file <manifest_file>.yaml

harness execute gitops_agent:install <agent_id> \
  --method helm \
  --output_file <values_file>.yaml \
  -f <install_options>.yaml
```

:::note
This command writes the install artifact to disk. It does not run `helm` or `kubectl` for you. Apply the generated file against your cluster as a separate step.
:::

### Delete an agent

```sh
harness delete gitops_agent <agent_id>
```

---

## Applications

A GitOps application maps a source Git revision to a destination cluster and namespace. Harness reconciles the application continuously and reports drift between the desired state in Git and the live state in the cluster.

### List applications

```sh
harness list gitops_application
harness list gitops_application --search "<search_term>"
harness list gitops_application --all --format json
```

### Get application details

Use `--yaml` to return the Argo CD application spec.

```sh
harness get gitops_application <agent_id>/<application_name>
harness get gitops_application <agent_id>/<application_name> --yaml
```

### Create an application

`-f` and `--cluster` are both required. Pass `--repo` to bind the application to a registered source repository, or `--skip-repo-validation` to create the application without validating the repository.

```sh
harness create gitops_application <agent_id> \
  -f <application_file>.yaml \
  --cluster <cluster_id> \
  --repo <repository_id>

harness create gitops_application <agent_id> \
  -f <application_file>.yaml \
  --cluster <cluster_id> \
  --skip-repo-validation
```

### Update an application

```sh
harness update gitops_application <agent_id>/<application_name> -f <application_file>.yaml
harness update gitops_application <agent_id>/<application_name> \
  -f <application_file>.yaml \
  --cluster <cluster_id> \
  --repo <repository_id>
```

### Sync an application

Trigger a sync to reconcile the cluster with the desired state in Git. Use `--revision` to sync a specific Git revision, `--prune` to remove resources that no longer exist in Git, and `--dry-run` to preview the sync without applying it.

```sh
harness execute gitops_application:sync <agent_id>/<application_name>
harness execute gitops_application:sync <agent_id>/<application_name> --revision <revision>
harness execute gitops_application:sync <agent_id>/<application_name> --prune
harness execute gitops_application:sync <agent_id>/<application_name> --dry-run
```

### Refresh an application

Refresh the application state from its source. Add `--hard` to invalidate the manifest caches before the refresh.

```sh
harness execute gitops_application:refresh <agent_id>/<application_name>
harness execute gitops_application:refresh <agent_id>/<application_name> --hard
```

### Delete an application

Control how the deletion cascades to the resources the application manages.

```sh
harness delete gitops_application <agent_id>/<application_name>
harness delete gitops_application <agent_id>/<application_name> --propagation-policy <policy>
harness delete gitops_application <agent_id>/<application_name> --no-cascade
harness delete gitops_application <agent_id>/<application_name> --remove-finalizers
harness delete gitops_application <agent_id>/<application_name> --app-namespace <namespace>
```

---

## Clusters

A GitOps cluster is a deployment destination that an agent can reach. Register a cluster on an agent before you point an application at it.

### List and get clusters

```sh
harness list gitops_cluster
harness list gitops_cluster --agent <agent_id>
harness list gitops_cluster --search "<search_term>"
harness get gitops_cluster <agent_id>/<cluster_id>
```

### Register a cluster

Add `--upsert` to update the cluster if it is already registered instead of failing.

```sh
harness create gitops_cluster <agent_id>/<cluster_id> -f <cluster_file>.yaml
harness create gitops_cluster <agent_id>/<cluster_id> -f <cluster_file>.yaml --upsert
```

### Update a cluster

```sh
harness update gitops_cluster <agent_id>/<cluster_id> -f <cluster_file>.yaml
harness update gitops_cluster <agent_id>/<cluster_id> -f <cluster_file>.yaml --force-update
```

### Delete a cluster

```sh
harness delete gitops_cluster <agent_id>/<cluster_id>
harness delete gitops_cluster <agent_id>/<cluster_id> --force-delete
harness delete gitops_cluster <agent_id>/<cluster_id> --query-name <name>
```

---

## Repositories

A GitOps repository is a source of desired state. Register the Git repository on an agent so that applications can read manifests from it.

### List and get repositories

```sh
harness list gitops_repository
harness list gitops_repository --agent <agent_id>
harness list gitops_repository --search "<search_term>"
harness get gitops_repository <agent_id>/<repository_id>
```

### Register a repository

Add `--upsert` to update an existing registration. Pass `--repo-creds-id` to reuse stored repository credentials.

```sh
harness create gitops_repository <agent_id>/<repository_id> -f <repository_file>.yaml
harness create gitops_repository <agent_id>/<repository_id> \
  -f <repository_file>.yaml \
  --upsert \
  --repo-creds-id <credentials_id>
```

### Update a repository

```sh
harness update gitops_repository <agent_id>/<repository_id> -f <repository_file>.yaml
```

### Delete a repository

```sh
harness delete gitops_repository <agent_id>/<repository_id>
harness delete gitops_repository <agent_id>/<repository_id> --force-delete
harness delete gitops_repository <agent_id>/<repository_id> --query-repo <repository_url>
```

---

## ApplicationSets

An ApplicationSet generates GitOps applications from a template and a generator, so one definition can fan out across many clusters, namespaces, or Git directories. ApplicationSets are identified by agent and UUID.

### List and get ApplicationSets

```sh
harness list gitops_application_set
harness list gitops_application_set --agent <agent_id>
harness list gitops_application_set --search "<search_term>"
harness get gitops_application_set <agent_id>/<uuid>
```

### Create an ApplicationSet

Add `--upsert` to update an existing ApplicationSet, or `--dry-run` to validate the definition without creating anything.

```sh
harness create gitops_application_set <agent_id> -f <application_set_file>.yaml
harness create gitops_application_set <agent_id> -f <application_set_file>.yaml --dry-run
harness create gitops_application_set <agent_id> -f <application_set_file>.yaml --upsert
```

### Update an ApplicationSet

```sh
harness update gitops_application_set <agent_id>/<uuid> -f <application_set_file>.yaml
harness update gitops_application_set <agent_id>/<uuid> -f <application_set_file>.yaml --dry-run
harness update gitops_application_set <agent_id>/<uuid> -f <application_set_file>.yaml --upsert
```

### Delete an ApplicationSet

```sh
harness delete gitops_application_set <agent_id>/<uuid>
```

---

## Related articles

- [Continuous Delivery](/docs/platform/harness-cli/harness-cli-commands/cd-and-pipeline-commands): Manage pipelines and deployment resources.
- [Code Repository](/docs/platform/harness-cli/harness-cli-commands/code-repository-commands): Manage the repositories that hold your manifests.
- [Platform](/docs/platform/harness-cli/harness-cli-commands/platform-commands): Manage connectors and secrets.
