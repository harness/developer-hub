---
title: Introduction to AutoStopping
description: AutoStopping Rules make sure that your non-production resources run only when used, and never when idle.
sidebar_position: 10
helpdocs_topic_id: wzr5tz0ero
helpdocs_category_id: 2yrql0zhj0
helpdocs_is_private: false
helpdocs_is_published: true
canonical_url: https://www.harness.io/blog/cloud-autostopping
---

<DocVideo src="https://youtu.be/lNf_P5sHTcE" />

## What Are AutoStopping Rules?

**AutoStopping Rules** are dynamic, intelligent orchestrators designed to manage non-production cloud workloads efficiently. They automatically shut down idle resources and seamlessly restart them when needed including running workloads on **spot instances** without worrying about interruptions.

## Why Use AutoStopping Rules?

AutoStopping Rules help ensure you're only **paying for resources when they're actually in use**. Here's what they bring to your cloud cost optimization strategy:

- **No More Cloud Waste**: Automatically shut down or terminate idle cloud resources.
- **Save Up to 70%** on Non-Production Cloud Costs.
- **Run on Spot Instances** without risk — full orchestration ensures reliability.
- **Auto-Resume Access**: Resources remain accessible using familiar methods (DNS, SSH, RDP), even after being stopped or terminated.
- **No Manual Intervention**: Once configured, everything works automatically — no need to remember to shut things off.

## Key Problems Solved

AutoStopping Rules address the most common challenges teams face with idle resources:

- ❌ Manually predicting idle time is inaccurate and inefficient.
- ❌ Forceful shutdowns make machines inaccessible — blocking workflows.
- ❌ Basic start/stop automation doesn't optimize cloud spend or compute usage.
- ✅ **AutoStopping handles all of the above, intelligently and seamlessly.**

## Benefits of AutoStopping Rules

- **Real savings**: Cut cloud bills by over 70%.
- **Set-and-forget automation**: Zero manual overhead after initial setup.
- **No more forgotten VMs**: Enforces policies so idle resources don’t keep burning money.
- **Easy integration** with Terraform or existing provisioning workflows.
- **Access preserved**: Continue using DNS links, SSH, RDP — even after resources restart.

## Where Can You Use AutoStopping Rules?

| Cloud Provider | Supported Resources |
|----------------|---------------------|
| **AWS**        | EC2, Auto Scaling Groups, Kubernetes (EKS), ECS Services, RDS Instances |
| **Azure**      | On-demand VMs, Kubernetes Clusters (AKS) |
| **GCP**        | GCE VMs, Kubernetes Clusters (GKE) |

> **Note:**  
> - There's **no limit** on the number of dependencies a rule can manage.  
> - **RDS warm-up time** depends on cluster/instance size (~25 minutes).  
> - Other resources warm up in under 2 minutes (max 5 minutes).

---

## Troubleshooting

If you face any issues, refer to the [Troubleshooting AutoStopping Rules and Proxy](/docs/auto-stopping/troubleshooting) guide.


## Learn More

- 📘 [AutoStopping Setup Guides](/docs/category/autostopping-rules)
