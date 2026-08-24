---
title: Get Started with Load Testing
sidebar_label: Get Started
sidebar_position: 10
description: Learn how to create and run your first load test in Harness Resilience Testing
---

Load Testing simulates user traffic to validate your system's performance under expected and peak load conditions. Identify bottlenecks, validate scalability, and ensure your applications can handle production workloads before they face real users.

:::info Feature Flag
Load Testing is currently behind a feature flag (`CHAOS_LOAD_TESTING_ENABLED`). Contact your Harness sales representative to get it enabled for your account.
:::

## Before you begin

- **Module access:** Access to the Harness Resilience Testing module.
- **Infrastructure:** A Linux VM or Kubernetes chaos infrastructure. Go to [Infrastructure](../chaos-testing/infrastructure) to configure one.
- **Environment:** An environment in your project for the infrastructure.
- **Service:** At least one onboarded service on that infrastructure.
- **Target access:** Application endpoints that the test infrastructure can reach.

---

## Create your first load test

1. Navigate to **Resilience Testing** > **Load Testing**.
2. Click **+ New Load Test**, then complete the guided flow.

:::tip Start from a sample test
Click the arrow beside **+ New Load Test** and select **Try Locust Sample Test** or **Try K6 Sample Test** to explore the feature with a pre-configured test, including sample endpoints and realistic load settings. There is no Java sample, so build a Java test from your own plan.
:::

Use the guide for your Load Test Engine:

- Go to [Python](./create-load-test/locust) to run Locust on a Linux VM or Kubernetes.
- Go to [JavaScript](./create-load-test/k6) to run k6 with script-defined thresholds on Kubernetes.
- Go to [Java](./create-load-test/jmeter) to run existing JMeter `.jmx` plans on Kubernetes.

---

## Next steps

- Go to [Load testing key concepts](./key-concepts) to understand virtual users, load profiles, engines, thresholds, and infrastructure.
- Go to [Analyze results](./analyze-results) to interpret load test execution results.
- Go to [Chaos Testing](../chaos-testing/get-started) to combine load tests with chaos experiments.
