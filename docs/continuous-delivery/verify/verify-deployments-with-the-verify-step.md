---
title: Continuous Verification (CV)
description: Get an overview of Harness CV.
sidebar_position: 20
helpdocs_topic_id: 3xhqq9xllp
helpdocs_category_id: 9mefqceij0
helpdocs_is_private: false
helpdocs_is_published: true
---

# Harness Continuous Verification (CV) overview

Harness CV is a critical step in the deployment pipeline that validates deployments. Harness CV integrates with APMs and logging tools to verify that the deployment is running safely and efficiently. Harness CV applies machine learning algorithms to every deployment for identifying normal behavior. This allows Harness to identify and flag anomalies in future deployments. During the Verify step, Harness CV automatically triggers a rollback if anomalies are found.

This topic provides an overview of the prerequisites and steps involved in setting up Harness CV.

:::info note
If you are already familiar with setting up Harness CV and the verification step and are looking for instructions on configuring the verification step for a specific health source, then go to [Configure CV](/docs/category/configure-cv).
:::


## Before You Begin

* [Learn Harness' Key Concepts](../../getting-started/learn-harness-key-concepts.md).
* [Learn about Kubernetes deployments](../deploy-srv-diff-platforms/kubernetes/kubernetes-cd-quickstart.md).
* [Refer to the supported platforms and technologies](../../getting-started/supported-platforms-and-technologies.md#continuous-verification)


## Deployment strategies for CV

You can set up Harness CV by adding a Verify step to a pipeline. The following are deployment strategies that you can apply while configuring CV.


###  Continuous verification type
   
- **Auto**: Harness automatically selects the best continuous verification type based on the deployment strategy.
    
- **Rolling Update**: Rolling deployment is a deployment technique that gradually replaces old versions of a service with a new version by replacing the infrastructure on which the service runs. Rolling updates are useful in situations where a sudden changeover might cause downtime or errors.
    
- **Canary**: Canary deployment involves a two-phased deployment. In phase one, new pods and instances with the new service version are added to a single environment. In phase two, a rolling update is performed in the same environment. Canary deployment helps to detect issues with the new deployment before fully deploying it.
    
- **Blue Green**: Blue-green deployment is a technique used to deploy services to a production environment by gradually shifting user traffic from an old version to a new one. The previous version is referred to as the blue environment, while the new version is known as the green environment. Upon completion of the transfer, the blue environment remains on standby in case of a need for rollback, or can be removed from production and updated to serve as the template for future updates.
    
- **Load Test**: Load testing is a strategy used in lower-level environments, such as quality assurance, where a consistent load is absent, and deployment validation is typically accomplished through the execution of load-generating scripts. This is useful to ensure that the application can handle the expected load and validate that the deployment is working as expected before releasing it to the production environment.


### Sensitivity

You can set the sensitivity option as **High**, **Medium**, or **Low**. When the sensitivity is set to **High**, any anomaly, no matter how small, will be treated as a verification failure. This ensures that even the slightest issue is detected and addressed before releasing the deployment to production.


### Duration

Harness uses the data points within this duration for analysis. For instance, if you select 10 minutes, Harness analyzes the first 10 minutes of your log or APM data. Harness recommends you choose 10 minutes for logging providers and 15 minutes for APM and infrastructure providers. This helps you thoroughly analyze and detect issues before releasing the deployment to production.


### Artifact tag

Use the Harness expression `<+serviceConfig.artifacts.primary.tag>` to reference this primary artifact. To learn about artifact expression, go to [Artifact](https://developer.harness.io/docs/platform/variables-and-expressions/harness-variables/#artifact).


### Fail on no analysis. 
   
You can configure the pipeline to fail if there is no data from the health source. This ensures that the deployment fails when there is no data for Harness to analyze.


### Health source

Harness CV monitors health trend deviations using logs and metrics obtained from the health source, such as APM and logging tools, via a monitored service. A health source is an APM or logging tool that monitors and aggregates data in your deployment environment. You can add multiple health sources.


## Next steps

- To start using Harness CV, go to [Configure CV](/docs/category/configure-cv).
- To understand more about Harness CV, go to the [knowledge base](/kb/continuous-delivery).



