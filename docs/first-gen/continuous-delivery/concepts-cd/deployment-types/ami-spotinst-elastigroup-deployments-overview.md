---
title: AMI Spotinst Elastigroup Deployments Overview
description: A summary of Harness AMI Spotinst implementation.
sidebar_position: 50
helpdocs_topic_id: ighbnk6xg6
helpdocs_category_id: vbcmo6ltg7
helpdocs_is_private: false
helpdocs_is_published: true
---

Currently, Harness integrates with Spotinst only for deployments to AWS (Amazon Web Services) via Elastigroup.This topic describes the concept of a Harness AWS Spotinst Elastigroup deployment by describing the high-level steps involved.

For detailed instructions on using AWS Spotinst Elastigroup in Harness, see the  [AMI Spotinst Elastigroup Deployment](../../aws-deployments/ami-deployments/ami-elastigroup.md).

### Before You Begin

Before learning about Harness AWS Spotinst Elastigroup deployments, you should have an understanding of [Harness Key Concepts](https://docs.harness.io/article/4o7oqwih6h-harness-key-concepts).

### What Does Harness Need Before You Start?

A Harness AWS Spotinst Elastigroup deployment requires the following:

* In AWS:
	+ For an AMI Canary deployment, you must set up a working AMI that Harness will use to create your instances and at least one  [Application Load Balancer](https://docs.aws.amazon.com/en_pv/elasticloadbalancing/latest/application/introduction.html) (ALB) or  [Classic Load Balancer](https://docs.aws.amazon.com/en_pv/elasticloadbalancing/latest/classic/introduction.html). (See the  [Spotinst documentation](https://docs.spot.io/elastigroup/tools-integrations/aws-load-balancers-elb-alb) for Load Balancer support.)
	+ For AMI Blue/Green deployment, you must also have:
		- A pair of  [Target Groups](https://docs.aws.amazon.com/elasticloadbalancing/latest/application/load-balancer-target-groups.html)—typically staging (Stage) and production (Prod)—both with the **instance** target type.
		- A Load Balancer with listeners for both your Target Groups' ports.
* In Spotinst, an Elastigroup configuration with at least one Elastigroup cluster that matches your AWS configuration's AMI, VPC, Load Balancer(s), security groups, availability zones, and allowed instance types.

### What Does Harness Deploy?

Harness takes the AMI and Elastigroup configuration you provide, and creates a new Elastigroup and populates it with instances using the AMI. You can specify the target, min, and max instances for the new Elastigroup, and other settings in Harness.

### What Does a Harness AWS Spotinst Elastigroup Deployment Involve?

The following list describes the major steps of a Harness AWS Spotinst Elastigroup deployment:



|  |  |  |
| --- | --- | --- |
| **Step** | **Name** | **Description and Links** |
| 1 | Install the Harness Shell Script or ECS **Delegate** in your target EC2 subnet. | Typically, the Shell Script or ECS Delegate is installed in the same subnet where you will deploy your application(s). |
| 2 | Add both an **AWS** **Cloud Provider** and a **Spotinst Cloud Provider**. | An AWS Cloud Provider is a connection to your AWS account. The AWS Cloud Provider is used to obtain the AMI Harness will use to create new instances and to deploy the new instances.A Spotinst Cloud Provider is used to connect Harness to Spotinst. |
| 3 | Create the Harness **Application** for your Spotinst deployment. | The Harness Application represents a group of microservices, their deployment pipelines, and all the building blocks for those pipelines. Harness represents your release process using a logical group of one or more entities: Services, Environments, Workflows, Pipelines, Triggers, and Infrastructure Provisioners. Applications organize all of the entities and configurations in Harness CD. |
| 4 | Create the Harness **Service** using the Amazon Machine Image Deployment Type. | Add an AMI as an artifact in a Harness Service, add any AMI User Data, and any config variables and files. |
| 5 | Create the Harness **Environment** and Infrastructure Definition for your deployment, and any overrides. | Using the Harness AWS Cloud Provider and Spotinst Cloud Provider you set up, you can select the Elastigroup configuration as the target environment for your deployment.You can also override any Service settings, such as User Data values. This enables you to use a single Service with multiple Harness Environments. |
| 6 | Create the Basic, Canary, and Blue/Green deployments in Harness **Workflows**. | The Workflow deploys the new AMI instances defined in the Harness Service to the environment in the Harness Infrastructure Definition. |
| 7 | Deploy the Workflow. | Once you've deployed a Workflow, learn how to improve your AWS AMI CD:* [Workflows](https://docs.harness.io/article/m220i1tnia-workflow-configuration)
* [Triggers](https://docs.harness.io/article/xerirloz9a-add-a-trigger-2)
* [Infrastructure Provisioners Overview](https://docs.harness.io/article/o22jx8amxb-add-an-infra-provisioner)
 |

### How Does Harness Downsize Old Elastigroups?

Harness upscales and downsizes in two states, setup and deploy.

* **Setup** — The setup state is when your new Elastigroup is created.
* **Deploy** — The deploy phase(s) is when your new Elastigroup is upscaled to the number of new instances you requested. This is either a fixed setting (Min, Max, Desired) or the same number as the previous Elastigroup.

Instances are always tied to their Elastigroup. A new Elastigroup does not take instances from an old Elastigroup.During setup state:

* The previous Elastigroup is kept with non-zero instance count (highest revision number, such as **\_7**). Any older Elastigroup are downsized to 0.
* New Elastigroup is created with 0 count.
* For Elastigroups that had 0 instances, Harness keeps 3 old Elastigroups and deletes the rest.

During deploy phases:

* New Elastigroup is upscaled to the number of new instances you requested.
* Previous Elastigroup is gradually downsized. In the case of a Canary deployment, the old Elastigroup is downsized in the inverse proportion to the new Elastigroup's upscale. If the new Elastigroup is upscaled 25% in phase 1, the previous Elastigroup is downsized 25%.

At the end of deployment:

* New Elastigroup has the number of new instances you requested. In Canary, this is always 100%.
* Previous Elastigroup is downsized to 0.

#### Rollback

If rollback occurs, the previous Elastigroup is upscaled to its pre-setup number of instances using new instances.

### Next Steps

Read the following topics to build on what you've learned:

* [AMI Spotinst Elastigroup Deployment](../../aws-deployments/ami-deployments/ami-elastigroup.md)

