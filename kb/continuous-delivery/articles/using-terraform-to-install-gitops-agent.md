---
description: KB - Using Terraform to install Gitops agent
title: Using Terraform to install Gitops agent
---

This article prpvides a working example of how you can configure a Harness Gitops agent using Terraform.

## Prerequisites

Before you start, ensure you have the following:

- **Terraform Installed**: Download and install Terraform on your local machine.
- **Kubernetes Cluster**: Access to a Kubernetes cluster (for example, Minikube, EKS, or GKE).
- **kubectl**: The Kubernetes command-line tool to configure your cluster.
- **API Key**: Your [Harness API key](/docs/platform/automation/api/add-and-manage-api-keys/) for authentication.

You can follow the steps below to configure a Harness Gitops agent. Some steps required creating a file for which a working example is provided accordingly.

**Step 1: Configure the Terraform Provider**

To set up the Terraform provider for Harness, create a file named `provider.tf`.

```hcl
terraform {  
    required_providers {  
        harness = {  
            source = "harness/harness"  
            version = "0.24.2"  
        }
    }
}  

provider "harness" {  
    endpoint   = "https://app.harness.io/gateway"  
    account_id = var.account_id  
    platform_api_key = var.harness_api_key 
}
```

**Step 2: Define Variables**

Create a `variables.tf` file to define the necessary variables.

```hcl
variable "harness_api_key" {
  description = "Harness API Key"
  type        = string
}

variable "account_id" {
  description = "Harness Account ID"
  type        = string
}

variable "project_id" {
  description = "Harness Project ID"
  type        = string
}

variable "org_id" {
    type = string
    default = ""
}

variable "agent_name" {
    type = string
    default = ""
}

variable "agent_namespace" {
    type = string
    default = ""
}

variable "agent_identifier" {
    type = string
    default = ""
}
```

**Step 3: Install the GitOps Agent**

Define the GitOps agent resource in a new file named `gitops_agent.tf`.

```hcl
resource "harness_platform_gitops_agent" "gitops_agent" {
  identifier = var.agent_identifier
  account_id = var.account_id
  project_id = var.project_id
  org_id     = var.org_id
  name       = var.agent_name
  type       = "MANAGED_ARGO_PROVIDER"
  metadata {
    namespace         = var.agent_namespace
    high_availability = false
  }
}
```

The following fields are mandatory:

- **account_id** (String): Account identifier of the GitOps agent.
- **identifier** (String): Identifier of the GitOps agent.
- **name** (String): Name of the GitOps agent.
- **type** (String) Default: "MANAGED_ARGO_PROVIDER", Enum: "CONNECTED_ARGO_PROVIDER", "MANAGED_ARGO_PROVIDER"

The following fields are optional:

- **description** (String): Description of the GitOps agent.
- **metadata** (Block List, Max: 1): Metadata of the agent.
- **operator** (String): The operator to use for the Harness GitOps agent. Enum: "ARGO" "FLAMINGO"
- **org_id** (String): Organization identifier of the GitOps agent.
- **project_id** (String): Project identifier of the GitOps agent.
- **tags** (Map of String): Tags for the GitOps agents. You can use these to search or filter the GitOps agents.

You can find more details in the [Harness Terraform Registry](https://registry.terraform.io/providers/harness/harness/latest/docs/resources/platform_gitops_agent).

**Step 4: Initialize Terraform**

With your configurations ready, execute the following steps to initiate Terraform.

```bash
terraform init
```

**Step 5: Set values to variables**

Set values to the variables required for your resources in a new file named `terraform.tfvars`

```
project_id		= "your_project_id"
org_id			= "default"
agent_identifier	= "terraform-agent"
agent_name		= "terraform-agent"
agent_namespace		= "default"
```

Change the variable values based on your environment.

Set the `account_id` and `harness_api_token` as Terraform environment variables. You can find your `Account ID` in the URL after the `account/` once you log into [app.harness.io](https://app.harness.io).

```
export TV_VAR_account_id="123abcXXXXXXXX"
export TV_VAR_harness_api_key="pat.abc123xxxxxxxxxx…"
```

**Step 6: Apply Terraform**

- Preview the changes that Terraform makes in Harness and in your cluster.

  ```bash
  terraform plan
  ```

- Apply the Terraform configuration to create the Harness GitOps agent and the cluster resources. Type **yes** to confirm when prompted.

  ```bash
  terraform apply
  ```

Observe the output of `terraform apply` command as your resources are created. It may take a few minutes for all the resources to be provisioned.

## Verify GitOps deployment

Log into [https://app.harness.io](https://app.harness.io). Select **Deployments**->**GitOps**.

   - Select **Settings** on the top right corner of the page, and then select **GitOps Agents**.
   - Verify that your GitOps agent is listed.


## Conclusion
In this article, you learnt how to create and configure a GitOps agent using Terraform provider with a hand-held example.