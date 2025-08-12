---
title: CCM Explore Available Data
description: Learn how to explore available data.
# sidebar_position: 2
helpdocs_is_private: false
helpdocs_is_published: true
---

## Before You Begin

- Review the [Harness Dashboards documentation](/docs/category/harness-dashboards) for general dashboard functionality
- Understand how to [Create Dashboards](/docs/platform/dashboards/create-dashboards) in the Harness platform

## CCM Explore

CCM provides different Explore options with dimensions and measures for each cloud provider. Below is a comprehensive list of available data fields for each provider.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="aws" label="AWS">

## AWS Billing & Transaction Field Reference

Below is a comprehensive reference for AWS Bill fields.

## Bill

| Field Group | Label Short | Name | Description |
|-------------|-------------|------|-------------|
| - | Bill Type | aws.billtype | The type of bill that this report covers. There are three bill types: Anniversary (for services used during the month), Purchase (for upfront service fees), and Refund (for refunds). |
| - | Billing Entity | aws.billingentity | Helps you identify whether your invoices or transactions are for AWS Marketplace or for purchases of other AWS services. Possible values include: AWS – Identifies a transaction for AWS services other than in AWS Marketplace. AWS Marketplace – Identifies a purchase in AWS Marketplace. |
| - | Invoice ID | aws.bill_invoice_id | The ID associated with a specific line item. Until the report is final, the InvoiceId is blank. |
| - | Payer Account ID | aws.awspayeraccountid | The account ID of the paying account. For an organization in AWS Organizations, this is the account ID of the management account. |
| Billing Period End / Date | Billing Period End / Date | aws.billingperiodenddate_date | The end date of the billing period that is covered by this report. Note: the timezone is configurable in widget settings. |
| Billing Period End / Date | Billing Period End / Month | aws.billingperiodenddate_month | The end date of the billing period that is covered by this report. Note: the timezone is configurable in widget settings. |
| Billing Period End / Date | Billing Period End / Month Name | aws.billingperiodenddate_month_name | The end date of the billing period that is covered by this report. Note: the timezone is configurable in widget settings. |
| Billing Period End / Date | Billing Period End / Quarter | aws.billingperiodenddate_quarter | The end date of the billing period that is covered by this report. Note: the timezone is configurable in widget settings. |
| Billing Period End / Date | Billing Period End / Time | aws.billingperiodenddate_time | The end date of the billing period that is covered by this report. Note: the timezone is configurable in widget settings. |
| Billing Period End / Date | Billing Period End / Week | aws.billingperiodenddate_week | The end date of the billing period that is covered by this report. Note: the timezone is configurable in widget settings. |
| Billing Period End / Date | Billing Period End / Year | aws.billingperiodenddate_year | The end date of the billing period that is covered by this report. Note: the timezone is configurable in widget settings. |
| Billing Period Start / Date | Billing Period Start / Date | aws.billingperiodstartdate_date | The start date of the billing period that is covered by this report. Note: the timezone is configurable in widget settings. |
| Billing Period Start / Date | Billing Period Start / Month | aws.billingperiodstartdate_month | The start date of the billing period that is covered by this report. Note: the timezone is configurable in widget settings. |
| Billing Period Start / Date | Billing Period Start / Month Name | aws.billingperiodstartdate_month_name | The start date of the billing period that is covered by this report. Note: the timezone is configurable in widget settings. |
| Billing Period Start / Date | Billing Period Start / Quarter | aws.billingperiodstartdate_quarter | The start date of the billing period that is covered by this report. Note: the timezone is configurable in widget settings. |
| Billing Period Start / Date | Billing Period Start / Time | aws.billingperiodstartdate_time | The start date of the billing period that is covered by this report. Note: the timezone is configurable in widget settings. |
| Billing Period Start / Date | Billing Period Start / Week | aws.billingperiodstartdate_week | The start date of the billing period that is covered by this report. Note: the timezone is configurable in widget settings. |
| Billing Period Start / Date | Billing Period Start / Year | aws.billingperiodstartdate_year | The start date of the billing period that is covered by this report. Note: the timezone is configurable in widget settings. |

## Identity

| Field Group | Label Short | Name | Description |
|-------------|-------------|------|-------------|
| - | Line Item ID | aws.lineitemid | This field is generated for each line item and is unique in a given partition. This does not guarantee that the field will be unique across an entire delivery (that is, all partitions in an update) of the AWS CUR. The line item ID isn't consistent between different Cost and Usage Reports and can't be used to identify the same line item across different reports. |
| - | Time Interval | aws.timeinterval | The time interval that this line item applies to, in the following format: YYYY-MM-DDTHH:mm:ssZ/YYYY-MM-DDTHH:mm:ssZ. The time interval is in UTC and can be either daily or hourly, depending on the granularity of the report. |

## Line Item

| Field Group | Label Short | Name | Description |
|-------------|-------------|------|-------------|
| - | Blended Rate | aws.blendedrate | The average rate for each SKU across the entire organization. For example, for EC2 this is the average cost of Reserved Instances and On-Demand Instances. Blended rates are used to allocate costs to member accounts. |
| - | Currency Code | aws.currencycode | The ISO 4217 code for the currency used in AWS billing (e.g., USD, EUR). |
| - | Legal Entity | aws.legalentity | The Seller of Record of a specific product or service. In most cases, the invoicing entity and legal entity are the same. The values might differ for third-party AWS Marketplace transactions. Possible values include: Amazon Web Services, Inc. – The entity that sells AWS services. Amazon Web Services India Private Limited – The local Indian entity that acts as a reseller for AWS services in India. |
| - | Line Item Description | aws.lineitemdescription | The description of the line item type. For example, the description of a usage line item summarizes what type of usage you incurred during a specific time period. |
| - | Line Item Type | aws.lineitemtype | The type of charge covered by this line item. Possible values include: Credit, DiscountedUsage, Fee, Refund, RIFee, Tax, Usage, and SavingsPlanCoveredUsage. |
| - | Normalization Factor | aws.normalizationfactor | A factor that normalizes different instance sizes within the same instance family for easier comparison. |
| - | Product Code | aws.productcode | The code for the AWS product. For example, Amazon EC2 is represented as AmazonEC2. |
| - | Resource ID | aws.resourceid | Resource ID refers to a column that displays the unique identifier of a specific resource you provisioned within your AWS account, like an EC2 instance, S3 bucket, or RDS database, if you choose to include individual resource IDs in your report; essentially, it allows you to pinpoint exactly which resource is associated with a particular cost line item in your billing data. |
| - | Tax Type | aws.taxtype | The type of tax applied to AWS billing (e.g., sales tax, VAT in CUR). |
| - | Unblended Rate | aws.unblendedrate | The unblended rate is the rate associated with an individual account's service usage. For Amazon EC2 and Amazon RDS line items that have an RI discount applied to them, the UnblendedRate is zero. Line items with an RI discount have a LineItemType of DiscountedUsage. |
| - | Usage Account ID | aws.aws_usageaccountid_hidden | The account ID of the account that used this line item. For organizations, this can be either the management account or a member account. You can use this field to track costs or usage by account. |
| - | Usage Account Name | aws.aws_usageaccountname | AWS account names. |
| Usage End Time Period / Date | Usage End Time Period / Date | aws.end_date | The end date and time for the corresponding line item in UTC, exclusive. The format is YYYY-MM-DDTHH:mm:ssZ. Note: the time zone can be configured in widget settings. |
| Usage End Time Period / Date | Usage End Time Period / Month | aws.end_month | The end date and time for the corresponding line item in UTC, exclusive. The format is YYYY-MM-DDTHH:mm:ssZ. Note: the time zone can be configured in widget settings. |
| Usage End Time Period / Date | Usage End Time Period / Month Name | aws.end_month_name | The end date and time for the corresponding line item in UTC, exclusive. The format is YYYY-MM-DDTHH:mm:ssZ. Note: the time zone can be configured in widget settings. |
| Usage End Time Period / Date | Usage End Time Period / Quarter | aws.end_quarter | The end date and time for the corresponding line item in UTC, exclusive. The format is YYYY-MM-DDTHH:mm:ssZ. Note: the time zone can be configured in widget settings. |
| Usage End Time Period / Date | Usage End Time Period / Time | aws.end_time | The end date and time for the corresponding line item in UTC, exclusive. The format is YYYY-MM-DDTHH:mm:ssZ. Note: the time zone can be configured in widget settings. |
| Usage End Time Period / Date | Usage End Time Period / Week | aws.end_week | The end date and time for the corresponding line item in UTC, exclusive. The format is YYYY-MM-DDTHH:mm:ssZ. Note: the time zone can be configured in widget settings. |
| Usage End Time Period / Date | Usage End Time Period / Year | aws.end_year | The end date and time for the corresponding line item in UTC, exclusive. The format is YYYY-MM-DDTHH:mm:ssZ. Note: the time zone can be configured in widget settings. |
| Usage Start Time Period / Date | Usage Start Time Period / Date | aws.start_date | The start date and time for the line item in UTC, inclusive. The format is YYYY-MM-DDTHH:mm:ssZ. Note: the time zone can be configured in widget settings. |
| Usage Start Time Period / Date | Usage Start Time Period / Month | aws.start_month | The start date and time for the line item in UTC, inclusive. The format is YYYY-MM-DDTHH:mm:ssZ. Note: the time zone can be configured in widget settings. |
| Usage Start Time Period / Date | Usage Start Time Period / Month Name | aws.start_month_name | The start date and time for the line item in UTC, inclusive. The format is YYYY-MM-DDTHH:mm:ssZ. Note: the time zone can be configured in widget settings. |
| Usage Start Time Period / Date | Usage Start Time Period / Quarter | aws.start_quarter | The start date and time for the line item in UTC, inclusive. The format is YYYY-MM-DDTHH:mm:ssZ. Note: the time zone can be configured in widget settings. |
| Usage Start Time Period / Date | Usage Start Time Period / Time | aws.start_time | The start date and time for the line item in UTC, inclusive. The format is YYYY-MM-DDTHH:mm:ssZ. Note: the time zone can be configured in widget settings. |
| Usage Start Time Period / Date | Usage Start Time Period / Week | aws.start_week | The start date and time for the line item in UTC, inclusive. The format is YYYY-MM-DDTHH:mm:ssZ. Note: the time zone can be configured in widget settings. |
| Usage Start Time Period / Date | Usage Start Time Period / Year | aws.start_year | The start date and time for the line item in UTC, inclusive. The format is YYYY-MM-DDTHH:mm:ssZ. Note: the time zone can be configured in widget settings. |
| - | Usage Type | aws.usagetype | The usage details of the line item. For example, USW2-BoxUsage:m2.2xlarge describes an M2 High Memory Double Extra Large instance in the US West (Oregon) Region. |

## Pricing

| Field Group | Label Short | Name | Description |
|-------------|-------------|------|-------------|
| - | Lease Contract Length | aws.leasecontractlength | The duration of a lease contract for a reserved AWS resource (e.g., 1 year, 3 years for EC2, RDS). |
| - | Public On-Demand Rate | aws.publicondemandrate | The public On-Demand Instance rate in this billing period for the specific line item of usage. If you have SKUs with multiple On-Demand public rates, the equivalent rate for the highest tier is displayed. For example, services offering free-tiers or tiered pricing. |
| - | Purchase Option | aws.purchase_option | How you chose to pay for this line item. Valid values are All Upfront, Partial Upfront, and No Upfront. |
| - | Rate ID | aws.rateid | The unique identifier for an AWS pricing rate in billing (e.g., for specific service SKUs). |
| - | Term | aws.term | Specifies the billing term for an AWS resource, such as On-Demand, Reserved, or Savings Plan, indicating the commitment level and pricing model |
| - | Unit | aws.unit | The pricing unit that AWS used for calculating your usage cost. For example, the pricing unit for Amazon EC2 instance usage is in hours. |


## Product

| Field Group | Label Short | Name | Description |
|-------------|-------------|------|-------------|
| Billing & Cost Management | Capacity Status | aws.awscapacitystatus | Current status of an AWS resource's capacity (e.g., active, scaling, exhausted). |
| Billing & Cost Management | Counts Against Quota | aws.awscountsagainstquota | Indicates if the usage counts against a defined service quota (e.g., 'Yes', 'No'). |
| Billing & Cost Management | Data Transfer Quota | aws.awsdatatransferquota | The data transfer quota associated with the service or free tier. |
| Billing & Cost Management | Fee Code | aws.feecode | A unique code identifying a specific AWS service fee in billing. |
| Billing & Cost Management | Fee Description | aws.feedescription | A human-readable description of a specific AWS service fee in billing. |
| Billing & Cost Management | Free Overage | aws.awsfreeoverage | Indicates if usage is part of a free tier overage. |
| Billing & Cost Management | Free Query Types | aws.freequerytypes | Types of queries exempt from charges under AWS free tier or conditions (e.g., Athena, CloudWatch queries). |
| Billing & Cost Management | Free Tier | aws.awsfreetier | Describes the type of free tier usage (e.g., '12 Months Free', 'Always Free'). |
| Billing & Cost Management | Free Trial | aws.awsfreetrial | Indicates if the usage is part of a free trial for a service. |
| Billing & Cost Management | Free Usage Included | aws.freeusageincluded | The amount of free usage included in an AWS service offering (e.g., GB, hours in free tier). |
| Billing & Cost Management | Offer | aws.offer | The specific offer, promotion, or pricing plan applied to the usage. |
| Billing & Cost Management | Offering Class | aws.offeringclass | The class of AWS reservation offering (e.g., standard, convertible for Reserved Instances). |
| Billing & Cost Management | Overage Type | aws.overagetype | The type of overage charges incurred after exceeding a quota or free tier limit. |
| Billing & Cost Management | Pricing Unit | aws.pricingunit | The pricing unit that AWS used for calculating your usage cost. |
| Billing & Cost Management | Reserve Type | aws.reservetype | The type of reservation made. |
| Billing & Cost Management | Term Type | aws.termtype | The term type for a commitment, such as 'On-Demand' or 'Reserved'. |
| Billing & Cost Management | Trial Product | aws.trialproduct | Indicates if the product usage is part of a trial period. |
| Billing & Cost Management | Upfront Commitment | aws.upfrontcommitment | The upfront commitment made for a service or reservation (e.g., 'Yes', 'No'). |
| Compute & Instance Specifications | Accelerator Size | aws.awsacceleratorsize | The size or capacity of the hardware accelerator associated with the resource. |
| Compute & Instance Specifications | Accelerator Type | aws.awsacceleratortype | The type of hardware accelerator used, such as GPU, FPGA, or AWS Inferentia. |
| Compute & Instance Specifications | CPU Type | aws.awscputype | The manufacturer or architecture of the CPU, such as 'Intel', 'AMD', or 'AWS Graviton'. |
| Compute & Instance Specifications | Clock Speed | aws.awsclockspeed | The clock speed of the processor for the compute resource, typically measured in GHz. |
| Compute & Instance Specifications | Compute Family | aws.awscomputefamily | The family of the compute resource, such as 'General Purpose' or 'Compute Optimized'. |
| Compute & Instance Specifications | Compute Type | aws.awscomputetype | The specific type of compute resource within a family, often indicating the processor generation or capabilities (e.g., 'Standard', 'High-CPU'). |
| Compute & Instance Specifications | Current Generation | aws.currentgeneration | Indicates whether an AWS resource or instance is of the current hardware generation (e.g., Yes/No for EC2 m5 vs. m4). |
| Compute & Instance Specifications | ECU | aws.ecu | Elastic Compute Unit (ECU), a measure of CPU capacity for AWS compute resources (e.g., EC2, Lambda). |
| Compute & Instance Specifications | Elastic Graphics Type | aws.awselasticgraphicstype | The type of Elastic Graphics accelerator attached to a Windows instance. |
| Compute & Instance Specifications | Engine | aws.engine | The core engine powering an AWS service (e.g., EC2 compute, RDS database engine). |
| Compute & Instance Specifications | Engine Code | aws.enginecode | A code representing the specific engine version or variant used by an AWS service. |
| Compute & Instance Specifications | GPU | aws.gpu | The number of GPUs on an instance. This field applies to services like Amazon EC2 and Amazon SageMaker when using GPU-accelerated instances. |
| Compute & Instance Specifications | GPU Memory | aws.gpumemory | The total amount of memory, measured in gigabytes (GB), available on the instance's GPU. This applies to services like Amazon EC2 and Amazon SageMaker. Common values include 16, 32, etc. |
| Compute & Instance Specifications | Instance | aws.instance | The specific instance identifier within AWS services. |
| Compute & Instance Specifications | Instance Family | aws.instancefamily | The family of instance types (e.g., 'm' for general purpose, 'c' for compute optimized). |
| Compute & Instance Specifications | Instance Function | aws.instancefunction | The role or purpose of an AWS instance (e.g., compute-optimized, storage-optimized, web server). |
| Compute & Instance Specifications | Instance SKU | aws.instancesku | The Stock Keeping Unit identifier for a specific AWS instance configuration. |
| Compute & Instance Specifications | Instance Type | aws.instancetype | The type of instance used (e.g., t2.micro, m5.large). |
| Compute & Instance Specifications | Instance Type Family | aws.instancetypefamily | The broader family grouping for AWS instance types. |
| Compute & Instance Specifications | Intel AVX Available | aws.intelavxavailable | Indicates if Intel Advanced Vector Extensions (AVX) are available on the instance. |
| Compute & Instance Specifications | Intel AVX2 Available | aws.intelavx2available | Indicates if Intel Advanced Vector Extensions 2 (AVX2) are available on the instance. |
| Compute & Instance Specifications | Intel Turbo Available | aws.intelturboavailable | Indicates if Intel Turbo Boost Technology is available on the instance. |
| Compute & Instance Specifications | Memory | aws.memory | The amount of memory associated with the resource, typically measured in GB. |
| Compute & Instance Specifications | Memory (GiB) | aws.memorygib | The amount of memory in gibibytes (GiB) associated with the resource. |
| Compute & Instance Specifications | Memory Type | aws.memorytype | The type of memory used by the resource (e.g., DDR4, GDDR6). |
| Compute & Instance Specifications | Network Performance | aws.networkperformance | The network performance capability of the resource (e.g., 'High', 'Moderate', '25 Gigabit'). |
| Compute & Instance Specifications | Physical CPU | aws.physicalcpu | The number of physical CPU cores available on the instance. |
| Compute & Instance Specifications | Physical GPU | aws.physicalgpu | The number of physical GPUs available on the instance. |
| Compute & Instance Specifications | Physical Processor | aws.physicalprocessor | The specific model of the physical processor used in the compute resource. |
| Compute & Instance Specifications | Processor Architecture | aws.processorarchitecture | The architecture of the processor (e.g., 'x86_64', 'arm64'). |
| Compute & Instance Specifications | Processor Features | aws.processorfeatures | Special features or capabilities of the processor. |
| Compute & Instance Specifications | Tenancy | aws.tenancy | The tenancy option for an instance (e.g., 'Shared', 'Dedicated', 'Host'). |
| Compute & Instance Specifications | vCPU | aws.vcpu | The number of virtual CPUs associated with the resource. |
| Database & Analytics | Broker Engine | aws.awsbrokerengine | The message broker engine type for a service like Amazon MQ (e.g., RabbitMQ, ActiveMQ). |
| Database & Analytics | Cache Engine | aws.awscacheengine | The type of caching engine used (e.g., Redis, Memcached). |
| Database & Analytics | CloudSearch Version | aws.awscloudsearchversion | The API version of the Amazon CloudSearch domain. |
| Database & Analytics | Database Edition | aws.awsdatabaseedition | The edition of a database used in an AWS service (e.g., SQL Server Enterprise, Oracle Standard, MySQL Community). |
| Database & Analytics | Database Engine | aws.databaseengine | The database engine type used in an AWS service (e.g., MySQL, PostgreSQL, Aurora). |
| Database & Analytics | Directory Size | aws.directorysize | The size or edition of the AWS Directory, such as 'Standard', 'Enterprise', or 'Small', which often corresponds to the edition of AWS Managed Microsoft AD. |
| Database & Analytics | Directory Type | aws.directorytype | Identifies the specific type of AWS Directory Service deployed, such as 'Microsoft AD', 'Simple AD', or 'Shared Microsoft AD'. |
| Database & Analytics | Directory Type Description | aws.directorytypedescription | A detailed explanation of the resource type, such as compute or storage. |
| Database & Analytics | High Availability | aws.awshighavailability | Indicates if the resource is configured for high availability (e.g., 'Multi-AZ'). |
| Database & Analytics | Indexing Source | aws.awsindexingsource | The source for an indexing job, such as in Amazon Kendra. |
| Database & Analytics | Real-Time Operation | aws.realtimeoperation | Indicates if an AWS operation is real-time (e.g., Yes/No for Kinesis, Lambda) in billing. |
| Database & Analytics | Supported Modes | aws.supportedmodes | The operational modes supported by an AWS service (e.g., On-Demand, Provisioned for Lambda). |
| Deployment & Architecture | Architectural Review | aws.architecturalreview | Indicates whether an architectural review was conducted for an AWS resource or service. |
| Deployment & Architecture | Architecture Support | aws.architecturesupport | Level of support provided for a specific AWS architecture (e.g., basic, premium). |
| Deployment & Architecture | Availability Zone | aws.availabilityZone | Specifies the geographical location of the AWS resources, indicating the specific data center within a region where the resource is deployed (e.g., us-east-1a) |
| Deployment & Architecture | Deployment Location | aws.awsdeploymentlocation | The location where the application or resource is deployed (e.g., 'Edge', 'Region'). |
| Deployment & Architecture | Deployment Model | aws.awsdeploymentmodel | The deployment model used, such as 'Single-AZ' or 'Multi-AZ'. |
| Deployment & Architecture | Deployment Option | aws.deploymentoption | The deployment model for an AWS service (e.g., On-Demand, Reserved, Spot, Dedicated Host) affecting cost or usage. |
| Deployment & Architecture | Maximum Capacity | aws.awsmaximumcapacity | The maximum capacity of a provisioned resource. |
| Deployment & Architecture | Running Mode | aws.runningmode | The operational mode of an AWS resource (e.g., active, standby for RDS, ELB). |
| Deployment & Architecture | Server Location | aws.awsserverlocation | The physical location of the server, often more specific than a region. |
| Deployment & Architecture | Snowball Type | aws.awssnowballtype | The type of AWS Snowball device used (e.g., 'Snowball Edge', 'Snowcone'). |
| Geographic & Location | Country | aws.awscountry | The country where the resource or service is located or where usage originated. |
| Geographic & Location | From Location | aws.fromlocation | The physical or virtual location from which an AWS service is accessed (e.g., region, edge location). |
| Geographic & Location | From Location Type | aws.fromlocationtype | The type of location from which an AWS service is accessed (e.g., region, availability zone, edge location). |
| Geographic & Location | Geo Region Code | aws.georegioncode | The geographic region code for AWS services (e.g., US, EU, APAC). |
| Geographic & Location | Location | aws.location | The geographical location of an AWS resource or usage (e.g., us-east-1, global). |
| Geographic & Location | Location Type | aws.locationtype | The type of location for an AWS resource (e.g., region, availability zone, edge location). |
| Geographic & Location | To Country | aws.awstocountry | The destination country for data transfer. |
| Geographic & Location | To Location | aws.awstolocation | The destination location for data transfer, such as a specific AWS Region or 'Internet'. |
| Geographic & Location | To Location Type | aws.awstolocationtype | The type of the destination location for data transfer, such as 'AWS Region' or 'AWS Edge Location'. |
| Geographic & Location | Transfer Type | aws.transfertype | The direction or nature of data transfer, such as inbound or outbound. |
| Instance Capacity | Awsinstancecapacity10xlarge | aws.awsinstancecapacity10xlarge | The compute capacity status or allocation for 10xlarge instances. |
| Instance Capacity | Awsinstancecapacity16xlarge | aws.awsinstancecapacity16xlarge | The compute capacity status or allocation for 16xlarge instances. |
| Instance Capacity | Awsinstancecapacity18xlarge | aws.awsinstancecapacity18xlarge | The compute capacity status or allocation for 18xlarge instances. |
| Instance Capacity | Awsinstancecapacity24xlarge | aws.awsinstancecapacity24xlarge | The compute capacity status or allocation for 24xlarge instances. |
| Instance Capacity | Awsinstancecapacity2xlarge | aws.awsinstancecapacity2xlarge | The compute capacity status or allocation for 2xlarge instances. |
| Instance Capacity | Awsinstancecapacity32xlarge | aws.awsinstancecapacity32xlarge | The compute capacity status or allocation for 32xlarge instances. |
| Instance Capacity | Instancecapacity12xlarge | aws.instancecapacity12xlarge | The compute capacity status or allocation for 12xlarge AWS instances (e.g., vCPUs, availability) for usage tracking. |
| Instance Capacity | Instancecapacity18xlarge | aws.instancecapacity18xlarge | The compute capacity status or allocation for 18xlarge AWS instances (e.g., vCPUs, availability) for usage tracking. |
| Instance Capacity | Instancecapacity24xlarge | aws.instancecapacity24xlarge | The compute capacity status or allocation for 24xlarge AWS instances (e.g., vCPUs, availability) for usage tracking. |
| Instance Capacity | Instancecapacity4xlarge | aws.instancecapacity4xlarge | The compute capacity status or allocation for 4xlarge AWS instances (e.g., vCPUs, availability) for usage tracking. |
| Instance Capacity | Instancecapacity8xlarge | aws.instancecapacity8xlarge | The compute capacity status or allocation for 8xlarge AWS instances (e.g., vCPUs, availability) for usage tracking. |
| Instance Capacity | Instancecapacity9xlarge | aws.instancecapacity9xlarge | The compute capacity status or allocation for 9xlarge AWS instances (e.g., vCPUs, availability) for usage tracking. |
|

</TabItem>

<TabItem value="azure" label="Azure">


## Azure Billing & Transaction Field Reference

Below is a concise, collapsible reference. Click a group to expand its table.

## Billing & Transaction

<details>
<summary><strong>Account</strong></summary>

| Label Short | Azure Name | Description |
|-------------|-----------|-------------|
| Account ID | azure.account_id | The primary identifier for the account. Displays the EA Account ID if available, otherwise falls back to the Subscription ID. |
| Account Name | azure.account_name | The primary name for the account. Displays the EA Account Name if available, otherwise falls back to the Subscription Name. |
| Account Owner ID | azure.azure_account_owner_id | The email ID of the EA enrollment account owner. |
| Azure Cloud Provider Entity Id | azure.azure_cloudprovider_entity_id |  |
| Billing Account ID | azure.azure_billing_account_id | Unique identifier for the root billing account. |
| Billing Account Name | azure.azure_billing_account_name | Name of the billing account. |
| Billing Profile ID | azure.azure_billing_profile_id | Unique identifier of the EA enrollment, pay-as-you-go subscription or MCA billing profile. |
| Billing Profile Name | azure.azure_billing_profile_name | Name of the EA enrollment, pay-as-you-go subscription or MCA billing profile. |

</details>

<details>
<summary><strong>Billing Period End / Date</strong></summary>

| Label Short | Azure Name | Description |
|-------------|-----------|-------------|
| Billing Period End / Date | azure.azure_billing_period_end_date | The end date of the billing period. |
| Billing Period End / Month | azure.azure_billing_period_end_month | The end date of the billing period. |
| Billing Period End / Month Name | azure.azure_billing_period_end_month_name | The end date of the billing period. |
| Billing Period End / Quarter | azure.azure_billing_period_end_quarter | The end date of the billing period. |
| Billing Period End / Time | azure.azure_billing_period_end_time | The end date of the billing period. |
| Billing Period End / Week | azure.azure_billing_period_end_week | The end date of the billing period. |
| Billing Period End / Year | azure.azure_billing_period_end_year | The end date of the billing period. |

</details>

<details>
<summary><strong>Billing Period Start / Date</strong></summary>

| Label Short | Azure Name | Description |
|-------------|-----------|-------------|
| Billing Period Start / Date | azure.azure_billing_period_start_date | The start date of the billing period. |
| Billing Period Start / Month | azure.azure_billing_period_start_month | The start date of the billing period. |
| Billing Period Start / Month Name | azure.azure_billing_period_start_month_name | The start date of the billing period. |
| Billing Period Start / Quarter | azure.azure_billing_period_start_quarter | The start date of the billing period. |
| Billing Period Start / Time | azure.azure_billing_period_start_time | The start date of the billing period. |
| Billing Period Start / Week | azure.azure_billing_period_start_week | The start date of the billing period. |
| Billing Period Start / Year | azure.azure_billing_period_start_year | The start date of the billing period. |

</details>

<details>
<summary><strong>Commitments & Benefits</strong></summary>

| Label Short | Azure Name | Description |
|-------------|-----------|-------------|
| Benefit ID | azure.azure_benefit_id | Unique identifier for the purchased savings plan instance. |
| Benefit Name | azure.azure_benefit_name | Unique identifier for the purchased savings plan instance. |
| Reservation ID | azure.azure_reservation_id | Unique identifier for the purchased reservation instance. |
| Reservation Name | azure.azure_reservation_name | Name of the purchased reservation instance. |

</details>



<details>
<summary><strong>Cost Allocation</strong></summary>

| Label Short | Azure Name | Description |
|-------------|-----------|-------------|
| Cost Allocation Rule Name | azure.azure_cost_allocation_rule_name | Name of the Cost Allocation rule that's applicable to the record. |
| Cost Center | azure.azure_cost_center | The cost center defined for the subscription for tracking costs. |

</details>

<details>
<summary><strong>Currency</strong></summary>

| Label Short | Azure Name | Description |
|-------------|-----------|-------------|
| Billing Currency Code | azure.azure_billing_currency_code | Currency associated with the billing account. |

</details>

<details>
<summary><strong>Customer</strong></summary>

| Label Short | Azure Name | Description |
|-------------|-----------|-------------|
| Customer Name | azure.azure_customer_name | Name of the Microsoft Entra tenant for the customer's subscription. |
| Customer Tenant ID | azure.azure_customer_tenant_id | Identifier of the Microsoft Entra tenant of the customer's subscription. |

</details>


<details>
<summary><strong>End Time Period / Date</strong></summary>

| Label Short | Azure Name | Description |
|-------------|-----------|-------------|
| End Time Period / Date | azure.end_date | The usage or purchase date of the charge. Specifies the unit of time for the visualizations. |
| End Time Period / Month | azure.end_month | The usage or purchase date of the charge. Specifies the unit of time for the visualizations. |
| End Time Period / Month Name | azure.end_month_name | The usage or purchase date of the charge. Specifies the unit of time for the visualizations. |
| End Time Period / Quarter | azure.end_quarter | The usage or purchase date of the charge. Specifies the unit of time for the visualizations. |
| End Time Period / Time | azure.end_time | The usage or purchase date of the charge. Specifies the unit of time for the visualizations. |
| End Time Period / Week | azure.end_week | The usage or purchase date of the charge. Specifies the unit of time for the visualizations. |
| End Time Period / Year | azure.end_year | The usage or purchase date of the charge. Specifies the unit of time for the visualizations. |

</details>

<details>
<summary><strong>Invoice</strong></summary>

| Label Short | Azure Name | Description |
|-------------|-----------|-------------|
| Invoice ID | azure.azure_invoice_id | The unique document ID listed on the invoice PDF. |
| Invoice Section ID | azure.azure_invoice_section_id | Unique identifier for the EA department or MCA invoice section. |
| Invoice Section Name | azure.azure_invoice_section_name | Name of the EA department or MCA invoice section. |
| Previous Invoice ID | azure.azure_previous_invoice_id | Reference to an original invoice if the line item is a refund. |

</details>



<details>
<summary><strong>Partner</strong></summary>

| Label Short | Azure Name | Description |
|-------------|-----------|-------------|
| Reseller MPN ID | azure.azure_reseller_mpn_id | ID for the reseller associated with the subscription. |
| Reseller Name | azure.azure_reseller_name | The name of the reseller associated with the subscription. |

</details>



<details>
<summary><strong>Start Time Period / Date</strong></summary>

| Label Short | Azure Name | Description |
|-------------|-----------|-------------|
| Start Time Period / Date | azure.start_date | The usage or purchase date of the charge. Specifies the unit of time for the visualizations. |
| Start Time Period / Month | azure.start_month | The usage or purchase date of the charge. Specifies the unit of time for the visualizations. |
| Start Time Period / Month Name | azure.start_month_name | The usage or purchase date of the charge. Specifies the unit of time for the visualizations. |
| Start Time Period / Quarter | azure.start_quarter | The usage or purchase date of the charge. Specifies the unit of time for the visualizations. |
| Start Time Period / Time | azure.start_time | The usage or purchase date of the charge. Specifies the unit of time for the visualizations. |
| Start Time Period / Week | azure.start_week | The usage or purchase date of the charge. Specifies the unit of time for the visualizations. |
| Start Time Period / Year | azure.start_year | The usage or purchase date of the charge. Specifies the unit of time for the visualizations. |

</details>

<details>
<summary><strong>Subscription</strong></summary>

| Label Short | Azure Name | Description |
|-------------|-----------|-------------|
| Subscription ID | azure.azure_subscription_id | Unique identifier for the Azure subscription. |
| Subscription Name | azure.azure_subscription_name | Name of the Azure subscription. |

</details>

<details>
<summary><strong>Transaction Details</strong></summary>

| Label Short | Azure Name | Description |
|-------------|-----------|-------------|
| Frequency | azure.azure_frequency | Indicates whether a charge is expected to repeat. Charges can either happen once (OneTime), repeat on a monthly or yearly basis (Recurring), or be based on usage (UsageBased). |
| Transaction Type | azure.azure_charge_type | Indicates whether the charge represents usage (Usage), a purchase (Purchase), or a refund (Refund). |

</details>


<details>
<summary><strong>Usage  Date</strong></summary>

| Label Short | Azure Name | Description |
|-------------|-----------|-------------|
| Usage  Date | azure.usage_date | The usage date of the charge in yyyy-mm-dd format. |
| Usage  Month | azure.usage_month | The usage date of the charge in yyyy-mm-dd format. |
| Usage  Month Name | azure.usage_month_name | The usage date of the charge in yyyy-mm-dd format. |
| Usage  Quarter | azure.usage_quarter | The usage date of the charge in yyyy-mm-dd format. |
| Usage  Time | azure.usage_time | The usage date of the charge in yyyy-mm-dd format. |
| Usage  Week | azure.usage_week | The usage date of the charge in yyyy-mm-dd format. |
| Usage  Year | azure.usage_year | The usage date of the charge in yyyy-mm-dd format. |

</details>

## Location

<details>

| Label Short | Azure Name | Description |
|-------------|-----------|-------------|
| Location (Normalized) | azure.azure_location | The normalized location used to resolve inconsistencies in region names. For example, US East. |
| Meter Region | azure.azure_meter_region | The name of the Azure region associated with the meter. It generally aligns with the resource location, except for certain global meters. |
| Region | azure.region | The geographic area where Azure hosts your resources. |
| Keys | azure_tags.key | Master list of all keys. Tag Key that you can use to track costs associated with specific areas/entities within your business. |
| Values | azure_tags.value | Master list of all values. Tag Value that you can use to track costs associated with specific areas/entities within your business. |

</details>

## Pricing & Usage

<details>
<summary><strong>Credit Eligibility</strong></summary>

| Label Short | Azure Name | Description |
|-------------|-----------|-------------|
| Is Azure Credit Eligible (Yes / No) | azure.azure_is_azure_credit_eligible | Indicates if the charge is eligible to be paid for using Azure credits. |

</details>


<details>
<summary><strong>Pricing</strong></summary>

| Label Short | Azure Name | Description |
|-------------|-----------|-------------|
| Currency | azure.azure_pricing_currency | Currency associated with the pricing unit. |
| Effective Price (Resource Rate) | azure.azure_resource_rate | The price for a given product or service that represents the actual rate that you end up paying per unit. |
| Pay-As-You-Go Price | azure.azure_pay_g_price | The market price, also referred to as retail or list price, for a given product or service. |
| Pricing Model | azure.azure_pricing_model | Identifier that indicates how the meter is priced. (Values: OnDemand, Reservation, Spot, and SavingsPlan) |
| Term | azure.azure_term | Displays the term for the validity of the offer. For example: For reserved instances, it displays 12 months. Not applicable for Azure consumption. |
| Unit Price | azure.azure_unit_price_hub | The price for a given Azure product or service inclusive of any negotiated discount on top of the market price. |

</details>

<details>
<summary><strong>Usage</strong></summary>

| Label Short | Azure Name | Description |
|-------------|-----------|-------------|
| Unit Of Measure | azure.azure_unit_of_measure | The unit of measure for billing for the service. For example, compute services are billed per hour. |

</details>



## Resource & Service Details

<details>
<summary><strong>Account</strong></summary>

| Label Short | Azure Name | Description |
|-------------|-----------|-------------|
| Tenant ID | azure.azure_tenant_id | A globally unique identifier (GUID) that identifies your organization's instance of Azure Active Directory (Azure AD), also known as Microsoft Entra ID. |


</details>


<details>
<summary><strong>Compute Instance</strong></summary>

| Label Short | Azure Name | Description |
|-------------|-----------|-------------|
| Instance Category | azure.instance_category | The functional category of the instance (e.g., General Purpose), derived from its family. |
| Instance Family | azure.instance_family | The family of the Compute Engine VM (e.g., Dv3 Series), extracted from the meter name. |
| Instance Size | azure.instance_size | An abstract 'T-shirt' size (e.g., Small, Medium, Large) derived from the instance type's vCPU count. |
| Instance Type | azure.instance_type | The specific VM size (e.g., Standard_D2s_v3), extracted from service metadata. |
| Operating System | azure.operating_system | Operating system, extracted from the Meter Name. Best effort, may not apply to all services. |
| VM Scale Set Name | azure.vm_scale_set_name | The name of the Virtual Machine Scale Set the resource belongs to, if applicable. |

</details>

<details>
<summary><strong>Database</strong></summary>

| Label Short | Azure Name | Description |
|-------------|-----------|-------------|
| DB Engine | azure.db_engine | Database engine, extracted from the Meter Name for database services. |

</details>

<details>
<summary><strong>Meter</strong></summary>

| Label Short | Azure Name | Description |
|-------------|-----------|-------------|
| Meter Category | azure.azure_meter_category | Name of the classification category for the meter. For example, Cloud services and Networking. |
| Meter ID | azure.azure_meter_id | The unique identifier for the meter. |
| Meter Name | azure.azure_meter_name | The name of the meter. Meters are used to track a resource's usage for billing. |
| Meter Sub-Category | azure.azure_meter_sub_category | Name of the meter subclassification category. |

</details>


<details>
<summary><strong>Product</strong></summary>

| Label Short | Azure Name | Description |
|-------------|-----------|-------------|
| Offer ID | azure.azure_offer_id | Name of the Azure offer, which is the type of Azure subscription that you have. |
| Product Name | azure.azure_product_name | Name of the product. |
| Product Order ID | azure.azure_product_order_id | Unique identifier for the product order. |
| Product Order Name | azure.azure_product_order_name | Unique name for the product order. |

</details>

<details>
<summary><strong>Publisher</strong></summary>

| Label Short | Azure Name | Description |
|-------------|-----------|-------------|
| Plan Name | azure.azure_plan_name | Marketplace plan name. |
| Publisher Name | azure.azure_publisher_name | The name of the publisher. For first-party services, this is typically 'Microsoft' or 'Microsoft Corporation'. |
| Publisher Type | azure.azure_publisher_type | Supported values: Microsoft, Azure, Marketplace. |

</details>

<details>
<summary><strong>Resource</strong></summary>

| Label Short | Azure Name | Description |
|-------------|-----------|-------------|
| Instance ID (Resource ID) | azure.azure_instance_id | Unique identifier of the Azure Resource Manager resource. Formed using subscription ID, resource group, providers, resource name, etc. |
| Item Description | azure.item_description | A cleaned-up, human-readable version of the Meter Name, with common clutter removed. |
| Resource Group | azure.azure_resource_group | Name of the resource group the resource is in. A container that holds related resources for management. |
| Resource Name (Friendly) | azure.resource_name_friendly | A user-friendly resource name, prioritized to use the 'Name' tag, then the parsed name from the ID, then the raw name. |
| Resource Name (Raw) | azure.azure_resource_name | Name of the resource. Not all charges come from deployed resources. |
| Resource Name (from ID) | azure.resource_name_from_id | The resource name parsed from the end of the full Resource ID path. |
| Resource Type | azure.azure_resource_type | Type of resource instance, e.g., Microsoft.Compute/virtualMachines. Not all charges come from deployed resources. |

</details>

<details>
<summary><strong>Service</strong></summary>

| Label Short | Azure Name | Description |
|-------------|-----------|-------------|
| Additional Info | azure.azure_additional_info | Service-specific metadata. For example, an image type for a virtual machine. |
| Consumed Service | azure.azure_consumed_service | Name of the service the charge is associated with. |
| Operation | azure.operation | A standardized operation derived from the Meter Category to align with concepts from other cloud providers (e.g., Run Instance, Data Transfer, Storage). |
| Product Family | azure.azure_product_family | Product family that the service belongs to. |
| Service Family | azure.azure_service_family | Service family that the service belongs to. |
| Service Name | azure.azure_service_name | The service family that the service belongs to (e.g., Virtual Machines, Storage). |
| Service Tier | azure.azure_service_tier | Name of the service subclassification category. |
| Usage Type | azure.usage_type | A high-level categorization of the usage (e.g., Compute, Storage, Networking). |

</details>


</TabItem>

<TabItem value="gcp" label="GCP">

</TabItem>

<TabItem value="unified" label="Unified">

</TabItem>
</Tabs>

