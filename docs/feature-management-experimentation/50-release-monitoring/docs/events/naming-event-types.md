---
title: Naming event types
sidebar_label: Naming event types
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360023227391-Naming-event-types <br /> ✘ should this article go into monitoring FAQs? </button>
</p>

<h2 id="question" class="header-anchor">Question</h2>
<p>
  To create metrics I must have events sent to Split using the SDK, REST API, or
  Segment. When I'm using “track” with the SDK or the REST API, I must choose an
  event name. How should I choose event type names?
</p>
<h2 id="answer" class="header-anchor">Answer</h2>
<p>
  As noted in the product
  <a href="https://docs.split.io/docs/track-events">documentation</a>, there are
  only three hard requirements for the event type:
</p>
<ul>
  <li>80 characters or less</li>
  <li>Starts with a letter, number, or left-bracket ( [ )</li>
  <li>
    Contains only letters, numbers, hyphen, underscore, brackets, or period
  </li>
</ul>
<p>
  The documentation uses “page_load_time” as an example in many places, but there
  is often a better way to name events that may already be familiar:
</p>
<p>
  <strong>OBJECT -&gt; ACTION</strong>
</p>
<p>
  For example, “song.played”, “song.created”, or “song.viewed”. On an eCommerce
  site, similar events might be “product.viewed”, “product.addedToCart”, or “account.profile.address.updated”.
  In each case, we end with a verb, but start with a string of nouns.
</p>
<p>
  Choosing good event type identifiers makes working with the rest of the Split
  interface easier: common nouns alphabetize together and the events the names
  describe are intuitively associated.
</p>
<p>
  More examples are provided at the
  <a href="https://segment.com/academy/collecting-data/naming-conventions-for-clean-data/">Segment Academy</a>
  site.
</p>
