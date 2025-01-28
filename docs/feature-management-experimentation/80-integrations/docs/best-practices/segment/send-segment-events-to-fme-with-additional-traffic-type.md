---
title: Send segment events to FME with additional Traffic type
sidebar_label: Send segment events to FME with additional Traffic type
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360021218331-Segment-Sending-Segment-Events-to-Split-With-Additional-Traffic-Type <br /> ✘ images still hosted on help.split.io </button>
</p>

<h2 id="issue" class="header-anchor">Problem</h2>
<p>
  When you configure Split as a Segment destination in order to receive events,
  you map the two Segment identity types (userId and anonymousId) to Split traffic
  types. Then you can use Segment events to feed metrics for feature flags where
  you are passing one of those two ids to getTreatment. But what if you want to
  measure feature flags of a traffic type that does not map to one of those two
  ids, like account id or job id?
</p>
<p>
  Fortunately, there is a feature in the Split/Segment integration that facilitates
  creating Split events of an additional traffic type by adding a special property
  to the Segment event.
</p>
<h2 id="solution" class="header-anchor">Solution</h2>
<p>
  This article presumes you have already configured the Split/Segment integration
  to define
  <a href="https://help.split.io/hc/en-us/articles/360020742532-Segment#split-as-a-destination" target="_self">Split as a Segment destination</a>.
  Typically in such a configuration you will map the Segment userId to the Split
  user traffic type and the Segment anonymousId to the traffic type you use for
  anonymous users.
</p>
<p>
  Now, what do you do if you want to use events from Segment in a metric for a
  feature flag that is not one of those two traffic types? For instance, let's
  say we have an auction site and we're testing out a new minimum bid algorithm
  with a feature flag that randomly assigns one of two algorithms to each auction.
  The traffic type in this case is auction, because we are passing the auction
  id to getTreatment to determine which algorithm should be assigned. To measure
  the results we need events of auction traffic type where the id in the event
  is the auction id to which that action applied. (These events might include bid-placed
  and auction-settled). How do we pass that information (traffic type and id) to
  Segment's track method?
</p>
<p>
  The Split/Segment integration allows you to pass that information in the properties
  of a tracked event, with a property named <em>split</em>. The value of that property
  should be an array of key-value pairs, where they key is the name of the traffic
  type and the value of the key is the id to be associated with the traffic type.
  So, a Segment call to register an event for the completion of an auction, where
  the auction id is "abcd-1234" would be
</p>
<pre class="prettyprint">analytics.track("Auction_complete", \{closingPrice: 550.00, split: [\{auction: "abcd-1234"\}]\});</pre>
<p>
  If the integration was configured to map both userId and anonymousId from Segment
  to Split traffic types and both identities were known at the time of the track
  call (i.e. analytics.identify had been called), then this event would show up
  three times in Split: once with traffic type user, once with traffic type anonymous,
  and once with traffic type auction. For traffic type auction, the id associated
  with the event would be "abcd-1234".
</p>
<p>
  If for some reason, you had more than one additional traffic type for the event,
  you would pass each traffic type/id pair as a separate element in the array for
  the feature flag property, like
</p>
<pre class="prettyprint">analytics.track("Auction_complete", \{closingPrice: 450.00, split: [\{auction: "abcd-1234"\}, \{partner: "Auc-5678"\}]\});</pre>
<p>
  This form would create two extra events in Split: one with traffic type auction
  and one with traffic type partner. While the ids associated with the traffic
  types are shown in the examples as literals, in your code, they most likely would
  appear as variables holding the appropriate values.
</p>