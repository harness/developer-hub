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


