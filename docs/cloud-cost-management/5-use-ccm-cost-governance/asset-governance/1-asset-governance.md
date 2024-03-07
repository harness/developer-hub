---
title: Overview
description: This topic talks about Harness cloud asset governance.
# sidebar_position: 2
---
## What is Governance 

### Overview of Cloud asset governance 
Cloud Asset Governance is a governance-as-code engine which allows you to define policy guardrails eliminating the need for manual approval flows which hamper productivity.  It helpes you find non-compliant resources as defined in your standards from a cost, security and compliance standpoint. 

Cloud Asset Governance, while having the capability to service policies from other key use cases, focuses on helping you to optimize cloud spend and enhancing FinOps excellence. It supports a wide range of use cases: Auto-tagging, cleaning up of Orphaned resources and creating workflows around these policies.  By leveraging policy-as-code, it automates resource optimization, security, and compliance tasks, freeing your engineers to focus on creating innovative products and services that drive your revenue.

Cloud Asset Governance is built on top of the popular open source software Cloud Custodian, we have support for all 3 Major Cloud Service Providers: AWS, GCP and Azure.

### Resource Coverage

Harness also offers a wide range of policies which are available out of the box, which you can leverage on day 0 to optimize your cloud resources and set up guardrails against future wastage.

#### AWS Resource Coverage (Comprehensive list)

EC2 instances
S3 buckets
Lambda functions
RDS (Relational Database Service) instances
CloudFormation stacks

#### Azure Resource Coverage (Comprehensive list)

Virtual Machines (VMs)
Storage accounts
App services
Cosmos DB accounts
Key Vaults

#### GCP Resource Coverage (Comprehensive list)

Compute Engine instances
Cloud Storage buckets
App Engine applications
Cloud SQL instances
Cloud IAM policies

### Use Cases

Orphaned resource cleanup
Cloud Asset Governance enables organizations to define policies that automatically identify and clean up orphaned resources across cloud providers. For example, a policy can be crafted to detect unattached volumes or unused IP addresses. When these resources are found, automated actions can be triggered to delete them, preventing unnecessary costs due to resource sprawl in a multi-cloud setup.

#### Tagging Automation 

You can automate the tagging of resources across different cloud providers, ensuring consistency and adherence to governance standards. By defining policies that enforce tagging rules, Cloud Asset Governance can automatically tag resources upon creation or update existing tags to meet compliance requirements.

#### Identifying underutilized resources 

Cloud Asset Governance helps in identifying underutilized resources by monitoring their usage patterns and applying predefined policies to flag resources that do not meet utilization thresholds. For instance, a policy could look for EC2 instances in AWS or VMs in Azure that have low CPU and network activity over a certain period. Cloud Asset Governance can then take corrective actions, such as sending notifications or automatically resizing these resources

#### Automated remediations

Cloud Asset Governance's policy-driven approach enables automated remediation of various issues, including security vulnerabilities and non-compliant configurations. Organizations can define policies that automatically enforce desired states or configurations for resources across cloud platforms. If Asset Governance detects a deviation from the policy, it can automatically execute remediation actions, such as automated cleanup, encryption, tagging etc. 

#### Security and compliance use cases

Cloud Asset Governance supports a wide range of security and compliance use cases.. For security, policies can be set to detect open security groups, unencrypted data stores, or non-compliant IAM configurations. For compliance, Custodian can ensure resources align with standards such as HIPAA, PCI-DSS, or GDPR by continuously monitoring and enforcing the necessary controls. 

### Cloud Custodian 

Cloud custodian is a widely used open-source cloud management tool backed by CNCF which helps organizations enforce policies and automate actions to enable them achieve a well maintained cloud environment. It operates on the principles of declarative YAML based policies. With support for multiple cloud providers, including AWS, Azure, and Google Cloud, Cloud Custodian enables users to maintain consistent policies and governance practices across diverse cloud environments, making it particularly appealing for organizations embracing a multi-cloud strategy.

Cloud Custodian comes with all the goodness of battle testing by the community & detects and auto remediates issues - it does come with its own set of challenges. Let’s dive into what are the key challenges that organizations run into when leveraging Cloud Custodian at scale to manage their assets.

### Harness vs Cloud Custodian

Cloud Custodian, while a widely used open-source cloud management tool, presents several challenges, including lack of a graphical interface, scalability issues, limited reporting and security features, complex policy creation requiring YAML syntax knowledge, and operational overhead.

In contrast, Harness Cloud Asset Governance retains the strengths of Cloud Custodian while addressing its shortcomings. Harness provides preconfigured governance-as-code rules for easy implementation and customization, powered by an AI Development Assistant (AIDA™) for natural language policy authoring. It offers a fully managed and scalable rule execution engine, reducing operational complexities for organizations. The platform includes a user-friendly visual interface, Role-Based Access Control, and detailed Audit trails for centralized visibility and precise access management.

Additionally, Harness incorporates Out-of-the-Box Recommendations to identify cost-saving opportunities and improve compliance and security. By choosing Harness Cloud Asset Governance, organizations can optimize their cloud governance, enhance customization and usability, and overcome the challenges associated with self-hosting Cloud Custodian.

Harness Cloud Asset Governance streamlines cloud management processes, improves governance efficiency, and enables organizations to achieve a well-managed cloud environment effectively. More details about the comparison can be found here.

## Cost Savings

### Recommendations

1. **Recommendation: delete-low-utilised-cosmodb**
  a. **Description**: Delete low utilised cosmosDb based on total requests in last 72 hours
  b. **Policy Used**:
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
  c. **Savings Computed**: The recommendation identifies a list of resources; to calculate potential savings, the costs of all resources over the last 30 days is summed together and that is shown as the potential savings.

  d. **Permissions Required**: For running actions, use the Contributor Role; for running filters and generating recommendations, use the Reader Role.




2. **Recommendation:**
  a. **Description**: Delete all unattached disks
  b. **Policy Used**:
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
  c. **Savings Computed**:The recommendation identifies a list of resources; to calculate potential savings, the costs of all resources over the last 30 days is summed together and that is shown as the potential savings.

  d. **Permissions Required**: For running actions, use the Contributor Role; for running filters and generating recommendations, use the Reader Role.




3. **Recommendation:delete-low-utilised-load-balancers**
  a. **Description**: Delete all low utilised load balancers where packet count is less than 1000 in last 72 hours
  b. **Policy Used**:
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
  c. **Savings Computed**: The recommendation identifies a list of resources; to calculate potential savings, the costs of all resources over the last 30 days is summed together and that is shown as the potential savings.

  d. **Permissions Required**: For running actions, use the Contributor Role; for running filters and generating recommendations, use the Reader Role.


4. **Recommendation:delete-orphaned-network-interface**
  a. **Description**: Delete network interface which are not attached to virtual machine
  b. **Policy Used**:
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
  c. **Savings Computed**: The recommendation identifies a list of resources; to calculate potential savings, the costs of all resources over the last 30 days is summed together and that is shown as the potential savings.

  d. **Permissions Required**: For running actions, use the Contributor Role; for running filters and generating recommendations, use the Reader Role.

5. **Recommendation:stop-underutilized-vms**
  a. **Description**:Stop underutilised virtual machines with average CPU utilisation less than 5% in last 72 hours
  b. **Policy Used**:
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
  c. **Savings Computed**: The recommendation identifies a list of resources; to calculate potential savings, the costs of all resources over the last 30 days is summed together and that is shown as the potential savings.

  d. **Permissions Required**: For running actions, use the Contributor Role; for running filters and generating recommendations, use the Reader Role.

6. **Recommendation:delete-low-utilised-keyvaults**
  a. **Description**: Delete KeyVaults with less than 10 API hits in last 72 hours
  b. **Policy Used**:
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
  c. **Savings Computed**: The recommendation identifies a list of resources; to calculate potential savings, the costs of all resources over the last 30 days is summed together and that is shown as the potential savings.

  d. **Permissions Required**: For running actions, use the Contributor Role; for running filters and generating recommendations, use the Reader Role.


7. **Recommendation: delete-low-utilised-sql-server**
  a. **Description**: Delete SQL servers with less than 10% average DTU consumption over last 72 hours
  b. **Policy Used**:
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
  c. **Savings Computed**: The recommendation identifies a list of resources; to calculate potential savings, the costs of all resources over the last 30 days is summed together and that is shown as the potential savings.

  d. **Permissions Required**: For running actions, use the Contributor Role; for running filters and generating recommendations, use the Reader Role.

8. **Recommendation: delete-unattached-publicip **
  a. **Description**: Delete public ip which are not attached to any network interface
  b. **Policy Used**:
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
  c. **Savings Computed**: The recommendation identifies a list of resources; to calculate potential savings, the costs of all resources over the last 30 days is summed together and that is shown as the potential savings.

  d. **Permissions Required**: For running actions, use the Contributor Role; for running filters and generating recommendations, use the Reader Role.

9. **Recommendation: delete-low-utilised-datalake **
  a. **Description**: Delete all Datalake Stores with less than 1000 read requests or 1000 write requests in the last 72 hours
  b. **Policy Used**:
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
  c. **Savings Computed**: The recommendation identifies a list of resources; to calculate potential savings, the costs of all resources over the last 30 days is summed together and that is shown as the potential savings.

  d. **Permissions Required**: For running actions, use the Contributor Role; for running filters and generating recommendations, use the Reader Role.


10. **Recommendation:delete-unused-postgresql-servers**
  a. **Description**: Delete PostgreSQL Servers that have had zero active connections in the last 72 hours
  b. **Policy Used**:
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
  c. **Savings Computed**: The recommendation identifies a list of resources; to calculate potential savings, the costs of all resources over the last 30 days is summed together and that is shown as the potential savings.

  d. **Permissions Required**:  For running actions, use the Contributor Role; for running filters and generating recommendations, use the Reader Role.

## Custom Policies
