---
title: Continuous Verification FAQs
description: Frequently asked questions about Continuous Verification.
sidebar_position: 1000
---
This article addresses some frequently asked questions about Harness Continuous Verification.

### How can I verify that my CD pipeline has resulted in a successful deployment? 

Harness Continuous Verification (CV) integrates with APM providers. By using machine learning Continuous Verification can be a powerful tool for verifying a CD deployment.

### What is the process for marking a currently running Continuous Verification step as successful?

To mark a running Continuous Verification step as successful, you can use Manual Intervention as a failure strategy. If the step exceeds the defined timeout for example, the manual intervention is triggered, and you can subsequently mark it as successful.

### Do we have the functionality in NextGen for marking continuous verification errors as "Not a Risk" ?

Yes, it is behind the feature flag `SRM_LOG_FEEDBACK_ENABLE_UI`. Please read more on this in the following [Documentation](https://developer.harness.io/docs/continuous-delivery/verify/cv-results/log-feedback/)


### What does the below error in the lambda function deployment signifies ?

`aws/lambda/testLambda-dev already exists in stack arn:aws:cloudformation:us-east-2:xxxxxxxx...`


The error comes in scenario where there was a previous failed deployment but the logs still exist in the cloudwatch logs. We need to remove the log and try the deployment again.



### We need to pull deployments events from harness to datadog/custom when any PROD deployment is successful.

You can use Webhook notifications to post the pipeline event to an endpoint and you can review and use the JSON Harness posts to your webhook endpoint


### Can we use Continuous Verification inside CD module without any dependency of SRM ?

Yes, one can set up a Monitored Service in the Service Reliability Management module or in the `Verify step` in a CD stage.
Please read more on this in the following [Documentation](https://developer.harness.io/docs/continuous-delivery/verify/configure-cv/verify-deployments-with-new-relic/#review-cv-setup-options)


### How does the log verification process manage user-provided search queries, specifically focusing on negative queries aimed at identifying errors or exceptions?

Log verification takes in a user-provided search query. Queries should be negative queries that look at errors or exceptions. Typically, no more than 100 to 1000 errors in a minute.
Please read more on this in the following [Documentation](https://developer.harness.io/docs/first-gen/continuous-delivery/continuous-verification/continuous-verification-overview/concepts-cv/what-is-cv/#queries-and-limitations)

### Can I monitor CloudWatch Alarms for ECS autoscaling issues?

Currently, we do not have a direct method to retrieve CloudWatch Alarms data. While Continuous Verification supports fetching CloudWatch Logs and Metrics, alarms are not included. For more information on how to configure Continuous Verification, you can refer to the documentation.

### Do we support Terraform Harness provider configuring New Relic as a health source for a monitored service ?

Yes, we support health source like  `New Relic` , `ElasticSearch`, `Sumologic Metrics`, `Sumologic Log`, `Splunk Signal FX`,`Grafana Loki Log`,`Azure Metrics`, `Azure Log Health`, `Prometheus`, `Datadog` and `Metrics`.


###  What is a "groupName", and how would I add it to an NRQL query for Continuous Verification?

A groupName is an identifier used to logically group metrics. To add a groupName to a New Relic Query, add it in the `Map Metric(s) to Harness Services` section of the Health Source.

### Is it anticipated that the Harness pipeline will initiate the verification of 'access' permissions to an environment at the outset of an execution, as opposed to conducting such verification progressively as the pipeline advances?

Yes, You can deploy to selective stages.

### I am trying to implement Continuous Verification in Harness, but I am not able to see the Continuous Verification or Verify option.

Can you check and confirm the type of stage where you are trying to add the Verify step, as this option is only available with the CD (Deploy) stage.


### Do I need to create a monitored service before running the execution?

Monitored services will be created automatically after the execution of the service/environment combination. However, you have to setup the health source after that. If you have already created and configured the health source, you will be able to see the verification result in the first run itself.



### Verification is getting skipped though there is monitored service configured for service+env combination.
```
No monitoredServiceRef is defined for service <servicename> and env <envename>
```

Can you check if Continuous Verification is selected for the configured monitored service health source under **Assign**.
You can select the services for which you want to apply the metric.

### Can we add multiple node filters while using Prometheus?

Yes, you can use a multiple-node filter. All of those filters should be applied.

### How do you select the correct Service Instance Identifier (SII)?

It depends upon what kind of metric you want to monitor. For K8s deployments, the best SII selection is typically pod, podname, or containername.

### I have set up a failure strategy at timeout, but it is not working for the verify step. Despite this, API calls for CloudWatch are still timing out. How can I resolve this issue?

The failure strategy is for step time timeouts and not for api calls that are being made. You need to set up a failure strategy for all failures in these scenarios.

### Can we use Coralogix as a verification provider?

Yes, you can configure a custom health source and use the query with index.

### How are appdynamics metrics being reported, and why are not all metrics being reported?

So once you select the metric pack (performance and error), we do have some defined metrics that we pull and report on the data.

### How to pull metrics that are not detected automatically for Appdynamics?

You can configure a custom query under the health source and need to pass completeMetricPath.

### In this custom verification of logs, I see it shows known, unknown, and unexpected frequencies. However, I want to define what is known, as some logs are expected, and I want to ignore them. 

You can change the log preference and mark (not a risk) once you select Update event preference.

### Why the verification graph looks different for metric vs log analysis.

Log analysis uses a radar chart, while for metric analysis, a linear chart is used, and that’s why we see differences in the chart.

### What is the group used for in the case of CV? I do not see an option to configure while using Appdynmaics as APM.

Group is used to show the metric as per the defined group. For Appdynamics, New Relic, and Dynatrace, metrics are automatically grouped based on transactions.
You will be able to select the group for the custom query that you configure.

### Can we have both APM and log verification enabled for the same pipeline?

Yes, you can configure multiple health sources under the same monitored service, and you will be able to see the metrics and log


### Which all expression language data types are supported for Prometheus?

Only scalar is supported, so make sure Prometheus queries must produce a single value (scalar).


### Does Harness support Thanos for verification?

Yes, you can create Prometheus as a health source and can use Thanos for queries.


### What is the recommended SII for applications tagged with version and does not return data for node/pod specific

You can use version as SII for those resources, but you need to make sure the query response has data with pod/node name.

### Currently, NewRelic seems to be account-level. When we remove the NewRelic verification from "a" pipeline, it is removed from every pipeline.

No, If you are using the default monitored service while using the same env and service combination, the health source can be configured on the monitored service, so if you remove it, all pipelines using the same monitored service will not be able to see the health source.
