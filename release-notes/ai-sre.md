---
title: AI SRE release notes
sidebar_label: AI SRE
date: 2026-04-29T10:00
sidebar_position: 2
---

<DocsButton icon = "fa-solid fa-square-rss" text="Subscribe via RSS" link="https://developer.harness.io/release-notes/ai-sre/rss.xml" />

The release notes describe recent changes to Harness AI SRE.

:::info About Harness Release Notes

* **Progressive deployment:** Harness deploys changes to Harness SaaS clusters on a progressive basis. This means the features described in these release notes may not be immediately available in your cluster. To identify the cluster that hosts your account, go to your **Account Overview** page in Harness.  In the new UI, go to **Account Settings**, **Account Details**, **General**, **Account Details**, and then **Platform Service Versions**.
* **Security advisories:** Harness publishes security advisories for every release. Go to the [Harness Trust Center](https://trust.harness.io/?itemUid=c41ff7d5-98e7-4d79-9594-fd8ef93a2838&source=documents_card) to request access to the security advisories.
* **More release notes:** Go to [Harness Release Notes](/release-notes) to explore all Harness release notes, including module, delegate, Self-Managed Enterprise Edition, and FirstGen release notes.

:::

## April 2026

#### New Features and Enhancements

- **AI-Native Post-Mortem Generation:** AI SRE now auto-generates a structured post-incident review when an incident is closed. The AI synthesizes incident metadata, timeline events, RCA theories, and notes into six sections (Summary, Impact, Root Cause, Resolution, Insights, Lessons Learned). View the generated post-mortem on the **Postmortem** tab of closed incidents. Manual regeneration is also available via the incident detail page. Go to [Resolve and Review Incidents](/docs/ai-sre/users/manage-incidents/resolve-and-review) to review the post-mortem workflow. (IR-2307, IR-2644)

## March 2026

#### New Features and Enhancements

- **ServiceNow Native Actions:** Runbooks now include native ServiceNow actions for creating incidents, updating incidents, and adding comments — without requiring custom webhook configuration. Fields are dynamically retrieved from your ServiceNow instance based on your connector. Configure a ServiceNow connector under Project Settings -> **Connectors**, then use the **Create ServiceNow Incident**, **Update ServiceNow Incident**, and **Add ServiceNow Comment** actions in your runbooks. (IR-1691)

- **User-Defined Webhook Templates:** You can now save webhook configurations as reusable templates and select them when creating new integrations. Configure a webhook once, click **Save as Template**, and reuse it across future webhooks. Templates appear in the **Select Payload Template** dropdown grouped under **System Templates** and **Custom Templates**. Templates are organization-scoped and use copy-on-write — changes do not propagate to existing webhooks. See [Configure Webhooks](/docs/ai-sre/alerts/webhooks) for details. (IR-2540, IR-2541)

- **Named Alert Rules:** Alert rules now support custom display names, making it easier to identify and manage rules across your organization. Set a name when creating or editing an alert rule under **Alerts > Alert Rules**. (IR-2519)

- **Active Pages View:** On-call users can now view all currently active pages from the **On-Call > Shifts** sidebar. The active pages table shows page status, assigned responders, escalation progress, and acknowledgment state, giving on-call managers a single view of all in-progress pages. (IR-2515)

- **Documentation Restructured for Admins and Responders:** AI SRE documentation has been reorganized into separate paths for [administrators](/docs/ai-sre/get-started/onboarding-guide-admins) and [incident responders](/docs/ai-sre/get-started/onboarding-guide-users). Admins get a streamlined path through alert configuration, runbook automation, on-call schedules, and integrations. Responders get a new task-oriented [Users](/docs/ai-sre/users/manage-incidents/acknowledge-and-triage) section covering incident creation, triage, runbook execution, action items, and the [mobile on-call experience](/docs/ai-sre/users/handle-oncall/oncall-mobile-app).

## February 2026

#### New Features and Enhancements

- **Service Subscriptions and Status Updates:** Users can now subscribe to services in the [Service Directory](/docs/ai-sre/oncall/integrate-service-directory) to receive automated status updates during incidents. Navigate to **On-Call > Service Directory**, select a service, and use the **Subscribers** tab to add users or teams. Incident commanders can send status updates from the incident detail page with recipients auto-populated from impacted service subscribers. (IR-2291, IR-2095, IR-2096)

- **On-Call Notification Rules (SMS, Push, Voice):** On-call notification rules now support SMS, push notifications, and voice calls in addition to email and Slack. SMS and voice call support is currently available for US phone numbers, with additional regions enabled within 21 days of request. Push notifications via the mobile apps are available globally. Configure your contact methods under **On-Call > Contact Settings**. (IR-2513, IR-2411, IR-2410, IR-2520)

- **Harness AI SRE Mobile App:** Native mobile apps are now available on the [App Store](https://apps.apple.com/us/app/harness-on-call/id6753579217) and [Google Play](https://play.google.com/store/apps/details?id=com.harness.aisre). Responders can acknowledge, escalate, and resolve incidents and alerts directly from their phone, with critical alert override for Do Not Disturb mode. See the [Mobile App Guide](/docs/ai-sre/users/handle-oncall/oncall-mobile-app) for setup instructions.

- **Escalation Policy — Individual User Management:** Escalation policies now support targeting individual users in addition to groups and schedules. Configure under **On-Call > Escalation Policies**. (IR-2512, IR-2395)

- **Customizable Incident Severity and Alert Priority:** Incident severity levels and alert priority mappings are now fully customizable to match your organization's standards. Configure under **On-Call > Settings**. (IR-2500, IR-2389)

- **OpsGenie Migration Tooling:** Import schedules, escalation policies, and user configurations directly from OpsGenie. Accessible under **On-Call > Settings > Import**. (IR-2553, IR-2380, IR-2348)

- **PagerDuty Migration Tooling:** Import schedules, escalation policies, and user configurations directly from PagerDuty. Accessible under **On-Call > Settings > Import**. (IR-2455, IR-2370, IR-2361)

- **Jira Dynamic Fields Integration:** The new **Create Jira Ticket V2** and **Update Jira Issue V2** [runbook actions](/docs/ai-sre/runbooks/runbook-action-integrations/jira) dynamically retrieve available fields based on the selected Jira project and issue type, replacing the previous static field configuration. Fields render with appropriate input types including multi-select for array fields. A manual key-value mode is available when the issue type is set dynamically using Mustache expressions. (IR-1669, IR-2313, IR-2454, IR-2341)

:::note
On-call is currently optimized for teams using AI SRE's incident response and alert management workflows. Direct integrations with third-party observability tools (e.g., Datadog) that enable automatic paging workflows between those tools and AI SRE on-call are planned for a future release.
:::

#### Fixed Issues

- Fixed invalid Jira ticket URLs not being rejected, which caused downstream Slack integration failures. (IR-2390)
- Fixed custom field persistence issues after save in Jira runbook actions. (IR-2343)
- Fixed multi-select and labels fields rendering as single-select in Jira runbook actions. Array-type fields (labels, components, multi-select custom fields) now render correctly. (IR-2254, IR-2324)
