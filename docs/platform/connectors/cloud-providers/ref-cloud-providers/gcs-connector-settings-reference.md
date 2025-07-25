---
title: Google Cloud Platform (GCP) connector settings reference
description: Settings and permissions for the GCP connector.
# sidebar_position: 2
helpdocs_topic_id: yykfduond6
helpdocs_category_id: 1ehb4tcksy
helpdocs_is_private: false
helpdocs_is_published: true
---
import IssuerURI from '/docs/continuous-integration/shared/issueruri.md'

Use a Harness Google Cloud Platform (GCP) connector to integrate GCP with Harness. Use GCP with Harness to obtain artifacts, communicate with GCP services, provision infrastructure, deploy microservices, and manage other workloads.

You can use the GCP connector to connect to Kubernetes clusters in GCP. You can also use the [platform-agnostic Kubernetes Cluster connector](kubernetes-cluster-connector-settings-reference.md).

## Role requirements

Certain roles are required in your GCP account, depending on how you are using the GCP connector.

### GKE/Kubernetes role requirements

If you use the GCP connector to connect to GKE, the GCP service account used for any credentials requires:

* **Kubernetes Engine Developer** (`roles/container.clusterAdmin`)
* **Storage Object Viewer** (`roles/storage.objectViewer`)

For instructions on adding roles to your service account, go to the Google documentation on [Granting Roles to Service Accounts](https://cloud.google.com/iam/docs/granting-roles-to-service-accounts). For more information about GCP roles, go to the GCP documentation on [Understanding Roles](https://cloud.google.com/iam/docs/understanding-roles?_ga=2.123080387.-954998919.1531518087#curated_roles).

Alternately, you can use a service account that has only the **Storage Object Viewer** permission needed to query GCR, and then use either an in-cluster Kubernetes delegate or a direct [Kubernetes Cluster Connector](kubernetes-cluster-connector-settings-reference.md) with the Kubernetes service account token for performing deployment.

:::warning

Harness supports GKE 1.19 and later. If you use a version prior to GKE 1.19, please enable Basic Authentication. If Basic authentication is inadequate for your security requirements, use the [Kubernetes Cluster Connector](/docs/platform/connectors/cloud-providers/add-a-kubernetes-cluster-connector).

:::

### GCS and GCR role requirements

For Google Cloud Storage (GCS) and Google Container Registry (GCR), the following roles are required:

* Storage Object Viewer (`roles/storage.objectViewer`)
* Storage Object Admin (`roles/storage.objectAdmin`)

For more information, go to the GCP [Artifact registry roles reference](https://cloud.google.com/iam/docs/understanding-roles#artifact-registry-roles).

Ensure the Harness Delegate you have installed can reach `storage.cloud.google.com` and your GCR registry host, for example `gcr.io`. Registry host name is declared in your step settings. For example, you can declare it in the **Host** field in the [Build and Push to GCR step settings](/docs/continuous-integration/use-ci/build-and-upload-artifacts/build-and-push/build-and-push-to-gcr.md).

### GAR role requirements

For Google Artifact Registry, the following roles are required:

* Artifact Registry Reader
* Artifact Registry Writer

For more information, go the GCP documentation about [Configuring Roles for Artifact Registry](https://cloud.google.com/artifact-registry/docs/access-control)

### Google Cloud Operations Suite (Stackdriver) requirements

Most APM and logging tools are added to Harness as Verification Providers. For Google Cloud's operations suite (formerly Stackdriver), use the GCP connector.

The following roles and permissions are required:

* **Stackdriver Logs:** The minimum role requirement is **Logs Viewer** (`logging.viewer`)
* **Stackdriver Metrics:** The minimum role requirements are **Compute Network Viewer** (`compute.networkViewer`) and **Monitoring Viewer** (`monitoring.viewer`).

For more information, go to the Google documentation on [Access control](https://cloud.google.com/monitoring/access-control).

## Proxies and GCP with Harness

If you are using a proxy server in your GCP account, and you want to use GCP services with Harness, make sure the following items **don't** use your proxy:

* `googleapis.com`: For details, go to the Google documentation on [Proxy servers](https://cloud.google.com/storage/docs/troubleshooting#proxy-server).
* The `token_uri` value from your Google Service Account: For details, go to the Google documentation on [Creating service account keys](https://cloud.google.com/iam/docs/creating-managing-service-account-keys#creating_service_account_keys).

## GCP connector settings

The GCP connector has the following settings to allow Harness to securely connect to Google Cloud Platform.

### Overview settings

* **Name:** The unique name for the connector.
* **Id:** Harness automatically creates an **Id** ([Entity Identifier](../../../references/entity-identifier-reference.md)) based on the **Name**. You can change the **Id** during initial connector creation. Once saved, the **Id** can't be changed.
* **Description:** Optional.
* **Tags:** For information about tags, go to the [Tags reference](../../../references/tags-reference.md).

### Details settings

Provide credentials that enable Harness to connect to your GCP account.

#### Specify credentials here

Select this option to use a GCP service account key.

- You can store a GCP service account keys as [Harness Encrypted File Secrets](/docs/platform/secrets/add-file-secrets).

- To obtain the Google Cloud's service account key file, go to the Google documentation on [Creating and managing service account keys](https://cloud.google.com/iam/docs/creating-managing-service-account-keys). JSON format is required.

![](./static/gcs-connector-settings-reference-00.png)

#### Use the credentials of a specific Harness Delegate

Select this option to allow the connector to inherit its authentication credentials from the Harness Delegate that is running in GCP.

<details>
<summary>Learn more about credential inheritance</summary>

* **IAM role inheritance:** The connector inherits the GCP IAM role assigned to the delegate in GCP, such a Harness Kubernetes delegate running in Google Kubernetes Engine (GKE). Make sure the delegate has the IAM roles that your connector needs.
* **GCP workload identity:** If you installed the Harness [install delegate](/docs/platform/delegates/install-delegates/overview.md) in a Kubernetes cluster in GKE that has [GCP Workload Identity](https://cloud.google.com/kubernetes-engine/docs/how-to/workload-identity?hl=tr#enable_on_cluster) enabled and uses the same service account and node pool annotation, then the Google Cloud Platform (GCP) connector inherits these credentials if it uses that delegate.
* **Role and policy changes:** If you find that the IAM role associated with your GCP connector don't have the policies required by the GCP service you want to access, you can modify or change the role assigned to the Harness Delegate that your GCP connector is using. You may need to wait up to five minutes for the change to take effect.
* **See also:**
  * [Add a Google Cloud Platform (GCP) connector](../../../connectors/cloud-providers/connect-to-google-cloud-platform-gcp.md)
  * [GCP Policy Simulator](https://cloud.google.com/iam/docs/simulating-access)

</details>

#### Use OpenID Connect (OIDC)

:::note

Currently, this feature is behind the feature flag `PL_GCP_OIDC_AUTHENTICATION`. Contact [Harness Support](mailto:support@harness.io) to enable the feature.

:::

Select the **Connect through Harness Delegate for OIDC** option to allow Harness Delegate to communicate directly with GCP through OIDC. This option uses OIDC authentication to access public cloud resources without secrets or credentials. This option requires Harness Delegate version 24.03.836xx or later.

To connect to GCP with OIDC, you must configure an [OIDC identity provider](https://cloud.google.com/iam/docs/workload-identity-federation-with-other-providers) GCP and connect the service account with relevant permissions that Harness will use to operate in GCP. Use the following Harness OIDC provider endpoint and OIDC audience settings to create your OIDC identity provider.

   * Harness OIDC Issuer provider endpoint: `https://app.harness.io/ng/api/oidc/account/<YOUR_ACCOUNT_ID>`.  See below for more details about the Issuer URL format, depending on the environment cluster for your Harness Account.
   * OIDC audience: `https://iam.googleapis.com/projects/<GCP_PROJECT_NUMBER>/locations/global/workloadIdentityPools/<POOL_ID>/providers/<WORKLOAD_PROVIDER_ID>`

When accessing Google Cloud resources, use [Workload Identity Federation](https://cloud.google.com/iam/docs/workload-identity-federation) to grant short-term access to the Harness GCP connector. For instructions, go to [Configure OIDC with GCP WIF for Harness Cloud builds](/docs/continuous-integration/secure-ci/configure-oidc-gcp-wif-ci-hosted).

<IssuerURI />

#### Enable Cross-Project Access

You can now have one connector scoped to multiple GCP projects, eliminating the need to create separate connectors for each project. With this feature, the connector will allow access to multiple GCP projects.

:::note
Currently, the Cross-Project Access feature for GCP connectors is behind the feature flag `CDS_GCP_OIDC_CONNECTOR_CROSS_PROJECT_ACCESS`.  Contact [Harness Support](mailto:support@harness.io) to enable the feature.
:::

This feature is supported when GKE infrastructure (Kubernetes, Helm and Google Cloud Run) is selected. The connector will allow access to multiple GCP projects for Kubernetes, Helm and Google Cloud Run infrastructure types only.

**Project Selection Flow**:
    * With the **feature flag enabled**, the system will query the list of GCP projects accessible via the connector.
    * The user will be prompted to select the target project (e.g., project2), in addition to the original project (project1).
    * With both project values, relevant APIs will be invoked in the workflow using both projects.

**Configuring the Project at the Infrastructure Level**

To configure the **Project** at the infrastructure level, follow these steps:

1. Navigate to **Project Settings** -> **Environment**, and select your desired Kubernetes environment.
2. In the **Infrastructure Definition** section, choose **Deployment Type** as **Kubernetes** or **Helm Native** and **Infrastructure Type** as **Google Kubernetes Engine**.
3. In the **Cluster Details** section:
  - For the **Connector**: Select the previously configured GCP OIDC cluster with the **feature flag enabled**. 
  - **Project (optional)**: Select the Project you want to use in dropdown
  - **Cluster**: The cluster dropdown will list all the cluster associated with the selected project
  - **Namespace**: Enter the target namespace in target cluster.

For more detailed instructions on using this for a Kubernetes infrastructure, refer to [Google Kubernetes Engine (GKE) for Kubernetes](/docs/continuous-delivery/deploy-srv-diff-platforms/kubernetes/define-your-kubernetes-target-infrastructure/#google-kubernetes-engine-gke).

### OIDC claims supported in Harness

**Trusted Claims:**

  - Harness validates the following claims internally to determine if the principal has the required permissions. When configuring trust on the Cloud Provider side, only these specific claims and their exact values should be accepted. Any claims outside this list must be rejected to avoid unauthorized access.
    * `accountId`
    * `organizationId`
    * `projectIdentifier`
    * `pipelineIdentifier`

  - The following claims are validated for existence in Harness, but do not include an access check:
    * `environmentIdentifier`
    * `connectorIdentifier`
    * `serviceIdentifier`

**Non-Trusted Claims**

  - The following claims are considered non-trusted. They are not validated for existence or access control and are used for informational context only:

    * `environmentType`
    * `connectorName`
    * `serviceName`
    * `triggeredByName`
    * `triggerByEmail`
    * `stageType`
    * `stepType`
    * `context`

#### Custom Parameters 

You can add attribute conditions in your Workload Identity Pools under Workload Identity Federation. 

![](./static/workload_pools.png)

Here are the custom attributes for the Harness GCP OIDC JWT:

- **account_id**: The account id of your Harness account.
- **organization_id**: The organization id of your Harness organization.
- **organization_name**: The organization name
- **project_id**: The project id of your Harness project. 
- **project_name**: The project name.
- **connector_id**: The id of the OIDC-enabled GCP connector that sent this token.
- **connector_name**: The name of the OIDC-enabled GCP connector that sent this token.
- **pipeline_Identifier**: Pipeline identifier 
- **pipeline_Name**: Pipeline Name
- **environment_identifier**: Environment Identifier
- **environment_name**: Environment name
- **environment_type**: Environment Type
- **context**: This specifies the Harness context from when this OIDC token is generated. Possible values for this field are:
  - `CONNECTOR_VALIDATION` - This context is sent when the connector is being setup.
  - `PIPELINE_CONFIGURATION` - This context is sent when a pipeline configuration is being completed.
  - `PIPELINE_EXECUTION` - This context is sent when a pipeline configuration is being executed.
  - `PERPETUAL_TASK` - This context is sent when a perpetual task is executing.

##### Examples

<details>
<summary> JWT sent by a connector at the account scope </summary>

```
{
  "typ": "JWT",
  "alg": "RS256",
  "kid": "NjVBRjY5MDlCMUIwNzU4RTA2QzZFMDQ4QzQ2MDAyQjVDNjk1RTM2Qg"
}
{
  "sub": "Provider:Harness:Account:{account_id}",
  "iss": "https://token.oidc.harness.io/account/{account_id}",
  "aud": "https://app.harness.io/{account_id}", (address of harness instance with account id)
  "exp": 1632493867,
  "iat": 1632493567,
  "account_id": "ACCOUNT_ID",
}

```
</details>

Custom attributes will be included in the JWT payload.

### Select Connectivity Mode

Select how you want Harness to communicate with GCP. The available options depend on what you chose for **Details** settings.

#### Connect through Harness Platform

With this option, Harness communicates with GCP through a direct, secure communication between Harness and GCP. This connectivity mode is required for [Harness Cloud build infrastructure](/docs/continuous-integration/use-ci/set-up-build-infrastructure/use-harness-cloud-build-infrastructure).

#### Connect through a Harness Delegate

With this option, Harness communicates with GCP indirectly through a Harness Delegate that is running in GCP. 

You must choose this option if you chose to [inherit delegate credentials](#use-the-credentials-of-a-specific-harness-delegate).

If connecting through a Harness Delegate, select either:

* **Use any available Delegate**: Harness selects an available delegate at runtime. To learn how Harness selects delegates, go to [Delegate overview](../../../delegates/delegate-concepts/delegate-overview.md).
* **Only use Delegates with all of the following tags**: Use **Tags** to match one or more suitable delegates. To learn more about Delegate tags, go to [Use delegate selectors](../../../delegates/manage-delegates/select-delegates-with-selectors.md). You can select **Install new Delegate** to add a delegate without exiting connector configuration. For guidance on installing delegates, go to [Delegate installation overview](../../../delegates/install-delegates/overview).

:::note

It is possible to create a connector with a non-existent delegate. This behavior is intended. This design allows customers to replace a delegate with a new one of the same name or tag.

:::

### Troubleshoot GCP connector errors

Go to [Troubleshoot GCP connector errors](/docs/platform/connectors/cloud-providers/connect-to-google-cloud-platform-gcp#troubleshoot-gcp-connector-errors).
