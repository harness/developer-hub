---
title: Upgrade to service and environment v2
description: Learn about the v2 enhanced experience
sidebar_position: 2
---

:::info

This is an End of Life (EOL) notice for the CD NextGen service and environment v1 experience.

:::

To provide the best software delivery experience for our customers, Harness has introduced an enhanced experience for service and environment entities in the CD NextGen platform. We have named this enhanced experience **service and environment v2**.

**The v2 experience goes into effect as the default experience on Jan 31, 2023.**

Except for specific Harness accounts, the current v1 experience will be removed from all accounts on that date.

## Why make the change?

Service and environment v1 tied the service and environment entities to the pipelines where they were defined. This prevented you from making a change to a service or environment and having it updated in multiple pipelines at once.

The new v2 experience is designed to provided users and organizations with a simpler configuration and the ability to scale deployments using services and environments.

Service and environment v2 makes services and environments their own entities:

- All management of services and environments (CRUD) is centralized in their entity definitions.
- A service or environment can be used in multiple stages, but a service's definition is part of the service entity and an environment's infrastructures are part of the environment entity.
  - The result is that you can make a change to a service or environment and have that change reflected in every instance of that service or environment.
- Services and environments (v2) is more robust and includes service variables, independent infrastructure definitions, and the ability to override files and variables. 

When adopting v2, you will notice an overall reduction in configuration included in your pipelines. These changes are also reflected in Harness APIs.

### Deployment types

All current and new deployment types are only available on the new v2 experience (Kubernetes, ECS, Deployment Templates, SSH, WinRM, etc.). 

New innovations such as Enterprise GitOps, support for multi-service and multi-environment deployments, along with the ability to group environments are also be based on the v2 experience. 

## Customer impact

Please review the following summaries and dates for the switch to v2.

### Existing Harness users and projects

There is no impact on your existing pipelines using v1 services and environments. 

After 1/31/2023, when you create a new stage in an existing pipeline, the v2 experience will be the default. 

### New Harness users and projects

Please note that any new services and environments that are created in	Harness will be on the new v2 experience. 

## API

Harness introduced two new APIs to support the v2 experience. For more information, go to [Reference links](#reference-links) below.

Customers will need to update their service/environment automation to use the v2 APIs. 

## How to migrate

Harness is happy to assist your migration to the new v2 experience. 

For any questions or comments, please contact `support@harness.io` or your Harness Customer Support Manager. Together we can work through discovery, migration planning, and assist with the process.

## Links

The following links will help you learn about v2 and use the API and Harness Terraform Provider to create new services and environments.

- [Services and environments overview](../cd-concepts/services-and-environments-overview.md)
- [Video overview](https://youtu.be/02RIvOGd0zg) 
- API docs:
  - [Create an Environment](https://apidocs.harness.io/tag/Environments#operation/createEnvironmentV2)
  - [Create a Service](https://apidocs.harness.io/tag/Services/#operation/createServiceV2)
- Terraform Provider:
  - [harness_platform_service (Resource)](https://registry.terraform.io/providers/harness/harness/latest/docs/resources/platform_service)
  - [harness_platform_environment (Resource)](https://registry.terraform.io/providers/harness/harness/latest/docs/resources/platform_environment)
  - [harness_platform_infrastructure (Resource)](https://registry.terraform.io/providers/harness/harness/latest/docs/resources/platform_infrastructure)



