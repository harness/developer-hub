---
title: Service Reliability Management (SRM) FAQs
description: Frequently asked questions about Harness Service Reliability Management (SRM).
# sidebar_position: 2
---
# FAQ

### Please explain query type : service based vs host based.

Service based query will return the metrics for the service without any grouping on the basis of host/pod name. 
Host based query will return the metrics for the service with groups on the basis of host/pod name. 
Please note that for all the health sources, we take the service based query from the user and convert it to host based for CV if required. 
For Custom Health source, we take both from the user as per the use-case.

### Calculation on how many total comparisons will be required on the order of control, canary and queries.

This can be calculated as: (no of queries) * (canary node * primary node)

### What if test pod/ control pod gets restarted/deleted while canary verification is on and in progress

If test pod gets restarted, it would emit the same normal metrics or some new error metrics to the health-source. We will collect these and analysis will be done accordingly. 
If it shuts down and a different pod is spun up, it will again be considered as canary and analysed for the remainder of the verification duration. 
If a control node is restarted, we expect it to emit some metrics - either error or normal metrics. In both the cases, since its a control host, those metrics will be treated as control data. 
If a control pod shuts down and a new pod is spun up in its place, the new pod will be considered as canary. But it should not affect the verification since its on the same application version which is deployed.

### Is it harness always takes minimally deviated control pod ? if yes , why is the logic based on "worst of best"? and what will be shown on UI

Yes. The logic is that the version running in the production is already good and the one which is being deployed should be similar to it. If the canary pod metrics are too different from primary pod A but close to primary pod B, it doesn't mean the canary pod is not working properly. Even then there are thresholds which can be applied and finally ML analysis

### Looks like with each datapoint the control pod doesn't change, does that mean the minimally deviated pod is chosen with first data point comparison? if yes why is it so?

It can change, with each minute we analyse data from 1st minute to nth minute and figure out what is the minimally deviated pod for each test pod.

### For a new metric how we will compare only agains custom thresholds and not old trend.

For a new metric, we can only check for fixed value thresholds, not percentage deviation thresholds
