---
title: Terraform Provider
sidebar_position: 92
description: Learn how to manage Harness Chaos Engineering resources using Terraform
---

This guide explains how to use the Harness Terraform provider to manage Chaos Engineering resources as infrastructure as code.

## Overview

The Harness Terraform provider allows you to manage your Chaos Engineering infrastructure, experiments, and configurations declaratively. This enables version control, reproducibility, and automation of your chaos engineering setup.

## Prerequisites

Before you begin, ensure you have:

- Terraform installed (version 0.13 or later)
- A Harness account with Chaos Engineering module enabled
- Harness API key and account ID
- Basic understanding of Terraform configuration syntax

## Terraform Setup

For general Terraform setup and configuration with Harness, refer to the [Platform documentation on Terraform](/docs/platform/automation/terraform/harness-terraform-provider).

## Provider Configuration

Configure the Harness provider in your Terraform configuration:

```hcl
terraform {
  required_providers {
    harness = {
      source  = "harness/harness"
      version = "~> 0.14"
    }
  }
}

provider "harness" {
  endpoint   = "https://app.harness.io/gateway"
  account_id = var.harness_account_id
  api_key    = var.harness_api_key
}
```

## Available Chaos Engineering Resources

The Harness Terraform provider supports the following Chaos Engineering resources:

### Chaos Infrastructure

Manage chaos infrastructure installations across your environments.

```hcl
resource "harness_chaos_infrastructure_v2" "example" {
  identifier    = "my-chaos-infra"
  name         = "My Chaos Infrastructure"
  description  = "Chaos infrastructure for production environment"
  
  environment_ref = "prod"
  
  deployment_scope = "NAMESPACE"
  
  # For Kubernetes infrastructure
  platform_name = "KUBERNETES"
  namespace     = "harness-chaos-engineering"
  
  # Service account configuration
  service_account = "harness-chaos"
  
  # Optional: Skip SSL verification
  skip_ssl = false
  
  # Optional: Node selector
  node_selector = {
    "kubernetes.io/os" = "linux"
  }
  
  # Optional: Tolerations
  tolerations = [
    {
      key      = "node-role.kubernetes.io/control-plane"
      operator = "Exists"
      effect   = "NoSchedule"
    }
  ]
}
```

**Documentation**: [harness_chaos_infrastructure_v2](https://registry.terraform.io/providers/harness/harness/latest/docs/resources/chaos_infrastructure_v2)

### Image Registry

Configure custom image registries for chaos experiments.

```hcl
resource "harness_chaos_image_registry" "example" {
  identifier  = "my-registry"
  name       = "My Custom Registry"
  description = "Custom image registry for chaos experiments"
  
  url      = "https://my-registry.example.com"
  username = var.registry_username
  password = var.registry_password
  
  # Optional: Enable SSL verification
  enable_ssl = true
}
```

**Documentation**: [harness_chaos_image_registry](https://registry.terraform.io/providers/harness/harness/latest/docs/resources/chaos_image_registry)

### Security Governance

Define security governance rules and conditions for chaos experiments.

#### Governance Conditions

```hcl
resource "harness_chaos_security_governance_condition" "example" {
  identifier  = "production-hours"
  name       = "Production Hours Only"
  description = "Allow chaos experiments only during business hours"
  
  # Time-based condition
  condition_type = "TIME_WINDOW"
  
  spec = jsonencode({
    timezone = "America/New_York"
    windows = [
      {
        days = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY"]
        start_time = "09:00"
        end_time = "17:00"
      }
    ]
  })
}
```

**Documentation**: [harness_chaos_security_governance_condition](https://registry.terraform.io/providers/harness/harness/latest/docs/resources/chaos_security_governance_condition)

#### Governance Rules

```hcl
resource "harness_chaos_security_governance_rule" "example" {
  identifier  = "production-safety-rule"
  name       = "Production Safety Rule"
  description = "Governance rule for production chaos experiments"
  
  # Rule applies to production environment
  environment_refs = ["prod"]
  
  # Reference governance conditions
  condition_refs = [
    harness_chaos_security_governance_condition.example.identifier
  ]
  
  # Rule configuration
  action = "BLOCK"
  
  # Optional: Rule priority
  priority = 100
}
```

**Documentation**: [harness_chaos_security_governance_rule](https://registry.terraform.io/providers/harness/harness/latest/docs/resources/chaos_security_governance_rule)

### ChaosHub Management

Manage custom ChaosHubs and synchronization.

#### ChaosHub

```hcl
resource "harness_chaos_hub" "example" {
  identifier  = "my-custom-hub"
  name       = "My Custom ChaosHub"
  description = "Custom hub with organization-specific experiments"
  
  # Git repository configuration
  repo_url    = "https://github.com/myorg/chaos-experiments"
  repo_branch = "main"
  
  # Authentication (for private repositories)
  auth_type = "TOKEN"
  token     = var.github_token
  
  # Optional: Specific path in repository
  repo_path = "experiments/"
}
```

**Documentation**: [harness_chaos_hub](https://registry.terraform.io/providers/harness/harness/latest/docs/resources/chaos_hub)

#### ChaosHub Sync

```hcl
resource "harness_chaos_hub_sync" "example" {
  identifier = harness_chaos_hub.example.identifier
  
  # Trigger sync on apply
  sync = true
  
  # Optional: Force sync even if no changes detected
  force_sync = false
}
```

**Documentation**: [harness_chaos_hub_sync](https://registry.terraform.io/providers/harness/harness/latest/docs/resources/chaos_hub_sync)

## Complete Example

Here's a complete example that sets up a chaos engineering environment:

```hcl
# Variables
variable "harness_account_id" {
  description = "Harness account ID"
  type        = string
}

variable "harness_api_key" {
  description = "Harness API key"
  type        = string
  sensitive   = true
}

# Provider configuration
terraform {
  required_providers {
    harness = {
      source  = "harness/harness"
      version = "~> 0.14"
    }
  }
}

provider "harness" {
  endpoint   = "https://app.harness.io/gateway"
  account_id = var.harness_account_id
  api_key    = var.harness_api_key
}

# Custom ChaosHub
resource "harness_chaos_hub" "company_hub" {
  identifier  = "company-chaos-hub"
  name       = "Company Chaos Hub"
  description = "Custom experiments for our infrastructure"
  
  repo_url    = "https://github.com/company/chaos-experiments"
  repo_branch = "main"
  auth_type   = "ANONYMOUS"
}

# Governance condition for business hours
resource "harness_chaos_security_governance_condition" "business_hours" {
  identifier  = "business-hours-only"
  name       = "Business Hours Only"
  description = "Allow experiments only during business hours"
  
  condition_type = "TIME_WINDOW"
  
  spec = jsonencode({
    timezone = "UTC"
    windows = [
      {
        days = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY"]
        start_time = "09:00"
        end_time = "17:00"
      }
    ]
  })
}

# Governance rule
resource "harness_chaos_security_governance_rule" "production_rule" {
  identifier  = "prod-safety-rule"
  name       = "Production Safety Rule"
  description = "Safety rule for production environment"
  
  environment_refs = ["prod"]
  condition_refs   = [harness_chaos_security_governance_condition.business_hours.identifier]
  
  action   = "WARN"
  priority = 100
}

# Chaos infrastructure for Kubernetes
resource "harness_chaos_infrastructure_v2" "k8s_infra" {
  identifier  = "k8s-chaos-infra"
  name       = "Kubernetes Chaos Infrastructure"
  description = "Chaos infrastructure for Kubernetes cluster"
  
  environment_ref = "prod"
  
  deployment_scope = "NAMESPACE"
  platform_name    = "KUBERNETES"
  namespace        = "harness-chaos-engineering"
  
  service_account = "harness-chaos"
  
  node_selector = {
    "kubernetes.io/os" = "linux"
  }
}

# Custom image registry
resource "harness_chaos_image_registry" "private_registry" {
  identifier  = "company-registry"
  name       = "Company Private Registry"
  description = "Private registry for chaos experiment images"
  
  url        = "https://registry.company.com"
  username   = "chaos-user"
  password   = var.registry_password
  enable_ssl = true
}
```

## Next Steps

- [Harness Terraform Provider Documentation](https://registry.terraform.io/providers/harness/harness/latest/docs)
- [Platform Terraform Documentation](/docs/platform/automation/terraform/harness-terraform-provider)
- [Terraform Best Practices](https://www.terraform.io/docs/cloud/guides/recommended-practices)
