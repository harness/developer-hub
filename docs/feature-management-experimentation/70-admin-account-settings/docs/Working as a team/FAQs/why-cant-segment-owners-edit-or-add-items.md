---
title: Why can't segment owners edit or add items?
sidebar_label: Why can't segment owners edit or add items?
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360018334592-Why-can-t-segment-owners-edit-or-add-items <br /> ✘ images still hosted on help.split.io </button>
</p>

## Problem

<p>
  A segment owner user account does not have permissions to edit or add items,
  even though their user account is part of the segment owners
</p>
<p>
  <img src="https://help.split.io/hc/article_attachments/360014012731/Screen_Shot_2018-10-23_at_1.43.16_PM.png" alt="Screen_Shot_2018-10-23_at_1.43.16_PM.png" />
</p>

## Root Cause

<p>
  Even though the user account is part of the owners, the environment permission
  is locked:
</p>
<p>
  <img src="https://help.split.io/hc/article_attachments/360014000692/Screen_Shot_2018-10-23_at_1.24.11_PM.png" alt="Screen_Shot_2018-10-23_at_1.24.11_PM.png" />
</p>
<p>
  That is why when the segment is added to the environment, the segment permissions
  will not be propagated to the environment.
</p>
<p>
  <img src="https://help.split.io/hc/article_attachments/360014000712/Screen_Shot_2018-10-23_at_1.25.27_PM.png" alt="Screen_Shot_2018-10-23_at_1.25.27_PM.png" />
</p>

## Solution

<p>There are two possible actions:</p>
<ul>
  <li>
    The environment that does not have permissions locked, will allow propagating,
    however, every time a segment is added to the environment, by default it
    will allow everyone to edit the segment, to restrict permissions, enable
    the Segment permissions within the environment. This will propagate the permissions
    from the Segment to the segment within the environment.
  </li>
</ul>
<p>
  <img src="https://help.split.io/hc/article_attachments/360014012891/Screen_Shot_2018-10-17_at_2.32.22_PM.png" alt="Screen_Shot_2018-10-17_at_2.32.22_PM.png" />
</p>
<ul>
  <li>
    Login as an Administrator, then click on the pen icon to edit the Editors
    list for the segment and manually add the user(s) that need to make changes
    to the segment.
  </li>
</ul>
<p>
  <img src="https://help.split.io/hc/article_attachments/360014000892/Screen_Shot_2018-10-23_at_1.40.50_PM.png" alt="Screen_Shot_2018-10-23_at_1.40.50_PM.png" />
</p>