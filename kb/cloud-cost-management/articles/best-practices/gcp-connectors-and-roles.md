---
title: Connectors + Roles For GCP CCM
description: Automatically create Harness connectors for projects and IAM roles in each GCP subscription
---

# Overview

The process below defines how to provision Harness connectors and GCP IAM roles using Terraform.

## Permissions

You will need access to provision IAM roles in GCP and create CCM connectors in Harness.

## Setup Providers

We need to leverage the GCP and Harness Terraform providers. We will use these to create IAM roles and CCM connectors. We also will get all GCP subscriptions and set the Harness service account.  To get all subscriptions, we are filtering on the parent folder  [This](https://registry.terraform.io/providers/hashicorp/google/latest/docs/data-sources/projects) document describes other ways to get a list of projects such as at the organization level.  

You should already have a billing connector in your GCP organization for the project that has the billing export.  To find this connector, go to the Harness UI -> Account Settings -> Connectors -> Click on the GCP connector that has the billing export -> Toggle the YAML view -> Copy the value for 'serviceAccountEmail'.

You can get the hierarchical structure of a project by running this gcloud CLI command:
```
gcloud projects get-ancestors {projectId}
```

You can get the complete project list in your organization by running:
```
gcloud projects list
```

```
terraform {
  required_providers {
    harness = {
      source = "harness/harness"
    }
    google = {
      source = "google"
    }
  }
}

provider "google" {}

provider "harness" {}

variable "harness_gcp_sa" {
  type = string
}
```

## Get Projects And Create Connectors

There are two options to retrieve the projects we want to create connectors for.  We'll use the Harness provider to create a CCM connector for each GCP project after we retrieve them. We are enabling recommendations (VISIBILITY), governance (GOVERNANCE), and autostopping (OPTIMIZATION).

### Use The Google Provider To Get All Projects In The Organization

Get all projects in a specific folder:
```
data "google_projects" "my-org-projects" {
  filter = "parent.type:folder parent.id:0123456789"
}
```

Get all projects in an organization:
```
data "google_projects" "my-org-projects" {
  filter = "name:*"
}
```

```
resource "harness_platform_connector_gcp_cloud_cost" "this" {
  for_each = { for project in data.google_projects.my-org-projects.projects : project.project_id => project }

  identifier = replace(each.value.project_id, "-", "_")
  name       = each.value.name

  features_enabled      = ["VISIBILITY", "OPTIMIZATION", "GOVERNANCE"]
  gcp_project_id        = each.value.project_id
  # gcp_project_id        = each.key
  service_account_email = var.harness_gcp_sa
}
```


### Use The Built In Locals Value To Define The Projects Statically
This is useful when you don't have a solid naming convention and you want to apply certain features to different projects.  For example, you want to only apply autostopping in non-prod projects.  This is also useful when you can't authenticate to the GCP organization.

```
locals {
  gcp-non-prod = ['project-1', 'project-2']
  gcp-prod = ['project-3', 'project-4']
}

resource "harness_platform_connector_gcp_cloud_cost" "this" {
  for_each = toset(concat(local.gcp-non-prod, local.gcp-prod))

  identifier = "gcp${replace(replace(trimspace(each.key), "-", "_"), " ", "_")}"
  name = "aws${replace(replace(trimspace(each.key), "-", "_"), " ", "_")}"

  features_enabled      = ["VISIBILITY", "OPTIMIZATION", "GOVERNANCE"]
  gcp_project_id        = each.key
  service_account_email = var.harness_gcp_sa
}
```

## Create Roles In Each GCP Project
Your organization probably already has a process to do this.  When this is the case, defer to that process.  Below is an alternative.

## Create Role In Each GCP Project via Terraform

There are two examples. One is project-wide viewer (read-only) access and the other is project-wide editor access. Based on your needs in Harness, choose the minimum amount of permissions needed.

Note:  If you give the Harness service account the appropriate permissions across your entire organization via the GCP console, you do not have to use the below Terraform to give permissions for each project.  These are written using the Google provider to get all projects.  If you are using the locals value to statically define the projects, the logic for the loop and project will have to be modified.

```
# for view access
resource "google_project_iam_member" "viewer" {
  for_each = { for project in data.google_projects.my-org-projects.projects : project.project_id => project }

  project = each.value.project_id
  role    = "roles/viewer"
  member  = "serviceAccount:${var.harness_gcp_sa}"
}

# for editor access
resource "google_project_iam_member" "editor" {
  for_each = { for project in data.google_projects.my-org-projects.projects : project.project_id => project }

  project = each.value.project_id
  role    = "roles/editor"
  member  = "serviceAccount:${var.harness_gcp_sa}"
}
```

## Conclusion

This is a general example of providing either viewer or reditor access for each connector inside of a GCP folder. This example doesn't include setting up the connector for the billing export. This guide assumes there already exists a connector in a GCP project that has the billing export and an existing connector for the billing data has already registered and imported the Harness service account in the organization.

## Supplemental Information

[Here](https://registry.terraform.io/providers/harness/harness/latest/docs) is the Terraform documentation for the Harness provider.

[Here](https://registry.terraform.io/providers/hashicorp/google/latest/docs) is the Terraform documentation for the GCP provider.

[Here](https://cloud.google.com/resource-manager/docs/apis) is the GCP API documentation.