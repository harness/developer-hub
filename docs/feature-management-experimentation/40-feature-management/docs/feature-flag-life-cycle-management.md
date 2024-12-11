---
title: Feature flag lifecycle management
sidebar_label: Feature flag lifecycle management
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360038912072-Feature-flag-lifecycle-management </button>
</p>

<p>
  As you scale utilization, it becomes increasingly important to have a strategy
  for how to best clean up feature flags. This should be a consideration
  from the very first feature flag you create.
</p>

## When creating new feature flags

<ul>
  <li>
    There are a variety of reasons for placing a change or new feature behind
    a feature flag. The three main types of flags to consider:
  </li>
</ul>
<p class="wysiwyg-text-align-center">
  <img src="https://help.split.io/hc/article_attachments/360055335391" alt="mceclip0.png" />
</p>
<p>Examples of Release Management feature flags</p>
<ul>
  <li>
    I want to expose a feature flag to a subset of my traffic that meet a certain
    criterion (location, age, plan type)
  </li>
  <li>
    I want to safely do a progressive or gradual rollout for a potentially high
    impact feature, expose to 10% at first then gradually increase
  </li>
</ul>
<p>Example of Experimental feature flags</p>
<ul>
  <li>
    I want to learn if the new version of an existing feature, or an entirely
    new feature, has a positive or negative impact on my business metrics
  </li>
</ul>
<p>Example of Operational Control</p>
<ul>
  <li>
    If this feature were to have an issue, it could potentially impact revenue
    or conversions, I want the ability to quickly revert back to the previous
    steady-state
  </li>
</ul>

## When to Retire a feature flag

<p>
  <span class="il">Now that you have feature flags in production, what are the indicators you might establish for when to retire a flag.</span>
</p>
<ul>
  <li>
    Feature flags that have not been modified within the past 30 days = eligible
    for retirement
  </li>
  <li>
    Feature flags that have received no traffic in the last 7 days = eligible
    for retirement
  </li>
  <li>
    Metrics show that you the feature flag has proven the feature should be rolled
    out to everyone or removed from code = eligible for retirement
  </li>
</ul>
<p>
  To surface the feature flags that fall into the first two criteria, within the
  Environments tab in your Split dashboard you have the option to filter by;
</p>
<ul>
  <li>Active feature flags</li>
  <li>Killed feature flags</li>
  <li>
    Feature flags that have received traffic in the last 7 days
  </li>
  <li>
    Feature flags that have received no traffic in the last 7 days
  </li>
  <li>Feature flags that have seen no traffic at all</li>
  <li>
    Feature flags that have been modified in the last 7 days
  </li>
  <li>
    Feature flags that have not been modified in the last 30 days
  </li>
</ul>
<p>
  <img src="https://help.split.io/hc/article_attachments/30833457109645" alt="feature_flag_lifecycle_management.png" />
</p>

## For Consistency

<ul>
  <li>
    <span>Before removing a feature flag from code, ensure that everyone in the population is receiving the same intended treatment, essentially rolled out to 100%</span>
  </li>
</ul>

## Incorporating into your existing process

<div>
  <ul>
    <li>
      As part of the project within the existing Jira ticket (or the feature
      tracking tool of your choice) you can create a subtask for retiring the
      feature flag with a specific due date or time period
    </li>
    <li>
      There could also be a subtask within the ticket that states a mandatory
      feature flag review/kill date
    </li>
    <li>
      Schedule a recurring cadence for the team to review and retire eligible
      feature flags
    </li>
    <li>
      Adopt a process to add a <em>retire</em>tag on the feature flag
      once the rollout or experiment is complete
    </li>
  </ul>
</div>