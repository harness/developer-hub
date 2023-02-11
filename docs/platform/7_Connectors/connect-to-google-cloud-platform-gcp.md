---
title: Add a Google Cloud Platform (GCP) connector
description: Use a Harness GCP connector to integrate GCP with Harness.
# sidebar_position: 2
helpdocs_topic_id: cii3t8ra3v
helpdocs_category_id: o1zhrfo8n5
helpdocs_is_private: false
helpdocs_is_published: true
---

Use a Harness Google Cloud Platform (GCP) connector to integrate GCP with Harness. Use GCP with Harness to obtain artifacts, communicate with GCP services, provision infrastructure, and deploy microservices and other workloads.

You can use the GCP connector to connect to Kubernetes clusters in GCP. You can also use the [platform-agnostic Kubernetes Cluster connector](ref-cloud-providers/kubernetes-cluster-connector-settings-reference.md).

This topic explains how to set up a GCP connector.

## Before you begin

Before you begin, you must:

* **Assign IAM roles to the GCP service account or Harness delegate that you will attach to the connector.**
  * The necessary IAM roles and policies depend on which GCP service you'll use with Harness and which operations you'll want Harness to perform in GCP.
  * GCP connectors can also inherit IAM roles from Harness delegates running in GCP. If you want your connector to inherit from a delegate, make sure the delegate has the necessary roles.
  * If you find that the IAM role associated with your GCP connector doesn't have the policies required by the GCP service you want to access, you can modify or change the role assigned to the GCP account or the Harness delegate that your GCP connector is using. You may need to wait up to five minutes for the change to take effect.
  * For a list of roles and policies, go to [Google Cloud Platform (GCP) Connector Settings Reference](ref-cloud-providers/gcs-connector-settings-reference.md).
  * The [GCP Policy Simulator](https://cloud.google.com/iam/docs/simulating-access) is useful for evaluating policies and access.
* **Check your GKE version.**
  * Harness supports GKE 1.19 and later.
  * If you use a version prior to GKE 1.19, please enable Basic Authentication. If Basic authentication is inadequate for your security requirements, use the [Kubernetes Cluster Connector](add-a-kubernetes-cluster-connector.md).

## Add a GCP connector and configure credentials

1. Open a Harness project, and select **Connectors** under **Project Setup**.
2. Select **New Connector**, and then select **GCP** under **Cloud Providers**.

   ![](./static/connect-to-google-cloud-platform-gcp-07.png)

3. Input a **Name** for the connector. **Description** and **Tags** are optional.
   Harness automatically creates an **Id** ([entity identifier](../20_References/entity-identifier-reference.md)) for the connector based on the **Name**.
4. Select **Continue** to configure credentials. Select one of the following authentication options:
   * Select **Specify credentials here** to use a GCP service account key.
   * Select **Use the credentials of a specific Harness Delegate** to allow the connector to inherit its authentication credentials from the Harness delegate that is running in GCP.
5. Select **Continue** to proceed to **Select Connectivity Mode**.

<details>
<summary>Learn more about credential inheritance</summary>

* **IAM role inheritance:** The connector inherits the GCP IAM role assigned to the delegate in GCP, such a Harness Kubernetes delegate running in Google Kubernetes Engine (GKE). Make sure the delegate has the IAM roles that your connector needs.
* **GCP workload identity:** If you installed the Harness [Kubernetes delegate](/docs/first-gen/firstgen-platform/account/manage-delegates/install-kubernetes-delegate/) in a Kubernetes cluster in GKE that has [GCP Workload Identity](https://cloud.google.com/kubernetes-engine/docs/how-to/workload-identity?hl=tr#enable_on_cluster) enabled and uses the same service account and node pool annotation, then the Google Cloud Platform (GCP) connector inherits these credentials if it uses that delegate.
* **Role and policy changes:** If you find that the IAM role associated with your GCP connector doesn't have the policies required by the GCP service you want to access, you can modify or change the role assigned to the Harness delegate that your GCP connector is using. You may need to wait up to five minutes for the change to take effect.
* **See also:**
  * [Google Cloud Platform (GCP) Connector Settings Reference](ref-cloud-providers/gcs-connector-settings-reference.md)
  * [GCP Policy Simulator](https://cloud.google.com/iam/docs/simulating-access)

</details>

## Select connectivity mode

Harness uses GCP connectors during pipeline runs to authenticate and perform operations with GCP.

1. Select how you want Harness to connect to GCP:
   * **Connect through Harness Platform:** Use a direct, secure communication between Harness and GCP.
   * **Connect through a Harness Delegate:** Harness communicates with GCP through a Harness delegate in GCP. You must choose this option if you chose to inherit delegate credentials.
2. If connecting through a Harness delegate, select either:
   * **Use any available Delegate**: Harness selects an available Delegate at runtime. To learn how Harness selects delegates, go to [Delegates Overview](/docs/platform/2_Delegates/get-started-with-delegates/delegates-overview.md).
   * **Only use Delegates with all of the following tags**: Use **Tags** to match one or more suitable delegates. To learn more about Delegate tags, go to [Select Delegates with Tags](/docs/platform/2_Delegates/manage-delegates/select-delegates-with-selectors.md).
     * Select **Install new Delegate** to add a delegate without exiting connector configuration. For guidance on installing delegates, go to [Delegate Installation Overview](/docs/platform/2_Delegates/get-started-with-delegates/delegate-installation-overview.md).
3. Select **Save and Continue** to run the connection test, and then, if the test succeeds, select **Finish**. The connection test confirms that your authentication and delegate selections are valid.

<details>
<summary>GCP connector errors</summary>

If the connection test fails due to a credentials issue, use the GCP CLI or console to check the GCP service account or delegate's credentials. The [GCP Policy Simulator](https://cloud.google.com/iam/docs/simulating-access) is useful for evaluating policies and access.

Due to the limited scope of the initial connection test, credentials can pass the connection test and then fail when you use the connector in a pipeline if the IAM role the connector is using doesn't have the roles and policies needed for the pipeline's operations. For example, if a pipeline has a Run step that references a GCP connector, the connector may need to have specific roles or policies to be able to execute the operations required by the Run step.

If you experience any errors with GCP connectors, verify that the IAM roles and policies it is using are correct.

For a list of roles and policies, go to the [Google Cloud Platform (GCP) Connector Settings Reference](ref-cloud-providers/gcs-connector-settings-reference.md).

</details>

## See also

* [Harness Key Concepts](../../getting-started/learn-harness-key-concepts.md)
* [Supported Platforms and Technologies](../../getting-started/supported-platforms-and-technologies.md)
* [Google Cloud Platform (GCP) Connector Settings Reference](ref-cloud-providers/gcs-connector-settings-reference.md)
