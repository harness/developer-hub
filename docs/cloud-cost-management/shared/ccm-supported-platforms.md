
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


## SaaS

|    | **Features** | **Use Case** | **AWS** | **Azure** | **GCP** | **Kubernetes** | **RBAC Support** |
|----| --- | --- | --- | --- | --- | --- | --- |
| **📊 Cost Reporting** | [Perspectives](/docs/category/perspectives) | Custom views to slice and dice cloud spend across business dimensions. | ✅ | ✅ | ✅ | ✅ | ✅ |
| **📊 Cost Reporting** | [Cost categories](/docs/category/cost-categories) | Group and analyze cloud costs based on user-defined categories. | ✅ | ✅ | ✅ | ✅ | ✅ |
| **📊 Cost Reporting** | [Dashboards](/docs/category/bi-dashboards) | Visualize and track cloud cost trends, anomalies, and budgets in one place. | ✅ | ✅ | ✅ | ✅ | ✅ |
| **📊 Cost Reporting** | [Anomalies](/docs/category/anomalies) | Automatically detect unusual spikes or drops in your cloud spend. | ✅ | ✅ | ✅ | ✅ | ✅ |
| **💸 Cost Optimization** | [AutoStopping](/docs/category/autostopping-rules) | Automatically shut down idle resources to save costs. | ✅ | ✅ | ✅ | ✅ | ✅ |
| **💸 Cost Optimization** | [Recommendations](/docs/category/recommendations) | Get actionable insights to right-size and optimize cloud resources. | ✅ | ✅ | ✅ | ✅ | ✅ |
| **💸 Cost Optimization** | [Cluster Orchestrator for AWS EKS clusters](/docs/category/cluster-orchestrator-for-aws-eks-clusters) | Automate provisioning, scaling, and shutdown of Kubernetes clusters based on workload patterns to reduce idle costs. | ✅ EKS | |  |  | ✅|
| **💸 Cost Optimization** | [Commitment Orchestrator](/docs/category/commitment-orchestrator) | Manage and optimize AWS commitments like EC2 Convertible RIs and SPs and RDS Standard RIs . | <ul><li> EC2</li><li>RDS</li></ul> |  |  |  | ✅ |
| **🛡️ Cost Governance** | [Asset Governance](/docs/category/asset-governance) | Enforce policies on cloud resources to ensure cost efficiency and compliance. | ✅ | ✅ | ✅ |   | ✅ |
| **🛡️ Cost Governance** | [Budgets](/docs/category/budgets) | Set and track cloud spend limits to avoid budget overruns. | ✅ | ✅ | ✅ | ✅ | ✅ |

:::info
Harness CACM does not currently support AWS China regions.
:::
 

## Self-Managed Enterprise Edition

Review the following information about what installation infrastructure and CACM features are supported on Harness Self-Managed Enterprise Edition. 

:::info
AWS is the only supported installation infrastructure. If you do not install Harness Self-Managed Enterprise Edition on AWS, then you cannot use the CACM features. 
:::
  
### Connected Environment 
| **Features** | **AWS** | **Azure** | **GCP** | **Kubernetes** | 
| --- | --- | --- | --- | --- |
|Perspectives | ✅  | ✅ | ✅ | ✅ |
|Cost categories | ✅  | ✅ | ✅ | ✅ | 
|Budgets | ✅ | ✅ | ✅ | ✅ | ✅ |
|BI dashboards |✅  | ✅ | ✅ | ✅ | 
|Anomaly detection  | ✅ | ✅ | ✅ | ✅ |
|Currency standardization | ❌ | ❌ | ❌ | ❌ | 
|Recommendations |✅ | ✅ | ✅ | ✅ | 
|AutoStopping | ❌ | ❌ | ❌ | ❌ | 
|Asset governance | ❌ | ❌ | ❌ | ❌ | 
|Perspective Preferences| ✅ | ✅ | ✅ | ✅ |
|Commitment Orchestrator | ❌ | ❌ | ❌ | ❌ | 
|Cluster Orchestrator | ❌ | ❌ | ❌ | ❌ | 

### Air-Gapped environment
| **Features** | **AWS** | **Azure** | **GCP** | **Kubernetes** | 
| --- | --- | --- | --- | --- |
|Perspectives | ✅  | ❌  | ❌  | ✅ |
|Cost categories | ✅  | ❌  | ❌  | ✅ | 
|Budgets | ✅ | ❌  | ❌  | ✅ | 
|BI dashboards |✅  | ❌  | ❌  | ✅ | 
|Anomaly detection  | ✅ | ❌  | ❌  | ✅ |
|Currency standardization | ❌ | ❌ | ❌ | ❌ | 
|Recommendations |✅ | ✅ | ✅ | ✅ | 
|AutoStopping | ❌ | ❌ | ❌ | ❌ | 
|Asset governance | ❌ | ❌ | ❌ | ❌ | 
|Perspective Preferences| ✅ | ❌  | ❌  | ✅ | 
|Commitment Orchestrator | ❌ | ❌ | ❌ | ❌ | 
|Cluster Orchestrator | ❌ | ❌ | ❌ | ❌ | 

:::note
- Margin Obfuscation is not supported on Harness SMP.
- Istio virtual services are available for Azure in strict mode.
- The cost data for Kubernetes workloads will be derived from the public pricing provided by the respective cloud provider.
- Tracking recommendation lifescyle through Jira and ServiceNow is not supported in Air-gapped environments.
:::

### CACM on Air-Gapped Environment
CACM is supported in [Harness Self-Managed Enterprise Edition installs on an air-gapped environment](/docs/self-managed-enterprise-edition/install/install-in-an-air-gapped-environment).

CACM leverages AWS APIs that require connectivity from the isolated (air-gapped) instance. To grant access to these AWS APIs, establish VPC endpoints for the respective AWS services. For services lacking VPC endpoints, use a proxy to facilitate access. For more information, go to [Manage AWS costs by using CCM on Harness Self-Managed Enterprise Edition](../get-started/ccm-smp/aws-smp.md).

For a comprehensive list of supported features in other Harness modules and the Harness Platform overall, go to [Supported platforms and technologies](/docs/platform/platform-whats-supported).