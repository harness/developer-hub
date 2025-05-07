---
title: Configure Gitspace Infrastructure
description: Get Started with Harness CDE (Gitspaces)
sidebar_position: 3
sidebar_label: Configure Gitspace Infrastructure
---

This guide will take you through the prerequisites and detailed steps on how to configure your infrastructure for your Self Hosted Gitspaces from your Harness UI. You can configure your GCP infrastructure for the first time and also edit/update the infrastructure details post configuring. 


## Prerequisites
You need to follow these prerequisites to get started with self hosted Gitspaces: 
| **Prerequisite**    | **Description** | **Documentation Guide** | 
| -------- | ------- | ---------- | 
| **GCP VM Instance**  | You must have an active GCP VM Instance in your GCP Project to create and start your self hosted Gitspaces.   | [Guide](https://cloud.google.com/compute/docs/instances/create-start-instance) |
| **Enable APIs in GCP Project** | Your GCP Project (where your have created your GCP VM Instance) should have the following APIs enabled:  <ul><li>[Cloud Resource Manager API](https://cloud.google.com/resource-manager/reference/rest) - api/cloudresourcemanager.googleapis.com</li><li>[Compute Engine API](https://cloud.google.com/compute/docs/reference/rest/v1) - api/compute.googleapis.com</li><li>[Certificate Manager API](https://cloud.google.com/certificate-manager/docs/reference/certificate-manager/rest) - api/certificatemanager.googleapis.com</li><li>[Identity and Access Management (IAM) API](https://cloud.google.com/iam/docs/reference/rest) - api/iam.googleapis.com</li><li>[Cloud DNS API](https://cloud.google.com/dns/docs/reference/rest/v1) - api/dns.googleapis.com</li></ul>   | [Guide](https://cloud.google.com/endpoints/docs/openapi/enable-api) |
| **Service Account** | You must have a Service Account in the same GCP Project where you have your GCP VM Instance. | [Guide](https://cloud.google.com/iam/docs/service-accounts-create) | 
| **Service Account Key** | You must create and download a Service Account Key in the same GCP Project and service account, this key is usually in the form of a **JSON** or **P12 file**, which contains the credentials necessary for the service account to authenticate. | [Guide](https://cloud.google.com/iam/docs/keys-create-delete) | 
| **OpenTofu / Terraform** | You must have OpenTofu or Terraform installed on your machine with internet access (please ensure you have the SA key downloaded here) | <ul><li>[OpenTofu Installation Guide](https://opentofu.org/docs/intro/install/)</li><li>[Terraform Installation Guide](https://developer.hashicorp.com/terraform/tutorials/aws-get-started/install-cli)</li></ul> | 

