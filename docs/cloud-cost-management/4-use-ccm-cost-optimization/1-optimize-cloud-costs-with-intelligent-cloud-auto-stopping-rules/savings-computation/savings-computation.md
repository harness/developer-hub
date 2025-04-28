---
title: Savings Computation for AutoStopping
description: This topic describes how savings are computed for AutoStopping feature of Harness CCM
# sidebar_position: 2
helpdocs_topic_id: 
helpdocs_category_id: 
helpdocs_is_private: false
helpdocs_is_published: true
---

### AWS AutoStopping Savings Computation

For AWS, the savings are determined by calculating the total cost based on amortized values after deducting total discounts.

`Cost = Amortized Cost - Total Discounts`

### GCP AutoStopping Savings Computation

 There are two types of exports in GCP: **Standard and Detailed**. Ensure the billing export is the detailed billing export. It is important to have a billing-enabled connector set up with detailed billing exports. The billing data will be used to compute savings for GCP instance and instance-group-based rules.

### Azure AutoStopping Savings Computation

Billing data from Azure's amortized billing export will be used to compute savings for Azure VM-based AutoStopping rules. Please ensure the connector has amortized billing export enabled.

### Cluster AutoStopping Savings Computation

Cluster cost data (trued-up or not trued-up) is considered for savings computation. Savings will be computed in terms of tracked pods under cluster cost data only.

### Important points to Remember:

- Savings numbers will become precise only after the savings numbers are finalized after the 15th of the next month (after the final settlement). Savings will be recomputed for the previous month on the 15th of the next month to ensure any updates to CUR/billing-export are considered in the final savings numbers for the month.

- GCP billing export configured in the billing connector needs to be "detailed".

- Azure billing export configured in the billing connector needs to be "amortized".

- For cluster-based AutoStopping rules, the corresponding billing-enabled connector of the CSP should be configured in Harness; otherwise, savings computation will be based on public pricing data.
