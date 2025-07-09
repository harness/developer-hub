---
title: Quickstart
description: Learn how to get started with Release Monitoring.
sidebar_position: 20
---

See the following quickstart guides that take advantage of FME SDK Suite (or RUM agents) and the default events they track in order to quickly get you up and running with Release Monitoring.  If you don’t want to or can’t use them, you can always send events to Harness FME other ways — via [SDK’s `track` methods, API calls, or integrations](/docs/feature-management-experimentation/release-monitoring/events/).

## Rollout of a new feature on the Web

When rolling out a new feature on your site, you’ll want to track how that affects the performance metrics on your site. Google researchers have provided a package that they call [web vitals](https://github.com/GoogleChrome/web-vitals) that measures what are considered to be the most important and vital metrics to measure performance as seen by users browsing or visiting a website.

FME Browser SDK Suite includes the web vitals package to allow you to track and monitor these metrics. You can also track [additional events](/docs/feature-management-experimentation/sdks-and-infrastructure/client-side-agents/browser-rum-agent#custom-events) you are interested in as well.

We recommend using the npm package, which allows you to customize the events tracked and register additional collectors. 

If you are not going to be evaluating flags in the browser you can use the RUM agent for the browser independently. 

To set this up, follow these steps:

1. Install the FME [Browser SDK Suite](/docs/feature-management-experimentation/sdks-and-infrastructure/client-side-suites/browser-suite#1-import-the-suite-into-your-project) (or [Browser RUM agent](/docs/feature-management-experimentation/sdks-and-infrastructure/client-side-agents/browser-rum-agent#1-import-the-agent-into-your-project))

   1. Set the FME SDK Key
   2. Set the user IDs and trafficTypes
   3. Register the appropriate collectors for:
      
      * Web vitals
      * Time to interactive
      * Route changes (if you have a Single Page Application)
   
1. Put your new feature behind a flag with a percentage based rollout

    1. Set up [Key Metrics](/docs/feature-management-experimentation/experimentation/setup/metric-selection/key-metrics)
      
1. Once the events start flowing from the RUM agent, metrics will automatically be generated according to this list: [Automatic Metric Creation for Browser](/docs/feature-management-experimentation/sdks-and-infrastructure/client-side-agents/browser-rum-agent#automatic-metric-creation)

    1. Configure [alerting](/docs/feature-management-experimentation/release-monitoring/alerts/alert-policies/) for these metrics
 

And that’s it. You are now getting Harness FME’s powerful statistical computation engine watching your back to ensure that you are alerted to any degradation of the automatic metric across any of your percentage based rollouts of features. 

## Rollout of a new feature on Android or iOS

On mobile devices, FME SDK Suite can be used to track crashes, errors, and unresponsive moments of your application, among other things. Of course you can also track custom events. 

You will need to install the FME SDK Suite. If not doing flag evaluations in the mobile app, you can also just install the FME RUM agent instead.

To set this up, follow these steps:

1. Install the FME SDK Suite
   
   1. Set the FME SDK Key
   1. Set the user IDs and trafficTypes
   1. Additionally, you may want to set a custom property to note if the platform is Android or iOS to allow for dimensional drilldowns by platform

1. Put your new feature behind a flag with a percentage based rollout
   
   1. Set up [Key Metrics](/docs/feature-management-experimentation/experimentation/setup/metric-selection/key-metrics)

1. Once the events start flowing from the RUM agent, metrics will automatically be generated according to this list: [Automatic Metric Creation for Android](/docs/feature-management-experimentation/sdks-and-infrastructure/client-side-agents/android-rum-agent#automatic-metric-creation) and [Automatic Metric Creation for iOS](/docs/feature-management-experimentation/sdks-and-infrastructure/client-side-agents/ios-rum-agent#automatic-metric-creation) 
   
   1. Configure [alerting](/docs/feature-management-experimentation/release-monitoring/alerts/alert-policies/) for these metrics

And that’s it. You are now getting Harness FME’s powerful statistical computation engine watching your back to ensure that you are alerted to any degradation of the automatic metric across any of your percentage based rollouts of features. 

## Rollout of a new feature on a Server

While the FME SDK Suites today only exist for client-side code, this does not mean that you cannot get value from them if you are rolling out server-side code. Features that are focused on server-side components of your technology stack still can and likely will affect the experience of your users. Installing the Suite or RUM agents in your app will allow you to keep track of these and, in concert with Harness FME’s alerting mechanisms, will alert you if any metrics show an unacceptable degradation of user experience, allowing you to rollback or kill the feature within Harness FME. 

To do this requires a few components to think about. First, you will need to ensure that you have the same ID values available on the frontend and available to the server-side FME SDK that is doing the rollout of your server-side feature. This allows Harness FME’s statistics engine to do the join and comparison. Second, you will need to install the appropriate Suite or agent in your client-side code and ensure that it is capturing events with the proper ID. 

Follow the Steps in the [Rollout of a new feature on the Web](#rollout-of-new-feature-on-the-web) or [Rollout of a new feature on Android or iOS](#rollout-of-a-new-feature-on-android-or-ios) to set up the agents and get protected from features causing downtime or degradation with Release Monitoring.