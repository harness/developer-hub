---
description: KB - New Metrics Available After Deployment with CV
title: CV with New Deployment Time Metrics 
---

# Verifying New Deployment Metrics with CV

### Problem Statement

In Canary deployment strategy, the canary pod is compared against the primary pod(s) to verify the code changes. This works well if the metrics which are being used for comparison are present in both the primary and canary pods. However if the canary pod is introducing a new metric, it can also be verified using the Verify step. 

## Solution

### Without Fail On No Analysis

#### Default behaviour - Verification passes (without fail fast threshold breach).

In the case where a metric is only being emitted by the canary pod, there will be no pre-deployment pods for that metric, and all the post-deployment pods will be canary pods. In this case, the Verification system will recognise only the Canary pods and no Primary pods. The Canary pod data will be collected (test-data) but since there is no Primary pod data (control-data), it will not be analysed and the overall analysis result for that metric will be No Analysis. By default, the verification will pass for this metric.

<docimage path={require('../static/cv-new-metric-default.png')} />

#### Using Absolute Fail-Fast thresholds - Verification can fail.

To ensure the canary pod is performing correctly, Absolute Fail-Fast thresholds can be configured for that metric, which will fail the verification if the threshold is breached, even in the absence of data from primary nodes.


<docimage path={require('../static/cv-new-metric-absolute.png')} />

### With Fail On No Analysis

If Fail On No Analysis is enabled in the original verify step, the verification will fail even if no threshold has been breached. The new metric should be verified using a separate verify step (can be serial or parallel to the original verify step) in which Fail On No Analysis is disabled.

<docimage path={require('../static/cv-new-metric-split.png')} />