---
title: Continuous Verification FAQs
description: Frequently asked questions about Continuous Verification.
sidebar_position: 1000
---
This topic answers frequently asked questions about Harness Continuous Verification (CV).

The FAQs are organized into a general section covering the AI Verify (v1) step, followed by sections dedicated to each supported health source.

## AI Verify (v1)

### How can I verify that my CD pipeline has resulted in a successful deployment? 

Harness CV integrates with APM providers. By using machine learning Continuous Verification can be a powerful tool for verifying a CD deployment.

### Can we use Continuous Verification inside CD module without any dependency of SRM ?

Yes, one can set up a Monitored Service in the Service Reliability Management module or in the `AI Verify (v1) step` in a CD stage.
Go to [Configure New Relic as a health source](/docs/continuous-delivery/verify/configure-cv/health-sources/new-relic) to review CV setup options.

### Do I need to create a monitored service before running the execution?

Monitored services will be created automatically after the execution of the service/environment combination. However, you have to setup the health source after that. If you have already created and configured the health source, you will be able to see the verification result in the first run itself.

### I am trying to implement Continuous Verification in Harness, but I am not able to see the Continuous Verification or Verify option.

Can you check and confirm the type of stage where you are trying to add the AI Verify (v1) step, as this option is only available with the CD (Deploy) stage.

### Is it anticipated that the Harness pipeline will initiate the verification of 'access' permissions to an environment at the outset of an execution, as opposed to conducting such verification progressively as the pipeline advances?

Yes, You can deploy to selective stages.

### How do you select the correct Service Instance Identifier (SII)?

It depends upon what kind of metric you want to monitor. For K8s deployments, the best SII selection is typically pod, podname, or containername.

### What is the recommended SII for applications tagged with version and does not return data for node/pod specific

You can use version as SII for those resources, but you need to make sure the query response has data with pod/node name.

### Can we have both APM and log verification enabled for the same pipeline?

Yes, you can configure multiple health sources under the same monitored service, and you will be able to see the metrics and log

### Can we have multiple CV sources for verifying the same execution?

Yes, you can configure multiple health sources as part of the monitored service. You can use both Log and Metric verification for the same execution to gather comprehensive data.

### How does the log verification process manage user-provided search queries, specifically focusing on negative queries aimed at identifying errors or exceptions?

Log verification takes in a user-provided search query. Queries should be negative queries that look at errors or exceptions. Typically, no more than 100 to 1000 errors in a minute.

### Do we support Terraform Harness provider configuring New Relic as a health source for a monitored service ?

Yes, we support health source like  `New Relic` , `ElasticSearch`, `Sumologic Metrics`, `Sumologic Log`, `Splunk Signal FX`,`Grafana Loki Log`,`Azure Metrics`, `Azure Log Health`, `Prometheus`, `Datadog` and `Metrics`.

### How does Continuous Verification establish the baseline and post-deployment window?

It depends on the verification type. For **Rolling** and **Blue Green**, Harness compares a pre-deployment window with a post-deployment window of equal length around the deploy event. For **Canary**, it compares canary nodes against primary nodes running concurrently. For **Load Test**, it compares post-deployment data against the last passed verification of the same service. Data is sampled once per minute. Go to [Machine Learning Usage](/docs/continuous-delivery/verify/cv-concepts/machine-learning) to review the mechanics.

### How does Continuous Verification decide pass or fail and trigger rollback?

For metrics, the model measures deviation from the baseline in standard deviations (σ); for logs, it clusters messages as **Known**, **Unknown**, or **Unexpected Frequency**. Sensitivity sets the threshold: **High** flags 1σ, **Medium** (default) 2σ, **Low** 3σ. Harness rolls this into a Healthy, Medium Healthy, or Unhealthy status, and the step fails (triggering your failure strategy, such as rollback) when the status exceeds your sensitivity tolerance. Go to [Sensitivity](/docs/continuous-delivery/verify/verify-deployments-with-the-verify-step#sensitivity) to review the full status-to-result table.

### What duration and data sampling does Continuous Verification use for analysis?

Harness analyzes the data points collected within the configured duration, sampled once per minute for each metric and log query. Harness recommends 10 minutes for logging providers and 15 minutes for APM and infrastructure providers. If a host or custom metric produces no data, that series is not analyzed; enable **Fail on no analysis** to fail the step when there is no data. Go to [Fail on no analysis](/docs/continuous-delivery/verify/verify-deployments-with-the-verify-step#fail-on-no-analysis) to configure it.

### How many deployments does the baseline need before it is meaningful, and what failure strategy fits the warm-up period?

For **Canary**, **Rolling**, and **Blue Green**, the comparison happens within the same execution, so the baseline is meaningful from the first deployment. Only **Load Test** depends on history, because it uses the last passed verification of the same service as its baseline. During any warm-up period, use a non-blocking failure strategy (mark as success or ignore failure) so a new service does not block deployments.

### How does Continuous Verification behave when the baseline and post-deployment windows fall in different traffic periods?

For **Rolling** and **Blue Green**, Harness compares a pre-deployment window with a post-deployment window, so the two windows can reflect different traffic levels when a deployment spans a change in traffic. **Canary** verification avoids this because it compares canary and primary nodes running in the same window. To reduce false positives from traffic-driven variation, lower the sensitivity or define **Ignore** thresholds so values within a normal range are excluded from analysis.

### What configuration is recommended for off-peak deployments?

Prefer **Canary** so the comparison is between concurrent nodes, set sensitivity to **Low** for services with high variability, use **Ignore** thresholds to exclude low-throughput noise and **Fail Fast** thresholds for hard limits, and keep the recommended 10 to 15 minute duration. Go to [Choose the right sensitivity](/docs/continuous-delivery/verify/verify-deployments-with-the-verify-step#choose-the-right-sensitivity) to match sensitivity to your service.

### Is Continuous Verification viable for very low throughput applications?

Comparative ML analysis relies on enough metric and log data in the window to distinguish a real change from noise, so applications with only one or two transactions per hour are weak candidates for ML-based verification. For these, use **Threshold Analysis [No ML]** or **Load Test** verification, align the verification window with the period of concentrated traffic, or make the step optional for that asset.

### What happens when there are zero transactions in the post-deployment window?

With no data collected, there is nothing for the model to compare. Enable **Fail on no analysis** to fail the step in that case. For sparse or bursty traffic, use threshold-based or Load Test verification, or make the step optional.

### How much does the AI Verify (v1) step add to pipeline duration?

The step runs for the configured verification duration (Harness recommends 10 to 15 minutes), plus the initial data-collection delay before analysis begins. To return earlier on a clear breach, use **Fail Fast** metric thresholds; log analysis always runs the full duration.

### How do we make the AI Verify (v1) step optional in a golden pipeline template?

Use the step's **Conditional Execution** setting with a JEXL condition on a pipeline variable or environment value, so teams can opt out through a runtime input without editing the template. In addition, when the service or environment is a runtime input and no monitored service matches the generated name, Harness skips the Verify step. Go to [Conditional execution settings](/docs/continuous-delivery/x-platform-cd-features/executions/step-and-stage-conditional-execution-settings) to configure the condition.

### What is the Harness equivalent of GitLab rules: for conditionally skipping the Verify step?

Use **Conditional Execution** on the step with a JEXL expression that references runtime inputs, variables, or trigger payload values, so verification runs only when the condition is met. Go to [Conditional execution settings](/docs/continuous-delivery/x-platform-cd-features/executions/step-and-stage-conditional-execution-settings) to configure it.

### What RBAC controls apply to the AI Verify (v1) step and its configuration?

Editing the pipeline or template that contains the step requires the matching pipeline or template edit permissions, and health source configuration is governed by monitored service permissions. Restrict template edit access so teams consume the golden template and opt out only through the runtime input you expose. Go to [RBAC in Harness](/docs/platform/role-based-access-control/rbac-in-harness) to configure roles.

### How do we manage monitored services and health sources as code?

Manage monitored service and health source configuration with the Harness Terraform provider or with Git Experience (GitX), so your platform team governs Continuous Verification the same way it governs pipeline templates. Go to [Store monitored services in Git](/docs/platform/git-experience/gitx-monitored-services) to configure config as code.

### Can verification results be viewed or exported?

Verification results appear in the out-of-the-box Verification Dashboard, which you can filter by verification type, monitored service, and date, and use for reporting. Go to [Out-of-the-box Verification Dashboard](/docs/continuous-delivery/verify/cv-results/verification-dashboard) to review the available data.

### Can we mark continuous verification errors as "Not a Risk"?

Yes, it is behind the feature flag `SRM_LOG_FEEDBACK_ENABLE_UI`. Go to [Log feedback](/docs/continuous-delivery/verify/cv-results/log-feedback) to configure it.

### In this custom verification of logs, I see it shows known, unknown, and unexpected frequencies. However, I want to define what is known, as some logs are expected, and I want to ignore them. 

You can change the log preference and mark (not a risk) once you select Update event preference.

### Why the verification graph looks different for metric vs log analysis.

Log analysis uses a radar chart, while for metric analysis, a linear chart is used, and that is why we see differences in the chart.

### We need to pull deployment events from Harness to Datadog or a custom endpoint when any PROD deployment is successful.

You can use Webhook notifications to post the pipeline event to an endpoint and you can review and use the JSON Harness posts to your webhook endpoint

### What is the process for marking a currently running Continuous Verification step as successful?

To mark a running Continuous Verification step as successful, you can use Manual Intervention as a failure strategy. If the step exceeds the defined timeout for example, the manual intervention is triggered, and you can subsequently mark it as successful.

### Verification is getting skipped though there is monitored service configured for service+env combination.
```
No monitoredServiceRef is defined for service <servicename> and env <envename>
```

Can you check if Continuous Verification is selected for the configured monitored service health source under **Assign**.
You can select the services for which you want to apply the metric.

### My AI Verify step is failing without any details. How can I find more information?

You can check the execution logs to identify the root cause. This could help you determine if the failure is due to data collection issues or problems encountered during the analysis phase.

### On Continuous Verification, do we store any logs ingested from APMs or metric tools?

Yes, logs ingested from APMs and metric tools are stored for audit purposes only, not for any ML or AI training.

These logs follow Harness’s data retention policies:
- Execution data (including verification logs) is retained for up to 6 months. To extend it to one year, get the feature flag `CDS_CV_DATA_RETENTION_FOR_ONE_YEAR_ENABLED` enabled. Go to [data retention policy](/docs/platform/references/data-retention) to review retention limits.
- Audit trail data is retained for up to 2 years. Go to [Audit trails](/docs/platform/governance/audit-trail) to review audit data retention.

## AppDynamics

### How are appdynamics metrics being reported, and why are not all metrics being reported?

So once you select the metric pack (performance and error), we do have some defined metrics that we pull and report on the data.

### How to pull metrics that are not detected automatically for Appdynamics?

You can configure a custom query under the health source and need to pass completeMetricPath.

### What is the difference between 'path' and 'validationPath' in AppDynamics OOTB metric definitions?

When configuring AppDynamics health sources with metric packs, each out-of-the-box (OOTB) metric has two distinct path attributes that serve different purposes.

The **path** field represents the complete hierarchical metric path that Harness uses in its DSL queries to fetch metric data. This is the primary path used during continuous verification analysis. For example, the `calls_per_minute` metric uses the path: `Business Transaction Performance|Business Transactions|__tier_name__|__metric_filter__|Calls per Minute`. The placeholders like `__tier_name__` and `__metric_filter__` are dynamically replaced with actual values during execution.

The **validationPath** field provides an alternative, simpler metric path used for validation and verification purposes. This path typically represents a more aggregated view of the same metric at the tier level. For the same `calls_per_minute` metric, the validation path is: `Overall Application Performance|__tier_name__|Calls per Minute`.

To verify these metric paths in your AppDynamics environment, navigate to the AppDynamics Metric Browser. You can access it from your AppDynamics controller under the metrics section. Browse through the hierarchy to locate metrics under either path structure. You can also verify which path is being used by examining the external API calls in your AI Verify (v1) step execution logs.

If you need to troubleshoot data discrepancies, check the API calls made during the verification process. These calls will show the exact metric paths being queried and the responses received from AppDynamics.

### What is the group used for in the case of CV? I do not see an option to configure while using Appdynmaics as APM.

Group is used to show the metric as per the defined group. For Appdynamics, New Relic, and Dynatrace, metrics are automatically grouped based on transactions.
You will be able to select the group for the custom query that you configure.

## Amazon CloudWatch

### Can I monitor CloudWatch Alarms for ECS autoscaling issues?

Currently, we do not have a direct method to retrieve CloudWatch Alarms data. While Continuous Verification supports fetching CloudWatch Logs and Metrics, alarms are not included. For more information on how to configure Continuous Verification, you can refer to the documentation.

### What does the below error in the lambda function deployment signify?

`aws/lambda/testLambda-dev already exists in stack arn:aws:cloudformation:us-east-2:xxxxxxxx...`

The error comes in scenario where there was a previous failed deployment but the logs still exist in the cloudwatch logs. We need to remove the log and try the deployment again.

### I have set up a failure strategy at timeout, but it is not working for the AI Verify (v1) step. Despite this, API calls for CloudWatch are still timing out. How can I resolve this issue?

The failure strategy is for step time timeouts and not for api calls that are being made. You need to set up a failure strategy for all failures in these scenarios.

## Custom health source

### Can we use Coralogix as a verification provider?

Yes, you can configure a custom health source and use the query with index.

### Is there any limitations of query size for a custom health source?

Yes, it is set to 16000.

## Elasticsearch

### Do we have an option to refresh the bearer token automatically while using the Elastic connector?

No, there is currently no option to refresh the bearer token automatically. Token refresh needs to be done manually.

## New Relic

###  What is a "groupName", and how would I add it to an NRQL query for Continuous Verification?

A groupName is an identifier used to logically group metrics. To add a groupName to a New Relic Query, add it in the `Map Metric(s) to Harness Services` section of the Health Source.

### What is the recommended NRQL query structure, and how do groupName and the Service Instance Identifier work?

The query returns the metric value over time together with an attribute that identifies the instance that emitted it. Harness uses the **Service Instance Identifier (SII)** to map that attribute to a node (to tell canary from stable), and **groupName** (set in **Map Metric(s) to Harness Services**) to group related metrics. For New Relic, metrics are grouped automatically by transaction.

### For ECS deployments, what SII should we use when New Relic metrics are not tagged at the container level?

The default ECS SII is `containername`. The query response must return a per-instance field so Harness can map each series to a node. If container-level tags are unavailable, use another per-instance attribute that the query returns, or use `version` when resources are version-tagged. Go to [Service Instance Identifier (SII)](/docs/continuous-delivery/verify/verify-deployments-with-the-verify-step#service-instance-identifier-sii) to review options.

### The New Relic health source is shared across pipelines on the same service and environment. How do we change it safely?

The health source lives on the monitored service for that service and environment, so all pipelines using it share the configuration. To isolate changes, use a separate monitored service, or manage monitored services as code so changes go through review. Go to [Store monitored services in Git](/docs/platform/git-experience/gitx-monitored-services) to version the configuration.

### Currently, NewRelic seems to be account-level. When we remove the NewRelic verification from "a" pipeline, it is removed from every pipeline.

No, If you are using the default monitored service while using the same env and service combination, the health source can be configured on the monitored service, so if you remove it, all pipelines using the same monitored service will not be able to see the health source.

### New Relic data collection task is failing with the following error:
Error:
"Data collection task failed with exception: JsonPathException: org.json.JSONException: JSONArray[0] not found."

Cause and Resolution:
This issue is caused by a change in the response format from New Relic. It is a known issue that has been addressed in Delegate version 850xx and later.

## Prometheus

### Can we add multiple node filters while using Prometheus?

Yes, you can use a multiple-node filter. All of those filters should be applied.

### Which all expression language data types are supported for Prometheus?

Only scalar is supported, so make sure Prometheus queries must produce a single value (scalar).

### Does Harness support Thanos for verification?

Yes, you can create Prometheus as a health source and can use Thanos for queries.

## Sumo Logic

### What is the data collection interval for Sumo Logic in Continuous Verification, and can it be configured?

Data collection occurs once every minute for each metric or log query configured for a health source. The interval is standardized for all verifications and cannot be adjusted.
