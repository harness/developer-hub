---
title: "Step 1: Create a feature flag and target users"
sidebar_label: "Step 1: Create a feature flag and target users"
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360025334851-Step-2-Create-a-feature-flag-and-target-users <br /> ✘ images still hosted on help.split.io </button>
</p>

You can create a feature flag in three steps:

1. Set your feature flag name and meta information
2. Add your feature flag to an environment
3. Decide who sees what variant of your feature flag

These steps are outlined below in more detail below, with links you can use to walk you through each task.

### 1. Set your feature flag name and meta information

To create your first feature flag, click **Feature flags** in the left navigation and click the **Create feature flag** button. From there enter the flag name.

Select the traffic type “user” to get started. Traffic types give you the ability to split on different levels of your customers (e.g., For B2B software, you could create the traffic type "account" or “user”). If you’d like, you can create additional traffic types in settings. Learn more about [traffic types](https://help.split.io/hc/en-us/articles/360019916311). We will refer to the traffic type “user” throughout the rest of this document.

Owners, tags, and the description make it easy to sort, filter, and locate the features your team is rolling out. By default, administrators and the creator of the feature flag is considered its owners. Utilize groups with this owner field to organize your flags across your team. Learn more about [owners](https://help.split.io/hc/en-us/articles/360020582092) and [tags](https://help.split.io/hc/en-us/articles/360020839151). 

Learn more about [creating a feature flag](https://help.split.io/hc/en-us/articles/360020523792).

### 2. Add your feature flag to an environment

o configure your feature flag for a particular environment, select the environment and click the Initiate environment button. You can create and define targeting rules, including treatments.

### 3. Decide who sees what variant of your feature flag

Treatments are the different variant of your feature flag that you serve to your users. When you click the Initiate environment button, the Definition tab for a particular flag appears. Use this tab to assign your treatments. We default the treatment names to on and off for each new feature flag but you can edit these names and add additional treatments. The default treatment selected in the treatments section will be served to everyone if the feature flag is killed and to all traffic not exposed to a flag. Learn more about the [default treatment](https://help.split.io/hc/en-us/articles/360020527672-Set-the-default-treatment).

After your treatments are set up and the default treatment is chosen, you can set individual targets, limit exposure, and set targeting rules to explicitly assign treatments or set targets based on dependencies or demographic data as attributes.

* **Set individual targets**: Allows you to explicitly assign individual users or groups of users to one treatment.
* **Limit exposure** (advanced): Allows you to randomly assign a percentage of your users to be evaluated by all the targeting rules that are not individual targets. This feature is recommended for advanced experimentation use cases.
* **Set targeting rules**: Allows you to build out if/else statements to use demographic data as attributes to assign treatments to users and  build dependencies with other features you manage in Split.

Click **Save** changes to configure the rules for this feature flag in the environment you selected. Learn more about 

Now that you've set up this feature flag's targeting rules, let's take a look at how this flag would work in your code. To split a feature, you can copy and wrap the provided code snippet around your feature's treatments. You can find the code snippet in the syntax in the menu next to Save changes. Select the language of your application and use the `getTreatment` method to decide which treatment is served to your users. Below is an example in Javascript. Learn more in the basic use section of each SDK reference guide ([Javascript example](https://help.split.io/hc/en-us/articles/360020448791-JavaScript-SDK#basic-use)).

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

To help verify that treatments are being served to your users, click the [Live tail](https://help.split.io/hc/en-us/articles/360044867032) tab to view a stream of impressions or SDK evaluations. Impressions occur whenever a visitor is assigned a treatment (i.e., *variation*) for a feature flag. These impressions are generated by SDKs each time getTreatment is called. They are periodically sent back to Split's servers where they are stored and can be accessed for later use. Learn more about [impressions](https://help.split.io/hc/en-us/articles/360020585192).