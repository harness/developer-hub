---
title: Automate QA testing of code that uses FME SDK
sidebar_label: Automate QA testing of code that uses FME SDK
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360022028031-Using-Split-with-Test-Automation-in-QA </button>
</p>

<p>
  Many users of Split leverage automated testing tools as part of their QA process,
  and run those automations against the deployed feature flags to identify potential
  regressions when releasing new features.
</p>
<p>
  Typically, these regression tests will run using every treatment, and you will
  want to avoid any manual intervention as you cycle between test runs.
</p>
<p>
  To start, you can create an individually targeted list for each treatment. You
  can use a single User ID, or use segments, which might include automated and
  manual tester IDs. When you call getTreatment the users will get their corresponding
  treatment.
</p>
<p>There are a few ways you can switch between treatments:</p>
<ol>
  <li>
    <p>
      switch the IDs in the automated testing system to use a consistent set
      of IDs and/or segments for each treatment. In this case you don't have
      to modify anything in Split since you are flipping between IDs in the
      testing system.
    </p>
  </li>
  <li>
    <p>
      If using a segment, you can dynamically
      <a href="https://docs.split.io/reference#segments-overview" target="_self" rel="undefined">move the IDs from segment to segment</a>
      using the REST API, calling getTreatment with the same IDs as you repeat
      the process for each treatment. In this case, you would still use a consistent
      set of IDs/segments.
    </p>
  </li>
  <li>
    <p>
      Whether using individual IDs or segments, you can also programmatically
      switch the IDs between between treatments. In this case, you can use
      the same IDs for each treatment, you would then
      <a href="https://docs.split.io/v1/reference#splits-overview">modify the feature flag</a>
      to retarget the keys for each test run. Keep in mind that modifying the
      feature flag will create a new version, though that probably doesn't
      matter in this context.
    </p>
  </li>
</ol>
<p>
  Using an automated system with the Split SDK in regression tests will return
  the correct treatment(s) to the automated user, as expected. However, you might
  find that the impressions (and/or events) might not get posted to the Split cloud.
</p>
<p>
  While the SDK stores the impression and events in the cache, another thread posts
  the cache to the Split cloud. Based on the SDK default settings, this thread
  runs every 60 seconds (except in iOS and Android, where it runs every 30 min).
  If the test code exit before the thread finish, the cache will not be posted.
</p>
<p>
  This may not matter, since the main point of automated testing is to deliver
  the correct treatment and assess the validity of the code/app. That said, it
  is useful to see that everything is working end-to-end.
</p>
<p>
  For Javascript and Java SDK, using client.destroy will flush the cache and post
  events and impressions, so it's recommended to use client.destroy before the
  test code exit.
</p>
<p>
  For the other SDKs, you can configure how frequently these threads run by changing
  impressionsRefreshRate and eventFlushIntervalInMillis parameters in the config
  object. If possible, depending on your needs around test execution time, recommended
  settings are 2-5 seconds for the above parameters while making sure the test
  code waits for 5+ seconds before existing.
</p>
<p>
  For unit testing you can use mock to switch between the various treatments. Each SDK can be run in localhost mode for developers.
</p>