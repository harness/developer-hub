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

* [Before You Begin](#before_you_begin)
* [Step 1: Connect a Verification Provider](#step_1_connect_a_verification_provider)
* [Step 2: Configure Your Verification Provider](#configure)
* [Option: Custom Metrics and Logs](#custom)

Harness will use your tools to verify deployments, and will use Harness' machine learning features to identify sources of failures.


### Before You Begin

* [What Is Continuous Verification (CV)?](/article/ina58fap5y-what-is-cv)
* [When Does Harness Verify Deployments?](/article/95vzen6l4m-when-verify)


### Step 1: Connect a Verification Provider

﻿To connect a verification provider to Harness:

1. Click **Setup**.
2. Click **Connectors**.
3. Click **Verification Providers**.
4. Click **Add Verification Provider**, and select the name of your provider. The Add Verification Provider dialog for your provider appears.


### Step 2: Configure Your Verification Provider

Proceed to the integration overview for the provider you've selected, and follow the steps it provides:

* [AppDynamics](/article/2zxfjt67yb-app-dynamics-verification-overview)
* [New Relic](/article/ht3amzjvle-new-relic-verification-overview)
* [Dynatrace](/article/r3xtgg0e2k-dynatrace-verification-overview)
* [Splunk](/article/dujtd6ek5p-splunk-verification-overview)
* [ELK Elasticsearch](/article/qdajtgsqfj-elasticsearch-verification-overview)
* [Datadog](/article/ong5rbbn49-datadog-verification-overview)
* [Sumo Logic](/article/wb2k4u4kxm-sumo-logic-verification-overview)
* [Prometheus](/article/5uh79dplbj-prometheus-verification-overview)
* [Bugsnag](/article/ac5piurukt-bugsnag-verification-overview)
* [Stackdriver](/article/jn0axefdat-stackdriver-and-harness-overview)
* [CloudWatch](/article/q6ti811nck-cloud-watch-verification-overview)
* [Instana](/article/s9qjvicmod-instana-verification-overview)
* [Logz.io](/article/1hw6xxh73c-logz-verification-provider)


### Option: Custom Metrics and Logs

If your APM or logging tool is not in the list above, you can configure it as a Harness custom APM or log provider. See [Custom Verification Overview](/article/e87u8c63z4-custom-verification-overview).

