---
title: Cloud Cost Management (CCM) FAQs
description: This article addresses some frequently asked questions about Harness Cloud Cost Management (CCM).
# sidebar_position: 2
---

## Connectors

### Does Harness support visibility and/or optimization in AWS China?

No, Harness does not currently support AWS China regions.

### Upon setting up a new cloud-provider connector, does Harness ingest the entire historical data available at source?

For AWS and Azure, we ingest the entire historical billing data which is present in the source buckets. For GCP, however, we ingest billing data up to a maximum of 180 days in the past from customer's BigQuery dataset.

### For GCP connector, due to security concerns, can the customer connect only a subset of their GCP billing-export by sharing BigQuery View defined on top of the original billing-export table?

For GCP data ingestion, we only support ingesting data from BigQuery tables i.e. ingestion from Views is not supported.

In order to avoid sharing the entire billing-export table for GCP, customer can create a new "table" (instead of View) in their BigQuery dataset which will contain the subset of data that they wish to share with Harness. Customer can use  "BigQuery Scheduled Queries" to keep this new table updated and in sync with the original billing-export table. Here, it is important to ensure that the schema of the new table is the same as the original export.

### Customer's Azure Storage bucket only allows specific IPs, will CCM's Azure connector require any whitelisting to be able to sync data into Harness?

Yes, in that case, customer will need to whitelist Harness's Cloud-NAT IPs. Customer success team may assist the customer with the required Cloud-NAT IPs to whitelist and raise a ticket to Engineering if needed.

### Are there any concerns/known issues using only k8 connectors, i.e. not using any cloud connectors? Their primary use case is internal showback and monitoring impacts of k8 infrastructure changes. This setup was working for them, but again looking to eliminate variables that could be causing inconsistencies.

If only the K8S connector is used without a Cloud connector, billing data will be calculated using the Public pricing API. Cloud connectors assist in accurately calculating costs based on the CUR REPORT shared by cloud providers.

### Will First Gen kubernetes connectors will not work as-is for Next Gen ? In other words, new k8 connectors (and delegates) need installed and configured for NextGen CCM?

First Gen K8S connector will also work in NG CCM. But, we recommend creating NG connectors.

### Do I need a delegate to get started connecting to GCP?

No. You need the delegate only when connecting to a Kubernetes cluster - such as GKE.

### Do I need to add Kubernetes cloud provider connectors for each Kubernetes cluster?

Yes, you need to add a Kubernetes cloud provider for each Kubernetes cluster. One connector can access only one cluster.

### If a CCM license expires, will that ever impact the health indicators of the cloud integrations? (Reporting and auto-stopping icons)

For K8S connectors, the reporting icon would be success as long as we are receiving events from delegate. auto-stopping will be always be marked as success.
For cloud connectors, one of the validations we do as part of conn health indicator is availability of data on our side in past 24 hours.
When license expires, after some days we would stop running the data sync jobs and thus conn status will be read.

### When dealing with multiple datasets in one GCP project, how can we add all datasets to the connector?

To include all the datasets, we should set up an individual connector for each dataset.

### How can historical data be ingested beyond 180 days in the case of a GCP connector?

If you require historical data to be ingested, please raise a support ticket with Harness. The CCM development team can ingest the data for you.

### Can I setup an Azure Connector for a subscription without specifying billing details?

Yes, we can create a connector without specifying billing details if the billing information for the subscription is already covered by another azure billing connector.

### Does GCP support historical data ingestion from a source located in non US region?

Yes, it does. However, if there are multiple source datasets which are located in non-US regions, then ensure that table names are unique even across the different source datasets.

### In the case of AWS, what should we do if historical cost data is missing from the CUR export (source bucket)?

In this scenario, we can raise an AWS support request to backfill the same source bucket. Once the data is available, CCM will automatically retrieve and make it accessible.

### We have added a AWS connector and the permissions are in place but we are facing error saying it can't read the objects in the CUR bucket.

If the permissions are correct, please verify the s3 bucket name and make sure that the bucket name in the connector YAML does not have any white space.

### The verification for the Azure connector fails with "Authorization permission mismatch"

Sometimes Azure takes time to propagate/refresh the access settings on the storage account. Wait a few minutes and then retry the test.

### What is the data retention policy in CCM for connectors?

There is no data retention present for CCM. However, all data that is older than 5 years old is deleted.

### What are the recommended resource allocations for different cluster sizes?

Gathering fine-grain metrics in the cluster is memory intensive.  In an effort to ensure we don't run out of memory and terminate the pod, the following sizing guidelines are recommended:

 | # Nodes in the Cluster | CPU (Cores) | MEM (Mi)  |
 | -----------------------| ----------- | --------- |
 |         <= 100         |      1      |    3814   |
 |       101 - 200        |      2      |    7629   |
 |       201 - 300        |      3      |   11444   |
 |       301 - 400        |      4      |   15258   |
 |       401 - 500        |      5      |   19073   |


## Perspectives

### Can the order of perspectives in the list be customized for alerting purposes?

The order of perspectives in the list is determined by their creation timestamp, with the earliest created perspective coming first. This order cannot be directly customized for alerting purposes.

### What are the AWS cost types supported by Perspectives?

Perspectives supports Net amortized, Unblended, Amortized and Effective Cost.

### Do I need to keep the AWS Cost and Usage Report files from their source S3 bucket once it is ingested in CCM?

No, you can delete the CUR file in order to save on S3 storage costs.

### Do I need to setup AWS Cost and Usage Reports for each linked account in AWS?

No, you can set up CUR in master account in AWS. That will have data for all linked accounts too. In CCM, you can setup just one connector having CUR for this master account.

For linked accounts connectors in CCM, you can choose one or both of Optimization/Visibility features.

### Does Harness provide currency standardization?

Yes, Harness CCM offers the flexibility to view your cloud spending data in the currency of your preference. For further information, please refer this [document](https://developer.harness.io/docs/cloud-cost-management/use-ccm-cost-reporting/currency-preferences/).

### How many Perspectives am I allowed to generate within an account?

You can create as many as 10,000 Perspectives in a single account.

### How are costs presented in perspectives when there are expenses that are not linked to the chosen grouping criteria?

CCM displays `No` followed by the selected `<group by>` for costs that do not have any correlation with the specified `<group by>` criterion.
For instance, if a perspective encompasses rules for both AWS and GCP, and the grouping is based on GCP > SKU, any expenses unrelated to GCP SKUs will be displayed as "No SKUs."
For more information, go to [Create Perspectives](https://developer.harness.io/docs/cloud-cost-management/use-ccm-cost-reporting/ccm-perspectives/create-cost-perspectives#review-no-accountprojectetc).

### How can I retrieve details about the compute generating the cost within a perspective that is managed by a cost category rule? Additionally, how can I obtain information about its uptime, memory utilization, and CPU usage?

In the context of cost categories, CCM currently provides information in two columns: `Total cost` and `Cost trend`. However, users have the option to delve deeper into workload details, allowing them to access information such as the start and stop times of individual pods.

### How are costs calculated, and is there a specific formula for it?

Indeed, CCM offers a formula to illustrate the calculation process. For a detailed explanation, go to [documentation](https://developer.harness.io/docs/cloud-cost-management/get-started/key-concepts/).

### Is it possible to modify the formula for calculations, specifically for CPU, memory, or idle costs?

No, the formula is predetermined and cannot be altered. However, if you are utilizing Kubernetes on bare metal infrastructure (excluding GCP, AWS, or Azure), you do have the option to adjust the pricing for compute calculations related to nodes and pods. For more details, go to [How's the cost calculated for K8s on CSPs and K8s on bare metal?](https://developer.harness.io/docs/faqs/cloud-cost-management-faqs/#hows-cost-calculated-for-k8s-on-cloud-providers-and-k8s-on-bare-metal).

### How is cost allocation determined? Is it based on actual usage, requests, limits, or the higher of requests or actual usage?

The cost is allocated based on the maximum of either requests or actual usage.

### Is storage included in the cost calculation, particularly in the context of Kubernetes, specifically AKS?

Yes, storage costs are indeed included in the total cost calculation. From the cluster perspective, the total cost encompasses memory costs, CPU costs, and storage costs, providing a comprehensive view of all expenses.

### What permission we need to display AWS account name instead of account id in UI ?

You need:

```
"organizations:Describe*",
"organizations:List*"
```

### What does "unattributed cost category" mean, and why is it important?

The "unattributed cost category" refers to a category of costs that lack specific identification, such as subscription name, resource group name, resource ID, or reservation ID. It's important because it represents costs that cannot be directly associated with any resource or cost line item.

### How can I address unattributed costs in my reporting and analysis?

To tackle unattributed costs, you can apply a subsId null filter to isolate these costs and then group them by another relevant column. This approach might help you identify the source of these unattributed costs.

### What is the potential connection between unattributed costs and Kubernetes clusters?

Unattributed costs could potentially be related to Kubernetes cluster costs. These costs are often gathered when you have a cost connector for Kubernetes. If you do not want to include Kubernetes costs in your cost categories, you can create a "k8s" bucket in each category and define logic such as "cluster name not null." This allows you to separate and ignore Kubernetes costs within your cost categories.

### Does Perspective support drill-down functionality for cloud data?

Currently, it's not supported. However, you can leverage dashboard for the same.

### What is the rationale for the divergence in labels between cloud and cluster data, as illustrated in case of ECS tags, for instance?

When we ingest cloud data, we make certain modifications to the tags/labels. However, with cluster data, we ingest the labels without any alterations.

More information can be found [here](../../docs/cloud-cost-management/use-ccm-cost-reporting/root-cost-analysis/analyze-cost-for-aws#analyze-aws-cost).

### Why does the dropdown in the GPU cost tracking perspective only show instance types that have already been used, and not all available GPU instance types across clouds?

The dropdown in the GPU cost tracking perspective fetches instance values from the billing report dynamically. It is not a static list of all available instance types. Only the instance types that have been used in the account will appear in the perspective rule builder/filter dropdown.

### We need a solution for including future usable GPU instance types without manually updating the rules regularly. What can we do?

To address this issue, we suggest using the LIKE operator in your rules. By employing the LIKE operator, you can ensure that any new instance type that comes into use will automatically be included in the perspective. This eliminates the need for manual updates, providing a more sustainable and long-term solution for tracking GPU costs across all three clouds.

### Are there any limitations or considerations when using the LIKE operator for future instance types?

While the LIKE operator provides flexibility in capturing future instance types, it's important to choose a pattern that uniquely identifies the instances you want to include. Additionally, regular monitoring and adjustments may be necessary if naming conventions change or new patterns emerge for GPU instance types.

### We see some no cluster name fields in our perspective, how can we remove them?

We can remove the no cluster name field, by adding a filter to perspective where Cluster name equals not null.

### Perspective creation governed by RBAC?

Yes, we can control it through folders.

## Cost Category

### If a resource (cost) aligns with rules in different cost category buckets, what happens? Does it go into the highest-priority bucket from the list of buckets for the first match?

Yes, when you group resources by the Cost Category, the resource is assigned to the highest-priority bucket from the list for the first match it encounters. However, if you apply a filter based on the cost bucket, you will retrieve all resources that meet the filter criteria, which can lead to an unexpected result where multiple cost buckets are filtering on one category and grouping by the corresponding cost category they belong to.

### Is there an automated method offered by Harness to ingest hierarchical data and generate cost categories?

No, currently, there isn't an automated solution available. As a temporary measure, you can create a script to fetch hierarchical data through APIs and convert it into cost categories within CCM.

## K8s or Cluster Data

### What is the data update frequency for our K8s visibility?

A K8s job is scheduled to run every hour, ensuring that data is updated frequently. However, occasional delays can occur due to various factors, potentially extending the update process to a maximum of one day.

### Do we have ability to change the formula of calculating the K8s cost?

No, the formula is fixed. However, if you are using k8s on bare metal (other than GCP, AWS or Azure), you have the option to update the compute pricing only for the node and pod cost calculation. More information related to this can be found [here](../../docs/faqs/cloud-cost-management-faqs/#hows-cost-calculated-for-k8s-on-cloud-providers-and-k8s-on-bare-metal).

### Is idle cluster cost allocated to pods/containers?

Yes, we consider the cost of idle resources allocated to a pod. More information related to idle cost can be found [here](../../docs/cloud-cost-management/get-started/key-concepts/#idle-cost).

### Is cost allocated based on actual use or Requests/Limits?

The cost is allocated based on max of requests or actual use.

### Is Storage cost included in the total cluster cost?

Storage cost is also included in the total cluster cost. Total cluster cost is sum of memory cost, cpu cost and storage cost.

### Is it possible to split cost? how to split the cost to multiple teams.

In cost categories you can add it to a shared bucket and then split it across the other buckets.

### Can we allow specific cloud account owner to view their own account cost only.

You can set up perspectives/folders for each of those and then limit access to the folders via RBAC.

## Recommendations

### We have found that some AWS EC2 instances are still visible in recommendations list even they are stopped before 2-3 days ago. is it the usual behavior for stopped ec2s?

We display recommendations that are up to approximately four days old. Even if an instance is stopped within four days after generating the recommendation, we still show that recommendation.

Once a recommendation is generated, it is not updated at a later time. So regardless of the instance's current state it will be visible for about four days.

### We have found that some AWS EC2 instances are still visible in recommendations list even they are stopped before 2-3 days ago. is it the usual behavior for stopped ec2s?

If the instance is in a stopped state it takes ~2-3 days for the recommendation to disappear, same is the behavior for terminated instances too.

### Do we support moving the recommendations from the Applied to Open recommendations section?

No. Currently, CCM supports only moving the recommendations from the **Open** to the **Applied** tab.

### Are there any recommendations specific to GCP, other than the nodepool and workload recommendations for clusters in GCP?

Currently, CCM does not offer any GCP-specific recommendations. For supported recommendations, go to the [CMM recommendations documentation](https://developer.harness.io/docs/category/recommendations).

### Does CCM offer support for on-premises/Self Managed Platform (SMP) installations?

Yes. CCM supports the following features and functionalities in the SMP environment for AWS and Kubernetes:

- Connector setup
- Perspectives
- Budgets
- Scheduled reports
- Cost categories
- Anomalies
- Recommendations

For more information, go to [CCM on Harness Self-Managed Enterprise Edition](https://developer.harness.io/docs/category/ccm-on-harness-self-managed-enterprise-edition).

### Why aren't there any actions for RDS recommendations?

Harness shows the RDS resize recommendations, but you can't take action from within CCM.

This is because the [RDS resize action](https://repost.aws/knowledge-center/rds-db-storage-size) is usually a manual operation where it is necessary to dump the database, depending on the database type (such as Mysql, MariaDB, or Postgres). You then need to spin up a new DB instance with lower storage requirements and restore the data.

The degree to which you reduce the storage depends on your needs. Reducing storage requirements is a manual operation that is not supported by Cloud Custodian at this time.

### Why doesn't the Workload Recommendation API change the percentile and recommendations based on changes in the time duration?

In UI, If you change the time filter, Recommendation is updated based on histogram values. In REST API response, the `containerRecommendations` field is deprecated, and we reply on `cpuHistogram` and `memoryHistogram` for the recommendation.

### Why there are very small amount of Workload and Nodepool Recommendation data available for a cluster?

The recommendations for Nodepool and Workload are influenced by both the cluster size and the number of events received from the delegate. Larger cluster sizes increase the likelihood of generating recommendations. Conversely, when the overall cluster spending is relatively low based on the available data in Perspective, it is more likely that we will have fewer recommendations.

### Why is the CPU utilization data not displaying for EC2 recommendations?

To enable CPU metrics CloudWatch has to be enabled for the AWS account.

To enable Memory metrics cloud watch agent has to be installed on every EC2 instance. you can use the external metrics ingestion feature in AWS to [configure the AWS Compute Optimizer to ingest EC2 memory utilization metrics](https://docs.aws.amazon.com/compute-optimizer/latest/ug/external-metrics-ingestion.html) from observability products like Datadog, Dynatrace, Instana, and New Relic.

### Why my service is not coming up when I tried applying Workload Recommendations? It's giving the impression that our recommendations are indicating too low and wrong resources.

The recommendations are categorized as the following:

- Cost Optimized
- Performance Optimized

Cost Optimized recommendations are computed using the 50th percentile of the CPU samples and memory peaks, this may potentially lead to system performance issues. Before using cost-optimized recommendations, ensure that you evaluate the recommendation's impact thoroughly.

Performance Optimized recommendations are calculated based on the 90th percentiles of CPU samples and memory peaks. The probability of having any effect on the performance is minimum. However, the cost may go high for the resources that are optimized using this method.

Also, do not update `limit` of CPU and Memory manually based on recommended `request` CPU and Memory. The recommended `request` CPU and Memory are computed using 95 percentile CPU/Memory samples.

### Why RDS instance resize recommendation not showing in results?

Right now, the policy only identifies potential RDS instances for resize. Earlier we had a resize action associated with the policy but since it is not currently supported by custodian, we have removed it.

### Do we support showing GCP VM recommendations?

As of now we don't show GCP VM recommendations.

### We are not able to see recommendations section in some perspectives ?

Currently, recommendations section is only visible in perspective where data source is Kubernetes.

### When I create a JIRA ticket from a recommendation, will that recommendation automatically come in the applied recommendations tab once the JIRA status of the ticket is set to done ?

Yes, as soon as you change the JIRA status of a ticket created for a particular recommendation and change it's status to done, that particular recommendation will automatically start appearing in applied recommendations tab.

### Do we provide the facility to add custom policies to generate Asset Governance Recommendation ?

Yes we do provide the facility to add custom policies to generate Asset Governance Recommendation. You can connect with our team and let us know the policies, we will hook those policies into our backend to generate recommendations.

### Do we support any method to retrieve Kafka recommendations ?

As of now we don't support any method to retrieve Kafka recommendations.

### Do we support showing RDS recommendations ?

Yes, RDS recommendations are supported from cloud asset governance.

### Can I generate recommendation related to some resources based on expected demands in the future to rightsize up/down effectively ?

Currently, we do not have the feature to generate recommendations for future events. All of the recommendations we provide currently, are generated by taking past data into consideration.

### Can I save my applied node preferences in the recommendations ?

Currently, you cannot save the applied node preferences because they are retrieved directly from the database based on the selected CPU and memory limits.

### Is the JIRA ticket automatically created from the suggested recommendations?

No, Jira tickets are not automatically created but you can manually create a Jira ticket.

### What happens to recommendations after license expiry ?

Upon the expiration of the license, we regret to inform you that recommendations will no longer be accessible, and the system will not generate any new recommendations. We apologize for any inconvenience this may cause and appreciate your understanding.

### Can we fine tune EC2 recommendations ?

Yes, you can set instance family preferences for ec2 recommendations.

### Can we apply "preferred instance families" across all recommendations ?

No, you would have to manually apply preferred instance families for each recommendation.

### Do we surface asset governance recommendations at the perspective level?

No, we do not provide asset governance recommendations at the perspective level.

### When is the Tune Recommendation section visible?

You can only tune nodepod and workload recommendations. You can't tune VM recommendations, which are taken directly from the cloud provider.

"Tuning" for VMs is not always available.

### How can we get GCP compute recommenations.

You can get GCP compute recommendations by enabling governance. [Doc Reference](https://developer.harness.io/docs/cloud-cost-management/use-ccm-cost-governance/asset-governance/gcp/gcp-recommendations/#recommendation-stop-underutilized-instances)

### Is there support for GCVE costs and for sole tenant nodes.

Yes, we provide cost tracking for all SKUs, including GCVE and sole tenant nodes. These costs will be visible in perspectives once they are available in the cloud cost report.

### If someone acts on a recommendation but doesn't apply it in Harness, what happens to that recommendation in the next sync cycle?

The recommendation will not appear again because it is no longer valid. Additionally, the savings calculation will be lost since it wasn't marked as applied in Harness.

## Governance

### When adding Cloud Governance to a previously created cloud cost connector, do we need to add the cloud-governance IAM permissions to the same role we previously created via the cloudFormation template?

You can add permissions in the same role as given in the connector. Depending on the governance use case, you can add more permissions for different resource types. Then add GOVERNANCE in the features enabled in connector.

### Does Harness have an API to validate asset governance rule?

Yes. You can use the [Validate rule endpoint](https://apidocs.harness.io/tag/Rule/#operation/ValidateRule).

### What is RDS resize down policy in asset governance?

RDS resize action refers to the process of modifying the compute and storage capacity of an Amazon RDS (Relational Database Service) DB instance. This can involve both increasing and decreasing the resources allocated to the instance.

### Can I automate the resizing process?

While Amazon RDS offers some automation capabilities, the resizing process, particularly when decreasing storage, often requires manual intervention due to the complexity of data backup and restoration.

### Does CCM show RDS resize recommendations?

Yes, Harness shows the RDS resize recommendations, but you can't take action from within CCM.

Usually, the [RDS resize action](https://repost.aws/knowledge-center/rds-db-storage-size) is a manual operation where it is necessary to dump the database, depending on the database type (such as Mysql, MariaDB, or Postgres).

### Can the reader role alone be employed in Cloud Asset Governance for production purposes if no actions are intended, and the focus is solely on achieving potential cost savings and resource governance?

Yes, it is possible to do so.

### I executed a governance rule with an action to save costs (for example, delete). Why do I see the cost savings estimate as $0?

Cloud Asset Governance uses pricing from the customer's CUR to calculate savings generated. Please check if your cloud spend data is available in Cloud Cost Management Perspectives.

### How many spending subscriptions are reported with governance recommendations in Harness CCM?

At present, 15 per cloud are reported.

### I created custom governance rules, but I haven't seen any recommendations generated for them?

Currently, we don't compute or show savings corresponding to custom asset governance rules. We only show savings corresponding to a few out-of-the-box rules, which we have selected for recommendations.

### Is it possible to visualize the Cloud Asset Governance data on Dashboards?

No. Currently, Asset governance data is not yet available in dashboards.

### How is the recommendations and potential cost savings shown on the Asset Governance Overview page?

The recommendations and potential cost savings are derived from the following AWS policies selected for asset governance:

```
equest-count-list
delete-unattached-volumes
release-unattached-eips
migrate-gp2-to-gp3-ebs-volumes
delete-snapshot-with-no-volume
delete-snapshot-unused
elasticache-delete-stale-clusters
rds-delete-unused
rds-resize-down
elb-delete-unused
```

### For Asset Governance, what are the minimum permissions required for Azure connectors?

Reader role on the subscription is minimum to be able to list resources, For actions, corresponding permissions needs to be added.

### Is it possible to get Asset Governance evaluation URL with the execution_id?

You can use the `governance` endpoint. In this example, the evaluation ID is `noIGUi15TS-_XrJIPwYczQ`:

```
curl 'https://app.harness.io/gateway/ccm/api/governance/status/noIGUi15TS-_XrJIPwYczQ?routingId=&accountIdentifier=' \
  -H 'x-api-key: pat.token' \
```

### Why are my evaluations taking longer than 3 minutes to execute?

Cloud Asset Governance evaluations taking longer than three minutes can be due to complex policies with multiple resource checks or due to high volume of resources being evaluated. Additionally, limitations in the cloud provider's API response times and network latency can also contribute to longer execution times.

### Can I create an Asset Governance rule to merge different labels into one AppID label for Azure?

To achieve this use case, you can first remove the tags and than add the req tag. For more information, go to the Cloud Custodian documentation on the [Azure tag command](https://cloudcustodian.io/docs/azure/resources/azure-common-actions.html#tag).

### In Azure, How can we list all the appServicePlans with cpu and memory less than 50% using the maximum filter.

We can filter resource based on resource having alerts greater than a threshold value. The policy should target azure.alert-logs to filter through the alert logs.

### Why am I receiving [azure.core.exceptions.HttpResponseError: (AuthorizationFailed)] when setting up tags in Azure?

This error may occur if the Tag Contributor role is not assigned at the correct scope or if there are deny assignments or policies blocking the action. Ensure the role is assigned at the appropriate scope

### How can I ensure the Tag Contributor role is effective for setting up tags in Azure?

To ensure the Tag Contributor role is effective, verify that it is assigned at the correct scope covering the necessary resource group and ensure there are no deny assignments or policies blocking the required actions. This will enable proper tagging of resources in your Azure environment.

### How do I check for deny assignments or policies that might be causing the authorization error in Azure?

To check for deny assignments or policies, navigate to the Azure portal, select the relevant subscription/resource group, and review the Access Control (IAM) section. Look for any deny assignments or policies that explicitly prevent the required actions. Remove or adjust these as needed to resolve the authorization issue.

## Autostopping

### If we configure an autostopping rule with multiple instances, but a single routing rule. does the proxy load balance between the instances?

Yes it does round robin load balancing. If health checks are configured it does this across healthy instances. If health check is not configured it assumes all instances are healthy.

### We are using Istio as a service mesh, is it possible to autostop the services and turn on the services when services are getting connected through the mesh and not through the kubernetes ingress ?

AutoStopping hooks on to the istio Virtual services for detecting the traffic flow and routing. So, as long as you are using virtual services for routing external traffic it will work.

### How can I troubleshoot the "Failed to ADD rule to ALB" error when creating an AutoStopping rule?
A2: To troubleshoot this error, ensure the following:

The associated Auto Scaling Group (ASG) is properly configured and associated with the intended ALB via a target group.
The correct ALB is selected as the load balancer when creating the AutoStopping rule.

### Do we provide support for ECS autostopping when using Network Load Balancers (NLBs) instead of Application Load Balancers (ALBs)?

We currently do not support ECS autostopping with NLBs. NLBs operate at layer 4 of the network stack, making it challenging to intercept traffic. To achieve autostopping functionality, you can create a new ALB, set it up as a downstream system for the NLB, and connect your Auto Scaling (AS) group to the ALB. This configuration will enable the desired functionality."

### What is the expected behavior of resources managed by an Autostopping rule in Dry Run Mode?

Resources managed by a rule in Dry run mode, will not undergo any "shutdown" or equivalent actions and hence are never stopped by the Autostopping rule. Similarly if the resources are manually "stopped" by the users, they wouldn't be "started" by the rule and will continue to be in the state as set by the users. Hence any resources managed by a rule in Dry Run mode will not be started or stopped by the rule. This mode is used to identify potential savings that can be obtained by enabling Autostopping and also the time periods at which the resources would potentially be stopped or started if it were to be managed by Autostopping.

### I am unable to add additional RDS instances to an auto-stopping rule, when adding other rule it overrides the existing one.

We do not allow the addition of multiple resources per Rule for RDS and ASG based rules. This is why the selection is represented as a radio button for these types, while VMs, which support multiple resources, are represented with a checkbox.

### Why am I not able to see savings for my Kubernetes AutoStopping rules?

The AutoStopping savings calculation occurs every 24 hours. For newly created rules, it may take up to 24 hours to observe any savings. If your rule still lacks any available savings data even after this time period, please consider the following:

* Ensure that the rule has been accessed at least once, and the 'Last Activity' column is populated.
* Verify the health of your Cloud/Kubernetes connectors."

### How to rotate certificate on Autostopping Proxy?
To rotate a certificate on the Autostopping Proxy, follow these steps:

1. Generate new secrets in the cloud provider for the certificate and secret.

2. Navigate to the load balancers page.

3. Locate and select the Autostopping Proxy.

4. Edit the Autostopping Proxy settings.

5. Update the secrets for the certificate and secret with the newly generated ones.

6. Save the changes to the proxy settings.

### How are we calculating savings for Kubernetes workloads under AutoStopping rules?

The hourly rate for a Kubernetes workload is determined by the cost of the node on which its pods are hosted. The proportion of node cost attributed to each pod may vary.

When a node hosts only a single pod, that pod/workload will bear a larger share of the node cost compared to scenarios where multiple workloads share the same node. Additionally, a long-running pod might accumulate a higher cost compared to a pod that is quickly terminated.

As a result, the 'actual_cost' associated with a workload will fluctuate daily, leading to variations in the hourly rate.

### Why is the configured Fixed Schedule not working for an AutoStopping rule?

If your fixed schedule is not operating within the expected time windows or frequencies, please review the following:

* Ensure the correct timezone for the schedule.
* Check the specified start and end times of the schedule. This configuration is optional and restricts the schedule to run only within this specified window.

### When I create an Autostopping rule, does Harness create a target group in the AWS account?

No. While creating the rule Harness doesn't automatically create a target group. To configure this, go to [Create a target group for the AutoStopping Proxy VM with a health check configuration](https://developer.harness.io/docs/cloud-cost-management/use-ccm-cost-optimization/optimize-cloud-costs-with-intelligent-cloud-auto-stopping-rules/create-auto-stopping-rules/create-autostopping-proxy-as-downstream-alb/#create-a-target-group-for-the-autostopping-proxy-vm-with-a-health-check-configuration).

### Does the Free plan allow Kubernetes autostopping (CP AWS)?

Yes. You can perform Kubernetes autostopping on the Free tier of CCM.

### Is there any way to work with K8s Autostopping and bypass the need to use a Cloud Provider Connector?

You can provide a dummy connector. It need not have permissions at the provider. However, only the AutoStopping functionality will work, and CCM won't be able to show the cost savings.

### What happens when disabling an Autostopping rule?

While disabling the Autostopping rule, the ALB rules created by Harness will be removed.

### What happens when re-enabling an Autostopping rule?

While re-enabling the Autostopping rule, Harness adds the ALB rules back. Which will point back to the associated target group.

### What happens when an Autostopping rule is warming up?

1. The resources under the Autostopping rule will be started.
2. The resources will be added to the actual target group.
3. The ALB rule will start pointing back to the actual target group.

### How to set all paths to trigger on power for Autostopping rule?

Set a wildcard(`*`) on the Path Match in Autostopping rule creation.

### How do we onboard and access RDS instance/cluster to Autostopping?
To onboard and access an RDS instance/cluster with Autostopping, you have several options:

1. **Access Through Autostopping Proxy**: Connect to the RDS cluster via the Autostopping proxy. Instructions for connecting through the proxy are available on the Autostopping rule details page. As long as users access the RDS cluster through the proxy, Harness ensures the RDS cluster remains running.

2. **Set Uptime Fixed Schedule**: Establish an uptime fixed schedule for the RDS cluster during working hours. Harness ensures the cluster is operational according to this schedule.

3. **Use RDS Autostopping Rule as Dependency**: Employ the RDS Autostopping rule as a dependency for another Autostopping rule, such as one for an EC2 instance. When the parent resource (e.g., EC2) is operational, Harness ensures that the dependent resource (RDS) remains running as well.

### Can we schedule several VMs to stop in order via an autostopping rule?

You can configure dependencies for the rule in this case: [Doc](https://developer.harness.io/kb/cloud-cost-management/articles/autostopping/aws/#dependencies) You can define a dependency on another autostopping rule, ensuring that the dependent rule is active when the rule with the configured dependency is active.

### We see the error "Failed to obtain VM with name xxxx of resource group" in autostopping rule logs. What does this mean?

The error is thrown as part of the periodic state sync job from Autostopping. This doesn’t disrupt the functionality of the resource. If there’s a timeout during a scheduled start/stop operation, a retry will be executed to correct it. The state sync job, which runs every 10 minutes, also corrects any state change in the resource.

### How do you clone autostopping rules?

To clone an autostopping rule, click on the three dots on the rule on the overview page, click Clone, select all the required elements to be cloned, and clone the rule.

## Dashboards

### When creating a custom field, can I filter the entire dashboard on the custom field?

Currently, Looker doesn't support filtering on custom fields at a global level. Instead, you can filter on each tile.

### Can CCM operate independently from the Harness Platform? Or do we need to install CCM as a module on the harness platform and run it?

CCM (Cloud Cost Management) is a standalone product offered by Harness that can operate independently in the Harness Platform. It does not require installation as a module on the Harness Platform or any specific dependencies on the platform itself.

CCM provides organizations with the ability to monitor, optimize, and manage cloud costs across different cloud providers (such as AWS, Azure, GCP) in a centralized manner. It offers several advantages compared to other competing products.

### Do we have support for hourly granularity in the Unified Table?

No, hourly granularity is not maintained in the Unified Table. It supported at a daily granularity.

### How long does it take for cluster utilization data to appear on the dashboards?

The data on cluster utilization is collected every 20 minutes and processed hourly on the CCM side. We compute billing charges with hourly and daily granularity based on utilization data. If you choose the perspective, billing data based on hourly granularity is displayed for the previous seven days' filter. However, if you choose a different period, a daily calculation is used to display the billing data.

### How long does it take for Recommendations data to appear on the dashboards?

We require a few days of data to provide suggestions during the initial setup because NodePool and Workload recommendations are based on the utilization statistics from the previous seven days. As soon as data is available, recommendations are created and updated every day using the data from the previous seven days.
We ingest CUR data from cloud provider once a day. This is employed to accurately estimate the cost of the cluster and the cloud.

### How long does it take for anomaly data to appear on the dashboards?

The anomaly detection for Cloud and Cluster is done once every day. The Anomaly Detection Service checks for any anomalies in the billing cost once the billing data for the cluster has been computed.

### Is there support for cost categories in the dashboards?

We have the support to leverage the unified view to attribute costs across clouds and cluster costs.

### Do we support AutoStopping savings for visualizing in the dashboards?

Yes. Customers should be able to create a dashboard to visualize the savings though the dashboard is not available out of the box.

### Do we have support for asset governance in the dashboards?

No. Asset governance data is not exposed for dashboards yet.

### Is memory metrics available in our dashboards for virtual machines hosted on AWS, GCP, and Azure?

The memory measurements for AWS EC2 will be displayed in dashboards as part of the inventory functionality if the cloudwatch agent is deployed in the virtual machines.
As part of the inventory feature for Azure, we have memory measurements for virtual machines.
We don't have memory measurements for virtual machines on GCP.

### Is "total cost" in dashboards the same as "unblended cost" in perspectives?

Yes.

### Can we bring in recommendations in BI or is it only at the perspective level?

We have a recommendations explore in dashboards, this is limited to savings and potential. We do not intend to extend support to granular recommendation details in dashboards

###  When we are filtering on date in an AWS dashboard, is the date we are using on the line items the usage start/end date or the billing date?

It is usage start/end date and If there is both start and end, Usage dates is used.

### When looking at the BI Dashboards for AWS RDS, we get a data fails to load message on all the different widgets what could be the reason.

We need to check on following points :

1. If the Account has RDS spend.
2. If the  AWS accounts respective connectors have inventory enabled to pull in these metrics.

### Why am I seeing 100% for Azure Cost Trend?

With Azure cost trends, if the Reporting Timeframe is set to a larger subset of time than the Time / Period it will return 100%. The Reporting Timeframe needs to be a shorter timeframe than the Time / Period or any Cost Period set.

### Why is my dashboard data only going back a month?

The Reporting Timeframe needs to be a filter, otherwise it defaulted to 30 days.

### When is perspective and dashboard data ingested from AWS?

The data for AWS is ingested at 7PM Pacific time once a day.

### Why does the AWS validation return "error processing data"?

This can mean that there is an issue with either the batch job, which syncs data, or the cloud function, which processes and ingests data.

### How long does it take to show AWS Billing data in CCM ?

Under 1.5 hrs. Once data is available at source, CCM should be able to show in under 1.5 hrs.

AWS by itself may ingest data at "source" bucket 4 times a day.

### In an AWS dashboard, what does the dimension "AWS Usage Amount" mean?

This field indicates the quantity of the resource or service used. For instance, for EC2 instances, this could be the number of hours the instance was running; for S3 storage, it might be the number of gigabytes stored.

## Anomalies

### Can I send an alert for any anomaly found to a specific email?

Yes. You can [set alerts for any perspective](https://developer.harness.io/docs/cloud-cost-management/use-ccm-cost-reporting/detect-cloud-cost-anomalies-with-ccm/#create-an-anomaly-alert-for-your-perspective). Alerts can be sent by email.

### How are anomalies associated with specific perspectives and which notification channels are used for alerting?

Anomalies are linked to specific perspectives. When an anomaly is detected, it's checked against each perspective in the order they appear in the list. If the anomaly belongs to a perspective, notifications are sent to the corresponding email or Slack channels. If it doesn't match the first perspective, it's checked against the next one, and so on.

### What happens when an anomaly is associated with multiple perspectives?

If an anomaly is tied to multiple perspectives (e.g., Advanced SSO and AnomalyAlerting), it's only alerted via the notification channel of the first matching perspective in the list. Subsequent perspectives are not checked once a match is found.

### How frequently do you run anomaly detection jobs ?

Anomaly detection jobs are executed once per day.

### Do we consider seasonal factors while detecting anomalies ?

Yes we do consider daily, weekly and monthly seasonalities while detecting anomalies.

#### Do we support daily alerts for anomalies ?

Yes we do support daily alerts for anomalies

### We didn't get the slack/email notifications for anomaly despite the fact that we have we have set up channels for them ?

Please reverify if the Slack and email channels have been properly configured for that specific perspective. If a particular anomaly is associated with multiple perspectives, we only send one notification to avoid redundancy. In this scenario, the notification is sent for the perspective that was created first among all the perspectives that share the same anomaly

### How much time does it take for sending alerts to the customers for an anomaly ?

As soon as anomalies are detected at our end, we immediately send both slack as well as email notifications to our customers regarding it.

### Do we support fetching anomalies on perspective made through labels ?

No, currently we do not have support for retrieving anomalies based on perspective labels.

### Is there a way we can proactively feed data to anomaly detection for future events or holidays ?

No, Harness doesn't support feeding data for future events or holidays.

### Anomaly drill down from the perspective screen does not seem to be filtering the anomaly list correctly ?

When you perform a drill-down from the perspective screen to view anomalies, we apply a time filter that specifically retrieves all anomalies of that particular day. This process ensures that the anomalies are accurately fetched, and the user is presented with all anomalies from that particular day, allowing them to take appropriate action.

### I see an anomaly at the AWS usage type level. Why is it that I'm not observing the same anomaly at the AWS service or AWS account level?

We display anomalies at the most granular level of the hierarchy and intentionally exclude them from higher levels. This approach enables customers to precisely identify the root cause of the anomaly." The hierarchy level for clusters and different cloud providers are as follows:

![](./static/ccm-faqs-00.png)

### I am seeing a large number of anomalies being detected which do not seem like anomalies to me ?

Before proceeding, please double-check whether you have configured a new connector specifically for that particular cloud service. If you have indeed set up a new connector, please be aware that our machine learning models may not yet have sufficient training data for accurately identifying anomalies. To obtain reliable anomaly results, we typically require a minimum of 14 days' worth of training data.

### Does Harness fetch anomalies for perspectives using cost category rules and groupings by cost categories?

No.

### Why can't my CCM connector retrieve data from an old billing table?

CCM Connectors, by default, only collect data from billing tables that have had updates within the last 24 hours. If your table hasn't had any updated data within this period, we will skip the collection process.

### How can I exclude specific instance types from instance resizing recommendations?

On the recommendation page, you can specify `Preferred Instance Families` for Compute-Optimized or Storage-Optimized performance. The algorithm will create recommendations from this pool of preferred instances that are most economical for you.

### How to specify a preferred instance family globally?

Currently, we don't support this feature.

### How to rename the report file name of the dashboard scheduled delivery?

Currently, it's only possible to include a custom message in the scheduled delivery, renaming the report name isn't possible.

### Is it possible to share a dashboard with a person who doesn't have a Harness user?

The sharing option for the Harness dashboard requires selecting a specific user group within Harness itself and defining different levels of access. Therefore, someone who is not part of any group in Harness will not have access to the dashboard.

## Budgets

### Do the models used in Harness CCM budgets adjust as we get more cost data?

At present, the models used in Harness CCM budgets do not automatically adjust as more cost data is collected. However, it is on our roadmap to leverage these models for budget-related forecasting in the future.

### Does Harness allow users to access budgets created in CG within NG?

No, budgets created in CG may lack certain mandatory fields required in NG. In such cases, you will need to delete the old budgets in CG and create new ones in NG to ensure compatibility and functionality.

### How can users utilize budgets on amortized costs?

Users can configure their perspective to utilize amortized costs through perspective preferences, and the budgets will respect this setting accordingly.

### Can users create budgets in Harness without including alerts?

Yes, users have the option to create budgets without alerts. However, it is recommended to set up alerts to receive notifications when the cost reaches the defined threshold.

### Can users view the historical budget over time in Harness without the need to modify it every month?

Yes, users can accomplish this by creating a Yearly budget and selecting the monthly breakdown option. This allows for a historical view without the need for monthly adjustments.

### What is FinOps in Harness?

FinOps, short for Financial Operations, in Harness refers to the practice of managing cloud costs effectively within the Harness platform. It involves optimizing cloud spending, budgeting, forecasting, and allocation of resources to ensure efficient utilization of cloud resources while controlling costs.

#### Why is the total savings not displayed for one of my auto-saving rules for RDS in Harness?
To resolve this, you may need to check the configuration of your auto-saving rule and ensure that it is correctly set up to calculate and display the total savings.


#### What should I tag my instances with to be shut down by the stop-after-hours Rule?
To ensure that your instances are shut down by the "stop-after-hours" Rule, you should tag them with a specific tag that the Rule will recognize. Typically, this tag should be defined in the Rule's configuration, and you should use the exact tag specified there when tagging your instances.

#### What does the "No Cluster Name" entity represent in Cloud Cost Management?
The "No Cluster Name" entity appears in the visualization when there are costs that cannot be attributed to a specific cluster. This typically occurs with orphaned resources or when costs are associated with a deleted cluster.

#### How can I filter out the "No Cluster Name" entity at the cost category level?
To filter out the "No Cluster Name" entity, you can create a new cost category and define a rule that excludes costs where the cluster name is "No Cluster Name."

#### What are the steps to create a new cost category and define the rule?
Navigate to the Cloud Cost Management module and select "Cost Categories" from the left-hand menu.
Click on the "Create Cost Category" button and provide a name for your cost category.
Choose the appropriate cloud provider and click on "Add Rule" under the "Rules" section.
Select "Cluster Name" as the attribute, "is not" as the operator, and enter "No Cluster Name" as the value.
Click on "Save Rule" and then "Save Cost Category" to finalize the configuration.

#### How can I use the new cost category in my perspective to exclude the "No Cluster Name" entity?
Once you have created the new cost category, you can use it in your perspective instead of the default cost category. This will automatically exclude the "No Cluster Name" entity from the visualization.
By following these steps, you can effectively manage and exclude the "No Cluster Name" entity from your Cloud Cost Management visualization, ensuring more accurate cost attribution and analysis.

#### How do we create an annual budget with a monthly breakdown?

To create an annual budget with a monthly breakdown, you need to select the budget breakdown as Monthly while creating the budget. There is a budget breakdown option which you have to select as Monthly while creating the budget. Otherwise, the monthly breakdown won’t be available.

#### When we set a budget in the CCM module, is there a way to incorporate discounts?

Yes, since budgets are based on Perspectives, we can also incorporate built-in cloud discounts.

