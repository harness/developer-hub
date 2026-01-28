---
title: Terraform Provider
sidebar_position: 92
description: Harness Chaos Engineering with Terraform
---

This guide walks you through integrating Harness Chaos Engineering into your infrastructure using the Harness Terraform provider. After setting up, you can easily design, schedule, and monitor chaos experiments through Harness Dashboard, ensuring your systems are resilient and production-ready.

## Overview
Harness simplifies chaos engineering with Terraform integration that enables you to:

- **Do Chaos Engineering across your environments** - Automate the setup of chaos environments and infrastructures. See [Infrastructure documentation](/docs/chaos-engineering).
- **Discover Services** - Automatically detect services for chaos experiments. See [Service Discovery documentation](/docs/chaos-engineering/guides/service-discovery).
- **Setup custom Image Registry** - Configure custom image registries for Harness Chaos Engineering workloads. See [Image Registry documentation](/docs/chaos-engineering/guides/image-registry).
- **Enforce Security** - Implement granular access controls and governance policies via Chaos Guard. See [Chaos Guard documentation](/docs/category/governance-1).
- **Manage ChaosHubs** - Manage custom ChaosHubs to provide organization, account or project level fault, probes and action templates. See [ChaosHub documentation](/docs/chaos-engineering/guides/chaoshub).

:::info
This Terraform provider for chaos engineering is currently supported for **Kubernetes infrastructures**.
:::

## Prerequisites

- **Terraform Setup**: For general Terraform installation and configuration, see the [official Terraform documentation](https://developer.hashicorp.com/terraform/tutorials/aws-get-started/install-cli)
- **Harness Provider**: For Harness-specific provider setup, refer to the [Platform Terraform documentation](/docs/platform/automation/terraform/harness-terraform-provider)
- **Service Discovery**: Service Discovery should be considered for enabling chaos engineering. For detailed information on setting up service discovery, refer to the [Platform Service Discovery documentation](/docs/platform/service-discovery/)

## Infrastructure Provisioning

Use these Terraform resources to set up your chaos engineering infrastructure:

### Common Configuration

First, define the common locals block that will be used across all resources:

```hcl
locals {
  // Use provided org_identifier or create a new one
  org_id = var.org_identifier != null ? var.org_identifier : harness_platform_organization.this[0].id

  // Use provided project_identifier or create a new one
  project_id = var.project_identifier != null ? var.project_identifier : (
    var.org_identifier != null ? "${var.org_identifier}_${replace(lower(var.project_name), " ", "_")}" : 
    "${harness_platform_organization.this[0].id}_${replace(lower(var.project_name), " ", "_")}"
  )

  // Common tags for all resources
  common_tags = merge(
    var.tags,
    {
      "module" = "harness-chaos-engineering"
    }
  )

  // Convert tags map to set of strings for resources that require it
  tags_set = [for k, v in local.common_tags : "${k}=${v}"]
}
```

### Chaos Infrastructure

Enable Chaos Engineering on existing Harness infrastructures or provision new ones.

:::note
To provision new infrastructures and enable Chaos Engineering in a single workflow, use [Harness Platform infrastructure resources](/docs/platform/automation/terraform/harness-terraform-provider) first, then apply Harness Chaos Engineering Terraform resources to enable chaos capabilities.
:::

**Resource**: `harness_chaos_infrastructure_v2`  
**Documentation**: [harness_chaos_infrastructure_v2](https://registry.terraform.io/providers/harness/harness/latest/docs/resources/chaos_infrastructure_v2)

```hcl
resource "harness_chaos_infrastructure_v2" "this" {
  // Required fields
  org_id         = "your_org_id"
  project_id     = "your_project_id"
  environment_id = "your_environment_id"
  infra_id       = "your_infrastructure_id"
  name           = "chaos-infra"
  description    = "Chaos Engineering Infrastructure"
}
```

### Service Discovery

Configure service discovery to automatically detect services for chaos experiments.

**Resource**: `harness_service_discovery_agent`  
**Documentation**: [service_discovery_agent](https://registry.terraform.io/providers/harness/harness/latest/docs/resources/service_discovery_agent)

```hcl
resource "harness_service_discovery_agent" "this" {
  // Required fields
  name                   = "service-discovery-agent"
  org_identifier        = "your_org_id"
  project_identifier    = "your_project_id"
  environment_identifier = "your_environment_id"
  infra_identifier      = "your_infrastructure_id"
  installation_type     = "kubernetes"

  config {
    kubernetes {
      namespace = "harness-delegate-ng"
    }
  }
}
```

### Image Registry

Configure custom image registries for chaos experiments.

**Resource**: `harness_chaos_image_registry`  
**Documentation**: [harness_chaos_image_registry](https://registry.terraform.io/providers/harness/harness/latest/docs/resources/chaos_image_registry)

```hcl
resource "harness_chaos_image_registry" "project_level" {
  // Required fields
  org_id     = "your_org_id"
  project_id = "your_project_id"

  registry_server  = "docker.io"
  registry_account = "your_registry_account"
}
```

### Security Governance

Define security governance rules and conditions for chaos experiments to ensure safe execution in production environments.

**Governance Conditions**: Define time windows, environment restrictions, and other conditions  
**Resource**: `harness_chaos_security_governance_condition`  
**Documentation**: [harness_chaos_security_governance_condition](https://registry.terraform.io/providers/harness/harness/latest/docs/resources/chaos_security_governance_condition)

```hcl
resource "harness_chaos_security_governance_condition" "this" {
  // Required fields
  name        = "block-destructive-faults"
  description = "Condition to block destructive experiments"
  org_id      = "your_org_id"
  project_id  = "your_project_id"
  infra_type  = "kubernetes"

  fault_spec {
    operator = "EQUAL"
    
    faults {
      fault_type = "pod-delete"
      name       = "pod-delete"
    }
  }
}
```

**Governance Rules**: Apply conditions to specific environments and define actions (block, warn, etc.)  
**Resource**: `harness_chaos_security_governance_rule`  
**Documentation**: [harness_chaos_security_governance_rule](https://registry.terraform.io/providers/harness/harness/latest/docs/resources/chaos_security_governance_rule)

```hcl
resource "harness_chaos_security_governance_rule" "this" {
  // Required fields
  name           = "production-safety-rule"
  description    = "Block destructive experiments in production"
  org_id         = "your_org_id"
  project_id     = "your_project_id"
  condition_ids  = [harness_chaos_security_governance_condition.this.id]
  user_group_ids = ["your_user_group_id"]
}
```

### ChaosHub Management

Manage custom ChaosHubs to provide organization, account or project level fault, probes and action templates.

**ChaosHub**: Connect Git repositories containing custom chaos experiments  
**Resource**: `harness_chaos_hub`  
**Documentation**: [harness_chaos_hub](https://registry.terraform.io/providers/harness/harness/latest/docs/resources/chaos_hub)

```hcl
resource "harness_chaos_hub" "this" {
  // Required fields
  org_id      = "your_org_id"
  project_id  = "your_project_id"
  name        = "custom-chaos-hub"
  description = "Custom ChaosHub for organization experiments"

  connector_id = "your_git_connector_id"
  repo_branch  = "main"
  repo_name    = "chaos-experiments"
}
```

**ChaosHub Sync**: Trigger synchronization of ChaosHub content  
**Resource**: `harness_chaos_hub_sync`  
**Documentation**: [harness_chaos_hub_sync](https://registry.terraform.io/providers/harness/harness/latest/docs/resources/chaos_hub_sync)


## After Infrastructure Setup

Once your infrastructure is provisioned:

1. **Service Discovery**: Your applications will be automatically discovered in the configured environments
2. **Create Experiments**: Use the Harness UI to manually create and configure your chaos experiments
3. **Run Experiments**: Execute experiments against your discovered services through the platform

## Next Steps

- **Terraform Resources**: [Harness Terraform Provider Documentation](https://registry.terraform.io/providers/harness/harness/latest/docs)
- **Platform Setup**: [Platform Terraform Documentation](/docs/platform/automation/terraform/harness-terraform-provider)
- **Create Experiments**: Start building your chaos experiments in the Harness UI after infrastructure deployment
