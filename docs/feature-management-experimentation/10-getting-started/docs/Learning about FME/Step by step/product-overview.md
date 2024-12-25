---
title: Project overview
sidebar_label: Project overview
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360016583411-Videos-Product-overview <br /> ✘ images still hosted on help.split.io </button>
</p>

## Introduction

Let’s start with a bit of context.  Split is a product decisions platform for engineering and product teams to rapidly - and safely - deliver valuable software to customers. Split provides a unified feature flags and experimentation solution that is built for teams of any size to make data-driven decisions.

## Maturity Curve

Feature flags form the basis of the platform, driving the risk out of continuous delivery and streamlining the development process. Flags allow you to assess application stability before customers are exposed to a feature, and a framework for Agile teams to release faster with less risk, including a kill switch to shut down a feature within seconds.  

Functional and performance issues are mission critical concerns for any application.  Key engineering metrics such as API response and page load time can be impacted by each feature. Split correlates relevant engineering KPIs back to the feature changes that are impacting them. While granular user targeting supports robust phased rollout plans.

So, you can release faster, but what does it matter if you are not releasing value? Experimentation provides development teams with a direct link to the customer for unprecedented feedback. Split’s real-time analytics engine measures the impact of feature changes on business outcomes.  

As we move up the maturity curve, teams can quickly iterate and refine functionality to deliver innovation faster and increase time to value.

![](https://help.split.io/hc/article_attachments/360027443431/mceclip0.png)

## Architecture and Data Flow

Before we dive into the product, let’s spend a moment looking at the architecture and data flow. The management console is where the user interacts with the Split platform.  There’s also an API that allows you to automate many of the actions a user might take. 

Behind the UI are the feature flagging functionality and analytics engine, which combine to capture and evaluate user impressions, and correlate those to business value.

In addition, the platform is built with security and high availability in mind, along with third-party integrations to better leverage Split within your environment.

![](https://help.split.io/hc/article_attachments/360027446032/mceclip1.png)

Let’s look at the data flow in a little more detail. Split provides implementation options to meet your requirements. By far, the most common is to install the Split SDK in your application, whether using JavaScript, IOS or Android on the front end or any of the most common back end platforms. 

When feature flags are created, the rollout plans are sent to the SDK, where they are cached, and automatically kept up to date as changes are made.

Because Split is a self-contained decisioning engine installed in your application, any data you use to target, even if personal data, is kept private and never sent to Split, or anywhere outside of your environment.

In addition, because evaluations are executed in memory, Split is lightning fast, eliminating the potential negative impact on the performance of your application.

![](https://help.split.io/hc/article_attachments/360027446312/mceclip2.png)

When the evaluation is made whether or not to expose a feature to the user, the impressions are returned to Split along with the information necessary to track who’s seen what.

We can also correlate impression data with any events you track that occur in your application to, perhaps, understand how a feature impacts page load time, or if it’s having the desired business impact.

## Feature Flag Objects

Before taking a quick tour of the application let’s review a few key terms. The environment dashboard, which is central dashboard for navigating within the application, is where we’ll start when we look at the platform.

There are 3 primary objects in the platform: a **feature flag** is the main object, encompassing the definition of the feature flag, the rollout plan and where ongoing changes are managed.

The second object is called a **segment**, which is a list of IDs used for targeting. For example, you might put a set of users into a beta list and then you can easily target all the beta users by just using that segment.  You can expand that list with additional segments, essentially testing in production.  Entitlements are another common use of segments.

Finally, **metrics** represent how you combine impressions from feature flags with events from your application, allowing you to measure the efficacy and impact of features.

![](https://help.split.io/hc/article_attachments/15632585411213)

Environments usually reflect your software development lifecycle, such as dev, QA, staging, and production. We can filter feature flags in a variety of ways, such as traffic received, active vs. killed and last updated.  We can filter by traffic type, which we’ll cover in the video on creating a feature flag, and tags, such as backend or university.

Let’s take a look at the UI for feature flags.  We can narrow the left nav bar, which gives us the option to pin the list of feature flags. As you can see, it's an intuitive, forms-based interface.  

We can choose this feature flag, which is rolling out a new feature for doing course registrations.  At the moment, there are two treatments, either you get the new feature, or you don’t, in this case based on a random 50/50 flag targeting setup of all users. Otherwise, the feature is dark.

![](https://help.split.io/hc/article_attachments/15635373384845)

Segments allow us to create groups of users or accounts. For example, as we just saw, a list of beta schools. I might also create a list for entitlements, such as an early access group, or QA teams for pre-production testing.

Metrics allow you to take events, such as a user completing an action, in this case approving a grade, or a page load time, or a registration, and associating those events with an impression: was the user exposed to the feature. 

The goal is to determine if we are getting the desired outcome for specific features. Did registrations increase, or page load times decrease?

Finally, there are in product help links available, which include the documentation, our knowledge base and release notes. And, if you want to contact us, click on contact us.

Now that we’ve done an overview of Split’s capabilities, architecture and UI, you can find additional videos that cover creating and configuring feature flags and using metrics to control rollouts, experiment with features and make product decisions to safely deliver valuable software, fast. 