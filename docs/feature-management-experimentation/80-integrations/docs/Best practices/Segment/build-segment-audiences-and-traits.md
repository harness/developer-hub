---
title: Build Segment audiences and traits
sidebar_label: Build Segment audiences and traits
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360033831431-Segment-Building-Segment-audiences-and-traits-utilizing-Split-impression-data <br /> ✘ images still hosted on help.split.io </button>
</p>

<h2 id="h_01JFM11F1JCAWWB8V2GH1D9G16">
  <strong>Overview</strong>
</h2>
<p>
  Split is a unified solution for feature flagging, monitoring, and experimentation that enables product owners and developers to control rollouts and make data-driven product decisions. Segment makes customer data simple by giving you a single point for collecting, cleaning, and controlling that data.
</p>
<p>
  If you are a customer of both Split and Segment, you are probably already integrating the two tools by sending events from Segment to Split, sending impression data from Split to Segment, or both. If you are not already using these integrations, please see our product documentation <a href="https://help.split.io/hc/en-us/articles/360020742532-Segment">here</a> for instructions on configuring our integrations.&nbsp;
</p>
<p>
  Computed traits in&nbsp;<a href="https://segment.com/product/personas/">Segment Personas</a>&nbsp;allow
  you to&nbsp;utilize Split impression data to build audiences to enrich and personalize marketing campaigns and in-app experiences through additional Segment destinations.
</p>
<p>
  It can be useful for you to be able to identify which treatment a particular user has seen for a particular feature flag to enrich and personalize marketing campaigns and in-app experiences through additional Segment destinations. If you’ve configured the Split/Segment integration to pass impression events from Split to Segment, you can use those events as the basis for computing a trait where the trait key represents the feature flag name and the value represents the last seen treatment.
</p>
<p>
  Let’s walk through building a user trait based on Split impressions.
</p>
<h3 id="h_01JFM11F1JDMP4Z7PSDP1YA4Z4">
  <strong>Connect Split impressions to Segment personas</strong>
</h3>
<p>
  First, make sure that the Segment Source associated with your Split impression data is connected to Personas.
</p>
<ol>
  <li>
    Navigate to the Sources section of Personas Settings and select “Connect Source”<img src="https://help.split.io/hc/article_attachments/360038736011/ConnectedSources.png" alt="ConnectedSources.png" />
  </li>
  <li>
    Select the Source corresponding to the HTTP API Source to which Split is sending impression events.&nbsp;Depending on your configuration settings within Split, this will be specific to a particular Split workspace/environment.&nbsp; Depending on how many of your environments are configured to send impression data to Segment, there may be more than one you want to connect to Personas, though typically this is something that is only done on production environments.<img src="https://help.split.io/hc/article_attachments/360038736551/Screen_Shot_2019-09-09_at_5.58.04_PM.png" alt="Screen_Shot_2019-09-09_at_5.58.04_PM.png" />
  </li>
  <li>
    Click “Connect Sources”.
  </li>
</ol>
<h3 id="h_01JFM11F1J0J91E10JB68Z1H7V">
  <strong>Configure a computed trait in Segment</strong>
</h3>
<p>
  To configure the computed trait, you will need to know the name of the feature flag for which you want to obtain the user’s treatment.
</p>
<ol>
  <li>
    Select the Computed Traits section in Personas<img src="https://help.split.io/hc/article_attachments/360038755792/ComputedTrait_1.png" alt="ComputedTrait_1.png" />
  </li>
  <li>
    Select the “Last” category to set the property value as the last event seen.<img src="https://help.split.io/hc/article_attachments/360038755892/ComputedTrait_2.png" alt="ComputedTrait_2.png" />
  </li>
  <li>
    For event name, choose <em>get_treatment</em>. If you have a lot of event types, you can use the filter box to easily find <em>get_treatment</em>.<img src="https://help.split.io/hc/article_attachments/360038736031/ComputedTrait_3.png" alt="ComputedTrait_3.png" />
  </li>
  <li>
    Click on Add Condition. Select <em>split</em> as the property and filter to match the name of the feature flag for which you want to set the trait (in this example, that is <em>back_end_roll_algorithm</em>). Optionally, add additional conditions to filter down based on other properties including environmentName, label, and the feature flag version.<img src="https://help.split.io/hc/article_attachments/360038736051/ComputedTraits_4.png" alt="ComputedTraits_4.png" width="687" /> 
  </li>
  <li>
    Click Select event property, and then choose the property <em>treatment</em> to have the value of the treatment seen for the given feature flag be used as the computed trait’s value. Then click Preview.<img src="https://help.split.io/hc/article_attachments/360038755932/ComputedTrait_5.png" alt="ComputedTrait_5.png" />
  </li>
  <li>
    Click Select Destinations. If you have a backend data warehouse configured for Personas, you will have the option to select them to have the computed traits synchronized to them.<img src="https://help.split.io/hc/article_attachments/360038755912/ComputedTraits_6.png" alt="ComputedTraits_6.png" />
  </li>
  <li>
    Click Review &amp; Create, and enter the name of the computed trait as well as an optional description.<img src="https://help.split.io/hc/article_attachments/360038755952/ComputedTraits_7.png" alt="ComputedTraits_7.png" />
  </li>
  <li>
    Finish the process by clicking Create Computed Trait. There will be some delay before the values of the computed trait start appearing in the explorer window.<img src="https://help.split.io/hc/article_attachments/360038756612/Screen_Shot_2019-09-09_at_6.50.29_PM.png" alt="Screen_Shot_2019-09-09_at_6.50.29_PM.png" />
  </li>
</ol>
<h3 id="h_01JFM11F1JKZ5MRQ9QXB7JTQE4">
  <strong>Use Cases</strong>
</h3>
<p>
  Using computed traits and the key value mappings of split:treatment you can
</p>
<ul>
  <li>
    Show personalized experiences,&nbsp;<a href="https://docs.appcues.com/article/67-target-property">targeting by user property in Appcues</a> based on a user’s split:treatment.
  </li>
  <li>
    Analyze A/B test results or dive deeper into your analytics,&nbsp;<a href="https://help.amplitude.com/hc/en-us/articles/115001580108#how-many-user-properties-should-i-send">filtering by user property in Amplitude</a>.&nbsp;
  </li>
  <li>
    Build email campaigns based on <a href="https://support.iterable.com/hc/en-us/articles/204780539-Segmentation-overview">user properties in Iterable</a>.
  </li>
  <li>
    View FullStory sessions for users experiencing your new feature by searching <a href="https://help.fullstory.com/hc/en-us/articles/360020828613-How-to-Search-Custom-User-Data">custom fields</a>.
  </li>
  <li>
    ...and many other Segment destinations.
  </li>
</ul>