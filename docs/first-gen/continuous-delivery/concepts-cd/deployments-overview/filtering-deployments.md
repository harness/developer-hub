---
title: Filtering Deployments
description: This content is for Harness FirstGen. Switch to NextGen. You can filter deployments on the the Deployments page according to multiple criteria. You can save these filters as a quick way to filter dep…
sidebar_position: 30
helpdocs_topic_id: lbiv3zwwm0
helpdocs_category_id: cwefyz0jos
helpdocs_is_private: false
helpdocs_is_published: true
---

This content is for Harness [FirstGen](../../../../getting-started/harness-first-gen-vs-harness-next-gen.md). Switch to [NextGen](https://docs.harness.io/article/phiv0zaoex).You can filter deployments on the the Deployments page according to multiple criteria.

You can save these filters as a quick way to filter deployments in the future.


### Before You Begin

* [Deployments Overview](deployments-overview.md)
* [Harness Key Concepts](https://docs.harness.io/article/4o7oqwih6h-harness-key-concepts)

### Limitations

The **Aborting** status filter is in progress and does not work presently.

### Visual Summary

Here is what the Deployments page filter options looks like:

![](./static/filtering-deployments-05.png)

As you can see, you can filter according to multiple criteria. Next, you can give your filter a name and save it.

### Option 1: Filter by Deployment Tag

In **Filter by Deployment Tag**, enter one or more Tags in your account's **Tags Management**.

You can enter a Tag name, name:value pair, or evaluated expression.

See [Assign Metadata Using Tags](https://docs.harness.io/article/nrxfix3i58-tags), [Use Expressions in Workflow and Pipeline Tags](https://docs.harness.io/article/285bu842gb-use-expressions-in-workflow-and-pipeline-tags), and [Apply Filters Using Tags](https://docs.harness.io/article/nyxf7g8erd-apply-filters-using-tags).

### Option 2: Filter by Applications

In **Filter by Applications**, select the Application entities to filter on.

First, select an Application. This will populate the remaining settings with the subordinate entities of the Application.

If you select multiple Applications, then all of the subordinate entities of the Applications are provided.

### Option 3: Filter by Statuses

In **Filter by Statuses**, select all of the statuses you want to filter on.

### Option 4: Filter by Time

In **Filter by Time**, select a date range for the filter.

### Step: Save a Filter

In **Filter Name**, enter a name for the filter and click **Save**.

![](./static/filtering-deployments-06.png)

The filter is now available from the **Load Saved Filter**:

![](./static/filtering-deployments-07.png)