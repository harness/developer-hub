---
title: Define feature flag treatments and targeting
sidebar_label: Target with flags
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360020791591-Define-feature-flag-treatments-and-targeting <br /> ✘ images still hosted on help.split.io </button>
</p>

# Define feature flag treatments and targeting

Afer you [create a feature flag](https://help.split.io/hc/en-us/articles/9058495582349-Create-a-feature-flag), you can define treatments, dynamic configurations, and targeting rules. 

This allows you to deploy features for internal testing and beta releases. You can also progressively roll out features to your production environment.

Feature flag ___treatments___ represent feature variations, with a given variation returned from the feature flag for a given user ID, as defined by the flag's targeting rules.

This article provides an overview of creating a feature flag definition for a given environment, and links to articles with more specific configuration details.

# Create a feature flag

On the [Create a feature flag]((https://help.split.io/hc/en-us/articles/9058495582349-Create-a-feature-flag) pane, create a feature flag by filling in metadata useful to your team.

# Initiate your feature flag definition for a given environment

Initiating your feature flag definition for a given environment will create an initial set of treatments and a targeting rule that you can modify. 

If a feature flag definition is not initiated for an environment, the following page appears:

<p class="wysiwyg-indent4">
  <img src="https://help.split.io/hc/article_attachments/30743834991629" alt="create_a_feature_flag_environment.png" width="1000" />
</p>

To initiate your feature flag definition for an environment, do one of the following:

* Start defining treatments and targeting rules by clicking the **Initiate environment** button.
* Fast track by copying this flag's definitions from another environment. In the Copy from field, select the environment from which you would like to copy this flag's definitions and click the **Copy** button.

Once the feature flag definition exists for a given environment, the feature flag definition tab will show treatments and targeting rules similar to the following:

<p class="wysiwyg-indent4">
  <img src="https://help.split.io/hc/article_attachments/30743227189645" alt="targeting-main-view.png" width="850" />
</p>

You will be able to modify the feature flag treatments, dynamic configurations, and targeting rules before saving. This allows you to configure your feature flag for a given environment.

The next sections guide you through configuring your feature flag definition.

# Setting up treatments

Treatment names are strings that are returned when you evaluate the feature flag in your code.

In the [Treatments](https://help.split.io/hc/en-us/articles/360020525112) area, do the following:

1. Enter the name of each treatment and optionally enter a description.
2. Optionally, click **Add treatment** to add additional treatments.
3. Select the [default treatment](https://help.split.io/hc/en-us/articles/360020528192-Default-treatment). This treatment will be served to everyone if the feature flag is [killed](https://help.split.io/hc/en-us/articles/360020794271-Use-the-kill-switch). This treatment is also served to all traffic not exposed to the feature flag (if you _Limit exposure_ when [setting up targeting](#setting-up-targeting)).

# Setting up dynamic configuration

In the [Dynamic configuration](https://help.split.io/hc/en-us/articles/360026943552-Dynamic-configuration) area, optionally define custom JSON or Key-value pairs that you can retrieve in your code. This allows you to add dynamic configurations to your feature variations.

# Setting up targeting

Targeting defines how your feature flag will be evaluated for a given user ID (user key). You can add inidividual user IDs to your targeting rules.

:::tip[Tip: Think outside the box for User IDs]
You can target customers or users based on their user ID (user key). When evaluating a feature flag, you can use any string as a user ID.

Here are a few examples:
- annonymous user ID
- logged in user ID
- account number

Be mindful of using random user IDs, as [overuse of random IDs](https://help.split.io/hc/en-us/articles/26978089134349-MTK-Usage-and-Comparing-Counts#use-of-unstable-ids) can increase your MTK count (and [costs](https://help.split.io/hc/en-us/articles/360034159232-Account-usage-data)) unnecessarily.
:::

Targeting rules have a limit of 500 user IDs, so we suggest creating a [segment](https://help.split.io/hc/en-us/articles/360020407512-Create-a-segment) if you need to target a large number of user IDs.

To set up targeting, you can use the Individual targets area and/or the Targeting rules area. Both are described below.

## Individual targets

In the Individual targets area, you can:

Click the **Add new individual target** button to assign a selected treatment to individual users or segments (e.g., a QA team, internal team, or a limited beta), as shown below.

<p>
  <img src="https://help.split.io/hc/article_attachments/32101070992397" alt="targeting_customers_individual.png" width="850" />
</p>

## Targeting rules

In the Targeting rules area, you can:

* Optionally click the **Limit exposure** button to limit [the traffic exposed](https://help.split.io/hc/en-us/articles/360020525572-Limiting-exposure) to your attribute based targeting rules. For example, you can limit the customers exposed to your experiment to the percentage you choose. Users who are not exposed get the default treatment.

* Click **Add attribute based targeting rules** to assign individual users or segments to a selected treatment or percentage distribution.

  Within attribute based targeting rules, you can:

    * [Target with custom attributes](https://help.split.io/hc/en-us/articles/360020793231-Target-with-custom-attributes) to target specific subsets of your users based on a specific attribute (e.g., location or last-login date).

    * [Target with dependencies](https://help.split.io/hc/en-us/articles/360020527652-Target-with-dependencies) to target users based on the treatment they received from another flag. You can use flag dependencies to create mutually exclusive experiments. 

    * Optionally select **Distribute treatments as follows** and define a ___percentage distribution___ to [randomly distribute](https://help.split.io/hc/en-us/articles/360030024391-How-does-Split-ensure-a-consistent-user-experience) users and segments between your feature flag treatments (variations) based on the percentages you decide. This is also called a _percentage rollout_, as shown below.

  <img src="https://help.split.io/hc/article_attachments/32101075980941" alt="targeting_customers_attribute_based.png" width="850" />

:::tip[Distribute treatments by percentage to enable experimentation]
If you have at least one targeting rule with ___percentage distribution___, then you can ___compare metric results between feature flag treatments___ (on the [Metrics impact tab](https://help.split.io/hc/en-us/articles/360020844451-Metrics-impact-tab)).
:::

# Setting the alert baseline treatment

In the [Set alert baseline treatment](https://help.split.io/hc/en-us/articles/360029566292-Set-the-alert-baseline-treatment-) area, select a baseline treatment that will be used for your alert policies.

:::tip[Set the alert baseline treatment to enable alerting]
If you set the ___alert baseline treatment___ AND you have at least one targeting rule with ___percentage distribution___, then you can receive ___[feature flag alerts](https://help.split.io/hc/en-us/articles/19832711328397-Configuring-feature-flag-alerting)___ and ___[metric alerts](https://help.split.io/hc/en-us/articles/19832312225293-Configuring-metric-alerting)___.
:::

# Rules evaluation order

The rules are evaluated in the following order:

* The first evaluation is against the individual target section. User IDs and segments listed in this section receive the specified treatment.
* The second evaluation is against the traffic allocation. If the limit exposure is set to 100%, we continue to the targeting rules section. If the limit exposure less than 100%, we allocate a percentage of your traffic to the default treatment selected in the user interface or into the targeting rules and default rule.
* The third evaluation is against the targeting rules. The conditions are structured as layered if/else statements and are meant to be human readable. They are evaluated in order and when a condition is met, the evaluation stops.
* The fourth evaluation is against the default rule. The remaining traffic is allocated based on the distribution set in the default rule.
