---
title: Kubernetes cost attribution with AWS SCAD
description: Use AWS Split Cost Allocation Data (SCAD) to get billing-accurate per-pod costs for your Amazon EKS clusters in Harness CACM.
sidebar_label: AWS SCAD for Kubernetes
---

## **1\. What is SCAD?**

SCAD stands for Split Cost Allocation Data. It is an AWS-native feature that  
splits the cost of a shared Amazon EC2 instance (used as an Amazon EKS node) across  
the individual Kubernetes pods that ran on it.

Without SCAD, your AWS bill only shows you the cost of the EC2 instance - you  
have to estimate how much of that cost belongs to each pod, namespace, workload,  
team, or environment. SCAD does the split for you, using the actual CPU and memory  
reservations of each pod, and emits the per-pod cost as additional columns in your  
AWS Cost and Usage Report (CUR):

| CUR column                                   | Meaning                                                                                                                     |
| -------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| line_item_resource_id                        | ARN of the form arn:aws:eks:&lt;region&gt;:&lt;account&gt;:pod/&lt;cluster&gt;/&lt;namespace&gt;/&lt;pod&gt;/&lt;podUid&gt; |
| ---                                          | ---                                                                                                                         |
| line_item_parent_resource_id                 | EC2 instance ID of the node the pod ran on                                                                                  |
| ---                                          | ---                                                                                                                         |
| split_line_item_split_cost                   | The pod's share of the node's [amortised cost](https://docs.aws.amazon.com/cur/latest/userguide/split-line-item-columns.html), including amortised Reserved Instance and Savings Plans usage |
| ---                                          | ---                                                                                                                         |
| split_line_item_unused_cost                  | The unallocated/idle portion of the node attributed to this pod (per AWS's allocation strategy)                             |
| ---                                          | ---                                                                                                                         |
| split_line_item_public_on_demand_split_cost  | The same split, but at public on-demand pricing (before discounts)                                                          |
| ---                                          | ---                                                                                                                         |
| split_line_item_public_on_demand_unused_cost | Unused portion at public on-demand pricing                                                                                  |
| ---                                          | ---                                                                                                                         |

Because SCAD is computed by AWS from the same data that produces your invoice, the sum of per-pod SCAD costs reconciles to your actual AWS bill. This is what we mean  
by "billing-accurate".

## **2\. How Harness Uses SCAD**

When SCAD is enabled, Harness attributes EKS pod costs using the authoritative  
per-pod split that AWS publishes in the CUR. The Harness Delegate supplies the  
cluster utilization and pod metadata, and SCAD provides the cost.

The setup is simple. Once you create a Kubernetes connector by installing the  
Harness Delegate on your EKS cluster, Harness pulls the cluster's utilization data.  
The corresponding cluster is detected automatically, and per-pod cost attribution  
starts happening through SCAD data, no extra configuration required.

Prerequisites:

- SCAD is enabled in AWS for the account that publishes your CUR.
- The SCAD feature flag is enabled for your account on the Harness side.

## **3\. Cost Data Source and Latency**

When SCAD is enabled, Harness uses SCAD as the only source for EKS pod cost  
attribution. Harness does not estimate pod costs using public on-demand pricing or  
any other pricing model. If SCAD data is not yet present for a given day, no pod  
cost is shown for that day.

AWS does not publish SCAD data in real time. The CUR is refreshed multiple times a  
day, but split-cost data for a given day is typically finalized 2-3 days later.  
Until SCAD data lands, pod-level costs for that day do not appear.

- Source: AWS CUR with columns populated by SCAD.
- Cost model: AWS's authoritative split, with Reserved Instances, Savings Plans,  
   Spot pricing, EDP/PPA discounts, and credits already applied.
- Latency: Typically 2-3 days after the usage day, depending on when AWS finalizes  
   the CUR for that day.
- Purpose: Invoice reconciliation, chargeback/showback, audited reports, budgets,  
   long-term trends.

Once SCAD data lands for a given day, Harness populates the billing-accurate  
numbers across all CACM surfaces: Perspectives, Cost Categories, Recommendations,  
Anomaly Detection, Budgets, and the BI Dashboards.

## **4\. What Cost Changes to Expect**

When SCAD is first turned on, you will almost certainly see your per-pod,  
per-namespace, and per-workload costs move. The total cluster cost  
will be unchanged or very close, what changes is how that total is attributed.

Expect the following directional changes:

| Area                                                         | Typical change           | Why                                                                                                                   |
| ------------------------------------------------------------ | ------------------------ | --------------------------------------------------------------------------------------------------------------------- |
| Total EKS cluster spend                                      | ≈ unchanged              | Same EC2 bill, just split differently                                                                                 |
| ---                                                          | ---                      | ---                                                                                                                   |
| Discounted workloads (covered by RIs / Savings Plans / Spot) | Lower                    | SCAD uses your effective rate, not on-demand list price                                                               |
| ---                                                          | ---                      | ---                                                                                                                   |
| Idle / unallocated cluster cost                              | More visible             | SCAD reports an explicit unused_cost per pod for the unallocated portion of the node                                  |
| ---                                                          | ---                      | ---                                                                                                                   |
| Memory-heavy pods                                            | Often higher share       | SCAD splits by both CPU and memory                                                                                     |
| ---                                                          | ---                      | ---                                                                                                                   |
| Very short-lived pods (Jobs, CronJobs)                       | New cost rows may appear | SCAD captures pods the Delegate may have missed                                                                       |
| ---                                                          | ---                      | ---                                                                                                                   |
| Spot-backed workloads                                        | Significantly lower      | SCAD reflects Spot discounts                                                                                          |
| ---                                                          | ---                      | ---                                                                                                                   |

If your finance team was previously using Harness's pre-SCAD cost estimates, the  
first reconciliation window will show a one-time delta. After that, the  
day-over-day trend will be stable.

## **5\. Prerequisites**

To get billing-accurate K8s costs from SCAD, you need all of the following:

- AWS EKS clusters: SCAD currently covers Amazon EKS pods only. Self-managed Kubernetes on EC2, ECS, Fargate, and non-AWS clusters are not in scope of this feature.
- SCAD enabled in AWS for the payer / management account that publishes your  
   CUR. See u[nderstanding split cost allocation data](https://docs.aws.amazon.com/cur/latest/userguide/split-cost-allocation-data.html) by AWS.
- An AWS CUR connector configured in CACM, pointing at a CUR (CUR 2.0 or legacy  
   CUR is acceptable) that includes the SCAD columns.
- An AWS Kubernetes connector for each EKS cluster you want covered, with  
   the Harness Delegate installed and reported events.
- Harness CACM enabled on your account, with the CCM_SCAD_ENABLED_AWS feature  
   flag turned on. Reach out to Harness Support if you do not see SCAD-based costs  
   within ~3 days of completing steps 1-4.

There is no extra agent, no extra IAM role, and no extra cluster-side configuration required beyond what CACM already needs.

##

##

## **7\. FAQ**

Q: Do I lose real-time visibility while waiting 2-3 days?  
Yes - it completely depends when scad cost is appearing

Q: Will my historical data be updated?  
No. SCAD only applies from the day you enable it in AWS onward. Days before SCAD  
was enabled remain on the Phase-1 estimate.

Q: My total cluster cost did not change. Did SCAD do anything?  
Yes, SCAD redistributes the same total across pods, namespaces, and workloads.  
The cluster total _should_ be roughly the same; the per-namespace and per-workload  
numbers are where you'll see the impact.

Q: I see "unused cost" on a pod. What is that?  
That is the portion of the node's cost that AWS could not attribute to any pod  
(e.g. headroom not requested by any pod). SCAD distributes it across pods using  
AWS's allocation strategy, and Harness surfaces it as unallocated coston each  
pod and rolled up at the cluster.

Q: Does SCAD increase my AWS bill?  
SCAD itself is free. The CUR (with or without SCAD) is billed at standard S3  
storage rates for the CUR bucket typically negligible.

Q: Will my labels, cost categories, and perspectives still work?  
Yes.