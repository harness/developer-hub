---
title: Best practices for full stack experimentation
sidebar_label: Best practices for full stack experimentation
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360015192752-Best-practices-for-full-stack-experimentation </button>
</p>

<p>
  Split lets anyone roll out features and experiment with a target group of users
  across the full stack: from deep in the backend to client-facing Javascript and
  mobile applications. Features can be released to a small subset of users to gather
  usability feedback or measure performance, then rolled out to everyone, or rolled
  back with the click of a button if bugs appear.
</p>
<p>This methodology is called feature experimentation.</p>
<h3 id="h_01JEN3831ZJT2EVQMSWHR9ZBHN">
  <a id="best-practice-use-split-to-maintain-stickiness-of-randomization" class="header-anchor" href="#best-practice-use-split-to-maintain-stickiness-of-randomization"><span class="header-anchor-icon"></span></a>Best
  practice: Use Split to maintain stickiness of randomization
</h3>
<p>
  The Split platform provides out of the box SDKs for 10 different languages. (The
  documentation for each SDK is
  <a href="https://help.split.io/hc/en-us/articles/360033557092-SDK-overview" target="_self" rel="undefined">here</a>.)
  These SDKs can be imported into a project within minutes, and are designed to
  deterministically bucket customers so that, given a rollout plan, a user will
  receive a consistent experience across all of Split's SDKs.
</p>
<p>
  In each supported language, the SDK client is designed to be a fully contained
  decision engine. This means the Split cloud is not involved in making the choice
  of treatment a customer will be served. Rather, the SDK simply polls the Split
  backend on a regular basis to store the most up to date rollout plans you set
  in Split’s web management console.
</p>
<p>
  The Split SDK is making that decision at runtime with the most up to date targeting
  information. For example, you might want to show a feature only to someone who
  logged in at least 10 times. Since this is a dynamically changing count, you’ll
  want to make a decision in your code at runtime rather than pass the login count
  to the Split cloud and have to wait for a decision to come back.
</p>
<p>
  This decision engine is architected so that when you use Split to randomly assign
  customers into 50% on and 50% off buckets it can perform the randomization without
  needing to call back to the Split cloud. Split built the same deterministic hashing
  algorithm across all of our SDKs to maintain the same sticky bucketing across
  any language.
</p>
<h3 id="h_01JEN3831ZREMSPX69VM46Y6P2">
  <a id="best-practice-measure-experiments-across-all-levels-of-the-stack" class="header-anchor" href="#best-practice-measure-experiments-across-all-levels-of-the-stack"><span class="header-anchor-icon"></span></a>Best
  practice: Measure experiments across all levels of the stack
</h3>
<p>
  Split’s Intelligent Results Engine has been built from the ground up to ingest
  important data about the performance of your company and products; at multiple
  points in time during an experiment and from any level of the stack. This design
  is critical to allow for experimentation on features supported by the backend
  that might have an impact on your customer’s user experience.
</p>
<p>
  Take the feature of search for any e-commerce business as an example. e-commerce
  companies constantly iterate through different search algorithms to improve the
  display of the most relevant items to visitors of the site. Their goal is to
  eliminate as many blockers as possible in getting customers to
  <em>checkout</em>.
</p>
<p>
  To properly run this experiment, the decision making must be done on the server
  side so that only one set of search results is passed to the front end. However,
  the important metric to improve is a click on <em>checkout</em>, which is triggered
  on the front end. To solve for this, the Split platform is architected to automatically
  capture the search algorithm that is used on the backend, and then separately
  ingest the appropriate checkout click event from the front end. The Results Engine
  will examine the unique keys of the user that triggered a specific search algorithm
  and performed checkout clicks and automatically join those disparate data points.
  The engine will analyze how a change on the backend impacted a metric you track
  only on the front end.
</p>
<h3 id="h_01JEN3831Z133HG7N4GHZHKWQD">
  <a id="best-practice-leverage-a-single-source-of-truth-in-a-distributed-microservices-architecture" class="header-anchor" href="#best-practice-leverage-a-single-source-of-truth-in-a-distributed-microservices-architecture"><span class="header-anchor-icon"></span></a>Best
  practice: Leverage a single source of truth in a distributed microservices architecture.
</h3>
<p>
  Many of Split’s customers use Split in a microservices architecture where sessions
  are not sticky to a given server. In this case, in order to make sure that each
  service has a single source of truth on the current state of rollout plans, we
  recommend using the
  <a href="https://docs.split.io/docs/split-synchronizer#section-install-the-service">Split Synchronizer</a>
  in conjunction with our native SDKs.
</p>
<p>
  The Split Synchronizer is a separate service written in Go that you can run natively
  or via Docker. It will automatically take care of all communication between your
  servers and Split servers, and automatically populate rollout plan updates to
  a Redis instance.
</p>
<p>
  When you instantiate our SDKs on your microservices, you would then configure
  them to pull information from the shared Redis instance rather than having them
  communicate directly with our servers. This will ensure that every service in
  your network is making treatment assignment decisions based on a common state
  of your rollout plans.
</p>
<h3 id="h_01JEN3831ZNB7NQZREH5004PDS">
  <a id="best-practice-provide-a-unified-experience-across-web-and-mobile" class="header-anchor" href="#best-practice-provide-a-unified-experience-across-web-and-mobile"><span class="header-anchor-icon"></span></a>Best
  practice: Provide a unified experience across web and mobile
</h3>
<p>
  What if you have a hybrid web-mobile stack? In a hybrid web-mobile world, a user
  should be able to access a new feature whether using the web or a mobile app.
  A lack of consistency in customer experience can lead to customer frustration.
</p>
<p>
  If a critical bug appears in a newly-released mobile feature a fix typically
  can’t be delivered in minutes due to App Store approval delays; the minimum turnaround
  time is usually days. If customers keep experiencing app crashes or a poor experience
  their trust erodes.
</p>
<p>
  To make sure you can consistently turn features on and off across web front end,
  web backend, and mobile we recommend that Split users wrap one of the server-side
  libraries in a small service, hosted on their infrastructure. This allows mobile
  apps to query the service at startup to know which features are to be turned
  on or off.
</p>
<p>
  Note: Split has written a simple implementation of this approach that you can
  clone for reference or run natively in Docker.
</p>
<p>This approach has a number of advantages for our customers:</p>
<ol>
  <li>
    <p>
      <strong>Uniform experience across devices, versions and viewports</strong>:
      Since the web app can query the same service, our customers can be confident
      that their users will see a feature as on or off, regardless of whether
      they access the product via mobile or web. Thus, calling home is portable.
    </p>
  </li>
  <li>
    <p>
      <strong>Update your platform without touching the app</strong>: Split
      is a core piece of our customers’ infrastructure and is always improving.
      By hosting Split on the server-side, our customers can confidently upgrade
      their server-side Split library without worrying about older, possibly
      conflicting, versions of Split being used in older mobile apps. Thus,
      calling home avoids versioning headaches.
    </p>
  </li>
  <li>
    <p>
      <strong>No impact to File Size</strong>: By hosting the library on the
      server side, our customers need never worry about increasing the footprint
      of their mobile app by adding Split’s library. Thus, calling home is
      safe.
    </p>
  </li>
</ol>