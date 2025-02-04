---
title: No impressions shown in Live tail during testing
sidebar_label: No impressions shown in Live tail during testing
helpdocs_is_private: false
helpdocs_is_published: true
---

<p>
  <button hidden style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/4409917046157-No-impressions-shown-in-Live-tail-tab-during-testing </button>
</p>

### Question

<p>
  When test generating impressions using Split SDK, on Split user interface Live
  tail page, no impressions show up, even though treatments are calculated successfully
  from the SDK side.
</p>

### Answer

<p>
  All Split SDKs support a de-dupe feature to conserve the amount of impressions
  posted to Split cloud, the impressions that contain the same user ID, feature
  flag name, and treatment value will not be posted if it they are generated within
  few minutes.
</p>
<p>
  This is controlled by SDK config parameter <strong>impressionsMode.</strong>
  By default the value is set to <strong>OPTIMIZED</strong>, which will have the
  SDK use the behavior above.
</p>
<p>
  To post all impressions generated regardless of their values, set the parameter
  to <strong>DEBUG.</strong>
</p>