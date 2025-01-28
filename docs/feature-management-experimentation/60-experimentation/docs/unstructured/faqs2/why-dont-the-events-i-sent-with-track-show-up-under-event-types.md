---
title: Why don't the events I sent with track() show up under event types?
sidebar_label: Why don't the events I sent with track() show up under event types?
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360020941131-Why-don-t-the-events-I-sent-with-track-show-up-under-event-types </button>
</p>

<h2 id="problem" class="header-anchor">Problem</h2>
<p>
  Using the client.track() method to send events is successful, however, no events
  show up in the the admin UI
</p>
<h2 id="root-cause" class="header-anchor">Root Cause</h2>
<p>
  There are multiple root causes that the Split cloud will reject the request silently:
</p>
<ul>
  <li>Event Type name has invalid character, like spaces.</li>
</ul>
<pre class="prettyprint"><code>client.track("userId", "client", "my conversion"); </code></pre>
<ul>
  <li>
    Traffic Type name passed in the call does not exist in Split organization.
  </li>
</ul>
<pre class="prettyprint"><code>client.track("userId", "IncorrectTrafficType", "conversion"); </code></pre>
<h2 id="solution" class="header-anchor">Solution</h2>
<p>
  Make sure to follow the guidelines stated in the
  <a href="https://help.split.io/hc/en-us/articles/360033557092-SDK-overview" target="_self">SDK docs page.</a>
</p>