---
title: Trellis Factors
description: Use the Trellis Factors to define the threshold for your Trellis Metrics calculation.
sidebar_position: 15
sidebar_label: Trellis Factors
---

:::info
The Trellis Factors feature is currently in BETA and is behind the Feature Flag SEI_SHOW_TRELIS_NEW_INTERVAL and SEI_TRELLIS_BY_JOB_ROLES. Contact [Harness Support](mailto:support@harness.io) to enable this feature.
:::

The Trellis Central Profile is where you customize the factors and weights used to calculate the Trellis Scores in the SEI module. The Trellis Scores feature provides a proprietary scoring mechanism to evaluate and understand your engineering team's productivity based on factors such as code quality, code volume, speed, impact, proficiency, and collaboration. In the Trellis Central Profile, you can adjust the weight assigned to each factor when calculating the overall Trellis Scores.

This topic explains the improved user experience for configuring and managing Trellis Central Profile, customizing Trellis Groups, and defining thresholds for the factors included in the profile to calculate Trellis Scores.

:::info CRITERIA TO CONFIGURE THE TRELLIS FACTORS

The following permissions are needed to customize the Trellis Central Profile or the Trellis Factors:

1. To perform **Admin Level** operations on the **Trellis Central profile**, you need to have **Edit & Manage** access to **SEI Configuration Settings**
2. To configure **Trellis Sub-Profiles** i.e. **Collection** specific Trellis profiles, one must have **Collection Edit/Create** access to the SEI project
3. At least one **Contributor** with an associated **Email ID** must be present in the newly created account. For more information, go to [Contributors](/docs/software-engineering-insights/sei-projects-and-collections/manage-contributors).

:::

The two main components while configuring the Trellis Factors are:

* [Trellis Central Profile](#trellis-central-profile)
* [Trellis Groups](#trellis-groups)

## Important concepts

### Trellis Central Profile

The **Trellis Central Profile** allows you to personalize the shared standards and thresholds for determining the Trellis Score across all teams within your account. You can further customize these standards at the Collection level, creating new Trellis sub-profiles. These customized sub-profiles will be automatically associated with their respective Collections. Note that customizing the sub-profiles does not change the original Trellis Central Profile settings.

Every newly created Collection is automatically associated with the Trellis Central Profile by default. This means the Trellis Profile settings are enabled for both the new Collection and the Root Collection created during initial project setup.

![](../static/trellis-central-profile.png)

### Trellis Groups

**Trellis Groups** represent **Custom Attribute** based **Trellis Sub-Profiles** within the Central profile. Trellis Groups allow you to customize the trellis calculation settings and thresholds for specific attributes. This provides a more granular and personalized way to calculate Trellis Scores.

With Trellis Groups, you can fine-tune how factors like Code Quality, Volume, Speed, Impact, Proficiency, and Collaboration are evaluated. The customizations are based on the responsibilities and expectations associated with different custom attributes. For example, you could create separate calculation rules for different engineering roles.

The **Default Group** covers all items that don't belong to any other defined Trellis Group. You can also customize the **Factors and Weights** for the Default Group.

## Configure the Trellis Central profile

To configure the Trellis Factors, please follow the steps below:

### Step 1: Enable Trellis Score Calculation

:::info
You can skip this step if you already have Trellis Score Calculation enabled in your Collection definition
:::

Go to the Collection where you want to calculate Trellis Score and enable the Trellis Score option. Note that every newly created Collection is automatically associated with the Trellis Central Profile by default.

### Step 2: Customize the Trellis Central Profile

* In your Harness Account, select the Trellis Factors under Profiles.
* You will land on the **Trellis Central Profile** settings. This is where you can add, edit, delete Trellis Groups and enable/disable the Factors impacting the Trellis Calculations.

### Step 3: Add Trellis Groups

* Click on **Add Trellis Groups** to create a unique group and define matching criteria for identifying users based on custom contributor attributes like `Role` and `Location`.
* Make sure that the Trellis group name and matching criteria are unique.

![](../static/trellis-groups.png)

### Step 4: Add Filters

**Filters** are the criteria/conditions that determine which contributor fall into each sub-group.

To set up these Filters:

* Define the specific conditions for each filter. This involves selecting attributes from the `USER ATTRIBUTES` dropdown, setting the condition from the `CONDITIONS` dropdown, and then specifying the `VALUE` for that condition.
* You can add multiple conditions for the same Trellis Group allowing you to create a more accurate and granular level definition for each sub Trellis Group.
* Note that while creating the **Filters** for Trellis Groups you cannot add identical or conflicting conditions for two or more Trellis Groups. This is important because each contributor should only be part of one sub profile. 

:::info
Note that adding a Contributor to two or more sub-profiles is not supported.
:::

### Step 5: Define the Factors and Weights

**Factors** are the items (Quality, Impact, Volume, Speed, Proficiency, and Leadership and Collaboration) that contribute to your Trellis Score.

* Enable and disable individual factors to include or exclude them from your Trellis Score calculation.
* Adjust the weight of each factor. Assign a low weight (1-5) to make less important factors have a lower impact on your score. Assign a higher weight (5-10) to make more important factors have a higher impact on your score.
* Weights are relative. For example, if all factors are weighted 5, then all factors are still equal.

In the sub sections for the individual Factors, you can:

* Adjust the metrics that are included in each factor's calculation.
* Define target performance ranges for each metric. These ranges will be considered for the rating calculation.

### Step 6: Save the Central Profile

Once you've completed configuring the settings for the Trellis Central Profile, click on Save and Publish Changes to save the default settings based on which Trellis Scores will be calculated.

## Configure the Trellis Factors for a specific Collections

When a new Collection is created, it is automatically associated with the Trellis Central Profile by default. However, you can customize the Trellis factors for a specific Collection:

* In your **Harnesss Account**, select your **Project**.
* Select **Collections** in the left-navigation menu.
* Select the **Collection** where you want to customize the **Trellis Factors** contributing to the **Trellis Metric** calculations.
* Enable the **Trellis Contributor Scoring** option (if disabled).
* Customize the **Factors** or **Trellis Groups** as needed. 
* Save the Collection settings.

This will create a new **Collection Specific Trellis Profile** that is derived from the existing Central profile.

In a **Collection-Specific Profile**, any Trellis Groups added by Admins at the Central level are automatically included, but remain disabled by default. This allows the Collection Admin to decide which Groups are relevant for calculating Scores in their Collection.

If Trellis Groups are removed from the Central Profile by the SEI Admin, they are also automatically removed from all Collection-level Profiles.
Changes made by the Collection Admin to their Collection-Specific Profile can be applied to all existing Collections they have access to, including child Collections.

:::info
Users with the **SEI Collection Admin** role cannot create new Trellis Groups or make changes directly to the central **Trellis Central Profile**. They can only customize the Trellis Score Calculation settings for their specific Collections.
:::