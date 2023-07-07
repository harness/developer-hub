---
title: Infrastructure as Code Management terms and concepts
description: Learn the basic terms and concepts related to Infrastructure as Code Management.
sidebar_label: Terms and concepts
sidebar_position: 20
---

Infrastructure as Code (IaC) is the ability to define cloud resources as code definitions. It allows for repeatable infrastructure configuration. Examples of IaC tools are HashiCorp Terraform and Amazon CloudFormation.

## Cloud provider

A company offering the ability to run cloud resources on your behalf, for example AWS, Azure, GCP, and others.

## Cloud resource

Any running instance of cloud infrastructure, for example an EC2 instance or an S3 bucket.

## Drift 

When the state and the actual running infrastructure are misaligned. For example, if someone manually edits AWS resources from the console or API without going through the IaC tool managing its infrastructure.

## Drift detection

Functionality to determine if the cloud resources defined in the IaC code are provisioned as defined by comparing the statefile with the running infrastructure.

## Harness state tracking

Functionality to not only have the current state but to track the changes to a stack over its lifecycle. 

## Provision

The process of taking the code definition and running it against a cloud provider to create cloud resources. For example, “terraform apply” against a main.tf file.

## Resource stack

A group of cloud resources managed by IaC code within the Harness Platform. It brings together IaC code, IaC variables, cloud provider connection, state and workflows. For Terraform, every stack will have its own state file.

## Resource stack template

The ability to define the IaC code, base variables, and workflows without the need for a stack. A template can be used to speed up and/or control an internal customer's ability to create cloud resources. 

## Teardown

The process of removing all resources that are provisioned under the IaC code. This is also called Destroy. 

## Terraform state backend

A service that manages access and changes to a shared Terraform statefile.

## Variables

Typically, IaC code is extensible through the ability to insert variables. 

## Workflow

A single stage pipeline to take specific action regarding a specific resource stack. A single stack will have at a minimum the ability to provision and tear down the resources defined in the IaC code.
