---
title: Terraform Integration
sidebar_label: Terraform
sidebar_position: 9
description: Connect Terraform to Harness AI SRE to send apply events as deployment data.
keywords:
  - ai-sre
  - integrations
  - terraform
tags:
  - integrations
---

Terraform is an infrastructure-as-code tool for provisioning and managing infrastructure through declarative configuration.

## How AI SRE supports Terraform

AI SRE treats Terraform as a change source for the Deploy Change Investigator. Terraform sends apply events to an AI SRE endpoint as deployment data, and AI SRE records them as changes for correlation with incidents.

- **Apply events as deployment data:** Terraform apply events are ingested as deployments.
- **Change correlation:** AI SRE correlates the ingested apply events with active incidents during investigation.

## Set up Terraform

- Go to [Terraform change source](/docs/ai-sre/change/sources/terraform) to configure Terraform apply events as deployment data.

## Related integrations

- Go to [Octopus Deploy Integration](/docs/ai-sre/integrations/cicd-change/octopus-deploy) to send deployment webhooks from Octopus Deploy.
- Go to [Harness Pipelines Integration](/docs/ai-sre/integrations/cicd-change/harness-pipelines) to send build and deploy data and trigger pipelines from runbooks.
- Go to [Integration Management](/docs/ai-sre/integrations) to review all AI SRE integrations.
