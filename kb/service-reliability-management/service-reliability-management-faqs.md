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

### For a new metric how we will compare only against custom thresholds and not old trend.

For a new metric, we can only check for fixed value thresholds, not percentage deviation thresholds

#### Why is it that I have to specify a start and end time when creating the health source? 
Start and end time is place holder so that while making actual query this will be updated and required to refer in either query path(in case of get request) or body(in case of post)

#### Getting Token is missing required scope while using Dynatrace as health source
Check if api token used is having Read metrics and Read entities scope

####  No Service is getting listed while using Dynatrace health source
Only services with marked Key Requests are shown, so could you please check and confirm if service which you are expecting is having any metric marked as key request.

#### Marking step as success manually for Prometheus CV  takes sometime time to reflect
Marking a CV step as success manually will not change the status and you can expect a delay of (10 sec - 1 min) as this needs to cancel all the data collection/ learning engine task and that takes some time to reflect

#### How to verify deployment for  Non APM metric(or OpenTelemetry app) from NewRelic Health Source Connector
You can create a Custom metric health source and use the NewRelic Health Source Connector and you can use NRQL query to fetch the metric data


#### Primary/Canary node is not getting identified while doing verification 
Node is identified in case metrics were reported by your verification provider used here (AppD, Prometheus, etc.) for the duration of the analysis window, so you can check the API call being made and see if nodes were reporting data or not during that time. You can also navigate to the provider dashboard and verify directly.
