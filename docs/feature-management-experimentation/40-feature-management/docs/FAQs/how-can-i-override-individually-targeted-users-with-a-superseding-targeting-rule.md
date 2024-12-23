---
title: How can I override individually targeted users with a superseding targeting rule?
sidebar_label: How can I override individually targeted users with a superseding targeting rule?
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360016253331-How-can-I-override-individually-targeted-users-with-a-superseding-targeting-rule <br /> ✘ images still hosted on help.split.io </button>
</p>

## Question

I am using a segment in the set individual targets section to give an `on` treatment to users with a certain user IDs. However, if one of those users is on a  very slow network (3G or below) I need to give that user the `off` treatment, even if they are in my segment of individually targeted users.  How can we get the treatment for network speed to override the treatment?

## Answer

The conditions or rules are applied from top to bottom, so the higher the rule on the page, the higher-order it will be applied.

![](https://help.split.io/hc/article_attachments/15734176780429)

If you have a rule to include the user by name or by segment, create a rule above that to exclude any user with a specific attribute.  You can use segments or user IDs in targeting rules just as you would in an individually targeted section, but with greater flexibility.

In the Set targeting rules section, select the attribute that would override the individually targeted  users.  You would then select a segment, or user IDs, as the Else If part of the rule.

![](https://help.split.io/hc/article_attachments/15734297213197)