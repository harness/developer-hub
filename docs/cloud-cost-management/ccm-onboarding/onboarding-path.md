---
title: CCM onboarding path
description: Step-by-step instructions to get started with CCM
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This topic describes the different phases and steps involved in onboarding with Harness CCM. Follow these steps to ensure that you have all the settings and resources required for moving forward with your CCM setup.



## Overview

This section lists the major onboarding phases and provides links to more details.


### <a href="#phase-1"> Phase 1: Initial setup</a>

| **Step**                                                          | **Details**                                                                | **Demo video**                                                         |
| ----------------------------------------------------------------- | -------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| <a href="#step-1-review-usecases">Review usecases</a>             | Review use cases and success criteria against what is supported today      |                                                                        |
| <a href="#step-2-configure-sso">Configure SSO</a>                 | SAML SSO with Harness, Okta, OneLogin, Keycloak, etc                       |                                                                        |
| <a href="#step-3-configure-rbac">Configure RBAC</a>               | Configure access control to restrict access                                |                                                                        |
| <a href="#step-4-setup-cost-visibility">Setup cost visibility</a> | Create cloud connectors and kubernetes connectors for cost data visibility | <a href="https://youtu.be/sHvw0-6y6tU" target="_blank">Watch Video</a> |


### <a href="#phase-2"> Phase 2: Cost reporting</a>

| **Step**                                                                              | **Details**                                                               | **Demo video** |
| ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- | -------------- |
| <a href="#step-1-explore-cost-using-perspectives">Explore cost using perspectives</a> | A perspective can be used to visualize data from multiple cloud providers |                |
| <a href="#step-2-explore-cost-using-dashboards">Explore cost using dashboards</a>     | Explore cost data using powerful BI dashboard                             |                |
| <a href="#step-3-performing-root-cost-analysis">Root cost analysis</a>                | Understand detailed breakdown of cloud spend                              |                |
| <a href="#step-4-cost-anomalies">Cost anomalies</a>                                   | Protect from anomalous spend                                              |                |

### <a href="#phase-3"> Phase 3: Cost optimization</a>

| **Step**                                                                            | **Details**                                                                                              | **Demo video** |
| ----------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- | -------------- |
| <a href="#step-1-setup-cloud-connectors">Setup cloud connectors</a>                 | Set up cloud connectors enabling optimization permissions                                                |                |
| <a href="#step-2-recommendations">Recommendations</a>                               | Explore right sizing recommendations for node pools and other resource types                             |                |
| <a href="#step-3-autostopping">AutoStopping - Stop resources when they are idle</a> | Create AutoStopping rules to stop resources (VMs, k8s workloads, ECS tasks etc) when they are not in use |                |

### <a href="#phase-4"> Phase 4: Cost governance</a>

| **Step**                                                | **Details**                                                                                                                          | **Demo video** |
| ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | -------------- |
| <a href="#step-1-setup-budgets">Setup budgets</a>       | Setting up a cloud budget is crucial to control costs, prevent overspending, and maintain financial transparency in cloud operations |                |
| <a href="#step-2-asset-governance">Asset governance</a> | Powerful governance based on cloud custodian policies                                                                                |                |


### <a href="#phase-5"> Phase 5: Automation</a>

| **Step**                                                    | **Details**                                 | **Demo video** |
| ----------------------------------------------------------- | ------------------------------------------- | -------------- |
| <a href="#step-1-ccm-apis">CCM APIs</a>                     | Integrate with CCM APIs to extend the usage |                |
| <a href="#step-2-terraform-provider">Terraform provider</a> | Manage CCM entities using Terraform         |                |


## Phase 1: Initial setup

### Step 1. Review usecases

CCM supports AWS, GCP, and Azure cloud providers. It offers various features that cater to different cloud resources across these platforms. To confirm that your specific use case is fully supported by CCM, please refer to the [What's Supported in Harness CCM](docs/cloud-cost-management/whats-supported.md) section.


### Step 2. Configure SSO

Harness supports Single Sign-On (SSO) with SAML, integrating with your SAML SSO provider to enable you to log your users into Harness as part of your SSO infrastructure. The user can choose between a variety of SSO integrations according to their needs.

For more information, go to [Authentication](docs/platform/authentication/authentication-overview.md).

### Step 3. Configure RBAC

CCM provides various set of RBAC permissions to control access to various entities. For more information go to [CCM Roles and Permissions](docs/cloud-cost-management/access-control/ccm-roles-and-permissions.md).

### Step 4. Setup cost visibility

First step in setting up Harness CCM is to create the cloud connector for respective cloud providers. A cloud connector is the configuration details which Harness uses to access the cloud provider APIs. At first, CCM will have the readonly permissions to access the cost data from the cloud providers.

Connector setup varies based on the cloud provider.

- [Setup cost visibility for AWS](docs/cloud-cost-management/get-started/onboarding-guide/set-up-cost-visibility-for-aws.md)
- [Setup cost visibiltiy for Azure](docs/cloud-cost-management/get-started/onboarding-guide/set-up-cost-visibility-for-azure.md)
- [Setup cost visibiltiy for GCP](docs/cloud-cost-management/get-started/onboarding-guide/set-up-cost-visibility-for-gcp.md)
- [Setup cost visibiltiy for Kubernetes](docs/cloud-cost-management/get-started/onboarding-guide/set-up-cost-visibility-for-kubernetes.md)

After the connectors are created, it will take atleast 24hrs for the cost data to be visible in CCM.

## Phase 2: Cost reporting

### Step 1. Explore cost using perspectives

A perspective can be used to visualize data from multiple cloud providers. 

CCM generates default perspectives based on cloud connectors, allowing users to explore cost data for each cloud provider. These default perspectives offer a solid foundation for understanding the concept of perspectives. Additionally, when Kubernetes connectors are available, CCM generates a `Cluster`` perspective. This cluster perspective displays cost data for all clusters such as k8s, ECS, and more.

For more information, go to [Create perspectives](docs/cloud-cost-management/3-use-ccm-cost-reporting/1-ccm-perspectives/1-create-cost-perspectives.md)


### Step 2. Explore cost using dashboards

CCM leverages comprehensive BI dashboards, offering powerful capabilities. While both perspectives and dashboards enable exploration of cost data similarly, dashboards leverage a complete Business Intelligence platform for advanced scenarios. CCM utilizes Google's Looker to empower its dashboards, enabling diverse data visualizations and report creation.

Furthermore, dashboards facilitate common use cases such as scheduled report delivery, alerting, and customization of metrics and measures. CCM comes equipped with pre-built, commonly used dashboards for easier initial setup and utilization.

For more information, go to [Create Dashboards](docs/cloud-cost-management/3-use-ccm-cost-reporting/6-use-ccm-dashboards/access-ccm-dashboards.md)


### Step 3. Performing root cost analysis

In the realm of cloud computing, root cost analysis takes on a crucial role in understanding and optimizing the expenses associated with utilizing cloud services. Cloud computing offers scalability, flexibility, and cost-effectiveness, but without proper management, it can lead to unexpected expenses. Root cost analysis in this context involves dissecting the various components contributing to the overall cloud expenditure, including compute, storage, network usage, data transfer, and additional services like databases or specialized tools.

By conducting root cost analysis in cloud computing, businesses can gain insights into the primary drivers behind their cloud expenses. This involves scrutinizing usage patterns, understanding the costs associated with different types of services or instances, and identifying inefficiencies or unnecessary spending. With this detailed understanding, organizations can implement cost optimization strategies, such as rightsizing instances, utilizing long term commitments like reserved instances or spot instances and leveraging [AutoStopping](docs/cloud-cost-management/4-use-ccm-cost-optimization/1-optimize-cloud-costs-with-intelligent-cloud-auto-stopping-rules/1-auto-stopping-rules.md) to align resources with actual demand. This approach enables businesses to make informed decisions about resource allocation, effectively manage their cloud budgets, and ensure cost efficiency while leveraging the benefits of cloud technology.

For more information, go to [Root cost analysis](docs/cloud-cost-management/3-use-ccm-cost-reporting/3-root-cost-analysis/perform-root-cost-analysis.md)


### Step 4. Cost anomalies

Detecting strange spending patterns in cloud computing is really important. It helps save money by spotting where resources are wasted and stops budgets from being used up unexpectedly. It also helps prevent security problems by catching unusual activities early, like someone getting into an account they shouldn't. Finding these odd spending habits also helps make sure everything runs smoothly, avoids wasting resources, and lets companies follow the rules about data security and money management. Overall, keeping an eye on weird spending in the cloud is key for saving money, staying secure, and running things efficiently.

For more information, go to [Cost anomalies](docs/first-gen/cloud-cost-management/ccm-anomaly-detection/detect-cost-anomalies-with-ce.md)


## Phase 3: Cost optimization

Utilizing Cloud Cost Management not only offers in-depth insights into cloud expenses but also generates actual cost savings by implementing optimization techniques on cloud resources.

### Step 1. Setup cloud connectors

As part of the Cost Reporting setup, cloud connectors for retrieving cost data are already established. These connectors are configured at either the master or billing account level and provide read-only access to the billing data.

To enable optimization features, CCM requires individual cloud connectors with read-write permissions.

For AWS, these connectors must be set up at the level of each individual AWS child account. For more details, refer to the [AWS setup guide](docs/cloud-cost-management/get-started/onboarding-guide/set-up-cost-visibility-for-aws.md).

For GCP, you need to create connectors for each GCP project. For more information, refer to the [GCP setup guide](docs/cloud-cost-management/get-started/onboarding-guide/set-up-cost-visibility-for-gcp.md).

For Azure, connectors should be created for each Azure subscription. For instructions, refer to the [Azure setup guide](docs/cloud-cost-management/get-started/onboarding-guide/set-up-cost-visibility-for-azure.md).

If you need to create multiple connectors, this process can be automated using the [connector creation APIs](https://apidocs.harness.io/tag/Connectors#operation/createConnector). Alternatively, you can use the [Harness Terraform provider](https://registry.terraform.io/providers/harness/harness/latest/docs) for this task.

### Step 2. Recommendations

CCM can provide three types of recommendations.

1. Right sizing recommendations coming from the cloud providers that are linked
2. Workload & Nodepool recommendations computed by CCM for the connected kubernetes clusters
3. Various other recommendations coming from Asset Governance policies

For more information on recommendations, go to [Recommendations](https://developer.harness.io/docs/category/recommendations)

#### Workflow for recommendations

Recommendations are generated daily, and CCM offers Jira integration to streamline the workflow for implementing these suggestions. Once a Jira account is connected, CCM can automatically generate Jira issues and assign them to the appropriate team member for implementation.

The workflow unfolds as follows:

1. A cloud engineer or the designated cost owner reviews the daily recommendations.
2. A Jira ticket is created for implementing each recommendation and is assigned to the respective owner within the engineering team.
3. The engineering team reviews and works on implementing the recommendations. Once a recommendation is successfully implemented, the Jira status can be updated, marking the recommendation as applied in CCM.

For more information on Jira workflow, go to [View and apply recommendations](docs/cloud-cost-management/4-use-ccm-cost-optimization/1-ccm-recommendations/1-home-recommendations.md).

### Step 3. AutoStopping

Cloud resources utilized for non-production setups, like QA and UAT, often remain idle for extended periods. AutoStopping efficiently addresses this by intelligently stopping these resources when not in use and automatically restarting them when needed. This feature helps minimize idle costs associated with maintaining these environments.

AutoStopping employs a detection mechanism that listens for signals, including network traffic, to identify activity. This ensures a responsive and adaptive approach to resource management.

Furthermore, AutoStopping is versatile and can seamlessly integrate with a variety of workloads like:

- EC2 VMs, ASG
- Kubernetes workloads (Deployments, Statefulset)
- ECS workloads
- RDS databases
- Azure VMs
- GCP VMs

All the supported configurations for AutoStopping is available at the [What's supported](https://developer.harness.io/docs/cloud-cost-management/whats-supported) page.

For more information on AutoStopping, go to [AutoStopping](docs/cloud-cost-management/4-use-ccm-cost-optimization/1-optimize-cloud-costs-with-intelligent-cloud-auto-stopping-rules/4-create-auto-stopping-rules/review-autostopping-rules-reqs.md).

#### Sample application

AutoStopping is configured individually for each application. CCM facilitates testing AutoStopping by offering a sample HTTP application that can be installed into the cloud account. This allows users to assess and validate the functionality of AutoStopping in a practical setting.

For more information on AutoStopping sample app, go to [Sample app](docs/cloud-cost-management/4-use-ccm-cost-optimization/autostopping-guides/kubernetes-autostopping-quick-start-guide.md).

#### Rollout AutoStopping rules for all non-prod accounts

After successfully testing AutoStopping with the sample application in a practical setting, the next step is to implement AutoStopping across all non-production accounts. If a central team manages the cloud resources, they should oversee the deployment of AutoStopping. However, if different teams control various cloud resources, each team should take responsibility for integrating their resources with AutoStopping.

AutoStopping is well-supported by APIs and Terraform, which simplifies the creation of rules at scale. Once AutoStopping is operational, its configuration can be converted into API calls or Terraform scripts. These can then be uniformly applied to other cloud resources.

For more information see [API docs](https://apidocs.harness.io/tag/Cloud-Cost-AutoStopping-Rules-V2) / [Terraform provider](https://registry.terraform.io/providers/harness/harness/latest/docs).

## Phase 4: Cost governance

### Step 1. Setup budgets

Harness CCM Budgets enable you to create custom budgets and receive notifications if your spending exceeds or is projected to exceed these budgets. These budgets are adaptable, constructed from [Perspectives](#step-1-explore-cost-using-perspectives), and can encompass data across various cloud providers. You can opt for a dynamic budget that incorporates a growth rate or set your budget based on the previous period's spending. CCM also provides alerts for any budget overruns, assisting you in managing your cloud expenditures effectively.

For more information on budgets, go to [Budgets](https://developer.harness.io/docs/category/budgets).

### Step 2. Asset governance

Asset governance helps you manage your cloud resources by allowing you to filter and tag them, and then apply specific actions. It uses YAML syntax to define rules, facilitating a well-managed, secure, and cost-optimized cloud infrastructure. This process is built on the well-known open-source platform, [Cloud Custodian](https://cloudcustodian.io/).

Asset governance provides a straightforward approach to optimizing your cloud spending.

#### Enable Asset governance for cloud connectors

Asset governance is compatible with AWS, Azure, and GCP. To implement it, you must create connectors for each AWS account, Azure subscription, or GCP project, in addition to the master billing connector. You can edit existing connectors to activate asset governance. Additionally, adding the "GOVERNANCE" tag to the connector's YAML configuration (found under Account Settings -> Account Resources -> Connectors) will enable this feature.

```yaml
connector:
  name: connector name
  identifier: id
  accountIdentifier: harness account id
  type: CEAws
  spec:
    ....
    featuresEnabled:
      - VISIBILITY
      - OPTIMIZATION
      - GOVERNANCE        -> Add this tag
```

#### Asset governance recommendations

Once the connector permissions are updated, asset governance generates recommendations. These are produced daily for a select group of resources supported by Cloud Custodian. Once created, these recommendations become available alongside other suggestions. After reviewing a recommendation, you can apply it directly from the asset governance user interface. Additionally, you can set up enforcement to apply the recommendation on a regular basis.

For more information on Asset governance, go to [Asset governance](docs/cloud-cost-management/5-use-ccm-cost-governance/asset-governance/3-gov-overview.md).

## Phase 5: Automation

The entire CCM feature setup can be automated to seamlessly integrate into an organization's automation processes. This automation includes creating cloud connectors as new cloud accounts are provisioned, automatically establishing asset governance rules to manage cloud accounts, setting up AutoStopping rules for new cloud resources, and other use cases.

CCM supports this level of automation through the use of CCM APIs and a Terraform provider.

### Step 1. CCM APIs

The CCM API documentation is accessible at [Harness API docs](https://apidocs.harness.io/). To utilize the CCM APIs, you can use either a service account or a personal access token. It is advisable for the service account to have CCM admin permissions to enable the execution of all CCM-related actions.

For more information on service accounts and API keys, go to [Service accounts](docs/platform/role-based-access-control/add-and-manage-service-account.md).

### Step 2. Terraform provider

CCM resources can also be created using Harness Terraform provider. Terraform provider supports creation of connectors and AutoStopping rules.

1. [Create connectors using Terraform](https://registry.terraform.io/providers/harness/harness/latest/docs/resources/platform_connector_aws)
2. [Create AutoStopping rules using Terraform](https://registry.terraform.io/providers/harness/harness/latest/docs/resources/autostopping_rule_vm)

:::info 
For a complete list of Harness platform IP addresses that need to be permitted, please refer to the [central IP whitelisting list](https://developer.harness.io/docs/platform/references/allowlist-harness-domains-and-ips/#harness-platform-ips).
:::

