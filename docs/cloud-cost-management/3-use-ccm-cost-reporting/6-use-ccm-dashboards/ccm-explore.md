---
title: CCM Explore
description: This topic describes how to view CCM Explore and get more information about that data.
# sidebar_position: 2
helpdocs_is_private: false
helpdocs_is_published: true
---

## CCM Explore

CCM provides different Explore options with dimensions and measures for each cloud provider. Below is a comprehensive list of available data fields for each provider.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="aws" label="AWS">

<details>
<summary><strong>Bill</strong></summary>

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

</details>

<details>
<summary><strong>Identity</strong></summary>

| Field Group | Label Short | Name | Description |
|-------------|-------------|------|-------------|
| - | Line Item ID | aws.lineitemid | This field is generated for each line item and is unique in a given partition. This does not guarantee that the field will be unique across an entire delivery (that is, all partitions in an update) of the AWS CUR. The line item ID isn't consistent between different Cost and Usage Reports and can't be used to identify the same line item across different reports. |
| - | Time Interval | aws.timeinterval | The time interval that this line item applies to, in the following format: YYYY-MM-DDTHH:mm:ssZ/YYYY-MM-DDTHH:mm:ssZ. The time interval is in UTC and can be either daily or hourly, depending on the granularity of the report. |

</details>

<details>
<summary><strong>Line Item</strong></summary>

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
</details>
<details>
<summary><strong>Pricing</strong></summary>

| Field Group | Label Short | Name | Description |
|-------------|-------------|------|-------------|
| - | Lease Contract Length | aws.leasecontractlength | The duration of a lease contract for a reserved AWS resource (e.g., 1 year, 3 years for EC2, RDS). |
| - | Public On-Demand Rate | aws.publicondemandrate | The public On-Demand Instance rate in this billing period for the specific line item of usage. If you have SKUs with multiple On-Demand public rates, the equivalent rate for the highest tier is displayed. For example, services offering free-tiers or tiered pricing. |
| - | Purchase Option | aws.purchase_option | How you chose to pay for this line item. Valid values are All Upfront, Partial Upfront, and No Upfront. |
| - | Rate ID | aws.rateid | The unique identifier for an AWS pricing rate in billing (e.g., for specific service SKUs). |
| - | Term | aws.term | Specifies the billing term for an AWS resource, such as On-Demand, Reserved, or Savings Plan, indicating the commitment level and pricing model |
| - | Unit | aws.unit | The pricing unit that AWS used for calculating your usage cost. For example, the pricing unit for Amazon EC2 instance usage is in hours. |

</details>

<details>
<summary><strong>Billing & Cost Management</strong></summary>

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

</details>

<details>
<summary><strong>Compute & Instance Specifications</strong></summary>

| Field Group | Label Short | Name | Description |
|-------------|-------------|------|-------------|
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

</details>

<details>
<summary><strong>Compute & Instance Specifications (continued)</strong></summary>

| Field Group | Label Short | Name | Description |
|-------------|-------------|------|-------------|
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

</details>
<details>
<summary><strong>Database & Analytics</strong></summary>

| Field Group | Label Short | Name | Description |
|-------------|-------------|------|-------------|
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

</details>

<details>
<summary><strong>Deployment & Architecture</strong></summary>

| Field Group | Label Short | Name | Description |
|-------------|-------------|------|-------------|
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

</details>

<details>
<summary><strong>Geographic & Location</strong></summary>

| Field Group | Label Short | Name | Description |
|-------------|-------------|------|-------------|
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

</details>
<details>
<summary><strong>Instance Capacity</strong></summary>

| Field Group | Label Short | Name | Description |
|-------------|-------------|------|-------------|
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
</details>

</TabItem>

<TabItem value="azure" label="Azure">

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


<details>
<summary><strong>Account</strong></summary>

| Label Short | GCP Name | Description |
|-------------|----------|-------------|
| Billing ID | billing_account_id | The unique identifier of the Cloud Billing account associated with the usage. |
| Cloud Provider Entity ID | cloud_provider_entity_id | The identifier for the specific cloud provider entity. |

</details>

<details>
<summary><strong>Adjustment Info</strong></summary>

| Label Short | GCP Name | Description |
|-------------|----------|-------------|
| Adjustment Description | adjustment_info_description | A description of any billing adjustments, if applicable. |
| Adjustment ID | adjustment_info_id | The unique ID for the billing adjustment. |
| Adjustment Mode | adjustment_info_mode | The mode of the adjustment (e.g., "MANUAL"). |
| Adjustment Type | adjustment_info_type | The type of adjustment (e.g., "CORRECTION", "GOODWILL"). |

</details>

<details>
<summary><strong>Currency</strong></summary>

| Label Short | GCP Name | Description |
|-------------|----------|-------------|
| Conversion Rate | currency_conversion_rate | The conversion rate used to translate the original cost into USD. |
| Original Currency | currency | The currency used for the original cost, specified in ISO 4217 format. |

</details>


<details>
<summary><strong>End Time Period / Date</strong></summary>

| Label Short | GCP Name | Description |
|-------------|----------|-------------|
| Date | end_date | End of the usage window (date). |
| Hour | end_hour | End time at hour granularity. |
| Month | end_month | End month. |
| Month Name | end_month_name | End month name. |
| Quarter | end_quarter | End quarter. |
| Time | end_time | End timestamp with time. |
| Week | end_week | End week. |
| Year | end_year | End year. |

</details>



<details>
<summary><strong>Export Time Period / Date</strong></summary>

| Label Short | GCP Name | Description |
|-------------|----------|-------------|
| Date | export_date | Export timestamp (date). |
| Month | export_month | Export month. |
| Time | export_time | Export time. |
| Week | export_week | Export week. |
| Year | export_year | Export year. |

</details>



<details>
<summary><strong>Invoice</strong></summary>

| Label Short | GCP Name | Description |
|-------------|----------|-------------|
| Invoice Month | invoice_month | Invoice month (YYYYMM). |
| Invoice Publisher Type | invoice_publisher_type | Indicates whether the publisher is Google or a third-party marketplace. |

</details>


<details>
<summary><strong>Start Time Period / Date</strong></summary>

| Label Short | GCP Name | Description |
|-------------|----------|-------------|
| Date | start_date | Start of the usage window (date). |
| Hour | start_hour | Start time at hour granularity. |
| Time | start_time | Start timestamp with time. |
| Month | start_month | Start month. |
| Month Name | start_month_name | Start month name. |
| Quarter | start_quarter | Start quarter. |
| Week | start_week | Start week. |
| Year | start_year | Start year. |


</details>

<details>
<summary><strong>Transaction</strong></summary>

| Label Short | GCP Name | Description |
|-------------|----------|-------------|
| Cost Type | cost_type | Indicates the type of cost (regular, tax, rounding_error, adjustment). |
| Seller Name | seller_name | The seller of the service, for example, Google Cloud or a Marketplace seller. |
| Subscription Instance ID | subscription_instance_id | The unique Subscription Instance ID associated with the cost. |
| Type | type | The transaction category, such as Usage, Credit, or Tax. |

</details>


## Credits

<details>
<summary><strong>Credits</strong></summary>

| Label Short | GCP Name | Description |
|-------------|----------|-------------|
| Credit Full Name | gcp_credits.gcp_credit_full_name | The fully qualified resource name of the credit being applied. |
| Credit ID | gcp_credits.gcp_credit_id | The unique identifier for the specific credit being applied. |
| Credit Name | gcp_credits.gcp_credit_name | Display name of the credit. |
| Credit Type | gcp_credits.gcp_credit_type | Category of credit (e.g., PROMOTION, USAGE_DISCOUNT). |

</details>




## Location

<details>
<summary><strong>Location</strong></summary>

| Label Short | GCP Name | Description |
|-------------|----------|-------------|
| Country | gcp.country | The country where the resource is hosted, derived from the location. |
| Location | gcp.location | The specific location of the service, which can be a region or multi-region (e.g., 'us'). |
| Region | gcp.region | The geographic region where the resource is hosted (e.g., us-central1). |
| Zone | gcp.zone | The zone where the resource is hosted (e.g., us-central1-a). Not all resources have a zone. |

</details>


## Project

<details>
<summary><strong>Project</strong></summary>

| Field Group | Label Short | GCP Name | Description |
|-------------|-------------|----------|-------------|
| Ancestors | Ancestor Display Name | gcp_project_ancestors.display_name | The user-created name for the ancestor resource (e.g., 'My Production Folder'). |
| Ancestors | Ancestor Resource Name | gcp_project_ancestors.resource_name | The relative resource name for each ancestor in the format 'resourceType/resourceNumber'. |
| Ancestors | Project Ancestry Numbers | gcp.gcp_project_ancestry_numbers | The ancestors in the resource hierarchy for the project, shown as a path of numbers. |
| - | Project ID | gcp.gcp_project_id | The ID of the Google Cloud project that generated the cost. |
| - | Project Name | gcp.gcp_project_name | The user-assigned display name of the Google Cloud project. |
| - | Project Number | gcp.gcp_project_number | The unique, Google-assigned number of the Google Cloud project. |

</details>

## Service & SKU

<details>
<summary><strong>Service & SKU</strong></summary>

| Field Group | Label Short | GCP Name | Description |
|-------------|-------------|----------|-------------|
| Categorization | Usage Family | gcp.usage_family | A consolidated version of the GCP Product to align with the 'Usage Family' concept. |
| Categorization | Usage Type | gcp.usage_type | A high-level category derived from the SKU Description to simplify reporting (e.g., Compute, Storage, Networking). |
| Compute | Instance Category | gcp.instance_category | The functional category of the instance, derived from its family (e.g., General Purpose, Compute Optimized). |
| Compute | Instance Family | gcp.instance_family | The family of the Compute Engine VM (e.g., E2, N2, C3), displayed in uppercase to match standard Google Cloud convention. |
| Compute | Instance Size (Abstract) | gcp.instance_size_abstract | An abstract 'T-shirt' size (e.g., Micro, Small, Medium, Large) derived from the instance's vCPU count or name. |
| Compute | Instance Type | gcp.gcp_instance_type | The machine type of the Compute Engine VM (e.g., n1-standard-32). |
| Compute | Operating System | gcp.operating_system | Operating system, extracted from the SKU description. Best effort, may not apply to all services. |
| Database | Database Engine | gcp.db_engine | Database engine, extracted from the SKU description for database services. |
| Kubernetes | GKE Cluster Name | gcp.gke_cluster_name | The name of the GKE cluster, extracted from a prioritized list of common resource labels. |
| Kubernetes | GKE Namespace | gcp.gke_namespace | The name of the GKE namespace. Translates special Google-provided values into human-readable categories. |
| Pricing | Effective Price | gcp.gcp_price_effective_price | The effective price per pricing unit, after applying discounts. |
| Pricing | Pricing Tier Start Amount | gcp.pricing_tier_start_amount | The usage tier at which this price becomes effective. |
| Pricing | Pricing Unit | gcp.pricing_unit | The unit of measure for the price (e.g., 'gibibyte month'). |
| Pricing | Pricing Unit Quantity | gcp.pricing_unit_quantity | The number of units that the price is based on. |
| Resource | Global Resource Name | gcp.globalResourceName | The globally unique, persistent name of the resource. |
| Resource | Resource Name | gcp.resourceName | The user-provided name of the resource. |
| SKU | SKU Description | gcp.gcp_sku_description | A human-readable description of the Stock Keeping Unit (SKU). |
| SKU | SKU ID | gcp.gcp_sku_id | The unique identifier for the Stock Keeping Unit (SKU). |
| - | Product | gcp.gcp_product | The Google Cloud service that generated the cost, such as Compute Engine or BigQuery. |

</details>

## Usage

<details>
<summary><strong>Usage</strong></summary>

| Field Group | Label Short | GCP Name | Description |
|-------------|-------------|----------|-------------|
| - | Usage Amount | gcp.gcp_usage_amount_in_pricing_units | The quantity of usage converted to the standard pricing unit. |
| - | Usage Pricing Unit | gcp.gcp_usage_pricing_unit | The standard unit used for pricing this usage (e.g., 'gibibyte month'). |
| - | Usage Unit | gcp.gcp_usage_unit | The unit in which usage is measured (e.g., 'gibibyte'). |

</details>



</TabItem>

<TabItem value="unified" label="Unified">


<details>
<summary><strong>Account</strong></summary>

| Field | Description |
|-------|-------------|
| Billing Account ID | Unique identifier for the billing account. |
| Billing Account Name | Human-readable name of the billing account. |
| Sub-Account ID | Identifier for a sub-account or cloud project under the billing account. |
| Sub-Account Name | Name of the sub-account or cloud project. |

</details>



<details>
<summary><strong>Billing</strong></summary>

**Dimensions**

| Field | Description |
|-------|-------------|
| Billing Currency | Currency in which the bill is presented and paid. |
| Billing Source | Cloud provider that generated the cost record (AWS, Azure, GCP, or Cluster). |
| Consumed Unit | Unit of measure for the usage quantity (e.g., hours, GiB, requests). |

**Measures**

| Measure | Description |
|---------|-------------|
| Consumed Quantity (Hours) | Total resource usage measured in hours. |
| Contracted Unit Price | Unit price agreed under a commitment (Reserved Instances, Savings Plans, etc.). |
| Total Billed Cost | Cost actually billed on the invoice (post-discount). |
| Total Consumed Quantity | Aggregate usage across all line items, expressed in the Consumed Unit. |
| Total Contracted Cost | Cost associated with reserved or committed usage. |
| Total Effective Cost | Net cost after discounts, credits, and amortization. |
| Total List Cost | Public list-price cost before any discounts or credits. |

</details>

<details>
<summary><strong>Capacity Reservation</strong></summary>

| Field | Description |
|-------|-------------|
| Capacity Reservation ID | Unique identifier for the capacity reservation. |
| Capacity Reservation Status | Current status of the capacity reservation (e.g., active, expired). |

</details>

<details>
<summary><strong>Charge</strong></summary>

| Field | Description |
|-------|-------------|
| Charge Category | Classification of the charge (e.g., Usage, Tax, Credit). |
| Charge Class | Further classification of the charge type. |
| Charge Description | Detailed description of what the charge represents. |
| Charge Frequency | How often the charge is applied (e.g., one-time, recurring). |
| Invoice Issuer | Entity that issued the invoice containing this charge. |
| Provider | Service provider responsible for the charge. |
| Publisher | Entity that published the service or product. |

</details>

<details>
<summary><strong>Charge Origination</strong></summary>

| Field | Description |
|-------|-------------|
| Invoice ID | Unique identifier for the invoice associated with the charge. |

</details>

<details>
<summary><strong>Cluster</strong></summary>

**Dimensions**

| Field | Description |
|-------|-------------|
| Application Name | Name of the application running in the cluster. |
| Cluster Entity Selection | Type of entity selected for analysis. |
| Cluster Name | Name of the Kubernetes or ECS cluster. |
| Cluster Type | Type of cluster (e.g., Kubernetes, ECS). |
| ECS service name | Name of the ECS service if applicable. |
| Environment Name | Environment where the cluster is deployed (e.g., Production, Staging). |
| Instance Type filter [Node] | Whether instance type filtering is applied at the node level. |
| Instance Type filter [Pod] | Whether instance type filtering is applied at the pod level. |
| Namespace | Kubernetes namespace. |
| Workload Name | Name of the workload running in the cluster. |

**Measures**

| Measure | Description |
|---------|-------------|
| EfficiencyScore | Score indicating the resource utilization efficiency. |
| Idle Cost | Cost of resources that are provisioned but not utilized. |
| Network Cost | Cost associated with network traffic. |
| System Cost | Cost of system components and overhead. |
| Unallocated Cost | Cost that cannot be attributed to specific workloads. |
| Utilised Cost | Cost of resources that are actively utilized. |

</details>


<details>
<summary><strong>Commitment Discount</strong></summary>

| Field | Description |
|-------|-------------|
| Commitment Discount Category | Category of the commitment discount (e.g., Reserved Instance, Savings Plan). |
| Commitment Discount ID | Unique identifier for the commitment discount. |
| Commitment Discount Name | Name of the commitment discount. |
| Commitment Discount Type | Type of commitment discount (e.g., RI, SP, CUD). |

</details>


<details>
<summary><strong>External Data</strong></summary>

| Field | Description |
|-------|-------------|
| Billing Account Id | Unique identifier for the billing account. |
| Billing Account Name | Name of the billing account. |
| Charge Category | Category of the charge (e.g., Usage, Tax). |
| Cloud Provider Entity Name | Name of the cloud provider entity. |
| Consumed Quantity | Amount of resource consumed. |
| Provider Name | Name of the service provider. |
| Resource Id | Unique identifier for the resource. |
| Sku Id | Stock keeping unit identifier. |

</details>



<details>
<summary><strong>Location</strong></summary>

| Field | Description |
|-------|-------------|
| Availability Zone | Specific availability zone where the resource is deployed. |
| Region ID | Identifier for the geographic region. |
| Region Name | Name of the geographic region. |

</details>

<details>
<summary><strong>Pricing</strong></summary>

| Field | Description |
|-------|-------------|
| Pricing Category | Category of pricing (e.g., On-Demand, Reserved). |
| Pricing Quantity | Quantity used for pricing calculations. |
| Pricing Unit | Unit of measure for pricing (e.g., GB-month, hour). |

</details>

<details>
<summary><strong>Resource</strong></summary>

| Field | Description |
|-------|-------------|
| Resource ID | Unique identifier for the resource. |
| Resource Name | Name of the resource. |
| Resource Type | Type of the resource (e.g., VM, Storage, Database). |

</details>

<details>
<summary><strong>Service</strong></summary>

| Field | Description |
|-------|-------------|
| Service Category | High-level category of the service (e.g., Compute, Storage, Database). |
| Service Name | Name of the service (e.g., EC2, S3, RDS). |
| Service Subcategory | Subcategory of the service for more specific classification. |

</details>

<details>
<summary><strong>SKU</strong></summary>

| Field | Description |
|-------|-------------|
| SKU ID | Unique identifier for the stock keeping unit. |
| SKU Meter | Metering information for the SKU. |
| SKU Price ID | Identifier for the price of the SKU. |

</details>

<details>
<summary><strong>Timeframe</strong></summary>

| Field | Description |
|-------|-------------|
| Billing Period End Date | End date of the billing period. |
| Date | Specific date for the cost data. |
| Month | Month number for the cost data. |
| Month Name | Name of the month for the cost data. |
| Quarter | Quarter of the year for the cost data. |
| Time | Specific time for the cost data. |
| Week | Week number for the cost data. |
| Year | Year for the cost data. |

</details>

<details>
<summary><strong>Charge Period</strong></summary>

| Field | Description |
|-------|-------------|
| Charge Period End Date | End date of the charge period. |
| Billing Period Start Date | Start date of the billing period. |
| Date | Specific date for the charge data. |
| Month | Month number for the charge data. |
| Month Name | Name of the month for the charge data. |
| Quarter | Quarter of the year for the charge data. |
| Time | Specific time for the charge data. |
| Week | Week number for the charge data. |
| Year | Year for the charge data. |

</details>

</TabItem>
</Tabs>

