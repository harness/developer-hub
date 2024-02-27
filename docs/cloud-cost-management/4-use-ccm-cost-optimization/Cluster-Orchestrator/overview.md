---
title: Commitment Orchestrator
description: This topic describes Commitment Orchestrator and its working.
# sidebar_position: 2
helpdocs_topic_id: 
helpdocs_category_id: 
helpdocs_is_private: false
helpdocs_is_published: true
---

**1. Why Cluster Orchestrator? How does it work?**

Cluster Orchestrator is a sophisticated feature within Harness CCM that empowers users to efficiently manage their AWS EKS clusters while optimizing costs and ensuring robust performance. Here's an in-depth look at why Cluster Orchestrator is a game-changer for EKS cluster management:

**Cost Optimization:** One of the primary advantages of Cluster Orchestrator is its ability to maximize cost savings by leveraging AWS spot instances. These instances typically come at a fraction of the cost (ranging from 70% to 90% cheaper) compared to on-demand instances. By intelligently managing spot instances and seamlessly handling interruptions, Cluster Orchestrator enables users to significantly reduce their compute expenses without compromising performance or availability.

**High Availability and Fault Tolerance:** Cluster Orchestrator ensures that users can maintain fault-tolerant and highly available setups for their EKS clusters. With built-in mechanisms to handle spot instance interruptions, the feature seamlessly transitions workloads to on-demand instances when spot capacity is unavailable. This ensures uninterrupted operation and minimizes the risk of downtime for critical applications and services.

**Automated Spot Instance Management:** One of the standout features of Cluster Orchestrator is its automation capabilities for spot instance management. From provisioning and scaling to handling interruptions and fallbacks, Cluster Orchestrator automates the entire lifecycle of spot instances. By dynamically adjusting node capacity based on workload demands, the feature optimizes resource utilization and ensures efficient allocation of compute resources.

**Granular Visibility and Control:** Cluster Orchestrator provides users with granular visibility into their EKS cluster resources, offering insights into CPU usage, memory consumption, and compute spend. This level of visibility enables users to make informed decisions, optimize resource allocation, and track cost savings effectively. With comprehensive monitoring and reporting capabilities, users can gain deeper insights into their cluster's performance and resource utilization.

**Seamless Integration:** Cluster Orchestrator seamlessly integrates with other features within Harness CCM, including Commitment Orchestrator and AutoStopping. This integration enables users to leverage a holistic approach to resource management, optimizing cost savings and maximizing operational efficiency across their AWS infrastructure.

**2. Setting up Cluster Orchestrator for AWS EKS clusters**

Configuring Cluster Orchestrator for your AWS EKS clusters is a straightforward process designed to simplify cluster management and optimize resource utilization. Here's a step-by-step guide to setting up Cluster Orchestrator:

**Step 1: Enable Cluster Orchestrator**

- Log in to your Harness CCM dashboard and navigate to the settings or configuration section.

- Locate the option to enable Cluster Orchestrator and follow the on-screen instructions to activate the feature for your AWS EKS clusters.

**Step 2: Configure Spot Instance Settings**

- Once Cluster Orchestrator is enabled, configure spot instance settings to specify which workloads should run on spot instances.

- Define the percentage of workloads that are spot-ready and specify the workloads to be deployed on spot instances.

**Step 3: Define Cluster Preferences**

- Customize cluster preferences, including buffer settings, node deletion delay, and node selection criteria based on instance families or constraints.

**Step 4: Configure Scheduling and AutoStopping**

- Choose between full cluster scheduling or workload-level scheduling for AutoStopping.

- Configure AutoStopping rules to dynamically turn off idle non-production resources and optimize cost savings.

**Step 5: Review and Save Settings**

- Review your Cluster Orchestrator settings to ensure they align with your requirements and preferences.

- Save your settings to apply Cluster Orchestrator configurations to your AWS EKS clusters and start optimizing resource utilization and cost savings.

**3. FAQs**

**Q: Can I run both spot and on-demand instances within the same cluster using Cluster Orchestrator?**

A: Yes, Cluster Orchestrator supports running a combination of spot and on-demand instances within the same cluster. Users can define preferences and settings to determine which workloads should run on spot instances and which should run on on-demand instances.

**Q: How does Cluster Orchestrator handle spot instance interruptions?**

A: Cluster Orchestrator automatically handles spot instance interruptions by seamlessly transitioning affected workloads to on-demand instances when spot capacity is unavailable. This ensures continuous availability and reliability of workloads running on spot instances.

**Q: Can I monitor cost savings and resource utilization with Cluster Orchestrator?**

A: Absolutely, Cluster Orchestrator provides granular visibility into EKS cluster resources, including CPU, memory, and compute spend. Users can track cost savings, monitor resource utilization, and make data-driven decisions to optimize cluster performance and efficiency.

**Q: Is Cluster Orchestrator compatible with other Harness CCM features?**

A: Yes, Cluster Orchestrator integrates seamlessly with other Harness CCM features such as Commitment Orchestrator and AutoStopping. Users can leverage these features in conjunction with Cluster Orchestrator to further optimize resource usage and maximize cost savings.

**Q: Can I customize node selection criteria and instance families with Cluster Orchestrator?**

A: Absolutely, Cluster Orchestrator allows users to customize node selection criteria based on instance families and constraints. Users can specify preferred instance types and define criteria for node provisioning, ensuring optimal resource allocation and performance.