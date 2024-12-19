---
title: Azure Recommendations
description: This topic describes how to optimize cloud costs using asset governance.
# sidebar_position: 2
---

Recommendations help kickstart your journey with governance. Essentially, Harness runs certain policies behind the scenes to generate recommendations for your governance-enabled Azure subscriptions. These policies not only help to cut costs but also increase the efficiency of your system. On the Governance Overview page, Harness showcases recommendations that will benefit you to save costs on associated resources. You can click on any recommendation to view its details. 

Listed below are the custodian policies which are used to generate recommendations that Harness offers for Azure. Along with each policy, you can also find their respective descriptions, the logic behind savings computation and the permissions required to generate or apply these recommendations.

### Recommendation: delete-low-utilised-cosmodb
**Description:** Delete low utilised CosmosDB based on total requests in last 72 hours.

**Policy Used:**
```yaml
policies:
  - name: delete-low-utilised-cosmodb
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

### Recommendation: delete-unattached-disk
**Description:** Delete all unattached disks. 

**Policy Used:**
```yaml
policies:
  - name: delete-unattached-disk
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

### Recommendation: delete-low-utilised-load-balancers
**Description:** Delete all low utilised load balancers where packet count is less than 1000 in last 72 hours.  

**Policy Used:**
```yaml
policies:
  - name: delete-low-utilised-load-balancers
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

### Recommendation: delete-orphaned-network-interface
**Description:** Delete network interface which are not attached to virtual machine.

**Policy Used:**
```yaml
policies:
  - name: delete-orphaned-network-interface
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

### Recommendation: stop-underutilized-vms
**Description:** Stop underutilised virtual machines with average CPU utilisation less than 5% in last 72 hours.  

**Policy Used:**
```yaml
policies:
  - name: stop-underutilized-vms
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

### Recommendation: delete-low-utilised-keyvaults 
**Description:** Delete KeyVaults with less than 10 API hits in last 72 hours.

**Policy Used:**
```yaml
policies:
  - name: delete-low-utilised-keyvaults
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

### Recommendation: delete-low-utilised-sql-server
**Description:** Delete SQL servers with less than 10% average DTU consumption over last 72 hours.  

**Policy Used:** 
```yaml
policies:
  - name: delete-low-utilised-sql-server
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

### Recommendation: delete-unattached-publicip
**Description:** Delete public ip which are not attached to any network interface.  

**Policy Used:**
```yaml
policies:
  - name: delete-unattached-publicip
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

### Recommendation: delete-low-utilised-datalake
**Description:** Delete all Datalake Stores with less than 1000 read requests or 1000 write requests in the last 72 hours.

**Policy Used:**
```yaml
policies:
  - name: delete-low-utilised-datalake
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

### Recommendation: delete-unused-postgresql-servers 
**Description:** Delete PostgreSQL Servers that have had zero active connections in the last 72 hours. 

**Policy Used:**
```yaml
policies:
  - name: delete-unused-postgresql-servers
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


## Governance Recommendation Health

Harness CCM now provides users the ability to monitor Governance Recommendations through the new Optimization tab in the Governance module. 

This enhancement offers clear visibility into the evaluation status of each rule and provides detailed insights about the cloud account (connector) and region involved in generating the recommendations.

This tab is designed to streamline troubleshooting and improve visibility into why recommendations may fail, be ignored, or succeed, enabling users to take immediate corrective actions when necessary.

#### How It Works:
- Status Tracking: Each Recommendation Rule's status is displayed in the Optimization tab.
- Cloud Connector (Account ID): The specific cloud account associated with the rule.
- Region: The region for which the rule is evaluated.

#### Error Notifications:
If any connector and region combination encounters an issue, the system flags it with a Failed status.
The UI displays a detailed error message to assist in resolving the issue quickly.

#### Status Breakdown:

1. **Failed Status :**

This can be due to one of the following reasons:

- Missing Permissions: The necessary permissions required for Harness to get or list resources are not provided.
- Harness Internal Error: A system-level issue occurred during processing.

2. **Ignored Status :**
The recommendation process is skipped for the following reasons:

- No Cost Data Available: Billing connector setup at Harness is missing cost data for the target cloud account.
- Cost Threshold Not Met:
- AWS and Azure: Cost is less than $300 for the combination of account(or subscription) x region.
- GCP: Cost is less than $300 for the GCP project.
- Invalid Region: The regions found in cost data is not valid to run against Governance Rule.

3. **Success Status :**
A successful status indicates one of the following scenarios:

- Recommendation Generated: The system successfully evaluated the rule and created a recommendation.
- No Resources in Evaluation: The rule was evaluated, but there were no resources found.
- Savings Below Threshold: A recommendation was generated, but the potential savings were calculated to be less than $10.


