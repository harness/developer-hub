---
title: Configure Gitspace Infrastructure
description: Get Started with Harness CDE (Gitspaces)
sidebar_position: 2
sidebar_label: Configure Gitspace Infrastructure
---

In order to get started with self-hosted Gitspaces, you'll first need to configure infrastructure for these Gitspaces. This infrastructure is where your Gitspaces will be hosted, so you must define and configure it within Harness UI. This guide will take you through the detailed steps to configure your infrastructure using the Harness UI.

## Prerequisites

- Ensure you’ve read through the **Fundamentals** and **Prerequisites** of self-hosted Gitspaces [here](/docs/cloud-development-environments/self-hosted-gitspaces/fundamentals.md). This will help you gain a deeper understanding of the basic concepts and setup steps.
- Please make sure you are aware of the following details required for configuring your GCP Infrastructure. These inputs are necessary during this step. Refer to the table below for a detailed description of each input.
- Only **Gitspace Admins** with account-level access can configure Gitspace Infrastructure.
- Ensure that your GCP project (to be defined in the infra config) has the following APIs enabled:
  <ul>
    <li>[Cloud Resource Manager API](https://cloud.google.com/resource-manager/reference/rest) – `api/cloudresourcemanager.googleapis.com`</li>
    <li>[Compute Engine API](https://cloud.google.com/compute/docs/reference/rest/v1) – `api/compute.googleapis.com`</li>
    <li>[Certificate Manager API](https://cloud.google.com/certificate-manager/docs/reference/certificate-manager/rest) – `api/certificatemanager.googleapis.com`</li>
    <li>[Identity and Access Management (IAM) API](https://cloud.google.com/iam/docs/reference/rest) – `api/iam.googleapis.com`</li>
    <li>[Cloud DNS API](https://cloud.google.com/dns/docs/reference/rest/v1) – `api/dns.googleapis.com`</li>
  </ul>

Here's a quick [reference guide](https://cloud.google.com/endpoints/docs/openapi/enable-api) to learn more about enabling APIs in your GCP project.

## Configuring Gitspace Infrastructure

Configuring your Gitspace Infrastructure involves adding your infrastructure details in the Harness UI using the steps below. This process generates an **Infra Config YAML** — a YAML file that captures your entire infrastructure configuration. This YAML is a required input when running the Harness Gitspace Terraform Module to provision the necessary GCP VM infrastructure.

### Access Gitspace Infrastructure

1. Only users with the **Gitspace Admin** role and account-level access can configure Gitspace Infrastructure.
2. Navigate to the **Cloud Development Environments** module and open your **Account Settings**.
3. In the side navbar under Account Settings, select **Gitspace Infrastructure**.

### Provide Basic Infrastructure Details

1. **Infrastructure Name**: Provide a name for your Gitspace infrastructure. You can select this while creating Gitspaces.
2. **GCP Project**: Enter the name of your GCP project. This is where the GCP VM Instance hosting your Gitspaces will reside.
3. **Domain**: Provide the domain under which all Gitspaces created in this infrastructure will be accessible.
4. **Gateway Machine Type**: Specify the VM machine type for your Gateway.

### Configure Regions

You can add and configure regions for Gitspaces. Note that users will only be able to host Gitspaces in these defined regions. Use the following input parameters:

1. **Region Name**: Enter the region name. Refer to the GCP documentation to view available regions.
2. **IP Details**: Provide the IP configuration for each region.
3. **Sub-Domain**: Enter the sub-domain for each region. The root domain will match the one entered in the basic details. You can define a separate sub-domain per region.
4. **Runner VM Region**: Select the VM region where the runner and delegate will be set up for self-hosted Gitspaces.

### Download the Infra Config YAML

Once all details have been entered, click on **Download and Apply YAML**. This will generate the **Infra Config YAML**, which contains the entire Gitspace Infra configuration. This YAML is a mandatory input for [configuring and setting up the Harness Gitspaces Terraform Module](/docs/cloud-development-environments/self-hosted-gitspaces/gitspace-infra-terraform.md), which provisions the GCP infrastructure in your selected project.

## Managing Your Gitspace Infrastructure

### Editing Your Infra

_(Instructions TBD)_

### Deleting Your Infra

_(Instructions TBD)_

## Next Steps

Proceed to configure and apply the Terraform module to provision your self-hosted Gitspaces.
