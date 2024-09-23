# Maximizing Cost Savings with AWS Spot Instances and Cluster Orchestration

AWS Spot Instances offer an incredible opportunity for businesses to save on cloud costs by providing the same level of performance as On-Demand Instances, often at discounts of up to 90%. However, this cost efficiency comes with a trade-off: Spot Instances offer limited availability guarantee, which can be disrupted by AWS when the capacity is needed for On-Demand users. When a Spot Instance is about to be reclaimed by AWS, they issue a two-minute interruption notice. To effectively manage this challenge and ensure that workloads continue without disruption, a robust orchestration strategy is required. This is where the Cluster Orchestrator’s Spot Instance orchestration plays a key role.

## What Happens When a Spot Instance Is Interrupted?

When AWS sends a two-minute interruption notice, it means the Spot Instance running your workload is about to be terminated. Without proper orchestration, this would result in downtime or data loss. However, with Cluster Orchestrator, this risk is mitigated.

Upon receiving the interruption notice, the Cluster Orchestrator immediately searches for an alternate Spot Instance across availability zones with adequate capacity. It prioritizes finding a new Spot Instance that is less likely to be interrupted in the future, allowing the workload to transition smoothly from one Spot Instance to another. This approach helps ensure that workloads experience minimal downtime, and that cost savings from Spot Instances are continuously maximized.

## Fallback to On-Demand Instances

While the Cluster Orchestrator attempts to find an alternate Spot Instance first, there may be times when AWS does not have any Spot capacity available in the required region. In these cases, to maintain the availability and continuity of your application, the Cluster Orchestrator falls back to On-Demand Instances. On-Demand Instances do not have any interruption risk as Spot Instances, but they come with higher costs.

The transition to On-Demand Instances is automatic and seamless, ensuring that workloads continue to run smoothly, albeit at a higher cost. This fallback mechanism is crucial for workloads that require high availability, as it prevents potential downtime during periods when Spot Instances are unavailable.

 <DocImage path={require('../static/cluster_working.png')} width="90%" height="90%" title="Click to view full size image" />

## The Benefits of Spot Instance Orchestration

This orchestration setup provides several key benefits:
- Maximized Savings: By constantly searching for Spot Instances, the Cluster Orchestrator helps increase the utilization of discounted Spot Instances. This ensures that businesses get the most out of AWS Spot pricing, with automatic fallback to On-Demand only when necessary.

- Increased Availability: In cases where Spot capacity is unavailable, the automatic fallback to On-Demand Instances ensures that applications remain highly available without manual intervention. This is critical for workloads that must maintain uptime and reliability.

- Automation and Flexibility: With the Cluster Orchestrator handling all transitions between Spot and On-Demand Instances, users can focus on other aspects of their infrastructure, knowing that cost optimization is being handled in the background. Additionally, the frequency of capacity checks can be customized based on user preferences, providing more control over the cost versus availability trade-off.

The Spot orchestration support under Cluster Orchestrator offers a powerful strategy for cloud cost management. By orchestrating Spot Instance usage, automating transitions to On-Demand Instances when necessary, and continuously monitoring for new Spot capacity, organizations can achieve significant cost savings while maintaining high availability. This setup helps users stay ahead in managing AWS Spot Instances without manual intervention, ensuring that workloads run efficiently and affordably in the cloud.

