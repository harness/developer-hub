---
title: Update feature flag definition patch request fails with 400 error
sidebar_label: Update feature flag definition patch request fails with 400 error
helpdocs_is_private: false
helpdocs_is_published: true
description: ""
---

<p>
  <button hidden style={{borderRadius:'8px', border:'1px', fontFamily:'Courier New', fontWeight:'800', textAlign:'left'}}> help.split.io link: https://help.split.io/hc/en-us/articles/360042152551-Admin-API-patching-request-to-update-feature-flag-definition-fails-with-400-bad-request </button>
</p>

### Issue

Admin API allows updating existing feature flag definitions, but when using the curl command below to add a key into an existing individual target section, the command fails with 400 bad request.

```bash
curl -v -X PATCH -d '[{"op": "add", "path": "/treatments/0/keys/-", "value": "key1"}]' -H "Authorization: Bearer ADMIN API KEY" -H "Content-Type: application/json" https://api.split.io/internal/api/v2/splits/ws/[Workspace ID]/[Split Name]/environments/[Environment Name]

HTTP/2 400 
< strict-transport-security: max-age=15770000; includeSubDomains
< vary: Cookie
< content-length: 0

* Connection #0 to host api.split.io left intact
```

### Root cause

The workspace configuration provides the admin the option to require title and comments for a feature flag, segment and metric changes via a checkbox option. If checked, it is required to provide a title and comment when changing the feature flag definition, in the user interface and Admin API.

![](https://help.split.io/hc/article_attachments/15861583870221)

![](https://help.split.io/hc/article_attachments/15861642233869)

### Solution

Add the title and comment optional parameters in the URL query as below.

```bash
curl -v -X PATCH -d '[{"op": "add", "path": "/treatments/0/keys/-", "value": "key1"}]' -H "Authorization: Bearer ADMIN API KEY" -H "Content-Type: application/json" https://api.split.io/internal/api/v2/splits/ws/[Workspace ID]/[Split Name]/environments/[Environment Name]?title=Split-Engineer-Testing&comment=Split-Engineer-Testing-Comment
```