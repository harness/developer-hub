---
sidebar_position: 1
---

# Introduction to SLO Management

## Background on Service Level Objectives

In technology, the adage that you can not improve what you can’t measure is very true. Indicators and measurements of how well a system is performing can be represented by one of the Service Level (SLx) commitments. There is a trio of metrics, SLAs, SLOs, and SLIs, that paint a picture of the agreement made vs the objectives and actuals to meet the agreement. Focusing on the SLO or Service Level objectives, those are the goals to meet in your system. 

Service Level Objectives are goals that need to be met in order to meet Service Level Agreements [SLAs]. Looking at Tom Wilkie’s [RED Method](https://www.weave.works/blog/the-red-method-key-metrics-for-microservices-architecture/) can help you come up with good metrics for SLOs: requests, errors, and duration. Google’s [Four Golden Signals](https://landing.google.com/sre/sre-book/chapters/monitoring-distributed-systems/) are also great metrics to have as SLOs, but also includes saturation.

For example, there might be an SLA defined by the business as “we require 99% uptime”. The SLO to make that happen would be “we need to reply in 1000 ms or less 99% of the time” to meet that agreement. 

## Managing and Measuring Your SLOs
Drawing a conclusion can always be tricky especially if data is coming from different sources and services. If you had one and only one service in your organization, the amount of system and business knowledge about this one service would be easy to disseminate. Though that is not the case for any organization as the number of services increase and domain expertise does not stay within a singular individual. 

A myth about SLOs is that they are static in nature. As technology, capabilities, and features change, SLOs need to adapt with them. In an age of dial up internet, the example SLO of “we need to reply in 1000ms or less 99% of the time” would be impossible. As cloud infrastructure and internet speeds increased over the decades, that SLO seems very possible. 

Measuring your SLOs track against two items; reliability targets and error budgets. 

## Getting Started with SLO Management 
Harness provides a module called Service Reliability Management to help with your SLO Management, if you have not already, [sign up for a Harness SRM Account](https://app.harness.io/auth/#/signup/?module=srm). Once signed up, the next step to on-ramp you to the Harness Platform is to install a Harness Delegate. 

![First SLO Overview](static/first-slo-tutorial/slo_overview.png)