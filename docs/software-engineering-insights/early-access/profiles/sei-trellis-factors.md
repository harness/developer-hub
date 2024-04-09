---
title: Trellis Factors
description: Use the Trellis Factors to define the threshold for your Trellis Metrics calculation.
sidebar_position: 15
sidebar_label: Trellis Factors
---

:::info
The Trellis Factors feature is currently in BETA and is behind the Feature Flag `SEI_SHOW_TRELIS_NEW_INTERVAL` and `SEI_TRELLIS_BY_JOB_ROLES`. Contact [Harness Support](mailto:support@harness.io) to enable this feature.
:::

The Trellis Scores feature on SEI provides a proprietary scoring mechanism to evaluate and understand your engineering team's productivity. Trellis Scores are calculated from factors such as Code Quality, Code Volume, Speed, Impact, Proficiency, and Collaboration. You can adjust the weight given to each factor in the **Trellis Central Profile** which acts as the single source of truth for your Trellis Score calculations.

This topic outlines the improved user journey for configuring **Trellis Central Profiles**, customising **Trellis Groups**, and defining thresholds for **Factors** associated with Trellis Profiles to calculate Trellis Scores.

The following permissions are needed to calculate the Trellis Scores:

1. To perform **Admin Level** operations on the **Trellis Central profile**, you need to have **Edit & Manage** access to **SEI Configuration Settings**
2. To configure **Trellis Sub-Profiles** i.e. **Collection** specific Trellis profiles, one must have **Collection Edit/Create** access to the SEI project
3. At least one **Contributor** with an associated **Email ID** must be present in the newly created account. For more information, go to [Contributors](/docs/software-engineering-insights/sei-projects-and-collections/manage-contributors).

The two main components while configuring the Trellis Factors are:

1. Trellis Central Profile
2. Trellis Groups

## Important concepts

### Trellis Central Profile

The **Trellis Central Profile** allows you to personalize the standards and thresholds that are shared among all teams within an account for determining the Trellis Score. These standards can be further customized at the **Collection** level that will create Trellis Sub-Profiles and automatically associate the Sub-Profile with the Collection.

Every newly created Collection is by default associated with the Trellis Central Profile. This means that the Trellis Profile will be enabled automatically for both the newly created Collection and the Root Collection that is created automatically during project creation.

![](../static/trellis-central-profile.png)

### Trellis Groups

**Trellis Groups** represent **Custom Attribute** based **Trellis Sub-Profiles** within the defined Central profile. This functionality allows users to customize their trellis calculation settings and thresholds specifically to the custom attributes. For example: Contributor roles. 

This offers a more granular and personalized approach to calculating Trellis Scores.

With Trellis Groups, you can fine-tune the evaluation of factors such as **Code Quality**, **Volume**, **Speed**, **Impact**, **Proficiency**, and **Collaboration** based on the specific responsibilities and expectations associated with different Custom attributes. For example: Contributor Attribute roles in the Engineering team.

The **Default Group** in the profile configuration covers all the items that do not belong to any other defined groups. The **Factors and Weights** associated with the **Default Group** can be customised.

### Add Filters

**Filters** are the criteria/conditions that determine which contributor fall into each sub-group.

To set up these Filters:

* Define the specific conditions for each filter. This involves selecting attributes from the `USER ATTRIBUTES` dropdown, setting the condition from the `CONDITIONS` dropdown, and then specifying the `VALUE` for that condition.
* You can add multiple conditions for the same Trellis Group allowing you to create a more accurate and granular level definition for each sub Trellis Group.
* Note that while creating the **Filters** for Trellis Groups you cannot add identical or conflicting conditions for two or more Trellis Groups. This is important because each contributor should only be part of one sub profile. 

:::info
Note that adding a Contributor to two or more sub-profiles is not supported.
:::

### Factors & Weights

**Factors** are the items (Quality, Impact, Volume, Speed, Proficiency, and Leadership and Collaboration) that contribute to your Trellis Score.

With **Factors and Weights**, you can:

* Enable and disable individual factors to include or exclude them from your Trellis Score calculation.
* Adjust the weight of each factor. Assign a low weight (1-5) to make less important factors have a lower impact on your score. Assign a higher weight (5-10) to make more important factors have a higher impact on your score.
* Weights are relative. For example, if all factors are weighted 5, then all factors are still equal.

In the sub sections for the individual Factors, you can:

* Adjust the metrics that are included in each factor's calculation.
* Define target performance ranges for each metric. These ranges will be considered for the rating calculation.

## Configure the Trellis Central profile

To configure the Trellis Factors, please follow the steps below:

1. In your **SEI project**, go to the **Settings**
2. Select **Trellis Factors** under **Profiles**
3. By default, you will land on the **Trellis Central Profile** settings. Click on **Add Trellis Groups** to create a unique group and define matching criteria for identifying users based on custom contributor attributes like `Role` and `Location`.
4. Make sure that the Trellis group name and matching criteria are unique.

![](../static/trellis-groups.png)

5. Define **Factors and Weights** for each of the **sub profile i.e.** **Trellis Groups** in the Trellis Central Profile. Adjust weights to specific factors such as Code Quality, Volume, Speed, Impact, Proficiency, and Collaboration.
6. You can enable or disable factors contributing to Trellis Score calculations for specific groups. Similarly, you can enable or disable Trellis Groups to control their contribution to the overall scoring.

## Trellis Sub Profiles at the Collection level

Whenever a new Collection is created, it is by default automatically associated with the Trellis Central Profile.

* **Collection Admins** are not allowed to create new Trellis Groups, nor perform CRUD operations on the Trellis Central Profile. Any changes made to factors or Trellis Groups at the collection level will create a new **Collection Specific Trellis Profile** that is derived from the existing central profile.
* When associated with a new **Collection Specific Trellis Profile**, Trellis Groups that are added by admins at the central profile level are added into collection-level settings but remain disabled by default. This configuration allows Collection Admin to have the flexibility to determine which Trellis Groups are relevant when calculating Trellis Scores.
* Similarly, Trellis Groups that are removed by **SEI ADMIN** at the central profile level are automatically removed from the collection-level profiles.
* Changes made by the **Collection Admin** at the profile level can be applied to all existing collections, including child-level collections and those collections to which the Collection Admin has access.