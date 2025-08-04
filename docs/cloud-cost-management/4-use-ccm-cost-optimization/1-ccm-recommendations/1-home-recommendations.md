---
title: Overview
description: Learn about the recommendations summary page and the various actions that you can perform on this page.
# sidebar_position: 2
---
import Tabs from '@theme/Tabs';

import TabItem from '@theme/TabItem';



## What are Recommendations?

Harness CCM Recommendations are data-driven insights that help you optimize your cloud resources for cost efficiency without compromising performance. By analyzing historical usage patterns, resource configurations, and cloud provider pricing models, CCM identifies opportunities to right-size resources, eliminate waste, and implement best practices.
### Benefits of CCM Recommendations

- **Cost Optimization**: Identify underutilized resources and right-sizing opportunities that can reduce your cloud spend 
- **Performance Balancing**: Maintain application performance while optimizing costs through intelligent resource allocation suggestions
- **Governance Enforcement**: Ensure compliance with organizational policies and industry best practices
- **Proactive Management**: Address inefficiencies before they impact your budget with regular recommendation updates
- **Cross-Cloud Optimization**: Get unified recommendations across multiple cloud providers and resource types

Below are the available recommendation types and what they represent:

- Azure VM Recommendations: Identify underutilized virtual machines in your Azure environment and suggest rightsizing or termination to reduce spend.
- AWS EC2 Recommendations: Analyze EC2 usage to detect idle or oversized instances, offering guidance to optimize instance types or stop them altogether.
- AWS ECR Recommendations: Highlight unused container images in Amazon Elastic Container Registry and recommend cleanup actions.
- Governance Recommendations: Provide cost governance insights based on tagging, business units, and spending patterns across AWS, GCP, and Azure.
- Node Pool Recommendations: Recommend better node pool configurations for your Kubernetes clusters to balance cost and performance, with cloud-specific requirements.
- Workload Recommendations: Target inefficient Kubernetes workloads by analyzing CPU/memory utilization and proposing updated resource requests/limits.

:::info
After you enable CCM, it may take up to 48 hours for the recommendations to appear in Cloud Costs. It depends on the time at which CCM receives the utilization data for the service. 
:::

## Recommendations Homepage

 <DocImage path={require('./static/output.gif')} width="90%" height="90%" title="Click to view full size image" />

- Recommendation Type:
- Cloud Provider: 
- **+ Add Filter**
  - **Generic Filters**: Cloud Account ID, Cloud Account Name, Resource ID, Resource Name, Region, Cost Category, Cluster Labels, Cloud Tags, Potential Spend(USD), Savings (USD), Governance Rule Name
  - **AWS-Specific Filters**: Instance Type
  - **Azure-Specific Filters**: VM Size, Resource Group
  - **Container-Specific Filters**: Kubernetes Cluster Name, Kubernetes Namespace, ECS Cluster Name, ECS Launch Type


:::info

Harness provides filtering support for recommendations based on cloud account identifiers and Kubernetes attributes. This allows for better cost optimization insights while maintaining alignment with perspective-based RBAC settings.

- **AWS EC2**: Filtering is supported on AWS Account ID. Nested Cost Categories are not supported.  

- **AWS ECS**: Filtering is supported on AWS Account ID. Nested Cost Categories are not supported.  

- **Azure VM**: Filtering is not supported.  

- **Kubernetes**: Filtering is supported on Labels and Cluster Name. Nested Cost Categories are not supported.  

- **Governance Recommendations**:

  -   **AWS**: No filtering support.  
  -   **Azure**: No filtering support.  
  -   **GCP**: No filtering support.  

Filtering support for recommendations extends to **RBAC configurations based on perspective folder access settings**, ensuring that cost-saving suggestions are appropriately scoped to the right teams. 

:::


---------

### Recommendations Info 


 <DocImage path={require('./static/outputthree.mp4')} width="90%" height="90%" title="Click to view full size image" />


- Open Recommendations: List of recommendations that are not applied yet. You can view:
  - Potential Monthly Savings that can be achieved with the recommendation
  - Potential Monthly Spend without applying recommendations.
  - Table with columns: 
    - Resource Name
    - Potential Monthly Savings
    - Potential Monthly Spend
    - Recommended Action
    - Jira Ticket Status
- Applied Recommendations: When you click on an individual recommendation, you’ll be able to view a detailed breakdown of the recommendation, including relevant insights, suggested actions, and any supporting information.

-----------

### Added functionalities

 <DocImage path={require('./static/outputwo.gif')} width="90%" height="90%" title="Click to view full size image" />

- **Export CSV:** Option to export your Recommendations as comma-separated values (CSV) files. Exporting allows you to use the data in other software. Export respects the filters applied by the user in the filter panel. Only comma-separated values files (CSV) are supported and the maximum number of rows allowed in one export is 10,000 rows.
- **Manage Ignore List:** Adding resources to the Ignore list will stop Harness from displaying recommendations for those resources. You can view the Ignore list with details by clicking on "Manage Ignore List" on the overview page.
- **Settings:** Recommendation settings allow users to customize how recommendations are generated and displayed within the platform. The recommendation settings are divided into two main sections: Preferences and Manage Presets:
  - **Preferences:** 
    - **General Preferences:**
      - **Show Recommendations on Parent Resources** - Enables recommendations for parent-level resources such as Nodepool, EC2, and ECS Services. This ensures users receive optimization suggestions for high-level infrastructure components.
      - **Show Recommendations on Child Resources** - Displays recommendations for individual workloads, allowing users to optimize specific application components rather than just the underlying infrastructure.
      - **Show Recommendations on Resources Added to the Ignore List** - If enabled, recommendations will still be displayed for resources that have been manually marked as ignored. 
    - **Resource Specific Preferences:** Over here, users can select the presets for each resource type and also set the default time range. 
  - **Manage Presets:** This helps users to create and save customized configurations for their recommendations. These presets capture specific user preferences, such as tuning parameters for resource types like workloads, nodepools, ECS, and EC2 instances.  

  Users can fine-tune recommendations for different resource types by configuring specific tuning parameters and save presets. 

  <Tabs>
    <TabItem value="workload" label="Workload">
      <DocImage path={require('./static/workload-preset.png')} width="50%" height="50%" title="Click to view full size image" />

      | Parameter | Description |
      | --- | --- |
      | **Quality of Service (QoS)** | Choose between Burstable or Guaranteed resource allocation for workloads. Burstable allows resources to exceed requests up to limits, while Guaranteed sets requests equal to limits for stable performance. |
      | **Percentage Buffer for CPU/Memory** | Additional resource margin to handle unexpected spikes in usage. Higher buffer values provide more headroom for workload fluctuations but increase resource allocation. |

    </TabItem>
    <TabItem value="nodepool" label="Nodepool">

      <DocImage path={require('./static/nodepool-preset.png')} width="50%" height="50%" title="Click to view full size image" />

      | Parameter | Description |
      | --- | --- |
      | **Minimum Node Count** | Ensures high availability by maintaining a minimum number of nodes in the cluster. This prevents scaling down below a threshold that might impact application availability. |
      | **Percentage Buffer for CPU/Memory** | Additional resource margin to handle unexpected spikes in usage. Helps prevent resource contention during peak loads while maintaining efficient resource utilization. |

    </TabItem>
    <TabItem value="ec2" label="AWS EC2">

      <DocImage path={require('./static/ec-preset.png')} width="50%" height="50%" title="Click to view full size image" />

      | Parameter | Description |
      | --- | --- |
      | **Instance Family Selection** | <ul><li><strong>Within the Same Instance Family:</strong> Recommendations will suggest optimized instance types within the same instance family, ensuring workload compatibility and minimizing migration complexity.</li><li><strong>Across Instance Families:</strong> Recommendations can suggest optimized instance types across different instance families, potentially unlocking greater cost savings and efficiency improvements.</li></ul> |

    </TabItem>
    <TabItem value="ecs" label="AWS ECS">
      <DocImage path={require('./static/ecs-preset.png')} width="50%" height="50%" title="Click to view full size image" />

      | Parameter | Description |
      | --- | --- |
      | **Buffer Percentage** | Additional resource margin to ensure containers have sufficient resources during peak usage. Helps prevent throttling and performance issues while maintaining efficient resource allocation. |

    </TabItem>
  </Tabs>

:::info
- For Governance, we support [Granular Recommendations](https://developer.harness.io/docs/cloud-cost-management/use-ccm-cost-governance/asset-governance/aws/aws-recommendations#granular-recommendations). Owing to this, now, while adding a recommendation to Ignore List, users have the option to specify the scope at which the users want to ignore the recommendation. 

- New Recommendation Preferences may take up to 24 hours to fully update across the platform. However, changes will be reflected immediately on the drill-down page, while the Overview page may take additional time to reflect updates.

- By default, Harness CCM has default presets for all resources but users can tune recommendations using custom values. To set custom values, click on the recommendation and expand the "Tune Recommendations" section to configure the tuning parameters. 
:::

-----------

## Apply Recommendations

To apply recommendations, you need to raise a ticket in the ticketing tool that your organization uses and manually apply the recommendation to the resource. You can create a Jira or ServiceNow ticket for your team to track the application status of recommendations.

Before you can raise a ticket to apply recommendations, you need to create a Jira or ServiceNow connector.
- Steps to create a Jira connector: [Create Jira Connector](/docs/platform/connectors/ticketing-systems/connect-to-jira)
- Steps to create a ServiceNow connector: [Create ServiceNow Connector](/docs/platform/connectors/ticketing-systems/connect-to-service-now)

### Configure Ticketing Tool
:::danger Reminder
 Switching your ticketing tool between Jira and ServiceNow results in the removal of the existing recommendation tickets. The status of the tickets changes to **Create a ticket**.
:::

 To configure the ticketing tool setup, perform the following steps: 

1. Navigate to **Cloud Costs** > **Setup** > **Default Settings**.
2. Expand **Cloud Cost Management**.
3. Under **Ticketing preferences**, select the **Ticketing tool** and the **Ticketing tool connector**. If you do not have an existing connector, [create a new one](#create-a-jira-or-servicenow-connector). The default ticketing tool is **Jira**. You can choose **ServiceNow** if that's the tool used in your organization.
4. Select **Save**.

<DocImage path={require('./static/ticketing-tool-selector.png')} width="70%" height="70%" title="Click to view full size image" />

### Raise a Ticket to Apply Recommendations

Go to the **Recommendations** page and create tickets to apply recommendations.

1. Select **Create a ticket**. In case you haven't set up your ticketing tool settings on the account level, you will see a prompt guiding you to access the **Default Settings** page to configure both the ticketing tool and the associated connector.


2. Enter the following ticket details:


<Tabs>
  <TabItem value="Cost Reporting" label="Jira">


* **Jira project** — Select the Jira project where you want to create a ticket. Go to [Create Jira Issues in CD Stages](/docs/continuous-delivery/x-platform-cd-features/cd-steps/ticketing-systems/create-jira-issues-in-cd-stages.md).
* **Issue type** — Select a Jira issue type from the list of types in the Jira project you selected. Go to [Create Jira Issues in CD Stages](/docs/continuous-delivery/x-platform-cd-features/cd-steps/ticketing-systems/create-jira-issues-in-cd-stages.md).
* **Ticket summary** — Add a summary of the issue.
* **Description** — Add a description for the issue.


</TabItem>
  <TabItem value="Cost Optimization" label="ServiceNow">


   * **Ticket Type** - Select the ticket type from the dropdown list. For example, change request, Data Management task, and so on. Based on the selected ticket type, you might need to enter more required inputs.
   * **Short Description** - Enter a brief description of the task. This is the title of the ticket.
   * **Description** - Enter a more detailed description about the recommendation.


<DocImage path={require('./static/servicenow_Example.png')} width="80%" height="80%" title="Click to view full size image" />

The Description field contains relevant information about the recommendation for which this ticket was created. Harness CCM retrieves the following data from ServiceNow:

When a user opens the dialog box to create a ServiceNow ticket, a request is made to obtain all possible ticket types. Here is a sample response:

```json
{
    "status": "SUCCESS",
    "data": [
        {
            "key": "asset_reclamation_request",
            "name": "Asset Reclamation Request"
        },
        {
            "key": "asset_task",
            "name": "Asset Task"
        },
        {
            "key": "business_app_request",
            "name": "Business Application Request"
        }
    ]
}
```

Once the user selects a ticket type, another request retrieves the fields associated with that ticket type to determine the required fields. Here is a sample response:

```json
{
    "data": [
        {
            "key": "parent",
            "name": "Parent",
            "required": false,
            "schema": {
                "array": false,
                "typeStr": "",
                "type": "unknown",
                "customType": null,
                "multilineText": false
            },
            "internalType": null,
            "allowedValues": [],
            "readOnly": false,
            "custom": false
        },
        {
            "key": "made_sla",
            "name": "Made SLA",
            "required": false,
            "schema": {
                "array": false,
                "typeStr": "boolean",
                "type": "boolean",
                "customType": null,
                "multilineText": false
            },
            "internalType": null,
            "allowedValues": [],
            "readOnly": false,
            "custom": false
        }
    ]
}
```

When the user clicks "Create Ticket," an API call is made to ServiceNow to create the ticket with the provided inputs. Additionally, there is an internal call that periodically checks if the ticket has been closed. Based on this status, the recommendation is moved to the applied state.



</TabItem>
</Tabs>

  
The ticket is created. The status of the ticket changes to **To do**. You need to assign the ticket to apply the recommendations. After applying the recommendations, when the ticket status changes to **Done**, the recommendation is displayed in the **Applied Recommendations** tab. 
If you have not changed the ticket status to **Done** after applying the recommendation, you could use the **More actions** icon (three vertical dots), and then select **Mark as applied** to move the recommendation to the **Applied Recommendations** tab.
To view the recommendations that are applied, and the cost savings realized, select the **Applied Recommendations** tab.

