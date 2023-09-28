---
title: Best practices for managing flags
description: Best practices when using Harness Feature Flags.
tags: 
   - helpDocs
sidebar_position: 20
helpdocs_topic_id: 2ltqamulhy
helpdocs_category_id: iqgyied1c0
helpdocs_is_private: false
helpdocs_is_published: true
---

To help you get the most out of your Feature Flags, we’ve drawn up some best practices that you can implement to manage them. The points below aren’t mandatory but they can help you organize your Flags and plan for the future so you don’t have to revise them at a later date.

For a more detailed discussion on this topic, go to the tutorial [Feature Flags best practices](/tutorials/feature-flags/best-practices).

## Plan your Feature Flags

Before you even create a Feature Flag, it’s best practice to create a plan for it. While planning, there are a number of things to consider: 

### Flag use cases

Decide on what the flag will be used for and how it will be used by your team, remember to think about the following:

* The purpose of the flag, for example, if it will be used for a feature release, experiment, or to give particular users certain permissions.
* Who the flag will be toggled on and off for.
* When the flag will be toggled on and off.
* Which environments you’ll use the flag in.
* Whether the flag will be temporary or permanent. For example, if you’re testing a new feature, you might create a temporary flag that you can later delete after the feature has been successfully released. A permanent flag could be used for daily operations such as ensuring only users with certain roles have access to features.
* If the flag will impact any other flags you have already created, or if any other flags will impact the new flag you’re creating.
* Whether you need a simple Boolean flag, or a Multivariate flag. If there is a chance your flag will need to have more than two variations in the future, it’s best to create a Multivariate flag to give yourself the flexibility to add more variations later.

### Default flag variation

The variations of your flags determine what will be served to your users. When deciding the default flag variation, consider what is an intuitive variation for what you’re using the flag for. For example:

* If you are using a flag to release a feature, you create a Feature Enabled and Feature Disabled variation. Feature Disabled = False and Feature Enabled = True. The variation that you assign to False is always the default until you change it, so it is easy to understand that when Feature Enabled is toggled on, the feature is then switched on, for example:![A screenshot showing variations for enabled flags and disabled flags.](./static/1-feature-flag-best-practices-02.png)
* However, if you are deprecating a feature, the opposite makes sense. The default False variation is called Feature Enabled and  Feature Disabled = True. Therefore, when you toggled the flag on, the feature is switched off, for example:![A screenshot showing variations when a flag is enabled and diabled.](./static/1-feature-flag-best-practices-03.png)

### Flag dependencies

Determine if the flag needs prerequisite flags and be prepared to add them. For example,  if you have a flag for front-end changes that depends on back-end changes being implemented first, you can add a prerequisite that the back-end flag must be turned on before the front-end flag is turned on. 

### Rollout rules

Create a set of rules with your team to ensure your rollouts run smoothly. There are a number of Harness Features you can utilize to help with this, such as using [approval steps in pipelines](/docs/feature-flags/ff-build-pipeline/build-feature-flag-pipeline) or using the [Harness Policy Engine](/docs/feature-flags/harness-policy-engine). When creating roll out rules, it’s important to consider:

* Types of roll outs you may run, and the strategy for each.
* Rules that must be applied for all roll outs, for example, a rule stating that a flag cannot be switched on in your production environment until it has been tested in your QA environment for one week.

## Name your flags well

It is likely that you’ll use many flags and it’s important to keep them organized and easy to understand what they are used for. One of the easiest ways to  stay on top of them is to implement a naming convention that you follow for all flags Things to consider when creating a naming convention are: 

* Flag names should be unique. Although on the Harness Platform, only unique identifiers are enforced, it’s good practice to keep your flag names unique too so your team don’t confuse them.
* Make the names user friendly; they should describe what the flag does. For example, EnableVersion2UI describes that the flag enables Version 2 of the user interface.
* If your flags are specific to a team, consider adding the team to the flag name, for example, Dev\_EnableVersion2UI.
* To help with keeping your naming consistent, you could use the [Harness Policy Engine to enforce it](/docs/feature-flags/harness-policy-engine).
* Don’t forget to tell your whole team what the naming convention is, so that anyone who creates a flag uses the correct convention.

## Add descriptions to your flags

Add a description to your flag. This is optional on the Harness Platform, but we highly recommend it as it can provide much more information than the flag name alone. The description should be short but include relevant details, for example, you could include:

* The contact information for who is responsible for that flag.
* How long the flag should be active for.
* Any prerequisite flags that need to be toggled on before you use this flag.
* Links to information or tickets related to the flag.

![An example flag description](./static/1-feature-flag-best-practices-04.png)To help with this, you can use the [Harness Policy Engine to enforce descriptions](/docs/feature-flags/harness-policy-engine) when creating a flag.



import ffimage from './static/1-feature-flag-best-practices-04.png';
<img src={ffimage} alt="An example flag description" height = "300" width = "600"/>


## Manage targeting with target groups

When using Feature Flags, you select targets to serve a particular variation of the flag to, for example, serving True to enable a feature for some users and False to disable the feature for others. We often refer to targets as users, but a target can be anything that can be uniquely identified such as a user, an application, a machine, or any resource uniquely identified by an IP address, email ID, user ID, etc.

As you’re likely to have many targets, we recommend that you organize them by creating target groups and adding the relevant targets to them, so you can add the group rather than each individual target when serving a flag variation. You can add targets to a group based on conditions you set instead too, instead of adding each one individually. 

## Remember your environment

As flags can have different states in different environments, when using them, make sure you remember to switch the flag on or off in the correct environment. 

## Delete old flags

Remember to delete flags after you have finished with them to keep your code clean and organized. For example, you could do a flag clean-up sprint at the end of each quarter, or add a flag clean-up story to each epic to ensure you are removing out-of-date flags. 

