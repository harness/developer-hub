---
title: Set Up Integration Management
sidebar_label: Overview
sidebar_position: 0
description: Connect Harness AI SRE to monitoring, CI/CD, ticketing, communication, and on-call tools through webhooks, connectors, and native integrations.
keywords:
  - ai-sre
  - integrations
  - webhooks
  - connectors
tags:
  - integrations
---

Harness AI SRE connects to the tools you already use across monitoring, CI/CD, ticketing, communication, and on-call. Each integration feeds AI SRE the signals it needs to detect, investigate, and resolve incidents, or lets AI SRE act on those tools during a response.

## How AI SRE integrates with external tools

AI SRE supports external technologies through four mechanisms. A single technology can use more than one.

- **Alert webhooks:** Monitoring and observability tools POST alerts to an AI SRE webhook URL, which creates or updates incidents. Go to [Set Up Alert Management](/docs/ai-sre/alerts/webhooks/overview) to configure webhooks.
- **Change sources:** CI/CD tools and source control send build, deploy, and pull request data to the Deploy Change Investigator for incident correlation. Go to [Configure Sources of Change](/docs/ai-sre/change/sources/overview) to configure change sources.
- **Runbook actions:** Runbooks call out to communication, ticketing, and incident-management tools to automate response. Go to [Set Up Runbook Management](/docs/ai-sre/runbooks/integrations/overview) to configure runbook actions.
- **On-call sync:** On-call tools synchronize their schedules and escalation policies into AI SRE. Go to [Set Up On-Call Management](/docs/ai-sre/oncall) to configure on-call sync.

Most connector-based integrations are configured under **Project Settings** or **Organization Settings** → **Third Party Integrations (AI SRE)**. Webhook-based integrations use a webhook URL and require no connector.

---

## Monitoring and observability

Ingest alerts from monitoring and observability tools to create and enrich incidents.

- **[Datadog](/docs/ai-sre/integrations/monitoring/datadog)**: Ingest Datadog monitor alerts through a webhook.
- **[New Relic](/docs/ai-sre/integrations/monitoring/new-relic)**: Ingest New Relic alert conditions through a webhook.
- **[Splunk](/docs/ai-sre/integrations/monitoring/splunk)**: Ingest Splunk alerts through a webhook.
- **[Dynatrace](/docs/ai-sre/integrations/monitoring/dynatrace)**: Ingest Dynatrace problem notifications through a webhook.
- **[Grafana](/docs/ai-sre/integrations/monitoring/grafana)**: Ingest Grafana alerts through a webhook.
- **[Prometheus](/docs/ai-sre/integrations/monitoring/prometheus)**: Ingest Prometheus Alertmanager alerts through a webhook.
- **[AWS CloudWatch](/docs/ai-sre/integrations/monitoring/aws-cloudwatch)**: Ingest CloudWatch alarms through an SNS webhook.
- **[Sentry](/docs/ai-sre/integrations/monitoring/sentry)**: Ingest Sentry issue alerts through a webhook.
- **[AlertSite](/docs/ai-sre/integrations/monitoring/alertsite)**: Ingest AlertSite monitoring alerts through a webhook.
- **[BigPanda](/docs/ai-sre/integrations/monitoring/bigpanda)**: Ingest BigPanda alerts through a webhook.
- **[Lacework](/docs/ai-sre/integrations/monitoring/lacework)**: Ingest Lacework security alerts through a webhook.
- **[Harness SLO](/docs/ai-sre/integrations/monitoring/harness-slo)**: Ingest Harness Service Reliability Management SLO alerts.

---

## CI/CD and change sources

Track builds, deployments, and code changes to correlate them with incidents.

- **[GitHub](/docs/ai-sre/integrations/cicd-change/github)**: Ingest pull requests and send build and deploy webhooks.
- **[GitLab](/docs/ai-sre/integrations/cicd-change/gitlab)**: Send build and deploy webhooks from GitLab CI/CD.
- **[Bitbucket](/docs/ai-sre/integrations/cicd-change/bitbucket)**: Ingest pull requests from Bitbucket Cloud.
- **[Jenkins](/docs/ai-sre/integrations/cicd-change/jenkins)**: Send build and deploy webhooks from Jenkins pipelines.
- **[CircleCI](/docs/ai-sre/integrations/cicd-change/circleci)**: Send build and deploy webhooks from CircleCI workflows.
- **[Travis CI](/docs/ai-sre/integrations/cicd-change/travis-ci)**: Send build and deploy webhooks from Travis CI.
- **[Octopus Deploy](/docs/ai-sre/integrations/cicd-change/octopus-deploy)**: Send deployment webhooks from Octopus Deploy.
- **[Terraform](/docs/ai-sre/integrations/cicd-change/terraform)**: Send Terraform apply events as deployment data.
- **[Harness Code](/docs/ai-sre/integrations/cicd-change/harness-code)**: Ingest pull requests automatically, with no connector required.
- **[Harness Pipelines](/docs/ai-sre/integrations/cicd-change/harness-pipelines)**: Send build and deploy data, and trigger pipelines from runbooks.

---

## Ticketing and ITSM

Track change records and automate ticket actions during incidents.

- **[Jira](/docs/ai-sre/integrations/ticketing-itsm/jira)**: Track Jira deployments and automate Jira ticket actions.
- **[ServiceNow](/docs/ai-sre/integrations/ticketing-itsm/servicenow)**: Ingest ServiceNow change records and automate ticket actions.
- **[Jira Service Management](/docs/ai-sre/integrations/ticketing-itsm/jira-service-management)**: Create Jira Service Management alerts from runbooks.
- **[Confluence](/docs/ai-sre/integrations/ticketing-itsm/confluence)**: Create and update Confluence pages from runbooks.

---

## Communication

Collaborate on incidents and send notifications through chat platforms.

- **[Slack](/docs/ai-sre/integrations/communication/slack)**: Collaborate on incidents and run Slack commands.
- **[Microsoft Teams](/docs/ai-sre/integrations/communication/microsoft-teams)**: Collaborate on incidents and post messages.
- **[Google Chat](/docs/ai-sre/integrations/communication/google-chat)**: Collaborate on incidents in Google Chat spaces.
- **[Zoom](/docs/ai-sre/integrations/communication/zoom)**: Create meetings and conference bridges from runbooks.

---

## On-call and escalation

Synchronize on-call schedules and page responders.

- **[PagerDuty](/docs/ai-sre/integrations/oncall/pagerduty)**: Synchronize on-call schedules and create incidents.
- **[OpsGenie](/docs/ai-sre/integrations/oncall/opsgenie)**: Synchronize on-call schedules and create alerts.
- **[xMatters](/docs/ai-sre/integrations/oncall/xmatters)**: Synchronize on-call schedules.

---

## Custom integrations

- **[Custom webhooks](/docs/ai-sre/alerts/webhooks/create-webhook)**: Ingest alerts from any tool that can send an HTTP POST, using a custom webhook template with CEL or Mustache field mapping.
