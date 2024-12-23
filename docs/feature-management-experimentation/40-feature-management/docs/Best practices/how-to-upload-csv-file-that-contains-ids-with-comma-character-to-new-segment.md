---
title: How to upload CSV file that contain IDs with comma character to new segment?
sidebar_label: How to upload CSV file that contain IDs with comma character to new segment?
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360042835732-How-to-upload-CSV-file-that-contain-IDs-with-comma-character-to-new-segment </button>
</p>

## Question

Using the CSV upload feature in segment page in Split user interface, is it possible to upload user IDs in the CSV file that contain comma? The standard escape for CSV comma values is encapsulating the column value with double quotes like the example below:
```
"user1, key1"
"user2, key2"
"user3, key3"
```

## Answer

The CSV upload functionality in Split user interface automatically considers each line as a unique user  id, so there is no need to add the double quotes, as they are added to the final user IDs that are imported to a Split segment. To use the example above, remove the double quotes, as below:
```
user1, key1
user2, key2
user3, key3
```