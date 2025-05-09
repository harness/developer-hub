---
title: Cloudwatch
description: Learn how to set up Cloudwatch as a health source for CV
redirect_from: 
    - /docs/continuous-delivery/verify/configure-cv/verify-deployments-with-cloudwatch
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import RiskProfile from '/docs/continuous-delivery/verify/shared/risk-profile.md'
 
:::important
Harness supports only the Metrics Insight query language.
:::

import BeforeYouBegin from '/docs/continuous-delivery/verify/configure-cv/health-sources/static/before-you-begin.md';

<BeforeYouBegin />

## Add Cloudwatch as a health source

This option is available only if you have configured the service and environment as fixed values.

A Health Source is basically a mapping of a Harness Service to the service in a deployment environment monitored by an APM or logging tool.

1. In **Health Sources**, click **Add**. The **Add New Health Source** settings appear.
   
   ![](./static/verify-deployments-with-cloudwatch-114.png)

2. In **Select health source type**, select **CloudWatch**.
3. In **Health Source Name**, enter a name for the Health Source.
4. Under **Connect Health Source**, click **Select Connector**.
5. In **Connector** settings, you can either choose an existing connector or click **New Connector.**
   
   ![](./static/verify-deployments-with-cloudwatch-115.png)

6. Click **Apply Selected**. The Connector is added to the Health Source.
7. In **Select Feature**, select the CloudWatch feature:
   - CloudWatch Metrics
   - CloudWatch Logs

   :::note

   CloudWatch Logs is currently behind the feature flag `CDS_CV_CLOUDWATCH_LOGS_ENABLED`. Contact [Harness Support](mailto:support@harness.io) to enable it.

   :::

8. Click **Next**.

### Configuration

Depending on your feature choice, do the following configuration steps.

<Tabs>
<TabItem value="CloudWatch Metrics">

1. Select the **AWS Region**.
2. Click **+ Add Metric**.

You can customize the metrics to map the Harness Service to the monitored environment in **Query Specifications and Mapping** settings.

3. Enter a name for the metric in **Metric Name**.
4. Enter a name for the group in **Group Name**.
5. Select the services you want to apply to the metric under **Assign**. At least one selection is required.
6. If you select **Continuous Verification** or **Service Health**, you will need to configure a risk profile. Expand the following block to learn more. 

   <details>
   <summary><b>Risk Profile settings</b></summary>
   
   <RiskProfile />

   </details>

7. Enter the query in the **Query** field. This field can also be a Harness expression or runtime input.
8. Click **Fetch Records** to retrieve the details.
   
   ![](./static/verify-deployments-with-cloudwatch-116.png)
   
9. Click **Submit**. The Health Source is displayed in the Verify step.
   
   ![](./static/verify-deployments-with-cloudwatch-117.png)

</TabItem>
<TabItem value="CloudWatch Logs">

:::note

CloudWatch Logs is currently behind the feature flag `CDS_CV_CLOUDWATCH_LOGS_ENABLED`. Contact [Harness Support](mailto:support@harness.io) to enable it.

:::

1. Click **+ Add Query**.
2. Enter a **Query Name**. 
3. Click **Submit**.
4. Select the **AWS Region**.
5. Select a **CloudWatch Log Group**. This field can also be a Harness expression or runtime input.
6. Under **Define Query**, enter your [query](https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/CWL_QuerySyntax.html). This query can also be a runtime input or expression.
7. After writing your fixed input query, click **Run Query**.
8. Next, complete the field mapping for the **Timestamp Identifier**, **Service Instance Identifier**, and **Message Identifier**. To do so, hit the `+` button icon and select the relevant field from the log that appears after running the query. 

   ![](./static/field-mapping.png)

9. Click **Submit**. The health source will be displayed in the verify step!

</TabItem>
</Tabs>

---

You can add one or more Health Sources for each APM or logging provider.
