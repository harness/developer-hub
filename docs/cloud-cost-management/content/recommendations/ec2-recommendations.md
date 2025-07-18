## Optimizing AWS EC2 costs with Recommendations

An effective way to reduce AWS EC2 instance costs is to **optimize VM utilization**. This involves resizing instances based on active tasks and decommissioning unused instances.

Harness CCM helps you reduce costs with Recommendations.

You can view the Recommendations for all of your AWS EC2 instances on the Recommendations page. Furthermore, to view **only** EC2 instances Recommendations, you can use the **Filter** option and select `EC2_INSTANCE` from the **Recommendation Type** dropdown list.

:::note
Before using Recommendations in your environment, ensure that you evaluate their impact thoroughly. The person reviewing the Recommendations should be able to understand the impacts identified in the Recommendations, as well as the impact on the infrastructure and business.

Using Recommendations without proper assessment could result in unexpected changes, such as issues with system performance or poor reliability.
:::

## Before You Begin


* Connect your AWS cloud account in Harness and set up CCM for cost management. For more information, go to [Set up cost visibility for AWS](/docs/cloud-cost-management/get-started/onboarding-guide/set-up-cost-visibility-for-aws).
* To obtain EC2 recommendations, configure a Harness AWS CCM connector with the Inventory Management feature enabled.
* Go to [Perspectives](#) to learn how to create perspectives. Perspectives allow you to group your resources in ways that are more meaningful to your business needs.


## How are EC2 recommendations computed?

:::note
- Source of Data: Harness does not compute EC2 recommendations natively. These are fetched directly from AWS Cost Explorer APIs.
- Reference for savings calculations: [AWS EC2 Recommendations – Savings Calculation](https://docs.aws.amazon.com/cost-management/latest/userguide/understanding-rr-calc.html#savings-calc)
- Harness does not factor in RI or SP discounts in the pulled recommendations.
:::



The recommendations are computed by analyzing the past utilization of the CPU and memory of your EC2 instance. Harness CCM leverages the AWS EC2 recommendations. CCM uses the AWS APIs and fetches the data from the AWS account.


### Types of EC2 recommendations


Harness CCM provides two types of recommendations to optimize your EC2 instances:

* **Instance Resizing**: In this type of Recommendation, CCM recommends resizing your instance within the same instance family or using a different instance family based on instance usage. For information about the different instance families in AWS, go to [Available instance types](https://docs.aws.amazon.com/AWSEC2/latest/WindowsGuide/instance-types.html#AvailableInstanceTypes). 

* **Decommissioning**: In this type of Recommendation, the instance is terminated or decommissioned if not in use for a long time.

:::note
You can check the type of Recommendation under "Recommended Action" column on the **Recommendations** page.
:::

## Enable EC2 Recommendations

You must add the required permissions and enable EC2 recommendations in AWS.
Go to [Enable EC2 recommendations](/docs/cloud-cost-management/get-started/onboarding-guide/set-up-cost-visibility-for-aws#enable-ec2-recommendations) for the tasks to be performed on your AWS console.

After completing the aforementioned tasks, you need to perform the following steps in Harness:

1. While creating a new AWS CCM connector, select the **Inventory Management** feature to enable recommendations. For more information, go to [Set up CCM for your AWS account](/docs/cloud-cost-management/get-started/onboarding-guide/set-up-cost-visibility-for-aws).

 
2. Add the required **Cost Explorer** permissions to the CCM template:

<!-- <DocImage path={require('./static/aws-setup.png')} width="70%" height="70%" title="Click to view full size image" /> -->

## View AWS EC2 Recommendations

1. In **Harness**, go to the **Cloud Costs** module.
2. Click **Recommendations**.
3. Click the filter icon.
4. In the **Recommendation Type** dropdown list, select `EC2_INSTANCE`. Click **Apply**. 
5. To view the Recommendations for a particular account, click on the respective row. The CPU and Memory utilization graph shows the current utilization data.

<!-- <DocImage path={require('./static/aws-ec-recommendation.png')} width="70%" height="70%" title="Click to view full size image" /> -->

You can view the following details for each individual Recommendation:

- Potential Monthly Spend with and without recommendations.
- Potential Monthly Savings computed based on last 30 days of data.
- Current vs Recommended Configurations: Instance Family, CPU, Memory, CPU utilization, Memory utilization, Region, Potential Monthly Cost.
- CPU and Memory Utilisation graph: This graph shows the maximum and average utilization of the CPU and memory of the EC2 instance.
- Tune Recommendations: You can tune the recommendations by applying default presets or custom presets and choose the option to show recommendation either:
  * **Within the same instance family**: If you select this option, the recommendations stay within the same family.
  * **Across instance families**: If you select this option, CCM recommends instance types across instance families. The priority is to provide maximum cost savings.

 <iframe 
     src="https://app.tango.us/app/embed/dad175fe-fa12-4235-96de-46c275839866" 
     title="Recommendations AWS EC2" 
     style={{minHeight:'640px'}}
     width="100%" 
     height="100%" 
     referrerpolicy="strict-origin-when-cross-origin" 
     frameborder="0" 
     webkitallowfullscreen="webkitallowfullscreen" 
     mozallowfullscreen="mozallowfullscreen" 
     allowfullscreen="allowfullscreen"></iframe>


### Enable CPU and Memory Metrics
To enable CPU metrics, **CloudWatch** has to be enabled for the AWS account.

To enable Memory metrics cloud watch agent has to be installed on every EC2 instance. You can use the external metrics ingestion feature in AWS to configure the AWS Compute Optimizer to ingest EC2 memory utilization metrics from Datadog, among other observability products like Datadog, Dynatrace, Instana, and New Relic [1](https://docs.aws.amazon.com/compute-optimizer/latest/ug/external-metrics-ingestion.html).
In this case, EC2 recommendation will be generated by taking account of Memory metrics as well along with CPU metrics.

:::note

#### Ingesting Memory Metrics with Datadog Integration

If we ingest Memory metrics using Datadog integration, generation of EC2 Recommendations do consider Datadog metrics; however, the memory utilization data is not displayed on the EC2 Recommendation page.

The CPU and Memory metrics data we retrieve is sourced from CloudWatch, and in this specific case, the metrics originate from an external source, Datadog.

These Datadog metrics are directly integrated with AWS Compute Optimizer and are utilized in generating the recommendations.

As per the AWS Compute Optimizer API documentation, they do not offer support for retrieving these utilization metrics. Consequently, Memory metrics will not be shown in the recommendations.
:::
