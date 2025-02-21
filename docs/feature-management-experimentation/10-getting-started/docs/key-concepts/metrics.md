---
title: Metric
sidebar_label: Metric
helpdocs_is_private: false
helpdocs_is_published: true
description: "Measures events that are sent to FME"
---

<p>
  <button hidden style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/22005565241101-Metrics </button>
</p>

A metric measures [events](./events.md) that are sent to FME. Metrics can be defined to count the occurrence of events, measure event values, or measure event properties.

Metric results are calculated for each treatment of a feature flag that shares the same traffic type as the metric and has a percentage targeting rule applied. Impact can be calculated between a selected comparison treatment and baseline treatment within a feature flag. Results are displayed on the [Metrics impact tab](https://help.split.io/hc/en-us/articles/360020844451) of the feature flag.

Refer to our [Guide to Product Metrics](https://www.split.io/guide-to-product-metrics/) to learn about many common metrics and how to create them in FME.