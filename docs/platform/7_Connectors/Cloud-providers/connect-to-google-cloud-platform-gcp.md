---
title: Add a Google Cloud Platform (GCP) connector
description: Connect Harness to your GCP accounts and services.
sidebar_position: 4
helpdocs_topic_id: cii3t8ra3v
helpdocs_category_id: o1zhrfo8n5
helpdocs_is_private: false
helpdocs_is_published: true
---

Use a Harness Google Cloud Platform (GCP) connector to integrate GCP with Harness. Use GCP with Harness to obtain artifacts, communicate with GCP services, provision infrastructure, and deploy microservices and other workloads.

You can use the GCP connector to connect to Kubernetes clusters in GCP. You can also use the [platform-agnostic Kubernetes Cluster connector](../../../platform/7_Connectors/Cloud-providers/ref-cloud-providers/kubernetes-cluster-connector-settings-reference.md).

This topic explains how to set up a GCP connector.

## Auth Provider API and TokenRequest API options

Harness provides the option of using the Auth Provider API or TokenRequest API for authentication.

<details>
<summary>Summary of Auth Provider and TokenRequest API changes</summary>

In Kubernetes 1.22, the Auth Provider API was deprecated and replaced with a new TokenRequest API. The TokenRequest API is used by client libraries and tools to request an authentication token from the Kubernetes API server.

The TokenRequest API provides a more flexible and extensible authentication mechanism than the Auth Provider API. Instead of relying on pre-configured authentication plugins, client libraries and tools can now dynamically request authentication tokens from the Kubernetes API server based on their specific needs and requirements.

To use the TokenRequest API for authentication, client libraries and tools can send a TokenRequest object to the Kubernetes API server. The TokenRequest object specifies the audience, scopes, and other parameters for the requested token. The Kubernetes API server then validates the request, generates a token with the requested parameters, and returns the token to the client.

One advantage of the TokenRequest API is that it allows for more fine-grained control over authentication and authorization. For example, a client library or tool can request a token with only the necessary scopes to perform a specific operation, rather than requesting a token with full cluster access.

Another advantage of the TokenRequest API is that it allows for easier integration with external identity providers and authentication systems. Client libraries and tools can use the TokenRequest API to request authentication tokens from external providers, such as OAuth2 providers or custom authentication systems, and use those tokens to authenticate to the Kubernetes API server.

Overall, the TokenRequest API provides a more flexible and extensible authentication mechanism than the deprecated Auth Provider API, and allows for more fine-grained control over authentication and authorization in Kubernetes.

</details>


To select which API to use:

- **Auth Provider API**: this is the current default. You do not have to change the default settings of Harness connectors or the Harness delegates you use.
- **TokenRequest API**: you must install the provider-specific plugin on the Harness delegate(s) to use the TokenRequest API introduced in Kubernetes 1.22.

### Install the gke-gcloud-auth-plugin on the delegate

When using the Harness GCP connector with Kubernetes version >= 1.22, you can use the **gke-gcloud-auth-plugin** to authenticate to GKE cluster.

The Harness GCP connector has 2 credential types. For each type, you must install the following dependencies in the Harness delegates you use or Harness will follow the old Auth Provider API format.

- **Service Account Key** (`ServiceAccountKey`): gcloud and gke-gcloud-auth-plugin binary.
- **Inherit From Delegate** (`InheritFromDelegate`): gcloud and gke-gcloud-auth-plugin binary.

You can install the gke-gcloud-auth-plugin on the delegate by creating a delegate with an immutable image and updating the following commands in `INIT_SCRIPT`:

<details>
<summary>RHEL 7 OS</summary>

```
tee -a /etc/yum.repos.d/google-cloud-sdk.repo << EOM
[google-cloud-cli]
name=Google Cloud CLI
baseurl=https://packages.cloud.google.com/yum/repos/cloud-sdk-el8-x86_64
enabled=1
gpgcheck=1
repo_gpgcheck=0
gpgkey=https://packages.cloud.google.com/yum/doc/rpm-package-key.gpg
EOM

# Install google-cloud-cli and google-cloud-cli-gke-gcloud-auth-plugin
microdnf install google-cloud-cli
microdnf install google-cloud-cli-gke-gcloud-auth-plugin
```
</details>

<details>
<summary>Ubuntu</summary>

```
apt-get install apt-transport-https ca-certificates gnupg

echo "deb [signed-by=/usr/share/keyrings/cloud.google.gpg] https://packages.cloud.google.com/apt cloud-sdk main" | tee -a /etc/apt/sources.list.d/google-cloud-sdk.list

curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | apt-key --keyring /usr/share/keyrings/cloud.google.gpg add -

apt-get update && apt-get install google-cloud-cli && apt-get install google-cloud-cli-gke-gcloud-auth-plugin
```
</details>


For more information, go to [Install the gcloud CLI](https://cloud.google.com/sdk/docs/install) from Google and [Delegate installation overview](/docs/platform/2_Delegates/install-delegates/overview.md).


## Before you begin

Before you begin, you must:

* **Assign IAM roles to the GCP service account or Harness delegate that you will attach to the connector.**
  * The necessary IAM roles and policies depend on which GCP service you'll use with Harness and which operations you'll want Harness to perform in GCP.
  * GCP connectors can also inherit IAM roles from Harness delegates running in GCP. If you want your connector to inherit from a delegate, make sure the delegate has the necessary roles.
  * If you find that the IAM role associated with your GCP connector doesn't have the policies required by the GCP service you want to access, you can modify or change the role assigned to the GCP account or the Harness delegate that your GCP connector is using. You might need to wait up to five minutes for the change to take effect.
  * For a list of roles and policies, go to [Google Cloud Platform (GCP) Connector Settings Reference](/docs/platform/7_Connectors/Cloud-providers/ref-cloud-providers/gcs-connector-settings-reference.md).
  * The [GCP Policy Simulator](https://cloud.google.com/iam/docs/simulating-access) is useful for evaluating policies and access.
* **Check your GKE version.**
  * Harness supports GKE 1.19 and later.
  * If you use a version prior to GKE 1.19, please enable Basic Authentication. If Basic authentication is inadequate for your security requirements, use the [Kubernetes Cluster Connector](./add-a-kubernetes-cluster-connector.md).

## Add a GCP connector and configure credentials

1. Open a Harness project, and select **Connectors** under **Project Setup**.
2. Select **New Connector**, and then select **GCP** under **Cloud Providers**.
3. Input a **Name** for the connector. **Description** and **Tags** are optional.
   Harness automatically creates an **Id** ([entity identifier](/docs/platform/20_References/entity-identifier-reference.md)) for the connector based on the **Name**.
4. Select **Continue** to configure credentials. Select one of the following authentication options:
   * Select **Specify credentials here** to use a GCP service account key.
   * Select **Use the credentials of a specific Harness Delegate** to allow the connector to inherit its authentication credentials from the Harness delegate that is running in GCP.
5. Select **Continue** to proceed to **Select Connectivity Mode**.

<details>
<summary>Learn more about credential inheritance</summary>

* **IAM role inheritance:** The connector inherits the GCP IAM role assigned to the delegate in GCP, such a Harness Kubernetes delegate running in Google Kubernetes Engine (GKE). Ensure the delegate has the IAM roles that your connector needs to perform the necessary operations.
* **GCP workload identity:** If you installed the Harness [Kubernetes delegate](/docs/first-gen/firstgen-platform/account/manage-delegates/install-kubernetes-delegate.md) in a Kubernetes cluster in GKE that has [GCP Workload Identity](https://cloud.google.com/kubernetes-engine/docs/how-to/workload-identity?hl=tr#enable_on_cluster) enabled and uses the same service account and node pool annotation, then the Google Cloud Platform (GCP) connector inherits these credentials if it uses that delegate.
* **Role and policy changes:** If you find that the IAM role associated with your GCP connector doesn't have the policies required by the GCP service you want to access, you can modify or change the role assigned to the Harness delegate that your GCP connector is using. You may need to wait up to five minutes for the change to take effect.
* **See also:**
  * [Google Cloud Platform (GCP) Connector Settings Reference](/docs/platform/7_Connectors/Cloud-providers/ref-cloud-providers/gcs-connector-settings-reference.md)
  * [GCP Policy Simulator](https://cloud.google.com/iam/docs/simulating-access)

</details>

## Select connectivity mode

Harness uses GCP connectors during pipeline runs to authenticate and perform operations with GCP.

1. Select how you want Harness to connect to GCP:
   * **Connect through Harness Platform:** Use a direct, secure communication between Harness and GCP.
   * **Connect through a Harness Delegate:** Harness communicates with GCP through a Harness delegate in GCP. You must choose this option if you chose to inherit delegate credentials.
2. If connecting through a Harness delegate, select either:
   * **Use any available Delegate**: Harness selects an available Delegate at runtime. To learn how Harness selects delegates, go to [Delegates Overview](/docs/platform/2_Delegates/delegate-concepts/delegate-overview.md).
   * **Only use Delegates with all of the following tags**: Use **Tags** to match one or more suitable delegates. To learn more about Delegate tags, go to [Select Delegates with Tags](/docs/platform/2_Delegates/manage-delegates/select-delegates-with-selectors.md).
     * Select **Install new Delegate** to add a delegate without exiting connector configuration. For guidance on installing delegates, go to [Delegate Installation Overview](/docs/platform/2_Delegates/delegate-concepts/delegate-overview.md).
3. Select **Save and Continue** to run the connection test, and then, if the test succeeds, select **Finish**. The connection test confirms that your authentication and delegate selections are valid.

<details>
<summary>GCP connector errors</summary>

If the connection test fails due to a credentials issue, use the GCP CLI or console to check the GCP service account or delegate's credentials. The [GCP Policy Simulator](https://cloud.google.com/iam/docs/simulating-access) is useful for evaluating policies and access.

Due to the limited scope of the initial connection test, credentials can pass the connection test and then fail when you use the connector in a pipeline if the IAM role the connector is using doesn't have the roles and policies needed for the pipeline's operations. For example, if a pipeline has a Run step that references a GCP connector, the connector may need to have specific roles or policies to be able to execute the operations required by the Run step.

If you experience any errors with GCP connectors, verify that the IAM roles and policies it is using are correct.

For a list of roles and policies, go to the [Google Cloud Platform (GCP) Connector Settings Reference](/docs/platform/7_Connectors/Cloud-providers/ref-cloud-providers/gcs-connector-settings-reference.md).

</details>

## See also

* [Google Cloud Platform (GCP) Connector Settings Reference](/docs/platform/7_Connectors/Cloud-providers/ref-cloud-providers/gcs-connector-settings-reference.md)
