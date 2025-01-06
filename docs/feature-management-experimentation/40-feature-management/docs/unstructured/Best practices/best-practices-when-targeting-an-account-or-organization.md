---
title: Best practices when targeting an account or organization
sidebar_label: Best practices when targeting an account or organization
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360029718252-Best-practices-when-targeting-an-account-or-organization </button>
</p>

Traffic types that target using a key for accounts or organizations (or schools or hospitals or...) as opposed to individual users are most often based on managing entitlements or for B2B applications.  Of course, you can also target based on a department, plant, location or any level of granularity for which you have an associated key.  We'll use 'account' as a proxy for all of the above.

## Consistency of Experience

When you want consistency of experience for all users within a single account, then use the account traffic type. This ensures that by providing a single ID - the account ID - you get the benefit of consistency without having to provide any complex data objects around users.

If you want to measure the impact of a feature being rolled out by accounts through experimentation, avoid using SUM or COUNT metrics. As an example, say account A has 1,000 users but account B has two users. A metric that COUNTs or SUMs activity across these two accounts will be skewed in favor of the bigger account. Conversely, if you create metrics that measure AVERAGEs or PERCENTAGEs, data is normalized across accounts.

As a B2B company, if you are OK with rolling out some of the features without the guarantee of consistency of experience for all users within a single account, then use a user traffic type. This also opens up a world of experimentation for you as you can measure SUM, COUNTs, AVERAGEs, PERCENTAGEs.

Another option is to roll out a feature flag by user, but use company as a custom attribute to ensure everyone in specific (or all) companies get the same experience.  This allows you to create a consistent experience within each organization, but still evaluate the results on a user by user basis.  Of course, as noted above, you will not be able to control the distribution if some companies have far more users than others.  More on that in [this article](https://help.split.io/hc/en-us/articles/360030024391-How-does-Split-ensure-a-consistent-user-experience-).

These are tradeoffs that individual teams can make. You can roll out some features by accounts and others by users and Split allows you manage the experiences for each.