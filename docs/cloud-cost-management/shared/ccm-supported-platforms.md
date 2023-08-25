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
|Inventory Management | Supported services and products: <ul><li>EC2</li><li> RDS</li><li>EBS</li></ul> | Supported services and products: <ul><li>Azure VM</li></ul>| Supported services and products: <ul><li>Instances</li><li> Disks</li></ul> | NA | Managed through Dashboards |

<details>
<summary>Perspectives</summary>


### Feature summary
Different stakeholders in an organization care about different slices of your cloud data. Perspectives allow you to monitor the slice of data you are interested in. It also shows contextual recommendations and anomalies, tying in real time alerting and budgets to the specific style of data.

### Benefits

- Perspectives can help you monitor cloud costs, tie them back to optimization opportunities, and set budget to govern costs along with reporting and alerting capabilities.
- Single pane of glass across multiple cloud and cluster costs.
- Slice and dice data across multiple dimensions across cloud providers. 
- Deep resource-level visibility for K8s and ECS clusters. 

### Prerequisites
Any of the following CCM cloud connectors in a healthy state:
  - AWS
  - GCP
  - Azure 
  - K8s 

### Supported Integrations

 Terraform support - _coming soon_

### Supported Platforms
  - SaaS
  - SMP

### Notes
  - Upper limit of 10,000 perspectives 
  - Resource-level granularity is not feasible in cloud perspectives
  - Perspective Preferences
    - Not supported for Azure and Kubernetes
    - RBAC is not supported
  - Data level and connector level RBAC is not supported
  - The total cost displayed on the perspective list page is pre-computed (performed once per day) and could potentially deviate from the real-time costs presented within the perspective.

### Documentation link

 [Perspectives overview](https://developer.harness.io/docs/category/perspectives)


</details>

<details>
<summary>Cost category</summary>

### Feature summary
Cost categories are a rule-based engine that attaches additional metadata to categorize cloud spending. Enabling organizations to align costs with context most relevant to their showback and chargeback models.

Cost categories also enable you to reshare specific costs (Shared) with different sharing strategies.

### Benefits

- Contextualize cloud spending 
- Cost sharing to manage shared/ common pool resources 

### Prerequisites
Any of the following CCM cloud connectors in a healthy state:

- AWS
- GCP
- Azure 
- K8s 

### Supported Platforms

- SaaS
- SMP

### Notes

- Maximum limits

  - Cost Buckets: 1000
  - Shared Buckets: 10

- Dashboard limitations

  - Any changes to the cost categories will only be reflective for the current month data onwards. Historical data will point to the state of cost categories at that point in time.  
  - Cost category metadata attribution doesn’t work for any historical data, it is only from the point of cost category creation. 
  - Not supported in dashboards for cluster, AWS, GCP & Azure models. Only supported in the **Unified** Model. 
  - Shared cost data attribution of cost categories doesn’t flow into dashboards.

- Perspectives limitations
  - Perspectives always rely on the current state of cost categories, everything is generated dynamically real-time.
  - Sharing of unallocated costs among cost buckets is not supported


### Documentation link

 [Cost Categories overview](https://developer.harness.io/docs/cloud-cost-management/use-ccm-cost-reporting/ccm-cost-categories/ccm-cost-categories)


</details>

<details>
<summary>Currency Standardization</summary>


### Feature summary
Currency standardization allows you to view your cloud spend data in the currency of your choice. It provides more consistent, easy-to-consume, and meaningful cloud analytics across the entire business.

### Benefits
If you have cloud provider bills in different currencies, currency standardization helps you normalize all costs into a single currency of your choice. 

### Supported Platforms
- SaaS

### Notes

- After standardizing the currency, historical cluster data is not backfilled automatically. Today a support request has to be raised to replay/backfill data.
- You can configure your preferred currency only once. It can't be updated later.
- The currency symbol in dashboards don't change, but the cost values are displayed in the preferred currency.
- Only 15 currencies are supported
- Default currency conversion factor is picked up from the CUR and falls back to public API. 
- Option to change currency conversion factor. The new factor will be used to:

  - Reflect current month’s data and new data for cloud
  - Reflect current day’s data and new data for cluster
- Currency representation based on locale. Default is `en-us` locale.
- After configuring it may take up to 24 hours for the converted value to be displayed.

### Documentation link

[Set up currency preferences](https://developer.harness.io/docs/cloud-cost-management/use-ccm-cost-reporting/currency-preferences)


</details>

<details>
<summary>Anomalies</summary>

### Feature summary
Anomaly detection helps detect unusual spending patterns in your clusters costs and cloud accounts. Cloud cost anomaly detection can be used as a tool to keep cloud costs under control. It also provides alerting capabilities (email and Slack) so that stakeholders are notified of each anomaly that's detected.

### Benefits
* **Early detection of unusual expenses**: Anomaly detection can quickly identify unusual spending patterns or unexpected costs. This early detection allows businesses to address potential issues promptly, preventing further financial losses.
* **Realtime alerting**: This can help relevant teams get notified proactively.

### Prerequisites
Any of the following CCM cloud connectors in a healthy state:

- AWS
- GCP
- Azure 
- K8s 

### Supported Platforms

- SaaS
- SMP

### Notes

- CCM detects anomalies only for the following time series:

  - Clusters: cluster name, namespaces
  - AWS: Account, Service, Usage Type 
  - GCP: Projects, Products and SKUs
  - Azure: Subscription ID, Service Name, and Resources

- Anomaly are detected once every 24 hours
- Anomaly are detected in one of the two cases:

  - Actual cost - Predicted Cost > $75
  - Actual Cost / Predicted Cost >= 1.25X

### Documentation link

 [Detect cloud cost anomalies](https://developer.harness.io/docs/cloud-cost-management/use-ccm-cost-reporting/detect-cloud-cost-anomalies-with-ccm)

</details>

<details>
<summary>BI Dashboards</summary>

### Feature summary
Custom dashboards enable you to leverage the full functionality of BI platform backed by the simple data models exposed by Cloud Cost Management. 

### Benefits
- **Data Visualization**: BI Dashboards allows users to create interactive and visually appealing dashboards and reports. This makes it easier for users to understand complex data sets and gain insights.

- **Real-time Data Access**: BI Dashboards enables users to access real-time data from various cloud sources. This ensures that users are making decisions based on the most up-to-date information.

- **Data Exploration and Discovery**: BI Dashboards provides a powerful and user-friendly interface that empowers users to explore and analyze data on their own. Users can easily drill down into specific data points, apply filters, and perform ad-hoc analysis.

### Prerequisites
Any of the following CCM cloud connectors in a healthy state:

- AWS
- GCP
- Azure 
- K8s 

### Supported Platforms
- SaaS
- SMP

### Notes
The following data can be consumed through dashboards: 

- AWS 
- GCP 
- Azure 
- Cluster 
  - ECS
  - K8s 
- Inventory 
  - EC2
  - RDS
  - EBS
  - Instances
  - Disks
  - Azure VM 
- Recommendations 
- Autostopping savings (Coming soon) 

### Documentation link

 [Dashboards](https://developer.harness.io/docs/category/dashboards)

</details>


```mdx-code-block
  </TabItem>
  <TabItem value="Cost Optimization" label="Cost Optimization">
```
| **Features** | **AWS** | **Azure** | **GCP** | **Kubernetes** | **RBAC Support** |
| --- | --- | --- | --- | --- | --- |
|AutoStopping | ✅  | ✅  | ✅  | ✅ \*  | ✅ |
|Recommendations | ✅  | ✅  | ✅  | ✅ | ✅ |
|Commitment Orchestrator | Coming soon | |  |  |  |

\* - Review the information within the AutoStopping section to access details about supported Kubernetes providers.
<details>
<summary>AutoStopping</summary>


### Feature summary

  AutoStopping Rules offer a seamless way to optimize your non-production resources, ensuring they are active only when needed, and inactive when idle. With the added advantage of orchestrating workloads on spot instances, interruptions due to spot interruptions become a thing of the past. By implementing AutoStopping Rules:
  
  - Eliminate unnecessary expenses incurred from allowing unused cloud VMs remain active.
  - Slash non-production cloud expenditures by a remarkable 70%.

### Benefits

   - Ability to stop idle cloud resources intelligently.
   - Supports various traffic sources such as HTTP, and TCP.
   - Supports fixed schedules.
   - Supports dry run mode for initial evaluation.
   - Major cloud providers such as AWS, GCP, and Azure are supported.

### Supported Configurations

#### AWS
  
##### EC2 VM
  - EC2 VMs behind ALB running HTTP(s) workloads
    - On-demand & Spot support
  - EC2 standalone VMs running HTTP(s) workloads (Proxy)
    - On-demand & Spot support
  - EC2 standalone VMs with SSH/RDP access (Proxy)  

  
##### AutoScaling groups

AutoScaling groups behind ALB running HTTP(s) workloads
  - On-demand & spot support
    - Spot support using ASG’s multiple instance type support
    
##### RDS
  RDS  connect using AutoStopping proxy

##### ECS
  ECS tasks running HTTP(s) workloads behind ALB

#### Azure
  
##### Azure VMs
  - Azure VMs behind App gateway running HTTP(s) workloads
    - On-demand support
    - Supports only AppGateway V2
  - Standalone Azure VMs running HTTP(s) workloads
    - On-demand support
    - Requires AutoStopping proxy

  <br></br> 
  
#### GCP
  
##### Compute Engine
  - Compute Engine standalone VM running HTTP(s) workloads
    - On-demand support
    - Requires AutoStopping proxy
  - Compute Engine standalone VM running SSH/RDP
    - On-demand support
    - Requires AutoStopping proxy for RDP/SSH direct connect

#### Instance Groups
  Standalone instance group VMs running HTTP(s) workloads

#### Kubernetes
##### Supported k8s providers

- EKS
  - Node pool mode
  - Fargate mode
- AKS
- GKE
  - Node pool mode
  - AutoPilot mode
- Kops

##### Supported resources
  - Deployment
  - Statefulset


##### Supported ingress controllers for Kubernetes AutoStopping

The following table lists the ingress controllers supported for Kubernetes AutoStopping:

|                            |                                                                    | |
| -------------------------- | ------------------------------------------------------------------ | --- |
| **Ingress Controller**     | **Extent of Support**                                              | - |
| Nginx ingress controller   | Full                                                    | - |
| HAProxy ingress controller | Full                                                    | - |
| Traefik as ingress gateway | Partial | Supported using ingress routes and manually configured middlewares|
| Istio as API gateway       | Full                                                    | - |
| Ambassador as API gateway  | Partial                          | Supported by manually editing the mapping|



:::important note
The supported Kubernetes version for AutoStopping is 1.19 or higher.
:::


### **Supported Integrations** 

  - API
  - Terraform

### **Supported Platforms**
  - SaaS

### **Documentation link** 

 [AutoStopping rules](https://developer.harness.io/docs/category/autostopping-rules)

</details>

<details>
<summary>Recommendations</summary>


### Feature summary
CCM provides recommendations for your ECS clusters, workloads, node pools, Azure VMs, and AWS EC2 instances. Recommendations are also generated for asset governance policies. These recommendations show you resource optimization opportunities to potentially reduce your monthly spending.

The recommendations are computed by analyzing the past utilization of CPU and memory of your workload. The implementation uses a histogram method to compute the recommendations.

### Benefits
* **Cost optimisation**: With recommendations you can get an overview of the potential cost savings on resources across your infrastructure.
  
* **Automated workflow**: Automatically generated recommendations based on your past utilization data and trends.

* **Ticketing integration**: Allows you to easily manage all the recommendations and facilitates comprehensive tracking of recommendation lifecycles across the system. CCM offers Jira and ServiceNow as the ticketing tools to manage all the recommendations within CCM. You are also provided with an option to ignore the recommendation if it is not applicable. 

### Prerequisites
- Kubernetes connectors are required for workload and node pool recommendations 
- AWS, Azure connectors with inventory management enabled. 

### Supported use cases
- AWS EC2 
- Azure VMs 
- K8s Cluster 
- Workload 
- Nodepool 
- ECS Service 
- Governance 

### Supported Platforms
- SaaS
- SMP

### Notes
- After onboarding the cloud or cluster connectors to CCM, it may take up to 48 hours for the recommendations to appear in the platform.
- Azure VM, AWS EC2 Recommendations are pulled in from the Azure advisor & AWS cost optimizer respectively 
  - Memory metrics are not considered when these recommendations are computed 
- Workload recommendations
  - 15% buffer to the recommended resources by default
  - CPU limits are not recommended by the platform 

- The following labels are used to process node pool recommendations. Make sure to add one of the labels listed below for the respective cloud providers:

 - Amazon Web Services (AWS)
   - `eks.amazonaws.com/nodegroup​`
   - `alpha.eksctl.io/nodegroup-name`​
   - `node-pool-name​`
   - `kops.k8s.io/instancegroup`

 - Google Cloud Platform (GCP)
   - `cloud.google.com/gke-nodepool`
   - `node-pool-name`​
   - `kops.k8s.io/instancegroup`

 - Microsoft Azure
   - `Agentpool​`
   - `node-pool-name​`
   - `kops.k8s.io/instancegroup`

- Potential savings

  - For Node pool recommendations, CCM uses public pricing to calculate costs.
  - For Workload and ECS recommendations, CCM uses the last day cost available from cluster data.
  - For EC2 and Azure VM recommendations, CCM fetches the values provided by the Cloud Provider themselves.

- GCP VM recommendations are not supported 
- Notifications are not supported for recommendations

### Documentation link

[Recommendations](https://developer.harness.io/docs/category/recommendations)

</details>


```mdx-code-block
  </TabItem>
  <TabItem value="Cost Governance" label="Cost Governance">
```

| **Features** | **AWS** | **Azure** | **GCP** | **Kubernetes** | **RBAC Support** |
| --- | --- | --- | --- | --- | --- |
|Asset Governance | ✅  | Coming soon | Coming soon |   | ✅ |
|Budgets | ✅  | ✅  | ✅  | ✅ | ✅ |

<details>
<summary>Asset Governance</summary>

 ### Feature summary

   Achieve a state of well managed cloud through a Governance-as-Code approach with real-time enforcement and auto-remediation.

 ### Benefits

   - Powered by the open-source [Cloud Custodian](https://cloudcustodian.io/) project, backed by CNCF.
   - Supports structured policies in YAML format, simplifying ad-hoc cloud-specific scripts.
   - Supports a wide range of out-of-the-box [cloud resource types](https://cloudcustodian.io/docs/aws/resources/index.html#aws-reference).
   - Pre-packaged with sample policies which can be used to detect orphan and under utilized resources, for select resource types.
   - Provides automated recommendations for addressing low utilization. Recommendations lifecycle is managed by Jira.
   - Ability to execute policies in dry run mode.
   - Supports cost calculation for EC2, RDS, EBS, and EBS snapshots.

### Prerequisites

  A CCM cloud connector (AWS) that has the required permissions.

### Supported usecases

  - Identify cloud resources that are either orphaned or underutilized based on defined conditions. For example, display RDS instances with storage usage below 10% with a specific tag.
  - Set up enforcements that automatically trigger corrective measures upon condition fulfillment. This applies to individual rules, multiple rules, and rule sets across various accounts and regions. For example, configure an enforcement to automatically power down EC2 instances during off-peak hours, ensuring large-scale remediation.
  - Send a notification through Slack or call a webhook when policy conditions are met.

### Supported Integrations

  - API
  - Jira
  - AIDA
  - RBAC

### Supported Configurations
  - AWS
  - Azure (Coming soon)
  - GCP (Coming soon)
  
### Supported Platforms
  - SaaS

### Notes

  - Cost correlation is available only for specific cloud resource types.
  - The presented cost savings are estimated based on approximate monthly costs for the respective group of resources.
  - Limit on number of custom rules - 300
  - Limit on number of target accounts per enforcement - 200
  - Limit on number of target regions in an enforcement - 30
  - Limit on number of rules in rule sets - 30
  - Limit on number of policies in an enforcement - 30
  - Limit on number of rule sets in an enforcement - 30

### Documentation link 

[Asset Governance](https://developer.harness.io/docs/category/asset-governance/)

</details>

<details>
<summary>Budgets</summary>


### Feature summary
Harness CCM Budgets allow you to set custom budgets and receive alerts when your costs exceed (or are forecasted to exceed) your budget. You can create budgets for Harness Applications and clusters along with Budget groups. Audit trail is supported for budgets and budget groups. 

### Benefits
* **Alerts and notification**s: Support for email and slack alerts to effectively monitor your customized budgets, ensuring your costs align with your anticipated targets.

* **Budget grouping**: Allows you to categorize and organize budgets into distinct and logical groups based on specific criteria. 

* **Budget support for various time ranges**: Allows you to establish financial limits for specific periods.

* **Set budgets for forecasted costs**: Allows you to project future expenditures for better financial management.

### Prerequisites
* Any of the following CCM cloud connectors in a healthy state:

  - AWS
  - GCP
  - Azure 
  - K8s 

* All budgets are linked to a perspectives, at least one perspective is required. 

### Supported Platforms

  - SaaS
  - SMP

### Notes
#### Budgets

- Budget breached for all weekly, monthly, yearly budgets are checked only once a day to send out notifications. 
- Budget breached for daily budgets are checked every hour.
- Perspective can’t be edited once a budget is created. Fields such as `budget period` and `start time` can’t be modified.

#### Budget Groups
 - All attributes of the budgets need to be same for them to be part of a budget group.
 - A budget can be part of only one budget group.
 - Cascading type can’t be modified for the budget group. 
 - Except for `budget period` and `start time`, budget settings within budget group for individual budgets can be modified. 

### Documentation link

[Budgets](https://developer.harness.io/docs/category/budgets)

</details>



```mdx-code-block
  </TabItem>
</Tabs>
```


:::important note
Harness does not currently support AWS China regions.
:::
For a comprehensive list of supported features in other Harness modules and the Harness Platform overall, go to [Supported platforms and technologies](/docs/getting-started/supported-platforms-and-technologies.md).
