---
title: Cloud Cost Management (CCM) FAQs
description: This article addresses some frequently asked questions about Harness Cloud Cost Management (CCM).
# sidebar_position: 2
helpdocs_topic_id: 7h3xx0h6mx
helpdocs_category_id: y7j7dl46ua
helpdocs_is_private: false
helpdocs_is_published: true
---

This article addresses some frequently asked questions about Harness Cloud Cost Management (CCM).

### AWS connectors

#### Do I need to create an AWS connector for all my linked accounts?

No. You can create an AWS connector in the master or linked account. CCM requires one connector per AWS account (master or linked).

It is recommended to create a CUR at the master account to avoid the CUR creation step for each linked account. For more information, see [AWS connector requirements](../../cloud-cost-management/1-onboard-with-cloud-cost-management/set-up-cloud-cost-management/set-up-cost-visibility-for-aws.md#review-aws-connector-requirements) and [Cost and Usage Reports (CUR) and CCM requirements](../../cloud-cost-management/1-onboard-with-cloud-cost-management/set-up-cloud-cost-management/set-up-cost-visibility-for-aws.md#review-cost-and-usage-reports-cur-and-ccm-requirements).

#### What kind of access does Harness CCM need to the cost and usage reports (CUR)?

If you have a [consolidated billing process](https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/useconsolidatedbilling-procedure.html) enabled, then CCM needs read-only access to the cost and usage reports (CUR) stored in the S3 bucket in the master or payer account. This gives access to the cost data for all the accounts (linked/member) in the organization.

If you don't have consolidated billing enabled at the organization level, then you can create the CUR at a linked account level.

#### How does data flow from the source S3 bucket to CCM?

Read [this](https://medium.com/harness-engineering/inner-workings-of-harnesss-cloud-billing-data-ingestion-pipeline-part-2-db82a1f54187) article to understand the flow of data from the S3 bucket to CCM.

#### Do I need to create a CloudFormation stack?

Yes. You need to [create a CloudFormation stack](../../cloud-cost-management/1-onboard-with-cloud-cost-management/set-up-cloud-cost-management/set-up-cost-visibility-for-aws.md#step-4-create-cross-account-role) to provision IAM Roles and corresponding policies to grant access for the required features.

#### Do you import the data into your account?

The CUR reports are imported into our account. CCM stores them securely with read-only access.

#### How long does it take to show AWS billing data in CCM? Why?

AWS ingests data at source (S3 bucket) four times a day. CCM takes about two hours to make the data available for viewing and analysis once it is available at the source.

#### What AWS access permissions/policies are required for CCM?

See [AWS access permissions](../../cloud-cost-management/1-onboard-with-cloud-cost-management/set-up-cloud-cost-management/set-up-cost-visibility-for-aws.md#review-aws-access-permissions) for the details.

#### To save on S3 storage costs, can I delete CUR files from the source S3 bucket after they've been ingested in CCM?

Yes, the CUR files can be deleted. However, it is recommended that you store the last 6 months of data on the source. CCM keeps a copy of the raw CUR files.

#### Do I require a delegate to connect to AWS?

No. You need a delegate only when connecting to a Kubernetes cluster, such as one running on EKS. ECS cluster costs are pulled through IAM roles.

#### What types of access do you get to my accounts?

CCM gets read-only access to the cost data along with a list of all the member (or linked) accounts. CCM does not get access to any other privileges. However, for AutoStopping, CCM requires additional privileged permissions to orchestrate the underlying infrastructure. See [AWS resource optimization using AutoStopping rules](../../cloud-cost-management/1-onboard-with-cloud-cost-management/set-up-cloud-cost-management/set-up-cost-visibility-for-aws.md#aws-resource-optimization-using-auto-stopping-rules).

#### Can CCM get historical data from the CUR?

Yes, CCM can sync the entire data if CUR files are available at the source. If a new CUR file is made available at source (even for previous months), CCM will sync and correct the data.

### Azure connectors

#### Can I create multiple Azure connectors for each Harness Account?

Yes, you can create multiple Azure connectors for each Harness Account.

* You can create multiple Azure connectors per Azure Tenant with unique subscription IDs.
* If you have separate billing exports for each of your subscriptions in your Azure account, set up separate connectors in Harness to view the cloud cost of all the subscriptions in CCM.
* See [Set up Cloud Cost Management for Azure](../../cloud-cost-management/1-onboard-with-cloud-cost-management/set-up-cloud-cost-management/set-up-cost-visibility-for-azure.md).

#### What types of access do you get to my accounts?

CCM gets only read permissions to the storage account in which the billing data export is available.

#### How long does it take to show Azure billing data in CCM? Why?

Azure ingests data at source (storage account) once a day. CCM takes about two hours to make the data available for viewing and analysis once it is available at the source.

#### How does data flow from the source storage account to CCM?

Read [this](https://medium.com/harness-engineering/inner-workings-of-harnesss-cloud-billing-data-ingestion-pipeline-for-azure-a1e6d7fb54c9) article to understand the flow of data from the Azure storage account to CCM.

#### Do I require a delegate to connect to Azure?

No. You need a delegate only when connecting to a Kubernetes cluster, such as one running in AKS.

#### To save on the storage costs, can I delete the billing export from the source storage account after they've been ingested in CCM?

Yes, the billing export can be deleted. However, it is recommended that you store the last 6 months of data on the source. CCM keeps a copy of the raw billing export.

#### Can CCM get historical data from CUR?

Yes, CCM can sync the entire data if CUR files are available at the source without any limits. If a new CUR file is made available at source (even for previous months), CCM will sync and correct the data.

#### The Azure connector fails in the validation step and the message “Authorization permission mismatch” is displayed. What is the reason?

Sometimes, Azure takes time to refresh the access settings on the storage account. Wait for 3–5 minutes and click the **Test** button again in Harness.

### GCP connectors

#### How does data flow from the source billing table (GCP) to the CCM?

Read [this](https://medium.com/harness-engineering/inner-workings-of-harnesss-cloud-billing-data-ingestion-pipeline-part-1-2bce857cd4ec) article to understand the flow of data from GCP to CCM.

#### How long does it take to show GCP billing data in CCM? Why?

GCP ingests data at source (billing data) at less frequent intervals. CCM takes about two hours to make the data available for viewing and analysis once it is available at the source. For the Non-U.S. regions, it may take slightly longer to show up the data.

#### Do I require a delegate to connect to GCP?

No. You need a delegate only when connecting to a Kubernetes cluster, such as one running in GKE.

#### Can CCM get historical data from the GCP billing data?

CCM pulls in data for the last 6 months, however, it can be increased further upon request. Contact [Harness Support](mailto:support@harness.io) to do so.

### Kubernetes cluster connectors

#### How long do I need to wait before data appears for Kubernetes? Why?

Once you enable CCM, for the first cluster the data is available within a few minutes for viewing and analysis. However, you will not see the idle cost because of the lack of utilization data. CCM generates the last 30 days of the cost data based on the events we collect of the initial cluster state at the time of connecting. From the second cluster onwards, it takes about 2–3 hours for the data to be available for viewing and analysis.

#### Do I need to add Kubernetes cloud provider connectors for each Kubernetes cluster?

Yes, you need to add a Kubernetes cloud provider for each Kubernetes cluster. One connector can access only one cluster.

#### Do I need to create a CCM connector for each cluster?

Yes, you need to create a CCM Kubernetes connector for each cluster.

#### Do I require a delegate in order to connect to Kubernetes?

Yes, you need a delegate to get started with Kubernetes clusters.

#### Do I need to ensure that the metrics server is installed only for EKS?

Yes. For GKE and AKS, the metrics server is installed by default.

#### How is the cost calculated for a Kubernetes service/pod?

Node cost:

For GCP, node cost is calculated based on the list pricing API. For AWS and Azure, cost is trued up if the corresponding connector is set up.

Example:


```
Price per hour of  n1-standard-4 in us-central1 from cloud provider pricing API : $0.1900  
  
Cost for 24 hrs : 24 * 0.1900 = $4.56
```
Pod cost:


```
Pod request: max(max(init container requests), sum(container requests))  
Pod cost : max(cost of resource request, cost of utilized resources)
```
Pod cost is considered to be a ratio of the node cost it is running on.


```
Hourly pod cost :  
((podCpu/nodeCpu)  * nodeCpuPricePerHour ) + ((podMemory/nodeMemory)) *  nodeMemoryPricePerHour)
```
#### Is the Kubernetes pod request or limit considered for cost calculations or actual utilization of resources by pod?

Yes, see this formula:


```
Pod cost : max(cost of resource request, cost of utilized resources)
```
#### How does Harness handle scenarios where the cost for pods changes depending on instance type?

In AWS/Azure/GCP, cost should change depending on whether you deploy on the spot instance, on-demand instance, or some reserved instance.

For GCP, Harness identifies the node type the pod is running on and fetches the list pricing.

For AWS/Azure, node cost is trued up from CUR reports. CUR reports take into account RIs, savings plans etc.

### AutoStopping Kubernetes cluster

#### Will the AutoStoppingRule YAML need to replace the ingress we currently use? If so, this might be problematic as we are using external Helm charts.

You do not have to replace your current ingress. The AutoStoppingRule configuration will reference your current ingress by name.

#### Does AutoStopping support Fargate for EKS?

Yes, AutoStopping supports EKS with Fargate*.*

#### Namespace in metadata is **default**. Should it be changed to the one where the target service resides?

Yes, AutoStoppingRule’s namespace should be the namespace in which the service is running.

### General

#### Can I create a cloud cost connector at the project level in Harness?

No. CCM connectors are available only at the account level in Harness. Connectors have 3 features (visibility, inventory, and AutoStopping). You must select at least one feature to create a connector.

#### Does CCM take AWS RI purchases into account?

Yes, CCM reads data from your CUR, which is the source of truth for monthly billing.

#### Does CCM take into account custom discounts, rewards, or credits?

Yes, if they are part of your billing.

#### I do not see hourly options when I set a date range beyond seven days?

Hourly granularity can be accessed only for the last seven days.

#### I have an AWS connector and a Kubernetes connector. Why is my cluster data not available even after a few hours?

In order to true up costs for Kubernetes, we wait until CUR data is also available. If data is not available even after 24 hours, contact [Harness Support](mailto:support@harness.io).

#### Are connectors shared across Harness FirstGen and Harness NextGen?

No, you must create separate connectors for Harness FirstGen and Harness NextGen.

#### If I create a CCM connector in one Harness platform generation (Harness FirstGen or Harness NextGen), will the data obtained through that connector be visible in the other Harness platform generation?

Yes, you can view your cloud cost data across Harness FirstGen and Harness NextGen.

#### What is the limit on connectors per account?

Currently, there is no limit to the number of connectors per account.

#### Can I have the same connector (AWS/GCP/Azure) in Harness FirstGen and Harness NextGen?

There is no restriction, but Harness recommends avoiding having the same connectors in FirstGen and NextGen.

#### How frequently do we ingest AWS EC2/EBS metrics?

All inventory metrics are pulled in once every hour.

#### What is the data retention policy in CCM?

CCM has a data retention policy per edition. After this period, the data is deleted and no longer available.



|  |  |  |
| --- | --- | --- |
| **Free** | **Team** | **Enterprise** |
| 1 month | 5 Years | 5 Years |

:::note 
The hourly granularity of cluster data is retained for 14 days. After 14 days, CCM retains daily granularity of the data.
:::

## On-premises

#### Does CCM support on-premises platform installations?

Currently, no. Harness is working on providing this functionality.

#### Efficiency score

#### Is the efficiency score configurable? Why not?

The efficiency score is not configurable. The efficiency score objectively represents how well your cluster resources are utilized.

5% buffer of the total cost is allowed when computing the unallocated resources and 30% for idle resources. A baseline of 65% is defined for utilized resources. So your utilization need not be at the capacity to get a perfect score.

#### Does the efficiency score take into account overall cloud costs? How is it computed?

The efficiency score takes only the cluster resources into account and not the overall cloud costs. Efficiency score is derived from the total and idle (and or unallocated) spend of your resources.

### Workload recommendations

#### How often do you generate recommendations?

New recommendations are generated daily and existing recommendations are updated as per the latest utilization trends.

#### We only show recommendations that have been updated within the last 72 hours. What could be the reason for this?

Workloads that had not been updated in the last 72 hours were stopped/killed. As a result, no recommendations are generated.

#### How are recommendations calculated when the resource requests and limits are not configured?

The [recommended resource](../../cloud-cost-management/2-use-cloud-cost-management/7-ccm-recommendations/workload-recommendations.md) is based purely on the utilization metrics pulled from the metrics server. Therefore, it doesn’t make a difference whether or not the resource requests and limits are configured.

#### Do recommendations take burst of CPU into consideration?

Yes, we collect metrics data every minute, and the data sent by the metrics server is the average of the last one-minute window for any container.

#### What if there are multiple containers inside the Pod?

We will get separate recommendations for these individual containers. The recommendations are computed at the container’s level and not at the Pod’s level.

### Perspectives

#### What is the limit to the number of Perspectives that I can create in an account?

You can create up to 250 Perspectives in an account. See [Create cost perspectives](../../cloud-cost-management/2-use-cloud-cost-management/2-ccm-perspectives/1-create-cost-perspectives.md).

#### Will I be able to see tags in Perspectives?

CCM unifies tags in AWS/GCP/Azure as labels in Perspectives.

#### Can Perspectives be shared across FirstGen and NextGen?

Yes, you can view the data across the FirstGen and NextGen.

### Budgets and reports

#### When will I receive notifications for the alerts that I’ve configured in my budgets?

Notifications are sent out daily at 2.30 p.m. GMT. The budget alerts are sent out when the cost of your budget has crossed the configured threshold.

#### I created a budget and set the budget amount less than the spend of the current period. Why didn’t I get a notification immediately?

The budget alerts are sent out daily at 2.30 p.m. GMT.

#### What is the limit on a budget setup per Perspective?

No limit as of now.

### General AutoStopping rules

This section addresses some frequently asked questions about [Harness intelligent cloud AutoStopping rules](../../cloud-cost-management/2-use-cloud-cost-management/1-optimize-cloud-costs-with-intelligent-cloud-auto-stopping-rules/1-add-connectors/1-auto-stopping-rules.md).

#### What are the supported cloud services that AutoStopping works with?

We continuously update the list of services that work with AutoStopping. Here is the current list of supported services across the cloud. For more information, see [Non-cluster support](../../first-gen/cloud-cost-management/concepts-ccm/b-cloud-cost-management-overview.md#feature-support-matrix) and [Cluster support](../../first-gen/cloud-cost-management/concepts-ccm/b-cloud-cost-management-overview.md#supported-kubernetes-management-platform).



|  |  |
| --- | --- |
| **Cloud Provider** | **AutoStopping - Supported Services** |
| AWS | EC2AutoScaling GroupsKubernetes Clusters (EKS)ECS ServiceRDS Instances |
| Azure | Virtual Machines (On-demand)Kubernetes Clusters (AKS) |
| GCP | Google Compute Engine (GCE) VMsKubernetes Clusters (GKE) |

#### How does AutoStopping add value to the Autoscaling that we already have in place?

* AutoStopping operates on real-time traffic rather than just CPU/memory, which is not a good indicator of activity/usage. Certain applications, such as those written in Java, consume CPU and memory even when no user requests are being served.
* AutoStopping can scale down the entire task count to zero and start them when new requests come in. While auto-scaling can only scale down the entire active tasks to a minimum task count for that service (min count cannot be zero).
	+ At scale, the cost of leaving even a single task running per service adds up.
	+ In the case of the EKS/Kubernetes Cluster, for example, if AutoStopping reduces the number of pods running to zero, auto-scaling will remove that specific node from the cluster. Both can co-exist.
* AutoStopping allows you to define dependencies between services.
	+ Dependant services or resources that do not directly receive traffic can also be completely scaled down to zero or shut down based on traffic received at any endpoint, significantly increasing overall cost savings; this is not possible with only native autoscaling. For example, ECS service with an RDS database in the same or different cluster.

#### How does AutoStopping work with on-demand load tests and off-shift/late-shift developers? How can they trigger load tests on a stopped resource?

* AutoStopping will function with real-time requests for on-demand load tests as long as the traffic is HTTP-based; when new requests come, AutoStopping will warm up the necessary services in real-time.
* There are two options for late-shift developers:
	+ If you know the exact schedule ahead of time, you can use [Fixed schedules](../../cloud-cost-management/2-use-cloud-cost-management/1-optimize-cloud-costs-with-intelligent-cloud-auto-stopping-rules/3-create-auto-stopping-rules/create-autostopping-rules-aws.md#fixed-schedules) to keep the service running during that time.
	+ If the exact duration is unknown:
		- You can use [ECG/heartbeat agent](../../cloud-cost-management/2-use-cloud-cost-management/1-optimize-cloud-costs-with-intelligent-cloud-auto-stopping-rules/2-configure-ecg/configure-ecg-for-auto-stopping-rules.md) to keep the services up as long as needed by detecting process liveliness or HTTP endpoints that can report the progress of the workers.
		- Alternatively, you can use our [API](https://harness.io/docs/api/tag/Cloud-Cost-AutoStopping-Fixed-Schedules) support to notify of service activity/idleness.

#### Can I shut down entire clusters more easily than creating one rule per service?

Yes, you can use schedules to shut down the entire ECS cluster in fixed windows of time. See [Fixed schedules](../../cloud-cost-management/2-use-cloud-cost-management/1-optimize-cloud-costs-with-intelligent-cloud-auto-stopping-rules/3-create-auto-stopping-rules/create-autostopping-rules-aws.md#fixed-schedules).

### AWS AutoStopping rules

#### How do AutoStopping Rules access the AWS VMs?

The VMs can be accessed using any of the following methods:

* DNS Link
* SSH/RDP

For more information, see [Setup access using DNS link](../../cloud-cost-management/2-use-cloud-cost-management/1-optimize-cloud-costs-with-intelligent-cloud-auto-stopping-rules/3-create-auto-stopping-rules/create-autostopping-rules-aws.md#setup-access-using-dns-link) and [Setup Access Using SSH/RDP](../../cloud-cost-management/2-use-cloud-cost-management/1-optimize-cloud-costs-with-intelligent-cloud-auto-stopping-rules/3-create-auto-stopping-rules/create-autostopping-rules-aws.md#setup-access-using-ssh-rdp).

#### Do AutoStopping Rules need a load balancer like Application Load Balancer (ALB) for non-prod workloads?

Yes, you need to create an Application Load Balancer (ALB) for AWS. See [Create an Application Load Balancer for AWS](../../cloud-cost-management/2-use-cloud-cost-management/1-optimize-cloud-costs-with-intelligent-cloud-auto-stopping-rules/4-load-balancer/create-load-balancer-aws.md).

#### Can I use Route 53 as my DNS provider?

You can use Amazon Route 53 as the DNS service for your domain, such as example.com. When Route 53 is your DNS service, it routes internet traffic to your website by translating friendly domain names (such as `www.example.com`) into the numeric IP addresses (such as `192.0.2.1`) that computers use to connect to each other. See [Configure DNS using Route 53](../../cloud-cost-management/2-use-cloud-cost-management/1-optimize-cloud-costs-with-intelligent-cloud-auto-stopping-rules/4-load-balancer/create-load-balancer-aws.md#configure-dns-using-route-53).

#### Can I use AutoStoping Rules to manage my resources hosted in the AWS GovCloud?

Currently, the resources hosted in the AWS GovCloud regions cannot be managed using AutoStopping Rules.

#### How AutoStopping Rules can help when I shut down my VMs during non-working hours?

You can run non-production workloads on fully-orchestrated spot instances and turn them off whenever idle, saving on cloud costs to the most granular extent possible. It’s a dynamic solution to a pressing customer problem or set of them. In particular, Cloud AutoStopping enables customers to solve the following use cases:

* Automatically detect idle times and shut down (on-demand) or terminate (spot) resources.
* Automatically restart resources whenever there is a traffic or usage request.
* Stopped/terminated machines are always accessible using the same access patterns that the team is used to – DNS link, SSH, RDP, and background tasks.
* Enable running workloads on fully-orchestrated spot instances without worrying about spot interruptions.

Together, this helps customers achieve savings that are 2-3x that of any static resource scheduler, with none of the access issues. It also significantly reduces the barrier to adoption across an organization.

#### How AutoStopping Rules can help when I am using Amazon EC2 Reserved Instances (RIs) for non-prod workloads?

Using AutoStopping with either on-demand instances or spot instances will result in 70%+ savings without any long-term commitments or upfront payments. With RIs, you can save up to ~ 60-65% (lower savings) and you have long-term (1-3yrs+) commitments and upfront payments (for highest savings). So it is beneficial to release RIs and use AutoStopping with on-demand or spot.

#### How spot instance interruptions are handled?

In the event of spot interruption, an alternate spot instance is provisioned. In case there is no alternate spot available we fall back to on-demand and continue to poll for spot capacity. Once a spot capacity is available, we do a reverse fall-back from on-demand to spot.

All this is automated, with no manual intervention. See [Review: how spot orchestration works](../../cloud-cost-management/2-use-cloud-cost-management/1-optimize-cloud-costs-with-intelligent-cloud-auto-stopping-rules/3-create-auto-stopping-rules/create-autostopping-rules-aws.md#review-how-spot-orchestration-works).

#### I do not use Application Load Balancer. Can I still create AutoStopping Rules?

No. An Application Load Balancer is needed for AutoStopping to work on AWS. See [Create an Application Load Balancer for AWS](../../cloud-cost-management/2-use-cloud-cost-management/1-optimize-cloud-costs-with-intelligent-cloud-auto-stopping-rules/4-load-balancer/create-load-balancer-aws.md).

#### I have an application running on EC2 and it has a dependency on theRDS instance. Can AutoStopping work when such dependencies exist?

Yes. AutoStopping supports dependency rules to monitor for traffic and can automatically shut down and start both the resources/services.

### Azure AutoStopping rules

#### How do AutoStopping Rules access the AWS VMs?

The VMs can be accessed using any of the following methods:

* DNS Link
* SSH/RDP

#### Do AutoStopping Rules need an Application Gateway or Azure Web Application Firewall (WAF) for non-prod workloads?

Yes, you need to create an Application Gateway for Azure. See [Create an Application Gateway for Azure](../../cloud-cost-management/2-use-cloud-cost-management/1-optimize-cloud-costs-with-intelligent-cloud-auto-stopping-rules/4-load-balancer/create-an-application-gateway-for-azure.md).

#### How AutoStopping Rules can help when I shut down my VMs during non-working hours?

You can run non-production workloads on fully-orchestrated spot instances and turn them off whenever idle, saving on cloud costs to the most granular extent possible. It’s a dynamic solution to a pressing customer problem or set of them. In particular, Cloud AutoStopping enables customers to solve the following use cases:

* Automatically detect idle times and shut down (on-demand) or terminate (spot) resources.
* Automatically restart resources whenever there is a traffic or usage request.
* Stopped/terminated machines are always accessible using the same access patterns that the team is used to – DNS link, SSH, RDP, and background tasks.
* Enable running workloads on fully-orchestrated spot instances without worrying about spot interruptions.

Together, this helps customers achieve savings that are 2-3x that of any static resource scheduler, with none of the access issues. It also significantly reduces the barrier to adoption across an organization.

#### Can I use a front door designer with backend pools as a load balancer? Will AutoStopping Rules work?

No. Currently, an Application Gateway is required for Azure AS to work. See [Create an Application Gateway for Azure](../../cloud-cost-management/2-use-cloud-cost-management/1-optimize-cloud-costs-with-intelligent-cloud-auto-stopping-rules/4-load-balancer/create-an-application-gateway-for-azure.md).

### GCP AutoStopping rules

#### Can I use a native GCP HTTP(s) load balancer for AutoStopping in GCP?

No. Currently, only a custom load balancer is supported as the GCP load balancer is in Beta. It is also cost-effective to use a custom load balancer as it is not limited by the number of rules that can be configured.

#### Which custom load balancer is used in GCP?

Envoy is the custom load balancer that is preferred. See [Create a Custom Load Balancer for GCP](../../cloud-cost-management/2-use-cloud-cost-management/1-optimize-cloud-costs-with-intelligent-cloud-auto-stopping-rules/4-load-balancer/create-custom-load-balancer-for-gcp.md).

