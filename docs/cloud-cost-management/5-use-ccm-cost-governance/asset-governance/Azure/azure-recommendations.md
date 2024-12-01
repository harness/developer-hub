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

