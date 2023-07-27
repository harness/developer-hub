---
title: Infrastructure as Code Management terms and concepts
description: Learn the basic terms and concepts related to Infrastructure as Code Management.
sidebar_label: Terms and concepts
sidebar_position: 20
---

Infrastructure as Code (IaC) is the ability to define cloud resources as code definitions. It allows for repeatable infrastructure configuration. Examples of IaC tools are HashiCorp Terraform and Amazon CloudFormation.

## Cloud provider

A company offering the ability to run cloud resources on your behalf, for example AWS, Azure, GCP, and others.

For information about how to connect to a cloud provider, go to [Connect to a cloud provider](/docs/platform/7_Connectors/Cloud-providers/connect-to-a-cloud-provider.md).

## Cloud resource

Any running instance of cloud infrastructure, for example an EC2 instance or an S3 bucket.

## Workspace

A group of infrastructure resources. A workspace brings together IaC code, IaC variables, cloud provider connection, state and workflows. For Terraform, every workspace has its own state file.

## Variables

Typically, IaC code is extended by inserting variables. Environment and Terraform variables are available. 

## Provision

The process of taking the infrastructure configuration and applying it against a cloud provider to create cloud resources. For example, running `terraform apply` using a main.tf file.

## Destroy

The process of removing all resources that are provisioned under the IaC code. This is also called Destroy. 

## Drift 

When the state and the actual running infrastructure are misaligned. For example, if someone manually edits AWS resources from the console or API without going through the IaC tool managing its infrastructure.

## Drift detection

Functionality to determine if the cloud resources defined in the IaC code are provisioned as defined by comparing the statefile with the running infrastructure.

## Harness state tracking

Functionality to monitor the current state and to track changes to a stack over its lifecycle. 

## Terraform state backend

A service that manages access and changes to a shared Terraform statefile.
