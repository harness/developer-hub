---
title: CCM onboarding path
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

### <a href="#phase-1-initial-setup"> Phase 1: Initial setup</a>

First step in setting up Harness CCM is to create the cloud connector for respective cloud providers. A cloud connector is the configuration details which Harness uses to access the cloud provider APIs. At first, CCM will have the readonly permissions to access the cost data from the cloud providers.

Connector setup varies based on the cloud provider.

- [Connector creation for AWS](docs/cloud-cost-management/get-started/onboarding-guide/set-up-cost-visibility-for-aws)
- [Connector creation for Azure](docs/cloud-cost-management/get-started/onboarding-guide/set-up-cost-visibility-for-azure)
- [Connector creation for GCP](docs/cloud-cost-management/get-started/onboarding-guide/set-up-cost-visibility-for-gcp)
- [Connector creation for Kubernetes](docs/cloud-cost-management/get-started/onboarding-guide/set-up-cost-visibility-for-kubernetes)

After the connectors are created, it will take atleast 24hrs for the cost data to be visible in CCM.

### <a href="#phase-2-deploy-to-qa"> Phase 2: Cost reporting </a>

#### Explore cost using perspectives

A perspective can be used to visualize data from multiple cloud providers. 

CCM generates default perspectives based on cloud connectors, allowing users to explore cost data for each cloud provider. These default perspectives offer a solid foundation for understanding the concept of perspectives. Additionally, when Kubernetes connectors are available, CCM generates a `Cluster`` perspective. This cluster perspective displays cost data for all clusters such as k8s, ECS, and more.

For more information, go to [Create perspectives](docs/cloud-cost-management/3-use-ccm-cost-reporting/1-ccm-perspectives/1-create-cost-perspectives.md)


#### Explore cost using dashboards

CCM leverages comprehensive BI dashboards, offering powerful capabilities. While both perspectives and dashboards enable exploration of cost data similarly, dashboards leverage a complete Business Intelligence platform for advanced scenarios. CCM utilizes Google's Looker to empower its dashboards, enabling diverse data visualizations and report creation.

Furthermore, dashboards facilitate common use cases such as scheduled report delivery, alerting, and customization of metrics and measures. CCM comes equipped with pre-built, commonly used dashboards for easier initial setup and utilization.

For more information, go to [Create Dashboards](docs/cloud-cost-management/3-use-ccm-cost-reporting/6-use-ccm-dashboards/access-ccm-dashboards.md)


#### Performing root cost analysis


In the realm of cloud computing, root cost analysis takes on a crucial role in understanding and optimizing the expenses associated with utilizing cloud services. Cloud computing offers scalability, flexibility, and cost-effectiveness, but without proper management, it can lead to unexpected expenses. Root cost analysis in this context involves dissecting the various components contributing to the overall cloud expenditure, including compute, storage, network usage, data transfer, and additional services like databases or specialized tools.

By conducting root cost analysis in cloud computing, businesses can gain insights into the primary drivers behind their cloud expenses. This involves scrutinizing usage patterns, understanding the costs associated with different types of services or instances, and identifying inefficiencies or unnecessary spending. With this detailed understanding, organizations can implement cost optimization strategies, such as rightsizing instances, utilizing long term commitments like reserved instances or spot instances and leveraging [AutoStopping](docs/cloud-cost-management/4-use-ccm-cost-optimization/1-optimize-cloud-costs-with-intelligent-cloud-auto-stopping-rules/1-auto-stopping-rules.md) to align resources with actual demand. This approach enables businesses to make informed decisions about resource allocation, effectively manage their cloud budgets, and ensure cost efficiency while leveraging the benefits of cloud technology.

For more information, go to [Root cost analysis](docs/cloud-cost-management/3-use-ccm-cost-reporting/3-root-cost-analysis/perform-root-cost-analysis.md)


#### Cost anomalies

Detecting strange spending patterns in cloud computing is really important. It helps save money by spotting where resources are wasted and stops budgets from being used up unexpectedly. It also helps prevent security problems by catching unusual activities early, like someone getting into an account they shouldn't. Finding these odd spending habits also helps make sure everything runs smoothly, avoids wasting resources, and lets companies follow the rules about data security and money management. Overall, keeping an eye on weird spending in the cloud is key for saving money, staying secure, and running things efficiently.

For more information, go to [Cost anomalies](docs/first-gen/cloud-cost-management/ccm-anomaly-detection/detect-cost-anomalies-with-ce.md)


