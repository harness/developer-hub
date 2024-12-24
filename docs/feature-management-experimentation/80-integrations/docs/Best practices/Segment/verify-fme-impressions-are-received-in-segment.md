---
title: Verify FME impressions are received in Segment
sidebar_label: Verify FME impressions are received in Segment
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360034791232-Segment-Verifying-impression-data-in-segment-from-Split <br /> ✘ images still hosted on help.split.io </button>
</p>

<h2 id="h_01JFM1TPJFY36ADY0W4P9JTH2A">Introduction</h2>
<p>
  This article explains how to verify that you are correctly receiving Split impression
  events in Segment after&nbsp;<a href="https://help.split.io/hc/en-us/articles/360020742532-Segment#split-as-a-source" target="_self">configuring Split as a Segment Source</a>.&nbsp;
  If you have specified more than one Split traffic type in the configuration --
  each traffic type mapped to either Segment's anonymousId or userId -- you should
  check that you are getting impressions correctly for at least one feature flag
  of each traffic type. Further, if you have multiple Split environments configured
  as Segment sources, make sure to check each of the corresponding Segment sources.
</p>
<p>
  First, a multi-step verification method using the Segment workspace UI is described.
  Next, we give an alternative technique that you may use if you have an SQL-queryable
  Warehouse Destination configured in Segment with the Split Source(s) connected
  to that destination. In this case, a couple of SQL queries can show whether or
  not you are correctly receiving impressions from Split in Segment.&nbsp;
</p>
<h2 id="h_01JFM1TPJF05TSC4JS15WVND8H">
  Procedure (If no data warehouse connected to Split Source in Segment)
</h2>
<p>
  Run through these steps for each Split environment configured as a Segment source,
  and each Split traffic type configured for that source.
</p>
<ol>
  <li>
    First, make sure that you are getting impressions for the feature flag in
    the given environment by navigating to the Live tail tab of the feature flag
    and initiating a query. Keep in mind that this tab will only show impressions
    if the feature flag is actively receiving traffic.<img src="https://help.split.io/hc/article_attachments/360074512951/Screen_Shot_2020-10-27_at_5.01.03_PM.png" alt="Screen_Shot_2020-10-27_at_5.01.03_PM.png" />
  </li>
  <li>
    In your Segment workspace, navigate to the list of sources and select the
    source you wish to check. It will be an HTTP Source. Hopefully, whoever set
    it up will have employed the best practice of including the name of the Split
    environment in the name of the source, so you know which source corresponds
    to the environment you are verifying.<br />
    <img src="https://help.split.io/hc/article_attachments/360040823191/DetailedSegmentSourceList.png" alt="DetailedSegmentSourceList.png" />
  </li>
  <li>
    Click on the Source entry to go to the source detail page, where you should
    select the Debugger tab and then in the search box type the name of the feature
    flag for which you are looking for impression events (as shown below, where
    the search term is ruby_example). This will filter the list of events to
    just those that contain a string matching the search term.The Split/Segment
    integration sends Split impressions to Segment as events named get_treatment.
    The list of matching events should include all the get_treatment events for
    that feature flag.<img src="https://help.split.io/hc/article_attachments/360040824331/get_treatment_Events.png" alt="get_treatment_Events.png" />
  </li>
  <li>
    Click on one of the get_treatment events to see the detailed description
    of the event. Select the Raw tab in order to see the JSON body of the event.<img src="https://help.split.io/hc/article_attachments/360040825271/get_treatment_event_detail.png" alt="get_treatment_event_detail.png" />
  </li>
  <li>
    Check the JSON data. The value of the environmentName property should be
    the appropriate Split environment and the feature flag property should be
    the name of the feature flag for which you are checking impressions. Finally,
    make sure that the key passed to Split's getTreatment() shows up as the value
    of either the userId field or the anonymousId field. Which one you should
    look for depend on how you have configured the Split/Segment integration.
    If you have mapped the traffic type of the feature flag to Segment's userId,
    then you should see a userId field (as in the image above). If you have mapped
    the traffic type of the feature flag to Segment's anonymousId, then you should
    see an anonymousId field. The value of that field should be a user key that
    was passed to getTreatment for the feature flag.
  </li>
</ol>
<p>
  Perform each of these steps for every combination of environment and traffic
  type for which you are sending impression events from Split to Segment, making
  sure to check whether or not impression events are arriving, and that they have
  the correct mapping of Split traffic type to either userId or anonymousId in
  Segment.
</p>
<h2 id="h_01JFM1TPJFGM7A3TJGR6ANHTKA">Procedure (with Segment backend data warehouse)</h2>
<p>
  The ability to query the impression events with SQL makes verifying the operation
  of the Split/Segment integration much simpler.
</p>
<p>&nbsp;</p>
<pre>select distinct split from split_impressions_stg_vacations.get_treatment <br />                      where user_id != '';</pre>
<p>
  This query will return all the feature flags for traffic types configured to
  map the Split getTreatment key to a Segment user_id (and hence non-null). If
  this query returns feature flags of a traffic type that is supposed to be mapped
  to Segment's anonymousId, then something is wrong with your integration configuration,
  or there are impression events that occurred prior to the configuration being
  made correctly. Note that the view queried (in this case, split_impressions_stg_vacations)
  is determined by the name you have configured for the Segment Source associated
  with your Split environment.
</p>
<p>&nbsp;</p>
<p>Similarly, the query</p>
<pre>select distinct split from split_impressions_stg_vacations.get_treatment <br />                      where anonymous_id != '';</pre>
<p>
  will return all the feature flags for traffic types configured to map the Split
  getTreatment key to a Segment anonymousId.&nbsp;
</p>
<p>
  If you have multiple Split environments configured as Segment sources, you will
  need to run the queries against each source.
</p>