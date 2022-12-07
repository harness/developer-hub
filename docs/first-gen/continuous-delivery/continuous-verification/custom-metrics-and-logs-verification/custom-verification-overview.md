---
title: Custom Verification Overview
description: Overview of Harness' integration with custom APM (metrics) and log providers.
sidebar_position: 10
helpdocs_topic_id: e87u8c63z4
helpdocs_category_id: ep5nt3dyrb
helpdocs_is_private: false
helpdocs_is_published: true
---

Harness includes first-class support for all of the major APM and logging vendors, but there are cases where a custom APM is needed.

This topic describes how to set up Harness Continuous Verification features, and monitor your deployments using Harness' unsupervised machine-learning functionality, on Custom APMs.

### Integration Process Summary

You set up your Custom Metrics or Logs Provider and Harness in the following way:

1. Using your Custom Metrics or Logs Provider, you monitor your microservice or application.
2. In Harness, you connect Harness to your Custom Metrics or Logs Provider account, adding the Custom Metrics or Logs Provider as a Harness Verification Provider.
3. After you have run a successful deployment of your microservice or application in Harness, you then add an Verification step(s) to your Harness deployment Workflow.
4. Harness uses your Custom Metrics or Logs Provider to verify your future microservice/application deployments.
5. Harness Continuous Verification uses unsupervised machine-learning to analyze your deployments and Custom Metrics or Logs Provider analytics, discovering events that might be causing your deployments to fail. Then you can use this information to improve your deployments.

### Limitations

Harness does not support **Azure Log Analytics** with Custom Verification at this time. We plan to support it in the near future as a first class integration.

### Next Steps

* [Connect to Custom Verification for Custom Metrics](connect-to-custom-verification-for-custom-metrics.md)
* [Connect to Custom Verification for Custom Logs](connect-to-custom-verification-for-custom-logs.md)
* [Monitor Applications 24/7 with Custom Metrics](monitor-applications-24-7-with-custom-metrics.md)
* [Monitor Applications 24/7 with Custom Logs](monitor-applications-24-7-with-custom-logs.md)
* [Verify Deployments with Custom Metrics](verify-deployments-with-custom-metrics.md)
* [Verify Deployments with Custom Logs](verify-deployments-with-custom-logs.md)
* [Connect to Datadog as a Custom APM](connect-to-datadog-as-a-custom-apm.md)
* [Verify Deployments with Datadog as a Custom APM](verify-deployments-with-datadog-as-a-custom-apm.md)
* [Connect to AppDynamics as a Custom APM](connect-to-app-dynamics-as-a-custom-apm.md)
* [Verify Deployments with AppDynamics as a Custom APM](verify-deployments-with-app-dynamics-as-a-custom-apm.md)

