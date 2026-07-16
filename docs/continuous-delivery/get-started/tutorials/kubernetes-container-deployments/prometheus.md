---
title: Verify Kubernetes Deployments with Prometheus
sidebar_label: Verify with Prometheus
sidebar_position: 4
description: Verify Kubernetes deployments with Prometheus and Harness Continuous Verification.
keywords:
  - Continuous Verification
  - Prometheus
  - Kubernetes
  - deployment verification
tags:
  - continuous-delivery
  - continuous-verification
  - prometheus
redirect_from:
  - /tutorials/cd-pipelines/continuous-verification/prometheus
  - /tutorials/cd-pipelines/continuous-verification
  - /docs/continuous-delivery/get-started/cd-tutorials/prometheus
  - /docs/continuous-delivery/get-started/tutorials/prometheus
---

<CTABanner
  buttonText="Learn More"
  title="Continue your learning journey."
  tagline="Take a Continuous Delivery & GitOps Certification today!"
  link="/university/continuous-delivery"
  closable={true}
  target="_self"
/>

This topic explains how to verify a Kubernetes deployment with Prometheus using Harness Continuous Verification (CV). You deploy <a href="https://github.com/harness-apps/cv-example-app" target="_blank" rel="noopener noreferrer">an application that writes to a Prometheus endpoint</a>, then add a Verify step that queries Prometheus to confirm the deployment is healthy.

Looking at external systems such as Application Performance Monitoring (APM), logging, or monitoring solutions is a systematic way to validate deployments. Harness CV can query these systems on your behalf, and can also <a href="/docs/continuous-delivery/verify/cv-concepts/machine-learning" target="_blank" rel="noopener noreferrer">apply AI/ML</a> to watch markers that are trending towards failure or regression.

---

## What will you learn in this topic?

- How to [install Prometheus](#install-prometheus) on your Kubernetes cluster with Helm.
- How to [configure Continuous Verification](#configure-continuous-verification) to query Prometheus and validate a deployment.
- How to [run the example pipeline](#run-the-example-pipeline) to deploy the sample application and verify it with Harness CV.

---

## Before you begin

To deploy the sample application to an existing Kubernetes cluster, ensure you have the following:

- **Harness account**: A Harness account is required. Go to <a href="https://app.harness.io/auth/#/signup/?module=cd&?utm_source=website&utm_medium=harness-developer-hub&utm_campaign=cd-plg&utm_content=get-started" target="_blank" rel="noopener noreferrer">sign up for free</a> to create one.
- **GitHub connectivity**: Go to the <a href="/docs/platform/connectors/code-repositories/ref-source-repo-provider/git-hub-connector-settings-reference" target="_blank" rel="noopener noreferrer">GitHub connector settings reference</a> to configure it.
- **Docker Hub connectivity**: Go to <a href="/docs/platform/connectors/artifact-repositories/connect-to-harness-container-image-registry-using-docker-connector" target="_blank" rel="noopener noreferrer">Connect to Harness Container Image Registry using a Docker connector</a> to configure it.
- **Prometheus endpoint**: A reachable Prometheus endpoint. If you do not have one, install <a href="https://prometheus.io/" target="_blank" rel="noopener noreferrer">Prometheus</a> on your Kubernetes cluster as described in the next section.

---

## Install Prometheus

Install Prometheus with Helm.

```bash
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts

helm repo update

helm upgrade --install prometheus prometheus-community/prometheus \
--namespace prometheus --create-namespace
```

Expose Prometheus via NodePort.

```bash
kubectl expose deployment -n prometheus prometheus-server --type=NodePort --name=prometheus-service
```

Browse to `node_public_ip:nodeport`.

```bash
#Node External IP
kubectl get nodes -o wide

#NodePort for prometheus-service
kubectl get svc -n prometheus
```

Next, validate that your application writes to a Prometheus endpoint, or use the sample application.

---

## How applications write to Prometheus

Prometheus is a <a href="https://prometheus.io/docs/concepts/data_model/" target="_blank" rel="noopener noreferrer">time series database</a> where your metrics are stored. Writing to Prometheus entails providing a key/value pair of the metric and value. Depending on the language your application uses, there are different Prometheus SDKs you can use to read and write metrics.

The <a href="https://github.com/harness-apps/cv-example-app" target="_blank" rel="noopener noreferrer">Spring Boot sample application</a> is a good example of the underpinnings needed to write to Prometheus. The <a href="https://github.com/harness-apps/cv-example-app/blob/main/pom.xml" target="_blank" rel="noopener noreferrer">pom.xml</a> contains the <a href="https://docs.micrometer.io/micrometer/reference/implementations/prometheus.html" target="_blank" rel="noopener noreferrer">Micrometer configuration</a> to get connection and auto-wire information on Prometheus. Then, in the <a href="https://github.com/harness-apps/cv-example-app/blob/main/src/main/java/io/harness/cv/example/app/GenerateStableMetrics.java" target="_blank" rel="noopener noreferrer">application code</a>, you can use the Java SDK to write to the Prometheus primitives. The sample application has two versions that toggle between a `stable` and `unstable` mode, which have separate images for deployment convenience. The `stable` and `unstable` versions have different classes that write varying metric values.

By installing the Prometheus Helm Chart into your Kubernetes cluster, you also get a good set of Kubernetes-centric metrics that are scraped and exported for your convenience.

---

## Verify a deployment with Harness

There are a few objects to line up in Harness, starting with the un-validated deployment itself. Go to the <a href="/docs/continuous-delivery/get-started/tutorials/kubernetes-container-deployments/manifest" target="_blank" rel="noopener noreferrer">Kubernetes Manifest tutorial</a> to deploy a manifest in depth. You then wire the Verify step into your pipeline and configure the Prometheus Query Language (PromQL) queries to validate the application.

<div style={{ textAlign: 'center' }}>
  <DocImage path={require('../static/cv-prom/cv-overview.png')} alt="Overview" title="Click to view full size image" />
</div>

Perform the following steps to set up the deployment:

1. Create a new Harness Kubernetes Deployment.
2. In the Service Configuration, add a Kubernetes manifest pointing to <a href="https://github.com/harness-apps/cv-example-app/blob/main/harness-cv-example-deployment.yaml" target="_blank" rel="noopener noreferrer">harness-cv-example-deployment.yaml</a>.
3. In the Service Configuration, add a Values YAML pointing to <a href="https://github.com/harness-apps/cv-example-app/blob/main/values.yaml" target="_blank" rel="noopener noreferrer">values.yaml</a>.
4. In the Service Configuration, add an Artifact pointing to `rlachhman/cv-example-app`.

<div style={{ textAlign: 'center' }}>
  <DocImage path={require('../static/cv-prom/manifests.png')} alt="Manifests" title="Click to view full size image" />
</div>

You can then pick your deployment strategy. For simplicity, this example uses a rolling deployment strategy. Once the deployment step is set up, add a Verify step to your pipeline, which is the Continuous Verification step.

---

## Configure Continuous Verification

The Continuous Verification configuration is represented by two concerns. The first is the Verify step, which defines when and where to run the verification. The second is the Monitored Service, which defines what to query and how to query it against your Health Source, in this case Prometheus. The Harness UI guides you through this setup.

Perform the following steps to add the Verify step:

1. Add the Verify step after your rolling deployment.
2. Set **Continuous Verification Type** to **Rolling Update**.
3. Set <a href="/docs/continuous-delivery/verify/cv-concepts/machine-learning#sensitivity" target="_blank" rel="noopener noreferrer">Sensitivity</a> to **High**.
4. Set **Duration** to **5 min**.
5. Leave the **Artifact Tag** as `<+serviceConfig.artifacts.primary.tag>`.

Next, configure the Health Source (<a href="/docs/service-reliability-management/monitored-service/create-monitored-service" target="_blank" rel="noopener noreferrer">Monitored Service</a>) for your application (for example, a <a href="/docs/continuous-delivery/overview#service" target="_blank" rel="noopener noreferrer">Harness Service</a>).

Perform the following steps to configure the Health Source:

1. When prompted, add your <a href="/docs/platform/connectors/monitoring-and-logging-systems/connect-to-monitoring-and-logging-systems#step-add-prometheus" target="_blank" rel="noopener noreferrer">Prometheus connection details</a>.
   1. If using NodePort, use `http://node_public_ip:nodeport`.
2. The sample application writes to the Prometheus metrics `CV_Counter_Example_total` and `CV_Gauge_Example`. You can query for the <a href="https://prometheus.io/docs/concepts/metric_types/#counter" target="_blank" rel="noopener noreferrer">Counter</a>.
3. Define the Health Source Configuration to have a metric called `Prometheus Counter`.
4. Query the Counter with PromQL:

   ```text
   max(
       CV_Counter_Example_total    {
      	 app="harness-cv-prom-example"
   })
   ```

5. Assign it to Continuous Verification.
6. Set **Risk Category** to **Performance/Response Time**.
7. Set **Deviation Compared to Baseline** to **Higher value is higher risk**.
8. Set the **Service Instance Identifier** to `app`.

<div style={{ textAlign: 'center' }}>
  <DocImage path={require('../static/cv-prom/healthsource.png')} alt="Health Source configuration" title="Click to view full size image" />
</div>

With the query configured, your Verify step has all of the necessary pieces.

<div style={{ textAlign: 'center' }}>
  <DocImage path={require('../static/cv-prom/verifystep.png')} alt="Verify Step" title="Click to view full size image" />
</div>

You are now ready to run the pipeline.

<div style={{ textAlign: 'center' }}>
  <DocImage path={require('../static/cv-prom/pipeline.png')} alt="Pipeline" title="Click to view full size image" />
</div>

---

## Run the example pipeline

Harness Continuous Verification works off the concept of baselines and the ability to perform a before-and-after analysis of what has been deployed. Deploying the `stable` tag of the sample application for the first time generates a pass.

<div style={{ textAlign: 'center' }}>
  <DocImage path={require('../static/cv-prom/execution.png')} alt="Execution" title="Click to view full size image" />
</div>

Select **View Details** to see what values were used for the comparisons.

<div style={{ textAlign: 'center' }}>
  <DocImage path={require('../static/cv-prom/details.png')} alt="Details" title="Click to view full size image" />
</div>

Since Harness Continuous Verification uses AI/ML to help determine regressions, you can also wire in <a href="/docs/continuous-delivery/verify/cv-concepts/machine-learning/#plain-threshold-based-verification" target="_blank" rel="noopener noreferrer">static values</a> that are known failures, such as long response times or deviations from a value. This example is just the start of what is possible with Continuous Verification.

---

## Next steps

You have verified a Kubernetes deployment with Prometheus and Harness CV. Continue your learning journey with the following:

- <a href="/docs/platform/pipelines/failure-handling/define-a-failure-strategy-on-stages-and-steps" target="_blank" rel="noopener noreferrer">Failure strategies</a>: Enact automatic or manual failure strategies in your pipeline.
- <a href="/docs/continuous-delivery/kb-articles/articles/cv-multi-service" target="_blank" rel="noopener noreferrer">Multi Service Deployments</a>: Apply Continuous Verification to more complex deployments.
- <a href="https://github.com/harness-apps/cv-example-app#modifying-application" target="_blank" rel="noopener noreferrer">Sample application</a>: Modify or fork the sample application to build more scenarios.
