---
title: 4 - ECS Environments
description: Create a Harness Environment to identify the target AWS VPC for your ECS deployment.
sidebar_position: 500
helpdocs_topic_id: yasp1dt3h5
helpdocs_category_id: df9vj316ec
helpdocs_is_private: false
helpdocs_is_published: true
---

Creating a Harness Environment for ECS is a simple process. First, you specify the ECS Deployment Type. Then, you specify the ECS cluster where you want to deploy the ECS Task and Service that you defined in your Harness Services.


### Create an Environment

To create the Harness Environment for ECS, do the following:

1. In your Harness Application, click **Environments**.
2. Click **Add Environment**. The **Environment** dialog appears.
3. In the **Environment** dialog, enter a name (such as **Stage**), select the **Non-Production** type (you can add your production environment later), and click **Submit**. The new Environment appears.


### Define the Infrastructure

Next, you define one or more Infrastructure Definitions for the Environment.

For ECS, an Infrastructure Definition specifies the ECS cluster, launch type, and related VPC information.

To create an Infrastructure Definition:

1. On your Environment page, click **Add Infrastructure Definition**.

   ![](./static/ecs-environments-91.png)
   
   The **Infrastructure Definition** dialog appears.
2. Enter a **Name** that will identify this Infrastructure Definition when you [add it to a Workflow](ecs-workflows.md).
3. In **Cloud Provider Type**, select **Amazon Web Services**.
4. In **Deployment Type**, select **Amazon Elastic Container Service (ECS)**. This expands the **Infrastructure Definition** dialog to look something like this:
5. Select **Use** **Already Provisioned Infrastructure**, and follow the [Define a Provisioned Infrastructure](#define_provisioned_infrastructure) steps below.

Harness supports Terraform, CloudFormation, and custom Shell Script provisioning. Learn about each option here:

* [Terraform Provisioner](../../terraform-category/terrform-provisioner.md)
* [CloudFormation Provisioner](../cloudformation-category/cloud-formation-provisioner.md)
* [Shell Script Provisioner](https://docs.harness.io/article/1m3p7phdqo-shell-script-provisioner)

If you are using a configured Harness [Infrastructure Provisioner](https://docs.harness.io/article/o22jx8amxb-add-an-infra-provisioner), instead select **Map Dynamically Provisioned Infrastructure**, select the Harness Infrastructure Provisioner you set up, and click **Submit**.
##### Define a Provisioned Infrastructure

Harness supports Terraform, CloudFormation, and custom Shell Script provisioning. Learn about each option here:

* [Terraform Provisioner](../../terraform-category/terrform-provisioner.md)
* [CloudFormation Provisioner](../cloudformation-category/cloud-formation-provisioner.md)
* [Shell Script Provisioner](https://docs.harness.io/article/1m3p7phdqo-shell-script-provisioner)

To fill out the **Infrastructure Definition** dialog's lower section:

1. In **Cloud Provider**, select the AWS Cloud Provider you set up for your ECS deployment.
2. In **Region**, select the AWS region where your ECS cluster is located.
3. In **Cluster Name**, select the ECS cluster where Harness will deploy the Task Definition and Service defined in the [Harness Service](ecs-services.md) you will use with this Environment.
4. In **Launch Type**, select either **Fargate LaunchType** or **EC2 Instances**.  
The only difference when configuring these launch types is that **Fargate LaunchType** requires that you specify the **Target Execution Role** in the next field.If you are using an ECS [Capacity provider strategy](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/service_definition_parameters.html#sd-capacityproviderstrategy), see [Capacity Providers](ecs-environments.md#capacity-providers).
5. In **VPC**, select the VPC where the ECS Cluster is located.
6. In **Security Groups**, select the AWS security group(s) that you want to use when creating instances. (This drop-down lists Security Groups by Group ID. You can locate the Group ID in the **ECS Dashboard** under **Security Groups**.)
7. In **Subnets**, select the VPC subnet(s) where the EC2 instances will be located.
8. Select **Assign Public IP** if you want external public IP addresses assigned to the deployed container tasks.
9. Enable **Scope to Specific Services**, and use the adjacent drop-down to select the [Harness Service](ecs-services.md) you've configured for ECS.

Scoping is a recommended step, to make this Infrastructure Definition available to any Workflow or Phase that uses this Service.1. Click **Submit**. The new Infrastructure Definition is added to your Environment. You will select this Environment and Infrastructure Definition when you create your Harness [Workflow](ecs-workflows.md).

#### Capacity Providers

If you are using a [Capacity provider strategy](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/service_definition_parameters.html#sd-capacityproviderstrategy) (the `capacityProviderStrategy` is used in your ECS Service definition), select one of the following launch type: 

* For `FARGATE` or `FARGATE_SPOT` strategies, select **Fargate Launch Type**.
* For the Auto Scaling group strategy, select `EC2 Instances`.

### Next Step

Now that you have an [ECS Service](ecs-services.md) and [Environment](ecs-environments.md) set up, you can create an ECS Workflow:

* [5 - ECS Workflows](ecs-workflows.md)
* [6 - ECS Blue/Green Workflows](ecs-blue-green-workflows.md)

