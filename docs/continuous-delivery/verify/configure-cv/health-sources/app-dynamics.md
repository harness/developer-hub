---
title: AppDynamics
description: Learn how to set up AppDynamics as a health source for CV
redirect_from: 
    - /docs/continuous-delivery/verify/configure-cv/verify-deployments-with-app-dynamics
---

:::important
Harness supports AppDynamics metrics for applications. However, Harness doesn't support user experience metrics for browsers or mobile apps.
:::

import BeforeYouBegin from '/docs/continuous-delivery/verify/configure-cv/health-sources/static/before-you-begin.md';

<BeforeYouBegin />

## Add AppDynamics as a health source

This option is available only if you have configured the service and environment as fixed values.

A Health Source is basically a mapping of a Harness Service to the service in a deployment environment monitored by an APM or logging tool.

In **Health Sources**, click **Add**. The **Add New Health Source** settings appear.

![](./static/verify-deployments-with-app-dynamics-64.png)

1. In **Select health source type**, select AppDynamics.
2. In **Health Source Name**, enter a name for the Health Source.
3. Under **Connect Health Source**, click **Select Connector**.
4. In **Connector** settings, you can either choose an existing connector or click **New Connector.**
   
   ![](./static/verify-deployments-with-app-dynamics-65.png)

5. Click **Apply Selected**. The Connector is added to the Health Source.

   ![](./static/verify-deployments-with-app-dynamics-66.png)

6. In **Select Feature**, select the APM or logging tool component to use.
7. Click **Next** and **Customize Health Source** settings appear.

   The subsequent settings in **Customize Health Source** depend on the Health Source Type you selected. You can customize the metrics to map the Harness Service to the monitored environment. In **Applications & Tiers**, enter the following details:

8. In **Find an AppDynamics application** enter the name of the application and select an option from the list.
9.  In **Find an AppDynamics tier** enter a tier name from which you want usage metrics, code exceptions, error conditions, or exit calls.
10. In **Metric Packs** select the metrics you want Harness to monitor. **Errors** and **Performance** are selected by default.![](./static/verify-deployments-with-app-dynamics-67.png)
11. In **Custom Metrics (optional)**, click **Add Metric** to add any other metric to be monitored.
12. In **Query Specifications and Mapping**, you can customize the query to get the desired output and map it to a Harness Service.![](./static/verify-deployments-with-app-dynamics-68.png)
13. In **Map Metric(s) to Harness Services**, in **Metric Name** enter a name for the metric.
14. In **Group Name**, enter a group name of the metric.
15. In **AppDynamics Path**, you can either provide the complete metric path in **Specify a complete metric path**, or provide the base path of the AppDynamics metric in **Select the path from the AppD metric**.
16. In **Assign**, you can select the services for which you want to apply the metric. Available options are:
   * Continuous Verification
   * Health Score
   * SLI
17. In **Risk Category**, select a risk type from the list.
18. In **Deviation Compared to Baseline**, select one of the options based on the selected risk type.
19. Click **Submit**. The Health Source is displayed in the Verify step.

![](./static/verify-deployments-with-app-dynamics-69.png)

You can add one or more Health Sources for each APM or logging provider.