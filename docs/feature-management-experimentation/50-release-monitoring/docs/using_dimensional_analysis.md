---
title: Using dimensional analysis
sidebar_label: Using dimensional analysis
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border: '1px', fontFamily: 'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/14824241665421-Using-dimensional-analysis </button>
</p>

Metric dimensions allow you to assign dimensions to your metrics. Once assigned, you can use dimensional analysis to dissect your experimentation data at a granular level, enabling better informed future hypotheses or experiments.

This feature provides information about impact to your key metrics at a more granular level. Once you have an understanding of the underlying factors that could be driving your top line metric result, you can decide what actions to take next for investigation or iteration.

Be aware that dimensional analysis is not meant to show any direct causal insights. Dimensional analysis is correlational in nature and is meant to provide guidance for further experimentation rather than definitive conclusions. As a result, we don't provide p-values with the dimensional breakdown.

**Note: To use this feature, you must enable the experimentation package. Contact support@split.io for more information.**

## Before you start

Before you start, you must be sending events with event properties. For more information about sending event properties, refer to the [Events](https://help.split.io/hc/en-us/articles/360020585772-Events) guide. For deeper analysis of events and properties you are currently sending, go to the Data hub, and from the Live tail tab, run your query for your events to get the right event properties. For more information on how to run a query, refer to the [Query events section](https://help.split.io/hc/en-us/articles/360044867032-Live-tail#query-events) of the Live tail guide.

## What is a dimension?

Dimensions are parameters or characteristics that provide context to your data (e.g. groups of users, categories of products).

## How it works

Split leverages your event property data across all sources, enabling you to develop a set of dimensions to break down your data. Even if you send event data from your application and another source (e.g., Segment or S3) if there’s consistency within your event and property naming, Split handles the attribution to calculate your metrics appropriately.

You can configure which event properties you want to set as a dimension for your account. For each dimension, you can select an event property and set the values Split is going to review and attribute accordingly. Once you configure these dimensions, Split periodically reviews event data streams, identifies any unique property values for those dimensions specified, and calculates your metrics based upon attributed activity to these unique event property values.

## Configuring dimensions and values

You can configure dimensions at the Admin level. You have a limit of twenty dimensions per account and twenty values per dimension. Split automatically generates a bucketed “Others” dimension for any property values which are sent but not specified in this list. To configure your dimensions, do the following:

1. From the left navigation, click the **user's initials** at the bottom and select **Admin settings**.
2. Under Experimentation settings, click **Metric dimensions**. The Metric dimensions table page appears.
3. Click the **Add dimension** button. The Add a dimension area appears.
4. Select the desired event property. You can optionally filter by an event type to narrow down the list of properties and values.

**Important: Make sure your event property and values match the ones sent with your events or your data may not be calculated properly. Also be aware that event property values are case-sensitive. For example, Chrome and chrome are different values.**

5. Either select or enter the event property values you want to use for this dimension. You can have up to twenty property values to calculate and graph in the user interface. We recommend using simple categories (e.g. product categories or device types) or binary variables (e.g., true or false).
6. Click the **Add** button to complete your dimension configuration.

**Note: Values not selected as key metrics are also calculated as part of an overall calculation for all metrics, but are not eligible for more granular dimensional analysis.**

## Viewing dimensionality

View your dimensions in the Impact snapshot graph. This graph provides you an up-to-date, aggregated view of the expected impact over baseline for each treatment and an estimated range for that impact. For more information about the graph, refer to the [Line chart section](https://help.split.io/hc/en-us/articles/360025376251-Metric-details-and-trends#line-charts) of the Metric details and trends guide.

## Editing dimensions

To edit a dimension, do the following:

1. From the Metrics dimensions table, click **Edit** on the dimension you want to edit. The Edit dimension view appears.
2. Add and delete any property values you want to change. You can optionally filter by an event type to narrow down the list of values.

**Note: The property cannot be edited, as this defines the dimension. Delete and recreate the dimension if you need to use a different property.**

## Deleting dimensions

To delete a dimension, do the following:

1. From the Metrics dimensions table, click **Delete** on the dimension you want to delete. The Delete dimension view appears.
2. Type **DELETE** in the field and click the **Delete** button. The dimension is deleted and the dimension list updates.

This deletes the connection between the property and the grouping that you defined with the dimension, but doesn't delete the underlying event data. You can always recreate the dimension at a later time.

**Example use case for dimensional analysis**

Let’s say you have an A/B test for a new checkout flow in an e-commerce site. After running an experiment, the conversion rate stays flat between test and control groups. After reviewing the dimensional analysis, you find that conversions increased on mobile devices, but decreased on desktop devices. You use this insight to iterate on a more optimized flow for the desktop experience.
