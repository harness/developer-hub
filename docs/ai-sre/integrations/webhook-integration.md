---
title: Configure Webhook Integration
sidebar_label: Webhook Integration
sidebar_position: 0
description: Learn how to configure webhook integrations in Harness AI SRE for bidirectional communication with external monitoring tools, CI/CD systems, and ticketing platforms.
redirect_from:
- /docs/incident-response/integrations/webhook-integration
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import NeedHelpFooter from '../_snippets/need-help-footer.mdx';

Webhook integrations in Harness AI SRE enable bidirectional communication with external monitoring tools, CI/CD systems, and other services. These integrations process incoming webhook payloads to create alerts and incidents in AI SRE, and can also send updates back to external systems when configured with proper authentication and connectors.

## Overview

Webhook integrations provide real-time, scalable processing of external system events with 25+ pre-configured templates for popular tools and services. Key capabilities include:

- **Real-Time Processing**: Immediate processing of alerts, incidents, and deployment events from external systems
- **Automated Incident Creation**: Automatically create incidents and alerts from external monitoring tools, CI/CD systems, and ticketing platforms
- **Bidirectional Synchronization**: Maintain sync with external systems like ServiceNow and Jira (comments, status updates, work notes)
- **Flexible Payload Mapping**: Customize field extraction and mapping for different webhook sources with custom field support
- **Centralized Management**: Manage all webhook integrations from a single interface with scalable, high-volume processing

## Integration Types and Templates

### Alert Type Integrations
Process alerts and monitoring data from external systems:

**Available Templates:**
- **AlertManager** - Prometheus AlertManager notifications
- **AlertSite** - Website monitoring alerts
- **BigPanda** - Alert correlation and management
- **Bitbucket** - Repository and pipeline alerts
- **Cloudwatch** - AWS CloudWatch alarms
- **Datadog** - Infrastructure and application monitoring
- **Dynatrace** - Application performance monitoring
- **GitHub** - Repository events and security alerts
- **GitLab** - CI/CD pipeline and security notifications
- **Grafana** - Dashboard and alerting notifications
- **Grafana Incident** - Grafana incident management
- **Harness SLO** - Service level objective violations
- **Jira** - Project and issue notifications
- **Lacework** - Cloud security alerts
- **New Relic** - Application performance and infrastructure monitoring
- **Octopus Deploy** - Deployment notifications
- **Opsgenie** - Incident management and alerting
- **PagerDuty** - On-call and incident notifications
- **Sentry** - Error tracking and performance monitoring
- **ServiceNow** - IT service management alerts
- **Travis CI** - Continuous integration build notifications

### Incident Type Integrations
Handle incident data with bidirectional synchronization:

**Available Templates:**
- **Jira Incident** - Bidirectional sync with Jira issues (comments, status updates)
- **ServiceNow Incident** - Bidirectional sync with ServiceNow incidents (work notes, status updates)

### Build Type Integrations
Process build and CI/CD notifications:

**Available Templates:**
- **Harness Build** - Harness CI pipeline build notifications

### Deployment Type Integrations
Handle deployment events and notifications:

**Available Templates:**
- **Harness Deployment** - Harness CD deployment notifications

## Integration Capabilities

Certain integrations support bidirectional communication, enabling AI SRE to both receive data from and send updates to external systems:

### ServiceNow Integration
- **Inbound**: Receive incident notifications and updates from ServiceNow
- **Outbound**: Send work notes, comments, and status updates back to ServiceNow incidents
- **Synchronization**: Maintain real-time sync between AI SRE incidents and ServiceNow records

### Jira Integration  
- **Inbound**: Receive issue notifications and updates from Jira
- **Outbound**: Send comments, status updates, and field changes back to Jira issues
- **Synchronization**: Keep AI SRE incidents and Jira issues synchronized

### Requirements for Bidirectional Sync
- Proper authentication configuration (API keys, OAuth)
- Appropriate connector setup for outbound communication
- Matching field mappings between systems
- Network connectivity for both inbound webhooks and outbound API calls

## Creating Webhook Integrations

<Tabs groupId="webhook-integration" queryString>
  <TabItem value="interactive-guide" label="Interactive Guide" default>

<DocVideo src="https://app.tango.us/app/embed/7558f8b2-2a62-4b77-b411-cfc912b9d8e0?skipCover=true&defaultListView=false&skipBranding=false&makeViewOnly=false&hideAuthorAndDetails=true" title="Configure Webhook Integration in AI SRE" />

Follow this interactive guide to configure webhook integrations with payload mapping and field configuration.

  </TabItem>
  <TabItem value="step-by-step" label="Step by Step">

### Step 1: Access Integrations

1. Navigate to the **Integrations** tab in your Harness AI SRE platform
2. Click **New Integration** to start creating a new webhook integration
3. This opens the integration configuration interface

### Step 2: Configure Basic Details

1. **Provide basic integration information**:
   - **Name**: Descriptive name for the integration (e.g., "Datadog Production Alerts", "ServiceNow Incidents")
   - **Type**: Select the appropriate integration type
   - **Template**: Choose from available pre-configured templates
2. **Choose Integration Type** based on your use case:
   - **Alert**: For monitoring, alerting, and notification systems (22+ templates available)
   - **Incident**: For bidirectional incident management with ticketing systems (Jira, ServiceNow)
   - **Build**: For CI/CD build notifications (Harness Build)
   - **Deployment**: For deployment event processing (Harness Deployment)

### Step 3: Save Initial Configuration

1. Click **Save** to create the basic integration structure
2. This generates the webhook endpoint and opens advanced configuration options

### Step 4: Get Webhook Endpoint

1. **Copy the endpoint URL** that appears after saving
2. **Configure this endpoint** in the external tool that will send webhooks
3. The endpoint is unique to this integration and ready to receive data
4. Use this URL in your monitoring tools, CI/CD systems, or other services

### Step 5: Configure Payload Mapping

1. Click **Payload Configuration** to set up data mapping
2. **Review the pre-defined template** that appears in the interface
3. **Examine the right panel** which shows selected fields that are required for processing
4. **Select additional fields**: Check the checkbox against any field you want to extract from incoming webhooks
5. **Selected fields appear** in the list of extracted fields for processing

### Step 6: Add Custom Fields

1. Click **Add Field** to create custom fields for your specific data needs
2. Fill in the field details of **Name** and **Path**
3. **Save the custom field** to add it to the extraction list

### Step 7: Review Extracted Fields

1. **Extracted fields include**:
   - All checked standard fields from the template
   - Any custom fields you created
   - Required fields for the integration type
2. **Verify field selection** matches your webhook payload structure
3. **Add or remove fields** as needed for your specific use case

### Step 8: View JSON Payload

1. Click the **JSON toggle** to see the entire formatted payload structure
2. **Review the JSON format** to ensure it matches your expected webhook data
3. **Verify field mappings** are correctly represented in the JSON structure
4. **Use this format** as reference when configuring the sending system

### Step 9: Configure Field Mapping

1. Navigate to the **Mapped Fields** section
2. **Map default fields** by dragging saved elements from the left panel and dropping them into value boxes
3. **Alternative method**: Use the **Data picker** to select field mappings
4. **Configure field relationships** between incoming webhook data and AI SRE fields

### Step 10: Add Custom Mapped Fields

1. Click **Add Field** to create custom mapped fields not part of the default template
2. **Configure the new field**:
   - **Name**: Name for the mapped field
   - **Description**: Decription containing use-case
   - **Type**: Data type of the field
   - **Default Value**: Any default values required to be set
3. Click **Save** to add the custom mapped field

### Step 11: Finalize Configuration

1. Click **Next** from the bottom of the configuration interface
2. **Review all settings** to ensure proper configuration
3. **Verify field mappings** are complete and accurate

### Step 12: Test Integration

1. Click the **Test** tab from the top navigation
2. **Copy the sample cURL** command using the provided widget
3. **Run the cURL command** in your terminal to test the integration
4. **Verify the test** creates the expected incident or alert in AI SRE
5. **Check field mapping** to ensure data is properly extracted and processed

### Step 13: Save and Activate

1. Click **Save** to finalize the integration configuration
2. **The integration is now active** and ready to receive webhook data
3. **Configure the webhook URL** in your external systems
4. **Monitor incoming data** to ensure proper processing

  </TabItem>
</Tabs>

## Payload Configuration Best Practices

### Field Selection Strategy
- **Include Essential Fields**: Always map critical fields like severity, service, and description
- **Avoid Over-Mapping**: Don't extract unnecessary fields that won't be used
- **Consider Future Needs**: Include fields that might be useful for future automation
- **Validate Data Types**: Ensure field types match expected webhook payload structure

### Custom Field Design
- **Descriptive Names**: Use clear, meaningful names for custom fields
- **Consistent Naming**: Follow naming conventions across all integrations
- **Proper Data Types**: Choose appropriate data types for field content
- **Default Values**: Set sensible defaults for optional fields

### JSON Payload Optimization
- **Structure Validation**: Ensure JSON structure matches webhook sender format
- **Field Nesting**: Handle nested objects and arrays appropriately
- **Error Handling**: Plan for missing or malformed data scenarios
- **Performance**: Optimize payload size for processing efficiency

## Troubleshooting Common Issues

### Integration Not Receiving Data
- **Verify Endpoint URL**: Ensure correct webhook URL is configured in source system
- **Check Network Connectivity**: Verify network access between systems
- **Validate Payload Format**: Ensure webhook payload matches expected structure
- **Review Authentication**: Check authentication credentials and permissions

### Field Mapping Issues
- **Missing Fields**: Verify required fields are present in webhook payload
- **Data Type Mismatches**: Check that field types match expected formats
- **Nested Data**: Ensure nested objects are properly mapped
- **Array Handling**: Verify array data is correctly processed

### Performance Problems
- **Payload Size**: Optimize webhook payload size for better performance
- **Processing Time**: Monitor integration processing times
- **Rate Limiting**: Implement appropriate rate limiting for high-volume integrations
- **Error Handling**: Ensure robust error handling for failed processing



## Next Steps

### Getting Started
- [Configure Alert Rules](../alerts/alert-rules.md) to process webhook-generated alerts
- [Set Up Incident Types](../incidents/incident-types.md) for webhook-created incidents
- [Set Up On-Call Schedules](../oncall/oncall.md) for webhook-triggered notifications

### Response Automation
- [Create Runbooks](../runbooks/create-runbook.md) to automate responses to webhook-created incidents
- [Configure Runbook Actions](../runbooks/runbook-action-integrations/slack.md) for outbound integrations with external systems

### Advanced Configuration
- [Manage Incidents](../incidents/incidents.md) created from webhook integrations
- [AI SRE Best Practices](../resources/ai-sre-best-practices.md) for webhook integration optimization

---

<NeedHelpFooter />
