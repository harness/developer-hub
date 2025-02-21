---
title: Event
sidebar_label: Event
helpdocs_is_private: false
helpdocs_is_published: true
description: "User action, performance measurement, or error exception that you send to FME"
---

<p>
  <button hidden style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360020585772-Events </button>
</p>

An event is a user action, performance measurement, or error exception that you send to FME.

FME correlates your events to specific feature flag variations and uses this data to calculate metric results and analytics.This enables you to measure the impact of your features on customer behavior, user experience, or application performance. 

Event data can be sent to FME in any of the following ways:
* Install an FME SDK Suite or RUM Agent
* Call an FME SDK's `track` method
* Post a JSON body to the `/events` HTTP API endpoint
* FME integrations with Segment, mParticle, Sentry, Amazon S3, or Google Analytics

The FME SDK Suites and RUM Agents will automatically collect event data when installed in a client-side application. Use the `track` method if you want to explicitly add instrumentation code to your application to record events. The API and integration options allow you to ingest event data from existing sources (i.e. take advantage of telemetry from existing instrumentation or analytics).