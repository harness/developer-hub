---
title: Attribution and exclusion
sidebar_label: Attribution and exclusion
sidebar_position: 0
helpdocs_is_private: false
helpdocs_is_published: true
---

<p>
  <button style={{borderRadius:'8px', border: '1px', fontFamily: 'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360018432532-Attribution-and-exclusion <br /> adjusted formatting <br /> images still hosted on help.split.io </button>
</p>

Attribution is the process by which Split measures the influence of a feature on a user metric and allows you to run accurate experiments. Attribution correlates events with one of the treatments of the split for which metrics are being calculated. 

Split combines event data you send to Split with the assignment data collected by the getTreatment call of the Split SDK to determine whether the event was influenced by the feature. The correlation is done via the key (id) that is present in an [impression](https://help.split.io/hc/en-us/articles/360020585192) (a record of which treatment was assigned to a key) and the key in an event. 

If the timestamp in the event is later than the timestamp in the impression, the event is attributed to whatever treatment was assigned to the key specified in the event. Regardless of the specific mechanism by which you send events to Split, those events must contain a key from the same domain (traffic type) for which you are calling getTreatment and an Epoch UTC timestamp in milliseconds. 

For some methods of sending events, such as the Split SDK track method, those fields are populated automatically. For others, such as posting data to the events API, you must populate those fields yourself. Learn more about [sending events to Split](https://help.split.io/hc/en-us/articles/360020585772-Events).

## Event attribution

Split's attribution functionality associates events with treatments to measure the relative performance of those treatments. Any event that occurs after the timestamp of the first impression a user generates for a split is attributed to the treatment that was assigned, and for measurement the user is grouped with all the other users who had treatments assigned by the same targeting rule.

The targeting rule is important because metric impact is only assessed between treatments that were assigned by the same rule. The rule is identified by the label field of the impression. Essentially a user’s events are attributed to a specific label/treatment pair.

The following example describes how Split attributes events when a user's rule does not change during the version, which is the most common scenario.

Split identifies when a user first is assigned a treatment, and attributes all events after that first impression to the treatment assigned. The following is an illustration of this attribution following a single user's activity.

<p>
 	<img src="https://help.split.io/hc/article_attachments/360021818792/Attribution___exclusion_1_.png" alt="Attribution___exclusion_1_.png" /> 
</p>

* **e** is an event, such as a click event. Events are represented below the timeline of the version.

* **r1** and **on** represent a user's impressions with the rule (**r1**) and the treatment (**on**). At these points, Split is deciding whether a user is bucketed into a certain treatment based on the targeting rule you defined. In this example, all impression events in the timeline are for the same treatment and targeting rule.

The example in the timeline diagram shows a user's activity in your application. When calculating metrics, Split includes the shaded region, which is the events from 15 minutes before a user's first impression to 15 minutes after the end of the version. The events highlighted in pink are included in this example.

**Note:** If you want to set a different buffer time, you can reach out to [support@split.io](mailto:support@split.io) for help.

### Potential complications
There are some situations where the attribution process described above must be modified to accommodate unusual circumstances. 

#### Switching rules

Sometime after a treatment is first assigned to a user for a given version of a split version, a subsequent call to getTreatment for that user may use a different targeting rule to assign a treatment, which changes the measurement group to which that user belongs. For example, the value of a user’s attribute used in a targeting rule may have changed between the two calls, causing a different rule to apply. 

A user’s behavior is measured as part of two different groups (and possibly even treatments; the change in the rule used may also have caused a change to the treatment assigned). The events occurring before the getTreatment call where a user switched rules are attributed to the former rule and treatment. The events occurring after the first getTreatment call where a user changes rules are attributed to the latter rule and treatment.

If the targeting rule used to determine the treatment changes, Split counts that as one rule change, regardless of whether the treatment assigned to the user changes. For example, the value of an attribute being used in the rule changes and the user still receives the same treatment, despite the attribute value and rule changing. 

In this case, Split isolates the events and applies a 15-minute buffer to the first and last impression received for the unique rule and treatment combination. Specifically, 30 minutes are centered around the latter treatment assignment where events are attributed to both targeting rules and treatments.

This example illustrates how Split attributes events when a user's rule changes.

 <p> 
  	<img src="https://help.split.io/hc/article_attachments/360021818832/attribution___exclusion_2.png" alt="attribution___exclusion_2.png" />
 </p>

* **e** is an event, such as a click event. Events are represented below the timeline of the version.

* **r1**, **r2**, and **on** represent a user's impressions containing the rule (**r1** or **r2**) and the treatment (**on**). At these points, Split is deciding whether a user is bucketed into a certain treatment based on the targeting rule you defined. In this example, there are two unique combinations where the rule is changing from **r1** to **r2** while the treatment is not changing.

The example in the timeline diagram shows the user's activity in your application. When calculating metrics, Split includes the shaded region when looking at targeting rule **r1**. The events from 15 minutes before the user's first impression to 15 minutes after the first impression for the second rule. 

When isolating to **r2**, the same rules apply, include the events 15 minutes before the user's first impression to 15 minutes after the rule (in this example, version) change. The events highlighted in pink are not included in any rule analysis given that they fall outside the buffer windows.

Note that while the illustration shows a user receiving the same treatment after the rule change, the attribution process for when a user receives a different treatment due to the rule change is analogous, with events in the 30 minute buffer being attributed to the earlier rule and treatment **and** the subsequent rule and treatment.

#### Exclusions

Under certain circumstances, Split will remove all of a user’s events from measurement for a particular split. This is referred to as excluding a user. This occurs because after switching multiple times, it is unclear which treatment is influencing a user’s behavior or to which measurement group they belong, so it is safer to exclude that data from metric calculations.

As stated above, if a user switches between targeting rules **once**, a user’s events are attributed to the most recent treatment and rule, both before and after the switch. However, if a user switches rules a second time, Split excludes all of that user’s events from the split’s metrics. For example, perhaps the split is targeted by location and a user accesses your app from home, travels to a differently targeted location (switching once), and then returns home (switching for the second time). In this case, all of a user’s events would be excluded from measurement.

The number of users excluded from your analysis can be seen in the [metric details and trends](https://help.split.io/hc/en-us/articles/360025376251-Metric-details-and-trends) view in the Excluded column of the Sample population section.

## Version change

Any changes to the definition of a split other than modifying tags or editing the description will trigger a new version in Split with metric values reset to zero for that version. For example, increasing the percentage of users receiving the on treatment. By tracking version changes, Split counts only the events relevant to a particular treatment, and treats each targeting rule as a distinct sample population to compare.

As the version is changed, Split runs a final 15-minute calculation after the change so that you can revisit your results in the future. 

## Custom Dates

It is possible to analyze data across feature flag versions by selecting the custom dates option. This allows combining multiple versions that are included in a time range. This is an advanced feature and there are some scenarios that may invalidate experimental results. For more information, head to the [Selecting custom dates](https://help.split.io/hc/en-us/articles/360020848451-Applying-filters#selecting-custom-dates) section of Applying filters.

## Data retention

Split retains the impression and event data by which we measure experiments for ninety days. If a version of a split is older than 90 days, Split uses the last ninety days of data when calculating metrics for that split version. 

**Note:** Be aware that if you trigger a recalculation of split versions that are older than 90 days, the metric data you’re currently looking at could disappear. You should instead [share your results](https://help.split.io/hc/en-us/articles/360059696231-Share-Results).

## Metric calculation flexibility 

Split’s attribution model uses event timestamps to associate a user’s action with the treatment they were served prior to that timestamp. The events do not have to be delivered to Split contemporaneously. This makes the system flexible enough to handle the fact that teams often realize during a feature release or experiment that they're interested in measuring metrics that were not defined in Split at the beginning of the experiment. 

* **Events do not need to be sent from the Split SDK or synchronously when they occur.** You may want to measure a feature with events from systems not directly associated with a feature flag. For example, you may have a backend order processing system with useful information about business events. As long as you have an EPOCH UTC msec timestamp of when the event occurred and the key for which getTreatment calls were made (the key with which you wish to associate the event), you can send [the events](https://help.split.io/hc/en-us/articles/360020585772-Events) to Split anytime during the split version you are measuring. This allows us to receive data in batch and attribute them to experiments using the rules described above, that is , matching keys and the timestamp when the event occurred with whatever treatment was served to the key prior to that time.

* **You can define a metric in Split after an experiment is already running.** Similar to the scenario above, you might have events that you have sent during an experiment but haven't [defined a metric](https://help.split.io/hc/en-us/articles/360020586132-Create-a-metric) in Split that uses those events. As long as you have been consistently sending Split the events used in the metric definition, you can define that metric at any time during an experiment. When the metrics are next calculated, the newly created metric will reflect the impact of your experiment on that metric for the entire duration of the experiment.
