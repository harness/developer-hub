---
title: AWS AMI Deployments Overview
description: A summary of Harness AWS AMI and ASG implementation.
sidebar_position: 40
helpdocs_topic_id: aedsdsw9cm
helpdocs_category_id: vbcmo6ltg7
helpdocs_is_private: false
helpdocs_is_published: true
---

This topic describes the concept of a Harness AWS AMI deployment by describing the high-level steps involved.

For a quick tutorial, see the [AWS AMI Quickstart](https://docs.harness.io/article/wfk9o0tsjb-aws-ami-deployments).

For detailed instructions on using AWS AMI in Harness, see the [AWS AMI How-tos](https://docs.harness.io/category/aws-ami-deployments).

### Before You Begin

Before learning about Harness AWS AMI deployments, you should have an understanding of [Harness Key Concepts](https://docs.harness.io/article/4o7oqwih6h-harness-key-concepts).

### What Does Harness Need Before You Start?

A Harness AWS AMI deployment requires the following:

* A working AWS AMI that Harness will use to create your instances.
* A working Auto Scaling Group (ASG) that Harness will use as a template for the ASG that Harness will create. The template ASG is referred to as the **base ASG** in Harness documentation.
* An AWS Instance or ECS cluster in which to install a Harness Delegate.
* IAM Role for the Harness Cloud Provider connection to AWS.

### What Does Harness Deploy?

Harness takes the AMI and base ASG you provide, and creates a new ASG and populates it with instances using the AMI. You can specify the desired, min, and max instances for the new ASG, resize strategy, and other settings in Harness.

Harness specifically supports AWS *target* tracking scaling policies. For details, see AWS' [Dynamic Scaling for Amazon EC2 Auto Scaling](https://docs.aws.amazon.com/autoscaling/ec2/userguide/as-scale-based-on-demand.html#as-scaling-types) topic.

### What Does a Harness AWS AMI Deployment Involve?

The following list describes the major steps of a Harness AWS AMI deployment:



|  |  |  |
| --- | --- | --- |
| **Step** | **Name** | **Description and Links** |
| 1 | Install the Harness Shell Script or ECS **Delegate** in your target EC2 subnet. | Typically, the Shell Script or ECS Delegate is installed in the same subnet where you will deploy your application(s).This is the same subnet as your base ASG, using the same security group and the same key pair. |
| 2 | Add an **AWS** **Cloud Provider**. | An AWS Cloud Provider is a connection to your AWS account.The AWS Cloud Provider is used to obtain the AMI Harness will use to create new instances, the base ASG Harness will uses a template, and to deploy the new instances. |
| 3 | Create the Harness **Application** for your AMI CD Pipeline. | The Harness Application represents a group of microservices, their deployment pipelines, and all the building blocks for those pipelines. Harness represents your release process using a logical group of one or more entities: Services, Environments, Workflows, Pipelines, Triggers, and Infrastructure Provisioners. Applications organize all of the entities and configurations in Harness CD. |
| 4 | Create the Harness **Service** using the Amazon Machine Image Deployment Type. | Add an AMI as an artifact in a Harness Service, add any AMI User Data, and any config variables and files. |
| 5 | Create the Harness **Environment** and Infrastructure Definition for your deployment, and any overrides. | Using the Harness AWS Cloud Provider you set up, you can select the base ASG and target environment for your deployment.You can also override any Service settings, such as User Data values. This enables you to use a single Service with multiple Harness Environments. |
| 6 | Create the Basic, Canary, and Blue/Green deployments in Harness **Workflows**. | The Workflow deploys the new ASG and AMI instances defined in the Harness Service to the environment in the Harness Infrastructure Definition. |
| 7 | Deploy the Workflow. | Once you've deployed a Workflow, learn how to improve your AWS AMI CD:* [Workflows](https://docs.harness.io/article/m220i1tnia-workflow-configuration)
* [Triggers](https://docs.harness.io/article/xerirloz9a-add-a-trigger-2)
* [Infrastructure Provisioners Overview](https://docs.harness.io/article/o22jx8amxb-add-an-infra-provisioner)
 |

### How Does Harness Downsize Old ASGs?

Harness identifies the ASGs it deploys using the Harness Infrastructure Definition used to deploy it. During deployments, Harness tags the new ASG with an Infrastructure Definition ID.

It uses that ID to identify the previous ASG version(s), and downsize them as described below.

Harness upscales and downsizes in two states, setup and deploy.

* **Setup** — The setup state is when your new ASG is created.
* **Deploy** — The deploy phase(s) is when your new ASG is upscaled to the number of new instances you requested. This is either a fixed setting (Min, Max, Desired) or the same number as the previous ASG.

Instances are always tied to their ASG. A New ASG does not take instances from an old ASG.During setup state:

* The previous ASG is kept with non-zero instance count. It is identified by its tag containing the Infrastructure Definition ID and the highest revision number, such as **\_7**. Any older ASGs are downsized to 0.
* New ASG is created with 0 count.
* For old ASGs that have 0 instances, Harness keeps the 3 last old ASGs and deletes the rest.

During deploy phases:

* New ASG is upscaled to the number of new instances you requested.
* Previous ASG is gradually downsized. In the case of a Canary deployment, the old ASG is downsized in the inverse proportion to the new ASG's upscale. If the new ASG is upscaled 25% in phase 1, the previous ASG is downsized 25%.

At the end of deployment:

* New ASG has the number of new instances you requested. In Canary, this is always 100%.
* Previous ASG is downsized to 0.

#### Rollback

If rollback occurs, the previous ASG is upscaled to its pre-setup number of instances using new instances.

#### Don't Want a Previous ASG Downsized?

As stated earlier, Harness identifies the ASGs it deploys using the Harness Infrastructure Definition used to deploy it. During deployments, Harness tags the new ASG with an Infrastructure Definition ID.

It uses that ID to identify the previous ASG version(s), and downsize them as described above.

If you do not want a previously deployed ASG to be downsized, then you must use a new Infrastructure Definition for future ASG deployments. A new ASG name is not enough.

### Next Steps

Read the following topics to build on what you've learned:

* [AWS AMI Quickstart](https://docs.harness.io/article/wfk9o0tsjb-aws-ami-deployments)
* [AWS AMI How-tos](https://docs.harness.io/category/aws-ami-deployments)

