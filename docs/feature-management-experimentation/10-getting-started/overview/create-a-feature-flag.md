---
title: Create a Feature Flag and Target Users
sidebar_label: Create a Feature Flag and Target Users
description: Learn how to create a feature flag and target users in Harness FME.
sidebar_position: 2
---

## Overview

You can create a feature flag in three steps:

1. [Set your feature flag name](#set-your-feature-flag-name-and-information)
1. [Add your feature flag to an environment](#add-your-feature-flag-to-an-environment)
1. [Decide who sees what version of your flag](#decide-who-sees-what-version-of-your-feature-flag)

## Set your feature flag name and information

To create your first feature flag, from the left navigation, click **Feature flags** and then **Create feature flag** button. From there, enter the flag name.

Select the traffic type user to get started. Traffic types give you the ability to split on different levels of your customers (e.g., for B2B software, you could create the traffic type account or user). You can also create additional traffic types in settings. Learn more about [traffic types](/docs/feature-management-experimentation/management-and-administration/fme-settings/traffic-types/). We are referring to the traffic type user throughout the rest of this document.

Owners, tags, and the description make it easy to sort, filter, and locate the features your team is rolling out. By default, administrators and the creator of the feature flag are considered its owners. Utilize groups with this owner field to organize your flags across your team. Learn more about owners and tags.

For more information about creating a feature flag, see [Create a feature flag](/docs/feature-management-experimentation/feature-management/setup/create-a-feature-flag/).

## Add your feature flag to an environment

To configure your feature flag for a particular environment, select the environment and click the **Initiate environment** button. You can create and define targeting rules, including treatments.

## Decide who sees what version of your feature flag

Treatments are the different variants or versions of your feature flag that you serve to your users. When you click the **Initiate environment** button, the Definition tab for a particular flag appears. Use this tab to assign your treatments. 

We default the treatment names to on and off for each new feature flag but you can edit these names and add additional treatments. The default treatment selected in the treatments section will be served to everyone if the feature flag is killed and to all traffic not exposed to a flag. For more information about the default treatment, see [Set the default treatment](/docs/feature-management-experimentation/feature-management/set-the-default-treatment).

After your treatments are set up and the default treatment is chosen, you can set individual targets, limit exposure, and set targeting rules to explicitly assign treatments or set targets based on dependencies or demographic data as attributes.

* Set individual targets: Allows you to explicitly assign individual users or groups of users to one treatment.
* Limit exposure (advanced): Allows you to randomly assign a percentage of your users to be evaluated by all the targeting rules that are not individual targets. This feature is recommended for advanced experimentation use cases.
* Set targeting rules: Allows you to build out if/else statements to use demographic data as attributes to assign treatments to users and  build dependencies with other features you manage in Split.

Click **Save changes** to configure the rules for this feature flag in the environment you selected. Learn more about [targeting](/docs/feature-management-experimentation/feature-management/define-feature-flag-treatments-and-targeting).

Now that you've set up this feature flag's targeting rules, let's take a look at how this flag would work in your code. To implement this feature flag, copy and wrap the provided code snippet around your feature's treatments. 

You can find the code snippet in the syntax in the menu next to **Save changes**. Select the language of your application and use the `getTreatment` method to decide which treatment is served to your users. 

Below is an example in JavaScript. Learn more in the basic use section of each SDK reference guide ([JavaScript example](/docs/feature-management-experimentation/sdks-and-infrastructure/client-side-sdks/javascript-sdk#basic-use)).

```javascript
var treatment = client.getTreatment('SPLIT_NAME');
if (treatment === 'on') {
    // insert code here to show on treatment
} else if (treatment === 'off') {
    // insert code here to show off treatment
} else {
    // insert your control treatment code here
}
```

To help verify that treatments are being served to your users, click the [Live tail tab](/docs/feature-management-experimentation/feature-management/live-tail/) to view a stream of impressions or SDK evaluations. Impressions occur whenever a visitor is assigned a treatment (i.e., variations) for a feature flag. 

These impressions are generated by the SDKs each time `getTreatment` is called. They are periodically sent back to Split's servers where they are stored and can be accessed for later use. For more information about impressions, see [Impressions](/docs/feature-management-experimentation/feature-management/monitoring-analysis/impressions).