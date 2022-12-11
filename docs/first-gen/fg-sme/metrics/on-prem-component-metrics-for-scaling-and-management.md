---
title: Harness Self-Managed Enterprise Edition Component Metrics for Scaling and Management
description: During periods of high volume, you might want to autoscale Harness Self-Managed Enterprise Edition components up, and during periods of low volume, autoscale down. To do this with confidence, you wil…
# sidebar_position: 2
helpdocs_topic_id: c66o4l0l9r
helpdocs_category_id: 5sdx6n8yqa
helpdocs_is_private: false
helpdocs_is_published: true
---

During periods of high volume, you might want to autoscale Harness Self-Managed Enterprise Edition components up, and during periods of low volume, autoscale down.

To do this with confidence, you will want to know the performance range for Harness Self-Managed Enterprise Edition components.

This topic provides guidance on scaling Harness Self-Managed Enterprise Edition components such as the Learning Engine (LE) and Timescale DB.

### Summary

|  |  |  |
| --- | --- | --- |
| **Test** | **Configuration** | **Result** |
| Workflow Setup - Timeseries (APM) | 1 instance - 4CPU and 2GB Memory | 20 parallel workflow executions can run without delay |
| Workflow Setup - Log Analysis | 1 instance - 4CPU and 2GB Memory | 6 parallel workflow executions can run without delay |
| 24/7 Service Guard Setup - Timeseries (APM) | 1 instance - 4CPU and 2GB Memory | 30 24/7 Service Guard configs can be supported |
| 24/7 Service Guard Setup - Log Analysis | 1 instance - 4CPU and 2GB Memory | 20 24/7 Service Guard configs can be supported |
| Mixed Setup and Workflows | 1 instance - 4CPU and 2GB Memory | The following can run successfully with out any delay:* 3 APM Workflow
* 4 Log analysis Workflow
* 3 APM 24/7 Service Guard
* 4 Log analysis 24/7 Service Guard
 |

### Test Results

#### Scenario 1

* **Configuration**: 1 LE instance with 8CPU and 2GB Memory
* **Workflow setup:** 8 time series 7 Log analysis running in parallel every 20 minutes
* **24/7** **Service Guard Setup**: 8 time series 7 Log analysis

**Result**

* **Workflow Execution:** No Delay
* **24/7 Service Guard execution:** Delay > 1 hr
* **No of LE analysis task in Queue:** > 500
* **Over All status:** Failed

#### Scenario 2

* **Configuration**: 1 LE instance with 8CPU and 2GB Memory
* **Workflow setup** : 4 time series 5 Log analysis running in parallel every 20 minutes
* **24/7** **Service Guard Setup**: 4 time series 5 Log analysis

**Result**

* **Workflow Execution:** No Delay
* **24/7 Service Guard execution:** Delay > 1 hr
* **No of LE analysis task in Queue:** > 300
* **Over All status:** Failed

#### Scenario 3

* **Configuration**: 1 LE instance with 8CPU and 2GB Memory
* **Workflow setup**: 3 time series 4 Log analysis running in parallel every 20 minutes
* **24/7** **Service Guard Setup**: 3 time series 4 Log analysis

**Result**

* **Workflow Execution:** No Delay
* **24/7 Service Guard execution:** No Delay
* **No of LE analysis task in Queue:** < 20
* **Over All status:** Passed

#### Scenario 4

* **Configuration**: 1 LE instance with 4 CPU and 2GB Memory
* **Workflow setup**: 3 time series 4 Log analysis running in parallel every 20 minutes
* **24/7** **Service Guard Setup**: 3 time series 4 Log analysis

**Result**

* **Workflow Execution:** No Delay
* **24/7 Service Guard execution:** No Delay
* **No of LE analysis task in Queue:** < 20
* **Over All status:** Passed

#### Scenario 5 - Horizontal Scaling

* **Configuration**: 1 LE instance with 4 CPU and 2GB Memory
* **Workflow setup**: 6 time series 8 Log analysis running in parallel every 20 minutes
* **24/7** **Service Guard Setup**: 6 time series 8 Log analysis

**Result**

* **Workflow Execution:** No Delay
* **24/7 Service Guard execution:** No Delay
* **No of LE analysis task in Queue:** < 20
* **Over All status:** Passed

