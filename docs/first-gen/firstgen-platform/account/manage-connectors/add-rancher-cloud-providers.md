---
title: Add Rancher Cloud Providers
description: Set up a Harness Ranch Cloud Provider.
# sidebar_position: 2
helpdocs_topic_id: dipgqjn5pq
helpdocs_category_id: ll7h8ktlwe
helpdocs_is_private: false
helpdocs_is_published: true
---

Currently, this feature is behind the feature flag `RANCHER_SUPPORT`. Contact [Harness Support](mailto:support@harness.io) to enable the feature.You can deploy Kubernetes Services to multiple clusters simultaneously using Rancher and Harness. You use Rancher cluster labels to identify multiple clusters in a Harness Infrastructure Definition, and then deploy to each cluster simultaneously.

To connect Harness to your Rancher account, you must set up a Harness Rancher Cloud Provider.

This topic describes how to set up a Harness Ranch Cloud Provider.

Once you are done adding a Rancher Cloud Provider, you can deploy Kubernetes Services to multiple clusters simultaneously. See [Deploy Kubernetes Services to Multiple Clusters using Rancher](/article/hsc50ny57g-deploy-kubernetes-service-to-multiple-clusters-using-rancher).

In this topic:

* [Before You Begin](https://docs.harness.io/article/dipgqjn5pq-add-rancher-cloud-providers#before_you_begin)
* [Visual Summary](https://docs.harness.io/article/dipgqjn5pq-add-rancher-cloud-providers#visual_summary)
* [Supported Platforms and Technologies](https://docs.harness.io/article/dipgqjn5pq-add-rancher-cloud-providers#undefined)
* [Review: Harness Delegates and Rancher Clusters](https://docs.harness.io/article/dipgqjn5pq-add-rancher-cloud-providers#review_harness_delegates_and_rancher_clusters)
* [Step 1: Create a Rancher Account Bearer Token](https://docs.harness.io/article/dipgqjn5pq-add-rancher-cloud-providers#step_1_create_a_rancher_account_bearer_token)
* [Step 2: Add a Rancher Cloud Provider](https://docs.harness.io/article/dipgqjn5pq-add-rancher-cloud-providers#step_2_add_a_rancher_cloud_provider)
* [See Also](https://docs.harness.io/article/dipgqjn5pq-add-rancher-cloud-providers#see_also)

### Before You Begin

* This topic assumes you are familiar with Rancher, have a Rancher account, and have set up Kubernetes clusters in its UI. If you are new to Rancher, see [Setting up Kubernetes Clusters in Rancher](https://rancher.com/docs/rancher/v2.5/en/cluster-provisioning/) from Rancher.

### Visual Summary

Enter the following in the Harness Rancher Cloud Provider:

* URL of the Rancher endpoint.
* Bearer token for the Rancher account to use.

![](https://files.helpdocs.io/kw8ldg1itf/articles/dipgqjn5pq/1644885199151/clean-shot-2022-02-14-at-16-33-00.png)### Supported Platforms and Technologies

See [Supported Platforms and Technologies](/article/220d0ojx5y-supported-platforms).

### Review: Harness Delegates and Rancher Clusters

Before setting up a Rancher Cloud Provider, you need to install a Harness Delegate in your environment.

The Harness Delegate does not need to be a Kubernetes Delegate and it does not need to be installed in a target cluster.

The Harness Delegate does need to be able to connect to the Rancher URL endpoint and to connect to the target Kubernetes clusters.

See [Harness Delegate Overview](/article/h9tkwmkrm7-delegate-installation).

### Step 1: Create a Rancher Account Bearer Token

In Rancher, create a bearer token to use for Harness authentication with Rancher.

The Rancher bearer token you use must be able to use the `/v3/clusters/{clusterName}?action=generateKubeconfig` and `/v3/clusters` APIs. The Rancher user account you use to generate the token should have the Rancher **Cluster Owner** role or a Global Permission that enable cluster administration. See [Cluster and Project Roles](https://rancher.com/docs/rancher/v2.0-v2.4/en/admin-settings/rbac/cluster-project-roles/) and [Global Permissions](https://rancher.com/docs/rancher/v2.6/en/admin-settings/rbac/global-permissions/) from Rancher.

For steps on creating a bear token, see [API Keys](https://rancher.com/docs/rancher/v2.5/en/user-settings/api-keys/) from Rancher.

Save the token in a secure location.

A few things to consider:

* When you create the token, you can scope it to specific clusters. A scope will limit the API key so that it will only work against the Kubernetes API of the specified clusters. If you scope the bearer token to specific clusters, Harness will only be able to query and target that list of clusters when deploying.
* If you set an expiration period for the token, make sure that its expiration date will not impact your Harness deployments.

### Step 2: Add a Rancher Cloud Provider

In Harness, click **Setup**, and then click **Cloud Providers**.

Click **Add Cloud Provider**, and then select **Rancher**. The **Rancher** Cloud Provider appears.

![](https://files.helpdocs.io/kw8ldg1itf/articles/dipgqjn5pq/1644884796598/clean-shot-2022-02-14-at-16-26-28.png)In **Display Name**, give the Cloud Provider a name.

In **Rancher URL**, enter the Rancher URL endpoint. This is the domain name you use to connect to Rancher, such as `https://rancher-internal.dev.mycompany.io`. Make sure to include the URL scheme.

In **Select Encrypted Bearer Token**, click **Create Encrypted Text**, and add the Rancher bearer token to Harness. See [Use Encrypted Text Secrets](/article/ygyvp998mu-use-encrypted-text-secrets).

Click **Test**. Harness reports **Test was successful**. If the test fails, check that the URL and bearer token are correct.

Click **Submit**.

The Rancher Cloud Provider is added.

### See Also

* [Deploy Kubernetes Services to Multiple Clusters using Rancher](/article/hsc50ny57g-deploy-kubernetes-service-to-multiple-clusters-using-rancher)

