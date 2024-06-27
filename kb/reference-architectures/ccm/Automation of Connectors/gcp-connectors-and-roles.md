---
title: Connectors + Roles for GCP CCM
description: Automatically Create Harness connectors for projects and IAM roles in each GCP project
---

# Overview

The process below defines how to provision Harness connectors and GCP IAM roles using Terraform.

## Permissions

You will need access to provision IAM roles in GCP and create CCM connectors in Harness.

## Setup Providers

We need to leverage the GCP and Harness Terraform providers. We will use these to create IAM roles and CCM connectors.  We also define a variable for the GCP service account.  We are pulling in a list of projects from a csv.

```
locals {
  # pull in accounts csv
  projects_raw = csvdecode(file("./projects.csv"))
  # only get linked account (ignore masters)
  projects = [for account in local.projects_raw : account if account["Type"] == "Linked Account"]
}

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

provider "google" {
  features {}
}

variable "harness_gcp_sa" {
  type = string
}
```

## Create roles in each GCP Project

First we will use the csv data to get all GCP projects. In this example, we are applying account-wide read only access as the role permission for all services. In the event we need to be able to do autostopping and asset governance enforcements, elevated permissions for compute and any other service you want to enforce must be granted.

```
resource "google_project_iam_member" "viewer" {
  for_each = { for project in local.projects : "${trimspace(project["Linked account id"])}" => project }

  project = trimspace(each.value["Linked account id"])
  role    = "roles/viewer"
  member  = "serviceAccount:${var.harness_gcp_sa}"
}
```

## Create a CCM connector for each GCP Project

Use the Harness provider to create a CCM connector for each GCP project from the csv file.  In this example, we are enabling recommendations (VISIBILITY), governance (GOVERNANCE), and autostopping (OPTIMIZATION)

```
resource "harness_platform_connector_gcp_cloud_cost" "this" {
  for_each = { for project in local.projects : "${trimspace(project["Linked account id"])}" => project }

  identifier = replace(trimspace(each.value["Linked account name"]), "-", "_")
  name       = replace(trimspace(each.value["Linked account name"]), "-", "_")

  features_enabled      = ["VISIBILITY", "OPTIMIZATION", "GOVERNANCE"]
  gcp_project_id        = trimspace(each.value["Linked account id"])
  service_account_email = var.harness_gcp_sa
}
```

## Conclusion

This is a general example of providing read only access for each connector inside of an GCP organization.  Policies will have to be added based on what other CCM features you want to use.  This example doesn't include setting up the connector for the billing export.