---
title: IaCM onboarding guide
description: A self-service onboarding guide for Harness IaCM.
sidebar_position: 3
sidebar_label: Onboarding guide
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# IaCM onboarding guide

Welcome to the Harness Infrastructure as Code Management (IaCM) onboarding guide. This document introduces you to the powerful capabilities of IaCM using Harness and guides you through key functionalities that streamline and secure your infrastructure management tasks.

## What is IaCM?

Infrastructure as Code Management (IaCM) refers to managing and provisioning computing infrastructure through machine-readable definition files rather than physical hardware configuration or interactive configuration tools. By using IaCM, teams can ensure consistency, accountability, and repeatability within their environments. Harness enhances IaCM with features like real-time cost estimation, automated policy enforcement and drift detection, ensuring that your infrastructure is provisioned efficiently and complies with organizational standards and budget constraints.

## Prerequisites

Before beginning the walkthroughs in this guide, ensure you have:

- Access to a Harness account.
- Access to a Git provider with your Terraform file.
- An [organization and project set up](https://developer.harness.io/docs/platform/organizations-and-projects/create-an-organization) on the Harness Platform.
- A [configured Connector to your Cloud Provider](https://developer.harness.io/docs/category/cloud-providers)
- A [configured Connect to your Git repository](https://developer.harness.io/docs/platform/connectors/code-repositories/connect-to-code-repo)

:::note
You can add new Cloud Provider and Git repository connectors via the steps in the above links or when creating a new workspace.
:::

## Sample Terraform

The following example Terraform (.tf) file declares:

- Provider Configuration: Specifies the AWS provider and sets the region to "us-east-1". Go to [AWS Regions & Availability Zones](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.RegionsAndAvailabilityZones.html) for a complete region list.
- Resource Definition: Creates an EC2 instance with the identifier `my_first_ec2_instance`.
- AMI: Utilizes ami-123abc321cba18, go to [AWS EC2 User Guide](# https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/finding-an-ami.html) to find your AMI image ID.
- Instance Type: Configures the instance to use a t2.micro, offering cost-effective performance suitable for low to moderate demand. Go to the [AWS t2 instances list](https://aws.amazon.com/ec2/instance-types/t2/).
Tags: To facilitate easy identification and management within AWS resources, a tag name with the value' my_first_ec2_instance' is applied.

```
provider "aws" {
  region = "us-east-1"
}

resource "aws_instance" "my_first_ec2_instance" {
  ami = "ami-123abc321cba18" 
  instance_type = "t2.micro" # Got to https://aws.amazon.com/ec2/instance-types/t2/ for a full T2 instance type list.
  
  tags = {
    Name = "my_first_ec2_instance"
  }
}
```

Go to [Terraform Documentation](https://developer.hashicorp.com/terraform/intro) for more information on Terraform. 

## Create a Workspace

A workspace is a named environment that stores Terraform configurations, variables, states, and other resources necessary to manage infrastructure.

Users can define a Terraform configuration with multiple workspaces to enforce the same desired configuration. Each Workspace creates a different state with its own independent lifecycle.

For example, you can have a single configuration of a Kubernetes cluster and create multiple workspaces out of it, each leading to different clusters. The configuration is unique to each Workspace and can be managed through environment or Terraform variables.


To create a new workspace, follow these steps:

1. Sign in to [app.harness.io](https://app.harness.io/).
2. In the module pane, select **Infrastructures**.
3. Select an existing project or create a new project.
4. Select **Workspaces**, and then select *+ New Workspace**.
4. **Create new Workspace**

Complete the fields as follows:

- **Name** - Type a unique name to identify the Workspace.
- **Description** - Type an optional description to help identify the Workspace.
- **Connector** - Select the Harness connector to use during provisioning. You can select 
- **Workspace Type** - Select the IaC type you want to use. IaCM currently supports Terraform and OpenTofu
- **Terraform Version** - Select the OpenTofu/Terraform version the configuration supports. This version determines which version of Terraform to use during execution. Currently, Harness IaCM only supports the open-source versions of Terraform (all versions below 1.5.x).
- **Repository** - Specify the Git configuration for the Terraform configuration files. You should specify the Harness Git connector, repository branch, and file path to the configuration files in the repository.
- **Add workspace details**
- Select **Save**.

Now that you have set up your Workspace, you can proceed to add a new Pipeline.

## Add a Pipeline

A pipeline allows you to lay out a workflow from one point to another with as many steps as necessary to carry out specific tasks like planning infrastructure changes, enforcing policies, or ensuring approval before proceeding to the next step. Go to [Harness Pipelines](https://developer.harness.io/docs/category/pipelines) for more information.

The following sections highlight how to add a pipeline through the Harness Platform, but it also supports a code-first approach with options to [Write pipelines in YAML](https://developer.harness.io/docs/platform/pipelines/harness-yaml-quickstart).

### Provision with Cost Estimation

:::info
You can include cost estimation as part of the workspace setup and in conjunction with the Provision operation in your pipeline. This is part of the `terraform plan` step in your pipeline, which provides you with an approximate cost of the infrastructure changes you are making.
:::

Start by adding the pipeline:
1. Select the **Infrastructure** module
2. Select **Pipelines** followed by **+ Create a Pipeline**
3. **Name** your pipeline and **Start**
    - This will create a blank pipeline for you to add stages to.
4. Click **Add Stage** and select **Infrastructure**
5. **Name** the stage to describe what it should do and **Set Up Stage**
6. Go to the **Workspace** and select the Workspace you want the Pipeline to run on.
    Remember, the Workspace is configured with your Git and Cloud Provider connectors, which will determine where your infrastructure changes are applied.
7. Go to the **Execution**, where a selection of Operations will be presented.
8. Select **Provision** followed by **Use Operation**
9. Click **Save** at the top right of the screen

The Provision operation adds three Terraform plugin steps: `init`, `plan`, and `apply`. Go to [Terraform Plugins](https://developer.harness.io/docs/infra-as-code-management/pipelines/iacm-plugins/terraform-plugins) for more information explaining these Terraform commands.

### Add an Approval step

You can add the Approval step to prompt a review of the previous pipeline before proceeding to the next. The most common use case would be to add the Approval step between the `plan` and `apply` steps to ensure you are happy with the infrastructure changes and estimated costs (if `cost estimation` is enabled on your Workspace) that come with them before applying them.

1. From the Pipeline > Execution tab, click on **+** between `plan` and `apply`

![Add Approval Step](./static/AddApprovalStep.png)

2. Click **Add Step**
3. Under **IACM**, select **IACM Approval**
4. Name the approval step and click **Apply Changes**
5. Click **Save** at the top right and **Run** your pipeline

## Conclusion

This onboarding guide has introduced you to the essential functionalities and initial setup processes of Harness Infrastructure as Code Management (IaCM). Through this guide, you have explored the essentials of managing and provisioning infrastructure using Harness Infrastructure as Code Management, from creating workspaces to configuring pipelines.

For a deeper understanding of setting up your projects and analyzing their performance, we recommend reviewing the [Project Setup guides](https://developer.harness.io/docs/category/project-setup) and the [Reporting & Insights guides](https://developer.harness.io/docs/category/reporting--insights). These resources are designed to support your continued learning and to help you maximize the effectiveness of your infrastructure management strategies with Harness.
