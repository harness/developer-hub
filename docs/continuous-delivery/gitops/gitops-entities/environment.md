---
title: Environments
description: Learn how to create and manage GitOps environments in Harness.
sidebar_position: 5
---

import DocImage from '@site/src/components/DocImage';


This topic describes how to create and manage Harness GitOps environments. Environments represent your deployment targets and are used in ApplicationSets and PR pipelines to organize and track your GitOps deployments.

## What is a GitOps Environment?

A GitOps environment in Harness represents a deployment target (such as dev, staging, or production) and is associated with one or more GitOps clusters. Environments help you:

- Organize deployments by lifecycle stage (development, staging, production)
- Associate clusters with specific deployment targets
- Track application deployments across different environments
- Enable environment-specific configurations in PR pipelines

## Prerequisites

Before creating a GitOps environment, ensure you have:

- A Harness project with GitOps enabled
- At least one [GitOps cluster](/docs/continuous-delivery/gitops/get-started/harness-cd-git-ops-quickstart#step-3-add-a-harness-gitops-cluster) configured
- Appropriate RBAC permissions to create environments

## Create a GitOps Environment

Follow these steps to create a GitOps environment:

### Step 1: Navigate to Environments

1. In your Harness project, go to **Deployments** > **Environments**.
2. Click **+ New Environment**.



### Step 2: Configure Environment Details

1. **Name**: Enter a unique name for your environment (e.g., `dev`, `staging`, `prod`).
2. **Environment Type**: Select the deployment type:
   - **Production**: For production environments
   - **Pre-Production**: For development, staging, or testing environments
3. Click **Save**.

<div style={{textAlign: 'center'}}>
  <DocImage path={require('./static/env-1.png')} width="50%" height="50%" title="Click to view full size image" />
</div>

The environment is now created.

### Step 3: Add GitOps Clusters

1. In the environment details page, navigate to the **GitOps Clusters** tab.

<div style={{textAlign: 'center'}}>
  <DocImage path={require('./static/env-2.png')} width="50%" height="50%" title="Click to view full size image" />
</div>

2. Click **+ Cluster** to add a cluster to this environment.
3. In the cluster selection dialog, you'll see all available clusters based on:
   - **Project level**: Clusters created in the current project
   - **Organization level**: Clusters shared at the organization level
   - **Account level**: Clusters shared at the account level

<div style={{textAlign: 'center'}}>
  <DocImage path={require('./static/env-3.png')} width="50%" height="50%" title="Click to view full size image" />
</div>

4. Select the cluster(s) you want to associate with this environment.
5. Click **Save**.

Your GitOps environment is now ready to use!

<div style={{textAlign: 'center'}}>
  <DocImage path={require('./static/env-4.png')} width="50%" height="50%" title="Click to view full size image" />
</div>

## Configure Environment Variables

Environment variables allow you to define configuration values that can be used in PR pipelines to update application configuration files dynamically.

### Create Environment Variables

1. In the environment details page, navigate to the **Configuration** tab.
2. Under **Advanced**, click **Variables** > **New Variable Override**.
3. Enter the following details:
   - **Name**: Enter the variable name (e.g., `asset_id`, `image_tag`, `replicas`)
   - **Type**: Select the variable type (String, Number, Secret)
   - **Value**: Enter a default value or select **Runtime Input** to provide the value during pipeline execution
4. Click **Save**.

:::info Variable Usage in PR Pipelines
Environment variables are particularly useful in PR pipelines where you want to update specific key-value pairs in configuration files (like `config.json` or `config.yaml`). When you set a variable value as **Runtime Input**, you'll be prompted to provide the value when running the pipeline.

For example, if your `config.json` contains an `asset_id` key, you can create an environment variable with the same name and update it dynamically through the PR pipeline.
:::

### Variable Override Priority

When using environment variables in PR pipelines:
- Values specified in the **Update Release Repo** step have the highest priority
- Environment variables override service variables
- Service variables have the lowest priority

For more information on override priority, see [Service Overrides](/docs/continuous-delivery/x-platform-cd-features/environments/service-overrides.md#override-priority).

## Using GitOps Environments

### In ApplicationSets

When creating an ApplicationSet, you select an environment in the **Overview** step. This automatically adds the `harness.io/envRef` label to your ApplicationSet, enabling:

- Environment-based tracking and filtering
- RBAC policies based on environments
- Integration with PR pipelines

### In PR Pipelines

Environments play a crucial role in PR pipelines by enabling environment-specific configuration updates. When you configure a service with dynamic paths using the `<+env.name>` expression, Harness resolves this to the selected environment name at runtime.

#### Environment Name Resolution

For example, if your Git repository structure looks like this:
```
cluster-config/
  ├── engineering/
  │   ├── dev/
  │   │   └── config.json
  │   └── prod/
  │       └── config.json
```

And your service manifest path is configured as:
```
cluster-config/engineering/<+env.name>/config.json
```

When you run a PR pipeline and select the `dev` environment, Harness resolves the path to:
```
cluster-config/engineering/dev/config.json
```

This allows you to update configuration files for specific environments without creating separate services or pipelines for each environment.

:::tip Best Practice
Name your Harness environments to match your Git directory structure. This makes the `<+env.name>` expression resolution straightforward and reduces configuration errors.
:::

## Manage GitOps Environments

### View Environment Details

1. Go to **Deployments** > **Environments**.
2. Click on an environment to view its details.
3. The **GitOps Clusters** tab shows all clusters associated with this environment.

### Add or Remove Clusters

1. Navigate to the environment details page.
2. Go to the **GitOps Clusters** tab.
3. To add a cluster, click **+ Cluster** and select from available clusters.
4. To remove a cluster, click the delete icon next to the cluster name.

### Delete Environment

1. Go to **Deployments** > **Environments**.
2. Find the environment you want to delete.
3. Click the three vertical dots (⋮) next to the environment.
4. Select **Delete**.
5. Confirm the deletion.

:::warning
Deleting an environment does not delete the associated clusters or applications. However, ApplicationSets and pipelines referencing this environment may be affected.
:::

## Best Practices

- **Use descriptive names**: Name environments clearly (e.g., `dev`, `staging`, `prod`) to avoid confusion
- **Match environment names with Git paths**: If using dynamic paths in services, ensure environment names match your Git repository structure
- **Organize by lifecycle**: Use Pre-Production for dev/staging and Production for prod environments
- **Associate appropriate clusters**: Only add clusters that are meant for that specific environment
- **Consistent naming**: Use the same environment naming convention across projects for easier management

## Next Steps

- [Create a GitOps Service](/docs/continuous-delivery/gitops/gitops-entities/service/)
- [Create an ApplicationSet](/docs/continuous-delivery/gitops/applicationsets/harness-git-ops-application-set-tutorial)
- [Learn about PR Pipelines](/docs/continuous-delivery/gitops/pr-pipelines/pr-pipelines-basics)
