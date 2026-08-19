---
title: Connect with Armorcode
description: Integrate Harness AIDI with Armorcode.
sidebar_position: 1
redirect_from:
  - /docs/ai-dlc-insights/setup/integrations/beta-integrations/armorcode/
---

:::tip
Security Insights is in beta. To request access, contact [Harness Support](/docs/software-engineering-insights/sei-support).
:::

[Armorcode](https://www.armorcode.com/) is an Application Security Posture Management (ASPM) platform that aggregates and normalizes security findings from multiple scanners. This integration provides a unified view of security posture, remediation progress, and team-level ownership using data aggregated from all security tools connected to Armorcode.

Once connected, the Open vulnerabilities by severity metric updates on the [Security Insights dashboard](/docs/software-engineering-insights/harness-sei/insights/security) in the **Security** tab of the **Insights** page.

Security findings are mapped to teams, enabling visibility into open vulnerabilities owned by each engineering team, remediation velocity trends per team, and alignment with your existing Harness AIDI [Org Tree structure](/docs/software-engineering-insights/harness-sei/setup-sei/setup-org-tree).

## Prerequisites

Ensure that you have the [SEI Admin role](/docs/software-engineering-insights/harness-sei/get-started/rbac#sei-admin-account--project-level) and an ArmorCode Service Account API token.

### Create an Armorcode API token

In Armorcode, create a **Service Account** API token with **read-only access** to the following scopes:

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
1. Locate the **Armorcode** integration and click **Add Integration**.
1. In the **Overview** section, provide a name for the integration (for example, `Armorcode Production`) and optionally, add tags.
1. Click **Continue**.
1. Add your Armorcode instance URL (for example, `https://app.armorcode.com`) in the `Armorcode URL` field.
1. Enter your Armorcode Service Account API token in the `API Token` field. To add another API token, click **+ Add another token**.
1. Click **Validate & Continue**.
1. Validate that the connection is successful and click **Continue**.
1. In the **Configure Filters** section, limit the data ingested from Armorcode by configuring one or more of the security tools detected in your Armorcode instance (for example, **Wiz** or **Snyk**). 

   For each tool:
   
   - Enter or select the **Tool Name**. At least one tool name is required.
   - Select an **Aggregate By** field to group findings by (pick a single value, for example `repositoryName`). This determines the aggregation dimension used in the **Vulnerabilities Drilldown** section of the Security Insights dashboard.
   - Optionally, select a **Tag Key** and manually enter one or more **Tag Key Values** (for example, a GP ID such as `gp4013`). These values are not pulled from discovered filters, and populate the Group Value shown in the **Vulnerabilities Drilldown** section of the Security Insights dashboard.
   - Configure up to 5 **Filters** to limit ingested findings by attributes such as status, category, type, severity, and environment. The page shows how many filters are configured (for example, `Filters · 5 of 5 configured`).

1. Click **Continue**.
1. Under **Spot Check**, click **Run spot check** to preview severity counts for your configured filters before finishing setup.
1. Review the results and click **Save** to complete the integration.

    :::tip
    The Tool Name, Aggregate By field, and Tag Key Values you configured map directly to the **Tool Source**, **Aggregation Dimension**, and **Group Value** columns in the **Vulnerabilities Drilldown** section of the [Security Insights dashboard](/docs/software-engineering-insights/harness-sei/insights/security).
    :::

Once the integration has been created, Harness AIDI imports products, assets, users, and team-related metadata from Armorcode. No manual refresh is required after setup.

| Object       | Description |
|--------------|-------------|
| Products     | Applications and business units defined in Armorcode. |
| Assets       | Repositories, container images, and cloud resources. |
| Findings     | Security vulnerabilities and issues from all connected tools. |
| Users        | Developer and ownership information used for team mapping. |
| Scan Status  | Scan health, freshness, and execution status. |

Data is automatically synchronized every 8 hours across Security Insights metrics and dashboards.

## Integration monitoring

To monitor the status of the Armorcode integration, navigate to the **Monitoring** tab. This page provides visibility into data ingestion, availability, and overall integration health. 

The following health indicators are displayed: **Healthy**, **Unhealthy**, **Pending**, or **No Data**. These indicators help ensure data freshness and identify issues impacting security reporting. 

You can use the time range selector to switch between **Last 7 Days** and **Last 30 Days**. Changing the time range updates both the **Security Issues Ingested** and **Data Availability** sections, along with their associated charts.

### Security Issues Ingested

The **Security Issues Ingested** section shows the volume of security findings ingested from Armorcode during the selected time range (for example, **Ingested in Last 30 Days: 126**). This count updates automatically based on the selected time range (**Last 7 Days** or **Last 30 Days**).

:::tip
Use this view to confirm that new security data is actively flowing into Harness AIDI.
:::

### Data Availability

The **Data Availability** timeline visualizes the health of data ingestion across the selected time range (for example, from 30 days ago through today). Each segment reflects the integration status at a given point in time:

- **Healthy**: Data was successfully ingested
- **Unhealthy**: Ingestion failed or encountered errors
- **Pending**: Ingestion is in progress
- **No Data**: No data was received for the time window

:::tip
Use this view to identify ingestion gaps, delays, or outages that may impact Security Insights reporting.
:::

## Next steps

Once you've configured the Armorcode integration, you can: 

- Select the Armorcode integration from the `Security Tools` section on the **Integrations** tab in [**Team Settings**](/docs/software-engineering-insights/harness-sei/setup-sei/setup-teams?team-settings=security-settings#configure-integrations-for-a-team)
- Map security data to teams and scope findings on the **Security** tab in [**Team Settings**](/docs/software-engineering-insights/harness-sei/setup-sei/setup-teams?team-settings=security-settings#configure-team-tool-settings)
- Examine the [Security Insights dashboard](/docs/software-engineering-insights/harness-sei/insights/security) to analyze organization and team-level security posture

## Troubleshooting

<details>
<summary>What security tools does this integration support?</summary>

Any security tool that integrates with Armorcode (320+ tools including Snyk, Wiz, Checkmarx, SonarQube, GitHub Advanced Security, and more).

</details>
<details>
<summary>Does this replace my existing security tools?</summary>

No, this integration provides a unified view of data from all your existing security tools through Armorcode. Your security scanners continue operating as before.

</details>
<details>
<summary>Can I filter by team on the Security tab in Team Settings?</summary>

Yes, you can define teams using any combination of products, sub-products, environments, assets, or custom tags from Armorcode.

</details>
<details>
<summary>What permissions does the Armorcode API token need?</summary>

Read-only access to Products, Findings, Assets, and Scans in Armorcode.

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

Yes. From the Security Insights Vulnerabilities Drilldown, click an Aggregation Value link to open the corresponding findings in Armorcode with full details from the source security tool.

</details>