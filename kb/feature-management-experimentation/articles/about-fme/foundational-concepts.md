---
title: Foundational concepts
sidebar_label: Foundational concepts
helpdocs_is_private: false
helpdocs_is_published: true
description: Take a minute to learn the foundational concepts of Split’s Feature Data Platform
sidebar_position: 1
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360025335091-Step-4-Create-a-metric-monitor-and-measure-the-impact </button>
</p>

Take a minute to learn the foundational concepts of Split’s Feature Data Platform.

# What is a feature flag?
A feature flag wraps or gates a section of your code, allowing it to be selectively turned on or off remotely with precision, down to the level of an individual user, at any time, without a new code deployment.

# Decouple your deploy from your feature release
Feature flags allow you to decouple your deploy from your release, so your work in progress and new features are deployed in a turned-off state to any environment, which includes production, without impacting your users. 

# Control your release with targeting rules
Once your code is deployed, you can instantly turn on or off features for any individual user, group of users, or percentage of users, by creating or updating targeting rules. This approach facilitates faster software delivery practices with greater safety, including: 

* Trunk-based development to reduce time lost merging code branches
* Testing in production to allow dev, QA, and stakeholder review without impacting your users
* Early access or beta testing for a subset of your users in production
* Canary releases and monitored rollouts to limit the blast radius of release incidents
* Instant kill switches to shut off exposure to a feature without rollback or redeploy
* Infrastructure migration without downtime or risk of data loss
* Experimentation and A/B testing to make bigger bets with less risk

# The role of data in Split
The Split Feature Data Platform provides visibility into your controlled releases by comparing data about feature flag evaluations with data about what happened after those evaluations. The data points that feed those comparisons are impressions and events. The results of those comparisons are called metrics.