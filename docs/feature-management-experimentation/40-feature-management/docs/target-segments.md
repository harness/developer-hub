---
title: Target segments
sidebar_label: Target segments
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360020525252-Target-customers-and-segments <br /> ✘ images still hosted on help.split.io </button>
</p>

Once you create a feature flag, you can [create feature flag targeting rules](https://help.split.io/hc/en-us/articles/360020791591-Define-feature-flag-treatments-and-targeting) that target individual user IDs (user keys), but you can also use segments.

[Segments](https://help.split.io/hc/en-us/articles/360020407512-Create-a-segment) are lists of user IDs. On your feature flag Definition tab, you can create targeting rules that assign treatments to segments.

This article shows how to target Standard segments and Large segments in your individual targeting rules and in attribute based targeting rules.

___Tip:___ If you don't see a segment appear when you type its name in the segment input field, it may be that the segment is not [defined](https://help.split.io/hc/en-us/articles/360020407512-Create-a-segment#adding-user-ids-to-a-segment) for the given Split environment.

:::warning[Server-side SDK support for Large segments]
Server-side SDKs do not yet support Large segments, but soon will. Until they are supported, evaluations of feature flags that target Large segments will return `control` on server-side SDKs. 
:::

## Individual targeting rules

You can target segments in individual targeting rules. These rules assign a treatment to the segment. In the following example, the feature flag will serve **on** to all user IDs in the given segments.
<p>
  <img src="https://help.split.io/hc/article_attachments/32100446480653" alt="target_segments_individual_targets.png" width="1000" />
</p>

After you select a segment, you can see the segment type indicated by the input pill icon in the To segments field.
<p>
  <img src="https://help.split.io/hc/article_attachments/32100456862989" alt="target_segments_to_segments_input.png" width="800" />
</p>

## Attribute based targeting rules

You can also target Standard segments and Large segments in attribute based targeting rules. The following example is equivalent to the individual targeting rule shown above.
<p>
  <img src="https://help.split.io/hc/article_attachments/32100456870797" alt="target_segments_attribute_based_targeting.png" width="800" />
</p>

You can also use ___percentage distribution___ to randomly distribute treatments among the user IDs in a segment, as shown below.
<p>
  <img src="https://help.split.io/hc/article_attachments/32100446478349" alt="target_segments_attribute_percentage_distribution.png" width="800" />
</p>

See [Targeting rules](https://help.split.io/hc/en-us/articles/360020791591-Define-feature-flag-treatments-and-targeting#targeting-rules) for more information on feature flag targeting, percentage distribution, and rules' evaluation order.
