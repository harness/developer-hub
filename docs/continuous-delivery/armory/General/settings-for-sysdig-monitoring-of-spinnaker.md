---
title: Settings for SysDig Monitoring of Spinnaker
---

## Introduction
When using SysDig, which is using Prometheus under the hood, for monitoring of Armory Spinnaker, there are a number of settings that need to be set to inform the SysDig agent how to communicate with the metrics endpoints of the services.

## Prerequisites
N/A

## Instructions
After enabling Prometheus type monitoring (metrics stores), add these annotations to **each service** in the **service-settings** section/files:
prometheus.io/scrape: 'true'
prometheus.io/path: '/prometheus_metrics'
prometheus.io/port: 8008
These annotations should be applied to the pod annotations value in the service-settings for each service to be monitored per [https://spinnaker.io/reference/halyard/custom/#podannotations-podlabels-and-servicelabels](https://spinnaker.io/reference/halyard/custom/#podannotations-podlabels-and-servicelabels)This would result in a **service-settings** section/file similar to the following:
kubernetes:
  podAnnotations:
    prometheus.io/scrape: 'true'
    prometheus.io/path: '/prometheus_metrics'
    prometheus.io/port: 8008

