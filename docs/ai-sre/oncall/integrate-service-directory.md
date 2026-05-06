---
title: Integrate with the Service Directory
description: Connect Harness CD services to the AI SRE on-call system for automatic service-to-team mapping.
sidebar_label: Integrate with the Service Directory
sidebar_position: 2
---

# Integrate with the Service Directory

The service directory is the foundation of on-call routing in Harness AI SRE. 

It determines which team gets paged when an alert fires for a given service. 

The directory is automatically populated by services defined in Harness CD, so your on-call routing stays in sync with your deployment topology.

## How Service Directory Integration Works

- Services defined in your **Harness CD project** are automatically synchronized into the AI SRE service directory.
- Each service can be mapped to a **team** and an **escalation policy**, which determines who gets paged when an alert for that service arrives.
- When an alert payload includes a service identifier, AI SRE uses the directory to look up the correct on-call responder.

## Set Up Service Mapping

1. Navigate to **Project Settings** → **Service Directory (AI SRE)**.
2. Verify that your Harness CD services appear in the list. If they do not, confirm that AI SRE is enabled for the same project where your CD services are defined.
3. For each service, assign:
   - **Team**: The team responsible for this service.
   - **Escalation policy**: The escalation chain to use when this service is impacted.
4. Save your mappings.

## Configure Service Subscribers

Service subscribers receive status updates during incidents affecting their subscribed services. Configure subscribers to enable stakeholder communication without requiring stakeholders to join incident war rooms.

### Add Subscribers to a Service

1. Navigate to **Project Settings** → **Service Directory (AI SRE)**.
2. Select a service from the list.
3. Click the **Subscribers** tab.
4. Click **Add Subscriber**.
5. Choose the subscriber type:
   - **User**: Select an individual user from your organization
   - **User Group**: Select a Harness User Group (members are expanded automatically)
6. Click **Save**.

When an incident commander sends a status update for an incident affecting this service, all subscribers receive an email with incident details, current status, and mitigation actions.

Go to [Configure Status Updates and Service Subscribers](/docs/ai-sre/incidents/status-updates) for complete documentation on the subscription model and delivery options.

## Enable Service Paging Webhook

Services can be configured with a dedicated paging webhook that allows external monitoring tools, legacy systems, and custom applications to trigger on-call notifications by sending alerts directly to the service.

### How It Works

When you enable a paging webhook on a service, the system automatically creates:

- **Webhook URL**: A unique HTTPS endpoint for receiving HTTP POST requests with JSON payloads
- **Email address**: A unique email address for receiving alert emails
- **Alert routing**: Alerts sent to the webhook or email address automatically page the service's on-call team

### Enable the Webhook

1. Navigate to **Project Settings** → **Service Directory (AI SRE)**.
2. Select the service you want to configure.
3. Click **Enable Paging Webhook**.
4. Copy the **Webhook URL** and **Email Address** for use in external systems.

### Use Cases

- **External monitoring**: Route alerts from Datadog, Grafana, or other monitoring tools through Harness for unified on-call management
- **Legacy systems**: Integrate older systems that only support email-based alerting
- **Custom scripts**: Send alerts from internal health checks, cron jobs, or custom monitoring tools
- **Third-party tools**: Connect SaaS tools that support webhooks or email notifications

Go to [Service Paging Webhook](/docs/ai-sre/oncall/service-paging-webhook) for complete documentation on HTTP and email integration, field mapping, and troubleshooting.

## Best Practices

- **Map every production service**: Unmapped services cannot be automatically routed, which means alerts may go unnoticed.
- **Keep mappings current**: When service ownership changes, update the directory promptly. Stale mappings page the wrong team.
- **Align with your CD project structure**: The service directory pulls from CD, so organizing your CD services cleanly pays off in on-call routing accuracy.
- **Use user groups for subscribers**: Subscribe user groups (e.g., "Platform Leadership") rather than individual users to reduce maintenance when team membership changes.
- **Align subscribers with on-call structure**: If a team is on-call for a service, their leadership should be subscribed for status updates.