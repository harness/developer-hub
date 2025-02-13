---
title: Statistical significance
sidebar_label: Statistical significance
helpdocs_is_private: false
helpdocs_is_published: true
sidebar_position: 4
---

import Significance from "@site/docs/feature-management-experimentation/60-experimentation/docs/key-concepts-for-experimentation/statistical-significance.md";

<Significance />

## Alert Policy Statistics 

To enable the ability to detect degradations of a metric within the first 30 minutes of a new version of a split, some statistical adjustments have been applied during this monitoring window.

* A one sided t-test will be used during this monitoring window, based on the desired impact in the metric definition to derive the undesired impact.  
* During the monitoring window we will consider the null hypothesis to be, the difference between the two treatments is equal to or less than the degradation threshold configured by the user. This threshold is a relative percentage of the metric and will be measured against the alert baseline treatment of a particular split. 
* Comparisons of the the p-value will be against a hard-coded list of p-value thresholds generated from your account-wide alpha-level. 
* To avoid an increased false positive rate due to multiple testing, we will adjust your account's set alpha-level by alpha divided by the number of calculations ran within the first 30 minutes. 
* Calculations of error margins on the impact will assume symmetrical uncertainty.
