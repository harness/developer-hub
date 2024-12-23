---
title: Split Boxes Demo
sidebar_label: Split Boxes Demo
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360039405371-Split-Boxes-Demo  <br /> ✘ images still hosted on help.split.io </button>
</p>

The Split Boxes demo is a tool to help users understand the interaction between rules and the impact of various features. It's a simple visualization that allows you to see the impact of individually targeting, custom attribution, limit exposure, and dynamic configuration.

## Using the Boxes Demo

Each box represents a user ID.  

![](https://help.split.io/hc/article_attachments/26801689779725)

You can individually target using the cell location, such as b8 or j5.  You can also create a segment that includes any of the available values.

You can create targeting rules using the attributes row, col, or account; row and col will use letters and numbers respectively, usually with 'is in list' as the matcher.  Valid account names include Nike, Apple, LinkedIn, Best Buy, Google, Microsoft, Pinterest, Dell, Slack, Zoom, Samsung and Disney.

You can modify the configuration of the treatments by updating any of the values.  The font_size expects standard HTML sizes, such as medium, large, x-large, etc.

## Setting up the Boxes Demo

There are three files attached.  The HTML contains the SDK and can be run locally or on a server.  You need to provide the browser API key for whichever Split environment in which you will be updating the rollout plan.  You also need to provide the name of the feature flag.  These are entered as vars in the HTML.

```html
<script>
var splitAPIKey=""
var splitName=""
```

The Boxes_split.txt file contains an example baseline definition of the feature flag.

The feature flag can be created automatically using CreateBoxSplit.sh script which uses Split Admin Rest API, and jq tool. Run the script with the following command line to create the feature flag and add the definitions:

CreateBoxSplit [Project Name] [Environment Name] [
Traffic Type] [Split Name] [Admin API_KEY]

For example
```
CreateBoxSplit Default Production user front_end_choose_boxes 9enxxxxxxxxxxxxxxxxxxxxxx
```

![](https://help.split.io/hc/article_attachments/360048654411)

In Chrome, to see feature flag changes immediately you should Disable cache for the Network in the browser's Developer Tools.

[CreateBoxSplit.sh.zip](https://help.split.io/hc/en-us/article_attachments/360048733612)

[Boxes_split.txt](https://help.split.io/hc/en-us/article_attachments/10304905177869)

[Boxes.htm](https://help.split.io/hc/en-us/article_attachments/26801650994957)