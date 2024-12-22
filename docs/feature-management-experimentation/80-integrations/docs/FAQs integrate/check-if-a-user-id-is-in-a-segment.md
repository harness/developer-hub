---
title: Check if a user ID is in a segment
sidebar_label: Check if a user ID is in a segment
helpdocs_is_private: false
helpdocs_is_published: true
---

import Link from "@docusaurus/Link";

<p>
  <button style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360033336272-How-to-programmatically-determine-if-a-particular-user-ID-exists-in-a-segment </button>
</p>

### Question

What is the best way to verify if a user ID (or key) exist in a specific segment? Using Admin API we have to fetch all the keys for all segments and loop through them to find the segment names.

### Answer

The Admin API does not have a call to check if a user is part of a specific segment, however, an easier and much faster way of getting this data is to use the Mobile and Web SDK GET HTTP call that fetches list of Segment names for a given user ID.

Here is the curl format, please note you need to use a browser type API Key to authenticate.

```bash
curl -H "Authorization: Bearer [Browser API Key]" -H "Accept: application/json" https://sdk.split.io/api/mySegments/[user id]
```

For example:

```bash
curl -H "Authorization: Bearer ebj1kXXXXXXXXXXXXXXXXX" -H "Accept: application/json" https://sdk.split.io/api/mySegments/testing4321
```

Response returned:

```json
{"mySegments":[{"id":"460f69f0-f426-11e8-92e6-0ed4073e2658","name":"First_Class_Users"}]}
```