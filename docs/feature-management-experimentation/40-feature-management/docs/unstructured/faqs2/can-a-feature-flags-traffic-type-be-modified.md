---
title: Can a feature flag's Traffic type be modified?
sidebar_label: Can a feature flag's Traffic type be modified?
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360043278251-Can-Traffic-Type-be-modified-after-a-feature-flag-is-created <br /> ✘ images still hosted on help.split.io </button>
</p>

## Question

Can Traffic Type that is associated with the feature flag be modified after the flag is created?

## Answer

Once the feature flag is created with specific traffic type, it is not possible to change it, this is done by design so the experiment data will not be mixed from different traffic types and pollute the results.

To change a traffic type, a new feature flag has to be created with the correct traffic type.