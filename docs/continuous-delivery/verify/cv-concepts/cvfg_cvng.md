---
title: CVFG vs CVNG differences
sidebar_position: 4
description: Comparing CV FirstGen vs CV NextGen. 
slug: /continuous-delivery/verify/cv-concepts/cvfg-cvng
---

# CVFG vs CVNG Differences

Continuous Verification when comparing Harness FirstGen (FG) with Harness NextGen (NG) have implementation differences. This document will go through those differences and address mappings between CVFG and CVNG. 

## Continuous Verification NextGen Approach

In order to make Continuous Verification (CV) more deterministic, the system of record for all data related to deployments is now your monitoring/logging/observability solutions. Compared to CVFG, CVNG exposes the queries that are used for greater flexibility and determinability. Based on your defined analysis time, CVNG will query your monitoring/logging/observability solution(s) for user specified queries and data. 

Continuous Verification along with most of the Harness Platform has greater flexibility as a Harness Step on where you can place CV in your pipeline and the ability to access skip conditions, failure strategies, and other facets of a Harness Step/Stage.

## Key Differences between CVFG and CVNG
There are four major differences between the CVFG and CVNG. 

1. Introduction of Monitored Service Concept in CVNG: The “when” and “where” to verify concept is still configured as part of the Pipeline Verify Step. The “what” and “how” to query against your Health Source is now in a Monitored Service Configuration. Monitored Services can be templated and also leverage run-time or expressions. 
2. In one Verify Step in CVNG, you can have multiple Health Sources (data providers) together. Compared to FG where this would require separate steps. For example validating against Prometheus and Datadog is achievable in a singular Verify Step. 
3. The onus of what has been deployed is now placed on the monitoring/logging/observability solution in CVNG in the form of a Service Instance Identifier (SII). This data previously has come from the Continuous Delivery Pipeline. The SII concept allows querying for changes, for example with a Kubernetes deployment, having an SII as `pod` can allow CVNG to focus in on what has been deployed based on the analysis window. 
4. CVNG has more verification types now supporting Rolling Deployments and Load Tests. In CVFG, this was limited to “Canary” and “Previous”

## Field Mappings Between CVFG and CVNG
Comparing CVFG and CVNG Field Mappings.

| **CVFG**            | **CVNG**                    |
|---------------------|-----------------------------|
| Duration            | Duration, 1:1 Map           |
| Connectors          | 1:1 Map                     |
| Tolerance           | Sensitivity                 |
| Fail on Empty Nodes | Fail on No Data             |
| Host Config         | Service Instance Identifier |

