---
title: Governance recommendations
description: Optimize AWS costs with asset governance recommendations
# sidebar_position: 2
---

# Optimize AWS costs with asset governance recommendations

Harness Cloud Asset Governance provides tools to optimize your cloud spend and avoid unnecessary costs. The asset governance recommendations work by rightsizing resources and decommissioning unused instances. By leveraging these recommendations, you can better control your cloud expenses while ensuring that your cloud infrastructure is optimized for maximum efficiency and cost-effectiveness.

You can view the recommendations for all of your AWS accounts on the recommendations page.

   <docimage path={require('./static/governance.png')} width="50%" height="50%" title="Click to view full size image" />

The following resource types can be utilized optimally by creating governance rules to rightsize the resources:

- EC2 instances

- RDS instances 

- EBS Volumes 

:::note
Before using recommendations in your environment, ensure that you evaluate their impact thoroughly. The person reviewing the recommendations should be able to understand the impacts identified in the recommendations, as well as the impact on the infrastructure and business.

Using recommendations without proper assessment could result in unexpected changes, such as issues with system performance or poor reliability.
:::

## Before you begin

* Connect your AWS cloud account in Harness and set up CCM for cost management. For more information, go to [Set up cost visibility for AWS](../../2-getting-started-ccm/4-set-up-cloud-cost-management/set-up-cost-visibility-for-aws.md).
* To obtain governance recommendations, configure a Harness AWS CCM connector with the **Cloud Governance** feature enabled.
* Make sure that you have added the required permissions in your AWS account. Go to [AWS access permissions for Cloud asset governance](../../2-getting-started-ccm/4-set-up-cloud-cost-management/set-up-cost-visibility-for-aws.md#cloud-asset-governance-rules).
* To add missing permissions, go to [Add permissions](../../2-getting-started-ccm/4-set-up-cloud-cost-management/set-up-cost-visibility-for-aws.md#add-permissions).


## Types of governance recommendations

Harness CCM provides two types of recommendations to optimize utilization of your AWS resources:

* **Instance resizing**: In this type of recommendation, CCM recommends resizing your instances that are over-provisioned or underutilized. For information about the different instance families in AWS, go to [Available instance types](https://docs.aws.amazon.com/AWSEC2/latest/WindowsGuide/instance-types.html#AvailableInstanceTypes). 

* **Decommissioning**: In this type of recommendation, the instance is terminated or decommissioned if not in use for a long time. For example, for EBS service, the recommendations are computed based on the following criteria:

  - Identify the EBS volumes that are orphaned
  - Identify the EBS volumes which are not in use or low utilization
  - Save costs by migrating to latest EBS volume type 
  - Delete orphaned snapshots over post deletion of the volume
 
## View your cost governance recommendations

1. In **Harness**, go to the **Cloud Costs** module.
2. Click **Recommendations**.
3. Click the filter icon.
4. In the **Recommendation Type** dropdown list, select **Governance**.
5. Click **Apply**. 

  All the governance recommendations are displayed.   

## Apply a recommendation

1. On the **Recommendations** page, select the recommendation row that you want to enforce. The following page appears.

    <docimage path={require('./static/enforce-governance-recom.png')} width="50%" height="50%" title="Click to view full size image" />

    * **Potential Monthly Savings** — Monthly cost savings that can be realized if the recommendations are applied.
    * **Total Accounts** — The total number of AWS accounts on which the rules can be enforced.
    * **Total Resources** — The total number of resources that would be impacted.
2. Select the AWS account to which you want to apply the recommendation.
3. Select Enforce.
4. Enter a name for the Rule enforcement.
5. The rules are pre-selected.
6. Select **Continue**.
7. Set the frequency from **Hourly**, **Daily**, or **Weekly** options. In case you select Daily or Weekly, specify the day, time, and time zone to run the rule on schedule.
8. Toggle the **Dry Run** mode if you do not want to take action immediately.
9. Click **Finish**. 
   
If you wish to modify any of these Out-of-the-box rules, select **Open in Rule Editor**.
  The rule is cloned and opened in a new tab.
