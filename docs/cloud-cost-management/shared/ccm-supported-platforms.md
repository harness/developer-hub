This topic provides the Harness Cloud Cost Management supported platforms and feature support matrix: 


```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```
```mdx-code-block
<Tabs>
  <TabItem value="Cost Reporting" label="Cost Reporting">
```

| **Features** | **AWS** | **Azure** | **GCP** | **Kubernetes** | **RBAC Support** |
| --- | --- | --- | --- | --- | --- |
|Perspectives | ✅  | ✅  | ✅  | ✅  | ✅ |
|Cost Categories | ✅  | ✅  | ✅  | ✅ | |
|BI dashboards |✅  |✅ | ✅ | ✅ | ✅ |
|Anomaly detection  | ✅ | ✅ | ✅ | ✅ | ✅ |
|Currency Standardisation | ✅ | ✅ | ✅ | ✅ | ✅ |
|Inventory Management | Supported services/products: <ul><li>EC2</li><li> RDS</li><li>EBS</li></ul> | Supported services/products: <ul><li>Azure VM</li></ul>| Supported services/products: <ul><li>Instances</li><li> Disks</li></ul> | None | Managed through Dashboards |

<details>
<summary>Perspectives</summary>

* **Overview:**

 [Perspectives overview](https://developer.harness.io/docs/category/perspectives)

* **Feature highlights**

   - Multi-cloud support
   - Supported Filtering and Grouping options:
 
     - by Cloud Service Providers (CSP) such as AWS, GCP, and Azure
     - by Labels and Tags
     - by [Cost Category](https://developer.harness.io/docs/cloud-cost-management/use-ccm-cost-reporting/ccm-cost-categories/ccm-cost-categories/)

   - Budgets, Reports, and Anomaly alerts 
   - Perspective preferences: Only AWS and GCP 
   - Resource-level data support for cluster perspective 

* **Supported Integrations** 

 Terraform support - coming soon

* **Supported Platforms**
    - SaaS
    - SMP

* **Limitations**

  - Resource-level granularity is not feasible in cloud perspectives
  - Perspective Preferences: Not supported for Azure and Kubernetes
  - RBAC is not supported

</details>

<details>
<summary>Cost category</summary>

* **Overview:**

 [Cost Categories overview](https://developer.harness.io/docs/cloud-cost-management/use-ccm-cost-reporting/ccm-cost-categories/ccm-cost-categories)

* **Feature highlights**

   - Defining cost buckets
   - Managing unallocated costs
 
     - Show and hide options

   - Attributing shared costs

* **Supported Platforms**
    - SaaS
    - SMP

* **Limitations**

  - Not supported in dashboards for cluster data
  - Shared cost is not supported in dashboards
  - Sharing of unallocated costs among cost buckets is not supported
  - Maximum limit:
    - Cost Buckets: 1000
    - Shared Buckets: 10

</details>

<details>
<summary>Currency Standardization</summary>

* **Overview:**

 [Set up currency preferences](https://developer.harness.io/docs/cloud-cost-management/use-ccm-cost-reporting/currency-preferences)

* **Feature highlights**
  
   - 15 supported currencies
   - One preferred currency for all CSPs
   - Default or custom currency conversion factor
   - Option to change currency conversion factor. The new factor will be used to:
   
     - Reflect current month’s data and new data for cloud
     - Reflect current day’s data and new data for cluster

   - Currency representation based on locale. Default is `en-us` locale.
   - After configuring it may take up to 24 hours for the converted value to be displayed.


* **Supported Platforms**
    - SaaS

* **Limitations**

  - Raise a request to replay/backfill cluster data with the preferred currency
  - You can configure your preferred currency only once. It can't be updated later.
  - The currency symbol in Dashboards won’t change, but the cost values are displayed in the preferred currency.

</details>

<details>
<summary>Anomalies</summary>

* **Overview:**

 [Detect cloud cost anomalies](https://developer.harness.io/docs/cloud-cost-management/use-ccm-cost-reporting/detect-cloud-cost-anomalies-with-ccm)

* **Feature highlights**

   - Automated anomaly detection
   - Provides visualizations and reports
   - Slack/email notification as soon as anomalies are detected by Harness CCM


* **Supported Platforms**
    - SaaS
    - SMP

* **Limitations**

  - To send an alert, the anomaly has to be associated with a perspective and alerting has to be set based on perspectives.

</details>

<details>
<summary>BI Dashboards</summary>

* **Overview:**

 [Dashboards](https://developer.harness.io/docs/category/dashboards)

* **Feature highlights**

   - Out-of-the-box cost dashboards for K8s, AWS, GCP, AZURE
   - Detailed dashboards for the following inventory items:
   
     - AWS: EC2, EBS, RDS
     - GCP: VM, Disk
     - Azure: VM

  - Ability to create custom dashboards for K8s, AWS, GCP, and Azure


* **Supported Platforms**
    - SaaS
    - SMP (AWS and K8s based on looker support in air-gapped mode)

* **Limitations**

  - Detailed resource-specific dashboards present only for limited types of resources (For example, AWS EC2, EBS, RDS, GCP VM, etc.)
  - The currency symbol in Dashboards does not change based on the currency preference set, but it will show the cost values in the preferred currency.

</details>


```mdx-code-block
  </TabItem>
  <TabItem value="Cost Optimization" label="Cost Optimization">
```
| **Features** | **AWS** | **Azure** | **GCP** | **Kubernetes** | **RBAC Support** |
| --- | --- | --- | --- | --- | --- |
|AutoStopping | ✅  | ✅  | ✅  | ✅  | ✅ |
|Recommendations | ✅  | ✅  | ✅  | ✅ | ✅ |
|Commitment Orchestrator | Coming soon | |  |  |  |

<details>
<summary>AutoStopping</summary>

* **Overview:**

 [AutoStopping rules](https://developer.harness.io/docs/category/autostopping-rules)

* **Feature highlights**

   - Ability to stop idle cloud resources intelligently
   - Supports various traffic sources like HTTP, and TCP.
   - Supports fixed schedules
   - Supports dry run mode for initial evaluation
   - Major cloud providers like AWS, GCP, and Azure are supported

* **Supported Integrations** 

  - API
  - Terraform

* **Supported Platforms**
    - SaaS


</details>

<details>
<summary>Recommendations</summary>

* **Overview:**

 [Recommendations](https://developer.harness.io/docs/category/recommendations)

* **Feature highlights**

   - Multi-cloud support
   - Supported products/services - EC2, Azure VMs, ECS, Governance, Workload (clusters), Nodepool (All CSPs)
   - Lifecycle management by using Jira
   - Customization of recommendations by using the “Ignore list” feature.
   - Tuning of recommendations


* **Supported Platforms**
    - SaaS
    - SMP

* **Limitations**

  - Notifications are not triggered for recommendations.
  - No support for GCP VMs

</details>



```mdx-code-block
  </TabItem>
  <TabItem value="Cost Governance" label="Cost Governance">
```

| **Features** | **AWS** | **Azure** | **GCP** | **Kubernetes** | **RBAC Support** |
| --- | --- | --- | --- | --- | --- |
|Asset Governance | ✅  | Coming soon |  |   | ✅ |
|Budgets | ✅  | ✅  | ✅  | ✅ | ✅ |

<details>
<summary>Asset Governance</summary>

* **Overview:**

 [Asset Governance](https://developer.harness.io/docs/category/asset-governance/)

* **Feature highlights**

   - Ability to enforce compliance on cloud usage.
   - Well-structured policies in the form of YAML.
   - Support for a wide variety of resource types out of the box.
   - Comes packaged with some out-of-the-box policies.
   - Recommendations to help companies take action on resources with low usage and high savings.
   - Ability to execute policies in Dry Run mode without impacting cloud resources to estimate potential savings.

* **Supported Integrations** 

  - API
  - Jira
  - AIDA

* **Supported Platforms**
    - SaaS

* **Limitations**

  - Unable to track cost savings on actions performed outside the platform
  - Cost savings yet to be supported on all types of resources.

</details>

<details>
<summary>Budgets</summary>

* **Overview:**

 [Create budgets](https://developer.harness.io/docs/category/budgets)

* **Feature highlights**

   - Alerts and notifications
   - Budget grouping
   - Budget support for various time ranges (monthly, yearly, daily)
   - Set budgets for forecasted costs

* **Supported Platforms**
    - SaaS
    - SMP

* **Limitations**

  - Budget alerts are sent at fixed schedules. 
  - A budget can be part of only one budget group.

</details>


```mdx-code-block
  </TabItem>
  <TabItem value="Supported platforms" label="Supported platforms">
```

## Supported Kubernetes Management Platform

The following section lists the support for the Kubernetes management platform for CCM:

|                                                 |                        |                   |
| ----------------------------------------------- | ---------------------- | ----------------- |
| **Technology**                                  | **Supported Platform** | **Pricing**       |
| OpenShift 3.11                                  | GCP                    | GCP               |
| OpenShift 4.3                                   | AWSOn-Prem             | AWSCustom-rate\*  |
| Rancher                                         | AWS                    | Custom-rate\*\*   |
| Kops (Kubernetes Operations)                    | AWS                    | AWS               |
| Tanzu Kubernetes Grid Integrated Edition (TKGI) | On-Prem                | Custom-rate\*\*\* |

\* Cost data is supported for On-Prem OpenShift 4.3. This uses a custom rate.

\*\* Cost data is supported for K8s workloads on AWS managed by Rancher, but the cost falls back to the custom rate.

\*\*\* Cost is computed using a custom rate. This can be modified by Harness on request.

## Supported ingress controllers for Kubernetes AutoStopping

The following table lists the ingress controllers supported for Kubernetes AutoStopping:

|                            |                                                                    |
| -------------------------- | ------------------------------------------------------------------ |
| **Ingress Controller**     | **Extent of Support**                                              |
| Nginx ingress controller   | Fully supported                                                    |
| HAProxy ingress controller | Fully supported                                                    |
| Traefik as ingress gateway | Supported using ingress routes and manually configured middlewares |
| Istio as API gateway       | Fully supported                                                    |
| Ambassador as API gateway  | Supported by manually editing the mapping                          |

:::note
The supported Kubernetes version for AutoStopping is 1.19.
:::
## Feature Support Matrix

This section lists the feature support matrix for the supported cloud platforms:

### AWS Service

|                     |                         |                     |                               |
| ------------------- | ----------------------- | ------------------- | ----------------------------- |
|                     | **Inventory Dashboard** | **Recommendations** | **AutoStopping**              |
| **EC2**             | Yes                     | Yes         | Yes (With Spot Orchestration) |
| **ECS**             | Yes                     | Yes         | Yes                           |
| **EKS**             | Yes                     | Yes                 | Yes                           |
| **RDS**             | Yes                     | No                  | Yes                           |
| **EBS**             | Yes                     | No                  | No                            |
| **Snapshots**       | Yes                     | No                  | NA                            |
| **Elastic** **IPs** | Yes                     | No                  | NA                            |
| **ASGs**            | No                      | No                  | Yes (With Spot Orchestration) |

### GCP Product

|             |                         |                     |                  |
| ----------- | ----------------------- | ------------------- | ---------------- |
|             | **Inventory Dashboard** | **Recommendations** | **AutoStopping** |
| **GCE VMs** | Yes                     | Coming soon         | Yes     |
| **GKE**     | Yes                     | Yes                 | Yes              |

### Azure Product

|                     |                         |                     |                               |
| ------------------- | ----------------------- | ------------------- | ----------------------------- |
|                     | **Inventory Dashboard** | **Recommendations** | **AutoStopping**              |
| **Virtual Machine** | Yes             | Yes         | Yes (With Spot Orchestration) |
| **AKS**             | Yes                     | Yes                 | Yes                           |


```mdx-code-block
  </TabItem>
</Tabs>
```

For a comprehensive list of supported features in other Harness modules and the Harness Platform overall, go to [Supported platforms and technologies](/docs/getting-started/supported-platforms-and-technologies.md).
