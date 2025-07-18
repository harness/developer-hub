import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import RedirectIfStandalone from '@site/src/components/DynamicMarkdownSelector/RedirectIfStandalone';

<RedirectIfStandalone label="Azure" targetPage="/docs/cloud-cost-management/get-started/dynamic-get-started" />

## Before You Start
:::caution time for data delivery
It may take up to **24 hours** for AWS to begin delivering cost and usage data. You can still proceed through the wizard, but the connection test may fail if data isn’t yet available.

In the meantime, explore the optional requirements and feature integrations available in Harness CCM, these will be available to select in your **Choose Requirements** step of the connection wizard:

  - [Resource Inventory Management](/docs/cloud-cost-management/use-ccm-cost-reporting/use-ccm-dashboards/view-aws-ec-2-inventory-cost-dashboard/).
  - [Optimization by AutoStopping](/docs/cloud-cost-management/use-ccm-cost-optimization/optimize-cloud-costs-with-intelligent-cloud-auto-stopping-rules/getting-started).
  - [Cloud Governance](/docs/cloud-cost-management/use-ccm-cost-governance/asset-governance/asset-governance).
  - [Commitment Orchestration](/docs/category/commitment-orchestrator).
:::

---

## Cloud Connector Wizard
<Tabs>
<TabItem value="Quick Create" label="Quick Create">

### Interactive Guide
<DocVideo src="https://app.tango.us/app/embed/e1019596-4936-481c-91c0-f66edadec236?skipCover=false&defaultListView=false&skipBranding=false&makeViewOnly=true&hideAuthorAndDetails=true" title="Add Kubernetes Cloud Cost Connector in Harness" />

### Step-by-Step Guide
### Step 1: Overview
1. Launch the wizard and select **Kubernetes** as the cloud provider. Click on **Quick Create**.
2. Enter a name for your connector. Please note, this is the name with which the Kubernetes Cluster will be identified in Harness Cloud Cost Management. Also you need to have **Cluster Admin Role** to the Cluster you would like to add
3. Click **Continue**.

---

### Step 2: Download and Apply YAML

To provide your cluster with permissions apply the following YAML.

Applying the YAML file will:

1. Create a Harness Delegate

2. Assigns the Cluster admin role to the Delegate

Step to Apply the YAML:

Step 1

Download the YAML file as shown on wizard. You can also preview the YAML file.

Step 2

Apply the YAML using the command:

kubectl apply -f harness-delegate.yml

Once applied, click on “Continue”. A Kubernetes Connector will be created.

::note
For EKS Clusters, ensure that the Metrics server is installed on your Kubernetes cluster where your Harness Kubernetes Delegate will be installed

:::


---

### Step 3: Create and Test Connection

Creating Delegate : Created Successfully

Listening for a heartbeat from the Delegate : Installed Successfully

Creating Connectors : Created Successfully

Verifying Permissions

---

🎉 You’ve now connected your Kubernetes cluster and enabled cost visibility in Harness.

</TabItem>
<TabItem value="Advanced" label="Advanced"> 

### Prerequisites

If you have previously created a connector to the preferred cluster for any other modules (Deployments, Builds etc.), you may reference the same connector to upgrade to support Cloud Cost Management. 

If this is your first time creating a connector to the cluster, you need to create a new connector. 


### Interactive Guide
<DocVideo src="https://app.tango.us/app/embed/a55ce80b-4990-4510-9407-7d69690d70c1?skipCover=false&defaultListView=false&skipBranding=false&makeViewOnly=true&hideAuthorAndDetails=true" title="Add Kubernetes Cloud Cost Connector in Harness" />

### Step-by-Step Guide

### Step 1: Overview

1. **Select Kubernetes Connector**: Choose an existing Kubernetes connector from your available connectors.
2. **Configure Cloud Cost Connector**: Enter a name, optional description, and tags for your connector.
3. Click **Continue** to proceed to the next step.

----

### Step 2: Feature Selection

Choose the Cloud Cost Management features you want to enable for your Kubernetes cluster:

- **Deep Kubernetes Cost Visibility** (Selected by default)
- **Kubernetes Optimization by AutoStopping** (Optional)

:::tip
You can enable AutoStopping later if you prefer to start with cost visibility only.
:::

Click **Continue** to proceed to the next step.

------

### Step 3: Secret Creation (Conditional - if AutoStopping is selected)

1. **Create an API key** from your Harness account settings
2. **Create namespace**:
   ```bash
   kubectl create namespace harness-autostopping
   ```
3. **Create secret YAML file** - Replace `YOUR_API_TOKEN_HERE` with your actual API key:
   ```yaml
   apiVersion: v1
   stringData:
     token: YOUR_API_TOKEN_HERE
   kind: Secret
   metadata:
     name: harness-api-key
     namespace: harness-autostopping
   type: Opaque
   ```
4. **Apply the secret**:
   ```bash
   kubectl apply -f secret.yaml
   ```

---

### Step 4: Provide Permissions

1. **Download YAML file** - The wizard will provide a YAML file containing permissions to access the pods and services of the cluster. You can also preview the YAML file.

2. Copy the downloaded YAML to a machine where you have kubectl installed and have access to your Kubernetes cluster. Run the following command to apply the Harness delegate to your Kubernetes Cluster:

```bash
kubectl apply -f ccm-kubernetes.yaml
```   

:::note
For EKS clusters, ensure the metrics server is installed. 
:::

3. Click **Done** and then **Continue**


---

### Step 5: Verify Connection

Harness will verify the connection to your Kubernetes cluster

---

🎉 **Success!** You've successfully connected your Kubernetes cluster to Harness Cloud Cost Management.

</TabItem>
</Tabs>


## See Your Cloud Costs
Use **[Perspectives](https://developer.harness.io/docs/cloud-cost-management/use-ccm-cost-reporting/ccm-perspectives/creating-a-perspective)** to organize and visualize your cloud costs by business context—such as teams, environments, or applications.

---

## Next Steps
Once your Azure billing data is flowing into Harness, explore these features to enhance your cloud cost management:

- Create [Budgets and Alerts](/docs/cloud-cost-management/use-ccm-cost-governance/ccm-budgets/create-a-budget) to monitor spend thresholds.
- Use [BI Dashboards](/docs/cloud-cost-management/use-ccm-cost-reporting/use-ccm-dashboards/access-ccm-dashboards) to visualize cloud usage and trends.
- Revisit optional integrations:
  - [Resource Inventory Management](/docs/cloud-cost-management/use-ccm-cost-reporting/use-ccm-dashboards/azure-cost-dashboard/).
  - [Optimization by AutoStopping](/docs/cloud-cost-management/use-ccm-cost-optimization/optimize-cloud-costs-with-intelligent-cloud-auto-stopping-rules/getting-started).
  - [Cloud Governance](/docs/cloud-cost-management/use-ccm-cost-governance/asset-governance/asset-governance).

Turn visibility into action and unlock cost efficiency across your Azure cloud infrastructure.