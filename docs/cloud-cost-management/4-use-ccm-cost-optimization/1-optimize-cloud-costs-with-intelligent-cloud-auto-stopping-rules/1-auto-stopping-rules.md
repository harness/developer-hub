---
title: Introduction to AutoStopping
description: AutoStopping Rules make sure that your non-production resources run only when used, and never when idle.
sidebar_position: 1
canonical_url: https://www.harness.io/blog/cloud-autostopping
---
import Tabs from '@theme/Tabs';

import TabItem from '@theme/TabItem';


:::tip [Latest Features Released in 1.47.0](/release-notes/cloud-cost-management#april-2025---version-1470)
<Tabs>
  <TabItem value="Granular permissions support for AWS Autostopping">We have introduced Granular permissions support for AWS Autostopping. With this update, users can now select the specific AWS resource types they want to enable for Autostopping such as EC2, ASG, or RDS. Based on the selected resource types, only the minimal required set of permissions will be requested.  </TabItem>
</Tabs>
:::

AutoStopping Rules make sure that your non-production resources run only when used, and never when idle. It also allows you to run your workloads on fully orchestrated spot instances without any worry of spot interruptions. With AutoStopping Rules configured:

- Stop paying for cloud VMs you forgot to turn off
- Cut non-production cloud costs by 70%
- Stop paying for cloud waste

<DocVideo src="https://youtu.be/lNf_P5sHTcE" />

## What are AutoStopping Rules?

AutoStopping Rule is a dynamic and powerful resource orchestrator for non-production workloads. It automatically shuts down idle resources and runs them on spot instances without worrying about interruptions.

AutoStopping solves some of the problems, such as:

- Predict idle times statically, especially during work hours
- Allow accessing the stopped or terminated machines, which is not possible with forceful shutdowns
- Stop the cloud resources without optimization of computing, only start/stop actions

## Why use AutoStopping Rules?

Using AutoStopping Rules you can automatically turn off cloud resources when idle and turn them back on when required. Here are some of the major benefits of adding AutoStopping Rules to your cloud resources:

- Automatically detect idle times and shut down (on-demand) or terminate (spot) resources.
- Enable running the workloads on fully orchestrated spot instances without worrying about spot interruptions.
- Stopped/terminated machines are always accessible using the same access patterns that the teams have configured, for example, DNS link, SSH, RDP.

## What are the benefits of using AutoStopping Rules?

- Tangible reduction in cloud bills, real savings of 70%+.
- Automated enforcement making sure that there are no idle resources running, and there is no cloud waste.
- No room for cost leakages due to manual oversight.
- No need to remember to shut down/terminate resources after use.
- No ongoing manual intervention after setup.
- Easy integration with existing infrastructure provisioning practices.

## Where can I use AutoStopping Rules?

- AWS
   - EC2
   - AutoScaling Groups
   - Kubernetes Clusters (EKS)
   - ECS Service
   - RDS Instances
- Azure
   - On-demand VMs
   - Kubernetes Clusters (AKS)
- GCP
   - Google Compute Engine (GCE) VMs
   - Kubernetes Clusters (GKE)

To troubleshoot AutoStopping rules, go to [Troubleshoot AutoStopping rules and Proxy](../../../troubleshooting/cloud-cost-management/autostopping-troubleshooting.md).


:::important note
- There's no limit on max number of dependencies for a rule. 
- For RDS, warm up time is dependent on cluster(or instance) size. RDS warm up can take up to ~25 minutes. For other resources, warm up will be completed under 2 minutes and max of 5 minutes.
:::

## Learn more

* [Harness Blog - Active Management of Idle Cloud Costs](https://www.harness.io/blog/cloud-autostopping)
* [Autostopping guides](/docs/category/autostopping-guides)
