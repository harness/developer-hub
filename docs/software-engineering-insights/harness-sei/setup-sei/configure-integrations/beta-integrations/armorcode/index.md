---
title: Connect with ArmorCode
description: Integrate Harness SEI with ArmorCode.
sidebar_position: 1
sidebar_label: ArmorCode
---

:::tip
Security Insights is in beta. To request access, contact [Harness Support](/docs/software-engineering-insights/sei-support).
:::

[ArmorCode](https://www.armorcode.com/) is an Application Security Posture Management (ASPM) platform that aggregates and normalizes security findings from multiple scanners. This integration provides a unified view of security posture, remediation progress, and team-level ownership using data aggregated from all security tools connected to ArmorCode.

On initial setup, Harness SEI backfills up to **6 months of historical security findings**, enabling immediate MTTR calculations and trend analysis. Once connected, the Open vulnerabilities by severity metric updates on the [Security Insights dashboard](/docs/software-engineering-insights/harness-sei/insights/security) in the **Security** tab of the **Insights** page. 

Security findings are mapped to teams, enabling visibility into open vulnerabilities owned by each engineering team, remediation velocity trends per team, and alignment with your existing Harness SEI [Org Tree structure](/docs/software-engineering-insights/harness-sei/setup-sei/setup-org-tree).

## Prerequisites

Ensure that you have the [SEI Admin role](/docs/software-engineering-insights/harness-sei/get-started/rbac#sei-admin-account--project-level) and an ArmorCode Service Account API token.

### Create an ArmorCode API token

In ArmorCode, create a **Service Account** API token with **read-only access** to the following scopes:

- **Products**: Applications and business units
- **Findings**: Vulnerabilities and security issues  
- **Assets**: Repositories, container images, and cloud resources  
- **Scans**: Scan history and scan status  

:::info
Using a Service Account token with read-only permissions helps prevent disruptions when individual users change roles or leave the organization.
:::

## Add the integration 

1. From the SEI navigation menu, click **Account Management**.
1. On the **Integrations** page, select the **Available Integrations** tab.
1. Locate the **ArmorCode** integration and click **Add Integration**.
1. In the **Overview** section, provide a name for the integration (for example, `ArmorCode Production`) and optionally, add tags.
1. Click **Continue**.
1. Add your ArmorCode instance URL (for example, `https://app.armorcode.com`) in the `ArmorCode URL` field.
1. Enter your ArmorCode Service Account API token in the `API Token` field. To add another API token, click **+ Add another token**.
1. Click **Validate & Continue**.
1. Validate that the connection is successful and click **Save**.

Once the integration has been created, Harness SEI automatically fetches up to **6 months** of historical security findings, importing products, assets, users, and team-related metadata from ArmorCode. No manual refresh is required after setup.

| Object       | Description |
|--------------|-------------|
| Products     | Applications and business units defined in ArmorCode. |
| Assets       | Repositories, container images, and cloud resources. |
| Findings     | Security vulnerabilities and issues from all connected tools. |
| Users        | Developer and ownership information used for team mapping. |
| Scan Status  | Scan health, freshness, and execution status. |

Data is automatically synchronized every 8 hours across Security Insights metrics and dashboards.

## Integration monitoring

To monitor the status of the ArmorCode integration, navigate to the **Monitoring** tab. This page provides visibility into data ingestion, availability, and overall integration health. 

The following health indicators are displayed: **Healthy**, **Unhealthy**, **Pending**, or **No Data**. These indicators help ensure data freshness and identify issues impacting security reporting. 

You can use the time range selector to switch between **Last 7 Days** and **Last 30 Days**. Changing the time range updates both the **Security Issues Ingested** and **Data Availability** sections, along with their associated charts.

### Security Issues Ingested

The **Security Issues Ingested** section shows the volume of security findings ingested from ArmorCode during the selected time range.

- **Ingested in selected period**: The number of findings ingested within the last 7 or 30 days.
- **Total ingested**: The cumulative number of findings ingested since the integration was configured.

:::tip
Use this view to confirm that new security data is actively flowing into Harness SEI.
:::

### Data Availability

The **Data Availability** timeline visualizes the health of data ingestion during the selected time range. Each segment reflects the integration status at a given point in time:

- **Healthy**: Data was successfully ingested
- **Unhealthy**: Ingestion failed or encountered errors
- **Pending**: Ingestion is in progress
- **No Data**: No data was received for the time window

:::tip
Use this view to identify ingestion gaps, delays, or outages that may impact Security Insights reporting.
:::

## Next steps

Once you've configured the ArmorCode integration, you can: 

- Select the ArmorCode integration from the `Security Tools` section on the **Integrations** tab in [**Team Settings**](/docs/software-engineering-insights/harness-sei/setup-sei/setup-teams?team-settings=security-settings#configure-integrations-for-a-team)
- Map security data to teams and scope findings on the **Security** tab in [**Team Settings**](/docs/software-engineering-insights/harness-sei/setup-sei/setup-teams?team-settings=security-settings#configure-team-tool-settings)
- Examine the [Security Insights dashboard](/docs/software-engineering-insights/harness-sei/insights/security) to analyze organization and team-level security posture

## Troubleshooting

<details>
<summary>What security tools does this integration support?</summary>

Any security tool that integrates with ArmorCode (320+ tools including Snyk, Checkmarx, SonarQube, GitHub Advanced Security, and more).

</details>
<details>
<summary>Does this replace my existing security tools?</summary>

No, this integration provides a unified view of data from all your existing security tools through ArmorCode. Your security scanners continue operating as before.

</details>
<details>
<summary>How much historical data is imported?</summary>

6 months of findings (both open and closed) are imported during initial setup to provide immediate context and enable MTTR calculations.

</details>
<details>
<summary>Can I filter by team on the Security tab in Team Settings?</summary>

Yes, you can define teams using any combination of products, sub-products, environments, assets, or custom tags from ArmorCode.

</details>
<details>
<summary>What permissions does the ArmorCode API token need?</summary>

Read-only access to Products, Findings, Assets, and Scans in ArmorCode.

</details>
<details>
<summary>How often does the data sync?</summary>

Every 8 hours to ensure fresh data while respecting API rate limits.

</details>
<details>
<summary>What happens if my API token expires?</summary>

The integration status will change to `Failed` and syncing will stop. You will need to generate a new token and update the integration configuration. Syncing resumes once updated.

</details>
<details>
<summary>Can I see individual vulnerability details?</summary>

Yes, you can drill down from any metric on the Security Insights dashboard to view individual findings with full details from the source security tool.

</details>