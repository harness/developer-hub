---
title: Terraform Provider
sidebar_position: 92
description: Use Terraform to provision chaos infrastructure and enable service discovery
---

This guide shows how to use the Harness Terraform provider to provision chaos engineering infrastructure and enable service discovery. Once your infrastructure is ready, you can design and execute your chaos experiments through the Harness platform's intuitive interface.

## Overview

Harness provides Terraform resources to help you:
- **Provision chaos infrastructure** across your environments
- **Enable service discovery** for your applications
- **Configure governance and security policies**
- **Set up custom ChaosHubs** for your organization

Once your infrastructure is ready, you can design and execute your chaos experiments using the Harness platform.

## Prerequisites

- **Terraform Setup**: For general Terraform installation and configuration, see the [official Terraform documentation](https://developer.hashicorp.com/terraform/tutorials/aws-get-started/install-cli)
- **Harness Provider**: For Harness-specific provider setup, refer to the [Platform Terraform documentation](/docs/platform/automation/terraform/harness-terraform-provider)

## Infrastructure Provisioning

Use these Terraform resources to set up your chaos engineering infrastructure:

### Chaos Infrastructure

Provision chaos infrastructure to enable chaos experiments in your environments.

**Resource**: `harness_chaos_infrastructure_v2`  
**Documentation**: [harness_chaos_infrastructure_v2](https://registry.terraform.io/providers/harness/harness/latest/docs/resources/chaos_infrastructure_v2)

### Image Registry

Configure custom image registries for chaos experiments.

**Resource**: `harness_chaos_image_registry`  
**Documentation**: [harness_chaos_image_registry](https://registry.terraform.io/providers/harness/harness/latest/docs/resources/chaos_image_registry)

### Security Governance

Define security governance rules and conditions for chaos experiments to ensure safe execution in production environments.

**Governance Conditions**: Define time windows, environment restrictions, and other conditions  
**Resource**: `harness_chaos_security_governance_condition`  
**Documentation**: [harness_chaos_security_governance_condition](https://registry.terraform.io/providers/harness/harness/latest/docs/resources/chaos_security_governance_condition)

**Governance Rules**: Apply conditions to specific environments and define actions (block, warn, etc.)  
**Resource**: `harness_chaos_security_governance_rule`  
**Documentation**: [harness_chaos_security_governance_rule](https://registry.terraform.io/providers/harness/harness/latest/docs/resources/chaos_security_governance_rule)

### ChaosHub Management

Manage custom ChaosHubs to provide organization-specific chaos experiments from your Git repositories.

**ChaosHub**: Connect Git repositories containing custom chaos experiments  
**Resource**: `harness_chaos_hub`  
**Documentation**: [harness_chaos_hub](https://registry.terraform.io/providers/harness/harness/latest/docs/resources/chaos_hub)

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
