---
description: KB - Create a Resource group via Terraform with "Specified Orgs (with Projects) and Account Level resources included". 
---
# Create a Resource group via Terraform with "Specified Orgs (with Projects) and Account Level resources included"

## Introduction
A Resource Group is a collection of Harness resources where permissions apply. Permissions granted to a user or user group through a Role will affect the resources within the Resource Group.

More details on this here: https://developer.harness.io/docs/platform/role-based-access-control/add-resource-groups/

Terraform is a tool for managing and provisioning infrastructure through code. With Terraform, you can efficiently build, modify, and version both low-level components (e.g., compute instances, storage, networking) and high-level components (e.g., DNS entries, SaaS features).

The Harness Terraform Provider is a library that facilitates the creation of Harness Infrastructure. By using the Harness Terraform Provider, you can administer and leverage Harness functionality directly within your Terraform setup. It acts as an interface to the Harness API, enabling you to seamlessly create and manage Harness infrastructure using Terraform commands.

More details on this here: https://developer.harness.io/docs/platform/resource-development/terraform/harness-terraform-provider-overview/
## Problem statement

How to create a Create Resource group via Terraform with "Specified Orgs (with Projects) and Account Level resources included". 

## Steps to achieve this usecase
Here is the sample code that you can use to achieve this requirement:

```
resource "harness_platform_resource_group" "example" {
  name                 = "example-resource-group1"
  identifier           = "hey1a"
  description          = "Example resource group"
  account_id = "<your-account-id>"
  allowed_scope_levels = ["account"]
  included_scopes {
    filter     = "EXCLUDING_CHILD_SCOPES"
      account_id = "<your-account-id>"
  }
  included_scopes {
    filter     = "EXCLUDING_CHILD_SCOPES"
      account_id = "<your-account-id>"
      org_id     = "<your-org-id>"
      project_id = "<your-project-id>"
  }
  # can add more scopes as per your requirement
  resource_filter {
    include_all_resources = true
  }
}
```

This is how you can use a Terraform provision code to create a resource group via Terraform with "specified orgs (with Projects) and Account Level resources included.
 