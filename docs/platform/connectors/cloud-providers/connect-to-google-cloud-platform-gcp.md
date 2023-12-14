---
title: Add a Google Cloud Platform (GCP) connector
description: Connect Harness to your GCP accounts and services.
sidebar_position: 4
helpdocs_topic_id: cii3t8ra3v
helpdocs_category_id: o1zhrfo8n5
helpdocs_is_private: false
helpdocs_is_published: true
---

Use a Harness Google Cloud Platform (GCP) connector to integrate GCP with Harness. You can use GCP with Harness to obtain or upload artifacts, communicate with GCP services, provision infrastructure, push images, and deploy microservices and other workloads. When a pipeline runs, Harness uses the credentials provided in the GCP connector's settings to authenticate and perform operations with GCP.

To connect to Kubernetes clusters in GCP, you can use a GCP connector or the [platform-agnostic Kubernetes Cluster connector](../../../platform/connectors/cloud-providers/ref-cloud-providers/kubernetes-cluster-connector-settings-reference.md).

## Auth Provider API and TokenRequest API options

Harness provides the option of using the Auth Provider API or TokenRequest API for authentication. Complete this setup if you want to use this option for your GCP connector.

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

- **Auth Provider API**: this is the current default. You do not have to change the default settings of Harness connectors or the Harness Delegates you use.
- **TokenRequest API**: you must install the provider-specific plugin on the Harness Delegate(s) to use the TokenRequest API introduced in Kubernetes 1.22.

### Install the gke-gcloud-auth-plugin on the delegate

When using the Harness GCP connector with Kubernetes version >= 1.22, you can use the **gke-gcloud-auth-plugin** to authenticate to GKE cluster.

The Harness GCP connector has 2 credential types. For each type, you must install the following dependencies in the Harness Delegates you use or Harness will follow the old Auth Provider API format.

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

For more information, go to [Install the gcloud CLI](https://cloud.google.com/sdk/docs/install) from Google and [Delegate installation overview](/docs/platform/delegates/install-delegates/overview.md).

## Prepare GCS

Before creating the GCP connector, you need to:

* **Assign IAM roles to the GCP service account or Harness Delegate that you will attach to the connector.**
  * The necessary IAM roles and policies depend on which GCP service you'll use with Harness and which operations you'll want Harness to perform in GCP.
  * GCP connectors can also inherit IAM roles from Harness delegates running in GCP. If you want your connector to inherit from a delegate, make sure the delegate has the necessary roles.
  * If you find that the IAM role associated with your GCP connector doesn't have the policies required by the GCP service you want to access, you can modify or change the role assigned to the GCP account or the Harness Delegate that your GCP connector is using. You might need to wait up to five minutes for the change to take effect.
  * For details about the roles and policies required to use a GCP connector with GKE, GCS, GCR, GAR, or Stackdriver, go to [Google Cloud Platform (GCP) Connector Settings Reference](/docs/platform/connectors/cloud-providers/ref-cloud-providers/gcs-connector-settings-reference.md).
  * The [GCP Policy Simulator](https://cloud.google.com/iam/docs/simulating-access) is useful for evaluating policies and access.
* **Check your GKE version.**
  * Harness supports GKE 1.19 and later.
  * If you use a version prior to GKE 1.19, please enable Basic Authentication. If Basic authentication is inadequate for your security requirements, use the [Kubernetes Cluster Connector](./add-a-kubernetes-cluster-connector.md).
* **Add the GKE metadata server IP to your `NO_PROXY` list.**
  * If your GCP connector will inherit credentials from a delegate that uses a proxy *and* the GKE cluster or VM where the delegate is installed uses Workload Identity to authenticate, then you must add the GKE metadata server IP (`169.254.169.254`) to your `NO_PROXY` list.
  * To verify the IP address, go to [Understanding the GKE metadata server](https://cloud.google.com/kubernetes-engine/docs/concepts/workload-identity#metadata_server) in the GCP docs.
  * To add the IP address to your `NO_PROXY` list, do the following:

    - Open the `harness-delegate.yaml` you used to create the delegate, and add the GKE metadata server IP address to the `NO_PROXY` setting in the `StatefulSet` spec:

       ```yaml
           - name: NO_PROXY  
             value: "169.254.169.254"
       ```
      Apply `harness-delegate.yaml` again to restart the Kubernetes delegate (`kubectl apply -f harness-delegate.yaml`).

## Create a GCP connector

1. Open a Harness project, and select **Connectors** under **Project Setup**.
2. Select **New Connector**, and then select **GCP** under **Cloud Providers**.
3. Input a **Name** for the connector. **Description** and **Tags** are optional.
   Harness automatically creates an **Id** ([entity identifier](/docs/platform/references/entity-identifier-reference.md)) for the connector based on the **Name**.
4. Select **Continue** to configure credentials. For more information about these options, go to the [Details settings in the GCP connector settings reference](./ref-cloud-providers/gcs-connector-settings-reference.md#details-settings).
   * **Specify credentials here:** Use a GCP service account key.
   * **Use the credentials of a specific Harness Delegate:** Allow the connector to inherit its authentication credentials from the Harness Delegate that is running in GCP.
5. Select **Continue** to proceed to **Select Connectivity Mode** and select how you want Harness to connect to GCP. For more information about these options, go to the [Connectivity mode settings in the GCP connector settings reference](./ref-cloud-providers/gcs-connector-settings-reference.md#select-connectivity-mode).
   * **Connect through Harness Platform:** Use a direct, secure communication between Harness and GCP. This connectivity mode is required for [Harness Cloud build infrastructure](/docs/continuous-integration/use-ci/set-up-build-infrastructure/use-harness-cloud-build-infrastructure).
   * **Connect through a Harness Delegate:** Harness communicates with GCP through a Harness Delegate in GCP. You must choose this option if you chose to inherit delegate credentials. If you select this option, you must select if you want Harness to use any available delegate or only use delegates with specific tags.
   * **Use OpenID Connect (OIDC):** This option uses OIDC authentication to access public cloud resources without secrets or credentials.
6. Select **Save and Continue** to run the connection test. If the test succeeds, select **Finish**. The connection test confirms that your authentication and delegate selections are valid.

## Troubleshooting GCP connector errors

If the connection test fails due to a credentials issue, use the GCP CLI or console to check the GCP service account or delegate's credentials. The [GCP Policy Simulator](https://cloud.google.com/iam/docs/simulating-access) is useful for evaluating policies and access.

Due to the limited scope of the initial connection test, credentials can pass the connection test and then fail when you use the connector in a pipeline if the IAM role the connector is using doesn't have the roles and policies needed for the pipeline's operations. For example, if a pipeline has a Run step that references a GCP connector, the connector may need to have specific roles or policies to be able to execute the operations required by the Run step.

If you experience any errors with GCP connectors, verify that the IAM roles and policies it is using are correct.

For a list of roles and policies, go to the [Google Cloud Platform (GCP) Connector Settings Reference](/docs/platform/connectors/cloud-providers/ref-cloud-providers/gcs-connector-settings-reference.md).
