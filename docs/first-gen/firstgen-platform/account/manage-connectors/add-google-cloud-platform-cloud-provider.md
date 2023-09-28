---
title: Add Google Cloud Platform Cloud Provider
description: Connect the Google Cloud Platform cloud provider where you will deploy your services using Harness.
# sidebar_position: 2
helpdocs_topic_id: 6x52zvqsta
helpdocs_category_id: ll7h8ktlwe
helpdocs_is_private: false
helpdocs_is_published: true
---

You use a Harness Google Cloud Platform Cloud Provider to connect your Harness account to the Google Cloud Platform account where you will deploy your services.

You add Cloud Providers to your Harness Account and then reference them when defining deployment resources and environments.

:::note
Before setting up a Google Cloud Platform Cloud Provider, you must have a [Harness Delegate](../manage-delegates/delegate-installation.md) installed on a host where it can connect to your Google Cloud Platform account.
:::

## Before You Begin

* [Harness Key Concepts](../../../starthere-firstgen/harness-key-concepts.md)
* [Harness Delegate Overview](../manage-delegates/delegate-installation.md)

## Review: Connecting to Kubernetes Clusters

Harness includes a platform-agnostic Kubernetes Cluster Cloud Provider for connections to a Kubernetes cluster. This is the preferred method for connecting Harness to a target Kubernetes cluster.

See [Add Kubernetes Cluster Cloud Provider](add-kubernetes-cluster-cloud-provider.md).

### Limitations

Harness supports GKE 1.19 and later.

## Step 1: Add the Cloud Provider

To add a cloud provider to your Harness account, do the following:

1. Click **Setup**, and then click **Cloud Providers**.
2. Click **Add Cloud Provider** and select **Google Cloud Platform**.

The **Add Google Cloud Platform Cloud Provider** panel appears.

## Option 1: Inherit from Delegate

:::note
If your GCP Cloud Provider uses the **Inherit from Delegate** option, it cannot be used with an Infrastructure Definition, such as a Kubernetes cluster Infrastructure Definition. It is not supported at this time.
:::

Select this option to have the Cloud Provider inherit the default credentials used by the Harness Delegate running in GCP.

For example, if you installed the [Harness Kubernetes Delegate](../manage-delegates/install-kubernetes-delegate.md) in a Kubernetes cluster (GKE) that has [GCP Workload Identity](https://cloud.google.com/kubernetes-engine/docs/how-to/workload-identity?hl=tr#enable_on_cluster) enabled, the Cloud Provider provider will inherit these credentials if it uses that Delegate.

To use **Inherit from Delegate**, do the following:

1. Ensure a Harness Delegate is installed in your GCP project.
2. Ensure the Harness Delegate host has the required credentials. See the different permissions required below.
3. Add Delegate Selector(s) to the Harness Delegate. There are implicit Selectors that you can use, but it is best to add a custom selector. See [Select Delegates for Specific Tasks with Selectors](../manage-delegates/select-delegates-for-specific-tasks-with-selectors.md).
4. In your Google Cloud Platform Cloud Provider, select **Inherit from Delegate**.
5. In **Delegate Selectors**, select the Selector(s) attached to the Delegate(s) running in your GCP account.
6. Click **Test**. You will see **Test was successful** unless there is a connectivity error, or the Delegate is disconnected. If it is disconnected, simply restart it.

If you want to set up certain credentials on the Delegate using Harness, you can run the commands in a Delegate Profile and attach that profile to the Delegate. See [Run Scripts on Delegates using Profiles](../manage-delegates/run-scripts-on-the-delegate-using-profiles.md).

You can even add a Selector to the Profile, and then use that Selector in the Google Cloud Platform Cloud Provider. This ensure that any Google Cloud Platform Cloud Provider using that Selector is also using a Delegate with that Profile.

## Option 2: Select Encrypted Key

1. In **Select Encrypted Key**, select or create a new [Harness Encrypted Text secret](../../security/secrets-management/use-encrypted-text-secrets.md) that contains the Google Cloud's Account Service Key File.
	1. To obtain the Google Cloud's Account Service Key File, see [Creating and managing service account keys](https://cloud.google.com/iam/docs/creating-managing-service-account-keys) from Google (JSON is recommended).![](./static/add-google-cloud-platform-cloud-provider-34.png)

	2. Once you have the key file from Google, open it, copy it, and paste it into the Harness Encrypted Text secret.
	3. Next, use that Harness Encrypted Text secret in **Select Encrypted Key**.
2. Click **Submit**. The GCP cloud provider is added.

## Review: GCP Permissions Required for Kubernetes

The GCP service account used for any credentials requires **Kubernetes Engine Developer** are **Storage Object Viewer** permissions.

* For steps to add roles to your service account, see [Granting Roles to Service Accounts](https://cloud.google.com/iam/docs/granting-roles-to-service-accounts) from Google. For more information, see [Understanding Roles](https://cloud.google.com/iam/docs/understanding-roles?_ga=2.123080387.-954998919.1531518087#curated_roles) from GCP.

:::note
Another option is to use a service account that has only the Storage Object Viewer permission needed to query GCR, and then use either an in-cluster Kubernetes Delegate or a direct [Kubernetes Cluster](cloud-providers.md#kubernetes-cluster) Cloud Provider with the Kubernetes service account token for performing deployment.
:::

Harness supports GKE 1.19 and later. If you use a version prior to GKE 1.19, please enable Basic Authentication. If Basic authentication is inadequate for your security requirements, use the [Kubernetes Cluster Connector](/docs/platform/connectors/cloud-providers/add-a-kubernetes-cluster-connector).

## Review: Google GCS and GCR Requirements

For Google Cloud Storage (GCS) and Google Container Registry (GCR), the following roles are required:

* Storage Object Viewer (roles/storage.objectViewer)
* Storage Object Admin (roles/storage.objectAdmin)

See [Cloud IAM roles for Cloud Storage](https://cloud.google.com/storage/docs/access-control/iam-roles) from GCP.

Ensure the Harness Delegate you have installed can reach to the GCR registry host name you are using in **Registry Host Name** (for example, gcr.io) and storage.cloud.google.com.

### Artifact Support

See [Service Types and Artifact Sources](../../../continuous-delivery/model-cd-pipeline/setup-services/service-types-and-artifact-sources.md).

## Review: Google Cloud Operations Suite (Stackdriver) Requirements

Most APM and logging tools are added to Harness as Verification Providers. For Google Cloud's operations suite (formerly Stackdriver), you use the Google Cloud Platform Cloud Provider.

#### Roles and Permissions

* **Stackdriver Logs** - The minimum role requirement is **logging.viewer**
* **Stackdriver Metrics** - The minimum role requirements are **compute.networkViewer** and **monitoring.viewer**.

See [Access control](https://cloud.google.com/monitoring/access-control) from Google.

## Review: Proxies and GCP with Harness

If you are using a proxy server in your GCP account, but want to use GCP services with Harness, you need to set the following to not use your proxy:

* `googleapis.com`. See [Proxy servers](https://cloud.google.com/storage/docs/troubleshooting#proxy-server) from Google.
* The `token_uri` value from your Google Service Account. See [Creating service account keys](https://cloud.google.com/iam/docs/creating-managing-service-account-keys#creating_service_account_keys) from Google.

## Artifact Support for Download and Copy

See [Service Types and Artifact Sources](../../../continuous-delivery/model-cd-pipeline/setup-services/service-types-and-artifact-sources.md).

