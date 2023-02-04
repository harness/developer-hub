---
title: Add a Prerequisite to Your Flags
description: This topic describes how to use feature flag prerequisites to enable or disable features based on different flag states.
tags: 
   - feature flag
   - prerequisites
sidebar_position: 30
helpdocs_topic_id: iijdahygdm
helpdocs_category_id: jqfkw27d3u
helpdocs_is_private: false
helpdocs_is_published: true
---
```mdx-code-block
import pre_req_1 from './static/3-add-prerequisites-to-feature-flag-02.png'
import pre_req_2 from './static/3-add-prerequisites-to-feature-flag-03.png'
```

A Prerequisite is a Flag you add as a dependency that needs to be met before another Flag can be toggled `ON` or `OFF`. For example, if you have a Flag that allows users to write Java, the user must be able to read the Java first. Therefore, you add a Prerequisite that the `Read_Java` Flag must be enabled before the `Write_Java` Flag can be toggled on. 

### Add a Prerequisite

1. Go to the Feature Flag you want to add the Prerequisite to.
2. Click **+ New Prerequisite**.

```mdx-code-block
<img src={pre_req_1} alt="A screenshot of the Write Java Flag with the Prerequisites button highlighted." height="500" width="400" />
```

*Figure 1: Adding a Prerequisite*

1. In **Add Prerequisites**, click **+ Prerequisites**.
2. In the first drop-down menu, select the Flag you want to use as a Prerequisite.
3. In the second drop-down, select which Variation of the Prerequisite Flag must be served before the Feature Flag can be turned on. For the example below, the Read\_Java Flag must be set to `True` before this Flag can be enabled.
4. Click **Save**. The Prerequisite Flag is listed on the Feature Flag page and must be met before you can turn on the Feature Flag.

```mdx-code-block
<img src={pre_req_2} alt="A screenshot of the Prerequisite Flag added to the Write_Java Flag." height="500" width="400" />
```

*Figure 2: The Read\_Java Flag as a Prerequisite to the Write\_Java Flag*

