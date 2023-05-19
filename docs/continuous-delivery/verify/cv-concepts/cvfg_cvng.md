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
* Shifting data R\responsibility to monitoring/logging/observability solution: CVNG places the responsibility of tracking deployed components onto the monitoring/logging/observability solution. This is done through Service Instance Identifier (SII) concept, which replaces the Continuous Delivery pipeline as the source of deployment data. The SII enables querying for changes, focusing on specific deployed elements within the analysis window, such as using the SII "pod" for Kubernetes deployments.
* Expanded verification types: CVNG introduces additional verification types, including support for rolling deployments and load tests. In CVFG, verification was limited to "canary" and "previous" deployment scenarios.

## CVFG and CVNG Field Mappings
Comparing CVFG and CVNG Field Mappings.

| **CVFG**            | **CVNG**                    |
|---------------------|-----------------------------|
| Duration            | Duration, 1:1 Map           |
| Connectors          | 1:1 Map                     |
| Tolerance           | Sensitivity                 |
| Fail on Empty Nodes | Fail on No Data             |
| Host Config         | Service Instance Identifier |

