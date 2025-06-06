---
title: Configure Gitspace Infrastructure
description: Get Started with Harness CDE (Gitspaces)
sidebar_position: 2
sidebar_label: Configure Gitspace Infrastructure
---

In order to get started with self hosted Gitspaces, you'll first need to configure infrastructure for these Gitspaces. This infrastructure is where your Gitspaces will be hosted, thus you need to define and configure the same in Harness. This guide will take you through the detailed steps to configure your infrastructure in your Harness UI. 

## Prerequisites
- Ensure you've read through the fundamentals and prerequisites of self hosted gitspaces here. This helps you get a deeper understanding of all the basic concepts and steps involved with self hosted gitspaces. 
- Please make sure you are aware of the following details required in configuring your GCP Infrastructure for your Gitspaces as these details would be required in this step. Please refer to this table for detailed description on the inputs needed to configure your infrastructure. 
- Only **Gitspace Admins** with account level access can configure Gitspace Infrastructure. 
- Please ensure that your GCP project (to be defined in the infra config) has the following APIs enabled:   <ul><li>[Cloud Resource Manager API](https://cloud.google.com/resource-manager/reference/rest) - api/cloudresourcemanager.googleapis.com</li><li>[Compute Engine API](https://cloud.google.com/compute/docs/reference/rest/v1) - api/compute.googleapis.com</li><li>[Certificate Manager API](https://cloud.google.com/certificate-manager/docs/reference/certificate-manager/rest) - api/certificatemanager.googleapis.com</li><li>[Identity and Access Management (IAM) API](https://cloud.google.com/iam/docs/reference/rest) - api/iam.googleapis.com</li><li>[Cloud DNS API](https://cloud.google.com/dns/docs/reference/rest/v1) - api/dns.googleapis.com</li></ul> 

Here's a quick [reference guide](https://cloud.google.com/endpoints/docs/openapi/enable-api) to learn more about enabling APIs in your GCP project. 

## Configuring Gitspace Infrastructure
Configuring your Gitspace Infrastructure implies adding your infrastructure details in the Harness UI using the following steps. What this does is it generates an **Infra Config YAML** which is nothing but the entire infrastructure configuration stored in a YAML. This YAML is required as an input to run and apply the Harness Gitspace Terraform Module which essentially creates the GCP VM infrastructure. 

Follow the given steps to configure Gitspace Infrastructure in your Harness UI: 

### Access Gitspace Infrastructure 
1. If you have the **Gitspace Admin** role and has account-level access, you can configure this Gitspace infrastructure. 
2. Go to the **Cloud Development Environments** module and go to your **Account Settings**. 
3. Select **Gitspace Infrastructure** from the side-navbar once you're into your Account Settings. 

### Provide Basic Infrastructure Details 
1. **Infrastructure Name**: Start by giving your Gitspace infra any preferred name. You can select this while creating your Gitspaces. 
2. **GCP Project**: Enter your GCP Project Name. Make sure this is the project where you'll also create your GCP VM Instance to host your Gitspaces. 
3. **Domain**: Enter the domain on which all your Gitspaces created in this infrastructure will be accessible. 
4. **Gateway Machine Type**: Enter the VM Machine Type required for your Gateway. 

### Configure Regions
You can add and configure regions for your Gitspaces. Ensure that users will be only able to host Gitspaces in these regions using the following input parameters: 
1. **Region Name**: Enter the **Region Name**. Please refer to this guide to learn more about the different regions available. 
2. **IP Details**: Enter the IP details for each region. 
3. **Sub Domain**: Enter the **Sub-Domain** required to run for each region. The domain will be same as what's entered before in the Basic Details, you can add a different sub-domain for every region. 
4. **Runner VM Region**: Select the VM Instance region where your runner and delegate will be set up for self hosted Gitspaces. 

### Download the Infra Config YAML 
Once you have added all the details, click on **Download and Apply YAML**. This generates an **Infra Config YAML** which is nothing but the entire Gitspace Infra specified above, stored in a YAML file. This YAML is a mandatory input parameter to [configure and setup the Harness Gitspaces Terraform module](/docs/cloud-development-environments/self-hosted-gitspaces/gitspace-infra-terraform.md) (which in turn creates the GCP infrastructure in your specified project).

## Managing your Gitspace Infrastructure 

### Editing your Infra

### Deleting your Infra

## Next Steps
