---
title: Azure Recommendations
description: This topic describes how to optimize cloud costs using asset governance.
# sidebar_position: 2
---

Recommendations help kickstart your journey with governance. Essentially, Harness runs certain policies behind the scenes to generate recommendations for your governance-enabled Azure subscriptions. These policies not only help to cut costs but also increase the efficiency of your system. On the Governance Overview page, Harness showcases recommendations that will benefit you to save costs on associated resources. You can click on any recommendation to view its details. 


## Governance Recommendation Insights

Harness CCM now provides users the ability to monitor Governance Recommendations through the new Recommendations Insights tab in the Governance module. 

This enhancement offers clear visibility into the evaluation status of each rule and provides detailed insights about the cloud account (connector) and region involved in generating the recommendations.

This tab is designed to streamline troubleshooting and improve visibility into why recommendations may fail, be ignored, or succeed, enabling users to take immediate corrective actions when necessary.

#### How It Works:
- Status Tracking: Each Recommendation Rule's status is displayed in the Recommendation Insights tab.
- Cloud Connector (Subscription ID): The specific cloud account associated with the rule.
- Region: The region for which the rule is evaluated.

#### Error Notifications:
If any connector and region combination encounters an issue, the system flags it with a Failed status.
The UI displays a detailed error message to assist in resolving the issue quickly.

#### Status Breakdown:

1. **Failed Status :** A failed status indicates one of the following scenarios:

- Missing Permissions: The necessary permissions required for Harness to get or list resources are not provided.
- Harness Internal Error: A system-level issue occurred during processing.

2. **Ignored Status :** An ignored status indicates one of the following scenarios:

- No Cost Data Available: Billing connector setup at Harness is missing cost data for the target cloud account.
- Cost Threshold Not Met: Cost is less than $300 for the combination of subscription x region.
- Invalid Region: The regions found in cost data is not valid to run against Governance Rule.

3. **Success Status :** A successful status indicates one of the following scenarios:

- Recommendation Generated: The system successfully evaluated the rule and created a recommendation.
- No Resources in Evaluation: The rule was evaluated, but there were no resources found.
- Savings Below Threshold: A recommendation was generated, but the potential savings were calculated to be less than $10.

## Recommendations

### Granular Recommendations

Cloud Asset Governance provides valuable recommendations, but when it comes to operationalizing them at scale, it might become challenging. Additionally, when using shared cloud accounts across teams, subscription-level recommendations might not work out.With Granular Recommendations, Governance recommendations will now be generated at the individual resource level, ensuring greater granularity and actionable insights for both custom and out-of-the-box (OOTB) recommendations. This enhancement simplifies implementation and tracking, enabling customers to address governance issues more effectively at scale.

#### Enabling Granular Recommendations

 <iframe 
     src="https://app.tango.us/app/embed/25a843d3-c733-4459-99f5-69558757865c" 
     title="Enabling Granular Governance Recommendations in Cloud Cost Management" 
     style={{minHeight:'640px'}}
     width="100%" 
     height="100%" 
     referrerpolicy="strict-origin-when-cross-origin" 
     frameborder="0" 
     webkitallowfullscreen="webkitallowfullscreen" 
     mozallowfullscreen="mozallowfullscreen" 
     allowfullscreen="allowfullscreen"></iframe>

Owing to this, now, while adding a recommendation to Ignore List, users have the option to specify the scope at which the users want to ignore the recommendation. The scope can be either at:

- Rule-level
- Rule-level + Subscription/Region-level
- Rule-level + Subscription/Region-level + Resource-level.

  <DocImage path={require('../static/azure-granular.png')} width="90%" height="90%" title="Click to view full size image" />

### Recommendation: delete-low-utilized-azure-cosmodb
**Description:** Delete low utilised CosmosDB based on total requests in last 72 hours.

**Policy Used:**
```yaml
policies:
  - name: delete-low-utilized-azure-cosmodb
    resource: azure.cosmosdb
    description: |
      Delete low utilised CosmosDB based on total requests in last 72 hours
    filters:
      - type: metric
        metric: TotalRequests
        op: le
        aggregation: total
        threshold: 1000
        timeframe: 72
    actions:
      - type: delete    
```
**Savings Computed:** The policy identifies a list of resources on which potential savings are calculated by summing up cost of each resource for last 30 days.

**Permissions Required:** To execute the action section of the custodian policy, the Contributor Role is required, whereas the Reader Role suffices for generating recommendations.

---

### Recommendation: delete-unattached-azure-disk
**Description:** Delete all unattached disks. 

**Policy Used:**
```yaml
policies:
  - name: delete-unattached-azure-disk
    resource: azure.disk
    description: |
      Delete all unattached disks
    filters:
      - type: value
        key: properties.diskState
        value: Unattached
    actions:
      - type: delete
```

**Savings Computed:** The recommendation identifies a list of resources; to calculate potential savings, the costs of all resources over the last 30 days are summed together and that is shown as the potential savings.  

**Permissions Required:** To execute the action section of the custodian policy, the Contributor Role is required, whereas the Reader Role suffices for generating recommendations.

---

### Recommendation: delete-low-utilized-azure-load-balancer
**Description:** Delete all low utilised load balancers where packet count is less than 1000 in last 72 hours.  

**Policy Used:**
```yaml
policies:
  - name: delete-low-utilized-azure-load-balancer
    resource: azure.loadbalancer
    description: |
      Delete all low utilised load balancers where packet count is less than 1000 in last 72 hours
    filters:
      - type: metric
        metric: PacketCount
        op: le
        aggregation: total
        threshold: 1000
        timeframe: 72
    actions:
      - type: delete      
```

**Savings Computed:** The policy identifies a list of resources on which potential savings are calculated by summing up cost of each resource for last 30 days. 

**Permissions Required:** To execute the action section of the custodian policy, the Contributor Role is required, whereas the Reader Role suffices for generating recommendations.

---

### Recommendation: delete-orphaned-azure-networkinterface
**Description:** Delete network interface which are not attached to virtual machine.

**Policy Used:**
```yaml
policies:
  - name: delete-orphaned-azure-networkinterface
    resource: azure.networkinterface
    description: |
      Delete network interface which are not attached to virtual machine
    filters:
      - type: value
        key: properties.virtualMachine
        value: null
    actions:
        - type: delete
```

**Savings Computed:** The policy identifies a list of resources on which potential savings are calculated by summing up cost of each resource for last 30 days.

**Permissions Required:** To execute the action section of the custodian policy, the Contributor Role is required, whereas the Reader Role suffices for generating recommendations.

---

### Recommendation: stop-underutilized-azure-vm
**Description:** Stop underutilised virtual machines with average CPU utilisation less than 5% in last 72 hours.  

**Policy Used:**
```yaml
policies:
  - name: stop-underutilized-azure-vm
    resource: azure.vm
    description: |
      Stop underutilised virtual machines with average CPU utilisation less than 5% in last 72 hours
    filters:
      - type: metric
        metric: Percentage CPU
        op: le
        aggregation: average
        threshold: 5
        timeframe: 72
    actions:
      - type: stop
```

**Savings Computed:** The policy identifies a list of resources on which potential savings are calculated by summing up cost of each resource for last 30 days.

**Permissions Required:** To execute the action section of the custodian policy, the Contributor Role is required, whereas the Reader Role suffices for generating recommendations.

---

### Recommendation: delete-low-utilized-azure-keyvault 
**Description:** Delete KeyVaults with less than 10 API hits in last 72 hours.

**Policy Used:**
```yaml
policies:
  - name: delete-low-utilized-azure-keyvault
    resource: azure.keyvault
    description: |
      Delete KeyVaults with less than 10 API hits in last 72 hours
    filters:
      - type: metric
        metric: ServiceApiHit
        aggregation: total
        op: lt
        threshold: 10
        timeframe: 72
    actions:
      - type: delete
```

**Savings Computed:** The policy identifies a list of resources on which potential savings are calculated by summing up cost of each resource for last 30 days.

**Permissions Required:** To execute the action section of the custodian policy, the Contributor Role is required, whereas the Reader Role suffices for generating recommendations.

---

### Recommendation: delete-low-utilized-azure-sqlserver
**Description:** Delete SQL servers with less than 10% average DTU consumption over last 72 hours.  

**Policy Used:** 
```yaml
policies:
  - name: delete-low-utilized-azure-sqlserver
    resource: azure.sqlserver
    description: |
      Delete SQL servers with less than 10% average DTU consumption over last 72 hours
    filters:
      - type: metric
        metric: dtu_consumption_percent
        aggregation: average
        op: lt
        threshold: 10
        timeframe: 72
        filter:  "DatabaseResourceId eq '*'"
    actions:
      - type: delete
```

**Savings Computed:** The policy identifies a list of resources on which potential savings are calculated by summing up cost of each resource for last 30 days.

**Permissions Required:** To execute the action section of the custodian policy, the Contributor Role is required, whereas the Reader Role suffices for generating recommendations.

---

### Recommendation: delete-unattached-azure-publicip
**Description:** Delete public ip which are not attached to any network interface.  

**Policy Used:**
```yaml
policies:
  - name: delete-unattached-azure-publicip
    resource: azure.publicip
    description: |
      Delete public ip which are not attached to any network interface
    filters:
      - type: value
        key: properties.ipConfiguration
        value: null
    actions:
      - type: delete
```

**Savings Computed:** The policy identifies a list of resources on which potential savings are calculated by summing up cost of each resource for last 30 days.

**Permissions Required:** To execute the action section of the custodian policy, the Contributor Role is required, whereas the Reader Role suffices for generating recommendations.

---

### Recommendation: delete-low-utilized-azure-datalake
**Description:** Delete all Datalake Stores with less than 1000 read requests or 1000 write requests in the last 72 hours.

**Policy Used:**
```yaml
policies:
  - name: delete-low-utilized-azure-datalake
    resource: azure.datalake
    description: |
      Delete all Datalake Stores with less than 1000 read requests or 1000 write requests in the last 72 hours
    filters:
      - or:
        - type: metric
          metric: ReadRequests	
          op: le
          aggregation: total
          threshold: 1000
          timeframe: 72
        - type: metric
          metric: WriteRequests	
          op: le
          aggregation: total
          threshold: 100
          timeframe: 72          
    actions:
      - type: delete
```

**Savings Computed:** The policy identifies a list of resources on which potential savings are calculated by summing up cost of each resource for last 30 days.

**Permissions Required:** To execute the action section of the custodian policy, the Contributor Role is required, whereas the Reader Role suffices for generating recommendations.

---

### Recommendation: delete-unused-azure-postgresql-server 
**Description:** Delete PostgreSQL Servers that have had zero active connections in the last 72 hours. 

**Policy Used:**
```yaml
policies:
  - name: delete-unused-azure-postgresql-server
    resource: azure.postgresql-server
    description: |
      Delete PostgreSQL Servers that have had zero active connections in the last 72 hours
    filters:
      - type: metric
        metric: active_connections
        op: eq
        threshold: 0
        timeframe: 72
    actions:
      - type: delete
```

**Savings Computed:** The policy identifies a list of resources on which potential savings are calculated by summing up cost of each resource for last 30 days.

**Permissions Required:** To execute the action section of the custodian policy, the Contributor Role is required, whereas the Reader Role suffices for generating recommendations.

---

### Recommendation: delete-orphaned-azure-appserviceplan
**Description:** Delete orphaned(numberOfSites=0) application service plan

**Policy Used:**
```yaml
policies:
  - name: delete-orphaned-azure-appserviceplan
    resource: azure.appserviceplan
    description: |
      Delete orphaned(numberOfSites=0) application service plan
    filters:
      - type: value
        key: properties.numberOfSites
        op: eq
        value: 0
    actions:
      - delete
```

**Savings Computed:** The recommendation identifies a list of resources; to calculate potential savings, the costs of all resources over the last 30 days are summed together and that is shown as the potential savings.  

**Permissions Required:** To execute the action section of the custodian policy, the Contributor Role is required, whereas the Reader Role suffices for generating recommendations.

## Custom Policies

1. Find SQL Databases with a monthly long term backup retention period more than one year
```
policies:
  - name: long-term-backup-retention
    resource: azure.sqldatabase
    filters:
      - type: long-term-backup-retention
        backup-type: monthly
        op: gt
        retention-period: 1
        retention-period-units: year
```

2. Filter to select all virtual machines that are not running:

```
policies:
  - name: stopped-vm
    resource: azure.vm
    filters:
     - type: instance-view
       key: statuses[].code
       op: not-in
       value_type: swap
       value: "PowerState/running"
```

3. Removes all empty resource groups from the subscription:

```
policies:
    - name: rg-remove-empty
      description: |
        Removes any empty resource groups from subscription
      resource: azure.resourcegroup
      filters:
        - type: empty-group
      actions:
        - type: delete

```

4. Restricts access to storage accounts with specified ip rules to only the ips specified:
```
policies:
  - name: storage-block-public-access
    description: |
        Blocks public access to storage accounts with defined IP access rules.
    resource: azure.storage

    filters:
    - type: value
      key: properties.networkAcls.ipRules
      value_type: size
      op: ne
      value: 0

    actions:
    - type: set-firewall-rules
      default-action: Deny
      ip-rules: []
```

5. Find all SQL databases with Premium SKU:

```
policies:
  - name: sqldatabase-with-premium-sku
    resource: azure.sqldatabase
    filters:
      - type: value
        key: sku.tier
        op: eq
        value: Premium

```

