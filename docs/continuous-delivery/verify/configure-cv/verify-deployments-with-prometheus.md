---
title: Prometheus
description: Verify deployments with Prometheus.
sidebar_position: 10
helpdocs_topic_id: e9z7944qhw
helpdocs_category_id: 9mefqceij0
helpdocs_is_private: false
helpdocs_is_published: true
---

# Harness CV with Prometheus

This topic describes how to set up Harness Continuous Verification (CV) with Prometheus as a health source.

Before you begin

- Prometheus queries must include filters (enclosed in curly braces) to specify the nodes or data points you want to sample.

- Prometheus queries must produce a single value (scalar). To learn more about Prometheus queries, go to [QUERYING PROMETHEUS](https://prometheus.io/docs/prometheus/latest/querying/basics/).

## Prerequisite

[Add Prometheus as a verification provider](/docs/platform/Connectors/Monitoring-and-Logging-Systems/connect-to-monitoring-and-logging-systems)


## Add a Verify step to your CD pipeline

import Verifystep from '/docs/continuous-delivery/verify/shared/verifystep-add.md'

<Verifystep />


## Define name and timeout information

import Name from '/docs/continuous-delivery/verify/shared/name-timeout-information.md'

<Name />


## Select a continuous verification type, sensitivity, and duration

import Type from '/docs/continuous-delivery/verify/shared/type-sensitivity-duration.md'

<Type />


## Create a monitored service

import Monitored from '/docs/continuous-delivery/verify/shared/monitored-service.md'

<Monitored />


## Add a health source

A health source is an APM or logging tool that monitors and aggregates data in your deployment environment.


### Define a health source

To add a health source:

1. In the **Health Sources** section of the Verify screen, select **+ Add New Health Source**.
   
   The Add New Health Source dialog appears.

2. In the **Define Health Source** tab, do the following:
      
   1. In the **Define Health Source** section, select **Prometheus** as the health source type.
      
   2. In the **Health Source Name** field, enter a name for the health source.
      
   3. In the **Connect Health Source** section, select **Select Connector**. 
   
      The Create or Select an Existing Connector dialog appears.
      
   4. Select a connector and then select **Apply Selected**.  
         The selected connector appears in the **Select Connector** dropdown. To learn how to add a new connector, go to [Add Prometheus](/docs/platform/Connectors/Monitoring-and-Logging-Systems/connect-to-monitoring-and-logging-systems#add-prometheus).
         
         The **apm** option is selected by default in the **Feature** field.

3. Select **Next**.
   
   The **Configuration** tab appears.


### Define metric configuration settings

import Metric from '/docs/continuous-delivery/verify/shared/metric-configuration.md'

<Metric />


## Run the pipeline

import Run from '/docs/continuous-delivery/verify/shared/run-pipeline.md'

<Run />


## View results

import View from '/docs/continuous-delivery/verify/shared/view-results.md'

<View />


## Console view

import Console from '/docs/continuous-delivery/verify/shared/console-view.md'

<Console />

