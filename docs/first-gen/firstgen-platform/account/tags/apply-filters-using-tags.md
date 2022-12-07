---
title: Apply Filters Using Tags
description: Once you’ve Applied Tags to your Harness Applications and components, you can use these Tags to filter what components you see. This topic describes how to use Tags to create different views of your…
# sidebar_position: 2
helpdocs_topic_id: nyxf7g8erd
helpdocs_category_id: 5havnl8qad
helpdocs_is_private: false
helpdocs_is_published: true
---

Once you’ve Applied Tags to your Harness Applications and components, you can use these Tags to filter what components you see. This topic describes how to use Tags to create different views of your Applications and components. 

In this topic:

* [Before You Begin](#before_you_begin)
* [Visual Summary](#visual_summary)
* [Step 1: Filter Applications or Components by Tags](#filter_tags)
* [Step 2: Manage Applied Filters](#manage_filters)
* [Next Steps](#next_steps)


### Before You Begin

* See [Harness Key Concepts](/article/4o7oqwih6h-harness-key-concepts).
* See [Assign Metadata Using Tags](/article/nrxfix3i58-tags).


### Step 1: Filter Applications or Components By Tags

Look for a Filter button at the upper right. These are shown below (with tooltips) for the **Setup** > **Applications** list, and for a single Application's **Infrastructure Provisioners** page:

![](https://files.helpdocs.io/kw8ldg1itf/articles/nrxfix3i58/1578087171027/image.png)To filter Applications or their components by Tags:

1. Click the Filter button (highlighted above).  
  
This opens the **Filter** dialog, initially empty:![](https://files.helpdocs.io/kw8ldg1itf/other/1569448326648/image.png)
2. The **Name** field enables free-text filtering of the currently displayed Harness entity (Applications or an Application component). This option will display entities whose *names* (or their substrings) match the text that you enter.Harness applies AND search logic between the **Name** and **Tags** fields. So any **Name** string that you enter will further restrict the results of your **Tags** selection, and vice versa.
3. Click the **Tags** multi-select field to open the controls shown below.![](https://files.helpdocs.io/kw8ldg1itf/other/1569450243021/image.png)


1. Click the **Match:All** radio button to apply AND (restrictive) search logic among multiple Tag selections. Accept the default **Match:Any** radio button to perform an OR (inclusive) search among multiple Tags.
2. Use the Search box to locate desired Tags, or Tag values, by free-text search. Or, manually scroll the list of Tags and values.  
  
Tag names have a gray background. Tag values have a white background, and are indented after their check boxes.
3. To retrieve Harness entities that match a given Tag with any value, select the **Any Value** check box to the Tag's right. To match only one or more specific values, select the check boxes to their left.Within a given Tag, inclusive OR search logic is *always* applied among the *values* you select. (Remember that each Tag can take only one value on a given Application or component—so a restrictive AND search for two or more values would always return zero results.) The search logic among your selected *Tags* is either OR or AND—depending on your **Match**  [setting](#tags_search_logic). The **Tags** field updates to display a running summary of your selections.![](https://files.helpdocs.io/kw8ldg1itf/other/1569456189703/image.png)
4. When you are ready to display the results of your selected filter conditions, click **Apply**. To discard all selections and keep the dialog open to make new selections, click **Clear All**.![](https://files.helpdocs.io/kw8ldg1itf/other/1569457737929/image.png)


### Step 2: Manage Applied Filters

Once you've applied filters to an Application or component, you can adjust or remove them using controls similar to those that Harness provides for Audit Trails filters. For details, see [Update or Save Filters](/article/kihlcbcnll-audit-trail#update_filters).


### Next Steps

* [Manage Tags](/article/mzcpqs3hrl-manage-tags)

