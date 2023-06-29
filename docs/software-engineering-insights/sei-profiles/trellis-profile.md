---
title: Trellis profile
description: Create a Trellis profile to get a Trellis Score.
sidebar_position: 20
---

Trellis Scores are a proprietary scoring mechanism from SEI. Your Trellis Score helps you understand your team's productivity. [Trellis Scores](../sei-metrics-and-insights/trellis-score.md) are calculated from factors such as code quality, code volume, speed, impact, proficiency, and collaboration. You can adjust the weight given to each factor.

To create or edit a Trellis profile:

1. In your Harness project, go to the SEI module.
2. Select **Account**.
3. Select **Trellis** under **Profiles**.
4. To create a profile, select **New Trellis Profile**. To edit an existing profile, select the profile's name in the profiles list.

:::info Predefined Trellis profiles

Some issue management and SCM [connectors](/docs/category/connectors-and-integrations) automatically create predefined Trellis profiles. You can associated predefined profiles with [Org Units](../sei-pivot-points/manage-org-units.md). You can't delete predefined profiles.

<!-- image Trellis_home_add_integrations.png - Trellis Score Profiles before integrating SCM or Issue Management tools -->
<!-- image .gitbook/assets/Trellis\_profiles\_home.png - Trellis Score Profiles page with Predefined profiles -->

:::

## Basic Info

Configure basic information for the Trellis profile, such as a **Name** and optional **Description**.

## Associations

In the **Associations** section of your Trellis profile, map [Org Units](../sei-pivot-points/manage-org-units.md) to the Trellis profile.

<!-- image .gitbook/assets/OU\_mapping\_profile.png - mapping org units in trellis profile -->

### Advanced Options

The **Advanced Options** in the **Associations** section of your Trellis profile contain several optional settings:

* **List the PRs/commits to be excluded from the current Trellis profile:** These settings are useful in scenarios where you want to ignore certain types of PRs and commits.
  * If excluding PRs, note that the commits associated with those PRs are also excluded.
  * If excluding commits, only the commits are excluded. PRs that happen to contain those commits are not excluded.
* **List the development stages involved:** Select the relevant issue management statuses to attribute work done by your team.

<!-- image .gitbook/assets/Status\_mapping\_advanced\_options.png - Associations section - advanced options -->

## Factors and Weights

In the **Factors and Weights** section of your Trellis profile, you can configure the factors (Quality, Impact, Volume, Speed, Proficiency, and Leadership and Collaboration) that contribute to your Trellis Score.

In the main **Factors and Weights** section, you can:

* Enable and disable individual factors to include or exclude them from your Trellis Score calculation.
* Adjust the weight of each factor. Assign a low weight (1-5) to make less important factors have a lower impact on your score. Assign a higher weight (5-10) to make more important factors have a higher impact on your score. Weights are relative. For example, if all factors are weighted 5, then all factors are still equal.

In the subsection for the individual factors, you can:

* Adjust the metrics that are included in each factor's calculation. For information about the metrics behind each factor, go to [Trellis Score](../sei-metrics-and-insights/trellis-score.md).
* Define target performance ranges for each metric.

<!-- image .gitbook/assets/Quality\_factor\_conf (1).png - Adjusting the Quality factor in a Trellis profile -->

### Enable the Impact factor

To include the Impact factor in your Trellis score, you must associate an [Investment profile](./investment-profile.md) with your Trellis profile. This is required because the categories defined in the Investment profile serve as input parameters for the metrics that contribute to the Impact factor.

1. If you haven't done so already, create an [Investment profile](./investment-profile.md).
2. Go to the **Associations** section of your Trellis profile, and select the relevant **Investment Profile**.
3. Go to the **Factors and Weights** section of your Trellis profile, enable the Impact factor, and assign a suitable weight.
4. Go to the **Impact** section of your Trellis profile, and select the metrics and categories that you want to include in the Impact factor.

<!-- image .gitbook/assets/Impact\_profile\_conf.png - Trellis profile - configure impact metrics and categories -->
