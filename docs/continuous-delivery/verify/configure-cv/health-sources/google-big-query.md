---
title: Google Big Query
description: Learn how to set up Google Big Query as a health source for CV
---

import BeforeYouBegin from '/docs/continuous-delivery/verify/configure-cv/health-sources/static/before-you-begin.md';

<BeforeYouBegin />

## Add BigQuery as a health source

This option is available only if you have configured the service and environment as fixed values.

A Health Source is basically a mapping of a Harness Service to the service in a deployment environment monitored by an APM or logging tool.

1. In **Health Sources**, click **Add**. The **Add New Health Source** settings appear.
2. In **Select health source type**, select **BigQuery**.
3. In **Health Source Name**, enter a name for the Health Source.
4. Under **Connect Health Source**, click **Select Connector**.
5. In **Connector** settings, you can either choose an existing connector or click **New Connector.**
6. Click **Apply Selected**. The Connector is added to the Health Source.
7. In **Select Feature**, select the BigQuery feature to be used.
8. Click **Next**. The **Configuration** tab appears. 
9. Click **Add Query**.
10. Enter your **Query Name**.
11. Enter a query in the **Query** text box. 
12. Click **Run Query** to retrieve the details. The results are displayed under **Records.**
13. Click **Submit**. The Health Source is displayed in the Verify step.

Optionally, you can click **Get sample log messages** to get a list of sample logs for your query. 

You can add one or more Health Sources for each APM or logging provider.