---
title: CVFG vs CVNG differences
sidebar_position: 4
description: Comparing CV FirstGen vs CV NextGen. 
slug: /continuous-delivery/verify/cv-concepts/cvfg-cvng
---

# CVFG and CVNG: Key Differences

This topic lists the differences between Continuous Verification FirstGen (CVFG) and Continuous Verification NextGen (CVNG). It also provides the address mappings between them.

Harness CVNG introduces a more reliable and customizable approach to Continuous Verification (CV). It relies on your monitoring, logging, and observability solutions as the primary data source for deployment-related information.

Compared to CVFG, CVNG offers greater flexibility and control over the queries used. You can specify the queries to run and retrieve data from your monitoring, logging, and observability solutions based on the defined analysis time. This ensures precise and targeted verification of your deployments.

Harness Platform provides flexible CV capabilities. You can easily add CV as a step in your pipeline and access skip conditions, failure strategies, and other features of a Harness Step/Stage. This level of control allows seamless integration and optimized verification.

## Key differences

* Introduction of “Monitored Service” concept: In CVNG, the verification concept of "when" and "where" to verify remains configured as part of the Pipeline Verify step. However, the "what" and "how" to query against your health source is defined in a Monitored Service configuration. Monitored Services can be templated and utilize run-time or expressions.
* Multiple health sources in a single Verify step: In CVNG, you can have multiple health sources (data providers) within a single Verify step. This allows validating against multiple sources such as Prometheus and Datadog in a unified manner, eliminating the need for separate steps as in CVFG.
* Shifting data responsibility to monitoring/logging/observability solution: CVNG places the responsibility of tracking deployed components onto the monitoring/logging/observability solution. This is done through [Service Instance Identifier (SII)](#service-instance-identifier-sii) concept, which replaces the Continuous Delivery pipeline as the source of deployment data. The SII enables querying for changes, focusing on specific deployed elements within the analysis window, such as using the SII "pod" for Kubernetes deployments.
* Expanded verification types: CVNG introduces additional verification types, including support for rolling deployments and load tests. In CVFG, verification was limited to "canary" and "previous" deployment scenarios.

## CVFG and CVNG Field Mappings

| **CVFG**            | **CVNG**                    |
|---------------------|-----------------------------|
| Duration            | Duration, 1:1 Map           |
| Connectors          | 1:1 Map                     |
| Tolerance           | Sensitivity                 |
| Fail on Empty Nodes | Fail on No Data             |
| Host Config         | Service Instance Identifier |

## Service Instance Identifier (SII)

The Service Instance Identifier (SII) is used by Harness Continuous Verification NextGen to identify [new or changed nodes](https://developer.harness.io/docs/continuous-delivery/verify/cv-results/interpret-metric-results#nodes-section) during a deployment. The SII can be considered a filter to help identify metrics on what has been deployed. Harness CVNG will then calculate what has been deployed based on the observed metrics leveraging the SII. Depending on your deployment type, for example a canary deployment, this will help determine which nodes are stable and which nodes are the canary in the current canary phase for analysis. 

### Example Order of Operations using SII
In this example, setting up CVNG to have a 5 minute analysis window on a [Prometheus Health Source](https://developer.harness.io/docs/continuous-delivery/verify/configure-cv/verify-deployments-with-prometheus) with a rolling deployment to a Kubernetes endpoint. 

PromQL:
```
max(
    CV_Counter_Example_total    {
   	 app="harness-cv-prom-example"
})
```

SII: `pod`

#### Query Order by CVNG

1. CVNG will query against the SII, in this case `pod`, to list all possible Pods given the time range. 
	1. /api/v1/label/**pod**/values?start=1685548800&end=1685549100&match[]={app="harness-cv-prom-example"}
2. CVNG will retrieve the PromQL metric values based on iterating over the returned SII results for each Pod.
	1. api/v1/label/**app**/values?start=1685548800&end=1685549100&match[]={app="harness-cv-prom-example"}

Leveraging the SII, CVNG determines the pods that were there before and after by querying the monitoring solution. If this was a  If pods were there before and after, those are stable. If pods are there after but not before, those are the canary pods. 
Node determination is now made. 

![CV Nodes](static/cvfg_cvng/nodes.png)	

### SII Configuration Tips

The goal of the SII is to determine from a monitoring system what has been deployed. Different monitoring systems handle this differently and is dependent on how the monitoring system has been configured and labeling applied to resources being deployed. In the above [Prometheus order of operations](#example-order-of-operations-using-sii), other monitoring solutions might not require iteration over the SII, but the end effect is the same, gathering what was available before and after deployment for node determination. 

#### Potential SII’s

| **SII**       | **Use**                                                                             |
|---------------|-------------------------------------------------------------------------------------|
| pod/podname   | Kubernetes                                                                          |
| containername | ECS                                                                                 |
| version       | If versions are tagged in resources for deployment, can be a good SII to filter on. |

