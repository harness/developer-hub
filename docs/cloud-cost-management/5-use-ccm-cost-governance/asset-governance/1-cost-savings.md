---
title: Cost Savings
description: This topic describes recommendations and custom policies
# sidebar_position: 2
---

# Cost Savings

## Recommendations

### Recommendations provided by Harness

#### **1. Recommendation: delete-low-utilised-cosmodb**

**- Description**: Delete low utilised cosmosDb based on total requests in last 72 hours

**- Policy Used**:
```
policies:
  - name: delete-low-utilised-cosmodb
    resource: azure.cosmosdb
    description: |
      Delete low utilised cosmosDb based on total requests in last 72 hours
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

**- Savings Computed**: The recommendation identifies a list of resources; to calculate potential savings, the costs of all resources over the last 30 days is summed together and that is shown as the potential savings.

**- Permissions Required**: For running actions, use the Contributor Role; for running filters and generating recommendations, use the Reader Role.

#### 2. Recommendation: delete-unattached-disk
**- Description:** Delete all unattached disks

**- Policy Used**:
```
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

**- Savings Computed**: The recommendation identifies a list of resources; to calculate potential savings, the costs of all resources over the last 30 days is summed together and that is shown as the potential savings.

**- Permissions Required**: For running actions, use the Contributor Role; for running filters and generating recommendations, use the Reader Role.

#### 3. Recommendation: delete-low-utilised-load-balancers

**- Description**: Delete all low utilised load balancers where packet count is less than 1000 in last 72 hours

**- Policy Used**:

```
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

**- Savings Computed**: The recommendation identifies a list of resources; to calculate potential savings, the costs of all resources over the last 30 days is summed together and that is shown as the potential savings.

**- Permissions Required**: For running actions, use the Contributor Role; for running filters and generating recommendations, use the Reader Role.

#### 4. Recommendation: delete-orphaned-network-interface

**- Description**: Delete network interface which are not attached to virtual machine

**- Policy Used**:

```
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

**- Savings Computed**: The recommendation identifies a list of resources; to calculate potential savings, the costs of all resources over the last 30 days is summed together and that is shown as the potential savings.

**- Permissions Required**: For running actions, use the Contributor Role; for running filters and generating recommendations, use the Reader Role.

#### 5. Recommendation: stop-underutilized-vms

**- Description**: Stop underutilised virtual machines with average CPU utilisation less than 5% in last 72 hours

**- Policy Used**:

```
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

**- Savings Computed**: The recommendation identifies a list of resources; to calculate potential savings, the costs of all resources over the last 30 days is summed together and that is shown as the potential savings.

**- Permissions Required**: For running actions, use the Contributor Role; for running filters and generating recommendations, use the Reader Role.

#### 6. Recommendation: delete-low-utilised-keyvaults

**- Description**: Delete KeyVaults with less than 10 API hits in last 72 hours

**- Policy Used**:

```
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

**- Savings Computed**: The recommendation identifies a list of resources; to calculate potential savings, the costs of all resources over the last 30 days is summed together and that is shown as the potential savings.

**- Permissions Required**: For running actions, use the Contributor Role; for running filters and generating recommendations, use the Reader Role.

#### 7. Recommendation: delete-low-utilised-sql-server

**- Description**: Delete SQL servers with less than 10% average DTU consumption over last 72 hours

**- Policy Used**: 

```
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

**- Savings Computed**: The recommendation identifies a list of resources; to calculate potential savings, the costs of all resources over the last 30 days is summed together and that is shown as the potential savings.

**- Permissions Required**: For running actions, use the Contributor Role; for running filters and generating recommendations, use the Reader Role.

#### 8: Recommendation: delete-unattached-publicip

**- Description**: Delete public ip which are not attached to any network interface

**- Policy Used**:

```
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

**- Savings Computed**: The recommendation identifies a list of resources; to calculate potential savings, the costs of all resources over the last 30 days is summed together and that is shown as the potential savings.

**- Permissions Required**: For running actions, use the Contributor Role; for running filters and generating recommendations, use the Reader Role.

#### 9. Recommendation: delete-low-utilised-datalake

**- Description**: Delete all Datalake Stores with less than 1000 read requests or 1000 write requests in the last 72 hours

**- Policy Used**:
```
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

**- Savings Computed**: The recommendation identifies a list of resources; to calculate potential savings, the costs of all resources over the last 30 days is summed together and that is shown as the potential savings.

**- Permissions Required**: For running actions, use the Contributor Role; for running filters and generating recommendations, use the Reader Role.

#### 10.Recommendation: delete-unused-postgresql-servers

**- Description**: Delete PostgreSQL Servers that have had zero active connections in the last 72 hours

**- Policy Used**:

```
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

**- Savings Computed**: The recommendation identifies a list of resources; to calculate potential savings, the costs of all resources over the last 30 days is summed together and that is shown as the potential savings.

**- Permissions Required**: For running actions, use the Contributor Role; for running filters and generating recommendations, use the Reader Role.

### Custom Policies

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
