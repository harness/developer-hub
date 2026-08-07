---
title: Octopus Deploy Integration
sidebar_label: Octopus Deploy
sidebar_position: 8
description: Send deployment data as a source of change correlated to incidents.
keywords:
  - ai-sre
  - integrations
  - octopus-deploy
tags:
  - integrations
---

Octopus Deploy is a deployment automation and release management platform for shipping software to multiple environments.

## How AI SRE supports Octopus Deploy

AI SRE treats Octopus Deploy as a change source for the [Deploy Change Investigator](/docs/ai-sre/change/deploy-change-investigator). Octopus Deploy POSTs deployment webhooks to an AI SRE endpoint, and AI SRE records them as changes for correlation with incidents.

- **Deployment webhooks:** Octopus Deploy sends deployment events to AI SRE over HTTP.
- **Change correlation:** AI SRE correlates the ingested deployments with active incidents during investigation.

## Set up Octopus Deploy

Configure Octopus Deploy as a change source with the following step:

- Go to [Octopus Deploy webhook template](/docs/ai-sre/alerts/webhooks/templates/cicd/octopus-deploy) to configure the deployment webhooks from Octopus Deploy.

## Next steps

- Go to [Jenkins Integration](/docs/ai-sre/integrations/cicd-change/jenkins) to send build and deploy webhooks from Jenkins pipelines.
- Go to [Terraform Integration](/docs/ai-sre/integrations/cicd-change/terraform) to send Terraform apply events as deployment data.
- Go to [Integration Management](/docs/ai-sre/integrations) to review all AI SRE integrations.
