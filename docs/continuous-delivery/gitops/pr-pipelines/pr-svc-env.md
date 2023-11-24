---
title: Set up services, environments, and clusters for PR pipelines
description: Use services, environments, and clusters to create Harness PR pipelines.
sidebar_position: 2
---

:::tip Important

This document explains how to configure services, environments, and clusters for a [Harness PR pipeline](/docs/continuous-delivery/gitops/pr-pipelines/pr-pipelines.md). We recommend that you review the [Harness PR pipeline](/docs/continuous-delivery/gitops/pr-pipelines/pr-pipelines.md) topic before reading this topic.

:::

A Harness service logically corresponds to a microservice/application template in an ApplicationSet. Together with the environment and cluster entities, Harness resolves application `config.json` files in a Git repository to update manifest values through PR pipelines. 

In order to configure a Harness PR pipeline, you must create these Harness entities with the appropriate configurations.

## Set up a Harness service

A Harness service represents what you're deploying. In this case, we're deploying an application template specified as a `config.json` file.

1. In your Harness project, select the **Services** tab.
2. Select **New Service**.
3. In **Name**, enter **PR Example**.
4. In **Manifests**, select **Add Release Repo Manifest**.
5. In **Release Repo Store**, select one the repository to use.

### Configuring a Harness Git connector for your repository

For information on setting up a Harness Git connector, go to [Connect to a Git repository](/docs/platform/connectors/code-repositories/connect-to-code-repo).


### Specify manifest details

Define the manifest to use for the PR pipeline. Use the path to the `config.json` files. You can use the expression `<+env.name>` in the path to dynamically select the path based on the Harness environment we select: **dev** or **prod**.

1. In **Manifest Details**, do the following, and then select **Submit**.
   1. **Manifest Name**: Enter a name for the manifest, such as `config.json`.
   2. **Git Fetch Type**: Select **Latest from Branch**.
   3. **Branch:** Enter the name of the branch that contains theApplicationSet configurations (for example, main).
   4. **File Path**: Enter the path to the config.json file. For example, `examples/git-generator-files-discovery/cluster-config/engineering/<+env.name>/config.json`.

   Note the use of `<+env.name>`.

   ![](static/harness-git-ops-application-set-tutorial-53.png)

2. Select **Submit**.
3. In the top-right corner, select **Save**.

You have now successfully configured a Harness service for your PR pipeline.


## Create Harness environments for a target environment

Once you have successfully configured a service, you can configure a Harness environment. An environment logically corresponds to your `dev`, `staging`, or `production` environments. Ideally, your ApplicationSet configuration files would differ on the basis of the environments they would deploy to.

To create a dev environment, do the following:

1. In your Harness project, select **Environments**.
2. Select **New Environment**.
3. Do the following, and then select **Save**:
    1. **Name** Enter `dev`.
    2. **Environment Type**: Select **Pre-Production**.

The new environment is created.

## Configure variables in a Harness service/environment (optional)

:::note

For updating the `config.json` or `config.yaml` values, Harness supports variables in the [Update Release Repo step](/docs/continuous-delivery/gitops/pr-pipelines/pipeline-steps.md#update-release-repo-step). If you want to enforce common values at the service or environment level of your ApplicationSet, you can use service or environment variables.

Values from the **Update Release Repo** step have a higher priority than service or environment variables.

For checking the override priority for these service and environment variables, go to [Override Priority](/docs/continuous-delivery/x-platform-cd-features/environments/service-overrides.md#override-priority).

:::

The following process is applicable to both services and environments. This example uses services:

1. In your Harness project, select **Services**.
2. Select your service, and then select **Configuration**.
3. Under **Advanced**, select **New Variable**.
4. Enter the name and value for your variable, and then select **Save**.

   ![](static/pr-svc-env-1.png)

These variables are now be part of your PR pipeline.

## Clusters

Before updating your application's `config.json` values, Harness also resolves the clusters in which the application is deployed. It displays this information on the [Cluster](/docs/continuous-delivery/gitops/pr-pipelines/pipeline-steps.md#resolving-services-environments-and-clusters) tab. This resolution serves as another layer of validation before your application's values are updated. 

The referenced cluster is the cluster that you created when you deployed your application. You do not need to create any new entities in Harness. 

Next, to configure your PR pipeline, you need to link your GitOps clusters to your Harness environment.


### Linking GitOps clusters to the environment

Once you link GitOps clusters to an environment, whenever you select an environment in a pipeline, you can select the environment's linked GitOps clusters. This ensures that you can select where applications are to be deployed even within the same environment.

To link the Harness GitOps clusters with an environment, do the following: 

1. Select **GitOps Clusters**.
2. Select **Select Cluster(s)**.
3. Select the cluster where your application is deployed.
4. Select **Add**.

![](static/harness-git-ops-application-set-tutorial-47.png)

The Harness GitOps cluster is now linked to the environment.

![](static/harness-git-ops-application-set-tutorial-48.png)

You can link multiple clusters to a single environment.

Additionally, you can specify the `config.json` path in your ApplicationSet and service to resolve based on clusters: 

```
examples/git-generator-files-discovery/cluster-config/engineering/<+env.name>/<+cluster.name>.config.json 
```

Your actual directories in Git, within your environment folder `dev`, would then need to look like this:

```
examples/git-generator-files-discovery/cluster-config/engineering/dev/cluster1.config.json
examples/git-generator-files-discovery/cluster-config/engineering/dev/cluster2.config.json
```

Harness can then resolve which directory to traverse during runtime and update only those applications that are deployed in a particular cluster, for example  `cluster1`. This is similar to how environments are resolved using the `<+env.name>` expression.

This topic described important service, environment, and cluster configuration for PR pipelines. For detailed information on creating and running PR pipelines, go to [Introduction to Harness GitOps PR pipelines](/docs/continuous-delivery/gitops/pr-pipelines/pr-pipelines.md). 
