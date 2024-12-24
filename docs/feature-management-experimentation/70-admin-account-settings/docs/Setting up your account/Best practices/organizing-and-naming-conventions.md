---
title: Organizing and naming conventions
sidebar_label: Organizing and naming conventions
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360011546991-Organization-and-naming-conventions <br /> ✘ images still hosted on help.split.io </button>
</p>

When creating a feature flag (or segment or metric for that matter), it's a good idea to create a convention that your team can follow. Your approach will be specific to your organization, of course. Below are some suggestions based on conventions we use internally:

## Naming conventions
You could enforce names that are lower case only, camel case, or snake case (no periods, no spaces, etc.). Use a common taxonomy, for example:

**Feature flag:** project_feature

* `debug_saml`
* `dashboard_icons`

**Segment:** grouping_usecase

* `beta_testers`
* `beta_early_release`

**Metrics:** Descriptive, also useful to note per v. across

 * `Tasks completed per user`
 

#### Examples

![](https://help.split.io/hc/article_attachments/360038725131/mceclip0.png)

## Organizing feature flags
Split's user interface can get crowded, and we are constantly trying to improve this experience. Below are some tips to help stay organized as a team.

**Tags:** Add tags to feature flags to associate them with projects, teams, features. For example, multiple feature flags for the same feature should all utilize the same tag for better filtering. You may want to indicate where the feature is built. Tags are case sensitive, and lowercase is recommended. For example:

 * frontend feature flags, use `front_end`
 * backend feature flags, use `back_end`

**Owners:** At a minimum, the feature flag creator will be an owner (along with Admins). Typically, an engineer and PM will both own a feature flag. Segments and metrics may only have a single owner, and are less likely to change. Groups, such as an engineering team, are also useful to make as owners.

**Starring:** Star any feature flags that you would like to surface easily. Starring is isolated to you, so it's a good way for an individual to drill into currently used feature flags.

**Traffic Type:** While not the primary use for Traffic Type, you can use it as a way to filter in on a specific set of feature flags.

## Deleting a feature flag
You may want to tag objects that need to be deleted as a reminder, depending on your process, or as a check before taking action. For example:

* Feature flags should only be deleted if they have the tag `feature_flag_cleanup`.
* Please confirm with a member of the appropriate team before removing any feature flags.