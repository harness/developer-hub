---
title: Environments
sidebar_label: Environments
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360019915771-Environments <br /> ✘ images still hosted on help.split.io </button>
</p>

Environments allow you to manage your feature flag throughout your development lifecycle, from local development to staging and production.

When you first create your account, your default project is provided with two environments which  are named Staging and Production by default. Each environment is automatically set up with its own API keys. These API keys are used to connect the Split SDK to a specific environment.

Each feature flag that you create has its own set of targeting rules in each environment making it easy to define different targeting rules in your staging and production environments. This allows you to quickly change the targeting rules for a specific feature flag for quality testing on your staging environment with confidence that the feature flag is not enabled for users on your production environments.

You can manage your environments for each project from your Admin settings. You can also add new environments or edit existing.

# Navigating

The Environments section provides you and your team insights into the feature flags configured in each environment. Teams can now easily toggle between any environment via the environments dropdown.

Navigate to the environments icon to quickly see the status of each feature flag in a given environment and a log of feature flag changes to quickly see any modifications made by your team. Summary statistics and sorting provide an easy starting point to find the feature flags you and your team are managing.

<p>
  <img src="https://help.split.io/hc/article_attachments/15587079043853" alt="navigate-feature-flag-status-by-environment.png" />
</p>

# Editing

When you first create your account, you are provided with two environments. To manage your environments, go to the **Projects** tab in your **Admin settings** page. Select the project that you want to edit environments for. You can: 

* Rename environments to match your deployment process as well update their permissions by clicking **Edit**.
* Add additional environments by clicking **Create environment**.

<p>
  <img src="https://help.split.io/hc/article_attachments/15587865204621" alt="Screen_Shot_2023-05-08_at_11.59.42_AM.png" />
</p>

# Localhost

A developer can set up a feature flag on their development machine without the SDK requiring network connectivity. This is called the localhost environment. This environment does not show up in the user interface because, by definition, that requires network connectivity. To configure your SDK for this mode, refer to your language SDK guide.
