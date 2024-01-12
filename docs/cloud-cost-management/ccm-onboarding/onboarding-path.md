---
title: CCM onboarding guide
description: Ramp up on Harness CCM
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This topic describes the different phases and steps involved in onboarding with Harness CCM. Follow these steps to ensure that you have all the settings and resources required for moving forward with your CCM setup.

## Overview

This section lists the major onboarding phases and provides links to more details.

:::note

Steps with an asterisk **"\*"** have YAML examples that can be used for setting up the step.

:::

### <a href="#phase-1"> Phase 1: Initial setup</a>

| **Step**                                                          | **Details**                                                                | **Demo video** |
| ----------------------------------------------------------------- | -------------------------------------------------------------------------- | -------------- |
| <a href="#step-1-setup-cost-visibility">Setup cost visibility</a> | Create cloud connectors and kubernetes connectors for cost data visibility |                |
| <a href="#step-2-configure-rbac">Configure RBAC</a>               | Configure access control to restrict access                                |                |
| <a href="#step-3-configure-sso">Configure SSO</a>                 | SAML SSO with Harness, Okta, OneLogin, Keycloak, etc                       |                |

### <a href="#phase-2"> Phase 2: Cost reporting</a>

| **Step**                                                                              | **Details**                                                               | **Demo video** |
| ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- | -------------- |
| <a href="#step-1-explore-cost-using-perspectives">Explore cost using perspectives</a> | A perspective can be used to visualize data from multiple cloud providers |                |
| <a href="#step-2-explore-cost-using-dashboards">Explore cost using dashboards</a>     | Explore cost data using powerful BI dashboard                             |                |
| <a href="#step-3-performing-root-cost-analysis">Root cost analysis</a>                | Understand detailed breakdown of cloud spend                              |                |
| <a href="#step-4-cost-anomalies">Cost anomalies</a>                                   | Protect from anomalous spend                                              |                |

### <a href="#phase-3"> Phase 3: Cost optimization</a>

| **Step**                                                                      | **Details**                                                                                              | **Demo video** |
| ----------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- | -------------- |
| <a href="#phase3-step-1">Recommendations</a>                                  | Explore right sizing recommendations for node pools and other resource types                             |                |
| <a href="#phase3-step-2">AutoStopping - Stop resources when they are idle</a> | Create AutoStopping rules to stop resources (VMs, k8s workloads, ECS tasks etc) when they are not in use |                |

### <a href="#phase-4"> Phase 4: Cost governance</a>

| **Step**                                      | **Details**                                                                                                                          | **Demo video** |
| --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | -------------- |
| <a href="#phase4-step-1">Setup budgets</a>    | Setting up a cloud budget is crucial to control costs, prevent overspending, and maintain financial transparency in cloud operations |                |
| <a href="#phase4-step-2">Asset governance</a> | Powerful governance based on cloud custodian policies                                                                                |                |


### <a href="#phase-5"> Phase 5: Automation</a>

| **Step**                                        | **Details**                                 | **Demo video** |
| ----------------------------------------------- | ------------------------------------------- | -------------- |
| <a href="#phase5-step-1">Terraform provider</a> | Manage CCM entities using Terraform         |                |
| <a href="#phase5-step-2">CCM APIs</a>           | Integrate with CCM APIs to extend the usage |                |


## Phase 1: Initial setup

### Step 1. Setup cost visibility

First step in setting up Harness CCM is to create the cloud connector for respective cloud providers. A cloud connector is the configuration details which Harness uses to access the cloud provider APIs. At first, CCM will have the readonly permissions to access the cost data from the cloud providers.

Connector setup varies based on the cloud provider.

- [Setup cost visibiltiy for AWS](docs/cloud-cost-management/get-started/onboarding-guide/set-up-cost-visibility-for-aws.md)
- [Setup cost visibiltiy for Azure](docs/cloud-cost-management/get-started/onboarding-guide/set-up-cost-visibility-for-azure.md)
- [Setup cost visibiltiy for GCP](docs/cloud-cost-management/get-started/onboarding-guide/set-up-cost-visibility-for-gcp.md)
- [Setup cost visibiltiy for Kubernetes](docs/cloud-cost-management/get-started/onboarding-guide/set-up-cost-visibility-for-kubernetes.md)

After the connectors are created, it will take atleast 24hrs for the cost data to be visible in CCM.

### Step 2. Configure RBAC

CCM provides various set of RBAC permissions to control access to various entities. For more information go to [CCM Roles and Permissions](docs/cloud-cost-management/access-control/ccm-roles-and-permissions.md).

### Step 3. Configure SSO

Harness supports Single Sign-On (SSO) with SAML, integrating with your SAML SSO provider to enable you to log your users into Harness as part of your SSO infrastructure. The user can choose between a variety of SSO integrations according to their needs.

For more information, go to [Authentication](docs/platform/authentication/authentication-overview.md).

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


