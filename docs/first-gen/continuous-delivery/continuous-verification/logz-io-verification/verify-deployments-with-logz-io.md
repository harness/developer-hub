---
title: Verify Deployments with Logz.io
description: Verify, rollback, and improve deployments with Harness and Logz.io.
sidebar_position: 20
helpdocs_topic_id: vbl1xlad1e
helpdocs_category_id: j3m3gbxk88
helpdocs_is_private: false
helpdocs_is_published: true
---

Harness can analyze Logz.io data and analysis to verify, rollback, and improve deployments. To apply this analysis to your deployments, you set up Logz.io as a verification step in a Harness Workflow.

This topic covers the process to set up Logz.io in a Harness Workflow, and provides a summary of Harness verification results.

In order to obtain the names of the host(s), pod(s), or container(s) where your service is deployed, the verification provider should be added to your Workflow *after* you have run at least one successful deployment.

### Before You Begin

* [Harness Key Concepts](https://docs.harness.io/article/4o7oqwih6h-harness-key-concepts)
* [Connect to Logz.io](logz-verification-provider.md)

### Limitations

You must have a Logz.io Enterprise account to generate the API tokens required to integrate with Harness. (Logz.io Pro and Community accounts do not support token generation.)

### Step 1: Set up Deployment Verification

To verify your deployment with Logz.io, do the following:

1. Ensure that you have added Logz.io as a Harness Verification Provider, as described in [Connect to Logz.io](logz-verification-provider.md).
2. In your Workflow, under **Verify Service**, click **Add Step**, and select **Logz**.
3. Click **Next**. The **Logz** settings appear.

### Step 2: Select Logz Server

In **Logz** **Server**, select the server you added when you set up the Logz verification provider in [Connect to Logz.io](logz-verification-provider.md).

You can also enter variable expressions, such as: `${serviceVariable.logz_connector_name}`.

### Step 3: Query

In **Query**, enter search keywords for your query, such as **error or exception**.

The keywords are searched against the logs identified in the **Message** setting (see below).

You can also enter variable expressions, such as: `error OR ${serviceVariable.error_type}`

### Step 4: Query Type

Select query type for the value entered in the **Hostname Field**. The queries accept text, numerics, and dates. For MATCH and MATCH\_PHRASE types, the input is analyzed and the query is constructed.

1. **TERM** finds documents that contain the exact term specified in the entered value. See [ELK documentation on TERM queries](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-term-query.html#query-dsl-term-query) for more information.
2. **MATCH\_PHRASE** finds documents that contain the terms specified in the exact order of entries in the analyzed text. See [ELK documentation on MATCH\_PHRASE queries](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-match-query.html#_phrase) for more information.
3. **MATCH** finds documents that contain the entries in the analyzed text in any order. See [ELK documentation on MATCH queries](https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-match-query.html) for more information.

For more information, see [Elasticsearch Queries: A Thorough Guide](https://logz.io/blog/elasticsearch-queries/) and [Add dashboards and configure drilldown links](https://docs.logz.io/user-guide/infrastructure-monitoring/configure-grafana-drilldown-links.html) from Logz.io.

### Step 5: Hostname Field

In **Hostname Field**, enter the field name used in the logs that refers to the host/pod/container being monitored.

This is similar to a [Logz.io dashboard query](https://docs.logz.io/user-guide/infrastructure-monitoring/configure-grafana-drilldown-links.html).

### Step 6: Message

In **Message Field**, enter the field by which the messages are usually indexed. This is typically a **log** field.

You can also enter variable expressions, such as: `${serviceVariable.message_field}`.

### Step 7: Timestamp Format

In **Timestamp Format**, enter either a static value (such as `@timestamp`), or a variable expression such as: `${serviceVariable.timestamp_field}`.

### Step 8: Expression for Host/Container name

In **Expression for Host/Container name**, add an expression that evaluates to the host name value for the field you entered in the **Host Name Field** above. The default expression is **${instance.host.hostName}**.

For AWS EC2 hostnames, use the expression `${instance.hostName`}.In order to obtain the names of the host where your service is deployed, the verification provider should be added to your workflow **after** you have run at least one successful deployment.

### Step 9: Analysis Time Duration

Set the duration for the verification step. If a verification step exceeds the value, the workflow [Failure Strategy](../../model-cd-pipeline/workflows/workflow-configuration.md#failure-strategy) is triggered. For example, if the Failure Strategy is **Ignore**, then the verification state is marked **Failed** but the workflow execution continues.

See [CV Strategies, Tuning, and Best Practices](../continuous-verification-overview/concepts-cv/cv-strategies-and-best-practices.md#analysis-time-duration).


### Step 10: Baseline for Risk Analysis

See [CV Strategies, Tuning, and Best Practices](../continuous-verification-overview/concepts-cv/cv-strategies-and-best-practices.md).

### Harness Expression Support in CV Settings

You can use expressions (`${...}`) for [Harness built-in variables](https://docs.harness.io/article/7bpdtvhq92-workflow-variables-expressions) and custom [Service](../../model-cd-pipeline/setup-services/service-configuration.md) and [Workflow](../../model-cd-pipeline/workflows/add-workflow-variables-new-template.md) variables in the setting of Harness Verification Providers.

![](./static/verify-deployments-with-logz-io-01.png)

Expression support lets you template your Workflow verification steps. You can add custom expressions for settings, and then provide values for those settings at deployment runtime. Or you can use Harness built-in variable expressions and Harness will provide values at deployment runtime automatically.

