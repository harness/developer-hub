---
title: "Instant Feature Impact Detection: Quickstart Guide"
sidebar_label: "Instant Feature Impact Detection: Quickstart Guide"
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/26526728778381-Instant-Feature-Impact-Detection-Quickstart-Guide </button>
</p>

See the following below quickstart guides that take advantage of Split Suite (or RUM agents) and the default events they track in order to quickly get you up and running with IFID.  If you don’t want to or can’t use them, you can always send events to Split other ways - via SDK’s track methods, API calls, or integrations as documented [here](https://help.split.io/hc/en-us/articles/360020585772-Events). 

## Rollout of new feature on the Web

When rolling out a new feature on your site, you’ll want to track how that affects the performance metrics on your site. Google researchers have provided a package that they call [web-vitals](https://github.com/GoogleChrome/web-vitals) that measures what are considered to be the most important and vital metrics to measure performance as seen by users browsing or visiting a website. 

Split’s Browser Suite includes the web vitals package to allow you to track and monitor these metrics. You can also track additional [custom events](https://help.split.io/hc/en-us/articles/360030898431-Browser-RUM-agent#custom-events).

Split recommends using the npm package, which allows you to customize the events tracked and register additional collectors. 

If you are not going to be evaluating flags in the browser you can use the [RUM agent](https://help.split.io/hc/en-us/articles/360030898431-Browser-RUM-agent#1-import-the-agent-into-your-project) for the browser independently. 

To set this up, follow these steps:

1. Install the Browser Split Suite (or Browser RUM agent)
  1. Set the Split SDK Key
  2. Set the user IDs and trafficTypes
  3. (If you have a Single Page Application) Register the appropriate collectors for route changes

Put your new feature behind a flag with a percentage based rollout
Set up [Key Metrics](https://docs.google.com/document/d/1vu3_rL8EogOB4hbts-HJq4r4nInGznLxXr46Ot5NuyE/edit#heading=h.ldi12j5ncxfp)

Once the events start flowing from the RUM agent, [some metrics](https://help.split.io/hc/en-us/articles/360030898431-Browser-RUM-agent#automatic-metric-creation) will automatically be generated. You can now [configure alerting](https://help.split.io/hc/en-us/articles/19832312225293-Configuring-metric-alerting) for these metrics.
 
With the above steps you get Split’s powerful statistical computation engine watching your back to ensure that you are alerted to any degradation of the automatic metric across any of your percentage based rollouts of features. 

## Rollout of a new feature on Android or iOS

On mobile devices, Split Suite can be used to track crashes, errors, and unresponsive moments of your application, among other things. Of course you can also track custom events. 

You will need to install the Split Suite. If not doing flag evaluations in the mobile app, you can also just install the [Split RUM agent](https://help.split.io/hc/en-us/sections/12619161404685-Client-side-agents) instead.

To set this up, follow these steps:

1. Install the Split Suite.
2. Set the Split SDK Key.
3. Set the user IDs and trafficTypes.
4. Optionally, you may want to set a custom property to note if the platform is Android or iOS to allow for dimensional drilldowns by platform.
5. Put your new feature behind a flag with a percentage based rollout and set up [Key Metrics](https://docs.google.com/document/d/1vu3_rL8EogOB4hbts-HJq4r4nInGznLxXr46Ot5NuyE/edit#heading=h.ldi12j5ncxfp).

Once the events start flowing from the RUM agent, some [metrics for iOS](https://help.split.io/hc/en-us/articles/22545155055373-iOS-RUM-Agent#default-events-and-properties) or [metrics for Android](https://help.split.io/hc/en-us/articles/18530305949837-Android-RUM-Agent#automatic-metric-creation) will automatically be generated. You can now [configure alerting](https://help.split.io/hc/en-us/articles/19832312225293-Configuring-metric-alerting) for these metrics

With the above steps you get Split’s powerful statistical computation engine watching your back to ensure that you are alerted to any degradation of the automatic metric across any of your percentage based rollouts of features. 

## Rollout of new feature on Server

While the Split Suites today only exist for client side code, this does not mean that you cannot get value from them if you are rolling out server side code. Features that are focused on server side components of your technology stack still can and likely will affect the experience of your users. Installing the Suite or RUM agents in your app will allow you to keep track of these and, in concert with Split’s alerting mechanisms, will alert you if any metrics show an unacceptable degradation of user experience, allowing you to rollback or kill the feature within Split. 

To do this requires a few components to think about. First, you will need to ensure that you have the same ID values available in the frontend and available to the Server side Split SDK that is doing the rollout of your server side feature. This allows Split’s statistics engine to do the join and comparison. Second, you will need to install the appropriate Suite or agent in your client side code and ensure that it is capturing events with the proper ID. 

Follow the steps in the [Rollout a new feature on the web](https://help.split.io/hc/en-us/articles/26526728778381#h_01HX7VTF55FBE8SHASVB96PJKM) or [Rollout a new feature on Android or iOS](https://help.split.io/hc/en-us/articles/26526728778381#h_01HX7VTF55FZXQM92PHCYHPNBN) to set up the agents and get protected from features causing downtime or degradation with IFID.