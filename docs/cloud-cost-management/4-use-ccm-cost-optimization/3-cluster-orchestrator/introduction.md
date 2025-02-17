---
title: Introduction to Cluster Orchestrator for AWS EKS clusters (Beta)
description: This topic introduces Cluster Orchestrator
# sidebar_position: 2
helpdocs_topic_id: 
helpdocs_category_id: 
helpdocs_is_private: false
helpdocs_is_published: true
---

:::note

Currently, this early access feature is behind a feature flag . Contact [Harness Support](mailto:support@harness.io) to enable the feature.

:::
<DocImage path={require('./static/CO.png')} width="90%" height="90%" title="Click to view full size image" />

Harness’ Cloud Cost Management is centered on three key pillars: Cost Visibility, Cost Optimization and Cost Governance.
Currently AutoStopping, Recommendations and Commitment Orchestrator (in beta) are present under cost optimisation. Harness CCM has now added Cluster Orchestrator for EKS (Beta) to enhance workload-driven autoscaling and intelligent management of AWS Spot instances, contributing to overall cost efficiency.

## AWS Spot Instances and challenges 
Amazon EC2 provides a range of purchase options catering to diverse computing needs, including On-Demand Instances, Reserved Instances, and Spot Instances. While On-Demand Instances offer flexibility with pay-as-you-go pricing, Reserved Instances provide significant cost savings with long-term commitments. Spot Instances, on the other hand, allow users to bid for unused EC2 capacity at lower prices, making them ideal for fault-tolerant, flexible and stateless workloads. However, Spot Instances come with challenges such as potential interruptions and the risk of termination within just 2 minutes of a notice if capacity becomes unavailable.

<DocImage path={require('./static/AWS_pricing.png')} width="70%" height="70%" title="Click to view full size image" />

## Cluster Infrastructure and challenges  

<DocImage path={require('./static/challenges.png')} width="50%" height="50%" title="Click to view full size image" />

#### Balancing Workload Requirements
Because workload demands are always evolving, matching these demands with cloud infrastructure can be challenging. Specifically, autoscaling cluster nodes to meet workload needs presents difficulties because workload requirements change over time.

#### Cluster Visibility
Gaining comprehensive visibility into cluster costs across pods and nodes is challenging due to diverse consumption patterns across teams and cost centers. Allocating these costs for chargeback or showback purposes adds another layer of complexity, especially in shared cloud environments spanning multiple teams and departments. 

#### Cluster Optimization
Efficient cluster optimization requires close monitoring of workload and node utilization over time to right-size configurations. However, achieving this is difficult due to the persistent problem of overprovisioning workloads and nodes. Choosing between On-Demand instances, commitment-covered instances (RI/SP), and Amazon EC2 Spot instances further makes it difficult.

#### Pod Autoscaling
Kubernetes offers pod autoscaling capabilities, including horizontal pod autoscaling (HPA) and vertical pod autoscaling (VPA). HPA adjusts pod counts based on workload demand fluctuations, while VPA dynamically adjusts pod resource allocations. However, seamlessly matching these changes with appropriate nodes presents complexities. Incorrect node selection may result in pending pods due to insufficient resources or scaling down the wrong nodes, leading to potential disruptions in workload deployment.

## Harness Cluster Orchestrator for Amazon Elastic Kubernetes Service (EKS)

The Harness Cluster Orchestrator for Amazon Elastic Kubernetes Service (EKS), a component of the Harness Cloud Cost Management (CCM) module, is designed to tackle the obstacles listed above. It intelligently scales EKS cluster nodes according to actual workload requirements. Additionally, by leveraging CCM’s distributed Spot orchestration capability, you can save up to 90% on cloud costs with Amazon EC2 Spot Instances.

It also facilitates workload-driven autoscaling, dynamically adjusting cluster resources to match workload demands while optimizing the utilization of AWS Spot instances. This approach ensures efficient resource allocation and cost-effective cluster management. Harness’  Cluster Orchestrator for Amazon EKS distinguishes itself from other solutions in the market because of additional features like distributed spot orchestration.

Harness is a part of [AWS Service Ready Program](https://aws.amazon.com/blogs/apn/optimize-cost-and-performance-with-amazon-ec2-spot-ready-partners/) for Amazon EC2 Spot instances. This recognition acknowledges that Harness CCM with Cluster Orchestrator adheres to industry best practices and provides robust API support for effectively managing Amazon EC2 Spot instances in customers' cloud environments. Being part of the Amazon EC2 Spot Service Ready Program distinguishes Harness as an esteemed member of the AWS Partner Network (APN) with a solution that seamlessly integrates with Amazon EC2 Spot instances. This ensures that our product is widely accessible and fully supports AWS customers, enabling them to leverage the cost-saving benefits of Amazon EC2 Spot instances for their workloads. In the upcoming time, not only AWS but other cloud providers will be supported too. 

### Cluster Orchestrator Roadmap 


| Currently available in Beta | Upcoming in GA |
|-----------------------------|----------------|
| Cluster node auto scaling & right-sizing | Cluster schedules |
| Spot interruption handling | Bin-packing |
| Distributed spot orchestration | Cluster preferences |
| | Integration with Commitment Orchestration feature of Harness |


