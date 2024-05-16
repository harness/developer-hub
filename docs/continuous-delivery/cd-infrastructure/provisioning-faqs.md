---
title: General Provisioning FAQs
description: Frequently asked questions about provisioning
sidebar_position: 10
---

### Does Harness support Cosmos DB?

Harness doesn’t do database orchestration out of the box today. To orchestrate the SQL Changes to the database, you need to customize our functionality using the following:

- [Container step](/docs/continuous-delivery/x-platform-cd-features/cd-steps/utilities/container-step)
- [Container step group](/docs/continuous-delivery/x-platform-cd-features/cd-steps/containerized-steps/containerized-step-groups) 
- [Shell Script step](/docs/continuous-delivery/x-platform-cd-features/cd-steps/utilities/shell-script-step) 
- [Shell Script Provisioner](/docs/continuous-delivery/cd-infrastructure/shell-script-provisioning) 

To create a Cosmos DB, we support the creation via:

- [Azure ARM](/docs/continuous-delivery/cd-infrastructure/azure-arm-provisioning) 
- [Azure Blueprint](/docs/continuous-delivery/cd-infrastructure/azure-blueprint-provisioning) 
- [Terraform](/docs/continuous-delivery/cd-infrastructure/terraform-infra/terraform-provisioning-with-harness)

### Does Harness support Azure Cache?

Azure Cache is not an application that a user deploys. It’s a managed Redis service by Azure. Harness can assist in spinning up Azure Cache by our infrastructure provisioning capabilities:

- [Azure ARM](/docs/continuous-delivery/cd-infrastructure/azure-arm-provisioning) 
- [Azure Blueprint](/docs/continuous-delivery/cd-infrastructure/azure-blueprint-provisioning) 
- [Terraform](/docs/continuous-delivery/cd-infrastructure/terraform-infra/terraform-provisioning-with-harness) 

### Does Harness support Azure App Services?

No, we do not support Azure App Services as a native swimlane like Azure Web Apps.

We do support [deployment templates](/docs/continuous-delivery/deploy-srv-diff-platforms/custom-deployment-tutorial) to achieve the use case.

Or you can orchestrate the release via: 

- [Azure ARM](/docs/continuous-delivery/cd-infrastructure/azure-arm-provisioning) 
- [Azure Blueprint](/docs/continuous-delivery/cd-infrastructure/azure-blueprint-provisioning) 
- [Terraform](/docs/continuous-delivery/cd-infrastructure/terraform-infra/terraform-provisioning-with-harness)