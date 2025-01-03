---
title: Introduction
sidebar_label: Introduction
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360025035812-Introduction <br /> ✘ images still hosted on help.split.io </button>
</p>

Welcome to Split! This article walks through setting up your Split instance, installing the Split SDK, and creating your first feature flag to release rapidly and safely with feature flags and measure impact with experimentation. Specifically, it covers:

* [Step 1: Install the SDK](https://help.split.io/hc/en-us/articles/360025334751-Step-1-Install-the-SDK)
* [Step 2: Create a feature flag and target users](https://help.split.io/hc/en-us/articles/360025334851-Step-2-Create-a-split-and-target-users)
* [Step 3: Send event data](https://help.split.io/hc/en-us/articles/360025335031-Step-3-Send-event-data)
* [Step 4: Create a metric, monitor and measure the impact](https://help.split.io/hc/en-us/articles/360025335091-Step-4-Create-a-metric-and-measure-impact)

For additional information or to start into reference docs, explore our help center to find feature reference guides, best practices, video walkthroughs and frequently asked questions.

* [Install](https://help.split.io/hc/en-us/categories/360001534111-Install): Learn how to install Split’s SDKs to control feature flags in your application [here](https://help.split.io/hc/en-us/categories/360001534111-Install).
* [Setting up your account](https://help.split.io/hc/en-us/categories/360001534151-Administer): Learn about managing and maintaining your Split account and users [here](https://help.split.io/hc/en-us/categories/360001534151-Administer).
* [Feature flagging & configuration](https://help.split.io/hc/en-us/categories/360001538072-Target-Configure): Understand how to target your customers using Split’s feature flags [here](https://help.split.io/hc/en-us/categories/360001538072-Target).
* [Monitoring & experiment](https://help.split.io/hc/en-us/categories/360001538172): Measure impact and make data-driven decisions with experimentation [here](https://help.split.io/hc/en-us/categories/360001538172).
* [Integrate & automate](https://help.split.io/hc/en-us/categories/360001538192-Integrate): Understand Split’s API and connect Split with the solutions you use today [here](https://help.split.io/hc/en-us/categories/360001538192-Integrate)
* [Working as a team](https://help.split.io/hc/en-us/categories/360001538152-Collaborate): Functionality for teams that need more controls and additional organization [here](https://help.split.io/hc/en-us/categories/360001538152-Collaborate).
* [Securing your data](https://help.split.io/hc/en-us/categories/360001551491-Secure): Carry your security best practices through into Split [here](https://help.split.io/hc/en-us/categories/360001551491-Secure).
* [Support](https://help.split.io/hc/en-us/categories/360000489832-Support-and-Training): Understand support definitions and incident response times [here](https://help.split.io/hc/en-us/categories/360000489832-Support-and-Training).

Want to watch step by step videos?  Explore all our video content [here](https://help.split.io/hc/en-us/articles/360025949151-Split-Videos).

# Getting started

## Create an account / join an account 

We assume you’ve created an account already, but if not, sign up [here](https://www.split.io/signup/).  If your team has an account, an admin can invite you from the users page in admin settings.  

## Understand accounts and projects

When you sign up you are sent a link to create an account. We utilize your company name as the account name. This can be changed later in your account's admin settings.  

Within this account, you can create multiple projects. Your company should have one account in Split but can have multiple projects within that account.  When you first create your account, you'll have one project named Default. This project has two environments and one traffic type underneath it. You can rename and edit these environments and traffic types as well as add more.

Projects allow you to separately manage your feature flags and experiments across your different business units, product lines, and/or applications. Each project in Split has its own separate set of environments, SDK API keys, feature flags, segments, metrics, and event types. 

Learn more about [projects](https://help.split.io/hc/en-us/articles/360023534451).

## Understand environments, traffic types, and API keys

Environments allow you to manage your feature flags throughout your development lifecycle — from local development to staging and production. When you first create your account, your project is provided with two environments. These two environments are named staging and production, and can be re-named. Learn more about [environments](https://help.split.io/hc/en-us/articles/360019915771).

Each environment is automatically set up with its own API keys. Use these API keys to connect the Split SDK to a specific environment. If you are setting Split up with a server side SDK, be sure to use the server API key type. If you are setting Split up in the browser or on a mobile client, be sure to use the browser API key type. If you are interested in using Split’s public API, create an admin API key type. Learn more about [API keys](https://help.split.io/hc/en-us/articles/360019916211).

Use traffic types to easily identify the customer traffic you are splitting. A traffic type is a particular identifier type for any hierarchy of your customer base. Traffic types in Split are customizable and can be any key you choose to send to Split, i.e. a user ID, team ID, IP address, browser ID, etc. Essentially, any internal database key you're using to track what "customer" means to you. When you first create your account, your project has one traffic type - user - but you can easily create additional like guest or anonymous. Learn more about [traffic types](https://help.split.io/hc/en-us/articles/360019916311).