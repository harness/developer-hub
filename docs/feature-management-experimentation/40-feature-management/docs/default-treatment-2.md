---
title: Default treatment 2
sidebar_label: Default treatment 2
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360020527672-Set-the-default-treatment <br /> ✘ images still hosted on help.split.io </button>
</p>

If a feature flag is killed or the customer is not exposed to any targeting rules, the flag serves a treatment selected by you. This is also known as the default treatment. Your treatment should always be one that exposes fully tested and safe code. In an *on/off* feature flag, the default treatment is typically set to *off*. In a multivariate feature, the default might be off, or it might be defined as the treatment that is currently used by 100% of traffic. To set this treatment, refer to the [Target customers](https://help.split.io/hc/en-us/articles/360020791591-Target-customers) guide.