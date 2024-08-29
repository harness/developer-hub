---
title: Key concepts
description: Learn the key terms and concepts related to Infrastructure as Code Management.
sidebar_label: Key concepts
sidebar_position: 20
redirect_from:
  - /docs/infra-as-code-management/get-started-with-iacm/iacm-terms-and-concepts
---

Infrastructure as Code (IaC) is the ability to define cloud resources as code definitions. It allows for repeatable infrastructure configuration. Examples of IaC tools are HashiCorp Terraform and Amazon CloudFormation.


## Workspace

Your workspace is a container for your infrastructure resources. It integrates IaC code, variables, cloud provider connections, state files, and workflows. In Terraform, each workspace has its own state file, which tracks the status of its managed resources.

## Operations

Operations are actions taken to manage and maintain your infrastructure using IaC tools.

-	**Provision:** The process of applying infrastructure configuration to a cloud provider to create cloud resources. For example, executing `terraform apply` with a terraform file will provision the defined resources.
-	**Destroy:** The process of removing all resources that were provisioned by the IaC code.
-	**Drift**: Occurs when the actual state of your infrastructure deviates from the state defined by your IaC code. This often happens when changes are made directly through the cloud provider’s console or API, bypassing the IaC tool.
- **Drift Detection:** The process of identifying discrepancies between the infrastructure defined in your IaC code and the actual running infrastructure. This is typically done by comparing the state file with the current state of the resources.

## Resources

Resources are the components and services managed by your IaC tool and cloud provider.

- **Cloud Resource:** Any instance of cloud infrastructure that is currently running, such as an EC2 instance or an S3 bucket.
- **Cloud Provider:** A company offering cloud computing services, allowing you to run and manage resources on their infrastructure. Examples include AWS, Azure, and Google Cloud Platform (GCP). For information about how to connect to a cloud provider, go to [Connect to a cloud provider](/docs/category/cloud-providers).
-	**Harness State Tracking:** Functionality that monitors the current state of a stack and tracks any changes throughout its lifecycle.
-	**Terraform State Backend:** A service that manages access to and changes in a shared Terraform state file, ensuring consistency across your team and preventing conflicts.
-	**Variables:** Elements used to extend and customize IaC code. Both environment variables and Terraform-specific variables are supported.