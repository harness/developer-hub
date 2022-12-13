---
title: Add Verification Providers
description: Integrate your verification provider with Harness, and Harness' machine leaning functionality will provide Continuous Verification of all your deployments.
# sidebar_position: 2
helpdocs_topic_id: r6ut6tldy0
helpdocs_category_id: ll7h8ktlwe
helpdocs_is_private: false
helpdocs_is_published: true
---

For Harness to verify the success of your deployments and services, you must connect Harness to your verification providers, as outlined in this topic:

* [Before You Begin](#before-you-begin)
* [Step 1: Connect a Verification Provider](#step-1-connect-a-verification-provider)
* [Step 2: Configure Your Verification Provider](#configure)
* [Option: Custom Metrics and Logs](#custom)

Harness will use your tools to verify deployments, and will use Harness' machine learning features to identify sources of failures.


## Before You Begin

* [What Is Continuous Verification (CV)?](../../../continuous-delivery/continuous-verification/continuous-verification-overview/concepts-cv/what-is-cv.md)
* [When Does Harness Verify Deployments?](../../../continuous-delivery/continuous-verification/continuous-verification-overview/concepts-cv/when-verify.md)


## Step 1: Connect a Verification Provider

To connect a verification provider to Harness:

1. Click **Setup**.
2. Click **Connectors**.
3. Click **Verification Providers**.
4. Click **Add Verification Provider**, and select the name of your provider. The Add Verification Provider dialog for your provider appears.


## Step 2: Configure Your Verification Provider

Proceed to the integration overview for the provider you've selected, and follow the steps it provides:

* [AppDynamics](../../../continuous-delivery/continuous-verification/continuous-verification-overview/concepts-cv/app-dynamics-verification-overview.md)
* [New Relic](../../../continuous-delivery/continuous-verification/continuous-verification-overview/concepts-cv/new-relic-verification-overview.md)
* [Dynatrace](../../../continuous-delivery/continuous-verification/continuous-verification-overview/concepts-cv/dynatrace-verification-overview.md)
* [Splunk](../../../continuous-delivery/continuous-verification/continuous-verification-overview/concepts-cv/splunk-verification-overview.md)
* [ELK Elasticsearch](../../../continuous-delivery/continuous-verification/continuous-verification-overview/concepts-cv/elasticsearch-verification-overview.md)
* [Datadog](../../../continuous-delivery/continuous-verification/continuous-verification-overview/concepts-cv/datadog-verification-overview.md)
* [Sumo Logic](../../../continuous-delivery/continuous-verification/continuous-verification-overview/concepts-cv/sumo-logic-verification-overview.md)
* [Prometheus](../../../continuous-delivery/continuous-verification/continuous-verification-overview/concepts-cv/prometheus-verification-overview.md)
* [Bugsnag](../../../continuous-delivery/continuous-verification/continuous-verification-overview/concepts-cv/bugsnag-verification-overview.md)
* [Stackdriver](../../../continuous-delivery/continuous-verification/continuous-verification-overview/concepts-cv/stackdriver-and-harness-overview.md)
* [CloudWatch](../../../continuous-delivery/continuous-verification/continuous-verification-overview/concepts-cv/cloud-watch-verification-overview.md)
* [Instana](../../../continuous-delivery/continuous-verification/continuous-verification-overview/concepts-cv/instana-verification-overview.md)
* [Logz.io](../../../continuous-delivery/continuous-verification/logz-io-verification/logz-verification-provider.md)


## Option: Custom Metrics and Logs

If your APM or logging tool is not in the list above, you can configure it as a Harness custom APM or log provider. See [Custom Verification Overview](../../../continuous-delivery/continuous-verification/custom-metrics-and-logs-verification/custom-verification-overview.md).

