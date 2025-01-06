---
title: How can I override individually targeted users with a superseding targeting rule?
sidebar_label: How can I override individually targeted users with a superseding targeting rule?
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360016253331-How-can-I-override-individually-targeted-users-with-a-superseding-targeting-rule </button>
</p>

## Question

Is there a way to limit the amount of users participating in the experiment?

## Answer

Within the feature flag definition, there is no cap feature, however, it's possible to limit the number of user in approximate way using the Limit exposure feature.

For example, if the total unique users in the site or page used in the experiment are 1 million, then it's possible to limit the exposure to 15%, which will allow only 150k of the unique users into the experiment.