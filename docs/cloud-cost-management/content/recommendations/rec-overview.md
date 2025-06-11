import Tabs from '@theme/Tabs';

import TabItem from '@theme/TabItem';


:::note
After you enable CCM, it may take up to 48 hours for the recommendations to appear in Cloud Costs. It depends on the time at which CCM receives the utilization data for the service. In **Cloud Costs**, go to the **Recommendations** page.
:::

<!-- ## Before you begin
To know how these recommendations are computed, see the following topics:
* [Optimize AWS ECS Costs with Recommendations](../1-ccm-recommendations/ecs-recommendations.md)
* [Optimize Kubernetes Costs with Node Pool Recommendations](../1-ccm-recommendations/node-pool-recommendations.md)
* [Optimize Kubernetes Costs with Workload Recommendations](../1-ccm-recommendations/workload-recommendations.md) -->

Harness CCM currently supports these types of recommendations:
- Azure VM
- AWS EC2 instances
- AWS ECS services
- Nodepool
- Workload
- Governance

:::tip [Latest Features Released in 1.47.0](/release-notes/cloud-cost-management#april-2025---version-1470)
<Tabs>
  <TabItem value="Improved Recommendation Tracking" label="Improved Recommendation Tracking">Users can now specify estimated savings when marking a recommendation as applied. Upon marking a recommendation as applied, users can now confirm whether the estimated savings matched the actual savings or enter the actual amount saved if different from the estimate. Additionally, after a recommendation has been applied, this savings data from the Applied Recommendations section can be edited. </TabItem>
  <TabItem value="Cost Categories Integration" label="Cost Categories Integration">The Filter panel in the Recommendations view now includes the option to **filter by Cost Categories**. This update is especially valuable for large-scale organizations that manage thousands of recommendations and require structured views to take meaningful action. </TabItem>
  <TabItem value="Recommendations Filter Revamp" label="Recommendations Filter Revamp">The Filter panel in the Recommendations view has been updated to provide a more streamlined experience.  </TabItem>
</Tabs>
:::

## View Recommendations

To view recommendations, click on the **Recommendations** tab in the navigation bar, which will take you to the homepage. On the Recommendations page, there are two tabs: Open Recommendations and Applied Recommendations. The Open Recommendations tab displays all available recommendations that have yet to be applied, while the Applied Recommendations tab shows the recommendations that have already been implemented.