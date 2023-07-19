---
title: AutoStopping Rules overview
description: AutoStopping Rules make sure that your non-production resources run only when used, and never when idle.
# sidebar_position: 2
helpdocs_topic_id: wzr5tz0ero
helpdocs_category_id: 2yrql0zhj0
helpdocs_is_private: false
helpdocs_is_published: true
---

AutoStopping Rules make sure that your non-production resources run only when used, and never when idle. It also allows you to run your workloads on fully orchestrated spot instances without any worry of spot interruptions. With AutoStopping Rules configured:

* Stop paying for cloud VMs you forgot to turn off
* Cut non-production cloud costs by 70%
* Stop paying for cloud waste

### Visual Summary
<figure><iframe src="//fast.wistia.com/embed/iframe/8wo6shjqqh" width="560" height="315" frameborder="0" allowfullscreen=""></iframe></figure>

### Blog Post

The following blog post walks you through how to manage your idle cloud costs:

[Cloud AutoStopping – Active Management of Idle Cloud Costs](https://www.harness.io/blog/cloud-autostopping)

### What is AutoStopping Rule?

AutoStopping Rule is a dynamic and powerful resource orchestrator for non-production workloads. It automatically shuts down idle resources and runs them on spot instances without worrying about interruptions.

AutoStopping solves some of the problems, such as:

* Predict idle times statically, especially during work hours
* Allow accessing the stopped or terminated machines, which is not possible with forceful shutdowns
* Stop the cloud resources without optimization of computing, only start/stop actions

### Why AutoStopping Rules?

Using AutoStopping Rules you can automatically turn off cloud resources when idle and turn them back on when required. Here are some of the major benefits of adding AutoStopping Rules to your cloud resources:

* Automatically detect idle times and shut down (on-demand) or terminate (spot) resources.
* Enable running the workloads on fully orchestrated spot instances without worrying about spot interruptions.
* Stopped/terminated machines are always accessible using the same access patterns that the teams have configured, for example, DNS link, SSH, RDP.

### Why is this Important?

* Tangible reduction in cloud bills, real savings of 70%+.
* Automated enforcement making sure that there are no idle resources running, and there is no cloud waste.
* No room for cost leakages due to manual oversight.
* No need to remember to shut down/terminate resources after use.
* No ongoing manual intervention after setup.
* Easy integration with existing infrastructure provisioning practices.

### AutoStopping Rules Coverage

The following section lists where you can use AutoStopping rules:

#### AWS

* EC2
* AutoScaling Groups
* Kubernetes Clusters (EKS)
* ECS Service
* RDS Instances

#### Azure

* On-demand VMs
* Kubernetes Clusters (AKS)

#### GCP

* Google Compute Engine (GCE) VMs
* Kubernetes Clusters (GKE)


