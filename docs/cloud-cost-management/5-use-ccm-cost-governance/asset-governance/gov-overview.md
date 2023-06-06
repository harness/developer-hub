---
title: Summary of your asset governance rules  
sidebar_label: Asset governance summary 
description: This topic talks about Harness cloud asset governance.
# sidebar_position: 2
---

The **Overview** page offers a consolidated summary of your organization's governance rules, enforcements, and cost savings resulting from rule executions. This provides a quick and easy way to monitor your cloud spend and ensure compliance with your governance policies. Additionally, you can access valuable recommendations for optimizing resource utilization, allowing you to achieve even greater cost savings. 

  <docimage path={require('./static/gov-overview.png')} width="50%" height="50%" title="Click to view full size image" />

  - **All time realized savings** — The total cost savings achieved from the day you began utilizing CCM Asset Governance up to the present date.
  
    You can view a visual representation of your savings trends through the **Savings Trend** graph, which allows you to hover over individual data points to view the corresponding cost savings for a specific day. <!---This feature provides you with a granular level of insight into your cloud spend, enabling you to identify any trends or anomalies and make informed decisions to optimize your resource utilization and maximize cost savings.-->

  - **Total rules** — The total count of rules created up to the current date.
  - **Total enforcements** — The total number of enforcements created up to the current date. Enforcements ensure continuous cost savings.
  - **Total evaluations** — The total number of evaluations performed to date. The pie chart on this page provides a breakdown of the number of evaluations performed for different resource types. This visualization helps you quickly identify which resource types are being evaluated more frequently.
  - **Resource breakdown** — The count of evaluations categorized by different resource types.

:::important
In certain cases, there can be overlapping rules targeting the same resource. For example, If you have two rules such as `ec2-old instance-stop` and `ec2-underutilized-list` both applicable to the same EC2 instance, the cost savings are calculated independently for each rule execution.
:::

  Recommendations to optimize utilization of your AWS resources:
  - **Asset Optimization Recommendations** — Displays the top five recommendations to reduce costs. To view the complete list, click **View all Recommendations**.
  - **Potential Monthly Savings** — Monthly cost savings that can be realized if the recommendations are applied.
  - **Breakdown by resource type** — The cumulative count of evaluations for each resource type.
  
To apply a recommendation, select the row. The recommendation opens on the **Recommendations** page. To learn how to enforce this recommendation, go to [Governance recommendations](../../4-use-ccm-cost-optimization/1-ccm-recommendations/governance.md).

Make use of Harness AI Copilot to create a new rule. Select the **Create a new rule with Copilot** option. A new rule opens on the Rule Editor with an auto-generated name. For more information, go to [Generative AI overview](gen-ai-overview.md).

<!---## How are the cost savings calculated?

Cost savings are calculated for the last 30 days. However, for rightsizing rules, it depends on the resize percentage specified in the policy. For example, let's consider the following rule to resize an RDS instance. The potential or realized cost savings is 30% of the last 30 days cost.

```
policies:
  - name: rds-resize-down
    resource: rds
    filters:
      - type: metrics
        name: CPUUtilization
        days: 10
        period: 86400
        value: 50
        op: less-than
    actions:
      - type: resize
        percent: -30
        immediate: true
```

For resizing, let's consider a policy for EBS volume migration from gp2 to gp3: 

```
policies:
 - name: migrate-gp2-to-gp3-ebs-volumes
   resource: ebs
   filters:
    - VolumeType: gp2
    - modifyable
   actions:
    - type: modify
      volume-type: gp3
```
Executing this rule can potentially result in cost savings of up to 30%. However, the decision to resize should consider workload requirements and performance needs. Generally, gp3 volumes have a lower price per GB compared to gp2 volumes. It's important to note that there are scenarios where gp2 volumes may still be the preferred option. For instance, if your workload involves numerous small, random I/O operations, gp2 volumes offer better IOPS performance compared to gp3 volumes.

Deleting an EBS snapshot: You might have two policies related to deleting EBS snapshots.

* `delete-snapshot-with-no-volume
`
```
policies:
  - name: delete-snapshot-with-no-volume
    description: Find any snapshots that do not have a corresponding volume.
    resource: aws.ebs-snapshot
    filters:
      - type: volume
        key: VolumeId
        value: absent
    actions:
      - delete
```
* `delete-snapshot-unused`
```
policies:
  - name: delete-snapshot-unused
    resource: ebs-snapshot
    filters:
      - type: unused
        value: true
    actions:
      - delete
```
An EBS snapshot with no associated volume refers to a snapshot that was created from a volume that no longer exists. It may still incur storage costs if it contains data, but it cannot be used to create a new volume. It is recommended to delete such snapshots as they do not provide any value to your infrastructure.

On the other hand, an unused EBS snapshot refers to a snapshot that is not currently being utilized by any resources, such as an EC2 instance or an AMI. This type of snapshot can still be valuable as it can be used to create a new volume or restore an existing one. However, if an unused snapshot is no longer needed, deleting it can help reduce storage costs.

In summary, an EBS snapshot with no volume is an orphaned resource that cannot be used, while an unused EBS snapshot is a potentially useful resource that is not currently in use.-->



