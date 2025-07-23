import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import RedirectIfStandalone from '@site/src/components/DynamicMarkdownSelector/RedirectIfStandalone';

<RedirectIfStandalone label="GCP" targetPage="/docs/cloud-cost-management/get-started/dynamic-get-started" />

## Before You Start
To ensure a smooth and error-free setup experience, set up GCP Billing Export before launching the Harness wizard. This will allow you to progress through the setup without delays or missing prerequisites.

**Why is Billing Export required?**

Harness Cloud Cost Management (CCM) analyzes your cloud spending by accessing detailed billing data from your GCP account. The billing export automatically sends your cost and usage data to BigQuery, where Harness can securely read it.

:::info 
⚠️ GCP Billing Export Table Limitations and CMEK Restrictions
When setting up a connector for GCP Billing Export, keep the following limitations and guidelines in mind:

- GCP does not support copying data across regions if the source table uses CMEK.
- GCP also does not allow copying data from Materialized Views.
- If your organization enforces CMEK policies, consider creating a new dataset without CMEK enabled specifically for the integration.
- It is recommended to create the dataset in the US region, as it offers the most compatibility with GCP billing export operations.
- Use datasets with default (Google-managed) encryption when configuring the connector.

:::

---

### Step 1: Set Up the Billing Export
1. Go to **Billing → Billing export**.
2. Enable **Export detailed billing data to BigQuery**.
3. Choose a billing-enabled project and dataset.
4. Enable:
   - 📅 **Daily cost detail**
   - 📊 Export type: `Detailed usage cost data`
5. Note the **Dataset Name** and **Table Name** for the wizard.

[More Help → GCP Billing Export Guide](https://cloud.google.com/billing/docs/how-to/export-data-bigquery-setup)

---

### **Step 2: Grant Permissions**
1. Go to **BigQuery → Your Project → Dataset**.
2. Click **Share Dataset**.
3. Add the following service account as a **Viewer**: `<account-id>@<project-id>.iam.gserviceaccount.com`

---

:::caution time for data delivery
It may take up to **24 hours** for GCP to begin delivering cost and usage data. You can still proceed through the wizard, but the connection test may fail if data isn’t yet available.

In the meantime, explore the optional requirements and feature integrations available in Harness CCM, these will be available to select in your **Choose Requirements** step of the connection wizard:

  - [Resource Inventory Management](/docs/cloud-cost-management/use-ccm-cost-reporting/use-ccm-dashboards/view-aws-ec-2-inventory-cost-dashboard/).
  - [Optimization by AutoStopping](/docs/cloud-cost-management/use-ccm-cost-optimization/optimize-cloud-costs-with-intelligent-cloud-auto-stopping-rules/getting-started).
  - [Cloud Governance](/docs/cloud-cost-management/use-ccm-cost-governance/asset-governance/asset-governance).
:::

---

## Cloud Connector Wizard
Once you've gathered the required GCP details, follow these steps in the Harness setup wizard to connect your GCP account and enable cost visibility.

### Interactive Guide
<DocVideo src="https://app.tango.us/app/embed/3eb1eed3-85aa-4b1a-b4e6-d249989e7ce5?skipCover=false&defaultListView=false&skipBranding=false&makeViewOnly=true&hideAuthorAndDetails=true" title="Add GCP Cloud Cost Connector in Harness" />

### Step-by-Step Guide

### Step 1: Add GCP Account Details
1. In the wizard, enter a name for your connector (e.g., `gcp-demo-prod`).
2. Specify **Project ID**.
3. (Optional) Add a description and tags to help identify this connector later.
4. Click **Continue**.

---

### Step 2: Select or Create a Billing Export
Cloud Billing export to BigQuery enables you to export detailed Google Cloud billing data (such as usage and cost estimate data) automatically throughout the day to a BigQuery dataset that you specify.
1. If your Billing Export already exists, select it from the list.
2. If not, return to GCP and follow the steps in the [Before You Start](#before-you-start) section to create one. 
3. Once the Billing Export appears in the list, select it and click **Continue**.

---

### Step 3: Choose Requirements
1. **Cost Visibility** is selected by default and is required.
2. Optionally, you can enable any of the following features (they can also be added later):
   - Resource Inventory Management
   - Optimization by AutoStopping. If selected, you can select granular permissions for AutoStopping by clicking **Continue**
   - Cloud Governance
3. Click **Continue**.

---

### Step 4: Authentication (Conditional)

<DocImage path={require('../static/oidc-gcp.png')} width="100%" height="100%" title="Click to view full size image" />

If you have selected **Optimization by AutoStopping** or **Cloud Governance**, in previous step, you can set up Authentication. If not selected, this step will not be prompted.

You can enable authentication for your GCP account via

- Service Account with Custom Role: Created with custom permissions
- OIDC Authentication: Federated access with no stored credentials

#### OIDC Authentication

:::info 
This feature is behind a Feature Flag `CCM_ENABLE_OIDC_AUTH_GCP`. Contact [Harness Support](mailto:support@harness.io) to enable it.
:::

OIDC authentication allows secure access your billing data and perform cost optimization without storing credentials. 

To connect to GCP with OIDC, you must configure an [OIDC identity provider](https://cloud.google.com/iam/docs/workload-identity-federation-with-other-providers) in GCP and connect the service account with relevant permissions that Harness will use to operate in GCP. Use the following Harness OIDC provider endpoint and OIDC audience settings to create your OIDC identity provider.

- Harness OIDC Issuer provider endpoint: `https://app.harness.io/ng/api/oidc/account/<YOUR_ACCOUNT_ID>`. See below for more details about the Issuer URL format, depending on the environment cluster for your Harness Account.

- OIDC audience: `https://iam.googleapis.com/projects/<GCP_PROJECT_NUMBER>/locations/global/workloadIdentityPools/<POOL_ID>/providers/<WORKLOAD_PROVIDER_ID>`

**Issuer URL:**

The Issuer Format will need to be modified depending on the environment cluster in which your account resides. In `Account Settings` -> `Account Details`, you can see the Harness Cluster that your account resides in.

The Issuer URL format should follow `https://<HOSTNAME>/ng/api/oidc/account/<YOUR_HARNESS_ACCOUNT_ID>.`

The hostname should be as follows, even if a Vanity URL is set up for an account.

| Cluster | HostName |
|---------|----------|
| Prod1/Prod2 | app.harness.io |
| Prod3 | app3.harness.io |
| Prod0/Prod4 | accounts.harness.io |
| EU clusters | accounts.eu.harness.io |

Follow the steps on the **Authentication** page to complete OIDC authentication:
1. Configure the federation settings and service account in your GCP console. Read more about it: [Workload Identity Federation](https://cloud.google.com/iam/docs/workload-identity-federation)

2. Enter the following inputs from your GCP configuration:
- Workload Pool ID: This identifies the workload pool created in GCP, and it is the Pool ID value. To get the Workload Pool ID, go to [Manage workload identity pools](https://cloud.google.com/iam/docs/manage-workload-identity-pools-providers#pools).
- Provider ID This identifies the OIDC provider configured in GCP, and it is the Provider ID value. To get the Provider ID, go to [Manage workload identity pool providers](https://cloud.google.com/iam/docs/manage-workload-identity-pools-providers#manage-providers).
- Project Number: The project number of the GCP project that is used to create the workload identity federation. To get the Project number, go to [Creating and managing projects](https://cloud.google.com/resource-manager/docs/creating-managing-projects).
- Service Account Email: This is the service account that was linked to the workload identity pool in the last step.

If AutoStopping Granular Rules are selected, you will be prompted to generate commands. Click on **Generate commands for step 3** and run the commands listed on screen to create and assign the custom role with permissions for your selected features.

-----

### Step 5: Grant Permissions

Based on what you selected in **Step 3 - Choose Requirements**, you will be prompted to grant permissions to your service account alongwith the steps to be followed.

---

### Step 6: Verify the Connection
1. Harness will attempt to validate the connection using your inputs.
2. If this step fails, it's usually because GCP has not yet delivered the first billing export.
   - Wait up to **24 hours** after setting up the billing export before trying again.
3. Once validated, click **Finish Setup**.

---

🎉 You’ve now connected your GCP account and enabled cost visibility in Harness.

---

## After Connector Setup

Within about 24 hours of linking your GCP account, billing data begins to flow into Harness. Harness automatically creates default **Perspectives** so you can immediately understand where your cloud spend is going. You can also build custom Perspectives that match your teams, environments, or applications.

Next, head to **Budgets** to set spending thresholds and receive alerts.

As your data flows, Harness will start flagging **Anomalies** and you can configure notification preferences to stay on top of unexpected spikes.

---

## Individual Feature Permissions

### Governance Permissions

To configure permissions for Cloud Governance features:

1. Navigate to **IAM & Admin** in the GCP console.
2. If authentication is done via service account:
   - Search for your service account in the principals list
   - Click **Edit Principal**
   - Add the [**Viewer** role](https://cloud.google.com/iam/docs/understanding-roles#basic) (`roles/viewer`) from the Basic category
   - For automated actions, grant additional permissions as required by your governance policies
3. Click **Save** to apply the changes.

#### Enable required Google Cloud APIs for Governance

Governance Recommendations rely on the following Google Cloud services. Make sure they are **enabled in every project** you want to monitor:

- [**Cloud Run Admin API**](https://cloud.google.com/run/docs/reference/rest)
- [**Cloud Memorystore for Redis API**](https://cloud.google.com/memorystore/docs/redis/reference/rest)
- [**Cloud Functions API**](https://cloud.google.com/functions/docs/reference/rest)
- [**Kubernetes Engine API**](https://cloud.google.com/kubernetes-engine/docs/reference/rest)

You can enable the APIs via Google Cloud console:
1. Open **[APIs & Services](https://console.cloud.google.com/apis/library)** for your project (https://console.cloud.google.com/apis/library).  
2. Search for each API above and click **Enable**.

For enabling through console, see the [GCP documentation](https://cloud.google.com/endpoints/docs/openapi/enable-api#enabling_an_api).

### Granular Permissions for AutoStopping

#### Compute Engine Virtual Machines

<details>
<summary><b>Schedules only</b></summary>

```
// List VMs
compute.instances.list

// Tag VM
compute.instances.setLabels

// Get region information to list zones
compute.regions.get

// List regions
compute.regions.list

// Required while waiting to complete VM operations, for example stop operation
compute.zoneOperations.get

// Stop VM
compute.instances.stop

// Start VM
compute.instances.start
```

</details>

<details>
<summary><b>with AutoStopping Proxy</b></summary>

```
// List networks
compute.networks.list

// List machine types
compute.machineTypes.list

// List subnets
compute.subnetworks.list

// List security groups
compute.firewalls.list

// Create address
compute.addresses.create

// Get address
compute.addresses.get

// create disk
compute.disks.create

// Use sub network
compute.subnetworks.use

// Create proxy VM
compute.instances.create

// use static IP
compute.subnetworks.useExternalIp

// Use address
compute.addresses.use

// Set VM metadata
compute.instances.setMetadata

// Set tags
compute.instances.setTags

// Delete address
compute.addresses.delete

// Delete proxy VM
compute.instances.delete
```

</details>

#### Instance Groups

<details>
<summary><b>Schedules only</b></summary>

```
// Get region information to list zones
compute.regions.get

// List regions
compute.regions.list

// list instance groups
compute.instanceGroups.list

// list managed instance groups
compute.instanceGroupManagers.list

// get instance groups details
compute.instanceGroups.get

// Get instances in instance groups
compute.instances.get

// List autoscalers
compute.autoscalers.list

// Get autoscaler details
compute.autoscalers.get

// For updating autoscaler configurations. This is needed during warm up and cool down
compute.autoscalers.update

// List VMS in instance group
compute.instances.list

// Deleting VMs from managed instance groups during cool down
compute.instances.delete

// Get status of operations
compute.globalOperations.get

// Get status of operations
compute.regionOperations.get

// Get status of operations
compute.zoneOperations.get
```

</details>

<details>
<summary><b>with AutoStopping Proxy</b></summary>

```
// List networks
compute.networks.list

// List machine types
compute.machineTypes.list

// List subnets
compute.subnetworks.list

// List security groups
compute.firewalls.list

// Create address
compute.addresses.create

// Get address
compute.addresses.get

// create disk
compute.disks.create

// Use sub network
compute.subnetworks.use

// Create proxy VM
compute.instances.create

// use static IP
compute.subnetworks.useExternalIp

// Use address
compute.addresses.use

// Set VM metadata
compute.instances.setMetadata

// Set tags
compute.instances.setTags

// Delete address
compute.addresses.delete

// Delete proxy VM
compute.instances.delete
```

</details>
------

## Next Steps
Once your data is flowing, explore the tools available in Harness CCM to help you manage and reduce your cloud spend:

- Create [Budgets and Alerts](/docs/cloud-cost-management/use-ccm-cost-governance/ccm-budgets/create-a-budget) to monitor spend thresholds.
- Use [BI Dashboards](/docs/cloud-cost-management/use-ccm-cost-reporting/use-ccm-dashboards/access-ccm-dashboards) to visualize cloud usage and trends.
- Revisit optional integrations:
  - [Resource Inventory Management](/docs/cloud-cost-management/use-ccm-cost-reporting/use-ccm-dashboards/gcp-dashboard).
  - [Optimization by AutoStopping](/docs/cloud-cost-management/use-ccm-cost-optimization/optimize-cloud-costs-with-intelligent-cloud-auto-stopping-rules/getting-started).
  - [Cloud Governance](/docs/cloud-cost-management/use-ccm-cost-governance/asset-governance/asset-governance).
