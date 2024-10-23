---
title: Ingesting Metrics from Observability Plugin to Datadog
---

## Introduction
With Spinnaker's changes in 2.20.x and above, the support for the existing monitoring sidecar for Spinnaker has decreased.  Instead, Armory recommends installing the Observability Plugin in the environment to pull metrics directly from Spinnaker microservices.
By negating the need for a sidecar, this change increases performance, reduces system load, and provides additional features such as metric filtering. 
While previous to v1.4.1, the Observability Plugin only natively supported NewRelic, and Prometheus metric formats, this has changed in v1.4.1.
As of v1.4.1, customers can now connect Datadog directly to the Observability Plugin without needing to route data through Prometheus for ingestion.

## Prerequisites
Admins should install the Observability Plugin >= v1.4.1 along with Datadog.[https://docs.armory.io/armory-enterprise/armory-admin/observe/observability-configure/](https://docs.armory.io/armory-enterprise/armory-admin/observe/observability-configure/)

## Instructions
Administrators can now ingest metric information directly into Datadog.  They can set up the observability plugin per the example shown in the Observability PlugIn ```read.me``` file.
[https://github.com/armory-plugins/armory-observability-plugin#condensed-datadog-example](https://github.com/armory-plugins/armory-observability-plugin#condensed-datadog-example)

