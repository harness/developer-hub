---
title: Event Distribution Graph
description: Explore Event Distribution Graph features.
sidebar_position: 2
---

:::info note
Currently, this feature is behind the feature flag `CET_EVENTS_CHART`. Contact [Harness Support](mailto:support@harness.io) to enable the feature.
:::

The Event Distribution Graph provides an interactive visual representation of event volume within the selected timeframe and view. It helps you analyze historical performance metrics and track error counts within your specified time interval. 

This topic describes the Event Distribution Graph features and how to use them.


## View the Event Distribution Graph

To access the Event Distribution Graph, follow these steps:

- Select the expandable **Event Distribution** button.

The graph appears, displaying historical performance metrics and the total count of errors across your chosen time interval.

<DocImage path={require('./static/cet-event-distribution-default.png')} />


## Add events to the graph

To include a new event in the graph, follow these steps:

1. Select the + icon located in the last column.
   
2. Enter the event details in the provided fields.
   
   The newly added event is displayed on the chart.

<DocImage path={require('./static/cet-event-distribution-add-exception.png')} />


## Display top events

To quickly identify high-impact errors, follow these steps:

- Select the **Event Distribution split series** icon.
  
  This adds the top error events as a series on the graph, providing an immediate overview of critical issues requiring attention.

<DocImage path={require('./static/cet-event-distribution-plot-top-events.png')} />


## Remove events from the graph

To remove events from the Event Distribution Graph, use one of the following methods:

- Remove an Event: Select the remove icon next to the event you wish to remove.
 
  <DocImage path={require('./static/cet-even-distribution-remove-event.png')} />

- Remove All Events: Choose the Clear option to remove all events from the graph.
  
  <DocImage path={require('./static/cet-event-distribution-clear-events.png')} />

## Customize timeframes

You can tailor the graph to your preferences by adjusting the timeframes using one of the following methods:

- Time Period: Select this option and choose a specific time period for data display. The default is Last 1 hour.

- Time Slice: Click on the graph to open a concise time slice pane. You can expand or shrink the time slice according to your preferred timeframe.

<DocImage path={require('./static/cet-event-distribution-select-time-slice.png')} />


## Collapse the Event Graph

You can easily collapse the Event Distribution Graph by clicking on the **Event Distribution** button.
