---
title: Verify Deployments with Datadog Logging
description: Harness can analyze Datadog metrics to verify, rollback, and improve deployments.
# sidebar_position: 2
helpdocs_topic_id: vd4jgv41io
helpdocs_category_id: x9hs9wviib
helpdocs_is_private: false
helpdocs_is_published: true
---

Harness can analyze Datadog logs to verify, rollback, and improve deployments. To apply this analysis to your deployments, you set up Datadog as a verification step in a Harness Workflow.

Once you run a deployment, and Datadog preforms verification, Harness' machine-learning verification analysis will assess the risk level of the deployment.

In order to obtain the names of the host(s), pod(s), or container(s) where your service is deployed, the verification provider should be added to your workflow *after* you have run at least one successful deployment.In this topic:


### Before You Begin

* Set up a Harness Application, containing a Service and Environment. See  [Create an Application](../../model-cd-pipeline/applications/application-configuration.md).
* See the  [Datadog Verification Overview](../continuous-verification-overview/concepts-cv/datadog-verification-overview.md).
* Make sure you [Connect to Datadog](1-datadog-connection-setup.md).

### Visual Summary

Here's an example of a Datadog Logs configuration for verification.

![](./static/3-verify-deployments-with-datadog-24.png)

### Step 1: Set Up the Deployment Verification

To verify your deployment with Datadog Logs, do the following:

1. Ensure that you have added Datadog as a verification provider, as described in [Connect to Datadog](1-datadog-connection-setup.md).
2. In your workflow, under **Verify Service**, click **Add Verification**.
3. In the resulting **Add Step** settings, select either **Performance Monitoring** > **Datadog Logs.**
4. Click **Next**. The **Datadog Logs** settings appear.

### Step 2: Datadog Log Server

Select the Datadog verification provider you added earlier in [Datadog Connection Setup](1-datadog-connection-setup.md).

You can also enter variable expressions, such as:

 `${serviceVariable.datadog_connector_name}`

### Step 3: Search Keywords

Enter search keywords, such as `*expression*`. Separate keywords using spaces. (Follow the Datadog [log search syntax](https://docs.datadoghq.com/logs/explorer/search/#search-syntax).)

You can also enter variable expressions, such as:

`error OR ${serviceVariable.error_type}`

### Step 4: Field Name for Host/Container

Enter the name of the **tag** in Datadog where the service instance is present.

Harness uses this field to group data and perform analysis at the container-level.

### Step 5: Expression for Host/Container name

Enter an expression that evaluates to the host/container/pod name tagged in the Datadog events.

This expression relates to the field you selected in **Field Name for Host/Container**. You want an expression that maps the JSON field returned to Harness with the Datadog field you selected in **Field Name for Host/Container**.

For example, in Datadog, a Kubernetes deployment might use the tag **pod\_name** to identify the pod where the microservice is deployed.

Find the where the same name is identified in the deployment environment, and use that path as the expression.

For AWS EC2 hostnames, use the expression `${instance.hostName`}.For example, locate the pod name in the Datadog **Event Stream** page:

1. In **Datadog**, click **Events**.
2. Locate an event using a search query. For more information, see [Event Stream](https://docs.datadoghq.com/graphing/event_stream/) from Datadog.
3. Expand the event by click the the ellipsis at the end of the event title.

   [![](./static/3-verify-deployments-with-datadog-25.png)](./static/3-verify-deployments-with-datadog-25.png)
   
4. Look through the event details and locate the tag that lists the pod name for the instance where the service is deployed. In our example, the tag is **pod\_name**.

   [![](./static/3-verify-deployments-with-datadog-27.png)](./static/3-verify-deployments-with-datadog-27.png)
   
   
5. Next, look in the JSON for the host/container/pod in the deployment environment and identify the label containing the same hostname. The path to that label is what the expression should be in **Expression for Host/Container name**. The default expression is **${host.hostName}**. In most cases, this expression will work.

### Step 6: Analysis Time duration

Set the duration for the verification step. If a verification step exceeds the value, the workflow [Failure Strategy](../../model-cd-pipeline/workflows/workflow-configuration.md#failure-strategy) is triggered. For example, if the Failure Strategy is **Ignore**, then the verification state is marked **Failed** but the workflow execution continues.

See  [CV Strategies, Tuning, and Best Practices](../continuous-verification-overview/concepts-cv/cv-strategies-and-best-practices.md).

### Step 7: Baseline for Risk Analysis

See  [CV Strategies, Tuning, and Best Practices](../continuous-verification-overview/concepts-cv/cv-strategies-and-best-practices.md).

### Step 8: Algorithm Sensitivity

See  [CV Strategies, Tuning, and Best Practices](../continuous-verification-overview/concepts-cv/cv-strategies-and-best-practices.md#algorithm-sensitivity-and-failure-criteria).

### Step 9: Execute with previous steps

Check this checkbox to run this verification step in parallel with the previous steps in **Verify Service**.

### Review: Datadog and ECS

For [ECS-based deployments](https://docs.harness.io/article/08whoizbps-ecs-deployments-overview), Datadog uses the container ID to fetch data for both metrics and logs. Harness can fetch the container ID if the Harness Delegate is running on same ECS cluster as the container or the Delegate must be in same AWS VPC and **port 51678** must be open for incoming traffic.

### Review: Harness Expression Support in CV Settings

You can use expressions (`${...}`) for [Harness built-in variables](https://docs.harness.io/article/7bpdtvhq92-workflow-variables-expressions) and custom [Service](../../model-cd-pipeline/setup-services/service-configuration.md) and [Workflow](../../model-cd-pipeline/workflows/add-workflow-variables-new-template.md) variables in the settings of Harness Verification Providers.

Expression support lets you template your Workflow verification steps. You can add custom expressions for settings, and then provide values for those settings at deployment runtime. Or you can use Harness built-in variable expressions and Harness will provide values at deployment runtime automatically.

### Step 10: View Verification Results

Once you have deployed your workflow (or pipeline) using the Datadog verification step, you can automatically verify cloud application and infrastructure performance across your deployment. For more information, see [Add a Workflow](../../model-cd-pipeline/workflows/workflow-configuration.md) and [Add a Pipeline](../../model-cd-pipeline/pipelines/pipeline-configuration.md).

#### Workflow Verification

To see the results of Harness machine-learning evaluation of your Datadog verification, in your workflow or pipeline deployment you can expand the **Verify Service** step and then click the **Datadog** step.

![](./static/3-verify-deployments-with-datadog-29.png)

#### Continuous Verification

You can also see the evaluation in the **Continuous Verification** dashboard. The workflow verification view is for the DevOps user who developed the workflow. The **Continuous Verification** dashboard is where all future deployments are displayed for developers and others interested in deployment analysis.

To learn about the verification analysis features, see the following sections.

##### Deployments



|  |  |
| --- | --- |
|  | **Deployment info:** See the verification analysis for each deployment, with information on its service, environment, pipeline, and workflows.**Verification phases and providers:** See the vertfication phases for each vertfication provider. Click each provider for logs and analysis.**Verification timeline:** See when each deployment and verification was performed. |

##### Transaction Analysis



|  |  |
| --- | --- |
| **Execution details:** See the details of verification execution. Total is the total time the verification step took, and Analysis duration is how long the analysis took.**Risk level analysis:** Get an overall risk level and view the cluster chart to see events.**Transaction-level summary:** See a summary of each transaction with the query string, error values comparison, and a risk analysis summary. |  |

##### Execution Analysis



|  |  |
| --- | --- |
|  | **Event type:** Filter cluster chart events by Unknown Event, Unexpected Frequency, Anticipated Event, Baseline Event, and Ignore Event.**Cluster chart:** View the chart to see how the selected event contrast. Click each event to see its log details. |

##### Event Management



|  |  |
| --- | --- |
| **Event-level analysis:** See the threat level for each event captured.**Tune event capture:** Remove events from analysis at the service, workflow, execution, or overall level.**Event distribution:** Click the chart icon to see an event distribution including the measured data, baseline data, and event frequency. |  |

### Next Steps

* [Configuration as Code](https://docs.harness.io/article/htvzryeqjw-configuration-as-code)
* [Users and Permissions](https://docs.harness.io/article/ven0bvulsj-users-and-permissions)
* [CV Strategies, Tuning, and Best Practices](../continuous-verification-overview/concepts-cv/cv-strategies-and-best-practices.md#algorithm-sensitivity-and-failure-criteria)

