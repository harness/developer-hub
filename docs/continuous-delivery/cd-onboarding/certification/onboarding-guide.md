---
title: CD certification guide
description: A self-service certification guide for Harness CD & GitOps
sidebar_position: 1
---

Harness CD & GitOps is purpose built to automate deployment of your software artifacts, usually generated as output of a Continuous Integration (CI) process, to a target deployment infrastructure. This artifact can be a container image or a serverless function or  a traditional monolithic application or a custom format specific to your company. Similarly, the deployment infrastructure can be a Kubernetes cluster, serverless function providers such as AWS Lambda or Google Cloud Functions or even Virtual Machines running on AWS, Google Cloud, Azure or Physical Data Center. 

## Prerequisite: Complete Harness Platform onboarding

You should review and complete the following prerequisites.

- [Harness Platform onboarding guide](/docs/platform/get-started/onboarding-guide)
- [Harness Platform key concepts](/docs/platform/get-started/key-concepts)

## Step 1. Review key CD concepts & supported integrations

- [Harness CD & GitOps key concepts](/docs/continuous-delivery/get-started/key-concepts)
- [Supported integrations](/docs/continuous-delivery/cd-integrations)

## Step 2. Create your first CD pipeline
We recommend you use the [Harness UI](/docs/platform/get-started/harness-ui-overview) for learning how to create pipelines as well as for creating your first pipeline. Additionally, you should use a Harness-provided sample app here so that you can see how the basic features work. The tutorials below are all based on a sample app. You will onboard your own app in the next step.

- [All CD & GitOps tutorials](/docs/category/cd-and-gitops-tutorials)
- [Kubernetes pipelines & GitOps workflows](/docs/continuous-delivery/get-started/cd-tutorials/manifest)
- [Serverless pipelines](/docs/continuous-delivery/get-started/cd-tutorials/aws-lambda)
- [VM pipelines for traditional apps](/docs/continuous-delivery/get-started/cd-tutorials/aws)
- [Amazon ECS pipelines](/docs/continuous-delivery/get-started/cd-tutorials/amazon-ecs)
- [Automate pipeline execution through pipeline triggers](/docs/platform/triggers/tutorial-cd-trigger)

## Step 3. See advanced CD concepts in action
Now you are ready to learn advanced CD concepts through the following tutorials.

- [Templates](/docs/platform/templates/create-pipeline-template)
- [Notifications](/docs/platform/notifications/notification-settings)
- [Approvals](/docs/platform/approvals/approvals-tutorial)
- [Continuous Verification](/docs/continuous-delivery/get-started/cd-tutorials/prometheus)
- [Infrastructure Provisioning as part of CD pipeline](/docs/continuous-delivery/get-started/cd-tutorials/cloudformation)
- [Variables & Expressions](/docs/platform/variables-and-expressions/harness-variables)

## Step 4. Automate onboarding for your own app 
We recommend you either use Git Experience, Harness Terraform Provider or the Harness REST API for this step.

- [Git Experience](/docs/platform/git-experience/git-experience-overview)
- [Terraform Provider](/docs/platform/automation/terraform/harness-terraform-provider-overview)
- [API](/docs/platform/automation/api/api-quickstart)

## Step 5. Add governance guardrails 

- [Policy-as-Code](/docs/platform/governance/policy-as-code/harness-governance-overview)

## Step 6. Become a Harness Certified Expert

### Developer Certification
This [certification](/university/continuous-delivery) is the starting point for evaluating your understanding of Harness CD & GitOps concepts. 

### Administrator Certification
After completing the Developer Certification, you are now ready to test your skills as a Harness CD & GitOps Administrator through the [Administrator certification](/university/continuous-delivery).

### Architect Certification
After completing the Administrator Certification, you are now ready to test your skills as a Harness CD & GitOps Architect through the [Architect certification](/university/continuous-delivery).
